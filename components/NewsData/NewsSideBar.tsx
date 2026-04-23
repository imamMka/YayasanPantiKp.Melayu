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
          placeholder="Cari Pendidikan, Prestasi..." // Placeholder lebih informatif
          className="w-full border-2 border-[#E8E2D6] rounded-2xl px-5 py-4 text-[18px] md:text-[20px] text-[#2D2D2D] focus:outline-none focus:ring focus:ring-[#C4714A]/30 transition-all"
        />
        <button
          onClick={handleSearch}
          className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#C4714A] transition-colors cursor-pointer text-[20px]"
        >
          🔍
        </button>
      </div>

      {/* Categories */}
      <div className="bg-none p-8 rounded-2xl border-2 border-[#E8E2D6]">
        <h4 className="font-semibold text-[#2D2D2D] mb-6 text-[20px]">
          Kategori
        </h4>
        <div className="space-y-4">
          {kategori.map((item, index) => (
            <div
              key={item}
              className="flex justify-between items-center text-[#6E6E6E] cursor-pointer hover:text-[#C4714A] transition-colors text-[18px]"
            >
              <span>{item}</span>
              <span className="text-[#6E6E6E] bg-[#E8E2D6] px-3 py-1 rounded-full text-[14px] font-bold">
                {jumlahArtikel[index]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Popular News - Clickable to Preview */}
      <div className="bg-none p-8 rounded-2xl border-2 border-[#E8E2D6]">
        <h4 className="font-semibold text-[#2D2D2D] mb-6 text-[20px]">
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
              <div className="w-20 h-20 bg-gray-100 rounded-xl flex-none overflow-hidden border border-gray-100">
                <img
                  src={news.img}
                  alt={news.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div>
                <h5 className="text-[#6E6E6E] text-[16px] md:text-[18px] leading-snug font-medium group-hover:text-[#C4714A] transition-colors line-clamp-2">
                  {news.title}
                </h5>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA Card */}
      <div className="bg-[#F4DEC3] border-2 border-[#C4714A] p-8 rounded-2xl text-center">
        <p className="text-[18px] md:text-[20px] text-[#2D2D2D] mb-6 leading-relaxed font-medium">
          Tergerak oleh cerita ini? Mari bantu kami menghadirkan lebih banyak
          senyum.
        </p>
        <Link
          href="/donation"
          className="text-[18px] md:text-[20px] bg-[#C4714A] text-white px-8 py-4 rounded-2xl font-semibold hover:bg-[#a66a48] transition-all transform hover:scale-105 cursor-pointer shadow-lg"
        >
          Donasi Sekarang
        </Link>
      </div>
    </div>
  );
}
