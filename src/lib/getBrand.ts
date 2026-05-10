import { brand as noirLuxe } from "@/brands/noir-luxe";
import { brand as cafeBloom } from "@/brands/cafe-bloom";
import { brand as salonAurora } from "@/brands/salon-aurora";
import { brand as drVitalis } from "@/brands/dr-vitalis";

const brands = {
  "noir-luxe": noirLuxe,
  "cafe-bloom": cafeBloom,
  "salon-aurora": salonAurora,
  "dr-vitalis": drVitalis
};

export function getBrand(slug: string) {
  return brands[slug as keyof typeof brands] ?? null;
}

export function getAllSlugs() {
  return Object.keys(brands);
}
