import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Tag,
  ShoppingBag,
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateCartQuantity,
    removeFromCart,
    subtotal,
    discountAmount,
    shippingFee,
    taxAmount,
    totalAmount,
    freeShippingThreshold,
    amountUntilFreeShipping,
    formatPrice,
    appliedPromo,
    applyPromo,
    removePromo,
    setIsCheckoutOpen,
  } = useStore();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError(null);
    if (!promoInput.trim()) return;
    const res = applyPromo(promoInput);
    if (!res.success) {
      setPromoError(res.message);
    } else {
      setPromoInput('');
    }
  };

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const freeShippingProgress = Math.min(
    100,
    Math.round(((freeShippingThreshold - amountUntilFreeShipping) / freeShippingThreshold) * 100)
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-[#FAF9F6] h-full flex flex-col shadow-2xl border-l border-[#EAE7E0] animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#EAE7E0] flex items-center justify-between bg-[#FAF9F6]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-[#1A1A1A]" />
            <h2 className="text-base font-serif font-medium uppercase tracking-wider text-[#1A1A1A]">
              Shopping Bag
            </h2>
            <span className="text-xs font-mono text-neutral-500">
              ({cart.reduce((s, i) => s + i.quantity, 0)} suits)
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 text-neutral-400 hover:text-black transition-colors"
            aria-label="Close bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress in Pakistan (Threshold: Rs. 4,999) */}
        <div className="px-5 py-3.5 bg-[#F4F1EA] border-b border-[#EAE7E0] text-xs">
          {amountUntilFreeShipping > 0 ? (
            <div>
              <p className="text-neutral-700">
                Add <span className="font-semibold text-black">{formatPrice(amountUntilFreeShipping)}</span> more to unlock <span className="font-semibold text-emerald-800">Free Delivery Across Pakistan</span>.
              </p>
              <div className="w-full bg-[#E3DFD5] h-1.5 mt-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#1A1A1A] h-full transition-all duration-300"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-emerald-900 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-800" />
              <span>Free Delivery across Pakistan unlocked!</span>
            </div>
          )}
        </div>

        {/* Cart Itemized List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
              <ShoppingBag className="w-10 h-10 text-neutral-300 stroke-1" />
              <p className="font-serif text-lg text-neutral-800">Your bag is empty.</p>
              <p className="text-xs text-neutral-500 max-w-xs font-light">
                Discover our Summer Lawn '26 embroidered pret suits and kurtis.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  const el = document.getElementById('collection-catalog');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="mt-2 px-6 py-2.5 bg-[#1A1A1A] text-white text-xs uppercase tracking-widest font-medium hover:bg-neutral-800 transition-colors"
              >
                Browse Summer Lawn
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.cartItemId}
                className="flex gap-4 p-3 bg-white border border-[#EAE7E0] shadow-2xs"
              >
                <div className="w-20 h-24 bg-[#F2EFE8] shrink-0 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-xs font-medium text-[#1A1A1A] leading-snug line-clamp-1">
                        {item.name}
                      </h3>
                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="text-neutral-400 hover:text-red-700 p-0.5 transition-colors"
                        title="Remove suit"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-neutral-500 mt-1">
                      <span>Size: {item.size}</span>
                      <span aria-hidden="true">·</span>
                      <span>Color: {item.color}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#F0ECE4]">
                    <div className="flex items-center border border-[#EAE7E0]">
                      <button
                        onClick={() => updateCartQuantity(item.cartItemId, -1)}
                        className="p-1 hover:bg-[#FAF9F6] text-neutral-600 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center font-mono text-xs tabular-nums font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.cartItemId, 1)}
                        className="p-1 hover:bg-[#FAF9F6] text-neutral-600 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-xs font-mono font-semibold tabular-nums text-[#1A1A1A]">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Footer */}
        {cart.length > 0 && (
          <div className="p-5 bg-white border-t border-[#EAE7E0] space-y-4">
            {/* Promo Code Form */}
            <div>
              {appliedPromo ? (
                <div className="p-2.5 bg-[#F6F4EE] border border-[#EAE7E0] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Tag className="w-3.5 h-3.5 text-neutral-600" />
                    <span className="font-mono font-medium text-black">{appliedPromo.code}</span>
                    <span className="text-neutral-500">(-{appliedPromo.discountPercent}%)</span>
                  </div>
                  <button
                    onClick={removePromo}
                    className="text-[11px] text-neutral-500 hover:text-black uppercase tracking-wider underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="space-y-1">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Discount Code (e.g. SUMMER15, ZIMAL10)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="flex-1 px-3 py-2 border border-[#EAE7E0] text-xs font-mono uppercase placeholder:normal-case placeholder:font-sans focus:outline-none focus:border-black"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-neutral-900 text-white text-xs uppercase tracking-wider font-medium hover:bg-black transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {promoError && (
                    <p className="text-[11px] text-red-600 font-medium">{promoError}</p>
                  )}
                </form>
              )}
            </div>

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-neutral-600 font-light">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums font-normal text-black">{formatPrice(subtotal)}</span>
              </div>
              {appliedPromo && (
                <div className="flex justify-between text-emerald-800">
                  <span>Special Discount ({appliedPromo.code})</span>
                  <span className="font-mono tabular-nums">-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Nationwide Shipping</span>
                <span className="font-mono tabular-nums">
                  {shippingFee === 0 ? 'Free Shipping' : formatPrice(shippingFee)}
                </span>
              </div>
              <div className="pt-2 border-t border-[#EAE7E0] flex justify-between text-sm font-semibold text-[#1A1A1A]">
                <span className="uppercase tracking-wider">Total (PKR)</span>
                <span className="font-mono tabular-nums text-base">{formatPrice(totalAmount)}</span>
              </div>
            </div>

            {/* Checkout Action */}
            <button
              onClick={handleProceedCheckout}
              className="w-full py-3.5 bg-[#1A1A1A] text-white text-xs uppercase tracking-[0.18em] font-medium hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <span>Proceed to Checkout / COD</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[10px] text-center text-neutral-400 uppercase tracking-widest font-light">
              Cash on Delivery Available Across Pakistan
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
