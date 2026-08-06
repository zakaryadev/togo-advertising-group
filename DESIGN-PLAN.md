# TOGO Group Pro — Landing UI Redesign rejasi

**Sana:** 2026-08-06
**Tahlil qilingan fayllar:** `app/globals.css`, `app/page.tsx`
**Usul:** dev serverda (localhost:3000) real DOM o'lchovlari olindi — 1440px, 899px va 375px kengliklarda.

---

## 1. Xulosa

Sizning taxminingiz to'g'ri, va bu "ta'm masalasi" emas — o'lchovlar bilan tasdiqlandi.

Asosiy muammo **bitta**: saytda *spacing tizimi* (interval tizimi) va *typography scale* umuman yo'q. Barcha qiymatlar qo'lda, tasodifiy tanlangan (3, 5, 7, 9, 11, 13, 15, 19, 23, 27, 34 px...). Natijada har bir element bir-biriga yopishib qolgan va ko'z hech qayerda "dam olmaydi".

Eng og'ir raqam:

> **Desktop'da (1440px) butun landing — 8 ta bo'lim — atigi 2198px, ya'ni 2.4 ekran.**
> Bunday sayt uchun normal ko'rsatkich 4–6 ekran. Ya'ni kontent taxminan **2 barobar siqilgan**.

Muhim: **rang kontrasti muammo emas.** Tekshirildi — barcha matnlar 8.9:1 dan 17.6:1 gacha (WCAG AAA dan ancha yuqori). Ya'ni matnni o'qish qiyinligi rangdan emas, **o'lchamdan va zichlikdan**. Shuning uchun rang palitrasiga tegmaymiz — u yaxshi.

---

## 2. O'lchangan muammolar

### 2.1 Bo'limlar orasida bo'sh joy yo'q (eng og'ir muammo)

`.section{padding:34px 0 0}` — pastki padding **umuman yo'q**.

Real o'lchov, 1440px:

| Bo'limlar orasi | Hozir | Bo'lishi kerak |
|---|---|---|
| hero → metrics | −2px | 0 (ataylab, bu overlap dizayn) |
| metrics → Xizmatlar | **0px** | 96px |
| Xizmatlar → Portfolio | **0px** | 96px |
| Portfolio → Jarayon | **0px** | 96px |
| Jarayon → Afzalliklar | **0px** | 96px |
| Afzalliklar → CTA | 28px | 96px |
| CTA → Footer | 25px | 96px |

Bo'limlar bir-biriga **tegib turibdi**. Ajratuvchi yagona narsa — keyingi bo'limning 34px top padding'i. Bu ko'zga "bir uzun devor" bo'lib ko'rinadi, shuning uchun ham bosh og'riydi.

Ustiga-ustak `.section-head{margin-bottom:15px}` — sarlavha bilan kontent orasi 15px. Sarlavha ustida 34px, ostida 15px. Guruhlash (proximity) juda zaif o'qiladi.

### 2.2 Shrift o'lchamlari juda kichik

| Element | Hozir | Muammo |
|---|---|---|
| `.portfolio-body p` | **9px** | O'qib bo'lmaydi |
| `.card p`, `.footer a`, `.footer p` | **10px** | Minimumdan past |
| `.card h3` (xizmat nomi!) | 12px | Sarlavha body'dan kichik |
| `.portfolio-body h3` | 11px | Sarlavha emas, izoh kabi |
| `.benefit`, `.process-step p`, `.metric small` | 11px | Kichik |
| `.section-title` | 24px | Bo'lim sarlavhasi uchun kichik |
| `.hero h1` | 47px | ✅ Normal |

**Typography scale buzilgan.** Hozirgi ketma-ketlik: 47 → 24 → 12 → 11 → 10 → 9.
47px dan 24px ga, keyin to'ppa-to'g'ri 12px ga tushib ketadi. **O'rta pog'onalar (20, 18, 16, 14) umuman yo'q.** Shuning uchun sahifada faqat 2 xil o'lcham ko'rinadi: "juda katta" va "juda kichik". Ierarxiya yo'q → ko'z nimaga qarashni bilmaydi → charchaydi.

### 2.3 Kartochkalar juda tor

| Element | Hozir (1440px) | Bo'lishi kerak |
|---|---|---|
| Xizmat kartochkasi kengligi | **143px** (8 ustun!) | ~282px (4 ustun) |
| Portfolio kartochkasi | 234×138px | ~384×320px |
| Kartochka ichki padding | **11px** | 20–24px |
| Grid gap (xizmatlar) | **8px** | 24px |
| Grid gap (portfolio) | **7px** | 24px |
| Portfolio rasm balandligi | 92px | 220px |

1200px konteynerga **8 ta kartochka** joylangan. Har biri 143px — bu vizitka o'lchami. Ichida 12px sarlavha va 10px matn bor. Bu o'qish uchun emas, "sig'dirish" uchun qilingan.

Portfolio — bu sizning eng kuchli sotuv quroli. Hozir rasm joyi atigi 92px balandlikda. Ishni ko'rsatish uchun kamida 220px kerak.

### 2.4 Bosish maydonlari (touch targets) kichik

| Element | Hozir | Minimum |
|---|---|---|
| Footer havolalari | **16px balandlik** | 24px (WCAG 2.2 AA) / 44px (ideal) |
| Ijtimoiy tarmoq ikonlari | 29×29px | 44×44px |
| `.nav a` | faqat matn balandligi | 44px hit-area |

Telefonda footer havolalarini barmoq bilan bosish deyarli imkonsiz.

### 2.5 Mobil versiya

- Sahifa: **4298px = 5.29 ekran** (375px kenglikda)
- `.hero{min-height:650px}` — qattiq belgilangan, kontentga bog'liq emas
- Xizmatlar mobil'da horizontal scroll'ga o'tadi (`min-width:155px`) — 155px kartochkada 10px matn o'qilmaydi
- ✅ Horizontal overflow yo'q — bu yaxshi

---

## 3. Asosiy sabab

Bitta jumlada: **CSS'da dizayn tokenlari yo'q.**

`:root` da faqat 6 ta rang o'zgaruvchisi bor. Interval, shrift o'lchami, radius, konteyner — hammasi har joyda qo'lda yozilgan. Shuning uchun:

- Bir xil ma'nodagi joylarda har xil qiymat (card padding 11px, benefit padding 16px 10px, cta padding 23px 26px)
- Biror joyni tuzatsangiz, boshqa joy bilan mos kelmay qoladi
- "Nafas oladigan" dizayn qilish uchun 40 ta joyni qo'lda o'zgartirish kerak

Shuning uchun reja **avval tizim qurish**, keyin uni qo'llashdan iborat.

---

## 4. Yechim: dizayn tokenlari

`app/globals.css` ichida `:root` ga qo'shiladi:

```css
:root{
  /* mavjud ranglar o'zgarmaydi — ular yaxshi */
  --bg:#020303; --surface:#0d0f10; --line:#292b2d;
  --lime:#dfff00; --text:#f4f5f5; --muted:#a6a8aa;

  /* INTERVAL — 8px asosli shkala */
  --s1:4px;  --s2:8px;   --s3:12px;  --s4:16px;  --s5:24px;
  --s6:32px; --s7:48px;  --s8:64px;  --s9:96px;  --s10:128px;

  /* Bo'lim ritmi — ekranga moslashuvchan */
  --section-y: clamp(56px, 7vw, 96px);

  /* TYPOGRAPHY — to'liq shkala */
  --fs-display: clamp(40px, 5.5vw, 72px);
  --fs-h2:      clamp(28px, 3.2vw, 40px);
  --fs-h3:      20px;
  --fs-lg:      18px;
  --fs-body:    16px;
  --fs-sm:      14px;
  --fs-label:   12px;   /* FAQAT yorliq/eyebrow uchun. Body matn uchun emas */

  --lh-tight: 1.1;
  --lh-head:  1.25;
  --lh-body:  1.6;

  --radius: 10px;
  --measure: 65ch;      /* o'qish uchun maksimal qator uzunligi */
}
```

**Qoida:** bundan keyin CSS'da yalang'och `px` yozilmaydi. Faqat token ishlatiladi. 12px dan kichik shrift — taqiqlanadi.

---

## 5. Bosqichma-bosqich reja

### 0-bosqich — Kodni tayyorlash (majburiy, ~20 daqiqa)

Hozir `globals.css` ning **butun stylesheet'i 3-qatorda**, bitta uzun qatorda. `page.tsx` ham — butun sahifa 14-qatorda, ~8000 belgi.

Bu holatda hech qanday tuzatish qilib bo'lmaydi: har bir o'zgarish butun faylni "tegilgan" qilib ko'rsatadi, xatolikni topib bo'lmaydi, git diff o'qilmaydi.

**Ish:**
- `globals.css` ni normal formatlash (har bir selektor alohida blok, mantiqiy bo'limlarga ajratish)
- `page.tsx` ni komponentlarga bo'lish: `components/Header.tsx`, `Hero.tsx`, `Metrics.tsx`, `Services.tsx`, `Portfolio.tsx`, `Process.tsx`, `Benefits.tsx`, `CTA.tsx`, `Footer.tsx`, `Modal.tsx`
- Ma'lumot massivlarini (`services`, `portfolio`, `metrics`...) `lib/content.ts` ga ko'chirish

Bu bosqichsiz qolgan hammasi og'riqli bo'ladi.

### 1-bosqich — Tokenlarni kiritish

4-bo'limdagi `:root` blokini qo'shish. Hali hech narsa o'zgarmaydi — poydevor qo'yiladi.

### 2-bosqich — Vertikal ritm (**eng katta ta'sir shu yerda**)

```css
.section{ padding: var(--section-y) 0; }        /* 34px 0 0 → yuqori va past */
.section-head{ margin-bottom: var(--s6); }      /* 15px → 32px */
.grid{ gap: var(--s5); }                        /* 8px → 24px */
.portfolio{ gap: var(--s5); }                   /* 7px → 24px */
.cta{ margin: var(--section-y) auto; padding: var(--s7) var(--s6); }
.footer{ margin-top: var(--section-y); padding: var(--s8) 0 var(--s7); }
```

Faqat shu 6 qator ~90% muammoni hal qiladi. Agar vaqt kam bo'lsa — shuni qiling.

### 3-bosqich — Typography

```css
body{ font-size: var(--fs-body); line-height: var(--lh-body); }
.hero h1{ font-size: var(--fs-display); line-height: var(--lh-tight); }
.hero p{ font-size: var(--fs-lg); max-width: var(--measure); }
.section-title{ font-size: var(--fs-h2); line-height: var(--lh-head); }

.card h3{ font-size: var(--fs-h3); }            /* 12px → 20px */
.card p{ font-size: var(--fs-sm); line-height: var(--lh-body); }   /* 10px → 14px */
.portfolio-body h3{ font-size: var(--fs-lg); }  /* 11px → 18px */
.portfolio-body p{ font-size: var(--fs-sm); }   /* 9px  → 14px */
.process-step strong{ font-size: var(--fs-h3); }
.process-step p{ font-size: var(--fs-sm); line-height: var(--lh-body); }
.benefit{ font-size: var(--fs-body); }          /* 11px → 16px */
.metric strong{ font-size: 32px; }
.metric small{ font-size: var(--fs-sm); }
.footer a, .footer p{ font-size: var(--fs-sm); }  /* 10px → 14px */
.cta h2{ font-size: var(--fs-h2); }
.cta p{ font-size: var(--fs-body); }
```

### 4-bosqich — Grid va kartochkalar

```css
/* 8 ustun → 4 ustun (2 qator × 4) */
.services{ grid-template-columns: repeat(4, 1fr); }

/* 5 ustun → 3 ustun */
.portfolio{ grid-template-columns: repeat(3, 1fr); }

.benefits{ grid-template-columns: repeat(3, 1fr); }   /* 6 → 3 */
.process{ gap: var(--s6); }

.card-body{ padding: var(--s5); }              /* 11px → 24px */
.card h3{ margin: 0 0 var(--s2); }
.service-media{ height: 180px; }               /* 116px → 180px */
.portfolio-media{ height: 220px; }             /* 92px  → 220px */
.portfolio-body{ padding: var(--s4) var(--s5); }
.benefit{ padding: var(--s5) var(--s4); gap: var(--s3); }
.metric{ padding: var(--s5) var(--s6); }
```

**Kontent qarori:** Portfolio hozir 10 ta. 3 ustunda 10 ta = 4 qator (oxirgisi yarim bo'sh). Landing uchun **6 ta ko'rsatish + "Barcha portfolio" tugmasi** — toza va samaraliroq. Xizmatlar 8 ta = 4×2, bu joyiga tushadi.

### 5-bosqich — Bosish maydonlari

```css
.footer a{ padding: var(--s2) 0; }                    /* 16px → ~38px balandlik */
.socials a{ width:44px; height:44px; }                /* 29px → 44px */
.nav a{ padding: var(--s3) 0; }                       /* 44px hit-area */
.btn{ min-height:48px; padding: 0 var(--s5); font-size: var(--fs-sm); }
```

### 6-bosqich — Mobil

```css
@media(max-width:767px){
  .hero{ min-height:auto; padding: var(--s7) 0 var(--s8); }  /* 650px qattiq qiymat olib tashlanadi */
  .services{ grid-template-columns: repeat(2, 1fr); }        /* horizontal scroll o'rniga */
  .portfolio{ grid-template-columns: 1fr; }
  .benefits{ grid-template-columns: repeat(2, 1fr); }
  .footer-grid{ gap: var(--s7); }
}
```

Mobil'da xizmatlarni horizontal scroll'dan 2 ustunli grid'ga o'tkazish tavsiya etiladi — 155px kartochkada 14px matn ham siqilib qoladi, va scroll'da foydalanuvchi 8 ta xizmatning borligini ko'rmaydi.

---

## 6. Kutilayotgan natija

| Ko'rsatkich | Hozir | Rejadan keyin |
|---|---|---|
| Desktop sahifa balandligi | 2198px (2.4 ekran) | ~4400px (~4.9 ekran) |
| Bo'limlar orasi | 0px | 96px |
| Eng kichik shrift | 9px | 14px (yorliqlar 12px) |
| Xizmat kartochkasi | 143px | ~282px |
| Kartochka padding | 11px | 24px |
| Footer havola balandligi | 16px | ~38px |

Sahifa uzayadi — **bu yaxshi**. Landing sahifada scroll qilish arzon, ko'zni charchatish qimmat.

---

## 7. Tekshirish (har bosqichdan keyin)

Dev serverda konsolda ishga tushiring:

```bash
npm run dev
```

Brauzer konsolida:

```js
// bo'limlar orasidagi masofa
['.hero','.metrics','#xizmatlar','#portfolio','#jarayon','#afzalliklar','.cta','.footer']
  .reduce((a,s,i,arr)=>{ if(i<arr.length-1){
    const x=document.querySelector(s).getBoundingClientRect(),
          y=document.querySelector(arr[i+1]).getBoundingClientRect();
    a.push(s+' → '+arr[i+1]+': '+Math.round(y.top-x.bottom)+'px');} return a;},[])

// 12px dan kichik shriftlar qolganini topish
[...document.querySelectorAll('*')]
  .filter(e=>e.children.length===0 && e.innerText?.trim())
  .map(e=>({t:e.innerText.slice(0,25), fs:parseFloat(getComputedStyle(e).fontSize)}))
  .filter(x=>x.fs<12)
```

Ikkinchi so'rov **bo'sh massiv** qaytarishi kerak.

Shuningdek 375px, 768px, 1024px, 1440px kengliklarda ko'z bilan tekshiring.

---

## 8. Prioritet

Vaqt cheklangan bo'lsa, shu tartibda:

1. **2-bosqich (vertikal ritm)** — 6 qator CSS, muammoning ~90%
2. **3-bosqich (typography)** — 9px/10px matnlarni yo'qotish
3. **4-bosqich (grid)** — 8 ustunni 4 ga tushirish
4. 5-bosqich (touch targets)
5. 0-bosqich (refactor) — uzoq muddatda majburiy
6. 6-bosqich (mobil sozlash)

> **Eslatma:** 0-bosqich (kodni formatlash/bo'lish) ro'yxatda pastda, lekin amalda uni **birinchi** qilish tezroq bo'ladi — hozirgi bir qatorli CSS/TSX'da 2–4 bosqichlarni bajarish ancha qiyin va xatoga moyil.
