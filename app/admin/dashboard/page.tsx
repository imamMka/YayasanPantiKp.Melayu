import prisma from "@/lib/prisma";
import { deleteNews, deleteGallery, updateNews, updateGallery } from "@/lib/actions";
import Link from "next/link";

// Server action wrappers for form submissions
async function deleteNewsAction(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  if (id) {
    try {
      await deleteNews(id);
    } catch (error) {
      console.error("Failed to delete news:", error);
    }
  }
}

async function deleteGalleryAction(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  if (id) {
    try {
      await deleteGallery(id);
    } catch (error) {
      console.error("Failed to delete gallery:", error);
    }
  }
}

export default async function AdminDashboard() {
  const allNews = await prisma.news.findMany({ orderBy: { createdAt: "desc" } });
  const allGallery = await prisma.gallery.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <main className="bg-[#F9F6F0] min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Dashboard Admin</h1>

      {/* News Management Section */}
      <section className="mb-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <h2 className="text-2xl font-semibold text-gray-700">Kelola Berita</h2>
          <Link
            href="/admin/news/create"
            className="w-full sm:w-auto text-center px-6 py-2.5 bg-[#C4714A] text-white rounded-xl shadow-md hover:bg-[#ad5d3e] transition-all font-medium"
          >
            + Buat Berita Baru
          </Link>
        </div>
        <div className="overflow-x-auto shadow rounded-lg text-black">
          <table className="w-full table-auto bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Thumbnail</th>
                <th className="px-4 py-2 text-left">Judul</th>
                <th className="px-4 py-2 text-left">Tanggal</th>
                <th className="px-4 py-2 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {allNews.map((news) => (
                <tr key={news.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">
                    {news.imageUrl ? (
                      <img 
                        src={`/api/images/${news.imageUrl.split('r2.dev/').pop()}`} 
                        alt="" 
                        className="w-16 h-10 object-cover rounded shadow-sm" 
                      />
                    ) : (
                      <div className="w-16 h-10 bg-gray-200 rounded animate-pulse" />
                    )}
                  </td>
                  <td className="px-4 py-2">{news.title}</td>
                  <td className="px-4 py-2">
                    {new Date(news.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 flex justify-center space-x-2">
                    <Link
                      href={`/admin/news/create?id=${news.id}`}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                    >
                      Edit
                    </Link>
                    <form action={deleteNewsAction} className="inline">
                      <input type="hidden" name="id" value={news.id} />
                      <button
                        type="submit"
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                      >
                        Hapus
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Gallery Management Section */}
      <section>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <h2 className="text-2xl font-semibold text-gray-700">Kelola Galeri</h2>
          <Link
            href="/admin/gallery/create"
            className="w-full sm:w-auto text-center px-6 py-2.5 bg-[#C4714A] text-white rounded-xl shadow-md hover:bg-[#ad5d3e] transition-all font-medium"
          >
            + Tambah Foto Galeri
          </Link>
        </div>
        <div className="overflow-x-auto shadow rounded-lg text-black">
          <table className="w-full table-auto bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Thumbnail</th>
                <th className="px-4 py-2 text-left">Judul</th>
                <th className="px-4 py-2 text-left">Tanggal</th>
                <th className="px-4 py-2 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {allGallery.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">
                    {item.imageUrl ? (
                      <img 
                        src={`/api/images/${item.imageUrl.split('r2.dev/').pop()}`} 
                        alt="" 
                        className="w-16 h-10 object-cover rounded shadow-sm" 
                      />
                    ) : (
                      <div className="w-16 h-10 bg-gray-200 rounded animate-pulse" />
                    )}
                  </td>
                  <td className="px-4 py-2">{item.title}</td>
                  <td className="px-4 py-2">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 flex justify-center space-x-2">
                    <Link
                      href={`/admin/gallery/create?id=${item.id}`}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                    >
                      Edit
                    </Link>
                    <form action={deleteGalleryAction} className="inline">
                      <input type="hidden" name="id" value={item.id} />
                      <button
                        type="submit"
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                      >
                        Hapus
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
