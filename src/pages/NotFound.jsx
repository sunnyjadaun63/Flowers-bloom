import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, MapPin, Phone, HelpCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-left animate-in fade-in duration-300">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: 404 Message details */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-widest font-semibold text-terracotta bg-stone-50 border border-stone-line px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-terracotta" />
            <span>Lost in the Wildflowers (404)</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl text-charcoal font-bold leading-none">
            This Stems <br />
            from an <span className="italic font-normal text-botanical">Error</span>.
          </h1>

          <p className="font-sans text-xs sm:text-sm text-warm-neutral leading-relaxed max-w-md">
            The page you are looking for has been pruned, renamed, or is temporarily unavailable. Let us guide you back to our seasonal gardens.
          </p>

          {/* Quick links redirects */}
          <div className="space-y-3 pt-2">
            <span className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal">
              Explore Our Collections
            </span>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans text-xs">
              <Link 
                to="/" 
                className="p-3 bg-white border border-stone-line hover:border-botanical hover:bg-stone-50 text-charcoal font-medium flex items-center justify-between rounded-sm transition-all"
              >
                <span>Go to Home Page</span>
                <ArrowRight className="w-3.5 h-3.5 text-botanical" />
              </Link>
              <Link 
                to="/shop/all" 
                className="p-3 bg-white border border-stone-line hover:border-botanical hover:bg-stone-50 text-charcoal font-medium flex items-center justify-between rounded-sm transition-all"
              >
                <span>Shop All Flowers</span>
                <ArrowRight className="w-3.5 h-3.5 text-botanical" />
              </Link>
              <Link 
                to="/corporate" 
                className="p-3 bg-white border border-stone-line hover:border-botanical hover:bg-stone-50 text-charcoal font-medium flex items-center justify-between rounded-sm transition-all"
              >
                <span>Corporate Partnerships</span>
                <ArrowRight className="w-3.5 h-3.5 text-botanical" />
              </Link>
              <Link 
                to="/contact" 
                className="p-3 bg-white border border-stone-line hover:border-botanical hover:bg-stone-50 text-charcoal font-medium flex items-center justify-between rounded-sm transition-all"
              >
                <span>Contact Studio & FAQs</span>
                <ArrowRight className="w-3.5 h-3.5 text-botanical" />
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Decorative image */}
        <div className="lg:col-span-5">
          <div className="aspect-[3/4] bg-stone-100 border border-stone-line rounded-sm overflow-hidden shadow-md relative">
            <img 
              src="https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&q=80&w=800" 
              alt="Pruned white garden rose in soft shadow" 
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "https://images.unsplash.com/photo-1516205651411-aef33a44f7c2?auto=format&fit=crop&q=80&w=800";
              }}
              className="w-full h-full object-cover"
            />
            {/* Soft text overlay */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-xs p-4 border border-stone-line rounded-xs text-left">
              <span className="font-serif text-[11px] italic text-botanical block font-medium">Handal Flowers & Events Journal</span>
              <p className="font-sans text-[10px] text-warm-neutral mt-0.5">Minimalist close-up of a white garden rose in soft morning light.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Support Details banner */}
      <div className="border-t border-stone-line/75 mt-16 pt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-warm-neutral font-sans">
        <div className="flex items-center space-x-2.5">
          <HelpCircle className="w-4 h-4 text-botanical flex-shrink-0" />
          <span>Need immediate assistance?</span>
        </div>
        <div className="flex items-center space-x-2.5">
          <Phone className="w-4 h-4 text-botanical flex-shrink-0" />
          <span>+1 (800) 555-AURA (Support Desk)</span>
        </div>
        <div className="flex items-center space-x-2.5">
          <MapPin className="w-4 h-4 text-botanical flex-shrink-0" />
          <span>42 Botanical Avenue, NY 10001</span>
        </div>
      </div>

    </div>
  );
}
