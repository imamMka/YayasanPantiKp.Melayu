const kategori = ["Pendidikan", "Kesehatan", "Prestasi", "Penyaluran Dana"];

const jumlahArtikel = ["2", "5", "3", "4"];

const popularNews = [
  "Dito raih juara 1 olimpiade matematika",
  "Sari lulus SNBT beasiswa penuh",
  "Program Bimbel Gratis",
];

export default function NewsSidebar() {
  return (
    <div className="space-y-8 ">
      {/* Search */}
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Cari Artikel..."
          className="w-full  border-2 border-[#E8E2D6] rounded-2xl px-5 py-4 text-[20px] md:text-[24px] text-[#2D2D2D] focus:outline-none focus:ring focus:ring-[#E8E2D6]"
        />
        <span className="absolute right-5 top-4 text-gray-400 text-[20px] md:text-[24px]">
          🔍
        </span>
      </div>

      {/* Categories */}
      <div className="bg-none p-8 text-[20px] md:text-[24px] rounded-2xl border-2 border-[#E8E2D6]">
        <h4 className="font-semibold text-[#6E6E6E] mb-6">Kategori</h4>
        <div className="space-y-4">
          {kategori.map((item, index) => (
            <div
              key={item}
              className="flex justify-between items-center text-[#6E6E6E] cursor-pointer hover:text-[#C4714A] transition-colors"
            >
              <span>{item}</span>
              <span className="text-[#6E6E6E] bg-[#E8E2D6] px-2 py-1 rounded-full text-[14px] font-bold">
                {jumlahArtikel[kategori.indexOf(item)]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Popular News */}
      <div className="bg-none p-8 text-[20px] md:text-[24px] rounded-2xl border-2 border-[#E8E2D6]">
        <h4 className="font-semibold text-[#2D2D2D] mb-6">Artikel Populer</h4>
        <div className="space-y-6">
          {popularNews.map((news, index) => (
            <div key={index} className="flex gap-4 group cursor-pointer">
              <div className="w-20 h-20 bg-gray-200 rounded-lg flex-none overflow-hidden" />
              <div>
                <h5 className="text-[#6E6E6E] leading-snug group-hover:text-orange-700 transition-colors">
                  {news}
                </h5>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Card */}
      <div className="bg-[#F4DEC3] border-2 border-[#C4714A] p-8 rounded-2xl text-center">
        <p className="text-[20px] md:text-[24px] text-[#6E6E6E] mb-6 leading-relaxed">
          Tergerak oleh cerita ini? Mari bantu kami menghadirkan lebih banyak
          senyum.
        </p>
        <button className="w-full bg-[#C4714A] text-white py-3 rounded-2xl font-semibold text-[20px] md:text-[24px tracking-widest">
          Donasi Sekarang
        </button>
      </div>
    </div>
  );
}
