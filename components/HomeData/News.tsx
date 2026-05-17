import React from "react";
import Link from "next/link";
import { News as NewsType } from "@prisma/client";

interface NewsProps {
  articles?: NewsType[];
}

const News: React.FC<NewsProps> = ({ articles = [] }) => {
  return (
    <section className="container mx-auto px-6 py-16">
      <div className="flex md:flex-row flex-col justify-between md:items-center items-start mb-8">
        <h2 className="text-[40px] md:text-[56px] font-semibold text-slate-900 leading-tight">
          Berita & Kegiatan Terbaru
        </h2>
        <Link
          href="/news"
          className="text-amber-600 text-[18px] md:text-[22px] font-black hover:underline mt-4 md:mt-0"
        >
          Selengkapnya &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {articles.length === 0 ? (
          <div className="col-span-1 md:col-span-3 bg-white border border-slate-200 rounded-3xl p-12 text-center">
            <p className="text-slate-400 italic text-lg">belum ada artikel yang diterbitkan</p>
          </div>
        ) : (
          articles.map((item) => {
          const imageUrl = item.imageUrl.includes('r2.dev') 
            ? `/api/images/${item.imageUrl.split('r2.dev/').pop()}` 
            : item.imageUrl;

          return (
            <Link
              key={item.id}
              href={`/news/preview/${item.slug}`}
              className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="h-56 w-full overflow-hidden">
                <img
                  src={imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6">
                <span className="text-[12px] bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full uppercase font-bold tracking-wider">
                  {item.category}
                </span>
                <h3 className="text-[20px] font-bold mt-4 mb-2 text-slate-900 leading-snug min-h-[56px] group-hover:text-amber-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-400 flex items-center gap-2">
                  <span className="w-4 h-[1px] bg-gray-300"></span> 
                  {new Date(item.createdAt).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </Link>
          );
        })
        )}
      </div>
    </section>
  );
};

export default News;
