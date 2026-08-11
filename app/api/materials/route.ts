import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getLocalMaterials } from "@/lib/materials-store";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      if (supabase) {
        const { data, error } = await supabase
          .from("materials")
          .select("*")
          .order("key", { ascending: true });

        if (!error && data && data.length > 0) {
          return Response.json({ materials: data });
        }
      }
    } catch (err) {
      console.error("Materials fetching error:", err);
    }
  }

  const activeLocal = getLocalMaterials();
  return Response.json({ materials: activeLocal });
}
