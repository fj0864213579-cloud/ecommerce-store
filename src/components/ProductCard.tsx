import React, { useState } from 'react';
import { Product } from '../types/store';
import { useStore } from '../context/StoreContext';
import {
  Heart,
  Eye,
  ShoppingBag,
  Sparkles,
  Percent,
  Check,
  ChevronDown,
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    formatPrice,
    setSelectedProduct,
    addToCart,
    isWishlisted,
    toggleWishlist,
  } = useStore();

  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  const activeColor = product.colors[selectedColorIndex] || product.colors[0];
  const isSaved = isWishlisted(product.id);

  // Discount percentage calculation
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleQuickAddSize = (e: React.MouseEvent, size: string) => {
    e.stopPropagation();
    addToCart(product, size, activeColor.name, 1);
    setIsQuickAddOpen(false);
  };

  return (
    <div
      onClick={() => setSelectedProduct(product)}
      className="group flex flex-col bg-[#FAF9F6] border border-[#EAE7E0] hover:border-black transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] cursor-pointer relative"
    >
      {/* Product Image Stage */}
      <div className="relative aspect-[3/4] bg-[#F4F1EA] overflow-hidden">
        {!imageError ? (
          <img
            src={product.images.primary}
            alt={product.name}
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#EDE9E1]">
            <span className="font-display text-xl text-neutral-800">{product.name}</span>
            <span className="text-xs uppercase tracking-widest text-neutral-500 mt-2">
              {product.fabric}
            </span>
          </div>
        )}

        {/* Top Badges with detailed icons */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none z-10">
          {product.isEidCollection && (
            <span className="bg-[#1A1A1A] text-[10px] uppercase tracking-[0.16em] font-medium text-amber-200 px-2.5 py-1 shadow-xs flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>Eid Festive</span>
            </span>
          )}
          {product.isNew && !product.isEidCollection && (
            <span className="bg-[#FAF9F6]/95 backdrop-blur-sm text-[10px] uppercase tracking-[0.16em] font-medium text-[#1A1A1A] px-2.5 py-1 border border-[#EAE7E0] shadow-xs">
              Summer '26
            </span>
          )}
          {discountPercent > 0 && (
            <span className="bg-emerald-900 text-[10px] uppercase tracking-[0.14em] font-medium text-white px-2 py-0.5 flex items-center gap-1 shadow-xs">
              <Percent className="w-2.5 h-2.5 text-emerald-300" />
              <span>{discountPercent}% OFF</span>
            </span>
          )}
        </div>

        {/* Top Right Wishlist Action */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors z-10 cursor-pointer shadow-xs ${
            isSaved
              ? 'bg-[#1A1A1A] text-white'
              : 'bg-white/80 text-neutral-700 hover:text-black hover:bg-white'
          }`}
          aria-label={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
          title={isSaved ? 'Saved in wishlist' : 'Save suit'}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
        </button>

        {/* Hover Quick Actions: View Details & Quick Add to Cart */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-2 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProduct(product);
            }}
            className="flex-1 bg-white/95 backdrop-blur-md text-[#1A1A1A] text-xs uppercase tracking-[0.14em] py-2.5 font-medium hover:bg-[#1A1A1A] hover:text-white transition-colors border border-black/10 flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsQuickAddOpen(!isQuickAddOpen);
            }}
            className="bg-[#1A1A1A] text-white px-3 py-2.5 text-xs uppercase tracking-wider font-medium hover:bg-neutral-800 transition-colors shadow-sm flex items-center gap-1 cursor-pointer"
            title="Add to Cart with Size"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add</span>
            <ChevronDown className="w-3 h-3" />
          </button>
        </div>

        {/* Quick Size Flyout for direct Add to Cart */}
        {isQuickAddOpen && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-x-3 bottom-14 bg-white border border-[#EAE7E0] shadow-xl p-3 z-20 animate-in fade-in zoom-in-95 duration-150"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase tracking-wider text-neutral-600 font-semibold flex items-center gap-1">
                <ShoppingBag className="w-3 h-3 text-black" />
                <span>Select Pret Size:</span>
              </span>
              <span className="text-[10px] text-neutral-500 font-medium">{activeColor.name}</span>
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              {product.sizes.map((sz) => (
                <button
                  key={sz}
                  onClick={(e) => handleQuickAddSize(e, sz)}
                  className="py-1 text-xs font-mono border border-neutral-300 hover:border-black hover:bg-[#1A1A1A] hover:text-white transition-colors text-center cursor-pointer font-medium"
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Product Metadata & Price */}
      <div className="p-4 flex flex-col flex-1 justify-between bg-[#FAF9F6]">
        <div>
          {/* Metadata: Category & Type */}
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-neutral-500 mb-1">
            <span>{product.category}</span>
            <span aria-hidden="true">·</span>
            <span>{product.fabric}</span>
          </div>

          {/* Product Name */}
          <h3 className="text-base font-serif font-medium text-[#1A1A1A] group-hover:text-black line-clamp-1 leading-snug">
            {product.name}
          </h3>

          <p className="text-xs text-neutral-500 line-clamp-1 mt-0.5 font-light">
            {product.subtitle}
          </p>
        </div>

        <div className="pt-3 mt-3 border-t border-[#EAE7E0] flex items-center justify-between">
          {/* Color Swatches */}
          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            {product.colors.map((color, idx) => (
              <button
                key={color.name}
                onClick={() => setSelectedColorIndex(idx)}
                className={`w-3.5 h-3.5 rounded-full border transition-all cursor-pointer ${
                  selectedColorIndex === idx
                    ? 'border-[#1A1A1A] scale-110 ring-1 ring-offset-1 ring-[#1A1A1A]'
                    : 'border-black/20 hover:scale-105'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
                aria-label={`Color ${color.name}`}
              />
            ))}
            <span className="text-[11px] text-neutral-500 ml-1 hidden sm:inline">
              {activeColor.name}
            </span>
          </div>

          {/* Price with Tabular Numerals */}
          <div className="flex items-baseline gap-2">
            {product.originalPrice && (
              <span className="text-xs text-neutral-400 line-through font-mono tabular-nums">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <span className="text-sm font-semibold font-mono tabular-nums text-[#1A1A1A]">
              {formatPrice(product.price)}
            </span>
          </div>
        </div>

        {/* Stock status indicator */}
        {product.stockCount <= 10 && (
          <div className="mt-2 text-[10px] tracking-wider uppercase text-amber-800 font-medium">
            Only {product.stockCount} stitched suits left in stock
          </div>
        )}
      </div>
    </div>
  );
};
