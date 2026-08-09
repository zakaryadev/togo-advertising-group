import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

// Read .env.local file directly
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

async function main() {
  console.log("🚀 Connecting to Supabase project:", supabaseUrl);

  // 1. Ensure storage buckets exist
  const buckets = ["service-images", "portfolio-images"];
  for (const bucket of buckets) {
    try {
      const { data, error } = await supabase.storage.getBucket(bucket);
      if (error || !data) {
        console.log(`Creating public storage bucket '${bucket}'...`);
        const { error: createErr } = await supabase.storage.createBucket(bucket, {
          public: true,
          allowedMimeTypes: ["image/*"],
        });
        if (createErr) console.warn(`Bucket '${bucket}' response:`, createErr.message);
        else console.log(`✅ Bucket '${bucket}' created successfully!`);
      } else {
        console.log(`✅ Bucket '${bucket}' already exists and is ready.`);
      }
    } catch (err) {
      console.error(`Bucket check error for '${bucket}':`, err);
    }
  }

  // 2. Test settings table query
  try {
    const { data: settingsData, error: settingsErr } = await supabase
      .from("settings")
      .select("*")
      .limit(1);

    if (settingsErr) {
      console.log("ℹ️ 'settings' table status:", settingsErr.message);
    } else {
      console.log("✅ 'settings' table active in Supabase:", settingsData?.length || 0, "rows");
    }
  } catch (err) {
    console.error("Settings query error:", err);
  }

  // 3. Test services table query
  try {
    const { data: servicesData, error: servicesErr } = await supabase
      .from("services")
      .select("*")
      .limit(1);

    if (servicesErr) {
      console.log("ℹ️ 'services' table status:", servicesErr.message);
    } else {
      console.log("✅ 'services' table active in Supabase:", servicesData?.length || 0, "rows");
    }
  } catch (err) {
    console.error("Services query error:", err);
  }

  console.log("🎉 Supabase connection & storage buckets initialization completed successfully!");
}

main();
