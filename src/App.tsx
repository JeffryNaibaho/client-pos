import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  // --- STATE (Variable Data) ---
  const [products, setProducts] = useState([]) 
  const [cart, setCart] = useState([])         
  const [loading, setLoading] = useState(true) 

  // --- FUNGSI 1: Ambil Data dari Laravel ---
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/products')
      setProducts(response.data.data)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching products:", error)
      setLoading(false)
    }
  }

  // --- FUNGSI 2: Tambah ke Keranjang ---
  const addToCart = (product) => {
    // Cek apakah stok habis?
    if (product.stock <= 0) {
        alert("Stok barang ini habis!");
        return;
    }

    const exist = cart.find((item) => item.id === product.id)

    if (exist) {
      // Cek apakah jumlah di keranjang melebihi stok tersedia?
      if (exist.qty >= product.stock) {
          alert("Stok tidak mencukupi!");
          return;
      }
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...exist, qty: exist.qty + 1 } : item
        )
      )
    } else {
      setCart([...cart, { ...product, qty: 1 }])
    }
  }

  // --- FUNGSI 3: Hitung Total Belanjaan ---
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.qty), 0)
  }

  // --- FUNGSI 4: Checkout ke API ---
  const checkout = async () => {
    if (!confirm("Yakin ingin memproses transaksi ini?")) return;
    setLoading(true); 

    try {
      const payload = {
        total_price: calculateTotal(),
        items: cart 
      };

      // Kirim ke Backend
      await axios.post('http://127.0.0.1:8000/api/checkout', payload);
      
      // Jika sukses
      alert("✅ Transaksi Berhasil Disimpan!");
      setCart([]); // Kosongkan keranjang
      fetchProducts(); // Refresh data produk agar stok terupdate
      
    } catch (error) {
      console.error("Gagal checkout:", error);
      alert("❌ Terjadi kesalahan! Pastikan server Laravel menyala.");
    } finally {
      setLoading(false); 
    }
  };

  // Jalankan fetchProducts saat aplikasi mulai
  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div className="container-fluid py-4">
      <div className="row">
        
        {/* BAGIAN KIRI: DAFTAR PRODUK */}
        <div className="col-md-8">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-white">
              <h4 className="fw-bold text-primary mb-0">🛒 Katalog Produk</h4>
            </div>
            <div className="card-body">
              {loading && products.length === 0 ? (
                <div className="text-center p-5">Loading data...</div>
              ) : (
                <div className="row g-3">
                  {products.map((product) => (
                    <div className="col-md-4 col-sm-6" key={product.id}>
                      <div 
                        className={`card h-100 border-0 shadow-sm ${product.stock === 0 ? 'opacity-50' : ''}`}
                        style={{cursor: product.stock > 0 ? 'pointer' : 'not-allowed', transition: '0.3s'}}
                        onClick={() => product.stock > 0 && addToCart(product)}
                      >
                        <div className="card-body text-center">
                            <img 
                                src={product.image} 
                                className="img-fluid rounded mb-3" 
                                style={{height: '100px', objectFit: 'contain'}} 
                                alt={product.name} 
                            />
                            <h6 className="card-title fw-bold">{product.name}</h6>
                            <p className="text-muted small mb-1">
                                {product.category ? product.category.name : 'Umum'}
                            </p>
                            <h5 className="text-primary fw-bold">
                                Rp {product.price.toLocaleString('id-ID')}
                            </h5>
                        </div>
                        <div className="card-footer bg-light border-0 text-center">
                            <small className={product.stock > 0 ? "text-muted" : "text-danger fw-bold"}>
                                {product.stock > 0 ? `Stok: ${product.stock}` : "Habis"}
                            </small>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* BAGIAN KANAN: KERANJANG (CART) */}
        <div className="col-md-4">
          <div className="card shadow border-0">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0 fw-bold">Keranjang Belanja</h5>
            </div>
            <div className="card-body p-0">
              {cart.length === 0 ? (
                <div className="text-center p-5 text-muted">
                    <p>Keranjang kosong</p>
                    <small>Klik produk di kiri untuk menambah.</small>
                </div>
              ) : (
                <ul className="list-group list-group-flush">
                  {cart.map((item) => (
                    <li className="list-group-item d-flex justify-content-between align-items-center" key={item.id}>
                      <div>
                        <h6 className="mb-0">{item.name}</h6>
                        <small className="text-muted">
                            {item.qty} x Rp {item.price.toLocaleString('id-ID')}
                        </small>
                      </div>
                      <span className="fw-bold">
                        Rp {(item.qty * item.price).toLocaleString('id-ID')}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* TOTAL HARGA & TOMBOL BAYAR */}
            <div className="card-footer p-4 bg-light">
                <div className="d-flex justify-content-between mb-3">
                    <span className="h5 mb-0">Total:</span>
                    <span className="h4 fw-bold text-primary">
                        Rp {calculateTotal().toLocaleString('id-ID')}
                    </span>
                </div>
                
                <button 
                    className="btn btn-primary w-100 py-2 fw-bold"
                    disabled={cart.length === 0 || loading} 
                    onClick={checkout} 
                >
                    {loading && cart.length > 0 ? 'Memproses...' : 'BAYAR SEKARANG'}
                </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default App