import React from "react";
import Link from "next/link";

interface ProgressBar {
  label: string;
  val: string;
  percentage: number; // Untuk inline style width
}

const bars: ProgressBar[] = [
  { label: "Pendidikan & Sekolah", val: "60%", percentage: 60 },
  { label: "Kesehatan & Gizi", val: "25%", percentage: 25 },
  { label: "Operasional Panti", val: "15%", percentage: 15 },
];

const DonationTransparancy: React.FC = () => {
  return (
    <section className="bg-white py-24 px-6 border-t border-slate-100">
      {/* Container utama dibuat sempit agar mirip dengan layout di foto */}
      <div className="max-w-[1000px] mx-auto text-center lg:text-left">
        <p className="text-[14px] md:text-[18px] text-emerald-600 uppercase tracking-[0.25em] mb-4 font-black">
          Transparansi Dana
        </p>

        <h2 className="text-[36px] sm:text-[48px] md:text-[64px] font-black text-slate-900 leading-[1.1] mb-6">
          Donasi Anda Sampai ke <br className="hidden md:block" /> Tangan yang Tepat
        </h2>

        <p className="text-slate-500 text-[18px] md:text-[22px] leading-relaxed mb-16 max-w-2xl mx-auto lg:mx-0">
          Laporan keuangan lengkap tersedia setiap bulan dan dapat diunduh bebas
          oleh publik untuk menjamin amanah donatur.
        </p>

        {/* Progress Bars Section */}
        <div className="space-y-10 text-left mb-16">
          {bars.map((bar, i) => (
            <div key={i} className="group">
              <div className="flex justify-between items-center text-[18px] md:text-[22px] font-bold text-slate-700 mb-4">
                <span className="tracking-tight">{bar.label}</span>
                <span className="text-emerald-600">{bar.val}</span>
              </div>

              {/* Track Bar */}
              <div className="w-full bg-slate-100 h-[8px] rounded-full overflow-hidden shadow-inner">
                {/* Progress Fill */}
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                  style={{ width: `${bar.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="flex justify-center lg:justify-start">
          <Link
            href="/donation"
            className="bg-amber-600 text-white px-12 py-4 rounded-2xl cursor-pointer font-black text-[18px] md:text-[22px] shadow-xl shadow-amber-900/20 hover:bg-amber-700 transition-all transform hover:-translate-y-1 active:scale-95"
          >
            Mulai Donasi Sekarang
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DonationTransparancy;
