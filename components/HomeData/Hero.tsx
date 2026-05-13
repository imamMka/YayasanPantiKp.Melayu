import React from "react";
import Link from "next/link";

const Hero: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen bg-[url('/panti.jpg')] bg-cover bg-center flex items-center">
      {/* Overlay Hitam Transparan */}
      <div className="absolute inset-0 bg-slate-900/60"></div>

      {/* Konten */}
      <div className="container mx-auto relative z-10 flex flex-col lg:flex-row justify-between items-center gap-12 py-20 px-6">
        <div className="max-w-2xl flex flex-col items-center lg:items-start text-center lg:text-left gap-6">
          <div className="space-y-2">
            <p className="text-emerald-300 font-black tracking-[0.3em] text-[14px] sm:text-[18px] md:text-[20px] uppercase">
              Bersama Untuk Masa Depan
            </p>
            <h2 className="text-[36px] sm:text-[48px] md:text-[64px] font-black text-white leading-[1.1] drop-shadow-2xl">
              Setiap Anak Berhak Tumbuh dengan{" "}
              <span className="text-emerald-300">Cinta & Harapan</span>
            </h2>
          </div>
          
          <p className="text-slate-100 text-[16px] sm:text-[20px] md:text-[24px] max-w-lg font-medium leading-relaxed opacity-90">
            Mendampingi 47 anak asuh menuju masa depan cerah melalui pendidikan,
            kesehatan, dan kasih sayang yang nyata.
          </p>

          <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4 mt-4">
            <Link
              href="/donation"
              className="text-[18px] md:text-[20px] bg-amber-600 text-white px-10 py-4 rounded-2xl font-black hover:bg-amber-700 transition-all transform hover:scale-105 shadow-xl shadow-amber-900/20 text-center active:scale-95"
            >
              Donasi Sekarang
            </Link>
            <Link
              href="/profile"
              className="text-[18px] md:text-[20px] bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-4 rounded-2xl font-black hover:bg-white/20 transition-all text-center active:scale-95"
            >
              Profil Kami
            </Link>
          </div>
        </div>

        {/* Statistik Side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 w-full md:max-w-md">
          {[
            { label: "Anak asuh aktif", val: "47+" },
            { label: "Donasi masuk", val: "Rp 12.4jt" },
            { label: "Berdiri sejak", val: "12 Tahun" },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-slate-900/40 backdrop-blur-xl border border-white/10 text-white p-6 md:p-8 rounded-[2.5rem] shadow-2xl flex flex-col items-center lg:items-start group hover:bg-emerald-600/20 transition-all duration-500"
            >
              <p className="text-[32px] md:text-[48px] font-black text-emerald-300 leading-none mb-2">
                {stat.val}
              </p>
              <p className="text-[14px] md:text-[18px] text-slate-300 font-bold uppercase tracking-widest">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
