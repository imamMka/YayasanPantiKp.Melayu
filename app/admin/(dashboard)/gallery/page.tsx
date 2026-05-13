import prisma from "@/lib/prisma";
import Link from "next/link";
import { Plus, ImageIcon, Calendar } from "lucide-react";
import { deleteGallery } from "@/lib/actions";
import DeleteButton from "@/components/DeleteButton";
import { Gallery } from "@prisma/client";

export default async function GalleryPage() {
  const items: Gallery[] = await prisma.gallery.findMany({
    orderBy: { createdAt: "desc" },
  });

  async function deleteAction(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    if (id) await deleteGallery(id);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Galeri Foto</h1>
          <p className="text-slate-500 text-sm">Kelola dokumentasi kegiatan dan foto anak asuh.</p>
        </div>
        <Link
          href="/admin/gallery/new"
          className="inline-flex items-center justify-center px-4 py-2.5 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-all shadow-sm shadow-emerald-200"
        >
          <Plus className="w-5 h-5 mr-2" />
          Unggah Foto Baru
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-4">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto border border-slate-100">
            <ImageIcon className="w-8 h-8 text-slate-300" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900">Belum ada foto</h3>
            <p className="text-slate-400 text-sm max-w-xs mx-auto">Mulai unggah dokumentasi kegiatan pertama Anda untuk ditampilkan di galeri publik.</p>
          </div>
          <Link
            href="/admin/gallery/new"
            className="inline-flex items-center text-emerald-600 font-bold hover:underline"
          >
            Unggah foto sekarang →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <div key={item.id} className="group bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <img
                  src={item.imageUrl.includes('r2.dev') ? `/api/images/${item.imageUrl.split('r2.dev/').pop()}` : item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                   <form action={deleteAction}>
                    <input type="hidden" name="id" value={item.id} />
                    <DeleteButton 
                      confirmMessage="Hapus foto ini dari galeri?" 
                      className="p-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all shadow-lg"
                    />
                  </form>
                </div>
              </div>
              <div className="p-4 space-y-2">
                <h4 className="font-bold text-slate-900 line-clamp-1">{item.title}</h4>
                <div className="flex items-center text-[11px] text-slate-400">
                  <Calendar className="w-3 h-3 mr-1" />
                  {new Date(item.createdAt).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
