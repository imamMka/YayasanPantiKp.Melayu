export default function Legalitas() {
  return (
    <section className="container mx-auto px-6 py-20">
      <p className="text-[20px] md:text-[24px] font-semibold text-[#4A6B55] uppercase tracking-widest mb-2">
        Legalitas & Akreditasi
      </p>
      <h2 className="text-[48px] md:text-[64px] font-semibold text-[#2D2D2D] mb-4">
        Terdaftar & diakui secara hukum
      </h2>
      <p className="text-[#6E6E6E] text-[20px] md:text-[24px] mb-10 max-w-xl">
        Panti Asuhan Kampung Melayu beroperasi di bawah payung hukum yang sah.
        Seluruh dokumen legalitas dapat dikonfirmasi secara publik.
      </p>

      <div className="space-y-4 mb-8">
        {[
          {
            title: "KEMENKUMHAM RI",
            desc: "SK Pengesahan Yayasan No. AHU-0012345.AH.01.04.2013",
            time: "Ditetapkan 14 Maret 2013 · Berlaku permanen",
            status: "Aktif",
            color: "border-[#4A6B55] border-2 text-[#4A6B55]",
          },
          {
            title: "DINAS SOSIAL KOTA DEPOK",
            desc: "Izin Operasional Panti Asuhan No. 465/1234/DINSOS/2014",
            time: "Ditetapkan 20 Juni 2014 · Berlaku 5 tahun",
            status: "Terdaftar",
            color: "border-[#C4714A] border-2 text-[#C4714A]",
          },
          {
            title: "DIREKTORAT JENDERAL PAJAK",
            desc: "Surat Keterangan Terdaftar (SKT) No. 12345/DIRJEN.PAJAK/2015",
            time: "Ditetapkan 10 Januari 2015 · Berlaku 5 tahun",
            status: "Terdaftar",
            color: "border-[#C4714A] border-2 text-[#C4714A]",
          },
        ].map((item, i) => (
          <a
            href=""
            key={i}
            className="flex justify-between hover:bg-[#C4714A]/20 items-center p-6 bg-white border border-gray-100 rounded-xl"
          >
            <div className="flex items-center gap-4  transition-all">
              <span className="p-2 text-[20px] md:text-[24px] bg-[#C4714A]/20 rounded">
                📄
              </span>
              <div className="text-[#6E6E6E] flex flex-col items-start justify-between">
                <span className="font-semibold text-[20px] md:text-[24px] tracking-wide">
                  {item.title}
                </span>
                <p className="text-[20px] md:text-[24px] text-gray-500">
                  {item.desc}
                </p>
                <p className="text-[16px] md:text-[20px] italic text-gray-400">
                  {item.time}
                </p>
              </div>
            </div>
            <span
              className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase ${item.color}`}
            >
              {item.status}
            </span>
          </a>
        ))}
      </div>

      <div className="bg-[#E8E2D6] p-6 rounded-xl flex justify-between items-center border border-[#D1E7D6]">
        <div className="flex flex-col items-start justify-between">
          <p className="text-[20px] md:text-[24px] font-semibold text-[#6E6E6E]">
            Unduh dokumen legalitas resmi kami
          </p>
          <p className="text-[16px] md:text-[20px] italic text-[#6E6E6E]">
            Semua dokumen tersedia dalam format PDF terverifikasi
          </p>
        </div>

        <a
          href=""
          className="bg-[#C58058] text-white px-6 py-2 rounded-lg text-[20px] md:text-[24px] shadow-lg hover:bg-[#a66a48] transition-colors"
        >
          UNDUH FILE
        </a>
      </div>
    </section>
  );
}
