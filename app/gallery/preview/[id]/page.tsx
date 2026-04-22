// app/gallery/preview/[id]/page.tsx
import Link from "next/link";

// Definisikan tipe datanya supaya tidak merah/error
interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function GalleryDetailPage({ params }: PageProps) {
  // 1. WAJIB di-await sebelum variabel id dipanggil
  const { id } = await params;

  // Decode ID jika ada karakter aneh (seperti %20 untuk spasi)
  const decodedId = decodeURIComponent(id);

  return (
    <main className="bg-[#1a1a1a] min-h-screen flex flex-col items-center justify-center p-6 md:p-20 relative">
      {/* Tombol Close di pojok kiri atas */}
      <Link
        href="/gallery"
        className="absolute top-6 left-6 md:top-10 md:left-10 font-bold text-[#C58058] hover:text-white transition-colors flex items-center gap-2 z-20"
      >
        <span className="text-2xl">✕</span> CLOSE
      </Link>

      <div className="max-w-6xl w-full z-10">
        {/* Container Foto (Placeholder) */}
        <div className="aspect-video bg-[#2d2d2d] rounded-3xl flex flex-col items-center justify-center border border-white/10 shadow-2xl overflow-hidden relative group">
          {/* Judul Foto berdasarkan ID */}
          <h2 className="text-white text-xl md:text-3xl font-semibold capitalize opacity-80 group-hover:opacity-100 transition-opacity">
            Preview: {decodedId.replace(/-/g, " ")}
          </h2>

          <p className="text-gray-500 mt-4 text-sm md:text-base">
            ID Database: {id}
          </p>

          {/* Overlay hiasan biar gak sepi */}
          <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center">
            <span className="text-white/20 text-xs tracking-widest uppercase">
              Panti Asuhan Kp. Melayu - Gallery
            </span>
          </div>
        </div>

        {/* Info Tambahan di bawah foto */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-lg italic">
            "Dokumentasi kegiatan anak-anak asuh Panti Asuhan Kampung Melayu."
          </p>
        </div>
      </div>

      {/* Background Decor (Opsional biar cakep) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#2d2d2d] via-[#1a1a1a] to-[#1a1a1a] -z-0" />
    </main>
  );
}
