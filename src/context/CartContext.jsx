import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  // Load initial states from localStorage
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('aura_blooms_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('aura_blooms_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [zipCode, setZipCode] = useState(() => {
    const saved = localStorage.getItem('aura_blooms_zip');
    return saved ? saved : '';
  });

  const [isZipVerified, setIsZipVerified] = useState(() => {
    const saved = localStorage.getItem('aura_blooms_zip_verified');
    return saved ? JSON.parse(saved) : false;
  });

  const [deliveryDate, setDeliveryDate] = useState(() => {
    return localStorage.getItem('aura_blooms_delivery_date') || '';
  });

  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('aura_blooms_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('aura_blooms_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('aura_blooms_zip', zipCode);
    localStorage.setItem('aura_blooms_zip_verified', JSON.stringify(isZipVerified));
  }, [zipCode, isZipVerified]);

  useEffect(() => {
    localStorage.setItem('aura_blooms_delivery_date', deliveryDate);
  }, [deliveryDate]);

  // Cart operations
  const addToCart = (product, quantity = 1, selectedUpsells = [], giftMessage = '') => {
    setCart((prevCart) => {
      // Find if exact same product with same giftMessage & upsells exists
      const existingItemIndex = prevCart.findIndex(
        (item) => 
          item.product.id === product.id && 
          item.giftMessage === giftMessage &&
          JSON.stringify(item.selectedUpsells) === JSON.stringify(selectedUpsells)
      );

      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += quantity;
        return newCart;
      }

      return [...prevCart, { product, quantity, selectedUpsells, giftMessage }];
    });
    // Automatically open the cart drawer when item is added
    setCartDrawerOpen(true);
  };

  const removeFromCart = (productId, selectedUpsells = [], giftMessage = '') => {
    setCart((prevCart) => 
      prevCart.filter(
        (item) => 
          !(item.product.id === productId && 
            item.giftMessage === giftMessage &&
            JSON.stringify(item.selectedUpsells) === JSON.stringify(selectedUpsells))
      )
    );
  };

  const updateQuantity = (productId, quantity, selectedUpsells = [], giftMessage = '', delta = 0) => {
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (
          item.product.id === productId &&
          item.giftMessage === giftMessage &&
          JSON.stringify(item.selectedUpsells) === JSON.stringify(selectedUpsells)
        ) {
          const newQty = delta !== 0 ? item.quantity + delta : quantity;
          return { ...item, quantity: Math.max(1, newQty) };
        }
        return item;
      });
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const toggleWishlist = (productId) => {
    setWishlist((prevWishlist) => {
      if (prevWishlist.includes(productId)) {
        return prevWishlist.filter((id) => id !== productId);
      } else {
        return [...prevWishlist, productId];
      }
    });
  };

  // Zip Code operations
  const verifyZipCode = (zip) => {
    // Simple verification check: check if it's a 5-digit US zip code or custom logic
    const isValid = /^\d{5}$/.test(zip.trim());
    if (isValid) {
      setZipCode(zip.trim());
      setIsZipVerified(true);
      return true;
    } else {
      setIsZipVerified(false);
      return false;
    }
  };

  const clearZipCode = () => {
    setZipCode('');
    setIsZipVerified(false);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        zipCode,
        isZipVerified,
        deliveryDate,
        cartDrawerOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        verifyZipCode,
        clearZipCode,
        setDeliveryDate,
        setCartDrawerOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
