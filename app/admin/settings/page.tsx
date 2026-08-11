"use client";

import { useEffect, useState } from "react";

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [phone, setPhone] = useState("+998 77 300 45 00");
  const [phoneHref, setPhoneHref] = useState("tel:+998773004500");
  const [email, setEmail] = useState("info@togogrouppro.uz");
  const [address, setAddress] = useState("Toshkent, Chilonzor tumani");
  const [hours, setHours] = useState("Dushanba — Shanba, 09:00 — 18:00");
  const [instagram, setInstagram] = useState("https://www.instagram.com/reklama_togo_group/");
  const [telegram, setTelegram] = useState("https://t.me/togo_group_pro");
  const [youtube, setYoutube] = useState("https://www.youtube.com/@togogrouppro");

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/admin/settings");
      const data = await res.json();
      if (data.settings) {
        const s = data.settings;
        if (s.contact_phone) setPhone(s.contact_phone);
        if (s.contact_phone_href) setPhoneHref(s.contact_phone_href);
        if (s.contact_email) setEmail(s.contact_email);
        if (s.contact_address) setAddress(s.contact_address);
        if (s.contact_hours) setHours(s.contact_hours);
        if (s.social_instagram) setInstagram(s.social_instagram);
        if (s.social_telegram) setTelegram(s.social_telegram);
        if (s.social_youtube) setYoutube(s.social_youtube);
      }
    } catch (err) {
      console.error("Fetch settings error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      settings: {
        contact_phone: phone,
        contact_phone_href: phoneHref || `tel:${phone.replace(/\s+/g, "")}`,
        contact_email: email,
        contact_address: address,
        contact_hours: hours,
        social_instagram: instagram,
        social_telegram: telegram,
        social_youtube: youtube,
      },
    };

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.ok) {
        alert("Aloqa va ijtimoiy tarmoq sozlamalari saqlandi!");
      } else {
        alert(data.error || "Saqlashda xatolik yuz berdi");
      }
    } catch (err) {
      console.error("Save settings error:", err);
      alert("Saqlashda xatolik yuz berdi");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="admin-page-head">
        <div>
          <h1>Aloqa va Sozlamalar</h1>
          <p>Saytdagi telefon raqami, manzil, email va ijtimoiy tarmoq havolalarini tahrirlash</p>
        </div>
        <button onClick={fetchSettings} className="admin-pill" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
          <span>Yangilash</span>
        </button>
      </div>

      <div
        className="admin-table-wrap"
        style={{ padding: "28px", maxWidth: "800px", background: "#141108" }}
      >
        {loading ? (
          <div style={{ textAlign: "center", color: "#948b74", padding: "20px" }}>
            Sozlamalar yuklanmoqda...
          </div>
        ) : (
          <form onSubmit={handleSaveSettings} style={{ display: "grid", gap: "24px" }}>
            <h3 style={{ fontSize: "16px", color: "#ffd24a", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "8px" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span>Aloqa Ma'lumotlari</span>
            </h3>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div className="admin-form-group" style={{ marginBottom: 0 }}>
                <label>Telefon Raqami *</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              <div className="admin-form-group" style={{ marginBottom: 0 }}>
                <label>Telefon Linki (href)</label>
                <input
                  type="text"
                  value={phoneHref}
                  onChange={(e) => setPhoneHref(e.target.value)}
                  placeholder="tel:+998773004500"
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div className="admin-form-group" style={{ marginBottom: 0 }}>
                <label>Email Manzili *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="admin-form-group" style={{ marginBottom: 0 }}>
                <label>Ish Vaqtlari</label>
                <input
                  type="text"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                />
              </div>
            </div>

            <div className="admin-form-group" style={{ marginBottom: 0 }}>
              <label>Manzil *</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <hr style={{ borderColor: "rgba(243, 239, 226, 0.1)", margin: "8px 0" }} />

            <h3 style={{ fontSize: "16px", color: "#ffd24a", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "8px" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              <span>Ijtimoiy Tarmoqlar</span>
            </h3>

            <div className="admin-form-group" style={{ marginBottom: 0 }}>
              <label>Telegram Havolasi</label>
              <input
                type="url"
                value={telegram}
                onChange={(e) => setTelegram(e.target.value)}
                placeholder="https://t.me/togo_group_pro"
              />
            </div>

            <div className="admin-form-group" style={{ marginBottom: 0 }}>
              <label>Instagram Havolasi</label>
              <input
                type="url"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                placeholder="https://www.instagram.com/reklama_togo_group/"
              />
            </div>

            <div className="admin-form-group" style={{ marginBottom: 0 }}>
              <label>YouTube Havolasi</label>
              <input
                type="url"
                value={youtube}
                onChange={(e) => setYoutube(e.target.value)}
                placeholder="https://www.youtube.com/@togogrouppro"
              />
            </div>

            <button
              type="submit"
              className="admin-login-btn"
              style={{ marginTop: "12px" }}
              disabled={saving}
            >
              {saving ? "Saqlanmoqda..." : "SOZLAMALARNI SAQLASH →"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
