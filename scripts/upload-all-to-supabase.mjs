import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

// 1. Load env variables
let envVars = {};
try {
  const envPath = path.join(process.cwd(), ".env.local");
  if (fs.existsSync(envPath)) {
    const envFile = fs.readFileSync(envPath, "utf8");
    envFile.split("\n").forEach((line) => {
      const parts = line.split("=");
      if (parts.length >= 2 && !line.trim().startsWith("#")) {
        envVars[parts[0].trim()] = parts.slice(1).join("=").trim();
      }
    });
  }
} catch (err) {
  console.warn("Warning reading .env.local:", err.message);
}

const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "https://xzuychvpjtfdmhzwpktn.supabase.co";
const serviceKey = envVars.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!serviceKey) {
  console.error("❌ SUPABASE_SERVICE_ROLE_KEY is missing in .env.local!");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey, {
  auth: { persistSession: false },
});

// Services data map
const servicesList = [
  { slug: "led-harflar", title_uz: "LED Harflar", title_ru: "Объемные буквы", title_en: "LED Letters", description_uz: "Har qanday turdagi yoritiladigan va hajm berilgan sifatli harflar ishlab chiqarish", description_ru: "Светящиеся буквы любого типа", description_en: "Illuminated letters of any type", from_price: "250 000 so'm/m", category: "LED", file: "led-harflar.webp" },
  { slug: "lightbox", title_uz: "Lightbox", title_ru: "Лайтбокс", title_en: "Lightbox", description_uz: "Yoritiladigan zamonaviy qutilar, panellar va fasad konstruksiyalari", description_ru: "Световые короба и панели", description_en: "Illuminated boxes and panels", from_price: "450 000 so'm/m²", category: "Lightbox", file: "lightbox.webp" },
  { slug: "banner", title_uz: "Banner", title_ru: "Баннер", title_en: "Banner", description_uz: "Tashqi va ichki yuqori aniqlikdagi bannerlar va vinil brending", description_ru: "Изготовление наружных и внутренних баннеров", description_en: "Indoor and outdoor banner production", from_price: "45 000 so'm/m²", category: "Banner", file: "banner.webp" },
  { slug: "roll-up", title_uz: "Roll Up", title_ru: "Ролл-ап", title_en: "Roll Up", description_uz: "Rolap stendlar, ko'rgazma stendlari va yig'iladigan konstruksiyalar", description_ru: "Ролл-ап стенды и конструкции", description_en: "Roll-up stands and structures", from_price: "350 000 so'm", category: "Stend", file: "roll-up.webp" },
  { slug: "stend", title_uz: "Stend", title_ru: "Стенд", title_en: "Stand", description_uz: "Ko‘rgazma va savdo majmualari uchun maxsus tayyorlanadigan stendlar", description_ru: "Выставочные и торговые стенды", description_en: "Exhibition and retail stands", from_price: "500 000 so'm", category: "Stend", file: "stend.webp" },
  { slug: "avto-reklama", title_uz: "Avto reklama", title_ru: "Реклама на авто", title_en: "Car Branding", description_uz: "Avtomobillar va yuk mashinalariga maxsus plyonka va brend yopishtirish", description_ru: "Брендирование и оклейка автомобилей рекламой", description_en: "Vehicle branding and advertising wraps", from_price: "150 000 so'm", category: "Avto", file: "avto-reklama.webp" },
  { slug: "statuetka", title_uz: "Statuetka", title_ru: "Статуэтка", title_en: "Awards", description_uz: "Akril, metal, yog'och va boshqa esdalik mukofot sovg‘alari", description_ru: "Акриловые, металлические и другие памятные сувениры", description_en: "Acrylic, metal and other keepsake awards", from_price: "80 000 so'm", category: "Sovg‘a", file: "statuetka.webp" },
  { slug: "uv-print", title_uz: "UV Print", title_ru: "УФ печать", title_en: "UV Print", description_uz: "Turli materiallarga (shisha, plastik, metal) yuqori chidamli UV bosma xizmati", description_ru: "УФ печать на различных материалах", description_en: "UV printing on a variety of materials", from_price: "65 000 so'm/m²", category: "Print", file: "uv-print.webp" },
];

const portfolioList = [
  { slug: "p1", title_uz: "Hajmli Harflar va LED Fasad", title_ru: "Объемные буквы и LED фасад", title_en: "Volumetric Letters & LED Facade", service_uz: "Tashqi reklama", service_ru: "Наружная реклама", service_en: "Outdoor Advertising", category: "Tashqi reklama", url: "https://togogrouppro.uz/storage/portfolio-images/photo_2024-08-20_10-26-48%20(2).jpg" },
  { slug: "p2", title_uz: "Artel Showroom & Brending", title_ru: "Artel Шоурум и брендинг", title_en: "Artel Showroom & Branding", service_uz: "LED Harf", service_ru: "Объемные буквы", service_en: "LED Letters", category: "LED Harf", url: "https://togogrouppro.uz/storage/portfolio-images/photo_2024-04-21_23-12-13.jpg" },
  { slug: "p3", title_uz: "Litto Hotel Yoritgichlari", title_ru: "Освещение Litto Hotel", title_en: "Litto Hotel Signage", service_uz: "LED Logo", service_ru: "LED Логотип", service_en: "LED Logo", category: "LED Logo", url: "https://togogrouppro.uz/storage/portfolio-images/photo_2024-08-20_10-26-48.jpg" },
  { slug: "p4", title_uz: "Lightme Office Lightbox", title_ru: "Lightme Офис Лайтбокс", title_en: "Lightme Office Lightbox", service_uz: "Lightbox", service_ru: "Лайтбокс", service_en: "Lightbox", category: "Lightbox", url: "https://togogrouppro.uz/storage/portfolio-images/photo_2024-04-21_23-12-16.jpg" },
  { slug: "p5", title_uz: "Mövenpick Fasad Reklamasi", title_ru: "Фасадная реклама Mövenpick", title_en: "Mövenpick Facade Advertising", service_uz: "Tashqi reklama", service_ru: "Наружная реклама", service_en: "Outdoor Advertising", category: "Tashqi reklama", url: "https://togogrouppro.uz/storage/portfolio-images/photo_2024-03-21_15-14-53.jpg" },
  { slug: "p6", title_uz: "Ideal Furniture Stendi", title_ru: "Стенд Ideal Furniture", title_en: "Ideal Furniture Stand", service_uz: "Stend", service_ru: "Стенд", service_en: "Stand", category: "Stend", url: "https://togogrouppro.uz/storage/portfolio-images/photo_2024-06-08_23-17-29.jpg" },
  { slug: "p7", title_uz: "Nest One Fasad Brending", title_ru: "Фасадный брендинг Nest One", title_en: "Nest One Facade Branding", service_uz: "Tashqi reklama", service_ru: "Наружная реклама", service_en: "Outdoor Advertising", category: "Tashqi reklama", url: "https://togogrouppro.uz/storage/portfolio-images/photo_2023-07-10_21-04-45.jpg" },
  { slug: "p8", title_uz: "UzAuto Motors Stendi", title_ru: "Стенд UzAuto Motors", title_en: "UzAuto Motors Stand", service_uz: "Stend", service_ru: "Стенд", service_en: "Stand", category: "Stend", url: "https://togogrouppro.uz/storage/portfolio-images/photo_2023-07-02_11-45-24.jpg" },
  { slug: "p9", title_uz: "Korzinka Avto Reklama", title_ru: "Реклама на авто Korzinka", title_en: "Korzinka Car Branding", service_uz: "Avto reklama", service_ru: "Реклама на авто", service_en: "Car Branding", category: "Avto reklama", url: "https://togogrouppro.uz/storage/portfolio-images/photo_2023-07-10_21-04-47.jpg" },
  { slug: "p10", title_uz: "N-Clinic Reklama", title_ru: "Реклама N-Clinic", title_en: "N-Clinic Advertising", service_uz: "Tashqi reklama", service_ru: "Наружная реклама", service_en: "Outdoor Advertising", category: "Tashqi reklama", url: "https://togogrouppro.uz/storage/portfolio-images/photo_2024-06-10_11-06-45.jpg" },
  { slug: "p11", title_uz: "Tashqi Banner va Stendlar", title_ru: "Наружные баннеры и стенды", title_en: "Outdoor Banners & Stands", service_uz: "Stend", service_ru: "Стенд", service_en: "Stand", category: "Stend", url: "https://togogrouppro.uz/storage/portfolio-images/photo_2023-08-06_16-13-38.jpg" },
  { slug: "p12", title_uz: "Savdo Markazi Brending", title_ru: "Брендинг торгового центра", title_en: "Shopping Mall Branding", service_uz: "Lightbox", service_ru: "Лайтбокс", service_en: "Lightbox", category: "Lightbox", url: "https://togogrouppro.uz/storage/portfolio-images/photo_2024-08-26_10-36-57.jpg" },
  { slug: "p13", title_uz: "Akril va LED Harflar", title_ru: "Акриловые и LED буквы", title_en: "Acrylic & LED Letters", service_uz: "LED Harf", service_ru: "Объемные буквы", service_en: "LED Letters", category: "LED Harf", url: "https://togogrouppro.uz/storage/portfolio-images/photo_2023-10-04_22-34-29.jpg" },
  { slug: "p14", title_uz: "Sanoat Korxonasi Fasad", title_ru: "Фасад промышленного предприятия", title_en: "Industrial Facility Facade", service_uz: "Tashqi reklama", service_ru: "Наружная реклама", service_en: "Outdoor Advertising", category: "Tashqi reklama", url: "https://togogrouppro.uz/storage/portfolio-images/photo_2023-10-04_22-34-33.jpg" },
  { slug: "p15", title_uz: "Kran va Baland Bino Reklamasi", title_ru: "Реклама на кране и высотном здании", title_en: "Crane & High-Rise Advertising", service_uz: "Tashqi reklama", service_ru: "Наружная реклама", service_en: "Outdoor Advertising", category: "Tashqi reklama", url: "https://togogrouppro.uz/storage/portfolio-images/photo_2023-10-04_22-34-31.jpg" },
];

async function main() {
  console.log("🚀 Uploading all local service & portfolio images to Supabase Storage...");

  // 1. Upload service images to 'service-images' bucket
  const servicesDir = path.join(process.cwd(), "public", "img", "services");
  const uploadedServicesMap = {};

  for (const item of servicesList) {
    const filePath = path.join(servicesDir, item.file);
    if (fs.existsSync(filePath)) {
      const fileBuffer = fs.readFileSync(filePath);
      const filename = `svc-${item.slug}-${Date.now()}.webp`;

      const { data, error } = await supabase.storage
        .from("service-images")
        .upload(filename, fileBuffer, {
          contentType: "image/webp",
          upsert: true,
        });

      if (!error && data) {
        const { data: publicUrlData } = supabase.storage
          .from("service-images")
          .getPublicUrl(filename);
        
        uploadedServicesMap[item.slug] = publicUrlData.publicUrl;
        console.log(`✅ Uploaded service image '${item.file}' -> ${publicUrlData.publicUrl}`);
      } else {
        console.error(`❌ Upload failed for service '${item.file}':`, error?.message);
      }
    }
  }

  // 2. Fetch and upload portfolio images to 'portfolio-images' bucket
  const uploadedPortfolioMap = {};
  for (const item of portfolioList) {
    try {
      const res = await fetch(item.url);
      if (res.ok) {
        const arrayBuffer = await res.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const filename = `portfolio-${item.slug}-${Date.now()}.jpg`;

        const { data, error } = await supabase.storage
          .from("portfolio-images")
          .upload(filename, buffer, {
            contentType: "image/jpeg",
            upsert: true,
          });

        if (!error && data) {
          const { data: publicUrlData } = supabase.storage
            .from("portfolio-images")
            .getPublicUrl(filename);

          uploadedPortfolioMap[item.slug] = publicUrlData.publicUrl;
          console.log(`✅ Uploaded portfolio image '${item.slug}' -> ${publicUrlData.publicUrl}`);
        } else {
          console.error(`❌ Upload failed for portfolio '${item.slug}':`, error?.message);
        }
      }
    } catch (err) {
      console.warn(`Portfolio image download warning for '${item.slug}':`, err.message);
    }
  }

  console.log("\n🎉 ALL IMAGES MIGRATED TO SUPABASE STORAGE!");
  console.log("Services Uploaded:", Object.keys(uploadedServicesMap).length);
  console.log("Portfolio Uploaded:", Object.keys(uploadedPortfolioMap).length);
}

main();
