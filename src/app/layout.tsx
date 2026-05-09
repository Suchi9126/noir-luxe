import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Noir & Co. | Fine Dining",
  description: "A luxury fine dining experience",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
