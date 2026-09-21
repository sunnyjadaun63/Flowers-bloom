import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Heart, ShoppingCart, Star } from 'lucide-react';

export default function ProductCard({ product }) {
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const [hovered, setHovered] = useState(false);

  const isWishlisted = wishlist.includes(product.id);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  // Determine display image
  const displayImage = hovered && product.images && product.images.length > 1
    ? product.images[1]
    : product.images[0];

  return (
    <Link 
      to={`/product/${product.id}`}
      className="group flex flex-col bg-white border border-stone-line rounded-sm overflow-hidden hover:shadow-lg transition-all duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Product Image Area */}
      <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden border-b border-stone-line">
        <img 
          src={displayImage} 
          alt={product.name} 
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&q=80&w=800";
          }}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Badges (Top Left) */}
        <div className="absolute top-3 left-3 flex flex-col space-y-1.5 z-10">
          {product.isBestSeller && (
            <span className="bg-botanical text-white font-sans text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-xs font-semibold">
              Best Seller
            </span>
          )}
          {product.isNewArrival && (
            <span className="bg-terracotta text-white font-sans text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-xs font-semibold">
              New Arrival
            </span>
          )}
          {!product.inStock && (
            <span className="bg-stone-500 text-white font-sans text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-xs font-semibold">
              Out of Stock
            </span>
          )}
        </div>

        {/* Wishlist Toggle Button (Top Right) */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-xs rounded-full border border-stone-line hover:bg-white hover:scale-110 transition-all duration-200 z-10 shadow-xs focus:outline-none"
          aria-label={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          <Heart 
            className={`w-4 h-4 transition-colors duration-200 ${
              isWishlisted ? 'fill-terracotta text-terracotta' : 'text-charcoal hover:text-terracotta'
            }`} 
          />
        </button>

        {/* Quick Add Overlay Button (Commented out per request) */}
        {/* {product.inStock && (
          <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-10">
            <button
              onClick={handleQuickAdd}
              className="w-full bg-charcoal hover:bg-botanical text-white py-2 px-4 text-[11px] uppercase tracking-wider font-semibold flex items-center justify-center space-x-2 rounded-xs shadow-md transition-colors duration-200"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Quick Add to Cart</span>
            </button>
          </div>
        )} */}
      </div>

      {/* Product Content Info Area */}
      <div className="p-5 flex-1 flex flex-col justify-between bg-white">
        <div>
          {/* Category & Stem Count */}
          <div className="flex items-center justify-between text-[11px] uppercase tracking-wider font-semibold text-warm-neutral mb-1.5">
            <span>{product.category}</span>
            {product.stemCount > 1 && (
              <span>{product.stemCount} Stems</span>
            )}
          </div>

          {/* Product Name */}
          <h3 className="font-serif text-base text-charcoal font-medium group-hover:text-botanical transition-colors duration-150 line-clamp-1 mb-1">
            {product.name}
          </h3>
        </div>

        {/* Rating and Price */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-stone-line/50">
          <div className="flex items-center text-xs text-charcoal font-medium">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 mr-1" />
            <span>{product.rating.toFixed(1)}</span>
          </div>
          <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-botanical bg-stone-100 px-2.5 py-1 rounded-full">
            Coming Soon
          </span>
        </div>
      </div>
    </Link>
  );
}
