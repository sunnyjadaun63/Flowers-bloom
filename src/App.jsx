import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
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
import EventCategoryPage from './pages/EventCategoryPage';
import EventsHubPage from './pages/EventsHubPage';
import ArtificialFlowersPage from './pages/ArtificialFlowersPage';
import NaturalFlowersPage from './pages/NaturalFlowersPage';
import BalloonSetupPage from './pages/BalloonSetupPage';
import ReviewsPage from './pages/ReviewsPage';

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

      {/* Main Pages Container */}
      <main className="flex-grow w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><About /></div>} />
          <Route path="/shop/:category" element={<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><CatalogPage /></div>} />
          <Route path="/bouquets" element={<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><CatalogPage categoryProp="bouquets" /></div>} />
          <Route path="/roses" element={<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><CatalogPage categoryProp="roses" /></div>} />
          <Route path="/occasion/:type" element={<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><OccasionCatalogPage /></div>} />
          <Route path="/month/:month" element={<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><CatalogPage /></div>} />
          
          {/* Natural & Fresh Flowers */}
          <Route path="/natural-flowers" element={<NaturalFlowersPage />} />
          <Route path="/shop/natural-flowers" element={<NaturalFlowersPage />} />
          
          {/* Artificial & Silk Flowers */}
          <Route path="/artificial-flowers" element={<ArtificialFlowersPage />} />
          <Route path="/shop/artificial-flowers" element={<ArtificialFlowersPage />} />
          <Route path="/cosmetic-flowers" element={<ArtificialFlowersPage />} />
          <Route path="/shop/cosmetic-flowers" element={<ArtificialFlowersPage />} />
          
          {/* Balloon Setup & Installations */}
          <Route path="/balloon-setup" element={<BalloonSetupPage />} />
          <Route path="/balloon-setups" element={<BalloonSetupPage />} />
          <Route path="/shop/balloon-setup" element={<BalloonSetupPage />} />
          <Route path="/shop/balloon-setups" element={<BalloonSetupPage />} />
          
          {/* Corporate Gifts */}
          <Route path="/corporate" element={<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><CorporatePage /></div>} />
          <Route path="/corporate-gifts" element={<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><CorporatePage /></div>} />
          
          {/* Event Planning Routes */}
          <Route path="/events" element={<EventsHubPage />} />
          <Route path="/events/:category" element={<EventCategoryPage />} />
          
          <Route path="/contact" element={<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><ContactPage /></div>} />
          
          {/* Client Reviews & Stories */}
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/review" element={<ReviewsPage />} />
          
          <Route path="/product/:id" element={<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><ProductDetailPage /></div>} />
          
          {/* Fallback route */}
          <Route path="*" element={<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><NotFound /></div>} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

      {/* Overlay & Drawer Elements */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      {/* <CartDrawer /> */}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Router>
          <MainApp />
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}
