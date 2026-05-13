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
      const response = await fetch("/qris.jpg");
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

  const waNumber = "6281219118993";
  const waMessage = encodeURIComponent("Alhamdulillah saya sudah berdonasi");

  return (
    <main className="bg-white min-h-screen py-8 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        {/* Navigasi Kembali */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-amber-600 font-black text-[14px] md:text-[18px] mb-8 hover:opacity-70 transition-opacity uppercase tracking-widest"
        >
          <span className="text-xl">‹</span> Kembali ke Beranda
        </Link>

        {/* Card Putih Utama */}
        <div className="max-w-5xl mx-auto bg-white rounded-[2.5rem] p-6 sm:p-8 md:p-16 shadow-2xl shadow-amber-900/5 border border-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* SISI KIRI: QRIS */}
            <div className="flex flex-col items-center text-center">
              <div className="space-y-2 mb-8">
                <h3 className="text-[20px] md:text-[28px] font-black text-[#2d2d2d] uppercase tracking-[0.2em]">
                  QRIS Payment
                </h3>
                <p className="text-slate-400 text-sm font-medium">Scan untuk donasi cepat & aman</p>
              </div>

              <div className="w-full max-w-[320px] aspect-square bg-amber-50/50 rounded-[2rem] p-6 flex items-center justify-center border-2 border-dashed border-amber-200 relative overflow-hidden group shadow-inner">
                <img src="/qris.jpg" alt="QRIS Yayasan Panti Asuhan" className="w-full h-full object-contain mix-blend-multiply" />
              </div>

              <button
                onClick={handleDownload}
                className="mt-8 w-full max-w-[200px] py-4 bg-amber-600 text-white rounded-2xl font-black text-[16px] hover:bg-amber-700 transition-all transform hover:-translate-y-1 shadow-lg shadow-amber-900/20 active:scale-95"
              >
                Unduh QRIS
              </button>
            </div>

            {/* SISI KANAN: LIST REKENING */}
            <div className="space-y-10">
              {/* Seksi Bank */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-8 bg-emerald-500 rounded-full" />
                  <h3 className="text-[20px] md:text-[28px] font-bold text-[#2d2d2d]">
                    Rekening Bank
                  </h3>
                </div>

                <div className="bg-emerald-50 p-6 md:p-8 rounded-[2rem] relative border border-emerald-100 group">
                  <p className="text-emerald-800 font-black text-[22px] md:text-[28px] mb-1">BSI</p>
                  <p className="text-emerald-700/60 text-[14px] md:text-[18px] font-medium mb-4">a/n Panti Asuhan Kampung Melayu</p>
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-emerald-100">
                    <p className="text-[#2d2d2d] font-black text-[20px] md:text-[26px] tracking-widest font-mono">1234 5678 9012</p>
                  </div>
                  <button
                    onClick={() => handleCopy("123456789012", "bsi")}
                    className="mt-4 w-full sm:w-auto sm:absolute sm:right-6 sm:bottom-6 bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold text-[14px] md:text-[16px] shadow-lg hover:bg-emerald-700 transition-all active:scale-95"
                  >
                    {copiedText === "bsi" ? "Tersalin!" : "Salin "}
                  </button>
                </div>
              </div>

              {/* Seksi E-Wallet */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-8 bg-cyan-500 rounded-full" />
                  <h3 className="text-[20px] md:text-[28px] font-bold text-[#2d2d2d]">
                    E-Wallet
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {/* GoPay */}
                  <div className="bg-cyan-50 p-6 rounded-[2rem] border border-cyan-100 relative group">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-cyan-800 font-black text-[22px] md:text-[28px]">GoPay</p>
                        <p className="text-cyan-700/60 text-xs md:text-sm font-bold uppercase tracking-wider">Panti Asuhan Kp.Melayu</p>
                      </div>
                    </div>
                    <p className="text-[#2d2d2d] font-black text-[18px] md:text-[22px] tracking-widest font-mono bg-white/50 p-3 rounded-xl inline-block">081234567890</p>
                    <button
                      onClick={() => handleCopy("081234567890", "gopay")}
                      className="mt-4 w-full sm:w-auto sm:absolute sm:right-6 sm:bottom-6 bg-cyan-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg hover:bg-cyan-700 transition-all"
                    >
                      {copiedText === "gopay" ? "Tersalin!" : "Salin"}
                    </button>
                  </div>

                  {/* OVO */}
                  <div className="bg-purple-50 p-6 rounded-[2rem] border border-purple-100 relative group">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-purple-800 font-black text-[22px] md:text-[28px]">OVO</p>
                        <p className="text-purple-700/60 text-xs md:text-sm font-bold uppercase tracking-wider">Panti Asuhan Kp.Melayu</p>
                      </div>
                    </div>
                    <p className="text-[#2d2d2d] font-black text-[18px] md:text-[22px] tracking-widest font-mono bg-white/50 p-3 rounded-xl inline-block">081234567890</p>
                    <button
                      onClick={() => handleCopy("081234567890", "ovo")}
                      className="mt-4 w-full sm:w-auto sm:absolute sm:right-6 sm:bottom-6 bg-purple-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg hover:bg-purple-700 transition-all"
                    >
                      {copiedText === "ovo" ? "Tersalin!" : "Salin"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Konfirmasi WhatsApp */}
          <div className="mt-16 pt-10 border-t border-slate-100 flex flex-col items-center gap-6">
            <p className="text-slate-500 font-medium text-center max-w-sm">Konfirmasi donasi Anda agar kami dapat mencatat dan mengirimkan doa terbaik</p>
            <a
              href={`https://wa.me/${waNumber}?text=${waMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-4 bg-[#25D366] text-white px-12 py-5 rounded-[2rem] font-black text-[18px] md:text-[22px] hover:bg-[#1da851] transition-all shadow-2xl shadow-green-900/20 active:scale-95 group w-full sm:w-auto"
            >
              <svg className="w-8 h-8 fill-current group-hover:rotate-12 transition-transform" viewBox="0 0 24 24">
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
