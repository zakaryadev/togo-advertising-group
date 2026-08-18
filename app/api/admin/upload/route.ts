import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { spawn } from "child_process";
import { createClient } from "@supabase/supabase-js";

const VALID_CATEGORIES = ["f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8"];

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

function runOptimizer(src: string, dest: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const scriptPath = path.join(process.cwd(), "scripts", "optimize_server.py");
    const child = spawn("python", [scriptPath, "--src", src, "--dest", dest]);

    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (data) => {
      stdout += data.toString();
    });

    child.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    child.on("close", (code) => {
      if (code === 0 && stdout.includes("SUCCESS")) {
        resolve(stdout);
      } else {
        reject(new Error(stderr || stdout || `Process exited with code ${code}`));
      }
    });
  });
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
  let tempOriginalPath = "";
  let tempOptimizedPath = "";

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
      email: process.env.ADMIN_EMAIL!,
      password: process.env.ADMIN_PASSWORD!,
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
    const { cleanName, ext } = sanitizeFilename(file.name);
    const uniqueId = `${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const originalFilename = `${cleanName}-${uniqueId}.${ext}`;
    const webpFilename = `${cleanName}-${uniqueId}.webp`;

    // Ensure temp folder exists
    const tempDir = path.join(process.cwd(), "new-images", "temp");
    await fs.mkdir(tempDir, { recursive: true });

    // Save temporary original file
    tempOriginalPath = path.join(tempDir, originalFilename);
    await fs.writeFile(tempOriginalPath, buffer);

    // Optimize local temporary WebP path
    tempOptimizedPath = path.join(tempDir, webpFilename);

    // Run Python optimizer
    let details = "";
    try {
      details = await runOptimizer(tempOriginalPath, tempOptimizedPath);
    } catch (optError: any) {
      return NextResponse.json(
        { error: `Image optimization failed: ${optError.message}` },
        { status: 500 }
      );
    }

    // Read the optimized WebP buffer
    const webpBuffer = await fs.readFile(tempOptimizedPath);

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
  } finally {
    // Cleanup temporary files
    if (tempOriginalPath) {
      try {
        await fs.unlink(tempOriginalPath);
      } catch {}
    }
    if (tempOptimizedPath) {
      try {
        await fs.unlink(tempOptimizedPath);
      } catch {}
    }
  }
}
