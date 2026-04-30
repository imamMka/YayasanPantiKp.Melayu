"use client";

import { useState, useEffect, Suspense } from "react";
import ImageUploader from "@/components/ImageUploader";
import { useRouter, useSearchParams } from "next/navigation";
import { getNewsById, updateNews, createNews } from "@/lib/actions";

function NewsForm() {
  const [imageUrl, setImageUrl] = useState("");
  const [imageKey, setImageKey] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState<{ title: string; content: string; quote: string | null } | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (id) {
      getNewsById(id).then((data) => {
        if (data) {
          setInitialData({
            title: data.title,
            content: data.content,
            quote: data.quote,
          });
          setImageUrl(data.imageUrl);
          setImageKey(data.imageKey || "");
        }
      });
    }
  }, [id]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    if (!imageUrl) return setError("Upload foto dulu bos!");

    const formData = new FormData(event.currentTarget);
    const title = formData.get("title")?.toString().trim() ?? "";
    const content = formData.get("content")?.toString().trim() ?? "";
    const quote = formData.get("quote")?.toString().trim() || "";

    if (!title || !content) {
      setLoading(false);
      return setError("Judul dan konten berita harus diisi.");
    }

    try {
      if (id) {
        await updateNews(id, { title, content, quote, imageUrl, imageKey });
      } else {
        await createNews(title, content, quote, imageUrl, imageKey);
      }
      router.push("/admin/dashboard");
      router.refresh();
    } catch (err) {
      setError("Gagal menyimpan berita.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-8 shadow-2xl rounded-3xl bg-white mt-6 sm:mt-10 border border-slate-100">
      <h1 className="text-2xl sm:text-[32px] font-bold mb-6 text-slate-800">
        {id ? "Edit Berita" : "Tambah Berita Baru"}
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-black">
        <input
          name="title"
          defaultValue={initialData?.title}
          placeholder="Judul Berita"
          className="border border-slate-200 p-3 rounded-2xl focus:ring-2 focus:ring-[#C4714A] outline-none"
          required
        />
        <input
          name="quote"
          defaultValue={initialData?.quote || ""}
          placeholder="Quote (Opsional)"
          className="border border-slate-200 p-3 italic rounded-2xl focus:ring-2 focus:ring-[#C4714A] outline-none"
        />

        <div className="bg-slate-50 p-4 rounded-2xl border border-dashed border-slate-300">
          <label className="block text-sm font-medium text-slate-600 mb-2">Thumbnail Berita</label>
          <ImageUploader
            onUploadSuccess={({ url, key }) => {
              setImageUrl(url);
              setImageKey(key);
            }}
          />
          {imageUrl && (
            <div className="mt-3 relative aspect-video rounded-xl overflow-hidden border border-slate-200">
              <img 
                src={imageUrl.includes('r2.dev') ? `/api/images/${imageUrl.split('r2.dev/').pop()}` : imageUrl} 
                alt="Preview" 
                className="object-cover w-full h-full" 
              />
              <p className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[10px] p-1 truncate">
                {imageUrl}
              </p>
            </div>
          )}
        </div>

        <textarea
          name="content"
          defaultValue={initialData?.content}
          placeholder="Tulis isi berita di sini..."
          className="border border-slate-200 p-3 rounded-2xl h-64 focus:ring-2 focus:ring-[#C4714A] outline-none"
          required
        />

        {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-[#C4714A] text-white p-4 rounded-2xl font-semibold hover:bg-[#ad5d3e] transition-all shadow-lg active:scale-[0.98] disabled:opacity-70"
        >
          {loading ? "Menyimpan..." : (id ? "Perbarui Berita" : "Simpan Berita")}
        </button>
      </form>
    </div>
  );
}

export default function CreateNewsPage() {
  return (
    <Suspense fallback={<div className="text-center mt-20">Memuat form...</div>}>
      <NewsForm />
    </Suspense>
  );
}
