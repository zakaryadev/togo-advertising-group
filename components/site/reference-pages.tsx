"use client";

import Link from "next/link";
import { contact, type Locale } from "@/data/site";
import { DirectionIcon, EventIcon, ServiceIcon, contactIcons } from "@/components/site/reference-icon";
import LeadForm from "@/components/site/lead-form";

const back = (locale: Locale) => locale === "ru" ? "Главная" : locale === "en" ? "Home" : "Asosiy";
const backIcon = <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>;

const directionsData: Record<Locale, readonly [string, string][]> = {
  uz: [
    ["Obyomli harflar va yorug‘lik peshtoqlari", "Akril obyomli harflar, kontur yoritish, nuqtali diod, alyukabond bort, yorug‘lik qutilari. Elektr sxemasi va kafolat hujjati bilan topshiriladi."],
    ["Kran va balandlik reklamasi", "Minorali kranlarga banner va setka, qurilish to‘siqlari, fasad brandmaueri. Shamol yukiga hisob, alpinist brigadasi va ruxsat hujjatlari bizdan."],
    ["Katta formatli va UV bosma", "3.2 m gacha kenglik, 1440 dpi. Banner, setka, orakal, backlit, xolst va qattiq materiallarga to‘g‘ridan-to‘g‘ri UV bosma."],
    ["Poligrafiya va qadoqlash", "Vizitka, katalog, flayer, papka, bloknot, kalendar va qog‘oz paket. Ofset va raqamli bosma, laminatsiya, folga, konges."],
    ["Ko‘rgazma va tadbir ofarmleniyasi", "Stend, press-wall, roll-up, navigatsiya, brendlangan zona va suvenir. CAEx Expo Centre va MDH davlatlaridagi tadbirlar uchun kalit topshirish shartida."],
    ["Brending va navigatsiya", "Logotip, brendbuk, bino ichi navigatsiya tizimi, tablichka va stendlar, avtopark brendlash. Barcha maketlar manba fayllari bilan."],
  ],
  ru: [
    ["Объёмные буквы и световые вывески", "Акриловые объёмные буквы, контурная подсветка, точечные диоды, борт из алюкобонда, лайтбоксы. С электрической схемой и гарантией."],
    ["Реклама на кранах и высотный монтаж", "Баннеры и сетка на башенные краны, строительные заборы, фасадные брандмауэры. Расчёт ветровой нагрузки, бригада альпинистов и разрешения."],
    ["Широкоформатная и UV-печать", "Ширина до 3.2 м, 1440 dpi. Баннеры, сетка, оракал, бэклит, холст и прямая УФ-печать на твёрдых материалах."],
    ["Полиграфия и упаковка", "Визитки, каталоги, флаеры, папки, блокноты, календари и бумажные пакеты. Офсетная и цифровая печать, ламинация, фольга, конгрев."],
    ["Оформление выставок и мероприятий", "Стенды, пресс-воллы, ролл-апы, навигация, брендированные зоны и сувениры. Под ключ для мероприятий в CAEx Expo Centre и странах СНГ."],
    ["Брендинг и навигация", "Логотипы, брендбуки, системы внутренней навигации, таблички и стенды, брендирование автопарка. Все макеты с исходными файлами."],
  ],
  en: [
    ["3D letters and illuminated signage", "Acrylic 3D letters, contour lighting, point diodes, alucobond borders, lightboxes. Delivered with electrical wiring diagrams and warranty."],
    ["Crane and high-altitude advertising", "Banners and mesh on tower cranes, construction hoardings, facade brandwalls. Wind-load calculation, rope-access crew and permits included."],
    ["Large-format and UV printing", "Up to 3.2 m wide, 1440 dpi. Banners, mesh, vinyl, backlit, canvas and direct UV printing on rigid materials."],
    ["Print production and packaging", "Business cards, catalogues, flyers, folders, notebooks, calendars and paper bags. Offset and digital printing, lamination, foil, embossing."],
    ["Exhibition and event branding", "Stands, press walls, roll-ups, wayfinding, branded zones and souvenirs. Turnkey for events at CAEx Expo Centre and across the CIS."],
    ["Branding and wayfinding", "Logos, brand books, indoor wayfinding systems, plaques and stands, fleet branding. All layouts supplied with source files."],
  ],
};

const groupsData: Record<Locale, readonly [string, ...string[]][]> = {
  uz: [
    ["Tashqi reklama", "Tom va kranga reklama", "Obyomli harf", "Yorug‘lik qutisi", "LED ekran", "Neon reklama", "Yuguruvchi qator", "Kontrajur yoritish", "Fasad reklamasi (Alyukabond)", "Tom ustiga logotip", "Stella", "Shtender", "Navigatsiya ko‘rsatkichlari", "Ofis tablichkalari", "Ma’lumot stendlari", "Nomercha va beydjik"],
    ["Bosma va ishlov", "Baner bosma", "Orakal bosma", "Tumanka", "O‘ziyopishqoq plyonka", "UV ultrabinafsha bosma", "Ekosolvent bosma", "Plotter kesish", "Lazer kesish va gravyura", "Rover (CNC) xizmati", "Tonirovka", "Quyoshdan himoya plyonka", "Ofis oynasi bezagi"],
    ["Poligrafiya", "Flayer", "Buklet", "Bloknot bosma", "Katalog", "Vizitka", "Kalendar (devor / stol)", "Logotipli paket"],
    ["Ko‘rgazma konstruksiyalari", "Pauchok", "Roll Up", "Parus bayroq", "Press-wall", "Mobil stendlar", "Noodatiy stend va konstruksiya"],
    ["Suvenir va kiyim", "Ruchka bosma", "Bokal va krujka bosma", "Futbolka bosma", "Statuetka", "Logotipli fleshka", "Eko-sumka bosma bilan", "Logotipli soyabon", "Sovg‘a to‘plamlari", "Qurilish kaskasi bosma", "Ish formasi va logotip"],
    ["Transport brendlash", "Avtomobil brendlash", "Avtobuslarda reklama", "Maxsus texnikada reklama"],
  ],
  ru: [
    ["Наружная реклама", "Реклама на крышах и кранах", "Объёмные буквы", "Световой короб (лайтбокс)", "LED экраны", "Неоновая реклама", "Бегущая строка", "Контражурная подсветка", "Фасадная реклама (Алюкобонд)", "Логотип на крышу", "Стеллы", "Штендеры", "Навигационные указатели", "Офисные таблички", "Информационные стенды", "Номерки и бейджики"],
    ["Печать и обработка", "Печать баннеров", "Печать на оракале", "Матовая плёнка (туманка)", "Самоклеящаяся плёнка", "УФ-печать", "Экосольвентная печать", "Плоттерная резка", "Лазерная резка и гравировка", "Фрезерная резка (ЧПУ)", "Тонировка", "Солнцезащитная плёнка", "Оформление офисных стёкол"],
    ["Полиграфия", "Флаеры", "Буклеты", "Печать блокнотов", "Каталоги", "Визитки", "Календари (настенные / настольные)", "Пакеты с логотипом"],
    ["Выставочные конструкции", "X-баннер (Паучок)", "Roll Up", "Флаги-паруса", "Press-wall", "Мобильные стенды", "Нестандартные стенды и конструкции"],
    ["Сувениры и одежда", "Печать на ручках", "Печать на кружках и бокалах", "Печать на футболках", "Статуэтки и награды", "Флешки с логотипом", "Эко-сумки с печатью", "Зонты с логотипом", "Подарочные наборы", "Печать на строительных касках", "Рабочая форма с логотипом"],
    ["Брендирование транспорта", "Брендирование автомобилей", "Реклама на автобусах", "Реклама на спецтехнике"],
  ],
  en: [
    ["Outdoor advertising", "Rooftop and crane advertising", "3D letters", "Lightboxes", "LED screens", "Neon advertising", "LED running text", "Backlit / Halo lighting", "Facade advertising (Alucobond)", "Rooftop logos", "Pylons", "A-frame sidewalk signs", "Wayfinding signs", "Office plaques", "Information boards", "Door numbers & badges"],
    ["Printing & processing", "Banner printing", "Vinyl sticker printing", "Frosted glass film", "Self-adhesive film", "UV printing", "Eco-solvent printing", "Plotter cutting", "Laser cutting & engraving", "CNC router routing", "Tinting", "Solar control film", "Office glass branding"],
    ["Print production", "Flyers", "Booklets", "Notebook printing", "Catalogues", "Business cards", "Calendars (wall / desk)", "Branded bags"],
    ["Exhibition structures", "X-banners (Spider)", "Roll-up banners", "Sail flags", "Press walls", "Mobile stands", "Custom exhibition structures"],
    ["Merchandise & apparel", "Branded pens", "Mug printing", "T-shirt printing", "Trophies & plaques", "Branded flash drives", "Eco tote bags with print", "Branded umbrellas", "Gift sets", "Hard hat printing", "Work uniform & apparel"],
    ["Vehicle branding", "Car branding", "Bus advertising", "Special machinery advertising"],
  ],
};

const specialtiesData: Record<Locale, readonly [string, string, readonly string[]][]> = {
  uz: [
    ["Kran reklamasi", "Qurilish maydonidagi minorali kran — shaharning eng baland va eng arzon reklama maydoni. Strela va minoraga banner yoki shamol o‘tkazadigan setka o‘rnatamiz.", ["Shamol yukiga hisob va mahkamlash sxemasi", "Sertifikatlangan alpinist brigadasi, sug‘urta bilan", "Kechasi ko‘rinishi uchun yoritish varianti", "Mavsum oxirida demontaj va saqlash"]],
    ["Obyomli harflar", "Peshtoq — brendning eng uzoq ishlaydigan reklamasi. Yetti xil texnologiyada tayyorlaymiz: oddiy, konturli, setkali, akril bortli, alyukabond, nuqtali diod va diodsiz.", ["Narx harf balandligining 1 sm’i uchun — ochiq jadval", "LED va blok pitaniyega 12 oy kafolat", "Fasadga o‘lchov olishga o‘zimiz chiqamiz", "Hokimlik ruxsatini rasmiylashtirishda yordam"]],
    ["Qurilish kompaniyalari bilan ish", "Qurilish obyekti bir necha yil davom etadi va o‘nlab reklama elementini talab qiladi. Biz butun obyektni bitta shartnoma bilan yuritamiz.", ["To‘siq va panjaralarni brendlash, setkali fasad", "Savdo ofisi: navigatsiya, stend, maket zonasi", "Xavfsizlik belgilari va texnika xavfsizligi stendlari", "Bosqichma-bosqich to‘lov, oylik yopiluvchi hujjat"]],
  ],
  ru: [
    ["Реклама на кранах", "Башенный кран на стройплощадке — самая высокая и эффективная рекламная площадь в городе. Устанавливаем баннеры и ветропродуваемую сетку на стрелу и башню.", ["Расчёт ветровой нагрузки и схема крепления", "Сертифицированная бригада промышленных альпинистов со страховкой", "Подсветка для видимости в ночное время", "Демонтаж и бережное хранение по окончании сезона"]],
    ["Объёмные буквы", "Вывеска — самая долговечная реклама бренда. Изготавливаем в 7 технологиях: классические, с контурной подсветкой, сетчатые, с акриловым бортом, алюкобонд, с открытыми диодами и без подсветки.", ["Прозрачный прайс за 1 см высоты буквы", "Гарантия 12 месяцев на светодиоды и блоки питания", "Бесплатный выезд на объект для точного замера", "Помощь в согласовании и получении разрешений в хокимияте"]],
    ["Работа со строительными компаниями", "Строительный объект длится несколько лет и требует десятков рекламных носителей. Мы ведём весь объект по единому договору.", ["Брендирование заборов и ограждений, фасадная сетка", "Офис продаж: навигация, выставочные стенды, макетная зона", "Знаки безопасности и стенды по охране труда", "Поэтапная оплата и ежемесячное закрытие документов"]],
  ],
  en: [
    ["Crane advertising", "A tower crane at a construction site is the highest and most cost-effective advertising space in the city. We install banners or wind-permeable mesh on the jib and tower.", ["Wind-load engineering and secure fastening scheme", "Certified industrial climbing team with insurance", "Night illumination options for 24/7 visibility", "Dismantling and storage at the end of the campaign"]],
    ["3D letters", "Signage is a brand's longest-working advertising asset. We produce in 7 technologies: standard, contour-lit, mesh, acrylic sides, alucobond, open diodes, and non-illuminated.", ["Clear price per 1 cm letter height", "12-month warranty on LEDs and power supplies", "On-site measurements handled by our team", "Assistance with municipality permits and approvals"]],
    ["Work with construction companies", "A construction project lasts years and requires dozens of advertising elements. We manage the entire site under a single contract.", ["Fence and hoarding branding, facade mesh", "Sales office: wayfinding, stands, scale-model area", "Safety signage and occupational safety boards", "Milestone payments and monthly closing documentation"]],
  ],
};

function SpecialtyArt({ index }: { index: number }) {
  if (index === 0) return <div className="art"><svg viewBox="0 0 300 225" aria-hidden="true"><defs><linearGradient id="gAc" x1="0" x2="1"><stop stopColor="#f6bf17"/><stop offset="1" stopColor="#d99d00"/></linearGradient></defs><path d="M40 200h60M70 200V44M70 44h170l-26 30H70M70 44L36 74" className="st"/><path d="M118 74v18M150 74v26M186 74v14" className="st" opacity=".6"/><rect x="112" y="92" width="96" height="46" rx="2" className="ac"/><path d="M124 108h64M124 122h40" stroke="#1A1206" strokeWidth="5" strokeLinecap="round"/><path d="M214 74v22M206 96h20v26h-20zM52 200l18-40M88 200l-18-40M20 206h260" className="st" opacity=".5"/></svg></div>;
  if (index === 1) return <div className="art"><svg viewBox="0 0 300 225" aria-hidden="true"><defs><linearGradient id="gAc" x1="0" x2="1"><stop stopColor="#f6bf17"/><stop offset="1" stopColor="#d99d00"/></linearGradient></defs><path d="M52 176L88 52h26l36 124h-28l-8-28H88l-8 28zM96 122h18l-9-30z" className="st"/><rect x="176" y="64" width="88" height="106" rx="10" className="ac"/><path d="M196 100h48M196 124h32" stroke="#1A1206" strokeWidth="7" strokeLinecap="round"/><path d="M170 52l-8-12M220 44v-14M270 52l8-12M30 196h250" className="st" opacity=".5"/></svg></div>;
  return <div className="art"><svg viewBox="0 0 300 225" aria-hidden="true"><defs><linearGradient id="gAc" x1="0" x2="1"><stop stopColor="#f6bf17"/><stop offset="1" stopColor="#d99d00"/></linearGradient></defs><path d="M40 190V78l52-26v138M92 190V96l58 22v72M150 190V64l56-18v144" className="st"/><path d="M54 92v14M54 118v14M54 144v14M108 118v14M108 144v14M164 84v14M164 110v14M164 136v14" className="st" opacity=".55"/><rect x="30" y="160" width="248" height="30" rx="3" className="ac"/><path d="M44 172h84M44 182h50M158 172h60" stroke="#1A1206" strokeWidth="5" strokeLinecap="round"/></svg></div>;
}

export function ReferenceDirectionsPage({ locale }: { locale: Locale }) {
  const title = locale === "ru" ? "Что мы производим" : locale === "en" ? "What we produce" : "Nima ishlab chiqaramiz";
  const lead = locale === "ru" ? "За каждым заказом закреплён один менеджер. Производство не начинается, пока макет не утверждён." : locale === "en" ? "One manager is assigned to every order. Production does not begin until the artwork is approved." : "Har bir buyurtma bitta menejerga biriktiriladi. Maket tasdiqlanmaguncha ishlab chiqarish boshlanmaydi.";
  const directions = directionsData[locale];
  const groups = groupsData[locale];
  const specialties = specialtiesData[locale];
  let serviceIndex = 0;

  return <section className="wrap section page reference-page"><Link className="crumb" href={`/${locale}`}>{backIcon}{back(locale)}</Link><p className="kick">01 — {locale === "ru" ? "Направления" : locale === "en" ? "Directions" : "Yo‘nalishlar"}</p><h1>{title}</h1><p className="slead">{lead}</p><div className="cards direction-cards">{directions.map(([name, text], index) => <article className="c" key={name}><span className="n">0{index + 1}</span><div className="ico"><DirectionIcon index={index} /></div><h2>{name}</h2><p>{text}</p></article>)}</div><div className="extra"><h2>{locale === "ru" ? "Услуги наружной рекламы" : locale === "en" ? "Outdoor advertising services" : "Tashqi reklama xizmatlari"}</h2><p>{locale === "ru" ? "Более пятидесяти позиций — от вывески до сувенира. Всё на собственной базе, по одному договору и с одним менеджером." : locale === "en" ? "More than fifty items, from signage to merchandise. All produced in-house, under one contract with one manager." : "Ellikdan ortiq pozitsiya — peshtoqdan suvenirgacha. Barchasi o‘z bazamizda, bitta shartnoma va bitta menejer bilan."}</p><div className="svall">{groups.map(([name, ...items]) => <div className="svgrp" key={name}><h3>{name}</h3><div className="svgrid">{items.map((item) => { const index = serviceIndex++; return <div className="sv" key={item}><ServiceIcon index={index} /><span>{item}</span></div>; })}</div></div>)}</div></div><section className="specialties"><p className="kick">02 — {locale === "ru" ? "Наша специализация" : locale === "en" ? "Our specialty" : "Ixtisosimiz"}</p><h2>{locale === "ru" ? "Работы, за которые другие не берутся" : locale === "en" ? "Work others do not take on" : "Boshqalar olmaydigan ishlar"}</h2><p className="slead">{locale === "ru" ? "В трёх направлениях у нас есть редкий для рынка опыт. Именно за ним к нам обращаются." : locale === "en" ? "We have rare market experience in three areas. This is exactly why clients contact us." : "Uchta yo‘nalishda bozorda kam uchraydigan tajribamiz bor. Aynan shular uchun bizga murojaat qilishadi."}</p><div className="feat">{specialties.map(([name, description, points], index) => <article className="frow" key={name}><div><h3>{name}</h3><p>{description}</p><div className="ul">{points.map((point) => <div key={point}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12.5l5 5L20 6.5" /></svg><span>{point}</span></div>)}</div></div><SpecialtyArt index={index} /></article>)}</div></section><Link className="back" href={`/${locale}`}>{backIcon}{locale === "ru" ? "На главную" : locale === "en" ? "Back to home" : "Asosiy sahifaga qaytish"}</Link></section>;
}

const eventsData: Record<Locale, readonly [string, string][]> = {
  uz: [
    ["Stend loyihasi va yig‘ish", "3D vizualizatsiya, konstruksiya, bosma, yig‘ish va demontaj"],
    ["Press-wall va foto zona", "3×3 m dan katta o‘lchamgacha, sumka bilan"],
    ["Navigatsiya va POS", "Roll-up, parus bayroq, promostoyka, ko‘rsatkichlar"],
    ["Delegatsiya to‘plami", "Brendlangan bloknot, ruchka, beydjik, sovg‘a to‘plami"],
    ["Sahna va fon bezagi", "Prezidium, banner-fon, LED ekran ramkasi, sahna old bezagi"],
    ["Navigatsiya va ko‘rsatkichlar", "Zal sxemasi, yo‘nalish belgilari, registratsiya zonasi"],
    ["Brendlangan zona va foto nuqta", "Press-wall, selfi ramka, brend devor, ko‘chma mebel"],
    ["Delegatsiya va mehmon to‘plami", "Beydjik, papka, bloknot, ruchka, sovg‘a, tashqi propusk"],
  ],
  ru: [
    ["Проектирование и сборка стендов", "3D-визуализация, изготовление конструкции, печать, монтаж и демонтаж"],
    ["Пресс-волл и фотозона", "От стандартных до размеров более 3×3 м, в комплекте с чехлом"],
    ["Навигация и POS-материалы", "Roll-up, флаги-паруса, промостойки и указатели"],
    ["Наборы для делегаций", "Брендированные блокноты, ручки, бейджи и подарочные наборы"],
    ["Оформление сцены и задника", "Президиум, баннерный задник, обрамление LED-экранов, декор авансцены"],
    ["Навигация и указатели", "Схема зала, указатели направления, оформление зоны регистрации"],
    ["Брендированная зона и фототочка", "Пресс-волл, рамка для селфи, бренд-стена и мобильная мебель"],
    ["Наборы для гостей и делегаций", "Бейджи, папки, блокноты, ручки, сувениры и пропуска"],
  ],
  en: [
    ["Stand design and assembly", "3D visualization, structure fabrication, printing, assembly and dismantling"],
    ["Press wall and photo zone", "From standard to sizes over 3×3 m, with carrying bag"],
    ["Wayfinding and POS materials", "Roll-ups, sail flags, promo counters and directional signs"],
    ["Delegation gift sets", "Branded notebooks, pens, badges and souvenir gift sets"],
    ["Stage and backdrop decoration", "Presidium, banner backdrop, LED screen framing, stage front decor"],
    ["Wayfinding and signage", "Hall floor plan, direction signs, registration area design"],
    ["Branded area and photo spot", "Press wall, selfie frames, branded backdrop and mobile furniture"],
    ["Guest and delegate kits", "Badges, folders, notebooks, pens, souvenirs and visitor passes"],
  ],
};

export function ReferenceEventsPage({ locale }: { locale: Locale }) {
  const title = locale === "ru" ? "Полностью оформляем выставки и мероприятия" : locale === "en" ? "Complete exhibition and event production" : "Ko‘rgazma va tadbirlarni to‘liq bezaymiz";
  const lead = locale === "ru" ? "Выставки в CAEx Expo Centre и на других площадках, форумы и мероприятия в странах СНГ — от брифа до демонтажа. Одна команда, один договор, один ответственный." : locale === "en" ? "Exhibitions at CAEx Expo Centre and other venues, forums and events across the CIS — from brief to dismantling. One team, one contract, one point of contact." : "CAEx Expo Centre va boshqa maydonlardagi ko‘rgazmalar, MDH davlatlaridagi forum va tadbirlar — brif olishdan tadbir tugagach demontajgacha. Bitta jamoa, bitta shartnoma, bitta javobgar. Xalqaro delegatsiyalar uchun to‘liq ofarmleniya: stenddan sovg‘a to‘plamigacha.";
  const events = eventsData[locale];

  return <section className="wrap section page reference-page"><Link className="crumb" href={`/${locale}`}>{backIcon}{back(locale)}</Link><p className="kick">03 — {locale === "ru" ? "Мероприятия" : locale === "en" ? "Events" : "Tadbirlar"}</p><h1>{title}</h1><p className="slead">{lead}</p><div className="ev">{events.map(([name, description], index) => <article className="evc" key={name}><EventIcon index={index} /><h2>{name}</h2><p>{description}</p></article>)}</div><Link className="back" href={`/${locale}`}>{backIcon}{locale === "ru" ? "На главную" : locale === "en" ? "Back to home" : "Asosiy sahifaga qaytish"}</Link></section>;
}

export function ReferenceContactPage({ locale }: { locale: Locale }) {
  const title = locale === "ru" ? "Рассчитаем ваш проект" : locale === "en" ? "We will estimate your project" : "Loyihangizni hisoblaymiz";
  const lead = locale === "ru" ? "Если знаете размер и материал — рассчитаем за час. Если нет — напишите, мы сами подберём." : locale === "en" ? "If you know the size and material, we will calculate within an hour. If not, write to us and we will select them." : "O‘lcham va materialni bilsangiz — bir soatda hisoblab beramiz. Bilmasangiz ham yozing, o‘zimiz tanlab beramiz.";
  const addressText = locale === "ru" ? "г. Ташкент, Яшнабадский район, махалля Яшнабад, 4-й массив Авиасозлар, дом 9" : locale === "en" ? "Tashkent, Yashnabad district, Yashnabad MFY, 4th Aviasozlar block, house 9" : "Toshkent shahri, Yashnobod tumani, Yashnobod MFY, 4-Aviasozlar mavzesi, 9-uy";
  const rows = [[contact.phoneHref, contactIcons.phone, locale === "ru" ? "Отдел продаж" : locale === "en" ? "Sales department" : "Savdo bo‘limi", contact.phone], ["tel:+998990000602", contactIcons.phone, locale === "ru" ? "Бухгалтерия" : locale === "en" ? "Accounting" : "Buxgalteriya", "+998 99 000 06 02"], [contact.telegram, contactIcons.telegram, "Telegram", "@togo_group_pro"], [`mailto:${contact.email}`, contactIcons.mail, locale === "ru" ? "Почта" : locale === "en" ? "Email" : "Pochta", contact.email], ["https://maps.google.com/?q=Yashnobod+MFY+4-Aviasozlar+9+Tashkent", contactIcons.location, locale === "ru" ? "Офис" : locale === "en" ? "Office" : "Ofis", addressText]] as const;
  return <section className="wrap section page reference-page"><Link className="crumb" href={`/${locale}`}>{backIcon}{back(locale)}</Link><p className="kick">06 — {locale === "ru" ? "Контакты" : locale === "en" ? "Contact" : "Aloqa"}</p><h1>{title}</h1><p className="slead">{lead}</p><div className="contact"> <div className="clist">{rows.map(([href, icon, label, value]) => <a className="cl" href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} key={label}>{icon}<span><i>{label}</i><b>{value}</b></span></a>)}</div><div className="contact-form-column" style={{ display: "flex", flexDirection: "column", gap: "24px", flex: "1 1 500px", minWidth: 0 }}><LeadForm locale={locale} /><div className="big" style={{ marginTop: 0 }}><h3>{title}</h3><p>{locale === "ru" ? "Онлайн — по услугам и ценам" : locale === "en" ? "Online — services and prices" : "Onlayn — xizmat va narxlar bo‘yicha"}</p><a className="cta" href={contact.telegram} target="_blank" rel="noreferrer">{contactIcons.chat}<span>{locale === "ru" ? "Спросить AI-менеджера" : locale === "en" ? "Ask the AI manager" : "AI menejerdan so‘rash"}</span></a></div></div></div><div className="socials"><a href={contact.instagram} target="_blank" rel="noreferrer">Instagram</a><a href={contact.telegram} target="_blank" rel="noreferrer">Telegram</a></div><Link className="back" href={`/${locale}`}>{backIcon}{locale === "ru" ? "На главную" : locale === "en" ? "Back to home" : "Asosiy sahifaga qaytish"}</Link></section>;
}
