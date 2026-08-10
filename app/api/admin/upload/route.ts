import { createClient } from "@supabase/supabase-js";
import { requireAdmin } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const requestedBucket = (formData.get("bucket") as string) || "service-images";

    if (!file) {
      return Response.json({ error: "Fayl yuborilmadi" }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey || supabaseKey.includes("your_supabase")) {
      return Response.json(
        {
          error:
            "Supabase Storage kaliti (.env.local da NEXT_PUBLIC_SUPABASE_ANON_KEY yoki SUPABASE_SERVICE_ROLE_KEY) kiritilmagan.",
        },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = file.name.split(".").pop() || "png";
    const filename = `img-${Date.now()}-${Math.random().toString(36).slice(2, 7)}.${ext}`;
    const contentType = file.type || `image/${ext}`;

    const supabase = createClient(supabaseUrl, supabaseKey);

    let bucketName = requestedBucket;

    // Auto-create bucket if it doesn't exist yet (Service Role Key permits this)
    try {
      await supabase.storage.createBucket(bucketName, { public: true });
    } catch {
      // Bucket already exists or permission handled
    }

    // 1. Upload to active bucket
    let { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filename, buffer, {
        contentType,
        upsert: true,
      });

    // 2. Fallback attempt if initial bucket upload fails
    if (error) {
      console.warn(`Supabase Storage upload to '${bucketName}' failed, trying fallback:`, error.message);
      const fallbackBucket = bucketName === "service-images" ? "portfolio-images" : "service-images";
      
      try {
        await supabase.storage.createBucket(fallbackBucket, { public: true });
      } catch {}

      const fallbackRes = await supabase.storage
        .from(fallbackBucket)
        .upload(filename, buffer, {
          contentType,
          upsert: true,
        });

      if (!fallbackRes.error && fallbackRes.data) {
        error = null;
        data = fallbackRes.data;
        bucketName = fallbackBucket;
      }
    }

    if (error) {
      console.error("Supabase Storage upload fatal error:", error);
      return Response.json(
        { error: `Supabase Storage xatosi: ${error.message}` },
        { status: 500 }
      );
    }

    // Get public URL from active Supabase Storage bucket
    const { data: publicUrlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filename);

    return Response.json({ ok: true, url: publicUrlData.publicUrl, bucket: bucketName });
  } catch (err: any) {
    console.error("Upload handler error:", err);
    return Response.json({ error: err.message || "Rasm yuklashda xatolik" }, { status: 500 });
  }
}
