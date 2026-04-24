"use client";

import { useState } from "react";
import ImageUploader from "@/components/ImageUploader";
import { useRouter } from "next/navigation";

export default function CreateNewsPage() {
  const [imageUrl, setImageUrl] = useState("");
  const [imageKey, setImageKey] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (!imageUrl) return setError("Upload foto dulu bos!");

    const formData = new FormData(event.currentTarget);
    const title = formData.get("title")?.toString().trim() ?? "";
    const content = formData.get("content")?.toString().trim() ?? "";
    const quote = formData.get("quote")?.toString().trim();

    if (!title || !content) {
      return setError("Judul dan konten berita harus diisi.");
    }

    const res = await fetch("/api/news", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, quote, imageUrl, imageKey }),
    });

    const data = await res.json();
    if (!res.ok) {
      return setError(data?.message || "Gagal menyimpan berita.");
    }

    router.push("/news");
  }

  return (
    <div className="max-w-xl mx-auto p-8 shadow-xl rounded-2xl bg-white mt-10">
      <h1 className="text-[32px] font-semibold mb-6">Tambah Berita Baru</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

        <ImageUploader
          onUploadSuccess={({ url, key }) => {
            setImageUrl(url);
            setImageKey(key);
          }}
        />
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
