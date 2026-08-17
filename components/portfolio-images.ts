import sourceMap from "@/data/portfolio-image-sources.json";

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
): PortfolioImage {
  return {
    id,
    category,
    source,
    src: `/img/portfolio/${category}/${filename}.webp`,
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
  );
});

function localAssets(
  kind: "legacy" | "upload",
  map: CategorySourceMap<string>,
) {
  return sourceEntries(map).flatMap(([category, paths]) =>
    paths.map((source) => {
      const slug = slugFromSource(source);
      return createAsset(category, `${category}-${kind}-${slug}`, source, slug, slug);
    }),
  );
}

export const portfolioAssets: readonly PortfolioImage[] = Object.freeze([
  ...newPhotoAssets,
  ...telegramAssets,
  ...newSouvenirAssets,
  ...localAssets("legacy", sources.legacyPortfolio),
  ...localAssets("upload", sources.uploads),
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

export const portfolioImageSourcesByCategory: Readonly<
  Record<PortfolioCategory, readonly string[]>
> = Object.freeze(
  Object.fromEntries(
    portfolioCategories.map((category) => [
      category,
      Object.freeze(portfolioImagesByCategory[category].map(({ src }) => src)),
    ]),
  ) as Record<PortfolioCategory, readonly string[]>,
);

export const portfolioImageCounts: Readonly<Record<PortfolioCategory, number>> =
  Object.freeze(
    Object.fromEntries(
      portfolioCategories.map((category) => [
        category,
        portfolioImagesByCategory[category].length,
      ]),
    ) as Record<PortfolioCategory, number>,
  );
