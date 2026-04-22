"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Variants dengan tipe data explicit agar tidak error/merah
  const menuVariants: Variants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        when: "afterChildren",
      },
    },
    opened: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const linkVariants: Variants = {
    closed: { y: -10, opacity: 0 },
    opened: { y: 0, opacity: 1 },
  };

  return (
    <nav className="bg-[#2D2D2D] text-white p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4 relative">
        {/* Logo & Title */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-green-200 rounded-full shrink-0"></div>
          <div>
            <h1 className="font-bold text-[20px] md:text-[32px] leading-tight">
              Panti Asuhan Kp. Melayu
            </h1>
            <p className="text-[14px] md:text-[24px] text-gray-300">
              Terdaftar Kemenkumham
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6 items-center">
          <Link
            href="/Profile"
            className="text-[20px] hover:text-[#4A6B55] transition-colors"
          >
            Profil
          </Link>
          <Link
            href="/News"
            className="text-[20px] hover:text-[#4A6B55] transition-colors"
          >
            Berita
          </Link>
          <Link
            href="/Gallery"
            className="text-[20px] hover:text-[#4A6B55] transition-colors"
          >
            Galeri
          </Link>
          <Link
            href="/Donation"
            className="text-[20px] bg-[#C4714A] px-5 py-2 rounded-lg hover:bg-[#C4714A]/80 transition-all"
          >
            Donasi Sekarang
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          onClick={toggleMenu}
          whileTap={{ scale: 0.9 }}
          className="md:hidden p-2 rounded-lg text-white z-50"
        >
          <img
            src={isOpen ? "/close.svg" : "/Hamburger.svg"}
            alt="menu toggle"
            className="w-10 h-10"
          />
        </motion.button>
      </div>

      {/* Mobile Dropdown Menu (Full Width) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-nav"
            variants={menuVariants}
            initial="closed"
            animate="opened"
            exit="closed"
            className="absolute top-full left-0 w-full bg-[#2D2D2D] border-t border-white/10 overflow-hidden md:hidden shadow-2xl"
          >
            <div className="flex flex-col items-start px-8 py-10 space-y-8">
              <Link
                href="/Profile"
                onClick={() => setIsOpen(false)}
                className="w-full"
              >
                <motion.span
                  variants={linkVariants}
                  className="text-[22px] block hover:text-[#4A6B55]"
                >
                  Profil
                </motion.span>
              </Link>
              <Link
                href="/News"
                onClick={() => setIsOpen(false)}
                className="w-full"
              >
                <motion.span
                  variants={linkVariants}
                  className="text-[22px] block hover:text-[#4A6B55]"
                >
                  Berita
                </motion.span>
              </Link>
              <Link
                href="/Gallery"
                onClick={() => setIsOpen(false)}
                className="w-full"
              >
                <motion.span
                  variants={linkVariants}
                  className="text-[22px] block hover:text-[#4A6B55]"
                >
                  Galeri
                </motion.span>
              </Link>
              <Link
                href="/Donation"
                onClick={() => setIsOpen(false)}
                className="w-full pt-4 border-t border-white/10"
              >
                <motion.span
                  variants={linkVariants}
                  className="text-[22px] block text-orange-400 font-bold"
                >
                  Donasi Sekarang
                </motion.span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
