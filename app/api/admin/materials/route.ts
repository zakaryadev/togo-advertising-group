import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getLocalMaterials, updateLocalMaterialPrice } from "@/lib/materials-store";

export async function GET() {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      if (supabase) {
        const { data, error } = await supabase
          .from("materials")
          .select("*")
          .order("created_at", { ascending: true });

        if (!error && data && data.length > 0) {
          return Response.json({ materials: data });
        }
      }
    } catch (err) {
      console.error("Admin GET materials error:", err);
    }
  }

  return Response.json({ materials: getLocalMaterials() });
}

export async function PATCH(request: Request) {
  let body: { key?: string; price_per_sqm?: number; is_active?: boolean };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Noto'g'ri so'rov" }, { status: 400 });
  }

  const { key, price_per_sqm, is_active } = body;
  if (!key) {
    return Response.json({ error: "key majburiy" }, { status: 400 });
  }

  // Update in-memory materials store immediately
  updateLocalMaterialPrice(key, { price_per_sqm, is_active });

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      if (supabase) {
        const updates: Record<string, unknown> = {};
        if (price_per_sqm !== undefined) updates.price_per_sqm = price_per_sqm;
        if (is_active !== undefined) updates.is_active = is_active;

        const { error } = await supabase
          .from("materials")
          .update(updates)
          .eq("key", key);

        if (error) {
          console.error("Admin PATCH material error:", error);
          return Response.json({ error: error.message }, { status: 500 });
        }
      }
    } catch (err) {
      console.error("Supabase update error:", err);
    }
  }

  return Response.json({ ok: true, key, price_per_sqm, is_active, materials: getLocalMaterials() });
}
