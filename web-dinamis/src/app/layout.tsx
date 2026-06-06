import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import SiteLayout from "@/components/SiteLayout";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "600", "800"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "UAS Fashion Store | Koleksi Produk Fashion",
  description: "Temukan pakaian dan aksesoris terlengkap dari database UAS Fashion Store. Produk aktif, kategori, dan penawaran terbaru siap melengkapi gaya Anda.",
  keywords: ["fashion", "pakaian", "aksesoris", "toko online", "UAS"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable}`} suppressHydrationWarning>
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
