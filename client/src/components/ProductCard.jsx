import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async (e) => {
    e.preventDefault(); // Prevent Link navigation
    
    if (!isAuthenticated) {
      showToast('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng', 'warning');
      navigate('/login');
      return;
    }

    setIsAdding(true);
    const result = await addToCart(product._id, 1);
    setIsAdding(false);

    if (result.success) {
      showToast(`Đã thêm "${product.name}" vào giỏ hàng!`, 'success');
    } else {
      showToast(result.message, 'error');
    }
  };

  return (
    <Link to={`/product/${product._id}`} className="product-card group block">
      <div className="relative overflow-hidden h-56 bg-gradient-to-br from-amber-100 to-orange-200 flex items-center justify-center">
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="text-7xl transition-transform duration-300 group-hover:scale-110">☕</div>
        )}
        {product.isNew && (
          <div className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
            MỚI
          </div>
        )}
        
        {/* Quick view overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-semibold">
            Xem chi tiết
          </span>
        </div>
      </div>
      <div className="product-card-content">
        {product.category && (
          <span className="inline-block bg-amber-100 text-amber-800 text-xs px-3 py-1 rounded-full font-semibold mb-2">
            {product.category}
          </span>
        )}
        <h3 className="text-xl font-bold text-amber-900 mb-2 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {product.description || 'Cà phê chất lượng cao'}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-orange-600">
            {product.price?.toLocaleString('vi-VN')}đ
          </span>
          <button 
            onClick={handleAddToCart}
            disabled={isAdding}
            className="bg-amber-900 text-white px-4 py-2 rounded-lg hover:bg-amber-800 transition font-semibold text-sm flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAdding ? (
              <>
                <span className="animate-spin">⏳</span>
                <span>Đang thêm...</span>
              </>
            ) : (
              <>
                <span>🛒</span>
                <span>Thêm</span>
              </>
            )}
          </button>
        </div>
      </div>
    </Link>
  );
}