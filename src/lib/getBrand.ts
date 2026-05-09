import { brand as noirLuxe } from "@/brands/noir-luxe";
import { brand as cafeBloom } from "@/brands/cafe-bloom";

const brands: Record<string, typeof noirLuxe> = {
  "noir-luxe": noirLuxe,
  "cafe-bloom": cafeBloom,
};

export function getBrand(slug: string) {
  return brands[slug] ?? noirLuxe;
}

export function getAllSlugs() {
  return Object.keys(brands);
}
