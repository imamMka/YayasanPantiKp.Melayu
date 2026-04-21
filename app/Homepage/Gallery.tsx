import React from "react";

interface GalleryItem {
  id: number;
  imageUrl: string;
  alt: string;
}

const galleryData: GalleryItem[] = [
  { id: 1, imageUrl: "/images/gallery-1.jpg", alt: "Kegiatan Belajar" },
  { id: 2, imageUrl: "/images/gallery-2.jpg", alt: "Bermain Bersama" },
  { id: 3, imageUrl: "/images/gallery-3.jpg", alt: "Pemeriksaan Kesehatan" },
  { id: 4, imageUrl: "/images/gallery-4.jpg", alt: "Makan Bersama" },
];

const Gallery: React.FC = () => {
  return (
    <section className="container mx-auto px-6 py-16">
      {/* Header Section */}
      <div className="flex justify-between items-end mb-8">
        <h2 className="text-3xl font-bold text-[#2D3E33]">Galeri Kegiatan</h2>
        <a
          href="#"
          className="text-orange-600 text-sm font-semibold hover:underline flex items-center gap-1"
        >
          Selengkapnya
          <span className="text-lg">›</span>
        </a>
      </div>

      {/* Grid Gallery */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {galleryData.map((item, index) => (
          <div
            key={item.id}
            className="relative group overflow-hidden rounded-xl aspect-[4/3] bg-gray-200"
          >
            {/* Placeholder Image - Ganti src dengan path asli nanti */}
            <div className="w-full h-full bg-slate-300 transition-transform duration-500 group-hover:scale-110 flex items-center justify-center text-slate-400">
              <span className="text-xs">Foto {item.id}</span>
            </div>

            {/* Overlay khusus untuk item terakhir (sesuai desain ada angka +45) */}
            {index === galleryData.length - 1 && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">+45</span>
              </div>
            )}

            {/* Hover Overlay Efek */}
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
