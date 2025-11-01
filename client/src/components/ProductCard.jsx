import React from 'react';

export default function ProductCard({ product }) {
  return (
    <div className="product-card group">
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
          <button className="bg-amber-900 text-white px-4 py-2 rounded-lg hover:bg-amber-800 transition font-semibold text-sm flex items-center gap-1">
            <span>🛒</span>
            <span>Thêm</span>
          </button>
        </div>
      </div>
    </div>
  );
}