import React, { useEffect, useState } from 'react';
import { productAPI } from '../services/api.js';
import ProductCard from '../components/ProductCard.jsx';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const data = await productAPI.getAll();
        setProducts(data || []);
      } catch (error) {
        console.error('Failed to load products', error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const categories = ['all', 'espresso', 'cappuccino', 'latte', 'cold brew'];
  
  const filteredProducts = products.filter(product => {
    const matchesFilter = filter === 'all' || product.category?.toLowerCase() === filter;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-50">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">☕</div>
          <p className="text-amber-900 text-xl font-semibold">Đang tải sản phẩm...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="shop-page bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-100 to-orange-100 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-amber-900 mb-4">
            Sản Phẩm Của Chúng Tôi
          </h1>
          <p className="text-lg text-amber-800 mb-8">
            Khám phá bộ sưu tập cà phê chất lượng cao từ Trạm Pha Chế
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 rounded-full border-2 border-amber-300 focus:border-amber-600 focus:outline-none text-lg"
              />
              <span className="absolute right-6 top-1/2 transform -translate-y-1/2 text-2xl">
                🔍
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 px-4 bg-amber-50 border-b border-amber-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  filter === category
                    ? 'bg-amber-900 text-white shadow-lg'
                    : 'bg-white text-amber-900 hover:bg-amber-100'
                }`}
              >
                {category === 'all' ? 'Tất cả' : category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {filteredProducts.length > 0 ? (
            <>
              <p className="text-gray-600 mb-6">
                Hiển thị {filteredProducts.length} sản phẩm
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <div className="text-8xl mb-4">🔍</div>
              <p className="text-2xl text-gray-600 mb-2">Không tìm thấy sản phẩm</p>
              <p className="text-gray-500">Thử tìm kiếm với từ khóa khác hoặc thay đổi bộ lọc</p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-br from-amber-900 to-orange-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Không Tìm Thấy Sản Phẩm Bạn Cần?</h2>
          <p className="text-lg mb-8 text-amber-100">
            Liên hệ với chúng tôi để được tư vấn và gợi ý sản phẩm phù hợp nhất
          </p>
          <button className="bg-white text-amber-900 px-8 py-3 rounded-full hover:bg-amber-50 transition font-bold text-lg">
            Liên hệ ngay
          </button>
        </div>
      </section>
    </div>
  );
}
