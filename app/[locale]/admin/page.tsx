import React from "react";
import { getDynamicPortfolioAssets } from "@/components/portfolio-images";
import AdminDashboardClient, { type UploadedAsset } from "@/components/admin-dashboard-client";

// Ensure page is dynamic (always queries fresh database items)
export const dynamic = "force-dynamic";

export default async function AdminPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;

  let initialUploads: UploadedAsset[] = [];

  try {
    const allAssets = await getDynamicPortfolioAssets();

    initialUploads = allAssets.map((item, idx) => {
      const filename = item.src.split("/").pop() || item.source.split("/").pop() || "";
      // Supabase items have source starting with http
      const isSupabase = item.source.startsWith("http");
      return {
        id: item.id || `asset-${idx}-${item.category}`,
        source: isSupabase ? item.source : item.src,
        category: item.category,
        filename,
        webpSrc: item.src,
        title: item.alt.split(" — ").pop() || filename,
        isStatic: !isSupabase,
      };
    });
  } catch (error) {
    console.error("Failed to load portfolio assets for admin page:", error);
  }

  return (
    <AdminDashboardClient initialUploads={initialUploads} locale={locale} />
  );
}
