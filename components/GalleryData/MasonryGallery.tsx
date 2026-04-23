"use client";

import { useState } from "react";
import Link from "next/link";

const INITIAL_IMAGES = [
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
  // State untuk menentukan berapa kali data diulang
  const [displayCount, setDisplayCount] = useState(1);
  const maxRepeats = 3;

  // Membuat array baru berdasarkan jumlah pengulangan
  // Kita tambahkan index pada ID agar key React tetap unik
  const currentImages = Array.from({ length: displayCount }).flatMap((_, i) =>
    INITIAL_IMAGES.map((img) => ({
      ...img,
      uniqueId: `${img.id}-${i}`,
    })),
  );

  const handleLoadMore = () => {
    if (displayCount < maxRepeats) {
      setDisplayCount((prev) => prev + 1);
    } else {
      // Reset kembali ke awal
      setDisplayCount(1);
      // Optional: Scroll kembali ke atas galeri saat "Lihat Lebih Sedikit"
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <section className="py-10">
      {/* Header Section */}
      <div className="flex flex-col justify-start items-start md:flex-row md:justify-between md:items-end mb-12 gap-6">
        <div>
          <p className="text-[#4A6B55] font-bold uppercase tracking-widest mb-2">
            Galeri Foto
          </p>
          <h2 className="text-[40px] md:text-[60px] font-semibold text-[#2D2D2D] leading-tight">
            Menampilkan {currentImages.length} foto
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
        {currentImages.map((item) => (
          <div key={item.uniqueId} className="break-inside-avoid">
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

      {/* Dynamic Load More / Less Button */}
      <div className="flex justify-center mt-20">
        <button
          onClick={handleLoadMore}
          className={`group flex items-center gap-3 px-10 py-5 rounded-2xl font-bold text-[20px] transition-all hover:shadow-xl active:scale-[0.98] ${
            displayCount < maxRepeats
              ? "bg-[#C4714A] text-white hover:bg-[#b06d48]"
              : "bg-white border-2 border-[#C4714A] text-[#C4714A] hover:bg-[#C4714A]/5"
          }`}
        >
          {displayCount < maxRepeats ? (
            <>
              <span>Lihat Lebih Banyak Foto</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 group-hover:translate-y-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </>
          ) : (
            <>
              <span>Lihat Lebih Sedikit Foto</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 group-hover:-translate-y-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </>
          )}
        </button>
      </div>
    </section>
  );
}
