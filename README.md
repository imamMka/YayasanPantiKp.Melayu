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

- Frontend: 80% selesai
  - Struktur halaman publik sudah berjalan dinamis (berita & galeri terhubung database).
  - Halaman detail berita dan galeri dinamis (`news/preview/[slug]`, `gallery/preview/[id]`) sudah tersedia.
  - Form admin berita dan galeri sudah berjalan dengan perbaikan UI (seperti hover Tailwind).
- Backend: 75% selesai
  - Autentikasi / proteksi halaman admin sudah ada menggunakan middleware (`/admin/*`).
  - Alur Create berita dan galeri sudah stabil, dan upload ke R2 sudah memvalidasi respon serta menyimpan `imageKey`.
  - Belum ada fitur update/delete untuk konten berita dan galeri.
- Total proyek: 75% selesai

## Masalah / Error yang Perlu Diperbaiki

- `next.config.ts` hanya menyetujui satu host R2 statis, yang bisa gagal jika domain R2 yang digunakan berubah (perlu disesuaikan dengan environment `R2_PUBLIC_URL`).

## Rencana Kerja Berikutnya

1. Buat UI Dashboard Admin terpusat yang menggabungkan halaman manajemen konten (Berita & Galeri) untuk mempermudah proses Create, Update, dan Delete dalam satu antarmuka.
2. Lengkapi fitur CRUD (Update dan Delete) untuk berita dan galeri yang terintegrasi dengan Dashboard tersebut.
3. Dinamisasi host images pada `next.config.ts` menggunakan environment variable.
4. Tambahkan fitur manajemen pengguna admin atau ganti password (jika dibutuhkan ke depannya).

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
