export default function Legalitas() {
  return (
    <section className="container mx-auto px-6 py-20">
      <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">
        Legalitas & Akreditasi
      </p>
      <h2 className="text-3xl font-bold text-[#2D3E33] mb-4">
        Terdaftar & diakui secara hukum
      </h2>
      <p className="text-gray-600 mb-10 max-w-xl">
        Panti Asuhan Kampung Melayu beroperasi di bawah payung hukum yang sah.
        Seluruh dokumen legalitas dapat dikonfirmasi secara publik.
      </p>

      <div className="space-y-4 mb-8">
        {[
          {
            title: "KEMENKUMHAM RI",
            status: "Aktif",
            color: "bg-[#D1E7D6] text-green-700",
          },
          {
            title: "DINAS SOSIAL KOTA DEPOK",
            status: "Terdaftar",
            color: "bg-orange-100 text-orange-700",
          },
          {
            title: "AKREDITASI LEMBAGA (BAN)",
            status: "Grade B",
            color: "bg-orange-100 text-orange-700",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="flex justify-between items-center p-6 bg-white border border-gray-100 rounded-xl"
          >
            <div className="flex items-center gap-4">
              <span className="p-2 bg-gray-100 rounded">📄</span>
              <span className="font-bold text-sm tracking-wide">
                {item.title}
              </span>
            </div>
            <span
              className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase ${item.color}`}
            >
              {item.status}
            </span>
          </div>
        ))}
      </div>

      <div className="bg-[#D1E7D6]/20 p-6 rounded-xl flex justify-between items-center border border-[#D1E7D6]">
        <p className="text-xs text-gray-600">Unduh dokumen legalitas (PDF)</p>
        <button className="bg-[#C58058] text-white px-6 py-2 rounded text-xs font-bold shadow-sm">
          UNDUH FILE
        </button>
      </div>
    </section>
  );
}
