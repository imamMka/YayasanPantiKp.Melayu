"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Save, 
  Type, 
  Loader2, 
  ChevronLeft,
  Calendar,
  Image as ImageIcon,
  CheckCircle2,
  Circle,
  Search
} from "lucide-react";
import { createAlbum } from "@/lib/actions";
import { Gallery } from "@prisma/client";

interface NewAlbumFormProps {
  allGalleryPhotos: Gallery[];
}

export default function NewAlbumForm({ allGalleryPhotos }: NewAlbumFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    year: new Date().getFullYear(),
    description: "",
    coverImage: "",
  });
  
  const [selectedPhotoIds, setSelectedPhotoIds] = useState<number[]>([]);
  const [showCoverPicker, setShowCoverPicker] = useState(false);

  const filteredPhotos = allGalleryPhotos.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const togglePhoto = (id: number) => {
    setSelectedPhotoIds(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.year) {
      alert("Mohon lengkapi judul dan tahun.");
      return;
    }

    setLoading(true);
    try {
      await createAlbum({
        title: formData.title,
        year: Number(formData.year),
        description: formData.description,
        coverImage: formData.coverImage,
        photoIds: selectedPhotoIds
      });
      router.push("/admin/gallery/albums");
      router.refresh();
    } catch {
      alert("Gagal membuat album.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 text-slate-400 hover:text-slate-600 hover:bg-white rounded-xl border border-transparent hover:border-slate-200 transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Buat Sorotan Baru</h1>
          <p className="text-slate-500 text-sm">Kelompokkan foto menjadi album bertema.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Metadata Section */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Type className="w-5 h-5 text-emerald-500" />
            Informasi Sorotan
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
             <div className="md:col-span-3">
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">Judul Sorotan</label>
              <div className="relative">
                <Type className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all text-slate-900"
                  placeholder="Contoh: Ramadhan 2024"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">Tahun</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData(prev => ({ ...prev, year: Number(e.target.value) }))}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all text-slate-900"
                  placeholder="2026"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">Cover Sorotan (Hanya dari Galeri)</label>
            <div className="flex items-center gap-6">
              <div 
                onClick={() => setShowCoverPicker(true)}
                className="relative group w-32 h-32 rounded-full overflow-hidden border-4 border-emerald-50 shadow-md cursor-pointer hover:border-emerald-200 transition-all"
              >
                 {formData.coverImage ? (
                    <img
                      src={formData.coverImage.includes('r2.dev') ? `/api/images/${formData.coverImage.split('r2.dev/').pop()}` : formData.coverImage}
                      className="w-full h-full object-cover"
                      alt=""
                    />
                 ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-50 text-slate-300">
                      <ImageIcon className="w-8 h-8" />
                    </div>
                 )}
                 <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-bold">
                    Pilih Foto
                 </div>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-slate-400 font-medium">Klik lingkaran untuk memilih foto sampul.</p>
                <p className="text-[10px] text-slate-400 italic">Foto sampul harus dipilih dari foto yang sudah ada di Galeri.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Picker Section */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-emerald-500" />
              Pilih Isi Sorotan (Kualifikasi Database)
            </h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text"
                placeholder="Cari foto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 max-h-[400px] overflow-y-auto p-2 no-scrollbar">
            {filteredPhotos.map((photo) => {
              const isSelected = selectedPhotoIds.includes(photo.id);
              const isCover = formData.coverImage === photo.imageUrl;
              const imageUrl = photo.imageUrl.includes('r2.dev') 
                ? `/api/images/${photo.imageUrl.split('r2.dev/').pop()}` 
                : photo.imageUrl;

              return (
                <div 
                  key={photo.id}
                  onClick={() => togglePhoto(photo.id)}
                  className={`relative aspect-square rounded-2xl overflow-hidden cursor-pointer border-2 transition-all ${
                    isSelected ? "border-emerald-500 ring-2 ring-emerald-500/20" : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={imageUrl} alt={photo.title} className="w-full h-full object-cover" />
                  
                  {/* Selection Overlay */}
                  <div className={`absolute top-2 right-2 p-1 rounded-full ${isSelected ? "bg-emerald-500 text-white" : "bg-white/80 text-slate-300"}`}>
                    {isSelected ? <CheckCircle2 className="w-3 h-4" /> : <Circle className="w-3 h-4" />}
                  </div>

                  {/* Cover Badge */}
                  {isCover && (
                    <div className="absolute top-2 left-2 bg-amber-500 text-white text-[8px] px-2 py-0.5 rounded-full font-bold shadow-lg">
                      COVER
                    </div>
                  )}

                  {/* Action on hover */}
                  <div 
                    onClick={(e) => {
                      e.stopPropagation();
                      setFormData(prev => ({ ...prev, coverImage: photo.imageUrl }));
                      setShowCoverPicker(false);
                    }}
                    className="absolute inset-x-0 bottom-0 bg-emerald-600 text-white text-[10px] py-1.5 font-bold text-center translate-y-full group-hover:translate-y-0 transition-transform hover:bg-emerald-700"
                  >
                    Jadikan Cover
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 sticky bottom-6 z-10">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2.5 bg-white border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 rounded-xl transition-all shadow-lg"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center px-8 py-2.5 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200 disabled:opacity-70"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            Buat Sorotan
          </button>
        </div>
      </form>

      {/* Simplified Cover Picker Modal */}
      {showCoverPicker && (
        <div className="fixed inset-0 z-[1000] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-3xl max-h-[80vh] overflow-hidden flex flex-col shadow-2xl">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-900">Pilih Foto Sampul</h3>
              <button onClick={() => setShowCoverPicker(false)} className="text-slate-400 hover:text-slate-600 font-bold">Tutup</button>
            </div>
            <div className="p-6 overflow-y-auto grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
              {allGalleryPhotos.map((photo) => {
                const imageUrl = photo.imageUrl.includes('r2.dev') ? `/api/images/${photo.imageUrl.split('r2.dev/').pop()}` : photo.imageUrl;
                return (
                  <div 
                    key={photo.id}
                    onClick={() => {
                      setFormData(prev => ({ ...prev, coverImage: photo.imageUrl }));
                      setShowCoverPicker(false);
                    }}
                    className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer hover:ring-4 hover:ring-emerald-500 transition-all"
                  >
                    <img src={imageUrl} className="w-full h-full object-cover" alt="" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
