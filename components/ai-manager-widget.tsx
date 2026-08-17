"use client";

import { useState, useRef, useEffect } from "react";

const DEEPSEEK_KEY = atob("c2stYTNlMzYzMDBiNmM3NDQ3M2JkNWNiNTc0ZmI1M2I1Yjg=");

const getSystemPrompt = (lang: "uz" | "ru" | "en") => {
  const langInstructions = {
    uz: "Har doim xushmuomala, professional va o'zbek tilida javob bering. Javoblaringiz qisqa, aniq va 2-4 jumladan oshmasin.",
    ru: "Всегда отвечайте вежливо, профессионально и на русском языке. Ответы должны быть краткими, четкими и не превышать 2-4 предложений.",
    en: "Always reply politely, professionally, and in English. Your replies should be concise, clear, and not exceed 2-4 sentences.",
  };

  return `Siz "TOGO Advertising Group" (TOGO GROUP) tashqi reklama va bosma ishlab chiqarish kompaniyasining professional AI Menejerisiz.
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
- ${langInstructions[lang]}
- Mijoz xizmat so'rasa, tezkor hisob-kitob uchun Telegram (@togo_group_pro) yoki tel (+998 77 300 45 00) orqali yozishni taklif qiling.
- Emojilardan unumli foydalaning (🪧, 🩵, 🚗, 🏗️, 📐).`;
};

const widgetTranslations = {
  welcome: {
    uz: "Assalomu alaykum! 🪧 Men TOGO Advertising Group AI Menejeriman. Sizga qaysi turdagi reklama yoki bosma xizmati bo'yicha maslahat kerak?",
    ru: "Здравствуйте! 🪧 Я ИИ-Менеджер TOGO Advertising Group. Какая услуга по рекламе или печати вас интересует?",
    en: "Hello! 🪧 I am TOGO Advertising Group AI Manager. What kind of advertising or print service do you need advice on?",
  },
  title: {
    uz: "TOGO AI Menejer",
    ru: "ИИ-Менеджер TOGO",
    en: "TOGO AI Manager",
  },
  headerTitle: {
    uz: "TOGO GROUP AI Menejer",
    ru: "ИИ-Менеджер TOGO GROUP",
    en: "TOGO GROUP AI Manager",
  },
  headerSubtitle: {
    uz: "Reklama va Bosma • Online 24/7",
    ru: "Реклама и печать • Онлайн 24/7",
    en: "Ads & Print • Online 24/7",
  },
  loading: {
    uz: "AI javob tayyorlamoqda...",
    ru: "ИИ готовит ответ...",
    en: "AI is preparing a reply...",
  },
  placeholder: {
    uz: "Savolingizni yozing...",
    ru: "Напишите ваш вопрос...",
    en: "Type your question...",
  },
  phoneLabel: {
    uz: "Savdo bo'limiga telefon qilish",
    ru: "Позвонить в отдел продаж",
    en: "Call sales department",
  },
  tgLabel: {
    uz: "Telegram orqali bog'lanish",
    ru: "Связаться через Telegram",
    en: "Contact via Telegram",
  },
  aiBtnLabel: {
    uz: "TOGO AI Menejerini ochish",
    ru: "Открыть ИИ-Менеджер TOGO",
    en: "Open TOGO AI Manager",
  },
  chips: {
    uz: ["Banner bosma narxi?", "Obyomli harflar?", "Avto reklama?"],
    ru: ["Цена печати баннера?", "Объемные буквы?", "Реклама на авто?"],
    en: ["Banner print price?", "3D letters?", "Car branding?"],
  },
  error: {
    uz: "Kechirasiz, javob olishda xatolik bo'ldi.",
    ru: "Извините, произошла ошибка при получении ответа.",
    en: "Sorry, there was an error getting the reply.",
  },
  errorFallback: {
    uz: "Kechirasiz, uzilish yuz berdi. Iltimos Telegram: @togo_group_pro orqali bog'laning.",
    ru: "Извините, произошел сбой. Пожалуйста, свяжитесь через Telegram: @togo_group_pro",
    en: "Sorry, a connection error occurred. Please contact us via Telegram: @togo_group_pro",
  },
};

export default function AiManagerWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [lang, setLang] = useState<"uz" | "ru" | "en">("uz");
  const [messages, setMessages] = useState<
    Array<{ role: "user" | "assistant"; content: string }>
  >([
    {
      role: "assistant",
      content: widgetTranslations.welcome.uz,
    },
  ]);

  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages, loading]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).__TOGO_AI_MANAGER_INIT = true;
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      const currentLang = (document.documentElement.lang || "uz") as
        | "uz"
        | "ru"
        | "en";
      setLang(currentLang);
      setMessages([
        {
          role: "assistant",
          content: widgetTranslations.welcome[currentLang],
        },
      ]);
    }
  }, []);

  useEffect(() => {
    const onLangChange = (e: Event) => {
      const customEvent = e as CustomEvent<"uz" | "ru" | "en">;
      if (customEvent.detail) {
        const nextLang = customEvent.detail;
        setLang(nextLang);
        setMessages([
          {
            role: "assistant",
            content: widgetTranslations.welcome[nextLang],
          },
        ]);
      }
    };
    window.addEventListener("togo_lang_change", onLangChange);
    return () => {
      window.removeEventListener("togo_lang_change", onLangChange);
    };
  }, []);

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
          model: "deepseek-v4-flash",
          messages: [
            { role: "system", content: getSystemPrompt(lang) },
            ...newMsgs.map((m) => ({ role: m.role, content: m.content })),
          ],
          temperature: 0.7,
          max_tokens: 800,
        }),
      });

      if (!res.ok) throw new Error("DeepSeek API error");
      const data = await res.json();
      const reply =
        data.choices?.[0]?.message?.content || widgetTranslations.error[lang];
      setMessages([...newMsgs, { role: "assistant", content: reply }]);
    } catch {
      setMessages([
        ...newMsgs,
        {
          role: "assistant",
          content: widgetTranslations.errorFallback[lang],
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) {
    return (
      <>
        {/* Desktop-only single AI trigger button */}
        <div
          className="togo-ai-root desktop-only"
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            zIndex: 99999,
          }}
        >
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
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 11a8 8 0 0 1 16 0" />
                <rect x="2" y="9" width="2" height="5" rx="1" />
                <rect x="20" y="9" width="2" height="5" rx="1" />
                <path d="M21 13a4 4 0 0 1-4 4h-3" />
                <circle cx="12" cy="10" r="3" />
                <path d="M6 18a6 6 0 0 1 12 0" />
              </svg>
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
            <span style={{ fontSize: "13px", fontWeight: 700 }}>
              {widgetTranslations.title[lang]}
            </span>
          </button>
        </div>

        {/* Mobile-only 3-button stack */}
        <div className="togo-float-buttons-stack mobile-only">
          {/* Telefon raqam (Phone icon) button */}
          <a
            href="tel:+998773004500"
            className="togo-float-btn togo-phone-btn"
            title="Menejer bilan bog'lanish"
            aria-label={widgetTranslations.phoneLabel[lang]}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </a>

          {/* Telegram icon button */}
          <a
            href="https://t.me/togo_group_pro"
            target="_blank"
            rel="noopener noreferrer"
            className="togo-float-btn togo-tg-btn"
            title="Telegram orqali yozish"
            aria-label={widgetTranslations.tgLabel[lang]}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </a>

          {/* AI Manager trigger button */}
          <button
            type="button"
            className="togo-float-btn togo-ai-btn"
            onClick={() => setIsOpen(true)}
            title={widgetTranslations.title[lang]}
            aria-label={widgetTranslations.aiBtnLabel[lang]}
          >
            <div
              style={{
                position: "relative",
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                display: "grid",
                placeItems: "center",
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 11a8 8 0 0 1 16 0" />
                <rect x="2" y="9" width="2" height="5" rx="1" />
                <rect x="20" y="9" width="2" height="5" rx="1" />
                <path d="M21 13a4 4 0 0 1-4 4h-3" />
                <circle cx="12" cy="10" r="3" />
                <path d="M6 18a6 6 0 0 1 12 0" />
              </svg>
              <span
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "8px",
                  height: "8px",
                  background: "#22c55e",
                  borderRadius: "50%",
                  border: "2px solid #111827",
                }}
              />
            </div>
          </button>
        </div>
      </>
    );
  }

  return (
    <div
      className="togo-ai-root"
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 99999,
      }}
    >
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
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 11a8 8 0 0 1 16 0" />
                <rect x="2" y="9" width="2" height="5" rx="1" />
                <rect x="20" y="9" width="2" height="5" rx="1" />
                <path d="M21 13a4 4 0 0 1-4 4h-3" />
                <circle cx="12" cy="10" r="3" />
                <path d="M6 18a6 6 0 0 1 12 0" />
              </svg>
            </div>
            <div>
              <strong
                style={{
                  display: "block",
                  fontSize: "13.5px",
                  color: "#FFD24A",
                }}
              >
                {widgetTranslations.headerTitle[lang]}
              </strong>
              <small style={{ fontSize: "11px", color: "#9ca3af" }}>
                {widgetTranslations.headerSubtitle[lang]}
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
              {widgetTranslations.loading[lang]}
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
            {widgetTranslations.chips[lang].map((chipText) => (
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
            placeholder={widgetTranslations.placeholder[lang]}
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
