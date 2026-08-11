import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { requireAdmin } from "@/lib/admin-auth";
import {
  getLocalLeads,
  addLocalLead,
  updateLocalLeadStatus,
  deleteLocalLead,
  LeadItem,
} from "@/lib/leads-store";

export async function GET() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;
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
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;
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

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      if (supabase) {
        const { data, error } = await supabase
          .from("leads")
          .insert([
            {
              name,
              phone,
              service: service || null,
              message: message || null,
            },
          ])
          .select()
          .single();

        if (error) {
          console.error("Admin POST lead error:", error);
          return Response.json({ error: error.message }, { status: 500 });
        }
        return Response.json({ ok: true, lead: data });
      }
    } catch (err) {
      console.error("Admin POST lead error:", err);
      return Response.json({ error: "Murojaatni saqlashda xatolik yuz berdi" }, { status: 500 });
    }
  }

  const newLead = addLocalLead({
    name,
    phone,
    service: service || null,
    message: message || null,
  });

  return Response.json({ ok: true, lead: newLead });
}

export async function PATCH(request: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;
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

  // Leads can live only in the local store (seed/offline data), so a Supabase
  // miss for those ids is expected, not a real failure.
  const isLocalLead = getLocalLeads().some((lead) => lead.id === id);
  updateLocalLeadStatus(id, status);

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      if (supabase) {
        const { error } = await supabase
          .from("leads")
          .update({ status })
          .eq("id", id);

        if (error && !isLocalLead) {
          console.error("Admin PATCH lead error:", error);
          return Response.json({ error: error.message }, { status: 500 });
        }
      }
    } catch (err) {
      if (!isLocalLead) {
        console.error("Supabase update error:", err);
        return Response.json({ error: "Holatni yangilashda xatolik yuz berdi" }, { status: 500 });
      }
    }
  }

  return Response.json({ ok: true, id, status });
}

export async function DELETE(request: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return Response.json({ error: "id majburiy" }, { status: 400 });
  }

  const isLocalLead = getLocalLeads().some((lead) => lead.id === id);
  deleteLocalLead(id);

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      if (supabase) {
        const { error } = await supabase.from("leads").delete().eq("id", id);
        if (error && !isLocalLead) {
          console.error("Admin DELETE lead error:", error);
          return Response.json({ error: error.message }, { status: 500 });
        }
      }
    } catch (err) {
      if (!isLocalLead) {
        console.error("Supabase delete lead error:", err);
        return Response.json({ error: "Murojaatni o'chirishda xatolik yuz berdi" }, { status: 500 });
      }
    }
  }

  return Response.json({ ok: true, id });
}
