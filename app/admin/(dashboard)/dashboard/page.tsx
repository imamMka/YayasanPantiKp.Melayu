import prisma from "@/lib/prisma"; 
import { News } from "@prisma/client";
import { 
  FileText, 
  Image as ImageIcon, 
  Users, 
  TrendingUp,
  Clock,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export default async function DashboardOverview() {
  const [newsCount, galleryCount] = await Promise.all([
    prisma.news.count(),
    prisma.gallery.count(),
  ]);

  const recentNews: News[] = await prisma.news.findMany({
    take: 3,
    orderBy: { createdAt: "desc" }
  });

  const stats = [
    { name: "Total Artikel", value: newsCount, icon: FileText, color: "bg-blue-500", text: "text-blue-600" },
    { name: "Total Foto", value: galleryCount, icon: ImageIcon, color: "bg-emerald-500", text: "text-emerald-600" },
    { name: "Anak Asuh", value: "42", icon: Users, color: "bg-orange-500", text: "text-orange-600" },
    { name: "Donasi Bulan Ini", value: "Rp 12.5M", icon: TrendingUp, color: "bg-purple-500", text: "text-purple-600" },
  ];

  return (
    <div className="space-y-8 bg-white min-h-full">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Ringkasan Aktivitas</h1>
        <p className="text-slate-500 text-sm">Selamat datang kembali! Berikut adalah status terkini yayasan.</p>
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
        {/* Recent Articles */}
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
            {recentNews.length === 0 ? (
              <div className="p-12 text-center text-slate-400 italic">Belum ada artikel.</div>
            ) : (
              <div className="divide-y divide-slate-100">
                {recentNews.map((item) => (
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

        {/* Quick Actions / Tips */}
        <div className="space-y-6">
          <h3 className="font-bold text-slate-900 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-emerald-500" />
            Tips & Bantuan
          </h3>
          <div className="bg-emerald-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
            <div className="relative z-10 space-y-4">
              <h4 className="text-xl font-bold">Butuh Bantuan?</h4>
              <p className="text-emerald-100/80 text-sm leading-relaxed">
                Gunakan menu sidebar untuk mengelola konten yayasan. Foto galeri akan langsung muncul di halaman depan.
              </p>
              <button className="w-full py-3 bg-white text-emerald-900 font-bold rounded-xl shadow-lg hover:bg-emerald-50 transition-all">
                Baca Panduan Admin
              </button>
            </div>
          </div>
          
          <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm">
            <h4 className="font-bold text-slate-900 mb-4">Pesan Sistem</h4>
            <div className="space-y-3">
              <div className="flex gap-3 text-xs">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1 flex-shrink-0" />
                <p className="text-slate-600"><span className="font-bold">Backup:</span> Sistem melakukan backup otomatis setiap 24 jam.</p>
              </div>
              <div className="flex gap-3 text-xs">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1 flex-shrink-0" />
                <p className="text-slate-600"><span className="font-bold">Update:</span> Dashboard versi 2.0.0 berhasil dipasang.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
