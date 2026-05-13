const dataFasilitas = [
  {
    title: "Asrama & Kamar Tidur",
    desc: "Kamar yang bersih dan nyaman dengan sirkulasi udara baik.",
    img: "/asrama.jpg",
  },
  {
    title: "Dapur & Ruang Makan",
    desc: "Dapur bersih dengan peralatan memasak standar kesehatan.",
    img: "/dapur.jpg",
  },
  {
    title: "Ruang Belajar",
    desc: "Fasilitas belajar yang tenang, nyaman, dan edukatif.",
    img: "/kelas.jpg",
  },
  {
    title: "Area Bermain & Olahraga",
    desc: "Halaman luas untuk aktivitas fisik dan hobi anak-anak.",
    img: "/bermain.jpg",
  },
  {
    title: "Lab Komputer",
    desc: "Akses teknologi untuk menunjang edukasi digital anak.",
    img: "/lab.jpg",
  },
  {
    title: "Ruang Ibadah",
    desc: "Musholla dalam area panti untuk pembinaan spiritual.",
    img: "/musholla.jpg",
  },
];

export default function Fasilitas() {
  return (
    <section id="fasilitas" className="container mx-auto px-6 py-20">
      <p className="text-[14px] md:text-[18px] font-black text-emerald-600 uppercase tracking-[0.25em] mb-4">
        Fasilitas Panti
      </p>
      <h2 className="text-[36px] sm:text-[48px] md:text-[64px] font-black text-slate-900 leading-[1.1] mb-6">
        Lingkungan yang Layak <br className="hidden md:block" /> Untuk Bertumbuh
      </h2>
      <p className="text-slate-500 text-[18px] md:text-[22px] mb-12 max-w-2xl leading-relaxed">
        Kami terus berupaya menyediakan fasilitas yang aman, bersih, dan
        mendukung perkembangan aspek kognitif anak-anak.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {dataFasilitas.map((item, i) => (
          <div
            key={i}
            className="flex flex-row overflow-hidden bg-white border border-slate-100 rounded-[2rem] shadow-sm hover:shadow-xl transition-all h-48 md:h-56 group"
          >
            <div className="flex-none w-32 md:w-64 h-full bg-slate-100 overflow-hidden">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>

            <div className="p-6 md:p-8 flex flex-col justify-center overflow-hidden">
              <h4 className="font-black text-[20px] md:text-[26px] text-slate-900 mb-2 truncate">
                {item.title}
              </h4>
              <p className="text-[14px] md:text-[18px] text-slate-500 font-medium leading-relaxed line-clamp-3">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
