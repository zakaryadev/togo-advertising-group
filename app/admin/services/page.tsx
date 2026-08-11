"use client";

import { useEffect, useState } from "react";

interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  from_price?: string;
  is_active?: boolean;
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("LED");
  const [fromPrice, setFromPrice] = useState("");

  const fetchServices = async () => {
    try {
      const res = await fetch("/api/admin/services");
      const data = await res.json();
      if (data.services) {
        setServices(data.services);
      }
    } catch (err) {
      console.error("Fetch admin services error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleFileUpload = async (file: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("bucket", "service-images");

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.url) {
        setImage(data.url);
      } else {
        alert(data.error || "Rasm yuklashda xatolik yuz berdi");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Rasm yuklashda xatolik yuz berdi");
    } finally {
      setUploading(false);
    }
  };

  const handleResetForm = () => {
    setTitle("");
    setExcerpt("");
    setImage("");
    setCategory("LED");
    setFromPrice("");
    setEditingId(null);
    setShowForm(false);
  };

  const handleEditClick = (item: ServiceItem) => {
    setEditingId(item.id);
    setTitle(item.title);
    setExcerpt(item.excerpt);
    setImage(item.image);
    setCategory(item.category);
    setFromPrice(item.from_price || "");
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      title,
      excerpt,
      image: image || "/img/services/led-harflar.webp",
      category,
      from_price: fromPrice,
    };

    try {
      if (editingId) {
        // Update existing service
        await fetch("/api/admin/services", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingId, ...payload }),
        });
      } else {
        // Create new service
        await fetch("/api/admin/services", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      handleResetForm();
      fetchServices();
    } catch (err) {
      console.error("Submit service error:", err);
      alert("Saqlashda xatolik yuz berdi");
    } finally {
      setSaving(false);
    }
  };

  const handleToggleActive = async (item: ServiceItem) => {
    const nextStatus = !item.is_active;
    setServices((prev) =>
      prev.map((s) => (s.id === item.id ? { ...s, is_active: nextStatus } : s))
    );

    try {
      await fetch("/api/admin/services", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id, is_active: nextStatus }),
      });
    } catch (err) {
      console.error("Toggle service error:", err);
      fetchServices();
    }
  };

  const handleDelete = async (id: string, itemTitle: string) => {
    if (!confirm(`"${itemTitle}" xizmatini o'chirishga ishonchingiz komilmi?`)) return;

    setServices((prev) => prev.filter((s) => s.id !== id));

    try {
      await fetch(`/api/admin/services?id=${id}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.error("Delete service error:", err);
      fetchServices();
    }
  };

  return (
    <div>
      <div className="admin-page-head">
        <div>
          <h1>Xizmatlar Boshqaruvi (Services CRUD)</h1>
          <p>Saytda ko'rsatiladigan barcha reklama xizmatlarini tahrirlash, qo'shish va o'chirish</p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button
            onClick={() => {
              if (showForm) handleResetForm();
              else setShowForm(true);
            }}
            className="admin-login-btn"
            style={{ margin: 0, padding: "8px 16px", display: "inline-flex", alignItems: "center", gap: "6px" }}
          >
            {showForm ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                <span>Yopish</span>
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                <span>Yangi Xizmat Qo'shish</span>
              </>
            )}
          </button>
          <button onClick={fetchServices} className="admin-pill" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
            <span>Yangilash</span>
          </button>
        </div>
      </div>

      {/* Add / Edit Form */}
      {showForm && (
        <div
          className="admin-table-wrap"
          style={{ padding: "24px", marginBottom: "32px", background: "#141108" }}
        >
          <h3
            style={{
              fontSize: "16px",
              color: "#ffd24a",
              marginBottom: "16px",
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            {editingId ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                <span>Xizmatni Tahrirlash</span>
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                <span>Yangi Xizmat Qo'shish</span>
              </>
            )}
          </h3>

          <form onSubmit={handleSubmit} style={{ display: "grid", gap: "16px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
              <div className="admin-form-group" style={{ marginBottom: 0 }}>
                <label>Xizmat Nomi *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="masalan: LED Harflar"
                />
              </div>

              <div className="admin-form-group" style={{ marginBottom: 0 }}>
                <label>Kategoriya *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="admin-search-input"
                  style={{ width: "100%" }}
                >
                  <option value="LED">LED</option>
                  <option value="Lightbox">Lightbox</option>
                  <option value="Banner">Banner</option>
                  <option value="Stend">Stend</option>
                  <option value="Avto">Avto reklama</option>
                  <option value="Sovg‘a">Sovg‘a va Statuetka</option>
                  <option value="Print">UV Print</option>
                  <option value="Boshqa">Boshqa</option>
                </select>
              </div>

              <div className="admin-form-group" style={{ marginBottom: 0 }}>
                <label>Boshlang'ich Narxi (masalan: 250 000 so'm/m²)</label>
                <input
                  type="text"
                  value={fromPrice}
                  onChange={(e) => setFromPrice(e.target.value)}
                  placeholder="250 000 so'm/m²"
                />
              </div>
            </div>

            <div className="admin-form-group" style={{ marginBottom: 0 }}>
              <label>Qisqacha Izoh / Tavsif *</label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                required
                placeholder="Xizmat haqida qisqacha ma'lumot..."
                rows={2}
                style={{
                  width: "100%",
                  background: "#0a0905",
                  border: "1px solid rgba(243, 239, 226, 0.15)",
                  borderRadius: "8px",
                  padding: "10px",
                  color: "#f3efe2",
                }}
              />
            </div>

            {/* Image upload section */}
            <div className="admin-form-group" style={{ marginBottom: 0 }}>
              <label>Rasm URL Manzili yoki Yuklash</label>
              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="/img/services/led-harflar.webp yoki https://..."
                  style={{ flex: 1 }}
                />
                <label
                  className="admin-pill"
                  style={{ cursor: "pointer", background: "#ffd24a", color: "#0d0c08", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "6px" }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                  <span>{uploading ? "Yuklanmoqda..." : "Rasm Yuklash"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      if (e.target.files?.[0]) handleFileUpload(e.target.files[0]);
                    }}
                  />
                </label>
              </div>
              {image && (
                <div style={{ marginTop: "10px", display: "flex", alignItems: "center", gap: "12px" }}>
                  <img
                    src={image}
                    alt="Preview"
                    style={{ width: "80px", height: "60px", objectFit: "cover", borderRadius: "6px" }}
                  />
                  <span style={{ fontSize: "12px", color: "#4ade80", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                    Rasm biriktirildi
                  </span>
                </div>
              )}
            </div>

            <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
              <button
                type="button"
                onClick={handleResetForm}
                className="admin-pill"
                style={{ padding: "8px 16px" }}
              >
                Bekor Qilish
              </button>
              <button
                type="submit"
                className="admin-login-btn"
                style={{ width: "auto", padding: "8px 24px", margin: 0 }}
                disabled={saving}
              >
                {saving ? "Saqlanmoqda..." : editingId ? "YANGILASH →" : "SAQLASH →"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Services List Table */}
      <div className="admin-table-wrap">
        {loading ? (
          <div style={{ padding: "40px", textAlign: "center", color: "#948b74" }}>
            Xizmatlar yuklanmoqda...
          </div>
        ) : services.length === 0 ? (
          <div style={{ padding: "40px", textAlign: "center", color: "#948b74" }}>
            Hech qanday xizmat topilmadi.
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Rasm</th>
                <th>Xizmat Nomi</th>
                <th>Kategoriya</th>
                <th>Tavsif</th>
                <th>Narxi</th>
                <th>Holati</th>
                <th>Amallar</th>
              </tr>
            </thead>
            <tbody>
              {services.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img
                      src={item.image || "/img/services/led-harflar.webp"}
                      alt={item.title}
                      style={{ width: "60px", height: "45px", objectFit: "cover", borderRadius: "6px" }}
                    />
                  </td>
                  <td>
                    <strong style={{ color: "#f3efe2" }}>{item.title}</strong>
                  </td>
                  <td>
                    <span className="admin-pill" style={{ fontSize: "11px" }}>
                      {item.category}
                    </span>
                  </td>
                  <td style={{ maxWidth: "260px", color: "#948b74", fontSize: "13px" }}>
                    {item.excerpt}
                  </td>
                  <td style={{ color: "#ffd24a", fontWeight: 600 }}>
                    {item.from_price || "—"}
                  </td>
                  <td>
                    <button
                      onClick={() => handleToggleActive(item)}
                      style={{ background: "none", border: 0, cursor: "pointer", padding: 0 }}
                    >
                      <span className={`status-tag ${item.is_active !== false ? "closed" : "new"}`}>
                        {item.is_active !== false ? "Faol" : "Nofaol"}
                      </span>
                    </button>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button
                        onClick={() => handleEditClick(item)}
                        style={{
                          background: "rgba(255, 210, 74, 0.15)",
                          border: "1px solid rgba(255, 210, 74, 0.3)",
                          color: "#ffd24a",
                          padding: "4px 10px",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontSize: "12px",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                        <span>Tahrirlash</span>
                      </button>
                      <button
                        onClick={() => handleDelete(item.id, item.title)}
                        style={{
                          background: "rgba(239, 68, 68, 0.15)",
                          border: "1px solid rgba(239, 68, 68, 0.3)",
                          color: "#fca5a5",
                          padding: "4px 10px",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontSize: "12px",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                        <span>O'chirish</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
