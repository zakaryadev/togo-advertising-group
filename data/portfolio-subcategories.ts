import type { Locale } from "@/data/site";

export type PortfolioCategoryKey = "f1" | "f2" | "f3" | "f4" | "f5" | "f6" | "f7" | "f8";
export type PortfolioSubcategory = { key: string; label: Record<Locale, string> };
const label = (uz: string, ru = uz, en = uz): Record<Locale, string> => ({ uz, ru, en });

export const portfolioSubcategories: Record<PortfolioCategoryKey, readonly PortfolioSubcategory[]> = {
  f1: ["Baner bosma", "Setka", "Backlit", "Orakal bosma", "Tumanka va plyonka", "UV bosma", "Qurilish to‘sig‘i"].map((value, index) => ({ key: ["baner", "setka", "backlit", "orakal", "tumanka", "uv", "tosiq"][index], label: label(value) })),
  f2: ["Obyomli harf", "Kontrajur yoritish", "Yorug‘lik qutisi", "Neon reklama", "LED ekran", "Yuguruvchi qator", "Fasad (Alyukabond)", "Tom ustiga logotip"].map((value, index) => ({ key: ["harf", "kontrajur", "quti", "neon", "led", "qator", "fasad", "tom"][index], label: label(value) })),
  f3: ["Kran reklamasi", "Brandmauer", "Fasad setkasi", "Qurilish to‘sig‘i", "Tom ustiga logotip"].map((value, index) => ({ key: ["kran", "brandmauer", "setka", "tosiq", "tom"][index], label: label(value) })),
  f4: ["Yengil avtomobil", "Yuk mashina va furgon", "Avtobus", "Maxsus texnika", "Oyna perforatsiyasi", "Tonirovka"].map((value, index) => ({ key: ["yengil", "yuk", "avtobus", "texnika", "perfo", "tonirovka"][index], label: label(value) })),
  f5: ["Roll Up", "Pop Up", "Promo stol", "Pauchok", "Shtender", "Stella", "Ko‘rgazma stendi", "Press-wall", "Parus bayroq"].map((value, index) => ({ key: ["rollup", "popup", "promo", "pauchok", "shtender", "stella", "vistavka", "presswall", "parus"][index], label: label(value) })),
  f6: ["Ofis tablichkasi", "Navigatsiya", "Ma’lumot stendi", "Xavfsizlik belgilari", "Nomercha va beydjik", "Lazer gravyura"].map((value, index) => ({ key: ["ofis", "navigatsiya", "stend", "xavfsizlik", "beydjik", "gravyura"][index], label: label(value) })),
  f7: ["Bloknot", "Kubarik", "Vizitka", "Flayer", "Buklet", "Katalog", "Kalendar", "Papka", "Logotipli paket", "Blank va konvert"].map((value, index) => ({ key: ["bloknot", "kubarik", "vizitka", "flayer", "buklet", "katalog", "kalendar", "papka", "paket", "blank"][index], label: label(value) })),
  f8: ["Bokal (sublimat / soft touch)", "Termos", "Ruchka", "Bloknot", "Statuetka", "Futbolka va sweatshirt", "Kepka", "Eko-sumka", "Logotipli fleshka", "Soyabon", "Qurilish kaskasi", "Ish formasi", "Sovg‘a to‘plami"].map((value, index) => ({ key: ["bokal", "termos", "ruchka", "bloknot", "statuetka", "futbolka", "kepka", "sumka", "fleshka", "soyabon", "kaska", "forma", "toplam"][index], label: label(value) })),
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
