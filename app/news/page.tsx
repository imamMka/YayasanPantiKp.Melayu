import NewsHero from "../../components/NewsData/NewsHero";
import NewsGrid from "../../components/NewsData/NewsGrid";
import NewsSidebar from "../../components/NewsData/NewsSideBar";

export default function NewsPage() {
  return (
    <main className="bg-[#F9F6F0] min-h-screen">
      <NewsHero />
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-8">
          <div className="lg:col-span-8">
            <NewsGrid />
          </div>
          <aside className="lg:col-span-4 space-y-10">
            <NewsSidebar />
          </aside>
        </div>
      </div>
    </main>
  );
}
