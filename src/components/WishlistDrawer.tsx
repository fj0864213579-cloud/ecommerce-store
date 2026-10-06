import React from 'react';
import { useStore } from '../context/StoreContext';
import { X, Heart, Trash2, ArrowRight } from 'lucide-react';

export const WishlistDrawer: React.FC = () => {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    products,
    toggleWishlist,
    setSelectedProduct,
    formatPrice,
  } = useStore();

  if (!isWishlistOpen) return null;

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-[#FAF9F6] h-full flex flex-col shadow-2xl border-l border-[#EAE7E0] animate-in slide-in-from-right duration-300">
        <div className="p-5 border-b border-[#EAE7E0] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-black" />
            <h2 className="text-base font-serif font-medium uppercase tracking-wider text-black">
              Saved Wardrobe
            </h2>
            <span className="text-xs font-mono text-neutral-500">({wishlist.length})</span>
          </div>
          <button
            onClick={() => setIsWishlistOpen(false)}
            className="p-1.5 text-neutral-400 hover:text-black transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {wishlistedProducts.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-3">
              <Heart className="w-10 h-10 text-neutral-300 stroke-1" />
              <p className="font-serif text-lg text-neutral-800">Your wishlist is empty.</p>
              <p className="text-xs text-neutral-500 max-w-xs font-light">
                Save pieces as you explore the collection to reconsider or purchase later.
              </p>
            </div>
          ) : (
            wishlistedProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => {
                  setSelectedProduct(p);
                  setIsWishlistOpen(false);
                }}
                className="flex gap-4 p-3 bg-white border border-[#EAE7E0] hover:border-black transition-colors cursor-pointer"
              >
                <div className="w-20 h-24 bg-[#F2EFE8] shrink-0 overflow-hidden">
                  <img
                    src={p.images.primary}
                    alt={p.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h3 className="text-xs font-medium text-black line-clamp-1 leading-snug">
                        {p.name}
                      </h3>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(p.id);
                        }}
                        className="text-neutral-400 hover:text-red-700 p-0.5"
                        title="Remove from wishlist"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-[11px] text-neutral-500 mt-0.5">{p.fabric}</p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#F0ECE4]">
                    <span className="text-xs font-mono font-semibold text-black">
                      {formatPrice(p.price)}
                    </span>
                    <span className="text-[11px] text-neutral-600 underline font-medium">
                      View Details
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-5 border-t border-[#EAE7E0] bg-white">
          <button
            onClick={() => setIsWishlistOpen(false)}
            className="w-full py-3 bg-[#1A1A1A] text-white text-xs uppercase tracking-widest font-medium hover:bg-neutral-800 transition-colors"
          >
            Continue Browsing
          </button>
        </div>
      </div>
    </div>
  );
};
