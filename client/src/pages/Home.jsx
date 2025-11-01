import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { productAPI } from '../services/api';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeaturedProducts() {
      try {
        const products = await productAPI.getAll();
        setFeaturedProducts((products || []).slice(0, 4));
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }
    loadFeaturedProducts();
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section bg-gradient-to-br from-amber-50 to-orange-100 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold text-amber-900 leading-tight">
                Khám Phá Hương Vị <span className="text-orange-600">Cà Phê</span> Đích Thực
              </h1>
              <p className="text-lg text-amber-800 leading-relaxed">
                Mỗi tách cà phê tại Trạm Pha Chế là một hành trình khám phá hương vị độc đáo, 
                được pha chế từ những hạt cà phê thượng hạng.
              </p>
              <div className="flex gap-4">
                <Link 
                  to="/shop" 
                  className="bg-amber-900 text-white px-8 py-3 rounded-full hover:bg-amber-800 transition font-semibold shadow-lg hover:shadow-xl"
                >
                  Khám phá ngay
                </Link>
                <Link 
                  to="/about" 
                  className="bg-white text-amber-900 px-8 py-3 rounded-full hover:bg-amber-50 transition font-semibold border-2 border-amber-900"
                >
                  Về chúng tôi
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-amber-200 to-orange-300 rounded-3xl shadow-2xl flex items-center justify-center overflow-hidden">
                <div className="text-9xl">☕</div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-orange-400 rounded-full opacity-50 blur-xl"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-amber-400 rounded-full opacity-50 blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-amber-900 mb-4">Tại Sao Chọn Chúng Tôi?</h2>
            <p className="text-lg text-gray-600">Những lý do khiến khách hàng yêu thích Trạm Pha Chế</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition">
              <div className="text-6xl mb-4">🌱</div>
              <h3 className="text-xl font-bold text-amber-900 mb-3">100% Organic</h3>
              <p className="text-gray-600">
                Cà phê được trồng và chế biến theo phương pháp hữu cơ, 
                không sử dụng hóa chất độc hại.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition">
              <div className="text-6xl mb-4">👨‍🍳</div>
              <h3 className="text-xl font-bold text-amber-900 mb-3">Pha Chế Chuyên Nghiệp</h3>
              <p className="text-gray-600">
                Đội ngũ barista giàu kinh nghiệm, tận tâm trong từng tách cà phê.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition">
              <div className="text-6xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-amber-900 mb-3">Giao Hàng Nhanh</h3>
              <p className="text-gray-600">
                Đơn hàng được xử lý và giao nhanh chóng, đảm bảo độ tươi ngon.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 px-4 bg-amber-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-amber-900 mb-4">Sản Phẩm Nổi Bật</h2>
            <p className="text-lg text-gray-600">Những dòng cà phê được yêu thích nhất</p>
          </div>
          
          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">Đang tải sản phẩm...</p>
            </div>
          )}
          
          <div className="text-center">
            <Link 
              to="/shop" 
              className="inline-block bg-amber-900 text-white px-8 py-3 rounded-full hover:bg-amber-800 transition font-semibold"
            >
              Xem tất cả sản phẩm
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="w-full h-96 bg-gradient-to-br from-orange-200 to-amber-300 rounded-3xl shadow-xl flex items-center justify-center">
                <div className="text-9xl">🏪</div>
              </div>
            </div>
            <div className="order-1 md:order-2 space-y-4">
              <h2 className="text-4xl font-bold text-amber-900">Câu Chuyện Của Chúng Tôi</h2>
              <p className="text-gray-700 leading-relaxed">
                Trạm Pha Chế ra đời từ niềm đam mê với cà phê và mong muốn mang đến 
                những trải nghiệm tuyệt vời nhất cho khách hàng. Chúng tôi tin rằng 
                mỗi tách cà phê không chỉ là thức uống, mà còn là câu chuyện, là cảm xúc.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Với hơn 10 năm kinh nghiệm trong ngành, chúng tôi tự hào là một trong 
                những địa chỉ uy tín cung cấp cà phê chất lượng cao tại Việt Nam.
              </p>
              <Link 
                to="/about" 
                className="inline-block bg-amber-900 text-white px-6 py-3 rounded-lg hover:bg-amber-800 transition font-semibold"
              >
                Tìm hiểu thêm
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-amber-900 mb-4">Khách Hàng Nói Gì?</h2>
            <p className="text-lg text-gray-600">Những đánh giá từ khách hàng của chúng tôi</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center gap-1 mb-4">
                <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
              </div>
              <p className="text-gray-700 mb-4">
                "Cà phê ở đây thật sự tuyệt vời! Hương vị đậm đà và rất tươi. 
                Tôi sẽ quay lại thường xuyên."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-amber-200 rounded-full flex items-center justify-center">
                  <span className="text-2xl">👤</span>
                </div>
                <div>
                  <p className="font-semibold text-amber-900">Nguyễn Văn A</p>
                  <p className="text-sm text-gray-500">Khách hàng thường xuyên</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center gap-1 mb-4">
                <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
              </div>
              <p className="text-gray-700 mb-4">
                "Dịch vụ tuyệt vời, nhân viên nhiệt tình. Không gian quán rất ấm cúng 
                và thoải mái."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-amber-200 rounded-full flex items-center justify-center">
                  <span className="text-2xl">👤</span>
                </div>
                <div>
                  <p className="font-semibold text-amber-900">Trần Thị B</p>
                  <p className="text-sm text-gray-500">Khách hàng mới</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center gap-1 mb-4">
                <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
              </div>
              <p className="text-gray-700 mb-4">
                "Giá cả hợp lý, chất lượng tuyệt vời. Đây là quán cà phê yêu thích 
                của tôi rồi!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-amber-200 rounded-full flex items-center justify-center">
                  <span className="text-2xl">👤</span>
                </div>
                <div>
                  <p className="font-semibold text-amber-900">Lê Văn C</p>
                  <p className="text-sm text-gray-500">Khách hàng VIP</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 bg-amber-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Đăng Ký Nhận Tin</h2>
          <p className="text-lg mb-8 text-amber-100">
            Nhận thông tin về sản phẩm mới và các ưu đãi đặc biệt
          </p>
          <form className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
            <input 
              type="email" 
              placeholder="Nhập email của bạn..." 
              className="flex-1 px-6 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <button 
              type="submit" 
              className="bg-orange-500 hover:bg-orange-600 px-8 py-3 rounded-full font-semibold transition"
            >
              Đăng ký ngay
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
