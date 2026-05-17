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

- **Frontend & UI/UX**:
  - Dashboard Admin berjalan stabil, responsif, dan *mobile-friendly*.
  - Integrasi sistem notifikasi **Sonner Toasts** untuk menggantikan alert bawaan browser, memberikan *feedback* visual (Berhasil/Gagal) yang modern pada semua form admin (Pembuatan, Pengeditan, Penghapusan).
  - Implementasi *Dark/Light Mode* (Opsional pada komponen tertentu) serta konsistensi warna *Emerald* dan *Amber* (Brand Panti Asuhan).
- **Backend & Keamanan**:
  - Fitur CRUD lengkap (Create, Read, Update, Delete) termasuk fitur Edit untuk Artikel, Galeri, dan Album/Sorotan yang sudah teruji.
  - Integrasi EmailJS untuk alur pemulihan password (Lupa Password) via OTP 4-digit.
  - Pengaturan akun dinamis (Database-driven `Settings`) dengan Middleware perlindungan rute admin yang kokoh.

## Analisis Sistem (End-to-End)

Website Yayasan Panti Kp Melayu dirancang sebagai ekosistem digital komprehensif yang tidak hanya menjadi brosur digital, melainkan portal manajemen aktif.
1. **Arsitektur Pengelolaan Aset**: Seluruh gambar (Galeri, Cover Berita) tidak disimpan di server utama, melainkan didistribusikan melalui *Cloudflare R2* menggunakan *AWS S3 SDK*. Hal ini memastikan beban server tetap rendah, pemuatan gambar super cepat, dan biaya hosting yang efisien.
2. **Manajemen Konten (CMS) Berdikari**: Alih-alih bergantung pada CMS pihak ketiga seperti WordPress, website ini memiliki sistem CMS mandiri dengan relasi database PostgreSQL. Galeri bisa dikelompokkan menjadi "Sorotan" tahunan (Album), dan berita memiliki *rich-editor* (walau saat ini menggunakan teks sederhana) serta kategori fleksibel.
3. **Keamanan Lapis Ganda**: Rute admin (`/admin`) sepenuhnya diproteksi *middleware*. Lupa password tidak lagi mengandalkan akses developer langsung ke database, melainkan dikelola sistem reset mandiri berbasis OTP email dengan tabel pengaturan (`Settings`) mandiri.
4. **Skalabilitas**: Karena menggunakan Next.js 16 (App Router) dengan RSC (React Server Components) dan Server Actions, alur eksekusi sangat cepat, SEO-friendly, dan siap dikembangkan lebih jauh tanpa restrukturisasi *codebase* besar-besaran.

## Solusi Masalah Gambar (Development)

Jika gambar dari Cloudflare R2 tidak muncul atau muncul error "Not Secure", gunakan perintah berikut untuk menjalankan server:

```bash
export NODE_TLS_REJECT_UNAUTHORIZED=0 && npm run dev
```

## Rencana Kerja Berikutnya

**Fokus Utama: Sistem Anak Asuh & Kelola Donasi**
1. **Model Database Baru**: Membuat skema `Orphan` (Anak Asuh: Nama, Umur, Sekolah, Kisah, Foto) dan `Donation` (Pencatatan Donasi Manual).
2. **Dashboard Spesifik**: Menambah halaman *Kelola Anak Asuh* dan *Kelola Donasi* di dalam dashboard admin untuk rekapitulasi data panti.

**Optimalisasi Lanjutan**
3. Optimalisasi performa (caching) tingkat lanjut pada halaman publik.
4. Finalisasi SEO dan Meta Tags untuk setiap halaman berita agar optimal di mesin pencari.
5. Penambahan integrasi Payment Gateway otomatis (seperti Midtrans) untuk sistem Donasi Langsung.
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
