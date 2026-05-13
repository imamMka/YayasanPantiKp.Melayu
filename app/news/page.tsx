import NewsHero from "../../components/NewsData/NewsHero";
import NewsGrid from "../../components/NewsData/NewsGrid";
import NewsSidebar from "../../components/NewsData/NewsSideBar";
import prisma from "@/lib/prisma";

export default async function NewsPage() {
  //Ambil data berita dari Supabase Lewat Prisma
  const allNews = await prisma.news.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="bg-white min-h-screen">
      <NewsHero />
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-8">
          <div className="lg:col-span-8">
            {/* Kirim data allNews ke dalam NewsGrid sebagai props */}
            <NewsGrid data={allNews} />
          </div>
          <aside className="lg:col-span-4 space-y-10">
            <NewsSidebar />
          </aside>
        </div>
      </div>
    </main>
  );
}
