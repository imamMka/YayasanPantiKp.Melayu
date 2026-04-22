export default function ProfileHero() {
  return (
    <section className="container mx-auto px-6 py-16">
      <p className="text-[#4A6B55] font-semibold tracking-widest text-[20px] md:text-[24px] uppercase mb-4">
        Tentang Kami
      </p>
      <h1 className="text-[24px] md:text-[64px] font-semibold text-[#2D2D2D] leading-tight mb-6 max-w-2xl">
        Mengenal Panti Asuhan Kampung Melayu
      </h1>
      <p className="text-[#6E6E6E] text-[20px] md:text-[24px] max-w-2xl mb-10 leading-relaxed">
        Berdiri sejak 2012, kami berkomitmen menjadi rumah bagi anak-anak untuk
        tumbuh, mendapatkan pendidikan, kesehatan, dan kasih sayang yang layak.
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
            className={`px-6 py-2 rounded-full text-xs text-[20px] md:text-[24px] border transition-all ${i === 0 ? "bg-[#C3F4D5] border-[#4A6B55] border-2 text-[#4A6B55]" : "bg-none border-[#4A6B55] border-2 text-[#6E6E6E] hover:bg-[#C3F4D5] hover:text-[#4A6B55]"}`}
          >
            {item}
          </button>
        ))}
      </div>
    </section>
  );
}
