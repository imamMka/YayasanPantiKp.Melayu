"use client";

import { useState } from "react";
import Link from "next/link";

const GALLERY_IMAGES = [
  // Urutan tinggi diacak (h-96, h-64, h-80) agar efek masonry langsung muncul
  { id: "kegiatan-belajar-1", height: "h-96", src: "/panti.jpg" },
  { id: "bermain-bola", height: "h-64", src: "/bermain.jpg" },
  { id: "asrama-putra", height: "h-80", src: "/asrama.jpg" },
  { id: "kunjungan-donatur", height: "h-96", src: "/panti-3.jpg" },
  { id: "makan-bersama", height: "h-64", src: "/panti-2.jpg" },
  { id: "belajar-komputer", height: "h-80", src: "/panti-4.jpg" },
  { id: "kegiatan-seni", height: "h-96", src: "/asrama.jpg" },
  { id: "bermain-di-taman", height: "h-64", src: "/bermain.jpg" },
  { id: "bermain-musik", height: "h-80", src: "/panti-2.jpg" },
  { id: "acara-keluarga", height: "h-96", src: "/panti-4.jpg" },
  { id: "kegiatan-outdoor", height: "h-64", src: "/panti.jpg" },
  { id: "kegiatan-sosial", height: "h-80", src: "/panti-3.jpg" },
];

export default function MasonryGallery() {
  const [viewMode, setViewMode] = useState("grid");

  return (
    <section className="py-10">
      {/* Header Section */}
      <div className="flex flex-col justify-start items-start md:flex-row md:justify-between md:items-end mb-12 gap-6">
        <div>
          <p className="text-[#4A6B55] font-bold uppercase tracking-widest mb-2">
            Galeri Foto
          </p>
          <h2 className="text-[40px] md:text-[60px] font-semibold text-[#2D2D2D] leading-tight">
            Menampilkan {GALLERY_IMAGES.length} foto
          </h2>
        </div>

        {/* Toggle Buttons */}
        <div className="flex gap-2 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-3 rounded-xl transition-all ${
              viewMode === "grid"
                ? "bg-[#C4714A] text-white shadow-md"
                : "bg-transparent text-gray-400 hover:bg-gray-50"
            }`}
          >
            <div className="grid grid-cols-2 gap-1 w-5 h-5">
              {[1, 2, 3, 4].map((x) => (
                <div
                  key={x}
                  className={`rounded-[1px] ${viewMode === "grid" ? "bg-white" : "bg-gray-300"}`}
                />
              ))}
            </div>
          </button>

          <button
            onClick={() => setViewMode("list")}
            className={`p-3 rounded-xl transition-all ${
              viewMode === "list"
                ? "bg-[#C4714A] text-white shadow-md"
                : "bg-transparent text-gray-400 hover:bg-gray-50"
            }`}
          >
            <div className="flex flex-col gap-1 w-5 h-5 justify-center">
              {[1, 2, 3].map((x) => (
                <div
                  key={x}
                  className={`h-[2px] w-full rounded-full ${viewMode === "list" ? "bg-white" : "bg-gray-300"}`}
                />
              ))}
            </div>
          </button>
        </div>
      </div>

      {/* Masonry Container */}
      <div
        className={
          viewMode === "grid"
            ? "columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6"
            : "flex flex-col gap-10"
        }
      >
        {GALLERY_IMAGES.map((item) => (
          <div key={item.id} className="break-inside-avoid">
            <Link
              href={`/gallery/preview/${item.id}`}
              className="relative block overflow-hidden rounded-[2rem] group shadow-sm hover:shadow-2xl transition-all duration-500"
            >
              <div
                className={`w-full relative transition-transform duration-700 group-hover:scale-110 ${
                  viewMode === "grid" ? item.height : "h-[450px] md:h-[600px]"
                }`}
              >
                <img
                  src={item.src}
                  alt={item.id}
                  className="w-full h-full object-cover"
                />

                {/* Pinterest Style Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                  <p className="text-white font-semibold text-xl capitalize translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {item.id.replace(/-/g, " ")}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <button className="w-full mt-20 py-5 bg-[#C4714A] text-white rounded-[2rem] font-bold text-[20px] hover:bg-[#b06d48] transition-all hover:shadow-xl active:scale-[0.98]">
        Lihat Lebih Banyak Foto
      </button>
    </section>
  );
}
