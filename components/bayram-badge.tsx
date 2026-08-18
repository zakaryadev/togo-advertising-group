"use client";

import { useEffect, useState, type CSSProperties } from "react";
import type { Locale } from "@/data/site";

type Translation = Record<Locale, string>;
type Holiday = { id: string; from: string; to: string; accent: string; icon: string; date: Translation; name: Translation; message: Translation };

export const holidaySchedule: Holiday[] = [
  { id: "new-year", from: "12-15", to: "01-10", accent: "#38BDF8", icon: "✦", date: { uz: "1-yanvar", ru: "1 января", en: "1 January" }, name: { uz: "Yangi yil", ru: "Новый год", en: "New Year" }, message: { uz: "Yangi yilingiz bilan!", ru: "С Новым годом!", en: "Happy New Year!" } },
  { id: "navruz", from: "03-15", to: "03-25", accent: "#20A45A", icon: "✿", date: { uz: "21-mart", ru: "21 марта", en: "21 March" }, name: { uz: "Navro'z", ru: "Навруз", en: "Navruz" }, message: { uz: "Navro'z bayrami muborak!", ru: "С праздником Навруз!", en: "Happy Navruz!" } },
  { id: "independence", from: "08-28", to: "09-05", accent: "#0099B5", icon: "★", date: { uz: "1-sentabr", ru: "1 сентября", en: "1 September" }, name: { uz: "Mustaqillik kuni", ru: "День независимости", en: "Independence Day" }, message: { uz: "Ozod va obod yurt bayrami muborak!", ru: "С праздником свободной страны!", en: "Celebrating a free and proud nation!" } },
  { id: "teachers-day", from: "09-25", to: "10-05", accent: "#8B5CF6", icon: "✦", date: { uz: "1-oktyabr", ru: "1 октября", en: "1 October" }, name: { uz: "Ustoz va murabbiylar kuni", ru: "День учителя", en: "Teachers' Day" }, message: { uz: "Ustoz va murabbiylar bayrami muborak!", ru: "С Днём учителя!", en: "Happy Teachers' Day!" } },
  { id: "constitution", from: "12-03", to: "12-10", accent: "#2563EB", icon: "◆", date: { uz: "8-dekabr", ru: "8 декабря", en: "8 December" }, name: { uz: "Konstitutsiya kuni", ru: "День Конституции", en: "Constitution Day" }, message: { uz: "Konstitutsiya kuni muborak!", ru: "С Днём Конституции!", en: "Happy Constitution Day!" } },
  { id: "ramadan-2026", from: "2026-02-18", to: "2026-02-24", accent: "#FBBA00", icon: "☾", date: { uz: "18-fevral", ru: "18 февраля", en: "18 February" }, name: { uz: "Ramazon oyi", ru: "Месяц Рамадан", en: "Ramadan" }, message: { uz: "Ramazon oyi muborak bo'lsin!", ru: "Благословенного месяца Рамадан!", en: "Ramadan Mubarak!" } },
  { id: "eid-fitr-2026", from: "2026-03-19", to: "2026-03-23", accent: "#FBBA00", icon: "☾", date: { uz: "19-mart", ru: "19 марта", en: "19 March" }, name: { uz: "Ramazon hayiti", ru: "Рамазан хайит", en: "Eid al-Fitr" }, message: { uz: "Ramazon hayitingiz muborak bo'lsin!", ru: "С праздником Рамазан хайит!", en: "Eid Mubarak!" } },
  { id: "eid-adha-2026", from: "2026-05-26", to: "2026-05-30", accent: "#FBBA00", icon: "☾", date: { uz: "26-may", ru: "26 мая", en: "26 May" }, name: { uz: "Qurbon hayiti", ru: "Курбан хайит", en: "Eid al-Adha" }, message: { uz: "Qurbon hayitingiz muborak bo'lsin!", ru: "С праздником Курбан хайит!", en: "Eid Mubarak!" } },
];

function todayInTashkent() {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Tashkent", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(new Date());
  const value = Object.fromEntries(parts.filter((part) => part.type !== "literal").map((part) => [part.type, part.value]));
  return `${value.year}-${value.month}-${value.day}`;
}

export function getActiveHoliday(today = todayInTashkent()) {
  const year = today.slice(0, 4);
  return holidaySchedule.find((holiday) => {
    const crossesYear = holiday.from.length === 5 && holiday.to.length === 5 && holiday.to < holiday.from;
    const fromYear = crossesYear && today.slice(5) <= holiday.to ? String(Number(year) - 1) : year;
    const from = holiday.from.length === 5 ? `${fromYear}-${holiday.from}` : holiday.from;
    const to = holiday.to.length === 5 ? `${crossesYear ? Number(fromYear) + 1 : year}-${holiday.to}` : holiday.to;
    return today >= from && today <= to;
  }) ?? null;
}

export default function BayramBadge({ locale }: { locale: Locale }) {
  const [holiday, setHoliday] = useState<Holiday | null>(null);
  const [greeting, setGreeting] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const current = getActiveHoliday();
    if (!current) return;
    setHoliday(current);
    const badgeWasDismissed = sessionStorage.getItem(`togo-holiday-${current.id}`) === "hidden";
    setDismissed(badgeWasDismissed);
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const open = window.setTimeout(() => setGreeting(true), 380);
      const close = window.setTimeout(() => setGreeting(false), 3180);
      return () => { window.clearTimeout(open); window.clearTimeout(close); };
    }
  }, []);

  if (!holiday) return null;
  const style = { "--holiday-accent": holiday.accent } as CSSProperties;
  return <>
    {greeting && <div className="holiday-greeting" style={style} aria-hidden="true">
      <div className="holiday-greeting-veil" /><div className="holiday-greeting-dots" />
      <div className="holiday-greeting-stage">
        <div className="holiday-greeting-icons"><i>{holiday.icon}</i><i>✦</i><i>✺</i></div>
        <div className="holiday-greeting-date">{holiday.date[locale]} · {holiday.name[locale]}</div>
        <div className="holiday-greeting-message">{holiday.message[locale]}</div>
        <div className="holiday-greeting-rule" /><div className="holiday-greeting-sign">TOGO GROUP ADVERTISING</div>
      </div>
    </div>}
    {!dismissed && <aside className="holiday-badge" style={style} aria-label={holiday.name[locale]}>
      <span className="holiday-badge-icon" aria-hidden="true">{holiday.icon}</span>
      <span className="holiday-badge-copy"><span>{holiday.date[locale]}</span><strong>{holiday.name[locale]}</strong><small>{holiday.message[locale]}</small></span>
      <button type="button" aria-label="Yopish" onClick={() => { sessionStorage.setItem(`togo-holiday-${holiday.id}`, "hidden"); setDismissed(true); }}>×</button>
    </aside>}
  </>;
}
