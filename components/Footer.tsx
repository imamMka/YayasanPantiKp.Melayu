import React from "react";
import Link from "next/link";
import { 
  Shield, 
  ArrowRight
} from "lucide-react";

// Raw SVGs for Brand Icons since they are missing in this Lucide version
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.14 1 12 1 12s0 3.86.42 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.86 23 12 23 12s0-3.86-.42-5.58z"></path>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"></polygon>
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

interface SocialPlatform {
  name: string;
  url: string;
  icon: React.ReactNode;
  color: string;
}

const platforms: SocialPlatform[] = [
  { 
    name: "Instagram", 
    url: "https://instagram.com/pantiasuhankpmelayu", 
    icon: <InstagramIcon className="w-5 h-5 md:w-6 md:h-6" />,
    color: "hover:bg-pink-600 shadow-pink-900/20"
  },
  { 
    name: "YouTube", 
    url: "https://youtube.com/@pantiasuhankpmelayu", 
    icon: <YoutubeIcon className="w-5 h-5 md:w-6 md:h-6" />,
    color: "hover:bg-red-600 shadow-red-900/20"
  },
  { 
    name: "Facebook", 
    url: "https://facebook.com/pantiasuhankpmelayu", 
    icon: <FacebookIcon className="w-5 h-5 md:w-6 md:h-6" />,
    color: "hover:bg-blue-600 shadow-blue-900/20"
  },
];

export const Socials: React.FC = () => {
  return (
    <section className="bg-slate-950 py-10 md:py-16 px-6 m-4 md:m-10 rounded-[2.5rem] relative overflow-hidden group border border-white/5">
      {/* Decorative Gradient */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl transition-transform duration-1000 group-hover:scale-150" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl transition-transform duration-1000 group-hover:scale-150" />

      <div className="container mx-auto relative z-10 flex flex-col lg:flex-row justify-between items-center gap-10">
        <div className="text-center lg:text-left space-y-2">
          <h3 className="text-white text-[24px] sm:text-[28px] md:text-[36px] font-black tracking-tight leading-tight">
            Ikuti Jejak Kebaikan Kami
          </h3>
          <p className="text-slate-400 text-[16px] md:text-[18px] font-medium max-w-md">
            Dapatkan update harian tentang senyum anak-anak asuh dan perkembangan program yayasan.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full lg:w-auto">
          {platforms.map((soc) => (
            <a
              key={soc.name}
              href={soc.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-[16px] md:text-[18px] font-bold text-white bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 shadow-xl ${soc.color}`}
            >
              {soc.icon}
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
    <footer className="bg-slate-950 text-white py-12 md:py-20 border-t border-white/5">
      <div className="container mx-auto px-6 flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-24">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 w-full lg:w-auto">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-200 rounded-full shrink-0"></div>
          <Link href="/" className="flex flex-col items-center sm:items-start gap-2 sm:gap-3 group text-center sm:text-left">
            <h2 className="text-[32px] sm:text-[48px] md:text-[64px] font-semibold leading-tight group-hover:text-gray-300 transition-colors">
              Panti Asuhan
              <br />
              Kampung Melayu
            </h2>
            <p className="text-white text-[16px] sm:text-[20px] md:text-[24px] opacity-80">
              Terdaftar Kemenkumham
            </p>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 sm:gap-20 w-full lg:w-auto">
          {/* Navigasi Internal */}
          <div className="space-y-4">
            <h4 className="text-emerald-500 font-bold uppercase tracking-widest text-sm">Navigasi</h4>
            <ul className="space-y-3 text-white text-[18px] md:text-[22px]">
              {["home", "profile", "news", "gallery"].map((item) => (
                <li key={item}>
                  <Link
                    href={item === "home" ? "/" : `/${item}`}
                    className="hover:text-amber-500 transition-colors capitalize opacity-80 hover:opacity-100"
                  >
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
          </div>

          {/* Sosial Media */}
          <div className="space-y-4">
            <h4 className="text-emerald-500 font-bold uppercase tracking-widest text-sm">Media Sosial</h4>
            <ul className="space-y-3 text-white text-[18px] md:text-[22px]">
              {["instagram", "facebook", "youtube", "x.com"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-amber-500 transition-colors capitalize opacity-80 hover:opacity-100"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 border-t border-white/10 text-[13px] md:text-[15px] text-white/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        <div className="max-w-md">
          Copyright ©2026 Panti Asuhan Kp. Melayu. All Rights Reserved. Powered By{" "}
          <a
            href="https://imammka.my.id"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-amber-500 hover:text-amber-400"
          >
            Imam Mka
          </a>
        </div>

        {/* Hidden Admin Entry */}
        <Link
          href="/admin"
          className="bg-white/5 hover:bg-white/10 text-white transition-all p-3 rounded-xl border border-white/10"
          title="Admin Area"
        >
          <Shield className="w-5 h-5" />
        </Link>
      </div>
    </footer>
  );
};
