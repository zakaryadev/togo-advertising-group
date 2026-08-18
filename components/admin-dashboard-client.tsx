"use client";

import React, { useState, useRef } from "react";
import { Upload, Trash2, ArrowLeft, Image as ImageIcon, Loader2, CheckCircle2, AlertCircle, Pencil, X, Save, Replace } from "lucide-react";

export type UploadedAsset = {
  id?: string;
  source: string;
  category: string;
  filename: string;
  webpSrc: string;
  title?: string;
  isStatic?: boolean;
};

type Props = {
  initialUploads: UploadedAsset[];
  locale: string;
};

const categoryLabels: Record<string, string> = {
  f1: "Banner va katta formatli bosma",
  f2: "Obyomli harflar",
  f3: "Kran reklamasi",
  f4: "Avto brending",
  f5: "Stendlar",
  f6: "Tablichka va navigatsiya",
  f7: "Poligrafiya",
  f8: "Suvenirlar",
};

// Subcategories per category
const subcategoryMap: Record<string, { key: string; label: string }[]> = {
  f1: [
    { key: "baner", label: "Baner bosma" }, { key: "setka", label: "Setka" },
    { key: "backlit", label: "Backlit" }, { key: "orakal", label: "Orakal bosma" },
    { key: "tumanka", label: "Tumanka va plyonka" }, { key: "uv", label: "UV bosma" },
    { key: "tosiq", label: "Qurilish to'sig'i" },
  ],
  f2: [
    { key: "harf", label: "Obyomli harf" }, { key: "kontrajur", label: "Kontrajur yoritish" },
    { key: "quti", label: "Yorug'lik qutisi" }, { key: "neon", label: "Neon reklama" },
    { key: "led", label: "LED ekran" }, { key: "qator", label: "Yuguruvchi qator" },
    { key: "fasad", label: "Fasad (Alyukabond)" }, { key: "tom", label: "Tom ustiga logotip" },
  ],
  f3: [
    { key: "kran", label: "Kran reklamasi" }, { key: "brandmauer", label: "Brandmauer" },
    { key: "setka", label: "Fasad setkasi" }, { key: "tosiq", label: "Qurilish to'sig'i" },
    { key: "tom", label: "Tom ustiga logotip" },
  ],
  f4: [
    { key: "yengil", label: "Yengil avtomobil" }, { key: "yuk", label: "Yuk mashina va furgon" },
    { key: "avtobus", label: "Avtobus" }, { key: "texnika", label: "Maxsus texnika" },
    { key: "perfo", label: "Oyna perforatsiyasi" }, { key: "tonirovka", label: "Tonirovka" },
  ],
  f5: [
    { key: "rollup", label: "Roll Up" }, { key: "popup", label: "Pop Up" },
    { key: "promo", label: "Promo stol" }, { key: "pauchok", label: "Pauchok" },
    { key: "shtender", label: "Shtender" }, { key: "stella", label: "Stella" },
    { key: "vistavka", label: "Ko'rgazma stendi" }, { key: "presswall", label: "Press-wall" },
    { key: "parus", label: "Parus bayroq" },
  ],
  f6: [
    { key: "ofis", label: "Ofis tablichkasi" }, { key: "navigatsiya", label: "Navigatsiya" },
    { key: "stend", label: "Ma'lumot stendi" }, { key: "xavfsizlik", label: "Xavfsizlik belgilari" },
    { key: "beydjik", label: "Nomercha va beydjik" }, { key: "gravyura", label: "Lazer gravyura" },
  ],
  f7: [
    { key: "bloknot", label: "Bloknot" }, { key: "kubarik", label: "Kubarik" },
    { key: "vizitka", label: "Vizitka" }, { key: "flayer", label: "Flayer" },
    { key: "buklet", label: "Buklet" }, { key: "katalog", label: "Katalog" },
    { key: "kalendar", label: "Kalendar" }, { key: "papka", label: "Papka" },
    { key: "paket", label: "Logotipli paket" }, { key: "blank", label: "Blank va konvert" },
  ],
  f8: [
    { key: "bokal", label: "Bokal" }, { key: "termos", label: "Termos" },
    { key: "ruchka", label: "Ruchka" }, { key: "bloknot", label: "Bloknot" },
    { key: "statuetka", label: "Statuetka" }, { key: "futbolka", label: "Futbolka va sweatshirt" },
    { key: "kepka", label: "Kepka" }, { key: "sumka", label: "Eko-sumka" },
    { key: "fleshka", label: "Logotipli fleshka" }, { key: "soyabon", label: "Soyabon" },
    { key: "kaska", label: "Qurilish kaskasi" }, { key: "forma", label: "Ish formasi" },
    { key: "toplam", label: "Sovg'a to'plami" },
  ],
};

export default function AdminDashboardClient({ initialUploads, locale }: Props) {
  const [uploads, setUploads] = useState<UploadedAsset[]>(initialUploads);
  const [category, setCategory] = useState<string>("f1");
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deletingSource, setDeletingSource] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Edit modal state
  const [editingAsset, setEditingAsset] = useState<UploadedAsset | null>(null);
  const [editCategory, setEditCategory] = useState("");
  const [editSubcategory, setEditSubcategory] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editImageFile, setEditImageFile] = useState<File | null>(null);
  const [editImagePreview, setEditImagePreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const editFileInputRef = useRef<HTMLInputElement>(null);

  // Filter state
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const triggerNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  // ─── Upload handlers ────────────────────────────────────────────────────────

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault(); setIsDragging(false);
    if (e.dataTransfer.files?.length) await uploadFiles(e.dataTransfer.files);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) await uploadFiles(e.target.files);
  };

  const uploadFiles = async (files: FileList) => {
    setUploading(true);
    let ok = 0, fail = 0;
    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append("file", files[i]);
      formData.append("category", category);
      try {
        const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
        const data = await res.json();
        if (res.ok && data.success) {
          ok++;
          setUploads(prev => [{ id: `up-${Date.now()}-${Math.random()}`, source: data.optimized, category, filename: data.original.split("/").pop() || "", webpSrc: data.optimized, title: data.original.split("/").pop()?.replace(/\.[^.]+$/, "") || "" }, ...prev]);
        } else { fail++; }
      } catch { fail++; }
    }
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (ok > 0 && fail === 0) triggerNotification("success", `${ok} ta rasm yuklandi!`);
    else if (ok > 0) triggerNotification("success", `${ok} yuklandi, ${fail} xato.`);
    else triggerNotification("error", "Yuklashda xatolik.");
  };

  // ─── Delete handler ─────────────────────────────────────────────────────────

  const handleDelete = async (asset: UploadedAsset) => {
    if (!confirm(`Rasmni o'chirmoqchimisiz?\n${asset.title || asset.filename}`)) return;
    setDeletingSource(asset.source);
    try {
      const res = await fetch("/api/admin/delete", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: asset.source, category: asset.category }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setUploads(prev => prev.filter(i => i.source !== asset.source));
        triggerNotification("success", "Rasm o'chirildi.");
      } else triggerNotification("error", `Xatolik: ${data.error}`);
    } catch { triggerNotification("error", "O'chirishda tarmoq xatoligi."); }
    finally { setDeletingSource(null); }
  };

  // ─── Edit handlers ──────────────────────────────────────────────────────────

  const openEditModal = (asset: UploadedAsset) => {
    setEditingAsset(asset);
    setEditCategory(asset.category);
    setEditSubcategory((subcategoryMap[asset.category] || [])[0]?.key || "");
    setEditTitle(asset.title || asset.filename.replace(/\.[^.]+$/, "").replace(/-/g, " "));
    setEditImageFile(null);
    setEditImagePreview(null);
  };

  const closeEditModal = () => {
    setEditingAsset(null);
    setEditImageFile(null);
    setEditImagePreview(null);
  };

  const handleEditImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setEditImageFile(file);
      const reader = new FileReader();
      reader.onload = (ev) => setEditImagePreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleCategoryChange = (newCat: string) => {
    setEditCategory(newCat);
    setEditSubcategory((subcategoryMap[newCat] || [])[0]?.key || "");
  };

  const handleSaveEdit = async () => {
    if (!editingAsset) return;
    setSaving(true);
    try {
      const validUrl = editingAsset.webpSrc || editingAsset.source;
      const formData = new FormData();
      formData.append("imageUrl", validUrl);
      formData.append("category", editCategory);
      formData.append("subcategory", editSubcategory);
      formData.append("title", editTitle);
      formData.append("isStatic", String(!!editingAsset.isStatic));
      if (editImageFile) formData.append("newImage", editImageFile);

      const res = await fetch("/api/admin/update", { method: "POST", body: formData });
      const data = await res.json();

      if (res.ok && data.success) {
        const newUrl = data.imageUrl || validUrl;
        setUploads(prev => prev.map(item =>
          item.source === editingAsset.source || item.webpSrc === editingAsset.webpSrc
            ? { ...item, source: newUrl, webpSrc: newUrl, category: editCategory, title: editTitle, isStatic: false }
            : item
        ));
        triggerNotification("success", "Rasm muvaffaqiyatli yangilandi!");
        closeEditModal();
      } else triggerNotification("error", `Xatolik: ${data.error}`);
    } catch { triggerNotification("error", "Yangilashda tarmoq xatoligi."); }
    finally { setSaving(false); }
  };

  // ─── Filtered uploads ───────────────────────────────────────────────────────

  const filtered = filterCategory === "all" ? uploads : uploads.filter(u => u.category === filterCategory);

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <div style={S.container}>
      {/* Edit Modal */}
      {editingAsset && (
        <div style={S.overlay} onClick={closeEditModal}>
          <div style={S.modal} onClick={e => e.stopPropagation()}>
            <div style={S.modalHead}>
              <h3 style={S.modalTitle}>Rasmni tahrirlash</h3>
              <button onClick={closeEditModal} style={S.closeBtn}><X size={20} /></button>
            </div>

            {/* Preview with Replace */}
            <div style={S.previewArea}>
              <img
                src={editImagePreview || editingAsset.webpSrc}
                alt={editingAsset.filename}
                style={S.previewImg}
              />
              <button
                onClick={() => editFileInputRef.current?.click()}
                style={S.replaceBtn}
                disabled={saving}
              >
                <Replace size={16} />
                <span>Rasmni almashtirish</span>
              </button>
              <input
                ref={editFileInputRef}
                type="file"
                accept="image/*,.heic,.HEIC"
                onChange={handleEditImageSelect}
                style={{ display: "none" }}
              />
              {editImageFile && (
                <div style={S.newFileBadge}>
                  Yangi: {editImageFile.name} ({(editImageFile.size / 1024).toFixed(0)} KB)
                </div>
              )}
            </div>

            <div style={S.modalBody}>
              {/* Title */}
              <div style={S.fg}>
                <label style={S.lbl}>Nomi</label>
                <input type="text" value={editTitle} onChange={e => setEditTitle(e.target.value)}
                  placeholder="Rasm nomi..." style={S.inp} disabled={saving} />
              </div>

              {/* Category */}
              <div style={S.fg}>
                <label style={S.lbl}>Kategoriya</label>
                <select value={editCategory} onChange={e => handleCategoryChange(e.target.value)}
                  style={S.sel} disabled={saving}>
                  {Object.entries(categoryLabels).map(([k, v]) => (
                    <option key={k} value={k}>{v} ({k.toUpperCase()})</option>
                  ))}
                </select>
              </div>

              {/* Subcategory */}
              <div style={S.fg}>
                <label style={S.lbl}>Subkategoriya</label>
                <select value={editSubcategory} onChange={e => setEditSubcategory(e.target.value)}
                  style={S.sel} disabled={saving}>
                  {(subcategoryMap[editCategory] || []).map(sc => (
                    <option key={sc.key} value={sc.key}>{sc.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={S.modalFoot}>
              <button onClick={closeEditModal} style={S.cancelBtn} disabled={saving}>Bekor qilish</button>
              <button onClick={handleSaveEdit} style={S.saveBtn} disabled={saving}>
                {saving ? <><Loader2 size={16} style={S.spin} /><span>Saqlanmoqda...</span></> :
                  <><Save size={16} /><span>Saqlash</span></>}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header style={S.header}>
        <div style={S.headerIn}>
          <div style={S.logoG}>
            <ImageIcon size={28} style={{ color: "var(--lime)" }} />
            <div>
              <h1 style={S.title}>TOGO GROUP</h1>
              <p style={S.sub}>Admin panel / Portfolio boshqaruvi</p>
            </div>
          </div>
          <a href={`/${locale}/portfolio`} style={S.backBtn}>
            <ArrowLeft size={16} /><span>Portfolioga qaytish</span>
          </a>
        </div>
      </header>

      <main style={S.main}>
        {/* Toast */}
        {notification && (
          <div style={{ ...S.toast,
            backgroundColor: notification.type === "success" ? "rgba(223,255,0,0.15)" : "rgba(239,68,68,0.15)",
            borderColor: notification.type === "success" ? "var(--lime)" : "#ef4444",
          }}>
            {notification.type === "success" ? <CheckCircle2 size={20} color="var(--lime)" /> : <AlertCircle size={20} color="#ef4444" />}
            <span style={S.toastTxt}>{notification.message}</span>
          </div>
        )}

        <div style={S.grid}>
          {/* Upload Section */}
          <div style={S.card}>
            <h2 style={S.cardH}>Yangi rasm yuklash</h2>
            <div style={S.fg}>
              <label style={S.lbl}>Kategoriya</label>
              <select value={category} onChange={e => setCategory(e.target.value)} style={S.sel}>
                {Object.entries(categoryLabels).map(([k, v]) => (
                  <option key={k} value={k}>{v} ({k.toUpperCase()})</option>
                ))}
              </select>
            </div>
            <div
              onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              style={{ ...S.dropzone,
                borderColor: isDragging ? "var(--lime)" : "var(--line)",
                backgroundColor: isDragging ? "rgba(223,255,0,0.05)" : "rgba(13,15,16,0.5)",
              }}
            >
              <input type="file" ref={fileInputRef} onChange={handleFileChange} multiple accept="image/*,.heic,.HEIC" style={{ display: "none" }} />
              {uploading ? (
                <div style={S.dzInner}><Loader2 size={40} style={S.spin} /><p style={S.dzText}>Yuklanmoqda...</p></div>
              ) : (
                <div style={S.dzInner}>
                  <Upload size={40} style={{ color: isDragging ? "var(--lime)" : "var(--muted)", marginBottom: 12 }} />
                  <p style={S.dzText}>Bosib tanlang yoki sudrab olib keling</p>
                  <p style={S.dzHint}>Avtomatik WebP optimizatsiya</p>
                </div>
              )}
            </div>
          </div>

          {/* Image Grid */}
          <div style={{ ...S.card, gridColumn: "span 2" }}>
            <div style={S.listHead}>
              <h2 style={S.cardH}>Barcha rasmlar ({filtered.length})</h2>
              <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} style={{ ...S.sel, maxWidth: 220 }}>
                <option value="all">Hammasi ({uploads.length})</option>
                {Object.entries(categoryLabels).map(([k, v]) => {
                  const cnt = uploads.filter(u => u.category === k).length;
                  return <option key={k} value={k}>{v} ({cnt})</option>;
                })}
              </select>
            </div>

            {filtered.length === 0 ? (
              <div style={S.empty}>
                <ImageIcon size={48} style={{ color: "var(--line)", marginBottom: 12 }} />
                <p style={S.emptyTxt}>Rasmlar topilmadi</p>
              </div>
            ) : (
              <div style={S.thumbGrid}>
                {filtered.map((asset, index) => (
                  <div key={asset.id || `item-${asset.source}-${index}`} style={S.assetCard}>
                    <div style={S.thumbWrap}>
                      <img src={asset.webpSrc} alt={asset.filename} style={S.thumb} />
                      <div style={S.catTag}>{asset.category.toUpperCase()}</div>
                      {asset.isStatic && <div style={S.staticTag}>STATIK</div>}
                      <div style={S.actBar}>
                        <button onClick={() => openEditModal(asset)} style={S.editBtn} title="Tahrirlash">
                          <Pencil size={14} />
                        </button>
                        {!asset.isStatic && (
                          <button onClick={() => handleDelete(asset)} disabled={deletingSource === asset.source}
                            style={S.delBtn} title="O'chirish">
                            {deletingSource === asset.source ? <Loader2 size={14} style={S.spinSm} /> : <Trash2 size={14} />}
                          </button>
                        )}
                      </div>
                    </div>
                    <div style={S.meta}>
                      <p style={S.metaName} title={asset.title || asset.filename}>{asset.title || asset.filename}</p>
                      <p style={S.metaCat}>{categoryLabels[asset.category] || asset.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const S: Record<string, React.CSSProperties> = {
  container: { backgroundColor: "var(--bg)", minHeight: "100vh", color: "var(--text)", fontFamily: "Inter, system-ui, sans-serif" },

  // Modal
  overlay: { position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: 16 },
  modal: { backgroundColor: "var(--surface)", border: "1px solid var(--line)", borderRadius: 16, width: "100%", maxWidth: 500, overflow: "hidden", boxShadow: "0 25px 60px -10px rgba(0,0,0,0.8)", animation: "slideIn 0.2s ease" },
  modalHead: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", borderBottom: "1px solid var(--line)" },
  modalTitle: { fontSize: 17, fontWeight: 700, margin: 0 },
  closeBtn: { backgroundColor: "transparent", border: "none", color: "var(--muted)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 4, borderRadius: 6 },
  previewArea: { position: "relative", height: 220, overflow: "hidden", backgroundColor: "#141617", display: "flex", alignItems: "center", justifyContent: "center" },
  previewImg: { width: "100%", height: "100%", objectFit: "cover" },
  replaceBtn: { position: "absolute", bottom: 12, left: 12, backgroundColor: "rgba(2,3,3,0.85)", color: "var(--lime)", border: "1px solid rgba(223,255,0,0.3)", borderRadius: 8, padding: "8px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, backdropFilter: "blur(4px)", transition: "background-color 0.2s" },
  newFileBadge: { position: "absolute", top: 12, right: 12, backgroundColor: "rgba(223,255,0,0.9)", color: "#020303", fontSize: 11, fontWeight: 700, padding: "4px 8px", borderRadius: 4 },
  modalBody: { padding: "20px 24px", display: "flex", flexDirection: "column", gap: 16 },
  modalFoot: { display: "flex", gap: 12, padding: "16px 24px", borderTop: "1px solid var(--line)" },
  cancelBtn: { flex: 1, backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid var(--line)", borderRadius: 8, padding: "10px 20px", color: "var(--text)", fontSize: 14, fontWeight: 500, cursor: "pointer" },
  saveBtn: { flex: 1, backgroundColor: "var(--lime)", border: "none", borderRadius: 8, padding: "10px 20px", color: "#020303", fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 },

  // Header
  header: { borderBottom: "1px solid var(--line)", backgroundColor: "rgba(13,15,16,0.8)", backdropFilter: "blur(12px)", position: "sticky", top: 0, zIndex: 10 },
  headerIn: { maxWidth: 1200, margin: "0 auto", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" },
  logoG: { display: "flex", alignItems: "center", gap: 12 },
  title: { fontSize: 20, fontWeight: 700, margin: 0, lineHeight: 1.1, letterSpacing: "-0.02em" },
  sub: { fontSize: 12, color: "var(--muted)", margin: 0, marginTop: 2 },
  backBtn: { display: "flex", alignItems: "center", gap: 8, color: "var(--text)", textDecoration: "none", fontSize: 14, fontWeight: 500, padding: "8px 16px", borderRadius: "var(--radius)", border: "1px solid var(--line)", backgroundColor: "rgba(255,255,255,0.02)" },

  // Main
  main: { maxWidth: 1200, margin: "0 auto", padding: "40px 24px" },
  grid: { display: "grid", gridTemplateColumns: "1fr 2fr", gap: 24 },
  card: { backgroundColor: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius)", padding: 24, display: "flex", flexDirection: "column" },
  cardH: { fontSize: 18, fontWeight: 600, margin: "0 0 20px 0", letterSpacing: "-0.01em" },

  // Form elements
  fg: { marginBottom: 16, display: "flex", flexDirection: "column", gap: 8 },
  lbl: { fontSize: 13, fontWeight: 500, color: "var(--muted)" },
  inp: { backgroundColor: "var(--bg)", border: "1px solid var(--line)", borderRadius: 8, padding: "10px 14px", color: "var(--text)", fontSize: 14, outline: "none" },
  sel: { backgroundColor: "var(--bg)", border: "1px solid var(--line)", borderRadius: 8, padding: "10px 14px", color: "var(--text)", fontSize: 14, outline: "none", cursor: "pointer" },

  // Dropzone
  dropzone: { border: "2px dashed var(--line)", borderRadius: "var(--radius)", padding: "40px 20px", textAlign: "center", cursor: "pointer", transition: "all 0.2s", display: "flex", justifyContent: "center", alignItems: "center", minHeight: 200 },
  dzInner: { display: "flex", flexDirection: "column", alignItems: "center" },
  dzText: { fontSize: 14, fontWeight: 500, margin: "8px 0 4px 0", maxWidth: 240, lineHeight: 1.4 },
  dzHint: { fontSize: 11, color: "var(--muted)", margin: 0 },
  spin: { animation: "spin 1s linear infinite", color: "var(--lime)", marginBottom: 12 },
  spinSm: { animation: "spin 1s linear infinite" },

  // Image list
  listHead: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, gap: 16 },
  empty: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 20px", border: "1px dashed var(--line)", borderRadius: 8 },
  emptyTxt: { fontSize: 14, color: "var(--muted)", margin: 0 },
  thumbGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))", gap: 14 },
  assetCard: { backgroundColor: "rgba(255,255,255,0.01)", border: "1px solid var(--line)", borderRadius: 8, overflow: "hidden", transition: "transform 0.2s, border-color 0.2s" },
  thumbWrap: { position: "relative", aspectRatio: "4/3", backgroundColor: "#141617", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" },
  thumb: { width: "100%", height: "100%", objectFit: "cover" },
  catTag: { position: "absolute", top: 8, left: 8, fontSize: 10, fontWeight: 700, backgroundColor: "rgba(2,3,3,0.8)", padding: "3px 6px", borderRadius: 4, color: "var(--lime)", border: "1px solid rgba(223,255,0,0.3)", backdropFilter: "blur(4px)" },
  staticTag: { position: "absolute", top: 8, right: 8, fontSize: 9, fontWeight: 700, backgroundColor: "rgba(100,100,100,0.85)", padding: "2px 5px", borderRadius: 3, color: "#ccc", border: "1px solid rgba(150,150,150,0.3)", backdropFilter: "blur(4px)", letterSpacing: "0.05em" },
  actBar: { position: "absolute", bottom: 8, right: 8, display: "flex", gap: 6 },
  editBtn: { backgroundColor: "rgba(13,15,16,0.85)", color: "var(--lime)", border: "1px solid rgba(223,255,0,0.3)", borderRadius: "50%", width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", backdropFilter: "blur(4px)", boxShadow: "0 2px 8px rgba(0,0,0,0.4)" },
  delBtn: { backgroundColor: "rgba(239,68,68,0.9)", color: "white", border: "none", borderRadius: "50%", width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.4)" },
  meta: { padding: 10 },
  metaName: { fontSize: 12, fontWeight: 600, margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
  metaCat: { fontSize: 10, color: "var(--muted)", margin: "4px 0 0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },

  // Toast
  toast: { position: "fixed", bottom: 24, right: 24, border: "1px solid", borderRadius: 8, padding: "16px 20px", display: "flex", alignItems: "center", gap: 12, zIndex: 100, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.5)", backdropFilter: "blur(12px)", animation: "slideIn 0.3s ease" },
  toastTxt: { fontSize: 14, fontWeight: 500 },
};
