import { contact as fallbackContact } from "@/app/content/site-content";

const localSettings: Record<string, string> = {
  contact_phone: fallbackContact.phone,
  contact_phone_href: fallbackContact.phoneHref,
  contact_email: fallbackContact.email,
  contact_address: fallbackContact.address,
  contact_hours: fallbackContact.hours,
  social_instagram: fallbackContact.instagram,
  social_telegram: fallbackContact.telegram,
  social_youtube: fallbackContact.youtube,
};

export function getLocalSettings(): Record<string, string> {
  return localSettings;
}

export function updateLocalSettings(newSettings: Record<string, string>) {
  Object.entries(newSettings).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      localSettings[key] = String(value);
    }
  });
}
