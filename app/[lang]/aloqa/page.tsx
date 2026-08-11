"use client";
import { useState } from "react";
import { ArrowUpRight, Camera, ChevronDown, Clock3, Mail, MapPin, Phone, Play, Send } from "lucide-react";
import { SiteHeader } from "../../components/site-header";
import { SiteFooter } from "../../components/site-footer";
import { contact } from "../../content/site-content";
import { useLang } from "../../content/i18n-context";

type Status = "idle" | "pending" | "sent" | "error";

const serviceOptions = ["o1", "o2", "o3", "o4", "o5", "o6"];

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
  const { t } = useLang();
  const [status, setStatus] = useState<Status>("idle");

  return (
    <>
      <SiteHeader />
      <main>
        <section className="inner-hero">
          <div className="wrap">
            <span className="eyebrow mono"><Send size={13} /> TOGO GROUP ADVERTISING / {t("pg.ct.eyebrow")}</span>
            <h1>{t("pg.ct.h1a")} <span className="neon">{t("pg.ct.h1b")}</span></h1>
            <p>{t("pg.ct.sub")}</p>
          </div>
        </section>
        <section className="sec">
          <div className="wrap contact-layout">
            <div className="contact-info">
              <h2>{t("pg.ct.infoH")}</h2>
              <p className="contact-lead">{t("pg.ct.infoLead")}</p>
              <a className="contact-item" href={contact.phoneHref}><Phone /><span><small>{t("pg.ct.phone")}</small><strong>{contact.phone}</strong></span></a>
              <a className="contact-item" href={`mailto:${contact.email}`}><Mail /><span><small>{t("pg.ct.email")}</small><strong>{contact.email}</strong></span></a>
              <div className="contact-item"><MapPin /><span><small>{t("pg.ct.addr")}</small><strong>{contact.address}</strong></span></div>
              <div className="contact-item"><Clock3 /><span><small>{t("pg.ct.hours")}</small><strong>{contact.hours}</strong></span></div>
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
                <span>{t("pg.ct.formTag")}</span>
                <h2>{t("pg.ct.formH")}</h2>
              </div>
              <label>{t("f.name")}<input name="ism" required placeholder={t("pg.ct.namep")} /></label>
              <label>
                {t("f.phone")}
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
                {t("pg.ct.svc")}
                <span className="select-wrap">
                  <select name="xizmat" defaultValue="">
                    <option value="" disabled>{t("pg.ct.svcChoose")}</option>
                    {serviceOptions.map(key => (
                      <option key={key}>{t(key)}</option>
                    ))}
                  </select>
                  <ChevronDown className="select-chevron" size={18} aria-hidden="true" />
                </span>
              </label>
              <label>{t("f.msg")}<textarea name="xabar" rows={4} placeholder={t("pg.ct.msgp")} /></label>
              <button className="btn primary" type="submit" disabled={status === "pending"}>
                {status === "sent" ? t("pg.ct.sent") : status === "pending" ? t("pg.ct.sending") : t("pg.ct.submit")} <ArrowUpRight size={16} />
              </button>
              {status === "error" && (
                <p className="form-error">
                  {t("pg.ct.error")} <a href={contact.phoneHref}>{contact.phone}</a>
                </p>
              )}
            </form>
          </div>
        </section>
        <section className="wrap contact-map-section" style={{ marginTop: "40px", marginBottom: "60px" }}>
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "400px",
              borderRadius: "16px",
              overflow: "hidden",
              border: "1px solid rgba(243, 239, 226, 0.15)",
              background: "#0d0c08",
            }}
          >
            <iframe
              src="https://yandex.uz/map-widget/v1/?ll=69.344699%2C41.296398&z=18&l=map&pt=69.344699,41.296398,pm2rdl"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "contrast(1.1) brightness(0.9)" }}
              allowFullScreen
              loading="lazy"
              title={t("pg.ct.mapTitle")}
            />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
