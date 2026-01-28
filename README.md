# 🛍️ Point of Sales (POS) - Frontend

Frontend aplikasi kasir modern yang dibangun menggunakan **React.js (Vite)**. Aplikasi ini berfungsi sebagai antarmuka kasir untuk memilih produk, mengelola keranjang belanja, dan memproses transaksi secara real-time.

## ⚡ Tech Stack
- **Framework:** React.js + Vite
- **Styling:** Bootstrap 5
- **HTTP Client:** Axios
- **State Management:** React Hooks (useState, useEffect)

## 📸 Fitur Utama
- **Katalog Produk Interaktif:** Menampilkan produk dengan gambar dan stok live dari database.
- **Smart Cart System:**
  - Tambah barang ke keranjang dengan satu klik.
  - Otomatis menggabungkan item yang sama (update quantity).
  - Kalkulasi total harga otomatis.
- **Transaksi Real-time:** Terintegrasi langsung dengan Laravel Backend API.

## 🚀 Cara Menjalankan (Local)

1. **Clone Repository**
   ```bash
   git clone [https://github.com/JeffryNaibaho/client-pos.git](https://github.com/JeffryNaibaho/client-pos.git)
   cd client-pos
2. **Install Dependencies**
   npm install
3. **Jalankan Server Development**
   npm run dev
   