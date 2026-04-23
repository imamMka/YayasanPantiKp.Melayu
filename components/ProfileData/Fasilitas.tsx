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
      <p className="text-[20px] md:text-[24px] font-semibold text-[#4A6B55] uppercase tracking-widest mb-2">
        Fasilitas
      </p>
      <h2 className="text-[48px] md:text-[64px] font-semibold text-[#2D2D2D] mb-4">
        Lingkungan yang layak untuk bertumbuh
      </h2>
      <p className="text-[#6E6E6E] text-[20px] md:text-[24px] mb-12 max-w-xl">
        Kami terus berupaya menyediakan fasilitas yang aman, bersih, dan
        mendukung perkembangan aspek kognitif anak-anak.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dataFasilitas.map((item, i) => (
          <div
            key={i}
            /* Menambahkan h-48 atau h-52 untuk menyamakan tinggi semua kartu */
            className="flex flex-row overflow-hidden bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow h-48 md:h-52"
          >
            {/* Bagian Gambar: h-full akan mengikuti tinggi kartu (h-48/52) */}
            <div className="flex-none w-32 md:w-56 h-full bg-gray-100">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Bagian Teks */}
            <div className="p-6 flex flex-col justify-center overflow-hidden">
              <h4 className="font-bold text-[18px] md:text-[22px] text-[#2D2D2D] mb-1 truncate">
                {item.title}
              </h4>
              <p className="text-[14px] md:text-[16px] text-[#6E6E6E] leading-snug line-clamp-3">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
