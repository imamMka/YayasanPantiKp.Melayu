export default function ProfileHero() {
  return (
    <section className="container mx-auto px-6 py-16">
      <p className="text-[#C58058] font-bold tracking-widest text-[10px] uppercase mb-4">
        Tentang Kami
      </p>
      <h1 className="text-4xl md:text-5xl font-bold text-[#2D3E33] leading-tight mb-6 max-w-2xl">
        Mengenal Panti Asuhan Kampung Melayu
      </h1>
      <p className="text-gray-600 max-w-2xl mb-10 leading-relaxed">
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
            className={`px-6 py-2 rounded-full text-xs font-medium border transition-all ${i === 0 ? "bg-[#D1E7D6] border-[#B8D8BF] text-[#2D3E33]" : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"}`}
          >
            {item}
          </button>
        ))}
      </div>
    </section>
  );
}
