interface NewsContentProps {
  article: {
    content: string;
    quote: string | null;
  };
}

export default function NewsContent({ article }: NewsContentProps) {
  return (
    <article className="p-8 md:p-12 text-[20px] md:text-[24px] text-[#6e6e6e] leading-relaxed space-y-6">
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
            className="px-6 py-2 bg-gray-50 border border-gray-100 rounded-full text-[#6E6E6E] hover:bg-gray-100 "
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
