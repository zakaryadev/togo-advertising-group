"use client";

import { useEffect, useState } from "react";

interface Lead {
  id: string;
  name: string;
  phone: string;
  service: string | null;
  message: string | null;
  status: "new" | "contacted" | "closed";
  created_at: string;
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "new" | "contacted" | "closed">("all");
  const [showAddForm, setShowAddForm] = useState(false);

  // New Lead Form State
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newService, setNewService] = useState("LED Harflar");
  const [newMessage, setNewMessage] = useState("");

  const fetchLeads = async () => {
    try {
      const res = await fetch("/api/admin/leads");
      const data = await res.json();
      if (data.leads) {
        setLeads(data.leads);
      }
    } catch (err) {
      console.error("Fetch leads error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleStatusChange = async (id: string, currentStatus: string) => {
    let nextStatus: "new" | "contacted" | "closed" = "contacted";
    if (currentStatus === "new") nextStatus = "contacted";
    else if (currentStatus === "contacted") nextStatus = "closed";
    else if (currentStatus === "closed") nextStatus = "new";

    // Optimistic UI update
    setLeads((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: nextStatus } : item))
    );

    try {
      await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: nextStatus }),
      });
    } catch (err) {
      console.error("Update status error:", err);
      fetchLeads(); // Rollback on error
    }
  };

  const handleDeleteLead = async (id: string, name: string) => {
    if (!confirm(`"${name}" murojaatini o'chirishni tasdiqlaysizmi?`)) return;

    setLeads((prev) => prev.filter((item) => item.id !== id));
    try {
      await fetch(`/api/admin/leads?id=${id}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.error("Delete lead error:", err);
      fetchLeads();
    }
  };

  const handleAddLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newName,
          phone: newPhone,
          service: newService,
          message: newMessage,
        }),
      });

      const data = await res.json();
      if (data.ok) {
        setNewName("");
        setNewPhone("");
        setNewMessage("");
        setShowAddForm(false);
        fetchLeads();
      } else {
        alert(data.error || "Murojaat qo'shishda xatolik");
      }
    } catch (err) {
      console.error("Add lead error:", err);
    } finally {
      setSaving(false);
    }
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.service && lead.service.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (lead.message && lead.message.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesFilter = activeFilter === "all" || lead.status === activeFilter;

    return matchesSearch && matchesFilter;
  });

  const totalCount = leads.length;
  const newCount = leads.filter((l) => l.status === "new").length;
  const contactedCount = leads.filter((l) => l.status === "contacted").length;
  const closedCount = leads.filter((l) => l.status === "closed").length;

  return (
    <div>
      <div className="admin-page-head">
        <div>
          <h1>Murojaatlar (Lidlar)</h1>
          <p>Saytdan kelgan va qo'lda kiritilgan barcha murojaatlar ro'yxati</p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button onClick={() => setShowAddForm(!showAddForm)} className="admin-login-btn" style={{ margin: 0, padding: "8px 16px", display: "inline-flex", alignItems: "center", gap: "6px" }}>
            {showAddForm ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                <span>Yopish</span>
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                <span>Yangi Lid Qo'shish</span>
              </>
            )}
          </button>
          <button onClick={fetchLeads} className="admin-pill" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
            <span>Yangilash</span>
          </button>
        </div>
      </div>

      {/* Manual Add Lead Form */}
      {showAddForm && (
        <div className="admin-table-wrap" style={{ padding: "24px", marginBottom: "32px", background: "#141108" }}>
          <h3 style={{ fontSize: "16px", color: "#ffd24a", marginBottom: "16px", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "8px" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Qo'lda Yangi Murojaat Qo'shish
          </h3>
          <form onSubmit={handleAddLeadSubmit} style={{ display: "grid", gap: "16px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
              <div className="admin-form-group" style={{ marginBottom: 0 }}>
                <label>Foydalanuvchi Ismi *</label>
                <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} required placeholder="masalan: Alisher Navoiy" />
              </div>
              <div className="admin-form-group" style={{ marginBottom: 0 }}>
                <label>Telefon Raqami *</label>
                <input type="text" value={newPhone} onChange={(e) => setNewPhone(e.target.value)} required placeholder="+998 90 123 45 67" />
              </div>
              <div className="admin-form-group" style={{ marginBottom: 0 }}>
                <label>Xizmat Turi</label>
                <select value={newService} onChange={(e) => setNewService(e.target.value)} className="admin-search-input" style={{ width: "100%" }}>
                  <option value="LED Harflar">LED Harflar</option>
                  <option value="Lightbox">Lightbox</option>
                  <option value="Tashqi reklama">Tashqi reklama</option>
                  <option value="Stend">Stend</option>
                  <option value="Avto reklama">Avto reklama</option>
                  <option value="Poligrafiya">Poligrafiya</option>
                </select>
              </div>
            </div>
            <div className="admin-form-group" style={{ marginBottom: 0 }}>
              <label>Xabar / Izoh</label>
              <textarea value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Loyiha haqida qisqacha ma'lumot..." rows={2} style={{ width: "100%", background: "#0a0905", border: "1px solid rgba(243, 239, 226, 0.15)", borderRadius: "8px", padding: "10px", color: "#f3efe2" }} />
            </div>
            <button type="submit" className="admin-login-btn" style={{ width: "auto", padding: "10px 24px", margin: "8px 0 0 auto" }} disabled={saving}>
              {saving ? "Saqlanmoqda..." : "SAQLASH →"}
            </button>
          </form>
        </div>
      )}

      {/* Stats Overview */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <span>Jami Murojaatlar</span>
          <b>{totalCount}</b>
        </div>
        <div className="admin-stat-card">
          <span>Yangi Lidlar</span>
          <b style={{ color: "#ffd24a" }}>{newCount}</b>
        </div>
        <div className="admin-stat-card">
          <span>Bog'lanilgan</span>
          <b style={{ color: "#60a5fa" }}>{contactedCount}</b>
        </div>
        <div className="admin-stat-card">
          <span>Yopilgan / Muvaffaqiyatli</span>
          <b style={{ color: "#4ade80" }}>{closedCount}</b>
        </div>
      </div>

      {/* Toolbar & Filters */}
      <div className="admin-toolbar">
        <input
          type="text"
          className="admin-search-input"
          placeholder="Ism, telefon yoki xizmat bo'yicha qidiruv..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="admin-filter-pills">
          <button
            className={`admin-pill ${activeFilter === "all" ? "active" : ""}`}
            onClick={() => setActiveFilter("all")}
          >
            Barchasi ({totalCount})
          </button>
          <button
            className={`admin-pill ${activeFilter === "new" ? "active" : ""}`}
            onClick={() => setActiveFilter("new")}
          >
            Yangi ({newCount})
          </button>
          <button
            className={`admin-pill ${activeFilter === "contacted" ? "active" : ""}`}
            onClick={() => setActiveFilter("contacted")}
          >
            Bog'lanilgan ({contactedCount})
          </button>
          <button
            className={`admin-pill ${activeFilter === "closed" ? "active" : ""}`}
            onClick={() => setActiveFilter("closed")}
          >
            Yopilgan ({closedCount})
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="admin-table-wrap">
        {loading ? (
          <div style={{ padding: "40px", textAlign: "center", color: "#948b74" }}>
            Lidlar yuklanmoqda...
          </div>
        ) : filteredLeads.length === 0 ? (
          <div style={{ padding: "40px", textAlign: "center", color: "#948b74" }}>
            Hech qanday murojaat topilmadi.
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Foydalanuvchi</th>
                <th>Telefon</th>
                <th>Xizmat Turi</th>
                <th>Xabar</th>
                <th>Sana</th>
                <th>Holat (Status)</th>
                <th>Amallar</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => (
                <tr key={lead.id}>
                  <td>
                    <strong style={{ color: "#f3efe2" }}>{lead.name}</strong>
                  </td>
                  <td>
                    <a
                      href={`tel:${lead.phone.replace(/\s+/g, "")}`}
                      style={{ color: "#ffd24a", textDecoration: "none" }}
                    >
                      {lead.phone}
                    </a>
                  </td>
                  <td>{lead.service || "Umumiy murojaat"}</td>
                  <td style={{ maxWidth: "260px", color: "#948b74" }}>
                    {lead.message || "—"}
                  </td>
                  <td style={{ fontSize: "12px", color: "#948b74" }}>
                    {new Date(lead.created_at).toLocaleString("uz-UZ", {
                      day: "2-digit",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td>
                    <button
                      onClick={() => handleStatusChange(lead.id, lead.status)}
                      style={{ background: "none", border: 0, cursor: "pointer", padding: 0 }}
                      title="Statusni o'zgartirish uchun bosing"
                    >
                      <span className={`status-tag ${lead.status}`}>
                        {lead.status === "new"
                          ? "Yangi"
                          : lead.status === "contacted"
                          ? "Bog'lanildi"
                          : "Yopildi"}
                      </span>
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteLead(lead.id, lead.name)}
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
