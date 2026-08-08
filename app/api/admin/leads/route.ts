import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import {
  getLocalLeads,
  addLocalLead,
  updateLocalLeadStatus,
  deleteLocalLead,
  LeadItem,
} from "@/lib/leads-store";

export async function GET() {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      if (supabase) {
        const { data, error } = await supabase
          .from("leads")
          .select("*")
          .order("created_at", { ascending: false });

        if (!error && data) {
          // Merge Supabase leads with local leads (deduplicated by id/phone)
          const local = getLocalLeads();
          const combinedMap = new Map<string, LeadItem>();

          data.forEach((item: LeadItem) => combinedMap.set(item.id, item));
          local.forEach((item: LeadItem) => {
            if (!combinedMap.has(item.id)) {
              combinedMap.set(item.id, item);
            }
          });

          const combined = Array.from(combinedMap.values()).sort(
            (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );

          return Response.json({ leads: combined });
        }
      }
    } catch (err) {
      console.error("Admin GET leads error:", err);
    }
  }

  return Response.json({ leads: getLocalLeads() });
}

export async function POST(request: Request) {
  let body: { name?: string; phone?: string; service?: string; message?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Noto'g'ri so'rov" }, { status: 400 });
  }

  const { name, phone, service, message } = body;
  if (!name || !phone) {
    return Response.json({ error: "Ism va telefon majburiy" }, { status: 400 });
  }

  const newLead = addLocalLead({
    name,
    phone,
    service: service || null,
    message: message || null,
  });

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      if (supabase) {
        await supabase.from("leads").insert([
          {
            name,
            phone,
            service: service || null,
            message: message || null,
          },
        ]);
      }
    } catch (err) {
      console.error("Admin POST lead error:", err);
    }
  }

  return Response.json({ ok: true, lead: newLead });
}

export async function PATCH(request: Request) {
  let body: { id?: string; status?: "new" | "contacted" | "closed" };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Noto'g'ri so'rov" }, { status: 400 });
  }

  const { id, status } = body;
  if (!id || !status) {
    return Response.json({ error: "id va status majburiy" }, { status: 400 });
  }

  updateLocalLeadStatus(id, status);

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      if (supabase) {
        const { error } = await supabase
          .from("leads")
          .update({ status })
          .eq("id", id);

        if (error) {
          console.error("Admin PATCH lead error:", error);
        }
      }
    } catch (err) {
      console.error("Supabase update error:", err);
    }
  }

  return Response.json({ ok: true, id, status });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return Response.json({ error: "id majburiy" }, { status: 400 });
  }

  deleteLocalLead(id);

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      if (supabase) {
        await supabase.from("leads").delete().eq("id", id);
      }
    } catch (err) {
      console.error("Supabase delete lead error:", err);
    }
  }

  return Response.json({ ok: true, id });
}
