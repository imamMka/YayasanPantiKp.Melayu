import Link from "next/link";

export default function RelatedArticles({ articles }: { articles?: any[] }) {
  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      <h4 className="text-xl font-bold mb-6 text-[#2D3E33]">Artikel Terkait</h4>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {articles?.map((art, i) => (
          <Link
            key={art.slug || i}
            href={`/news/preview/${art.slug}`}
            className="group flex items-center gap-4 p-2 rounded-xl border-2 border-[#E8E2D6] hover:border-[#E8E2D6] hover:bg-[#E8E2D6]/10 transition-all"
          >
            {/* Ukuran Gambar Diperkecil (W: 80px - 100px) */}
            <div className="w-24 h-20 flex-shrink-0 overflow-hidden rounded-lg">
              <img
                src={art.image || "/panti.jpg"}
                alt={art.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* Konten Teks */}
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] uppercase tracking-wider font-bold text-green-700 mb-1">
                {art.category}
              </span>
              <h5 className="font-bold text-sm text-[#2D3E33] group-hover:text-[#C4714A] transition-colors line-clamp-2 leading-tight">
                {art.title}
              </h5>
              <p className="text-[11px] text-gray-400 mt-1">{art.date}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
