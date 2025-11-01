import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

export default function CartItem({ item }) {
  const { updateCartItem, removeFromCart } = useCart();
  const { showToast } = useToast();
  const [isUpdating, setIsUpdating] = useState(false);
  
  const product = item.productId || {};
  const quantity = item.quantity || 1;

  const handleIncrease = async () => {
    setIsUpdating(true);
    const result = await updateCartItem(product._id, quantity + 1);
    setIsUpdating(false);
    if (!result.success) {
      showToast(result.message, 'error');
    }
  };

  const handleDecrease = async () => {
    if (quantity <= 1) return;
    setIsUpdating(true);
    const result = await updateCartItem(product._id, quantity - 1);
    setIsUpdating(false);
    if (!result.success) {
      showToast(result.message, 'error');
    }
  };

  const handleRemove = async () => {
    const confirmRemove = window.confirm(`Xóa "${product.name}" khỏi giỏ hàng?`);
    if (!confirmRemove) return;
    
    const result = await removeFromCart(product._id);
    if (result.success) {
      showToast('Đã xóa sản phẩm khỏi giỏ hàng', 'success');
    } else {
      showToast(result.message, 'error');
    }
  };

  return (
    <div className="flex gap-4 bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
      <div className="w-24 h-24 flex-shrink-0 bg-gradient-to-br from-amber-100 to-orange-200 rounded-lg flex items-center justify-center overflow-hidden">
        {product.image ? (
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <div className="text-4xl">☕</div>
        )}
      </div>
      
      <div className="flex-grow">
        <h3 className="text-lg font-bold text-amber-900 mb-1">{product.name || 'Sản phẩm'}</h3>
        <p className="text-sm text-gray-600 mb-2">{product.category || 'Cà phê'}</p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-amber-50 rounded-lg p-1">
            <button
              onClick={handleDecrease}
              className="w-7 h-7 bg-white rounded hover:bg-amber-100 transition font-bold text-amber-900 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={quantity <= 1 || isUpdating}
            >
              −
            </button>
            <span className="w-8 text-center font-semibold">{quantity}</span>
            <button
              onClick={handleIncrease}
              className="w-7 h-7 bg-white rounded hover:bg-amber-100 transition font-bold text-amber-900 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isUpdating}
            >
              +
            </button>
          </div>
          <span className="text-lg font-bold text-orange-600">
            {((product.price || 0) * quantity).toLocaleString('vi-VN')}đ
          </span>
        </div>
      </div>
      
      <button
        onClick={handleRemove}
        className="self-start text-red-500 hover:text-red-700 transition p-2"
        title="Xóa khỏi giỏ hàng"
      >
        <span className="text-2xl">🗑️</span>
      </button>
    </div>
  );
}

