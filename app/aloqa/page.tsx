"use client";
import { useState } from "react";
import { ArrowUpRight, Camera, ChevronDown, Clock3, Mail, MapPin, Phone, Play, Send } from "lucide-react";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";
import { contact } from "../content/site-content";

type Status = "idle" | "pending" | "sent" | "error";

function formatUzPhone(value: string) {
  let digits = value.replace(/\D/g, "");
  if (digits.startsWith("998")) digits = digits.slice(3);
  digits = digits.slice(0, 9);
  let out = "+998 " + digits.slice(0, 2);
  if (digits.length > 2) out += " " + digits.slice(2, 5);
  if (digits.length > 5) out += " " + digits.slice(5, 7);
  if (digits.length > 7) out += " " + digits.slice(7, 9);
  return out;
}

export default function ContactPage() {
  const [status, setStatus] = useState<Status>("idle");

  return (
    <>
      <SiteHeader />
      <main>
        <section className="inner-hero contact-hero">
          <div className="container">
            <span className="eyebrow"><Send size={13} /> TOGO GROUP PRO / ALOQA</span>
            <h1>Loyihangizni <span className="lime">birga</span><br /> boshlaymiz.</h1>
            <p>G‘oyangizni ayting — biz uni ko‘rinadigan va ishlaydigan yechimga aylantiramiz.</p>
          </div>
        </section>
        <section className="section page-section">
          <div className="container contact-layout">
            <div className="contact-info">
              <h2>Bog‘lanish</h2>
              <p className="contact-lead">Savollaringiz yoki yangi loyiha uchun biz bilan bog‘laning.</p>
              <a className="contact-item" href={contact.phoneHref}><Phone /><span><small>Telefon</small><strong>{contact.phone}</strong></span></a>
              <a className="contact-item" href={`mailto:${contact.email}`}><Mail /><span><small>Email</small><strong>{contact.email}</strong></span></a>
              <div className="contact-item"><MapPin /><span><small>Manzil</small><strong>{contact.address}</strong></span></div>
              <div className="contact-item"><Clock3 /><span><small>Ish vaqti</small><strong>{contact.hours}</strong></span></div>
              <div className="contact-socials">
                <a href={contact.instagram} target="_blank" rel="noopener noreferrer"><Camera size={18} /> Instagram</a>
                <a href={contact.telegram} target="_blank" rel="noopener noreferrer"><Send size={18} /> Telegram</a>
                <a href={contact.youtube} target="_blank" rel="noopener noreferrer"><Play size={18} /> YouTube</a>
              </div>
            </div>
            <form
              className="contact-form"
              onSubmit={async e => {
                e.preventDefault();
                const form = e.currentTarget;
                setStatus("pending");
                try {
                  const res = await fetch("/api/contact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(Object.fromEntries(new FormData(form).entries())),
                  });
                  if (!res.ok) throw new Error();
                  setStatus("sent");
                  form.reset();
                } catch {
                  setStatus("error");
                }
              }}
            >
              <div className="form-heading">
                <span>01 / SO‘ROV</span>
                <h2>Bepul konsultatsiya oling.</h2>
              </div>
              <label>Ismingiz<input name="ism" required placeholder="Ismingizni kiriting" /></label>
              <label>
                Telefon raqamingiz
                <input
                  name="telefon"
                  required
                  type="tel"
                  inputMode="numeric"
                  defaultValue="+998 "
                  pattern="\+998 \d{2} \d{3} \d{2} \d{2}"
                  title="Masalan: +998 90 123 45 67"
                  maxLength={17}
                  onChange={e => {
                    const input = e.currentTarget;
                    const prevLen = input.value.length;
                    const caret = input.selectionStart ?? prevLen;
                    const formatted = formatUzPhone(input.value);
                    input.value = formatted;
                    const diff = formatted.length - prevLen;
                    const pos = Math.min(formatted.length, Math.max(5, caret + diff));
                    input.setSelectionRange(pos, pos);
                  }}
                  onFocus={e => {
                    const pos = e.currentTarget.value.length;
                    e.currentTarget.setSelectionRange(pos, pos);
                  }}
                />
              </label>
              <label>
                Xizmat turi
                <span className="select-wrap">
                  <select name="xizmat" defaultValue="">
                    <option value="" disabled>Tanlang</option>
                    <option>LED Harflar</option>
                    <option>Lightbox</option>
                    <option>Tashqi reklama</option>
                    <option>Stend</option>
                    <option>Avto reklama</option>
                  </select>
                  <ChevronDown className="select-chevron" size={18} aria-hidden="true" />
                </span>
              </label>
              <label>Loyiha haqida<textarea name="xabar" rows={4} placeholder="Qisqacha yozib qoldiring" /></label>
              <button className="btn primary" type="submit" disabled={status === "pending"}>
                {status === "sent" ? "SO‘ROV QABUL QILINDI" : status === "pending" ? "YUBORILMOQDA…" : "SO‘ROV YUBORISH"} <ArrowUpRight size={16} />
              </button>
              {status === "error" && (
                <p className="form-error">
                  Xatolik yuz berdi. Iltimos, qo‘ng‘iroq qiling: <a href={contact.phoneHref}>{contact.phone}</a>
                </p>
              )}
            </form>
          </div>
        </section>
        <section className="container map-placeholder">
          <MapPin size={28} />
          <div><strong>Toshkent shahrida ishlaymiz</strong><span>Manzil xaritasi keyingi bosqichda ulanadi</span></div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
