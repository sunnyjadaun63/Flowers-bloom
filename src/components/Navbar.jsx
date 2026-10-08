import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ThemeSwitcher from './ThemeSwitcher';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  MapPin, 
  Calendar, 
  Menu, 
  X, 
  ChevronDown, 
  Sparkles 
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
  { name: "All Flowers & Setups", path: "all" },
  { name: "Balloon Setup", path: "balloon-setup", isDirect: true, badge: "Setups" },
  { name: "Natural Flowers", path: "natural-flowers", isDirect: true, badge: "Fresh Stems" },
  { name: "Best Sellers", path: "best-sellers" },
  { name: "New Arrivals", path: "new-arrivals" },
  { name: "Artificial Flowers", path: "artificial-flowers", isDirect: true, badge: "Silk & Faux" },
  { name: "Bouquets", path: "bouquets" },
  { name: "Roses", path: "roses" },
  { name: "Seasonal Flowers", path: "seasonal" },
  { name: "Plants & Gift Baskets", path: "plants-baskets" }
];

const eventMenuItems = [
  {
    name: "Weddings & Nuptials",
    path: "weddings",
    tagline: "Ceremonies, Receptions & Micro-Weddings",
    count: "9 Services"
  },
  {
    name: "Birthday & Family",
    path: "birthdays",
    tagline: "Milestones, Baby Showers & Reunions",
    count: "10 Services"
  },
  {
    name: "Corporate & Grand Openings",
    path: "corporate",
    tagline: "Ribbon-Cuttings, Galas & Product Launches",
    count: "10 Services"
  },
  {
    name: "Community & Festivals",
    path: "festivals",
    tagline: "Cultural Fairs, Charities & Markets",
    count: "8 Services"
  }
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
  const [mobileExpandedSection, setMobileExpandedSection] = useState(null);
  const [zipModalOpen, setZipModalOpen] = useState(false);
  const [tempZip, setTempZip] = useState(zipCode);
  const [tempDate, setTempDate] = useState(deliveryDate);
  const [zipError, setZipError] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMobileSection = (section) => {
    setMobileExpandedSection(curr => curr === section ? null : section);
  };

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
      <div className="bg-[#1B3B2B] text-white text-[9px] sm:text-xs py-2 px-3 sm:px-6 text-center tracking-widest font-sans uppercase font-medium w-full">
        Same-Day Hand Delivery | 7-Day Freshness Guarantee | Full-Service Bespoke Event Planning
      </div>

      {/* Sticky Navigation Header (Full Width) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-line w-full">
        <div className="w-full px-3 sm:px-8 lg:px-12">
          
          {/* Top Row: Utilities and Centered Brand Logo */}
          <div className="relative flex items-center justify-between h-14 sm:h-16 border-b border-stone-line/40 w-full">
            
            {/* Left: Brand Logo & Mobile Menu Trigger */}
            <div className="flex items-center space-x-1.5 sm:space-x-3 z-20 shrink-0">
              <button 
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden p-1.5 text-charcoal hover:text-[#1B3B2B] focus:outline-none"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
              </button>

              {/* Brand Logo Icon */}
              <Link 
                to="/" 
                className="flex items-center group py-1"
                aria-label="Handal Flowers & Events"
              >
                <img
                  src="/images/Logo.png"
                  alt="Handal Flowers & Events Logo"
                  className="h-8 sm:h-10 md:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-105 drop-shadow-xs"
                />
              </Link>
            </div>

            {/* Middle: Brand Logo (Centered with Peony Flowers Left & Right) - Desktop Only */}
            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center z-10 pointer-events-auto">
              <Link to="/" className="relative flex items-center justify-center group px-4 sm:px-8 py-1">
                {/* Left Peony Flower */}
                <img
                  src="/images/peony_left.png"
                  alt=""
                  aria-hidden="true"
                  className="absolute -left-6 sm:-left-9 md:-left-12 top-1/2 -translate-y-1/2 h-8 sm:h-11 md:h-13 w-auto object-contain pointer-events-none select-none drop-shadow-xs group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300"
                />

                {/* Brand Title Text */}
                <span className="relative z-10 font-instrument text-2xl sm:text-3xl lg:text-4xl tracking-tight font-normal text-[#ff0074] group-hover:opacity-90 transition-opacity duration-200 whitespace-nowrap px-1">
                  <b>Handal Flowers & Events</b> <sup className="text-xs ml-0.5 font-sans">®</sup>
                </span>

                {/* Right Peony Flower */}
                <img
                  src="/images/peony_right.png"
                  alt=""
                  aria-hidden="true"
                  className="absolute -right-6 sm:-right-9 md:-right-12 top-1/2 -translate-y-1/2 h-8 sm:h-11 md:h-13 w-auto object-contain pointer-events-none select-none drop-shadow-xs group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
                />
              </Link>
            </div>

            {/* Right: Theme Switcher, Search, Wishlist, Cart & CTA */}
            <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3 z-20 shrink-0">
              {/* Theme Switcher Component */}
              <ThemeSwitcher />

              <button 
                onClick={onSearchTrigger}
                className="p-1.5 sm:p-2 text-charcoal hover:text-black transition-colors focus:outline-none"
                aria-label="Search Catalog"
              >
                <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </button>

              <Link 
                to="/shop/all?filter=wishlist"
                className="p-1.5 sm:p-2 text-charcoal hover:text-black transition-colors focus:outline-none relative"
                aria-label="Wishlist"
              >
                <Heart className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-0.5 right-0.5 bg-[#C86D51] text-white font-sans text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              <Link
                to="/events"
                className="hidden lg:inline-flex rounded-full px-5 py-2 text-xs bg-[#1B3B2B] text-white hover:bg-black transition-colors font-medium items-center space-x-1 shadow-xs"
              >
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>Plan Event</span>
              </Link>
            </div>
          </div>

          {/* Bottom Row: Full-Width Spanning Navigation Options (Desktop) */}
          <div className="hidden md:flex items-center justify-between w-full h-12">
            <nav className="w-full flex items-center justify-between font-sans text-[11px] tracking-widest uppercase font-semibold text-charcoal">
              
              {/* Shop Flower and Setup Dropdown */}
              <div className="relative group py-3">
                <button 
                  onClick={() => navigate('/shop/all')}
                  className="flex items-center space-x-1 hover:text-black transition-colors duration-200"
                >
                  <span>Shop Flower and Setup</span>
                  <ChevronDown className="w-3.5 h-3.5 text-warm-neutral transition-transform duration-200 group-hover:rotate-180" />
                </button>
                <div className="absolute top-full left-0 bg-white border border-stone-line py-3 px-4 w-60 rounded-sm shadow-xl scale-95 opacity-0 pointer-events-none group-hover:scale-100 group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 ease-out z-50">
                  <div className="flex flex-col space-y-2">
                    {shopCategories.map((cat) => (
                      <Link 
                        key={cat.path} 
                        to={cat.isDirect ? `/${cat.path}` : `/shop/${cat.path}`}
                        className={`text-left text-xs tracking-wider normal-case py-1.5 hover:text-black border-b border-transparent hover:border-stone-line transition-all duration-150 flex items-center justify-between ${
                          cat.badge ? 'text-black font-semibold hover:pl-1' : 'text-warm-neutral hover:pl-1'
                        }`}
                      >
                        <span>{cat.name}</span>
                        {cat.badge && (
                          <span className="text-[9px] uppercase font-bold bg-amber-100 text-amber-900 border border-amber-200 px-2 py-0.5 rounded-full">
                            {cat.badge}
                          </span>
                        )}
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

              {/* NEW: Event Planning Dropdown */}
              <div className="relative group py-3">
                <button 
                  onClick={() => navigate('/events')}
                  className="flex items-center space-x-1 text-black font-bold hover:text-[#1B3B2B] transition-colors duration-200"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Event Planning</span>
                  <ChevronDown className="w-3.5 h-3.5 text-warm-neutral transition-transform duration-200 group-hover:rotate-180" />
                </button>
                
                <div className="absolute top-full left-1/2 -translate-x-1/2 bg-white border border-stone-line p-6 w-[620px] rounded-sm shadow-2xl scale-95 opacity-0 pointer-events-none group-hover:scale-100 group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 ease-out z-50">
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-line">
                    <div>
                      <h4 className="font-instrument text-xl font-bold text-black tracking-normal normal-case">
                        Bespoke Events & Production
                      </h4>
                      <p className="text-[11px] text-warm-neutral normal-case tracking-normal">
                        Full-scale floral engineering, venue styling & day-of coordination
                      </p>
                    </div>
                    <Link 
                      to="/events"
                      className="text-[11px] font-semibold text-botanical hover:underline normal-case tracking-normal"
                    >
                      View All Verticals →
                    </Link>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {eventMenuItems.map((item) => (
                      <Link
                        key={item.path}
                        to={`/events/${item.path}`}
                        className="p-3 bg-stone-50 hover:bg-stone-100 border border-stone-line/60 rounded-sm transition-all group/item text-left normal-case tracking-normal"
                      >
                        <div className="flex justify-between items-start">
                          <span className="font-instrument text-base font-bold text-black group-hover/item:text-botanical transition-colors">
                            {item.name}
                          </span>
                          <span className="text-[9px] uppercase font-bold bg-white border border-stone-line px-2 py-0.5 rounded-full text-warm-neutral">
                            {item.count}
                          </span>
                        </div>
                        <p className="text-[11px] text-warm-neutral mt-1 line-clamp-1">
                          {item.tagline}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Corporate Gifts */}
              <Link 
                to="/corporate" 
                className="hover:text-black transition-colors duration-200"
              >
                Corporate Gifts
              </Link>

              {/* About Us */}
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

          {/* Mobile Secondary Horizontal Navigation Bar (Exact same options as PC) */}
          <div className="flex md:hidden items-center w-full h-10 border-t border-stone-line/40 overflow-x-auto scrollbar-none py-1">
            <div className="flex items-center space-x-3.5 font-sans text-[11px] tracking-wider uppercase font-semibold text-charcoal whitespace-nowrap">
              <button 
                onClick={() => { setMobileExpandedSection('shop'); setMobileMenuOpen(true); }}
                className="flex items-center space-x-1 hover:text-black py-1"
              >
                <span>Shop Flower and Setup</span>
                <ChevronDown className="w-3 h-3 text-warm-neutral" />
              </button>
              <button 
                onClick={() => { setMobileExpandedSection('occasion'); setMobileMenuOpen(true); }}
                className="flex items-center space-x-1 hover:text-black py-1"
              >
                <span>By Occasion</span>
                <ChevronDown className="w-3 h-3 text-warm-neutral" />
              </button>
              <button 
                onClick={() => { setMobileExpandedSection('month'); setMobileMenuOpen(true); }}
                className="flex items-center space-x-1 hover:text-black py-1"
              >
                <span>Birth Month</span>
                <ChevronDown className="w-3 h-3 text-warm-neutral" />
              </button>
              <button 
                onClick={() => { setMobileExpandedSection('events'); setMobileMenuOpen(true); }}
                className="flex items-center space-x-1 hover:text-black py-1 text-black"
              >
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>Event Planning</span>
                <ChevronDown className="w-3 h-3 text-warm-neutral" />
              </button>
              <Link to="/corporate" className="hover:text-black py-1">
                Corporate Gifts
              </Link>
              <Link to="/about" className="hover:text-black py-1">
                About Us
              </Link>
              <Link to="/contact" className="hover:text-black py-1">
                Contact
              </Link>
            </div>
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
          <div className="relative flex-1 flex flex-col max-w-sm w-full bg-white border-r border-stone-line shadow-2xl p-5 overflow-y-auto">
            {/* Drawer Header with Logo & Close Button */}
            <div className="flex items-center justify-between pb-4 border-b border-stone-line">
              <Link 
                to="/" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center py-1"
                aria-label="Handal Flowers & Events"
              >
                <img
                  src="/images/Logo.png"
                  alt="Handal Flowers & Events Logo"
                  className="h-9 w-auto object-contain drop-shadow-xs"
                />
              </Link>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 text-warm-neutral hover:text-charcoal rounded-full hover:bg-stone-100"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3 text-left">
              {/* Mobile Theme Switcher */}
              <ThemeSwitcher isMobile={true} />

              {/* 1. Home Link */}
              <Link 
                to="/" 
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-xs font-semibold uppercase tracking-wider text-charcoal hover:text-botanical border-b border-stone-line/30"
              >
                Home
              </Link>

              {/* 2. Shop Flower and Setup Accordion */}
              <div className="border-b border-stone-line/30 pb-2">
                <button
                  onClick={() => toggleMobileSection('shop')}
                  className="w-full flex items-center justify-between py-2 text-xs font-semibold uppercase tracking-wider text-charcoal hover:text-botanical"
                >
                  <span>Shop Flower and Setup</span>
                  <ChevronDown className={`w-4 h-4 text-warm-neutral transition-transform duration-200 ${mobileExpandedSection === 'shop' ? 'rotate-180 text-botanical' : ''}`} />
                </button>
                
                {mobileExpandedSection === 'shop' && (
                  <div className="mt-1 pl-2 space-y-1 bg-stone-50/70 p-2.5 rounded-sm border border-stone-line/40">
                    {shopCategories.map((cat) => (
                      <Link 
                        key={cat.path} 
                        to={cat.isDirect ? `/${cat.path}` : `/shop/${cat.path}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between py-1.5 px-2 text-xs text-charcoal hover:bg-white rounded-xs transition-colors"
                      >
                        <span className={cat.badge ? 'font-medium' : ''}>{cat.name}</span>
                        {cat.badge && (
                          <span className="text-[9px] uppercase font-bold bg-amber-100 text-amber-900 border border-amber-200 px-2 py-0.5 rounded-full">
                            {cat.badge}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* 3. By Occasion Accordion */}
              <div className="border-b border-stone-line/30 pb-2">
                <button
                  onClick={() => toggleMobileSection('occasion')}
                  className="w-full flex items-center justify-between py-2 text-xs font-semibold uppercase tracking-wider text-charcoal hover:text-botanical"
                >
                  <span>By Occasion</span>
                  <ChevronDown className={`w-4 h-4 text-warm-neutral transition-transform duration-200 ${mobileExpandedSection === 'occasion' ? 'rotate-180 text-botanical' : ''}`} />
                </button>
                
                {mobileExpandedSection === 'occasion' && (
                  <div className="mt-1 bg-stone-50/70 p-3 rounded-sm border border-stone-line/40 space-y-2">
                    <span className="font-instrument text-xs font-semibold text-black block pb-1 border-b border-stone-line/40">
                      Curated Floral Gifts by Occasion
                    </span>
                    <div className="grid grid-cols-2 gap-x-2 gap-y-1.5">
                      {occasionsList.map((occ) => (
                        <Link 
                          key={occ}
                          to={`/occasion/${occ.toLowerCase().replace(/ & /g, '-and-').replace(/ /g, '-')}`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-xs text-warm-neutral hover:text-black py-1 px-1.5 rounded-xs hover:bg-white transition-colors"
                        >
                          {occ}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 4. Birth Month Accordion */}
              <div className="border-b border-stone-line/30 pb-2">
                <button
                  onClick={() => toggleMobileSection('month')}
                  className="w-full flex items-center justify-between py-2 text-xs font-semibold uppercase tracking-wider text-charcoal hover:text-botanical"
                >
                  <span>Birth Month</span>
                  <ChevronDown className={`w-4 h-4 text-warm-neutral transition-transform duration-200 ${mobileExpandedSection === 'month' ? 'rotate-180 text-botanical' : ''}`} />
                </button>
                
                {mobileExpandedSection === 'month' && (
                  <div className="mt-1 bg-stone-50/70 p-3 rounded-sm border border-stone-line/40 space-y-2">
                    <span className="font-instrument text-xs font-semibold text-black block pb-1 border-b border-stone-line/40">
                      Official Birth Month Stems
                    </span>
                    <div className="grid grid-cols-3 gap-1.5">
                      {monthsList.map((m) => (
                        <Link 
                          key={m}
                          to={`/month/${m.toLowerCase()}`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-xs text-center text-warm-neutral hover:text-black py-1 px-1 rounded-xs hover:bg-white transition-colors"
                        >
                          {m}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 5. Event Planning Accordion */}
              <div className="border-b border-stone-line/30 pb-2">
                <button
                  onClick={() => toggleMobileSection('events')}
                  className="w-full flex items-center justify-between py-2 text-xs font-semibold uppercase tracking-wider text-charcoal hover:text-botanical"
                >
                  <span className="flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Event Planning</span>
                  </span>
                  <ChevronDown className={`w-4 h-4 text-warm-neutral transition-transform duration-200 ${mobileExpandedSection === 'events' ? 'rotate-180 text-botanical' : ''}`} />
                </button>
                
                {mobileExpandedSection === 'events' && (
                  <div className="mt-1 bg-stone-50/70 p-3 rounded-sm border border-stone-line/40 space-y-2.5">
                    <div className="flex items-center justify-between pb-1.5 border-b border-stone-line/40">
                      <span className="font-instrument text-xs font-bold text-black">
                        Bespoke Events & Production
                      </span>
                      <Link 
                        to="/events"
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-[10px] font-semibold text-botanical hover:underline"
                      >
                        View All Verticals →
                      </Link>
                    </div>

                    <div className="space-y-1.5">
                      {eventMenuItems.map((item) => (
                        <Link
                          key={item.path}
                          to={`/events/${item.path}`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block p-2 bg-white hover:bg-stone-100 border border-stone-line/50 rounded-xs transition-colors"
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-black">{item.name}</span>
                            <span className="text-[9px] uppercase font-bold bg-stone-100 border border-stone-line px-1.5 py-0.5 rounded-full text-warm-neutral">
                              {item.count}
                            </span>
                          </div>
                          <p className="text-[10px] text-warm-neutral mt-0.5 line-clamp-1">
                            {item.tagline}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 6. Corporate Gifts */}
              <Link 
                to="/corporate" 
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-xs font-semibold uppercase tracking-wider text-charcoal hover:text-botanical border-b border-stone-line/30"
              >
                Corporate Gifts
              </Link>

              {/* 7. About Us */}
              <Link 
                to="/about" 
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-xs font-semibold uppercase tracking-wider text-charcoal hover:text-botanical border-b border-stone-line/30"
              >
                About Us
              </Link>

              {/* 8. Contact */}
              <Link 
                to="/contact" 
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-xs font-semibold uppercase tracking-wider text-charcoal hover:text-botanical border-b border-stone-line/30"
              >
                Contact
              </Link>

              {/* 9. Client Reviews */}
              <Link 
                to="/reviews" 
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-xs font-semibold uppercase tracking-wider text-charcoal hover:text-botanical border-b border-stone-line/30"
              >
                Client Reviews
              </Link>
            </div>

            {/* Plan Event CTA at bottom */}
            <div className="mt-auto pt-4 border-t border-stone-line">
              <Link
                to="/events"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center rounded-full py-3 text-xs uppercase tracking-widest bg-[#1B3B2B] text-white hover:bg-black transition-colors block font-semibold flex items-center justify-center space-x-1.5 shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Plan Event</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ZIP Code Modal (Commented out per request) */}
      {/* {zipModalOpen && (
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
      )} */}
    </>
  );
}
