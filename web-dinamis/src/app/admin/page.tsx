import { query } from "@/lib/db";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [categoryCount] = await query<{ total: number }>(
    "SELECT COUNT(*) AS total FROM categories WHERE is_active = 1"
  );
  const [productCount] = await query<{ total: number }>(
    "SELECT COUNT(*) AS total FROM products WHERE is_active = 1"
  );
  const [pendingOrders] = await query<{ total: number }>(
    "SELECT COUNT(*) AS total FROM orders WHERE status = 'pending'"
  );
  const [userCount] = await query<{ total: number }>(
    "SELECT COUNT(*) AS total FROM users"
  );

  const stats = [
    { name: "Total Kategori", value: categoryCount?.total ?? 0, href: "/admin/kategori", color: "#c6a87c", bg: "#fcfaf7", border: "#ede6db" },
    { name: "Total Produk", value: productCount?.total ?? 0, href: "/admin/produk", color: "#1a1a1a", bg: "#f5f5f5", border: "#e5e5e5" },
    { name: "Pesanan Baru", value: pendingOrders?.total ?? 0, href: "/admin", color: "#a3705a", bg: "#faf4f2", border: "#f0e2db" },
    { name: "Total Pelanggan", value: userCount?.total ?? 0, href: "/admin", color: "#6b7c66", bg: "#f5f7f4", border: "#e4eae1" },
  ];

  const recentProducts = await query<any>(
    "SELECT id, name, price, created_at FROM products WHERE is_active = 1 ORDER BY created_at DESC LIMIT 5"
  );
  const recentOrders = await query<any>(
    "SELECT id, order_number, recipient_name, grand_total, status, created_at FROM orders ORDER BY created_at DESC LIMIT 5"
  );

  return (
    <div>
      <div className="admin-welcome-banner">
        <h2>Selamat Datang di <span className="accent">StyleHub Atelier</span> ✨</h2>
        <p style={{ margin: 0 }}>
          &ldquo;Fashion is not something that exists in dresses only. Fashion is in the sky, in the street, fashion has to do with ideas, the way we live, what is happening.&rdquo; — Coco Chanel
        </p>
      </div>

      {/* Stats */}
      <div className="admin-stats-grid">
        {stats.map((s) => (
          <Link key={s.name} href={s.href} className="admin-stat-card" style={{ textDecoration: "none", ["--stat-accent" as any]: s.color }}>
            <div>
              <div style={{ fontSize: "13px", color: "#8b7e6f", fontWeight: 500, marginBottom: "8px" }}>{s.name}</div>
              <div style={{ fontSize: "32px", fontWeight: 800, color: "#1a1a1a", lineHeight: 1 }}>{s.value}</div>
            </div>
            <div style={{
              width: "48px", height: "48px", borderRadius: "12px",
              background: s.bg, border: `1px solid ${s.border}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: s.color, fontSize: "22px", fontWeight: 800,
            }}>
              {String(s.value).padStart(1, "0")}
            </div>
          </Link>
        ))}
      </div>

      {/* Recent content */}
      <div className="admin-dashboard-grid">
        {/* Recent Products */}
        <div className="admin-card">
          <div className="admin-card-header">
            <div className="admin-card-header-title">Produk Terbaru</div>
            <Link href="/admin/produk" className="admin-btn admin-btn-accent" style={{ padding: "6px 14px", fontSize: "12px" }}>Lihat Semua</Link>
          </div>
          <div>
            {recentProducts.length === 0 ? (
              <div style={{ padding: "32px", textAlign: "center", color: "#8b7e6f", fontSize: "14px" }}>Belum ada produk aktif.</div>
            ) : recentProducts.map((item: any) => (
              <div key={item.id} className="admin-product-item">
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "#1a1a1a", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.name}</div>
                  <div style={{ fontSize: "11px", color: "#8b7e6f", marginTop: "2px" }}>
                    Rp {Number(item.price).toLocaleString("id-ID")} • {new Date(item.created_at).toLocaleDateString("id-ID")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="admin-card">
          <div className="admin-card-header">
            <div className="admin-card-header-title">Pesanan Terbaru</div>
            <Link href="/admin" className="admin-btn admin-btn-secondary" style={{ padding: "6px 14px", fontSize: "12px" }}>Ringkasan</Link>
          </div>
          <div>
            {recentOrders.length === 0 ? (
              <div style={{ padding: "32px", textAlign: "center", color: "#8b7e6f", fontSize: "14px" }}>Belum ada pesanan.</div>
            ) : recentOrders.map((order: any) => (
              <div key={order.id} className="admin-product-item">
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "#1a1a1a", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{order.order_number}</div>
                  <div style={{ fontSize: "11px", color: "#8b7e6f", marginTop: "2px" }}>
                    {order.recipient_name} • Rp {Number(order.grand_total).toLocaleString("id-ID")}
                  </div>
                </div>
                <span className={`admin-badge ${order.status === "pending" ? "admin-badge-blue" : "admin-badge-gray"}`} style={{ marginLeft: "12px", flexShrink: 0 }}>
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
