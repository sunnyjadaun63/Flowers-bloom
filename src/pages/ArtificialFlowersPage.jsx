import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { ShopPageRibbons } from '../components/DecorativeRibbon';
import { 
  Sparkles, 
  ShieldCheck, 
  Droplets, 
  Sun, 
  Clock, 
  Feather, 
  SlidersHorizontal, 
  CheckCircle2, 
  XCircle,
  ArrowRight
} from 'lucide-react';

const artificialCategories = [
  { id: 'all', label: 'All Artificial Flowers', icon: '✨' },
  { id: 'preserved-glass', label: 'Glass Cloche Dome Flowers', icon: '🔮' },
  { id: 'luxury-silk', label: 'Real-Touch Silk Florals', icon: '🌸' },
  { id: 'metallic-dipped', label: 'Gold Keepsake Roses', icon: '👑' },
  { id: 'infinity-box', label: 'Infinity Rose Boxes', icon: '🎁' },
  { id: 'dried-preserved', label: 'Faux Pampas & Dried Stems', icon: '🌾' }
];

export default function ArtificialFlowersPage() {
  const [selectedSubCat, setSelectedSubCat] = useState('all');
  const [selectedColor, setSelectedColor] = useState('all');
  const [maxPrice, setMaxPrice] = useState(200);
  const [openFaq, setOpenFaq] = useState(0);

  // Filter products for artificial category
  const artificialProducts = useMemo(() => {
    return products.filter(p => p.category === 'artificial-flowers' || p.category === 'cosmetic-flowers');
  }, []);

  const filteredProducts = useMemo(() => {
    return artificialProducts.filter(p => {
      if (selectedSubCat !== 'all' && p.subCategory !== selectedSubCat) return false;
      if (selectedColor !== 'all' && p.color !== selectedColor) return false;
      if (p.price > maxPrice) return false;
      return true;
    });
  }, [artificialProducts, selectedSubCat, selectedColor, maxPrice]);

  const faqs = [
    {
      q: "What makes your Artificial & Silk Flowers look so real?",
      a: "Our artificial floral stems are crafted with micro-textured Japanese real-touch silk, silicone petal coatings, and hand-painted gradients that mimic the exact cellular weight, veining, and moisture look of fresh garden flowers."
    },
    {
      q: "Do artificial flowers need any maintenance or watering?",
      a: "None at all! Absolutely zero water, fertilizer, or sunlight is needed. They never wilt, drop petals, or rot, making them permanent architectural decor."
    },
    {
      q: "Are artificial flowers hypoallergenic?",
      a: "Yes! They produce zero pollen, dust-mites, or decaying organic bacteria, making them 100% safe for people with allergies, asthma, hospitals, and child nurseries."
    },
    {
      q: "How do I clean artificial flower arrangements?",
      a: "A quick wipe with a microfiber cloth or dusting with a hairdryer on its coolest, lowest fan setting keeps the silk blooms looking brand new for years."
    }
  ];

  return (
    <div className="relative pb-20 bg-white text-left">
      {/* Maroon Ribbon Cutouts on empty side spaces */}
      <ShopPageRibbons color="maroon" />
      
      {/* 1. Hero Banner (Flush directly under Navbar) */}
      <section className="relative min-h-[55vh] lg:min-h-[65vh] w-full overflow-hidden flex items-center bg-stone-900 border-b border-stone-line m-0">
        <img
          src="/images/artificial/artificial-hero.jpg"
          alt="Artificial Flowers Collection"
          className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-luminosity scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-900/80 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 text-white space-y-6">
          <div className="inline-flex items-center space-x-2 text-[11px] uppercase tracking-widest font-semibold bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-amber-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Premium Artificial, Silk & Faux Flowers</span>
          </div>

          <h1 className="font-instrument text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.08] tracking-tight max-w-3xl">
            Artificial Flowers <br />
            <span className="italic font-light text-stone-300">& Permanent Botanicals</span>
          </h1>

          <p className="font-sans text-sm sm:text-base text-stone-300 max-w-2xl leading-relaxed">
            High-fashion artificial silk blooms, preserved cloche roses, and faux architectural botanicals engineered to stay vibrant for years with zero watering or maintenance.
          </p>

          {/* Value Badges */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl">
            {[
              { icon: Clock, title: "5+ Years Lifespan", subtitle: "Zero wilting" },
              { icon: Droplets, title: "0% Water Needed", subtitle: "No maintenance" },
              { icon: ShieldCheck, title: "Pollen-Free", subtitle: "100% Hypoallergenic" },
              { icon: Feather, title: "Real-Touch Silk", subtitle: "Lifelike petal feel" }
            ].map((b, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 p-3.5 rounded-sm backdrop-blur-xs">
                <b.icon className="w-4 h-4 text-amber-300 mb-1.5" />
                <h4 className="font-instrument text-sm font-bold text-white leading-tight">{b.title}</h4>
                <p className="text-[10px] text-stone-400 mt-0.5">{b.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subsequent Page Sections Container */}
      <div className="space-y-16 pt-12">

      {/* 2. Interactive Sub-Category Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between border-b border-stone-line pb-4 flex-wrap gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-widest font-semibold text-warm-neutral">Permanent Floral Gallery</span>
            <h2 className="font-instrument text-2xl sm:text-3xl font-bold text-charcoal">
              Shop Artificial Flowers by Style
            </h2>
          </div>

          <div className="flex items-center space-x-2 text-xs text-warm-neutral font-medium">
            <span>Showing <strong className="text-black">{filteredProducts.length}</strong> artificial floral designs</span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto py-6 no-scrollbar">
          {artificialCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedSubCat(cat.id)}
              className={`px-4 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center space-x-1.5 ${
                selectedSubCat === cat.id
                  ? 'bg-black text-white shadow-md'
                  : 'bg-stone-50 border border-stone-line text-charcoal hover:border-black hover:bg-white'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Secondary Filter Controls */}
        <div className="bg-stone-50 border border-stone-line p-4 rounded-sm flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center space-x-2">
              <SlidersHorizontal className="w-3.5 h-3.5 text-warm-neutral" />
              <span className="font-semibold uppercase tracking-wider text-[11px] text-charcoal">Color:</span>
              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="bg-white border border-stone-line px-3 py-1.5 rounded-xs outline-none focus:border-black text-xs"
              >
                <option value="all">All Hues</option>
                <option value="red">Red & Crimson</option>
                <option value="pink">Blush & Pink</option>
                <option value="white">White & Cream</option>
                <option value="yellow">Yellow & Gold</option>
                <option value="purple">Violet & Purple</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <span className="font-semibold uppercase tracking-wider text-[11px] text-charcoal">Pricing:</span>
              <span className="font-sans text-[11px] font-bold text-botanical uppercase tracking-wider bg-white border border-stone-line px-2.5 py-0.5 rounded-full shadow-xs">
                Coming Soon
              </span>
            </div>
          </div>

          {(selectedSubCat !== 'all' || selectedColor !== 'all' || maxPrice < 200) && (
            <button
              onClick={() => {
                setSelectedSubCat('all');
                setSelectedColor('all');
                setMaxPrice(200);
              }}
              className="text-xs font-semibold text-terracotta hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Product Grid */}
        <div className="mt-8">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-stone-50 border border-stone-line rounded-sm space-y-3">
              <p className="font-instrument text-2xl text-charcoal">No artificial flowers match the selected filter.</p>
              <button
                onClick={() => {
                  setSelectedSubCat('all');
                  setSelectedColor('all');
                  setMaxPrice(200);
                }}
                className="px-5 py-2 bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-neutral-800"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 3. Real vs Artificial Comparison */}
      <section className="bg-stone-50 border-y border-stone-line py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] uppercase tracking-widest font-semibold text-botanical">Smart Luxury Decor</span>
            <h2 className="font-instrument text-3xl sm:text-4xl font-bold text-charcoal">
              Artificial & Silk Flowers vs. Real Cut Flowers
            </h2>
          </div>

          <div className="bg-white border border-stone-line rounded-sm overflow-hidden shadow-xs">
            <div className="grid grid-cols-3 bg-stone-100/70 p-4 border-b border-stone-line font-instrument text-base font-bold text-charcoal">
              <span>Feature</span>
              <span className="text-botanical">🌸 Artificial & Silk Flowers</span>
              <span className="text-warm-neutral">🥀 Natural Fresh Cut Stems</span>
            </div>

            <div className="divide-y divide-stone-line/60 text-xs">
              {[
                {
                  f: "Lifespan",
                  art: "5+ Years with zero fading or petal loss",
                  real: "5 to 7 Days before wilting"
                },
                {
                  f: "Water & Trimming",
                  art: "100% Zero water needed — maintenance-free",
                  real: "Daily water replenishment required"
                },
                {
                  f: "Allergies & Pollen",
                  art: "100% Pollen-Free & Safe for all",
                  real: "Releases allergens and floral pollen"
                },
                {
                  f: "Sunlight & Placement",
                  art: "Place anywhere: bathrooms, dark hallways, desks",
                  real: "Requires specific indirect natural light"
                }
              ].map((row, idx) => (
                <div key={idx} className="grid grid-cols-3 p-4 items-center gap-4 hover:bg-stone-50/50 transition-colors">
                  <span className="font-semibold text-charcoal">{row.f}</span>
                  <div className="flex items-center space-x-2 text-charcoal font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>{row.art}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-warm-neutral">
                    <XCircle className="w-4 h-4 text-stone-400 flex-shrink-0" />
                    <span>{row.real}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. FAQ Accordion */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-[10px] uppercase tracking-widest font-semibold text-warm-neutral">FAQ</span>
          <h2 className="font-instrument text-3xl font-bold text-charcoal">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className="border border-stone-line rounded-sm overflow-hidden bg-white"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                className="w-full flex items-center justify-between p-4 text-left font-instrument text-base sm:text-lg font-bold text-charcoal hover:bg-stone-50 transition-colors"
              >
                <span>{faq.q}</span>
                <span className="text-xl font-sans text-warm-neutral ml-2">
                  {openFaq === idx ? '−' : '+'}
                </span>
              </button>
              {openFaq === idx && (
                <div className="px-4 pb-4 pt-1 text-xs text-warm-neutral leading-relaxed border-t border-stone-line/40 bg-stone-50/30">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      </div>
    </div>
  );
}
