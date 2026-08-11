import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getLocalServices } from "@/lib/services-store";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      if (supabase) {
        const { data, error } = await supabase
          .from("services")
          .select("*")
          .eq("is_active", true)
          .order("sort_order", { ascending: true });

        if (!error && data && data.length > 0) {
          const mappedData = data.map((item: any) => ({
            id: item.id,
            slug: item.slug || item.id,
            title: item.title_uz || item.title || "",
            excerpt: item.description_uz || item.excerpt || "",
            image: item.image || "/img/services/led-harflar.webp",
            category: item.category || "LED",
            from_price: item.from_price || "",
          }));

          return Response.json({ services: mappedData });
        }
      }
    } catch (err) {
      console.error("Public GET services error:", err);
    }
  }

  const activeLocal = getLocalServices().filter((s) => s.is_active !== false);
  return Response.json({ services: activeLocal });
}
