"use client";
import { useState } from "react";
import ImageUploader from "@/components/ImageUploader";
import { useRouter } from "next/navigation";

export default function CreateGalleryPage() {
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

    if (!title) return setError("Judul gallery harus diisi.");

    const res = await fetch("/api/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, imageUrl, imageKey }),
    });

    const data = await res.json();
    if (!res.ok) {
      return setError(data?.message || "Gagal menyimpan gallery.");
    }

    router.push("/gallery");
  }

  return (
    <div className="max-w-md mx-auto p-8 shadow-xl rounded-2xl bg-white mt-10">
      <h1 className="text-[32px] font-semibold mb-6">Tambah Foto Gallery</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="title"
          placeholder="Nama Foto/Kegiatan"
          className="border p-2 rounded"
          required
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

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700"
        >
          Tambah ke Gallery
        </button>
      </form>
    </div>
  );
}
