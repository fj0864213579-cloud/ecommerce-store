import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  Star,
  Ruler,
  Check,
  Shield,
  Truck,
  Heart,
  Plus,
  Minus,
  Sparkles,
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    formatPrice,
    addToCart,
    isWishlisted,
    toggleWishlist,
    setIsSizeGuideOpen,
    setSizeGuideProduct,
    setIsCheckoutOpen,
    addReview,
  } = useStore();

  if (!selectedProduct) return null;

  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(selectedProduct.sizes[0] || 'S');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'care' | 'reviews'>('details');

  // Review Form state
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [reviewName, setReviewName] = useState('');
  const [reviewCity, setReviewCity] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewFit, setReviewFit] = useState<'True to Size' | 'Slightly Loose' | 'Fitted'>('True to Size');

  const currentColor = selectedProduct.colors[selectedColorIndex] || selectedProduct.colors[0];
  const isSaved = isWishlisted(selectedProduct.id);

  const handleOpenSizeGuide = () => {
    setSizeGuideProduct(selectedProduct);
    setIsSizeGuideOpen(true);
  };

  const handleAdd = () => {
    addToCart(selectedProduct, selectedSize, currentColor.name, quantity);
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, selectedSize, currentColor.name, quantity);
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) return;

    addReview(selectedProduct.id, {
      author: reviewName.trim(),
      city: reviewCity.trim() || 'Pakistan',
      rating: reviewRating,
      title: reviewTitle.trim() || 'Loved this summer lawn suit',
      comment: reviewComment.trim(),
      fitFeedback: reviewFit,
    });

    setReviewName('');
    setReviewCity('');
    setReviewTitle('');
    setReviewComment('');
    setIsReviewFormOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6">
      <div className="relative bg-[#FAF9F6] border border-[#EAE7E0] max-w-5xl w-full max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col">
        {/* Sticky Close Bar */}
        <div className="sticky top-0 right-0 z-20 flex justify-end p-4 bg-[#FAF9F6]/90 backdrop-blur-sm border-b border-[#EAE7E0]/60">
          <button
            onClick={() => setSelectedProduct(null)}
            className="p-1.5 text-neutral-500 hover:text-black transition-colors rounded hover:bg-black/5"
            aria-label="Close product view"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Gallery Column (Left 6 Cols) */}
            <div className="lg:col-span-6 space-y-4">
              <div className="aspect-[3/4] bg-[#F2EFE8] border border-[#EAE7E0] overflow-hidden relative">
                <img
                  src={selectedProduct.images.primary}
                  alt={selectedProduct.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
                <button
                  onClick={() => toggleWishlist(selectedProduct.id)}
                  className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-colors ${
                    isSaved
                      ? 'bg-[#1A1A1A] text-white'
                      : 'bg-white/80 text-neutral-700 hover:text-black'
                  }`}
                  aria-label="Save to wishlist"
                >
                  <Heart className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
                </button>
              </div>

              {/* Detail thumbnails */}
              {selectedProduct.images.detail && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="aspect-[4/3] bg-[#EAE6DD] border border-[#EAE7E0] overflow-hidden">
                    <img
                      src={selectedProduct.images.detail}
                      alt={`${selectedProduct.name} embroidery detail`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="aspect-[4/3] bg-[#F0ECE4] border border-[#EAE7E0] p-4 flex flex-col justify-center text-xs text-neutral-600">
                    <span className="font-semibold text-[#1A1A1A] uppercase tracking-wider text-[11px]">
                      Dupatta & Fabric
                    </span>
                    <p className="mt-1 text-neutral-600 font-light">{selectedProduct.dupatta}</p>
                    <p className="mt-1 font-mono text-[10px] text-neutral-500">Origin: {selectedProduct.origin}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Purchase Module (Right 6 Cols) */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                {/* Unboxed Metadata */}
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-neutral-500 font-medium">
                  <span>{selectedProduct.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedProduct.fabric}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedProduct.type}</span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-serif text-[#1A1A1A] mt-2 font-normal leading-tight">
                  {selectedProduct.name}
                </h1>

                <p className="text-sm text-neutral-500 mt-1 font-light">
                  {selectedProduct.subtitle}
                </p>

                {/* Rating & Reviews */}
                <div className="flex items-center gap-3 mt-3 text-xs text-neutral-600">
                  <div className="flex items-center text-amber-900">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(selectedProduct.rating)
                            ? 'fill-amber-700 text-amber-700'
                            : 'text-neutral-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-mono font-medium">{selectedProduct.rating}</span>
                  <span aria-hidden="true">·</span>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className="underline hover:text-black transition-colors"
                  >
                    {selectedProduct.reviewCount} Verified Client Reviews
                  </button>
                </div>

                {/* Price */}
                <div className="mt-5 pb-5 border-b border-[#EAE7E0] flex items-baseline gap-3">
                  <span className="text-2xl font-mono font-medium text-[#1A1A1A] tabular-nums">
                    {formatPrice(selectedProduct.price)}
                  </span>
                  {selectedProduct.originalPrice && (
                    <span className="text-sm font-mono text-neutral-400 line-through tabular-nums">
                      {formatPrice(selectedProduct.originalPrice)}
                    </span>
                  )}
                  <span className="text-xs uppercase tracking-wider text-emerald-800 font-medium">
                    In Stock at Lahore Atelier
                  </span>
                </div>

                {/* Color Selection */}
                <div className="mt-5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="uppercase tracking-wider text-neutral-500 font-medium">
                      Color Palette:
                    </span>
                    <span className="font-medium text-[#1A1A1A]">{currentColor.name}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-2.5">
                    {selectedProduct.colors.map((c, idx) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColorIndex(idx)}
                        className={`group relative flex items-center gap-2 px-3 py-1.5 border transition-all ${
                          selectedColorIndex === idx
                            ? 'border-[#1A1A1A] bg-white text-black shadow-xs'
                            : 'border-[#EAE7E0] text-neutral-600 hover:border-neutral-400'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/20"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span className="text-xs font-light">{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Selection */}
                <div className="mt-6">
                  <div className="flex items-center justify-between text-xs">
                    <span className="uppercase tracking-wider text-neutral-500 font-medium">
                      Select Pret Size:
                    </span>
                    <button
                      onClick={handleOpenSizeGuide}
                      className="flex items-center gap-1.5 text-neutral-700 hover:text-black underline uppercase tracking-wider text-[11px] font-medium"
                    >
                      <Ruler className="w-3.5 h-3.5" />
                      <span>Pakistani Sizing Chart</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-5 gap-2 mt-2.5">
                    {selectedProduct.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`py-2 text-xs font-mono transition-all border ${
                          selectedSize === sz
                            ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] font-semibold'
                            : 'bg-white text-neutral-700 border-[#EAE7E0] hover:border-neutral-400'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>

                  <p className="text-[11px] text-neutral-500 mt-2 font-light">
                    {selectedProduct.modelInfo}
                  </p>
                </div>

                {/* Quantity & Buy CTAs */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-[#EAE7E0] bg-white">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        disabled={quantity <= 1}
                        className="p-3 text-neutral-500 hover:text-black disabled:opacity-30"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-10 text-center font-mono text-xs font-semibold tabular-nums">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity((q) => Math.min(selectedProduct.stockCount, q + 1))}
                        disabled={quantity >= selectedProduct.stockCount}
                        className="p-3 text-neutral-500 hover:text-black disabled:opacity-30"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={handleAdd}
                      className="flex-1 py-3.5 px-6 bg-[#1A1A1A] text-white text-xs uppercase tracking-[0.18em] font-medium hover:bg-neutral-800 transition-colors cursor-pointer text-center"
                    >
                      Add to Shopping Bag
                    </button>
                  </div>

                  <button
                    onClick={handleBuyNow}
                    className="w-full py-3.5 px-6 border border-[#1A1A1A] text-[#1A1A1A] text-xs uppercase tracking-[0.18em] font-medium hover:bg-[#1A1A1A] hover:text-white transition-colors cursor-pointer text-center"
                  >
                    Cash on Delivery / Buy Now · {formatPrice(selectedProduct.price * quantity)}
                  </button>
                </div>

                {/* Pakistan Logistics Guarantees */}
                <div className="mt-6 pt-6 border-t border-[#EAE7E0] grid grid-cols-2 gap-4 text-xs text-neutral-600">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-neutral-500 shrink-0" />
                    <span>Nationwide COD & TCS 2–3 Days</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-neutral-500 shrink-0" />
                    <span>7-Day Hassle-Free Exchange</span>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="mt-8 pt-6 border-t border-[#EAE7E0]">
                <div className="flex items-center gap-6 border-b border-[#EAE7E0] text-xs uppercase tracking-wider font-medium">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`pb-2.5 transition-colors relative ${
                      activeTab === 'details' ? 'text-black font-semibold' : 'text-neutral-500'
                    }`}
                  >
                    Suit Breakdown
                    {activeTab === 'details' && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-black" />
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab('care')}
                    className={`pb-2.5 transition-colors relative ${
                      activeTab === 'care' ? 'text-black font-semibold' : 'text-neutral-500'
                    }`}
                  >
                    Washing & Fabric
                    {activeTab === 'care' && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-black" />
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`pb-2.5 transition-colors relative ${
                      activeTab === 'reviews' ? 'text-black font-semibold' : 'text-neutral-500'
                    }`}
                  >
                    Reviews ({selectedProduct.reviews.length})
                    {activeTab === 'reviews' && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-black" />
                    )}
                  </button>
                </div>

                <div className="py-4 text-xs text-neutral-600 leading-relaxed font-light">
                  {activeTab === 'details' && (
                    <div className="space-y-2.5">
                      <p>{selectedProduct.description}</p>
                      <div className="pt-2 grid grid-cols-2 gap-2 text-neutral-700">
                        <div>
                          <span className="font-semibold text-black uppercase tracking-wider text-[10px] block">Shirt Fabric:</span>
                          {selectedProduct.fabric}
                        </div>
                        <div>
                          <span className="font-semibold text-black uppercase tracking-wider text-[10px] block">Dupatta:</span>
                          {selectedProduct.dupatta}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'care' && (
                    <div className="space-y-2">
                      <p className="font-medium text-black">Pakistani Summer Lawn Care Instructions:</p>
                      <p>{selectedProduct.careInstructions}</p>
                      <p className="text-neutral-500 pt-1">
                        Always iron lawn garments while slightly damp or with steam to retain pristine crispness.
                      </p>
                    </div>
                  )}

                  {activeTab === 'reviews' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-800 font-medium">
                          {selectedProduct.reviews.length} Verified Customer Reviews
                        </span>
                        <button
                          onClick={() => setIsReviewFormOpen(!isReviewFormOpen)}
                          className="px-3 py-1.5 border border-black text-black hover:bg-black hover:text-white uppercase tracking-wider text-[11px] transition-colors"
                        >
                          {isReviewFormOpen ? 'Close Form' : 'Write a Review'}
                        </button>
                      </div>

                      {/* Interactive Review Form */}
                      {isReviewFormOpen && (
                        <form
                          onSubmit={handleReviewSubmit}
                          className="p-4 bg-white border border-[#EAE7E0] space-y-3"
                        >
                          <p className="text-xs font-semibold uppercase tracking-wider text-black">
                            Share Your Experience with Zimal
                          </p>
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              required
                              placeholder="Your Name (e.g. Mahnoor)"
                              value={reviewName}
                              onChange={(e) => setReviewName(e.target.value)}
                              className="p-2 border border-neutral-300 text-xs focus:outline-none focus:border-black"
                            />
                            <input
                              type="text"
                              placeholder="Your City (e.g. Lahore, Karachi, Islamabad)"
                              value={reviewCity}
                              onChange={(e) => setReviewCity(e.target.value)}
                              className="p-2 border border-neutral-300 text-xs focus:outline-none focus:border-black"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-[10px] uppercase tracking-wider text-neutral-500 block mb-1">
                                Rating:
                              </label>
                              <select
                                value={reviewRating}
                                onChange={(e) => setReviewRating(Number(e.target.value))}
                                className="w-full p-2 border border-neutral-300 text-xs bg-white"
                              >
                                <option value={5}>5 Stars - Loved the Suit</option>
                                <option value={4}>4 Stars - Great Fabric</option>
                                <option value={3}>3 Stars - Satisfactory</option>
                              </select>
                            </div>
                            <div>
                              <label className="text-[10px] uppercase tracking-wider text-neutral-500 block mb-1">
                                Fit:
                              </label>
                              <select
                                value={reviewFit}
                                onChange={(e) => setReviewFit(e.target.value as any)}
                                className="w-full p-2 border border-neutral-300 text-xs bg-white"
                              >
                                <option value="True to Size">True to Size</option>
                                <option value="Slightly Loose">Slightly Loose</option>
                                <option value="Fitted">Fitted</option>
                              </select>
                            </div>
                          </div>

                          <input
                            type="text"
                            placeholder="Title (e.g. Excellent lawn quality and stitching!)"
                            value={reviewTitle}
                            onChange={(e) => setReviewTitle(e.target.value)}
                            className="w-full p-2 border border-neutral-300 text-xs focus:outline-none focus:border-black"
                          />

                          <textarea
                            required
                            rows={3}
                            placeholder="Tell other Pakistani girls about the fabric feel, embroidery finishing, and sizing..."
                            value={reviewComment}
                            onChange={(e) => setReviewComment(e.target.value)}
                            className="w-full p-2 border border-neutral-300 text-xs focus:outline-none focus:border-black"
                          />

                          <button
                            type="submit"
                            className="w-full py-2 bg-black text-white text-xs uppercase tracking-wider font-medium hover:bg-neutral-800 transition-colors"
                          >
                            Submit Review
                          </button>
                        </form>
                      )}

                      {/* Review List */}
                      <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                        {selectedProduct.reviews.map((rev) => (
                          <div key={rev.id} className="p-3 bg-[#F6F4EE] border border-[#EAE7E0] space-y-1.5">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-black">{rev.author}</span>
                                <span className="text-neutral-500 font-mono text-[10px]">({rev.city})</span>
                                {rev.verifiedPurchase && (
                                  <span className="text-[10px] text-emerald-800 uppercase tracking-widest font-medium">
                                    · Verified Buyer
                                  </span>
                                )}
                              </div>
                              <span className="text-[10px] text-neutral-400 font-mono">{rev.date}</span>
                            </div>

                            <div className="flex items-center gap-2">
                              <div className="flex text-amber-800">
                                {[...Array(rev.rating)].map((_, i) => (
                                  <Star key={i} className="w-3 h-3 fill-amber-700 text-amber-700" />
                                ))}
                              </div>
                              <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-medium">
                                · Fit: {rev.fitFeedback}
                              </span>
                            </div>

                            <p className="font-medium text-black text-xs">{rev.title}</p>
                            <p className="text-neutral-600 text-xs leading-relaxed">{rev.comment}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
