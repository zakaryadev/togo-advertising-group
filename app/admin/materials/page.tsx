"use client";

import { useEffect, useState } from "react";

interface MaterialItem {
  id?: string;
  key: string;
  name_uz: string;
  name_ru?: string;
  name_en?: string;
  price_per_sqm: number;
  is_active: boolean;
}

export default function AdminMaterialsPage() {
  const [materials, setMaterials] = useState<MaterialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState<string | null>(null);

  const fetchMaterials = async () => {
    try {
      const res = await fetch("/api/admin/materials");
      const data = await res.json();
      if (data.materials) {
        setMaterials(data.materials);
      }
    } catch (err) {
      console.error("Fetch materials error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const handlePriceChange = (key: string, newPrice: number) => {
    setMaterials((prev) =>
      prev.map((item) => (item.key === key ? { ...item, price_per_sqm: newPrice } : item))
    );
  };

  const handleToggleActive = (key: string, currentStatus: boolean) => {
    setMaterials((prev) =>
      prev.map((item) => (item.key === key ? { ...item, is_active: !currentStatus } : item))
    );
  };

  const handleSaveMaterial = async (item: MaterialItem) => {
    setSavingKey(item.key);
    try {
      await fetch("/api/admin/materials", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: item.key,
          price_per_sqm: item.price_per_sqm,
          is_active: item.is_active,
        }),
      });
      alert(`"${item.name_uz}" narxi saqlandi!`);
    } catch (err) {
      console.error("Save material error:", err);
      alert("Saqlashda xatolik yuz berdi");
    } finally {
      setSavingKey(null);
    }
  };

  return (
    <div>
      <div className="admin-page-head">
        <div>
          <h1>Material Narxlari va Kalkulyator</h1>
          <p>Kalkulyatorda hisoblanadigan materiallarning 1 kv.m narxlarini tahrirlash</p>
        </div>
        <button onClick={fetchMaterials} className="admin-pill" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
          <span>Yangilash</span>
        </button>
      </div>

      <div className="admin-table-wrap">
        {loading ? (
          <div style={{ padding: "40px", textAlign: "center", color: "#948b74" }}>
            Materiallar yuklanmoqda...
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Kodi</th>
                <th>Material Nomi</th>
                <th>Narxi (1 kv.m / so'm)</th>
                <th>Holati</th>
                <th>Amal</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((item) => (
                <tr key={item.key}>
                  <td>
                    <code style={{ color: "#ffd24a" }}>{item.key}</code>
                  </td>
                  <td>
                    <strong style={{ color: "#f3efe2" }}>{item.name_uz}</strong>
                  </td>
                  <td>
                    <input
                      type="number"
                      className="admin-search-input"
                      style={{ width: "160px", padding: "6px 12px" }}
                      value={item.price_per_sqm}
                      onChange={(e) => handlePriceChange(item.key, Number(e.target.value))}
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => handleToggleActive(item.key, item.is_active)}
                      className={`admin-pill ${item.is_active ? "active" : ""}`}
                    >
                      {item.is_active ? "Faol" : "Nofaol"}
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleSaveMaterial(item)}
                      className="admin-login-btn"
                      style={{
                        padding: "6px 16px",
                        fontSize: "12px",
                        width: "auto",
                        marginTop: 0,
                      }}
                      disabled={savingKey === item.key}
                    >
                      {savingKey === item.key ? "Saqlanmoqda..." : "Saqlash"}
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
