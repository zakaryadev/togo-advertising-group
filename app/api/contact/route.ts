export async function POST(request: Request) {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return Response.json({ error: "Noto'g'ri so'rov" }, { status: 400 });
  }

  const ism = String(data.ism ?? "").trim().slice(0, 200);
  const telefon = String(data.telefon ?? "").trim().slice(0, 50);
  const xizmat = String(data.xizmat ?? "").trim().slice(0, 100);
  const xabar = String(data.xabar ?? "").trim().slice(0, 1000);

  if (!ism || !telefon) {
    return Response.json({ error: "Ism va telefon raqami majburiy" }, { status: 400 });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error("TELEGRAM_BOT_TOKEN yoki TELEGRAM_CHAT_ID sozlanmagan (.env.local ni tekshiring)");
    return Response.json({ error: "Server sozlanmagan" }, { status: 500 });
  }

  const lines = [
    "🆕 Yangi so'rov — TOGO Group Pro",
    `👤 Ism: ${ism}`,
    `📞 Telefon: ${telefon}`,
    xizmat && `🛠 Xizmat: ${xizmat}`,
    xabar && `💬 Xabar: ${xabar}`,
  ].filter(Boolean);

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: lines.join("\n") }),
    });
    const result = await res.json();
    if (!res.ok || !result.ok) {
      console.error("Telegram xatosi:", result);
      return Response.json({ error: "Yuborishda xatolik" }, { status: 502 });
    }
  } catch (err) {
    console.error("Telegram so'rovi muvaffaqiyatsiz:", err);
    return Response.json({ error: "Yuborishda xatolik" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
