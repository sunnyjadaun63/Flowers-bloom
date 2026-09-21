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
  CheckCircle2, 
  Truck,
  Globe,
  Droplets,
  Feather
} from 'lucide-react';

const naturalCategories = [
  { id: 'all', label: 'All Fresh Stems', icon: '🌿' },
  { id: 'garden-roses', label: 'Garden Roses', icon: '🌹' },
  { id: 'peonies-ranunculus', label: 'Peonies & Ranunculus', icon: '🌸' },
  { id: 'centerpieces', label: 'Table Centerpieces', icon: '✨' },
  { id: 'pedestal-urns', label: 'Pedestal Urns & Vases', icon: '🏺' },
  { id: 'floral-boxes', label: 'Parisian Velvet Boxes', icon: '🎁' }
];

export default function NaturalFlowersPage() {
  const [selectedSubCat, setSelectedSubCat] = useState('all');
  const [selectedColor, setSelectedColor] = useState('all');
  const [minStems, setMinStems] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);

  // Filter products for natural category
  const naturalProducts = useMemo(() => {
    return products.filter(p => 
      p.category === 'natural-flowers' || 
      p.category === 'roses' || 
      p.category === 'bouquets'
    );
  }, []);

  // Filter & sort logic: Newly added products come first!
  const filteredProducts = useMemo(() => {
    return naturalProducts
      .filter(p => {
        if (selectedSubCat !== 'all' && p.subCategory !== selectedSubCat) return false;
        if (selectedColor !== 'all' && p.color !== selectedColor) return false;
        if (minStems > 0 && (p.stemCount || 0) < minStems) return false;
        return true;
      })
      .sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
  }, [naturalProducts, selectedSubCat, selectedColor, minStems]);

  const resetFilters = () => {
    setSelectedSubCat('all');
    setSelectedColor('all');
    setMinStems(0);
  };

  const faqs = [
    {
      q: "Where are your natural flowers sourced from?",
      a: "Our natural flowers are cut to order at dawn directly from certified organic boutique farms across Europe, South America, and local growers. We omit auction holding warehouses to ensure stems reach your recipient within 24 to 48 hours of harvest."
    },
    {
      q: "How does the 7-Day Freshness Guarantee work?",
      a: "Because our cold-chain transit preserves cellular hydration, our fresh stems stay vibrant for at least seven days. If your bouquet does not remain fresh for a full week, email a photo to our atelier and we will send a complimentary replacement immediately."
    },
    {
      q: "How should I care for my fresh flower arrangement?",
      a: "Upon arrival, trim 1 inch off the stems at a 45-degree angle under cool running water. Place in cold water with our complimentary botanical nutrient packet, and replenish clean water every two days away from direct heat."
    },
    {
      q: "Do you use floral foam in your fresh arrangements?",
      a: "Never. We are 100% committed to sustainable floristry. All our arrangements use biodegradable chicken wire, reusable flower frogs, and hand-tied European paper wraps with natural silk ribbons."
    }
  ];

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-left space-y-8 animate-in fade-in duration-300">
      {/* Decorative Ribbon Cutouts on empty side spaces */}
      <ShopPageRibbons category="natural-flowers" color="green" />

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
        <div className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-widest font-semibold bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full text-emerald-900 mb-2">
          <Sparkles className="w-3 h-3 text-emerald-700" />
          <span>Direct-From-Farm Organic Stems</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl text-charcoal font-semibold">
          Natural & Fresh Flowers
        </h1>
        <p className="font-sans text-xs text-warm-neutral mt-2 max-w-2xl">
          Double-petal garden roses, fluffy French peonies, and sunlit seasonal wildflowers sourced directly from certified organic growers with same-day hand delivery.
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
                Live floral pricing will be released soon. Filter fresh stems by arrangement style, count, and color below.
              </p>
            </div>

            {/* Natural Category / Style Filter */}
            <div className="space-y-2">
              <label className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal">
                Floral Style
              </label>
              <div className="space-y-1.5 font-sans text-xs">
                {naturalCategories.map((cat) => (
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

            {/* Stem Count Filter */}
            <div className="space-y-2">
              <label className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal">
                Min Stem Count: <span className="font-bold text-botanical">{minStems > 0 ? `${minStems} stems` : 'Any'}</span>
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {[0, 16, 20, 24].map((count) => (
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
            </div>

            {/* Color Filter */}
            <div className="space-y-2">
              <label className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal">
                Color Palette
              </label>
              <div className="grid grid-cols-2 gap-1.5 font-sans text-xs">
                {[
                  { id: 'all', label: 'All Colors' },
                  { id: 'pink', label: 'Pink & Peach' },
                  { id: 'red', label: 'Red & Crimson' },
                  { id: 'white', label: 'White & Cream' },
                  { id: 'yellow', label: 'Yellow & Gold' },
                  { id: 'purple', label: 'Purple & Violet' }
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
                Freshness Promise
              </span>
              <ul className="text-[11px] text-warm-neutral space-y-1.5">
                <li className="flex items-center space-x-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>7-Day Freshness Guaranteed</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Truck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Climate-controlled hand delivery</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Droplets className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Zero harmful floral foam</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Right Side: Product Catalog Grid (lg:col-span-9) */}
        <div className="lg:col-span-9 space-y-6">
          <div className="flex justify-between items-center bg-white border border-stone-line px-5 py-3 rounded-sm text-xs">
            <span className="font-medium text-warm-neutral">
              Showing <strong className="text-black">{filteredProducts.length}</strong> natural living arrangements
            </span>
            <span className="flex items-center text-warm-neutral">
              <Grid className="w-4 h-4 mr-1 text-botanical" />
              <span>Standard Grid</span>
            </span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white border border-stone-line rounded-sm space-y-4">
              <p className="font-serif text-lg text-charcoal">No natural flowers match your criteria</p>
              <p className="font-sans text-xs text-warm-neutral max-w-sm mx-auto">
                Try switching the floral style back to 'All Fresh Stems' or selecting 'All Colors'.
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

      {/* Sourcing Standard Section */}
      <section className="bg-stone-50 border border-stone-line p-8 sm:p-10 rounded-sm space-y-8 mt-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[10px] uppercase tracking-widest font-semibold text-botanical">
            Direct Organic Cold-Chain
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-charcoal">
            The Natural Flower Standard
          </h2>
          <p className="text-xs text-warm-neutral leading-relaxed">
            By eliminating auction middleman warehouses, our stems reach your recipient 4 to 5 days fresher than conventional high-street florists.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Globe,
              title: "Direct-From-Grower",
              desc: "Cut at dawn from certified sustainable boutique farms with immediate chilled hydration preservation."
            },
            {
              icon: ShieldCheck,
              title: "Organic Cold Chain Transit",
              desc: "Transported in climate-controlled temperature zones to protect cellular vitality and delicate scent."
            },
            {
              icon: Feather,
              title: "Hand-Tied Artisanal Wrap",
              desc: "Handcrafted in heavyweight recyclable European paper wraps and tied with natural silk ribbons."
            }
          ].map((c, idx) => (
            <div key={idx} className="bg-white border border-stone-line p-6 rounded-sm space-y-2.5 text-left shadow-xs">
              <div className="w-9 h-9 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-center mb-2">
                <c.icon className="w-4.5 h-4.5" />
              </div>
              <h3 className="font-serif text-base font-semibold text-charcoal">{c.title}</h3>
              <p className="font-sans text-xs text-warm-neutral leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-[10px] uppercase tracking-widest font-semibold text-warm-neutral">FAQ</span>
          <h2 className="font-serif text-2xl font-semibold text-charcoal">
            Frequently Asked Questions About Fresh Flowers
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
