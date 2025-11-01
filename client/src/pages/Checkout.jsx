import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { orderAPI } from '../services/api';

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    note: '',
  });

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const items = cart?.items || [];
  const total = getCartTotal();

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData = {
        items: items.map(item => ({
          productId: item.productId._id,
          quantity: item.quantity
        })),
        totalPrice: total,
        shippingAddress: `${formData.name}, ${formData.phone}, ${formData.address}`,
      };

      const result = await orderAPI.createOrder(orderData);
      
      if (result && !result.message?.includes('lỗi')) {
        clearCart();
        alert('Đặt hàng thành công! ✅');
        navigate('/orders');
      } else {
        alert('Đặt hàng thất bại: ' + (result.message || 'Lỗi không xác định'));
      }
    } catch (error) {
      alert('Lỗi kết nối server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-amber-900 mb-8">Thanh Toán</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-amber-900 mb-6">Thông Tin Giao Hàng</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Họ và tên *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Số điện thoại *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Địa chỉ giao hàng *
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows="3"
                  className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Ghi chú
                </label>
                <textarea
                  name="note"
                  value={formData.note}
                  onChange={handleChange}
                  rows="2"
                  className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Ghi chú thêm về đơn hàng..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-900 text-white py-4 rounded-lg hover:bg-amber-800 transition font-bold text-lg disabled:opacity-50"
              >
                {loading ? 'Đang xử lý...' : 'Đặt Hàng'}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
              <h2 className="text-2xl font-bold text-amber-900 mb-6">Đơn Hàng Của Bạn</h2>
              
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.productId._id} className="flex justify-between text-gray-700">
                    <div className="flex-1">
                      <span className="font-semibold">{item.productId.name}</span>
                      <span className="text-sm text-gray-500 ml-2">x{item.quantity}</span>
                    </div>
                    <span className="font-semibold">
                      {((item.productId.price || 0) * item.quantity).toLocaleString('vi-VN')}đ
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-3">
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
            </div>

            <div className="bg-amber-100 p-6 rounded-xl">
              <h3 className="font-bold text-amber-900 mb-3">💳 Phương Thức Thanh Toán</h3>
              <p className="text-sm text-gray-700">
                Thanh toán khi nhận hàng (COD)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

