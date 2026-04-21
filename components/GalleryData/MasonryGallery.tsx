import Link from "next/link";

// 1. Kita buat data dummy dulu untuk testing
const GALLERY_IMAGES = [
  { id: "kegiatan-belajar-1", height: "h-96" },
  { id: "bermain-bola", height: "h-64" },
  { id: "makan-bersama", height: "h-80" },
  { id: "sholat-berjamaah", height: "h-64" },
  { id: "kunjungan-donatur", height: "h-96" },
  { id: "belajar-komputer", height: "h-80" },
];

export default function MasonryGallery() {
  return (
    <section className="py-10">
      {/* Container Masonry menggunakan Column Tailwind */}
      <div className="columns-2 md:columns-3 gap-6 space-y-6">
        {GALLERY_IMAGES.map((item) => (
          <div key={item.id} className="break-inside-avoid">
            {/* 2. Link harus mengarah ke /Gallery/Preview/[id] */}
            <Link
              href={`/Gallery/preview/${item.id}`}
              className="relative block overflow-hidden rounded-2xl group"
            >
              {/* Placeholder Gambar */}
              <div
                className={`w-full ${item.height} bg-gray-200 group-hover:scale-105 transition-transform duration-500`}
              />

              {/* Overlay saat hover (Opsional agar cakep) */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <span className="text-white text-xs font-bold uppercase tracking-widest">
                  Lihat Foto
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
