"use client";

import Link from "next/link";
import Image from "next/image";

interface NewsItem {
  id: number;
  title: string;
  slug: string;
  content: string;
  imageUrl: string;
  quote: string | null;
  imageKey?: string | null;
}

export default function NewsGrid({ data }: { data: NewsItem[] }) {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center">
        <p className="text-slate-400 italic text-lg">belum ada artikel yang diterbitkan</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10">
      {data.map((news) => (
        <article
          key={news.id}
          className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group border border-slate-100 flex flex-col h-full"
        >
          <div className="relative h-60 sm:h-72 w-full overflow-hidden">
            <Image
              src={news.imageUrl.includes('r2.dev') ? `/api/images/${news.imageUrl.split('r2.dev/').pop()}` : news.imageUrl}
              alt={news.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute top-4 left-4">
              <span className="bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                Kegiatan
              </span>
            </div>
          </div>
          
          <div className="p-8 flex flex-col flex-1">
            <h2 className="text-[22px] md:text-[26px] font-black mb-4 text-slate-900 leading-tight group-hover:text-emerald-600 transition-colors">
              {news.title}
            </h2>

            {news.quote && (
              <div className="bg-slate-50 border-l-4 border-emerald-500 p-4 mb-4 rounded-r-xl">
                <p className="italic text-slate-600 text-sm md:text-base leading-relaxed">
                  &quot;{news.quote}&quot;
                </p>
              </div>
            )}

            <p className="text-slate-500 text-sm md:text-base line-clamp-3 mb-6 leading-relaxed flex-1">
              {news.content}
            </p>

            <Link
              href={`/news/preview/${news.slug}`}
              className="inline-flex items-center text-amber-600 font-black text-[16px] group/link hover:text-amber-700 transition-colors"
            >
              Baca Selengkapnya
              <svg className="w-5 h-5 ml-2 group-hover/link:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
