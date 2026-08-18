import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import fs from "fs/promises";
import path from "path";
import { spawn } from "child_process";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const categoryToServiceType: Record<string, string> = {
  f1: "Banner", f2: "LED Harflar", f3: "Kran", f4: "Avto reklama",
  f5: "Stend", f6: "Tablichka", f7: "Poligrafiya", f8: "Suvenir",
};

function runOptimizer(src: string, dest: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const scriptPath = path.join(process.cwd(), "scripts", "optimize_server.py");
    const child = spawn("python", [scriptPath, "--src", src, "--dest", dest]);
    let stdout = "", stderr = "";
    child.stdout.on("data", (d) => { stdout += d.toString(); });
    child.stderr.on("data", (d) => { stderr += d.toString(); });
    child.on("close", (code) => {
      if (code === 0 && stdout.includes("SUCCESS")) resolve(stdout);
      else reject(new Error(stderr || stdout || `Process exited ${code}`));
    });
  });
}

async function getAuthClient() {
  const pub = createClient(supabaseUrl, supabaseAnonKey);
  const { data, error } = await pub.auth.signInWithPassword({
    email: process.env.ADMIN_EMAIL!, password: process.env.ADMIN_PASSWORD!,
  });
  if (error || !data.session) throw new Error(`Auth: ${error?.message || "no session"}`);
  return createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: `Bearer ${data.session.access_token}` } },
  });
}

export async function POST(request: NextRequest) {
  let tmpSrc = "", tmpDest = "";
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
      const originalFilename = `${cleanName}-${uniqueId}.${newImage.name.split(".").pop()}`;
      const webpFilename = `${cleanName}-${uniqueId}.webp`;

      const tempDir = path.join(process.cwd(), "new-images", "temp");
      await fs.mkdir(tempDir, { recursive: true });

      tmpSrc = path.join(tempDir, originalFilename);
      tmpDest = path.join(tempDir, webpFilename);
      await fs.writeFile(tmpSrc, buffer);

      try { await runOptimizer(tmpSrc, tmpDest); } catch (e: any) {
        return NextResponse.json({ error: `Optimizatsiya: ${e.message}` }, { status: 500 });
      }

      const webpBuffer = await fs.readFile(tmpDest);
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
  } finally {
    for (const f of [tmpSrc, tmpDest]) {
      if (f) try { await fs.unlink(f); } catch {}
    }
  }
}
