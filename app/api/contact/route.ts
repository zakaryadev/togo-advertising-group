import { NextResponse } from "next/server";

const DEFAULT_TOKEN = "7065399594:AAGkHVllbVo7kJIB5LqQ33DPJ79jzornL38";
const DEFAULT_CHAT_ID = "-1002362089543";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, phone, note, comment, service, position, experience, about, formType } = data;

    if (!name || !phone) {
      return NextResponse.json(
        { message: "Ism va telefon raqami kiritilishi shart." },
        { status: 400 }
      );
    }

    const token = process.env.TELEGRAM_BOT_TOKEN || DEFAULT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID || DEFAULT_CHAT_ID;

    let messageText = "";

    if (formType === "career") {
      messageText = `💼 *YANGI ANKETA (VAKANSIYA) — TOGO GROUP*\n\n` +
        `👤 *Ism:* ${name}\n` +
        `📞 *Tel:* ${phone}\n` +
        `📌 *Lavozim:* ${position || "Ko'rsatilmagan"}\n` +
        `⏱ *Tajriba:* ${experience || "Ko'rsatilmagan"}\n` +
        `📝 *Haqida:* ${about || "Yo'q"}`;
    } else {
      const details = note || comment || service || "Ko'rsatilmagan";
      messageText = `🪧 *YANGI ARIZA — TOGO GROUP ADVERTISING*\n\n` +
        `👤 *Mijoz:* ${name}\n` +
        `📞 *Tel:* ${phone}\n` +
        `💬 *Tafsilot:* ${details}`;
    }

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
      console.error("Telegram API error:", errData);
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

