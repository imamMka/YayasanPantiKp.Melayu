This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Ringkasan Proyek

Aplikasi ini adalah website informasi untuk `PantiAsuhanKpMelayu` dengan halaman publik dan admin sederhana. Fitur inti saat ini mencakup daftar berita, galeri foto, profil panti, donasi, serta form admin untuk membuat konten berita dan galeri.

## Fitur yang Sudah Ada

### Frontend

- Halaman depan `app/page.tsx` menampilkan beberapa blok konten statis: hero, kebutuhan darurat, berita, galeri, donasi, dan kontak.
- Halaman berita `app/news/page.tsx` mengambil data dari Prisma dan menampilkan berita dengan `NewsHero`, `NewsGrid`, dan `NewsSidebar`.
- Halaman galeri `app/gallery/page.tsx` menampilkan `GalleryHero`, `AlbumPerTahun`, dan `MasonryGallery`.
- **Admin Dashboard** (`app/admin/dashboard/page.tsx`): Pusat manajemen konten terpadu.
- **Unified Admin Login** (`app/admin/page.tsx`): Satu pintu masuk untuk admin dengan proteksi username/password.
- **Full CRUD UI**: Form untuk Create dan Edit berita/galeri dengan pratinjau gambar.
- Komponen upload `components/ImageUploader.tsx` mengirim file ke endpoint upload.

### Backend

- `lib/prisma.ts` menginisialisasi Prisma dengan adapter PostgreSQL/Supabase dan logging development.
- `lib/actions.ts` menyediakan server action lengkap (Create, Read, Update, Delete) untuk News dan Gallery.
- **Image Proxy API** (`app/api/images/[...path]/route.ts`): Menangani masalah SSL/HSTS dan blokir ISP dengan menjembatani akses gambar dari server lokal.
- Endpoint upload `app/api/upload/route.ts`:
  - Menerima file `form-data`
  - Mengunggah ke Cloudflare R2 menggunakan AWS S3 SDK
  - Mengembalikan URL file publik
- Prisma schema `prisma/schema.prisma` mengelola model `News` dan `Gallery`.

## Progress Saat Ini

- Frontend: 95% selesai
  - Dashboard Admin terpusat sudah berjalan stabil.
  - Alur Edit dan Update data sudah terintegrasi dengan UI.
  - Proteksi rute admin sudah diperketat ke satu pintu masuk.
- Backend: 95% selesai
  - Fitur CRUD lengkap (Create, Read, Update, Delete) sudah tersedia via Server Actions.
  - Solusi Image Proxy mengatasi masalah pemuatan gambar di lingkungan development (ISP Indonesia).
  - Konfigurasi `next.config.ts` sudah dinamis mengikuti `R2_PUBLIC_URL`.
- Total proyek: 95% selesai

## Solusi Masalah Gambar (Development)

Jika gambar dari Cloudflare R2 tidak muncul atau muncul error "Not Secure", gunakan perintah berikut untuk menjalankan server:

```bash
export NODE_TLS_REJECT_UNAUTHORIZED=0 && npm run dev
```

## Rencana Kerja Berikutnya

1. Optimalisasi performa (caching) pada halaman publik.
2. Tambahkan fitur manajemen pengguna admin tambahan atau ganti password via UI (opsional).
3. Finalisasi SEO dan Meta Tags untuk setiap halaman berita.

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
