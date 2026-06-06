export const dynamic = "force-dynamic";

import Link from "next/link";
import { query } from "@/lib/db";

interface ProductRow {
  id: number;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  category_name: string | null;
  stock: number;
}

export default async function BeritaIndexPage() {

  const rows = await query<ProductRow>(
    `SELECT p.id, p.name, p.description, p.price, p.image_url, p.stock, c.name AS category_name
     FROM products p
     LEFT JOIN categories c ON p.category_id = c.id
     WHERE p.is_active = 1
     ORDER BY p.created_at DESC`
  );

  return (
    <section>
      <div style={{ paddingBottom: "2rem", textAlign: "center" }}>
        <h1 className="section-title">
          Katalog Produk
        </h1>
      </div>

      <div
        className="berita-grid"
        style={{ maxWidth: "1200px", margin: "0 auto" }}
      >
        {rows.length === 0 && (
          <p style={{ textAlign: "center", gridColumn: "1/-1" }}>
            Tidak ada berita saat ini.
          </p>
        )}

        {rows.map((item, i) => (
          <Link
            href={`/berita/${item.id}`}
            key={item.id}
            className="berita-card"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            {item.image_url && (
              <div className="berita-card__img">
                <img
                  src={item.image_url}
                  alt={item.name}
                  loading="lazy"
                />
                <div className="berita-card__overlay">
                  <span className="quick-view-btn">Lihat Detail</span>
                </div>
              </div>
            )}

            <div className="card-content">
              <h3>{item.name}</h3>
              <div className="card-price">Rp {item.price.toLocaleString("id-ID")}</div>
              <button className="cta-btn">Lihat Detail</button>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}