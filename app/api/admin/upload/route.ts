import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return Response.json({ error: "Fayl yuborilmadi" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = file.name.split(".").pop() || "png";
    const filename = `portfolio-${Date.now()}-${Math.random().toString(36).slice(2, 7)}.${ext}`;

    // 1. Upload to Supabase Storage if configured
    if (isSupabaseConfigured()) {
      try {
        const supabase = await createClient();
        if (supabase) {
          const { data, error } = await supabase.storage
            .from("portfolio-images")
            .upload(filename, buffer, {
              contentType: file.type || "image/png",
              upsert: true,
            });

          if (!error && data) {
            const { data: publicUrlData } = supabase.storage
              .from("portfolio-images")
              .getPublicUrl(filename);

            return Response.json({ ok: true, url: publicUrlData.publicUrl });
          } else if (error) {
            console.error("Supabase Storage upload error:", error);
          }
        }
      } catch (err) {
        console.error("Supabase storage error:", err);
      }
    }

    // 2. Local fallback upload to public/uploads/
    const uploadsDir = join(process.cwd(), "public", "uploads");
    await mkdir(uploadsDir, { recursive: true });
    const filePath = join(uploadsDir, filename);
    await writeFile(filePath, buffer);

    const localUrl = `/uploads/${filename}`;
    return Response.json({ ok: true, url: localUrl });
  } catch (err: unknown) {
    console.error("Upload handler error:", err);
    return Response.json({ error: "Rasm yuklashda xatolik" }, { status: 500 });
  }
}
