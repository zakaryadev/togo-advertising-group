import Image from "next/image";
import Link from "next/link";
import { contact, navigation, type Locale } from "@/data/site";

const footerCopy = {
  uz: { label: "Qadriyatlarimiz", text: "Aytgan muddatimizda topshiramiz, kelishilgan narxni keyin oshirmaymiz, qo‘limizdan kelmaydigan ishni va’da qilmaymiz. Har bir peshtoq ostida bizning nomimiz turadi — sifat uchun o‘zimiz javob beramiz.", tax: "STIR" },
  ru: { label: "Наши принципы", text: "Сдаём в обещанный срок, не повышаем согласованную цену и не обещаем того, чего не сможем сделать. За качество отвечаем сами.", tax: "ИНН" },
  en: { label: "What we stand for", text: "We deliver on time, do not raise an agreed price, and never promise work we cannot do. Our name stands under every sign we make — we take responsibility for the quality.", tax: "TIN" },
} as const;

export default function SiteFooter({ locale }: { locale: Locale }) {
  const copy = footerCopy[locale];
  const labels = locale === "en" ? { navigation: "Navigation", contacts: "Contacts", social: "Social media", contact: "Contact" } : locale === "ru" ? { navigation: "Навигация", contacts: "Контакты", social: "Социальные сети", contact: "Контакты" } : { navigation: "Navigatsiya", contacts: "Kontaktlar", social: "Ijtimoiy tarmoqlar", contact: "Aloqa" };

  return <footer className="site-footer reference-footer"><div className="wrap">
    <div className="fcols">
      <div><div className="ftlabel">{labels.navigation}</div><nav className="flinks">{navigation.map(([slug, label]) => <Link href={`/${locale}/${slug}`} key={slug}>{label[locale]}</Link>)}<Link href={`/${locale}/aloqa`}>{labels.contact}</Link></nav></div>
      <div><div className="ftlabel">{labels.contacts}</div><div className="fcont"><span>{contact.address}</span><a href={contact.phoneHref}>{contact.phone}</a><a href="tel:+998990000602">+998 99 000 06 02</a><a href={`mailto:${contact.email}`}>{contact.email}</a><a href={contact.telegram} target="_blank" rel="noreferrer">t.me/togo_group_pro</a></div></div>
      <div><div className="ftlabel">{labels.social}</div><div className="fsoc"><a href={contact.telegram} target="_blank" rel="noreferrer">Telegram</a><a href={contact.instagram} target="_blank" rel="noreferrer">Instagram</a></div></div>
    </div>
    <div className="fgrid"><Link href={`/${locale}`} className="flogo" aria-label="TOGO GROUP ADVERTISING"><Image src="/togo_logo.svg" alt="TOGO GROUP ADVERTISING" width={292} height={100} /></Link><div className="footer-values"><div className="ftlabel">{copy.label}</div><p>{copy.text}</p><div className="mono">© 2026 «TOGO GROUP ADVERTISING» MCHJ · {copy.tax} 312481772 · togogroup.uz</div></div></div>
  </div></footer>;
}
