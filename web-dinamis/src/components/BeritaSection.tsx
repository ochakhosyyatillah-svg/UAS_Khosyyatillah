import Link from "next/link";
import { query } from "@/lib/db";

interface ProductItem {
  id: number;
  name: string;
  description: string | null;
  image_url: string | null;
  price: number;
  created_at: string;
}

export default async function BeritaSection() {
  const products = await query<ProductItem>(
    "SELECT id, name, description, image_url, price, created_at FROM products WHERE is_active = 1 ORDER BY created_at DESC LIMIT 4"
  );

  return (
    <section id="berita" className="berita-section">
      <h2 className="section-title">
        Produk Populer
      </h2>
      <p className="section-subtitle">
        Koleksi produk terbaik yang tersedia di database toko Anda.
      </p>

      {products.length === 0 ? (
        <p style={{ textAlign: "center", color: "var(--text-dim)" }}>
          Belum ada produk tersedia.
        </p>
      ) : (
        <div className="berita-grid">
          {products.map((item, i) => (
            <Link
              href={`/berita/${item.id}`}
              key={item.id}
              className="berita-card"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {item.image_url && (
                <div className="berita-card__img">
                  <img src={item.image_url} alt={item.name} loading="lazy" />
                  <div className="berita-card__overlay">
                    <span className="quick-view-btn">Lihat Detail</span>
                  </div>
                </div>
              )}
              <div className="berita-card__body">
                <h3>{item.name}</h3>
                <span className="berita-card__price">
                  Rp {item.price.toLocaleString("id-ID")}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div style={{ textAlign: "center", marginTop: "3rem" }}>
        <Link href="/berita" className="cta-button">
          LIHAT SEMUA PRODUK
        </Link>
      </div>
    </section>
  );
}
