import { getBrand } from "@/lib/getBrand";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";

const BrandPage = dynamic(() => import("@/components/BrandPage"), {
  ssr: false,
});

export default function Page({ params }: { params: { slug: string } }) {
  const brand = getBrand(params.slug);
  if (!brand) return notFound();

  return <BrandPage brand={brand} />;
}
