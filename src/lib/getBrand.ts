import { brand as noirLuxe } from "../brands/noir-luxe";
import { brand as salonAurora } from "../brands/salon-aurora";

export function getBrand(slug: string) {
  switch (slug) {
    case "noir-luxe":
      return noirLuxe;
    case "salon-aurora":
      return salonAurora;
    default:
      return null;
  }
}
