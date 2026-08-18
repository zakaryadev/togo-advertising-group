"use client";
import { useState } from "react";
import { contact, services, type Locale } from "@/data/site";
type Status = "idle" | "pending" | "sent" | "error";
export default function LeadForm({ locale }: { locale: Locale }) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  async function submit(form: FormData) {
    setStatus("pending");
    setMessage("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(Object.fromEntries(form)),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.message);
      setStatus("sent");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Xatolik yuz berdi.");
      setStatus("error");
    }
  }
  const label =
    locale === "ru"
      ? "Отправить заявку"
      : locale === "en"
        ? "Send request"
        : "Hisob-kitob so'rash";
  return (
    <form className="lead-form" action={submit}>
      <div className="form-grid">
        <label>
          {" "}
          {locale === "ru" ? "Имя" : locale === "en" ? "Name" : "Ismingiz"}
          <input required name="name" maxLength={120} />
        </label>
        <label>
          {locale === "ru"
            ? "Телефон"
            : locale === "en"
              ? "Phone"
              : "Telefon raqamingiz"}
          <input required name="phone" inputMode="tel" maxLength={40} />
        </label>
      </div>
      <label>
        {locale === "ru"
          ? "Услуга"
          : locale === "en"
            ? "Service"
            : "Xizmat turi"}
        <select name="service">
          {services.map((service) => (
            <option key={service.slug} value={service.slug}>
              {service.title[locale]}
            </option>
          ))}
        </select>
      </label>
      <label>
        {locale === "ru"
          ? "Комментарий"
          : locale === "en"
            ? "Comment"
            : "Buyurtma tavsifi (ixtiyoriy)"}
        <textarea name="comment" rows={4} maxLength={2000} />
      </label>
      <input
        className="honeypot"
        name="website"
        tabIndex={-1}
        autoComplete="off"
      />
      <button disabled={status === "pending"} className="cta">
        {status === "pending" ? "..." : label}
      </button>
      {status === "sent" && (
        <p className="notice success">
          {locale === "uz"
            ? "Murojaatingiz qabul qilindi."
            : locale === "ru"
              ? "Ваша заявка принята."
              : "Your request has been received."}
        </p>
      )}
      {status === "error" && (
        <p className="notice error">
          {message} <a href={contact.phoneHref}>{contact.phone}</a>
        </p>
      )}
    </form>
  );
}
