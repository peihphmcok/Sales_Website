import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-br from-amber-900 to-orange-900 text-amber-50">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    {/* Column 1 - About */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="text-3xl">☕</div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">Trạm Pha Chế</h2>
                                <p className="text-xs text-amber-200">Premium Coffee Shop</p>
                            </div>
                        </div>
                        <p className="text-sm leading-relaxed mb-4 text-amber-100">
                            Trạm Pha Chế - Nơi bạn có thể tìm thấy những hạt cà phê chất lượng cao, 
                            được rang xay và pha chế bởi đội ngũ barista chuyên nghiệp. Chúng tôi 
                            cam kết mang đến trải nghiệm cà phê tuyệt vời nhất.
                        </p>
                        <div className="flex gap-4">
                            <a 
                                href="https://facebook.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-amber-800 hover:bg-amber-700 rounded-full flex items-center justify-center transition"
                            >
                                <span className="text-xl">📘</span>
                            </a>
                            <a 
                                href="https://instagram.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-amber-800 hover:bg-amber-700 rounded-full flex items-center justify-center transition"
                            >
                                <span className="text-xl">📷</span>
                            </a>
                            <a 
                                href="https://twitter.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-amber-800 hover:bg-amber-700 rounded-full flex items-center justify-center transition"
                            >
                                <span className="text-xl">🐦</span>
                            </a>
                        </div>
                    </div>

                    {/* Column 2 - Quick Links */}
                    <div>
                        <h3 className="text-white font-bold mb-4 text-lg">Liên Kết Nhanh</h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link to="/" className="hover:text-white transition hover:translate-x-1 inline-block">
                                    → Trang chủ
                                </Link>
                            </li>
                            <li>
                                <Link to="/shop" className="hover:text-white transition hover:translate-x-1 inline-block">
                                    → Sản phẩm
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="hover:text-white transition hover:translate-x-1 inline-block">
                                    → Về chúng tôi
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="hover:text-white transition hover:translate-x-1 inline-block">
                                    → Liên hệ
                                </Link>
                            </li>
                            <li>
                                <Link to="/blog" className="hover:text-white transition hover:translate-x-1 inline-block">
                                    → Blog
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3 - Contact */}
                    <div>
                        <h3 className="text-white font-bold mb-4 text-lg">Liên Hệ</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-2">
                                <span className="text-lg">📍</span>
                                <span>123 Đường Nguyễn Huệ, Quận 1, TP.HCM</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-lg">📧</span>
                                <a href="mailto:tram.phache@contact.vn" className="hover:text-white transition">
                                    tram.phache@contact.vn
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-lg">📞</span>
                                <a href="tel:0968253201" className="hover:text-white transition">
                                    0968 253 201
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-lg">🕐</span>
                                <span>Mở cửa: 7:00 - 22:00</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-amber-800 pt-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
                        <p className="text-amber-200">
                            © {new Date().getFullYear()} Trạm Pha Chế. All rights reserved.
                        </p>
                        <div className="flex gap-6">
                            <Link to="/privacy" className="hover:text-white transition">
                                Chính sách bảo mật
                            </Link>
                            <Link to="/terms" className="hover:text-white transition">
                                Điều khoản sử dụng
                            </Link>
                            <Link to="/shipping" className="hover:text-white transition">
                                Chính sách giao hàng
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;