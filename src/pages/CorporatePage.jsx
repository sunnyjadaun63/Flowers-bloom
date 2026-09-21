import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { ShopPageRibbons } from '../components/DecorativeRibbon';
import { 
  ArrowLeft, 
  Sparkles, 
  Building, 
  SlidersHorizontal, 
  Send, 
  CheckCircle2, 
  Calendar, 
  ShieldCheck, 
  Gift, 
  FileSpreadsheet, 
  Award, 
  Copy, 
  Check, 
  Users, 
  Truck, 
  RotateCcw 
} from 'lucide-react';

const corporateSentiments = {
  "client-appreciation": {
    heading: "Client Appreciation & Executive Gratitude",
    story: "Nurture lasting partnerships with bespoke floral couture, handcrafted linen hampers, and double-petal roses tailored to your corporate palette.",
    colorClass: "text-botanical bg-stone-50 border-stone-200",
    notes: [
      "Thank you for your ongoing trust and collaboration. Here is to our continued mutual growth.",
      "With sincere gratitude for our valued partnership. Wishing your team continued success.",
      "In appreciation of your exceptional support and collaboration throughout this milestone year."
    ]
  },
  "executive-milestones": {
    heading: "Milestone Celebrations & Executive Onboarding",
    story: "Commemorate promotions, retirement honors, and high-impact quarterly achievements with grand architectural arrangements.",
    colorClass: "text-amber-800 bg-amber-50 border-amber-200",
    notes: [
      "Congratulations on this monumental achievement! Your leadership continues to inspire us all.",
      "Wishing you tremendous success in your new executive chapter. Warmest congratulations!",
      "To celebrate your remarkable dedication, leadership, and landmark contribution to our vision."
    ]
  },
  "office-subscriptions": {
    heading: "Lobby, Showroom & Boardroom Subscriptions",
    story: "Elevate your physical office presence with weekly or bi-weekly climate-controlled fresh floral installations.",
    colorClass: "text-indigo-800 bg-indigo-50 border-indigo-200",
    notes: [
      "Welcome to our modern workspace—where natural beauty meets thoughtful architectural design.",
      "A touch of botanical calm for our team, clients, and partners. Enjoy the seasonal blooms.",
      "Curated fresh stems to foster creativity, focus, and a serene atmosphere throughout our offices."
    ]
  },
  "holiday-hampers": {
    heading: "Holiday, Gala & End-of-Year Gifting",
    story: "Turnkey bulk holiday gifting featuring artisanal chocolate pairings, scented soy wax candles, and keepsake wooden hampers.",
    colorClass: "text-terracotta bg-red-50/60 border-red-200",
    notes: [
      "Wishing you and your entire team a restful holiday season and an inspired New Year.",
      "With warm holiday greetings and sincere appreciation for our partnership this past year.",
      "Celebrating the season with warm wishes of prosperity, joy, and peace for your team."
    ]
  }
};

export default function CorporatePage() {
  const [selectedTheme, setSelectedTheme] = useState('client-appreciation');
  const [priceRange, setPriceRange] = useState(170);
  const [selectedVibe, setSelectedVibe] = useState('all'); // all, luxury, plants, hampers, minimal
  const [copiedNote, setCopiedNote] = useState('');
  
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    contactEmail: '',
    phone: '',
    giftType: 'Bulk Client Gifts',
    quantityTier: '10 - 25 units (10% tier)',
    budgetRange: '$1,000 - $2,500',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const currentTheme = corporateSentiments[selectedTheme] || corporateSentiments["client-appreciation"];

  // Filter products relevant to Corporate Gifts
  const corporateProducts = products.filter(product => {
    // 1. Is in Corporate Gift or suitable corporate categories
    const isCorp = product.occasion.includes("Corporate Gift") || 
                   product.category === "plants-baskets" || 
                   product.category === "roses" || 
                   product.category === "bouquets" ||
                   product.isBestSeller;

    if (!isCorp) return false;

    // 2. Price filter
    if (product.price > priceRange) return false;

    // 3. Vibe Filter
    if (selectedVibe !== 'all') {
      if (selectedVibe === 'plants' && product.category !== 'plants-baskets') return false;
      if (selectedVibe === 'luxury' && product.price < 95) return false;
      if (selectedVibe === 'hampers' && !product.name.toLowerCase().includes('hamper') && !product.name.toLowerCase().includes('candle') && !product.name.toLowerCase().includes('trio')) return false;
      if (selectedVibe === 'minimal' && product.stemCount > 20) return false;
    }

    return true;
  });

  const handleCopyNote = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedNote(text);
    setTimeout(() => setCopiedNote(''), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        companyName: '',
        contactName: '',
        contactEmail: '',
        phone: '',
        giftType: 'Bulk Client Gifts',
        quantityTier: '10 - 25 units (10% tier)',
        budgetRange: '$1,000 - $2,500',
        notes: ''
      });
    }, 4500);
  };

  const resetFilters = () => {
    setPriceRange(170);
    setSelectedVibe('all');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left space-y-12 animate-in fade-in duration-300">
      {/* Decorative Ribbon Cutouts */}
      <ShopPageRibbons category="corporate" color="green" />
      
      {/* 1. Breadcrumb Back Link */}
      <Link 
        to="/" 
        className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-widest font-semibold text-botanical hover:text-terracotta transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Return to Home</span>
      </Link>

      {/* 2. Editorial Header Banner (Matching Occasion & Birth Month Style) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-stone-line pb-10">
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-widest font-semibold text-botanical bg-stone-50 border border-stone-line px-3.5 py-1.5 rounded-full">
            <Building className="w-3.5 h-3.5 text-botanical" />
            <span>Corporate Gifts & Executive Concierge</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal font-bold leading-tight">
            Corporate Gifting <br />
            <span className="italic font-normal text-botanical">& Bespoke Subscriptions</span>.
          </h1>

          <p className="font-sans text-xs sm:text-sm text-warm-neutral leading-relaxed max-w-xl">
            Elevate client appreciation, team milestones, and lobby interiors with certified sustainable botanicals. From single executive deliveries to bulk multi-destination concierge orders with custom branded gift ribbons.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <a 
              href="#corporate-catalog" 
              className="bg-botanical hover:bg-opacity-95 text-white px-6 py-2.5 text-xs uppercase tracking-widest font-semibold rounded-xs shadow-xs transition-colors"
            >
              Explore Gift Catalog
            </a>
            <a 
              href="#quote-form" 
              className="bg-white border border-stone-line hover:bg-stone-50 text-charcoal px-6 py-2.5 text-xs uppercase tracking-widest font-semibold rounded-xs transition-colors"
            >
              Request Custom Quote
            </a>
          </div>
        </div>

        {/* Hero image card */}
        <div className="lg:col-span-5 aspect-[16/11] bg-stone-100 border border-stone-line rounded-sm overflow-hidden shadow-sm relative group">
          <img 
            src="https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&q=80&w=800" 
            alt="Corporate botanical interior floral styling" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-xs p-3 rounded-xs border border-stone-line text-left">
            <p className="font-serif text-xs font-semibold text-charcoal">Curated for Executive Spaces</p>
            <p className="text-[10px] text-warm-neutral font-sans">Same-day hand delivery in climate-controlled vehicles.</p>
          </div>
        </div>
      </div>

      {/* 3. Corporate Sentiments & Curated Programs (Interactive Selector) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-2xl text-charcoal font-semibold">Curated Corporate Programs</h2>
            <p className="font-sans text-xs text-warm-neutral mt-0.5">Select a corporate gifting focus to preview curated messaging and arrangements.</p>
          </div>
        </div>

        {/* Program Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { key: "client-appreciation", label: "Client Appreciation", icon: Gift },
            { key: "executive-milestones", label: "Milestones & Onboarding", icon: Award },
            { key: "office-subscriptions", label: "Office Subscriptions", icon: Building },
            { key: "holiday-hampers", label: "Holiday & Gala Hampers", icon: Sparkles }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setSelectedTheme(tab.key)}
              className={`p-4 rounded-sm border text-left transition-all flex flex-col justify-between space-y-2 ${
                selectedTheme === tab.key 
                  ? 'bg-botanical text-white border-botanical shadow-xs' 
                  : 'bg-white text-charcoal border-stone-line hover:border-botanical hover:bg-stone-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <tab.icon className={`w-4 h-4 ${selectedTheme === tab.key ? 'text-white' : 'text-botanical'}`} />
                {selectedTheme === tab.key && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
              </div>
              <span className="font-serif text-xs sm:text-sm font-semibold block">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Selected Program Sentiment Card with Copyable Message Cards */}
        <div className={`p-6 sm:p-8 rounded-sm border transition-all ${currentTheme.colorClass}`}>
          <div className="max-w-3xl space-y-2 mb-6">
            <span className="text-[10px] uppercase tracking-widest font-semibold opacity-75">Program Focus</span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold">{currentTheme.heading}</h3>
            <p className="font-sans text-xs leading-relaxed opacity-90">{currentTheme.story}</p>
          </div>

          <div>
            <span className="text-[10px] uppercase tracking-widest font-semibold block mb-3 opacity-75">
              Complimentary Custom Branded Card Messages (Click to Copy)
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {currentTheme.notes.map((note, idx) => (
                <button
                  key={idx}
                  onClick={() => handleCopyNote(note)}
                  className="bg-white/90 hover:bg-white border border-stone-line/70 hover:border-botanical p-4 rounded-xs text-left text-xs font-sans text-charcoal transition-all relative group flex flex-col justify-between shadow-xs"
                >
                  <p className="italic text-[11px] leading-relaxed mb-3">"{note}"</p>
                  <div className="flex items-center justify-between text-[10px] font-semibold text-botanical border-t border-stone-line/40 pt-2 w-full">
                    <span>{copiedNote === note ? "Copied to clipboard!" : "Copy note"}</span>
                    {copiedNote === note ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Filter Toolbar & Product Catalog */}
      <section id="corporate-catalog" className="space-y-6 pt-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-line pb-4">
          <div>
            <h2 className="font-serif text-2xl text-charcoal font-semibold">Corporate Gift Selections</h2>
            <p className="font-sans text-xs text-warm-neutral mt-0.5">
              Showing {corporateProducts.length} arrangements suitable for executive & client gifting
            </p>
          </div>

          {/* Quick Vibe Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Corporate' },
              { id: 'luxury', label: 'Executive Luxury' },
              { id: 'hampers', label: 'Gift Hampers & Sets' },
              { id: 'plants', label: 'Long-Lasting Plants' },
              { id: 'minimal', label: 'Desk Minimalist' }
            ].map(vibe => (
              <button
                key={vibe.id}
                onClick={() => setSelectedVibe(vibe.id)}
                className={`px-3 py-1.5 text-xs font-sans rounded-xs transition-all ${
                  selectedVibe === vibe.id
                    ? 'bg-charcoal text-white font-semibold shadow-xs'
                    : 'bg-white border border-stone-line text-warm-neutral hover:text-charcoal hover:border-charcoal'
                }`}
              >
                {vibe.label}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white border border-stone-line p-4 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <SlidersHorizontal className="w-4 h-4 text-botanical flex-shrink-0" />
            <div className="flex items-center space-x-2 text-xs font-sans text-charcoal">
              <span className="font-medium">Corporate Pricing:</span>
              <span className="font-sans text-[11px] font-bold text-botanical uppercase tracking-wider bg-stone-100 px-2.5 py-0.5 rounded-full">
                Coming Soon
              </span>
            </div>
          </div>

          {selectedVibe !== 'all' && (
            <button
              onClick={resetFilters}
              className="inline-flex items-center space-x-1 text-xs text-warm-neutral hover:text-terracotta transition-colors self-end sm:self-center"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Product Grid */}
        {corporateProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {corporateProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-stone-line p-12 text-center rounded-sm space-y-4">
            <p className="font-serif text-lg text-charcoal font-medium">No arrangements match your selected price range.</p>
            <p className="font-sans text-xs text-warm-neutral">Try adjusting the price slider or resetting filters.</p>
            <button
              onClick={resetFilters}
              className="inline-flex items-center space-x-1.5 bg-botanical text-white px-5 py-2 text-xs uppercase tracking-widest font-semibold rounded-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}
      </section>

      {/* 5. Corporate Member Perks & Tier Volume Discounts */}
      <section className="bg-white border border-stone-line p-8 sm:p-10 rounded-sm space-y-8 shadow-xs">
        <div className="max-w-2xl space-y-2">
          <span className="text-[10px] uppercase tracking-widest font-semibold text-botanical">B2B Volume Programs</span>
          <h2 className="font-serif text-2xl sm:text-3xl text-charcoal font-bold">The Handal Flowers & Events Corporate Advantage</h2>
          <p className="font-sans text-xs text-warm-neutral leading-relaxed">
            Partnering with us gives your organization streamlined bulk order concierge support, dedicated account design stylists, and custom embossed ribbon options.
          </p>
        </div>

        {/* Perks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-stone-line/75 p-5 rounded-xs space-y-3 bg-canvas">
            <div className="w-9 h-9 bg-white border border-stone-line rounded-full flex items-center justify-center text-botanical">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
            <h4 className="font-serif text-sm font-semibold text-charcoal">Multi-Address Spreadsheet Dispatch</h4>
            <p className="font-sans text-xs text-warm-neutral leading-relaxed">
              Send us your recipient CSV with addresses and personalized notes. We manage tracking and delivery confirmations seamlessly.
            </p>
          </div>

          <div className="border border-stone-line/75 p-5 rounded-xs space-y-3 bg-canvas">
            <div className="w-9 h-9 bg-white border border-stone-line rounded-full flex items-center justify-center text-botanical">
              <Sparkles className="w-4 h-4" />
            </div>
            <h4 className="font-serif text-sm font-semibold text-charcoal">Custom Brand Palette & Ribbon</h4>
            <p className="font-sans text-xs text-warm-neutral leading-relaxed">
              We integrate your corporate color schemes with satin ribbon foils, embossed gift boxes, and custom branded wax seals.
            </p>
          </div>

          <div className="border border-stone-line/75 p-5 rounded-xs space-y-3 bg-canvas">
            <div className="w-9 h-9 bg-white border border-stone-line rounded-full flex items-center justify-center text-botanical">
              <Truck className="w-4 h-4" />
            </div>
            <h4 className="font-serif text-sm font-semibold text-charcoal">Direct Cold-Chain Hand Delivery</h4>
            <p className="font-sans text-xs text-warm-neutral leading-relaxed">
              Delivered exclusively in climate-controlled courier vans—never crushed in standard shipping cardboard boxes.
            </p>
          </div>
        </div>

        {/* Volume Tier Table */}
        <div className="border-t border-stone-line pt-6">
          <h4 className="font-serif text-sm font-semibold text-charcoal mb-4">Volume Discount Tiers</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-stone-50 border border-stone-line p-4 rounded-xs text-center space-y-1">
              <span className="text-[10px] uppercase font-semibold text-warm-neutral">Tier 1</span>
              <p className="font-serif text-base font-bold text-charcoal">10 – 24 Units</p>
              <p className="text-xs text-botanical font-semibold">10% Volume Savings</p>
            </div>
            <div className="bg-stone-50 border border-stone-line p-4 rounded-xs text-center space-y-1">
              <span className="text-[10px] uppercase font-semibold text-warm-neutral">Tier 2</span>
              <p className="font-serif text-base font-bold text-charcoal">25 – 49 Units</p>
              <p className="text-xs text-botanical font-semibold">15% Volume Savings</p>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xs text-center space-y-1">
              <span className="text-[10px] uppercase font-semibold text-emerald-800">Executive Tier</span>
              <p className="font-serif text-base font-bold text-emerald-950">50+ Units</p>
              <p className="text-xs text-emerald-800 font-semibold">20% Savings + Free Vase Branding</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. B2B Inquiry & Custom Quote Request Form */}
      <section id="quote-form" className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white border border-stone-line p-6 sm:p-10 rounded-sm shadow-xs">
        
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-widest font-semibold text-botanical bg-stone-50 border border-stone-line px-3 py-1 rounded-full">
            <Users className="w-3.5 h-3.5 text-botanical" />
            <span>Dedicated Account Stylist</span>
          </div>

          <h3 className="font-serif text-2xl text-charcoal font-bold">Request a Corporate Consultation</h3>
          
          <p className="font-sans text-xs text-warm-neutral leading-relaxed">
            Tell us about your upcoming event, client gift roster, or office subscription requirements. A senior floral designer will review your guidelines and prepare a customized PDF proposal within 24 hours.
          </p>

          <div className="space-y-4 pt-2">
            <div className="flex space-x-3.5 items-start">
              <div className="p-1.5 bg-stone-50 border border-stone-line rounded-full text-botanical">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-semibold text-charcoal">Scheduled Delivery Precision</h4>
                <p className="font-sans text-[11px] text-warm-neutral">Reserve specific drop-off timeframes across multiple office locations.</p>
              </div>
            </div>

            <div className="flex space-x-3.5 items-start">
              <div className="p-1.5 bg-stone-50 border border-stone-line rounded-full text-botanical">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-semibold text-charcoal">Invoice & Net-30 Terms</h4>
                <p className="font-sans text-[11px] text-warm-neutral">Corporate billing available via credit card, ACH transfer, or Net-30 invoicing.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form area */}
        {/* <div className="lg:col-span-7 bg-canvas border border-stone-line p-6 sm:p-8 rounded-sm">
          {submitted ? (
            <div className="text-center py-12 space-y-6">
              <div className="w-16 h-16 bg-green-50 text-botanical border border-botanical rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-serif text-xl text-charcoal font-semibold">Corporate Inquiry Received</h3>
                <p className="font-sans text-xs text-warm-neutral mt-2 max-w-md mx-auto">
                  Thank you for contacting our corporate gifting desk. An Handal Flowers & Events account stylist will review your request and reach out within 24 hours with a custom proposal.
                </p>
              </div>
              <p className="text-[10px] text-warm-neutral italic animate-pulse">Refreshing inquiry form...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-serif text-base text-charcoal font-semibold mb-3 border-b border-stone-line pb-2 flex items-center">
                <Sparkles className="w-4 h-4 text-terracotta mr-1.5" />
                <span>Corporate Proposal Request</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal mb-1">Company Name</label>
                  <input 
                    type="text" 
                    value={formData.companyName}
                    onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                    placeholder="e.g. Sterling Capital Design" 
                    className="w-full bg-white border border-stone-line px-3 py-2 text-xs font-sans focus:outline-none focus:border-botanical text-charcoal rounded-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal mb-1">Contact Name</label>
                  <input 
                    type="text" 
                    value={formData.contactName}
                    onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                    placeholder="e.g. Sarah Jenkins" 
                    className="w-full bg-white border border-stone-line px-3 py-2 text-xs font-sans focus:outline-none focus:border-botanical text-charcoal rounded-xs"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal mb-1">Business Email</label>
                  <input 
                    type="email" 
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
                    placeholder="e.g. s.jenkins@company.com" 
                    className="w-full bg-white border border-stone-line px-3 py-2 text-xs font-sans focus:outline-none focus:border-botanical text-charcoal rounded-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal mb-1">Phone Number</label>
                  <input 
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="e.g. +1 (555) 019-2834" 
                    className="w-full bg-white border border-stone-line px-3 py-2 text-xs font-sans focus:outline-none focus:border-botanical text-charcoal rounded-xs"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal mb-1">Gifting Program</label>
                  <select 
                    value={formData.giftType}
                    onChange={(e) => setFormData({...formData, giftType: e.target.value})}
                    className="w-full bg-white border border-stone-line px-3 py-2 text-xs font-sans focus:outline-none focus:border-botanical text-charcoal rounded-xs"
                  >
                    <option value="Bulk Client Gifts">Bulk Client Gifts</option>
                    <option value="Executive Milestone">Executive Milestone</option>
                    <option value="Lobby Subscription">Office / Lobby Subscription</option>
                    <option value="Holiday Gala Hampers">Holiday Gala Hampers</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal mb-1">Quantity Tier</label>
                  <select 
                    value={formData.quantityTier}
                    onChange={(e) => setFormData({...formData, quantityTier: e.target.value})}
                    className="w-full bg-white border border-stone-line px-3 py-2 text-xs font-sans focus:outline-none focus:border-botanical text-charcoal rounded-xs"
                  >
                    <option value="1 - 9 units">1 – 9 units (Single/Standard)</option>
                    <option value="10 - 24 units">10 – 24 units (10% tier)</option>
                    <option value="25 - 49 units">25 – 49 units (15% tier)</option>
                    <option value="50+ units">50+ units (20% tier)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal mb-1">Estimated Budget</label>
                  <select 
                    value={formData.budgetRange}
                    onChange={(e) => setFormData({...formData, budgetRange: e.target.value})}
                    className="w-full bg-white border border-stone-line px-3 py-2 text-xs font-sans focus:outline-none focus:border-botanical text-charcoal rounded-xs"
                  >
                    <option value="$500 - $1,500">$500 - $1,500</option>
                    <option value="$1,500 - $3,500">$1,500 - $3,500</option>
                    <option value="$3,500 - $7,500">$3,500 - $7,500</option>
                    <option value="$7,500+">$7,500+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal mb-1">Special Requirements & Brand Details</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  placeholder="Include details regarding target delivery dates, brand color codes, multi-city addresses, or custom message card requests..."
                  rows={3}
                  className="w-full bg-white border border-stone-line p-3 text-xs font-sans focus:outline-none focus:border-botanical text-charcoal rounded-xs resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-botanical hover:bg-opacity-95 text-white py-3 text-xs uppercase tracking-widest font-semibold flex items-center justify-center space-x-2 rounded-xs shadow-xs transition-colors duration-150"
              >
                <Send className="w-4 h-4" />
                <span>Submit Corporate Request</span>
              </button>
            </form>
          )}
        </div> */}

      </section>

    </div>
  );
}
