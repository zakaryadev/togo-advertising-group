import Link from "next/link";
import Image from "next/image";
import {
  BriefcaseBusiness,
  ClipboardList,
  FileText,
  GalleryHorizontalEnd,
  Landmark,
  MapPinned,
  Presentation,
  ShieldBan,
  Tags,
} from "lucide-react";
import { portfolioCategories, type Locale } from "@/data/site";
import { getDynamicPortfolioImagesByCategory } from "@/components/portfolio-images";

const copy = {
  uz: {
    title: "Bo'limlar",
    noTitle: "Kimlarga reklama ",
    noEmphasis: "qilmaymiz",
    noLead: "Sigaret va tamaki, alkogol va pivo barlar, kattalar uchun massaj salonlari, qimor va garov, lombard hamda foizga qarz beruvchi tashkilotlar uchun reklama tayyorlamaymiz. Buyurtma qanchalik katta bo'lmasin, rad etamiz — bu bizning tanlovimiz.",
    noItems: ["Sigaret va tamaki", "Alkogol va pivo bar", "Kattalar uchun xizmatlar", "Qimor va garov", "Lombard va foizga qarz"],
    tiles: [
      ["yonalishlar", "Yo'nalishlar", "Nima ishlab chiqaramiz — olti yo'nalish"],
      ["portfolio", "Portfolio", "Bajarilgan ishlar, turlari bo'yicha"],
      ["narxlar", "Narxlar", "Ochiq narxlar va to'liq katalog"],
      ["tadbirlar", "Tadbirlar", "Ko'rgazma va tadbir ofarmleniyasi"],
      ["jarayon", "Jarayon", "Buyurtma qanday harakatlanadi"],
      ["rekvizitlar", "Rasmiy", "Davlat xaridlari va rekvizitlar"],
      ["karyera", "Bizga qo'shiling", "Vakansiyalar va anketa"],
      ["aloqa", "Aloqa", "Telefon, Telegram va ijtimoiy tarmoqlar"],
    ],
    portfolio: "Portfolio",
    portfolioAction: "Ishlarni ko'rish",
  },
  ru: {
    title: "Разделы",
    noTitle: "Кому мы не делаем ",
    noEmphasis: "рекламу",
    noLead: "Мы не производим рекламу для табака и сигарет, алкоголя и пивных баров, услуг для взрослых, азартных игр и ставок, ломбардов и займов под проценты.",
    noItems: ["Сигареты и табак", "Алкоголь и пивбары", "Услуги для взрослых", "Азартные игры и ставки", "Ломбарды и займы"],
    tiles: [["yonalishlar", "Направления", "Что мы производим"], ["portfolio", "Портфолио", "Выполненные работы по категориям"], ["narxlar", "Цены", "Открытые цены и каталог"], ["tadbirlar", "Мероприятия", "Оформление выставок и событий"], ["jarayon", "Процесс", "Как движется заказ"], ["rekvizitlar", "Компания", "Реквизиты и госзакупки"], ["karyera", "Присоединяйтесь", "Вакансии и анкета"], ["aloqa", "Контакты", "Телефон, Telegram и соцсети"]],
    portfolio: "Портфолио",
    portfolioAction: "Смотреть работы",
  },
  en: {
    title: "Sections",
    noTitle: "Who we don't advertise ",
    noEmphasis: "for",
    noLead: "We do not produce advertising for tobacco, alcohol, adult services, gambling, pawnshops, or payday lending organisations.",
    noItems: ["Tobacco", "Alcohol", "Adult services", "Gambling", "Pawnshops and loans"],
    tiles: [["yonalishlar", "Services", "What we produce — six directions"], ["portfolio", "Portfolio", "Completed work by category"], ["narxlar", "Prices", "Open prices and catalogue"], ["tadbirlar", "Events", "Exhibitions and event production"], ["jarayon", "Process", "How an order moves forward"], ["rekvizitlar", "Company", "Company details and procurement"], ["karyera", "Join us", "Vacancies and application"], ["aloqa", "Contact", "Phone, Telegram and social media"]],
    portfolio: "Portfolio",
    portfolioAction: "View work",
  },
} as const;

const icons = [Presentation, GalleryHorizontalEnd, Tags, BriefcaseBusiness, ClipboardList, Landmark, FileText, MapPinned];

export async function HomeSections({ locale }: { locale: Locale }) {
  const portfolioImagesByCategory = await getDynamicPortfolioImagesByCategory();
  const text = copy[locale];
  return <>
    <section className="wrap home-sections" aria-labelledby="home-sections-title">
      <h2 id="home-sections-title" className="section-label">{text.title}</h2>
      <div className="tgrid">
        {text.tiles.map(([slug, title, description], index) => {
          const Icon = icons[index];
          return <Link className={`tile ${slug === "portfolio" ? "feat" : ""}`} href={`/${locale}/${slug}`} key={slug}>
            <Icon aria-hidden="true" />
            <b>{title}</b><span>{description}</span>
          </Link>;
        })}
      </div>
      <div className="pfq">
        <h2 className="section-label">{text.portfolio}</h2>
        <div className="pfqgrid">
          {portfolioCategories.map(([category, label]) => <Link className="pfqc" href={`/${locale}/portfolio/${category}`} key={category}>
            <Image className="pfqc-image" src={portfolioImagesByCategory[category as keyof typeof portfolioImagesByCategory][0].src} alt="" fill sizes="(max-width: 640px) 100vw, 25vw" />
            <span className="pfqc-shade" /><span className="pfq-number">{category.toUpperCase()}</span><b>{label[locale]}</b><i>{text.portfolioAction} →</i>
          </Link>)}
        </div>
      </div>
      <aside className="nolist" aria-labelledby="no-ad-title">
        <div className="nohead"><ShieldBan aria-hidden="true" /><div><h2 id="no-ad-title">{text.noTitle}<em>{text.noEmphasis}</em></h2><p>{text.noLead}</p></div></div>
        <div className="nogrid">{text.noItems.map((item) => <span className="noitem" key={item}><ShieldBan aria-hidden="true" /><i>{item}</i></span>)}</div>
      </aside>
    </section>
  </>;
}
