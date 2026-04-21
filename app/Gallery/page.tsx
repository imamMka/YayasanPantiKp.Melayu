import GalleryHero from "../../components/GalleryData/GalleryHero";
import AlbumPerTahun from "../../components/GalleryData/AlbumPerTahun";
import MasonryGallery from "../../components/GalleryData/MasonryGallery";

export default function GaleriPage() {
  return (
    <main className="bg-[#F9F6F0] min-h-screen">
      <GalleryHero />
      <div className="container mx-auto px-6 py-12">
        <AlbumPerTahun />
        <MasonryGallery />
      </div>
    </main>
  );
}
