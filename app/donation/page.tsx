"use client"; // Wajib karena ada fungsi Copy to Clipboard
import { useState } from "react";
import Link from "next/link";

export default function DonationPage() {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleDownload = async () => {
    try {
      const response = await fetch("/qris.jpg"); // Ganti dengan path yang benar jika diperlukan
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "qris.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Gagal mendownload gambar:", err);
    }
  };

  const waNumber = "6281219118993"; // Ganti nomor WA aslimu
  const waMessage = encodeURIComponent("Alhamdulillah saya sudah berdonasi");

  return (
    <main className="bg-[#F9F6F0] min-h-screen py-12">
      <div className="container mx-auto px-6">
        {/* Navigasi Kembali */}
        <Link
          href="/"
          className="flex items-center gap-2 text-[#C4714A] font-semibold text-[20px] md:text-[24px] mb-8 hover:opacity-70 transition-opacity"
        >
          <span className="text-lg">‹</span> KEMBALI
        </Link>

        {/* Card Putih Utama */}
        <div className="max-w-5xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* SISI KIRI: QRIS */}
            <div className="flex flex-col items-center">
              <h3 className="text-[24px] md:text-[32px] font-semibold text-[#2d2d2d] mb-8 uppercase tracking-[0.2em]">
                QRIS
              </h3>
              <div className="w-full max-w-[300px] aspect-square bg-[#F3E5D8] rounded-3xl flex items-center justify-center border-2 border-dashed border-[#C58058]/30 relative overflow-hidden group">
                <img src="/qris.jpg" alt="qris-code-dummy" />
                {/* Nanti ganti pakai <img src="/path-qris.jpg" /> */}
              </div>
              <button
                onClick={handleDownload}
                className="cursor-pointer mt-6 px-10 py-3 bg-[#C4714A] text-white rounded-xl font-bold text-sm hover:bg-[#b06d48] transition-all active:scale-95 shadow-lg shadow-orange-900/10"
              >
                Unduh
              </button>
            </div>

            {/* SISI KANAN: LIST REKENING */}
            <div className="space-y-8">
              {/* Seksi Bank */}
              <div>
                <h3 className="text-[24px] md:text-[32px] font-semibold text-[#2d2d2d] mb-6">
                  Transfer via Rekening Bank
                </h3>
                <div className="bg-[#D1FAE5] p-6 rounded-2xl relative transition-all border border-green-200">
                  <p className="text-[#6e6e6e] font-semibold text-[20px] md:text-[24px] mb-1">
                    BSI
                  </p>
                  <p className="text-[#6e6e6e] text-[20px] md:text-[24px] opacity-70 mb-2">
                    a/n Panti Asuhan Kampung Melayu
                  </p>
                  <p className="text-[#2d2d2d] font-semibold text-[20px] md:text-[24px] tracking-wider">
                    1234 5678 9012
                  </p>
                  <button
                    onClick={() => handleCopy("123456789012", "bsi")}
                    className="cursor-pointer absolute right-4 bottom-4 bg-[#10B981] text-white px-5 py-2 rounded-lg text-[20px] md:text-[24px] shadow-md active:scale-90 transition-all"
                  >
                    {copiedText === "bsi" ? "Tersalin!" : "Salin"}
                  </button>
                </div>
              </div>

              {/* Seksi E-Wallet */}
              <div>
                <h3 className="text-[24px] md:text-[32px] font-semibold text-[#2d2d2d] mb-6">
                  Transfer via E-Wallet
                </h3>
                <div className="space-y-4">
                  {/* GoPay */}
                  <div className="bg-[#CFFAFE] p-6 rounded-2xl relative border border-cyan-200">
                    <p className="text-[#6e6e6e] font-semibold text-[20px] md:text-[24px] mb-1">
                      GoPay
                    </p>
                    <p className="text-[#6e6e6e] text-[20px] md:text-[24px] opacity-70 mb-2">
                      a/n Panti Asuhan Kp.Melayu
                    </p>
                    <p className="text-[#2d2d2d] font-semibold text-[20px] md:text-[24px] tracking-wider font-mono">
                      081234567890
                    </p>
                    <button
                      onClick={() => handleCopy("081234567890", "gopay")}
                      className="cursor-pointer absolute right-4 bottom-4 bg-[#06B6D4] text-white px-5 py-2 rounded-lg text-[20px] md:text-[24px] shadow-md active:scale-90 transition-all"
                    >
                      {copiedText === "gopay" ? "Tersalin!" : "Salin"}
                    </button>
                  </div>

                  {/* OVO */}
                  <div className="flex flex-col bg-[#EDE9FE] p-6 rounded-2xl relative border border-purple-200">
                    <div className="flex flex-col items-start justify-between">
                      <p className="text-[#6e6e6e] font-semibold text-[20px] md:text-[24px] mb-1">
                        OVO
                      </p>
                      <p className="text-[#6e6e6e] text-[20px] md:text-[24px] opacity-70 mb-2">
                        a/n Panti Asuhan Kp.Melayu
                      </p>
                      <p className="text-[#2d2d2d] font-semibold text-[20px] md:text-[24px] tracking-wider font-mono">
                        081234567890
                      </p>
                    </div>

                    <button
                      onClick={() => handleCopy("081234567890", "ovo")}
                      className="cursor-pointer absolute right-4 bottom-4 bg-[#7C3AED] text-white px-5 py-2 rounded-lg text-[20px] md:text-[24px] shadow-md active:scale-90 transition-all"
                    >
                      {copiedText === "ovo" ? "Tersalin!" : "Salin"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Konfirmasi WhatsApp */}
          <div className="mt-16 pt-8 border-t border-gray-100 flex justify-center">
            <a
              href={`https://wa.me/${waNumber}?text=${waMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-[#25D366] text-white px-10 py-4 rounded-2xl font-semibold hover:bg-[#1da851] transition-all shadow-xl shadow-green-900/10 active:scale-95"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.309 1.656zm6.224-3.52c1.54.918 3.278 1.403 5.051 1.404 5.432 0 9.851-4.417 9.854-9.849 0-2.63-1.025-5.103-2.887-6.964a9.773 9.773 0 0 0-6.963-2.884c-5.434 0-9.852 4.418-9.855 9.85 0 1.884.53 3.719 1.534 5.332l-1.022 3.726 3.823-1.003z" />
              </svg>
              Kirim Bukti Transfer
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
