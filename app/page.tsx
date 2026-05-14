import prisma from "@/lib/prisma";
import Hero from "../components/HomeData/Hero";
import News from "../components/HomeData/News";
import Gallery from "../components/HomeData/Gallery";
import DonationTransparancy from "../components/HomeData/DonationTransparancy";
import Contact from "../components/HomeData/Contact";
import { Socials } from "@/components/Footer";

// Force dynamic rendering to always get the latest news/gallery
export const revalidate = 60; // Revalidate every 60 seconds

export default async function Homepage() {
  // Fetch latest 3 news articles
  const latestNews = await prisma.news.findMany({
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  // Fetch latest 4 gallery items
  const latestGallery = await prisma.gallery.findMany({
    orderBy: { createdAt: "desc" },
    take: 4,
  });

  // Fetch total gallery count for the "+X" indicator
  const totalGalleryCount = await prisma.gallery.count();

  return (
    <main className="bg-white min-h-screen text-slate-800">
      <Hero />
      <News articles={latestNews} />
      <Gallery items={latestGallery} totalCount={totalGalleryCount} />
      <DonationTransparancy />
      <Contact />
      <Socials />
    </main>
  );
}
