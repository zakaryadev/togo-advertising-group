import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const adminEmail = process.env.ADMIN_EMAIL || "admin@togogrouppro.uz";
const adminPassword = process.env.ADMIN_PASSWORD || "togo2026";

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase URL or publishable key in environment variables.");
}

export async function POST(request: NextRequest) {
  try {
    const { source, category } = await request.json();

    if (!source || !category) {
      return NextResponse.json(
        { error: "Source and category are required" },
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

    // Create authenticated client with user's JWT
    const authSupabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          Authorization: `Bearer ${authData.session.access_token}`,
        },
      },
    });

    // Find database record by image_url (which corresponds to 'source' parameter)
    const { data: dbItem, error: findError } = await authSupabase
      .from("portfolio")
      .select("id, image_url")
      .eq("image_url", source)
      .maybeSingle();

    if (findError) {
      return NextResponse.json(
        { error: `Error searching database: ${findError.message}` },
        { status: 500 }
      );
    }

    if (!dbItem) {
      return NextResponse.json(
        { error: "Asset not found in database" },
        { status: 404 }
      );
    }

    // Delete record from public.portfolio table
    const { data: deletedItem, error: dbDeleteError } = await authSupabase
      .from("portfolio")
      .delete()
      .eq("id", dbItem.id)
      .select("id")
      .maybeSingle();

    if (dbDeleteError || !deletedItem) {
      return NextResponse.json(
        { error: `Database deletion failed: ${dbDeleteError?.message || "No row was deleted"}` },
        { status: 500 }
      );
    }

    // Parse storage path from public URL
    // Public URL format: https://.../storage/v1/object/public/portfolio-images/portfolio/file-name.webp
    const bucketName = "portfolio-images";
    const marker = `/${bucketName}/`;
    const markerIndex = source.indexOf(marker);

    if (markerIndex !== -1) {
      const storagePath = source.substring(markerIndex + marker.length);

      // Remove from Supabase Storage
      const { error: storageDeleteError } = await authSupabase.storage
        .from(bucketName)
        .remove([storagePath]);

      if (storageDeleteError) {
        console.warn(`Supabase Storage removal warning: ${storageDeleteError.message}`);
      }
    } else {
      console.warn(`Could not parse storage path from image URL: ${source}`);
    }

    return NextResponse.json({
      success: true,
      message: "Asset successfully deleted from Supabase",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: `Internal server error: ${error.message}` },
      { status: 500 }
    );
  }
}
