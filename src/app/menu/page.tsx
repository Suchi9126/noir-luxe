import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MenuClient from "@/components/MenuClient";
import { getMenuItems } from "@/lib/data";

export const revalidate = 60;

export default async function MenuPage() {
  const items = await getMenuItems();
  return (
    <main style={{ background: "#0A0A0A", minHeight: "100vh" }}>
      <Navbar />
      <MenuClient initialItems={items} />
      <Footer />
    </main>
  );
}
