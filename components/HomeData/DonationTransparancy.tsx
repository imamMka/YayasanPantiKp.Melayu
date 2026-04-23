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
    <section className="bg-[#F2EDE4] py-24 px-6">
      {/* Container utama dibuat sempit agar mirip dengan layout di foto */}
      <div className="max-w-[1000px] mx-auto">
        <p className="text-[20px] md:text-[24px] text-[#4A6B55] uppercase tracking-[0.2em] mb-3 font-semibold">
          Transparansi Dana
        </p>

        <h2 className="text-[48px] md:text-[64px] font-semibold text-[#2D2D2D] leading-tight mb-5">
          Donasi Anda Sampai ke
          <br className="hidden md:block" /> Tangan yang Tepat
        </h2>

        <p className="text-[#6E6E6E] text-[20px] md:text-[24px] leading-relaxed mb-12 px-4">
          Laporan keuangan lengkap tersedia setiap bulan dan dapat diunduh bebas
          oleh publik.
        </p>

        {/* Progress Bars Section */}
        <div className="space-y-8 text-left mb-12">
          {bars.map((bar, i) => (
            <div key={i} className="group">
              <div className="flex justify-between items-center text-[20px] md:text-[24px] font-semibold text-[#6E6E6E] mb-3">
                <span className="tracking-wide">{bar.label}</span>
                <span className="text-[#4A6B55]">{bar.val}</span>
              </div>

              {/* Track Bar */}
              <div className="w-full bg-[#E0E0E0] h-[6px] rounded-full overflow-hidden">
                {/* Progress Fill */}
                <div
                  className="bg-[#4A6B55] h-full rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${bar.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Button dengan padding yang pas */}
        <Link
          href="/donation"
          className="bg-[#C58058] text-white px-10 py-3.5 rounded-2xl cursor-pointer font-bold text-[20px] md:text-[24px] shadow-lg shadow-orange-900/10 hover:bg-[#b06d48] transition-all transform hover:-translate-y-0.5"
        >
          Donasi Sekarang
        </Link>
      </div>
    </section>
  );
};

export default DonationTransparancy;
