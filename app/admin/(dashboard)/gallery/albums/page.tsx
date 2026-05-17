import prisma from "@/lib/prisma";
import Link from "next/link";
import { Plus, FolderHeart, Calendar, ChevronLeft, Trash2, Edit2 } from "lucide-react";
import { deleteAlbum } from "@/lib/actions";
import DeleteButton from "@/components/DeleteButton";

export default async function AdminAlbumsPage() {
  const albums = await prisma.album.findMany({
    include: {
      _count: {
        select: { photos: true }
      }
    },
    orderBy: { year: "desc" }
  });

  // We will pass deleteAlbum directly to the client component

  return (
    <div className="space-y-6">
      {/* Breadcrumbs / Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/gallery"
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-white rounded-xl border border-transparent hover:border-slate-200 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Sorotan & Album</h1>
            <p className="text-slate-500 text-sm">Kelola pengelompokan foto seperti Instagram Highlights.</p>
          </div>
        </div>
        <Link
          href="/admin/gallery/albums/new"
          className="inline-flex items-center justify-center px-4 py-2.5 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-all shadow-sm shadow-emerald-200"
        >
          <Plus className="w-5 h-5 mr-2" />
          Buat Sorotan Baru
        </Link>
      </div>

      {/* Highlights List */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {albums.map((album) => (
          <div key={album.id} className="group relative flex flex-col items-center gap-3">
            {/* Highlight Circle UI */}
            <div className="relative p-1 rounded-full border-2 border-emerald-500/20 group-hover:border-emerald-500 transition-all duration-500">
               <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-slate-100 border-4 border-white shadow-md">
                {album.coverImage ? (
                  <img 
                    src={album.coverImage.includes('r2.dev') ? `/api/images/${album.coverImage.split('r2.dev/').pop()}` : album.coverImage} 
                    alt={album.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                  />
                ) : (
                   <div className="w-full h-full flex items-center justify-center text-slate-300">
                    <FolderHeart className="w-8 h-8" />
                  </div>
                )}
              </div>
            </div>

            {/* Label */}
            <div className="text-center">
              <h4 className="font-bold text-slate-900 text-sm">{album.title}</h4>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{album.year} • {album._count.photos} Foto</p>
            </div>

            {/* Actions (Floating) */}
            <div className="absolute top-0 right-0 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity flex flex-col gap-1 translate-x-2 -translate-y-2">
              <DeleteButton 
                confirmMessage={`Hapus album "${album.title}"? (Foto-foto di dalamnya tidak akan terhapus)`}
                className="p-2 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700"
                actionFn={deleteAlbum}
                id={album.id}
              />
              <Link 
                href={`/admin/gallery/albums/${album.id}/edit`}
                className="p-2 bg-white text-slate-600 rounded-lg shadow-lg border border-slate-100 hover:bg-slate-50"
              >
                <Edit2 className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}

        {/* Empty State / Add New Placeholder */}
        <Link 
          href="/admin/gallery/albums/new"
          className="flex flex-col items-center gap-3 group"
        >
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 border-dashed border-slate-200 flex items-center justify-center bg-slate-50 group-hover:bg-white group-hover:border-emerald-300 transition-all">
            <Plus className="w-8 h-8 text-slate-300 group-hover:text-emerald-500" />
          </div>
          <span className="text-xs font-bold text-slate-400 group-hover:text-emerald-600">Buat Baru</span>
        </Link>
      </div>
    </div>
  );
}
