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
  Feather, 
  CheckCircle2, 
  Truck,
  Wand2
} from 'lucide-react';

const setupStyles = [
  { id: 'all', label: 'All Setups', icon: '🎈' },
  { id: 'organic-arch', label: 'Organic Arches', icon: '✨' },
  { id: 'ring-backdrop', label: 'Ring Backdrops', icon: '⭕' },
  { id: 'cascade-garland', label: 'Cascade Garlands', icon: '🌟' },
  { id: 'meadow-cloud', label: 'Floral Meadow Clouds', icon: '🌸' },
  { id: 'demi-arch', label: 'Demi-Arches', icon: '👑' }
];

export default function BalloonSetupPage() {
  const [selectedStyle, setSelectedStyle] = useState('all');
  const [selectedColor, setSelectedColor] = useState('all');
  const [openFaq, setOpenFaq] = useState(0);

  // Filter products for balloon setup category
  const balloonProducts = useMemo(() => {
    return products.filter(p => p.category === 'balloon-setup' || p.subCategory?.includes('arch') || p.setupType);
  }, []);

  // Filter & sort logic: Newly added products come first!
  const filteredProducts = useMemo(() => {
    return balloonProducts
      .filter(p => {
        if (selectedStyle !== 'all' && p.subCategory !== selectedStyle) return false;
        if (selectedColor !== 'all' && p.color !== selectedColor) return false;
        return true;
      })
      .sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
  }, [balloonProducts, selectedStyle, selectedColor]);

  const resetFilters = () => {
    setSelectedStyle('all');
    setSelectedColor('all');
  };

  const faqs = [
    {
      q: "How far in advance should I book a balloon setup?",
      a: "We recommend reserving your installation at least 5 to 7 days in advance to ensure our styling artists can prepare customized double-stuffed colors and reserve framework rentals. Rush setups within 48 hours can often be accommodated based on calendar availability."
    },
    {
      q: "Are Handal balloon setups safe for the environment?",
      a: "Yes. We strictly utilize 100% natural, biodegradable organic rubber latex sourced from sustainable rubber tree farms. We never perform helium releases and dispose of all materials conscientiously."
    },
    {
      q: "How long will the balloon installation stay inflated?",
      a: "Our balloon arrangements are treated with professional balloon brightener and oxidation blockers. Indoor installations typically remain plump and vibrant for 48 to 72+ hours, while outdoor shaded setups last 24 to 48 hours depending on ambient temperature."
    },
    {
      q: "Does the service include on-site setup and takedown?",
      a: "Yes! Our team arrives at your venue with all necessary rigging, weighted bases, framing, and styling accessories. We build or mount the installation on-site and can return after your event for complete teardown."
    }
  ];

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-left space-y-8 animate-in fade-in duration-300">
      {/* Decorative Ribbon Cutouts */}
      <ShopPageRibbons category="balloon-setup" color="pink" />

      {/* Return to Home breadcrumb */}
      <Link 
        to="/" 
        className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-widest font-semibold text-botanical hover:text-terracotta transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Return to Home</span>
      </Link>

      {/* Header and Title */}
      <div className="border-b border-stone-line pb-6">
        <div className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-widest font-semibold bg-pink-50 border border-pink-200 px-3 py-1 rounded-full text-pink-900 mb-2">
          <Wand2 className="w-3 h-3 text-pink-700" />
          <span>Bespoke Event Installations</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl text-charcoal font-semibold">
          Balloon Setups & Installations
        </h1>
        <p className="font-sans text-xs text-warm-neutral mt-2 max-w-2xl">
          Show-stopping organic balloon arches, circular ring backdrops, and cascading garlands hand-styled with fresh botanicals and luxury double-stuffed latex colors.
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

            {/* Live Pricing Status */}
            <div className="space-y-1.5 bg-stone-50 border border-stone-line/60 p-3 rounded-xs">
              <span className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal">
                Installation Pricing
              </span>
              <div className="flex items-center space-x-2">
                <span className="font-sans text-[11px] font-bold text-botanical uppercase tracking-wider bg-white border border-botanical/20 px-2.5 py-0.5 rounded-full shadow-xs">
                  Coming Soon
                </span>
              </div>
              <p className="text-[10px] text-warm-neutral mt-1 leading-tight">
                Package quotes include on-site delivery, framing, custom color matching, and certified installation styling.
              </p>
            </div>

            {/* Setup Style Filter */}
            <div className="space-y-2">
              <label className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal">
                Installation Style
              </label>
              <div className="space-y-1.5 font-sans text-xs">
                {setupStyles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setSelectedStyle(style.id)}
                    className={`w-full py-2 px-3 rounded-xs border text-left flex items-center justify-between transition-all duration-150 ${
                      selectedStyle === style.id
                        ? 'bg-botanical text-white border-botanical font-semibold shadow-xs'
                        : 'bg-white border-stone-line hover:border-botanical text-warm-neutral hover:text-charcoal'
                    }`}
                  >
                    <span className="flex items-center space-x-2">
                      <span>{style.icon}</span>
                      <span>{style.label}</span>
                    </span>
                    {selectedStyle === style.id && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    )}
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
                  { id: 'all', label: 'All Hues' },
                  { id: 'pink', label: 'Pastel & Rose' },
                  { id: 'yellow', label: 'Gold & Chrome' },
                  { id: 'white', label: 'White & Pearl' },
                  { id: 'mixed', label: 'Jewel & Multi' }
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

            {/* Service Highlights */}
            <div className="pt-2 border-t border-stone-line/60 space-y-2">
              <span className="block text-[10px] uppercase tracking-wider font-bold text-warm-neutral">
                Service Inclusions
              </span>
              <ul className="text-[11px] text-warm-neutral space-y-1.5">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>On-site styling team</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Biodegradable latex</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Fresh floral integration</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Right Side: Product Catalog Grid (lg:col-span-9) */}
        <div className="lg:col-span-9 space-y-6">
          <div className="flex justify-between items-center bg-white border border-stone-line px-5 py-3 rounded-sm text-xs">
            <span className="font-medium text-warm-neutral">
              Showing <strong className="text-black">{filteredProducts.length}</strong> balloon installations
            </span>
            <span className="flex items-center text-warm-neutral">
              <Grid className="w-4 h-4 mr-1 text-botanical" />
              <span>Standard Grid</span>
            </span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white border border-stone-line rounded-sm space-y-4">
              <p className="font-serif text-lg text-charcoal">No installations match your criteria</p>
              <p className="font-sans text-xs text-warm-neutral max-w-sm mx-auto">
                Try switching the setup style or selecting 'All Hues' for the color palette.
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

      {/* Sourcing & Quality Banner */}
      <section className="bg-stone-50 border border-stone-line p-8 sm:p-10 rounded-sm space-y-8 mt-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[10px] uppercase tracking-widest font-semibold text-botanical">
            Event Precision & Engineering
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-charcoal">
            The Handal Balloon Artistry Standard
          </h2>
          <p className="text-xs text-warm-neutral leading-relaxed">
            Every installation is custom-built on-site by certified floral and balloon sculptors using double-stuffed designer latex.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Sparkles,
              title: "Custom Double-Stuffed Tones",
              desc: "We layer two balloon shades inside one another to create velvety, opaque pastel, terracotta, and jewel shades unavailable in standard balloons."
            },
            {
              icon: ShieldCheck,
              title: "100% Biodegradable Latex",
              desc: "Crafted exclusively from natural organic tree sap latex that breaks down organically, with zero plastic micro-waste."
            },
            {
              icon: Truck,
              title: "Full White-Glove Setup",
              desc: "Our styling team handles on-site construction, rigging, framework installation, weighted base placement, and post-event removal."
            }
          ].map((c, idx) => (
            <div key={idx} className="bg-white border border-stone-line p-6 rounded-sm space-y-2.5 text-left shadow-xs">
              <div className="w-9 h-9 rounded-full bg-pink-50 border border-pink-200 text-pink-700 flex items-center justify-center mb-2">
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
          <span className="text-[10px] uppercase tracking-widest font-semibold text-warm-neutral">Installation FAQ</span>
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
