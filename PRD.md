# 📄 Dokumen Persyaratan Produk (PRD)
**Proyek:** *Panti Asuhan Kp Melayu* – Website Informasi & Admin  
**Versi:** 1.0  
**Tanggal:** 29 April 2026

---

### 1️⃣ Ringkasan Proyek
Website ini adalah portal publik sekaligus admin sederhana untuk **Panti Asuhan Kp Melayu**. Tujuannya menyediakan informasi (berita, galeri, profil, donasi) kepada publik serta memungkinkan tim admin mengelola konten secara dinamis melalui antarmuka web. Semua data disimpan di PostgreSQL/Supabase, gambar disimpan di Cloudflare R2, dan aplikasi dibangun dengan **Next.js 16**, **React 19**, **TypeScript**, **Tailwind CSS**, serta **Prisma** untuk ORM.

---

### 2️⃣ Tujuan Utama
| No | Tujuan | Manfaat bagi Klien |
|---|---|---|
| 1 | Menyajikan informasi panti (berita, galeri, profil, cara donasi) kepada publik | Meningkatkan visibilitas dan transparansi organisasi |
| 2 | Memungkinkan admin menambah/ubah/hapus konten tanpa pengetahuan teknis | Mempercepat proses pembaruan dan mengurangi ketergantungan pada developer |
| 3 | Penyimpanan gambar yang handal dan skalabel (Cloudflare R2) | Foto‑foto acara dan anak asuh dapat diakses cepat dan aman |
| 4 | Sistem autentikasi admin yang aman | Hanya orang berwenang yang dapat mengelola data |

---

### 3️⃣ Lingkup & Batasan
| Area | Sudah Ada | Yang Perlu Dikerjakan |
|------|-----------|-----------------------|
| **Frontend** | Halaman publik (home, news, gallery, profile, donation). Detail berita & galeri dinamis. Dashboard admin terpusat. UI Create & Update untuk news & gallery. | • Optimalisasi SEO per halaman <br> • Polishing animasi transisi |
| **Backend** | Prisma schema, Full CRUD Actions (Create, Update, Delete) untuk news & gallery. Upload ke R2. Middleware proteksi admin (Username/Password). Image Proxy API. | • Manajemen pengguna admin ganda (tambah/hapus) – opsional |
| **DevOps** | Skrip npm. Konfigurasi host R2 dinamis (env var). Dokumentasi README & PRD. | • Setup CI/CD (GitHub Actions/Vercel) <br> • Pengaturan environment variables pada server produksi |
| **Keamanan** | Autentikasi middleware dengan Username/Password. | • Rate limiting untuk endpoint login |

---

### 4️⃣ Fitur Utama
| Kategori | Fitur | Deskripsi |
|----------|-------|-----------|
| **Publik** | Berita | Daftar berita, detail per slug, pagination (opsional). |
|  | Galeri | Album per tahun, tampilan masonry, preview foto. |
|  | Profil & Donasi | Informasi panti, form donasi (link eksternal). |
| **Admin** | Dashboard Terpadu | Menu navigasi cepat ke *Create*, *Update*, *Delete* berita & galeri. |
|  | CRUD Berita | Tambah, ubah, hapus berita (title, content, thumbnail). |
|  | CRUD Galeri | Tambah foto ke album, ubah info foto, hapus foto. |
|  | Upload Gambar | Drag‑&‑drop → endpoint `/api/upload` → Cloudflare R2 → simpan `imageKey`. |
|  | Autentikasi | Login admin (email + password), proteksi semua route `/admin/*`. |
| **Infrastruktur** | Konfigurasi Dinamis R2 | `next.config.ts` membaca `R2_PUBLIC_URL` dari env. |
|  | Prisma + Supabase | Model `News`, `Gallery`, migrasi schema, sync otomatis. |

---

### 5️⃣ Arsitektur Teknis (Ringkas)
```
┌─────────────────────┐
│   Browser (Next.js) │
│  - React 19 UI     │
│  - Tailwind CSS    │
│  - Server Actions  │
└───────▲───────▲─────┘
        │       │
   API  │       │  Pages (app/)
        │       │
   ┌────▼─────┐ ┌───────▼─────┐
   │  API     │ │  Prisma     │
   │  /api    │ │  Client     │
   └────▲─────┘ └───────▲─────┘
        │               │
        │   PostgreSQL / Supabase
        │
   ┌────▼─────┐
   │ Cloudflare│
   │   R2      │
   └───────────┘
```
- **Next.js 16** – App Router, Server‑Side Rendering untuk SEO.
- **Prisma 7** – ORM, migrasi otomatis.
- **Cloudflare R2** – Penyimpanan gambar, diakses via AWS S3 SDK.
- **Environment Variables** – `DATABASE_URL`, `R2_*`, `NEXT_PUBLIC_*`.

---

### 6️⃣ Jadwal & Milestone (Estimasi)
| Milestone | Deskripsi | Durasi (hari) | Tanggal Target |
|-----------|-----------|---------------|----------------|
| 1. Dashboard Admin UI | Layout, navigation, integrasi create‑form | 3 | 2026‑05‑03 |
| 2. CRUD News API | `updateNews`, `deleteNews` actions & endpoints | 2 | 2026‑05‑05 |
| 3. CRUD Gallery API | `updateGallery`, `deleteGallery` + UI | 3 | 2026‑05‑08 |
| 4. Refactor `next.config.ts` | Host R2 dinamis via env | 1 | 2026‑05‑09 |
| 5. Pengujian & QA | Unit test, end‑to‑end, security check | 2 | 2026‑05‑11 |
| 6. Dokumentasi & Handover | README, deployment guide, PRD final | 1 | 2026‑05‑12 |

*Total estimasi: ~12 hari kerja.*

---

### 7️⃣ Risiko & Mitigasi
| Risiko | Dampak | Mitigasi |
|--------|--------|----------|
| **Perubahan domain R2** | Gambar tidak dapat di‑load | Buat `R2_PUBLIC_URL` env var, deploy config secara dinamis. |
| **Kesalahan autentikasi** | Admin tidak dapat mengakses | Implementasi unit test pada middleware, gunakan bcrypt untuk hash password. |
| **Skalabilitas DB** | Laju pertumbuhan data berpotensi lambat | Gunakan Supabase (PostgreSQL) dengan indeks pada `slug` & `createdAt`. |
| **Keterbatasan UI mobile** | Pengalaman buruk pada device kecil | Pastikan Tailwind responsive utilities, lakukan testing pada breakpoint. |

---

### 8️⃣ Kriteria Penerimaan (Acceptance Criteria)
1. **Dashboard Admin** menampilkan tabel berita & galeri dengan tombol *Create*, *Edit*, *Delete* yang berfungsi.
2. **API Update/Delete** mengembalikan HTTP 200 pada keberhasilan dan menolak dengan 400/401 bila data tidak valid atau tidak terautentikasi.
3. **Upload gambar** menyimpan file di R2, mengembalikan URL publik, dan menyimpan `imageKey` dalam database.
4. **Konfigurasi R2** dapat di‑ubah hanya dengan mengubah variabel lingkungan, tanpa mengubah kode.
5. **Pengujian**: 80 % coverage unit test + 2 skenario end‑to‑end (create & delete news).
6. **Dokumentasi** lengkap: cara menjalankan (`npm install`, `npm run dev`), variabel env, dan panduan deploy.

---

### 9️⃣ Penutup
Dokumen ini menjabarkan secara lengkap apa yang sudah ada, apa yang masih perlu dikerjakan, serta rencana pelaksanaan yang terukur. Dengan mengikuti PRD ini, tim pengembang dapat menyelesaikan *Panti Asupan Kp Melayu* tepat waktu, memberikan nilai bisnis yang jelas bagi klien, serta memastikan kualitas dan keamanan produk akhir.

---

*Jika ada bagian yang memerlukan penyesuaian atau penambahan, silakan beri masukan agar PRD dapat diperbaharui sebelum masuk ke fase pengembangan.*
