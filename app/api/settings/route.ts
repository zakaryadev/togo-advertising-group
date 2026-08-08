import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { contact as fallbackContact } from "@/app/content/site-content";

export async function GET() {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      if (supabase) {
        const { data, error } = await supabase.from("site_settings").select("*");
        if (!error && data && data.length > 0) {
          const settingsObj: Record<string, string> = {};
          data.forEach((row: { key: string; value: string }) => {
            settingsObj[row.key] = row.value;
          });

          return Response.json({
            phone: settingsObj.contact_phone || fallbackContact.phone,
            phoneHref: settingsObj.contact_phone_href || fallbackContact.phoneHref,
            email: settingsObj.contact_email || fallbackContact.email,
            address: settingsObj.contact_address || fallbackContact.address,
            hours: settingsObj.contact_hours || fallbackContact.hours,
            instagram: settingsObj.social_instagram || fallbackContact.instagram,
            telegram: settingsObj.social_telegram || fallbackContact.telegram,
            youtube: settingsObj.social_youtube || fallbackContact.youtube,
          });
        }
      }
    } catch (err) {
      console.error("Public GET settings error:", err);
    }
  }

  return Response.json(fallbackContact);
}
