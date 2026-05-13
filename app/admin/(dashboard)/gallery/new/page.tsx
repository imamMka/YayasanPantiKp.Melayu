"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Save, 
  Type, 
  Loader2, 
  ChevronLeft 
} from "lucide-react";
import ImageUploader from "@/components/ImageUploader";
import { createGallery } from "@/lib/actions";

export default function NewGalleryPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    imageUrl: "",
    imageKey: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.imageUrl) {
      alert("Mohon lengkapi judul dan unggah gambar.");
      return;
    }

    setLoading(true);
    try {
      await createGallery(formData.title, formData.imageUrl, formData.imageKey);
      router.push("/admin/gallery");
      router.refresh();
    } catch {
      alert("Gagal mengunggah ke galeri.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 text-slate-400 hover:text-slate-600 hover:bg-white rounded-xl border border-transparent hover:border-slate-200 transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Unggah Foto Baru</h1>
          <p className="text-slate-500 text-sm">Tambahkan dokumentasi ke galeri publik.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">Keterangan / Judul Foto</label>
            <div className="relative">
              <Type className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all text-slate-900"
                placeholder="Contoh: Pembagian Sembako Ramadhan 2024"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">Unggah Gambar</label>
            {formData.imageUrl ? (
              <div className="relative group rounded-2xl overflow-hidden border border-slate-200 aspect-video">
                <img
                  src={formData.imageUrl.includes('r2.dev') ? `/api/images/${formData.imageUrl.split('r2.dev/').pop()}` : formData.imageUrl}
                  className="w-full h-full object-cover"
                  alt=""
                />
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, imageUrl: "", imageKey: "" }))}
                  className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold"
                >
                  Ganti Gambar
                </button>
              </div>
            ) : (
              <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl p-8 transition-all hover:border-emerald-300">
                <ImageUploader
                  onUploadSuccess={({ url, key }) => setFormData(prev => ({ ...prev, imageUrl: url, imageKey: key }))}
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2.5 text-slate-600 font-bold hover:bg-slate-100 rounded-xl transition-all"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center px-8 py-2.5 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-all shadow-sm shadow-emerald-200 disabled:opacity-70"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            Publikasikan ke Galeri
          </button>
        </div>
      </form>
    </div>
  );
}
