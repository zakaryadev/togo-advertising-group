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
  console.log("🔍 Checking Supabase Storage Buckets for URL:", supabaseUrl);

  const { data: buckets, error: bucketsErr } = await supabase.storage.listBuckets();
  if (bucketsErr) {
    console.error("❌ Error listing buckets:", bucketsErr);
    return;
  }

  console.log("📦 Found Buckets in Supabase:", buckets.map((b) => ({ id: b.id, name: b.name, public: b.public })));

  for (const b of buckets) {
    const { data: files, error: filesErr } = await supabase.storage.from(b.id).list();
    if (filesErr) {
      console.error(`❌ Error listing files in bucket '${b.id}':`, filesErr);
    } else {
      console.log(`📁 Files inside bucket '${b.id}' (${files?.length || 0} files):`);
      files?.forEach((f) => console.log(`   - ${f.name} (${f.metadata?.size || f.size} bytes)`));
    }
  }
}

main();
