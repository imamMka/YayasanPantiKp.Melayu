import Link from "next/link";
// Keluar dari [slug], lalu keluar dari Preview untuk ambil komponen
import NewsHeader from "../NewsHeader";
import NewsContent from "../NewsContent";
import RelatedArticles from "../RelatedArtickel"; // Sesuaikan dengan typo 'Artickel' di folder kamu

export default function PreviewPage({ params }: { params: { slug: string } }) {
  return (
    <main className="bg-[#F9F6F0] min-h-screen">
      <div className="container mx-auto px-6 py-8">
        <Link
          href="/News"
          className="flex items-center gap-2 text-[#C58058] font-bold text-xs mb-8 hover:opacity-70 transition-opacity"
        >
          <span className="text-lg">‹</span> KEMBALI
        </Link>

        <div className="max-w-4xl mx-auto bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
          <NewsHeader />
          <NewsContent />
        </div>

        <RelatedArticles />
      </div>
    </main>
  );
}
