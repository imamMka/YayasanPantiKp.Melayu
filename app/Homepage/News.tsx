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
      <div className="flex justify-between items-end mb-8">
        <h2 className="text-3xl font-bold text-[#2D3E33]">
          Berita & Kegiatan Terbaru
        </h2>
        <a href="#" className="text-orange-600 text-sm font-semibold">
          Selengkapnya &rarr;
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100"
          >
            <div className="h-48 bg-gray-200"></div>
            <div className="p-5">
              <span className="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded uppercase font-bold">
                {item.tag}
              </span>
              <h3 className="font-bold mt-3 mb-2">{item.title}</h3>
              <p className="text-xs text-gray-400">{item.date}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default News;
