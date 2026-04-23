import React from "react";
import Link from "next/link";

const Hero: React.FC = () => {
  return (
    /* 1. Menghapus container mx-auto dari sini agar background memenuhi layar */
    <section className="relative w-full min-h-screen bg-[url('/panti.jpg')] bg-cover bg-center flex items-center">
      {/* 2. Overlay Hitam Transparan agar teks lebih terbaca (tidak nyaru) */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* 3. Konten dibungkus container agar tetap sejajar di tengah layar */}
      <div className="container mx-auto relative z-10 flex flex-col lg:flex-row justify-between items-center gap-12 py-16 px-6">
        <div className="max-w-2xl flex flex-col items-start gap-4">
          <p className="text-[#A7D1B5] font-semibold tracking-widest text-[18px] md:text-[22px] uppercase drop-shadow-md">
            Bersama Untuk Masa Depan
          </p>
          <h2 className="text-[40px] md:text-[64px] font-bold text-white leading-tight drop-shadow-lg">
            Setiap Anak Berhak Tumbuh dengan{" "}
            <span className="text-[#A7D1B5]">Cinta & Harapan</span>
          </h2>
          <p className="text-gray-100 text-[18px] md:text-[24px] mb-8 max-w-lg leading-relaxed drop-shadow-md">
            Mendampingi 47 anak asuh menuju masa depan cerah melalui pendidikan,
            kesehatan, dan kasih sayang yang nyata.
          </p>

          <div className="flex flex-col sm:flex-row w-full gap-4">
            <Link
              href="/donation"
              className="text-[18px] md:text-[20px] bg-[#C4714A] text-white px-8 py-4 rounded-2xl font-semibold hover:bg-[#a66a48] transition-all transform hover:scale-105 cursor-pointer shadow-lg"
            >
              Donasi Sekarang
            </Link>
            <Link
              href="/profile"
              className="text-[18px] md:text-[20px] bg-[#C4714A]  text-white px-8 py-4 rounded-2xl font-semibold  hover:bg-[#a66a48] transition-all cursor-pointer"
            >
              Profil Kami
            </Link>
          </div>
        </div>

        {/* Statistik Side */}
        <div className="grid grid-cols-1 gap-4 w-full md:max-w-md">
          {[
            { label: "Anak asuh aktif", val: "47+" },
            { label: "Donasi telah masuk", val: "Rp 12.4jt" },
            { label: "Berdiri & Berkarya", val: "12 Tahun" },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-[#2d2d2d] text-white p-6 rounded-2xl shadow-xl"
            >
              <p className="text-[40px] md:text-[52px] font-bold text-gray-100 mb-2">
                {stat.val}
              </p>
              <p className="text-[16px] md:text-[20px] text-gray-200 font-medium">
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
