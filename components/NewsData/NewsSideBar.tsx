export default function NewsSidebar() {
  return (
    <div className="space-y-8">
      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="Cari Artikel..."
          className="w-full bg-white border border-gray-100 rounded-xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#D1E7D6]"
        />
        <span className="absolute right-5 top-4 text-gray-400">🔍</span>
      </div>

      {/* Categories */}
      <div className="bg-white p-8 rounded-2xl border border-gray-100">
        <h4 className="font-bold text-[#2D3E33] mb-6">Kategori</h4>
        <div className="space-y-4">
          {["Pendidikan", "Kesehatan", "Prestasi", "Penyaluran Dana"].map(
            (item) => (
              <div
                key={item}
                className="flex justify-between items-center text-sm text-gray-600 cursor-pointer hover:text-green-700"
              >
                <span>{item}</span>
                <span className="text-gray-300">›</span>
              </div>
            ),
          )}
        </div>
      </div>

      {/* Popular News */}
      <div className="bg-white p-8 rounded-2xl border border-gray-100">
        <h4 className="font-bold text-[#2D3E33] mb-6">Artikel Populer</h4>
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-4 group cursor-pointer">
              <div className="w-20 h-20 bg-gray-200 rounded-lg flex-none overflow-hidden" />
              <div>
                <h5 className="text-[13px] font-bold leading-snug group-hover:text-orange-700 transition-colors">
                  Dito raih juara 1 olimpiade matematika
                </h5>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Card */}
      <div className="bg-[#EAD8CC] p-8 rounded-2xl text-center">
        <p className="text-sm text-[#2D3E33] mb-6 leading-relaxed">
          Tergerak oleh cerita ini? Mari bantu kami menghadirkan lebih banyak
          senyum.
        </p>
        <button className="w-full bg-[#C58058] text-white py-3 rounded-lg font-bold text-xs uppercase tracking-widest">
          Donasi Sekarang
        </button>
      </div>
    </div>
  );
}
