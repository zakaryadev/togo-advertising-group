export type ServiceItem = { id: string; slug: string; title: string; excerpt: string; image: string; category: string };
export type PortfolioItem = { id: string; slug: string; client: string; service: string; image: string; category: string };

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
  ["litto", "Litto Hotel", "LED Logo", "litto-hotel"], ["artel", "Artel Showroom", "LED Harf", "artel-showroom"], ["lightme", "Lightme Office", "Lightbox", "lightme-office"], ["movenpick", "Mövenpick Hotel", "LED Logo", "movenpick"], ["ideal", "Ideal Furniture", "Stend", "ideal-furniture"], ["nest", "Nest One", "Tashqi reklama", "nest-one"], ["uzauto", "UzAuto Motors", "Stend", "uzauto-motors"], ["korzinka", "Korzinka", "Avto reklama", "korzinka"], ["nclinic", "N-Clinic", "Tashqi reklama", "n-clinic"], ["wine", "Wine Time", "LED Harf", "wine-time"],
].map(([id, client, service, slug]) => ({ id, client, service, slug, category: service, image: `/img/portfolio/${slug}.webp` }));
