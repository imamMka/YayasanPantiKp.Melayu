"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Save,
  Eye,
  Edit3,
  Type,
  Hash,
  Tag,
  Image as ImageIcon,
  ChevronLeft,
  Loader2
} from "lucide-react";
import ImageUploader from "@/components/ImageUploader";
import { createNews, updateNews } from "@/lib/actions";
import { toast } from "sonner";

interface ArticleEditorProps {
  initialData?: {
    id?: number;
    title: string;
    slug: string;
    category: string;
    content: string;
    quote?: string | null;
    imageUrl: string;
    imageKey?: string | null;
  };
}

export default function ArticleEditor({ initialData }: ArticleEditorProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"edit" | "preview">("edit");

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    category: initialData?.category || "Kegiatan",
    content: initialData?.content || "",
    quote: initialData?.quote || "",
    imageUrl: initialData?.imageUrl || "",
    imageKey: initialData?.imageKey || "",
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const updates: Partial<typeof formData> = { title };

    if (!initialData) {
      const slug = title
        .toLowerCase()
        .replace(/[^\w ]+/g, "")
        .replace(/ +/g, "-");
      updates.slug = slug;
    }

    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.slug || !formData.content || !formData.imageUrl) {
      toast.error("Mohon lengkapi semua data wajib (Judul, Slug, Konten, & Gambar)");
      return;
    }

    setLoading(true);
    try {
      if (initialData?.id) {
        await updateNews(initialData.id.toString(), formData);
      } else {
        await createNews(
          formData.title,
          formData.slug,
          formData.category,
          formData.content,
          formData.quote || null,
          formData.imageUrl,
          formData.imageKey
        );
      }
      toast.success(initialData?.id ? "Artikel berhasil diperbarui!" : "Artikel berhasil diterbitkan!");
      router.push("/admin/articles");
      router.refresh();
    } catch {
      toast.error("Gagal menyimpan artikel. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-6xl mx-auto pb-20">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 sticky top-4 z-20 shadow-sm">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="font-bold text-slate-900 truncate max-w-[200px] md:max-w-md">
            {initialData ? `Edit: ${formData.title}` : "Tulis Artikel Baru"}
          </h1>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setMode("edit")}
              className={`flex items-center px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${mode === "edit" ? "bg-white text-emerald-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                }`}
            >
              <Edit3 className="w-3.5 h-3.5 mr-1.5" />
              Edit
            </button>
            <button
              type="button"
              onClick={() => setMode("preview")}
              className={`flex items-center px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${mode === "preview" ? "bg-white text-emerald-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                }`}
            >
              <Eye className="w-3.5 h-3.5 mr-1.5" />
              Preview
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center px-5 py-2 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-all shadow-sm shadow-emerald-200 disabled:opacity-70"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            Simpan
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Editor/Preview */}
        <div className="lg:col-span-2 space-y-6">
          {mode === "edit" ? (
            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm h-[600px] flex flex-col">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Editor Konten</span>
                <span className="text-xs text-slate-400">Markdown didukung</span>
              </div>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                className="flex-1 p-8 focus:outline-none resize-none text-slate-700 text-lg leading-relaxed font-sans"
                placeholder="Mulai menulis kisah inspiratif di sini..."
              />
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-sm min-h-[600px] prose prose-slate max-w-none">
              <h1 className="text-4xl font-bold text-slate-900 mb-6">{formData.title || "Judul Artikel"}</h1>
              {formData.imageUrl && (
                <img
                  src={formData.imageUrl.includes('r2.dev') ? `/api/images/${formData.imageUrl.split('r2.dev/').pop()}` : formData.imageUrl}
                  className="w-full aspect-video object-cover rounded-2xl mb-8"
                  alt=""
                />
              )}
              <div className="text-slate-700 whitespace-pre-wrap text-xl leading-relaxed">
                {formData.content || "Belum ada konten untuk dipratinjau."}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Metadata & Settings */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-5">
            <h3 className="font-bold text-slate-900 flex items-center">
              <Type className="w-4 h-4 mr-2 text-emerald-500" />
              Informasi Utama
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5 ml-1">Judul Artikel</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={handleTitleChange}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-slate-900"
                  placeholder="Contoh: Dito Juara 1 Olimpiade"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5 ml-1">URL Slug</label>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-slate-900"
                    placeholder="dito-juara-1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5 ml-1">Kategori</label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-slate-900 appearance-none"
                  >
                    <option value="Kegiatan">Kegiatan</option>
                    <option value="Kebutuhan">Kebutuhan</option>
                    <option value="Laporan">Laporan</option>
                    <option value="Prestasi">Prestasi</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-5">
            <h3 className="font-bold text-slate-900 flex items-center">
              <ImageIcon className="w-4 h-4 mr-2 text-emerald-500" />
              Gambar Unggulan
            </h3>

            <div className="space-y-4">
              {formData.imageUrl ? (
                <div className="relative group rounded-2xl overflow-hidden border border-slate-200">
                  <img
                    src={formData.imageUrl.includes('r2.dev') ? `/api/images/${formData.imageUrl.split('r2.dev/').pop()}` : formData.imageUrl}
                    className="w-full aspect-video object-cover"
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
                <ImageUploader
                  onUploadSuccess={({ url, key }) => setFormData(prev => ({ ...prev, imageUrl: url, imageKey: key }))}
                />
              )}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <label className="block text-xs font-bold text-slate-400 uppercase ml-1">Kutipan Singkat (Opsional)</label>
            <textarea
              value={formData.quote}
              onChange={(e) => setFormData(prev => ({ ...prev, quote: e.target.value }))}
              className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-slate-700 text-sm italic"
              rows={3}
              placeholder="Masukkan kutipan menarik dari artikel ini..."
            />
          </div>
        </div>
      </div>
    </form>
  );
}
