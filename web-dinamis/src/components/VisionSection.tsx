"use client";

import { useEffect, useRef, useState } from "react";

interface VisionStats {
  categories: number;
  products: number;
  orders: number;
  users: number;
}

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 2000;
          const stepTime = target > 0 ? Math.max(Math.floor(duration / target), 16) : 16;
          const timer = setInterval(() => {
            start += Math.max(1, Math.ceil(target / (duration / stepTime)));
            if (start >= target) {
              start = target;
              clearInterval(timer);
            }
            setCount(start);
          }, stepTime);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <h4 ref={ref} className="stat-number">
      {count.toLocaleString("id-ID")}
      {suffix}
    </h4>
  );
}

export default function VisionSection({ stats }: { stats: VisionStats }) {
  return (
    <section id="vision" className="vision">
      <div className="vision-flex">
        <div className="vision-text">
          <span className="hero-tagline">Statistik Toko</span>
          <h2 className="vision-heading">
            Tumbuh Bersama Pelanggan
          </h2>
          <p className="vision-desc">
            Berdiri sejak tahun 2018, StyleHub berawal dari sebuah butik kecil yang memiliki visi besar: menghadirkan koleksi pakaian berkualitas premium dengan desain yang <i>timeless</i>. Berkat kepercayaan Anda, kini kami telah berkembang pesat dan melayani ribuan pelanggan setia di seluruh Indonesia.
          </p>
          <div className="stats-row">
            <div className="stat">
              <AnimatedCounter target={stats.categories} suffix="+" />
              <span className="stat-label">Kategori</span>
            </div>
            <div className="stat">
              <AnimatedCounter target={stats.products} suffix="+" />
              <span className="stat-label">Produk Aktif</span>
            </div>
            <div className="stat">
              <AnimatedCounter target={stats.orders} suffix="+" />
              <span className="stat-label">Pesanan</span>
            </div>
            <div className="stat">
              <AnimatedCounter target={stats.users} suffix="+" />
              <span className="stat-label">Pengguna</span>
            </div>
          </div>
        </div>
        <div className="vision-visual">
          <div className="orbit-container">
            <div style={{ width: "100%", height: "100%", background: "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80') center/cover", filter: "grayscale(20%)" }}></div>
          </div>
        </div>
      </div>
    </section>
  );
}
