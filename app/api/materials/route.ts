import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getLocalMaterials } from "@/lib/materials-store";

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

  const activeLocal = getLocalMaterials().filter((m) => m.is_active);
  return Response.json({ materials: activeLocal });
}
