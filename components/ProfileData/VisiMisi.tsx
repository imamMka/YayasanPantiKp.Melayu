export default function VisiMisi() {
  return (
    <section
      id="visi-misi"
      className="container mx-auto px-6 py-12 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-8"
    >
      <div className="bg-emerald-50 p-8 md:p-12 rounded-[2.5rem] border border-emerald-100 flex flex-col justify-center">
        <div className="flex items-center gap-4 mb-8">
          <span className="p-4 bg-white rounded-2xl shadow-sm text-2xl">🛡️</span>
          <h3 className="text-[28px] md:text-[36px] font-black text-emerald-800">
            Visi
          </h3>
        </div>
        <p className="text-emerald-800 text-[20px] sm:text-[24px] md:text-[28px] font-medium italic leading-relaxed">
          &quot;Menjadi pusat pengasuhan dan pendidikan yang mampu mencetak generasi
          mandiri, berakhlak mulia, dan bermanfaat bagi nusa, bangsa, serta
          agama.&quot;
        </p>
      </div>
      
      <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
        <div className="flex items-center gap-4 mb-8">
          <span className="p-4 bg-amber-50 rounded-2xl text-amber-600 shadow-sm text-2xl">
            🎯
          </span>
          <h3 className="text-[28px] md:text-[36px] font-black text-amber-600">
            Misi
          </h3>
        </div>
        <ul className="space-y-6 text-[18px] sm:text-[20px] md:text-[24px] text-slate-600">
          {[
            "Memberikan akses pendidikan berkualitas yang berkelanjutan bagi seluruh anak asuh.",
            "Menjamin pemenuhan gizi dan layanan kesehatan fisik serta psikis secara rutin.",
            "Membina karakter melalui pengajaran nilai-nilai spiritual dan kemandirian."
          ].map((misi, idx) => (
            <li key={idx} className="flex gap-4 items-start">
              <span className="w-2 h-2 rounded-full bg-amber-500 mt-3 shrink-0" />
              <span>{misi}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
