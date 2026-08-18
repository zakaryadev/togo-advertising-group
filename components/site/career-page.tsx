"use client";

import { type FormEvent, useState } from "react";
import { FileUp, Send } from "lucide-react";
import Link from "next/link";
import type { Locale } from "@/data/site";

const copy = {
  uz: { kicker: "07 — Jamoa", title: "Bizga qo'shiling", lead: "Dizayner, bosma operatori, montajchi yoki menejer — jamoamiz doim o'sib boradi. Anketani to'ldiring, rezyume yoki portfolio faylini biriktiring.", name: "Ism familiya", phone: "Telefon", role: "Qaysi yo'nalishda", experience: "Tajriba", about: "O'zingiz haqingizda", file: "Rezyume yoki portfolio", submit: "Anketani yuborish" },
  ru: { kicker: "07 — Команда", title: "Присоединяйтесь к нам", lead: "Дизайнер, оператор печати, монтажник или менеджер — наша команда растёт. Заполните анкету и приложите резюме или портфолио.", name: "Имя и фамилия", phone: "Телефон", role: "Направление", experience: "Опыт", about: "О себе", file: "Резюме или портфолио", submit: "Отправить анкету" },
  en: { kicker: "07 — Team", title: "Join us", lead: "Designer, print operator, installer or manager — our team keeps growing. Complete the form and attach your CV or portfolio.", name: "Full name", phone: "Phone", role: "Position", experience: "Experience", about: "About you", file: "CV or portfolio", submit: "Send application" },
} as const;

export function CareerPage({ locale }: { locale: Locale }) {
  const text = copy[locale]; const [sent, setSent] = useState(false); const [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); const data = new FormData(event.currentTarget); setError(""); const response = await fetch("/api/contact", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ name: data.get("name"), phone: data.get("phone"), service: `Career: ${data.get("role") ?? ""}`, comment: `${data.get("experience") ?? ""}\n${data.get("about") ?? ""}` }) }); if (response.ok) setSent(true); else setError(locale === "ru" ? "Не удалось отправить анкету." : locale === "en" ? "The application could not be sent." : "Anketani yuborib bo'lmadi."); }
  return <section className="wrap section page reference-page"><Link className="crumb" href={`/${locale}`}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>{locale === "ru" ? "Главная" : locale === "en" ? "Home" : "Asosiy"}</Link><p className="kick">{text.kicker}</p><h1>{text.title}</h1><p className="slead">{text.lead}</p><form className="form career-form" onSubmit={submit}>
    <div className="frow2"><label className="fld"><span>{text.name}</span><input required name="name" /></label><label className="fld"><span>{text.phone}</span><input required name="phone" inputMode="tel" /></label></div>
    <div className="frow2"><label className="fld"><span>{text.role}</span><select name="role"><option>Designer</option><option>Print operator</option><option>Installer</option><option>Manager</option></select></label><label className="fld"><span>{text.experience}</span><select name="experience"><option>0–1</option><option>1–3</option><option>3–5</option><option>5+</option></select></label></div>
    <label className="fld"><span>{text.about}</span><textarea name="about" rows={4} /></label><label className="drop"><FileUp aria-hidden="true" /><span>{text.file}</span><input type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip" /></label>
    <button className="cta wide" type="submit"><Send aria-hidden="true" />{text.submit}</button>{sent && <p className="notice success">Rahmat! Anketangiz qabul qilindi.</p>}{error && <p className="notice error">{error}</p>}
  </form></section>;
}
