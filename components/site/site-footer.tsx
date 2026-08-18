import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/data/site";

const footerCopy = {
  uz: { label: "Qadriyatlarimiz", text: "Aytgan muddatimizda topshiramiz, kelishilgan narxni keyin oshirmaymiz, qo'limizdan kelmaydigan ishni va'da qilmaymiz. Har bir peshtoq ostida bizning nomimiz turadi — sifat uchun o'zimiz javob beramiz.", tax: "STIR" },
  ru: { label: "Наши принципы", text: "Сдаём в обещанный срок, не повышаем согласованную цену и не обещаем того, чего не сможем сделать. Под каждой нашей вывеской стоит наше имя — за качество отвечаем сами.", tax: "ИНН" },
  en: { label: "What we stand for", text: "We deliver on time, do not raise an agreed price, and never promise work we cannot do. Our name stands under every sign we make — we take responsibility for the quality.", tax: "TIN" },
} as const;

export default function SiteFooter({ locale }: { locale: Locale }) {
  const copy = footerCopy[locale];
  return <footer className="site-footer reference-footer">
    <div className="wrap"><div className="fgrid">
      <Link href={`/${locale}`} className="flogo" aria-label="TOGO GROUP ADVERTISING"><Image src="/togo_logo.svg" alt="TOGO GROUP ADVERTISING" width={292} height={100} /></Link>
      <div className="footer-values"><div className="ftlabel">{copy.label}</div><p>{copy.text}</p><div className="mono">© 2026 «TOGO GROUP ADVERTISING» MCHJ · {copy.tax} 312481772 · togogroup.uz</div></div>
    </div></div>
  </footer>;
}
