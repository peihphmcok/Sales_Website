import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-blue-600">
                    Trạm Pha Chế
                </Link>

                {/* Navigation */}
                <nav className="flex items-center gap-6">
                    <Link to="/" className="hover:text-blue-500 transition">Home</Link>
                    <Link to="/shop" className="hover:text-blue-500 transition">Product</Link>
                    <Link to="/cart" className="hover:text-blue-500 transition">Cart</Link>
                </nav>

                {/*Login Button */}
                <div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                        Login
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;