"use client";
import { useState } from "react";

export default function ImageUploader({
  onUploadSuccess,
}: {
  onUploadSuccess: (upload: { url: string; key: string }) => void;
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
      if (!res.ok || !data?.url || !data?.key) {
        throw new Error(data?.message || "Upload gagal");
      }

      onUploadSuccess({ url: data.url, key: data.key });
    } catch (err) {
      alert(
        `Gagal mengupload gambar: ${err instanceof Error ? err.message : "Kesalahan server"}`,
      );
    } finally {
      setLoading(false);
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
