export default function RelatedArticles() {
  const articles = [
    { title: "Sari lulus SNBT beasiswa penuh", date: "12-Apr-26" },
    { title: "Program Bimbel Gratis", date: "12-Apr-26" },
  ];

  return (
    <section className="mt-16">
      <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">
        Artikel Terkait
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {articles.map((art, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-4 bg-white/60 border border-gray-100 rounded-2xl hover:bg-white transition-colors cursor-pointer group"
          >
            <div className="w-16 h-16 bg-gray-200 rounded-xl flex-none overflow-hidden" />
            <div>
              <h5 className="text-xs font-bold text-[#2D3E33] leading-snug group-hover:text-[#C58058] transition-colors">
                {art.title}
              </h5>
              <p className="text-[10px] text-gray-400 mt-1">{art.date}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
