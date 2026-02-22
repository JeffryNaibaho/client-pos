# 🛒 Fullstack POS (Point of Sale) System

Sebuah aplikasi kasir modern berbasis web yang memisahkan arsitektur Frontend dan Backend secara rapi (*Decoupled Architecture*). Aplikasi ini dirancang untuk menangani transaksi secara *real-time*, mengelola stok produk otomatis, dan siap diakses dari berbagai perangkat (Responsive).

🚀 **Live Demo:** [https://client-pos-eta.vercel.app/]

---

## 🛠️ Tech Stack & Arsitektur

Aplikasi ini dibangun menggunakan teknologi standar industri modern:

* **Frontend:** React.js (dengan Vite) + TypeScript + Bootstrap
* **Backend / API:** Laravel 11 (PHP)
* **Database:** PostgreSQL (Neon DB Serverless)
* **Deployment:** Vercel (Frontend & Backend Serverless)

---

## ✨ Fitur Utama

- [x] **Katalog Produk Dinamis:** Menampilkan daftar produk beserta gambar dan detail harga dari REST API.
- [x] **Manajemen Keranjang (Cart):** Validasi stok otomatis saat memasukkan barang ke keranjang.
- [x] **Sistem Checkout Aman:** Mengirim *payload* transaksi ke Backend menggunakan *Database Transaction* yang solid (ACID compliant).
- [x] **Auto-Update Stok:** Stok barang langsung berkurang secara *real-time* di *database* pasca transaksi.
- [x] **CORS & Serverless Ready:** Backend sudah dikonfigurasi untuk menangani *cross-origin requests* dan berjalan di lingkungan *Read-Only Serverless* (Vercel).

---

## 📸 Screenshot

![Desktop](<img width="1919" height="958" alt="image" src="https://github.com/user-attachments/assets/f14ba663-9aa3-425a-8e6a-9a19bd96ea75" />)

---

## ⚙️ Cara Menjalankan di Localhost

Jika Anda ingin menjalankan project ini di komputer lokal:

**1. Clone Repository & Install Dependencies:**
\`\`\`bash
npm install
\`\`\`

**2. Setup Environment:**
Buat file `.env` dan masukkan link API:
\`\`\`env
VITE_API_BASE_URL=https://server-pos-blue.vercel.app/api
\`\`\`

**3. Jalankan Aplikasi:**
\`\`\`bash
npm run dev
\`\`\`
