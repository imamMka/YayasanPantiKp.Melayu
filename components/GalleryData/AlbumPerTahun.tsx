import Link from "next/link";
import { Album, Gallery } from "@prisma/client";

interface AlbumWithPhotos extends Album {
  photos: Gallery[];
  _count: {
    photos: number;
  };
}

interface AlbumPerTahunProps {
  albums?: AlbumWithPhotos[];
}

export default function AlbumPerTahun({ albums = [] }: AlbumPerTahunProps) {
  if (albums.length === 0) return null;

  return (
    <section className="mb-20">
      <h2 className="text-[40px] md:text-[64px] font-black text-slate-950 mb-8 tracking-tighter">
        Album & Sorotan
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {albums.map((album) => (
          <Link
            key={album.id}
            href={`/gallery/album/${album.id}`}
            className="group block cursor-pointer"
          >
            <div className="bg-white p-3 rounded-[2.5rem] border border-slate-100 shadow-sm group-hover:shadow-xl group-hover:-translate-y-2 transition-all duration-500">
              {/* Grid Mini Preview (Instagram Highlights style) */}
              <div className="grid grid-cols-2 gap-1.5 mb-4 overflow-hidden rounded-[1.8rem] aspect-square">
                {album.photos.length > 0 ? (
                  album.photos.map((photo, idx) => {
                    const imageUrl = photo.imageUrl.includes('r2.dev') 
                      ? `/api/images/${photo.imageUrl.split('r2.dev/').pop()}` 
                      : photo.imageUrl;
                    
                    return (
                      <div
                        key={photo.id}
                        className="aspect-square bg-slate-50 overflow-hidden"
                      >
                        <img
                          src={imageUrl}
                          alt={`Preview ${idx}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>
                    );
                  })
                ) : (
                  <div className="col-span-2 flex items-center justify-center bg-slate-50 text-slate-300">
                    Belum ada foto
                  </div>
                )}
                {/* Fallback if less than 4 photos */}
                {[...Array(Math.max(0, 4 - album.photos.length))].map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square bg-slate-50" />
                ))}
              </div>

              {/* Info Album */}
              <div className="px-2 pb-2 text-center">
                <h4 className="font-black text-slate-900 text-[18px] md:text-[22px] mb-0.5 group-hover:text-amber-600 transition-colors truncate">
                  {album.title}
                </h4>
                <p className="text-[14px] md:text-[16px] text-slate-500 font-bold uppercase tracking-widest opacity-60">
                  {album.year} • {album._count.photos} Foto
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
