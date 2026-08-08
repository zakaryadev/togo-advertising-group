import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getLocalSettings } from "@/lib/settings-store";

export async function GET() {
  const local = getLocalSettings();

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      if (supabase) {
        const { data, error } = await supabase.from("site_settings").select("*");
        if (!error && data && data.length > 0) {
          const settingsObj: Record<string, string> = { ...local };
          data.forEach((row: { key: string; value: string }) => {
            settingsObj[row.key] = row.value;
          });

          return Response.json({
            phone: settingsObj.contact_phone || local.contact_phone,
            phoneHref: settingsObj.contact_phone_href || local.contact_phone_href,
            email: settingsObj.contact_email || local.contact_email,
            address: settingsObj.contact_address || local.contact_address,
            hours: settingsObj.contact_hours || local.contact_hours,
            instagram: settingsObj.social_instagram || local.social_instagram,
            telegram: settingsObj.social_telegram || local.social_telegram,
            youtube: settingsObj.social_youtube || local.social_youtube,
          });
        }
      }
    } catch (err) {
      console.error("Public GET settings error:", err);
    }
  }

  return Response.json({
    phone: local.contact_phone,
    phoneHref: local.contact_phone_href,
    email: local.contact_email,
    address: local.contact_address,
    hours: local.contact_hours,
    instagram: local.social_instagram,
    telegram: local.social_telegram,
    youtube: local.social_youtube,
  });
}
