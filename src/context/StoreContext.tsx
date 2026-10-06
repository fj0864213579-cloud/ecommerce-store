import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, Currency, ProductReview } from '../types/store';
import { PRODUCTS, CURRENCIES, PROMO_CODES } from '../data/products';

export type StoreView = 'home' | 'shop' | 'new-arrivals' | 'festive' | 'sale' | 'contact' | 'faqs';

interface StoreContextType {
  products: Product[];
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (priceInPkr: number) => string;
  cart: CartItem[];
  cartCount: number;
  addToCart: (product: Product, size: string, color: string, quantity?: number) => void;
  updateCartQuantity: (cartItemId: string, delta: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  appliedPromo: { code: string; discountPercent: number; description: string } | null;
  applyPromo: (code: string) => { success: boolean; message: string };
  removePromo: () => void;
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  taxAmount: number;
  totalAmount: number;
  freeShippingThreshold: number;
  amountUntilFreeShipping: number;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'date' | 'currency' | 'subtotal' | 'discount' | 'tax' | 'total' | 'trackingNumber'>) => Order;
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;
  sizeGuideProduct: Product | null;
  setSizeGuideProduct: (p: Product | null) => void;
  latestOrder: Order | null;
  setLatestOrder: (order: Order | null) => void;
  isOrderHistoryOpen: boolean;
  setIsOrderHistoryOpen: (open: boolean) => void;
  addReview: (productId: string, review: { author: string; city: string; rating: number; title: string; comment: string; fitFeedback: 'True to Size' | 'Slightly Loose' | 'Fitted' }) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;

  // Navigation & Page State
  currentView: StoreView;
  setCurrentView: (view: StoreView) => void;
  navigateToShopWithCategory: (categoryName: string) => void;

  // Filter States for Shop
  filterPriceRange: [number, number];
  setFilterPriceRange: (range: [number, number]) => void;
  filterFabric: string;
  setFilterFabric: (fabric: string) => void;
  filterSize: string;
  setFilterSize: (size: string) => void;
  filterInStockOnly: boolean;
  setFilterInStockOnly: (val: boolean) => void;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
  setSortBy: (sort: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest') => void;
  gridCols: 3 | 4;
  setGridCols: (cols: 3 | 4) => void;
  resetAllFilters: () => void;

  // Recently Viewed
  recentlyViewed: Product[];
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const LOCAL_STORAGE_CART_KEY = 'zimal_pakistan_cart_v3';
const LOCAL_STORAGE_WISHLIST_KEY = 'zimal_pakistan_wishlist_v3';
const LOCAL_STORAGE_ORDERS_KEY = 'zimal_pakistan_orders_v3';
const LOCAL_STORAGE_RECENT_KEY = 'zimal_pakistan_recent_v3';

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [currency, setCurrency] = useState<Currency>('PKR');
  const [currentView, setCurrentView] = useState<StoreView>('home');

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_WISHLIST_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_ORDERS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_RECENT_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountPercent: number; description: string } | null>(null);
  const [selectedProduct, setSelectedProductState] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [sizeGuideProduct, setSizeGuideProduct] = useState<Product | null>(null);
  const [latestOrder, setLatestOrder] = useState<Order | null>(null);
  const [isOrderHistoryOpen, setIsOrderHistoryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Shop filter options
  const [filterPriceRange, setFilterPriceRange] = useState<[number, number]>([0, 20000]);
  const [filterFabric, setFilterFabric] = useState<string>('All');
  const [filterSize, setFilterSize] = useState<string>('All');
  const [filterInStockOnly, setFilterInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'>('featured');
  const [gridCols, setGridCols] = useState<3 | 4>(3);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2800);
  };

  const setSelectedProduct = (p: Product | null) => {
    setSelectedProductState(p);
    if (p) {
      setRecentlyViewed((prev) => {
        const filtered = prev.filter((item) => item.id !== p.id);
        const updated = [p, ...filtered].slice(0, 5);
        try {
          localStorage.setItem(LOCAL_STORAGE_RECENT_KEY, JSON.stringify(updated));
        } catch {}
        return updated;
      });
    }
  };

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cart));
    } catch (e) {
      console.warn('Failed to save cart', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_WISHLIST_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.warn('Failed to save wishlist', e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_ORDERS_KEY, JSON.stringify(orders));
    } catch (e) {
      console.warn('Failed to save orders', e);
    }
  }, [orders]);

  const formatPrice = (priceInPkr: number): string => {
    const config = CURRENCIES[currency] || CURRENCIES.PKR;
    const converted = priceInPkr * config.rate;
    if (currency === 'PKR') {
      return `Rs. ${Math.round(priceInPkr).toLocaleString('en-PK')}`;
    }
    if (currency === 'AED') {
      return `AED ${Math.round(converted).toLocaleString()}`;
    }
    return `${config.symbol}${converted.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (product: Product, size: string, color: string, quantity = 1) => {
    const cartItemId = `${product.id}-${size}-${color}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.cartItemId === cartItemId);
      if (existing) {
        const newQty = Math.min(existing.quantity + quantity, existing.maxStock);
        return prev.map((item) =>
          item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item
        );
      } else {
        const newItem: CartItem = {
          cartItemId,
          productId: product.id,
          name: product.name,
          category: product.category,
          price: product.price,
          size,
          color,
          image: product.images.primary,
          quantity: Math.min(quantity, product.stockCount),
          maxStock: product.stockCount,
        };
        return [...prev, newItem];
      }
    });

    showToast(`Added "${product.name}" (${size}) to your cart`);
    setIsCartOpen(true);
  };

  const updateCartQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            return { ...item, quantity: Math.min(newQty, item.maxStock) };
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
    showToast('Item removed from cart');
  };

  const clearCart = () => {
    setCart([]);
  };

  const applyPromo = (code: string) => {
    const upper = code.trim().toUpperCase();
    const promo = PROMO_CODES[upper];
    if (!promo) {
      return { success: false, message: 'Invalid or expired coupon code.' };
    }
    if (promo.minSpend && subtotal < promo.minSpend) {
      return {
        success: false,
        message: `Coupon requires a minimum order of Rs. ${promo.minSpend.toLocaleString()}.`,
      };
    }
    setAppliedPromo({ code: upper, discountPercent: promo.discountPercent, description: promo.description });
    showToast(`Coupon ${upper} applied: ${promo.discountPercent}% Off`);
    return { success: true, message: `Applied ${promo.discountPercent}% discount.` };
  };

  const removePromo = () => {
    setAppliedPromo(null);
    showToast('Coupon removed');
  };

  // Subtotal in PKR
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = appliedPromo ? Math.round((subtotal * appliedPromo.discountPercent) / 100) : 0;
  const freeShippingThreshold = 4999;
  const amountUntilFreeShipping = Math.max(0, freeShippingThreshold - (subtotal - discountAmount));
  const shippingFee = (subtotal - discountAmount) >= freeShippingThreshold || cart.length === 0 ? 0 : 250;
  const taxableBase = Math.max(0, subtotal - discountAmount);
  const taxAmount = 0;
  const totalAmount = taxableBase + shippingFee + taxAmount;

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed suit from your wishlist');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Suit saved to your wishlist');
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const createOrder = (orderData: Omit<Order, 'id' | 'date' | 'currency' | 'subtotal' | 'discount' | 'tax' | 'total' | 'trackingNumber'>): Order => {
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const orderId = `PK-ZIM-${randomSuffix}`;
    const trackingNumber = `TCS-92${Math.floor(10000000 + Math.random() * 90000000)}`;
    const dateFormatted = new Date().toLocaleDateString('en-PK', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

    const newOrder: Order = {
      ...orderData,
      id: orderId,
      date: dateFormatted,
      currency,
      subtotal,
      discount: discountAmount,
      tax: taxAmount,
      total: totalAmount,
      trackingNumber,
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLatestOrder(newOrder);
    clearCart();
    setAppliedPromo(null);
    return newOrder;
  };

  const addReview = (
    productId: string,
    reviewData: {
      author: string;
      city: string;
      rating: number;
      title: string;
      comment: string;
      fitFeedback: 'True to Size' | 'Slightly Loose' | 'Fitted';
    }
  ) => {
    const newRev: ProductReview = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: new Date().toLocaleDateString('en-PK', { month: 'long', day: 'numeric', year: 'numeric' }),
      verifiedPurchase: true,
    };

    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const updatedReviews = [newRev, ...p.reviews];
          const newAvg = Number(
            (updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length).toFixed(1)
          );
          return {
            ...p,
            reviews: updatedReviews,
            reviewCount: updatedReviews.length,
            rating: newAvg,
          };
        }
        return p;
      })
    );

    setSelectedProductState((prev) => {
      if (prev && prev.id === productId) {
        const updatedReviews = [newRev, ...prev.reviews];
        const newAvg = Number(
          (updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length).toFixed(1)
        );
        return {
          ...prev,
          reviews: updatedReviews,
          reviewCount: updatedReviews.length,
          rating: newAvg,
        };
      }
      return prev;
    });

    showToast('Your verified review has been published');
  };

  const navigateToShopWithCategory = (categoryName: string) => {
    setActiveCategory(categoryName);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetAllFilters = () => {
    setActiveCategory('All');
    setFilterFabric('All');
    setFilterSize('All');
    setFilterPriceRange([0, 20000]);
    setFilterInStockOnly(false);
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        currency,
        setCurrency,
        formatPrice,
        cart,
        cartCount,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        appliedPromo,
        applyPromo,
        removePromo,
        subtotal,
        discountAmount,
        shippingFee,
        taxAmount,
        totalAmount,
        freeShippingThreshold,
        amountUntilFreeShipping,
        wishlist,
        toggleWishlist,
        isWishlisted,
        orders,
        createOrder,
        selectedProduct,
        setSelectedProduct,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        sizeGuideProduct,
        setSizeGuideProduct,
        latestOrder,
        setLatestOrder,
        isOrderHistoryOpen,
        setIsOrderHistoryOpen,
        addReview,
        searchQuery,
        setSearchQuery,
        activeCategory,
        setActiveCategory,
        toastMessage,
        showToast,
        currentView,
        setCurrentView,
        navigateToShopWithCategory,
        filterPriceRange,
        setFilterPriceRange,
        filterFabric,
        setFilterFabric,
        filterSize,
        setFilterSize,
        filterInStockOnly,
        setFilterInStockOnly,
        sortBy,
        setSortBy,
        gridCols,
        setGridCols,
        resetAllFilters,
        recentlyViewed,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
