export type ServiceItem = { id: string; slug: string; title: string; excerpt: string; image: string; category: string };
export type PortfolioItem = { id: string; slug: string; client: string; service: string; image: string; category: string };
export type Contact = { phone: string; phoneHref: string; email: string; address: string; hours: string; instagram: string; telegram: string; youtube: string };

export const contact: Contact = {
  phone: "+998 77 300 45 00",
  phoneHref: "tel:+998773004500",
  email: "info@togogrouppro.uz",
  address: "Toshkent, Chilonzor tumani",
  hours: "Dushanba — Juma, 09:00 — 19:00 | Shanba, 09:00 — 18:30",
  instagram: "https://www.instagram.com/reklama_togo_group/",
  telegram: "https://t.me/togo_group_pro",
  youtube: "https://www.youtube.com/@togogrouppro",
};

export const services: ServiceItem[] = [
  { id: "led", slug: "led-harflar", title: "LED Harflar", excerpt: "Har qanday turdagi yoritiladigan harflar", image: "/img/services/led-harflar.webp", category: "LED" },
  { id: "lightbox", slug: "lightbox", title: "Lightbox", excerpt: "Yoritiladigan qutilar va panellar", image: "/img/services/lightbox.webp", category: "Lightbox" },
  { id: "banner", slug: "banner", title: "Banner", excerpt: "Tashqi va ichki banner ishlab chiqarish", image: "/img/services/banner.webp", category: "Banner" },
  { id: "rollup", slug: "roll-up", title: "Roll Up", excerpt: "Rolap stendlar va konstruksiyalar", image: "/img/services/roll-up.webp", category: "Stend" },
  { id: "stend", slug: "stend", title: "Stend", excerpt: "Ko‘rgazma va savdo stendlar", image: "/img/services/stend.webp", category: "Stend" },
  { id: "auto", slug: "avto-reklama", title: "Avto reklama", excerpt: "Avtomobillarga brend va reklama yopishtirish", image: "/img/services/avto-reklama.webp", category: "Avto" },
  { id: "award", slug: "statuetka", title: "Statuetka", excerpt: "Akril, metal va boshqa esdalik sovg‘alar", image: "/img/services/statuetka.webp", category: "Sovg‘a" },
  { id: "uv", slug: "uv-print", title: "UV Print", excerpt: "Turli materiallarga UV bosma xizmati", image: "/img/services/uv-print.webp", category: "Print" },
];

export const portfolio: PortfolioItem[] = [
  { id: "p1", slug: "p1", client: "Hajmli Harflar va LED Fasad", service: "Tashqi reklama", category: "Tashqi reklama", image: "https://togogrouppro.uz/storage/portfolio-images/photo_2024-08-20_10-26-48%20(2).jpg" },
  { id: "p2", slug: "p2", client: "Artel Showroom & Brending", service: "LED Harf", category: "LED Harf", image: "https://togogrouppro.uz/storage/portfolio-images/photo_2024-04-21_23-12-13.jpg" },
  { id: "p3", slug: "p3", client: "Litto Hotel Yoritgichlari", service: "LED Logo", category: "LED Logo", image: "https://togogrouppro.uz/storage/portfolio-images/photo_2024-08-20_10-26-48.jpg" },
  { id: "p4", slug: "p4", client: "Lightme Office Lightbox", service: "Lightbox", category: "Lightbox", image: "https://togogrouppro.uz/storage/portfolio-images/photo_2024-04-21_23-12-16.jpg" },
  { id: "p5", slug: "p5", client: "Mövenpick Fasad Reklamasi", service: "Tashqi reklama", category: "Tashqi reklama", image: "https://togogrouppro.uz/storage/portfolio-images/photo_2024-03-21_15-14-53.jpg" },
  { id: "p6", slug: "p6", client: "Ideal Furniture Stendi", service: "Stend", category: "Stend", image: "https://togogrouppro.uz/storage/portfolio-images/photo_2024-06-08_23-17-29.jpg" },
  { id: "p7", slug: "p7", client: "Nest One Fasad Brending", service: "Tashqi reklama", category: "Tashqi reklama", image: "https://togogrouppro.uz/storage/portfolio-images/photo_2023-07-10_21-04-45.jpg" },
  { id: "p8", slug: "p8", client: "UzAuto Motors Stendi", service: "Stend", category: "Stend", image: "https://togogrouppro.uz/storage/portfolio-images/photo_2023-07-02_11-45-24.jpg" },
  { id: "p9", slug: "p9", client: "Korzinka Avto Reklama", service: "Avto reklama", category: "Avto reklama", image: "https://togogrouppro.uz/storage/portfolio-images/photo_2023-07-10_21-04-47.jpg" },
  { id: "p10", slug: "p10", client: "N-Clinic Reklama", service: "Tashqi reklama", category: "Tashqi reklama", image: "https://togogrouppro.uz/storage/portfolio-images/photo_2024-06-10_11-06-45.jpg" },
  { id: "p11", slug: "p11", client: "Tashqi Banner va Stendlar", service: "Stend", category: "Stend", image: "https://togogrouppro.uz/storage/portfolio-images/photo_2023-08-06_16-13-38.jpg" },
  { id: "p12", slug: "p12", client: "Savdo Markazi Brending", service: "Lightbox", category: "Lightbox", image: "https://togogrouppro.uz/storage/portfolio-images/photo_2024-08-26_10-36-57.jpg" },
  { id: "p13", slug: "p13", client: "Akril va LED Harflar", service: "LED Harf", category: "LED Harf", image: "https://togogrouppro.uz/storage/portfolio-images/photo_2023-10-04_22-34-29.jpg" },
  { id: "p14", slug: "p14", client: "Sanoat Korxonasi Fasad", service: "Tashqi reklama", category: "Tashqi reklama", image: "https://togogrouppro.uz/storage/portfolio-images/photo_2023-10-04_22-34-33.jpg" },
  { id: "p15", slug: "p15", client: "Kran va Baland Bino Reklamasi", service: "Tashqi reklama", category: "Tashqi reklama", image: "https://togogrouppro.uz/storage/portfolio-images/photo_2023-10-04_22-34-31.jpg" },
];
