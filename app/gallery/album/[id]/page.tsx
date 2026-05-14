// app/gallery/album/[id]/page.tsx
import Link from "next/link";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ChevronLeft, Calendar, Image as ImageIcon } from "lucide-react";

interface AlbumDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function AlbumDetailPage({ params }: AlbumDetailPageProps) {
  const { id } = await params;
  
  const album = await prisma.album.findUnique({
    where: { id: Number(id) },
    include: {
      photos: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!album) {
    notFound();
  }

  return (
    <main className="bg-white min-h-screen">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12 space-y-6">
          <Link
            href="/gallery"
            className="inline-flex items-center text-emerald-600 font-bold hover:underline gap-2 group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            KEMBALI KE GALERI
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-8">
            <div className="space-y-2">
               <div className="flex items-center gap-2 text-slate-400 font-bold uppercase tracking-[0.2em] text-xs">
                <Calendar className="w-4 h-4" />
                Album {album.year}
              </div>
              <h1 className="text-[48px] md:text-[64px] font-black text-slate-950 leading-tight tracking-tighter capitalize">
                {album.title}
              </h1>
              {album.description && (
                <p className="text-slate-500 text-lg md:text-xl max-w-2xl font-medium">
                  {album.description}
                </p>
              )}
            </div>
            
            <div className="bg-emerald-50 px-6 py-3 rounded-2xl border border-emerald-100 text-emerald-700 font-bold">
              {album.photos.length} Koleksi Foto
            </div>
          </div>
        </div>

        {/* Photo Grid */}
        {album.photos.length === 0 ? (
          <div className="text-center py-24 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
             <ImageIcon className="w-16 h-16 text-slate-200 mx-auto mb-4" />
             <p className="text-slate-400 font-bold">Belum ada foto dalam album ini.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {album.photos.map((photo) => {
               const imageUrl = photo.imageUrl.includes('r2.dev') 
                ? `/api/images/${photo.imageUrl.split('r2.dev/').pop()}` 
                : photo.imageUrl;

               return (
                <Link
                  key={photo.id}
                  href={`/gallery/preview/${photo.id}`}
                  className="group relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
                >
                  <img
                    src={imageUrl}
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-8 flex flex-col justify-end">
                    <h3 className="text-white font-bold text-lg leading-tight">{photo.title}</h3>
                    <p className="text-white/60 text-xs font-medium mt-1">
                      {new Date(photo.createdAt).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
