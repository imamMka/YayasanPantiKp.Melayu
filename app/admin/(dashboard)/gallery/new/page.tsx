import prisma from "@/lib/prisma";
import GalleryForm from "@/components/GalleryForm";

export default async function NewGalleryPage() {
  const albums = await prisma.album.findMany({
    orderBy: { year: "desc" }
  });

  return <GalleryForm albums={albums} />;
}
