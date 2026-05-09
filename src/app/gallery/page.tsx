import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GalleryClient from "@/components/GalleryClient";
import { getGalleryItems } from "@/lib/data";

export const revalidate = 60;

export default async function GalleryPage() {
  const items = await getGalleryItems();
  return (
    <main style={{ background: "#0A0A0A", minHeight: "100vh" }}>
      <Navbar />
      <GalleryClient initialItems={items} />
      <Footer />
    </main>
  );
}
