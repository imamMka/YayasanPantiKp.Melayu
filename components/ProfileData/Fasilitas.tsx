const dataFasilitas = [
  {
    title: "Asrama & Kamar Tidur",
    desc: "Kamar yang bersih dan nyaman dengan sirkulasi udara baik.",
    icon: "🏠",
  },
  {
    title: "Dapur & Ruang Makan",
    desc: "Dapur bersih dengan peralatan memasak standar kesehatan.",
    icon: "🍴",
  },
  {
    title: "Ruang Belajar",
    desc: "Fasilitas belajar yang tenang, nyaman, dan edukatif.",
    icon: "📖",
  },
  {
    title: "Area Bermain & Olahraga",
    desc: "Halaman luas untuk aktivitas fisik dan hobi anak-anak.",
    icon: "🏀",
  },
  {
    title: "Lab Komputer",
    desc: "Akses teknologi untuk menunjang edukasi digital anak.",
    icon: "💻",
  },
  {
    title: "Ruang Ibadah",
    desc: "Musholla dalam area panti untuk pembinaan spiritual.",
    icon: "🕌",
  },
];

export default function Fasilitas() {
  return (
    <section className="container mx-auto px-6 py-20">
      <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">
        Fasilitas
      </p>
      <h2 className="text-3xl font-bold text-[#2D3E33] mb-4">
        Lingkungan yang layak untuk bertumbuh
      </h2>
      <p className="text-gray-600 mb-12 max-w-xl">
        Kami terus berupaya menyediakan fasilitas yang aman, bersih, dan
        mendukung perkembangan aspek kognitif anak-anak.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dataFasilitas.map((item, i) => (
          <div
            key={i}
            className="flex gap-6 p-8 bg-white border border-gray-100 rounded-2xl"
          >
            <div className="text-3xl p-4 bg-orange-50 rounded-xl h-fit">
              {item.icon}
            </div>
            <div>
              <h4 className="font-bold text-[#2D3E33] mb-2">{item.title}</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
