export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  title_uz?: string;
  title_ru?: string;
  title_en?: string;
  excerpt: string;
  description_uz?: string;
  description_ru?: string;
  description_en?: string;
  image: string;
  category: string;
  from_price?: string;
  is_active?: boolean;
  sort_order?: number;
}

const initialServices: ServiceItem[] = [
  { id: "s1", slug: "led-harflar", title: "LED Harflar", excerpt: "Har qanday turdagi yoritiladigan va hajm berilgan sifatli harflar ishlab chiqarish", image: "/img/services/led-harflar.webp", category: "LED", from_price: "250 000 so'm/m", is_active: true },
  { id: "s2", slug: "lightbox", title: "Lightbox", excerpt: "Yoritiladigan zamonaviy qutilar, panellar va fasad konstruksiyalari", image: "/img/services/lightbox.webp", category: "Lightbox", from_price: "450 000 so'm/m²", is_active: true },
  { id: "s3", slug: "banner", title: "Banner", excerpt: "Tashqi va ichki yuqori aniqlikdagi bannerlar va vinil brending", image: "/img/services/banner.webp", category: "Banner", from_price: "45 000 so'm/m²", is_active: true },
  { id: "s4", slug: "roll-up", title: "Roll Up", excerpt: "Rolap stendlar, ko'rgazma stendlari va yig'iladigan konstruksiyalar", image: "/img/services/roll-up.webp", category: "Stend", from_price: "350 000 so'm", is_active: true },
  { id: "s5", slug: "stend", title: "Stend", excerpt: "Ko‘rgazma va savdo majmualari uchun maxsus tayyorlanadigan stendlar", image: "/img/services/stend.webp", category: "Stend", from_price: "500 000 so'm", is_active: true },
  { id: "s6", slug: "avto-reklama", title: "Avto reklama", excerpt: "Avtomobillar va yuk mashinalariga maxsus plyonka va brend yopishtirish", image: "/img/services/avto-reklama.webp", category: "Avto", from_price: "150 000 so'm", is_active: true },
  { id: "s7", slug: "statuetka", title: "Statuetka", excerpt: "Akril, metal, yog'och va boshqa esdalik mukofot sovg‘alari", image: "/img/services/statuetka.webp", category: "Sovg‘a", from_price: "80 000 so'm", is_active: true },
  { id: "s8", slug: "uv-print", title: "UV Print", excerpt: "Turli materiallarga (shisha, plastik, metal) yuqori chidamli UV bosma xizmati", image: "/img/services/uv-print.webp", category: "Print", from_price: "65 000 so'm/m²", is_active: true },
];

const globalServices: ServiceItem[] = [...initialServices];

export function getLocalServices(): ServiceItem[] {
  return globalServices;
}

export function addLocalService(service: Omit<ServiceItem, "id">): ServiceItem {
  const newService: ServiceItem = {
    id: `svc-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    ...service,
    is_active: service.is_active ?? true,
  };
  globalServices.unshift(newService);
  return newService;
}

export function updateLocalService(id: string, updates: Partial<ServiceItem>) {
  const item = globalServices.find((s) => s.id === id);
  if (item) {
    Object.assign(item, updates);
  }
}

export function deleteLocalService(id: string) {
  const idx = globalServices.findIndex((s) => s.id === id);
  if (idx !== -1) {
    globalServices.splice(idx, 1);
  }
}
