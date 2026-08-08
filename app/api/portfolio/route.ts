import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { portfolio as fallbackPortfolio } from "@/app/content/site-content";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const featuredOnly = searchParams.get("featured") === "true";

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      if (supabase) {
        let query = supabase
          .from("portfolio")
          .select("*")
          .eq("is_active", true)
          .order("sort_order", { ascending: true })
          .order("created_at", { ascending: false });

        if (featuredOnly) {
          query = query.eq("is_featured", true);
        }

        const { data, error } = await query;
        if (!error && data && data.length > 0) {
          return Response.json({ items: data });
        }
      }
    } catch (err) {
      console.error("Public GET portfolio error:", err);
    }
  }

  return Response.json({ items: fallbackPortfolio });
}
