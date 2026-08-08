import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { addLocalLead } from "@/lib/leads-store";

export async function POST(request: Request) {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return Response.json({ error: "Noto'g'ri so'rov" }, { status: 400 });
  }

  const ism = String(data.ism ?? data.name ?? "").trim().slice(0, 200);
  const telefon = String(data.telefon ?? data.phone ?? "").trim().slice(0, 50);
  const xizmat = String(data.xizmat ?? data.service ?? "").trim().slice(0, 100);
  const xabar = String(data.xabar ?? data.message ?? "").trim().slice(0, 1000);

  if (!ism || !telefon) {
    return Response.json({ error: "Ism va telefon raqami majburiy" }, { status: 400 });
  }

  // Save to shared in-memory leads store
  const newLead = addLocalLead({
    name: ism,
    phone: telefon,
    service: xizmat || null,
    message: xabar || null,
  });

  let dbSaved = false;
  let telegramSent = false;

  // 1. Save to Supabase Database
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      if (supabase) {
        const { error } = await supabase.from("leads").insert([
          {
            name: ism,
            phone: telefon,
            service: xizmat || null,
            message: xabar || null,
          },
        ]);
        if (error) {
          console.error("Supabase saqlash xatosi:", error);
        } else {
          dbSaved = true;
        }
      }
    } catch (err) {
      console.error("Supabase ulanish xatosi:", err);
    }
  }

  // 2. Send Telegram Notification
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (token && chatId) {
    const lines = [
      "🆕 Yangi so'rov — TOGO Group Pro",
      `👤 Ism: ${ism}`,
      `📞 Telefon: ${telefon}`,
      xizmat && `🛠 Xizmat: ${xizmat}`,
      xabar && `💬 Xabar: ${xabar}`,
      dbSaved && `✅ Supabase bazasiga saqlandi`,
    ].filter(Boolean);

    try {
      const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: lines.join("\n") }),
      });
      const result = await res.json();
      if (res.ok && result.ok) {
        telegramSent = true;
      } else {
        console.error("Telegram xatosi:", result);
      }
    } catch (err) {
      console.error("Telegram yuborish xatosi:", err);
    }
  }

  // If either Supabase saved or Telegram sent (or both), return success
  if (dbSaved || telegramSent) {
    return Response.json({ ok: true, dbSaved, telegramSent });
  }

  // Fallback when neither service is fully configured
  console.warn("Lid qabul qilindi, lekin Telegram/Supabase sozlamalari yo'q.");
  return Response.json({
    ok: true,
    warning: "So'rovingiz qabul qilindi. Tez orada siz bilan bog'lanamiz.",
  });
}
