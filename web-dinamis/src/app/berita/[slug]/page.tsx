import { notFound } from "next/navigation";
import Link from "next/link";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

interface ProductDetail {
  id: number;
  name: string;
  description: string | null;
  image_url: string | null;
  price: number;
  stock: number;
  material: string | null;
  color: string | null;
  category_name: string | null;
  created_at: string;
}

export default async function BeritaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const id = Number(slug);
  if (Number.isNaN(id)) {
    notFound();
  }

  const rows = await query<ProductDetail>(
    `SELECT p.id, p.name, p.description, p.image_url, p.price, p.stock, p.material, p.color, p.created_at,
            c.name AS category_name
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.id
       WHERE p.id = ? AND p.is_active = 1 LIMIT 1`,
    [id]
  );

  if (rows.length === 0) {
    notFound();
  }

  const product = rows[0];

  return (
    <article style={{ paddingTop: "12rem", paddingBottom: "5rem", minHeight: "100vh" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 5%" }}>
        <Link href="/berita" style={{ color: "var(--accent-primary)", textDecoration: "none", marginBottom: "2rem", display: "inline-block", fontWeight: 600 }}>
          &larr; Kembali ke Katalog
        </Link>

        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", marginBottom: "1rem", lineHeight: 1.2 }}>
          {product.name}
        </h1>

        <div style={{ color: "var(--text-dim)", marginBottom: "1rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", fontSize: "0.9rem" }}>
          Kategori: {product.category_name || "Umum"} • Stok: {product.stock}
        </div>

        {product.image_url && (
          <div style={{ borderRadius: "16px", overflow: "hidden", marginBottom: "3rem" }}>
            <img
              src={product.image_url}
              alt={product.name}
              style={{ width: "100%", maxHeight: "500px", objectFit: "cover" }}
            />
          </div>
        )}

        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "2rem" }}>
          <span style={{ background: "rgba(37,99,235,0.12)", color: "#1d4ed8", padding: "10px 14px", borderRadius: "14px", fontWeight: 700 }}>
            Rp {product.price.toLocaleString("id-ID")}
          </span>
          {product.material && (
            <span style={{ background: "rgba(16,185,129,0.12)", color: "#047857", padding: "10px 14px", borderRadius: "14px", fontWeight: 700 }}>
              Material: {product.material}
            </span>
          )}
          {product.color && (
            <span style={{ background: "rgba(234,179,8,0.12)", color: "#b45309", padding: "10px 14px", borderRadius: "14px", fontWeight: 700 }}>
              Warna: {product.color}
            </span>
          )}
        </div>

        <div style={{ color: "var(--accent-primary)", fontSize: "1.05rem", lineHeight: 1.8 }}>
          <p>{product.description || "Tidak ada deskripsi produk tambahan."}</p>
        </div>
      </div>
    </article>
  );
}
