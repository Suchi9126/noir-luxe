import { brand as noirLuxe } from "@/brands/noir-luxe";
import { brand as salonAurora } from "@/brands/salon-aurora";

const brands = {
  "noir-luxe": noirLuxe,
  "salon-aurora": salonAurora,
};

export function getBrand(slug: string) {
  return brands[slug as keyof typeof brands] ?? null;
}

export function getAllSlugs() {
  return Object.keys(brands);
}
