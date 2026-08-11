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
  { id: "s1", slug: "led-harflar", title: "LED Harflar", excerpt: "Har qanday turdagi yoritiladigan va hajm berilgan sifatli harflar ishlab chiqarish", image: "https://xzuychvpjtfdmhzwpktn.supabase.co/storage/v1/object/public/service-images/exact-service-led-harflar.jpg", category: "LED", from_price: "250 000 so'm/m", is_active: true },
  { id: "s2", slug: "lightbox", title: "Lightbox", excerpt: "Yoritiladigan zamonaviy qutilar, panellar va fasad konstruksiyalari", image: "https://xzuychvpjtfdmhzwpktn.supabase.co/storage/v1/object/public/service-images/exact-service-lightbox.jpg", category: "Lightbox", from_price: "450 000 so'm/m²", is_active: true },
  { id: "s3", slug: "banner", title: "Banner", excerpt: "Tashqi va ichki yuqori aniqlikdagi bannerlar va vinil brending", image: "https://xzuychvpjtfdmhzwpktn.supabase.co/storage/v1/object/public/service-images/exact-service-banner.jpg", category: "Banner", from_price: "45 000 so'm/m²", is_active: true },
  { id: "s4", slug: "roll-up", title: "Roll Up", excerpt: "Rolap stendlar, ko'rgazma stendlari va yig'iladigan konstruksiyalar", image: "https://xzuychvpjtfdmhzwpktn.supabase.co/storage/v1/object/public/service-images/exact-service-roll-up.jpg", category: "Stend", from_price: "350 000 so'm", is_active: true },
  { id: "s5", slug: "stend", title: "Stend", excerpt: "Ko‘rgazma va savdo majmualari uchun maxsus tayyorlanadigan stendlar", image: "https://xzuychvpjtfdmhzwpktn.supabase.co/storage/v1/object/public/service-images/exact-service-stend.jpg", category: "Stend", from_price: "500 000 so'm", is_active: true },
  { id: "s6", slug: "avto-reklama", title: "Avto reklama", excerpt: "Avtomobillar va yuk mashinalariga maxsus plyonka va brend yopishtirish", image: "https://xzuychvpjtfdmhzwpktn.supabase.co/storage/v1/object/public/service-images/exact-service-avto-reklama.jpg", category: "Avto", from_price: "150 000 so'm", is_active: true },
  { id: "s7", slug: "statuetka", title: "Statuetka", excerpt: "Akril, metal, yog'och va boshqa esdalik mukofot sovg‘alari", image: "https://xzuychvpjtfdmhzwpktn.supabase.co/storage/v1/object/public/service-images/exact-service-statuetka.jpg", category: "Sovg‘a", from_price: "80 000 so'm", is_active: true },
  { id: "s8", slug: "uv-print", title: "UV Print", excerpt: "Turli materiallarga (shisha, plastik, metal) yuqori chidamli UV bosma xizmati", image: "https://xzuychvpjtfdmhzwpktn.supabase.co/storage/v1/object/public/service-images/exact-service-uv-print.jpg", category: "Print", from_price: "65 000 so'm/m²", is_active: true },
  { id: "s9", slug: "poligrafiya", title: "Poligrafiya", excerpt: "Brendlangan bloknot, ruchka, badj va boshqa poligrafik mahsulotlar", image: "https://xzuychvpjtfdmhzwpktn.supabase.co/storage/v1/object/public/service-images/exact-service-poligrafiya.jpg", category: "Print", from_price: "30 000 so'm", is_active: true },
  { id: "s10", slug: "orakal-bosma", title: "Orakal bosma (Samokleyka)", excerpt: "Har xil yuzalarga qo'llaniladigan yuqori sifatli o'z-o'zidan yopishuvchi plyonkaga bosma", image: "https://xzuychvpjtfdmhzwpktn.supabase.co/storage/v1/object/public/service-images/exact-service-orakal-bosma.jpg", category: "Print", from_price: "50 000 so'm/m²", is_active: true },
  { id: "s11", slug: "tashqi-reklama", title: "Tashqi reklama konstruksiyalar", excerpt: "Har xil tashqi reklama konstruksiyalari: hajmli harflar, yoniq qutilar, ko'rsatgichlar", image: "https://xzuychvpjtfdmhzwpktn.supabase.co/storage/v1/object/public/service-images/exact-service-tashqi-reklama.jpg", category: "LED", from_price: "150 000 so'm", is_active: true },
  { id: "s12", slug: "minora-reklama", title: "Minora kranida reklama", excerpt: "Qurilish minoralariga katta formatli banner va brendlash xizmati", image: "https://xzuychvpjtfdmhzwpktn.supabase.co/storage/v1/object/public/service-images/exact-service-minora-reklama.jpg", category: "Banner", from_price: "500 000 so'm", is_active: true },
  { id: "s13", slug: "tablitsa", title: "Taxta va jadvallar (Tablichki)", excerpt: "Ofis, do'kon va muassasalar uchun har xil ko'rsatkich, taxta va jadvallar", image: "https://xzuychvpjtfdmhzwpktn.supabase.co/storage/v1/object/public/service-images/exact-service-tablitsa.jpg", category: "Sovg‘a", from_price: "80 000 so'm", is_active: true },
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
