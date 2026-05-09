import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GalleryClient from "@/components/GalleryClient";
import { getGalleryItems } from "@/lib/data";
import { getAllSlugs } from "@/lib/getBrand";

export const revalidate = 60;

export default async function GalleryPage({ searchParams }: { searchParams?: { brand_slug?: string } }) {
  const brandSlug = searchParams?.brand_slug || getAllSlugs()[0] || "";
  const items = await getGalleryItems(brandSlug);
  return (
    <main style={{ background: "#0A0A0A", minHeight: "100vh" }}>
      <Navbar />
      <GalleryClient initialItems={items} />
      <Footer />
    </main>
  );
}
