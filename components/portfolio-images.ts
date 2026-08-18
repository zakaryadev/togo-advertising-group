import sourceMap from "@/data/portfolio-image-sources.json";
import { inferPortfolioSubcategory, portfolioSubcategories, type PortfolioCategoryKey } from "@/data/portfolio-subcategories";
import type { Locale } from "@/data/site";
import { supabase } from "@/lib/supabase";

export const portfolioCategories = [
  "f1",
  "f2",
  "f3",
  "f4",
  "f5",
  "f6",
  "f7",
  "f8",
] as const;

export type PortfolioCategory = (typeof portfolioCategories)[number];

export type PortfolioImage = Readonly<{
  id: string;
  category: PortfolioCategory;
  src: string;
  alt: string;
  source: string;
  subcategory: string;
  subcategoryLabel: Record<Locale, string>;
}>;

type CategorySourceMap<T> = Partial<Record<PortfolioCategory, readonly T[]>>;

type PortfolioSourceMap = {
  newPhotoTimestamp: string;
  newPhotos: CategorySourceMap<number>;
  telegram: CategorySourceMap<number>;
  legacyPortfolio: CategorySourceMap<string>;
  uploads: CategorySourceMap<string>;
  newSouvenirs: readonly string[];
};

const sources = sourceMap as PortfolioSourceMap;

const categoryLabels: Record<PortfolioCategory, string> = {
  f1: "Banner va katta formatli bosma",
  f2: "Obyomli harflar",
  f3: "Kran reklamasi",
  f4: "Avto brending",
  f5: "Stendlar",
  f6: "Tablichka va navigatsiya",
  f7: "Poligrafiya",
  f8: "Suvenirlar",
};

function getSubcategory(
  category: PortfolioCategory,
  source: string,
  subcategoryKey?: string,
) {
  const key = subcategoryKey ?? inferPortfolioSubcategory(category as PortfolioCategoryKey, source);
  const item = portfolioSubcategories[category as PortfolioCategoryKey].find((entry) => entry.key === key);
  if (!item) throw new Error(`Unknown portfolio subcategory: ${category}/${key}`);
  return { key, label: item.label };
}

function sourceEntries<T>(
  map: CategorySourceMap<T>,
): Array<[PortfolioCategory, readonly T[]]> {
  return Object.entries(map) as Array<[PortfolioCategory, readonly T[]]>;
}

function slugFromSource(source: string) {
  return source
    .split("/")
    .at(-1)!
    .replace(/\.[^.]+$/, "")
    .replace(/_/g, "-")
    .replace(/[^a-zA-Z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

function createAsset(
  category: PortfolioCategory,
  id: string,
  source: string,
  filename: string,
  ordinal: string,
  subcategoryKey?: string,
): PortfolioImage {
  const subcategory = getSubcategory(category, source, subcategoryKey);
  return {
    id,
    category,
    source,
    src: `/img/portfolio/${category}/${filename}.webp`,
    subcategory: subcategory.key,
    subcategoryLabel: subcategory.label,
    alt: `TOGO GROUP — ${categoryLabels[category]} — ${ordinal}`,
  };
}

const newPhotoAssets = sourceEntries(sources.newPhotos).flatMap(
  ([category, photoNumbers]) =>
    photoNumbers.map((photoNumber) => {
      const padded = String(photoNumber).padStart(2, "0");
      return createAsset(
        category,
        `${category}-photo-${padded}`,
        `images-new/photo_${photoNumber}_${sources.newPhotoTimestamp}.jpg`,
        `photo-${padded}`,
        `foto ${padded}`,
      );
    }),
);

const telegramAssets = sourceEntries(sources.telegram).flatMap(
  ([category, imageNumbers]) =>
    imageNumbers.map((imageNumber) =>
      createAsset(
        category,
        `${category}-telegram-${imageNumber}`,
        `public/img/telegram/tgo_tg_${imageNumber}.webp`,
        `tgo-tg-${imageNumber}`,
        `portfolio ${imageNumber}`,
      ),
    ),
);

const newSouvenirAssets = sources.newSouvenirs.map((source, index) => {
  const padded = String(index + 1).padStart(2, "0");
  return createAsset(
    "f8",
    `f8-new-suvenir-${padded}`,
    source,
    `suvenir-${padded}`,
    `yangi suvenir ${padded}`,
    "bokal",
  );
});

function localAssets(
  kind: "legacy" | "upload",
  map: CategorySourceMap<string>,
) {
  return sourceEntries(map).flatMap(([category, paths]) =>
    paths.map((source) => {
      const slug = slugFromSource(source);
      return createAsset(
        category,
        `${category}-${kind}-${slug}`,
        source,
        slug,
        slug,
      );
    }),
  );
}

// Static fallback assets
export const portfolioAssets: readonly PortfolioImage[] = Object.freeze([
  ...newPhotoAssets,
  ...telegramAssets,
  ...localAssets("upload", sources.uploads),
  ...newSouvenirAssets,
  ...localAssets("legacy", sources.legacyPortfolio),
]);

const groupedAssets = portfolioCategories.reduce(
  (groups, category) => {
    groups[category] = [];
    return groups;
  },
  {} as Record<PortfolioCategory, PortfolioImage[]>,
);

for (const asset of portfolioAssets) {
  groupedAssets[asset.category].push(asset);
}

// Static fallback grouped assets
export const portfolioImagesByCategory: Readonly<
  Record<PortfolioCategory, readonly PortfolioImage[]>
> = Object.freeze(
  Object.fromEntries(
    portfolioCategories.map((category) => [
      category,
      Object.freeze(groupedAssets[category]),
    ]),
  ) as Record<PortfolioCategory, readonly PortfolioImage[]>,
);

// Map Supabase service types to category keys and subcategories
export function mapServiceTypeToCategoryAndSubcategory(serviceType: string): { category: PortfolioCategory; subcategory: string } {
  const typeLower = (serviceType || "").toLowerCase();

  // LED Harflar / Lightbox -> f2
  if (typeLower.includes("harf") || typeLower.includes("letter") || typeLower.includes("led")) {
    return { category: "f2", subcategory: "harf" };
  }
  if (typeLower.includes("lightbox") || typeLower.includes("quti") || typeLower.includes("box")) {
    return { category: "f2", subcategory: "quti" };
  }

  // Banner / UV Print -> f1
  if (typeLower.includes("banner") || typeLower.includes("baner")) {
    return { category: "f1", subcategory: "baner" };
  }
  if (typeLower.includes("uv") || typeLower.includes("print") || typeLower.includes("bosma")) {
    return { category: "f1", subcategory: "uv" };
  }

  // Avto reklama / Avto brending -> f4
  if (typeLower.includes("avto") || typeLower.includes("car") || typeLower.includes("transport")) {
    return { category: "f4", subcategory: "yengil" };
  }

  // Stend -> f5
  if (typeLower.includes("stend") || typeLower.includes("stand") || typeLower.includes("exhibition")) {
    return { category: "f5", subcategory: "vistavka" };
  }

  // Suvenirlar -> f8
  if (typeLower.includes("suvenir") || typeLower.includes("souvenir") || typeLower.includes("gift")) {
    return { category: "f8", subcategory: "toplam" };
  }

  // Tablichka va navigatsiya -> f6
  if (typeLower.includes("tablichka") || typeLower.includes("navigatsiya") || typeLower.includes("sign")) {
    return { category: "f6", subcategory: "ofis" };
  }

  // Poligrafiya -> f7
  if (typeLower.includes("poligrafiya") || typeLower.includes("flyer") || typeLower.includes("buklet")) {
    return { category: "f7", subcategory: "flayer" };
  }

  // Kran -> f3
  if (typeLower.includes("kran") || typeLower.includes("crane")) {
    return { category: "f3", subcategory: "kran" };
  }

  return { category: "f1", subcategory: "baner" };
}

function getSubcategoryLabel(category: PortfolioCategory, subcategoryKey: string): Record<Locale, string> {
  const list = portfolioSubcategories[category as PortfolioCategoryKey];
  const item = list.find((entry) => entry.key === subcategoryKey);
  return item ? item.label : { uz: subcategoryKey, ru: subcategoryKey, en: subcategoryKey };
}

// Dynamic portfolio retrieval from Supabase, merged with local fallback static items
export async function getDynamicPortfolioAssets(): Promise<readonly PortfolioImage[]> {
  try {
    const { data: dbItems, error } = await supabase
      .from("portfolio")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching portfolio from Supabase:", error);
      return portfolioAssets;
    }

    if (!dbItems || dbItems.length === 0) {
      return portfolioAssets;
    }

    // Map DB items to PortfolioImage interface
    const dbAssets: PortfolioImage[] = dbItems.map((item) => {
      const { category, subcategory } = mapServiceTypeToCategoryAndSubcategory(item.service_type);
      const subLabel = getSubcategoryLabel(category, subcategory);
      let src = item.image_url || "";
      if (src && !src.startsWith("http://") && !src.startsWith("https://") && !src.startsWith("/")) {
        src = `/${src}`;
      }
      return {
        id: `db-${item.id}`,
        category,
        src,
        alt: `TOGO GROUP — ${categoryLabels[category]} — ${item.title}`,
        source: item.image_url,
        subcategory,
        subcategoryLabel: subLabel,
      };
    });

    // Create a Set of db item srcs to deduplicate
    const dbSrcSet = new Set(dbAssets.map((a) => a.src));

    // Filter out static assets that were edited and saved to DB
    const filteredStaticAssets = portfolioAssets.filter(
      (staticAsset) => !dbSrcSet.has(staticAsset.src)
    );

    // Merge dynamic and filtered static assets (Supabase assets take priority and are placed at the beginning)
    return [...dbAssets, ...filteredStaticAssets];
  } catch (err) {
    console.error("Exception fetching dynamic portfolio:", err);
    return portfolioAssets;
  }
}

// Group dynamic portfolio images by category key
export async function getDynamicPortfolioImagesByCategory(): Promise<
  Readonly<Record<PortfolioCategory, readonly PortfolioImage[]>>
> {
  const assets = await getDynamicPortfolioAssets();
  
  const grouped = portfolioCategories.reduce(
    (groups, category) => {
      groups[category] = [];
      return groups;
    },
    {} as Record<PortfolioCategory, PortfolioImage[]>,
  );

  for (const asset of assets) {
    grouped[asset.category].push(asset);
  }

  return Object.freeze(
    Object.fromEntries(
      portfolioCategories.map((category) => [
        category,
        Object.freeze(grouped[category]),
      ]),
    ) as Record<PortfolioCategory, readonly PortfolioImage[]>,
  );
}
