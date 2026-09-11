import React from 'react';
import { useParams, useLocation } from 'react-router-dom';

// Comprehensive color mapping for all Shop Categories, Occasions & Birth Months
const categoryColorMap = {
  // --- 1. Shop Flowers Dropdown ---
  'all': 'green',
  'best-sellers': 'yellow',
  'new-arrivals': 'pink',
  'artificial-flowers': 'maroon',
  'cosmetic-flowers': 'maroon',
  'bouquets': 'green',
  'roses': 'red', // Explicitly Red as requested
  'seasonal': 'yellow',
  'plants-baskets': 'pink',

  // --- 2. By Occasion Dropdown (Sequential Cycle: Green -> Yellow -> Pink -> Maroon -> Red) ---
  'birthday': 'green',
  'anniversary': 'yellow',
  'romance-and-valentines-day': 'red',
  'romance-and-valentine’s-day': 'red',
  'romance-and-valentine-s-day': 'red',
  'mothers-day': 'pink',
  'mother-s-day': 'pink',
  'mother’s-day': 'pink',
  'congratulations': 'maroon',
  'thank-you': 'green',
  'get-well': 'yellow',
  'sympathy-and-funeral': 'pink',
  'new-baby': 'maroon',
  'wedding': 'red',
  'apology': 'green',
  'housewarming': 'yellow',
  'just-because': 'pink',

  // --- 3. Birth Month Dropdown (Sequential Cycle: Green -> Yellow -> Pink -> Maroon -> Red) ---
  'january': 'green',
  'february': 'yellow',
  'march': 'pink',
  'april': 'maroon',
  'may': 'red',
  'june': 'green',
  'july': 'yellow',
  'august': 'pink',
  'september': 'maroon',
  'october': 'red',
  'november': 'green',
  'december': 'yellow',

  // --- 4. Event Divisions ---
  'weddings': 'red',
  'birthdays': 'yellow',
  'corporate': 'green',
  'festivals': 'pink'
};

const validColors = ['green', 'yellow', 'pink', 'maroon', 'red'];

/**
 * Home Page Side Ribbons
 * Preserves the previous original red ribbons for Home page.
 */
export function SideRibbons() {
  return (
    <div className="pointer-events-none select-none z-20">
      {/* Left Margin Classic Red Ribbon */}
      <div className="hidden lg:block fixed left-1 xl:left-4 2xl:left-8 top-1/4 w-20 xl:w-28 2xl:w-36 transition-all duration-300">
        <img
          src="/images/ribbon.png"
          alt="Classic Red Silk Ribbon"
          className="w-full h-auto object-contain drop-shadow-lg transform -rotate-3"
        />
      </div>

      {/* Right Margin Classic Red Ribbon */}
      <div className="hidden lg:block fixed right-1 xl:right-4 2xl:right-8 top-1/3 w-20 xl:w-28 2xl:w-36 transition-all duration-300">
        <img
          src="/images/ribbon2.png"
          alt="Classic Red Satin Ribbon"
          className="w-full h-auto object-contain drop-shadow-lg transform rotate-3"
        />
      </div>
    </div>
  );
}

/**
 * Shop Flowers, Occasions, Birth Months & Inner Catalog Pages Ribbons
 * Uses ONE single elegant ribbon shape cutout mirrored on both sides
 * Dynamically switches color per page: Green -> Yellow -> Pink -> Maroon -> Red
 * Roses page is explicitly Red.
 */
export function ShopPageRibbons({ category: propCategory, color: propColor }) {
  const { category: paramCategory, type: paramType, month: paramMonth } = useParams();
  const location = useLocation();

  // Determine active key from props, params, or URL path
  let activeKey = propCategory || paramCategory || paramType || paramMonth;
  if (!activeKey) {
    const path = location.pathname.replace(/^\//, '');
    if (path.includes('artificial-flowers') || path.includes('cosmetic-flowers')) {
      activeKey = 'artificial-flowers';
    } else if (path.startsWith('shop/')) {
      activeKey = path.replace('shop/', '');
    } else if (path.startsWith('occasion/')) {
      activeKey = path.replace('occasion/', '');
    } else if (path.startsWith('month/')) {
      activeKey = path.replace('month/', '');
    } else if (path.startsWith('events/')) {
      activeKey = path.replace('events/', '');
    }
  }

  // Normalize key
  let normalizedKey = activeKey ? decodeURIComponent(activeKey).toLowerCase().trim() : '';

  // Explicit check for Roses
  let resolvedColor = propColor;
  if (!resolvedColor && (normalizedKey === 'roses' || normalizedKey === 'rose')) {
    resolvedColor = 'red';
  } else if (!resolvedColor && normalizedKey) {
    resolvedColor = categoryColorMap[normalizedKey];
  }

  // Fallback cycling if key is dynamic/unknown
  if (!resolvedColor || !validColors.includes(resolvedColor)) {
    if (normalizedKey) {
      // Deterministic hash based on string
      let hash = 0;
      for (let i = 0; i < normalizedKey.length; i++) {
        hash = (hash << 5) - hash + normalizedKey.charCodeAt(i);
        hash |= 0;
      }
      resolvedColor = validColors[Math.abs(hash) % validColors.length];
    } else {
      resolvedColor = 'green';
    }
  }

  const ribbonSrc = `/images/ribbon_${resolvedColor}.png`;

  return (
    <div className="pointer-events-none select-none z-20">
      {/* Left Side Floating Ribbon Cutout (Rotated gently to the left) */}
      <div className="hidden xl:block fixed left-2 2xl:left-6 top-1/3 w-20 xl:w-28 2xl:w-32 opacity-90 transition-all duration-500">
        <img
          src={ribbonSrc}
          alt={`${resolvedColor} Botanical Silk Ribbon`}
          className="w-full h-auto object-contain drop-shadow-lg transform -rotate-6 hover:rotate-0 transition-transform duration-500"
        />
      </div>

      {/* Right Side Floating Ribbon Cutout (Flipped horizontally for symmetry) */}
      <div className="hidden xl:block fixed right-2 2xl:right-6 top-1/4 w-20 xl:w-28 2xl:w-32 opacity-90 transition-all duration-500">
        <img
          src={ribbonSrc}
          alt={`${resolvedColor} Botanical Silk Ribbon`}
          className="w-full h-auto object-contain drop-shadow-lg transform scale-x-[-1] rotate-6 hover:rotate-0 transition-transform duration-500"
        />
      </div>
    </div>
  );
}

/**
 * Featured Section Column Ribbon Card (Home Page)
 */
export function RibbonColumnCard({ type = 'left' }) {
  const isLeft = type === 'left';
  return (
    <div className="hidden xl:flex flex-col items-center justify-center p-4 bg-stone-50/60 dark:bg-stone-900/30 border border-stone-line/60 rounded-sm h-full text-center space-y-3">
      <div className="w-16 xl:w-24 h-auto overflow-hidden">
        <img
          src={isLeft ? "/images/ribbon.png" : "/images/ribbon2.png"}
          alt="Artisanal Silk Ribbon"
          className="w-full h-auto object-contain drop-shadow-md transform hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div>
        <span className="font-instrument text-base font-bold text-charcoal block">
          Artisan Silk Wrap
        </span>
        <span className="font-sans text-[9px] uppercase tracking-wider text-warm-neutral block mt-0.5">
          Signature Crimson Finish
        </span>
      </div>
    </div>
  );
}
