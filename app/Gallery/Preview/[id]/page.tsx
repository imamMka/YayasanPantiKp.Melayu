// app/Gallery/Preview/[id]/page.tsx
import Link from "next/link";

export default async function GalleryDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  // Tunggu params-nya selesai loading
  const params = await props.params;
  const id = params.id;

  return (
    <main className="bg-[#F9F6F0] min-h-screen flex flex-col items-center justify-center p-10 relative text-white">
      <Link
        href="/Gallery"
        className="absolute top-10 left-10 font-bold text-[#C58058]"
      >
        ✕ CLOSE
      </Link>
      <div className="max-w-5xl w-full">
        <div className="aspect-video bg-gray-500 rounded-2xl flex items-center justify-center border border-white/10">
          <h2 className="text-2xl">ID FOTO: {id}</h2>
        </div>
      </div>
    </main>
  );
}
