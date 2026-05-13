interface NewsHeaderProps {
  article: {
    title: string;
    category: string;
    imageUrl: string;
    createdAt: Date;
  };
}

export default function NewsHeader({ article }: NewsHeaderProps) {
  const imageUrl = article.imageUrl.includes('r2.dev') 
    ? `/api/images/${article.imageUrl.split('r2.dev/').pop()}` 
    : article.imageUrl;

  return (
    <section>
      {/* Image Banner */}
      <div className="aspect-video w-full bg-gray-200 relative overflow-hidden rounded-b-3xl ">
        <img
          src={imageUrl}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-8 md:p-12 pb-0">
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <span className="text-[14px] font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full tracking-wider">
            {article.category}
          </span>
          <span className="text-[14px] text-gray-400 font-medium">
            {new Date(article.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })} | Admin
          </span>
        </div>

        <nav className="text-[14px] text-gray-400 mb-4 flex gap-2">
          <span>Berita</span> <span>›</span>{" "}
          <span className="text-gray-600">{article.category}</span>
        </nav>

        <h1 className="text-[24px] md:text-[32px] lg:text-[48px] font-black text-slate-950 leading-tight mb-8 tracking-tighter">
          {article.title}
        </h1>
      </div>
    </section>
  );
}
