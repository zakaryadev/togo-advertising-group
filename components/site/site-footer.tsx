import Image from "next/image";
import Link from "next/link";
import { Camera, CirclePlay, MessageCircle, Send } from "lucide-react";
import { contact, navigation, type Locale } from "@/data/site";

const copy = {
  uz: { navigation: "Navigatsiya", contacts: "Kontaktlar", social: "Ijtimoiy tarmoqlar", values: "Qadriyatlarimiz", valueText: "Aytgan muddatimizda topshiramiz, kelishilgan narxni keyin oshirmaymiz, qo'limizdan kelmaydigan ishni va'da qilmaymiz. Har bir peshtoq ostida bizning nomimiz turadi — sifat uchun o'zimiz javob beramiz.", join: "Bizga qo'shiling", contact: "Aloqa" },
  ru: { navigation: "Навигация", contacts: "Контакты", social: "Социальные сети", values: "Наши принципы", valueText: "Сдаём в обещанный срок, не повышаем согласованную цену и не обещаем того, чего не сможем сделать. За качество отвечаем сами.", join: "Присоединяйтесь", contact: "Контакты" },
  en: { navigation: "Navigation", contacts: "Contacts", social: "Social media", values: "What we stand for", valueText: "We deliver on time, do not raise an agreed price, and never promise work we cannot do. We take responsibility for quality.", join: "Join us", contact: "Contact" },
} as const;

export default function SiteFooter({ locale }: { locale: Locale }) {
  const text = copy[locale];
  return <footer className="site-footer reference-footer"><div className="wrap">
    <div className="fcols"><div><div className="ftlabel">{text.navigation}</div><nav className="flinks">{navigation.map(([slug, label]) => <Link href={`/${locale}/${slug}`} key={slug}>{label[locale]}</Link>)}<Link href={`/${locale}/karyera`}>{text.join}</Link><Link href={`/${locale}/aloqa`}>{text.contact}</Link></nav></div>
      <div><div className="ftlabel">{text.contacts}</div><div className="fcont"><span>{contact.address[locale]}</span><a href={contact.phoneHref}>{contact.phone}</a><a href="tel:+998990000602">+998 99 000 06 02</a><a href={`mailto:${contact.email}`}>{contact.email}</a><a href={contact.telegram} target="_blank" rel="noreferrer">t.me/togo_group_pro</a></div></div>
      <div><div className="ftlabel">{text.social}</div><div className="fsoc"><a href={contact.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Camera /></a><a href={contact.telegram} target="_blank" rel="noreferrer" aria-label="Telegram"><Send /></a><a href="#" aria-label="YouTube"><CirclePlay /></a><a href="#" aria-label="Facebook"><MessageCircle /></a></div></div>
    </div>
    <div className="fgrid"><Link href={`/${locale}`} className="flogo" aria-label="TOGO GROUP ADVERTISING"><Image src="/togo_logo.svg" alt="TOGO GROUP ADVERTISING" width={292} height={100} /></Link><div className="footer-values"><div className="ftlabel">{text.values}</div><p>{text.valueText}</p><div className="mono">© 2026 «TOGO GROUP ADVERTISING» MCHJ · STIR 312481772 · togogroup.uz</div></div></div>
  </div></footer>;
}
