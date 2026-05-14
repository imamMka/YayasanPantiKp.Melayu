import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditAlbumForm from "@/components/EditAlbumForm";

interface EditAlbumPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditAlbumPage({ params }: EditAlbumPageProps) {
  const { id } = await params;
  const albumId = Number(id);

  if (isNaN(albumId)) notFound();

  // Fetch the album with its current photos
  const album = await prisma.album.findUnique({
    where: { id: albumId },
    include: {
      photos: true
    }
  });

  if (!album) notFound();

  // Fetch all photos from the gallery database so the user can "qualify" them
  const allPhotos = await prisma.gallery.findMany({
    orderBy: { createdAt: "desc" }
  });

  return <EditAlbumForm album={album} allGalleryPhotos={allPhotos} />;
}
