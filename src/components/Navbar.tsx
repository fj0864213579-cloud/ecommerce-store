import React, { useState } from 'react';
import { useStore, StoreView } from '../context/StoreContext';
import { Currency } from '../types/store';
import {
  ShoppingBag,
  Heart,
  Search,
  Package,
  X,
  Menu,
  ChevronDown,
  Sparkles,
  Percent,
  HelpCircle,
  Phone,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    cartCount,
    setIsCartOpen,
    wishlist,
    setIsWishlistOpen,
    currency,
    setCurrency,
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    orders,
    setIsOrderHistoryOpen,
    currentView,
    setCurrentView,
    subtotal,
    formatPrice,
  } = useStore();

  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);

  const navLinks: { label: string; view: StoreView; highlight?: boolean; badge?: string }[] = [
    { label: 'Home', view: 'home' },
    { label: 'Shop All', view: 'shop' },
    { label: 'New Arrivals', view: 'new-arrivals', badge: 'Hot' },
    { label: 'Festive Eid', view: 'festive' },
    { label: 'Sale', view: 'sale', highlight: true, badge: 'Up to 25% Off' },
    { label: 'Contact & FAQs', view: 'contact' },
  ];

  const handleNavClick = (view: StoreView) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currenciesList: Currency[] = ['PKR', 'USD', 'GBP', 'AED'];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#EAE7E0] transition-colors">
      {/* Top Announcement Bar */}
      {isBannerVisible && (
        <div className="bg-[#1A1A1A] text-[#F3F1EC] px-4 py-2 text-xs flex items-center justify-between tracking-wider uppercase font-light">
          <div className="mx-auto flex items-center gap-3">
            <span className="font-medium text-emerald-300">Free Nationwide Delivery on orders over Rs. 4,999</span>
            <span className="hidden md:inline text-neutral-400">·</span>
            <span className="hidden md:inline text-neutral-300">Cash on Delivery (COD) · EasyPaisa · JazzCash</span>
            <span className="hidden lg:inline text-neutral-400">·</span>
            <span className="hidden lg:inline text-amber-200">Use Code ZIMAL10 for 10% Off</span>
          </div>
          <button
            onClick={() => setIsBannerVisible(false)}
            aria-label="Dismiss announcement"
            className="text-neutral-400 hover:text-white transition-colors p-0.5 ml-2 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Top Navigation: 3 Zones */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Zone 1: Single Wordmark Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-1.5 text-neutral-700 hover:text-black focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <button
            onClick={() => handleNavClick('home')}
            className="text-2xl sm:text-3xl font-display font-medium tracking-[0.22em] text-[#1A1A1A] uppercase hover:opacity-80 transition-opacity text-left cursor-pointer"
          >
            Zimal
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs uppercase tracking-[0.14em] font-medium text-neutral-600">
          {navLinks.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.view)}
              className={`hover:text-[#1A1A1A] transition-colors py-1 relative whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                currentView === item.view ? 'text-[#1A1A1A] font-semibold' : ''
              } ${item.highlight ? 'text-amber-800 font-semibold' : ''}`}
            >
              <span>{item.label}</span>
              {item.badge && (
                <span className={`text-[9px] px-1.5 py-0.2 rounded-full uppercase tracking-widest ${
                  item.highlight ? 'bg-amber-100 text-amber-900 font-bold' : 'bg-black text-white'
                }`}>
                  {item.badge}
                </span>
              )}
              {currentView === item.view && (
                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#1A1A1A]" />
              )}
            </button>
          ))}
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2 sm:gap-3.5">
          {/* Search Trigger */}
          <button
            onClick={() => setIsSearchActive(!isSearchActive)}
            className="p-2 text-neutral-700 hover:text-black transition-colors rounded-full hover:bg-black/5 cursor-pointer"
            aria-label="Toggle search"
            title="Search collection"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Currency Switcher */}
          <div className="relative">
            <button
              onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
              className="flex items-center gap-1 text-xs tracking-wider font-medium text-neutral-700 hover:text-black px-2 py-1.5 rounded hover:bg-black/5 transition-colors cursor-pointer"
              aria-label="Change currency"
            >
              <span>{currency}</span>
              <ChevronDown className="w-3 h-3 text-neutral-400" />
            </button>
            {isCurrencyDropdownOpen && (
              <div className="absolute right-0 mt-1 w-28 bg-white border border-[#EAE7E0] shadow-md py-1 z-50 rounded-sm">
                {currenciesList.map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      setCurrency(c);
                      setIsCurrencyDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs hover:bg-[#FAF9F6] transition-colors flex items-center justify-between cursor-pointer ${
                      currency === c ? 'font-semibold text-black bg-[#FAF9F6]' : 'text-neutral-600'
                    }`}
                  >
                    <span>{c}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Order Tracking */}
          <button
            onClick={() => setIsOrderHistoryOpen(true)}
            className="relative p-2 text-neutral-700 hover:text-black transition-colors rounded-full hover:bg-black/5 hidden sm:flex items-center cursor-pointer"
            aria-label="Track orders"
            title="Track TCS / Leopards Orders"
          >
            <Package className="w-4 h-4" />
            {orders.length > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-600" />
            )}
          </button>

          {/* Wishlist */}
          <button
            onClick={() => setIsWishlistOpen(true)}
            className="relative p-2 text-neutral-700 hover:text-black transition-colors rounded-full hover:bg-black/5 cursor-pointer"
            aria-label="Open wishlist"
            title="Saved suits"
          >
            <Heart className="w-4 h-4" />
            {wishlist.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[17px] h-[17px] px-1 bg-[#1A1A1A] text-white text-[10px] font-mono rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Shopping Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 bg-[#1A1A1A] text-white px-3.5 py-2 text-xs font-medium tracking-wider uppercase hover:bg-neutral-800 transition-colors cursor-pointer shadow-2xs"
            aria-label="Shopping cart"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Cart</span>
            <span className="font-mono tabular-nums text-neutral-200">({cartCount})</span>
          </button>
        </div>
      </div>

      {/* Expandable Search Input Bar */}
      {isSearchActive && (
        <div className="bg-[#FAF9F6] border-t border-[#EAE7E0] px-4 py-3">
          <div className="max-w-3xl mx-auto flex items-center gap-3">
            <Search className="w-4 h-4 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search embroidered lawn, schiffli, chikankari kurtis, co-ords, sizes..."
              autoFocus
              className="w-full bg-transparent text-sm text-[#1A1A1A] focus:outline-none placeholder:text-neutral-400 font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-neutral-500 hover:text-black uppercase tracking-wider cursor-pointer"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => setIsSearchActive(false)}
              className="text-neutral-400 hover:text-black p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-[#EAE7E0] bg-[#FAF9F6] px-6 py-6 space-y-4">
          <div className="space-y-2">
            <p className="text-[11px] uppercase tracking-widest text-neutral-400 font-medium mb-1">
              Store Navigation
            </p>
            {navLinks.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.view)}
                className={`flex items-center justify-between w-full text-left py-2 text-sm uppercase tracking-wider cursor-pointer ${
                  currentView === item.view ? 'font-semibold text-black' : 'text-neutral-600'
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[10px] px-2 py-0.5 bg-black text-white font-mono rounded">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-[#EAE7E0] flex items-center justify-between">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsOrderHistoryOpen(true);
              }}
              className="text-xs uppercase tracking-wider flex items-center gap-2 text-neutral-700 cursor-pointer"
            >
              <Package className="w-4 h-4" />
              <span>Track Orders ({orders.length})</span>
            </button>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsCartOpen(true);
              }}
              className="text-xs uppercase tracking-wider font-semibold text-black cursor-pointer flex items-center gap-1"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>View Cart ({cartCount})</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
