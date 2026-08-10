import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { requireAdmin } from "@/lib/admin-auth";
import {
  getLocalServices,
  addLocalService,
  updateLocalService,
  deleteLocalService,
  ServiceItem,
} from "@/lib/services-store";

export async function GET() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      if (supabase) {
        const { data, error } = await supabase
          .from("services")
          .select("*")
          .order("sort_order", { ascending: true });

        if (!error && data && data.length > 0) {
          const mappedData: ServiceItem[] = data.map((item: any) => ({
            id: item.id,
            slug: item.slug || item.id,
            title: item.title_uz || item.title || "",
            excerpt: item.description_uz || item.excerpt || "",
            image: item.image || "/img/services/led-harflar.webp",
            category: item.category || "LED",
            from_price: item.from_price || "",
            is_active: item.is_active ?? true,
            sort_order: item.sort_order ?? 0,
          }));

          return Response.json({ services: mappedData });
        }
      }
    } catch (err) {
      console.error("Admin GET services error:", err);
    }
  }

  return Response.json({ services: getLocalServices() });
}

export async function POST(request: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;
  let body: Partial<ServiceItem>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Noto'g'ri so'rov" }, { status: 400 });
  }

  const { title, excerpt, image, category, from_price } = body;
  if (!title) {
    return Response.json({ error: "Xizmat nomi majburiy" }, { status: 400 });
  }

  const slug = title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "") || `service-${Date.now()}`;

  const newService = addLocalService({
    slug,
    title,
    excerpt: excerpt || "",
    image: image || "/img/services/led-harflar.webp",
    category: category || "LED",
    from_price: from_price || "",
    is_active: true,
  });

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      if (supabase) {
        await supabase.from("services").insert([
          {
            slug,
            title_uz: title,
            title_ru: title,
            title_en: title,
            description_uz: excerpt || "",
            description_ru: excerpt || "",
            description_en: excerpt || "",
            image: image || "/img/services/led-harflar.webp",
            category: category || "LED",
            from_price: from_price || "",
            is_active: true,
          },
        ]);
      }
    } catch (err) {
      console.error("Admin POST service error:", err);
    }
  }

  return Response.json({ ok: true, service: newService });
}

export async function PATCH(request: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;
  let body: { id?: string } & Partial<ServiceItem>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Noto'g'ri so'rov" }, { status: 400 });
  }

  const { id, ...updates } = body;
  if (!id) {
    return Response.json({ error: "id majburiy" }, { status: 400 });
  }

  updateLocalService(id, updates);

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      if (supabase) {
        const dbUpdates: Record<string, unknown> = {};
        if (updates.title) {
          dbUpdates.title_uz = updates.title;
          dbUpdates.title_ru = updates.title;
          dbUpdates.title_en = updates.title;
        }
        if (updates.excerpt) {
          dbUpdates.description_uz = updates.excerpt;
          dbUpdates.description_ru = updates.excerpt;
          dbUpdates.description_en = updates.excerpt;
        }
        if (updates.image !== undefined) dbUpdates.image = updates.image;
        if (updates.category !== undefined) dbUpdates.category = updates.category;
        if (updates.from_price !== undefined) dbUpdates.from_price = updates.from_price;
        if (updates.is_active !== undefined) dbUpdates.is_active = updates.is_active;

        await supabase.from("services").update(dbUpdates).eq("id", id);
      }
    } catch (err) {
      console.error("Admin PATCH service error:", err);
    }
  }

  return Response.json({ ok: true, id, updates });
}

export async function DELETE(request: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return Response.json({ error: "id majburiy" }, { status: 400 });
  }

  deleteLocalService(id);

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      if (supabase) {
        await supabase.from("services").delete().eq("id", id);
      }
    } catch (err) {
      console.error("Admin DELETE service error:", err);
    }
  }

  return Response.json({ ok: true, id });
}
