import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

const fallbackMaterials = [
  { key: "m1", name_uz: "Vinil banner (450g)", price_per_sqm: 45000 },
  { key: "m2", name_uz: "Laminatsiyalangan banner (510g)", price_per_sqm: 55000 },
  { key: "m3", name_uz: "Samokleyka plyonka (Orajet)", price_per_sqm: 65000 },
  { key: "m4", name_uz: "Setka banner (Mesh)", price_per_sqm: 70000 },
  { key: "m5", name_uz: "Backlit plyonka (Lightbox)", price_per_sqm: 95000 },
];

export async function GET() {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      if (supabase) {
        const { data, error } = await supabase
          .from("materials")
          .select("*")
          .eq("is_active", true)
          .order("price_per_sqm", { ascending: true });

        if (!error && data && data.length > 0) {
          return Response.json({ materials: data });
        }
      }
    } catch (err) {
      console.error("Materials fetching error:", err);
    }
  }

  return Response.json({ materials: fallbackMaterials });
}
