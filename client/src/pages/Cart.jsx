import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import CartItem from '../components/CartItem';

export default function Cart() {
  const { cart, removeFromCart, getCartTotal, getCartCount } = useCart();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-50">
        <div className="text-center bg-white p-12 rounded-2xl shadow-xl max-w-md">
          <div className="text-8xl mb-6">🔒</div>
          <h2 className="text-3xl font-bold text-amber-900 mb-4">Vui lòng đăng nhập</h2>
          <p className="text-gray-600 mb-6">
            Bạn cần đăng nhập để xem giỏ hàng và đặt hàng
          </p>
          <Link 
            to="/login" 
            className="inline-block bg-amber-900 text-white px-8 py-3 rounded-full hover:bg-amber-800 transition font-semibold"
          >
            Đăng nhập ngay
          </Link>
        </div>
      </div>
    );
  }

  const items = cart?.items || [];
  const total = getCartTotal();
  const count = getCartCount();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-50">
        <div className="text-center bg-white p-12 rounded-2xl shadow-xl max-w-md">
          <div className="text-8xl mb-6">🛒</div>
          <h2 className="text-3xl font-bold text-amber-900 mb-4">Giỏ hàng trống</h2>
          <p className="text-gray-600 mb-6">
            Bạn chưa có sản phẩm nào trong giỏ hàng
          </p>
          <Link 
            to="/shop" 
            className="inline-block bg-amber-900 text-white px-8 py-3 rounded-full hover:bg-amber-800 transition font-semibold"
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-amber-900 mb-8">
          Giỏ Hàng Của Bạn
          <span className="text-lg font-normal text-gray-600 ml-4">
            ({count} sản phẩm)
          </span>
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <CartItem
                key={item.productId?._id || item._id}
                item={item}
                onRemove={removeFromCart}
              />
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-lg sticky top-4">
              <h2 className="text-2xl font-bold text-amber-900 mb-6">Tổng Đơn Hàng</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Tạm tính:</span>
                  <span className="font-semibold">{total.toLocaleString('vi-VN')}đ</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Phí vận chuyển:</span>
                  <span className="font-semibold text-green-600">Miễn phí</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-xl font-bold text-amber-900">
                    <span>Tổng cộng:</span>
                    <span className="text-orange-600">{total.toLocaleString('vi-VN')}đ</span>
                  </div>
                </div>
              </div>

              <Link
                to="/checkout"
                className="block w-full bg-amber-900 text-white text-center py-4 rounded-lg hover:bg-amber-800 transition font-bold text-lg mb-3"
              >
                Thanh Toán
              </Link>

              <Link
                to="/shop"
                className="block w-full bg-amber-100 text-amber-900 text-center py-3 rounded-lg hover:bg-amber-200 transition font-semibold"
              >
                Tiếp tục mua sắm
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

