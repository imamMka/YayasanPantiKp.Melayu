interface NewsContentProps {
  article: {
    content: string;
    quote: string | null;
  };
}

export default function NewsContent({ article }: NewsContentProps) {
  return (
    <article className="p-8 md:p-12 text-[20px] md:text-[24px] text-slate-600 leading-relaxed space-y-6">
      <div className="whitespace-pre-wrap">
        {article.content}
      </div>

      {article.quote && (
        <blockquote className="border-l-4 border-emerald-600 pl-6 py-2 my-10 italic">
          <p className=" text-emerald-700 italic mb-2">
            &quot;{article.quote}&quot;
          </p>
        </blockquote>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-2 pt-10">
        {["#Yayasan", "#PantiAsuhan", "#KampungMelayu"].map((tag) => (
          <span
            key={tag}
            className="px-6 py-2 bg-slate-50 border border-slate-100 rounded-full text-slate-500 hover:bg-slate-100 transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
