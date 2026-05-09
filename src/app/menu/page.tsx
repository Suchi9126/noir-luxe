import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MenuClient from "@/components/MenuClient";
import { getMenuItems } from "@/lib/data";
import { getAllSlugs } from "@/lib/getBrand";

export const revalidate = 60;

export default async function MenuPage({ searchParams }: { searchParams?: { brand_slug?: string } }) {
  const brandSlug = searchParams?.brand_slug || getAllSlugs()[0] || "";
  const items = await getMenuItems(brandSlug);
  return (
    <main style={{ background: "#0A0A0A", minHeight: "100vh" }}>
      <Navbar />
      <MenuClient initialItems={items} />
      <Footer />
    </main>
  );
}
