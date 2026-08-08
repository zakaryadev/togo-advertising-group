import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getLocalSettings, updateLocalSettings } from "@/lib/settings-store";

export async function GET() {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      if (supabase) {
        const { data, error } = await supabase.from("site_settings").select("*");
        if (!error && data && data.length > 0) {
          const settingsObj: Record<string, string> = { ...getLocalSettings() };
          data.forEach((row: { key: string; value: string }) => {
            settingsObj[row.key] = row.value;
          });
          return Response.json({ settings: settingsObj });
        }
      }
    } catch (err) {
      console.error("Admin GET settings error:", err);
    }
  }

  return Response.json({ settings: getLocalSettings() });
}

export async function PATCH(request: Request) {
  let settings: Record<string, string>;
  try {
    const body = await request.json();
    settings = body.settings || {};
  } catch {
    return Response.json({ error: "Noto'g'ri so'rov" }, { status: 400 });
  }

  // Update in-memory settings store immediately
  updateLocalSettings(settings);

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      if (supabase) {
        const upsertRows = Object.entries(settings).map(([key, value]) => ({
          key,
          value: String(value),
          updated_at: new Date().toISOString(),
        }));

        const { error } = await supabase.from("site_settings").upsert(upsertRows);
        if (error) {
          console.error("Admin PATCH settings error:", error);
          return Response.json({ error: error.message }, { status: 500 });
        }
      }
    } catch (err) {
      console.error("Supabase settings error:", err);
    }
  }

  return Response.json({ ok: true, settings: getLocalSettings() });
}
