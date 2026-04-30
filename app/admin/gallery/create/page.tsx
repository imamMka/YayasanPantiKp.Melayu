"use client";

import { useState, useEffect, Suspense } from "react";
import ImageUploader from "@/components/ImageUploader";
import { useRouter, useSearchParams } from "next/navigation";
import { getGalleryById, updateGallery, createGallery } from "@/lib/actions";

function GalleryForm() {
  const [imageUrl, setImageUrl] = useState("");
  const [imageKey, setImageKey] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState<{ title: string } | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (id) {
      getGalleryById(id).then((data) => {
        if (data) {
          setInitialData({
            title: data.title,
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

    if (!title) {
      setLoading(false);
      return setError("Judul gallery harus diisi.");
    }

    try {
      if (id) {
        await updateGallery(id, { title, imageUrl, imageKey });
      } else {
        await createGallery(title, imageUrl, imageKey);
      }
      router.push("/admin/dashboard");
      router.refresh();
    } catch (err) {
      setError("Gagal menyimpan gallery.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-8 shadow-2xl rounded-3xl bg-white mt-6 sm:mt-10 border border-slate-100">
      <h1 className="text-2xl sm:text-[32px] font-bold mb-6 text-slate-800">
        {id ? "Edit Foto Galeri" : "Tambah Foto Galeri"}
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-black">
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">Judul Foto / Kegiatan</label>
          <input
            name="title"
            defaultValue={initialData?.title}
            placeholder="Contoh: Kunjungan Donatur Saptu Ceria"
            className="w-full border border-slate-200 p-3 rounded-2xl focus:ring-2 focus:ring-[#C4714A] outline-none"
            required
          />
        </div>

        <div className="bg-slate-50 p-4 rounded-2xl border border-dashed border-slate-300">
          <label className="block text-sm font-medium text-slate-600 mb-2">Upload Gambar</label>
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

        {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-[#C4714A] text-white p-4 rounded-2xl font-semibold hover:bg-[#ad5d3e] transition-all shadow-lg active:scale-[0.98] disabled:opacity-70"
        >
          {loading ? "Menyimpan..." : (id ? "Perbarui Galeri" : "Simpan ke Galeri")}
        </button>
      </form>
    </div>
  );
}

export default function CreateGalleryPage() {
  return (
    <Suspense fallback={<div className="text-center mt-20">Memuat form...</div>}>
      <GalleryForm />
    </Suspense>
  );
}
