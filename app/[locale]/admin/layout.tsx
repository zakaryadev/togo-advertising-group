import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel | TOGO GROUP",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg: #020303;
          --surface: #0d0f10;
          --line: #292b2d;
          --text: #f4f5f5;
          --muted: #a6a8aa;
          --lime: #dfff00;
          --radius: 12px;
        }

        html, body {
          background: var(--bg);
          color: var(--text);
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          -webkit-font-smoothing: antialiased;
          min-height: 100vh;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes slideIn {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        input:focus, select:focus, textarea:focus {
          outline: none;
          border-color: rgba(223, 255, 0, 0.5) !important;
          box-shadow: 0 0 0 3px rgba(223, 255, 0, 0.08) !important;
        }

        button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: var(--surface); }
        ::-webkit-scrollbar-thumb { background: var(--line); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #3a3c3e; }
      `}</style>
      {children}
    </>
  );
}
