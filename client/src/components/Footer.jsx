const Footer =() => {
    return (
        <footer className="bg-gray-900 text-gray-300 mt-10">
            <div className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-8">
                {/* Column 1 */}
                <div>
                    <h2 className="text-lg font-semibold text-white mb-3">Trạm Pha Chế</h2>
                    <p className="text-sm leading-relaxed">
                        Tramphache - Where you can create your own recipe — and let us help you name, describe, and suggest the perfect flavor.
                    </p>
                </div>

                {/* Column 2 */}

                <div>
                    <h3 className="text-white font-semibold mb-3">Fast Link</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="/" className="hover:text-white transition">Home</a></li>
                        <li><a href="/shop" className="hover:text-white transition">Product</a></li>
                        <li><a href="/about" className="hover:text-white transition">About</a></li>
                    </ul>
                </div>

                {/* Column 3 */}

                <div>
                    <h3 className="text-white font-semibold mb-3">Contact</h3>
                    <p>Email: tram.phache@contact.vn</p>
                    <p>Hotline: 0968 253 201</p>
                    <div className="flex gap-3 mt-2">
                        <a href="#" className="hover:text-white">Facebook</a>
                        <a href="#" className="hover:text-white">Instagram</a>
                    </div>
                </div>
            </div>
            <div className="bg-gray-800 text-center text-sm py-3">
                © {new Date().getFullYear()} Trạm Pha Chế — All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;