import type { Locale } from "@/data/site";

export type PortfolioCategoryKey = "f1" | "f2" | "f3" | "f4" | "f5" | "f6" | "f7" | "f8";
export type PortfolioSubcategory = { key: string; label: Record<Locale, string> };
const item = (key: string, uz: string, ru: string, en: string): PortfolioSubcategory => ({
  key,
  label: { uz, ru, en },
});

export const portfolioSubcategories: Record<PortfolioCategoryKey, readonly PortfolioSubcategory[]> = {
  f1: [
    item("baner", "Banner bosma", "Печать баннеров", "Banner printing"),
    item("setka", "Setka", "Баннерная сетка", "Mesh banner"),
    item("backlit", "Backlit", "Бэклит (Backlit)", "Backlit"),
    item("orakal", "Orakal bosma", "Печать на оракале", "Vinyl sticker printing"),
    item("tumanka", "Tumanka va plyonka", "Матовая и защитная плёнка", "Frosted & protective film"),
    item("uv", "UV bosma", "УФ-печать", "UV printing"),
    item("tosiq", "Qurilish to‘sig‘i", "Строительные заборы", "Construction hoarding"),
  ],
  f2: [
    item("harf", "Obyomli harf", "Объёмные буквы", "3D letters"),
    item("kontrajur", "Kontrajur yoritish", "Контражурная подсветка", "Halo illumination"),
    item("quti", "Yorug‘lik qutisi", "Световой короб (лайтбокс)", "Lightbox"),
    item("neon", "Neon reklama", "Неоновая реклама", "Neon signs"),
    item("led", "LED ekran", "LED экраны", "LED screens"),
    item("qator", "Yuguruvchi qator", "Бегущая строка", "Running text display"),
    item("fasad", "Fasad (Alyukabond)", "Фасад (Алюкобонд)", "Facade (Alucobond)"),
    item("tom", "Tom ustiga logotip", "Крышные установки", "Rooftop logo signage"),
  ],
  f3: [
    item("kran", "Kran reklamasi", "Реклама на кранах", "Crane advertising"),
    item("brandmauer", "Brandmauer", "Брандмауэр", "Brandwall"),
    item("setka", "Fasad setkasi", "Фасадная сетка", "Facade mesh"),
    item("tosiq", "Qurilish to‘sig‘i", "Строительные заборы", "Construction hoarding"),
    item("tom", "Tom ustiga logotip", "Крышные конструкции", "Rooftop structure"),
  ],
  f4: [
    item("yengil", "Yengil avtomobil", "Легковые автомобили", "Passenger cars"),
    item("yuk", "Yuk mashina va furgon", "Грузовики и фургоны", "Trucks & vans"),
    item("avtobus", "Avtobus", "Автобусы", "Buses"),
    item("texnika", "Maxsus texnika", "Спецтехника", "Special machinery"),
    item("perfo", "Oyna perforatsiyasi", "Перфорированная плёнка", "Perforated window film"),
    item("tonirovka", "Tonirovka", "Тонировка", "Window tinting"),
  ],
  f5: [
    item("rollup", "Roll Up", "Roll Up стенды", "Roll-up stands"),
    item("popup", "Pop Up", "Pop Up стенды", "Pop-up displays"),
    item("promo", "Promo stol", "Промостойки", "Promo counters"),
    item("pauchok", "Pauchok", "Паучок (X-banner)", "X-banner spider stands"),
    item("shtender", "Shtender", "Штендеры", "A-frame sidewalk signs"),
    item("stella", "Stella", "Стеллы и пилоны", "Pylons & totems"),
    item("vistavka", "Ko‘rgazma stendi", "Выставочные стенды", "Exhibition stands"),
    item("presswall", "Press-wall", "Пресс-волл (Press-wall)", "Press walls"),
    item("parus", "Parus bayroq", "Флаги-паруса", "Sail flags"),
  ],
  f6: [
    item("ofis", "Ofis tablichkasi", "Офисные таблички", "Office plaques"),
    item("navigatsiya", "Navigatsiya", "Навигационные указатели", "Wayfinding signs"),
    item("stend", "Ma’lumot stendi", "Информационные стенды", "Information boards"),
    item("xavfsizlik", "Xavfsizlik belgilari", "Знаки безопасности", "Safety signs"),
    item("beydjik", "Nomercha va beydjik", "Номерки и бейджи", "Tokens and badges"),
    item("gravyura", "Lazer gravyura", "Лазерная гравировка", "Laser engraving"),
  ],
  f7: [
    item("bloknot", "Bloknot", "Блокноты", "Notebooks"),
    item("kubarik", "Kubarik", "Кубарики", "Note cubes"),
    item("vizitka", "Vizitka", "Визитки", "Business cards"),
    item("flayer", "Flayer", "Флаеры", "Flyers"),
    item("buklet", "Buklet", "Буклеты", "Booklets / Leaflets"),
    item("katalog", "Katalog", "Каталоги", "Catalogues"),
    item("kalendar", "Kalendar", "Календари", "Calendars"),
    item("papka", "Papka", "Папки", "Folders"),
    item("paket", "Logotipli paket", "Пакеты с логотипом", "Branded bags"),
    item("blank", "Blank va konvert", "Бланки и конверты", "Letterheads & envelopes"),
  ],
  f8: [
    item("bokal", "Bokal va krujka", "Кружки и бокалы", "Mugs & glassware"),
    item("termos", "Termos", "Термосы и термокружки", "Thermoses & tumblers"),
    item("ruchka", "Ruchka", "Ручки с логотипом", "Branded pens"),
    item("bloknot", "Bloknot", "Блокноты", "Notebooks"),
    item("statuetka", "Statuetka va mukofotlar", "Статуэтки и награды", "Trophies & awards"),
    item("futbolka", "Futbolka va kiyim", "Футболки и текстиль", "T-shirts & apparel"),
    item("kepka", "Kepka", "Кепки с логотипом", "Branded caps"),
    item("sumka", "Eko-sumka", "Эко-сумки с печатью", "Eco tote bags"),
    item("fleshka", "Logotipli fleshka", "Флешки с логотипом", "Branded USB flash drives"),
    item("soyabon", "Soyabon", "Зонты с логотипом", "Branded umbrellas"),
    item("kaska", "Qurilish kaskasi", "Строительные каски", "Hard hats"),
    item("forma", "Ish formasi", "Рабочая униформа", "Work uniform"),
    item("toplam", "Sovg‘a to‘plami", "Подарочные наборы", "Gift sets"),
  ],
};

export function inferPortfolioSubcategory(category: PortfolioCategoryKey, source: string) {
  const file = source.toLowerCase();
  if (category === "f8") {
    if (file.includes("thermos")) return "termos";
    if (file.includes("tshirt") || file.includes("polo") || file.includes("dtf")) return "futbolka";
    // Visually audited awards: acrylic trophies, plaques and commemorative plates.
    if (/suvenir[-_]new[-_](2|3|4|5|6|7|8|9|11|12|14|16|17|18|20|21|22|23|24|25|26|27)\.webp/.test(file)) return "statuetka";
    return "toplam";
  }
  if (category === "f5") {
    if (file.includes("rollup")) return "rollup";
    if (file.includes("xbanner")) return "pauchok";
    if (file.includes("flags")) return "parus";
    if (file.includes("shtender")) return "shtender";
    return "vistavka";
  }
  if (category === "f6") return file.includes("gravyura") ? "gravyura" : file.includes("beydj") ? "beydjik" : "ofis";
  if (category === "f4") return file.includes("bus") || file.includes("avtobus") ? "avtobus" : file.includes("yuk") || file.includes("furgon") ? "yuk" : "yengil";
  return ({ f1: "baner", f2: "harf", f3: "kran", f7: "bloknot" } as const)[category];
}
