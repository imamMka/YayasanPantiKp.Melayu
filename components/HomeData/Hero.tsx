import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
      <div className="md:col-span-2">
        <p className="text-[#4A6B55] font-semibold tracking-widest text-[20px] md:text-[24px] mb-4 uppercase">
          Bersama Untuk Masa Depan
        </p>
        <h2 className="text-[48px] md:text-[64px] font-semibold text-[#2D2D2D] leading-tight mb-4">
          Setiap Anak Berhak Tumbuh dengan{" "}
          <span className="text-[#4A6B55]">Cinta & Harapan</span>
        </h2>
        <p className="text-[#6E6E6E] text-[20px] md:text-[24px] mb-8 max-w-lg">
          Mendampingi 47 anak asuh menuju masa depan cerah melalui pendidikan,
          kesehatan, dan kasih sayang yang nyata.
        </p>
        <div className="flex gap-4">
          <button className="text-[20px] md:text-[24px] bg-[#C4714A] text-white px-6 py-3 rounded-2xl font-medium hover:bg-[#a66a48] cursor-pointer">
            Donasi Sekarang
          </button>
          <button className="text-[20px] md:text-[24px] bg-[#C4714A]/20 text-[#C58058] px-6 py-3 rounded-2xl font-medium border border-[#C4714A] hover:bg-[#C4714A]/30 cursor-pointer">
            Profil Kami
          </button>
        </div>
      </div>
      <div className="space-y-4">
        {[
          { label: "Anak asuh aktif", val: "47+" },
          { label: "Donasi telah masuk", val: "Rp 12.4jt" },
          { label: "Berdiri & Berkarya", val: "12 Tahun" },
        ].map((stat, i) => (
          <div key={i} className="bg-[#2D3E33] text-white p-6 rounded-lg">
            <p className="text-[48px] md:text-[64px] font-bold">{stat.val}</p>
            <p className="text-[20px] md:text-[24px] text-gray-300">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
