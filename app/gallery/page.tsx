// app/gallery/page.tsx
import GalleryHero from "@/components/GalleryData/GalleryHero";
import AlbumPerTahun from "@/components/GalleryData/AlbumPerTahun";
import MasonryGallery from "@/components/GalleryData/MasonryGallery";
import prisma from "@/lib/prisma";

export default async function GaleriPage() {
  // Fetch all gallery items for masonry
  const galleryItems = await prisma.gallery.findMany({
    orderBy: { createdAt: "desc" },
  });

  // Fetch albums grouped by year for the "Album Per Tahun" section
  // We'll also fetch a few preview images for each album
  const albums = await prisma.album.findMany({
    include: {
      photos: {
        take: 4,
        orderBy: { createdAt: "desc" },
      },
      _count: {
        select: { photos: true },
      },
    },
    orderBy: { year: "desc" },
  });

  return (
    <main className="bg-white min-h-screen">
      <GalleryHero />
      <div className="container mx-auto px-6 py-12">
        <AlbumPerTahun albums={albums} />
        <MasonryGallery galleryItems={galleryItems} />
      </div>
    </main>
  );
}
