import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import MiniCart from "./MiniCart";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);
    const { user, isAuthenticated, logout } = useAuth();
    const { getCartCount } = useCart();

    const handleLogout = () => {
        logout();
        setIsUserMenuOpen(false);
    };

    const cartCount = getCartCount();

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
                    {/* Cart with Mini Cart Dropdown */}
                    <div className="hidden md:block relative">
                        <button 
                            onClick={() => setIsMiniCartOpen(!isMiniCartOpen)}
                            className="flex items-center gap-2 text-amber-900 hover:text-amber-600 transition relative"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span className="font-medium">Giỏ hàng</span>
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                        <MiniCart isOpen={isMiniCartOpen} onClose={() => setIsMiniCartOpen(false)} />
                    </div>

                    {/* User Menu */}
                    {isAuthenticated ? (
                        <div className="hidden md:block relative">
                            <button
                                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                className="flex items-center gap-2 text-amber-900 hover:text-amber-600 transition"
                            >
                                <div className="w-9 h-9 bg-amber-900 rounded-full flex items-center justify-center text-white font-bold">
                                    {user?.name?.charAt(0).toUpperCase()}
                                </div>
                                <span className="font-medium">{user?.name}</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {/* Dropdown */}
                            {isUserMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50">
                                    <Link
                                        to="/profile"
                                        className="block px-4 py-2 text-gray-700 hover:bg-amber-50 transition"
                                        onClick={() => setIsUserMenuOpen(false)}
                                    >
                                        👤 Tài khoản
                                    </Link>
                                    <Link
                                        to="/orders"
                                        className="block px-4 py-2 text-gray-700 hover:bg-amber-50 transition"
                                        onClick={() => setIsUserMenuOpen(false)}
                                    >
                                        📦 Đơn hàng
                                    </Link>
                                    <hr className="my-2" />
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition"
                                    >
                                        🚪 Đăng xuất
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="hidden md:flex items-center gap-3">
                            <Link
                                to="/login"
                                className="text-amber-900 hover:text-amber-700 font-semibold transition"
                            >
                                Đăng nhập
                            </Link>
                            <Link
                                to="/register"
                                className="bg-amber-900 text-white px-5 py-2 rounded-full hover:bg-amber-800 transition font-semibold"
                            >
                                Đăng ký
                            </Link>
                        </div>
                    )}
                    
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
                        <Link to="/cart" className="py-2 text-amber-900 hover:text-amber-600 transition flex items-center gap-2">
                            Giỏ hàng {cartCount > 0 && <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded-full">{cartCount}</span>}
                        </Link>
                        
                        {isAuthenticated ? (
                            <>
                                <hr className="my-2 border-amber-300" />
                                <div className="py-2 text-amber-900 font-semibold">
                                    👤 {user?.name}
                                </div>
                                <Link to="/profile" className="py-2 text-amber-900 hover:text-amber-600 transition pl-4">
                                    Tài khoản
                                </Link>
                                <Link to="/orders" className="py-2 text-amber-900 hover:text-amber-600 transition pl-4">
                                    Đơn hàng
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="py-2 text-red-600 hover:text-red-700 transition text-left"
                                >
                                    🚪 Đăng xuất
                                </button>
                            </>
                        ) : (
                            <>
                                <hr className="my-2 border-amber-300" />
                                <Link to="/login" className="py-2 text-amber-900 hover:text-amber-600 transition font-semibold">
                                    Đăng nhập
                                </Link>
                                <Link to="/register" className="py-2 text-amber-900 hover:text-amber-600 transition font-semibold">
                                    Đăng ký
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;