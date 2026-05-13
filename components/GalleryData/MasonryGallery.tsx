"use client";

import { useState } from "react";

interface GalleryItem {
  id: number | string;
  title?: string;
  imageUrl: string;
}

interface MasonryGalleryProps {
  galleryItems?: GalleryItem[];
}

const INITIAL_IMAGES = [
  {
    id: "kegiatan-belajar-1",
    height: "h-96",
    src: "/panti.jpg",
    alt: "Kegiatan Belajar",
  },
  {
    id: "bermain-bola",
    height: "h-64",
    src: "/bermain.jpg",
    alt: "Bermain Bola",
  },
  {
    id: "asrama-putra",
    height: "h-80",
    src: "/asrama.jpg",
    alt: "Asrama Putra",
  },
  {
    id: "kunjungan-donatur",
    height: "h-96",
    src: "/panti-3.jpg",
    alt: "Kunjungan Donatur",
  },
  {
    id: "makan-bersama",
    height: "h-64",
    src: "/panti-2.jpg",
    alt: "Makan Bersama",
  },
  {
    id: "belajar-komputer",
    height: "h-80",
    src: "/panti-4.jpg",
    alt: "Belajar Komputer",
  },
];

export default function MasonryGallery({ galleryItems }: MasonryGalleryProps) {
  const [viewMode, setViewMode] = useState("grid");
  const [displayCount, setDisplayCount] = useState(1);
  const maxRepeats = 3;

  const DISPLAY_IMAGES = galleryItems?.length
    ? galleryItems.map((item) => ({
        id: String(item.id),
        src: item.imageUrl,
        alt: item.title || `Foto ${item.id}`,
        height: "h-80",
      }))
    : INITIAL_IMAGES;

  const currentImages = Array.from({ length: displayCount }).flatMap((_, i) =>
    DISPLAY_IMAGES.map((img) => ({
      ...img,
      uniqueId: `${img.id}-${i}`,
    })),
  );

  const handleLoadMore = () => {
    if (displayCount < maxRepeats) {
      setDisplayCount((prev) => prev + 1);
    } else {
      setDisplayCount(1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <section className="py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8">
        <div className="space-y-2">
          <p className="text-[#4A6B55] font-bold uppercase tracking-widest text-sm md:text-base">
            Koleksi Foto
          </p>
          <h2 className="text-[32px] sm:text-[40px] md:text-[56px] font-black text-slate-900 leading-tight">
            Menampilkan <span className="text-amber-600">{currentImages.length}</span> Foto
          </h2>
        </div>

        <div className="flex gap-2 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm self-start md:self-auto">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-3 rounded-xl transition-all ${
              viewMode === "grid"
                ? "bg-amber-600 text-white shadow-md"
                : "bg-transparent text-gray-400 hover:bg-gray-50"
            }`}
            title="Tampilan Grid"
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
                ? "bg-amber-600 text-white shadow-md"
                : "bg-transparent text-gray-400 hover:bg-gray-50"
            }`}
            title="Tampilan List"
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

      <div
        className={
          viewMode === "grid"
            ? "columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6"
            : "flex flex-col gap-8 md:gap-12"
        }
      >
        {currentImages.map((item) => (
          <div key={item.uniqueId} className="break-inside-avoid">
            <div className="relative block overflow-hidden rounded-[2.5rem] group shadow-sm hover:shadow-2xl transition-all duration-500 bg-slate-100">
              <div
                className={`w-full relative transition-transform duration-700 group-hover:scale-110 ${
                  viewMode === "grid" ? item.height : "h-[300px] sm:h-[450px] md:h-[600px]"
                }`}
              >
                <img
                  src={item.src.includes('r2.dev') ? `/api/images/${item.src.split('r2.dev/').pop()}` : item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 md:p-10">
                  <p className="text-white font-bold text-[18px] md:text-[22px] capitalize translate-y-4 group-hover:translate-y-0 transition-transform duration-300 leading-tight">
                    {item.alt}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-16 md:mt-24">
        <button
          onClick={handleLoadMore}
          className={`group flex items-center gap-4 px-10 py-5 rounded-2xl font-black text-[18px] md:text-[22px] transition-all hover:shadow-2xl active:scale-[0.98] w-full sm:w-auto justify-center ${
            displayCount < maxRepeats
              ? "bg-amber-600 text-white hover:bg-amber-700 shadow-xl shadow-amber-900/20"
              : "bg-white border-2 border-amber-600 text-amber-600 hover:bg-amber-50"
          }`}
        >
          {displayCount < maxRepeats ? (
            <>
              <span>Lihat Koleksi Lainnya</span>
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
                  strokeWidth={3}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </>
          ) : (
            <>
              <span>Kembali ke Atas</span>
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
                  strokeWidth={3}
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
