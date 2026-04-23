// app/gallery/preview/[id]/page.tsx
import Link from "next/link";

const GALLERY_IMAGES = [
  { id: "kegiatan-belajar-1", src: "/panti.jpg" },
  { id: "bermain-bola", src: "/bermain.jpg" },
  { id: "asrama-putra", src: "/asrama.jpg" },
  { id: "kunjungan-donatur", src: "/panti-3.jpg" },
  { id: "makan-bersama", src: "/panti-2.jpg" },
  { id: "belajar-komputer", src: "/panti-4.jpg" },
  { id: "kegiatan-seni", src: "/asrama.jpg" },
  { id: "bermain-di-taman", src: "/bermain.jpg" },
  { id: "bermain-musik", src: "/panti-2.jpg" },
  { id: "acara-keluarga", src: "/panti-4.jpg" },
  { id: "kegiatan-outdoor", src: "/panti.jpg" },
  { id: "kegiatan-sosial", src: "/panti-3.jpg" },
];

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function GalleryDetailPage({ params }: PageProps) {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);
  const imageData = GALLERY_IMAGES.find((item) => item.id === decodedId);

  if (!imageData) {
    return (
      <main className="bg-white min-h-screen flex items-center justify-center">
        <Link href="/gallery" className="text-[#C4714A] font-bold underline">
          Kembali ke Galeri
        </Link>
      </main>
    );
  }

  return (
    <main className="bg-[#F8F9FA] min-h-screen p-6 md:p-12 lg:p-20">
      {/* Container Utama: 
          - mt-20: Memberi jarak agar tidak tertutup navbar mobile 
          - items-start: Menjaga tombol dan card tetap rata kiri
          - justify-between: Memberi ruang maksimal antar elemen jika tinggi ditentukan
      */}
      <div className="max-w-5xl mx-auto flex flex-col items-start justify-between min-h-[80vh] mt-20 md:mt-0 gap-8">
        {/* Tombol Close (Sekarang di dalam Flex) */}
        <Link
          href="/gallery"
          className="flex items-center gap-3 bg-white p-3 px-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group"
        >
          <span className="text-xl font-bold text-[#C4714A] group-hover:rotate-90 transition-transform duration-300">
            ✕
          </span>
          <span className="font-bold text-[#2D2D2D] tracking-widest text-sm">
            CLOSE
          </span>
        </Link>

        {/* Card Foto */}
        <div className="w-full bg-white rounded-[2.5rem] overflow-hidden shadow-2xl shadow-gray-200/50 border border-white">
          <div className="w-full relative aspect-[4/5] md:aspect-video lg:aspect-[16/10]">
            <img
              src={imageData.src}
              alt={decodedId}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 md:p-12">
              <span className="inline-block bg-[#C4714A] text-white text-[10px] md:text-[12px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4">
                Dokumentasi Kegiatan
              </span>
              <h1 className="text-white text-3xl md:text-5xl font-bold capitalize leading-tight">
                {decodedId.replace(/-/g, " ")}
              </h1>
            </div>
          </div>
        </div>

        {/* Info Bawah (Tetap di dalam Flex Col) */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 text-[#6E6E6E] pt-4">
          <p className="font-medium text-sm">
            © 2026 Yayasan Panti Asuhan Kampung Melayu
          </p>
          <div className="flex gap-8 font-bold text-xs uppercase tracking-widest">
            <button className="hover:text-[#C4714A] transition-colors">
              Bagikan
            </button>
            <button className="hover:text-[#C4714A] transition-colors">
              Simpan Gambar
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
