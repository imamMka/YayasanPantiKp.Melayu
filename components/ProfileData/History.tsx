export default function History() {
  return (
    <section
      id="history"
      className="container mx-auto px-6 py-12 md:py-24 grid grid-cols-1 md:grid-cols-12 gap-12 items-start"
    >
      <div className="md:col-span-7">
        <p className="text-[16px] sm:text-[20px] md:text-[24px] font-bold text-[#4A6B55] uppercase tracking-[0.2em] mb-4">
          Profil Yayasan
        </p>
        <h2 className="text-[36px] sm:text-[48px] md:text-[64px] font-bold text-[#2D2D2D] leading-tight mb-8">
          Sejarah Singkat
        </h2>
        <div className="space-y-6 text-slate-600 text-[18px] sm:text-[20px] md:text-[24px] leading-relaxed">
          <p>
            Yayasan ini mulai diresmikan tahun 2012, berawal dari keprihatinan
            lingkungan sekitar wilayah Kampung Melayu yang membutuhkan wadah
            bagi anak-anak yatim piatu...
          </p>
          <p>
            Seiring berjalannya waktu, panti ini berkembang dari rumah kecil
            hingga kini menempati gedung yang lebih layak untuk mendukung proses
            tumbuh kembang anak.
          </p>
        </div>
      </div>
      
      <div className="md:col-span-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4">
        {[
          { label: "Anak asuh sejak 2012", val: "120+" },
          { label: "Dana tersalurkan", val: "Rp 800jt" },
          { label: "Berdiri & Berkarya", val: "12 Tahun" },
        ].map((stat, i) => (
          <div key={i} className="bg-[#2D2D2D] text-white p-6 md:p-8 rounded-3xl shadow-xl hover:bg-[#363636] transition-colors">
            <p className="text-[36px] sm:text-[48px] md:text-[56px] font-black text-emerald-500 mb-1">
              {stat.val}
            </p>
            <p className="text-[16px] sm:text-[18px] md:text-[20px] text-gray-300 font-medium">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
