import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Star, 
  CheckCircle2, 
  ThumbsUp, 
  Search, 
  SlidersHorizontal, 
  Plus, 
  X, 
  ArrowLeft, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  Award, 
  Camera, 
  RotateCcw,
  Check
} from 'lucide-react';
import { ShopPageRibbons } from '../components/DecorativeRibbon';
import { 
  reviewStats, 
  reviewCategories, 
  initialReviews, 
  customerSpotlights 
} from '../data/reviewsData';

export default function ReviewsPage() {
  // State for all reviews (initial + locally created)
  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem('handal_patron_reviews');
      if (saved) {
        const parsed = JSON.parse(saved);
        return [...parsed, ...initialReviews];
      }
    } catch {
      // Fallback
    }
    return initialReviews;
  });

  // Track which reviews this visitor marked helpful
  const [helpfulVoted, setHelpfulVoted] = useState(() => {
    try {
      const saved = localStorage.getItem('handal_helpful_votes');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Filter and Sort states
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all'); // 'all', '5', '4', etc.
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'highest', 'helpful', 'photos'
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);

  // Reset visible count whenever filters or sorting change
  useEffect(() => {
    setVisibleCount(12);
  }, [selectedCategory, selectedRating, searchQuery, sortBy, verifiedOnly]);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Form states
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formLocation, setFormLocation] = useState('');
  const [formRating, setFormRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [formCategory, setFormCategory] = useState('bouquets');
  const [formProduct, setFormProduct] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [formComment, setFormComment] = useState('');
  const [formImageOption, setFormImageOption] = useState('');
  const [formRecommend, setFormRecommend] = useState(true);

  // Available preview images users can attach to review
  const availableReviewImages = [
    { label: 'None', url: '' },
    { label: 'Alabaster Roses', url: '/images/bouquets/alabaster-rose-bouquet.jpg' },
    { label: 'Pink Peonies', url: '/images/bouquets/pink-peony-bouquet.jpg' },
    { label: 'Midnight Violet', url: '/images/bouquets/midnight-violet-bouquet.jpg' },
    { label: 'Wedding Ceremony', url: '/images/events/wedding-ceremony.jpg' },
    { label: 'Baby Shower Setup', url: '/images/events/baby-shower.jpg' }
  ];

  const ratingDescriptions = {
    1: 'Unsatisfactory — Not what was expected',
    2: 'Fair — Room for improvement',
    3: 'Good — Met standard expectations',
    4: 'Very Good — Highly enjoyable floral experience',
    5: 'Exceptional — Pure luxury and perfection'
  };

  const handleHelpfulClick = (reviewId) => {
    if (helpfulVoted.includes(reviewId)) return;

    const newVoted = [...helpfulVoted, reviewId];
    setHelpfulVoted(newVoted);
    try {
      localStorage.setItem('handal_helpful_votes', JSON.stringify(newVoted));
    } catch {
      // ignore storage error
    }

    setReviews(prev =>
      prev.map(r => r.id === reviewId ? { ...r, helpfulCount: (r.helpfulCount || 0) + 1 } : r)
    );
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!formName.trim() || !formTitle.trim() || !formComment.trim()) return;

    // Generate initials
    const initials = formName
      .trim()
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'HP';

    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });

    const newReview = {
      id: `user-rev-${Date.now()}`,
      author: formName.trim(),
      location: formLocation.trim() || 'Verified Client',
      avatarInitials: initials,
      date: formattedDate,
      rating: Number(formRating),
      title: formTitle.trim(),
      comment: formComment.trim(),
      category: formCategory,
      productPurchased: formProduct.trim() || 'Handal Custom Arrangement',
      verifiedBuyer: true,
      helpfulCount: 0,
      image: formImageOption || null,
      tags: ['Verified Patron', 'New Review'],
      isUserCreated: true
    };

    // Save to local storage
    try {
      const existingUserReviews = JSON.parse(localStorage.getItem('handal_patron_reviews') || '[]');
      const updatedUserReviews = [newReview, ...existingUserReviews];
      localStorage.setItem('handal_patron_reviews', JSON.stringify(updatedUserReviews));
    } catch {
      // storage fallback
    }

    // Prepend to active reviews state
    setReviews(prev => [newReview, ...prev]);
    setSubmitSuccess(true);

    // Reset form after 1.8s
    setTimeout(() => {
      setSubmitSuccess(false);
      setIsModalOpen(false);
      setFormName('');
      setFormEmail('');
      setFormLocation('');
      setFormRating(5);
      setFormTitle('');
      setFormComment('');
      setFormProduct('');
      setFormImageOption('');
    }, 1500);
  };

  // Filter and sort reviews
  const filteredReviews = useMemo(() => {
    return reviews.filter(rev => {
      // Category match
      if (selectedCategory !== 'all' && rev.category !== selectedCategory) {
        return false;
      }
      // Rating match
      if (selectedRating !== 'all' && rev.rating !== Number(selectedRating)) {
        return false;
      }
      // Verified only
      if (verifiedOnly && !rev.verifiedBuyer) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesAuthor = rev.author?.toLowerCase().includes(query);
        const matchesTitle = rev.title?.toLowerCase().includes(query);
        const matchesComment = rev.comment?.toLowerCase().includes(query);
        const matchesProduct = rev.productPurchased?.toLowerCase().includes(query);
        const matchesLocation = rev.location?.toLowerCase().includes(query);

        if (!matchesAuthor && !matchesTitle && !matchesComment && !matchesProduct && !matchesLocation) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'highest') {
        return b.rating - a.rating;
      }
      if (sortBy === 'helpful') {
        return (b.helpfulCount || 0) - (a.helpfulCount || 0);
      }
      if (sortBy === 'photos') {
        const aHasPic = a.image ? 1 : 0;
        const bHasPic = b.image ? 1 : 0;
        return bHasPic - aHasPic;
      }
      // 'newest' default
      if (a.isUserCreated && !b.isUserCreated) return -1;
      if (!a.isUserCreated && b.isUserCreated) return 1;
      return 0;
    });
  }, [reviews, selectedCategory, selectedRating, searchQuery, sortBy, verifiedOnly]);

  const resetAllFilters = () => {
    setSelectedCategory('all');
    setSelectedRating('all');
    setSearchQuery('');
    setSortBy('newest');
    setVerifiedOnly(false);
    setVisibleCount(12);
  };

  const hasActiveFilters = 
    selectedCategory !== 'all' || 
    selectedRating !== 'all' || 
    searchQuery.trim() !== '' || 
    verifiedOnly || 
    sortBy !== 'newest';

  return (
    <div className="relative min-h-screen bg-canvas text-charcoal pb-24">
      {/* Decorative Ribbon Cutouts */}
      <ShopPageRibbons color="green" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between border-b border-stone-line pb-4">
          <Link 
            to="/" 
            className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-widest font-semibold text-warm-neutral hover:text-botanical transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Atelier</span>
          </Link>
          <div className="text-[11px] uppercase tracking-wider font-medium text-warm-neutral">
            <span>Verified Customer Reviews</span>
          </div>
        </div>

        {/* Page Hero Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 text-[11px] font-bold uppercase tracking-widest text-[#ff0074] bg-pink-50/70 border border-pink-200/60 px-3 py-1 rounded-full mb-3 shadow-xs">
              <Sparkles className="w-3 h-3 text-[#ff0074]" />
              <span>Patron Experiences & Stories</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-normal font-instrument tracking-tight text-charcoal leading-tight">
              Stories in <span className="italic text-botanical">Full Bloom.</span>
            </h1>
            <p className="font-sans text-xs sm:text-sm text-warm-neutral mt-3 leading-relaxed max-w-2xl">
              Authentic reviews from over 2,400+ couples, hosts, corporate desks, and flower lovers who celebrate life’s milestones with Handal Flowers & Events.
            </p>
          </div>

          {/* <button
            onClick={() => setIsModalOpen(true)}
            className="self-start md:self-auto inline-flex items-center space-x-2 rounded-full px-7 py-3.5 text-xs bg-charcoal text-white hover:bg-botanical transition-all duration-200 font-semibold shadow-md tracking-wider uppercase"
          >
            <Plus className="w-4 h-4" />
            <span>Write a Review</span>
          </button> */}
        </div>

        {/* Rating Summary & Trust Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-card border border-stone-line p-6 sm:p-8 rounded-sm shadow-xs">
          
          {/* Left: Overall Score Metric */}
          <div className="lg:col-span-4 flex flex-col justify-center items-center text-center p-4 border-b lg:border-b-0 lg:border-r border-stone-line">
            <span className="font-instrument text-6xl sm:text-7xl font-bold text-charcoal leading-none">
              {reviewStats.averageRating}
            </span>
            <div className="flex items-center space-x-1 mt-3 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <p className="font-sans text-xs font-semibold text-charcoal mt-2">
              Based on {reviewStats.totalReviews.toLocaleString()} verified patrons
            </p>
            <p className="font-sans text-[11px] text-warm-neutral mt-1">
              99% of customers recommend our arrangements
            </p>
          </div>

          {/* Middle: Interactive Star Breakdown */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-2.5 px-0 sm:px-4">
            <span className="text-[10px] uppercase font-bold tracking-widest text-warm-neutral mb-1">
              Rating Distribution (Click to filter)
            </span>
            {reviewStats.ratingBreakdown.map((item) => (
              <button
                key={item.stars}
                onClick={() => setSelectedRating(selectedRating === String(item.stars) ? 'all' : String(item.stars))}
                className={`w-full flex items-center space-x-3 text-xs text-left group transition-opacity ${
                  selectedRating !== 'all' && selectedRating !== String(item.stars) ? 'opacity-40' : 'opacity-100'
                }`}
              >
                <div className="flex items-center space-x-1 w-14 font-medium text-charcoal">
                  <span>{item.stars}</span>
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                </div>
                <div className="flex-1 h-2 bg-stone-100 rounded-full overflow-hidden border border-stone-line">
                  <div
                    className="h-full bg-amber-500 transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <span className="w-10 text-right text-[11px] text-warm-neutral font-medium">
                  {item.percentage}%
                </span>
              </button>
            ))}
          </div>

          {/* Right: Guarantee & Quality Pillars */}
          <div className="lg:col-span-3 flex flex-col justify-between space-y-4 pt-4 lg:pt-0 lg:pl-4 border-t lg:border-t-0 border-stone-line text-left">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-emerald-800 shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-charcoal">100% Verified Patrons</h4>
                <p className="text-[11px] text-warm-neutral mt-0.5">Direct from verified shop & event orders.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-stone-50 border border-stone-line flex items-center justify-center text-charcoal shrink-0">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-charcoal">{reviewStats.onTimeDeliveryRate} On-Time Delivery</h4>
                <p className="text-[11px] text-warm-neutral mt-0.5">Hand-delivered in temperature control.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-800 shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-charcoal">7-Day Fresh Guarantee</h4>
                <p className="text-[11px] text-warm-neutral mt-0.5">Complimentary replacement promise.</p>
              </div>
            </div>
          </div>

        </div>

        {/* Visual Patron Spotlight / Gallery */}
        <section className="space-y-4">
          <div className="flex items-end justify-between border-b border-stone-line pb-3">
            <div>
              <span className="text-[10px] uppercase tracking-widest font-semibold text-warm-neutral">Visual Stories</span>
              <h2 className="font-instrument text-2xl sm:text-3xl font-bold text-charcoal mt-0.5">
                Community in Bloom
              </h2>
            </div>
            <span className="text-[11px] text-warm-neutral hidden sm:block">
              Moments captured by verified patrons & hosts
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {customerSpotlights.map((spot) => (
              <div
                key={spot.id}
                className="group relative bg-card border border-stone-line rounded-sm overflow-hidden shadow-xs flex flex-col"
              >
                <div className="aspect-[4/3] bg-stone-100 overflow-hidden relative">
                  <img
                    src={spot.image}
                    alt={spot.occasion}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                  <span className="absolute bottom-2 left-2 text-[10px] uppercase font-bold tracking-wider text-white bg-black/40 px-2 py-0.5 rounded-xs backdrop-blur-xs">
                    {spot.occasion}
                  </span>
                </div>
                <div className="p-3.5 flex-1 flex flex-col justify-between text-left">
                  <p className="font-sans text-xs italic text-charcoal leading-relaxed line-clamp-2">
                    "{spot.quote}"
                  </p>
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-stone-line/50 text-[11px] text-warm-neutral font-medium">
                    <span>{spot.author}</span>
                    <span className="text-emerald-700 flex items-center space-x-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Verified</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Filter, Search and Toolbar */}
        <div className="space-y-4 pt-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {reviewCategories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-150 ${
                    isActive
                      ? 'bg-botanical text-white shadow-xs'
                      : 'bg-card border border-stone-line text-charcoal hover:border-charcoal'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search, Rating & Sort Toolbar */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-card border border-stone-line p-3 sm:p-4 rounded-sm">
            
            {/* Search Box */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-warm-neutral absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search reviews by keyword, flower type, or event..."
                className="w-full pl-10 pr-4 py-2 text-xs bg-canvas border border-stone-line rounded-sm focus:outline-none focus:border-botanical text-charcoal"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-neutral hover:text-charcoal"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Selectors & Toggles */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Rating Selector */}
              <select
                value={selectedRating}
                onChange={(e) => setSelectedRating(e.target.value)}
                className="text-xs bg-canvas border border-stone-line rounded-sm px-3 py-2 text-charcoal focus:outline-none focus:border-botanical"
              >
                <option value="all">All Star Ratings</option>
                <option value="5">★ 5 Stars Only</option>
                <option value="4">★ 4 Stars Only</option>
                <option value="3">★ 3 Stars Only</option>
              </select>

              {/* Sort Selector */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs bg-canvas border border-stone-line rounded-sm px-3 py-2 text-charcoal focus:outline-none focus:border-botanical"
              >
                <option value="newest">Sort: Most Recent</option>
                <option value="highest">Sort: Highest Rated</option>
                <option value="helpful">Sort: Most Helpful</option>
                <option value="photos">Sort: With Photos</option>
              </select>

              {/* Verified Buyers Toggle */}
              <label className="inline-flex items-center space-x-2 text-xs font-medium text-charcoal cursor-pointer select-none bg-canvas px-3 py-2 border border-stone-line rounded-sm">
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                  className="accent-botanical rounded-xs w-3.5 h-3.5"
                />
                <span>Verified Buyers</span>
              </label>

              {/* Reset Filters */}
              {hasActiveFilters && (
                <button
                  onClick={resetAllFilters}
                  className="inline-flex items-center space-x-1 text-xs text-terracotta hover:underline font-semibold px-2 py-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>

          </div>

          {/* Results Counter */}
          <div className="flex items-center justify-between text-xs text-warm-neutral px-1">
            <span>
              Showing <b className="text-charcoal">{filteredReviews.length}</b> {filteredReviews.length === 1 ? 'review' : 'reviews'}
              {selectedCategory !== 'all' && ` in ${reviewCategories.find(c => c.id === selectedCategory)?.label}`}
              {selectedRating !== 'all' && ` (${selectedRating} stars)`}
            </span>
            {hasActiveFilters && (
              <span className="text-[11px] italic">Filtered results active</span>
            )}
          </div>
        </div>

        {/* Reviews Feed Grid */}
        {filteredReviews.length === 0 ? (
          <div className="bg-card border border-stone-line p-12 text-center rounded-sm space-y-4 my-8">
            <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-warm-neutral">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-instrument text-2xl text-charcoal font-bold">No Reviews Found</h3>
            <p className="text-xs text-warm-neutral max-w-sm mx-auto">
              We couldn't find any reviews matching your specific filters or search keywords.
            </p>
            <button
              onClick={resetAllFilters}
              className="inline-flex items-center space-x-2 bg-charcoal text-white text-xs px-5 py-2.5 rounded-full font-semibold hover:bg-botanical transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear All Filters</span>
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredReviews.slice(0, visibleCount).map((rev) => {
                const isVoted = helpfulVoted.includes(rev.id);
                return (
                  <div
                    key={rev.id}
                    className="bg-card border border-stone-line p-6 sm:p-7 rounded-sm shadow-xs hover:border-charcoal/40 transition-all duration-200 flex flex-col justify-between text-left space-y-4"
                  >
                    <div className="space-y-3">
                      
                      {/* Header: Author, Rating, Badges & Date */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-stone-100 border border-stone-line flex items-center justify-center font-serif text-sm font-bold text-charcoal select-none shrink-0">
                            {rev.avatarInitials}
                          </div>
                          <div>
                            <div className="flex items-center space-x-1.5 flex-wrap">
                              <span className="font-sans text-xs font-bold text-charcoal">
                                {rev.author}
                              </span>
                              {rev.verifiedBuyer && (
                                <span className="inline-flex items-center space-x-0.5 text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-1.5 py-0.2 rounded-full font-semibold">
                                  <CheckCircle2 className="w-2.5 h-2.5" />
                                  <span>Verified</span>
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-warm-neutral block">
                              {rev.location}
                            </span>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <div className="flex text-amber-500">
                            {[...Array(rev.rating)].map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-current" />
                            ))}
                          </div>
                          <span className="text-[10px] text-warm-neutral block mt-1">
                            {rev.date}
                          </span>
                        </div>
                      </div>

                      {/* Product & Category Tag */}
                      <div className="pt-1 flex flex-wrap items-center gap-2">
                        <span className="text-[10px] uppercase font-bold tracking-wider bg-canvas border border-stone-line px-2.5 py-0.5 rounded-full text-warm-neutral">
                          {reviewCategories.find(c => c.id === rev.category)?.label || 'Bespoke Design'}
                        </span>
                        {rev.productPurchased && (
                          <span className="text-[11px] text-warm-neutral font-medium italic">
                            Purchased: {rev.productPurchased}
                          </span>
                        )}
                      </div>

                      {/* Title & Comment */}
                      <div className="space-y-1.5">
                        <h3 className="font-instrument text-xl font-bold text-charcoal leading-snug">
                          {rev.title}
                        </h3>
                        <p className="font-sans text-xs text-warm-neutral leading-relaxed">
                          {rev.comment}
                        </p>
                      </div>

                      {/* Review Photo Attachment */}
                      {rev.image && (
                        <div className="pt-2">
                          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xs overflow-hidden border border-stone-line bg-stone-100 group relative">
                            <img
                              src={rev.image}
                              alt={rev.title}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute bottom-1 right-1 bg-black/60 text-white rounded-xs p-1 text-[9px] flex items-center space-x-0.5">
                              <Camera className="w-2.5 h-2.5" />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Card Footer: Tags & Helpful Count */}
                    <div className="pt-4 border-t border-stone-line/60 flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-1.5 flex-wrap">
                        {rev.tags?.map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-[9px] uppercase font-bold tracking-wider bg-stone-50 border border-stone-line px-2 py-0.5 rounded-xs text-warm-neutral"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={() => handleHelpfulClick(rev.id)}
                        disabled={isVoted}
                        className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium border transition-colors ${
                          isVoted
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                            : 'bg-canvas border-stone-line text-warm-neutral hover:text-charcoal hover:border-charcoal'
                        }`}
                      >
                        <ThumbsUp className={`w-3 h-3 ${isVoted ? 'fill-current' : ''}`} />
                        <span>{isVoted ? 'Helpful' : 'Helpful'}</span>
                        <span className="font-bold">({rev.helpfulCount || 0})</span>
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Pagination / Load More Controls */}
            {visibleCount < filteredReviews.length && (
              <div className="flex flex-col items-center justify-center pt-6 pb-2 space-y-3">
                <p className="text-xs text-warm-neutral font-medium">
                  Viewing <b className="text-charcoal">{Math.min(visibleCount, filteredReviews.length)}</b> of <b className="text-charcoal">{filteredReviews.length}</b> verified patron stories
                </p>
                <div className="w-48 h-1.5 bg-stone-100 rounded-full overflow-hidden border border-stone-line">
                  <div 
                    className="h-full bg-botanical transition-all duration-300"
                    style={{ width: `${(Math.min(visibleCount, filteredReviews.length) / filteredReviews.length) * 100}%` }}
                  />
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => setVisibleCount(prev => prev + 12)}
                    className="px-6 py-2.5 rounded-full text-xs font-semibold bg-card border border-stone-line text-charcoal hover:border-charcoal hover:bg-canvas transition-colors shadow-xs cursor-pointer"
                  >
                    Load More Reviews (+12)
                  </button>
                  <button
                    onClick={() => setVisibleCount(filteredReviews.length)}
                    className="px-6 py-2.5 rounded-full text-xs font-semibold bg-botanical text-white hover:bg-black transition-colors shadow-xs cursor-pointer"
                  >
                    Show All ({filteredReviews.length})
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Bottom Call to Action */}
        <section className="bg-card border border-stone-line rounded-sm p-8 sm:p-12 text-center space-y-6 relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-[10px] uppercase font-bold tracking-widest text-botanical">Experience The Atelier</span>
            <h2 className="font-instrument text-3xl sm:text-5xl font-normal text-charcoal leading-tight">
              Ready to create your own floral memory?
            </h2>
            <p className="font-sans text-xs sm:text-sm text-warm-neutral leading-relaxed">
              Explore our fresh, seasonal garden bouquets for immediate delivery, or partner with our floral design team for bespoke event styling.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/shop/all"
              className="rounded-full px-8 py-3.5 text-xs bg-charcoal text-white hover:bg-botanical transition-all duration-200 font-semibold tracking-wider uppercase shadow-md"
            >
              Shop Curated Bouquets
            </Link>
            <Link
              to="/events"
              className="rounded-full px-8 py-3.5 text-xs bg-canvas border border-stone-line text-charcoal hover:border-charcoal transition-all duration-200 font-semibold tracking-wider uppercase shadow-xs"
            >
              Explore Event Services
            </Link>
          </div>
        </section>

      </div>

      {/* Write a Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-card border border-stone-line max-w-xl w-full rounded-sm shadow-2xl overflow-hidden max-h-[90vh] flex flex-col relative text-left">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-stone-line flex items-center justify-between">
              <div>
                <h3 className="font-instrument text-2xl font-bold text-charcoal">Share Your Experience</h3>
                <p className="text-xs text-warm-neutral mt-0.5">Your feedback helps fellow floral patrons and inspires our atelier.</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-warm-neutral hover:text-charcoal transition-colors rounded-sm"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body / Form */}
            <div className="p-6 overflow-y-auto space-y-5">
              {submitSuccess ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                    <Check className="w-8 h-8" />
                  </div>
                  <h4 className="font-instrument text-3xl font-bold text-charcoal">Thank You!</h4>
                  <p className="text-xs text-warm-neutral max-w-sm mx-auto">
                    Your review has been verified and published to the Handal Flowers & Events patron registry.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  
                  {/* Star Rating Picker */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-charcoal">
                      Your Overall Rating *
                    </label>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setFormRating(star)}
                          className="p-1 focus:outline-none transition-transform hover:scale-110"
                        >
                          <Star
                            className={`w-7 h-7 ${
                              (hoverRating || formRating) >= star
                                ? 'fill-amber-500 text-amber-500'
                                : 'text-stone-300'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs text-warm-neutral font-medium ml-2">
                        {ratingDescriptions[hoverRating || formRating]}
                      </span>
                    </div>
                  </div>

                  {/* Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoal mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Charlotte Dubois"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 bg-canvas border border-stone-line rounded-sm text-charcoal focus:outline-none focus:border-botanical"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoal mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. charlotte@example.com"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 bg-canvas border border-stone-line rounded-sm text-charcoal focus:outline-none focus:border-botanical"
                      />
                    </div>
                  </div>

                  {/* Location & Category */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoal mb-1">
                        City & State / Country
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Manhattan, NY"
                        value={formLocation}
                        onChange={(e) => setFormLocation(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 bg-canvas border border-stone-line rounded-sm text-charcoal focus:outline-none focus:border-botanical"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoal mb-1">
                        Floral Category
                      </label>
                      <select
                        value={formCategory}
                        onChange={(e) => setFormCategory(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 bg-canvas border border-stone-line rounded-sm text-charcoal focus:outline-none focus:border-botanical"
                      >
                        {reviewCategories.filter(c => c.id !== 'all').map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Product or Event Name */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoal mb-1">
                      Product or Event Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Alabaster Garden Roses or Estate Wedding Nuptials"
                      value={formProduct}
                      onChange={(e) => setFormProduct(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 bg-canvas border border-stone-line rounded-sm text-charcoal focus:outline-none focus:border-botanical"
                    />
                  </div>

                  {/* Review Title */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoal mb-1">
                      Review Headline *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Summarize your floral experience in a headline"
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 bg-canvas border border-stone-line rounded-sm text-charcoal focus:outline-none focus:border-botanical"
                    />
                  </div>

                  {/* Detailed Comments */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoal mb-1">
                      Detailed Experience *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell us about the scent, wrapping presentation, delivery timing, or recipient's reaction..."
                      value={formComment}
                      onChange={(e) => setFormComment(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 bg-canvas border border-stone-line rounded-sm text-charcoal focus:outline-none focus:border-botanical resize-none"
                    />
                  </div>

                  {/* Attach Sample Photo */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoal mb-1">
                      Attach Floral Photo (Optional)
                    </label>
                    <select
                      value={formImageOption}
                      onChange={(e) => setFormImageOption(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 bg-canvas border border-stone-line rounded-sm text-charcoal focus:outline-none focus:border-botanical"
                    >
                      {availableReviewImages.map((img) => (
                        <option key={img.label} value={img.url}>
                          {img.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Recommend Checkbox */}
                  <label className="flex items-center space-x-2 text-xs text-charcoal cursor-pointer select-none pt-1">
                    <input
                      type="checkbox"
                      checked={formRecommend}
                      onChange={(e) => setFormRecommend(e.target.checked)}
                      className="accent-botanical rounded-xs w-4 h-4"
                    />
                    <span>I recommend Handal Flowers & Events to friends and colleagues</span>
                  </label>

                  {/* Submit Button */}
                  <div className="pt-4 border-t border-stone-line flex items-center justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-5 py-2.5 text-xs text-warm-neutral hover:text-charcoal font-semibold uppercase tracking-wider transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-7 py-2.5 text-xs bg-botanical text-white font-semibold rounded-full hover:bg-black transition-colors uppercase tracking-wider shadow-sm"
                    >
                      Submit Review
                    </button>
                  </div>

                </form>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
