"use client";
import React from "react";

export default function ProfileHero() {
  const navigation = [
    { label: "Sejarah", href: "#history" },
    { label: "Visi & Misi", href: "#visi-misi" },
    { label: "Struktur Organisasi", href: "#struktur-organisasi" },
    { label: "Fasilitas", href: "#fasilitas" },
    { label: "Legalitas", href: "#legalitas" },
  ];

  return (
    /* 1. Background Image penuh layar dengan overlay agar teks kontras */
    <section className="relative w-full min-h-[60vh] md:min-h-[80vh] flex items-center bg-[url('/panti-4.jpg')] bg-cover bg-center">
      {/* 2. Overlay: Menggunakan gradasi gelap ke transparan agar teks di kiri sangat jelas */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/60 to-transparent"></div>

      {/* 3. Konten tetap dalam container agar sejajar dengan bagian lain */}
      <div className="container mx-auto px-6 py-20 relative z-10">
        <p className="text-emerald-300 font-black tracking-[0.3em] text-[18px] md:text-[24px] uppercase mb-4 drop-shadow-md">
          Tentang Kami
        </p>

        <h1 className="text-[32px] md:text-[64px] font-black text-white leading-tight mb-6 max-w-4xl drop-shadow-lg">
          Mengenal Panti Asuhan <br className="hidden md:block" />
          <span className="text-emerald-300">Kampung Melayu</span>
        </h1>

        <p className="text-slate-100 font-medium text-[18px] md:text-[24px] max-w-2xl mb-12 leading-relaxed opacity-90">
          Berdiri sejak 2012, kami berkomitmen menjadi rumah bagi anak-anak
          untuk tumbuh, mendapatkan pendidikan, kesehatan, dan kasih sayang yang
          layak.
        </p>

        <div className="flex flex-wrap gap-4">
          {navigation.map((item, i) => (
            <button
              key={i}
              className={`px-8 py-3 rounded-2xl text-[16px] md:text-[20px] font-black transition-all border-2 
                ${
                  i === 0
                    ? "bg-emerald-500 border-emerald-500 text-white shadow-xl shadow-emerald-900/20 scale-105"
                    : "bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-emerald-500 hover:border-emerald-500 hover:text-white"
                }`}
              onClick={() => {
                const element = document.querySelector(item.href);
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
