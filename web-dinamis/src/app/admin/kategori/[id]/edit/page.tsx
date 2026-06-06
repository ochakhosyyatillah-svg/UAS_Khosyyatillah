import { updateKategori } from "@/app/actions/kategori";
import { query } from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";

const BackIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
  </svg>
);
const SaveIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>
  </svg>
);

export default async function EditKategoriPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const categoryId = Number(id);

  if (Number.isNaN(categoryId)) {
    notFound();
  }

  const categories = await query<any>("SELECT * FROM categories WHERE id = ?", [categoryId]);
  if (categories.length === 0) {
    notFound();
  }

  const category = categories[0];
  const updateAction = updateKategori.bind(null, categoryId);

  return (
    <div style={{ maxWidth: "700px" }}>
      <div className="admin-page-header">
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Link href="/admin/kategori" className="admin-btn admin-btn-icon"><BackIcon /></Link>
          <div>
            <div className="admin-page-title">Edit Kategori</div>
            <div className="admin-page-subtitle">Ubah data kategori #{categoryId}</div>
          </div>
        </div>
      </div>

      <div className="admin-card" style={{ padding: "32px" }}>
        <form action={updateAction}>
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "16px 20px", background: "#f8fafc", borderRadius: "12px",
            border: "1px solid #e2e8f0", marginBottom: "24px"
          }}>
            <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
              <input type="checkbox" name="is_active" defaultChecked={category.is_active === 1} style={{ width: "18px", height: "18px", accentColor: "#2563eb" }} />
              <span style={{ fontSize: "13px", fontWeight: 600, color: "#374151" }}>Kategori Aktif</span>
            </label>
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Nama Kategori <span style={{ color: "#ef4444" }}>*</span></label>
            <input name="name" required type="text" className="admin-form-input" defaultValue={category.name} />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">URL Gambar (Opsional)</label>
            <input name="image_url" type="url" className="admin-form-input" defaultValue={category.image_url || ""} />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Deskripsi</label>
            <textarea name="description" className="admin-form-textarea" style={{ minHeight: "100px" }}
              defaultValue={category.description || ""} />
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", paddingTop: "8px", borderTop: "1px solid #f1f5f9" }}>
            <Link href="/admin/kategori" className="admin-btn admin-btn-secondary">Batal</Link>
            <button type="submit" className="admin-btn admin-btn-primary">
              <SaveIcon /> Update Kategori
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
