import ScrollReveal from "@/components/ScrollReveal";
import NavbarScrollWatcher from "@/components/NavbarScrollWatcher";

export default function BrandLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollReveal />
      <NavbarScrollWatcher />
      {children}
    </>
  );
}
