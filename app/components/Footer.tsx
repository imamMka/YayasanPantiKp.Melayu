import React from "react";

interface SocialPlatform {
  name: string;
  url: string;
}

const platforms: SocialPlatform[] = [
  { name: "Instagram", url: "#" },
  { name: "Youtube", url: "#" },
  { name: "Facebook", url: "#" },
];

export const Socials: React.FC = () => {
  return (
    <section className="bg-[#262626] border-t border-white/5 py-4 px-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Teks Kiri */}
        <p className="text-white text-sm font-medium tracking-wide">
          Ikuti perkembangan kami
        </p>

        {/* Tombol-tombol Sosial Media */}
        <div className="flex gap-3">
          {platforms.map((soc) => (
            <a
              key={soc.name}
              href={soc.url}
              className="px-6 py-1.5 rounded text-[11px] font-bold uppercase tracking-widest
                         bg-[#4A3228] text-[#D9A282] border border-[#5E4134]
                         hover:bg-[#5E4134] hover:text-white transition-all duration-300"
            >
              {soc.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1A1A1A] text-white py-16">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-200 rounded-full"></div>
            <h2 className="text-xl font-bold">
              Panti Asuhan
              <br />
              Kampung Melayu
            </h2>
          </div>
          <p className="text-gray-500 text-sm">Terdaftar Kemenkumham</p>
        </div>
        <div className="grid grid-cols-2 gap-8 lg:col-span-2">
          <ul className="space-y-2 text-gray-400 text-sm">
            {["Home", "Profil", "Berita", "Galeri"].map((item) => (
              <li key={item}>
                <a href="#">{item}</a>
              </li>
            ))}
          </ul>
          <ul className="space-y-2 text-gray-400 text-sm">
            {["Instagram", "Facebook", "Youtube", "X.com"].map((item) => (
              <li key={item}>
                <a href="#">{item}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="text-center mt-12 pt-8 border-t border-gray-800 text-[10px] text-gray-600">
        Copyright © 2026 Panti Asuhan Kampung Melayu
      </div>
    </footer>
  );
};
