import prisma from "@/lib/prisma"; 
import Link from "next/link";
import { Plus, Edit, ExternalLink } from "lucide-react";
import { deleteNews } from "@/lib/actions";
import DeleteButton from "@/components/DeleteButton";
import { News } from "@prisma/client";

export default async function ArticlesPage() {
  const articles: News[] = await prisma.news.findMany({
    orderBy: { createdAt: "desc" },
  });

  async function deleteAction(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    if (id) await deleteNews(id);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Artikel & Berita</h1>
          <p className="text-slate-500 text-sm">Kelola semua konten berita dan update yayasan.</p>
        </div>
        <Link
          href="/admin/articles/new"
          className="inline-flex items-center justify-center px-4 py-2.5 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-all shadow-sm shadow-emerald-200"
        >
          <Plus className="w-5 h-5 mr-2" />
          Tulis Artikel Baru
        </Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Thumbnail</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Judul</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Kategori</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Tanggal</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {articles.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400 italic">
                    Belum ada artikel. Mulai tulis artikel pertama Anda!
                  </td>
                </tr>
              ) : (
                articles.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-16 h-10 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                        <img 
                          src={item.imageUrl.includes('r2.dev') ? `/api/images/${item.imageUrl.split('r2.dev/').pop()}` : item.imageUrl} 
                          alt="" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs truncate font-medium text-slate-900">{item.title}</div>
                      <div className="text-xs text-slate-400 mt-0.5">/{item.slug}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {new Date(item.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric"
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                      <Link
                        href={`/news/preview/${item.slug}`}
                        target="_blank"
                        className="inline-flex p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                        title="Lihat Publik"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </Link>
                      <Link
                        href={`/admin/articles/${item.id}/edit`}
                        className="inline-flex p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        title="Edit"
                      >
                        <Edit className="w-5 h-5" />
                      </Link>
                      <form action={deleteAction} className="inline">
                        <input type="hidden" name="id" value={item.id} />
                        <DeleteButton confirmMessage="Hapus artikel ini? Tindakan ini tidak dapat dibatalkan." />
                      </form>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
