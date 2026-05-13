// app/news/preview/[slug]/page.tsx
import Link from "next/link";
import NewsHeader from "@/components/NewsData/preview/NewsHeader";
import NewsContent from "@/components/NewsData/preview/NewsContent";
import RelatedArticles from "@/components/NewsData/preview/RelatedArticles";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PreviewPage({ params }: PageProps) {
  const { slug } = await params;
  
  const article = await prisma.news.findUnique({
    where: { slug }
  });

  if (!article) {
    notFound();
  }

  const otherArticles = await prisma.news.findMany({
    where: { NOT: { id: article.id } },
    take: 2
  });

  // Map to the format RelatedArticles expects
  const mappedArticles = otherArticles.map(art => ({
    slug: art.slug,
    image: art.imageUrl.includes('r2.dev') ? `/api/images/${art.imageUrl.split('r2.dev/').pop()}` : art.imageUrl,
    title: art.title,
    category: art.category,
    date: new Date(art.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })
  }));

  return (
    <main className="bg-white min-h-screen">
      <div className="container mx-auto px-6 py-8">
        <Link
          href="/news"
          className="flex items-center gap-2 text-emerald-600 font-bold text-[20px] md:text-[24px] mb-8 hover:opacity-70 transition-opacity w-fit"
        >
          ‹ KEMBALI
        </Link>

        <div className="max-w-full mx-auto bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
          <NewsHeader article={article} />
          <NewsContent article={article} />
        </div>

        <RelatedArticles articles={mappedArticles} />
      </div>
    </main>
  );
}
