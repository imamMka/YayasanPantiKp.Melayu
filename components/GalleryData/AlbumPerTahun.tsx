const albums = [
  { year: "2026", count: "25 Foto" },
  { year: "2025", count: "45 Foto" },
  { year: "2023", count: "21 Foto" },
  { year: "2022", count: "15 Foto" },
];

export default function AlbumPerTahun() {
  return (
    <section className="mb-20">
      <h2 className="text-[48px] md:text-[64px] font-semibold text-[#2D2D2D] mb-8">
        Album pertahun
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {albums.map((album, i) => (
          <div key={i} className="group cursor-pointer">
            <div className="bg-white p-2 rounded-2xl border border-gray-100 shadow-sm group-hover:shadow-md transition-shadow">
              {/* Grid Mini Preview */}
              <div className="grid grid-cols-2 gap-1 mb-4">
                <div className="aspect-square bg-gray-300 rounded-tl-xl rounded-bl-sm" />
                <div className="aspect-square bg-gray-200 rounded-tr-xl rounded-br-sm" />
                <div className="aspect-square bg-gray-200 rounded-bl-xl rounded-tl-sm" />
                <div className="aspect-square bg-gray-400 rounded-br-xl rounded-tr-sm" />
              </div>
              <div className="px-2 pb-2">
                <h4 className="font-semibold text-[#2D2D2D] text-[20px] md:text-[24px] mb-1 tracking-wide">
                  {album.year}
                </h4>
                <p className="text-[16px] md:text-[20px] text-[#6E6E6E] tracking-wide">
                  {album.count}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
