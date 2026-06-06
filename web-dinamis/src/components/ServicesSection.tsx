import { query } from "@/lib/db";

interface Category {
  id: number;
  name: string;
  description: string | null;
  image_url: string | null;
}

const ICONS = ["🧥", "👗", "🧒", "👜", "👟", "🧢"];

export default async function ServicesSection() {
  const categories = await query<Category>(
    "SELECT id, name, description, image_url FROM categories WHERE is_active = 1 ORDER BY id ASC"
  );

  return (
    <section id="services" className="services">
      <h2 className="section-title">
        Kategori Produk
      </h2>
      <p className="section-subtitle">
        Temukan gaya Anda sendiri. Dari busana kasual hingga formal, kami hadirkan koleksi terbaik untuk setiap momen.
      </p>
      <div className="services-grid">
        {categories.length === 0 ? (
          <div className="card" style={{ textAlign: "center", gridColumn: "1/-1" }}>
            <p>Tidak ada kategori aktif saat ini.</p>
          </div>
        ) : (
          categories.map((category, i) => (
            <div className="card" key={category.id} style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="card-content">
                <h3>{category.name}</h3>
                <p>{category.description || "Kategori produk fashion."}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
