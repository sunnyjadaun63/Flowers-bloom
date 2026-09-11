import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Minus, Plus, Trash2, ShoppingBag, Sparkles, CheckCircle2, CreditCard } from 'lucide-react';

export default function CartDrawer() {
  const { 
    cart, 
    cartDrawerOpen, 
    setCartDrawerOpen, 
    updateQuantity, 
    removeFromCart, 
    clearCart,
    zipCode,
    isZipVerified,
    deliveryDate
  } = useCart();

  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({
    name: '',
    email: '',
    address: '',
    cardNumber: '4111 2222 3333 4444',
    cardExpiry: '12/28',
    cardCvc: '123'
  });

  if (!cartDrawerOpen) return null;

  // Calculate prices
  const getItemPrice = (item) => {
    const upsellsTotal = item.selectedUpsells.reduce((acc, upsell) => acc + upsell.price, 0);
    return item.product.price + upsellsTotal;
  };

  const getSubtotal = () => {
    return cart.reduce((total, item) => {
      return total + (getItemPrice(item) * item.quantity);
    }, 0);
  };

  const subtotal = getSubtotal();
  const shippingThreshold = 100;
  const progressPercent = Math.min((subtotal / shippingThreshold) * 100, 100);
  const leftForFreeShipping = shippingThreshold - subtotal;
  const qualifiesForComplimentaryVase = subtotal >= 85;

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    setCheckoutSuccess(true);
    setTimeout(() => {
      // Clear cart after success
      clearCart();
      setCheckoutSuccess(false);
      setCheckoutModalOpen(false);
      setCartDrawerOpen(false);
    }, 3000);
  };

  return (
    <>
      {/* Drawer Overlay */}
      <div 
        className="fixed inset-0 z-50 bg-charcoal/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setCartDrawerOpen(false)}
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 z-50 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-canvas border-l border-stone-line flex flex-col shadow-2xl h-full animate-in slide-in-from-right duration-300">
          
          {/* Drawer Header */}
          <div className="px-6 py-5 border-b border-stone-line flex items-center justify-between bg-white">
            <div className="flex items-center space-x-2.5">
              <ShoppingBag className="w-5 h-5 text-botanical" />
              <h2 className="font-serif text-lg text-charcoal font-semibold">Your Cart</h2>
              <span className="font-sans text-xs bg-stone-100 text-warm-neutral px-2.5 py-0.5 rounded-full font-medium">
                {cart.reduce((sum, i) => sum + i.quantity, 0)} items
              </span>
            </div>
            <button 
              onClick={() => setCartDrawerOpen(false)}
              className="p-1.5 text-warm-neutral hover:text-charcoal transition-colors focus:outline-none"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Free Shipping & Vase Tracker */}
            <div className="bg-white p-4 border border-stone-line rounded-sm space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-medium text-charcoal flex items-center">
                  <Sparkles className="w-3.5 h-3.5 text-terracotta mr-1.5" />
                  Complimentary White-Glove Hand Delivery On All Orders
                </span>
                <span className="font-bold text-botanical">FREE</span>
              </div>
              <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-botanical h-full transition-all duration-500 ease-out" 
                  style={{ width: `100%` }}
                />
              </div>

              {/* Complimentary Vase tracker */}
              <div className="text-[11px] font-sans text-warm-neutral flex justify-between items-center pt-1">
                <span>Vase Promo</span>
                <span className="font-semibold text-botanical">Complimentary with every arrangement</span>
              </div>
            </div>

            {/* Cart Items List */}
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 mx-auto bg-stone-100 rounded-full flex items-center justify-center text-warm-neutral border border-stone-line">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-base text-charcoal font-medium">Your cart is empty</h3>
                <p className="font-sans text-xs text-warm-neutral max-w-xs mx-auto">
                  Browse our hand-tied bouquets, roses, and seasonal arrangements to begin your sensory journey.
                </p>
                <button
                  onClick={() => setCartDrawerOpen(false)}
                  className="inline-block bg-botanical text-white px-6 py-2.5 text-xs uppercase tracking-widest font-semibold rounded-sm hover:bg-opacity-90 transition-all"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item, idx) => {
                  const itemPrice = getItemPrice(item);
                  return (
                    <div 
                      key={`${item.product.id}-${idx}`}
                      className="bg-white border border-stone-line p-4 rounded-sm flex space-x-4 relative group"
                    >
                      {/* Item Image */}
                      <div className="w-20 h-20 bg-stone-100 rounded-sm overflow-hidden border border-stone-line flex-shrink-0">
                        <img 
                          src={item.product.images[0]} 
                          alt={item.product.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-sm text-charcoal font-medium truncate pr-6">
                          {item.product.name}
                        </h4>
                        <div className="text-[11px] text-warm-neutral mt-0.5 flex flex-wrap gap-x-2">
                          <span>Qty: {item.quantity}</span>
                          <span>•</span>
                          <span>{item.product.stemCount} Stems</span>
                        </div>

                        {/* Selected Upsells */}
                        {item.selectedUpsells.length > 0 && (
                          <div className="mt-2 text-[10px] text-botanical bg-stone-50 border border-stone-line/50 p-1.5 rounded-sm">
                            <span className="font-semibold block uppercase tracking-wider text-[8px] mb-0.5">Add-ons:</span>
                            <ul className="list-disc pl-3.5 space-y-0.5">
                              {item.selectedUpsells.map((up, uIdx) => (
                                <li key={uIdx}>{up.name} (+Coming Soon)</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Gift Message */}
                        {item.giftMessage && (
                          <div className="mt-1.5 text-[10px] text-warm-neutral italic bg-stone-50/50 p-1.5 border-l-2 border-stone-line rounded-r-sm line-clamp-2">
                            "{item.giftMessage}"
                          </div>
                        )}

                        {/* Quantity controls & Delete */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-stone-line bg-canvas rounded-sm">
                            <button
                              onClick={() => updateQuantity(item.product.id, 0, item.selectedUpsells, item.giftMessage, -1)}
                              className="px-2.5 py-1 text-warm-neutral hover:text-charcoal transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-semibold font-sans text-charcoal min-w-[20px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, 0, item.selectedUpsells, item.giftMessage, 1)}
                              className="px-2.5 py-1 text-warm-neutral hover:text-charcoal transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="font-sans text-[11px] font-bold text-botanical uppercase tracking-wider bg-stone-100 px-2 py-0.5 rounded-full">
                            Coming Soon
                          </span>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.product.id, item.selectedUpsells, item.giftMessage)}
                        className="absolute top-4 right-4 text-stone-300 hover:text-red-500 transition-colors p-1"
                        aria-label="Delete Item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Drawer Footer */}
          {cart.length > 0 && (
            <div className="px-6 py-6 border-t border-stone-line bg-white space-y-4">
              {/* Delivery Details Callout */}
              <div className="text-[11px] font-sans text-warm-neutral flex items-center space-x-1.5 bg-stone-50 border border-stone-line/50 p-2.5 rounded-sm">
                <CheckCircle2 className="w-3.5 h-3.5 text-botanical flex-shrink-0" />
                <span>
                  {isZipVerified 
                    ? `Hand-delivery to ${zipCode} ${deliveryDate ? `on ${new Date(deliveryDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}` : ''}` 
                    : 'Check delivery options by verifying ZIP code.'}
                </span>
              </div>

              {/* Subtotal */}
              <div className="flex justify-between items-baseline">
                <span className="font-serif text-sm font-semibold text-charcoal">Subtotal</span>
                <span className="font-sans text-sm font-bold text-botanical uppercase tracking-wider bg-stone-100 px-2.5 py-1 rounded-full">Coming Soon</span>
              </div>
              <p className="font-sans text-[10px] text-warm-neutral leading-relaxed">
                Taxes and complimentary local hand-delivery calculated during checkout. Order before 1:00 PM in recipient's time zone for same-day delivery.
              </p>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={() => setCheckoutModalOpen(true)}
                  className="w-full bg-botanical hover:bg-opacity-95 text-white py-3.5 text-xs uppercase tracking-widest font-semibold flex items-center justify-center space-x-2 rounded-xs shadow-md transition-colors"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Proceed to Checkout</span>
                </button>
                <button
                  onClick={() => setCartDrawerOpen(false)}
                  className="w-full bg-transparent border border-stone-line hover:bg-stone-50 text-charcoal py-3.5 text-xs uppercase tracking-widest font-semibold rounded-xs transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Simulated Checkout Modal */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-55 flex items-center justify-center px-4 bg-charcoal/50 backdrop-blur-md transition-all duration-300">
          <div className="bg-canvas border border-stone-line max-w-lg w-full p-8 rounded-sm shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            {checkoutSuccess ? (
              <div className="text-center py-12 space-y-6">
                <div className="w-20 h-20 bg-green-50 text-botanical rounded-full flex items-center justify-center mx-auto border border-botanical animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl text-charcoal font-semibold">Order Placed Successfully!</h3>
                  <p className="font-sans text-xs text-warm-neutral mt-2 max-w-sm mx-auto">
                    Handal Flowers & Events has received your order. We are coordination with our sustainable partner farm to prepare your premium stems.
                  </p>
                </div>
                <div className="bg-white border border-stone-line/50 p-4 rounded-sm text-left max-w-xs mx-auto text-xs space-y-1">
                  <p className="font-semibold uppercase tracking-wider text-[9px] text-warm-neutral mb-2">Simulated Order Details:</p>
                  <p><strong>Subtotal:</strong> <span className="text-botanical font-bold">Coming Soon</span></p>
                  <p><strong>Delivery ZIP:</strong> {zipCode || "10001 (Default)"}</p>
                  <p><strong>Status:</strong> Ready for Hand-Delivery</p>
                </div>
                <p className="text-[10px] text-warm-neutral italic animate-pulse">Closing checkout drawer...</p>
              </div>
            ) : (
              <div className="space-y-6">
                <button 
                  onClick={() => setCheckoutModalOpen(false)}
                  className="absolute top-4 right-4 p-1.5 text-warm-neutral hover:text-charcoal"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <div>
                  <h3 className="font-serif text-2xl text-charcoal font-semibold">Simulated Checkout</h3>
                  <p className="font-sans text-xs text-warm-neutral mt-1">
                    Your payment details will not be charged. This simulates a real production-ready payment flow.
                  </p>
                </div>

                <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal mb-1">Full Name</label>
                      <input 
                        type="text" 
                        value={checkoutForm.name}
                        onChange={(e) => setCheckoutForm({...checkoutForm, name: e.target.value})}
                        placeholder="John Doe" 
                        className="w-full bg-white border border-stone-line px-3 py-2 text-xs font-sans focus:outline-none focus:border-botanical text-charcoal rounded-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal mb-1">Email Address</label>
                      <input 
                        type="email" 
                        value={checkoutForm.email}
                        onChange={(e) => setCheckoutForm({...checkoutForm, email: e.target.value})}
                        placeholder="john@example.com" 
                        className="w-full bg-white border border-stone-line px-3 py-2 text-xs font-sans focus:outline-none focus:border-botanical text-charcoal rounded-sm"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal mb-1">Delivery Address</label>
                    <input 
                      type="text" 
                      value={checkoutForm.address}
                      onChange={(e) => setCheckoutForm({...checkoutForm, address: e.target.value})}
                      placeholder="123 Luxury Lane, Apt 4B" 
                      className="w-full bg-white border border-stone-line px-3 py-2 text-xs font-sans focus:outline-none focus:border-botanical text-charcoal rounded-sm"
                      required
                    />
                  </div>

                  <div className="border-t border-stone-line/50 pt-4 space-y-3">
                    <h4 className="font-serif text-sm font-semibold text-charcoal flex items-center">
                      <CreditCard className="w-4 h-4 text-botanical mr-1.5" />
                      <span>Credit Card Details</span>
                    </h4>
                    
                    <div>
                      <label className="block text-[9px] uppercase tracking-wider font-semibold text-warm-neutral mb-1">Card Number</label>
                      <input 
                        type="text" 
                        value={checkoutForm.cardNumber}
                        onChange={(e) => setCheckoutForm({...checkoutForm, cardNumber: e.target.value})}
                        className="w-full bg-white border border-stone-line px-3 py-2 text-xs font-sans focus:outline-none focus:border-botanical text-charcoal rounded-sm"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[9px] uppercase tracking-wider font-semibold text-warm-neutral mb-1">Expiry Date</label>
                        <input 
                          type="text" 
                          value={checkoutForm.cardExpiry}
                          onChange={(e) => setCheckoutForm({...checkoutForm, cardExpiry: e.target.value})}
                          placeholder="MM/YY" 
                          className="w-full bg-white border border-stone-line px-3 py-2 text-xs font-sans focus:outline-none focus:border-botanical text-charcoal rounded-sm"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] uppercase tracking-wider font-semibold text-warm-neutral mb-1">CVC Code</label>
                        <input 
                          type="text" 
                          value={checkoutForm.cardCvc}
                          onChange={(e) => setCheckoutForm({...checkoutForm, cardCvc: e.target.value})}
                          placeholder="123" 
                          maxLength={3}
                          className="w-full bg-white border border-stone-line px-3 py-2 text-xs font-sans focus:outline-none focus:border-botanical text-charcoal rounded-sm"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Summary of checkout */}
                  <div className="bg-stone-50 border border-stone-line p-4 rounded-sm text-xs space-y-2 text-charcoal mt-4">
                    <div className="flex justify-between">
                      <span>Order Subtotal:</span>
                      <span className="font-bold text-botanical uppercase tracking-wider text-[11px]">Coming Soon</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Service:</span>
                      <span className="font-semibold text-botanical">Complimentary Hand-Delivery</span>
                    </div>
                    <div className="flex justify-between border-t border-stone-line/50 pt-2 text-sm">
                      <span className="font-semibold">Grand Total:</span>
                      <span className="font-bold text-botanical uppercase tracking-wider text-xs">Coming Soon</span>
                    </div>
                  </div>

                  <div className="pt-2 flex space-x-3">
                    <button
                      type="button"
                      onClick={() => setCheckoutModalOpen(false)}
                      className="flex-1 border border-stone-line text-warm-neutral hover:bg-stone-50 py-3 text-xs uppercase tracking-widest font-semibold rounded-sm transition-colors duration-150"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-grow bg-botanical text-white hover:bg-opacity-90 py-3 text-xs uppercase tracking-widest font-semibold rounded-sm transition-colors duration-150"
                    >
                      Authorize Payment
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
