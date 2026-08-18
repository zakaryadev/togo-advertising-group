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
    <section className="wrap section">
      <p className="kick">PORTFOLIO</p>
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

  return <section className="wrap section page"><p className="kick">TOGO GROUP — {page}</p><h1>{copy.title[locale]}</h1><p className="slead">{intro}</p>{content}<Link className="back" href={`/${locale}`}><span>← {locale === "en" ? "Back to home" : locale === "ru" ? "На главную" : "Asosiy sahifaga qaytish"}</span></Link></section>;
}
