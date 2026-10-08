import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { ShopPageRibbons } from '../components/DecorativeRibbon';
import { 
  ArrowLeft, 
  SlidersHorizontal, 
  Grid, 
  RotateCcw, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Droplets, 
  Feather, 
  CheckCircle2, 
  XCircle 
} from 'lucide-react';

const artificialCategories = [
  { id: 'all', label: 'All Artificial Flowers', icon: '✨' },
  { id: 'luxury-silk', label: 'Real-Touch Silk Florals', icon: '🌸' },
  { id: 'preserved-glass', label: 'Glass Cloche Domes', icon: '🔮' },
  { id: 'infinity-box', label: 'Infinity Rose Boxes', icon: '🎁' },
  { id: 'dried-preserved', label: 'Faux Pampas & Dried Stems', icon: '🌾' }
];

export default function ArtificialFlowersPage() {
  const [selectedSubCat, setSelectedSubCat] = useState('all');
  const [selectedColor, setSelectedColor] = useState('all');
  const [minStems, setMinStems] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);

  // Filter products for artificial category
  const artificialProducts = useMemo(() => {
    return products.filter(p => 
      p.category === 'artificial-flowers' || 
      p.category === 'cosmetic-flowers'
    );
  }, []);

  // Filter & sort logic: Newly added products come first!
  const filteredProducts = useMemo(() => {
    return artificialProducts
      .filter(p => {
        if (selectedSubCat !== 'all' && p.subCategory !== selectedSubCat) return false;
        if (selectedColor !== 'all' && p.color !== selectedColor) return false;
        if (minStems > 0 && (p.stemCount || 0) < minStems) return false;
        return true;
      })
      .sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
  }, [artificialProducts, selectedSubCat, selectedColor, minStems]);

  const resetFilters = () => {
    setSelectedSubCat('all');
    setSelectedColor('all');
    setMinStems(0);
  };

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
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-left space-y-8 animate-in fade-in duration-300">
      {/* Decorative Ribbon Cutouts on empty side spaces */}
      <ShopPageRibbons category="artificial-flowers" color="maroon" />

      {/* Breadcrumb back navigation */}
      <Link 
        to="/" 
        className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-widest font-semibold text-botanical hover:text-terracotta transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Return to Home</span>
      </Link>

      {/* Header and Title */}
      <div className="border-b border-stone-line pb-6">
        <div className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-widest font-semibold bg-amber-50 border border-amber-200 px-3 py-1 rounded-full text-amber-900 mb-2">
          <Sparkles className="w-3 h-3 text-amber-600" />
          <span>Permanent Botanical Sculptures</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl text-charcoal font-semibold">
          Artificial & Permanent Flowers
        </h1>
        <p className="font-sans text-xs text-warm-neutral mt-2 max-w-2xl">
          High-fashion artificial silk blooms, preserved cloche roses, and faux architectural botanicals engineered to stay vibrant for years with zero watering or maintenance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Sidebar Filters (lg:col-span-3) */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white border border-stone-line p-5 rounded-sm space-y-6 shadow-xs">
            
            <div className="flex items-center justify-between border-b border-stone-line pb-3">
              <span className="font-serif text-sm font-semibold text-charcoal flex items-center">
                <SlidersHorizontal className="w-4 h-4 mr-2 text-botanical" />
                <span>Filters</span>
              </span>
              <button 
                onClick={resetFilters}
                className="text-[10px] uppercase tracking-wider text-warm-neutral hover:text-botanical flex items-center space-x-1 font-semibold transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Arrangement Pricing Status */}
            <div className="space-y-1.5 bg-stone-50 border border-stone-line/60 p-3 rounded-xs">
              <span className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal">
                Arrangement Pricing
              </span>
              <div className="flex items-center space-x-2">
                <span className="font-sans text-[11px] font-bold text-botanical uppercase tracking-wider bg-white border border-botanical/20 px-2.5 py-0.5 rounded-full shadow-xs">
                  Coming Soon
                </span>
              </div>
              <p className="text-[10px] text-warm-neutral mt-1 leading-tight">
                Live floral pricing will be released soon. Filter everlasting blooms by style, stem count, and color below.
              </p>
            </div>

            {/* Artificial Floral Style Filter */}
            <div className="space-y-2">
              <label className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal">
                Floral Style
              </label>
              <div className="space-y-1.5 font-sans text-xs">
                {artificialCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedSubCat(cat.id)}
                    className={`w-full py-2 px-3 rounded-xs border text-left flex items-center justify-between transition-all duration-150 ${
                      selectedSubCat === cat.id
                        ? 'bg-botanical text-white border-botanical font-semibold shadow-xs'
                        : 'bg-white border-stone-line hover:border-botanical text-warm-neutral hover:text-charcoal'
                    }`}
                  >
                    <span className="flex items-center space-x-2">
                      <span>{cat.icon}</span>
                      <span>{cat.label}</span>
                    </span>
                    {selectedSubCat === cat.id && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Stem Count Filter (Commented out per request) */}
            {/* <div className="space-y-2">
              <label className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal">
                Min Stem Count: <span className="font-bold text-botanical">{minStems > 0 ? `${minStems} stems` : 'Any'}</span>
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {[0, 14, 18, 22].map((count) => (
                  <button
                    key={count}
                    onClick={() => setMinStems(count)}
                    className={`py-1.5 text-xs font-semibold rounded-xs border font-sans transition-all duration-150 ${
                      minStems === count
                        ? 'bg-botanical text-white border-botanical'
                        : 'bg-white border-stone-line hover:border-botanical text-charcoal'
                    }`}
                  >
                    {count === 0 ? 'Any' : `${count}+`}
                  </button>
                ))}
              </div>
            </div> */}

            {/* Color Filter */}
            <div className="space-y-2">
              <label className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal">
                Color Palette
              </label>
              <div className="grid grid-cols-2 gap-1.5 font-sans text-xs">
                {[
                  { id: 'all', label: 'All Hues' },
                  { id: 'pink', label: 'Blush & Pink' },
                  { id: 'red', label: 'Red & Crimson' },
                  { id: 'white', label: 'White & Cream' },
                  { id: 'yellow', label: 'Yellow & Gold' },
                  { id: 'purple', label: 'Violet & Purple' }
                ].map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedColor(c.id)}
                    className={`py-1.5 px-2 rounded-xs border text-left capitalize font-medium transition-all duration-150 ${
                      selectedColor === c.id
                        ? 'bg-botanical text-white border-botanical'
                        : 'bg-white border-stone-line hover:border-botanical text-warm-neutral hover:text-charcoal'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quality Standard */}
            <div className="pt-2 border-t border-stone-line/60 space-y-2">
              <span className="block text-[10px] uppercase tracking-wider font-bold text-warm-neutral">
                Everlasting Benefits
              </span>
              <ul className="text-[11px] text-warm-neutral space-y-1.5">
                <li className="flex items-center space-x-2">
                  <Clock className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                  <span>5+ Years Lifespan with zero wilting</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Droplets className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                  <span>100% Zero watering or trimming</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                  <span>100% Pollen-free & hypoallergenic</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Feather className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                  <span>Real-touch Japanese silk tactile feel</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Right Side: Product Catalog Grid (lg:col-span-9) */}
        <div className="lg:col-span-9 space-y-6">
          <div className="flex justify-between items-center bg-white border border-stone-line px-5 py-3 rounded-sm text-xs">
            <span className="font-medium text-warm-neutral">
              Showing <strong className="text-black">{filteredProducts.length}</strong> artificial floral designs
            </span>
            <span className="flex items-center text-warm-neutral">
              <Grid className="w-4 h-4 mr-1 text-botanical" />
              <span>Standard Grid</span>
            </span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white border border-stone-line rounded-sm space-y-4">
              <p className="font-serif text-lg text-charcoal">No artificial flowers match your criteria</p>
              <p className="font-sans text-xs text-warm-neutral max-w-sm mx-auto">
                Try switching the floral style back to 'All Artificial Flowers' or selecting 'All Hues'.
              </p>
              <button 
                onClick={resetFilters}
                className="bg-botanical text-white px-6 py-2.5 text-xs uppercase tracking-widest font-semibold rounded-sm hover:bg-opacity-95"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Comparison Section */}
      <section className="bg-stone-50 border border-stone-line p-8 sm:p-10 rounded-sm space-y-8 mt-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[10px] uppercase tracking-widest font-semibold text-botanical">
            Smart Luxury Decor
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-charcoal">
            Artificial & Silk Flowers vs. Real Cut Flowers
          </h2>
        </div>

        <div className="bg-white border border-stone-line rounded-sm overflow-hidden shadow-xs">
          <div className="grid grid-cols-3 bg-stone-100/70 p-4 border-b border-stone-line font-serif text-sm font-semibold text-charcoal">
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
                f: "Placement",
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
      </section>

      {/* FAQ Accordion */}
      <section className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-[10px] uppercase tracking-widest font-semibold text-warm-neutral">FAQ</span>
          <h2 className="font-serif text-2xl font-semibold text-charcoal">
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
                className="w-full flex items-center justify-between p-4 text-left font-serif text-base font-semibold text-charcoal hover:bg-stone-50 transition-colors"
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
  );
}
