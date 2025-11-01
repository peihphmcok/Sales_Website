import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import AppRouter from "./router/AppRouter.jsx";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ToastProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <AppRouter />
            </main>
            <Footer />
          </div>
        </ToastProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
