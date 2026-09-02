import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send, CheckCircle2, ChevronDown, ChevronUp, MapPin, Mail, Phone, Clock, Truck } from 'lucide-react';

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
    answer: "All bouquets are hand-tied in premium European kraft paper wrapping. We offer our signature hand-thrown glass and ceramic vases as an add-on item on the product page. Orders over $85 automatically qualify for a complimentary designer vase."
  },
  {
    question: "Can I customize the stems in an arrangement?",
    answer: "Our seasonal collections are curated to maintain visual and organic balance. For custom arrangements or bespoke design requests, please use our contact form or call our Greenhouse District studio to speak directly with an account florist."
  }
];

export default function ContactPage() {
  const [openFaqIdx, setOpenFaqIdx] = useState(null);
  const [supportForm, setSupportForm] = useState({ name: '', email: '', message: '' });
  const [supportSubmitted, setSupportSubmitted] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [trackingStatus, setTrackingStatus] = useState(null);

  const handleSupportSubmit = (e) => {
    e.preventDefault();
    setSupportSubmitted(true);
    setTimeout(() => {
      setSupportSubmitted(false);
      setSupportForm({ name: '', email: '', message: '' });
    }, 4000);
  };

  const handleTrackOrder = (e) => {
    e.preventDefault();
    if (orderNumber.trim()) {
      // Simulate tracking
      setTrackingStatus({
        number: orderNumber.trim().toUpperCase(),
        status: "In Transit",
        eta: "Today, between 2:00 PM - 5:00 PM",
        stage: 3 // Out for delivery
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-left space-y-12 animate-in fade-in duration-300">
      
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

      {/* Grid: Support Form, Info, Location */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Studio coordinates & Delivery Tracker */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Tracking Widget */}
          <div className="bg-white border border-stone-line p-5 rounded-sm shadow-xs space-y-4">
            <h3 className="font-serif text-sm font-semibold text-charcoal flex items-center">
              <Truck className="w-4 h-4 text-botanical mr-2" />
              <span>Real-Time Delivery Tracker</span>
            </h3>
            
            <form onSubmit={handleTrackOrder} className="flex gap-2">
              <input 
                type="text" 
                placeholder="e.g. AB-98402"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                className="bg-canvas border border-stone-line px-3 py-2 text-xs font-sans focus:outline-none focus:border-botanical text-charcoal rounded-sm flex-grow"
                required
              />
              <button 
                type="submit"
                className="bg-botanical hover:bg-opacity-95 text-white px-4 py-2 text-xs uppercase tracking-widest font-semibold rounded-sm transition-all"
              >
                Track
              </button>
            </form>

            {trackingStatus && (
              <div className="bg-stone-50 border border-stone-line p-4 rounded-sm space-y-3 text-xs font-sans text-charcoal">
                <div className="flex justify-between border-b border-stone-line/50 pb-2">
                  <span>Order: <strong>{trackingStatus.number}</strong></span>
                  <span className="text-botanical font-bold uppercase tracking-wider text-[9px]">{trackingStatus.status}</span>
                </div>
                <p><strong>Estimated Arrival:</strong> {trackingStatus.eta}</p>
                
                {/* Stepper tracker */}
                <div className="flex justify-between text-[8px] uppercase tracking-wider font-semibold text-warm-neutral pt-2">
                  <span className="text-botanical">1. Harvested</span>
                  <span className="text-botanical">2. Arranged</span>
                  <span className="text-botanical">3. Out For Delivery</span>
                  <span>4. Delivered</span>
                </div>
                <div className="w-full bg-stone-200 h-1 rounded-full overflow-hidden">
                  <div className="bg-botanical h-full" style={{ width: '75%' }} />
                </div>
              </div>
            )}
          </div>

          {/* Coordinates details */}
          <div className="space-y-4 bg-white border border-stone-line p-5 rounded-sm shadow-xs font-sans text-xs">
            <h3 className="font-serif text-sm font-semibold text-charcoal border-b border-stone-line/50 pb-2">Studio Coordinates</h3>
            
            <div className="flex space-x-3">
              <MapPin className="w-4.5 h-4.5 text-botanical flex-shrink-0" />
              <p className="text-warm-neutral leading-relaxed">
                42 Botanical Avenue, Greenhouse District, New York, NY 10001
              </p>
            </div>

            <div className="flex space-x-3 items-center">
              <Mail className="w-4.5 h-4.5 text-botanical flex-shrink-0" />
              <a href="mailto:studio@aurablooms.com" className="text-warm-neutral hover:text-botanical transition-colors font-medium">
                studio@aurablooms.com
              </a>
            </div>

            <div className="flex space-x-3 items-center">
              <Phone className="w-4.5 h-4.5 text-botanical flex-shrink-0" />
              <a href="tel:+18005552872" className="text-warm-neutral hover:text-botanical transition-colors font-medium">
                +1 (800) 555-AURA
              </a>
            </div>

            <div className="flex space-x-3">
              <Clock className="w-4.5 h-4.5 text-botanical flex-shrink-0" />
              <div className="text-warm-neutral space-y-0.5">
                <p>Monday - Friday: 8:00 AM - 6:00 PM EST</p>
                <p>Saturday: 9:00 AM - 4:00 PM EST</p>
                <p>Sunday: Closed (Farm Delivery Preparation)</p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Support Form & FAQs */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Support Form */}
          <div className="bg-white border border-stone-line p-6 sm:p-8 rounded-sm shadow-xs">
            {supportSubmitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-12 h-12 bg-green-50 text-botanical border border-botanical rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg text-charcoal font-semibold">Message Dispatched</h3>
                <p className="font-sans text-xs text-warm-neutral max-w-sm mx-auto">
                  Your general inquiry has been received. Our greenhouse team will review the notes and email you within 12 hours.
                </p>
                <p className="text-[10px] text-warm-neutral italic animate-pulse">Refreshing contact form...</p>
              </div>
            ) : (
              <form onSubmit={handleSupportSubmit} className="space-y-4">
                <h3 className="font-serif text-base text-charcoal font-semibold mb-2">Send Us an Inquiry</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal mb-1">Your Name</label>
                    <input 
                      type="text" 
                      value={supportForm.name}
                      onChange={(e) => setSupportForm({...supportForm, name: e.target.value})}
                      placeholder="e.g. Liam Sterling" 
                      className="w-full bg-canvas border border-stone-line px-3 py-2 text-xs font-sans focus:outline-none focus:border-botanical text-charcoal rounded-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal mb-1">Your Email</label>
                    <input 
                      type="email" 
                      value={supportForm.email}
                      onChange={(e) => setSupportForm({...supportForm, email: e.target.value})}
                      placeholder="e.g. liam@domain.com" 
                      className="w-full bg-canvas border border-stone-line px-3 py-2 text-xs font-sans focus:outline-none focus:border-botanical text-charcoal rounded-sm"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal mb-1">Message Detail</label>
                  <textarea
                    value={supportForm.message}
                    onChange={(e) => setSupportForm({...supportForm, message: e.target.value})}
                    placeholder="Ask about custom flower requests, vase sourcing, or order coordinate changes..."
                    rows={4}
                    className="w-full bg-canvas border border-stone-line p-3 text-xs font-sans focus:outline-none focus:border-botanical text-charcoal rounded-sm resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="bg-botanical hover:bg-opacity-95 text-white py-3 px-6 text-xs uppercase tracking-widest font-semibold flex items-center justify-center space-x-2 rounded-xs shadow-md transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
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
