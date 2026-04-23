const kategori = ["Pendidikan", "Kesehatan", "Prestasi", "Penyaluran Dana"];
const jumlahArtikel = ["2", "5", "3", "4"];

// Menyesuaikan data popularNews agar memiliki teks dan path gambar
const popularNews = [
  {
    title: "Dito raih juara 1 olimpiade matematika",
    img: "/panti.jpg",
  },
  {
    title: "Sari lulus SNBT beasiswa penuh",
    img: "/panti.jpg",
  },
  {
    title: "Program Bimbel Gratis",
    img: "/panti.jpg",
  },
];

export default function NewsSidebar() {
  return (
    <div className="space-y-8 ">
      {/* Search */}
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Cari Artikel..."
          className="w-full border-2 border-[#E8E2D6] rounded-2xl px-5 py-4 text-[18px] md:text-[20px] text-[#2D2D2D] focus:outline-none focus:ring focus:ring-[#E8E2D6]"
        />
        <span className="absolute right-5 top-4 text-gray-400 text-[20px]">
          🔍
        </span>
      </div>

      {/* Categories */}
      <div className="bg-none p-8 rounded-2xl border-2 border-[#E8E2D6]">
        <h4 className="font-semibold text-[#2D2D2D] mb-6 text-[20px]">
          Kategori
        </h4>
        <div className="space-y-4">
          {kategori.map((item, index) => (
            <div
              key={item}
              className="flex justify-between items-center text-[#6E6E6E] cursor-pointer hover:text-[#C4714A] transition-colors text-[18px]"
            >
              <span>{item}</span>
              <span className="text-[#6E6E6E] bg-[#E8E2D6] px-3 py-1 rounded-full text-[14px] font-bold">
                {jumlahArtikel[index]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Popular News */}
      <div className="bg-none p-8 rounded-2xl border-2 border-[#E8E2D6]">
        <h4 className="font-semibold text-[#2D2D2D] mb-6 text-[20px]">
          Artikel Populer
        </h4>
        <div className="space-y-6">
          {popularNews.map((news, index) => (
            <div
              key={index}
              className="flex gap-4 group cursor-pointer items-center"
            >
              {/* Box Gambar Populer */}
              <div className="w-20 h-20 bg-gray-100 rounded-xl flex-none overflow-hidden border border-gray-100">
                <img
                  src={news.img}
                  alt={news.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div>
                <h5 className="text-[#6E6E6E] text-[16px] md:text-[18px] leading-snug font-medium group-hover:text-[#C4714A] transition-colors line-clamp-2">
                  {news.title}
                </h5>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Card */}
      <div className="bg-[#F4DEC3] border-2 border-[#C4714A] p-8 rounded-2xl text-center">
        <p className="text-[18px] md:text-[20px] text-[#2D2D2D] mb-6 leading-relaxed font-medium">
          Tergerak oleh cerita ini? Mari bantu kami menghadirkan lebih banyak
          senyum.
        </p>
        <button className="w-full bg-[#C4714A] text-white py-3 rounded-2xl font-bold text-[18px] hover:bg-[#b06d48] transition-colors tracking-wide">
          Donasi Sekarang
        </button>
      </div>
    </div>
  );
}
