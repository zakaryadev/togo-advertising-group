"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import "./admin.css";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  // Start as loading=true, authorized=false — spinner always shows until auth check
  // completes, preventing any flash of the admin shell for unauthenticated users.
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const isLoginPage = pathname.endsWith("/admin/login");

  useEffect(() => {
    if (isLoginPage) {
      setLoading(false);
      return;
    }

    const checkAuth = async () => {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      const isSupabaseReady = Boolean(
        supabaseUrl && supabaseAnonKey && !supabaseAnonKey.includes("your_supabase")
      );

      if (!isSupabaseReady) {
        router.replace("/admin/login");
        setLoading(false);
        return;
      }
      try {
        const supabase = createClient();
        if (supabase) {
          // Use getUser() (server-verified) instead of getSession() (local cache,
          // can be stale or forged). This is the correct pattern per Supabase docs.
          const { data: { user }, error } = await supabase.auth.getUser();
          if (error || !user) {
            router.replace("/admin/login");
            return;
          }
          setAuthorized(true);
        }
      } catch (err) {
        console.error("Auth error:", err);
        router.replace("/admin/login");
        return;
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [pathname, isLoginPage, router]);

  if (isLoginPage) {
    return <div className="admin-body">{children}</div>;
  }

  // Show spinner while checking auth AND while redirecting (authorized stays false).
  // This prevents the admin shell from ever flashing for unauthenticated users.
  if (loading || !authorized) {
    return (
      <div className="admin-body admin-loading">
        <div className="admin-spinner" />
        <p className="mono">Yuklanmoqda...</p>
      </div>
    );
  }

  const handleLogout = async () => {
    const supabase = createClient();
    if (supabase) {
      await supabase.auth.signOut();
    }
    router.push("/admin/login");
  };

  return (
    <div className="admin-body">
      <div className="admin-shell">
        <aside className="admin-aside">
          <div className="admin-brand">
            <img src="/togo_logo.svg" alt="TOGO GROUP PRO" className="admin-logo" />
            <span className="admin-badge mono">ADMIN PANEL</span>
          </div>

          <nav className="admin-nav">
            <Link
              href="/admin/leads"
              className={`admin-nav-item ${pathname === "/admin/leads" ? "active" : ""}`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <span>Lidlar (Murojaatlar)</span>
            </Link>

            <Link
              href="/admin/portfolio"
              className={`admin-nav-item ${pathname === "/admin/portfolio" ? "active" : ""}`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              <span>Ishlarimiz (Portfolio)</span>
            </Link>

            <Link
              href="/admin/services"
              className={`admin-nav-item ${pathname === "/admin/services" ? "active" : ""}`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>
              <span>Xizmatlar (Services)</span>
            </Link>

            <Link
              href="/admin/materials"
              className={`admin-nav-item ${pathname === "/admin/materials" ? "active" : ""}`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
              <span>Material Narxlari</span>
            </Link>

            <Link
              href="/admin/settings"
              className={`admin-nav-item ${pathname === "/admin/settings" ? "active" : ""}`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>Aloqa va Sozlamalar</span>
            </Link>
          </nav>

          <div className="admin-aside-ft">
            <Link href="/" className="admin-back-btn">
              ← Saytga qaytish
            </Link>
            <button onClick={handleLogout} className="admin-logout-btn">
              Tizimdan chiqish
            </button>
          </div>
        </aside>

        <main className="admin-main">{children}</main>
      </div>
    </div>
  );
}
