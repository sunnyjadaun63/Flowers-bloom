import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { Sparkles, ArrowRight, ShieldCheck, Truck, Gift, Globe } from 'lucide-react';

const categories = [
  {
    name: "Premium Roses",
    tagline: "Double-petal luxury garden roses",
    image: "/images/bouquets/alabaster-rose-bouquet.jpg",
    path: "roses"
  },
  {
    name: "Hand-Tied Bouquets",
    tagline: "Artisanal European wrapping",
    image: "/images/bouquets/midnight-violet-bouquet.jpg",
    path: "bouquets"
  },
  {
    name: "Seasonal Blooms",
    tagline: "Sunlit harvest arrangements",
    image: "/images/bouquets/saffron-lily-bouquet.jpg",
    path: "seasonal"
  },
  {
    name: "Plants & Gift Hampers",
    tagline: "Eco-conscious office aesthetics",
    image: "/images/bouquets/botanical-hamper-candle.jpg",
    path: "plants-baskets"
  }
];

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function Home() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [videoOpacity, setVideoOpacity] = useState(0);

  // Custom Fade-in / Fade-out loop logic using requestAnimationFrame
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let animationFrameId;

    const checkTimeAndFade = () => {
      if (video.duration && !isNaN(video.duration)) {
        const currentTime = video.currentTime;
        const duration = video.duration;
        const fadeDuration = 0.5; // 0.5s fade

        if (currentTime < fadeDuration) {
          // Fade in over 0.5s at start (opacity 0 to 1)
          setVideoOpacity(currentTime / fadeDuration);
        } else if (currentTime > duration - fadeDuration) {
          // Fade out over 0.5s before the end (opacity 1 to 0)
          setVideoOpacity(Math.max(0, (duration - currentTime) / fadeDuration));
        } else {
          setVideoOpacity(1);
        }
      }
      animationFrameId = requestAnimationFrame(checkTimeAndFade);
    };

    const handleEnded = () => {
      setVideoOpacity(0);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.play().catch(() => {});
        }
      }, 100);
    };

    video.addEventListener('ended', handleEnded);
    animationFrameId = requestAnimationFrame(checkTimeAndFade);

    video.play().catch(() => {});

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (video) {
        video.removeEventListener('ended', handleEnded);
      }
    };
  }, []);

  // Get best sellers to display in the featured grid
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);

  return (
    <div className="space-y-24 pb-20 bg-white">
      
      {/* 1. Full-Screen Full-Width Cinematic Video Hero Section */}
      <section className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 border-b border-stone-line">
        
        {/* Full Space Full-Width Full-Screen Background Video Layer */}
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
          <video
            ref={videoRef}
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4"
            muted
            playsInline
            className="w-full h-full object-cover transition-opacity duration-300 ease-out"
            style={{ opacity: videoOpacity }}
          />
          {/* Subtle Ambient Glass & Gradient Overlay to make flower gifting text pop */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/40 to-white/95 pointer-events-none" />
        </div>

        {/* Hero Content Layer (Gifting & Flower Atelier) */}
        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center justify-center py-20">
          
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 text-[11px] uppercase tracking-widest font-semibold text-charcoal bg-white/80 backdrop-blur-md border border-stone-line px-4 py-1.5 rounded-full mb-6 shadow-xs animate-fade-rise">
            <Sparkles className="w-3.5 h-3.5 text-[#C86D51]" />
            <span>Artisan Floral Atelier & Luxury Gift Hampers</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-normal font-instrument leading-[0.95] tracking-[-2px] text-[#000000] animate-fade-rise max-w-4xl">
            Sculpted by <span className="italic text-[#1B3B2B]">nature,</span> delivered in <span className="italic text-[#6F6F6F]">eternal bloom.</span>
          </h1>

          {/* Floral & Gifting Description */}
          <p className="text-base sm:text-lg max-w-2xl mt-6 leading-relaxed text-[#4A4A4A] animate-fade-rise-delay font-sans">
            Sourcing double-petal garden roses, seasonal wildflowers, and bespoke gift hampers directly from certified sustainable farms. Hand-tied in European craft wrap with same-day white-glove delivery.
          </p>

          {/* Hero CTA Button Group */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-10 animate-fade-rise-delay-2">
            <Link
              to="/shop/all"
              className="rounded-full px-10 py-4 text-sm bg-[#000000] text-[#FFFFFF] hover:scale-[1.03] active:scale-95 transition-transform duration-200 font-medium inline-flex items-center justify-center shadow-lg"
            >
              Shop Hand-Tied Bouquets
            </Link>
            
            <Link
              to="/corporate"
              className="rounded-full px-8 py-4 text-sm bg-white/90 backdrop-blur-md border border-stone-line text-charcoal hover:bg-white hover:scale-[1.03] active:scale-95 transition-all duration-200 font-medium inline-flex items-center justify-center shadow-xs"
            >
              Curated Gift Hampers
            </Link>
          </div>

          {/* Trust Value Badges */}
          <div className="pt-12 mt-12 grid grid-cols-3 gap-6 sm:gap-16 text-center max-w-2xl border-t border-stone-line/60 animate-fade-rise-delay-2">
            <div>
              <span className="block font-instrument text-2xl sm:text-3xl font-bold text-[#000000]">100%</span>
              <span className="text-[10px] uppercase tracking-wider text-[#6F6F6F] font-semibold">Eco Sustainable</span>
            </div>
            <div>
              <span className="block font-instrument text-2xl sm:text-3xl font-bold text-[#000000]">Same-Day</span>
              <span className="text-[10px] uppercase tracking-wider text-[#6F6F6F] font-semibold">Hand Delivery</span>
            </div>
            <div>
              <span className="block font-instrument text-2xl sm:text-3xl font-bold text-[#000000]">7-Day</span>
              <span className="text-[10px] uppercase tracking-wider text-[#6F6F6F] font-semibold">Fresh Guarantee</span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Value Propositions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10 px-8 bg-white border border-stone-line rounded-sm shadow-xs">
          
          <div className="flex flex-col items-center text-center p-4 space-y-3">
            <div className="w-12 h-12 bg-stone-50 border border-stone-line rounded-full flex items-center justify-center text-charcoal">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="font-instrument text-2xl text-[#000000] font-semibold">Same-Day Hand Delivery</h3>
            <p className="font-sans text-xs text-[#6F6F6F] leading-relaxed max-w-xs">
              Every arrangement is delivered by hand in climate-controlled vehicles by trained couriers. Never boxed, never crushed.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-4 border-y md:border-y-0 md:border-x border-stone-line space-y-3">
            <div className="w-12 h-12 bg-stone-50 border border-stone-line rounded-full flex items-center justify-center text-charcoal">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-instrument text-2xl text-[#000000] font-semibold">7-Day Freshness Guarantee</h3>
            <p className="font-sans text-xs text-[#6F6F6F] leading-relaxed max-w-xs">
              We stand by our stems. If your flowers do not stay vibrant for at least seven days, we will replace them complimentary.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-4 space-y-3">
            <div className="w-12 h-12 bg-stone-50 border border-stone-line rounded-full flex items-center justify-center text-charcoal">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="font-instrument text-2xl text-[#000000] font-semibold">Certified Sustainable Stems</h3>
            <p className="font-sans text-xs text-[#6F6F6F] leading-relaxed max-w-xs">
              Direct-from-farm cold chain sourcing. Fair trade certified, zero floral foam, and 100% biodegradable craft packaging.
            </p>
          </div>

        </div>
      </section>

      {/* 3. Category Showcase Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-stone-line">
          <div>
            <span className="text-[10px] uppercase tracking-widest font-semibold text-warm-neutral">Curated Collections</span>
            <h2 className="font-instrument text-3xl sm:text-4xl text-[#000000] mt-1 font-bold">Shop by Botanical Style</h2>
          </div>
          <Link 
            to="/shop/all"
            className="inline-flex items-center space-x-1 text-xs uppercase tracking-widest font-semibold text-charcoal hover:opacity-75 transition-colors mt-4 md:mt-0"
          >
            <span>Explore All 30 Stems</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.path}
              to={`/shop/${cat.path}`}
              className="group flex flex-col bg-white border border-stone-line rounded-sm overflow-hidden hover:border-charcoal/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="aspect-[4/3] bg-stone-100 overflow-hidden relative">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors duration-300" />
              </div>
              <div className="p-5 text-left flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-instrument text-2xl font-bold text-charcoal group-hover:opacity-80 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="font-sans text-xs text-warm-neutral mt-1">
                    {cat.tagline}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-line/50 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-charcoal">
                  <span>View Stems</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Best Sellers & Seasonal Favorites */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-stone-line">
          <div>
            <span className="text-[10px] uppercase tracking-widest font-semibold text-warm-neutral">The Atelier Signatures</span>
            <h2 className="font-instrument text-3xl sm:text-4xl text-[#000000] mt-1 font-bold">Best Sellers & Seasonal Icons</h2>
          </div>
          <Link 
            to="/shop/best-sellers"
            className="inline-flex items-center space-x-1 text-xs uppercase tracking-widest font-semibold text-charcoal hover:opacity-75 transition-colors mt-4 md:mt-0"
          >
            <span>View All Signatures</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. Shop by Occasion Grid */}
      <section className="bg-stone-50/70 border-y border-stone-line py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-[10px] uppercase tracking-widest font-semibold text-warm-neutral">Curated Sentiment</span>
            <h2 className="font-instrument text-3xl sm:text-4xl text-[#000000] mt-1 font-bold">Artisan Florals by Occasion</h2>
            <p className="font-sans text-xs text-warm-neutral mt-2">
              Every arrangement is handcrafted to express the nuances of life's pivotal moments.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: "Romance", path: "romance-and-valentines-day", img: "/images/bouquets/crimson-rose-bouquet.jpg" },
              { name: "Birthday", path: "birthday", img: "/images/bouquets/pink-peony-bouquet.jpg" },
              { name: "Anniversary", path: "anniversary", img: "/images/bouquets/alabaster-rose-bouquet.jpg" },
              { name: "Sympathy", path: "sympathy-and-funeral", img: "/images/bouquets/midnight-violet-bouquet.jpg" },
              { name: "Thank You", path: "thank-you", img: "/images/bouquets/saffron-lily-bouquet.jpg" },
              { name: "Congratulations", path: "congratulations", img: "/images/bouquets/golden-sunflower-bouquet.jpg" }
            ].map((item) => (
              <Link
                key={item.path}
                to={`/occasion/${item.path}`}
                className="group relative bg-white border border-stone-line rounded-sm overflow-hidden p-4 flex flex-col items-center justify-between text-center hover:border-charcoal hover:shadow-md transition-all duration-200"
              >
                <div className="w-16 h-16 rounded-full overflow-hidden mb-3 border border-stone-line bg-stone-100">
                  <img 
                    src={item.img} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <span className="font-instrument text-base font-bold text-charcoal group-hover:opacity-80 transition-colors">
                  {item.name}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-warm-neutral mt-1">Curated Stems</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Birth Month Interactive Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-900 text-white p-8 sm:p-12 rounded-sm border border-stone-800 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl text-left">
            <span className="text-[10px] uppercase tracking-widest font-semibold text-stone-400">Botanical Astrology</span>
            <h2 className="font-instrument text-3xl sm:text-5xl font-normal mt-1 leading-tight text-white">
              Discover Your Official Birth Month Flower
            </h2>
            <p className="font-sans text-xs sm:text-sm text-stone-300 mt-3 leading-relaxed">
              Every month is represented by a sacred botanical species with historic symbolic lore. Select your birth month to explore our dedicated arrangements.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {months.map((m) => (
                <button
                  key={m}
                  onClick={() => navigate(`/month/${m.toLowerCase()}`)}
                  className="bg-stone-800/80 hover:bg-white hover:text-charcoal border border-stone-700 text-stone-200 text-xs px-3.5 py-1.5 rounded-full transition-all duration-150 font-sans"
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Florist Philosophy & Sustainability */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white border border-stone-line p-8 sm:p-12 rounded-sm">
          <div className="space-y-6 text-left">
            <span className="text-[10px] uppercase tracking-widest font-semibold text-warm-neutral">Our Studio Craft</span>
            <h2 className="font-instrument text-3xl sm:text-5xl text-[#000000] font-normal leading-tight">
              The Architecture of Living Blooms
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#6F6F6F] leading-relaxed">
              We reject the industrial floral model of mass-produced, foam-stuffed arrangements. Every stem in our atelier is hand-selected at peak harvest from certified organic growers. 
            </p>
            <p className="font-sans text-xs sm:text-sm text-[#6F6F6F] leading-relaxed">
              Packaged in custom heavyweight recyclable craft paper with raw silk ribbons, our floral designs preserve the organic movement and sculptural elegance of nature.
            </p>
            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-bold text-charcoal hover:opacity-75 transition-colors"
              >
                <span>Read Our Sourcing Standard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="aspect-[4/3] bg-stone-100 rounded-sm overflow-hidden border border-stone-line">
            <img
              src="/images/bouquets/alabaster-rose-bouquet.jpg"
              alt="Sustainable flower farm greenhouse"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

    </div>
  );
}
