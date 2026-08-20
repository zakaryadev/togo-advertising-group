import Link from "next/link";
import Image from "next/image";
import {
  pageCopy,
  portfolioCategories,
  services,
  type Locale,
} from "@/data/site";
import { getDynamicPortfolioImagesByCategory } from "@/components/portfolio-images";
import PortfolioGallery from "@/components/site/portfolio-gallery";
import PortfolioCategory from "@/components/site/portfolio-category";
import LegacyHero from "@/components/hero";
import { Box, Flag, Gift, MapPinned, Monitor, PanelTop, Presentation, Signpost, Wrench } from "lucide-react";

export function Hero({ locale }: { locale: Locale }) {
  return <LegacyHero locale={locale} />;
}
export function ServicesPreview({ locale }: { locale: Locale }) {
  return (
    <section className="wrap section">
      <p className="kick">
        {locale === "uz"
          ? "XIZMATLAR"
          : locale === "ru"
            ? "УСЛУГИ"
            : "SERVICES"}
      </p>
      <h2>
        {locale === "uz"
          ? "Biz tayyorlaydigan reklama va bosma turlari"
          : locale === "ru"
            ? "Рекламные и полиграфические услуги"
            : "Advertising and print services"}
      </h2>
      <div className="cards">
        {services.map((service, index) => (
          <Link
            className="c"
            href={`/${locale}/xizmatlar/${service.slug}`}
            key={service.slug}
          >
            <span className="n">0{index + 1}</span>
            <h3>{service.title[locale]}</h3>
            <p>{service.description[locale]}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

const pageText = {
  services: {
    title: { uz: "Nima ishlab chiqaramiz", ru: "Что мы производим", en: "What we produce" },
    lead: { uz: "Har bir buyurtma bitta menejerga biriktiriladi. Maket tasdiqlanmaguncha ishlab chiqarish boshlanmaydi.", ru: "За каждым заказом закреплён один менеджер. Производство начинается только после утверждения макета.", en: "Each order has one dedicated manager. Production starts only after the layout is approved." },
  },
  events: {
    title: { uz: "Ko‘rgazma va tadbirlarni to‘liq bezaymiz", ru: "Полностью оформляем выставки и мероприятия", en: "Complete exhibition and event production" },
    lead: { uz: "CAEx Expo Centre va boshqa maydonlardagi ko‘rgazmalar, MDH davlatlaridagi forum va tadbirlar — brif olishdan tadbir tugagach demontajgacha. Bitta jamoa, bitta shartnoma, bitta javobgar.", ru: "Выставки в CAEx Expo Centre и на других площадках, форумы и мероприятия в странах СНГ — от брифа до демонтажа. Одна команда, один договор, один ответственный.", en: "Exhibitions at CAEx Expo Centre and other venues, forums and events across the CIS — from brief to dismantling, with one team and one contract." },
  },
  process: {
    title: { uz: "Buyurtma qanday harakatlanadi", ru: "Как проходит заказ", en: "How your order moves forward" },
    lead: { uz: "Ochiq va bashoratli jarayon. Har status o‘zgarishida sizga xabar keladi, maket tasdiqlanmaguncha bosma boshlanmaydi va har bosqichda javobgar aniq.", ru: "Прозрачный и предсказуемый процесс: мы сообщаем о каждом изменении статуса, не начинаем печать без утверждения макета и фиксируем ответственного на каждом этапе.", en: "A transparent, predictable process: we update you at every status change, never print before approval, and assign responsibility at every stage." },
  },
} as const;

const directionCardsData = {
  uz: [
    [PanelTop, "Obyomli harflar va yorug‘lik peshtoqlari", "Akril obyomli harflar, kontur yoritish, nuqtali diod, alyukabond bort va yorug‘lik qutilari."],
    [Wrench, "Kran va balandlik reklamasi", "Minorali kranlarga banner va setka, qurilish to‘siqlari va fasad brandmaueri. Shamol yukiga hisob va alpinist brigadasi bilan."],
    [Monitor, "Katta formatli va UV bosma", "3.2 m gacha kenglik, 1440 dpi. Banner, setka, orakal, backlit, xolst va qattiq materiallarga UV bosma."],
    [Box, "Poligrafiya va qadoqlash", "Vizitka, katalog, flayer, papka, bloknot, kalendar va qog‘oz paket — ofset va raqamli bosma bilan."],
    [Presentation, "Ko‘rgazma va tadbir ofarmleniyasi", "Stend, press-wall, roll-up, navigatsiya, brendlangan zona va suvenirlar — CAEx Expo Centre hamda MDH tadbirlari uchun."],
    [MapPinned, "Brending va navigatsiya", "Logotip, brendbuk, bino ichi navigatsiyasi, tablichka va stendlar, avtopark brendlash — manba fayllari bilan."],
  ],
  ru: [
    [PanelTop, "Объёмные буквы и световые вывески", "Акриловые объёмные буквы, контурная подсветка, точечные диоды, борт из алюкобонда и лайтбоксы."],
    [Wrench, "Реклама на кранах и высотный монтаж", "Баннеры и сетка на башенные краны, строительные заборы и брандмауэры с расчётом ветровой нагрузки."],
    [Monitor, "Широкоформатная и UV-печать", "Ширина до 3.2 м, 1440 dpi. Баннеры, сетка, оракал, бэклит, холст и прямая УФ-печать на материалах."],
    [Box, "Полиграфия и упаковка", "Визитки, каталоги, флаеры, папки, блокноты, календари и бумажные пакеты — офсетная и цифровая печать."],
    [Presentation, "Оформление выставок и событий", "Стенды, пресс-воллы, ролл-апы, навигация, брендированные зоны для мероприятий в CAEx и странах СНГ."],
    [MapPinned, "Брендинг и навигация", "Логотипы, брендбуки, внутренняя навигация, таблички и стенды, брендирование автопарка — с исходными файлами."],
  ],
  en: [
    [PanelTop, "3D letters and illuminated signage", "Acrylic 3D letters, contour lighting, point diodes, alucobond borders and lightboxes."],
    [Wrench, "Crane and high-altitude advertising", "Banners and mesh on tower cranes, construction hoardings and building wraps with wind-load engineering."],
    [Monitor, "Large-format and UV printing", "Up to 3.2 m wide, 1440 dpi. Banners, mesh, vinyl, backlit, canvas and direct UV printing on rigid materials."],
    [Box, "Print production and packaging", "Business cards, catalogues, flyers, folders, notebooks, calendars and paper bags — offset and digital."],
    [Presentation, "Exhibition and event branding", "Stands, press walls, roll-ups, wayfinding and branded merchandise for events in CAEx and the CIS."],
    [MapPinned, "Branding and wayfinding", "Logos, brand books, indoor wayfinding, signs, stands and vehicle branding — supplied with source files."],
  ],
} as const;

const serviceGroupsData = {
  uz: [
    ["Tashqi reklama", "Tom va kranga reklama", "Obyomli harf", "Yorug‘lik qutisi", "LED ekran", "Neon reklama", "Fasad reklamasi", "Navigatsiya ko‘rsatkichlari"],
    ["Bosma va ishlov", "Banner bosma", "Orakal bosma", "UV bosma", "Ekosolvent bosma", "Plotter kesish", "Lazer kesish va gravyura", "Quyoshdan himoya plyonka"],
    ["Poligrafiya", "Flayer", "Buklet", "Bloknot bosma", "Katalog", "Vizitka", "Kalendar", "Logotipli paket"],
    ["Ko‘rgazma konstruksiyalari", "Pauchok", "Roll-up", "Parus bayroq", "Press-wall", "Mobil stendlar", "Noodatiy stend va konstruksiya"],
    ["Suvenir va kiyim", "Ruchka bosma", "Krujka bosma", "Futbolka bosma", "Statuetka", "Eko-sumka", "Sovg‘a to‘plamlari", "Ish formasi"],
    ["Transport brendlash", "Avtomobil brendlash", "Avtobuslarda reklama", "Maxsus texnikada reklama"],
  ],
  ru: [
    ["Наружная реклама", "Реклама на крышах и кранах", "Объёмные буквы", "Световой короб (лайтбокс)", "LED экраны", "Неоновая реклама", "Фасадная реклама", "Навигационные указатели"],
    ["Печать и обработка", "Печать баннеров", "Печать на оракале", "УФ-печать", "Экосольвентная печать", "Плоттерная резка", "Лазерная резка и гравировка", "Солнцезащитная плёнка"],
    ["Полиграфия", "Флаеры", "Буклеты", "Печать блокнотов", "Каталоги", "Визитки", "Календари", "Пакеты с логотипом"],
    ["Выставочные конструкции", "X-баннер (Паучок)", "Roll-up", "Флаги-паруса", "Press-wall", "Мобильные стенды", "Нестандартные стенды и конструкции"],
    ["Сувениры и одежда", "Печать на ручках", "Печать на кружках", "Печать на футболках", "Статуэтки и награды", "Эко-сумки", "Подарочные наборы", "Рабочая форма"],
    ["Брендирование транспорта", "Брендирование автомобилей", "Реклама на автобусах", "Реклама на спецтехнике"],
  ],
  en: [
    ["Outdoor advertising", "Rooftop and crane advertising", "3D letters", "Lightboxes", "LED screens", "Neon advertising", "Facade advertising", "Wayfinding signs"],
    ["Printing & processing", "Banner printing", "Vinyl sticker printing", "UV printing", "Eco-solvent printing", "Plotter cutting", "Laser cutting & engraving", "Solar control film"],
    ["Print production", "Flyers", "Booklets", "Notebook printing", "Catalogues", "Business cards", "Calendars", "Branded bags"],
    ["Exhibition structures", "X-banners (Spider)", "Roll-up stands", "Sail flags", "Press walls", "Mobile stands", "Custom exhibition structures"],
    ["Merchandise & apparel", "Branded pens", "Mug printing", "T-shirt printing", "Trophies & awards", "Eco tote bags", "Gift sets", "Work uniform"],
    ["Vehicle branding", "Car branding", "Bus advertising", "Special machinery advertising"],
  ],
} as const;

export function DirectionsPage({ locale }: { locale: Locale }) {
  const copy = pageText.services;
  const directionCards = directionCardsData[locale];
  const serviceGroups = serviceGroupsData[locale];

  return (
    <section className="wrap section page reference-page">
      <p className="kick">01 — {locale === "ru" ? "Направления" : locale === "en" ? "Directions" : "Yo‘nalishlar"}</p>
      <h1>{copy.title[locale]}</h1>
      <p className="slead">{copy.lead[locale]}</p>
      <div className="cards direction-cards">
        {directionCards.map(([Icon, title, text], index) => (
          <article className="c" key={title}>
            <span className="n">0{index + 1}</span>
            <div className="ico"><Icon aria-hidden="true" /></div>
            <h2>{title}</h2>
            <p>{text}</p>
          </article>
        ))}
      </div>
      <section className="extra">
        <h2>{locale === "ru" ? "Услуги наружной рекламы" : locale === "en" ? "Outdoor advertising services" : "Tashqi reklama xizmatlari"}</h2>
        <p>{locale === "ru" ? "Более пятидесяти позиций — от вывески до сувенира. Всё на собственной базе, по одному договору и с одним менеджером." : locale === "en" ? "Over fifty items — from signage to merchandise. All are produced in-house, under one contract with one manager." : "Ellikdan ortiq pozitsiya — peshtoqdan suvenirgacha. Barchasi o‘z bazamizda, bitta shartnoma va bitta menejer bilan."}</p>
        <div className="svall">
          {serviceGroups.map(([heading, ...items]) => (
            <div className="svgrp" key={heading}>
              <h3>{heading}</h3>
              <div className="svgrid">
                {items.map((item) => (
                  <div className="sv" key={item}>
                    <Signpost aria-hidden="true" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}

const eventCardsData = {
  uz: [
    [Presentation, "Stend loyihasi va yig‘ish", "3D vizualizatsiya, konstruksiya, bosma, yig‘ish va demontaj"],
    [PanelTop, "Press-wall va foto zona", "3×3 m dan katta o‘lchamgacha, sumka bilan"],
    [Flag, "Navigatsiya va POS", "Roll-up, parus bayroq, promostoyka va ko‘rsatkichlar"],
    [Gift, "Delegatsiya to‘plami", "Brendlangan bloknot, ruchka, beydjik va sovg‘a to‘plami"],
    [Monitor, "Sahna va fon bezagi", "Prezidium, banner-fon, LED ekran ramkasi va sahna oldi bezagi"],
    [MapPinned, "Navigatsiya va ko‘rsatkichlar", "Zal sxemasi, yo‘nalish belgilari va registratsiya zonasi"],
    [Box, "Brendlangan zona va foto nuqta", "Press-wall, selfi ramka, brend devor va ko‘chma mebel"],
    [Signpost, "Mehmon to‘plami", "Beydjik, papka, bloknot, ruchka, sovg‘a va tashqi propusk"],
  ],
  ru: [
    [Presentation, "Проектирование и сборка стендов", "3D-визуализация, изготовление конструкции, печать, сборка и демонтаж"],
    [PanelTop, "Пресс-волл и фотозона", "От стандартных до размеров свыше 3×3 м, в комплекте с чехлом"],
    [Flag, "Навигация и POS-материалы", "Roll-up, флаги-паруса, промостойки и указатели"],
    [Gift, "Наборы для делегаций", "Брендированные блокноты, ручки, бейджи и сувенирные наборы"],
    [Monitor, "Оформление сцены и задника", "Президиум, баннерный задник, рамка для LED-экрана и декор сцены"],
    [MapPinned, "Навигация и указатели", "Схема зала, указатели направления и оформление зоны регистрации"],
    [Box, "Брендированная зона и фототочка", "Пресс-волл, рамка для селфи, бренд-стена и мобильная мебель"],
    [Signpost, "Наборы для гостей", "Бейджи, папки, блокноты, ручки, сувениры и пропуска"],
  ],
  en: [
    [Presentation, "Stand design and assembly", "3D visualization, structure fabrication, printing, assembly and dismantling"],
    [PanelTop, "Press wall and photo zone", "Standard to sizes over 3×3 m, with carrying bag"],
    [Flag, "Wayfinding and POS materials", "Roll-ups, sail flags, promo counters and directional signs"],
    [Gift, "Delegation gift sets", "Branded notebooks, pens, badges and souvenir gift sets"],
    [Monitor, "Stage and backdrop decoration", "Presidium, banner backdrops, LED screen framing, stage front decor"],
    [MapPinned, "Wayfinding and signage", "Hall floor plan, direction signs, registration area design"],
    [Box, "Branded area and photo spot", "Press wall, selfie frames, branded backdrop and mobile furniture"],
    [Signpost, "Guest kits", "Badges, folders, notebooks, pens, souvenirs and visitor passes"],
  ],
} as const;

export function EventsPage({ locale }: { locale: Locale }) {
  const copy = pageText.events;
  const eventCards = eventCardsData[locale];
  return (
    <section className="wrap section page reference-page">
      <p className="kick">03 — {locale === "ru" ? "Мероприятия" : locale === "en" ? "Events" : "Tadbirlar"}</p>
      <h1>{copy.title[locale]}</h1>
      <p className="slead">{copy.lead[locale]}</p>
      <div className="ev">
        {eventCards.map(([Icon, title, description]) => (
          <article className="evc" key={title}>
            <Icon aria-hidden="true" />
            <h2>{title}</h2>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

const processStepsData = {
  uz: [
    ["Brif va o‘lchov", "O‘lcham, material, muddat va byudjetni aniqlaymiz. Kerak bo‘lsa obyektga chiqib, aniq o‘lchov va foto hisobot beramiz."],
    ["Dizayn va tasdiqlash", "Maket va 3D vizualizatsiya, ikki bepul tahrir. Rang va o‘lcham prepress bosqichida tekshiriladi."],
    ["Ishlab chiqarish", "Bosma, kesish, payvandlash, yig‘ish va sifat nazorati. Materiallar sertifikat bilan topshiriladi."],
    ["Montaj va topshirish", "O‘rnatish yoki yetkazish, balandlikdagi ishlar alpinist brigadasi bilan. Kafolat, EHF va hujjatlar to‘liq beriladi."],
    ["Xizmat va kuzatuv", "Kafolat muddatida nuqsonlarni bartaraf qilamiz. Keyingi buyurtmalar uchun maket va o‘lchovlarni saqlaymiz."],
  ],
  ru: [
    ["Бриф и замер", "Определяем размер, материалы, сроки и бюджет. При необходимости выезжаем на объект, делаем точные замеры и фотоотчет."],
    ["Дизайн и согласование", "Готовим макет и 3D-визуализацию. Цвета и размеры проверяются на этапе препресса."],
    ["Производство", "Печать, раскрой, сварка, сборка и контроль качества на собственной базе."],
    ["Монтаж и сдача", "Доставка и установка, включая высотные работы бригадой альпинистов. Предоставляем гарантию и полный пакет документов."],
    ["Сервис и поддержка", "Устраняем замечания в гарантийный период, бережно храним макеты для ваших повторных заказов."],
  ],
  en: [
    ["Brief and measurement", "We specify dimensions, materials, deadlines and budget. When necessary, we visit the site for precise measurements and a photo report."],
    ["Design and approval", "We create artwork and 3D visualizations. Colors and dimensions are validated during the prepress phase."],
    ["Production", "Printing, cutting, welding, fabrication and strict quality control on our own production facility."],
    ["Installation and handover", "Delivery or on-site installation, including rope-access high-altitude work. Warranty and official documents provided."],
    ["Service and follow-up", "We resolve any defects under warranty and retain your layouts and measurements for future orders."],
  ],
} as const;

export function ProcessPage({ locale }: { locale: Locale }) {
  const copy = pageText.process;
  const processSteps = processStepsData[locale];
  return (
    <section className="wrap section page reference-page">
      <p className="kick">04 — {locale === "ru" ? "Процесс" : locale === "en" ? "Process" : "Jarayon"}</p>
      <h1>{copy.title[locale]}</h1>
      <p className="slead">{copy.lead[locale]}</p>
      <div className="steps">
        {processSteps.map(([title, description]) => (
          <article className="step" key={title}>
            <h2>{title}</h2>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export async function PortfolioPreview({
  locale,
  category,
}: {
  locale: Locale;
  category?: string;
}) {
  const portfolioImagesByCategory = await getDynamicPortfolioImagesByCategory();
  const selected =
    category && portfolioCategories.some(([key]) => key === category)
      ? category
      : undefined;

  const portfolioDetails: Record<Locale, Record<string, { description: string; chips: string[] }>> = {
    uz: {
      f1: { description: "Fasad bannerlari, bilbord polotnolari, to‘siq va panjara qoplamalari, ichki reklama.", chips: ["3.2 m kenglik · 1440 dpi", "Banner, setka, backlit", "1 ish kunida tayyor"] },
      f2: { description: "Do‘kon, restoran, klinika va biznes markaz peshtoqlari uchun yorug‘lik reklamasi.", chips: ["Akril 3–10 mm", "12 oy kafolat", "O‘lchov va montaj"] },
      f3: { description: "Minorali kran, brandmauer va fasad setkasi uchun balandlik reklamasi.", chips: ["Shamol yukiga hisob", "Alpinist brigadasi", "Demontaj xizmati"] },
      f4: { description: "Yengil avtomobil, yuk mashinasi, furgon va avtoparklarni brendlash.", chips: ["Oracal plyonka", "3–5 yil chidamli", "Avto chizmaga mos maket"] },
      f5: { description: "Roll-up, press-wall, pauchok, pop-up devor va ko‘rgazma konstruksiyalari.", chips: ["Sumkasi bilan", "5–15 daqiqada yig‘iladi", "Polotno almashtiriladi"] },
      f6: { description: "Ofis tablichkalari, ichki navigatsiya, ma’lumot stendlari va xavfsizlik belgilari.", chips: ["Akril, PVC, alyukabond", "UV bosma yoki gravyura", "Montaj bilan"] },
      f7: { description: "Vizitka, flayer, buklet, katalog, papka, bloknot, kalendar va qadoqlash.", chips: ["Laminatsiya va folga", "Tiraj bo‘yicha narx", "Maket tayyorlash"] },
      f8: { description: "Futbolka, polo, kepka, krujka, termos va korporativ sovg‘a to‘plamlari.", chips: ["DTF yoki sublimatsiya", "S dan XXL gacha", "Namuna tasdiqlash"] },
    },
    ru: {
      f1: { description: "Фасадные баннеры, полотна для билбордов, брендирование заборов, интерьерная реклама.", chips: ["Ширина 3.2 м · 1440 dpi", "Баннер, сетка, бэклит", "Готовность за 1 рабочий день"] },
      f2: { description: "Световая реклама для магазинов, ресторанов, клиник и бизнес-центров.", chips: ["Акрил 3–10 мм", "Гарантия 12 месяцев", "Замер и монтаж"] },
      f3: { description: "Высотная реклама на башенных кранах, брандмауэрах и фасадах.", chips: ["Расчёт ветровой нагрузки", "Бригада альпинистов", "Услуга демонтажа"] },
      f4: { description: "Брендирование легковых, грузовых автомобилей, фургонов и автопарков.", chips: ["Плёнка Oracal", "Стойкость 3–5 лет", "Макет по чертежам авто"] },
      f5: { description: "Roll-up, press-wall, паучки, pop-up стены и выставочные конструкции.", chips: ["С сумкой-чехлом", "Сборка за 5–15 мин", "Сменное полотно"] },
      f6: { description: "Офисные таблички, интерьерная навигация, инфостенды и знаки безопасности.", chips: ["Акрил, ПВХ, алюкобонд", "УФ-печать или гравировка", "С установкой"] },
      f7: { description: "Визитки, флаеры, буклеты, каталоги, папки, блокноты, календари и упаковка.", chips: ["Ламинация и фольга", "Скидки от тиража", "Подготовка макета"] },
      f8: { description: "Футболки, поло, кепки, кружки, термосы и корпоративные подарочные наборы.", chips: ["DTF или сублимация", "От S до XXL", "Утверждение образца"] },
    },
    en: {
      f1: { description: "Facade banners, billboard canvas, fence mesh branding, indoor graphics.", chips: ["3.2 m width · 1440 dpi", "Banner, mesh, backlit", "Ready in 1 business day"] },
      f2: { description: "Illuminated signage for shops, restaurants, clinics and business centers.", chips: ["Acrylic 3–10 mm", "12-month warranty", "Survey & installation"] },
      f3: { description: "High-altitude advertising on tower cranes, brandwalls and building facades.", chips: ["Wind load calculations", "Rope access crew", "Dismantling service"] },
      f4: { description: "Commercial fleet branding for passenger cars, vans, trucks and machinery.", chips: ["Oracal vinyl film", "3–5 years durability", "Custom vehicle blueprint fit"] },
      f5: { description: "Roll-ups, press walls, spider stands, pop-up displays and exhibition structures.", chips: ["Carrying bag included", "5–15 min assembly", "Replaceable graphics"] },
      f6: { description: "Office door plaques, indoor wayfinding, info boards and safety signs.", chips: ["Acrylic, PVC, alucobond", "UV print or engraving", "Includes mounting"] },
      f7: { description: "Business cards, flyers, booklets, catalogues, folders, notebooks and packaging.", chips: ["Lamination & foil", "Tiered volume pricing", "Artwork prep"] },
      f8: { description: "T-shirts, polos, caps, mugs, thermal bottles and corporate gift kits.", chips: ["DTF or sublimation", "Sizes S to XXL", "Sample sign-off"] },
    },
  };

  const viewAllLabel = locale === "ru" ? "Смотреть все работы →" : locale === "en" ? "View all work →" : "Barcha ishlarni ko‘rish →";

  return (
    <section className="wrap section page">
      <Link className="crumb" href={`/${locale}`}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
        {locale === "ru" ? "Главная" : locale === "en" ? "Home" : "Asosiy"}
      </Link>
      <p className="kick">02 — Portfolio</p>
      <h2>
        {locale === "uz"
          ? "Bajarilgan loyihalar"
          : locale === "ru"
            ? "Выполненные проекты"
            : "Completed projects"}
      </h2>
      <div className="pfnav">
        <Link className={`pfchip ${!selected ? "on" : ""}`} href={`/${locale}/portfolio`}>
          {locale === "uz" ? "Barchasi" : locale === "ru" ? "Все" : "All"}
        </Link>
        {portfolioCategories.map(([key, label]) => (
          <Link
            key={key}
            className={`pfchip ${selected === key ? "on" : ""}`}
            href={`/${locale}/portfolio/${key}`}
          >
            {label[locale]}
          </Link>
        ))}
      </div>
      {selected ? (
        <PortfolioCategory
          locale={locale}
          category={selected as keyof typeof portfolioImagesByCategory}
          items={portfolioImagesByCategory[selected as keyof typeof portfolioImagesByCategory]}
        />
      ) : (
        <div className="pf">
          {portfolioCategories.map(([key, label]) => {
            const details = portfolioDetails[locale][key];
            const images = portfolioImagesByCategory[key as keyof typeof portfolioImagesByCategory].slice(0, 4);
            return (
              <article className="pfb" key={key}>
                <Link className="pfh" href={`/${locale}/portfolio/${key}`}>
                  <div className="ico"><span>0{key.slice(1)}</span></div>
                  <div className="pf-copy">
                    <h3>{label[locale]}</h3>
                    <p>{details.description}</p>
                    <div className="chips">
                      {details.chips.map((chip) => <span className="chip" key={chip}>{chip}</span>)}
                    </div>
                  </div>
                  <span className="more">{viewAllLabel}</span>
                </Link>
                <div className="shots">
                  {images.map((image) => (
                    <Link
                      className="shot"
                      href={`/${locale}/portfolio/${key}`}
                      key={image.id}
                      aria-label={`${label[locale]}: ${viewAllLabel}`}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={800}
                        height={600}
                        sizes="(max-width: 700px) 50vw, 25vw"
                        unoptimized
                      />
                    </Link>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

const staticIntros: Record<Locale, Record<"narxlar" | "tadbirlar" | "jarayon" | "rekvizitlar", string>> = {
  uz: {
    narxlar: "Har bir mahsulot bo‘yicha boshlang‘ich narxlar ochiq. Buyurtma hajmi ortgani sayin birlik narxi pasayadi.",
    tadbirlar: "Brifdan tortib tadbir tugagach demontajgacha — bitta jamoa, bitta shartnoma va aniq muddat.",
    jarayon: "Har bir bosqich ochiq va tushunarli: maket tasdiqlanmaguncha ishlab chiqarish boshlanmaydi.",
    rekvizitlar: "Davlat va korporativ buyurtmalar uchun to‘liq rasmiy hujjatlar bilan ishlaymiz.",
  },
  ru: {
    narxlar: "Базовые цены открыты по каждой позиции. При увеличении объёма заказа стоимость за единицу снижается.",
    tadbirlar: "От брифа до демонтажа по окончании мероприятия — одна команда, один договор и чёткие сроки.",
    jarayon: "Каждый этап прозрачен: производство не начинается до согласования и утверждения макета.",
    rekvizitlar: "Работаем с государственными и корпоративными заказчиками по полному пакету официальных документов.",
  },
  en: {
    narxlar: "Base prices are open for every product. As order volume increases, the unit price decreases.",
    tadbirlar: "From initial brief to final dismantling after the event — one team, one contract, strict deadlines.",
    jarayon: "Every phase is clear and transparent: production never starts before artwork is approved.",
    rekvizitlar: "We work with government and corporate clients with complete official documentation.",
  },
};

const priceListData: Record<Locale, readonly [string, string, string][]> = {
  uz: [
    ["Banner, bosma bilan", "18 000", "so‘m / m²"],
    ["Orakal plyonka", "28 000", "so‘m / m²"],
    ["Obyomli harf", "7 000", "so‘m / sm"],
    ["Yorug‘lik qutisi", "1 500 000", "so‘m / m²"],
    ["Flayer A5", "300", "so‘m / dona"],
    ["Futbolka, logotip bilan", "40 000", "so‘m / dona"],
  ],
  ru: [
    ["Баннер с печатью", "18 000", "сум / м²"],
    ["Плёнка Oracal", "28 000", "сум / м²"],
    ["Объёмные буквы", "7 000", "сум / см"],
    ["Световой короб (лайтбокс)", "1 500 000", "сум / м²"],
    ["Флаер А5", "300", "сум / шт."],
    ["Футболка с логотипом", "40 000", "сум / шт."],
  ],
  en: [
    ["Banner with printing", "18,000", "UZS / m²"],
    ["Oracal vinyl sticker", "28,000", "UZS / m²"],
    ["3D letters", "7,000", "UZS / cm"],
    ["Illuminated lightbox", "1,500,000", "UZS / m²"],
    ["Flyer A5", "300", "UZS / pc."],
    ["T-shirt with logo", "40,000", "UZS / pc."],
  ],
};

const priceCatalogBox: Record<Locale, { title: string; desc: string; link: string; from: string; note: string }> = {
  uz: {
    title: "To‘liq narxlar katalogi",
    desc: "78 pozitsiya, 8 bo‘lim va tiraj bo‘yicha narxlar. Kerakli hajmni tanlang va tezkor hisob oling.",
    link: "Katalogni ochish ↗",
    from: "dan",
    note: "Narxlar so‘mda, QQSsiz. Maket, montaj va yetkazib berish alohida hisoblanadi.",
  },
  ru: {
    title: "Полный каталог цен",
    desc: "78 позиций, 8 разделов и цены по тиражам. Выберите нужный объём и получите быстрый расчёт.",
    link: "Открыть каталог ↗",
    from: "от",
    note: "Цены в сумах, без НДС. Макет, монтаж и доставка рассчитываются отдельно.",
  },
  en: {
    title: "Full price catalogue",
    desc: "78 items, 8 categories and volume tiered pricing. Select the needed quantity and get a quick estimate.",
    link: "Open catalogue ↗",
    from: "from",
    note: "Prices in UZS, excl. VAT. Layout design, installation and delivery are quoted separately.",
  },
};

const staticEventsCards: Record<Locale, readonly [string, string][]> = {
  uz: [
    ["Ko‘rgazma stendi", "Loyihalash, ishlab chiqarish va joyida yig‘ish."],
    ["Press-wall va foto zona", "Brend devori, selfi ramka va ko‘chma mebel."],
    ["Roll-up va bayroqlar", "Tadbir maydoni uchun tez yig‘iladigan konstruksiyalar."],
    ["Sahna va fon bezagi", "Banner-fon, LED ekran ramkasi va prezidium bezagi."],
    ["Navigatsiya va ko‘rsatkichlar", "Zal sxemasi, ro‘yxatdan o‘tish va yo‘nalish belgilari."],
    ["Delegatsiya uchun to‘plam", "Beydjik, papka, bloknot, ruchka va sovg‘alar."],
  ],
  ru: [
    ["Выставочный стенд", "Проектирование, производство и сборка на площадке."],
    ["Пресс-волл и фотозона", "Бренд-волл, рамка для селфи и мобильная мебель."],
    ["Roll-up и флаги", "Быстросборные конструкции для пространства мероприятий."],
    ["Оформление сцены и задника", "Баннерный задник, рамка для LED-экрана и президиум."],
    ["Навигация и указатели", "Схема зала, зона регистрации и указатели направления."],
    ["Набор для делегаций", "Бейджи, папки, блокноты, ручки и сувениры."],
  ],
  en: [
    ["Exhibition stand", "Design, fabrication and on-site installation."],
    ["Press wall and photo zone", "Brand wall, selfie frames and mobile event furniture."],
    ["Roll-ups and flags", "Quick-assembly structures for event venues."],
    ["Stage and backdrop decoration", "Banner backdrops, LED screen framing and presidium decor."],
    ["Wayfinding and signage", "Hall layout, registration area and direction signs."],
    ["Delegation gift sets", "Badges, folders, notebooks, pens and premium gifts."],
  ],
};

const staticRequisitesData: Record<Locale, {
  officialTitle: string;
  companyName: string;
  labels: { manzil: string; telefon: string; stir: string; ifut: string; hisob: string; bank: string };
  address: string;
  govTitle: string;
  govDesc: string;
  govPoints: string[];
  payTitle: string;
  payMethods: [string, string][];
}> = {
  uz: {
    officialTitle: "Rasmiy rekvizitlar",
    companyName: "«TOGO GROUP ADVERTISING» MCHJ",
    labels: { manzil: "Manzil", telefon: "Telefon", stir: "STIR", ifut: "IFUT (OKED)", hisob: "Hisob raqam", bank: "Bank" },
    address: "Toshkent shahri, Yashnobod tumani, Yashnobod MFY, 4-Aviasozlar mavzesi, 9-uy",
    govTitle: "Davlat xaridlari",
    govDesc: "Kompaniya rasmiy ro‘yxatdan o‘tgan yuridik shaxs. Shartnoma, hisob-faktura va elektron hisob-faktura bilan ishlaymiz.",
    govPoints: [
      "✓ Tijorat taklifini bir ish kunida tayyorlaymiz.",
      "✓ Muddat va kafolat shartnomada aniq belgilanadi.",
      "✓ Yuridik shaxslar uchun hisob raqam orqali to‘lov.",
    ],
    payTitle: "To‘lov usullari",
    payMethods: [
      ["Naqd pul", "Ofisda yoki yetkazib berishda, chek bilan"],
      ["Click / Payme", "Telefon orqali onlayn to‘lov"],
      ["Pul o‘tkazmasi", "Yuridik shaxslar uchun hisob raqamga, EHF bilan"],
    ],
  },
  ru: {
    officialTitle: "Официальные реквизиты",
    companyName: "ООО «TOGO GROUP ADVERTISING»",
    labels: { manzil: "Адрес", telefon: "Телефон", stir: "ИНН", ifut: "ОКЭД", hisob: "Расчётный счёт", bank: "Банк" },
    address: "г. Ташкент, Яшнабадский район, махалля Яшнабад, 4-й массив Авиасозлар, дом 9",
    govTitle: "Госзакупки",
    govDesc: "Компания является официально зарегистрированным юридическим лицом. Работаем по договорам, счетам-фактурам и ЭСФ.",
    govPoints: [
      "✓ Коммерческое предложение готовим за один рабочий день.",
      "✓ Сроки и гарантия четко фиксируются в договоре.",
      "✓ Оплата по безналичному расчету для юридических лиц.",
    ],
    payTitle: "Способы оплаты",
    payMethods: [
      ["Наличный расчёт", "В офисе или при доставке, с чеком"],
      ["Click / Payme", "Быстрая онлайн-оплата с телефона"],
      ["Банковский перевод", "На расчётный счёт юридических лиц, с ЭСФ"],
    ],
  },
  en: {
    officialTitle: "Official company details",
    companyName: "«TOGO GROUP ADVERTISING» LLC",
    labels: { manzil: "Address", telefon: "Phone", stir: "TIN (STIR)", ifut: "NACE (OKED)", hisob: "Settlement account", bank: "Bank" },
    address: "Tashkent, Yashnabad district, Yashnabad MFY, 4th Aviasozlar block, house 9",
    govTitle: "Public procurement",
    govDesc: "The company is an officially registered legal entity. We work with contracts, invoices and electronic invoicing (ESF).",
    govPoints: [
      "✓ Commercial proposal prepared within one business day.",
      "✓ Deadlines and warranty terms are strictly fixed in the contract.",
      "✓ Bank transfer settlement for corporate clients.",
    ],
    payTitle: "Payment methods",
    payMethods: [
      ["Cash payment", "At the office or upon delivery, with receipt"],
      ["Click / Payme", "Instant online mobile payment"],
      ["Bank transfer", "To corporate bank account, with official e-invoice"],
    ],
  },
};

export function StaticPage({
  locale,
  page,
}: {
  locale: Locale;
  page: "narxlar" | "tadbirlar" | "jarayon" | "rekvizitlar";
}) {
  const copy = pageCopy[page];
  const intro = staticIntros[locale][page];

  const priceBox = priceCatalogBox[locale];
  const reqData = staticRequisitesData[locale];

  const content =
    page === "narxlar" ? (
      <>
        <div className="prg">
          {priceListData[locale].map(([name, price, unit]) => (
            <article className="prc" key={name}>
              <i>{name}</i>
              <u>{priceBox.from}</u>
              <b>{price}</b>
              <span>{unit}</span>
            </article>
          ))}
        </div>
        <aside className="catbox">
          <div>
            <h3>{priceBox.title}</h3>
            <p>{priceBox.desc}</p>
          </div>
          <a href="https://price.togogroup.uz" target="_blank" rel="noreferrer">
            {priceBox.link}
          </a>
        </aside>
        <p className="prnote">{priceBox.note}</p>
      </>
    ) : page === "tadbirlar" ? (
      <div className="evg">
        {staticEventsCards[locale].map(([title, description], index) => (
          <article className="evc" key={title}>
            <b>
              0{index + 1} — {title}
            </b>
            <span>{description}</span>
          </article>
        ))}
      </div>
    ) : page === "jarayon" ? (
      <div className="steps">
        {processStepsData[locale].map(([title, description]) => (
          <article className="step" key={title}>
            <b>{title}</b>
            <p>{description}</p>
          </article>
        ))}
      </div>
    ) : (
      <div className="info">
        <article className="ib">
          <h4>{reqData.officialTitle}</h4>
          <div className="co">{reqData.companyName}</div>
          <div className="rq">
            {[
              [reqData.labels.manzil, reqData.address],
              [reqData.labels.telefon, "+998 99 000 06 02"],
              [reqData.labels.stir, "312481772"],
              [reqData.labels.ifut, "73110"],
              [reqData.labels.hisob, "2020 8000 8073 2289 6001"],
              [reqData.labels.bank, "HAMKORBANK ATB, MFO 00083"],
            ].map(([label, value]) => (
              <div key={label}>
                <span>
                  <i>{label}</i>
                  <b>{value}</b>
                </span>
              </div>
            ))}
          </div>
        </article>
        <article className="ib">
          <h4>{reqData.govTitle}</h4>
          <p>{reqData.govDesc}</p>
          <div className="ul">
            {reqData.govPoints.map((point) => (
              <div key={point}>
                <span>{point}</span>
              </div>
            ))}
          </div>
        </article>
        <article className="ib">
          <h4>{reqData.payTitle}</h4>
          <div className="pay">
            {reqData.payMethods.map(([title, description]) => (
              <div key={title}>
                <span>
                  <b>{title}</b>
                  <small>{description}</small>
                </span>
              </div>
            ))}
          </div>
        </article>
      </div>
    );

  const pageIndex = page === "narxlar" ? "04" : page === "jarayon" ? "04" : "05";
  const pageLabel =
    page === "narxlar"
      ? locale === "ru"
        ? "Цены"
        : locale === "en"
          ? "Prices"
          : "Narxlar"
      : page === "jarayon"
        ? locale === "ru"
          ? "Процесс"
          : locale === "en"
            ? "Process"
            : "Jarayon"
        : locale === "ru"
          ? "Официально"
          : locale === "en"
            ? "Official"
            : "Rasmiy";

  return (
    <section className="wrap section page">
      <Link className="crumb" href={`/${locale}`}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M15 5l-7 7 7 7" />
        </svg>
        {locale === "ru" ? "Главная" : locale === "en" ? "Home" : "Asosiy"}
      </Link>
      <p className="kick">
        {pageIndex} — {pageLabel}
      </p>
      <h1>{copy.title[locale]}</h1>
      <p className="slead">{intro}</p>
      {content}
      <Link className="back" href={`/${locale}`}>
        <span>
          ← {locale === "en" ? "Back to home" : locale === "ru" ? "На главную" : "Asosiy sahifaga qaytish"}
        </span>
      </Link>
    </section>
  );
}
