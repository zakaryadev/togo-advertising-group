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
    const contentType = file.type || `image/${ext}`;

    // 1. Try Supabase Storage upload if configured
    if (isSupabaseConfigured()) {
      try {
        const supabase = await createClient();
        if (supabase) {
          const { data, error } = await supabase.storage
            .from("portfolio-images")
            .upload(filename, buffer, {
              contentType,
              upsert: true,
            });

          if (!error && data) {
            const { data: publicUrlData } = supabase.storage
              .from("portfolio-images")
              .getPublicUrl(filename);

            if (publicUrlData?.publicUrl) {
              return Response.json({ ok: true, url: publicUrlData.publicUrl });
            }
          } else if (error) {
            console.error("Supabase Storage upload error:", error);
          }
        }
      } catch (err) {
        console.error("Supabase storage exception:", err);
      }
    }

    // 2. Try Local filesystem upload (works in local Node dev mode)
    try {
      const uploadsDir = join(process.cwd(), "public", "uploads");
      await mkdir(uploadsDir, { recursive: true });
      const filePath = join(uploadsDir, filename);
      await writeFile(filePath, buffer);

      return Response.json({ ok: true, url: `/uploads/${filename}` });
    } catch (fsErr) {
      console.warn("Local filesystem write failed (read-only system), using Data URL fallback:", fsErr);
    }

    // 3. Serverless Base64 Data URL Fallback (guaranteed 100% success on Vercel / serverless)
    const base64Str = buffer.toString("base64");
    const dataUrl = `data:${contentType};base64,${base64Str}`;

    return Response.json({ ok: true, url: dataUrl });
  } catch (err: unknown) {
    console.error("Upload handler fatal error:", err);
    return Response.json({ error: "Rasm yuklashda xatolik" }, { status: 500 });
  }
}
