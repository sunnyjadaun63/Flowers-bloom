import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { ShopPageRibbons } from '../components/DecorativeRibbon';
import { useCart } from '../context/CartContext';
import { ArrowLeft, SlidersHorizontal, Grid, RotateCcw } from 'lucide-react';

export default function CatalogPage({ categoryProp }) {
  const { category: paramCategory, type, month } = useParams();
  const category = categoryProp || paramCategory;
  const [searchParams] = useSearchParams();
  const { wishlist } = useCart();

  // Filters State
  const [priceRange, setPriceRange] = useState(160);
  const [selectedColor, setSelectedColor] = useState('all');
  const [minStems, setMinStems] = useState(0);

  // Set catalog title and initial parameters
  let title = "All Collections";
  let subtitle = "Explore our hand-curated collections of sustainable stems.";
  let filterParam = searchParams.get('filter');

  if (category) {
    if (category === 'best-sellers') {
      title = "Best Sellers";
      subtitle = "Our most loved and requested arrangements.";
    } else if (category === 'new-arrivals') {
      title = "New Arrivals";
      subtitle = "Fresh designs hot off the farm fields.";
    } else {
      title = category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ');
      subtitle = `Elegant floral statements hand-picked for the ${title} collection.`;
    }
  } else if (type) {
    title = type.charAt(0).toUpperCase() + type.slice(1).replace(/-and-/g, ' & ').replace(/-/g, ' ');
    subtitle = `Celebrate special milestones with flowers made for ${title}.`;
  } else if (month) {
    title = month.charAt(0).toUpperCase() + month.slice(1) + " Birth Flowers";
    subtitle = `Official birth flowers and seasonal stems celebrating the month of ${month.charAt(0).toUpperCase() + month.slice(1)}.`;
  } else if (filterParam === 'wishlist') {
    title = "My Wishlist";
    subtitle = "Your curated collection of faved floral sculptures.";
  }

  // Filter Logic
  const filteredProducts = products.filter(product => {
    // 1. Route Category Filter
    if (category) {
      if (category === 'best-sellers') {
        if (!product.isBestSeller) return false;
      } else if (category === 'new-arrivals') {
        if (!product.isNewArrival) return false;
      } else if (category !== 'all' && product.category !== category) {
        return false;
      }
    }

    // 2. Route Occasion Type Filter
    if (type) {
      const matchOcc = type.toLowerCase().replace(/ & /g, '-and-').replace(/ /g, '-');
      const hasOcc = product.occasion.some(o => 
        o.toLowerCase().replace(/ & /g, '-and-').replace(/ /g, '-') === matchOcc
      );
      if (!hasOcc) return false;
    }

    // 3. Route Birth Month Filter
    if (month) {
      if (product.month.toLowerCase() !== month.toLowerCase()) return false;
    }

    // 4. Wishlist Filter Param
    if (filterParam === 'wishlist') {
      if (!wishlist.includes(product.id)) return false;
    }

    // 5. Client-Side Filters
    if (product.price > priceRange) return false;
    if (selectedColor !== 'all' && product.color !== selectedColor) return false;
    if (product.stemCount < minStems) return false;

    return true;
  }).sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));

  const resetFilters = () => {
    setPriceRange(160);
    setSelectedColor('all');
    setMinStems(0);
  };

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-left space-y-8 animate-in fade-in duration-300">
      {/* Dynamic Ribbon Cutouts on empty side spaces */}
      <ShopPageRibbons />
      
      {/* Breadcrumb back navigation */}
      <Link to="/" className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-widest font-semibold text-botanical hover:text-terracotta transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Return to Home</span>
      </Link>

      {/* Header and Title */}
      <div className="border-b border-stone-line pb-6">
        <h1 className="font-serif text-3xl sm:text-4xl text-charcoal font-semibold">{title}</h1>
        <p className="font-sans text-xs text-warm-neutral mt-2 max-w-2xl">{subtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Sidebar Filters */}
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

            {/* Price Status */}
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
                Live floral pricing will be released soon. Filter stems by count and color below.
              </p>
            </div>

            {/* Stem Count Filter */}
            <div className="space-y-2">
              <label className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal">
                Min Stem Count: <span className="font-bold text-botanical">{minStems > 0 ? `${minStems} stems` : 'Any'}</span>
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {[0, 10, 18, 24].map((count) => (
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
                {['all', 'white', 'red', 'pink', 'yellow', 'purple', 'mixed'].map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={`py-1.5 px-2 rounded-xs border text-left capitalize font-medium transition-all duration-150 ${
                      selectedColor === c
                        ? 'bg-botanical text-white border-botanical'
                        : 'bg-white border-stone-line hover:border-botanical text-warm-neutral hover:text-charcoal'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Right Side: Product Catalog Grid */}
        <div className="lg:col-span-9 space-y-6">
          <div className="flex justify-between items-center bg-white border border-stone-line px-5 py-3 rounded-sm text-xs">
            <span className="font-medium text-warm-neutral">
              Showing {filteredProducts.length} arrangements
            </span>
            <span className="flex items-center text-warm-neutral">
              <Grid className="w-4 h-4 mr-1 text-botanical" />
              <span>Standard Grid</span>
            </span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white border border-stone-line rounded-sm space-y-4">
              <p className="font-serif text-lg text-charcoal">No stems match your criteria</p>
              <p className="font-sans text-xs text-warm-neutral max-w-sm mx-auto">
                Try widening your price range slider or switching the color palette option back to 'all'.
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
    </div>
  );
}
