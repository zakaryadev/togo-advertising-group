"use client";

import { useEffect, useState } from "react";

interface PortfolioItem {
  id: string;
  title: string;
  service_type: string;
  image_url: string;
  dimensions?: string | null;
  is_featured: boolean;
  is_active: boolean;
}

const categories = ["LED Logo", "LED Harf", "Lightbox", "Stend", "Avto reklama", "Tashqi reklama", "Poligrafiya", "UV Print"];

export default function AdminPortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [serviceType, setServiceType] = useState(categories[0]);
  const [dimensions, setDimensions] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isFeatured, setIsFeatured] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [uploadPreview, setUploadPreview] = useState("");

  const fetchItems = async () => {
    try {
      const res = await fetch("/api/admin/portfolio");
      const data = await res.json();
      if (data.items) {
        setItems(data.items);
      }
    } catch (err) {
      console.error("Fetch portfolio error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      setUploadPreview(URL.createObjectURL(selected));
    }
  };

  const handleUploadImage = async () => {
    if (!file) return null;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setImageUrl(data.url);
        return data.url;
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Rasm yuklashda xatolik yuz berdi");
    } finally {
      setUploading(false);
    }
    return null;
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    let finalUrl = imageUrl;
    if (file) {
      const uploadedUrl = await handleUploadImage();
      if (uploadedUrl) finalUrl = uploadedUrl;
    }

    if (!finalUrl) {
      alert("Iltimos, rasm yuklang yoki Rasm URL manzilini kiriting!");
      setSaving(false);
      return;
    }

    try {
      const res = await fetch("/api/admin/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          service_type: serviceType,
          image_url: finalUrl,
          dimensions,
          is_featured: isFeatured,
        }),
      });

      const data = await res.json();
      if (data.ok) {
        // Reset Form
        setTitle("");
        setDimensions("");
        setImageUrl("");
        setFile(null);
        setUploadPreview("");
        fetchItems();
      } else {
        alert(data.error || "Qo'shishda xatolik");
      }
    } catch (err) {
      console.error("Add project error:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleToggleFeatured = async (id: string, currentFeatured: boolean) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, is_featured: !currentFeatured } : item))
    );
    try {
      await fetch("/api/admin/portfolio", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, is_featured: !currentFeatured }),
      });
    } catch (err) {
      console.error("Toggle featured error:", err);
      fetchItems();
    }
  };

  const handleDelete = async (id: string, itemTitle: string) => {
    if (!confirm(`"${itemTitle}" loyihasini o'chirishni tasdiqlaysizmi?`)) return;

    setItems((prev) => prev.filter((item) => item.id !== id));
    try {
      await fetch(`/api/admin/portfolio?id=${id}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.error("Delete portfolio error:", err);
      fetchItems();
    }
  };

  return (
    <div>
      <div className="admin-page-head">
        <div>
          <h1>Ishlarimiz (Portfolio)</h1>
          <p>Mijozlar uchun bajarilgan yangi loyihalarni qo'shish va rasmlarini yuklash</p>
        </div>
        <button onClick={fetchItems} className="admin-pill">
          🔄 Yangilash
        </button>
      </div>

      {/* Add New Project Form */}
      <div
        className="admin-table-wrap"
        style={{ padding: "24px", marginBottom: "36px", background: "#141108" }}
      >
        <h3
          style={{
            fontSize: "16px",
            color: "#ffd24a",
            marginBottom: "20px",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          ➕ Yangi Loyiha Qo'shish
        </h3>

        <form onSubmit={handleAddProject} style={{ display: "grid", gap: "20px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div className="admin-form-group" style={{ marginBottom: 0 }}>
              <label>Loyiha / Mijoz Nomi *</label>
              <input
                type="text"
                placeholder="masalan: Mövenpick Hotel"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="admin-form-group" style={{ marginBottom: 0 }}>
              <label>Xizmat Toifasi *</label>
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="admin-search-input"
                style={{ width: "100%" }}
              >
                {categories.map((c) => (
                  <option key={c} value={c} style={{ background: "#141108" }}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div className="admin-form-group" style={{ marginBottom: 0 }}>
              <label>O'lcham / Tavsif (Ixtiyoriy)</label>
              <input
                type="text"
                placeholder="masalan: Fasad · 18 × 4 m"
                value={dimensions}
                onChange={(e) => setDimensions(e.target.value)}
              />
            </div>

            <div className="admin-form-group" style={{ marginBottom: 0 }}>
              <label>Loyiha Rasmi Fayli *</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="admin-search-input"
                style={{ width: "100%", padding: "8px 12px" }}
              />
            </div>
          </div>

          {uploadPreview && (
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <img
                src={uploadPreview}
                alt="Preview"
                style={{
                  width: "120px",
                  height: "80px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  border: "1px solid #ffd24a",
                }}
              />
              <span style={{ fontSize: "12px", color: "#4ade80" }}>
                ✓ Rasm tanlandi. Saqlash bosilganda yuklanadi.
              </span>
            </div>
          )}

          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                style={{ width: "18px", height: "18px", accentColor: "#ffd24a" }}
              />
              <span style={{ fontSize: "14px", color: "#f3efe2" }}>
                Bosh sahifa slayderida ko'rsatish (Tanlangan loyiha)
              </span>
            </label>

            <button
              type="submit"
              className="admin-login-btn"
              style={{ width: "auto", padding: "12px 32px", marginTop: 0, marginLeft: "auto" }}
              disabled={saving || uploading}
            >
              {saving || uploading ? "Saqlanmoqda..." : "LOYIHANI QO'SHISH →"}
            </button>
          </div>
        </form>
      </div>

      {/* Projects List */}
      <h2 style={{ fontSize: "18px", marginBottom: "16px", textTransform: "uppercase" }}>
        Mavjud Loyihalar ({items.length})
      </h2>

      <div className="admin-table-wrap">
        {loading ? (
          <div style={{ padding: "40px", textAlign: "center", color: "#948b74" }}>
            Loyihalar yuklanmoqda...
          </div>
        ) : items.length === 0 ? (
          <div style={{ padding: "40px", textAlign: "center", color: "#948b74" }}>
            Hali hech qanday loyiha qo'shilmagan.
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Rasm</th>
                <th>Loyiha Nomi</th>
                <th>Toifasi</th>
                <th>O'lchami</th>
                <th>Bosh Sahifada</th>
                <th>Amallar</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img
                      src={item.image_url}
                      alt={item.title}
                      style={{
                        width: "60px",
                        height: "40px",
                        objectFit: "cover",
                        borderRadius: "6px",
                        background: "#0a0905",
                      }}
                    />
                  </td>
                  <td>
                    <strong style={{ color: "#f3efe2" }}>{item.title}</strong>
                  </td>
                  <td>
                    <span className="admin-badge">{item.service_type}</span>
                  </td>
                  <td style={{ color: "#948b74" }}>{item.dimensions || "—"}</td>
                  <td>
                    <button
                      onClick={() => handleToggleFeatured(item.id, item.is_featured)}
                      className={`admin-pill ${item.is_featured ? "active" : ""}`}
                    >
                      {item.is_featured ? "★ Slayderda" : "○ Oddiy"}
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(item.id, item.title)}
                      style={{
                        background: "rgba(239, 68, 68, 0.15)",
                        border: "1px solid rgba(239, 68, 68, 0.3)",
                        color: "#fca5a5",
                        padding: "6px 12px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "12px",
                      }}
                    >
                      🗑 O'chirish
                    </button>
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
