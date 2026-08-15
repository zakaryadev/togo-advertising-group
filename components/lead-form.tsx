"use client";

import { useState } from "react";

export default function LeadForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("Obyomli va yorug'lik harflari");
  const [comment, setComment] = useState("");

  const [status, setStatus] = useState<"idle" | "pending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setStatus("pending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, service, comment }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Xatolik yuz berdi");
      }

      setStatus("sent");
      setName("");
      setPhone("");
      setComment("");
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message || "Xabarni yuborishda xatolik yuz berdi.");
    }
  }

  return (
    <section className="wrap" id="anketa">
      <div className="kick">TEZKOR HISOB-KITOB</div>
      <h2>Loyihangiz narxini 15 daqiqada hisoblab beramiz</h2>
      <p className="slead">
        Formani to'ldiring. Mutaxassisimiz siz bilan bog'lanib, o'lchov va dizayn bo'yicha ma'lumot beradi hamda aniq hisob-kitobni taqdim etadi.
      </p>

      {status === "sent" ? (
        <div
          style={{
            marginTop: "24px",
            padding: "24px",
            background: "rgba(34, 197, 94, 0.12)",
            border: "1px solid #22c55e",
            borderRadius: "16px",
            color: "#22c55e",
          }}
        >
          <h3 style={{ fontSize: "20px", fontWeight: 700 }}>
            ✓ Murojaatingiz muvaffaqiyatli qabul qilindi!
          </h3>
          <p style={{ marginTop: "8px", fontSize: "15px", color: "var(--ink)" }}>
            Tez orada menejerimiz <strong>+998 77 300 45 00</strong> raqamidan sizga aloqaga chiqadi.
          </p>
          <button
            type="button"
            className="cta"
            style={{ marginTop: "16px" }}
            onClick={() => setStatus("idle")}
          >
            Yangi murojaat yuborish
          </button>
        </div>
      ) : (
        <form className="form" onSubmit={handleSubmit}>
          <div className="frow2">
            <label className="fld">
              <span>
                <i>ISMINGIZ</i>
              </span>
              <input
                type="text"
                required
                placeholder="Masalan: Jamshid"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>

            <label className="fld">
              <span>
                <i>TELEFON RAQAMINGIZ</i>
              </span>
              <input
                type="tel"
                required
                placeholder="+998 90 123 45 67"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </label>
          </div>

          <label className="fld">
            <span>
              <i>XIZMAT TURI</i>
            </span>
            <select value={service} onChange={(e) => setService(e.target.value)}>
              <option value="Obyomli va yorug'lik harflari">Obyomli va yorug'lik harflari</option>
              <option value="Kran va balandlik reklamasi">Kran va balandlik reklamasi</option>
              <option value="Katta formatli va UV bosma">Katta formatli va UV bosma</option>
              <option value="Poligrafiya va Bosmaxona">Poligrafiya va Bosmaxona</option>
              <option value="Ko'rgazma stendlari">Ko'rgazma stendlari</option>
              <option value="Avto brendlash">Avto brendlash</option>
              <option value="Boshqa maxsus xizmat">Boshqa maxsus xizmat</option>
            </select>
          </label>

          <label className="fld">
            <span>
              <i>BUYURTMA TAVSIFI YOKI O'LCHAMLARI (IXTIYORIY)</i>
            </span>
            <textarea
              rows={3}
              placeholder="O'lchamlari, joylashuvi yoki talablaringiz haqida yozing..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </label>

          {status === "error" && (
            <div
              style={{
                padding: "12px",
                background: "rgba(239, 68, 68, 0.12)",
                border: "1px solid #ef4444",
                borderRadius: "10px",
                color: "#ef4444",
                fontSize: "14px",
              }}
            >
              {errorMsg} Iltimos, to'g'ridan-to'g'ri <strong>+998 77 300 45 00</strong> ga qo'ng'iroq qiling yoki Telegram: <strong>@togo_group_pro</strong> orqali yozing.
            </div>
          )}

          <button
            type="submit"
            className="cta wide"
            disabled={status === "pending"}
            style={{ opacity: status === "pending" ? 0.7 : 1 }}
          >
            <span>{status === "pending" ? "YUBORILMOQDA..." : "HISOB-KITOB SO'RASH"}</span>
          </button>
        </form>
      )}
    </section>
  );
}
