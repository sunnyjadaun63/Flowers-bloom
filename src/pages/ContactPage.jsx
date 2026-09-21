import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronDown, ChevronUp, MapPin, Mail, Phone, Clock, Sparkles } from 'lucide-react';
import { ShopPageRibbons } from '../components/DecorativeRibbon';

const faqs = [
  {
    question: "How does same-day hand-delivery work?",
    answer: "Place your order before 1:00 PM in the recipient's local time zone, and our local courier team will hand-deliver the arrangement in a climate-controlled vehicle. We never pack our flowers in cardboard shipping boxes to prevent crushing and water deprivation."
  },
  {
    question: "What is your 7-day freshness guarantee?",
    answer: "We source our stems directly from certified boutique farms, omitting warehouses and wholesale auction delay loops. If your flowers do not remain vibrant for at least 7 days, email a photo of your arrangement to our support desk, and we will send a complimentary replacement."
  },
  {
    question: "Do you supply the vase shown in the photos?",
    answer: "All bouquets are hand-tied in premium European kraft paper wrapping. We offer our signature hand-thrown glass and ceramic vases as an add-on item on the product page. Qualifying orders automatically receive a complimentary designer vase."
  },
  {
    question: "Can I customize the stems in an arrangement?",
    answer: "Our seasonal collections are curated to maintain visual and organic balance. For custom arrangements or bespoke design requests, please use our contact form or call our Greenhouse District studio to speak directly with an account florist."
  }
];

const scheduleList = [
  { dayIndex: 1, day: 'Mon', fullDay: 'Monday', hours: '08:00 am – 05:00 pm', isWorkDay: true },
  { dayIndex: 2, day: 'Tue', fullDay: 'Tuesday', hours: '08:00 am – 05:00 pm', isWorkDay: true },
  { dayIndex: 3, day: 'Wed', fullDay: 'Wed', hours: '08:00 am – 05:00 pm', isWorkDay: true },
  { dayIndex: 4, day: 'Thu', fullDay: 'Thu', hours: '08:00 am – 05:00 pm', isWorkDay: true },
  { dayIndex: 5, day: 'Fri', fullDay: 'Fri', hours: '08:00 am – 05:00 pm', isWorkDay: true },
  { dayIndex: 6, day: 'Sat', fullDay: 'Sat', hours: 'Closed', isWorkDay: false },
  { dayIndex: 0, day: 'Sun', fullDay: 'Sun', hours: 'Closed', isWorkDay: false }
];

function calculateStoreStatus() {
  const now = new Date();
  
  // Format current time and weekday in Eastern Time (Tampa, FL)
  try {
    const estParts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/New_York',
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false
    }).formatToParts(now);

    const weekdayStr = estParts.find(p => p.type === 'weekday')?.value || 'Wed';
    const hour = parseInt(estParts.find(p => p.type === 'hour')?.value || '0', 10);
    const minute = parseInt(estParts.find(p => p.type === 'minute')?.value || '0', 10);
    const currentMinutes = hour * 60 + minute;

    const dayMap = { 'Sun': 0, 'Mon': 1, 'Tue': 2, 'Wed': 3, 'Thu': 4, 'Fri': 5, 'Sat': 6 };
    const currentDayIndex = dayMap[weekdayStr] ?? now.getDay();

    const isWorkDay = currentDayIndex >= 1 && currentDayIndex <= 5; // Mon-Fri
    const openMinutes = 8 * 60; // 08:00 AM = 480
    const closeMinutes = 17 * 60; // 05:00 PM = 1020

    const isOpen = isWorkDay && currentMinutes >= openMinutes && currentMinutes < closeMinutes;

    let statusText = '';
    let subStatus = '';

    if (isOpen) {
      statusText = 'Store Open';
      subStatus = 'Closes at 5:00 PM EST';
    } else if (isWorkDay) {
      if (currentMinutes < openMinutes) {
        statusText = 'Store Closed';
        subStatus = 'Opens today at 8:00 AM EST';
      } else {
        statusText = 'Store Closed';
        const nextDay = currentDayIndex === 5 ? 'Monday' : 'tomorrow';
        subStatus = `Opens ${nextDay} at 8:00 AM EST`;
      }
    } else {
      statusText = 'Store Closed';
      subStatus = 'Opens Monday at 8:00 AM EST';
    }

    const estTimeFormatted = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/New_York',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(now);

    return {
      isOpen,
      statusText,
      subStatus,
      currentDayIndex,
      weekdayStr,
      estTimeFormatted
    };
  } catch {
    // Fallback if Intl timeZone fails
    const day = now.getDay();
    const hour = now.getHours();
    const isWorkDay = day >= 1 && day <= 5;
    const isOpen = isWorkDay && hour >= 8 && hour < 17;
    return {
      isOpen,
      statusText: isOpen ? 'Store Open' : 'Store Closed',
      subStatus: isOpen ? 'Closes at 5:00 PM' : 'Opens Mon-Fri at 8:00 AM',
      currentDayIndex: day,
      weekdayStr: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][day],
      estTimeFormatted: ''
    };
  }
}

export default function ContactPage() {
  const [openFaqIdx, setOpenFaqIdx] = useState(null);
  const [storeStatus, setStoreStatus] = useState(calculateStoreStatus);

  // Update status every 30 seconds
  useEffect(() => {
    setStoreStatus(calculateStoreStatus());
    const interval = setInterval(() => {
      setStoreStatus(calculateStoreStatus());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-left space-y-12 animate-in fade-in duration-300">
      {/* Maroon Ribbon Cutouts on empty side spaces */}
      <ShopPageRibbons color="maroon" />
      
      {/* Back to home */}
      <Link to="/" className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-widest font-semibold text-botanical hover:text-terracotta transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Return to Home</span>
      </Link>

      {/* Header and Title */}
      <div className="border-b border-stone-line pb-6">
        <h1 className="font-serif text-3xl sm:text-4xl text-charcoal font-semibold">Contact Our Studio</h1>
        <p className="font-sans text-xs text-warm-neutral mt-2">
          Have questions about shipping coordinates, floral care, or custom event orders? Reach out to our design desk.
        </p>
      </div>

      {/* Grid: Support Info & Hours */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Studio coordinates */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4 bg-white border border-stone-line p-5 rounded-sm shadow-xs font-sans text-xs">
            <h3 className="font-serif text-sm font-semibold text-charcoal border-b border-stone-line/50 pb-2">Our Locations</h3>
            
            <div className="flex space-x-3">
              <MapPin className="w-4.5 h-4.5 text-botanical flex-shrink-0" />
              <p className="text-warm-neutral leading-relaxed">
                Tennessee, USA <br />
                San Luis, Honduras <br />
                San Pedro, Honduras
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Details, Availability & FAQs */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Contact Details & Availability Card */}
          <div className="bg-white border border-stone-line p-6 sm:p-8 rounded-sm shadow-xs space-y-6">
            <div className="flex flex-wrap items-center justify-between border-b border-stone-line/50 pb-4 gap-2">
              <div>
                <span className="text-[10px] uppercase tracking-widest font-semibold text-botanical block mb-1">
                  Direct Contact & Support Desk
                </span>
                <h2 className="font-instrument text-2xl sm:text-3xl font-bold text-charcoal tracking-tight">
                Handal Flowers & Events 


                </h2>
              </div>

              {/* Dynamic Open/Closed Status Pill */}
              <div className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${
                storeStatus.isOpen
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-amber-50 text-amber-900 border-amber-300'
              }`}>
                <span className={`w-2 h-2 rounded-full ${
                  storeStatus.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                }`} />
                <span>{storeStatus.statusText}</span>
                <span className="text-stone-400">•</span>
                <span className="text-[11px] font-normal">{storeStatus.subStatus}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left: Address, Phone, Email */}
              <div className="space-y-5 text-left font-sans text-xs">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-warm-neutral mb-1.5 flex items-center space-x-1.5">
                    <MapPin className="w-3.5 h-3.5 text-botanical" />
                    <span>Office Address</span>
                  </label>
                  <p className="text-charcoal font-medium leading-relaxed">
                    7320 East Fletcher Avenue <br />
                    SUITE 109-05 <br />
                    Tampa, FL 33637
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-line/40 space-y-3">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-warm-neutral mb-1 flex items-center space-x-1.5">
                      <Phone className="w-3.5 h-3.5 text-botanical" />
                      <span>Phone Support</span>
                    </label>
                    <a 
                      href="tel:+16156287021" 
                      className="inline-flex items-center space-x-2 text-sm font-semibold text-charcoal hover:text-botanical transition-colors"
                    >
                      <span>+1 (931) 735-4060</span>
                    </a>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-warm-neutral mb-1 flex items-center space-x-1.5">
                      <Mail className="w-3.5 h-3.5 text-botanical" />
                      <span>Email Inquiries</span>
                    </label>
                    <a 
                      href="mailto:admin@handleflowers.com" 
                      className="inline-flex items-center space-x-2 text-xs font-semibold text-botanical hover:underline"
                    >
                      <span>admin@handleflowers.com</span>
                    </a>
                  </div>
                </div>

                <div className="pt-3">
                  <a
                    href="tel:+16156287021"
                    className="inline-flex items-center justify-center space-x-2 w-full py-2.5 px-4 bg-botanical hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors shadow-xs"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Concierge Now</span>
                  </a>
                </div>
              </div>

              {/* Right: Availability Hours (With Dynamic Highlight for Current Day) */}
              <div className="space-y-3 bg-stone-50/70 border border-stone-line/60 p-4 sm:p-5 rounded-xs">
                <div className="flex items-center justify-between border-b border-stone-line/60 pb-2">
                  <div className="flex items-center space-x-1.5">
                    <Clock className="w-3.5 h-3.5 text-botanical" />
                    <h3 className="font-instrument text-base font-bold text-charcoal">
                      Hours
                    </h3>
                  </div>
                  <span className="text-[9px] uppercase font-bold text-warm-neutral">
                    {storeStatus.estTimeFormatted ? `EST: ${storeStatus.estTimeFormatted}` : 'EST Zone'}
                  </span>
                </div>

                <div className="space-y-1 text-xs font-sans">
                  {scheduleList.map((item) => {
                    const isToday = item.dayIndex === storeStatus.currentDayIndex;
                    return (
                      <div 
                        key={item.day} 
                        className={`flex items-center justify-between transition-all duration-200 ${
                          isToday
                            ? 'bg-[#182635] text-white px-3 py-2 rounded-md font-semibold shadow-xs border border-slate-700/80'
                            : 'px-2 py-1.5 text-charcoal'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <span className={`w-8 ${isToday ? 'font-bold text-white' : 'font-semibold text-charcoal'}`}>
                            {item.day}
                          </span>
                          {/* {isToday && (
                            <span className={`text-[8px] uppercase tracking-wider px-1.5 py-0.2 rounded font-bold ${
                              storeStatus.isOpen 
                                ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-400/40' 
                                : 'bg-amber-500/25 text-amber-300 border border-amber-400/40'
                            }`}>
                              {storeStatus.isOpen ? 'Open' : 'Today'}
                            </span>
                          )} */}
                        </div>
                        <span className={
                          isToday 
                            ? 'text-slate-100 font-semibold' 
                            : (item.isWorkDay ? 'text-charcoal font-medium' : 'text-warm-neutral italic')
                        }>
                          {item.hours}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* FAQs Accordion */}
          <div className="space-y-3">
            <h3 className="font-serif text-lg text-charcoal font-semibold border-b border-stone-line/50 pb-2">Common Questions</h3>
            <div className="space-y-2.5">
              {faqs.map((faq, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div key={idx} className="bg-white border border-stone-line rounded-sm overflow-hidden">
                    <button
                      onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                      className="w-full px-5 py-4 flex items-center justify-between text-left focus:outline-none hover:bg-stone-50 transition-colors"
                    >
                      <span className="font-serif text-[13px] sm:text-sm font-semibold text-charcoal">{faq.question}</span>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-warm-neutral" /> : <ChevronDown className="w-4 h-4 text-warm-neutral" />}
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4 text-xs font-sans text-warm-neutral leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
