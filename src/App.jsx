import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import SearchModal from './components/SearchModal';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import CatalogPage from './pages/CatalogPage';
import OccasionCatalogPage from './pages/OccasionCatalogPage';
import CorporatePage from './pages/CorporatePage';
import ContactPage from './pages/ContactPage';
import ProductDetailPage from './pages/ProductDetailPage';
import NotFound from './pages/NotFound';

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function MainApp() {
  const [searchOpen, setSearchOpen] = useState(false);

  // Sync ESC key to close search modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-canvas font-sans text-charcoal antialiased selection:bg-botanical selection:text-white">
      {/* Scroll Manager */}
      <ScrollToTop />

      {/* Header and announcements */}
      <Navbar onSearchTrigger={() => setSearchOpen(true)} />

      {/* Main Pages Container: Full width for full-bleed hero, wrapped containers for inner pages */}
      <main className="flex-grow w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><About /></div>} />
          <Route path="/shop/:category" element={<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><CatalogPage /></div>} />
          <Route path="/occasion/:type" element={<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><OccasionCatalogPage /></div>} />
          <Route path="/month/:month" element={<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><CatalogPage /></div>} />
          <Route path="/corporate" element={<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><CorporatePage /></div>} />
          <Route path="/corporate-gifts" element={<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><CorporatePage /></div>} />
          <Route path="/contact" element={<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><ContactPage /></div>} />
          <Route path="/product/:id" element={<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><ProductDetailPage /></div>} />
          {/* Fallback route */}
          <Route path="*" element={<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><NotFound /></div>} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

      {/* Overlay & Drawer Elements */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <CartDrawer />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <Router>
        <MainApp />
      </Router>
    </CartProvider>
  );
}
