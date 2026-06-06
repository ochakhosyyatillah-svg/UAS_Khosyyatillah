import { query } from "@/lib/db";
import Link from "next/link";
import { deleteProduk, toggleActiveProduk } from "@/app/actions/produk";
import DeleteButton from "@/components/DeleteButton";

export const dynamic = "force-dynamic";

const PlusIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

interface ProductRow {
  id: number;
  name: string;
  category_name: string | null;
  price: number;
  sale_price: number | null;
  stock: number;
  is_active: number;
  is_featured: number;
  total_sold: number;
}

export default async function ProdukAdminPage() {
  const products = await query<ProductRow>(
    `SELECT p.id, p.name, p.price, p.sale_price, p.stock, p.is_active, p.is_featured, p.total_sold,
            c.name AS category_name
     FROM products p
     LEFT JOIN categories c ON p.category_id = c.id
     ORDER BY p.created_at DESC`
  );

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <div className="admin-page-title">Manajemen Produk</div>
          <div className="admin-page-subtitle">Kelola semua produk fashion dari database ({products.length} produk)</div>
        </div>
        <Link href="/admin/produk/create" className="admin-btn admin-btn-primary">
          <PlusIcon /> Tambah Produk
        </Link>
      </div>

      <div className="admin-card">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: "40px" }}>#</th>
                <th>Nama Produk</th>
                <th className="admin-col-hide-mobile">Kategori</th>
                <th>Harga</th>
                <th className="admin-col-hide-mobile">Stok</th>
                <th style={{ textAlign: "center" }}>Status</th>
                <th style={{ textAlign: "right", width: "96px" }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: "48px", color: "#94a3b8" }}>
                    Belum ada produk. Klik &quot;Tambah Produk&quot; untuk memulai.
                  </td>
                </tr>
              ) : products.map((item) => (
                <tr key={item.id}>
                  <td style={{ color: "#94a3b8", fontWeight: 500, width: "40px" }}>{item.id}</td>
                  <td>
                    <div style={{ fontWeight: 600, color: "#1e293b", fontSize: "13px" }}>
                      {item.name}
                    </div>
                    {item.is_featured === 1 && (
                      <span style={{ fontSize: "11px", color: "#f59e0b", fontWeight: 600 }}>⭐ Featured</span>
                    )}
                  </td>
                  <td className="admin-col-hide-mobile">
                    <span className="admin-badge admin-badge-blue">{item.category_name || "Tanpa Kategori"}</span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, fontSize: "13px", color: "#1e293b" }}>
                      Rp {Number(item.price).toLocaleString("id-ID")}
                    </div>
                    {item.sale_price && (
                      <div style={{ fontSize: "11px", color: "#ef4444", fontWeight: 600 }}>
                        Sale: Rp {Number(item.sale_price).toLocaleString("id-ID")}
                      </div>
                    )}
                  </td>
                  <td className="admin-col-hide-mobile">
                    <span style={{
                      fontWeight: 600, fontSize: "13px",
                      color: item.stock > 10 ? "#16a34a" : item.stock > 0 ? "#f59e0b" : "#ef4444"
                    }}>
                      {item.stock}
                    </span>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <form action={async () => {
                      "use server";
                      await toggleActiveProduk(item.id, item.is_active);
                    }}>
                      <button type="submit" className={`admin-badge ${item.is_active ? "admin-badge-green" : "admin-badge-gray"}`}
                        style={{ cursor: "pointer", border: "none", fontFamily: "inherit" }}>
                        {item.is_active ? "● Aktif" : "○ Nonaktif"}
                      </button>
                    </form>
                  </td>
                  <td>
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                      <Link href={`/admin/produk/${item.id}/edit`} className="admin-btn admin-btn-icon" title="Edit">
                        <EditIcon />
                      </Link>
                      <DeleteButton
                        message="Hapus produk ini? Data tidak dapat dikembalikan."
                        action={async () => {
                          "use server";
                          await deleteProduk(item.id);
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
