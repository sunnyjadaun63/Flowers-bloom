import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { ShopPageRibbons } from '../components/DecorativeRibbon';
import { ArrowLeft, Sparkles, SlidersHorizontal, BookOpen, Quote } from 'lucide-react';

const sentiments = {
  "birthday": {
    heading: "Celebratory & Sunlit Stems",
    story: "Bring vibrant, natural energy to their special day with golden sunflowers, orange ranunculus, and wild meadow textures.",
    colorClass: "text-amber-700 bg-amber-50 border-amber-200",
    wishes: [
      "Wishing you a year as bright and beautiful as these fresh boutique blooms!",
      "May your day be filled with warm sunlight, sweet scents, and simple joys. Happy Birthday!",
      "Sending you hand-tied happiness from the flower fields. Have a wonderful day!"
    ]
  },
  "anniversary": {
    heading: "Timeless Devotion & Classic Stems",
    story: "Mark your journey together with double-petal cream garden roses, structural ivory hydrangeas, and trailing ivy vines.",
    colorClass: "text-emerald-800 bg-emerald-50 border-emerald-200",
    wishes: [
      "To another year of growing together in grace, beauty, and love. Happy Anniversary.",
      "Celebrating the beautiful life we've built, stem by stem, year by year.",
      "Still as madly in love with you today as the day we met. Happy Anniversary, my love."
    ]
  },
  "romance-and-valentine’s-day": {
    heading: "Passionate Devotion & Moody Violets",
    story: "Express silent adoration and deep romance with classical velvet red garden roses and moody purple calla lilies.",
    colorClass: "text-red-700 bg-red-50 border-red-200",
    wishes: [
      "You are my absolute favorite sensory details in this world.",
      "Two dozen garden roses to express what words fail to capture. I love you.",
      "To the one who makes my heart bloom in all seasons. Forever yours."
    ]
  },
  "sympathy-and-funeral": {
    heading: "Quiet Support & Serene Whites",
    story: "Offer comfort and peaceful remembrance with pristine white carnations, cloud-like hydrangeas, and structural eucalyptus.",
    colorClass: "text-stone-700 bg-stone-100 border-stone-200",
    wishes: [
      "Wishing you quiet strength, loving memories, and peace during this difficult time.",
      "May these serene white stems bring a soft touch of comfort and light to your home.",
      "Our hearts are with you. Sending you our deepest sympathy and comforting thoughts."
    ]
  },
  "thank-you": {
    heading: "Heartfelt Gratitude & Herb Gardens",
    story: "Express sincere gratitude with aromatic rosemary, wild lavender fields, and warm field blossoms.",
    colorClass: "text-botanical bg-stone-50 border-stone-200",
    wishes: [
      "Thank you for your warmth, support, and kindness. These flowers are a small token of my gratitude.",
      "Deeply grateful for everything you've done. May these blooms bring joy to your table.",
      "Your kindness is a breath of fresh air. Thank you so much!"
    ]
  },
  "congratulations": {
    heading: "Bold Milestones & Architectural Displays",
    story: "Celebrate achievements, promotions, and new chapters with structural stems that command attention.",
    colorClass: "text-indigo-800 bg-indigo-50 border-indigo-200",
    wishes: [
      "Huge congratulations on this amazing milestone! So proud of your hard work.",
      "Here's to new chapters, bold dreams, and well-deserved success. Congratulations!",
      "You did it! Sending you celebratory blooms to mark this incredible achievement."
    ]
  },
  "get-well": {
    heading: "Uplifting Blooms & Healing Botanical Scents",
    story: "Brighten their recovery and bring calming, restorative energy with sunshine yellow sunflowers, soothing lavender, and fragrant chamomile.",
    colorClass: "text-amber-800 bg-amber-50/80 border-amber-200",
    wishes: [
      "Sending you warmest thoughts and wishes for a speedy and comfortable recovery!",
      "May these vibrant fresh blooms bring a touch of sunshine and cheer to your room.",
      "Thinking of you and wishing you strength, rest, and quick healing each day."
    ]
  }
};

const defaultSentiment = {
  heading: "Tailored Hand-Tied Curation",
  story: "Discover premium arrangements curated by our studio florists to convey your warmest feelings and thoughts.",
  colorClass: "text-charcoal bg-stone-50 border-stone-200",
  wishes: [
    "Just because you were on my mind today, sending you a little natural beauty.",
    "May these fresh field stems bring light, calm, and joy into your home.",
    "Thinking of you and sending warm smiles from our greenhouse studio."
  ]
};

export default function OccasionCatalogPage() {
  const { type } = useParams();
  const [priceRange, setPriceRange] = useState(9999);
  const [selectedVibe, setSelectedVibe] = useState('all'); // Vibe categories: all, romantic, minimalist, rustic, bold
  const [copiedWish, setCopiedWish] = useState('');

  // Normalize key for matching sentiment data
  const normalizedKey = type ? type.toLowerCase().replace(/ & /g, '-and-').replace(/ /g, '-') : '';
  const currentSentiment = sentiments[normalizedKey] || defaultSentiment;
  const occasionTitle = type ? type.charAt(0).toUpperCase() + type.slice(1).replace(/-and-/g, ' & ').replace(/-/g, ' ') : "Occasions";

  // Filter products by occasion & client-side inputs
  const filteredProducts = products.filter(product => {
    // 1. Occasion Check
    const hasOccasion = product.occasion.some(o => 
      o.toLowerCase().replace(/ & /g, '-and-').replace(/ /g, '-') === normalizedKey
    );
    if (!hasOccasion && type) return false;

    // 2. Price Check
    if (product.price > priceRange) return false;

    // 3. Vibe Check (Mapping product characteristics to vibes)
    if (selectedVibe !== 'all') {
      if (selectedVibe === 'minimalist' && product.stemCount > 20) return false;
      if (selectedVibe === 'romantic' && product.color !== 'red' && product.color !== 'pink' && product.color !== 'white') return false;
      if (selectedVibe === 'rustic' && product.category !== 'seasonal' && product.category !== 'plants-baskets') return false;
      if (selectedVibe === 'bold' && product.stemCount < 18) return false;
    }

    return true;
  });

  const handleCopyWish = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedWish(text);
    setTimeout(() => setCopiedWish(''), 2000);
  };

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-left space-y-10 animate-in fade-in duration-300">
      {/* Green Ribbon Cutouts on empty side spaces */}
      <ShopPageRibbons />
      
      {/* Return Navigation */}
      <Link to="/" className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-widest font-semibold text-botanical hover:text-terracotta transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Return to Home</span>
      </Link>

      {/* Occasion Sentiment Header Section */}
      <div className={`border p-8 rounded-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-center ${currentSentiment.colorClass}`}>
        <div className="md:col-span-8 space-y-3">
          <div className="inline-flex items-center space-x-2 text-[9px] uppercase tracking-widest font-semibold text-terracotta bg-white px-3 py-1 border border-stone-line rounded-full">
            <Sparkles className="w-3 h-3 text-terracotta" />
            <span>Curated For {occasionTitle}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold leading-tight text-charcoal">
            {currentSentiment.heading}
          </h1>
          <p className="font-sans text-xs text-warm-neutral leading-relaxed max-w-xl">
            {currentSentiment.story}
          </p>
        </div>
        
        {/* Sourcing/Delivery tag */}
        <div className="md:col-span-4 bg-white border border-stone-line/50 p-4 rounded-sm shadow-xs space-y-1">
          <span className="block text-[8px] uppercase tracking-widest font-semibold text-warm-neutral">Farming Standard</span>
          <span className="block font-serif text-sm font-semibold text-botanical">Certified Direct Sourced</span>
          <span className="block text-[10px] text-warm-neutral">Direct field delivery eliminates transit delays.</span>
        </div>
      </div>

      {/* Greeting card ideas sidebar / top section */}
      <div className="bg-white border border-stone-line p-6 rounded-sm space-y-4">
        <h3 className="font-serif text-sm font-semibold text-charcoal flex items-center">
          <BookOpen className="w-4 h-4 text-botanical mr-2" />
          <span>Handwritten Card Sentiments (Copy Template)</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {currentSentiment.wishes.map((wish, idx) => (
            <div 
              key={idx} 
              onClick={() => handleCopyWish(wish)}
              className="group relative p-4 bg-canvas border border-stone-line/70 hover:border-botanical rounded-sm cursor-pointer transition-all flex flex-col justify-between"
            >
              <p className="font-sans text-xs text-warm-neutral italic leading-relaxed pr-6">
                "{wish}"
              </p>
              <div className="mt-3 flex justify-between items-center text-[9px] uppercase tracking-wider font-semibold text-warm-neutral">
                <span className="flex items-center"><Quote className="w-3 h-3 text-stone-300 mr-1" /> Template {idx + 1}</span>
                <span className="text-botanical opacity-0 group-hover:opacity-100 transition-opacity">
                  {copiedWish === wish ? 'Copied!' : 'Click to Copy'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search Grid and Custom Curation Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sidebar Curation Filters */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white border border-stone-line p-5 rounded-sm space-y-6 shadow-xs">
            
            <div className="border-b border-stone-line pb-3">
              <span className="font-serif text-sm font-semibold text-charcoal flex items-center">
                <SlidersHorizontal className="w-4 h-4 mr-2 text-botanical" />
                <span>Curation Assistant</span>
              </span>
            </div>

            {/* Price Status */}
            <div className="space-y-1.5 bg-stone-50 border border-stone-line/60 p-3 rounded-xs">
              <span className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal">
                Occasion Stems Pricing
              </span>
              <div className="flex items-center space-x-2">
                <span className="font-sans text-[11px] font-bold text-botanical uppercase tracking-wider bg-white border border-botanical/20 px-2.5 py-0.5 rounded-full shadow-xs">
                  Coming Soon
                </span>
              </div>
              <p className="text-[10px] text-warm-neutral mt-1 leading-tight">
                Live pricing for curated arrangements is coming soon.
              </p>
            </div>

            {/* Vibe Selector */}
            <div className="space-y-3">
              <label className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal">
                Recipient Vibe
              </label>
              <div className="flex flex-col space-y-1.5 font-sans text-xs">
                {[
                  { id: "all", label: "Show All Stems" },
                  { id: "minimalist", label: "Minimalist Scandinavian" },
                  { id: "romantic", label: "Classic Romantic" },
                  { id: "rustic", label: "Warm & Country-Rustic" },
                  { id: "bold", label: "Bold & Architectural" }
                ].map((vibe) => (
                  <button
                    key={vibe.id}
                    onClick={() => setSelectedVibe(vibe.id)}
                    className={`px-3 py-2 border rounded-xs text-left font-medium transition-all duration-150 ${
                      selectedVibe === vibe.id
                        ? 'bg-botanical text-white border-botanical'
                        : 'bg-white border-stone-line/75 text-warm-neutral hover:text-charcoal hover:border-botanical'
                    }`}
                  >
                    {vibe.label}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Occasion Catalog Product Grid */}
        <div className="lg:col-span-9 space-y-6">
          
          <div className="flex justify-between items-center bg-white border border-stone-line px-5 py-3 rounded-sm text-xs text-warm-neutral font-medium">
            <span>Found {filteredProducts.length} arrangements suitable for {occasionTitle}</span>
            <span>Local courier delivery active</span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white border border-stone-line rounded-sm space-y-4">
              <p className="font-serif text-lg text-charcoal">No matching arrangements found</p>
              <p className="font-sans text-xs text-warm-neutral max-w-sm mx-auto">
                No designs currently match this exact budget and vibe combination. Try resetting the filters or broadening your maximum price range.
              </p>
              <button 
                onClick={() => {
                  setPriceRange(160);
                  setSelectedVibe('all');
                }}
                className="bg-botanical text-white px-6 py-2.5 text-xs uppercase tracking-widest font-semibold rounded-sm"
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
    </div>
  );
}
