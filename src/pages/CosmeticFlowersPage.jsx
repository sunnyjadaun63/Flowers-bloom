import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { 
  Sparkles, 
  ShieldCheck, 
  Droplets, 
  Sun, 
  Clock, 
  Feather, 
  HeartHandshake, 
  SlidersHorizontal, 
  HelpCircle, 
  CheckCircle2, 
  XCircle,
  ArrowRight,
  Layers,
  Award
} from 'lucide-react';

const cosmeticCategories = [
  { id: 'all', label: 'All Forever Blooms', icon: '✨' },
  { id: 'preserved-glass', label: 'Preserved in Glass Cloche', icon: '🔮' },
  { id: 'luxury-silk', label: 'Real-Touch Luxury Silk', icon: '🌸' },
  { id: 'metallic-dipped', label: '24K Gold & Keepsakes', icon: '👑' },
  { id: 'infinity-box', label: 'Infinity Velvet Boxes', icon: '🎁' },
  { id: 'dried-preserved', label: 'Dried Pampas & Botanicals', icon: '🌾' }
];

export default function CosmeticFlowersPage() {
  const [selectedSubCat, setSelectedSubCat] = useState('all');
  const [selectedColor, setSelectedColor] = useState('all');
  const [maxPrice, setMaxPrice] = useState(200);
  const [openFaq, setOpenFaq] = useState(0);

  // Filter products for cosmetic category
  const cosmeticProducts = useMemo(() => {
    return products.filter(p => p.category === 'cosmetic-flowers');
  }, []);

  const filteredProducts = useMemo(() => {
    return cosmeticProducts.filter(p => {
      if (selectedSubCat !== 'all' && p.subCategory !== selectedSubCat) return false;
      if (selectedColor !== 'all' && p.color !== selectedColor) return false;
      if (p.price > maxPrice) return false;
      return true;
    });
  }, [cosmeticProducts, selectedSubCat, selectedColor, maxPrice]);

  const faqs = [
    {
      q: "What exactly are Cosmetic & Preserved Flowers?",
      a: "Cosmetic & Preserved Flowers include two artisanal categories: (1) Real 100% natural flowers harvested at peak bloom and treated with plant-based cosmetic glycerin to replace water in their cells, keeping them fresh and soft for 3+ years, and (2) High-fashion luxury real-touch silk botanicals engineered with organic polymers to replicate genuine petal textures with zero wilting."
    },
    {
      q: "Do preserved and cosmetic flowers need water or sunlight?",
      a: "No! Absolutely zero water or sunlight is required. In fact, keeping them dry and out of direct harsh sunlight is what preserves their vibrant colors and supple petal textures for years."
    },
    {
      q: "Are cosmetic flowers safe for people with allergies or asthma?",
      a: "Yes! Because preserved flowers no longer produce pollen and our real-touch silk stems are 100% hypoallergenic, they are ideal for sensitive households, medical clinics, nurseries, and executive boardrooms where fresh flower pollen may cause irritation."
    },
    {
      q: "How do I clean or dust my permanent floral arrangements?",
      a: "Simply use a soft makeup brush, microfiber duster, or a hairdryer on its coolest, lowest fan setting from a 12-inch distance to gently lift ambient dust."
    }
  ];

  return (
    <div className="space-y-20 pb-20 bg-white text-left">
      
      {/* 1. Hero Banner */}
      <section className="relative min-h-[60vh] lg:min-h-[70vh] w-full overflow-hidden flex items-center bg-stone-900 border-b border-stone-line">
        <img
          src="/images/cosmetic/cosmetic-hero.jpg"
          alt="Cosmetic and Preserved Flowers"
          className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-luminosity scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-900/80 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 text-white space-y-6">
          <div className="inline-flex items-center space-x-2 text-[11px] uppercase tracking-widest font-semibold bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-amber-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Forever Blooms & Artisanal Faux Botanicals</span>
          </div>

          <h1 className="font-instrument text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.08] tracking-tight max-w-3xl">
            Cosmetic & Preserved <br />
            <span className="italic font-light text-stone-300">Everlasting Botanicals</span>
          </h1>

          <p className="font-sans text-sm sm:text-base text-stone-300 max-w-2xl leading-relaxed">
            Experience eternal elegance. Handcrafted with non-toxic cosmetic glycerin infusion and Japanese real-touch silk, our permanent floral sculptures stay in perpetual bloom for 3 to 5+ years without water, sunlight, or maintenance.
          </p>

          {/* Key Value Badges */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl">
            {[
              { icon: Clock, title: "3+ Years Lifespan", subtitle: "Zero wilting" },
              { icon: Droplets, title: "0% Water Needed", subtitle: "No upkeep" },
              { icon: ShieldCheck, title: "Pollen-Free", subtitle: "100% Hypoallergenic" },
              { icon: Feather, title: "Real-Touch Feel", subtitle: "Soft organic texture" }
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

      {/* 2. Interactive Sub-Category Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between border-b border-stone-line pb-4 flex-wrap gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-widest font-semibold text-warm-neutral">Curated Collection</span>
            <h2 className="font-instrument text-2xl sm:text-3xl font-bold text-charcoal">
              Explore Cosmetic & Preserved Types
            </h2>
          </div>

          <div className="flex items-center space-x-2 text-xs text-warm-neutral font-medium">
            <span>Showing <strong className="text-black">{filteredProducts.length}</strong> everlasting designs</span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto py-6 no-scrollbar">
          {cosmeticCategories.map((cat) => (
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
                <option value="red">Crimson & Red</option>
                <option value="pink">Blush & Pink</option>
                <option value="white">Alabaster & White</option>
                <option value="yellow">Gold & Amber</option>
                <option value="purple">Violet & Lavender</option>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-stone-50 border border-stone-line rounded-sm space-y-3">
              <p className="font-instrument text-2xl text-charcoal">No cosmetic blooms matched your criteria.</p>
              <p className="text-xs text-warm-neutral">Try adjusting your price slider or selected color filter.</p>
              <button
                onClick={() => {
                  setSelectedSubCat('all');
                  setSelectedColor('all');
                  setMaxPrice(200);
                }}
                className="px-5 py-2 bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-neutral-800"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 3. The Science & Craft: Fresh vs. Cosmetic Flowers Comparison */}
      <section className="bg-stone-50 border-y border-stone-line py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] uppercase tracking-widest font-semibold text-botanical">Why Choose Cosmetic Stems</span>
            <h2 className="font-instrument text-3xl sm:text-4xl font-bold text-charcoal">
              Fresh Cut Flowers vs. Cosmetic & Preserved
            </h2>
            <p className="text-xs text-warm-neutral">
              Discover why modern luxury spaces and discerning gift-givers choose permanent preserved botanicals.
            </p>
          </div>

          {/* Comparison Table */}
          <div className="bg-white border border-stone-line rounded-sm overflow-hidden shadow-xs">
            <div className="grid grid-cols-3 bg-stone-100/70 p-4 border-b border-stone-line font-instrument text-base font-bold text-charcoal">
              <span>Feature & Characteristic</span>
              <span className="text-botanical">✨ Cosmetic & Preserved Botanicals</span>
              <span className="text-warm-neutral">🥀 Standard Fresh Cut Flowers</span>
            </div>

            <div className="divide-y divide-stone-line/60 text-xs">
              {[
                {
                  feature: "Lifespan & Durability",
                  cosmetic: "3 to 5+ Years without fading or petal dropping",
                  fresh: "5 to 10 Days before wilting and decay",
                  isCosmeticBetter: true
                },
                {
                  feature: "Water & Hydration Maintenance",
                  cosmetic: "100% Zero water needed — completely self-sufficient",
                  fresh: "Requires daily water changes & stem trimming",
                  isCosmeticBetter: true
                },
                {
                  feature: "Allergens & Pollen",
                  cosmetic: "Pollen-Free & Hypoallergenic (Safe for all)",
                  fresh: "Releases pollen, allergens & decaying bacteria",
                  isCosmeticBetter: true
                },
                {
                  feature: "Lighting & Sunlight Needs",
                  cosmetic: "Can be placed in dark hallways, bathrooms & windowless offices",
                  fresh: "Requires specific indirect ambient light",
                  isCosmeticBetter: true
                },
                {
                  feature: "Cost Over Time",
                  cosmetic: "Single investment that lasts years (High ROI)",
                  fresh: "Requires frequent weekly repurchasing",
                  isCosmeticBetter: true
                }
              ].map((row, idx) => (
                <div key={idx} className="grid grid-cols-3 p-4 items-center gap-4 hover:bg-stone-50/50 transition-colors">
                  <span className="font-semibold text-charcoal">{row.feature}</span>
                  <div className="flex items-center space-x-2 text-charcoal font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>{row.cosmetic}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-warm-neutral">
                    <XCircle className="w-4 h-4 text-stone-400 flex-shrink-0" />
                    <span>{row.fresh}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Craftsmanship & Preservation Engineering Guide */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-[10px] uppercase tracking-widest font-semibold text-warm-neutral">Atelier Craftsmanship</span>
          <h2 className="font-instrument text-3xl sm:text-4xl font-bold text-charcoal mt-1">
            How Our Cosmetic Blooms Are Engineered
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "Plant Glycerin Cellular Infusion",
              desc: "100% natural roses and stems are harvested at full bloom. The internal sap and water are gently replaced with a proprietary cosmetic glycerin formula that permanently halts aging while preserving touch-softness."
            },
            {
              step: "02",
              title: "Real-Touch Japanese Silk Polymers",
              desc: "For faux botanicals like peonies and orchids, petals are cast in precision micro-fiber silicone and Japanese silk with hand-painted gradient veining, duplicating the tactile moisture of living stems."
            },
            {
              step: "03",
              title: "24K Gold Trim & Scent Infusion",
              desc: "Select keepsake roses receive pure 24K gold electrolytic rim dipping and organic botanical essential oil cores that emit subtle, natural floral notes into the room for up to 18 months."
            }
          ].map((c, idx) => (
            <div key={idx} className="bg-white border border-stone-line p-8 rounded-sm space-y-3 relative overflow-hidden group hover:border-black transition-colors">
              <span className="font-instrument text-4xl font-bold text-botanical/30 block group-hover:text-botanical transition-colors">
                {c.step}
              </span>
              <h3 className="font-instrument text-xl font-bold text-charcoal">{c.title}</h3>
              <p className="font-sans text-xs text-warm-neutral leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Golden Rules for Cosmetic Care */}
      <section className="bg-stone-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-[10px] uppercase tracking-widest font-semibold text-amber-300">Simple Care Instructions</span>
            <h2 className="font-instrument text-3xl sm:text-4xl font-normal text-white mt-1">
              3 Golden Rules to Keep Them Flawless
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white/5 border border-white/10 p-6 rounded-sm space-y-2">
              <Droplets className="w-5 h-5 text-amber-300" />
              <h4 className="font-instrument text-lg font-bold">1. Never Add Water</h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                Preserved flowers and faux stems are completely hydrophobic. Water can damage the glycerin solution.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-sm space-y-2">
              <Sun className="w-5 h-5 text-amber-300" />
              <h4 className="font-instrument text-lg font-bold">2. Keep Out of Direct Glare</h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                Place in ambient room light. Prolonged harsh direct UV sunlight can gently fade organic cosmetic pigments over time.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-sm space-y-2">
              <Feather className="w-5 h-5 text-amber-300" />
              <h4 className="font-instrument text-lg font-bold">3. Light Dusting Only</h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                Use a soft makeup brush or gentle hairdryer on cool setting once every few months to remove room dust.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ Accordion */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-[10px] uppercase tracking-widest font-semibold text-warm-neutral">Got Questions?</span>
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

      {/* 7. Bespoke Custom Permanent Installation CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-100 border border-stone-line p-8 sm:p-12 rounded-sm flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <span className="text-[10px] uppercase tracking-widest font-semibold text-botanical">Commercial & Residential</span>
            <h3 className="font-instrument text-2xl sm:text-3xl font-bold text-charcoal">
              Need a Custom Everlasting Installation?
            </h3>
            <p className="text-xs text-warm-neutral leading-relaxed">
              We design custom permanent preserved flower walls, hotel lobby arrangements, and executive boardroom centerpieces tailored to your exact color palette and interior architecture.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/contact"
              className="px-6 py-3 bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-neutral-800 transition-colors inline-flex items-center space-x-2"
            >
              <span>Request Consultation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/events"
              className="px-6 py-3 bg-white border border-stone-line text-charcoal text-xs font-semibold uppercase tracking-wider rounded-full hover:border-black transition-colors"
            >
              Explore Event Styling
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
