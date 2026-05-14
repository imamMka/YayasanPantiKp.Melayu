import prisma from "@/lib/prisma";
import NewAlbumForm from "@/components/NewAlbumForm";

export default async function NewAlbumPage() {
  // Fetch all photos from the gallery database so the user can "qualify" them from the start
  const allPhotos = await prisma.gallery.findMany({
    orderBy: { createdAt: "desc" }
  });

  return <NewAlbumForm allGalleryPhotos={allPhotos} />;
}
