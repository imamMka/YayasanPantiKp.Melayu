This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Ringkasan Proyek

Aplikasi ini adalah website informasi untuk `PantiAsuhanKpMelayu` dengan halaman publik dan admin sederhana. Fitur inti saat ini mencakup daftar berita, galeri foto, profil panti, donasi, serta form admin untuk membuat konten berita dan galeri.

## Fitur yang Sudah Ada

### Frontend

- Halaman depan `app/page.tsx` menampilkan beberapa blok konten statis: hero, kebutuhan darurat, berita, galeri, donasi, dan kontak.
- Halaman berita `app/news/page.tsx` mengambil data dari Prisma dan menampilkan berita dengan `NewsHero`, `NewsGrid`, dan `NewsSidebar`.
- Halaman galeri `app/gallery/page.tsx` menampilkan `GalleryHero`, `AlbumPerTahun`, dan `MasonryGallery`.
- Halaman admin:
  - `app/admin/news/create/page.tsx` untuk menambahkan berita baru.
  - `app/admin/gallery/create/page.tsx` untuk menambahkan foto galeri.
- Komponen upload `components/ImageUploader.tsx` mengirim file ke endpoint upload.

### Backend

- `lib/prisma.ts` menginisialisasi Prisma dengan adapter PostgreSQL/Supabase dan logging development.
- `lib/actions.ts` menyediakan server action:
  - `createNews(...)`
  - `createGallery(...)`
- Endpoint upload `app/api/upload/route.ts`:
  - Menerima file `form-data`
  - Mengunggah ke Cloudflare R2 menggunakan AWS S3 SDK
  - Mengembalikan URL file publik
- Prisma schema `prisma/schema.prisma` mengelola model `News` dan `Gallery`.

## Progress Saat Ini

- Frontend: 60% selesai
  - Struktur halaman publik sudah ada
  - Form admin berita dan galeri sudah berjalan
  - Beberapa tampilan masih mengandalkan data statis dan preview dummy
- Backend: 50% selesai
  - Create flow berita dan galeri bekerja
  - Upload gambar ke R2 sudah tersedia
  - Belum ada autentikasi, update/delete, atau manajemen pengguna
- Total proyek: 55% selesai

## Masalah / Error yang Perlu Diperbaiki

- `app/gallery/page.tsx` belum mengambil data galeri dari database; masih statis.
- `components/MasonryGallery.tsx` menggunakan gambar dummy lokal dan tidak sinkron dengan model `Gallery`.
- `lib/actions.ts` belum menyimpan `imageKey` meski skema Prisma mendukungnya.
- `components/ImageUploader.tsx`:
  - tidak memeriksa `res.ok`
  - ada baris `message: "Gambar berhasil diupload!";` yang salah tempat
- `app/admin/gallery/create/page.tsx` memiliki kelas Tailwind salah tulis `hover:blue-700`.
- `next.config.ts` hanya menyetujui satu host R2, yang bisa gagal jika `R2_PUBLIC_URL` berbeda.
- Belum ada proteksi admin, sehingga semua route admin terbuka.
- Belum ada halaman detail berita/gambar dinamis untuk `news/[id]` dan `gallery/preview/[id]`.

## Rencana Kerja Berikutnya

1. Tambah proteksi admin / autentikasi untuk `app/admin/*`.
2. Sambungkan halaman galeri ke database `Gallery`.
3. Perbaiki upload R2:
   - tambahkan validasi respons
   - simpan `imageKey` saat membuat record
4. Sesuaikan `next.config.ts` dengan `R2_PUBLIC_URL` atau domain R2 yang digunakan.
5. Buat halaman detail dinamis untuk berita dan galeri.
6. Lengkapi CRUD berita/galeri (edit, delete, tampilkan detail).

## Teknologi

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Prisma 7
- PostgreSQL / Supabase
- Cloudflare R2 via AWS S3 SDK

## Struktur Project

- `app/` - halaman dan route Next.js
- `app/admin/` - panel pembuatan konten admin
- `app/api/upload/` - endpoint upload gambar ke R2
- `components/` - komponen UI reusable
- `lib/prisma.ts` - konfigurasi Prisma client
- `lib/s3.ts` - konfigurasi Cloudflare R2
- `prisma/schema.prisma` - skema database

## Cara Menjalankan

1. Pasang dependencies:

```bash
npm install
```

2. Jalankan server development:

```bash
npm run dev
```

3. Buka di browser:

```text
http://localhost:3000
```

## Environment Variables

- `DATABASE_URL`
- `R2_ACCOUNT_ID`
- `R2_ACCESS_KEY_ID`
- `R2_SECRET_ACCESS_KEY`
- `R2_BUCKET_NAME`
- `R2_PUBLIC_URL`

## NPM Scripts

- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`
