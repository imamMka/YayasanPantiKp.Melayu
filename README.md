This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Technical Summary

- User Management
  - Menyimpan profil pengguna dasar dengan identifier unik.
  - Menyimpan data keamanan untuk autentikasi dan akses aplikasi.
  - Profil dirancang untuk mendukung informasi identitas dan kontrol akses.

- Content/Product Logic
  - Konten utama diorganisir dalam entitas berita dan galeri.
  - Setiap konten memiliki judul, deskripsi atau isi, dan atribut metadata terkait.
  - Gambar dipisahkan sebagai file terpisah di object storage Cloudflare R2, sedangkan teks dan metadata konten disimpan di database Supabase.

- Audit Trails
  - Sistem mencatat waktu pembuatan setiap catatan.
  - Waktu pembuatan digunakan untuk melacak kapan konten ditambahkan ke sistem.
  - Struktur data mendukung pelacakan rentang waktu untuk manajemen konten yang lebih baik.

## Project Progress

- Struktur utama aplikasi sudah terbentuk dengan halaman publik untuk berita, galeri, profil, dan donasi.
- Admin flow pembuatan konten sudah tersedia untuk entri berita dan foto galeri.
- Penyimpanan gambar telah diintegrasikan dengan Cloudflare R2, sementara teks dan metadata disimpan di Supabase melalui Prisma.
- Prisma telah dikonfigurasikan sebagai lapisan data utama untuk akses teks, metadata, dan relasi konten.

## Frontend Progress

- Tampilan publik dan form admin sudah dibangun menggunakan Next.js dan komponen client-side.
- Halaman berita dan galeri sudah bisa menampilkan data konten dasar.
- Upload gambar melalui `app/api/upload` terhubung ke R2 untuk menyimpan file.
- Beberapa bagian UI masih menggunakan data statis, terutama preview dan navigation.
- Navigasi user-flow dasar tersedia, tetapi belum lengkap untuk semua halaman admin.

## Backend Progress

- Lapisan data backend menggunakan Prisma untuk Supabase sebagai database teks dan metadata.
- Integrasi Cloudflare R2 telah disiapkan dengan konfigurasi S3 client pada `lib/s3.ts`.
- Endpoint upload bekerja untuk menyimpan file ke bucket R2 dan mengembalikan URL publik.
- Model backend saat ini fokus pada `News` dan `Gallery`, tetapi manajemen pengguna belum terimplementasi penuh.
- Audit trail backend saat ini hanya mencatat waktu pembuatan, belum mendukung update timestamp secara lengkap.

## Current Issues

- User management masih bersifat kerangka; model pengguna dan otentikasi penuh belum lengkap.
- Audit trail hanya menangkap waktu pembuatan saat ini, dan belum memiliki mekanisme pembaruan lengkap.
- Beberapa konten preview/nav masih mengandalkan data hardcoded atau struktur statis.
- Integrasi upload R2 sudah ada, tetapi penyimpanan kunci file dan penggunaan URL publik perlu pengujian lanjutan.
- Lingkungan deployment bergantung pada variabel Cloudflare R2 dan Supabase yang harus disiapkan dengan benar.

## Future Roadmap

- Keamanan CMS dashboard dengan login dan proteksi akses admin.
- Sistem navigasi lengkap agar pengguna dapat mengakses semua halaman utama dan admin.
- Penyelesaian user management untuk profil, autentikasi, dan kontrol akses.
- Penyempurnaan audit trail untuk capture waktu pembaruan, bukan hanya pembuatan.
- Penambahan testing dan dokumentasi deployment untuk Supabase + Cloudflare R2.

## Installation & Additional Structure

- Setup environment variables untuk `DATABASE_URL`, `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET_NAME`, dan `R2_PUBLIC_URL`.
- Jalankan `npm install` jika package belum terpasang.
- Folder tambahan yang dipakai saat ini termasuk `app/admin`, `app/api/upload`, `lib/actions.ts`, dan `lib/prisma.ts`.
- Path utama untuk page dan integrasi:
  - `/news`
  - `/gallery`
  - `/profile`
  - `/donation`
  - `/admin/news/create`
  - `/admin/gallery/create`
  - `/api/upload`

## Current Completion

- Proyek saat ini berada di sekitar 55% selesai.
- Struktur publik dan alur pembuatan konten sudah berjalan, namun fitur keamanan CMS, navigasi penuh, dan audit trail lengkap masih dalam pengembangan.

## Next Work

- Lengkapi keamanan CMS dashboard dengan login, otentikasi, dan proteksi akses admin.
- Selesaikan user management untuk profil pengguna, autentikasi, dan kontrol hak akses.
- Bangun sistem navigasi penuh yang menghubungkan halaman publik dan halaman admin secara konsisten.
- Perkuat audit trail dengan timestamp pembuatan dan pembaruan data, dan catat perubahan konten.
- Uji end-to-end upload Cloudflare R2, simpan metadata `imageKey` dan gunakan URL publik secara andal.
- Ganti konten preview hardcoded dengan data dinamis dari database Supabase.
- Verifikasi integrasi Prisma-Supabase untuk query berita, galeri, dan model metadata.
- Perbaiki dokumentasi instalasi dan environment variable untuk deployment yang stabil.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
