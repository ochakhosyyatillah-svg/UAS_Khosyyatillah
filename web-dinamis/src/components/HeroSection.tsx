"use client";

import { useEffect, useRef } from "react";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add("hero--visible");
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="hero" className="hero" ref={sectionRef}>
      <div className="hero-content">
        <span className="hero-tagline">StyleHub New Arrival</span>
        <h1 className="hero-title">
          ELEVATE YOUR EVERYDAY STYLE
        </h1>
        <p className="hero-description">
          Temukan koleksi pakaian eksklusif dan aksesoris modern dengan kualitas premium. Tampil percaya diri di setiap momen.
        </p>
        <a href="#services" className="cta-button">
          LIHAT KOLEKSI
        </a>
      </div>
    </section>
  );
}
