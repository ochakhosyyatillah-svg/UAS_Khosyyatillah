import { query } from "@/lib/db";
import Link from "next/link";
import { deleteKategori, toggleActiveKategori } from "@/app/actions/kategori";
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

export default async function KategoriAdminPage() {
  const categories = await query<any>("SELECT id, name, description, is_active FROM categories ORDER BY id ASC");

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <div className="admin-page-title">Manajemen Kategori</div>
          <div className="admin-page-subtitle">Kelola kategori produk fashion ({categories.length} kategori)</div>
        </div>
        <Link href="/admin/kategori/create" className="admin-btn admin-btn-primary">
          <PlusIcon /> Tambah Kategori
        </Link>
      </div>

      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: "40px" }}>#</th>
              <th>Nama Kategori</th>
              <th className="admin-col-hide-mobile">Deskripsi</th>
              <th style={{ textAlign: "center" }}>Status</th>
              <th style={{ textAlign: "right", width: "96px" }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: "center", padding: "48px", color: "#94a3b8" }}>
                  Belum ada kategori. Klik &quot;Tambah Kategori&quot; untuk memulai.
                </td>
              </tr>
            ) : categories.map((item: any) => (
              <tr key={item.id}>
                <td style={{ color: "#94a3b8", fontWeight: 500, width: "40px" }}>{item.id}</td>
                <td>
                  <div style={{ fontWeight: 700, fontSize: "14px", color: "#1e293b" }}>{item.name}</div>
                </td>
                <td className="admin-col-hide-mobile">
                  <div style={{ fontSize: "13px", color: "#64748b" }}>
                    {item.description || "-"}
                  </div>
                </td>
                <td style={{ textAlign: "center" }}>
                  <form action={async () => {
                    "use server";
                    await toggleActiveKategori(item.id, item.is_active);
                  }}>
                    <button type="submit" className={`admin-badge ${item.is_active ? "admin-badge-green" : "admin-badge-gray"}`}
                      style={{ cursor: "pointer", border: "none", fontFamily: "inherit" }}>
                      {item.is_active ? "● Aktif" : "○ Nonaktif"}
                    </button>
                  </form>
                </td>
                <td>
                  <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                    <Link href={`/admin/kategori/${item.id}/edit`} className="admin-btn admin-btn-icon" title="Edit">
                      <EditIcon />
                    </Link>
                    <DeleteButton
                      message="Hapus kategori ini?"
                      action={async () => {
                        "use server";
                        await deleteKategori(item.id);
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
  );
}
