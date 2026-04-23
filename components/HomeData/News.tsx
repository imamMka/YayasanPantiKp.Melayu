import React from "react";

interface Article {
  title: string;
  date: string;
  tag: string;
}

const articles: Article[] = [
  {
    title: "Dito Raih Juara 1 Olimpiade Matematika",
    date: "11 Juni 2026",
    tag: "Pendidikan",
  },
  {
    title: "Pemeriksaan Gizi Rutin Puskesmas",
    date: "29 Agustus 2026",
    tag: "Kesehatan",
  },
  {
    title: "Laporan Penyaluran Dana Mei 2025",
    date: "04 Juli 2026",
    tag: "Transparansi",
  },
];

const News: React.FC = () => {
  return (
    <section className="container mx-auto px-6 py-16">
      <div className="flex md:flex-row flex-col justify-between md:items-center items-start mb-8">
        <h2 className="text-[40px] md:text-[56px] font-semibold text-[#2D2D2D] leading-tight">
          Berita & Kegiatan Terbaru
        </h2>
        <a
          href="#"
          className="text-[#C4714A] text-[18px] md:text-[22px] font-semibold hover:underline mt-4 md:mt-0"
        >
          Selengkapnya &rarr;
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {articles.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 hover:shadow-xl transition-shadow duration-300"
          >
            {/* Bagian Gambar yang diperbarui */}
            <div className="h-56 w-full overflow-hidden">
              <img
                src="/panti-3.jpg"
                alt={item.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="p-6">
              <span className="text-[12px] bg-[#E8F3ED] text-[#4A6B55] px-3 py-1 rounded-full uppercase font-bold tracking-wider">
                {item.tag}
              </span>
              <h3 className="text-[20px] font-bold mt-4 mb-2 text-[#2D2D2D] leading-snug min-h-[56px]">
                {item.title}
              </h3>
              <p className="text-sm text-gray-400 flex items-center gap-2">
                <span className="w-4 h-[1px] bg-gray-300"></span> {item.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default News;
