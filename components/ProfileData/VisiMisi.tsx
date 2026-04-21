export default function VisiMisi() {
  return (
    <section className="container mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-[#D1E7D6]/30 p-10 rounded-2xl border border-[#D1E7D6]">
        <div className="flex items-center gap-4 mb-6">
          <span className="p-3 bg-white rounded-lg">🛡️</span>
          <h3 className="text-xl font-bold text-[#2D3E33]">Visi</h3>
        </div>
        <p className="text-gray-700 italic leading-relaxed">
          "Menjadi pusat pengasuhan dan pendidikan yang mampu mencetak generasi
          mandiri, berakhlak mulia, dan bermanfaat bagi nusa, bangsa, serta
          agama."
        </p>
      </div>
      <div className="bg-white p-10 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-4 mb-6">
          <span className="p-3 bg-orange-50 rounded-lg text-orange-600">
            🎯
          </span>
          <h3 className="text-xl font-bold text-[#2D3E33]">Misi</h3>
        </div>
        <ul className="space-y-4 text-sm text-gray-600 list-disc pl-4">
          <li>
            Memberikan akses pendidikan berkualitas yang berkelanjutan bagi
            seluruh anak asuh.
          </li>
          <li>
            Menjamin pemenuhan gizi dan layanan kesehatan fisik serta psikis
            secara rutin.
          </li>
          <li>
            Membina karakter melalui pengajaran nilai-nilai spiritual dan
            kemandirian.
          </li>
        </ul>
      </div>
    </section>
  );
}
