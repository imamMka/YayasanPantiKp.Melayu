"use client";

import React, { useState, useEffect } from "react";
import { 
  Info,
  X,
  FileText,
  Image as ImageIcon,
  Users,
  TrendingUp,
  Clock,
  ArrowRight,
  HelpCircle
} from "lucide-react";
import Link from "next/link";

// We'll move the data fetching to a separate action or fetch it via API
// but for now, let's keep it as a client component that receives props
// OR we can make it a server component with a client-side wrapper for the sidebar.

interface DashboardProps {
  newsCount: number;
  galleryCount: number;
  recentNews: any[];
}

export default function DashboardOverview() {
  const [showMobileHelp, setShowMobileHelp] = useState(false);
  const [data, setData] = useState<DashboardProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/admin/dashboard-stats");
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Clock className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  const stats = [
    { name: "Total Artikel", value: data.newsCount, icon: FileText, color: "bg-blue-500", text: "text-blue-600" },
    { name: "Total Foto", value: data.galleryCount, icon: ImageIcon, color: "bg-emerald-500", text: "text-emerald-600" },
    { name: "Anak Asuh", value: "42", icon: Users, color: "bg-orange-500", text: "text-orange-600" },
    { name: "Donasi Bulan Ini", value: "Rp 12.5M", icon: TrendingUp, color: "bg-purple-500", text: "text-purple-600" },
  ];

  const HelpContent = () => (
    <div className="space-y-6">
      <h3 className="font-bold text-slate-900 flex items-center">
        <TrendingUp className="w-5 h-5 mr-2 text-emerald-500" />
        Bantuan & Panduan
      </h3>
      
      <div className="bg-emerald-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        <div className="relative z-10 space-y-4">
          <h4 className="text-xl font-bold">Panduan Admin</h4>
          <div className="space-y-4">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <h5 className="text-xs font-black uppercase tracking-wider mb-2 text-emerald-300">Ganti Password/Email?</h5>
              <p className="text-xs leading-relaxed text-emerald-50/80">
                Buka menu <span className="font-bold text-white">Pengaturan</span> di sidebar. Anda dapat mengubah username, password, dan email pemulihan di sana.
              </p>
            </div>
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <h5 className="text-xs font-black uppercase tracking-wider mb-2 text-emerald-300">Kelola Konten?</h5>
              <p className="text-xs leading-relaxed text-emerald-50/80">
                Gunakan menu <span className="font-bold text-white">Berita</span> untuk artikel dan <span className="font-bold text-white">Galeri</span> untuk foto.
              </p>
            </div>
          </div>
          <a 
            href="mailto:imammka23@gmail.com?subject=Bantuan Dashboard Admin Panti"
            className="block w-full py-3 bg-white text-emerald-900 text-center font-bold rounded-xl shadow-lg hover:bg-emerald-50 transition-all"
          >
            Tanya Developer
          </a>
        </div>
      </div>
      
      <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm space-y-4">
        <h4 className="font-bold text-slate-900 flex items-center gap-2">
          <Clock className="w-4 h-4 text-emerald-500" />
          FAQ Singkat
        </h4>
        <div className="space-y-4">
          <details className="group border-b border-slate-100 pb-3">
            <summary className="list-none cursor-pointer flex items-center justify-between font-bold text-xs text-slate-700">
              Lupa password admin?
              <ArrowRight className="w-3 h-3 group-open:rotate-90 transition-transform" />
            </summary>
            <p className="mt-2 text-[11px] text-slate-500 leading-relaxed">
              Gunakan fitur "Lupa Password" di halaman login. Kode dikirim ke email pemulihan.
            </p>
          </details>
          
          <details className="group border-b border-slate-100 pb-3">
            <summary className="list-none cursor-pointer flex items-center justify-between font-bold text-xs text-slate-700">
              Cara buat Sorotan?
              <ArrowRight className="w-3 h-3 group-open:rotate-90 transition-transform" />
            </summary>
            <p className="mt-2 text-[11px] text-slate-500 leading-relaxed">
              Di menu Galeri, klik "Kelola Sorotan" untuk membuat album tahunan.
            </p>
          </details>
        </div>
        
        <div className="pt-2 text-center">
          <p className="text-[10px] text-slate-400">
            Kontak Teknis: <span className="font-bold text-slate-600">imammka23@gmail.com</span>
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 bg-white min-h-full relative">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Ringkasan Aktivitas</h1>
          <p className="text-slate-500 text-sm">Selamat datang kembali! Berikut status terkini yayasan.</p>
        </div>
        {/* Mobile Info Button */}
        <button
          onClick={() => setShowMobileHelp(true)}
          className="lg:hidden p-3 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100 shadow-sm"
        >
          <Info className="w-6 h-6" />
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl ${stat.color} bg-opacity-10 ${stat.text}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Live</span>
              </div>
              <div className="space-y-1">
                <h3 className="text-3xl font-bold text-slate-900">{stat.value}</h3>
                <p className="text-sm font-medium text-slate-500">{stat.name}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-emerald-500" />
              Artikel Terbaru
            </h3>
            <Link href="/admin/articles" className="text-sm font-bold text-emerald-600 hover:underline flex items-center">
              Lihat Semua
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            {data.recentNews.length === 0 ? (
              <div className="p-12 text-center text-slate-400 italic">Belum ada artikel.</div>
            ) : (
              <div className="divide-y divide-slate-100">
                {data.recentNews.map((item: any) => (
                  <div key={item.id} className="p-4 hover:bg-slate-50 transition-colors flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100 border border-slate-200">
                      <img 
                        src={item.imageUrl.includes('r2.dev') ? `/api/images/${item.imageUrl.split('r2.dev/').pop()}` : item.imageUrl} 
                        className="w-full h-full object-cover" 
                        alt="" 
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-slate-900 truncate">{item.title}</h4>
                      <p className="text-xs text-slate-500 mt-1">
                        {item.category} • {new Date(item.createdAt).toLocaleDateString("id-ID")}
                      </p>
                    </div>
                    <Link
                      href={`/admin/articles/${item.id}/edit`}
                      className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Desktop Help Sidebar */}
        <div className="hidden lg:block">
          <HelpContent />
        </div>
      </div>

      {/* Mobile Help Sidebar Overlay */}
      {showMobileHelp && (
        <>
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] lg:hidden"
            onClick={() => setShowMobileHelp(false)}
          />
          <div className="fixed inset-y-0 right-0 w-[85%] max-w-sm bg-slate-50 z-[101] shadow-2xl p-6 overflow-y-auto lg:hidden">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-2 text-emerald-600 font-black italic">
                <HelpCircle className="w-6 h-6" />
                HELP CENTER
              </div>
              <button 
                onClick={() => setShowMobileHelp(false)}
                className="p-2 bg-white rounded-xl shadow-sm text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <HelpContent />
          </div>
        </>
      )}
    </div>
  );
}
