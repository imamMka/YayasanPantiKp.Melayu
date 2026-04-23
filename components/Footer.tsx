import React from "react";
import Link from "next/link";

interface SocialPlatform {
  name: string;
  url: string;
}

const platforms: SocialPlatform[] = [
  { name: "instagram", url: "https://instagram.com" },
  { name: "youtube", url: "https://youtube.com" },
  { name: "facebook", url: "https://facebook.com" },
];

export const Socials: React.FC = () => {
  return (
    <section className="bg-[#262626] border-t border-white/5 py-4 px-6 m-10 rounded-lg">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-white text-[20px] md:text-[24px] font-medium tracking-wide w-full md:w-auto text-center md:text-left">
          Ikuti perkembangan kami
        </p>

        <div className="flex flex-col w-full md:flex-row items-center justify-end gap-3">
          {platforms.map((soc) => (
            <a
              key={soc.name}
              href={soc.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-1.5 rounded-xl text-[20px] md:text-[24px] tracking-widest
                         bg-[#C4714A] text-white
                         hover:bg-[#5E4134] hover:text-white transition-all duration-300 capitalize w-full md:w-auto text-center"
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
    <footer className="bg-[#2d2d2d] text-white py-16">
      <div className="container mx-auto px-6 flex flex-col lg:flex-row justify-between items-start gap-12">
        <div className="lg:col-span-2 flex flex-row items-start gap-6 justify-between">
          <div className="w-20 h-20 bg-green-200 rounded-full shrink-0"></div>
          <Link href="/" className="flex flex-col items-start gap-3 mb-4 group">
            <h2 className="text-[48px] md:text-[64px] font-semibold leading-tight group-hover:text-gray-300 transition-colors">
              Panti Asuhan
              <br />
              Kampung Melayu
            </h2>
            <p className="text-white text-[20px] md:text-[24px]">
              Terdaftar Kemenkumham
            </p>
          </Link>
        </div>

        <div className="flex flex-col md:flex-row gap-12 justify-between">
          {/* Navigasi Internal - Semua Href & Logic Huruf Kecil */}
          <ul className="space-y-2 text-white text-[20px] md:text-[24px] w-fit">
            {["home", "profile", "news", "gallery"].map((item) => (
              <li key={item}>
                <Link
                  href={item === "home" ? "/" : `/${item}`}
                  className="hover:text-orange-400 transition-colors capitalize"
                >
                  {/* Logic translasi ke Bahasa Indonesia */}
                  {item === "profile"
                    ? "profil"
                    : item === "news"
                      ? "berita"
                      : item === "gallery"
                        ? "galeri"
                        : item}
                </Link>
              </li>
            ))}
          </ul>

          {/* Navigasi Eksternal Sosial Media */}
          <ul className="space-y-2 text-white text-[20px] md:text-[24px]">
            {["instagram", "facebook", "youtube", "x.com"].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-400 transition-colors capitalize"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="text-center border-t border-gray-800 text-[14px] text-white mt-12 pt-4">
        Copyright ©2026 Panti Asuhan Kp. Melayu. All Rights Reserved. Powered By{" "}
        <a
          href="https://imammka.netlify.app"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-orange-400 hover:text-orange-300"
        >
          KOIStudio
        </a>
      </div>
    </footer>
  );
};
