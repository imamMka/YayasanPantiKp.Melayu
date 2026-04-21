import Link from "next/link";

interface ArticleCardProps {
  category: string;
  title: string;
  slug: string; // Tambahkan slug untuk identitas URL
  desc?: string;
  date: string;
  isLarge?: boolean;
}

function ArticleCard({
  category,
  title,
  slug,
  desc,
  date,
  isLarge,
}: ArticleCardProps) {
  return (
    <Link
      // SOLUSI: Tambahkan /Preview/ sebelum ${slug} agar sesuai dengan struktur folder Anda
      href={`/News/Preview/${slug}`}
      className={`group block cursor-pointer ${isLarge ? "mb-12" : ""}`}
    >
      <div
        className={`bg-gray-200 rounded-2xl overflow-hidden mb-4 ${isLarge ? "aspect-video" : "aspect-[4/3]"}`}
      >
        <div className="w-full h-full bg-slate-300 group-hover:scale-105 transition-transform duration-500" />
      </div>

      <span className="text-[10px] font-bold text-green-700 bg-green-100 px-2 py-1 rounded uppercase tracking-wider">
        {category}
      </span>

      <h3
        className={`font-bold text-[#2D3E33] mt-3 group-hover:text-orange-700 transition-colors ${isLarge ? "text-2xl" : "text-base"}`}
      >
        {title}
      </h3>

      {desc && (
        <p className="text-gray-500 text-sm mt-3 line-clamp-2 leading-relaxed">
          {desc}
        </p>
      )}

      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
        <span className="text-[11px] text-gray-400 font-medium">
          {date} • Admin
        </span>
        <span className="text-[11px] font-bold text-[#2D3E33] flex items-center gap-1 group-hover:gap-2 transition-all">
          Baca Selengkapnya <span className="text-lg">›</span>
        </span>
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
        title="Dito, dari panti asuhan ke podium olimpiade — sebuah perjalanan yang mengubah segalanya"
        desc="Tidak ada yang menyangka anak pemalu yang datang tiga tahun lalu itu kini berdiri di depan 200 peserta dari seluruh kecamatan membawa pulang medali emas olimpiade matematika..."
        date="28 Agustus 2026"
      />

      {/* Standard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
        <ArticleCard
          category="Kesehatan"
          slug="pemeriksaan-gizi-rutin"
          title="Pemeriksaan gizi rutin: 94% anak asuh kini berstatus gizi baik"
          date="26 Juli 2026"
        />
        <ArticleCard
          category="Penyaluran Dana"
          slug="laporan-dana-mei-2025"
          title="Laporan penyaluran dana Mei 2025 — Rp 8,8 Juta untuk 47 anak"
          date="26 Juli 2026"
        />
        <ArticleCard
          category="Donasi"
          slug="sari-lulus-snbt"
          title="Sari lulus SNBT dengan beasiswa penuh — bangga kami yang tak terbendung"
          date="26 Juli 2026"
        />
        <ArticleCard
          category="Pendidikan"
          slug="program-bimbel-gratis"
          title="Program bimbel gratis dimulai — 3 relawan pengajar bergabung bulan ini"
          date="26 Juli 2026"
        />
      </div>

      <button className="w-full mt-16 py-4 bg-[#C58058] text-white rounded-xl font-bold text-sm hover:bg-[#b06d48] transition-colors">
        Lihat lebih banyak
      </button>
    </div>
  );
}
