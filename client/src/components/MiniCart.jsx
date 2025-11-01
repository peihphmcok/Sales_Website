import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

export default function MiniCart({ isOpen, onClose }) {
  const { cart, getCartTotal, getCartCount, removeFromCart } = useCart();
  const { showToast } = useToast();
  const [removingId, setRemovingId] = useState(null);
  
  const items = cart?.items || [];
  const total = getCartTotal();
  const count = getCartCount();

  const handleRemove = async (productId, productName) => {
    setRemovingId(productId);
    const result = await removeFromCart(productId);
    setRemovingId(null);
    
    if (result.success) {
      showToast(`Đã xóa "${productName}" khỏi giỏ hàng`, 'success');
    } else {
      showToast(result.message, 'error');
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-20 z-40"
        onClick={onClose}
      />
      
      {/* Mini Cart Dropdown */}
      <div className="absolute right-0 mt-2 w-96 max-w-[calc(100vw-2rem)] bg-white rounded-xl shadow-2xl z-50 max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-bold text-amber-900">
            Giỏ hàng ({count})
          </h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            ✕
          </button>
        </div>

        {/* Cart Items */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center py-12 px-4">
            <div className="text-6xl mb-4">🛒</div>
            <p className="text-gray-500 text-center mb-4">
              Giỏ hàng của bạn đang trống
            </p>
            <Link
              to="/shop"
              onClick={onClose}
              className="bg-amber-900 text-white px-6 py-2 rounded-lg hover:bg-amber-800 transition font-semibold"
            >
              Mua sắm ngay
            </Link>
          </div>
        ) : (
          <>
            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {items.map((item) => {
                const product = item.productId || {};
                const price = product.price || 0;
                const quantity = item.quantity || 0;
                
                return (
                  <div key={item._id || product._id} className="flex gap-3 bg-gray-50 p-3 rounded-lg">
                    <div className="w-16 h-16 flex-shrink-0 bg-gradient-to-br from-amber-100 to-orange-200 rounded-lg flex items-center justify-center overflow-hidden">
                      {product.image ? (
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-2xl">☕</div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-amber-900 truncate">
                        {product.name || 'Sản phẩm'}
                      </h4>
                      <p className="text-xs text-gray-500">
                        SL: {quantity} x {price.toLocaleString('vi-VN')}đ
                      </p>
                      <p className="text-sm font-bold text-orange-600 mt-1">
                        {(price * quantity).toLocaleString('vi-VN')}đ
                      </p>
                    </div>
                    
                    <button
                      onClick={() => handleRemove(product._id, product.name)}
                      disabled={removingId === product._id}
                      className="text-red-500 hover:text-red-700 transition self-start disabled:opacity-50"
                      title="Xóa"
                    >
                      {removingId === product._id ? '⏳' : '🗑️'}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-700 font-semibold">Tổng cộng:</span>
                <span className="text-2xl font-bold text-orange-600">
                  {total.toLocaleString('vi-VN')}đ
                </span>
              </div>
              
              <div className="space-y-2">
                <Link
                  to="/cart"
                  onClick={onClose}
                  className="block w-full bg-amber-100 text-amber-900 text-center py-3 rounded-lg hover:bg-amber-200 transition font-semibold"
                >
                  Xem giỏ hàng
                </Link>
                <Link
                  to="/checkout"
                  onClick={onClose}
                  className="block w-full bg-amber-900 text-white text-center py-3 rounded-lg hover:bg-amber-800 transition font-semibold"
                >
                  Thanh toán ngay
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

