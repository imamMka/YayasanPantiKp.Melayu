import React from "react";

interface GalleryItem {
  id: number;
  imageUrl: string;
  alt: string;
}

const galleryData: GalleryItem[] = [
  { id: 1, imageUrl: "/panti-2.jpg", alt: "Kegiatan Belajar" },
  { id: 2, imageUrl: "/panti-2.jpg", alt: "Bermain Bersama" },
  { id: 3, imageUrl: "/panti-2.jpg", alt: "Pemeriksaan Kesehatan" },
  { id: 4, imageUrl: "/panti.jpg", alt: "Makan Bersama" },
];

const Gallery: React.FC = () => {
  return (
    <section className="container mx-auto px-6 py-16">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h2 className="text-[40px] md:text-[56px] font-semibold text-[#2D2D2D] leading-tight">
          Galeri Kegiatan
        </h2>
        <a
          href="#"
          className="text-[#C4714A] text-[18px] md:text-[22px] font-semibold hover:underline flex items-center gap-1 mt-4 md:mt-0"
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
            className="relative group overflow-hidden rounded-2xl aspect-[4/3] bg-gray-100 shadow-sm"
          >
            {/* Mengganti Div dengan Tag Img */}
            <img
              src="/panti.jpg" // Ganti ke "/panti-2.jpg" jika filenya berbeda
              alt={item.alt}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Overlay khusus untuk item terakhir */}
            {index === galleryData.length - 1 && (
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center transition-colors group-hover:bg-black/40">
                <span className="text-white text-3xl md:text-4xl font-bold">
                  +45
                </span>
                <span className="text-white/80 text-sm md:text-base font-medium">
                  Foto Lainnya
                </span>
              </div>
            )}

            {/* Hover Overlay Efek untuk item selain yang terakhir agar lebih manis */}
            {index !== galleryData.length - 1 && (
              <div className="absolute inset-0 bg-[#4A6B55]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
