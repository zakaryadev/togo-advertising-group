export interface MaterialItem {
  id?: string;
  key: string;
  name_uz: string;
  name_ru?: string;
  name_en?: string;
  price_per_sqm: number;
  is_active: boolean;
}

const localMaterials: MaterialItem[] = [
  { key: "m1", name_uz: "Vinil banner (Standart 440g)", price_per_sqm: 45000, is_active: true },
  { key: "m2", name_uz: "Vinil banner (Laminatsiyalangan 510g)", price_per_sqm: 55000, is_active: true },
  { key: "m3", name_uz: "Samokleyka plyonka (Orajet/Rita)", price_per_sqm: 65000, is_active: true },
  { key: "m4", name_uz: "Setka banner (Mesh)", price_per_sqm: 70000, is_active: true },
  { key: "m5", name_uz: "Backlit plyonka (Lightbox uchun)", price_per_sqm: 95000, is_active: true },
];

export function getLocalMaterials(): MaterialItem[] {
  return localMaterials;
}

export function updateLocalMaterialPrice(key: string, updates: { price_per_sqm?: number; is_active?: boolean }) {
  const item = localMaterials.find((m) => m.key === key);
  if (item) {
    if (updates.price_per_sqm !== undefined) item.price_per_sqm = updates.price_per_sqm;
    if (updates.is_active !== undefined) item.is_active = updates.is_active;
  }
}
