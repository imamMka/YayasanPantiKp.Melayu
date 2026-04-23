// app/news/preview/[slug]/page.tsx
import Link from "next/link";
import NewsHeader from "@/components/NewsData/preview/NewsHeader";
import NewsContent from "@/components/NewsData/preview/NewsContent";
import RelatedArticles from "@/components/NewsData/preview/RelatedArticles";
import { ALL_ARTICLES } from "@/components/NewsData/NewsData";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PreviewPage({ params }: PageProps) {
  // 1. Await params sesuai standar Next.js 15
  const { slug } = await params;

  return (
    <main className="bg-[#F9F6F0] min-h-screen">
      <div className="container mx-auto px-6 py-8">
        {/* 2. Pastikan href "/news" sama persis dengan nama folder daftar berita kamu */}
        <Link
          href="/news"
          className="flex items-center gap-2 text-[#C4714A] font-bold text-[20px] md:text-[24px] mb-8 hover:opacity-70 transition-opacity w-fit"
        >
          ‹ KEMBALI
        </Link>

        <div className="max-w-full mx-auto bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
          {/* 3. Komponen child menerima slug untuk fetch data spesifik */}
          <NewsHeader slug={slug} />
          <NewsContent slug={slug} />
        </div>

        <RelatedArticles articles={ALL_ARTICLES.slice(0, 2)} />
      </div>
    </main>
  );
}
