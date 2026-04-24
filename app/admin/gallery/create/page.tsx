"use client";
import { useState } from "react";
import { createGallery } from "@/lib/actions";
import ImageUploader from "@/components/ImageUploader";
import { useRouter } from "next/navigation";

export default function CreateGalleryPage() {
  const [imageUrl, setImageUrl] = useState("");
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    if (!imageUrl) return alert("Fotonya mana bos? Upload dulu!");
    const title = formData.get("title") as string;

    await createGallery(title, imageUrl);
    router.push("/gallery");
  }

  return (
    <div className="max-w-md mx-auto p-8 shadow-xl rounded-2xl bg-white mt-10">
      <h1 className="text-[32px] font-semibold mb-6">Tambah Foto Gallery</h1>

      <form action={handleSubmit} className="flex flex-col gap-4">
        <input
          name="title"
          placeholder="Nama Foto/Kegiatan"
          className="border p-2 rounded"
          required
        />

        <ImageUploader onUploadSuccess={(url) => setImageUrl(url)} />

        <button
          type="submit"
          className="bg-blue-600 text-white p-3 rounded-xl hover:blue-700"
        >
          Tambah ke Gallery
        </button>
      </form>
    </div>
  );
}
