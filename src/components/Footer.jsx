import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send, MapPin, Phone, Mail } from 'lucide-react';

const InstagramIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 3000);
    }
  };

  return (
    <footer className="bg-white border-t border-stone-line pt-16 pb-8 text-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter Section */}
        <div className="border-b border-stone-line pb-12 mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-md">
            <h3 className="font-serif text-xl sm:text-2xl text-charcoal font-semibold">Join the Botanical Society</h3>
            <p className="font-sans text-xs text-warm-neutral mt-2">
              Subscribe to receive private collection releases, invitation-only event invites, and seasonal care journals.
            </p>
          </div>
          <form onSubmit={handleSubscribe} className="w-full max-w-sm flex items-center border border-stone-line rounded-sm overflow-hidden bg-canvas">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent text-xs px-4 py-3.5 flex-1 focus:outline-none font-sans text-charcoal"
              required
            />
            <button 
              type="submit"
              className="bg-botanical hover:bg-opacity-95 text-white px-5 py-3.5 text-xs uppercase tracking-widest font-semibold flex items-center justify-center transition-colors"
            >
              {subscribed ? 'Joined' : <Send className="w-4 h-4" />}
            </button>
          </form>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Philosophy */}
          <div className="space-y-4 md:col-span-2">
            <span className="font-instrument text-2xl tracking-tight text-charcoal block">Handal Flowers & Events<sup className="text-xs ml-0.5">®</sup></span>
            <p className="font-sans text-xs text-warm-neutral leading-relaxed max-w-sm">
              We practice a warm, editorial brand of Scandinavian luxury. Our organic stems are grown in sustainable boutique farms and delivered by hand for daily living and milestone events.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-warm-neutral hover:text-botanical transition-colors">
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-warm-neutral hover:text-botanical transition-colors">
                <FacebookIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Shop Flowers Links */}
          <div className="space-y-4">
            <h4 className="font-instrument text-lg font-bold tracking-tight text-charcoal">Shop Stems</h4>
            <ul className="space-y-2 font-sans text-xs text-warm-neutral">
              <li><Link to="/shop/all" className="hover:text-botanical transition-colors">All Collections</Link></li>
              <li><Link to="/artificial-flowers" className="text-botanical font-semibold hover:underline flex items-center space-x-1"><span>🌸 Artificial & Silk Flowers</span></Link></li>
              <li><Link to="/shop/roses" className="hover:text-botanical transition-colors">Premium Roses</Link></li>
              <li><Link to="/shop/bouquets" className="hover:text-botanical transition-colors">Hand-Tied Bouquets</Link></li>
              <li><Link to="/shop/seasonal" className="hover:text-botanical transition-colors">Seasonal Blossoms</Link></li>
              <li><Link to="/shop/plants-baskets" className="hover:text-botanical transition-colors">Gift Hampers & Plants</Link></li>
            </ul>
          </div>

          {/* Event Planning Links */}
          <div className="space-y-4">
            <h4 className="font-instrument text-lg font-bold tracking-tight text-charcoal">Event Planning</h4>
            <ul className="space-y-2 font-sans text-xs text-warm-neutral">
              <li><Link to="/events" className="hover:text-botanical transition-colors">All Event Divisions</Link></li>
              <li><Link to="/events/weddings" className="hover:text-botanical transition-colors">Weddings & Nuptials</Link></li>
              <li><Link to="/events/birthdays" className="hover:text-botanical transition-colors">Birthday & Family</Link></li>
              <li><Link to="/events/corporate" className="hover:text-botanical transition-colors">Corporate & Openings</Link></li>
              <li><Link to="/events/festivals" className="hover:text-botanical transition-colors">Community & Festivals</Link></li>
            </ul>
          </div>

          {/* Customer Experience Links */}
          <div className="space-y-4">
            <h4 className="font-instrument text-lg font-bold tracking-tight text-charcoal">Support & Studio</h4>
            <ul className="space-y-2 font-sans text-xs text-warm-neutral">
              {/* <li><Link to="/contact" className="hover:text-botanical transition-colors">Delivery Tracking</Link></li> */}
              <li><Link to="/contact" className="hover:text-botanical transition-colors">Care Instructions</Link></li>
              <li><Link to="/about" className="hover:text-botanical transition-colors">Our Sourcing Heritage</Link></li>
              <li><Link to="/corporate" className="hover:text-botanical transition-colors">Corporate Gifts & B2B</Link></li>
              <li><Link to="/contact" className="hover:text-botanical transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-stone-line pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-warm-neutral">
          <p>© {new Date().getFullYear()} Handal Flowers & Events Inc. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0 font-medium">
            <a href="#privacy" className="hover:text-botanical transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-botanical transition-colors">Terms of Service</a>
            <a href="#sustainability" className="hover:text-botanical transition-colors">Sustainability Guarantee</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
