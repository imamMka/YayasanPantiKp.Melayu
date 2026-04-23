import Link from "next/link";

interface ArticleCardProps {
  category: string;
  title: string;
  slug: string;
  desc?: string;
  date: string;
  image: string; // Tambahkan properti image
  isLarge?: boolean;
}

function ArticleCard({
  category,
  title,
  slug,
  desc,
  date,
  image, // Ambil dari props
  isLarge,
}: ArticleCardProps) {
  return (
    <Link
      href={`/news/preview/${slug}`}
      className={`group block cursor-pointer border-2 border-[#E8E2D6] rounded-2xl hover:bg-[#E8E2D6]/20 duration-500 transition-transform ${isLarge ? "mb-12" : ""}`}
    >
      {/* Bagian Gambar */}
      <div
        className={`bg-gray-200 rounded-t-2xl overflow-hidden ${isLarge ? "aspect-video" : "aspect-[4/3]"}`}
      >
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="flex flex-col items-start justify-between p-10">
        <span className="text-[14px] font-bold text-green-700 bg-green-100 px-2 py-1 rounded tracking-wider">
          {category}
        </span>

        <h3
          className={`font-bold text-[#2D3E33] mt-3 transition-colors ${isLarge ? "text-[32px]" : "text-[20px]"}`}
        >
          {title}
        </h3>

        {desc && (
          <p className="text-[#6E6E6E] text-[18px] md:text-[22px] mt-3 line-clamp-2 leading-relaxed">
            {desc}
          </p>
        )}

        <div className="w-full flex flex-row justify-between items-center mt-4 pt-4 border-t border-gray-100">
          <span className="text-[16px] md:text-[18px] text-[#6E6E6E] font-medium">
            {date} • Admin
          </span>
          <span className="text-[14px] md:text-[16px] font-bold text-[#C4714A] flex items-center gap-1 group-hover:gap-2 transition-all">
            Baca Selengkapnya{" "}
            <span className="text-[14px] md:text-[16px]">›</span>
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function NewsGrid() {
  return (
    <div>
      {/* Featured News */}
      <ArticleCard
        isLarge
        category="Pendidikan"
        slug="dito-podium-olimpiade"
        image="/panti.jpg" // Menggunakan panti.jpg
        title="Dito, dari panti asuhan ke podium olimpiade..."
        desc="Tidak ada yang menyangka anak pemalu..."
        date="28 Agustus 2026"
      />

      {/* Standard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
        <ArticleCard
          category="Kesehatan"
          slug="pemeriksaan-gizi-rutin"
          image="/panti.jpg"
          title="Pemeriksaan gizi rutin: 94% anak asuh..."
          date="26 Juli 2026"
        />
        <ArticleCard
          category="Penyaluran Dana"
          slug="laporan-dana-mei-2025"
          image="/panti.jpg"
          title="Laporan penyaluran dana Mei 2025..."
          date="26 Juli 2026"
        />
        <ArticleCard
          category="Donasi"
          slug="sari-lulus-snbt"
          image="/panti.jpg"
          title="Sari lulus SNBT dengan beasiswa penuh..."
          date="26 Juli 2026"
        />
        <ArticleCard
          category="Pendidikan"
          slug="program-bimbel-gratis"
          image="/panti.jpg"
          title="Program bimbel gratis dimulai..."
          date="26 Juli 2026"
        />
      </div>

      <button className="cursor-pointer w-full mt-16 py-4 bg-[#C4714A] text-white rounded-2xl font-semibold text-[20px] md:text-[24px] hover:bg-[#b06d48] transition-colors">
        Lihat lebih banyak
      </button>
    </div>
  );
}
