This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Ringkasan Proyek

Aplikasi ini adalah website informasi untuk `PantiAsuhanKpMelayu` dengan halaman publik dan admin sederhana. Fitur inti saat ini mencakup daftar berita, galeri foto, profil panti, donasi, serta form admin untuk membuat konten berita dan galeri.

## Fitur yang Sudah Ada

### Frontend

- Halaman depan `app/page.tsx` menampilkan beberapa blok konten statis: hero, kebutuhan darurat, berita, galeri, donasi, dan kontak.
- Halaman berita `app/news/page.tsx` mengambil data dari Prisma dan menampilkan berita dengan `NewsHero`, `NewsGrid`, dan `NewsSidebar`.
- Halaman galeri `app/gallery/page.tsx` menampilkan `GalleryHero`, `AlbumPerTahun`, dan `MasonryGallery`.
- **Admin Dashboard** (`app/admin/(dashboard)`): Pusat manajemen konten dengan tampilan yang responsif (Sidebar khusus di Mobile).
- **Sistem Autentikasi Admin** (`app/admin`): Satu pintu masuk yang aman dengan fitur **Lupa Password** terintegrasi dengan EmailJS (Verifikasi kode 4-digit).
- **Pengaturan Akun Admin**: Fitur untuk mengubah username, password, dan email pemulihan langsung dari antarmuka pengguna dengan proteksi keamanan OTP.
- **Manajemen Galeri & Sorotan**: Fitur untuk mengunggah foto baru serta mengelompokkan foto-foto yang sudah ada di database menjadi Album (Sorotan) tahunan.
- **Full CRUD UI**: Form terpadu untuk membuat dan mengedit konten berita/galeri.

### Backend

- `lib/prisma.ts` menginisialisasi Prisma Client standar untuk manajemen database PostgreSQL.
- `lib/actions.ts` menyediakan Server Actions untuk operasi CRUD (News, Gallery, Album) serta pengaturan akun dan verifikasi password.
- Middleware keamanan (`proxy.ts`): Melindungi rute `/admin` dan memberikan pengecualian (whitelist) untuk alur pemulihan password.
- **Image Proxy API** (`app/api/images/[...path]/route.ts`): Menangani masalah SSL/HSTS dan blokir ISP dengan menjembatani akses gambar dari server lokal.
- Endpoint upload (`app/api/upload/route.ts`): Mengunggah file ke Cloudflare R2 menggunakan AWS S3 SDK.
- Prisma schema (`prisma/schema.prisma`): Mengelola relasi data antara `News`, `Gallery`, `Album`, dan `Settings`.

## Progress Saat Ini

- Frontend: 100% selesai untuk fitur inti
  - Dashboard Admin berjalan stabil dan responsif (Mobile-friendly).
  - Integrasi EmailJS untuk alur pemulihan password (Lupa Password).
  - Alur Edit dan Update data terintegrasi penuh.
- Backend: 100% selesai untuk fitur inti
  - Fitur CRUD lengkap termasuk relasi Album-Galeri.
  - Pengaturan akun dinamis (Database-driven `Settings`).
  - Middleware perlindungan rute admin yang solid.
- Total proyek: Siap rilis / tahap pemeliharaan.

## Solusi Masalah Gambar (Development)

Jika gambar dari Cloudflare R2 tidak muncul atau muncul error "Not Secure", gunakan perintah berikut untuk menjalankan server:

```bash
export NODE_TLS_REJECT_UNAUTHORIZED=0 && npm run dev
```

## Rencana Kerja Berikutnya

1. Optimalisasi performa (caching) tingkat lanjut pada halaman publik.
2. Finalisasi SEO dan Meta Tags untuk setiap halaman berita agar optimal di mesin pencari.
3. Penambahan integrasi Payment Gateway untuk donasi langsung (di masa depan).

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

- `DATABASE_URL` (Direct Connection String)
- `DIRECT_URL`
- `R2_ACCOUNT_ID`
- `R2_ACCESS_KEY_ID`
- `R2_SECRET_ACCESS_KEY`
- `R2_BUCKET_NAME`
- `R2_PUBLIC_URL`
- `ADMIN_SECRET` (Untuk inisialisasi password)

## NPM Scripts

- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`
