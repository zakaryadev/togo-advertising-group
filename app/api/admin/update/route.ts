import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import sharp from "sharp";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const adminEmail = process.env.ADMIN_EMAIL || "admin@togogrouppro.uz";
const adminPassword = process.env.ADMIN_PASSWORD || "togo2026";

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase URL or publishable key in environment variables.");
}

const categoryToServiceType: Record<string, string> = {
  f1: "Banner", f2: "LED Harflar", f3: "Kran", f4: "Avto reklama",
  f5: "Stend", f6: "Tablichka", f7: "Poligrafiya", f8: "Suvenir",
};

async function getAuthClient() {
  const pub = createClient(supabaseUrl, supabaseAnonKey);
  const { data, error } = await pub.auth.signInWithPassword({
    email: adminEmail, password: adminPassword,
  });
  if (error || !data.session) throw new Error(`Auth: ${error?.message || "no session"}`);
  return createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: `Bearer ${data.session.access_token}` } },
  });
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const imageUrl = formData.get("imageUrl") as string;
    const category = formData.get("category") as string;
    const subcategory = formData.get("subcategory") as string | null;
    const title = formData.get("title") as string | null;
    const isStatic = formData.get("isStatic") === "true";
    const newImage = formData.get("newImage") as File | null;

    if (!imageUrl || !category) {
      return NextResponse.json({ error: "imageUrl va category talab qilinadi" }, { status: 400 });
    }

    const authSupabase = await getAuthClient();
    const serviceType = categoryToServiceType[category] || "Banner";

    let finalImageUrl = imageUrl;
    if (finalImageUrl && !finalImageUrl.startsWith("http://") && !finalImageUrl.startsWith("https://") && !finalImageUrl.startsWith("/")) {
      finalImageUrl = `/${finalImageUrl}`;
    }

    // Handle new image replacement
    if (newImage && newImage.size > 0) {
      const buffer = Buffer.from(await newImage.arrayBuffer());
      const uniqueId = `${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const cleanName = newImage.name.split(".")[0]
        .replace(/_/g, "-").replace(/[^a-zA-Z0-9-]+/g, "-")
        .replace(/-+/g, "-").replace(/^-|-$/g, "").toLowerCase();
      const webpFilename = `${cleanName}-${uniqueId}.webp`;

      let webpBuffer: Buffer;
      try {
        webpBuffer = await sharp(buffer)
          .rotate()
          .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
          .webp({ quality: 85 })
          .toBuffer();
      } catch (e: any) {
        return NextResponse.json({ error: `Optimizatsiya: ${e.message}` }, { status: 500 });
      }
      const storagePath = `portfolio/${webpFilename}`;

      const { error: upErr } = await authSupabase.storage
        .from("portfolio-images")
        .upload(storagePath, webpBuffer, { contentType: "image/webp", upsert: true });
      if (upErr) return NextResponse.json({ error: `Storage: ${upErr.message}` }, { status: 500 });

      finalImageUrl = `${supabaseUrl}/storage/v1/object/public/portfolio-images/${storagePath}`;

      // If replacing a Supabase image, delete old storage object
      if (!isStatic && imageUrl.startsWith("http")) {
        const marker = "/portfolio-images/";
        const mi = imageUrl.indexOf(marker);
        if (mi !== -1) {
          await authSupabase.storage.from("portfolio-images").remove([imageUrl.substring(mi + marker.length)]);
        }
      }
    }

    if (isStatic) {
      // Static image → create new Supabase DB record (upsert by image_url or insert new)
      const insertData: Record<string, any> = {
        title: (title && title.trim()) || "Statik rasm",
        service_type: serviceType,
        image_url: finalImageUrl,
        is_active: true,
        is_featured: false,
        sort_order: 0,
      };
      if (subcategory) insertData.dimensions = subcategory; // store subcategory in dimensions field

      const { error: insErr } = await authSupabase.from("portfolio").insert(insertData);
      if (insErr) return NextResponse.json({ error: `DB insert: ${insErr.message}` }, { status: 500 });
    } else {
      // Supabase image → update existing record
      const updateData: Record<string, any> = { service_type: serviceType };
      if (title && title.trim()) updateData.title = title.trim();
      if (finalImageUrl !== imageUrl) updateData.image_url = finalImageUrl;
      if (subcategory) updateData.dimensions = subcategory;

      const { error: updErr } = await authSupabase
        .from("portfolio").update(updateData).eq("image_url", imageUrl);
      if (updErr) return NextResponse.json({ error: `DB update: ${updErr.message}` }, { status: 500 });
    }

    return NextResponse.json({ success: true, imageUrl: finalImageUrl });
  } catch (error: any) {
    return NextResponse.json({ error: `Server: ${error.message}` }, { status: 500 });
  }
}
