import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { eventCategories } from '../data/eventsData';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { SideRibbons } from '../components/DecorativeRibbon';
import { 
  Calendar, 
  Users, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Calculator, 
  Send, 
  Star, 
  HelpCircle,
  Flower2,
  Layers,
  ChevronRight
} from 'lucide-react';

export default function EventCategoryPage() {
  const { category } = useParams();
  const navigate = useNavigate();

  // Normalize category parameter (handles 'grand-openings', 'weddings', 'birthdays', 'corporate', 'festivals')
  let currentSlug = category;
  if (currentSlug === 'grand-openings') currentSlug = 'corporate';

  const eventData = eventCategories.find(c => c.slug === currentSlug) || eventCategories[0];

  // State for V2 Collection filter tab
  const [v2SubFilter, setV2SubFilter] = useState('all');

  const v2Products = useMemo(() => {
    const allV2 = products.filter(p => p.id && p.id.startsWith('v2-'));
    if (v2SubFilter === 'bday') {
      return allV2.filter(p => p.images[0]?.includes('/BDAY/'));
    }
    if (v2SubFilter === 'balloons') {
      return allV2.filter(p => p.images[0]?.includes('Ballons'));
    }
    if (v2SubFilter === 'reveal') {
      return allV2.filter(p => p.images[0]?.includes('Gender Reveal'));
    }
    return allV2;
  }, [v2SubFilter]);

  // State for Service Filter & Active Service Modal
  const [selectedService, setSelectedService] = useState(null);
  const [searchFilter, setSearchFilter] = useState('');

  // Interactive Quote Calculator State
  const [guestCount, setGuestCount] = useState(75);
  const [selectedTier, setSelectedTier] = useState('atelier'); // essential, atelier, bespoke
  const [selectedAddons, setSelectedAddons] = useState(['arch', 'candles']);

  // Inquiry Form State
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    eventType: eventData.services[0]?.title || '',
    guestCount: '75',
    budget: '$5,000 - $10,000',
    notes: ''
  });

  // Calculate dynamic price estimation
  const tierRates = { essential: 35, atelier: 65, bespoke: 110 };
  const addonPrices = {
    arch: 850,
    chandeliers: 1200,
    candles: 350,
    station: 500,
    crew: 950
  };

  const baseCost = guestCount * (tierRates[selectedTier] || 65);
  const addonsCost = selectedAddons.reduce((sum, key) => sum + (addonPrices[key] || 0), 0);
  const totalEstimatedCost = baseCost + addonsCost;

  const toggleAddon = (key) => {
    setSelectedAddons(prev => 
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const filteredServices = eventData.services.filter(s => 
    s.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
    s.description.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="relative pb-20 bg-white">
      {/* Decorative Side Ribbons */}
      <SideRibbons />
      
      {/* 1. Category Hero Banner (Flush directly under Navbar) */}
      <section className="relative min-h-[60vh] lg:min-h-[70vh] w-full overflow-hidden flex items-center justify-center text-center px-6 bg-stone-900 border-b border-stone-line m-0">
        <img
          src={eventData.heroImage}
          alt={eventData.name}
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-white space-y-6 py-16">
          <div className="inline-flex items-center space-x-2 text-[11px] uppercase tracking-widest font-semibold bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-stone-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Handal Flowers & Events Event Atelier</span>
          </div>

          <h1 className="font-instrument text-5xl sm:text-6xl lg:text-7xl font-normal leading-tight tracking-tight text-white">
            {eventData.name}
          </h1>

          <p className="font-sans text-sm sm:text-base text-stone-300 max-w-2xl mx-auto leading-relaxed">
            {eventData.description}
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-6 pt-6 max-w-xl mx-auto border-t border-white/10">
            {eventData.stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <span className="block font-instrument text-2xl sm:text-3xl font-bold text-white">{stat.value}</span>
                <span className="text-[10px] uppercase tracking-wider text-stone-400">{stat.label}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 flex items-center justify-center space-x-4">
            <a
              href="#services-grid"
              className="rounded-full px-8 py-3.5 text-xs uppercase tracking-widest bg-white text-black font-semibold hover:bg-stone-100 transition-transform active:scale-95 shadow-md"
            >
              Explore Services
            </a>
            <a
              href="#cost-estimator"
              className="rounded-full px-8 py-3.5 text-xs uppercase tracking-widest bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 transition-all backdrop-blur-md"
            >
              Get Quote Estimate
            </a>
          </div>
        </div>
      </section>

      {/* Subsequent Sections Container */}
      <div className="space-y-16 pt-12">
        {/* 2. Sub-Category Switcher Navigation */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-3 p-3 bg-stone-50 border border-stone-line rounded-full max-w-3xl mx-auto shadow-xs">
          {eventCategories.map((cat) => (
            <Link
              key={cat.id}
              to={`/events/${cat.slug}`}
              className={`px-5 py-2 rounded-full text-xs font-medium transition-all ${
                cat.slug === currentSlug
                  ? 'bg-black text-white shadow-xs font-semibold'
                  : 'text-charcoal hover:bg-white hover:text-black'
              }`}
            >
              {cat.name.split('&')[0].trim()}
            </Link>
          ))}
        </div>
      </section>

      {/* Version 2 Signature Birthday & Family Collection (Displayed On Top) */}
      {currentSlug === 'birthdays' && (
        <section id="v2-collection" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-300">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-stone-line pb-6 gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-widest font-semibold bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full text-emerald-900 mb-2">
                <Sparkles className="w-3 h-3 text-emerald-700" />
                <span>Version 2 Signature Catalog</span>
              </div>
              <h2 className="font-instrument text-3xl sm:text-4xl text-charcoal font-bold mt-1">
                Birthday & Family Setups & Natural Flowers
              </h2>
              <p className="text-xs sm:text-sm text-warm-neutral mt-1 max-w-2xl">
                Newly curated Version 2 bespoke arrangements — featuring organic garden florals, celebratory balloon installations, and gender reveal party backdrops.
              </p>
            </div>

            {/* Sub-filter tabs */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-100 rounded-lg border border-stone-line">
              {[
                { id: 'all', label: 'All New (38)' },
                { id: 'bday', label: 'Milestone Birthdays (20)' },
                { id: 'balloons', label: 'Balloon Bouquets (6)' },
                { id: 'reveal', label: 'Gender Reveal (12)' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setV2SubFilter(tab.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                    v2SubFilter === tab.id
                      ? 'bg-black text-white shadow-xs'
                      : 'text-charcoal hover:bg-white/80'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Product Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {v2Products.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </section>
      )}

      {/* 3. Services Grid Section */}
      <section id="services-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-stone-line pb-6 gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-widest font-semibold text-warm-neutral">Curated Offerings</span>
            <h2 className="font-instrument text-3xl sm:text-4xl text-charcoal font-bold mt-1">
              All {eventData.name} Services
            </h2>
          </div>

          <div className="max-w-xs w-full">
            <input
              type="text"
              placeholder="Search specific service..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full border border-stone-line rounded-full px-4 py-2 text-xs outline-none focus:border-black bg-stone-50"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredServices.map((srv) => (
            <div
              key={srv.id}
              className="group bg-white border border-stone-line rounded-sm overflow-hidden flex flex-col justify-between hover:border-black/50 hover:shadow-xl transition-all duration-300"
            >
              <div>
                <div className="aspect-[16/10] bg-stone-100 overflow-hidden relative">
                  <img
                    src={srv.image}
                    alt={srv.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-white text-[10px] uppercase tracking-wider px-3 py-1 rounded-full">
                    {srv.guestCapacity}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="font-instrument text-2xl font-bold text-charcoal group-hover:opacity-85 transition-opacity">
                    {srv.title}
                  </h3>
                  <p className="font-sans text-xs text-warm-neutral leading-relaxed">
                    {srv.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-stone-line/50 text-[11px] text-charcoal">
                    <div className="flex items-center text-warm-neutral">
                      <Flower2 className="w-3.5 h-3.5 mr-2 text-botanical flex-shrink-0" />
                      <span className="font-semibold text-charcoal mr-1">Signature Stems:</span>
                      <span className="truncate">{srv.stems}</span>
                    </div>
                    <div className="flex items-center text-warm-neutral">
                      <Clock className="w-3.5 h-3.5 mr-2 text-botanical flex-shrink-0" />
                      <span className="font-semibold text-charcoal mr-1">Lead Time:</span>
                      <span>{srv.planningTime}</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <span className="block text-[10px] uppercase tracking-widest font-semibold text-warm-neutral mb-2">Package Inclusions:</span>
                    <ul className="space-y-1 text-xs text-charcoal">
                      {srv.features.map((f, i) => (
                        <li key={i} className="flex items-center space-x-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-botanical flex-shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => {
                    setFormData(prev => ({ ...prev, eventType: srv.title }));
                    const el = document.getElementById('consultation-form');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-2.5 rounded-full border border-stone-line text-xs font-semibold uppercase tracking-wider text-charcoal group-hover:bg-black group-hover:text-white group-hover:border-black transition-all flex items-center justify-center space-x-1"
                >
                  <span>Inquire for {srv.title.split(' ')[0]}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Interactive Event Cost Estimator / Quote Calculator */}
      <section id="cost-estimator" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-50 border border-stone-line p-8 sm:p-12 rounded-sm space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-stone-line pb-6 gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-widest font-semibold text-terracotta bg-white border border-stone-line px-3 py-1 rounded-full mb-2">
                <Calculator className="w-3 h-3 text-terracotta" />
                <span>Instant Budget Planning</span>
              </div>
              <h2 className="font-instrument text-3xl sm:text-4xl text-charcoal font-bold">
                {eventData.name} Cost Estimator
              </h2>
            </div>
            <p className="font-sans text-xs text-warm-neutral max-w-sm">
              Adjust guest count, floral styling tier, and installations for an instant transparent investment overview.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Calculator Controls */}
            <div className="lg:col-span-7 space-y-6">
              {/* Guest Slider */}
              <div className="space-y-3 bg-white p-5 border border-stone-line rounded-sm">
                <div className="flex justify-between items-center">
                  <label className="text-xs uppercase font-semibold tracking-wider text-charcoal">
                    Estimated Guest Attendance:
                  </label>
                  <span className="font-instrument text-2xl font-bold text-black">{guestCount} Guests</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="500"
                  step="5"
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full accent-black cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-warm-neutral">
                  <span>15 (Intimate)</span>
                  <span>150 (Classic)</span>
                  <span>500+ (Grand Estate)</span>
                </div>
              </div>

              {/* Styling Package Tiers */}
              <div className="space-y-3 bg-white p-5 border border-stone-line rounded-sm">
                <label className="block text-xs uppercase font-semibold tracking-wider text-charcoal mb-2">
                  Select Floral Architecture Level:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'essential', title: 'Essential Stems', rate: 'Coming Soon', desc: 'Table centerpieces & entry accents' },
                    { id: 'atelier', title: 'Grand Atelier', rate: 'Coming Soon', desc: 'Arches, hanging installs & lush runners' },
                    { id: 'bespoke', title: 'Royalty Bespoke', rate: 'Coming Soon', desc: 'Custom 3D living architecture & florals' }
                  ].map((tier) => (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setSelectedTier(tier.id)}
                      className={`p-4 text-left border rounded-sm transition-all ${
                        selectedTier === tier.id 
                          ? 'border-black bg-stone-50 ring-1 ring-black' 
                          : 'border-stone-line hover:border-charcoal/40 bg-white'
                      }`}
                    >
                      <span className="font-instrument text-lg font-bold block text-charcoal">{tier.title}</span>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-botanical block mt-0.5 bg-stone-100 px-2 py-0.5 rounded-full w-fit">{tier.rate}</span>
                      <span className="text-[10px] text-warm-neutral block mt-1 leading-snug">{tier.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Addons */}
              <div className="space-y-3 bg-white p-5 border border-stone-line rounded-sm">
                <label className="block text-xs uppercase font-semibold tracking-wider text-charcoal mb-2">
                  Select Architectural Add-Ons:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { id: 'arch', label: 'Grand Floral Entrance Arch', price: 'Coming Soon' },
                    { id: 'chandeliers', label: 'Suspended Floral Chandeliers', price: 'Coming Soon' },
                    { id: 'candles', label: 'Artisanal Taper Candlescape', price: 'Coming Soon' },
                    { id: 'station', label: 'Interactive Flower Favor Bar', price: 'Coming Soon' },
                    { id: 'crew', label: 'Day-Of Onsite Production Crew', price: 'Coming Soon' }
                  ].map((addon) => {
                    const active = selectedAddons.includes(addon.id);
                    return (
                      <button
                        key={addon.id}
                        type="button"
                        onClick={() => toggleAddon(addon.id)}
                        className={`p-3 text-left border rounded-sm flex items-center justify-between text-xs transition-all ${
                          active ? 'border-black bg-stone-50 font-semibold' : 'border-stone-line text-warm-neutral'
                        }`}
                      >
                        <span>{addon.label}</span>
                        <span className="text-botanical text-[10px] uppercase font-bold tracking-wider ml-2 bg-stone-100 px-2 py-0.5 rounded-full">{addon.price}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Estimated Summary Box */}
            <div className="lg:col-span-5 bg-white border border-stone-line p-6 rounded-sm space-y-6 flex flex-col justify-between shadow-sm">
              <div className="space-y-4">
                <h3 className="font-instrument text-2xl font-bold text-charcoal border-b border-stone-line pb-3">
                  Investment Summary
                </h3>

                <div className="space-y-2 text-xs text-charcoal">
                  <div className="flex justify-between py-1 border-b border-stone-line/50 items-center">
                    <span className="text-warm-neutral">Guest Tier ({guestCount} guests)</span>
                    <span className="font-bold text-botanical uppercase tracking-wider text-[10px] bg-stone-100 px-2 py-0.5 rounded-full">Coming Soon</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-stone-line/50 items-center">
                    <span className="text-warm-neutral">Selected Add-Ons ({selectedAddons.length} chosen)</span>
                    <span className="font-bold text-botanical uppercase tracking-wider text-[10px] bg-stone-100 px-2 py-0.5 rounded-full">Coming Soon</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-stone-line/50 items-center">
                    <span className="text-warm-neutral">Sustainable Cold-Chain Logistics</span>
                    <span className="font-semibold text-botanical">Complimentary</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-line">
                  <span className="text-[10px] uppercase tracking-widest text-warm-neutral block font-semibold">Estimated Total Range</span>
                  <div className="font-instrument text-3xl font-bold text-botanical mt-1">
                    Coming Soon
                  </div>
                  <p className="text-[11px] text-warm-neutral mt-2">
                    *Estimates include direct floral sourcing, container rentals, delivery, setup, and late-night breakdown.
                  </p>
                </div>
              </div>

              <div className="space-y-2 pt-4">
                <a
                  href="#consultation-form"
                  className="w-full bg-black text-white text-center py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider block hover:bg-neutral-800 transition-colors shadow-sm"
                >
                  Book Consultation for This Estimate
                </a>
                <p className="text-[10px] text-center text-warm-neutral">
                  Free 30-minute design consultation with 3D moodboard proposal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Consultation & Booking Form */}
      <section id="consultation-form" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-stone-line p-8 sm:p-12 rounded-sm shadow-md space-y-6">
          <div className="text-center space-y-2 border-b border-stone-line pb-6">
            <span className="text-[10px] uppercase tracking-widest font-semibold text-warm-neutral">Bespoke Production</span>
            <h2 className="font-instrument text-3xl sm:text-5xl text-charcoal font-bold">
              Inquire for {eventData.name}
            </h2>
            <p className="font-sans text-xs text-warm-neutral max-w-lg mx-auto">
              Tell us about your upcoming date, guest vision, and venue. Our event directors will respond within 24 hours with a custom proposal.
            </p>
          </div>

          {formSubmitted ? (
            <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
              <div className="w-16 h-16 bg-stone-50 border border-stone-line rounded-full flex items-center justify-center mx-auto text-botanical">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-instrument text-3xl font-bold text-charcoal">Proposal Request Received</h3>
              <p className="font-sans text-xs text-warm-neutral max-w-md mx-auto">
                Thank you, <strong>{formData.name}</strong>. Our senior event director has received your request for <strong>{formData.eventType}</strong> on <strong>{formData.eventDate || 'your date'}</strong>.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="rounded-full px-6 py-2.5 text-xs bg-black text-white font-semibold uppercase tracking-wider"
                >
                  Submit Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Lady Victoria sterling"
                    className="w-full border border-stone-line p-3 text-xs rounded-xs outline-none focus:border-black bg-stone-50"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="victoria@estate.com"
                    className="w-full border border-stone-line p-3 text-xs rounded-xs outline-none focus:border-black bg-stone-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 019-2834"
                    className="w-full border border-stone-line p-3 text-xs rounded-xs outline-none focus:border-black bg-stone-50"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal mb-1">Event Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    className="w-full border border-stone-line p-3 text-xs rounded-xs outline-none focus:border-black bg-stone-50"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal mb-1">Specific Service *</label>
                  <select
                    value={formData.eventType}
                    onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                    className="w-full border border-stone-line p-3 text-xs rounded-xs outline-none focus:border-black bg-stone-50"
                  >
                    {eventData.services.map((s) => (
                      <option key={s.id} value={s.title}>{s.title}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal mb-1">Expected Guests</label>
                  <input
                    type="text"
                    value={formData.guestCount}
                    onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                    placeholder="e.g. 120 guests"
                    className="w-full border border-stone-line p-3 text-xs rounded-xs outline-none focus:border-black bg-stone-50"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal mb-1">Estimated Budget Range</label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full border border-stone-line p-3 text-xs rounded-xs outline-none focus:border-black bg-stone-50"
                  >
                    <option>$2,500 - $5,000</option>
                    <option>$5,000 - $10,000</option>
                    <option>$10,000 - $25,000</option>
                    <option>$25,000 - $50,000+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal mb-1">Event Vision, Theme & Venue Details</label>
                <textarea
                  rows="3"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Tell us about your venue location, preferred color palette, special floral traditions, or architectural elements..."
                  className="w-full border border-stone-line p-3 text-xs rounded-xs outline-none focus:border-black bg-stone-50"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-black text-white text-xs font-semibold uppercase tracking-widest hover:bg-neutral-800 transition-all flex items-center justify-center space-x-2 shadow-lg"
                >
                  <span>Submit Event Consultation Request</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* 6. Client Reviews & FAQs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="border-t border-stone-line pt-12">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-[10px] uppercase tracking-widest font-semibold text-warm-neutral">Client Reviews</span>
            <h2 className="font-instrument text-3xl sm:text-4xl text-charcoal font-bold mt-1">
              Words From Past Hosts
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "The floral installation for our wedding reception looked like something out of a European editorial magazine. Every guest was mesmerized.",
                author: "Helena & Marcus Sterling",
                event: "Estate Wedding Ceremony & Reception",
                rating: 5
              },
              {
                quote: "Handal Flowers & Events managed our 500-person grand opening ribbon cutting with surgical precision. The branded flower wall was the press highlight of the year.",
                author: "Julian Vance",
                event: "Flagship Grand Opening",
                rating: 5
              },
              {
                quote: "For my mother’s 70th milestone birthday, the birth month flowers and personalized table runners brought tears of joy to our entire family.",
                author: "Clara Beauchamp",
                event: "Milestone Family Celebration",
                rating: 5
              }
            ].map((rev, idx) => (
              <div key={idx} className="bg-stone-50 border border-stone-line p-6 rounded-sm space-y-3">
                <div className="flex text-amber-500">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-charcoal italic leading-relaxed">
                  "{rev.quote}"
                </p>
                <div className="pt-2 border-t border-stone-line/50">
                  <span className="block font-semibold text-xs text-black">{rev.author}</span>
                  <span className="text-[10px] text-warm-neutral">{rev.event}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      </div>
    </div>
  );
}
