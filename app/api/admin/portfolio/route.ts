import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

interface PortfolioItem {
  id: string;
  title: string;
  service_type: string;
  image_url: string;
  dimensions?: string | null;
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

const mockPortfolio: PortfolioItem[] = [
  {
    id: "p1",
    title: "Hajmli Harflar va LED Fasad",
    service_type: "Tashqi reklama",
    image_url: "https://togogrouppro.uz/storage/portfolio-images/photo_2024-08-20_10-26-48%20(2).jpg",
    dimensions: "Yoritiladigan fasad harflari",
    is_featured: true,
    is_active: true,
    sort_order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: "p2",
    title: "Artel Showroom & Brending",
    service_type: "LED Harf",
    image_url: "https://togogrouppro.uz/storage/portfolio-images/photo_2024-04-21_23-12-13.jpg",
    dimensions: "Showroom fasad belgilari",
    is_featured: true,
    is_active: true,
    sort_order: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: "p3",
    title: "Litto Hotel Yoritgichlari",
    service_type: "LED Logo",
    image_url: "https://togogrouppro.uz/storage/portfolio-images/photo_2024-08-20_10-26-48.jpg",
    dimensions: "Mehmonxona fasad brendi",
    is_featured: true,
    is_active: true,
    sort_order: 3,
    created_at: new Date().toISOString(),
  },
  {
    id: "p4",
    title: "Lightme Office Lightbox",
    service_type: "Lightbox",
    image_url: "https://togogrouppro.uz/storage/portfolio-images/photo_2024-04-21_23-12-16.jpg",
    dimensions: "Ofis yoritish paneli",
    is_featured: true,
    is_active: true,
    sort_order: 4,
    created_at: new Date().toISOString(),
  },
  {
    id: "p5",
    title: "Mövenpick Fasad Reklamasi",
    service_type: "Tashqi reklama",
    image_url: "https://togogrouppro.uz/storage/portfolio-images/photo_2024-03-21_15-14-53.jpg",
    dimensions: "Premial fasad belgisi",
    is_featured: true,
    is_active: true,
    sort_order: 5,
    created_at: new Date().toISOString(),
  },
  {
    id: "p6",
    title: "Ideal Furniture Ko'rgazma Stendi",
    service_type: "Stend",
    image_url: "https://togogrouppro.uz/storage/portfolio-images/photo_2024-06-08_23-17-29.jpg",
    dimensions: "Ko'rgazma stendi va konstruksiya",
    is_featured: true,
    is_active: true,
    sort_order: 6,
    created_at: new Date().toISOString(),
  },
  {
    id: "p7",
    title: "Nest One Fasad Brending",
    service_type: "Tashqi reklama",
    image_url: "https://togogrouppro.uz/storage/portfolio-images/photo_2023-07-10_21-04-45.jpg",
    dimensions: "Binolar fasad reklamasi",
    is_featured: true,
    is_active: true,
    sort_order: 7,
    created_at: new Date().toISOString(),
  },
  {
    id: "p8",
    title: "UzAuto Motors Stendi",
    service_type: "Stend",
    image_url: "https://togogrouppro.uz/storage/portfolio-images/photo_2023-07-02_11-45-24.jpg",
    dimensions: "Kompaniya ko'rgazma burchagi",
    is_featured: true,
    is_active: true,
    sort_order: 8,
    created_at: new Date().toISOString(),
  },
  {
    id: "p9",
    title: "Korzinka Avto Reklama",
    service_type: "Avto reklama",
    image_url: "https://togogrouppro.uz/storage/portfolio-images/photo_2023-07-10_21-04-47.jpg",
    dimensions: "Avtomobillar brendingi",
    is_featured: true,
    is_active: true,
    sort_order: 9,
    created_at: new Date().toISOString(),
  },
  {
    id: "p10",
    title: "N-Clinic Reklama Konstruksiyasi",
    service_type: "Tashqi reklama",
    image_url: "https://togogrouppro.uz/storage/portfolio-images/photo_2024-06-10_11-06-45.jpg",
    dimensions: "Klinika fasad belgilari",
    is_featured: false,
    is_active: true,
    sort_order: 10,
    created_at: new Date().toISOString(),
  },
  {
    id: "p11",
    title: "Tashqi Banner va Stendlar",
    service_type: "Stend",
    image_url: "https://togogrouppro.uz/storage/portfolio-images/photo_2023-08-06_16-13-38.jpg",
    dimensions: "Promoshen stendlar",
    is_featured: false,
    is_active: true,
    sort_order: 11,
    created_at: new Date().toISOString(),
  },
  {
    id: "p12",
    title: "Savdo Markazi Brending",
    service_type: "Lightbox",
    image_url: "https://togogrouppro.uz/storage/portfolio-images/photo_2024-08-26_10-36-57.jpg",
    dimensions: "Ichki lightbox panellari",
    is_featured: false,
    is_active: true,
    sort_order: 12,
    created_at: new Date().toISOString(),
  },
  {
    id: "p13",
    title: "Akril va LED Harfli Brending",
    service_type: "LED Harf",
    image_url: "https://togogrouppro.uz/storage/portfolio-images/photo_2023-10-04_22-34-29.jpg",
    dimensions: "Akril va neon harflar",
    is_featured: false,
    is_active: true,
    sort_order: 13,
    created_at: new Date().toISOString(),
  },
  {
    id: "p14",
    title: "Sanoat Korxonasi Fasad Belgisi",
    service_type: "Tashqi reklama",
    image_url: "https://togogrouppro.uz/storage/portfolio-images/photo_2023-10-04_22-34-33.jpg",
    dimensions: "Katta hajmda yoritiladigan harf",
    is_featured: false,
    is_active: true,
    sort_order: 14,
    created_at: new Date().toISOString(),
  },
  {
    id: "p15",
    title: "Kran va Baland Binolar Reklamasi",
    service_type: "Tashqi reklama",
    image_url: "https://togogrouppro.uz/storage/portfolio-images/photo_2023-10-04_22-34-31.jpg",
    dimensions: "Baland bino va krandagi reklama",
    is_featured: false,
    is_active: true,
    sort_order: 15,
    created_at: new Date().toISOString(),
  },
];

export async function GET() {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      if (supabase) {
        const { data, error } = await supabase
          .from("portfolio")
          .select("*")
          .order("sort_order", { ascending: true })
          .order("created_at", { ascending: false });

        if (!error && data && data.length > 0) {
          return Response.json({ items: data });
        }
      }
    } catch (err) {
      console.error("Admin GET portfolio error:", err);
    }
  }

  return Response.json({ items: mockPortfolio });
}

export async function POST(request: Request) {
  let body: Partial<PortfolioItem>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Noto'g'ri so'rov" }, { status: 400 });
  }

  const { title, service_type, image_url, dimensions, is_featured } = body;
  if (!title || !service_type || !image_url) {
    return Response.json({ error: "Loyiha nomi, toifasi va rasm majburiy" }, { status: 400 });
  }

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      if (supabase) {
        const { data, error } = await supabase
          .from("portfolio")
          .insert([
            {
              title,
              service_type,
              image_url,
              dimensions: dimensions || null,
              is_featured: Boolean(is_featured),
              is_active: true,
            },
          ])
          .select()
          .single();

        if (error) {
          console.error("Admin POST portfolio error:", error);
          return Response.json({ error: error.message }, { status: 500 });
        }
        return Response.json({ ok: true, item: data });
      }
    } catch (err) {
      console.error("Supabase insert error:", err);
    }
  }

  const newItem: PortfolioItem = {
    id: `local-${Date.now()}`,
    title,
    service_type,
    image_url,
    dimensions: dimensions || null,
    is_featured: Boolean(is_featured),
    is_active: true,
    sort_order: mockPortfolio.length + 1,
    created_at: new Date().toISOString(),
  };

  return Response.json({ ok: true, item: newItem });
}

export async function PATCH(request: Request) {
  let body: Partial<PortfolioItem> & { id: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Noto'g'ri so'rov" }, { status: 400 });
  }

  const { id, title, service_type, image_url, dimensions, is_featured, is_active } = body;
  if (!id) {
    return Response.json({ error: "id majburiy" }, { status: 400 });
  }

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      if (supabase) {
        const updates: Record<string, unknown> = {};
        if (title !== undefined) updates.title = title;
        if (service_type !== undefined) updates.service_type = service_type;
        if (image_url !== undefined) updates.image_url = image_url;
        if (dimensions !== undefined) updates.dimensions = dimensions;
        if (is_featured !== undefined) updates.is_featured = is_featured;
        if (is_active !== undefined) updates.is_active = is_active;

        const { error } = await supabase.from("portfolio").update(updates).eq("id", id);
        if (error) {
          return Response.json({ error: error.message }, { status: 500 });
        }
      }
    } catch (err) {
      console.error("Supabase update error:", err);
    }
  }

  return Response.json({ ok: true, id });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return Response.json({ error: "id majburiy" }, { status: 400 });
  }

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      if (supabase) {
        const { error } = await supabase.from("portfolio").delete().eq("id", id);
        if (error) {
          return Response.json({ error: error.message }, { status: 500 });
        }
      }
    } catch (err) {
      console.error("Supabase delete error:", err);
    }
  }

  return Response.json({ ok: true, id });
}
