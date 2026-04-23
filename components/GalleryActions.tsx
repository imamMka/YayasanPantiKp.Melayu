"use client";

import { Share2, Download } from "lucide-react"; // Opsional: gunakan icon library

export default function GalleryActions({
  src,
  title,
}: {
  src: string;
  title: string;
}) {
  // Fungsi Bagikan (Web Share API)
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: `Lihat dokumentasi kegiatan: ${title}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Gagal membagikan:", err);
      }
    } else {
      // Fallback jika browser tidak mendukung navigator.share
      navigator.clipboard.writeText(window.location.href);
      alert("Link berhasil disalin ke clipboard!");
    }
  };

  // Fungsi Download
  const handleDownload = async () => {
    try {
      const response = await fetch(src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${title.replace(/\s+/g, "-")}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Gagal mendownload gambar:", err);
    }
  };

  return (
    <div className="flex gap-8 font-bold text-xs uppercase tracking-widest">
      <button
        onClick={handleShare}
        className="hover:text-[#C4714A] transition-colors flex items-center gap-2"
      >
        Bagikan
      </button>
      <button
        onClick={handleDownload}
        className="hover:text-[#C4714A] transition-colors flex items-center gap-2"
      >
        Simpan Gambar
      </button>
    </div>
  );
}
