import { getBrand, getAllSlugs } from "@/lib/getBrand";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";

const BrandPage = dynamic(() => import("@/components/BrandPage"), { ssr: false });

export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }));
}

export default function Page({ params }: { params: { slug: string } }) {
  const brand = getBrand(params.slug);
  if (!brand) return notFound();
  return <BrandPage brand={brand} />;
}
