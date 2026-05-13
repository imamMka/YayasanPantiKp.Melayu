"use client";
import { useState } from "react";
import Link from "next/link";

const kategori = ["Pendidikan", "Kesehatan", "Prestasi", "Penyaluran Dana"];
const jumlahArtikel = ["2", "5", "3", "4"];

// 1. Tambahkan properti slug agar link berfungsi
const popularNews = [
  {
    title: "Dito raih juara 1 olimpiade matematika",
    img: "/panti.jpg",
    slug: "dito-podium-olimpiade", // Sesuaikan dengan slug di NewsGrid
  },
  {
    title: "Sari lulus SNBT beasiswa penuh",
    img: "/panti.jpg",
    slug: "sari-lulus-snbt",
  },
  {
    title: "Program Bimbel Gratis",
    img: "/panti.jpg",
    slug: "program-bimbel-gratis",
  },
];

export default function NewsSidebar() {
  const [searchTerm, setSearchTerm] = useState("");

  // Fungsi untuk menangani pencarian
  const handleSearch = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement>,
  ) => {
    // Mengecek apakah event berasal dari tombol keyboard Enter atau klik mouse
    if ((e as React.KeyboardEvent).key === "Enter" || e.type === "click") {
      if (searchTerm.trim() !== "") {
        alert(`Mencari artikel dengan kata kunci: ${searchTerm}`);
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Search Bar Berfungsi */}
      <div className="relative flex items-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchTerm(e.target.value)
          }
          onKeyDown={handleSearch}
          placeholder="Cari berita..." // Placeholder lebih informatif
          className="w-full border-2 border-slate-100 rounded-2xl px-5 py-4 text-[18px] md:text-[20px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all bg-slate-50"
        />
        <button
          onClick={handleSearch}
          className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-600 transition-colors cursor-pointer text-[20px]"
        >
          🔍
        </button>
      </div>

      {/* Categories */}
      <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
        <h4 className="font-black text-slate-900 mb-6 text-[20px] uppercase tracking-wider">
          Kategori
        </h4>
        <div className="space-y-4">
          {kategori.map((item, index) => (
            <div
              key={item}
              className="flex justify-between items-center text-slate-600 cursor-pointer hover:text-emerald-600 transition-colors text-[18px] group"
            >
              <span className="font-medium">{item}</span>
              <span className="text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full text-[14px] font-bold group-hover:bg-emerald-100 transition-colors">
                {jumlahArtikel[index]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Popular News - Clickable to Preview */}
      <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
        <h4 className="font-black text-slate-900 mb-6 text-[20px] uppercase tracking-wider">
          Artikel Populer
        </h4>
        <div className="space-y-6">
          {popularNews.map((news, index) => (
            <Link
              href={`/news/preview/${news.slug}`} // Navigasi ke page preview
              key={index}
              className="flex gap-4 group cursor-pointer items-center"
            >
              {/* Box Gambar Populer */}
              <div className="w-20 h-20 bg-slate-100 rounded-2xl flex-none overflow-hidden border border-slate-100">
                <img
                  src={news.img}
                  alt={news.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div>
                <h5 className="text-slate-600 text-[16px] md:text-[18px] leading-snug font-bold group-hover:text-emerald-600 transition-colors line-clamp-2">
                  {news.title}
                </h5>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA Card */}
      <div className="bg-slate-950 p-10 rounded-[2.5rem] text-center relative overflow-hidden group border border-white/5">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl transition-transform duration-1000 group-hover:scale-150" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl transition-transform duration-1000 group-hover:scale-150" />
        
        <p className="text-[18px] md:text-[22px] text-white mb-8 leading-relaxed font-bold relative z-10">
          Tergerak oleh cerita ini? <br/> Mari bantu kami menghadirkan senyum.
        </p>
        <Link
          href="/donation"
          className="relative z-10 inline-flex items-center justify-center w-full bg-amber-600 text-white px-8 py-4 rounded-2xl font-black text-[18px] hover:bg-amber-700 transition-all transform hover:scale-105 shadow-xl shadow-amber-900/40 active:scale-95"
        >
          Donasi Sekarang
        </Link>
      </div>
    </div>
  );
}
