'use client';

import React, { useEffect, useRef, useState } from 'react';

export interface Holiday {
  id: string;
  name: string;
  officialDate: string;
  from: string;
  to: string;
  fx: 'snow' | 'petal' | 'confetti' | 'balloon' | 'sparkle' | 'star';
  accentColor: string;
  greetings: {
    uz: string;
    ru: string;
    en: string;
  };
  icons: string[];
  emojis: string[];
  colors: string[];
  isMovable?: boolean;
  years?: Record<string, { from: string; to: string }>;
}

export const UZBEKISTAN_HOLIDAYS: Holiday[] = [
  {
    id: 'ramazon-start',
    name: 'Ramazon oyi boshlanishi',
    officialDate: 'Fevral - Mart',
    from: '2026-02-18',
    to: '2026-02-24',
    fx: 'sparkle',
    accentColor: '#FBBA00',
    greetings: {
      uz: "Ramazon oyi muborak bo'lsin!",
      ru: 'Благословенного месяца Рамазан!',
      en: 'Ramadan Mubarak!',
    },
    icons: ['crescent', 'spark', 'star5'],
    emojis: ['🌙', '✨', '⭐'],
    colors: ['#FBBA00', '#FFD569', '#FFF0C2'],
    isMovable: true,
    years: {
      '2025': { from: '2025-03-01', to: '2025-03-07' },
      '2026': { from: '2026-02-18', to: '2026-02-24' },
      '2027': { from: '2027-02-08', to: '2027-02-14' },
      '2028': { from: '2028-01-28', to: '2028-02-03' },
      '2029': { from: '2029-01-16', to: '2029-01-22' },
      '2030': { from: '2030-01-05', to: '2030-01-11' },
    },
  },
  {
    id: 'ramazon-hayit',
    name: 'Ramazon hayiti (Iyd al-Fitr)',
    officialDate: '1 Shavvol',
    from: '2026-03-19',
    to: '2026-03-23',
    fx: 'sparkle',
    accentColor: '#FBBA00',
    greetings: {
      uz: "Ramazon hayitingiz muborak bo'lsin!",
      ru: 'С праздником Рамазан хайит!',
      en: 'Eid Mubarak!',
    },
    icons: ['crescent', 'spark', 'star5'],
    emojis: ['🌙', '✨', '⭐', '🕌'],
    colors: ['#FBBA00', '#FFD569', '#FFF0C2', '#FFFFFF'],
    isMovable: true,
    years: {
      '2025': { from: '2025-03-30', to: '2025-04-02' },
      '2026': { from: '2026-03-19', to: '2026-03-23' },
      '2027': { from: '2027-03-09', to: '2027-03-12' },
      '2028': { from: '2028-02-26', to: '2028-03-01' },
      '2029': { from: '2029-02-14', to: '2029-02-17' },
      '2030': { from: '2030-02-04', to: '2030-02-07' },
    },
  },
  {
    id: 'qurbon-hayit',
    name: 'Qurbon hayiti (Iyd al-Adha)',
    officialDate: '10 Zulhijja',
    from: '2026-05-26',
    to: '2026-05-30',
    fx: 'sparkle',
    accentColor: '#FBBA00',
    greetings: {
      uz: "Qurbon hayitingiz muborak bo'lsin!",
      ru: 'С праздником Курбан хайит!',
      en: 'Eid Mubarak!',
    },
    icons: ['crescent', 'spark', 'star5'],
    emojis: ['🌙', '✨', '⭐', '🕌'],
    colors: ['#FBBA00', '#FFD569', '#FFF0C2', '#FFFFFF'],
    isMovable: true,
    years: {
      '2025': { from: '2025-06-06', to: '2025-06-09' },
      '2026': { from: '2026-05-26', to: '2026-05-30' },
      '2027': { from: '2027-05-16', to: '2027-05-19' },
      '2028': { from: '2028-05-05', to: '2028-05-08' },
      '2029': { from: '2029-04-24', to: '2029-04-27' },
      '2030': { from: '2030-04-13', to: '2030-04-16' },
    },
  },
  {
    id: 'yangi-yil',
    name: 'Yangi yil bayrami',
    officialDate: '1-yanvar',
    from: '12-15',
    to: '01-10',
    fx: 'snow',
    accentColor: '#38BDF8',
    greetings: {
      uz: 'Yangi yilingiz bilan!',
      ru: 'С Новым годом!',
      en: 'Happy New Year!',
    },
    icons: ['snowflake', 'spark', 'gift', 'bauble'],
    emojis: ['❄️', '⭐', '🎁', '🎄'],
    colors: ['#FFFFFF', '#BAE6FD', '#FFD569'],
  },
  {
    id: 'vatan-himoyachilari',
    name: 'Vatan himoyachilari kuni',
    officialDate: '14-yanvar',
    from: '01-10',
    to: '01-16',
    fx: 'star',
    accentColor: '#0099B5',
    greetings: {
      uz: 'Vatan himoyachilari kuni muborak!',
      ru: 'С Днём защитников Родины!',
      en: 'Happy Defenders of the Fatherland Day!',
    },
    icons: ['star5', 'burst'],
    emojis: ['🛡️', '⭐', '🎖️', '🇺🇿'],
    colors: ['#0099B5', '#FFFFFF', '#1EB53A', '#FBBA00'],
  },
  {
    id: '8-mart',
    name: 'Xalqaro xotin-qizlar kuni',
    officialDate: '8-mart',
    from: '03-04',
    to: '03-10',
    fx: 'petal',
    accentColor: '#FF7EA8',
    greetings: {
      uz: '8-mart xalqaro xotin-qizlar kuni muborak!',
      ru: 'С праздником 8 Марта!',
      en: "Happy International Women's Day!",
    },
    icons: ['tulip', 'flower', 'heart'],
    emojis: ['🌷', '🌸', '💐', '❤️'],
    colors: ['#FF7EA8', '#FFB3C7', '#FFE0EA', '#FBBA00'],
  },
  {
    id: 'navruz',
    name: "Navro'z umumxalq bayrami",
    officialDate: '21-mart',
    from: '03-15',
    to: '03-25',
    fx: 'petal',
    accentColor: '#8FD16B',
    greetings: {
      uz: "Navro'z ayyomi muborak!",
      ru: 'С праздником Навруз!',
      en: 'Happy Navruz!',
    },
    icons: ['flower', 'sprout', 'leaf'],
    emojis: ['🌸', '🌱', '🌼', '☀️'],
    colors: ['#FFE3EC', '#FFFFFF', '#8FD16B', '#FFD569'],
  },
  {
    id: 'xotira-qadrlash',
    name: 'Xotira va qadrlash kuni',
    officialDate: '9-may',
    from: '05-04',
    to: '05-11',
    fx: 'petal',
    accentColor: '#C0392B',
    greetings: {
      uz: '9-may — Xotira va qadrlash kuni',
      ru: '9 Мая — День памяти и почестей',
      en: 'May 9 — Day of Remembrance and Honour',
    },
    icons: ['tulip', 'ribbon', 'leaf'],
    emojis: ['🌷', '🕊️', '🎗️'],
    colors: ['#C0392B', '#8E2A20', '#E07A6B'],
  },
  {
    id: 'songgi-qongiroq',
    name: "So'nggi qo'ng'iroq",
    officialDate: '25-may',
    from: '05-22',
    to: '05-27',
    fx: 'confetti',
    accentColor: '#FBBA00',
    greetings: {
      uz: "So'nggi qo'ng'iroq muborak!",
      ru: 'С последним звонком!',
      en: 'Happy Last Bell!',
    },
    icons: ['bell', 'star5', 'book'],
    emojis: ['🔔', '🎓', '🎉', '⭐'],
    colors: ['#FBBA00', '#FFFFFF', '#7EC8FF', '#FF7EA8'],
  },
  {
    id: 'bolalar-kuni',
    name: 'Xalqaro bolalarni himoya qilish kuni',
    officialDate: '1-iyun',
    from: '05-28',
    to: '06-03',
    fx: 'balloon',
    accentColor: '#FFD93D',
    greetings: {
      uz: '1-iyun — Xalqaro bolalarni himoya qilish kuni!',
      ru: 'С Днём защиты детей!',
      en: "Happy International Children's Day!",
    },
    icons: ['balloon'],
    emojis: ['🎈', '🧸', '🎨', '⭐'],
    colors: ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#FF9FF3'],
  },
  {
    id: 'mustaqillik',
    name: 'Mustaqillik kuni',
    officialDate: '1-sentyabr',
    from: '08-25',
    to: '09-03',
    fx: 'confetti',
    accentColor: '#0099B5',
    greetings: {
      uz: '1-sentyabr — Mustaqillik kuni muborak!',
      ru: 'С Днём независимости!',
      en: 'Happy Independence Day!',
    },
    icons: ['star5', 'burst'],
    emojis: ['🎆', '⭐', '🎉', '🇺🇿'],
    colors: ['#0099B5', '#FFFFFF', '#1EB53A', '#CE1126', '#FBBA00'],
  },
  {
    id: 'uqituvchilar-kuni',
    name: "O'qituvchi va murabbiylar kuni",
    officialDate: '1-oktyabr',
    from: '09-26',
    to: '10-03',
    fx: 'petal',
    accentColor: '#D98324',
    greetings: {
      uz: '1-oktyabr — Ustoz va murabbiylar kuni muborak!',
      ru: 'С Днём учителя и наставника!',
      en: "Happy Teachers' Day!",
    },
    icons: ['leaf', 'book'],
    emojis: ['🍁', '🍂', '📚', '✏️'],
    colors: ['#D98324', '#FBBA00', '#B44C1F', '#E9C46A'],
  },
  {
    id: 'ozbek-tili',
    name: "O'zbek tili bayrami kuni",
    officialDate: '21-oktyabr',
    from: '10-18',
    to: '10-23',
    fx: 'sparkle',
    accentColor: '#0099B5',
    greetings: {
      uz: "21-oktyabr — O'zbek tili bayrami kuni!",
      ru: '21 октября — День узбекского языка!',
      en: 'Uzbek Language Day!',
    },
    icons: ['book', 'star5'],
    emojis: ['🇺🇿', '📖', '✨', '⭐'],
    colors: ['#0099B5', '#FFFFFF', '#1EB53A', '#FBBA00'],
  },
  {
    id: 'davlat-bayrogi',
    name: "O'zbekiston Davlat bayrog'i kuni",
    officialDate: '18-noyabr',
    from: '11-15',
    to: '11-20',
    fx: 'confetti',
    accentColor: '#0099B5',
    greetings: {
      uz: "18-noyabr — O'zbekiston Davlat bayrog'i kuni!",
      ru: '18 ноября — День Государственного флага!',
      en: 'State Flag Day of Uzbekistan!',
    },
    icons: ['star5', 'burst'],
    emojis: ['🇺🇿', '✨', '⭐', '🎉'],
    colors: ['#0099B5', '#FFFFFF', '#1EB53A', '#CE1126'],
  },
  {
    id: 'konstitutsiya',
    name: 'Konstitutsiya kuni',
    officialDate: '8-dekabr',
    from: '12-04',
    to: '12-09',
    fx: 'confetti',
    accentColor: '#0099B5',
    greetings: {
      uz: '8-dekabr — Konstitutsiya kuni muborak!',
      ru: '8 декабря — С Днём Конституции!',
      en: 'Happy Constitution Day!',
    },
    icons: ['star5'],
    emojis: ['⭐', '🇺🇿', '🎉'],
    colors: ['#0099B5', '#FFFFFF', '#1EB53A'],
  },
  {
    id: 'davlat-madhiyasi',
    name: "O'zbekiston Davlat madhiyasi kuni",
    officialDate: '10-dekabr',
    from: '12-09',
    to: '12-12',
    fx: 'sparkle',
    accentColor: '#FBBA00',
    greetings: {
      uz: "10-dekabr — O'zbekiston Davlat madhiyasi kuni!",
      ru: '10 декабря — День Государственного гимна!',
      en: 'State Anthem Day of Uzbekistan!',
    },
    icons: ['star5', 'burst'],
    emojis: ['🎵', '🎶', '🇺🇿', '⭐'],
    colors: ['#FBBA00', '#0099B5', '#FFFFFF', '#1EB53A'],
  },
];

export function getHolidayRange(holiday: Holiday, year: number): { from: string; to: string } {
  if (holiday.years && holiday.years[year.toString()]) {
    return holiday.years[year.toString()];
  }
  return { from: holiday.from, to: holiday.to };
}

export function isHolidayActive(holiday: Holiday, date: Date = new Date()): boolean {
  const y = date.getFullYear();
  const range = getHolidayRange(holiday, y);

  const parseDateStr = (str: string, currentYear: number) => {
    const parts = str.split('-');
    if (parts.length === 3) {
      return new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    }
    return new Date(currentYear, parseInt(parts[0], 10) - 1, parseInt(parts[1], 10));
  };

  const start = parseDateStr(range.from, y);
  const end = parseDateStr(range.to, y);
  end.setHours(23, 59, 59, 999);

  if (end < start) {
    const startPrev = parseDateStr(range.from, y - 1);
    const endCurr = parseDateStr(range.to, y);
    endCurr.setHours(23, 59, 59, 999);

    const startCurr = parseDateStr(range.from, y);
    const endNext = parseDateStr(range.to, y + 1);
    endNext.setHours(23, 59, 59, 999);

    return (date >= startPrev && date <= endCurr) || (date >= startCurr && date <= endNext);
  }

  return date >= start && date <= end;
}

export function getActiveHoliday(date: Date = new Date()): Holiday | null {
  for (const h of UZBEKISTAN_HOLIDAYS) {
    if (isHolidayActive(h, date)) {
      return h;
    }
  }
  return null;
}

interface BayramBadgeProps {
  forceHoliday?: Holiday | null;
  lang?: 'uz' | 'ru' | 'en';
}

export default function BayramBadge({ forceHoliday, lang = 'uz' }: BayramBadgeProps) {
  const [activeHoliday, setActiveHoliday] = useState<Holiday | null>(null);
  const [currentLang, setCurrentLang] = useState<'uz' | 'ru' | 'en'>(lang);
  const [dismissed, setDismissed] = useState<boolean>(false);
  const [animateKey, setAnimateKey] = useState<number>(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const current = forceHoliday || getActiveHoliday();
    if (current) {
      setActiveHoliday(current);
      try {
        const isHidden = sessionStorage.getItem(`togo_holiday_hide_${current.id}`);
        if (isHidden === 'true') {
          setDismissed(true);
        }
      } catch (e) {
        // Ignore session storage errors
      }
    }
  }, [forceHoliday]);

  // Listen to language changes via DOM MutationObserver & Custom Event
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const initialLang = (document.documentElement.lang || lang).slice(0, 2) as 'uz' | 'ru' | 'en';
    if (['uz', 'ru', 'en'].includes(initialLang)) {
      setCurrentLang(initialLang);
    }

    const handleLanguageChange = (newLangStr: string) => {
      const validLang = newLangStr.slice(0, 2) as 'uz' | 'ru' | 'en';
      if (['uz', 'ru', 'en'].includes(validLang)) {
        setCurrentLang(validLang);
        setDismissed(false); // Re-open badge to greet user in the new language!
        setAnimateKey((prev) => prev + 1);
      }
    };

    const observer = new MutationObserver(() => {
      handleLanguageChange(document.documentElement.lang || 'uz');
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang'],
    });

    const handleCustomEvent = (e: Event) => {
      const customEv = e as CustomEvent<string>;
      if (customEv.detail) {
        handleLanguageChange(customEv.detail);
      } else {
        handleLanguageChange(document.documentElement.lang || 'uz');
      }
    };

    window.addEventListener('togo_lang_change', handleCustomEvent);

    return () => {
      observer.disconnect();
      window.removeEventListener('togo_lang_change', handleCustomEvent);
    };
  }, [lang]);

  // Update language if prop changes directly
  useEffect(() => {
    if (lang && ['uz', 'ru', 'en'].includes(lang)) {
      setCurrentLang(lang);
      setDismissed(false);
      setAnimateKey((prev) => prev + 1);
    }
  }, [lang]);

  // Particle Animation canvas effect
  useEffect(() => {
    if (!activeHoliday || dismissed || typeof window === 'undefined') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const isUp = activeHoliday.fx === 'balloon' || activeHoliday.fx === 'sparkle';
    const emojis = activeHoliday.emojis;
    const colors = activeHoliday.colors;
    const count = Math.min(35, Math.floor(width / 30));

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      rotation: number;
      spin: number;
      opacity: number;
      color: string;
      emoji: string;
    }

    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 14 + Math.random() * 14,
        speedY: (0.4 + Math.random() * 0.8) * (isUp ? -1 : 1),
        speedX: (Math.random() - 0.5) * 0.5,
        rotation: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.03,
        opacity: 0.5 + Math.random() * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.y * 0.01) * 0.3;
        p.rotation += p.spin;

        if (isUp && p.y < -40) p.y = height + 40;
        if (!isUp && p.y > height + 40) p.y = -40;
        if (p.x < -40) p.x = width + 40;
        if (p.x > width + 40) p.x = -40;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;
        ctx.font = `${Math.floor(p.size)}px "Apple Color Emoji", "Segoe UI Emoji", sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(p.emoji, 0, 0);
        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [activeHoliday, dismissed]);

  if (!activeHoliday) return null;

  const handleDismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem(`togo_holiday_hide_${activeHoliday.id}`, 'true');
    } catch (e) {
      // Ignore storage error
    }
  };

  const greeting = activeHoliday.greetings[currentLang] || activeHoliday.greetings.uz;

  return (
    <>
      {!dismissed && (
        <canvas
          ref={canvasRef}
          className="pointer-events-none fixed inset-0 z-[9998] h-full w-full"
          aria-hidden="true"
        />
      )}

      {!dismissed && (
        <div
          key={animateKey}
          className="fixed bottom-5 left-5 z-[9999] flex max-w-[calc(100vw-40px)] items-center gap-3 rounded-full border px-4 py-2.5 shadow-2xl backdrop-blur-md transition-all duration-500 animate-in fade-in slide-in-from-bottom-4"
          style={{
            backgroundColor: 'rgba(15, 23, 42, 0.92)',
            borderColor: `${activeHoliday.accentColor}55`,
            boxShadow: `0 10px 30px -10px ${activeHoliday.accentColor}33`,
          }}
        >
          <span className="text-xl" role="img" aria-label="Holiday Emoji">
            {activeHoliday.emojis[0] || '🎉'}
          </span>
          <div className="flex flex-col min-w-0">
            <span className="truncate text-xs font-semibold text-gray-400">
              {activeHoliday.name} ({activeHoliday.officialDate})
            </span>
            <span className="truncate text-sm font-bold text-white" style={{ color: activeHoliday.accentColor }}>
              {greeting}
            </span>
          </div>
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Yopish"
            className="ml-1 rounded-full p-1 text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
}
