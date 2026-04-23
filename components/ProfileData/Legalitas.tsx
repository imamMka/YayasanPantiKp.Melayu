export default function Legalitas() {
  const documents = [
    {
      title: "KEMENKUMHAM RI",
      desc: "SK Pengesahan Yayasan No. AHU-0012345.AH.01.04.2013",
      time: "Ditetapkan 14 Maret 2013 · Berlaku permanen",
      status: "Aktif",
      color: "border-[#4A6B55] border-2 text-[#4A6B55]",
      fileUrl: "/kemenkumham.jpg", // Ganti dengan file asli di folder public
    },
    {
      title: "DINAS SOSIAL KOTA DEPOK",
      desc: "Izin Operasional Panti Asuhan No. 465/1234/DINSOS/2014",
      time: "Ditetapkan 20 Juni 2014 · Berlaku 5 tahun",
      status: "Terdaftar",
      color: "border-[#C4714A] border-2 text-[#C4714A]",
      fileUrl: "/dinsos.jpg",
    },
    {
      title: "DIREKTORAT JENDERAL PAJAK",
      desc: "Surat Keterangan Terdaftar (SKT) No. 12345/DIRJEN.PAJAK/2015",
      time: "Ditetapkan 10 Januari 2015 · Berlaku 5 tahun",
      status: "Terdaftar",
      color: "border-[#C4714A] border-2 text-[#C4714A]",
      fileUrl: "/pajak.jpg",
    },
  ];

  return (
    <section id="legalitas" className="container mx-auto px-6 py-20">
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
        {documents.map((item, i) => (
          /* Klik pada baris ini akan membuka gambar di tab baru */
          <a
            href={item.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            key={i}
            className="flex flex-row justify-between hover:bg-[#C4714A]/10 items-center p-6 bg-white border border-gray-100 rounded-xl transition-all group"
          >
            <div className="flex items-center gap-4">
              <span className="hidden md:block p-2 text-[20px] md:text-[24px] bg-[#C4714A]/20 rounded group-hover:bg-[#C4714A]/40 transition-colors">
                📄
              </span>
              <div className="text-[#6E6E6E] flex flex-col  items-start justify-between">
                <span className="font-semibold text-[20px] md:text-[24px] tracking-wide text-gray-800">
                  {item.title}
                </span>
                <p className="text-[18px] md:text-[22px] text-gray-500">
                  {item.desc}
                </p>
                <p className="text-[14px] md:text-[18px] italic text-gray-400">
                  {item.time}{" "}
                  <span className="ml-2 text-[#C4714A] non-italic font-medium underline">
                    Lihat Dokumen
                  </span>
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

      {/* Button Unduh Semua (Mengarah ke satu file arsip atau file utama) */}
      <div className="bg-[#E8E2D6] p-6 rounded-xl flex flex-col md:flex-row justify-between items-center border border-[#D1E7D6] gap-4">
        <div className="flex flex-col items-start justify-between">
          <p className="text-[18px] md:text-[22px] font-semibold text-[#4A4A4A]">
            Unduh dokumen legalitas resmi kami
          </p>
          <p className="text-[14px] md:text-[18px] italic text-[#6E6E6E]">
            Semua dokumen tersedia dalam format PDF/JPG terverifikasi
          </p>
        </div>

        <a
          href="/docs/legalitas-lengkap-panti.zip" // Link file yang akan diunduh
          download="Legalitas_Panti_Kampung_Melayu.zip" // Atribut download memicu unduhan otomatis
          className="w-full md:w-auto flex items-center justify-center bg-[#C58058] text-white px-8 py-3 rounded-lg text-[18px] md:text-[22px] font-bold shadow-lg hover:bg-[#a66a48] transition-all transform hover:scale-105"
        >
          Unduh semua file
        </a>
      </div>
    </section>
  );
}
