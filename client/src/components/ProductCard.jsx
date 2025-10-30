import React from 'react';
import { formatCurrency } from '../utils/formatCurrency.js';

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      {product.image && <img src={product.image} alt={product.name} />}
      <h3>{product.name}</h3>
      <p>{formatCurrency(product.price)}</p>
    </div>
  );
}
