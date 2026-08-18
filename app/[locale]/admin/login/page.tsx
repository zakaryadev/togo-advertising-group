"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Lock, User, Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string || "uz";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Iltimos, barcha maydonlarni to'ldiring.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Redirect to admin panel
        router.push(`/${locale}/admin`);
        router.refresh();
      } else {
        setError(data.error || "Login yoki parol xato.");
      }
    } catch (err) {
      setError("Tarmoq xatoligi yuz berdi. Iltimos, qaytadan urining.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* Background glowing decorations */}
      <div style={styles.glow1} />
      <div style={styles.glow2} />

      <div style={styles.card}>
        <div style={styles.logoGroup}>
          <div style={styles.logoBadge}>TOGO</div>
          <h1 style={styles.title}>Admin Panel</h1>
          <p style={styles.subtitle}>Tizimga kirish uchun ma'lumotlarni kiriting</p>
        </div>

        {error && (
          <div style={styles.errorAlert}>
            <AlertCircle size={18} color="#ef4444" />
            <span style={styles.errorText}>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Login yoki Email</label>
            <div style={styles.inputWrapper}>
              <User size={18} style={styles.inputIcon} />
              <input
                type="text"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={styles.input}
                disabled={loading}
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Parol</label>
            <div style={styles.inputWrapper}>
              <Lock size={18} style={styles.inputIcon} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}
                disabled={loading}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" style={styles.submitButton} disabled={loading}>
            {loading ? (
              <>
                <Loader2 size={18} style={styles.spinner} />
                <span>Tekshirilmoqda...</span>
              </>
            ) : (
              <span>Kirish</span>
            )}
          </button>
        </form>

        <a href={`/${locale}`} style={styles.homeLink}>
          Asosiy sahifaga qaytish
        </a>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    backgroundColor: "#020303", // var(--bg) fallback
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    color: "#f4f5f5", // var(--text) fallback
    fontFamily: "Inter, system-ui, sans-serif",
    position: "relative",
    overflow: "hidden",
  },
  glow1: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: "50%",
    backgroundColor: "rgba(223, 255, 0, 0.08)", // var(--lime) glow
    filter: "blur(80px)",
    top: "20%",
    left: "15%",
    zIndex: 1,
  },
  glow2: {
    position: "absolute",
    width: 400,
    height: 400,
    borderRadius: "50%",
    backgroundColor: "rgba(223, 255, 0, 0.05)",
    filter: "blur(120px)",
    bottom: "10%",
    right: "10%",
    zIndex: 1,
  },
  card: {
    backgroundColor: "rgba(13, 15, 16, 0.7)", // var(--surface) glassmorphic
    border: "1px solid #292b2d", // var(--line) fallback
    borderRadius: 16,
    padding: "40px 32px",
    width: "100%",
    maxWidth: 420,
    zIndex: 2,
    boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.7)",
    backdropFilter: "blur(16px)",
    display: "flex",
    flexDirection: "column",
  },
  logoGroup: {
    textAlign: "center",
    marginBottom: 32,
  },
  logoBadge: {
    display: "inline-block",
    backgroundColor: "#dfff00", // var(--lime)
    color: "#020303",
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: "0.1em",
    padding: "4px 10px",
    borderRadius: 6,
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    margin: 0,
    letterSpacing: "-0.02em",
  },
  subtitle: {
    fontSize: 13,
    color: "#a6a8aa", // var(--muted)
    margin: "8px 0 0 0",
    lineHeight: 1.4,
  },
  errorAlert: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    border: "1px solid rgba(239, 68, 68, 0.2)",
    borderRadius: 8,
    padding: "12px 16px",
    marginBottom: 24,
  },
  errorText: {
    fontSize: 13,
    color: "#ff8888",
    fontWeight: 500,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: 500,
    color: "#a6a8aa",
  },
  inputWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  inputIcon: {
    position: "absolute",
    left: 14,
    color: "#a6a8aa",
  },
  input: {
    width: "100%",
    backgroundColor: "rgba(2, 3, 3, 0.5)",
    border: "1px solid #292b2d",
    borderRadius: 10,
    padding: "12px 16px 12px 42px",
    color: "#f4f5f5",
    fontSize: 14,
    outline: "none",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  },
  eyeButton: {
    position: "absolute",
    right: 14,
    backgroundColor: "transparent",
    border: "none",
    color: "#a6a8aa",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
  },
  submitButton: {
    backgroundColor: "#dfff00", // var(--lime)
    color: "#020303",
    fontSize: 15,
    fontWeight: 700,
    border: "none",
    borderRadius: 10,
    padding: "14px 20px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    transition: "transform 0.1s ease, filter 0.2s ease",
    marginTop: 8,
  },
  spinner: {
    animation: "spin 1s linear infinite",
  },
  homeLink: {
    display: "block",
    textAlign: "center",
    marginTop: 24,
    fontSize: 13,
    color: "#a6a8aa",
    textDecoration: "none",
    transition: "color 0.2s ease",
  },
};
