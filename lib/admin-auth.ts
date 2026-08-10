import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export async function requireAdmin(): Promise<Response | null> {
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();

  if (!isSupabaseConfigured() || !adminEmail) {
    return Response.json(
      { error: "Admin tizimi sozlanmagan." },
      { status: 503 }
    );
  }

  const supabase = await createClient();
  const { data, error } = await supabase!.auth.getUser();

  if (error || !data.user || data.user.email?.toLowerCase() !== adminEmail) {
    return Response.json({ error: "Ruxsat berilmagan." }, { status: 401 });
  }

  return null;
}
