import Link from "next/link";

const albums = [
  {
    year: "2026",
    count: "25 Foto",
    previews: ["/panti.jpg", "/panti-2.jpg", "/panti-3.jpg", "/panti-4.jpg"],
  },
  {
    year: "2025",
    count: "45 Foto",
    previews: ["/panti-2.jpg", "/panti-4.jpg", "/panti.jpg", "/panti-3.jpg"],
  },
  {
    year: "2023",
    count: "21 Foto",
    previews: ["/panti-3.jpg", "/panti.jpg", "/panti-4.jpg", "/panti-2.jpg"],
  },
  {
    year: "2022",
    count: "15 Foto",
    previews: ["/panti-4.jpg", "/panti-3.jpg", "/panti-2.jpg", "/panti.jpg"],
  },
];

export default function AlbumPerTahun() {
  return (
    <section className="mb-20">
      <h2 className="text-[48px] md:text-[64px] font-semibold text-[#2D2D2D] mb-8">
        Album pertahun
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {albums.map((album, i) => (
          /* Membungkus card dengan Link */
          <Link
            key={i}
            href={`/gallery/${album.year}`} // Arahkan ke route dinamis berdasarkan tahun
            className="group block cursor-pointer"
          >
            <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm group-hover:shadow-md group-hover:-translate-y-1 transition-all duration-300">
              {/* Grid Mini Preview */}
              <div className="grid grid-cols-2 gap-1.5 mb-4 overflow-hidden rounded-xl">
                {album.previews.map((img, idx) => (
                  <div
                    key={idx}
                    className="aspect-square bg-gray-100 overflow-hidden"
                  >
                    <img
                      src={img}
                      alt={`Preview ${idx}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>

              {/* Info Album */}
              <div className="px-1 pb-1">
                <h4 className="font-bold text-[#2D2D2D] text-[20px] md:text-[24px] mb-1 group-hover:text-[#C4714A] transition-colors">
                  {album.year}
                </h4>
                <p className="text-[16px] md:text-[18px] text-[#6E6E6E] font-medium">
                  {album.count}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
