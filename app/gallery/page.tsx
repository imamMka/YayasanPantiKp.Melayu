// app/gallery/page.tsx
import GalleryHero from "@/components/GalleryData/GalleryHero";
import AlbumPerTahun from "@/components/GalleryData/AlbumPerTahun";
import MasonryGallery from "@/components/GalleryData/MasonryGallery";
import prisma from "@/lib/prisma";

export default async function GaleriPage() {
  const galleryItems = await prisma.gallery.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="bg-[#F9F6F0] min-h-screen">
      <GalleryHero />
      <div className="container mx-auto px-6 py-12">
        <AlbumPerTahun />
        <MasonryGallery galleryItems={galleryItems} />
      </div>
    </main>
  );
}
