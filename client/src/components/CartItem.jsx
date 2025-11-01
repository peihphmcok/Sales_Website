import React from 'react';

export default function CartItem({ item, onRemove, onUpdateQuantity }) {
  const product = item.productId || {};
  const quantity = item.quantity || 1;

  const handleIncrease = () => {
    if (onUpdateQuantity) {
      onUpdateQuantity(product._id, quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1 && onUpdateQuantity) {
      onUpdateQuantity(product._id, quantity - 1);
    }
  };

  const handleRemove = () => {
    if (onRemove) {
      onRemove(product._id);
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
              className="w-7 h-7 bg-white rounded hover:bg-amber-100 transition font-bold text-amber-900"
              disabled={quantity <= 1}
            >
              −
            </button>
            <span className="w-8 text-center font-semibold">{quantity}</span>
            <button
              onClick={handleIncrease}
              className="w-7 h-7 bg-white rounded hover:bg-amber-100 transition font-bold text-amber-900"
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

