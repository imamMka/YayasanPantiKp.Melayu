"use client";
import { div, p } from "framer-motion/client";
import { useState } from "react";

export default function ImageUploader({
  onUploadSuccess,
}: {
  onUploadSuccess: (url: string) => void;
}) {
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      onUploadSuccess(data.url); //Kirim URL gambar yang diupload ke form uatama
    } catch (err) {
      alert("Gagal mengupload gambar");
    } finally {
      setLoading(false);
      message: "Gambar berhasil diupload!";
    }
  };

  return (
    <div className="flex flex-col gap-2 border-2 border-dashed p-4 rounded-lg">
      <label className="text-[20px] font-semibold">Pilih Foto</label>
      <input type="file" onChange={handleFileChange} className="text-[20px]" />
      {loading && (
        <p className="text-blue-500 animate-pulse text-[16px]">
          Sedang mengirim ke server...
        </p>
      )}
    </div>
  );
}
