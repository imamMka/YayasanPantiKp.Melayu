export default function ProfileHero() {
  return (
    /* 1. Background Image penuh layar dengan overlay agar teks kontras */
    <section className="relative w-full min-h-[60vh] md:min-h-[80vh] flex items-center bg-[url('/panti-4.jpg')] bg-cover bg-center">
      {/* 2. Overlay: Menggunakan gradasi hitam ke transparan agar teks di kiri sangat jelas */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>

      {/* 3. Konten tetap dalam container agar sejajar dengan bagian lain */}
      <div className="container mx-auto px-6 py-20 relative z-10">
        <p className="text-[#A7D1B5] font-semibold tracking-widest text-[18px] md:text-[24px] uppercase mb-4 drop-shadow-md">
          Tentang Kami
        </p>

        <h1 className="text-[32px] md:text-[64px] font-bold text-white leading-tight mb-6 max-w-4xl drop-shadow-lg">
          Mengenal Panti Asuhan <br className="hidden md:block" />
          <span className="text-[#C3F4D5]">Kampung Melayu</span>
        </h1>

        <p className="text-gray-200 text-[18px] md:text-[24px] max-w-2xl mb-12 leading-relaxed drop-shadow-md">
          Berdiri sejak 2012, kami berkomitmen menjadi rumah bagi anak-anak
          untuk tumbuh, mendapatkan pendidikan, kesehatan, dan kasih sayang yang
          layak.
        </p>

        <div className="flex flex-wrap gap-4">
          {[
            "Struktur Organisasi",
            "Fasilitas",
            "Legalitas",
            "Kontak & Lokasi",
          ].map((item, i) => (
            <button
              key={i}
              className={`px-8 py-3 rounded-full text-[16px] md:text-[20px] font-medium transition-all border-2 
                ${
                  i === 0
                    ? "bg-[#C3F4D5] border-[#E8E2D6] text-[#2D3E33] shadow-lg scale-105"
                    : "bg-white/10 backdrop-blur-md border-white/50 text-white hover:bg-[#C3F4D5] hover:border-[#C3F4D5] hover:text-[#2D3E33]"
                }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
