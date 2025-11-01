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
      if (data && data.items) {
        setCart(data);
      }
      return { success: true, message: 'Đã thêm vào giỏ hàng' };
    } catch (error) {
      console.error('Add to cart error:', error);
      return { success: false, message: 'Không thể thêm vào giỏ hàng' };
    }
  };

  const updateCartItem = async (productId, quantity) => {
    try {
      const data = await cartAPI.updateCartItem(productId, quantity);
      if (data && data.items) {
        setCart(data);
      }
      return { success: true, message: 'Đã cập nhật giỏ hàng' };
    } catch (error) {
      console.error('Update cart error:', error);
      return { success: false, message: 'Không thể cập nhật giỏ hàng' };
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const data = await cartAPI.removeFromCart(productId);
      if (data && data.items) {
        setCart(data);
      }
      return { success: true, message: 'Đã xóa khỏi giỏ hàng' };
    } catch (error) {
      console.error('Remove from cart error:', error);
      return { success: false, message: 'Không thể xóa khỏi giỏ hàng' };
    }
  };

  const clearCart = () => {
    setCart({ items: [] });
  };

  const getCartTotal = () => {
    if (!cart || !cart.items || !Array.isArray(cart.items)) {
      return 0;
    }
    
    return cart.items.reduce((total, item) => {
      // Check if productId is an object (populated) or just an ID string
      const price = typeof item.productId === 'object' && item.productId !== null 
        ? (item.productId.price || 0)
        : 0;
      const quantity = item.quantity || 0;
      return total + (price * quantity);
    }, 0);
  };

  const getCartCount = () => {
    if (!cart || !cart.items || !Array.isArray(cart.items)) {
      return 0;
    }
    return cart.items.reduce((count, item) => count + (item.quantity || 0), 0);
  };

  const value = {
    cart,
    loading,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    loadCart,
    getCartTotal,
    getCartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;

