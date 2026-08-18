import Link from "next/link";
import Image from "next/image";
import {
  pageCopy,
  portfolioCategories,
  services,
  type Locale,
} from "@/data/site";
import { portfolioImagesByCategory } from "@/components/portfolio-images";
import PortfolioGallery from "@/components/site/portfolio-gallery";
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
  services: { title: { uz: "Nima ishlab chiqaramiz", ru: "Что мы производим", en: "What we produce" }, lead: { uz: "Har bir buyurtma bitta menejerga biriktiriladi. Maket tasdiqlanmaguncha ishlab chiqarish boshlanmaydi.", ru: "За каждым заказом закреплён один менеджер. Производство начинается только после утверждения макета.", en: "Each order has one dedicated manager. Production starts only after the layout is approved." } },
  events: { title: { uz: "Ko‘rgazma va tadbirlarni to‘liq ofarmlaymiz", ru: "Полностью оформляем выставки и мероприятия", en: "Complete exhibition and event production" }, lead: { uz: "CAEx Expo Centre va boshqa maydonlardagi ko‘rgazmalar, MDH davlatlaridagi forum va tadbirlar — brif olishdan tadbir tugagach demontajgacha. Bitta jamoa, bitta shartnoma, bitta javobgar.", ru: "Выставки в CAEx Expo Centre и на других площадках, форумы и мероприятия в странах СНГ — от брифа до демонтажа. Одна команда, один договор, один ответственный.", en: "Exhibitions at CAEx Expo Centre and other venues, forums and events across the CIS — from brief to dismantling, with one team and one contract." } },
  process: { title: { uz: "Buyurtma qanday harakatlanadi", ru: "Как проходит заказ", en: "How your order moves forward" }, lead: { uz: "Ochiq va bashoratli jarayon. Har status o‘zgarishida sizga xabar keladi, maket tasdiqlanmaguncha bosma boshlanmaydi va har bosqichda javobgar aniq.", ru: "Прозрачный и предсказуемый процесс: мы сообщаем о каждом изменении статуса, не начинаем печать без утверждения макета и фиксируем ответственного на каждом этапе.", en: "A transparent, predictable process: we update you at every status change, never print before approval, and assign responsibility at every stage." } },
} as const;

const directionCards = [
  [PanelTop, "Obyomli harflar va yorug‘lik peshtoqlari", "Akril obyomli harflar, kontur yoritish, nuqtali diod, alyukabond bort va yorug‘lik qutilari."],
  [Wrench, "Kran va balandlik reklamasi", "Minorali kranlarga banner va setka, qurilish to‘siqlari va fasad brandmaueri. Shamol yukiga hisob va alpinist brigadasi bilan."],
  [Monitor, "Katta formatli va UV bosma", "3.2 m gacha kenglik, 1440 dpi. Banner, setka, orakal, backlit, xolst va qattiq materiallarga UV bosma."],
  [Box, "Poligrafiya va qadoqlash", "Vizitka, katalog, flayer, papka, bloknot, kalendar va qog‘oz paket — ofset va raqamli bosma bilan."],
  [Presentation, "Ko‘rgazma va tadbir ofarmleniyasi", "Stend, press-wall, roll-up, navigatsiya, brendlangan zona va suvenirlar — CAEx Expo Centre hamda MDH tadbirlari uchun."],
  [MapPinned, "Brending va navigatsiya", "Logotip, brendbuk, bino ichi navigatsiyasi, tablichka va stendlar, avtopark brendlash — manba fayllari bilan."],
] as const;

const serviceGroups = [["Tashqi reklama", "Tom va kranga reklama", "Obyomli harf", "Yorug‘lik qutisi", "LED ekran", "Neon reklama", "Fasad reklamasi", "Navigatsiya ko‘rsatkichlari"], ["Bosma va ishlov", "Banner bosma", "Orakal bosma", "UV bosma", "Ekosolvent bosma", "Plotter kesish", "Lazer kesish va gravyura", "Quyoshdan himoya plyonka"], ["Poligrafiya", "Flayer", "Buklet", "Bloknot bosma", "Katalog", "Vizitka", "Kalendar", "Logotipli paket"], ["Ko‘rgazma konstruksiyalari", "Pauchok", "Roll-up", "Parus bayroq", "Press-wall", "Mobil stendlar", "Noodatiy stend va konstruksiya"], ["Suvenir va kiyim", "Ruchka bosma", "Krujka bosma", "Futbolka bosma", "Statuetka", "Eko-sumka", "Sovg‘a to‘plamlari", "Ish formasi"], ["Transport brendlash", "Avtomobil brendlash", "Avtobuslarda reklama", "Maxsus texnikada reklama"]] as const;

export function DirectionsPage({ locale }: { locale: Locale }) {
  const copy = pageText.services;
  return <section className="wrap section page reference-page"><p className="kick">01 — {locale === "ru" ? "Направления" : locale === "en" ? "Directions" : "Yo‘nalishlar"}</p><h1>{copy.title[locale]}</h1><p className="slead">{copy.lead[locale]}</p><div className="cards direction-cards">{directionCards.map(([Icon, title, text], index) => <article className="c" key={title}><span className="n">0{index + 1}</span><div className="ico"><Icon aria-hidden="true" /></div><h2>{title}</h2><p>{text}</p></article>)}</div><section className="extra"><h2>{locale === "ru" ? "Услуги наружной рекламы" : locale === "en" ? "Outdoor advertising services" : "Tashqi reklama xizmatlari"}</h2><p>{locale === "ru" ? "Более пятидесяти позиций — от вывески до сувенира. Всё на собственной базе, по одному договору и с одним менеджером." : locale === "en" ? "Over fifty items — from signage to merchandise. All are produced in-house, under one contract with one manager." : "Ellikdan ortiq pozitsiya — peshtoqdan suvenirgacha. Barchasi o‘z bazamizda, bitta shartnoma va bitta menejer bilan."}</p><div className="svall">{serviceGroups.map(([heading, ...items]) => <div className="svgrp" key={heading}><h3>{heading}</h3><div className="svgrid">{items.map((item) => <div className="sv" key={item}><Signpost aria-hidden="true" /><span>{item}</span></div>)}</div></div>)}</div></section></section>;
}

const eventCards = [[Presentation, "Stend loyihasi va yig‘ish", "3D vizualizatsiya, konstruksiya, bosma, yig‘ish va demontaj"], [PanelTop, "Press-wall va foto zona", "3×3 m dan katta o‘lchamgacha, sumka bilan"], [Flag, "Navigatsiya va POS", "Roll-up, parus bayroq, promostoyka va ko‘rsatkichlar"], [Gift, "Delegatsiya to‘plami", "Brendlangan bloknot, ruchka, beydjik va sovg‘a to‘plami"], [Monitor, "Sahna va fon bezagi", "Prezidium, banner-fon, LED ekran ramkasi va sahna oldi bezagi"], [MapPinned, "Navigatsiya va ko‘rsatkichlar", "Zal sxemasi, yo‘nalish belgilari va registratsiya zonasi"], [Box, "Brendlangan zona va foto nuqta", "Press-wall, selfi ramka, brend devor va ko‘chma mebel"], [Signpost, "Mehmon to‘plami", "Beydjik, papka, bloknot, ruchka, sovg‘a va tashqi propusk"]] as const;
export function EventsPage({ locale }: { locale: Locale }) { const copy = pageText.events; return <section className="wrap section page reference-page"><p className="kick">03 — {locale === "ru" ? "Мероприятия" : locale === "en" ? "Events" : "Tadbirlar"}</p><h1>{copy.title[locale]}</h1><p className="slead">{copy.lead[locale]}</p><div className="ev">{eventCards.map(([Icon, title, description]) => <article className="evc" key={title}><Icon aria-hidden="true" /><h2>{title}</h2><p>{description}</p></article>)}</div></section>; }

const processSteps = [["Brif va o‘lchov", "O‘lcham, material, muddat va byudjetni aniqlaymiz. Kerak bo‘lsa obyektga chiqib, aniq o‘lchov va foto hisobot beramiz."], ["Dizayn va tasdiqlash", "Maket va 3D vizualizatsiya, ikki bepul tahrir. Rang va o‘lcham prepress bosqichida tekshiriladi."], ["Ishlab chiqarish", "Bosma, kesish, payvandlash, yig‘ish va sifat nazorati. Materiallar sertifikat bilan topshiriladi."], ["Montaj va topshirish", "O‘rnatish yoki yetkazish, balandlikdagi ishlar alpinist brigadasi bilan. Kafolat, EHF va hujjatlar to‘liq beriladi."], ["Xizmat va kuzatuv", "Kafolat muddatida nuqsonlarni bartaraf qilamiz. Keyingi buyurtmalar uchun maket va o‘lchovlarni saqlaymiz."]] as const;
export function ProcessPage({ locale }: { locale: Locale }) { const copy = pageText.process; return <section className="wrap section page reference-page"><p className="kick">04 — {locale === "ru" ? "Процесс" : locale === "en" ? "Process" : "Jarayon"}</p><h1>{copy.title[locale]}</h1><p className="slead">{copy.lead[locale]}</p><div className="steps">{processSteps.map(([title, description]) => <article className="step" key={title}><h2>{title}</h2><p>{description}</p></article>)}</div></section>; }
export function PortfolioPreview({
  locale,
  category,
}: {
  locale: Locale;
  category?: string;
}) {
  const selected =
    category && portfolioCategories.some(([key]) => key === category)
      ? category
      : undefined;
  const categories = selected
    ? portfolioCategories.filter(([key]) => key === selected)
    : portfolioCategories;
  const portfolioDetails: Record<string, { description: string; chips: string[] }> = {
    f1: { description: "Fasad bannerlari, bilbord polotnolari, to‘siq va panjara qoplamalari, ichki reklama.", chips: ["3.2 m kenglik · 1440 dpi", "Banner, setka, backlit", "1 ish kunida tayyor"] },
    f2: { description: "Do‘kon, restoran, klinika va biznes markaz peshtoqlari uchun yorug‘lik reklamasi.", chips: ["Akril 3–10 mm", "12 oy kafolat", "O‘lchov va montaj"] },
    f3: { description: "Minorali kran, brandmauer va fasad setkasi uchun balandlik reklamasi.", chips: ["Shamol yukiga hisob", "Alpinist brigadasi", "Demontaj xizmati"] },
    f4: { description: "Yengil avtomobil, yuk mashinasi, furgon va avtoparklarni brendlash.", chips: ["Oracal plyonka", "3–5 yil chidamli", "Avto chizmaga mos maket"] },
    f5: { description: "Roll-up, press-wall, pauchok, pop-up devor va ko‘rgazma konstruksiyalari.", chips: ["Sumkasi bilan", "5–15 daqiqada yig‘iladi", "Polotno almashtiriladi"] },
    f6: { description: "Ofis tablichkalari, ichki navigatsiya, ma’lumot stendlari va xavfsizlik belgilari.", chips: ["Akril, PVC, alyukabond", "UV bosma yoki gravyura", "Montaj bilan"] },
    f7: { description: "Vizitka, flayer, buklet, katalog, papka, bloknot, kalendar va qadoqlash.", chips: ["Laminatsiya va folga", "Tiraj bo‘yicha narx", "Maket tayyorlash"] },
    f8: { description: "Futbolka, polo, kepka, krujka, termos va korporativ sovg‘a to‘plamlari.", chips: ["DTF yoki sublimatsiya", "S dan XXL gacha", "Namuna tasdiqlash"] },
  };
  return (
    <section className="wrap section page">
      <Link className="crumb" href={`/${locale}`}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>{locale === "ru" ? "Главная" : locale === "en" ? "Home" : "Asosiy"}</Link>
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
      {selected ? <PortfolioGallery locale={locale} items={categories.flatMap(([key, label]) => portfolioImagesByCategory[key as keyof typeof portfolioImagesByCategory].map((image) => ({ ...image, alt: label[locale], caption: label[locale] }))) } /> : <div className="pf">{portfolioCategories.map(([key, label]) => {
        const details = portfolioDetails[key];
        const images = portfolioImagesByCategory[key as keyof typeof portfolioImagesByCategory].slice(0, 4);
        return <article className="pfb" key={key}><Link className="pfh" href={`/${locale}/portfolio/${key}`}><div className="ico"><span>0{key.slice(1)}</span></div><div className="pf-copy"><h3>{label[locale]}</h3><p>{details.description}</p><div className="chips">{details.chips.map((chip) => <span className="chip" key={chip}>{chip}</span>)}</div></div><span className="more">Barcha ishlarni ko‘rish →</span></Link><div className="shots">{images.map((image) => <Link className="shot" href={`/${locale}/portfolio/${key}`} key={image.id} aria-label={`${label[locale]}: barcha ishlarni ko‘rish`}><Image src={image.src} alt={image.alt} width={800} height={600} sizes="(max-width: 700px) 50vw, 25vw" /></Link>)}</div></article>;
      })}</div>}
    </section>
  );
}
function StaticPageLegacy({
  locale,
  page,
}: {
  locale: Locale;
  page: "narxlar" | "tadbirlar" | "jarayon" | "rekvizitlar";
}) {
  const copy = pageCopy[page];
  const blocks =
    page === "jarayon"
      ? ["Brief", "O'lchov va dizayn", "Ishlab chiqarish", "Montaj"]
      : page === "rekvizitlar"
        ? [
            "STIR: 312481772",
            "IFUT: 73110",
            "H/R: 2020 8000 8073 2289 6001",
            "HAMKORBANK (MFO: 00083)",
          ]
        : page === "narxlar"
          ? [
              "Banner va roll-up — 1 ish kuni",
              "Yorug'lik harflari — 3–7 kun",
              "Katta poligrafiya — 2–5 kun",
            ]
          : [
              "Ko'rgazma stendlari",
              "Press-wall va roll-up",
              "Navigatsiya va brending",
              "Montaj va demontaj",
            ];
  return (
    <section className="wrap section page">
      <p className="kick">TOGO GROUP</p>
      <h1>{copy.title[locale]}</h1>
      <p className="lead">{copy.lead[locale]}</p>
      <div className="info-list">
        {blocks.map((block, i) => (
          <div key={block}>
            <b>0{i + 1}</b>
            <span>{block}</span>
          </div>
        ))}
      </div>
      <Link className="cta" href={`/${locale}/aloqa`}>
        {locale === "uz"
          ? "Murojaat qoldirish"
          : locale === "ru"
            ? "Оставить заявку"
            : "Leave a request"}
      </Link>
    </section>
  );
}

export function StaticPage({
  locale,
  page,
}: {
  locale: Locale;
  page: "narxlar" | "tadbirlar" | "jarayon" | "rekvizitlar";
}) {
  const copy = pageCopy[page];
  const intro = {
    narxlar: "Har bir mahsulot bo‘yicha boshlang‘ich narxlar ochiq. Buyurtma hajmi ortgani sayin birlik narxi pasayadi.",
    tadbirlar: "Brifdan tortib tadbir tugagach demontajgacha — bitta jamoa, bitta shartnoma va aniq muddat.",
    jarayon: "Har bir bosqich ochiq va tushunarli: maket tasdiqlanmaguncha ishlab chiqarish boshlanmaydi.",
    rekvizitlar: "Davlat va korporativ buyurtmalar uchun to‘liq rasmiy hujjatlar bilan ishlaymiz.",
  }[page];

  const content = page === "narxlar" ? <>
    <div className="prg">{[["Banner, bosma bilan", "18 000", "so‘m / m²"], ["Orakal plyonka", "28 000", "so‘m / m²"], ["Obyomli harf", "7 000", "so‘m / sm"], ["Yorug‘lik qutisi", "1 500 000", "so‘m / m²"], ["Flayer A5", "300", "so‘m / dona"], ["Futbolka, logotip bilan", "40 000", "so‘m / dona"]].map(([name, price, unit]) => <article className="prc" key={name}><i>{name}</i><u>dan</u><b>{price}</b><span>{unit}</span></article>)}</div>
    <aside className="catbox"><div><h3>To‘liq narxlar katalogi</h3><p>78 pozitsiya, 8 bo‘lim va tiraj bo‘yicha narxlar. Kerakli hajmni tanlang va tezkor hisob oling.</p></div><a href="https://price.togogroup.uz" target="_blank" rel="noreferrer">Katalogni ochish ↗</a></aside>
    <p className="prnote">Narxlar so‘mda, QQSsiz. Maket, montaj va yetkazib berish alohida hisoblanadi.</p>
  </> : page === "tadbirlar" ? <div className="evg">{[["Ko‘rgazma stendi", "Loyihalash, ishlab chiqarish va joyida yig‘ish."], ["Press-wall va foto zona", "Brend devori, selfi ramka va ko‘chma mebel."], ["Roll-up va bayroqlar", "Tadbir maydoni uchun tez yig‘iladigan konstruksiyalar."], ["Sahna va fon bezagi", "Banner-fon, LED ekran ramkasi va prezidium bezagi."], ["Navigatsiya va ko‘rsatkichlar", "Zal sxemasi, ro‘yxatdan o‘tish va yo‘nalish belgilari."], ["Delegatsiya uchun to‘plam", "Beydjik, papka, bloknot, ruchka va sovg‘alar."]].map(([title, description], index) => <article className="evc" key={title}><b>0{index + 1} — {title}</b><span>{description}</span></article>)}</div> : page === "jarayon" ? <div className="steps">{[["Brif va o‘lchov", "O‘lcham, material, muddat va byudjetni aniqlaymiz. Kerak bo‘lsa obyektga chiqib aniq o‘lchov olamiz."], ["Dizayn va tasdiqlash", "Maket va 3D vizualizatsiyani tayyorlaymiz. Siz tasdiqlagandan keyingina ishlab chiqarish boshlanadi."], ["Ishlab chiqarish", "Bosma, kesish, yig‘ish va sifat nazorati o‘z bazamizda bajariladi."], ["Montaj va topshirish", "Yetkazib berish yoki o‘rnatish, kafolat hujjatlari va yopiluvchi hujjatlar bilan."], ["Xizmat va kuzatuv", "Kafolat davrida nuqsonlarni bartaraf qilamiz, keyingi buyurtmalar uchun maketlarni saqlaymiz."]].map(([title, description]) => <article className="step" key={title}><b>{title}</b><p>{description}</p></article>)}</div> : <div className="info"><article className="ib"><h4>Rasmiy rekvizitlar</h4><div className="co">«TOGO GROUP ADVERTISING» MCHJ</div><div className="rq">{[["Manzil", "Toshkent shahri, Yashnobod tumani, Yashnobod MFY, 4-Aviasozlar mavzesi, 9-uy"], ["Telefon", "+998 99 000 06 02"], ["STIR", "312481772"], ["IFUT (OKED)", "73110"], ["Hisob raqam", "2020 8000 8073 2289 6001"], ["Bank", "HAMKORBANK ATB, MFO 00083"]].map(([label, value]) => <div key={label}><span><i>{label}</i><b>{value}</b></span></div>)}</div></article><article className="ib"><h4>Davlat xaridlari</h4><p>Kompaniya rasmiy ro‘yxatdan o‘tgan yuridik shaxs. Shartnoma, hisob-faktura va elektron hisob-faktura bilan ishlaymiz.</p><div className="ul"><div><span>✓ Tijorat taklifini bir ish kunida tayyorlaymiz.</span></div><div><span>✓ Muddat va kafolat shartnomada aniq belgilanadi.</span></div><div><span>✓ Yuridik shaxslar uchun hisob raqam orqali to‘lov.</span></div></div></article><article className="ib"><h4>To‘lov usullari</h4><div className="pay">{[["Naqd pul", "Ofisda yoki yetkazib berishda, chek bilan"], ["Click / Payme", "Telefon orqali onlayn to‘lov"], ["Pul o‘tkazmasi", "Yuridik shaxslar uchun hisob raqamga, EHF bilan"]].map(([title, description]) => <div key={title}><span><b>{title}</b><small>{description}</small></span></div>)}</div></article></div>;

  const pageIndex = page === "narxlar" ? "04" : page === "jarayon" ? "04" : "05";
  const pageLabel = page === "narxlar" ? (locale === "ru" ? "Цены" : locale === "en" ? "Prices" : "Narxlar") : page === "jarayon" ? (locale === "ru" ? "Процесс" : locale === "en" ? "Process" : "Jarayon") : (locale === "ru" ? "Официально" : locale === "en" ? "Official" : "Rasmiy");
  return <section className="wrap section page"><Link className="crumb" href={`/${locale}`}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>{locale === "ru" ? "Главная" : locale === "en" ? "Home" : "Asosiy"}</Link><p className="kick">{pageIndex} — {pageLabel}</p><h1>{copy.title[locale]}</h1><p className="slead">{intro}</p>{content}<Link className="back" href={`/${locale}`}><span>← {locale === "en" ? "Back to home" : locale === "ru" ? "На главную" : "Asosiy sahifaga qaytish"}</span></Link></section>;
}
