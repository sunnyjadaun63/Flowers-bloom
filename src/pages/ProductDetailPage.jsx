import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { 
  ArrowLeft, 
  Heart, 
  ShoppingCart, 
  MapPin, 
  Calendar, 
  Star, 
  Check, 
  Plus, 
  Minus,
  Sparkles,
  Info
} from 'lucide-react';

const upsellsList = [
  { id: "up-vase", name: "Artisanal Frosted Glass Vase", price: 25, image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&q=80&w=300" },
  { id: "up-candle", name: "Sage & Lavender Scented Candle", price: 18, image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=300" },
  { id: "up-choc", name: "Luxury Belgian Chocolates Box", price: 15, image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&q=80&w=300" }
];

export default function ProductDetailPage() {
  const { id } = useParams();
  const { 
    addToCart, 
    wishlist, 
    toggleWishlist, 
    zipCode, 
    isZipVerified, 
    deliveryDate,
    verifyZipCode,
    setDeliveryDate 
  } = useCart();

  const product = products.find(p => p.id === id || p.productCode === id);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-6">
        <p className="font-serif text-xl text-charcoal">Design not found</p>
        <p className="font-sans text-xs text-warm-neutral">This specific floral design is currently unavailable.</p>
        <Link to="/" className="inline-block bg-botanical text-white px-6 py-2 text-xs uppercase tracking-widest font-semibold rounded-sm">
          Return to Home
        </Link>
      </div>
    );
  }

  // State Management
  const [activeImage, setActiveImage] = useState(product.images[0]);
  const [qty, setQty] = useState(1);
  const [selectedUpsells, setSelectedUpsells] = useState([]);
  const [giftMessage, setGiftMessage] = useState('');
  const [tempZip, setTempZip] = useState(zipCode);
  const [tempDate, setTempDate] = useState(deliveryDate);
  const [zipVerifiedMsg, setZipVerifiedMsg] = useState('');
  const [activeTab, setActiveTab] = useState('description');

  const isWishlisted = wishlist.includes(product.id);
  const giftMessageLimit = 200;

  // Sync state if context zip changes
  useEffect(() => {
    setTempZip(zipCode);
  }, [zipCode]);

  useEffect(() => {
    setTempDate(deliveryDate);
  }, [deliveryDate]);

  // Image viewer sync
  useEffect(() => {
    setActiveImage(product.images[0]);
  }, [product]);

  const handleZipVerify = (e) => {
    e.preventDefault();
    const isOK = verifyZipCode(tempZip);
    if (isOK) {
      if (tempDate) setDeliveryDate(tempDate);
      setZipVerifiedMsg(`Delivery is available for ZIP ${tempZip}!`);
    } else {
      setZipVerifiedMsg('Invalid ZIP code. Please enter 5 digits.');
    }
  };

  const handleUpsellToggle = (upsell) => {
    setSelectedUpsells((prev) => {
      const exists = prev.some(item => item.id === upsell.id);
      if (exists) {
        return prev.filter(item => item.id !== upsell.id);
      } else {
        return [...prev, { name: upsell.name, price: upsell.price }];
      }
    });
  };

  const handleAddToCart = () => {
    addToCart(product, qty, selectedUpsells, giftMessage);
    // Reset inputs after adding
    setGiftMessage('');
    setSelectedUpsells([]);
    setQty(1);
  };

  // Calculate prices
  const upsellsTotal = selectedUpsells.reduce((acc, item) => acc + item.price, 0);
  const singleItemPrice = product.price + upsellsTotal;
  const totalPrice = singleItemPrice * qty;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-left space-y-12 animate-in fade-in duration-300">
      
      {/* Return link */}
      <Link to="/shop/all" className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-widest font-semibold text-botanical hover:text-terracotta transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Return to Catalog</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Side: Thumbnail list and main image viewer */}
        <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex md:flex-col gap-3 justify-center md:justify-start">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`w-16 h-16 sm:w-20 sm:h-20 bg-stone-100 border rounded-sm overflow-hidden flex-shrink-0 transition-all ${
                  activeImage === img ? 'border-botanical ring-1 ring-botanical' : 'border-stone-line hover:border-warm-neutral'
                }`}
              >
                <img 
                  src={img} 
                  alt={`${product.name} preview ${idx + 1}`} 
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&q=80&w=800";
                  }}
                  className="w-full h-full object-cover" 
                />
              </button>
            ))}
          </div>

          {/* Main Display Viewer */}
          <div className="flex-1 aspect-[4/3] bg-stone-100 border border-stone-line rounded-sm overflow-hidden relative">
            <img 
              src={activeImage} 
              alt={product.name} 
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&q=80&w=800";
              }}
              className="w-full h-full object-cover transition-all duration-300"
            />
            {product.isBestSeller && (
              <span className="absolute top-4 left-4 bg-botanical text-white text-[9px] uppercase tracking-widest px-3 py-1 font-semibold rounded-xs">
                Best Seller
              </span>
            )}
          </div>
        </div>

        {/* Right Side: Product configuration details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-warm-neutral uppercase tracking-widest font-semibold">
              <span>{product.category}</span>
              <span className="font-mono text-xs font-bold text-charcoal bg-stone-100 border border-stone-line/80 px-2.5 py-0.5 rounded-xs">
                Product Code: {product.productCode || product.id}
              </span>
              {/* Stems commented out per request */}
              {/* <span>{product.stemCount} premium stems</span> */}
            </div>
            
            <h1 className="font-serif text-3xl sm:text-4xl text-charcoal font-semibold leading-tight">
              <span className="font-mono text-xl sm:text-2xl text-botanical font-bold mr-2">[{product.productCode || product.id}]</span>
              {product.name}
            </h1>

            {/* Ratings and Stock */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-xs text-charcoal font-semibold">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 mr-1" />
                <span>{product.rating.toFixed(1)} / 5.0 Rating</span>
              </div>
              <span className="text-stone-line">|</span>
              <span className={`text-xs font-semibold uppercase tracking-wider ${product.inStock ? 'text-botanical' : 'text-red-500'}`}>
                {product.inStock ? 'Freshly Harvested (In Stock)' : 'Out of Stock'}
              </span>
            </div>
          </div>

          {/* Base Price and Description */}
          <div className="border-y border-stone-line py-5 flex items-baseline justify-between">
            <span className="text-xl font-bold font-sans text-botanical uppercase tracking-wider bg-stone-100 px-3.5 py-1.5 rounded-full">Coming Soon</span>
            <span className="text-xs text-warm-neutral">Complimentary delivery wrapping included</span>
          </div>

          {/* Editorial Tabs */}
          <div className="space-y-4">
            <div className="flex border-b border-stone-line text-xs font-semibold uppercase tracking-wider text-warm-neutral">
              <button
                onClick={() => setActiveTab('description')}
                className={`pb-2.5 mr-6 border-b-2 transition-all ${
                  activeTab === 'description' ? 'text-botanical border-botanical' : 'border-transparent hover:text-charcoal'
                }`}
              >
                Story
              </button>
              <button
                onClick={() => setActiveTab('care')}
                className={`pb-2.5 border-b-2 transition-all ${
                  activeTab === 'care' ? 'text-botanical border-botanical' : 'border-transparent hover:text-charcoal'
                }`}
              >
                Flower Care
              </button>
            </div>

            {activeTab === 'description' ? (
              <p className="font-sans text-xs text-warm-neutral leading-relaxed">
                {product.description}
              </p>
            ) : (
              <ul className="list-disc pl-5 text-xs text-warm-neutral space-y-2 font-sans">
                {product.careInstructions.map((ins, idx) => (
                  <li key={idx} className="leading-relaxed">{ins}</li>
                ))}
              </ul>
            )}
          </div>

          {/* ZIP Code Checker Area */}
          {/* <div className="bg-white border border-stone-line p-4 rounded-sm space-y-3">
            <h4 className="font-serif text-xs font-bold text-charcoal flex items-center">
              <MapPin className="w-4 h-4 text-botanical mr-1.5" />
              <span>Verify Local Delivery Availability</span>
            </h4>
            
            <form onSubmit={handleZipVerify} className="flex gap-2">
              <input 
                type="text" 
                maxLength={5}
                value={tempZip}
                onChange={(e) => setTempZip(e.target.value)}
                placeholder="ZIP Code" 
                className="bg-canvas border border-stone-line px-3 py-2 text-xs font-sans focus:outline-none focus:border-botanical text-charcoal rounded-sm w-28"
              />
              <input 
                type="date" 
                min={new Date().toISOString().split('T')[0]}
                value={tempDate}
                onChange={(e) => setTempDate(e.target.value)}
                className="bg-canvas border border-stone-line px-3 py-2 text-xs font-sans focus:outline-none focus:border-botanical text-charcoal rounded-sm flex-1"
              />
              <button 
                type="submit"
                className="bg-botanical text-white hover:bg-opacity-90 px-4 py-2 text-xs uppercase tracking-widest font-semibold rounded-sm transition-all"
              >
                Verify
              </button>
            </form>

            {zipVerifiedMsg && (
              <p className={`text-[10px] font-semibold font-sans flex items-center ${
                isZipVerified ? 'text-botanical' : 'text-red-500'
              }`}>
                <Info className="w-3 h-3 mr-1" />
                <span>{zipVerifiedMsg}</span>
              </p>
            )}
          </div> */}

          {/* Upsells checkcards (Commented out per request) */}
          {/* <div className="space-y-3">
            <span className="block text-[10px] uppercase tracking-wider font-semibold text-warm-neutral">
              Upsell Enhancements (Optional)
            </span>
            <div className="space-y-2">
              {upsellsList.map((item) => {
                const isSelected = selectedUpsells.some(up => up.name === item.name);
                return (
                  <div
                    key={item.id}
                    onClick={() => handleUpsellToggle(item)}
                    className={`flex items-center space-x-4 p-3 bg-white border rounded-sm cursor-pointer hover:border-botanical transition-all ${
                      isSelected ? 'border-botanical ring-1 ring-botanical/20' : 'border-stone-line/75'
                    }`}
                  >
                    <div className="w-10 h-10 bg-stone-100 rounded-sm overflow-hidden border border-stone-line flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&q=80&w=300";
                        }}
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="font-serif text-[13px] text-charcoal font-semibold truncate">{item.name}</h5>
                      <span className="font-sans text-[10px] font-bold text-botanical uppercase tracking-wider">Coming Soon</span>
                    </div>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                      isSelected ? 'bg-botanical border-botanical text-white' : 'border-stone-line bg-canvas'
                    }`}>
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div> */}

          {/* Gift Message Generator */}
          {/* <div className="bg-white border border-stone-line p-4 rounded-sm space-y-2">
            <div className="flex justify-between items-baseline">
              <label className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal">
                Handwritten Gift Message
              </label>
              <span className="text-[9px] text-warm-neutral">
                {giftMessage.length} / {giftMessageLimit} chars
              </span>
            </div>
            <textarea
              value={giftMessage}
              onChange={(e) => setGiftMessage(e.target.value.substring(0, giftMessageLimit))}
              placeholder="Write a sweet card message here..."
              rows={3}
              className="w-full bg-canvas border border-stone-line p-3 text-xs font-sans focus:outline-none focus:border-botanical text-charcoal rounded-sm resize-none"
            />
          </div> */}

          {/* CTA Add-To-Cart & Quantity Picker */}
          {/* {product.inStock ? (
            <div className="flex space-x-3 pt-2">
              <div className="flex items-center border border-stone-line bg-canvas rounded-sm">
                <button
                  onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                  className="px-3.5 py-3 text-warm-neutral hover:text-charcoal transition-colors focus:outline-none"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3 text-sm font-semibold font-sans text-charcoal min-w-[24px] text-center">
                  {qty}
                </span>
                <button
                  onClick={() => setQty((prev) => prev + 1)}
                  className="px-3.5 py-3 text-warm-neutral hover:text-charcoal transition-colors focus:outline-none"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 bg-terracotta hover:bg-opacity-95 text-white py-3 px-6 text-xs uppercase tracking-widest font-semibold flex items-center justify-center space-x-2 rounded-xs shadow-md transition-all focus:outline-none"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart • Coming Soon</span>
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className="p-3 border border-stone-line rounded-sm hover:border-botanical hover:bg-stone-50 transition-all flex items-center justify-center"
                aria-label="Wishlist Toggle"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-terracotta text-terracotta' : 'text-charcoal'}`} />
              </button>
            </div>
          ) : (
            <div className="bg-stone-100 border border-stone-line p-4 text-center rounded-sm">
              <span className="font-serif text-sm font-semibold text-warm-neutral">This display is currently out of stock</span>
            </div>
          )} */}

          {/* Direct Atelier Inquiry Button & Wishlist */}
          <div className="flex space-x-3 pt-2">
            <Link
              to="/contact"
              className="flex-1 bg-[#1B3B2B] hover:bg-black text-white py-3 px-6 text-xs uppercase tracking-widest font-semibold flex items-center justify-center space-x-2 rounded-xs shadow-md transition-all focus:outline-none"
            >
              <span>Inquire / Reserve Design</span>
            </Link>

            <button
              onClick={() => toggleWishlist(product.id)}
              className="p-3 border border-stone-line rounded-sm hover:border-botanical hover:bg-stone-50 transition-all flex items-center justify-center"
              aria-label="Wishlist Toggle"
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-terracotta text-terracotta' : 'text-charcoal'}`} />
            </button>
          </div>

          {/* Guarantees Box */}
          <div className="text-[10px] text-warm-neutral font-sans flex items-center space-x-1.5 justify-center py-2 bg-stone-50/50 rounded-sm border border-stone-line/50">
            <Sparkles className="w-3.5 h-3.5 text-terracotta" />
            <span>Includes 7-Day Freshness Guarantee & complimentary flower food.</span>
          </div>

        </div>

      </div>
    </div>
  );
}
