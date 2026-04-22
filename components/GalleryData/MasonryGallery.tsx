"use client"; // Pastikan ada directive ini jika menggunakan Next.js App Router

import { useState } from "react";
import Link from "next/link";

const GALLERY_IMAGES = [
  { id: "kegiatan-belajar-1", height: "h-96" },
  { id: "bermain-bola", height: "h-64" },
  { id: "makan-bersama", height: "h-80" },
  { id: "sholat-berjamaah", height: "h-64" },
  { id: "kunjungan-donatur", height: "h-96" },
  { id: "belajar-komputer", height: "h-80" },
  { id: "bermain-di-taman", height: "h-64" },
  { id: "acara-keluarga", height: "h-96" },
  { id: "kegiatan-seni", height: "h-80" },
  { id: "bermain-musik", height: "h-64" },
  { id: "kegiatan-outdoor", height: "h-96" },
  { id: "acara-pesta", height: "h-80" },
  { id: "kegiatan-sosial", height: "h-64" },
  { id: "bermain-di-pantai", height: "h-96" },
];

export default function MasonryGallery() {
  // 1. Inisialisasi state, default adalah 'grid'
  const [viewMode, setViewMode] = useState("grid");

  return (
    <section className="py-10">
      <div className="flex flex-col justify-start items-start md:flex-row md:justify-between md:items-end mb-10">
        <h2 className="text-[48px] md:text-[68px] font-semibold text-[#2D2D2D]">
          Menampilkan {GALLERY_IMAGES.length} foto
        </h2>

        <div className="flex gap-2">
          {/* Button Masonry Grid */}
          <button
            onClick={() => setViewMode("grid")}
            className={`p-3 rounded-lg transition-colors ${
              viewMode === "grid"
                ? "bg-[#C58058] text-white"
                : "bg-white border border-gray-100 text-gray-400"
            }`}
          >
            <div className="grid grid-cols-2 gap-1 md:w-10 md:h-10 w-8 h-8 justify-center">
              {[1, 2, 3, 4].map((x) => (
                <div
                  key={x}
                  className={`rounded-[1px] ${viewMode === "grid" ? "bg-white/80" : "bg-gray-300"}`}
                />
              ))}
            </div>
          </button>

          {/* Button List/Rows */}
          <button
            onClick={() => setViewMode("list")}
            className={`p-3 rounded-lg transition-colors ${
              viewMode === "list"
                ? "bg-[#C58058] text-white"
                : "bg-white border border-gray-100 text-gray-400"
            }`}
          >
            <div className="flex flex-col gap-1 md:w-10 md:h-10 w-8 h-8  justify-center">
              {[1, 2, 3].map((x) => (
                <div
                  key={x}
                  className={`h-[2px] w-full ${viewMode === "list" ? "bg-white/80" : "bg-gray-300"}`}
                />
              ))}
            </div>
          </button>
        </div>
      </div>

      {/* 2. Kondisional Class Name berdasarkan viewMode */}
      <div
        className={
          viewMode === "grid"
            ? "columns-2 md:columns-3 gap-6 space-y-6"
            : "flex flex-col gap-6"
        }
      >
        {GALLERY_IMAGES.map((item) => (
          <div key={item.id} className="break-inside-avoid">
            <Link
              href={`/gallery/preview/${item.id}`}
              className="relative block overflow-hidden rounded-2xl group"
            >
              {/* Jika mode List, kita paksa height-nya konsisten (misal h-64) agar tidak terlalu panjang */}
              <div
                className={`w-full transition-transform duration-500 group-hover:scale-105 bg-gray-200 ${
                  viewMode === "grid" ? item.height : "h-64"
                }`}
              />
            </Link>
          </div>
        ))}
      </div>

      <button className="cursor-pointer w-full mt-16 py-4 bg-[#C4714A] text-white rounded-2xl font-semibold text-[20px] md:text-[24px] hover:bg-[#b06d48] transition-colors">
        Lihat lebih banyak
      </button>
    </section>
  );
}
