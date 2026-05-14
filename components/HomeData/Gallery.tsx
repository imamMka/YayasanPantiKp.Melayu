import React from "react";
import Link from "next/link";
import { Gallery as GalleryType } from "@prisma/client";

interface GalleryProps {
  items?: GalleryType[];
  totalCount?: number;
}

const Gallery: React.FC<GalleryProps> = ({ items = [], totalCount = 0 }) => {
  return (
    <section className="container mx-auto px-6 py-16">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h2 className="text-[40px] md:text-[56px] font-semibold text-slate-900 leading-tight">
          Galeri Kegiatan
        </h2>
        <Link
          href="/gallery"
          className="text-amber-600 text-[18px] md:text-[22px] font-semibold hover:underline flex items-center gap-1 mt-4 md:mt-0"
        >
          Selengkapnya
          <span className="text-lg">›</span>
        </Link>
      </div>

      {/* Grid Gallery */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((item, index) => {
          const imageUrl = item.imageUrl.includes('r2.dev') 
            ? `/api/images/${item.imageUrl.split('r2.dev/').pop()}` 
            : item.imageUrl;

          return (
            <Link
              key={item.id}
              href={`/gallery/preview/${item.id}`}
              className="relative group overflow-hidden rounded-2xl aspect-[4/3] bg-gray-100 shadow-sm"
            >
              <img
                src={imageUrl}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay khusus untuk item terakhir jika masih banyak foto */}
              {index === items.length - 1 && totalCount > items.length && (
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center transition-colors group-hover:bg-black/40">
                  <span className="text-white text-3xl md:text-4xl font-bold">
                    +{totalCount - items.length}
                  </span>
                  <span className="text-white/80 text-sm md:text-base font-medium">
                    Foto Lainnya
                  </span>
                </div>
              )}

              {/* Hover Overlay Efek */}
              {!(index === items.length - 1 && totalCount > items.length) && (
                <div className="absolute inset-0 bg-emerald-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              )}
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Gallery;
