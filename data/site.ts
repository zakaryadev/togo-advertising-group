export const locales = ["uz", "ru", "en"] as const;
export type Locale = (typeof locales)[number];
export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
export const siteUrl = "https://togogroup.uz";
export const contact = {
  phone: "+998 77 300 45 00",
  phoneHref: "tel:+998773004500",
  telegram: "https://t.me/togo_group_pro",
  instagram: "https://www.instagram.com/togo_group_pro/",
  email: "info@togogrouppro.uz",
  address: "Yashnobod MFY, 4-Aviasozlar mavzesi, 9-uy, Toshkent",
} as const;
type Copy = Record<Locale, string>;
export const t = (uz: string, ru: string, en: string): Copy => ({ uz, ru, en });
export const labels = {
  home: t("Asosiy", "Главная", "Home"),
  contact: t("Aloqa", "Контакты", "Contact"),
  request: t("Ariza qoldirish", "Оставить заявку", "Leave a request"),
} as const;
export const navigation = [
  ["yonalishlar", t("Yo'nalishlar", "Направления", "Services")],
  ["portfolio", t("Portfolio", "Портфолио", "Portfolio")],
  ["narxlar", t("Narxlar", "Цены", "Prices")],
  ["tadbirlar", t("Tadbirlar", "Мероприятия", "Events")],
  ["jarayon", t("Jarayon", "Процесс", "Process")],
  ["rekvizitlar", t("Rasmiy", "Компания", "Company")],
] as const;
export const heroCopy = {
  eyebrow: t(
    "Toshkent · Reklama uchun kompleks yechimlar",
    "Ташкент · Комплексные рекламные решения",
    "Tashkent · Complete advertising solutions",
  ),
  title1: t("Brendingizni", "Превращаем ваш бренд", "We turn your brand"),
  title2: t(
    "shaharning bir qismiga",
    "в часть города",
    "into part of the city",
  ),
  title3: t("aylantiramiz.", "", "."),
  lead: t(
    "Peshtoqdan minorali kranning uchigacha, vizitkadan ko'rgazma stendigacha — TOGO GROUP ADVERTISING brendingizni ko'rinadigan qiladi. O'z poligrafiyamiz, o'z montaj brigadamiz, Toshkentda to'liq ishlab chiqarish sikli.",
    "От вывески до вершины башенного крана, от визитки до выставочного стенда — TOGO GROUP ADVERTISING делает ваш бренд заметным. Собственная типография и монтажная бригада в Ташкенте.",
    "From a storefront sign to the top of a tower crane, from business cards to exhibition stands — TOGO GROUP ADVERTISING makes your brand visible.",
  ),
  priceCatalog: t("Narxlar katalogi", "Каталог цен", "Price catalogue"),
} as const;
export const services = [
  {
    slug: "yoruglik-harflari",
    title: t(
      "Obyomli va yorug'lik harflari",
      "Объёмные и световые буквы",
      "3D and illuminated letters",
    ),
    description: t(
      "Akril, konturli, alyukabond va diodli harflar hamda LED peshtoqlar.",
      "Акриловые, контурные, алюкобондовые и диодные буквы, LED-вывески.",
      "Acrylic, contour, aluminium composite and LED letters and signs.",
    ),
    details: t(
      "Dizayn, o'lchov, ishlab chiqarish va montajni bitta jamoa bajaradi.",
      "Одна команда выполняет дизайн, замер, производство и монтаж.",
      "One team handles design, measurement, production and installation.",
    ),
  },
  {
    slug: "kran-reklamasi",
    title: t(
      "Kran va balandlik reklamasi",
      "Реклама на кранах и высотный монтаж",
      "Crane advertising and high-rise installation",
    ),
    description: t(
      "Minorali kranlarga banner va setka reklama, injiniring va alpinist montaji.",
      "Баннеры и сетки на башенных кранах, инженерия и высотный монтаж.",
      "Banners and mesh advertising on tower cranes with engineering and rope-access installation.",
    ),
    details: t(
      "Shamol yukiga hisob, mahkamlash sxemasi va xavfsiz montaj.",
      "Расчёт ветровой нагрузки, схема креплений и безопасный монтаж.",
      "Wind-load calculation, fastening plans and safe installation.",
    ),
  },
  {
    slug: "bosma",
    title: t(
      "Katta formatli va UV bosma",
      "Широкоформатная и UV-печать",
      "Large-format and UV printing",
    ),
    description: t(
      "Banner, orakal, setka va qattiq yuzalarga sifatli bosma.",
      "Качественная печать на баннере, оракале, сетке и твёрдых поверхностях.",
      "High-quality printing for banners, vinyl, mesh and rigid surfaces.",
    ),
    details: t(
      "3.2 metrgacha kenglik, tayyorlash va obyektga montaj xizmati.",
      "Ширина до 3,2 м, подготовка и монтаж на объекте.",
      "Up to 3.2 m wide, with preparation and on-site installation.",
    ),
  },
  {
    slug: "poligrafiya",
    title: t("Poligrafiya", "Полиграфия", "Print production"),
    description: t(
      "Flayer, buklet, katalog, bloknot, kalendar va vizitkalar.",
      "Флаеры, буклеты, каталоги, блокноты, календари и визитки.",
      "Flyers, booklets, catalogues, notebooks, calendars and business cards.",
    ),
    details: t(
      "Brendingizga mos maket va bosma mahsulotlar.",
      "Макеты и печатная продукция в стиле вашего бренда.",
      "Print materials and layouts aligned with your brand.",
    ),
  },
  {
    slug: "stendlar",
    title: t(
      "Ko'rgazma va mobil stendlar",
      "Выставочные и мобильные стенды",
      "Exhibition and mobile stands",
    ),
    description: t(
      "Press-wall, roll-up, parus bayroqlar va ko'rgazma pavilyonlari.",
      "Press-wall, roll-up, флаги-паруса и выставочные павильоны.",
      "Press walls, roll-ups, sail flags and exhibition pavilions.",
    ),
    details: t(
      "Tadbir uchun ishlab chiqarish, logistika va yig'ish.",
      "Производство, логистика и сборка для мероприятий.",
      "Production, logistics and assembly for events.",
    ),
  },
  {
    slug: "avto-brending",
    title: t(
      "Avto reklama va brendlash",
      "Авто-реклама и брендинг",
      "Vehicle advertising and branding",
    ),
    description: t(
      "Yengil, yuk avtomobillari va maxsus texnikani vinil bilan brendlash.",
      "Брендирование легковых, грузовых автомобилей и спецтехники винилом.",
      "Vinyl branding for passenger cars, trucks and special equipment.",
    ),
    details: t(
      "Dizayn, chop etish va tekis yopishtirish xizmati.",
      "Дизайн, печать и аккуратная оклейка.",
      "Design, printing and precise installation.",
    ),
  },
] as const;
export const portfolioCategories = [
  [
    "f1",
    t(
      "Banner va katta formatli bosma",
      "Баннеры и широкоформатная печать",
      "Banners and large-format printing",
    ),
  ],
  [
    "f2",
    t(
      "Obyomli harflar va peshtoq",
      "Объёмные буквы и вывески",
      "3D letters and signage",
    ),
  ],
  [
    "f3",
    t(
      "Kran va balandlik reklamasi",
      "Реклама на кранах и высотная реклама",
      "Crane and high-rise advertising",
    ),
  ],
  [
    "f4",
    t(
      "Avto reklama va avtopark brendlash",
      "Авто-реклама и брендинг автопарка",
      "Vehicle advertising and fleet branding",
    ),
  ],
  [
    "f5",
    t(
      "Stend va ko'rgazma konstruksiyalari",
      "Стенды и выставочные конструкции",
      "Stands and exhibition structures",
    ),
  ],
  [
    "f6",
    t(
      "Tablichka, stend va navigatsiya",
      "Таблички, стенды и навигация",
      "Plaques, stands and wayfinding",
    ),
  ],
  [
    "f7",
    t(
      "Poligrafiya va qadoqlash",
      "Полиграфия и упаковка",
      "Print production and packaging",
    ),
  ],
  [
    "f8",
    t(
      "Suvenir va brendlangan kiyim",
      "Сувениры и брендированная одежда",
      "Merchandise and branded apparel",
    ),
  ],
] as const;
export const pageCopy = {
  narxlar: {
    title: t(
      "Ochiq narxlar va tezkor hisob",
      "Прозрачные цены и быстрый расчёт",
      "Transparent pricing and quick estimates",
    ),
    lead: t(
      "Aniq narx material, o'lcham va montaj sharoitiga ko'ra hisoblanadi.",
      "Точная стоимость зависит от материала, размера и условий монтажа.",
      "Pricing depends on material, size and installation conditions.",
    ),
  },
  tadbirlar: {
    title: t(
      "Tadbirlar uchun to'liq bezatish",
      "Полное оформление мероприятий",
      "Complete event branding",
    ),
    lead: t(
      "Ko'rgazma, forum va korporativ tadbirlar uchun to'liq ishlab chiqarish.",
      "Полное производство для выставок, форумов и корпоративных мероприятий.",
      "Complete production for exhibitions, forums and corporate events.",
    ),
  },
  jarayon: {
    title: t(
      "G'oyadan montajgacha",
      "От идеи до монтажа",
      "From idea to installation",
    ),
    lead: t(
      "Brief, o'lchov, dizayn, ishlab chiqarish, logistika va montaj.",
      "Бриф, замер, дизайн, производство, логистика и монтаж.",
      "Brief, measurement, design, production, logistics and installation.",
    ),
  },
  rekvizitlar: {
    title: t("Kompaniya rekvizitlari", "Реквизиты компании", "Company details"),
    lead: t(
      "Shartnoma, hisob-faktura va EHF bilan ishlaydigan rasmiy yuridik shaxs.",
      "Официальное юридическое лицо: договоры, счета и ЭСФ.",
      "A registered legal entity working with contracts, invoices and e-invoices.",
    ),
  },
  aloqa: {
    title: t(
      "Loyihangizni muhokama qilaylik",
      "Обсудим ваш проект",
      "Let’s discuss your project",
    ),
    lead: t(
      "Formani to'ldiring — menejerimiz siz bilan bog'lanadi.",
      "Заполните форму — менеджер свяжется с вами.",
      "Complete the form and our manager will contact you.",
    ),
  },
} as const;
