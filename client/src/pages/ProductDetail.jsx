import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { productAPI } from '../services/api';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      const data = await productAPI.getById(id);
      setProduct(data);
    } catch (error) {
      console.error('Failed to load product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    const result = await addToCart(product._id, quantity);
    if (result.success) {
      alert('✅ ' + result.message);
    } else {
      alert('❌ ' + result.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-50">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">☕</div>
          <p className="text-amber-900 text-xl font-semibold">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-50">
        <div className="text-center">
          <div className="text-8xl mb-4">😔</div>
          <p className="text-amber-900 text-xl font-semibold mb-4">Không tìm thấy sản phẩm</p>
          <Link to="/shop" className="text-orange-600 hover:underline">
            ← Quay lại cửa hàng
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Link to="/shop" className="inline-flex items-center text-amber-900 hover:text-amber-700 mb-8">
          ← Quay lại cửa hàng
        </Link>

        <div className="grid md:grid-cols-2 gap-12 bg-white p-8 rounded-2xl shadow-xl">
          {/* Product Image */}
          <div className="aspect-square bg-gradient-to-br from-amber-100 to-orange-200 rounded-xl flex items-center justify-center overflow-hidden">
            {product.image ? (
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <div className="text-9xl">☕</div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            {product.category && (
              <span className="inline-block w-fit bg-amber-100 text-amber-800 text-sm px-4 py-2 rounded-full font-semibold mb-4">
                {product.category}
              </span>
            )}

            <h1 className="text-4xl font-bold text-amber-900 mb-4">{product.name}</h1>
            
            <div className="text-4xl font-bold text-orange-600 mb-6">
              {product.price?.toLocaleString('vi-VN')}đ
            </div>

            <p className="text-gray-700 leading-relaxed mb-8">
              {product.description || 'Cà phê chất lượng cao, được rang xay tươi mỗi ngày. Hương vị đậm đà, thơm ngon.'}
            </p>

            {/* Quantity Selector */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Số lượng:</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 bg-amber-100 hover:bg-amber-200 rounded-lg font-bold text-xl text-amber-900 transition"
                >
                  −
                </button>
                <span className="text-2xl font-bold text-amber-900 w-16 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 bg-amber-100 hover:bg-amber-200 rounded-lg font-bold text-xl text-amber-900 transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                className="w-full bg-amber-900 text-white py-4 rounded-lg hover:bg-amber-800 transition font-bold text-lg flex items-center justify-center gap-2"
              >
                <span>🛒</span>
                <span>Thêm vào giỏ hàng</span>
              </button>
              <button
                onClick={() => {
                  handleAddToCart();
                  setTimeout(() => navigate('/cart'), 500);
                }}
                className="w-full bg-orange-600 text-white py-4 rounded-lg hover:bg-orange-700 transition font-bold text-lg"
              >
                Mua ngay
              </button>
            </div>

            {/* Product Details */}
            <div className="mt-8 pt-8 border-t border-amber-200">
              <h3 className="font-bold text-amber-900 mb-4">Thông tin sản phẩm:</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ 100% hạt cà phê nguyên chất</li>
                <li>✓ Rang xay tươi mỗi ngày</li>
                <li>✓ Bảo quản trong bao bì kín</li>
                <li>✓ Giao hàng nhanh chóng</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

