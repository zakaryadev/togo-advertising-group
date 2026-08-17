#!/usr/bin/env node

import { cpus } from "node:os";
import os from "node:os";
import path from "node:path";
import { promises as fs } from "node:fs";
import sharp from "sharp";

const root = process.cwd();
const configPath = path.join(root, "data", "portfolio-image-sources.json");
const portfolioCategories = ["f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8"];
const maxWidth = 1600;
const maxHeight = 1200;
const quality = 82;

const args = new Set(process.argv.slice(2));
const shouldPrepare = args.has("--prepare") || args.has("--apply") || args.size === 0;
const shouldClean = args.has("--clean") || args.has("--apply");
const shouldAudit = args.has("--audit") || shouldPrepare || shouldClean;

function fail(message) {
  throw new Error(message);
}

function relToAbsolute(relativePath) {
  const absolutePath = path.resolve(root, relativePath);
  const rootWithSeparator = `${root}${path.sep}`;

  if (absolutePath !== root && !absolutePath.startsWith(rootWithSeparator)) {
    fail(`Workspace tashqarisidagi yo‘l rad etildi: ${relativePath}`);
  }

  return absolutePath;
}

function toPosix(relativePath) {
  return relativePath.replaceAll(path.sep, "/");
}

function asCategoryEntries(map) {
  return Object.entries(map ?? []);
}

function slugFromSource(source) {
  return path
    .basename(source, path.extname(source))
    .replaceAll("_", "-")
    .replace(/[^a-zA-Z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

function buildAssets(config) {
  const assets = [];

  for (const [category, photoNumbers] of asCategoryEntries(config.newPhotos)) {
    for (const photoNumber of photoNumbers) {
      const padded = String(photoNumber).padStart(2, "0");
      assets.push({
        id: `${category}-photo-${padded}`,
        category,
        source: `images-new/photo_${photoNumber}_${config.newPhotoTimestamp}.jpg`,
        target: `public/img/portfolio/${category}/photo-${padded}.webp`,
      });
    }
  }

  for (const [category, imageNumbers] of asCategoryEntries(config.telegram)) {
    for (const imageNumber of imageNumbers) {
      assets.push({
        id: `${category}-telegram-${imageNumber}`,
        category,
        source: `public/img/telegram/tgo_tg_${imageNumber}.webp`,
        target: `public/img/portfolio/${category}/tgo-tg-${imageNumber}.webp`,
      });
    }
  }

  for (const [category, sources] of asCategoryEntries(config.legacyPortfolio)) {
    for (const source of sources) {
      assets.push({
        id: `${category}-legacy-${slugFromSource(source)}`,
        category,
        source,
        target: `public/img/portfolio/${category}/${slugFromSource(source)}.webp`,
      });
    }
  }

  for (const [category, sources] of asCategoryEntries(config.uploads)) {
    for (const source of sources) {
      assets.push({
        id: `${category}-upload-${slugFromSource(source)}`,
        category,
        source,
        target: `public/img/portfolio/${category}/${slugFromSource(source)}.webp`,
      });
    }
  }

  for (const [index, source] of (config.newSouvenirs ?? []).entries()) {
    const padded = String(index + 1).padStart(2, "0");
    assets.push({
      id: `f8-new-suvenir-${padded}`,
      category: "f8",
      source,
      target: `public/img/portfolio/f8/suvenir-${padded}.webp`,
    });
  }

  return assets;
}

function expectedCounts(assets) {
  return portfolioCategories.reduce((counts, category) => {
    counts[category] = assets.filter((asset) => asset.category === category).length;
    return counts;
  }, {});
}

async function exists(relativePath) {
  try {
    await fs.access(relToAbsolute(relativePath));
    return true;
  } catch {
    return false;
  }
}

async function assertInputsExist(assets, config) {
  const missing = [];

  for (const relativePath of assets.map(({ source }) => source)) {
    if (!(await exists(relativePath))) {
      missing.push(relativePath);
    }
  }

  if (missing.length) {
    fail(`Quyidagi manbalar topilmadi:\n${missing.join("\n")}`);
  }
}

function assertManifest(assets) {
  const ids = new Set();
  const targets = new Set();

  for (const asset of assets) {
    if (!portfolioCategories.includes(asset.category)) {
      fail(`Noma’lum kategoriya: ${asset.category}`);
    }
    if (ids.has(asset.id)) {
      fail(`Takrorlangan ID: ${asset.id}`);
    }
    if (targets.has(asset.target)) {
      fail(`Takrorlangan yakuniy fayl: ${asset.target}`);
    }
    ids.add(asset.id);
    targets.add(asset.target);
  }

  if (assets.length !== 146) {
    fail(`Manifest 146 ta bo‘lishi kerak, amalda: ${assets.length}`);
  }

  const counts = expectedCounts(assets);
  const requiredCounts = { f1: 8, f2: 20, f3: 1, f4: 23, f5: 16, f6: 37, f7: 2, f8: 39 };
  for (const category of portfolioCategories) {
    if (counts[category] !== requiredCounts[category]) {
      fail(
        `${category} uchun rasm soni xato: ${counts[category]} (kutilgan ${requiredCounts[category]})`,
      );
    }
  }
}

async function mapWithConcurrency(values, limit, mapper) {
  const results = new Array(values.length);
  let currentIndex = 0;

  const workers = Array.from({ length: Math.min(limit, values.length) }, async () => {
    while (true) {
      const index = currentIndex;
      currentIndex += 1;
      if (index >= values.length) return;
      results[index] = await mapper(values[index], index);
    }
  });

  await Promise.all(workers);
  return results;
}

async function prepareAssets(assets) {
  const stageRoot = await fs.mkdtemp(path.join(os.tmpdir(), "togo-portfolio-"));

  try {
    await mapWithConcurrency(assets, Math.min(4, cpus().length), async (asset) => {
      const stagePath = path.join(stageRoot, asset.target);
      await fs.mkdir(path.dirname(stagePath), { recursive: true });
      await sharp(relToAbsolute(asset.source))
        .rotate()
        .resize({
          width: maxWidth,
          height: maxHeight,
          fit: "inside",
          withoutEnlargement: true,
        })
        .webp({ quality, effort: 4 })
        .toFile(stagePath);

      const metadata = await sharp(stagePath).metadata();
      if (
        metadata.format !== "webp" ||
        !metadata.width ||
        !metadata.height ||
        metadata.width > maxWidth ||
        metadata.height > maxHeight
      ) {
        fail(`Noto‘g‘ri optimizatsiya: ${asset.source}`);
      }
    });

    for (const asset of assets) {
      const stagedPath = path.join(stageRoot, asset.target);
      const destinationPath = relToAbsolute(asset.target);
      await fs.mkdir(path.dirname(destinationPath), { recursive: true });
      await fs.copyFile(stagedPath, destinationPath);
    }
  } finally {
    try {
      await fs.rm(stageRoot, {
        recursive: true,
        force: true,
        maxRetries: 5,
        retryDelay: 200,
      });
    } catch (error) {
      console.warn(
        `Vaqtinchalik stage papkasi keyingi OS tozalashiga qoldi: ${stageRoot} (${error.code ?? "unknown"})`,
      );
    }
  }
}

async function listWebpFiles(relativeDirectory) {
  const absoluteDirectory = relToAbsolute(relativeDirectory);
  const found = [];

  async function visit(directory) {
    const entries = await fs.readdir(directory, { withFileTypes: true });
    for (const entry of entries) {
      const absoluteEntry = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        await visit(absoluteEntry);
      } else if (entry.isFile() && path.extname(entry.name).toLowerCase() === ".webp") {
        found.push(toPosix(path.relative(root, absoluteEntry)));
      }
    }
  }

  await visit(absoluteDirectory);
  return found.sort();
}

async function assertOutputFiles(assets) {
  const expectedTargets = new Set(assets.map(({ target }) => target));
  const outputFiles = await listWebpFiles("public/img/portfolio");
  const missing = [];

  for (const target of expectedTargets) {
    if (!(await exists(target))) {
      missing.push(target);
    }
  }

  if (missing.length) {
    fail(`Yakuniy rasm topilmadi:\n${missing.join("\n")}`);
  }

  const metadataResults = await mapWithConcurrency(
    [...expectedTargets],
    Math.min(8, cpus().length),
    async (target) => {
      const metadata = await sharp(relToAbsolute(target)).metadata();
      return metadata.format === "webp" &&
        metadata.width &&
        metadata.height &&
        metadata.width <= maxWidth &&
        metadata.height <= maxHeight
        ? null
        : target;
    },
  );
  const missingMetadata = metadataResults.filter(Boolean);

  if (missingMetadata.length) {
    fail(`Yakuniy WebP metadata xato:\n${missingMetadata.join("\n")}`);
  }

  return {
    expectedTargets,
    outputFiles,
  };
}

async function removeIfExists(relativePath) {
  const absolutePath = relToAbsolute(relativePath);
  await fs.rm(absolutePath, { force: true });
}

async function removeDirectoryIfEmpty(relativePath) {
  const absolutePath = relToAbsolute(relativePath);

  try {
    const entries = await fs.readdir(absolutePath);
    if (entries.length === 0) {
      await fs.rmdir(absolutePath);
    }
  } catch (error) {
    if (error?.code !== "ENOENT") throw error;
  }
}

async function noSourceReference(relativePath) {
  const publicUrl = `/${relativePath.replace(/^public\//, "")}`;
  const filename = path.basename(relativePath);
  const scanRoots = ["app", "components"];

  async function scan(directory) {
    const absoluteDirectory = relToAbsolute(directory);
    const entries = await fs.readdir(absoluteDirectory, { withFileTypes: true });
    for (const entry of entries) {
      const absoluteEntry = path.join(absoluteDirectory, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === "node_modules" || entry.name === ".next") continue;
        if (!(await scan(toPosix(path.relative(root, absoluteEntry))))) return false;
      } else if (/\.(?:[cm]?[jt]sx?|mdx?|css|html)$/i.test(entry.name)) {
        const contents = await fs.readFile(absoluteEntry, "utf8");
        if (contents.includes(publicUrl) || contents.includes(filename)) {
          return false;
        }
      }
    }
    return true;
  }

  for (const scanRoot of scanRoots) {
    if (!(await scan(scanRoot))) return false;
  }
  return true;
}

async function cleanSources(assets, config) {
  await assertOutputFiles(assets);

  for (const source of assets.map(({ source }) => source)) {
    await removeIfExists(source);
  }

  for (const unusedAsset of config.unusedPublicAssets) {
    if (!(await noSourceReference(unusedAsset))) {
      fail(`Hali ishlatilayotgan static asset o‘chirilmaydi: ${unusedAsset}`);
    }
    await removeIfExists(unusedAsset);
  }

  await removeDirectoryIfEmpty("public/img/telegram");
  await removeDirectoryIfEmpty("public/uploads");
  await removeDirectoryIfEmpty("suvenir");
}

async function assertCleanup(assets, config, requireCleanup) {
  if (!requireCleanup) return;

  const residualSources = [];
  for (const source of assets.map(({ source }) => source)) {
    if (await exists(source)) residualSources.push(source);
  }
  if (residualSources.length) {
    fail(`Eski portfolio manbalari qolib ketgan:\n${residualSources.join("\n")}`);
  }

  const imagesNewPath = relToAbsolute("images-new");
  const filesInImagesNew = (await exists("images-new"))
    ? await fs.readdir(imagesNewPath)
    : [];
  const retainedNames = new Set(config.retainedArchive.map((source) => path.basename(source)));
  const unexpectedImagesNew = filesInImagesNew.filter(
    (filename) => !retainedNames.has(filename),
  );
  if (unexpectedImagesNew.length) {
    fail(`images-new ichida saralanmagan fayllar qolgan:\n${unexpectedImagesNew.join("\n")}`);
  }

  for (const retainedAsset of config.retainedSiteAssets) {
    if (!(await exists(retainedAsset))) {
      fail(`Saqlanishi kerak bo‘lgan sayt aktivi topilmadi: ${retainedAsset}`);
    }
  }

  for (const unusedAsset of config.unusedPublicAssets) {
    if (await exists(unusedAsset)) {
      fail(`Ishlatilmaydigan public asset qolib ketgan: ${unusedAsset}`);
    }
  }
}

async function writeInventory(assets, config, cleaned) {
  const counts = expectedCounts(assets);
  const rows = await Promise.all(
    assets.map(async (asset) => {
      const sourceStillExists = await exists(asset.source);
      return `| ${asset.id} | ${asset.category} | \`${asset.source}\` | \`/${asset.target.replace(/^public\//, "")}\` | ${sourceStillExists ? "WebP tayyorlandi; manba hali saqlangan" : "WebP tayyorlandi; eski manba o‘chirildi"} |`;
    }),
  );
  const retainedRows = await Promise.all(
    config.retainedArchive.map(async (source) =>
      (await exists(source))
        ? `| \`${source}\` | HEIC arxiv sifatida saqlandi; sayt galereyasiga qo‘shilmadi |`
        : `| \`${source}\` | Mavjud emas; sayt galereyasiga qo‘shilmagan |`,
    ),
  );
  const unusedRows = config.unusedPublicAssets.map(
    (source) =>
      `| \`${source}\` | ${cleaned ? "Ishlatilmagani tekshirildi va o‘chirildi" : "Tozalash bosqichida o‘chiriladi"} |`,
  );
  const retainedSiteAssetRows = config.retainedSiteAssets.map(
    (source) => `| \`${source}\` | Sayt interfeysi uchun saqlandi |`,
  );

  const content = [
    "# Portfolio image inventory",
    "",
    "Bu ro‘yxat portfolio uchun tekshirilgan barcha rasmlarni qamrab oladi.",
    "",
    "## Yakuniy kategoriya sonlari",
    "",
    "| Kategoriya | Rasm soni |",
    "| --- | ---: |",
    ...portfolioCategories.map((category) => `| ${category} | ${counts[category]} |`),
    `| **Jami** | **${assets.length}** |`,
    "",
    "## Portfolio rasmlari",
    "",
    "| ID | Kategoriya | Boshlang‘ich manba | Yakuniy yo‘l | Amal |",
    "| --- | --- | --- | --- | --- |",
    ...rows,
    "",
    "## Saqlangan HEIC arxivi",
    "",
    "| Fayl | Holat |",
    "| --- | --- |",
    ...retainedRows,
    "",
    "## Saqlangan sayt aktivlari",
    "",
    "| Fayl | Holat |",
    "| --- | --- |",
    ...retainedSiteAssetRows,
    "",
    "## Tozalangan yordamchi fayllar",
    "",
    "| Fayl | Holat |",
    "| --- | --- |",
    ...unusedRows,
    "",
  ].join("\n");

  const inventoryPath = relToAbsolute("docs/portfolio-image-inventory.md");
  await fs.mkdir(path.dirname(inventoryPath), { recursive: true });
  await fs.writeFile(inventoryPath, content, "utf8");
}

async function main() {
  const config = JSON.parse(await fs.readFile(configPath, "utf8"));
  const assets = buildAssets(config);
  assertManifest(assets);

  if (shouldPrepare) {
    const missingOutputAssets = [];
    for (const asset of assets) {
      if (!(await exists(asset.target))) {
        missingOutputAssets.push(asset);
      }
    }
    await assertInputsExist(missingOutputAssets, config);
    await prepareAssets(missingOutputAssets);
  }

  if (shouldAudit) {
    await assertOutputFiles(assets);
  }

  if (shouldClean) {
    await cleanSources(assets, config);
    const { expectedTargets, outputFiles } = await assertOutputFiles(assets);
    const unexpectedOutputs = outputFiles.filter(
      (output) => !expectedTargets.has(output),
    );
    if (unexpectedOutputs.length) {
      fail(
        `Yakuniy papkada noma’lum WebP fayllar bor:\n${unexpectedOutputs.join("\n")}`,
      );
    }
  }

  await assertCleanup(assets, config, shouldClean);
  await writeInventory(assets, config, shouldClean);

  const counts = expectedCounts(assets);
  console.log(
    JSON.stringify(
      {
        portfolioImages: assets.length,
        categories: counts,
        prepared: shouldPrepare,
        cleaned: shouldClean,
        retainedHeic: config.retainedArchive,
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.stack : error);
  process.exitCode = 1;
});
