"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface NewsItem {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  quote?: string;
}

export default function NewsGrid({ data }: { data: any[] }) {
  console.log("NewsGrid data:", data);
  if (!data || !Array.isArray(data) || data.length === 0) {
    return <p className="text-gray-500 italic">Belum ada berita tersedia.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {data.map((news) => (
        <article
          key={news.id}
          className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition"
        >
          <div className="relative h-64 w-full">
            <Image
              src={news.imageUrl.includes('r2.dev') ? `/api/images/${news.imageUrl.split('r2.dev/').pop()}` : news.imageUrl}
              alt={news.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-2 text-gray-900">
              {news.title}
            </h2>

            {news.quote && (
              <p className="italic text-blue-600 border-l-4 border-blue-600 pl-4 mb-4">
                "{news.quote}"
              </p>
            )}

            <p className="text-gray-600 line-clamp-3 mb-4">{news.content}</p>

            <Link
              href={`/news/${news.id}`}
              className="text-blue-600 font-semibold hover:underline"
            >
              Baca Selengkapnya →
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
