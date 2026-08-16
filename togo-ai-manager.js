(function () {
  if (window.__TOGO_AI_MANAGER_INIT || document.getElementById("togo-ai-widget-root")) return;
  window.__TOGO_AI_MANAGER_INIT = true;
  if (document.getElementById("togo-ai-widget-root")) return;

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
- Veb-sayt: togogrouppro.uz
- Telegram: @togogroup
- Bosh ofis: Toshkent shahri

MULOQOT QOIDALARI:
- Har doim xushmuomala, professional va o'zbek tilida javob bering.
- Javoblaringiz loqa, aniq va 2-4 jumladan oshmasin.
- Mijoz xizmat so'rasa, tezkor hisob-kitob uchun Telegram orqali yozishni yoki buyurtma berishni taklif qiling.
- Emojilardan unumli foydalaning (🪧, 🩵, 🚗, 🏗️, 📐).`;

  // Inject CSS
  const style = document.createElement("style");
  style.innerHTML = `
    .togo-ai-root { position: fixed; bottom: 24px; right: 24px; z-index: 999999; font-family: system-ui, -apple-system, sans-serif; }
    .togo-ai-trigger { display: flex; align-items: center; gap: 10px; background: #111827; color: #FFD24A; border: 2px solid #FFD24A; border-radius: 999px; padding: 10px 18px 10px 14px; box-shadow: 0 10px 30px rgba(0,0,0,0.4); cursor: pointer; transition: transform 0.2s ease; }
    .togo-ai-trigger:hover { transform: translateY(-3px) scale(1.03); background: #1f2937; }
    .togo-trigger-icon { position: relative; width: 32px; height: 32px; background: #FFD24A; color: #111827; border-radius: 50%; display: grid; place-items: center; font-weight: bold; }
    .togo-online-dot { position: absolute; top: 0; right: 0; width: 9px; height: 9px; background: #22c55e; border-radius: 50%; border: 2px solid #111827; }
    .togo-trigger-text { font-size: 13px; font-weight: 700; }
    
    .togo-ai-modal { width: min(380px, calc(100vw - 32px)); height: min(520px, calc(100vh - 90px)); background: #ffffff; border-radius: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.35); border: 1px solid #e5e7eb; display: flex; flex-direction: column; overflow: hidden; animation: togoPop 0.25s ease-out; }
    @keyframes togoPop { from { opacity: 0; transform: translateY(16px) scale(0.95); } to { opacity: 1; transform: none; } }
    
    .togo-modal-header { padding: 14px 16px; background: #111827; color: #ffffff; display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #FFD24A; }
    .togo-header-title { display: flex; align-items: center; gap: 10px; }
    .togo-header-avatar { width: 34px; height: 34px; background: #FFD24A; color: #111827; border-radius: 50%; display: grid; place-items: center; font-weight: bold; font-size: 14px; }
    .togo-header-text strong { display: block; font-size: 13.5px; color: #FFD24A; }
    .togo-header-text small { font-size: 11px; color: #9ca3af; }
    .togo-modal-close { background: transparent; border: 0; color: #9ca3af; font-size: 20px; cursor: pointer; padding: 4px; }
    .togo-modal-close:hover { color: #ffffff; }

    .togo-modal-body { flex: 1; padding: 14px; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; background: #f9fafb; }
    .togo-msg { max-width: 85%; padding: 10px 14px; border-radius: 16px; font-size: 13px; line-height: 1.45; word-break: break-word; }
    .togo-msg.bot { background: #ffffff; color: #111827; border: 1px solid #e5e7eb; align-self: flex-start; border-bottom-left-radius: 4px; }
    .togo-msg.user { background: #111827; color: #FFD24A; align-self: flex-end; border-bottom-right-radius: 4px; }
    
    .togo-quick-chips { display: flex; gap: 6px; padding: 0 14px 8px; overflow-x: auto; scrollbar-width: none; }
    .togo-chip { white-space: nowrap; background: #fef3c7; color: #92400e; border: 1px solid #fde68a; border-radius: 999px; padding: 5px 11px; font-size: 11.5px; font-weight: 600; cursor: pointer; }
    .togo-chip:hover { background: #fde68a; }

    .togo-modal-footer { padding: 10px; background: #ffffff; border-top: 1px solid #e5e7eb; display: flex; gap: 8px; }
    .togo-modal-footer input { flex: 1; border: 1px solid #d1d5db; border-radius: 999px; padding: 8px 14px; font-size: 13px; outline: none; }
    .togo-modal-footer input:focus { border-color: #f59e0b; }
    .togo-modal-footer button { background: #111827; color: #FFD24A; border: 0; border-radius: 50%; width: 36px; height: 36px; display: grid; place-items: center; cursor: pointer; font-weight: bold; }
    .togo-modal-footer button:disabled { opacity: 0.4; cursor: not-allowed; }
  `;
  document.head.appendChild(style);

  // Root container
  const root = document.createElement("div");
  root.id = "togo-ai-widget-root";
  root.className = "togo-ai-root";
  document.body.appendChild(root);

  let isOpen = false;
  let loading = false;
  const messages = [
    {
      role: "assistant",
      content:
        "Assalomu alaykum! 🪧 Men TOGO Advertising Group AI Menejeriman. Sizga qaysi turdagi reklama yoki bosma xizmati bo'yicha maslahat kerak?",
    },
  ];

  function render() {
    if (!isOpen) {
      root.innerHTML = `
        <button type="button" class="togo-ai-trigger" id="togo-ai-open-btn">
          <div class="togo-trigger-icon">
            AI
            <span class="togo-online-dot"></span>
          </div>
          <span class="togo-trigger-text">TOGO AI Menejer</span>
        </button>
      `;
      document
        .getElementById("togo-ai-open-btn")
        .addEventListener("click", () => {
          isOpen = true;
          render();
        });
      return;
    }

    root.innerHTML = `
      <div class="togo-ai-modal">
        <div class="togo-modal-header">
          <div class="togo-header-title">
            <div class="togo-header-avatar">AI</div>
            <div class="togo-header-text">
              <strong>TOGO GROUP AI Menejer</strong>
              <small>Reklama va Bosma • Online 24/7</small>
            </div>
          </div>
          <button type="button" class="togo-modal-close" id="togo-ai-close-btn">&times;</button>
        </div>
        <div class="togo-modal-body" id="togo-msg-body">
          ${messages
            .map(
              (m) =>
                `<div class="togo-msg ${m.role === "user" ? "user" : "bot"}">${m.content}</div>`
            )
            .join("")}
          ${
            loading
              ? `<div class="togo-msg bot" style="color:#6b7280; font-style:italic;">AI javob tayyorlamoqda...</div>`
              : ""
          }
        </div>
        ${
          messages.length < 4 && !loading
            ? `<div class="togo-quick-chips">
                <button class="togo-chip" data-text="Banner bosma narxi qancha?">Banner bosma narxi?</button>
                <button class="togo-chip" data-text="Obyomli harflar tayyorlash?">Obyomli harflar?</button>
                <button class="togo-chip" data-text="Avtomobilni brendlash?">Avto reklama?</button>
               </div>`
            : ""
        }
        <form class="togo-modal-footer" id="togo-ai-form">
          <input type="text" id="togo-ai-input" placeholder="Savolingizni yozing..." ${loading ? "disabled" : ""} />
          <button type="submit" ${loading ? "disabled" : ""}>&rarr;</button>
        </form>
      </div>
    `;

    const body = document.getElementById("togo-msg-body");
    if (body) body.scrollTop = body.scrollHeight;

    document
      .getElementById("togo-ai-close-btn")
      .addEventListener("click", () => {
        isOpen = false;
        render();
      });

    document.querySelectorAll(".togo-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        const text = chip.getAttribute("data-text");
        if (text) sendUserMessage(text);
      });
    });

    document.getElementById("togo-ai-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const inputEl = document.getElementById("togo-ai-input");
      if (inputEl && inputEl.value.trim()) {
        sendUserMessage(inputEl.value.trim());
      }
    });
  }

  async function sendUserMessage(text) {
    if (loading) return;
    messages.push({ role: "user", content: text });
    loading = true;
    render();

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
            ...messages.map((m) => ({ role: m.role, content: m.content })),
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
      messages.push({ role: "assistant", content: reply });
    } catch (err) {
      messages.push({
        role: "assistant",
        content:
          "Kechirasiz, uzilish yuz berdi. Iltimos Telegram: @togogroup orqali bog'laning.",
      });
    } finally {
      loading = false;
      render();
    }
  }

  render();
})();
