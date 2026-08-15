import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, phone, service, comment } = await req.json();

    if (!name || !phone) {
      return NextResponse.json(
        { message: "Ism va telefon raqami kiritilishi shart." },
        { status: 400 }
      );
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      console.warn("TELEGRAM_BOT_TOKEN yoki TELEGRAM_CHAT_ID sozlanmagan.");
      return NextResponse.json(
        { message: "Serverda Telegram bot token sozlanmagan." },
        { status: 500 }
      );
    }

    const messageText = `🪧 *YANGI ARIZA — TOGO GROUP*

👤 *Mijoz:* ${name}
📞 *Tel:* ${phone}
🛠 *Xizmat:* ${service || "Belgilanmagan"}
💬 *Izoh:* ${comment || "Yo'q"}`;

    const tgRes = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: messageText,
          parse_mode: "Markdown",
        }),
      }
    );

    if (!tgRes.ok) {
      const errData = await tgRes.json();
      console.error("Telegram API xatosi:", errData);
      return NextResponse.json(
        { message: "Telegram botga yuborishda xatolik yuz berdi." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { message: "Ichki server xatoligi." },
      { status: 500 }
    );
  }
}
