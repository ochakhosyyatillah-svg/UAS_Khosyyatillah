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
    { name: "Total Kategori", value: categoryCount[0]?.total ?? 0, href: "/admin/kategori", color: "#7c3aed", bg: "#f5f3ff", border: "#ede9fe" },
    { name: "Total Produk", value: productCount[0]?.total ?? 0, href: "/admin/produk", color: "#2563eb", bg: "#eff6ff", border: "#bfdbfe" },
    { name: "Pesanan Baru", value: pendingOrders[0]?.total ?? 0, href: "/admin", color: "#0891b2", bg: "#ecfeff", border: "#a5f3fc" },
    { name: "Total Pelanggan", value: userCount[0]?.total ?? 0, href: "/admin", color: "#059669", bg: "#f0fdf4", border: "#bbf7d0" },
  ];

  const recentProducts = await query<any>(
    "SELECT id, name, price, created_at FROM products WHERE is_active = 1 ORDER BY created_at DESC LIMIT 5"
  );
  const recentOrders = await query<any>(
    "SELECT id, order_number, recipient_name, grand_total, status, created_at FROM orders ORDER BY created_at DESC LIMIT 5"
  );

  return (
    <div>
      <div style={{ marginBottom: "28px" }}>
        <h2 style={{ fontSize: "22px", fontWeight: 800, color: "#0f172a", marginBottom: "6px" }}>
          Selamat Datang 👋
        </h2>
        <p style={{ color: "#64748b", fontSize: "14px" }}>
          Berikut adalah ringkasan data e-commerce StyleHub Anda.
        </p>
      </div>

      {/* Stats */}
      <div className="admin-stats-grid">
        {stats.map((s) => (
          <Link key={s.name} href={s.href} className="admin-stat-card" style={{ textDecoration: "none" }}>
            <div>
              <div style={{ fontSize: "13px", color: "#64748b", fontWeight: 500, marginBottom: "8px" }}>{s.name}</div>
              <div style={{ fontSize: "32px", fontWeight: 800, color: "#0f172a", lineHeight: 1 }}>{s.value}</div>
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
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        {/* Recent Products */}
        <div className="admin-card">
          <div style={{ padding: "20px 24px", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ fontSize: "15px", fontWeight: 700, color: "#0f172a" }}>Produk Terbaru</div>
            <Link href="/admin/produk" className="admin-btn admin-btn-primary" style={{ padding: "6px 14px", fontSize: "12px" }}>Lihat Semua Produk</Link>
          </div>
          <div>
            {recentProducts.length === 0 ? (
              <div style={{ padding: "32px", textAlign: "center", color: "#94a3b8", fontSize: "14px" }}>Belum ada produk aktif.</div>
            ) : recentProducts.map((item: any) => (
              <div key={item.id} style={{ padding: "14px 24px", borderBottom: "1px solid #f8fafc", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "#1e293b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.name}</div>
                  <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "2px" }}>
                    Rp {Number(item.price).toLocaleString("id-ID")} • {new Date(item.created_at).toLocaleDateString("id-ID")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="admin-card">
          <div style={{ padding: "20px 24px", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ fontSize: "15px", fontWeight: 700, color: "#0f172a" }}>Pesanan Terbaru</div>
            <Link href="/admin" className="admin-btn admin-btn-secondary" style={{ padding: "6px 14px", fontSize: "12px" }}>Ringkasan</Link>
          </div>
          <div>
            {recentOrders.length === 0 ? (
              <div style={{ padding: "32px", textAlign: "center", color: "#94a3b8", fontSize: "14px" }}>Belum ada pesanan.</div>
            ) : recentOrders.map((order: any) => (
              <div key={order.id} style={{ padding: "14px 24px", borderBottom: "1px solid #f8fafc", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "#1e293b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{order.order_number}</div>
                  <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "2px" }}>
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
