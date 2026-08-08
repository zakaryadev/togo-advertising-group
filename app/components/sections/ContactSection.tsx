"use client";
import { useEffect, useState, type FormEvent } from "react";
import { useLang } from "../../content/i18n-context";
import { contact } from "../../content/site-content";

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

export default function ContactSection() {
  const { t } = useLang();
  const [status, setStatus] = useState<"idle" | "pending" | "sent" | "error">("idle");
  const [phone, setPhone] = useState("+998 ");
  const [siteContact, setSiteContact] = useState(contact);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.phone) {
          setSiteContact({
            ...contact,
            phone: data.phone || contact.phone,
            phoneHref: data.phoneHref || contact.phoneHref,
            email: data.email || contact.email,
            address: data.address || contact.address,
            telegram: data.telegram || contact.telegram,
          });
        }
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("pending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(e.currentTarget).entries())),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      const form = e.currentTarget;
      form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("input,textarea").forEach(i => (i.value = ""));
      setPhone("+998 ");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="sec" id="aloqa">
      <div className="wrap cta">
        <div className="rv">
          <span className="tag mono">{t("ct.tag")}</span>
          <h2 className="big-h" style={{ maxWidth: "13ch" }}>{t("ct.h")}</h2>
          <p style={{ color: "var(--mut)", maxWidth: "44ch", marginTop: 18, lineHeight: 1.75, fontSize: "14.5px" }}>
            {t("ct.p")}
          </p>
          <div className="clist">
            <a className="ci" href={siteContact.phoneHref}>
              <span className="mono">{t("ct.phone")}</span>
              <b>{siteContact.phone}</b>
            </a>
            <a className="ci" href={`mailto:${siteContact.email}`}>
              <span className="mono">Email</span>
              <b>{siteContact.email}</b>
            </a>
            <a className="ci" href={siteContact.telegram} target="_blank" rel="noopener noreferrer">
              <span className="mono">Telegram</span>
              <b>@togogrouppro</b>
            </a>
            <a className="ci" href="#">
              <span className="mono">{t("ct.addr")}</span>
              <b>{siteContact.address || t("ct.city")}</b>
            </a>
          </div>
        </div>
        <form className="form rv" onSubmit={handleSubmit}>
          <div className="f">
            <label>{t("f.name")}</label>
            <input required name="ism" placeholder={t("f.namep")} />
          </div>
          <div className="f">
            <label>{t("f.phone")}</label>
            <input
              required
              name="telefon"
              type="tel"
              inputMode="numeric"
              value={phone}
              pattern="\+998 \d{2} \d{3} \d{2} \d{2}"
              title="Masalan: +998 90 123 45 67"
              maxLength={17}
              onChange={e => {
                const input = e.currentTarget;
                const prevLen = input.value.length;
                const caret = input.selectionStart ?? prevLen;
                const formatted = formatUzPhone(input.value);
                input.value = formatted;
                setPhone(formatted);
                const diff = formatted.length - prevLen;
                const pos = Math.min(formatted.length, Math.max(5, caret + diff));
                input.setSelectionRange(pos, pos);
              }}
              onFocus={e => {
                const pos = e.currentTarget.value.length;
                e.currentTarget.setSelectionRange(pos, pos);
              }}
            />
          </div>
          <div className="f">
            <label>{t("f.svc")}</label>
            <select name="xizmat">
              {serviceOptions.map(key => (
                <option key={key}>{t(key)}</option>
              ))}
            </select>
          </div>
          <div className="f">
            <label>{t("f.msg")}</label>
            <textarea name="xabar" placeholder={t("f.msgp")} />
          </div>
          <button
            type="submit"
            className="btn mag"
            style={{ justifyContent: "center", marginTop: 14 }}
            disabled={status === "pending"}
          >
            <s /><span>{status === "pending" ? "YUBORILMOQDA…" : status === "sent" ? "QABUL QILINDI ✓" : t("f.send")}</span>
          </button>
          {status === "sent" && <div className="ok mono show">{t("f.ok")}</div>}
          {status === "error" && (
            <div className="form-error">
              Xatolik yuz berdi. Iltimos, qo&lsquo;ng&lsquo;iroq qiling:{" "}
              <a href={contact.phoneHref}>{contact.phone}</a>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
