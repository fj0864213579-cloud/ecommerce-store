import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { SlidersHorizontal, X, Search, Sparkles } from 'lucide-react';

export const CatalogSection: React.FC = () => {
  const {
    products,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
  } = useStore();

  const [selectedFabric, setSelectedFabric] = useState<string>('All');
  const [selectedSize, setSelectedSize] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  const categories = [
    'All',
    '3-Piece Suits',
    '2-Piece Pret',
    '1-Piece Kurtis',
    'Co-ords & Fusion',
    'Festive Lawn',
  ];

  const fabrics = [
    'All',
    'Pure Lawn',
    'Chikankari',
    'Schiffli',
    'Cotton Lawn',
    'Voile Silk Dupatta',
  ];

  const sizes = ['All', 'XS', 'S', 'M', 'L', 'XL'];

  // Filter and sort logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (activeCategory !== 'All' && p.category !== activeCategory) {
          return false;
        }
        // Fabric filter
        if (selectedFabric !== 'All') {
          const matchFab = p.fabric.toLowerCase().includes(selectedFabric.toLowerCase());
          const matchComp = p.composition.toLowerCase().includes(selectedFabric.toLowerCase());
          const matchDup = p.dupatta.toLowerCase().includes(selectedFabric.toLowerCase());
          const matchDesc = p.description.toLowerCase().includes(selectedFabric.toLowerCase());
          if (!matchFab && !matchComp && !matchDup && !matchDesc) return false;
        }
        // Size filter
        if (selectedSize !== 'All' && !p.sizes.includes(selectedSize)) {
          return false;
        }
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchSub = p.subtitle.toLowerCase().includes(q);
          const matchFabric = p.fabric.toLowerCase().includes(q);
          const matchComp = p.composition.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchDup = p.dupatta.toLowerCase().includes(q);
          if (!matchName && !matchSub && !matchFabric && !matchComp && !matchDesc && !matchDup) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        // default featured: Eid collection and bestsellers first
        if (a.isEidCollection && !b.isEidCollection) return -1;
        if (!a.isEidCollection && b.isEidCollection) return 1;
        if (a.isBestseller && !b.isBestseller) return -1;
        if (!a.isBestseller && b.isBestseller) return 1;
        return 0;
      });
  }, [products, activeCategory, selectedFabric, selectedSize, searchQuery, sortBy]);

  const hasActiveFilters =
    activeCategory !== 'All' || selectedFabric !== 'All' || selectedSize !== 'All' || searchQuery !== '';

  const handleResetFilters = () => {
    setActiveCategory('All');
    setSelectedFabric('All');
    setSelectedSize('All');
    setSearchQuery('');
  };

  return (
    <section id="collection-catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#EAE7E0]">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-neutral-500 font-medium">
            <span>Summer Lawn '26 Pret</span>
            <span aria-hidden="true">·</span>
            <span>Stitched & Unstitched</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display text-[#1A1A1A] mt-1 font-normal">
            Summer Lawn & Festive Wardrobe
          </h2>
        </div>

        {/* Results Counter & Controls */}
        <div className="flex items-center gap-4 text-xs">
          <span className="font-mono text-neutral-500 tabular-nums">
            Showing {filteredProducts.length} of {products.length} designs
          </span>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-neutral-500 uppercase tracking-wider text-[11px]">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent border border-[#EAE7E0] px-2.5 py-1 text-xs text-[#1A1A1A] font-medium focus:outline-none"
            >
              <option value="featured">Featured Summer Edit</option>
              <option value="price-asc">Price: Low to High (PKR)</option>
              <option value="price-desc">Price: High to Low (PKR)</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="py-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#ECE8DF]/70 border border-[#E4E0D7] rounded-sm">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-[#1A1A1A] text-white shadow-xs'
                  : 'text-neutral-600 hover:text-black hover:bg-black/5'
              }`}
            >
              {cat === 'All' ? 'All Summer Pieces' : cat}
            </button>
          ))}
        </div>

        {/* Filter Toggle & Reset */}
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="text-xs uppercase tracking-wider text-neutral-500 hover:text-black flex items-center gap-1 px-3 py-1.5 border border-[#EAE7E0] transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}

          <button
            onClick={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)}
            className={`px-3.5 py-2 border text-xs uppercase tracking-wider font-medium flex items-center gap-2 transition-colors ${
              isFilterDrawerOpen
                ? 'bg-black text-white border-black'
                : 'border-[#EAE7E0] text-neutral-700 hover:border-black bg-white'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filter by Fabric / Size</span>
          </button>
        </div>
      </div>

      {/* Expanded Filter Panel */}
      {isFilterDrawerOpen && (
        <div className="mb-8 p-5 bg-[#F6F4EE] border border-[#EAE7E0] grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-200">
          {/* Fabric Filter */}
          <div>
            <label className="text-[11px] uppercase tracking-wider text-neutral-600 font-semibold block mb-2">
              Lawn Fabric & Craft:
            </label>
            <div className="flex flex-wrap gap-1.5">
              {fabrics.map((fab) => (
                <button
                  key={fab}
                  onClick={() => setSelectedFabric(fab)}
                  className={`px-2.5 py-1 text-xs transition-colors border ${
                    selectedFabric === fab
                      ? 'bg-black text-white border-black font-medium'
                      : 'bg-white text-neutral-700 border-[#EAE7E0] hover:border-neutral-400'
                  }`}
                >
                  {fab}
                </button>
              ))}
            </div>
          </div>

          {/* Size Filter */}
          <div>
            <label className="text-[11px] uppercase tracking-wider text-neutral-600 font-semibold block mb-2">
              Pret Size:
            </label>
            <div className="flex flex-wrap gap-1.5">
              {sizes.map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`w-9 h-8 text-xs font-mono transition-colors border flex items-center justify-center ${
                    selectedSize === sz
                      ? 'bg-black text-white border-black font-semibold'
                      : 'bg-white text-neutral-700 border-[#EAE7E0] hover:border-neutral-400'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Search Term helper */}
          <div>
            <label className="text-[11px] uppercase tracking-wider text-neutral-600 font-semibold block mb-2">
              Search by Keyword:
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Sage mint, chikankari, culottes, Eid..."
                className="w-full p-2 bg-white border border-[#EAE7E0] text-xs focus:outline-none focus:border-black pr-8"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-2.5 text-neutral-400 hover:text-black"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center space-y-4 bg-[#F6F4EE] border border-[#EAE7E0]">
          <Search className="w-10 h-10 text-neutral-300 mx-auto stroke-1" />
          <h3 className="text-xl font-serif text-black">No Matching Suits Found</h3>
          <p className="text-xs text-neutral-500 font-light max-w-sm mx-auto">
            Try resetting your fabric or category filters to explore the rest of the summer lawn archive.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-6 py-2.5 bg-black text-white text-xs uppercase tracking-widest font-medium hover:bg-neutral-800 transition-colors"
          >
            Show All Summer Suits
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};
