import React from "react";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-[#2D3E33] text-white p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-green-200 rounded-full"></div>
          <div>
            <h1 className="font-bold text-sm leading-tight">
              Panti Asuhan Kp. Melayu
            </h1>
            <p className="text-[10px] text-gray-300">Terdaftar Kemenkumham</p>
          </div>
        </Link>
        <div className="hidden md:flex gap-6 text-sm items-center">
          <Link href="/Profile" className="hover:text-orange-400">
            Profil
          </Link>
          <Link href="/News" className="hover:text-orange-400">
            Berita
          </Link>
          <Link href="/Gallery" className="hover:text-orange-400">
            Galeri
          </Link>
          <Link
            href="/Donation"
            className="bg-transparent border border-gray-400 px-4 py-2 rounded text-xs hover:bg-white hover:text-[#2D3E33] transition"
          >
            Donasi Sekarang
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
