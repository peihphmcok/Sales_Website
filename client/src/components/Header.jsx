import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-amber-50 shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <div className="text-3xl">☕</div>
                    <div>
                        <h1 className="text-2xl font-bold text-amber-900">Trạm Pha Chế</h1>
                        <p className="text-xs text-amber-700">Premium Coffee Shop</p>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link to="/" className="text-amber-900 hover:text-amber-600 transition font-medium">
                        Trang chủ
                    </Link>
                    <Link to="/shop" className="text-amber-900 hover:text-amber-600 transition font-medium">
                        Sản phẩm
                    </Link>
                    <Link to="/about" className="text-amber-900 hover:text-amber-600 transition font-medium">
                        Về chúng tôi
                    </Link>
                    <Link to="/contact" className="text-amber-900 hover:text-amber-600 transition font-medium">
                        Liên hệ
                    </Link>
                </nav>

                {/* Right Section */}
                <div className="flex items-center gap-4">
                    <Link to="/cart" className="hidden md:flex items-center gap-2 text-amber-900 hover:text-amber-600 transition">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span className="font-medium">Giỏ hàng</span>
                    </Link>
                    
                    {/* Mobile Menu Button */}
                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden text-amber-900"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-amber-100 border-t border-amber-200">
                    <nav className="flex flex-col px-4 py-3">
                        <Link to="/" className="py-2 text-amber-900 hover:text-amber-600 transition">
                            Trang chủ
                        </Link>
                        <Link to="/shop" className="py-2 text-amber-900 hover:text-amber-600 transition">
                            Sản phẩm
                        </Link>
                        <Link to="/about" className="py-2 text-amber-900 hover:text-amber-600 transition">
                            Về chúng tôi
                        </Link>
                        <Link to="/contact" className="py-2 text-amber-900 hover:text-amber-600 transition">
                            Liên hệ
                        </Link>
                        <Link to="/cart" className="py-2 text-amber-900 hover:text-amber-600 transition">
                            Giỏ hàng
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;