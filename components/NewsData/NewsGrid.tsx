"use client";

import { useState } from "react";
import Link from "next/link";

interface ArticleCardProps {
  category: string;
  title: string;
  slug: string;
  desc?: string;
  date: string;
  image: string;
  isLarge?: boolean;
}

function ArticleCard({
  category,
  title,
  slug,
  desc,
  date,
  image,
  isLarge,
}: ArticleCardProps) {
  return (
    <Link
      href={`/news/preview/${slug}`}
      className={`group block cursor-pointer border-2 border-[#E8E2D6] rounded-2xl hover:bg-[#E8E2D6]/20 duration-500 transition-all ${
        isLarge ? "mb-12" : ""
      }`}
    >
      <div
        className={`bg-gray-200 rounded-t-2xl overflow-hidden ${
          isLarge ? "aspect-video" : "aspect-[4/3]"
        }`}
      >
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="flex flex-col items-start justify-between p-10">
        <span className="text-[14px] font-bold text-green-700 bg-green-100 px-2 py-1 rounded tracking-wider">
          {category}
        </span>

        <h3
          className={`font-bold text-[#2D3E33] mt-3 transition-colors ${
            isLarge ? "text-[32px]" : "text-[20px]"
          }`}
        >
          {title}
        </h3>

        {desc && (
          <p className="text-[#6E6E6E] text-[18px] md:text-[22px] mt-3 line-clamp-2 leading-relaxed">
            {desc}
          </p>
        )}

        <div className="w-full flex flex-row justify-between items-center mt-4 pt-4 border-t border-gray-100">
          <span className="text-[16px] md:text-[18px] text-[#6E6E6E] font-medium">
            {date} • Admin
          </span>
          <span className="text-[14px] md:text-[16px] font-bold text-[#C4714A] flex items-center gap-1 group-hover:gap-2 transition-all">
            Baca Selengkapnya{" "}
            <span className="text-[14px] md:text-[16px]">›</span>
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function NewsGrid() {
  const initialData = [
    {
      category: "Kesehatan",
      slug: "pemeriksaan-gizi-rutin",
      image: "/panti.jpg",
      title: "Pemeriksaan gizi rutin: 94% anak asuh...",
      date: "26 Juli 2026",
    },
    {
      category: "Penyaluran Dana",
      slug: "laporan-dana-mei-2025",
      image: "/panti.jpg",
      title: "Laporan penyaluran dana Mei 2025...",
      date: "26 Juli 2026",
    },
    {
      category: "Donasi",
      slug: "sari-lulus-snbt",
      image: "/panti.jpg",
      title: "Sari lulus SNBT dengan beasiswa penuh...",
      date: "26 Juli 2026",
    },
    {
      category: "Pendidikan",
      slug: "program-bimbel-gratis",
      image: "/panti.jpg",
      title: "Program bimbel gratis dimulai...",
      date: "26 Juli 2026",
    },
  ];

  const [visibleArticles, setVisibleArticles] = useState(initialData);

  // Batas maksimal artikel sebelum tombol berubah jadi "Lihat lebih sedikit"
  const maxArticles = 12;

  const handleToggleArticles = () => {
    if (visibleArticles.length >= maxArticles) {
      // Reset ke data awal
      setVisibleArticles(initialData);
      // Scroll halus ke atas grid jika diinginkan
      window.scrollTo({ top: 400, behavior: "smooth" });
    } else {
      // Tambah data (duplikasi data awal)
      setVisibleArticles((prev) => [...prev, ...initialData]);
    }
  };

  return (
    <div>
      {/* Featured News */}
      <ArticleCard
        isLarge
        category="Pendidikan"
        slug="dito-podium-olimpiade"
        image="/panti.jpg"
        title="Dito, dari panti asuhan ke podium olimpiade..."
        desc="Tidak ada yang menyangka anak pemalu ini bisa mengharumkan nama bangsa di kancah internasional."
        date="28 Agustus 2026"
      />

      {/* Standard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
        {visibleArticles.map((article, index) => (
          <ArticleCard
            key={index} // Menggunakan index karena data duplikat
            category={article.category}
            slug={article.slug}
            image={article.image}
            title={article.title}
            date={article.date}
          />
        ))}
      </div>

      {/* Tombol Dinamis */}
      <button
        onClick={handleToggleArticles}
        className={`cursor-pointer w-full mt-16 py-4 rounded-2xl font-semibold text-[20px] md:text-[24px] transition-all active:scale-[0.98] border-2 shadow-sm
          ${
            visibleArticles.length >= maxArticles
              ? "bg-white border-[#C4714A] text-[#C4714A] hover:bg-[#FDF5F0]"
              : "bg-[#C4714A] border-[#C4714A] text-white hover:bg-[#b06d48]"
          }`}
      >
        {visibleArticles.length >= maxArticles
          ? "Lihat lebih sedikit"
          : "Lihat lebih banyak"}
      </button>
    </div>
  );
}
