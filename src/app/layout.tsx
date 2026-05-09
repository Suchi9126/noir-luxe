import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Noir & Co. — Fine Dining, Bengaluru",
  description: "Three Michelin-starred fine dining restaurant in Bengaluru. Tasting menus, private dining, and chef's table experiences.",
  keywords: "fine dining, Bengaluru, Michelin star, tasting menu, luxury restaurant",
  openGraph: {
    title: "Noir & Co. — Fine Dining, Bengaluru",
    description: "An experience beyond dining.",
    images: ["https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A0A0A",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
