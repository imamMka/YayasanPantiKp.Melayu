import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
      <div className="md:col-span-2">
        <p className="text-orange-600 font-semibold tracking-widest text-xs mb-4 uppercase">
          Bersama Untuk Masa Depan
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-[#2D3E33] leading-tight mb-4">
          Setiap Anak Berhak Tumbuh dengan{" "}
          <span className="text-green-700">Cinta & Harapan</span>
        </h2>
        <p className="text-gray-600 mb-8 max-w-lg">
          Mendampingi 47 anak asuh menuju masa depan cerah melalui pendidikan,
          kesehatan, dan kasih sayang yang nyata.
        </p>
        <div className="flex gap-4">
          <button className="bg-[#C58058] text-white px-6 py-3 rounded-md font-medium hover:bg-[#a66a48]">
            Donasi Sekarang
          </button>
          <button className="bg-[#C58058]/20 text-[#C58058] px-6 py-3 rounded-md font-medium border border-[#C58058]">
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
            <p className="text-3xl font-bold">{stat.val}</p>
            <p className="text-xs text-gray-300">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
