import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Link href="/" className="logo">StyleHub</Link>
          <p className="footer-tagline">Koleksi Fashion Terpercaya dari StyleHub</p>
        </div>
        <div className="footer-links">
          <div className="footer-col">
            <h4>Menu</h4>
            <Link href="/#hero">Beranda</Link>
            <Link href="/#services">Layanan</Link>
            <Link href="/berita">Produk</Link>
            <Link href="/#vision">Visi</Link>
          </div>
          <div className="footer-col">
            <h4>Kategori</h4>
            <span>Pria</span>
            <span>Wanita</span>
            <span>Anak-Anak</span>
            <span>Aksesoris</span>
          </div>
          <div className="footer-col">
            <h4>Kontak</h4>
            <span>khosyatillah@gmail.com</span>
            <span>+62 888 4529 710</span>
            <span>Cirebon, Indonesia</span>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 StyleHub Fashion. Semua hak dilindungi undang-undang.</p>
        <p className="footer-credit">Project by Khosyyatillah</p>
      </div>
    </footer>
  );
}
