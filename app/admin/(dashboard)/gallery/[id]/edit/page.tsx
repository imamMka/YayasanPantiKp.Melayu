import prisma from "@/lib/prisma";
import GalleryForm from "@/components/GalleryForm";
import { notFound } from "next/navigation";

export default async function EditGalleryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const galleryItem = await prisma.gallery.findUnique({
    where: { id: Number(id) }
  });

  if (!galleryItem) {
    notFound();
  }

  const albums = await prisma.album.findMany({
    orderBy: { year: "desc" }
  });

  return <GalleryForm albums={albums} initialData={galleryItem} />;
}
