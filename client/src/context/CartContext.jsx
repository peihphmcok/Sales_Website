import React, { createContext, useState, useContext, useEffect } from 'react';
import { cartAPI } from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      loadCart();
    } else {
      setCart({ items: [] });
    }
  }, [isAuthenticated]);

  const loadCart = async () => {
    try {
      setLoading(true);
      const data = await cartAPI.getCart();
      setCart(data || { items: [] });
    } catch (error) {
      console.error('Failed to load cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      const data = await cartAPI.addToCart(productId, quantity);
      setCart(data);
      return { success: true, message: 'Đã thêm vào giỏ hàng' };
    } catch (error) {
      return { success: false, message: 'Không thể thêm vào giỏ hàng' };
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const data = await cartAPI.removeFromCart(productId);
      setCart(data);
      return { success: true, message: 'Đã xóa khỏi giỏ hàng' };
    } catch (error) {
      return { success: false, message: 'Không thể xóa khỏi giỏ hàng' };
    }
  };

  const clearCart = () => {
    setCart({ items: [] });
  };

  const getCartTotal = () => {
    return cart.items.reduce((total, item) => {
      const price = item.productId?.price || 0;
      const quantity = item.quantity || 0;
      return total + price * quantity;
    }, 0);
  };

  const getCartCount = () => {
    return cart.items.reduce((count, item) => count + (item.quantity || 0), 0);
  };

  const value = {
    cart,
    loading,
    addToCart,
    removeFromCart,
    clearCart,
    loadCart,
    getCartTotal,
    getCartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;

