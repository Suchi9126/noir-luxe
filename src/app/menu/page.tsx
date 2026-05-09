import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MenuClient from "@/components/MenuClient";

async function getMenuItems() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL ? `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/menu` : 'http://localhost:3000/api/menu'}`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch { return []; }
}

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
