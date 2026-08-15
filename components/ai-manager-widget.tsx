"use client";

import { useState, useRef, useEffect } from "react";

const DEEPSEEK_KEY = atob("c2stYTNlMzYzMDBiNmM3NDQ3M2JkNWNiNTc0ZmI1M2I1Yjg=");

const SYSTEM_PROMPT = `Siz "TOGO Advertising Group" (TOGO GROUP) tashqi reklama va bosma ishlab chiqarish kompaniyasining professional AI Menejerisiz.
Sizning vazifangiz mijozlarga tashqi reklama, obyomli harflar, banner bosma, avto brendlash, ko'rgazma stendlari va boshqa xizmatlar bo'yicha maslahat berish.

BIZNING XIZMATLARIMIZ VA YO'NALISHLARIMIZ:
1. Katta formatli bosma (Banner, Samokleyka, Orakal, Setka)
2. Obyomli va yoritgichli harflar, LED peshtoq reklamalari
3. Kran va balandlikdagi murakkab montaj reklamalari
4. Avto reklama va avtoparklarni to'liq brendlash (Vinil wrap)
5. Ko'rgazma stendlari va mobil konstruksiyalar
6. Tablichka, ko'rsatkich va navigatsiya belgilari
7. Poligrafiya, brendlangan sovg'alar va kiyimlar

ALOQA VA BUYURTMA:
- Veb-sayt: togogroup.uz
- Telegram: @togo_group_pro
- Bosh ofis: Toshkent shahri

MULOQOT QOIDALARI:
- Har doim xushmuomala, professional va o'zbek tilida javob bering.
- Javoblaringiz loqa, aniq va 2-4 jumladan oshmasin.
- Mijoz xizmat so'rasa, tezkor hisob-kitob uchun Telegram (@togo_group_pro) yoki tel (+998 77 300 45 00) orqali yozishni taklif qiling.
- Emojilardan unumli foydalaning (🪧, 🩵, 🚗, 🏗️, 📐).`;

export default function AiManagerWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([
    {
      role: "assistant",
      content:
        "Assalomu alaykum! 🪧 Men TOGO Advertising Group AI Menejeriman. Sizga qaysi turdagi reklama yoki bosma xizmati bo'yicha maslahat kerak?",
    },
  ]);

  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages, loading]);

  async function handleSend(textToSend?: string) {
    const text = (textToSend || inputVal).trim();
    if (!text || loading) return;

    const newMsgs = [...messages, { role: "user" as const, content: text }];
    setMessages(newMsgs);
    setInputVal("");
    setLoading(true);

    try {
      const res = await fetch("https://api.deepseek.com/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + DEEPSEEK_KEY,
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...newMsgs.map((m) => ({ role: m.role, content: m.content })),
          ],
          temperature: 0.7,
          max_tokens: 800,
        }),
      });

      if (!res.ok) throw new Error("DeepSeek API error");
      const data = await res.json();
      const reply =
        data.choices?.[0]?.message?.content ||
        "Kechirasiz, javob olishda xatolik bo'ldi.";
      setMessages([...newMsgs, { role: "assistant", content: reply }]);
    } catch {
      setMessages([
        ...newMsgs,
        {
          role: "assistant",
          content:
            "Kechirasiz, uzilish yuz berdi. Iltimos Telegram: @togo_group_pro orqali bog'laning.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) {
    return (
      <div className="togo-ai-root" style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 99999 }}>
        <button
          type="button"
          className="togo-ai-trigger"
          onClick={() => setIsOpen(true)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            background: "#111827",
            color: "#FFD24A",
            border: "2px solid #FFD24A",
            borderRadius: "999px",
            padding: "10px 18px 10px 14px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "32px",
              height: "32px",
              background: "#FFD24A",
              color: "#111827",
              borderRadius: "50%",
              display: "grid",
              placeItems: "center",
              fontWeight: "bold",
            }}
          >
            AI
            <span
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "9px",
                height: "9px",
                background: "#22c55e",
                borderRadius: "50%",
                border: "2px solid #111827",
              }}
            />
          </div>
          <span style={{ fontSize: "13px", fontWeight: 700 }}>TOGO AI Menejer</span>
        </button>
      </div>
    );
  }

  return (
    <div className="togo-ai-root" style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 99999 }}>
      <div
        className="togo-ai-modal"
        style={{
          width: "min(380px, calc(100vw - 32px))",
          height: "min(520px, calc(100vh - 90px))",
          background: "#ffffff",
          borderRadius: "20px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
          border: "1px solid #e5e7eb",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "14px 16px",
            background: "#111827",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "2px solid #FFD24A",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "34px",
                height: "34px",
                background: "#FFD24A",
                color: "#111827",
                borderRadius: "50%",
                display: "grid",
                placeItems: "center",
                fontWeight: "bold",
                fontSize: "14px",
              }}
            >
              AI
            </div>
            <div>
              <strong style={{ display: "block", fontSize: "13.5px", color: "#FFD24A" }}>
                TOGO GROUP AI Menejer
              </strong>
              <small style={{ fontSize: "11px", color: "#9ca3af" }}>
                Reklama va Bosma • Online 24/7
              </small>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            style={{
              background: "transparent",
              border: 0,
              color: "#9ca3af",
              fontSize: "20px",
              cursor: "pointer",
              padding: "4px",
            }}
          >
            &times;
          </button>
        </div>

        {/* Body */}
        <div
          ref={bodyRef}
          style={{
            flex: 1,
            padding: "14px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            background: "#f9fafb",
          }}
        >
          {messages.map((m, idx) => (
            <div
              key={idx}
              style={{
                maxWidth: "85%",
                padding: "10px 14px",
                borderRadius: "16px",
                fontSize: "13px",
                lineHeight: 1.45,
                wordBreak: "break-word",
                alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                background: m.role === "user" ? "#111827" : "#ffffff",
                color: m.role === "user" ? "#FFD24A" : "#111827",
                border: m.role === "user" ? "none" : "1px solid #e5e7eb",
                borderBottomLeftRadius: m.role === "assistant" ? "4px" : "16px",
                borderBottomRightRadius: m.role === "user" ? "4px" : "16px",
              }}
            >
              {m.content}
            </div>
          ))}
          {loading && (
            <div
              style={{
                alignSelf: "flex-start",
                background: "#ffffff",
                color: "#6b7280",
                border: "1px solid #e5e7eb",
                borderRadius: "16px",
                borderBottomLeftRadius: "4px",
                padding: "10px 14px",
                fontSize: "13px",
                fontStyle: "italic",
              }}
            >
              AI javob tayyorlamoqda...
            </div>
          )}
        </div>

        {/* Quick chips */}
        {messages.length < 4 && !loading && (
          <div
            style={{
              display: "flex",
              gap: "6px",
              padding: "0 14px 8px",
              overflowX: "auto",
            }}
          >
            {[
              "Banner bosma narxi?",
              "Obyomli harflar?",
              "Avto reklama?",
            ].map((chipText) => (
              <button
                key={chipText}
                type="button"
                onClick={() => handleSend(chipText)}
                style={{
                  whiteSpace: "nowrap",
                  background: "#fef3c7",
                  color: "#92400e",
                  border: "1px solid #fde68a",
                  borderRadius: "999px",
                  padding: "5px 11px",
                  fontSize: "11.5px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {chipText}
              </button>
            ))}
          </div>
        )}

        {/* Footer */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          style={{
            padding: "10px",
            background: "#ffffff",
            borderTop: "1px solid #e5e7eb",
            display: "flex",
            gap: "8px",
          }}
        >
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Savolingizni yozing..."
            disabled={loading}
            style={{
              flex: 1,
              border: "1px solid #d1d5db",
              borderRadius: "999px",
              padding: "8px 14px",
              fontSize: "13px",
              outline: "none",
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              background: "#111827",
              color: "#FFD24A",
              border: 0,
              borderRadius: "50%",
              width: "36px",
              height: "36px",
              display: "grid",
              placeItems: "center",
              cursor: loading ? "not-allowed" : "pointer",
              fontWeight: "bold",
              opacity: loading ? 0.4 : 1,
            }}
          >
            &rarr;
          </button>
        </form>
      </div>
    </div>
  );
}
