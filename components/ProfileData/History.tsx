export default function History() {
  return (
    <section
      id="history"
      className="container mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-12 gap-12 items-start"
    >
      <div className="md:col-span-7">
        <p className="text-[20px] md:text-[24px] font-semibold text-[#4A6B55] uppercase tracking-widest mb-3">
          Profil Yayasan
        </p>
        <h2 className="text-[48px] md:text-[64px] font-semibold text-[#2D2D2D] mb-8">
          Sejarah singkat
        </h2>
        <div className="space-y-6 text-[#6E6E6E] text-[20px] md:text-[24px] leading-relaxed">
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
      <div className="md:col-span-5 space-y-4">
        {[
          { label: "Anak asuh sejak 2012", val: "120+" },
          { label: "Dana tersalurkan", val: "Rp. 800jt" },
          { label: "Berdiri & Berkarya", val: "12 Tahun" },
        ].map((stat, i) => (
          <div key={i} className="bg-[#2D2D2D] text-white p-8 rounded-xl">
            <p className="text-[48px] md:text-[64px] font-bold mb-1">
              {stat.val}
            </p>
            <p className="text-[20px] md:text-[24px] text-[#EAF2ED]">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
