import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { X, Search, Sparkles, Star } from 'lucide-react';

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 50);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  // Handle Search Filtering
  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const filtered = products.filter(product => {
      const q = query.toLowerCase();
      return (
        product.name.toLowerCase().includes(q) ||
        (product.productCode && product.productCode.toLowerCase().includes(q)) ||
        product.id.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q) ||
        product.occasion.some(occ => occ.toLowerCase().includes(q))
      );
    });

    setResults(filtered.slice(0, 5)); // Limit to top 5 matches
  }, [query]);

  if (!isOpen) return null;

  const handleResultClick = (productId) => {
    navigate(`/product/${productId}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-charcoal/40 backdrop-blur-sm transition-opacity duration-300">
      <div className="bg-canvas border border-stone-line max-w-xl w-full rounded-sm shadow-2xl relative overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200">
        
        {/* Search Input Area */}
        <div className="flex items-center border-b border-stone-line bg-white px-4 py-4">
          <Search className="w-5 h-5 text-warm-neutral flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for garden roses, peonies, birth flowers..."
            className="w-full bg-transparent border-none outline-none px-3 text-sm text-charcoal font-sans"
          />
          <button 
            onClick={onClose}
            className="p-1 text-warm-neutral hover:text-charcoal transition-colors focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Area */}
        <div className="p-6">
          {query.trim() === '' ? (
            <div className="space-y-4">
              <span className="block text-[10px] uppercase tracking-wider font-semibold text-warm-neutral">
                Suggested Collections
              </span>
              <div className="flex flex-wrap gap-2">
                {['Roses', 'Bouquets', 'Seasonal', 'Best Sellers'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      const path = tag === 'Best Sellers' ? 'best-sellers' : tag.toLowerCase().replace(' ', '-');
                      navigate(`/shop/${path}`);
                      onClose();
                    }}
                    className="bg-white border border-stone-line hover:border-botanical hover:bg-stone-50 text-xs px-3.5 py-1.5 rounded-full text-charcoal transition-all font-sans"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-10 space-y-2">
              <p className="font-serif text-sm text-charcoal">No results found for "{query}"</p>
              <p className="font-sans text-xs text-warm-neutral">
                Try searching for something else, like "Juliet" or "Lavender".
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <span className="block text-[10px] uppercase tracking-wider font-semibold text-warm-neutral">
                Matches Found ({results.length})
              </span>
              <div className="space-y-3">
                {results.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleResultClick(product.id)}
                    className="flex items-center space-x-4 p-2 bg-white hover:bg-stone-50 border border-stone-line/50 rounded-sm cursor-pointer transition-all duration-150 group"
                  >
                    {/* Image */}
                    <div className="w-12 h-12 bg-stone-100 rounded-sm overflow-hidden border border-stone-line flex-shrink-0">
                      <img 
                        src={product.images[0]} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-sm text-charcoal font-medium group-hover:text-botanical transition-colors duration-150 truncate">
                        <span className="font-mono text-xs font-bold text-botanical mr-1.5">[{product.productCode || product.id}]</span>
                        {product.name}
                      </h4>
                      <p className="text-[11px] text-warm-neutral uppercase tracking-wider mt-0.5">
                        {product.category}
                        {/* • {product.stemCount} Stems */}
                      </p>
                    </div>
                    {/* Rating & Price */}
                    <div className="text-right flex-shrink-0">
                      <span className="font-sans text-xs font-bold text-charcoal block">${product.price}</span>
                      <span className="text-[10px] text-amber-500 font-medium flex items-center justify-end mt-0.5">
                        <Star className="w-3 h-3 fill-amber-500 mr-0.5 inline" />
                        {product.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Search Footer info */}
        <div className="bg-stone-50 border-t border-stone-line/50 px-6 py-3 flex items-center justify-between text-[10px] text-warm-neutral font-sans">
          <span className="flex items-center">
            <Sparkles className="w-3 h-3 text-terracotta mr-1.5" />
            7-day fresh flower guarantee included
          </span>
          <span>Esc to Close</span>
        </div>
      </div>
    </div>
  );
}
