const categories = ["Semua", "Pendidikan", "Kesehatan", "Prestasi", "Donasi"];

export default function NewsFilter() {
  return (
    <div className="flex flex-wrap gap-3 border-b border-gray-200 pb-8">
      {categories.map((cat, i) => (
        <button
          key={cat}
          className={`px-8 py-2.5 rounded-full text-xs font-semibold transition-all border
            ${
              i === 0
                ? "bg-[#D1E7D6] border-[#B8D8BF] text-[#2D3E33]"
                : "bg-white border-gray-100 text-gray-500 hover:bg-gray-50"
            }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
