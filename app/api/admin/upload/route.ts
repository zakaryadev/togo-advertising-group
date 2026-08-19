import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import sharp from "sharp";

const VALID_CATEGORIES = ["f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8"];

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const adminEmail = process.env.ADMIN_EMAIL || "admin@togogrouppro.uz";
const adminPassword = process.env.ADMIN_PASSWORD || "togo2026";

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase URL or publishable key in environment variables.");
}

async function optimizeImage(buffer: Buffer) {
  const image = sharp(buffer);
  const metadata = await image.metadata();
  const optimized = await image
    .rotate()
    .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 85 })
    .toBuffer();

  return {
    buffer: optimized,
    details: `Optimized ${metadata.width ?? "?"}x${metadata.height ?? "?"} image to ${optimized.byteLength} bytes`,
  };
}

function sanitizeFilename(filename: string) {
  const parts = filename.split(".");
  const ext = parts.pop() || "";
  const name = parts.join(".");
  const cleanName = name
    .replace(/_/g, "-")
    .replace(/[^a-zA-Z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
  return { cleanName, ext };
}

function getServiceTypeFromCategory(category: string): string {
  switch (category) {
    case "f1": return "Banner";
    case "f2": return "LED Harflar";
    case "f3": return "Kran";
    case "f4": return "Avto reklama";
    case "f5": return "Stend";
    case "f6": return "Tablichka";
    case "f7": return "Poligrafiya";
    case "f8": return "Suvenir";
    default: return "Banner";
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const category = formData.get("category") as string | null;

    if (!file || !category) {
      return NextResponse.json(
        { error: "File and category are required" },
        { status: 400 }
      );
    }

    if (!VALID_CATEGORIES.includes(category)) {
      return NextResponse.json(
        { error: `Invalid category: ${category}` },
        { status: 400 }
      );
    }

    // Initialize public Supabase client
    const supabasePublic = createClient(supabaseUrl, supabaseAnonKey);

    // Sign in on backend using admin user credentials
    const { data: authData, error: authError } = await supabasePublic.auth.signInWithPassword({
      email: adminEmail,
      password: adminPassword,
    });

    if (authError || !authData.session) {
      return NextResponse.json(
        { error: `Supabase auth failed: ${authError?.message || "No session"}` },
        { status: 401 }
      );
    }

    // Create authenticated client with the user's JWT
    const authSupabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          Authorization: `Bearer ${authData.session.access_token}`,
        },
      },
    });

    // Read file bytes
    const buffer = Buffer.from(await file.arrayBuffer());

    // Generate unique name
    const { cleanName } = sanitizeFilename(file.name);
    const uniqueId = `${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const webpFilename = `${cleanName}-${uniqueId}.webp`;

    // Optimize in memory so serverless deployments do not depend on a writable project folder or Python.
    let details = "";
    let webpBuffer: Buffer;
    try {
      ({ buffer: webpBuffer, details } = await optimizeImage(buffer));
    } catch (optError: any) {
      return NextResponse.json(
        { error: `Image optimization failed: ${optError.message}` },
        { status: 500 }
      );
    }

    // Upload to Supabase Storage
    const bucketName = "portfolio-images";
    const storagePath = `portfolio/${webpFilename}`;

    const { error: uploadError } = await authSupabase.storage
      .from(bucketName)
      .upload(storagePath, webpBuffer, {
        contentType: "image/webp",
        upsert: true,
      });

    if (uploadError) {
      return NextResponse.json(
        { error: `Supabase Storage upload failed: ${uploadError.message}` },
        { status: 500 }
      );
    }

    // Public URL
    const imageUrl = `${supabaseUrl}/storage/v1/object/public/${bucketName}/${storagePath}`;

    // Insert row to public.portfolio
    const { data: dbData, error: dbError } = await authSupabase
      .from("portfolio")
      .insert({
        title: cleanName.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        service_type: getServiceTypeFromCategory(category),
        image_url: imageUrl,
        is_active: true,
        is_featured: false,
        sort_order: 0,
      })
      .select()
      .single();

    if (dbError) {
      // Cleanup the uploaded storage object if DB insert fails
      await authSupabase.storage.from(bucketName).remove([storagePath]);
      return NextResponse.json(
        { error: `Database insert failed: ${dbError.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      id: dbData.id,
      original: storagePath,
      optimized: imageUrl,
      details,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: `Internal server error: ${error.message}` },
      { status: 500 }
    );
  }
}
