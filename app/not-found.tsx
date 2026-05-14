"use client";

import React from "react";
import Link from "next/link";
import { Compass, Home, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] bg-emerald-100 rounded-full blur-3xl opacity-50 mix-blend-multiply animate-blob" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-teal-100 rounded-full blur-3xl opacity-50 mix-blend-multiply animate-blob animation-delay-2000" />
      </div>

      <div className="relative z-10 max-w-2xl w-full text-center space-y-10">
        {/* Illustration Section */}
        <div className="relative flex justify-center items-center h-64">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[12rem] md:text-[16rem] font-black text-slate-100 tracking-tighter select-none">
              404
            </span>
          </div>
          
          <div className="relative z-10 flex flex-col items-center justify-center animate-bounce-slow">
            <div className="w-32 h-32 bg-white rounded-[2.5rem] shadow-2xl shadow-emerald-900/10 flex items-center justify-center border border-slate-100 rotate-12 transition-transform hover:rotate-0 duration-500 cursor-pointer">
              <div className="relative">
                <Compass className="w-16 h-16 text-emerald-500 animate-spin-slow" />
                <div className="absolute -bottom-2 -right-2 bg-red-100 p-2 rounded-full border-4 border-white">
                  <SearchX className="w-5 h-5 text-red-500" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-4 px-4">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Oops! Tersesat?
          </h1>
          <p className="text-lg text-slate-500 max-w-md mx-auto leading-relaxed">
            Halaman yang Anda cari mungkin telah dihapus, diubah namanya, atau memang tidak pernah ada.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/"
            className="group relative flex items-center gap-3 px-8 py-4 bg-emerald-600 text-white font-bold rounded-2xl overflow-hidden shadow-xl shadow-emerald-900/20 hover:bg-emerald-700 transition-all hover:-translate-y-1 w-full sm:w-auto justify-center"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
            <Home className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Kembali ke Beranda</span>
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="px-8 py-4 bg-white text-slate-600 font-bold rounded-2xl border border-slate-200 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900 transition-all shadow-sm w-full sm:w-auto"
          >
            Halaman Sebelumnya
          </button>
        </div>
      </div>
      
      {/* Custom Styles for Animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }
      `}} />
    </main>
  );
}
