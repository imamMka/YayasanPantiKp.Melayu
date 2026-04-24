"use client";

import { useState } from "react";
import { createNews } from "@/lib/actions";
import ImageUploader from "@/components/ImageUploader";
import { useRouter } from "next/navigation";

export default function CreateNewsPage() {
  const [imageUrl, setImageUrl] = useState("");
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    if (!imageUrl) return alert("Upload foto dulu bos!");

    //Ambil data dari form
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const quote = formData.get("quote") as string;

    //Kirim data ke server Action (Supabase)
    await createNews(title, content, quote, imageUrl);
    router.push("/news"); //Balik ke halaman news publik
  }

  return (
    <div className="max-w-xl mx-auto p-8 shadow-xl rounded-2xl bg-white mt-10">
      <h1 className="text-[32px] font-semibold mb-6">Tambah Berita Baru</h1>

      <form action={handleSubmit} className="flex flex-col gap-4">
        <input
          name="title"
          placeholder="Judul Berita"
          className="border p-2 rounded"
          required
        />
        <input
          name="quote"
          placeholder="Qoute(Opsional)"
          className="border p-2 italic rounded"
        />

        {/* Panggil Komponen Upload Gambar tadi */}
        <ImageUploader onUploadSuccess={(url) => setImageUrl(url)} />
        {imageUrl && (
          <p className="text-green-500 text-[14px]">URL R2: {imageUrl}</p>
        )}

        <textarea
          name="content"
          placeholder="Isi Berita..."
          className="border p-2 rounded h-40"
          required
        />

        <button
          type="submit"
          className="bg-black text-white p-3 rounded-lg hover:opacity-80"
        >
          Simpan Berita
        </button>
      </form>
    </div>
  );
}
