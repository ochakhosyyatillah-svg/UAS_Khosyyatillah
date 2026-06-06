import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import VisionSection from "@/components/VisionSection";
import BeritaSection from "@/components/BeritaSection";
import ContactSection from "@/components/ContactSection";
import { query } from "@/lib/db";

export default async function Home() {
  const [categoryCount] = await query<{ total: number }>(
    "SELECT COUNT(*) AS total FROM categories WHERE is_active = 1"
  );
  const [productCount] = await query<{ total: number }>(
    "SELECT COUNT(*) AS total FROM products WHERE is_active = 1"
  );
  const [orderCount] = await query<{ total: number }>(
    "SELECT COUNT(*) AS total FROM orders"
  );
  const [userCount] = await query<{ total: number }>(
    "SELECT COUNT(*) AS total FROM users"
  );

  return (
    <>
      <HeroSection />
      <ServicesSection />
      <VisionSection
        stats={{
          categories: categoryCount?.total ?? 0,
          products: productCount?.total ?? 0,
          orders: orderCount?.total ?? 0,
          users: userCount?.total ?? 0,
        }}
      />
      <BeritaSection />
      <ContactSection />
    </>
  );
}
