import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  MapPin, 
  Calendar, 
  Menu, 
  X, 
  ChevronDown 
} from 'lucide-react';

const occasionsList = [
  "Birthday", "Anniversary", "Romance and Valentine’s Day", "Mother’s Day", 
  "Congratulations", "Thank You", "Get Well", "Sympathy and Funeral", 
  "New Baby", "Wedding", "Apology", "Housewarming", "Just Because"
];

const monthsList = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];

const shopCategories = [
  { name: "All Flowers", path: "all" },
  { name: "Best Sellers", path: "best-sellers" },
  { name: "New Arrivals", path: "new-arrivals" },
  { name: "Bouquets", path: "bouquets" },
  { name: "Roses", path: "roses" },
  { name: "Seasonal Flowers", path: "seasonal" },
  { name: "Plants & Gift Baskets", path: "plants-baskets" }
];

export default function Navbar({ onSearchTrigger }) {
  const { 
    cart, 
    wishlist, 
    zipCode, 
    isZipVerified, 
    deliveryDate, 
    verifyZipCode, 
    setDeliveryDate,
    setCartDrawerOpen 
  } = useCart();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [zipModalOpen, setZipModalOpen] = useState(false);
  const [tempZip, setTempZip] = useState(zipCode);
  const [tempDate, setTempDate] = useState(deliveryDate);
  const [zipError, setZipError] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();

  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  const handleZipSubmit = (e) => {
    e.preventDefault();
    const verified = verifyZipCode(tempZip);
    if (verified) {
      if (tempDate) setDeliveryDate(tempDate);
      setZipModalOpen(false);
      setZipError('');
    } else {
      setZipError('Please enter a valid 5-digit ZIP code.');
    }
  };

  const handleZipPillClick = () => {
    setTempZip(zipCode);
    setTempDate(deliveryDate);
    setZipModalOpen(true);
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-[#1B3B2B] text-white text-xs py-2 px-6 text-center tracking-widest font-sans uppercase font-medium w-full">
        Same-Day Hand Delivery | 7-Day Freshness Guarantee | Complimentary Floral Note on Every Order
      </div>

      {/* Sticky Navigation Header (Full Width) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-line w-full">
        <div className="w-full px-6 sm:px-8 lg:px-12">
          
          {/* Top Row: Utilities and Centered Brand Logo */}
          <div className="relative flex items-center justify-between h-16 border-b border-stone-line/40 w-full">
            
            {/* Left: Mobile Menu Trigger & Zip Pill */}
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden p-2 text-charcoal hover:text-[#1B3B2B] focus:outline-none"
                aria-label="Open menu"
              >
                <Menu className="w-5.5 h-5.5" />
              </button>

              {/* Delivery Checker Pill */}
              <button
                onClick={handleZipPillClick}
                className="hidden md:flex items-center space-x-2 bg-stone-50 border border-stone-line rounded-full px-4 py-1.5 text-[11px] hover:border-black hover:bg-white transition-all duration-200 whitespace-nowrap"
              >
                <MapPin className="w-3.5 h-3.5 text-[#1B3B2B] flex-shrink-0" />
                <span className="font-sans font-medium text-charcoal whitespace-nowrap">
                  {isZipVerified ? `Deliver to ${zipCode}` : 'Check Delivery ZIP'}
                </span>
                {deliveryDate && (
                  <span className="border-l border-stone-line pl-2 text-warm-neutral flex items-center space-x-1 whitespace-nowrap">
                    <Calendar className="w-3 h-3 inline mr-0.5" />
                    {new Date(deliveryDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                )}
              </button>
            </div>

            {/* Middle: Brand Logo (Centered) */}
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center z-10">
              <Link to="/" className="flex items-center group">
                <span className="font-instrument text-2xl sm:text-3xl lg:text-4xl tracking-tight font-normal text-[#000000] group-hover:opacity-80 transition-opacity duration-200">
                  AURA BLOOMS<sup className="text-xs ml-0.5 font-sans">®</sup>
                </span>
              </Link>
            </div>

            {/* Right: Search, Wishlist, Cart & CTA */}
            <div className="flex items-center space-x-2 sm:space-x-4 z-20">
              <button 
                onClick={onSearchTrigger}
                className="p-2 text-charcoal hover:text-black transition-colors focus:outline-none"
                aria-label="Search Catalog"
              >
                <Search className="w-4.5 h-4.5" />
              </button>

              <Link 
                to="/shop/all?filter=wishlist"
                className="p-2 text-charcoal hover:text-black transition-colors focus:outline-none relative"
                aria-label="Wishlist"
              >
                <Heart className="w-4.5 h-4.5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-0.5 right-0.5 bg-[#C86D51] text-white font-sans text-[8px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              <button 
                onClick={() => setCartDrawerOpen(true)}
                className="p-2 text-charcoal hover:text-black transition-colors focus:outline-none relative"
                aria-label="Open Cart"
              >
                <ShoppingBag className="w-4.5 h-4.5" />
                {totalCartItems > 0 && (
                  <span className="absolute top-0.5 right-0.5 bg-[#000000] text-white font-sans text-[8px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">
                    {totalCartItems}
                  </span>
                )}
              </button>

              <Link
                to="/shop/all"
                className="hidden lg:inline-flex rounded-full px-6 py-2.5 text-xs bg-[#000000] text-white hover:scale-[1.03] transition-transform font-medium"
              >
                Order Stems
              </Link>
            </div>
          </div>

          {/* Bottom Row: Full-Width Spanning Navigation Options (Desktop) */}
          <div className="hidden md:flex items-center justify-between w-full h-12">
            <nav className="w-full flex items-center justify-between font-sans text-[11px] tracking-widest uppercase font-semibold text-charcoal">
              
              {/* Shop Flowers Dropdown */}
              <div className="relative group py-3">
                <button 
                  onClick={() => navigate('/shop/all')}
                  className="flex items-center space-x-1 hover:text-black transition-colors duration-200"
                >
                  <span>Shop Flowers</span>
                  <ChevronDown className="w-3.5 h-3.5 text-warm-neutral transition-transform duration-200 group-hover:rotate-180" />
                </button>
                <div className="absolute top-full left-0 bg-white border border-stone-line py-3 px-4 w-60 rounded-sm shadow-xl scale-95 opacity-0 pointer-events-none group-hover:scale-100 group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 ease-out z-50">
                  <div className="flex flex-col space-y-2">
                    {shopCategories.map((cat) => (
                      <Link 
                        key={cat.path} 
                        to={`/shop/${cat.path}`}
                        className="text-left text-xs tracking-wider normal-case py-1.5 hover:text-black border-b border-transparent hover:border-stone-line transition-all duration-150 text-warm-neutral hover:pl-1"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* By Occasion Mega-Menu */}
              <div className="relative group py-3">
                <button className="flex items-center space-x-1 hover:text-black transition-colors duration-200">
                  <span>By Occasion</span>
                  <ChevronDown className="w-3.5 h-3.5 text-warm-neutral transition-transform duration-200 group-hover:rotate-180" />
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 bg-white border border-stone-line p-6 w-[560px] rounded-sm shadow-xl scale-95 opacity-0 pointer-events-none group-hover:scale-100 group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 ease-out z-50">
                  <h4 className="font-instrument text-lg tracking-normal normal-case mb-4 pb-2 border-b border-stone-line text-black font-medium">Curated Floral Gifts by Occasion</h4>
                  <div className="grid grid-cols-3 gap-x-6 gap-y-3">
                    {occasionsList.map((occ) => (
                      <Link 
                        key={occ}
                        to={`/occasion/${occ.toLowerCase().replace(/ & /g, '-and-').replace(/ /g, '-')}`}
                        className="text-xs text-warm-neutral hover:text-black transition-colors duration-150 normal-case tracking-normal hover:translate-x-0.5 transform inline-block"
                      >
                        {occ}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* By Month Dropdown */}
              <div className="relative group py-3">
                <button className="flex items-center space-x-1 hover:text-black transition-colors duration-200">
                  <span>Birth Month</span>
                  <ChevronDown className="w-3.5 h-3.5 text-warm-neutral transition-transform duration-200 group-hover:rotate-180" />
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 bg-white border border-stone-line p-6 w-[480px] rounded-sm shadow-xl scale-95 opacity-0 pointer-events-none group-hover:scale-100 group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 ease-out z-50">
                  <h4 className="font-instrument text-lg tracking-normal normal-case mb-4 pb-2 border-b border-stone-line text-black font-medium">Official Birth Month Stems</h4>
                  <div className="grid grid-cols-3 gap-x-4 gap-y-2.5">
                    {monthsList.map((m) => (
                      <Link 
                        key={m}
                        to={`/month/${m.toLowerCase()}`}
                        className="text-xs text-warm-neutral hover:text-black transition-colors duration-150 normal-case tracking-normal hover:translate-x-0.5 transform"
                      >
                        {m}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Best Sellers Direct Link */}
              <Link 
                to="/shop/best-sellers" 
                className="hover:text-black transition-colors duration-200"
              >
                Best Sellers
              </Link>

              {/* Hand-Tied Bouquets Direct Link */}
              <Link 
                to="/shop/bouquets" 
                className="hover:text-black transition-colors duration-200"
              >
                Bouquets
              </Link>

              {/* Corporate Gifts */}
              <Link 
                to="/corporate" 
                className="hover:text-black transition-colors duration-200"
              >
                Corporate Gifts
              </Link>

              {/* About Atelier */}
              <Link 
                to="/about" 
                className="hover:text-black transition-colors duration-200"
              >
                About Us
              </Link>

              {/* Contact */}
              <Link 
                to="/contact" 
                className="hover:text-black transition-colors duration-200"
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div 
            className="fixed inset-0 bg-charcoal/40 backdrop-blur-xs transition-opacity" 
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white border-r border-stone-line shadow-2xl p-6 overflow-y-auto">
            <div className="flex items-center justify-between pb-6 border-b border-stone-line">
              <span className="font-instrument text-2xl tracking-tight text-black">
                AURA BLOOMS<sup className="text-xs ml-0.5">®</sup>
              </span>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 text-warm-neutral hover:text-charcoal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="py-6 space-y-4">
              <Link 
                to="/" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-semibold uppercase tracking-wider text-charcoal"
              >
                Home
              </Link>
              <Link 
                to="/shop/all" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-semibold uppercase tracking-wider text-charcoal"
              >
                Shop All Flowers
              </Link>
              <Link 
                to="/shop/bouquets" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-semibold uppercase tracking-wider text-charcoal"
              >
                Hand-Tied Bouquets
              </Link>
              <Link 
                to="/corporate" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-semibold uppercase tracking-wider text-charcoal"
              >
                Corporate Gifts
              </Link>
              <Link 
                to="/about" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-semibold uppercase tracking-wider text-charcoal"
              >
                Our Story & Philosophy
              </Link>
              <Link 
                to="/contact" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-semibold uppercase tracking-wider text-charcoal"
              >
                Contact Atelier
              </Link>
            </div>

            <div className="mt-auto pt-6 border-t border-stone-line">
              <Link
                to="/shop/all"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center rounded-full py-3 text-sm bg-black text-white block font-medium"
              >
                Explore Catalog
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ZIP Code Modal */}
      {zipModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/40 backdrop-blur-xs">
          <div className="bg-white border border-stone-line max-w-sm w-full p-6 rounded-sm shadow-xl relative">
            <button 
              onClick={() => setZipModalOpen(false)}
              className="absolute top-4 right-4 text-warm-neutral hover:text-charcoal"
            >
              <X className="w-4.5 h-4.5" />
            </button>
            <h3 className="font-instrument text-2xl font-bold text-charcoal mb-1">Check Delivery Availability</h3>
            <p className="text-xs text-[#6F6F6F] mb-4">
              Enter your recipient ZIP code to verify same-day hand delivery.
            </p>
            <form onSubmit={handleZipSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal mb-1">ZIP Code</label>
                <input
                  type="text"
                  maxLength={5}
                  value={tempZip}
                  onChange={(e) => setTempZip(e.target.value)}
                  placeholder="e.g. 90210 or 10001"
                  className="w-full border border-stone-line p-2.5 text-sm rounded-xs outline-none focus:border-black"
                  required
                />
                {zipError && <p className="text-[11px] text-red-600 mt-1">{zipError}</p>}
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white py-2.5 text-xs uppercase tracking-widest font-semibold rounded-full hover:bg-neutral-800 transition-colors"
              >
                Verify Address
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
