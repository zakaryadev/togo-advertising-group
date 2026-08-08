# TOGO Group Pro — Lid ushlash + SEO/AI ko'rinishi

## Context

Sayt (Next.js 16.3 App Router) vizual jihatdan zamonaviy, lekin lid (mijoz so'rovi) ushlashda va qidiruv/AI ko'rinishida jiddiy bo'shliqlar bor. Eski jonli sayt (togogrouppro.uz) bilan solishtirib va kodni to'liq o'qib chiqib, quyidagi aniq muammolar tasdiqlandi:

1. **Aloqa formasi hech narsa yubormaydi** — `onSubmit` faqat local state'ni o'zgartiradi, hech qanday backend yo'q.
2. **"Batafsil" tugmalari o'lik link** — `/xizmatlar#slug` anchoriga mos `id` sahifada yo'q.
3. **Telefon va ijtimoiy tarmoq linklari placeholder** — hamma joyda `+998 90 123 45 67` va `href="#aloqa"`. Eski jonli saytdan tasdiqlangan haqiqiy ma'lumotlar: tel `+998 77 300 45 00`, Instagram `instagram.com/reklama_togo_group`, Telegram `t.me/togo_group_pro`, YouTube `youtube.com/@togogrouppro` (WhatsApp yo'q edi — foydalanuvchi buni ham tasdiqladi, YouTube bilan almashtiramiz).
4. **`/aloqa`, `/portfolio`, `/xizmatlar` sahifalari deyarli stilsiz** — bu sahifalar ishlatadigan CSS klasslar (`.contact-form`, `.filter-bar`, `.inner-hero h1`, `.portfolio-page-card` va h.k.) `globals.css`da umuman yo'q (brauzerda tasdiqlangan: form padding/border = 0, h1 font-size = 16px o'rniga bo'lishi kerak bo'lgan ~40-70px). Faqat Bosh sahifa to'liq stillangan.
5. **SEO/AI ko'rinishi kam** — bitta global title/description bor, sahifaga xos metadata, OG rasm, JSON-LD schema, `robots.txt`, `sitemap.ts` yo'q.

Foydalanuvchi ikkala yo'nalishni (lid ushlash + SEO/AI) va CSS stilini ham shu safar birga qilishni tanladi.

**Next.js API tekshiruvi**: `node_modules/next/dist/docs/`dan o'qildi — metadata (Server Component-only), Route Handlers, `sitemap.ts`/`robots.ts`, Server Functions standart Next.js bilan bir xil, breaking change yo'q. `app/xizmatlar/page.tsx` allaqachon Server Component (metadata to'g'ridan-to'g'ri qo'shiladi); `app/portfolio/page.tsx` va `app/aloqa/page.tsx` `"use client"` bo'lgani uchun metadata uchun yangi `layout.tsx` kerak (rasmiy tavsiya qilingan pattern).

## A. Umumiy aloqa ma'lumoti (bitta manba)

`app/content/site-content.ts`ga yangi `contact` konstantasi qo'shiladi (phone, phoneHref, email, address, hours, instagram, telegram, youtube). Hozir bu qiymatlar 4 ta faylda mustaqil hardcode qilingan — bittadan import qilish kelajakda drift bo'lishining oldini oladi.

## B. Lid ushlash

1. **`app/api/contact/route.ts`** (yangi) — `POST` handler. Kelgan formani tekshiradi (ism+telefon required), Telegram Bot API orqali (`fetch` bilan `sendMessage`) `process.env.TELEGRAM_BOT_TOKEN`/`TELEGRAM_CHAT_ID`'ga yuboradi. Email/SMTP o'rniga Telegram tanlandi — biznesda haqiqiy Telegram bor, bepul, mobilga darhol bildirishnoma keladi, O'zbekistonda kichik biznes uchun standart yechim.
2. **`.env.local`** (yangi, `.gitignore`da `.env*` allaqachon bor — xavfsiz) — `TELEGRAM_BOT_TOKEN=`, `TELEGRAM_CHAT_ID=` placeholder + izoh sifatida qanday olish yo'riqnomasi (@BotFather → /newbot; keyin botga yozib, `getUpdates` orqali chat id olish). **Bu qadamni foydalanuvchi o'zi bajarishi kerak — men haqiqiy token yarata olmayman.**
3. **`app/aloqa/page.tsx`** — form inputlariga `name` atributi qo'shiladi (hozir yo'q), submit'da `/api/contact`ga `fetch` POST qilinadi, holat `idle/pending/sent/error` bo'ladi (xato bo'lsa — "iltimos qo'ng'iroq qiling" + haqiqiy tel raqami ko'rsatiladi, hech qachon o'lik tugash bo'lmaydi). Kontakt ma'lumotlari va socials `contact` konstantasidan olinadi, WhatsApp ikonkasi YouTube'ga almashtiriladi.
4. **`app/xizmatlar/page.tsx`** — har bir xizmat kartochkasiga `id={item.slug}` qo'shiladi, shu bilan mavjud `BATAFSIL` anchor linklari ishlay boshlaydi.
5. **Placeholder almashtirish** — `app/page.tsx`, `app/components/site-header.tsx`, `app/components/site-footer.tsx` dagi telefon/ijtimoiy tarmoq/WhatsApp→YouTube barchasi `contact` konstantasiga o'tkaziladi.

## C. Ichki sahifalarga CSS (globals.css'ga qo'shiladi, mavjud dizayn tokenlaridan foydalanib: `--lime`, `--surface`, `--line`, `--s1..s9`, `--fs-*`, `--radius`)

Yetishmayotgan klasslar guruhlari va yondashuv:

- **`.inner-hero`** (+ `.contact-hero`/`.portfolio-hero` modifikatorlari) — `.hero`ga o'xshash fon va padding, h1/p uchun `--fs-display`/`--fs-lg` o'lchamlari (hozir Tailwind preflight tufayli 16px'ga tushib qolgan).
- **Aloqa**: `.contact-layout` (2 ustunli grid, `.footer-grid` patterniga o'xshash), `.contact-info`, `.contact-item` (`.benefit`/`.metric` uslubida), `.contact-socials`, `.contact-form` (`.card` uslubidagi konteyner), `label`/`input`/`select`/`textarea` uchun qorong'i tema stillari (fokusda mavjud global `:focus-visible` lime outline avtomatik ishlaydi), `.form-heading`, `.map-placeholder`.
- **Portfolio**: `.filter-bar`/`.filter`/`.filter.active` (pill tugmalar, `.btn` uslubida, active holatda `--lime`), `.portfolio-page-grid/-card/-media/-body` — mavjud `.card`/`.portfolio-media`/`.portfolio-body` vizual tiliga mos (border, radius, hover lift).
- **Xizmatlar**: `.service-page-grid`, `.page-service-card/-media/-body` — mavjud `.card`/`.service-media` kengaytirilgan versiyasi (globals.css oxiridagi "richer" spacing bo'limi allaqachon shunga mo'ljallangan ko'rinadi).
- **`.page-cta`** — mavjud `.cta` qoidalarini grouped selector orqali qayta ishlatish (`.cta, .page-cta { ... }`), dublikatsiz.

Maqsad: yangi qiymat o'ylab topish emas, balki Bosh sahifada allaqachon ishlatilgan naqsh/token'larni shu sahifalarga kengaytirish — vizual yaxlitlik saqlanadi.

## D. SEO + AI/qidiruv ko'rinishi

6. **`app/layout.tsx`** — `metadataBase` (`https://togogrouppro.uz` — eski jonli domen, yangi sayt shu domenga chiqishi taxmin qilinmoqda), title template (`%s — TOGO Group Pro`), kengaytirilgan description+keywords, `openGraph`, `twitter`, `robots: {index:true, follow:true}`, `icons`. Root'da `<script type="application/ld+json">` orqali `LocalBusiness`/`AdvertisingAgency` schema (nom, telefon, manzil, `sameAs`: [instagram, telegram, youtube]) — bu aynan AI/qidiruv botlariga sayt haqida strukturaviy ma'lumot beradi.
7. **`app/xizmatlar/page.tsx`** — sahifaga xos `export const metadata` (allaqachon Server Component).
8. **`app/portfolio/layout.tsx`** va **`app/aloqa/layout.tsx`** (yangi, minimal Server Component) — har biri o'z `metadata`sini eksport qiladi, `{children}`ni render qiladi.
9. **`app/sitemap.ts`** (yangi) — 4 ta route (`/`, `/xizmatlar`, `/portfolio`, `/aloqa`).
10. **`app/robots.ts`** (yangi) — barcha botlarga (Googlebot, GPTBot, ClaudeBot va h.k.) ruxsat, sitemap'ga havola.
11. **`app/icon.svg`** — mavjud `public/togo_logo.svg`dan foydalanib qo'shiladi (agar kvadrat faviconga mos kelmasa, eslatib o'tiladi — alohida asset kerak bo'lishi mumkin).

## Tekshirish

- Dev server (`localhost:3000`, allaqachon ishlab turibdi) orqali `/`, `/xizmatlar`, `/portfolio`, `/aloqa`ni brauzerda ochib: forma vizual to'g'ri ko'rinishini, "Batafsil" linklari to'g'ri joyga tushishini, barcha telefon/ijtimoiy tarmoq havolalarini (`read_page` orqali href tekshirish), portfolio filter tugmalarini tekshiraman.
- Formani real submit qilib, `/api/contact`ga tarmoq so'rovini (`read_network_requests`) va TELEGRAM env sozlanmagan holatda foydalanuvchiga aniq xato ko'rsatilishini tekshiraman.
- `/sitemap.xml` va `/robots.txt`ni to'g'ridan-to'g'ri ochib chiqishni tekshiraman.
- `npm run lint` ishga tushiraman.
- Foydalanuvchiga yakunda aniq ayting: **Telegram bot token/chat ID o'zi sozlashi shart** — aks holda forma "xatolik" ko'rsatadi (lekin endi hech bo'lmasa buzilmaydi, foydalanuvchiga muqobil — qo'ng'iroq qiling — ko'rsatiladi).
