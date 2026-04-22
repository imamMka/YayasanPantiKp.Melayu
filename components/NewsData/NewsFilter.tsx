const categories = ["Semua", "Pendidikan", "Kesehatan", "Prestasi", "Donasi"];

export default function NewsFilter() {
  return (
    <div className="flex flex-wrap gap-3 border-b border-gray-200 pb-8">
      {categories.map((cat, i) => (
        <button
          key={cat}
          className={`px-8 py-2.5 rounded-full text-[20px] md:text-[24px] transition-all border
            ${
              i === 0
                ? "bg-[#C3F4D5] border-[#4A6B55] border-2 text-[#4A6B55]"
                : "bg-none border-[#4A6B55] text-[#6E6E6E] hover:bg-[#C3F4D5] hover:text-[#4A6B55]"
            }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
