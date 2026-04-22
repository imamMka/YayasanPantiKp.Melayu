// app/News/preview/[slug]/page.tsx
import Link from "next/link";
// Pakai @/ biar path-nya bersih dan nggak pusing ngitung ../../../../
import NewsHeader from "@/components/NewsData/preview/NewsHeader";
import NewsContent from "@/components/NewsData/preview/NewsContent";
import RelatedArticles from "@/components/NewsData/preview/RelatedArticles";

// WAJIB tambahkan 'async' di depan function
export default async function PreviewPage({
  params,
}: {
  params: Promise<{ slug: string }>; // Type params di Next 15 itu Promise
}) {
  // WAJIB await params sebelum dipakai
  const { slug } = await params;

  return (
    <main className="bg-[#F9F6F0] min-h-screen ">
      <div className="container mx-auto px-6 py-8">
        <Link
          href="/News"
          className="flex items-center gap-2 text-[#C4714A] font-bold text-[20px] md:text-[24px] mb-8 hover:opacity-70 transition-opacity w-fit"
        >
          ‹ KEMBALI
        </Link>

        <div className="max-w-full mx-auto bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
          {/* Kirim slug ke komponen kalau butuh fetch data di dalemnya */}
          <NewsHeader slug={slug} />
          <NewsContent slug={slug} />
        </div>

        <RelatedArticles />
      </div>
    </main>
  );
}
