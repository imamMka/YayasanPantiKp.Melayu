export default function RelatedArticles() {
  const articles = [
    {
      title: "Sari lulus SNBT beasiswa penuh",
      date: "12-Apr-26",
      img: "/panti.jpg",
    },
    {
      title: "Program Bimbel Gratis",
      date: "12-Apr-26",
      img: "/panti-2.jpg",
    },
  ];

  return (
    <section className="mt-16">
      <h4 className="text-[20px] md:text-[24px] font-semibold text-[#2D2D2D] tracking-widest mb-6">
        Artikel Terkait
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {articles.map((art, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-4 bg-white/60 border border-gray-100 rounded-2xl hover:bg-white hover:shadow-sm transition-all cursor-pointer group"
          >
            {/* Image Container */}
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-200 rounded-xl flex-none overflow-hidden">
              <img
                src={art.img}
                alt={art.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* Text Content */}
            <div>
              <h5 className="text-[18px] md:text-[22px] font-semibold text-[#6E6E6E] leading-tight group-hover:text-[#C4714A] transition-colors line-clamp-2">
                {art.title}
              </h5>
              <p className="text-[14px] text-gray-400 mt-1 font-medium">
                {art.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
