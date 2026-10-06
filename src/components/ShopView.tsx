import React, { useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import {
  SlidersHorizontal,
  X,
  Search,
  Sparkles,
  Grid3X3,
  LayoutGrid,
  ChevronRight,
  Filter,
  Check,
  RotateCcw,
} from 'lucide-react';

export const ShopView: React.FC = () => {
  const {
    products,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
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
    setCurrentView,
    currentView,
  } = useStore();

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

  // Filtered & Sorted Product logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Special Page view overrides
        if (currentView === 'new-arrivals' && !p.isNew) return false;
        if (currentView === 'festive' && !p.isEidCollection) return false;
        if (currentView === 'sale' && !p.originalPrice) return false;

        // Category filter
        if (activeCategory !== 'All' && p.category !== activeCategory) {
          return false;
        }

        // Price filter
        if (p.price < filterPriceRange[0] || p.price > filterPriceRange[1]) {
          return false;
        }

        // Fabric filter
        if (filterFabric !== 'All') {
          const matchFab = p.fabric.toLowerCase().includes(filterFabric.toLowerCase());
          const matchComp = p.composition.toLowerCase().includes(filterFabric.toLowerCase());
          const matchDup = p.dupatta.toLowerCase().includes(filterFabric.toLowerCase());
          const matchDesc = p.description.toLowerCase().includes(filterFabric.toLowerCase());
          if (!matchFab && !matchComp && !matchDup && !matchDesc) return false;
        }

        // Size filter
        if (filterSize !== 'All' && !p.sizes.includes(filterSize)) {
          return false;
        }

        // In-stock only
        if (filterInStockOnly && p.stockCount <= 0) {
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
        if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        // Featured
        if (a.isEidCollection && !b.isEidCollection) return -1;
        if (!a.isEidCollection && b.isEidCollection) return 1;
        return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
      });
  }, [
    products,
    currentView,
    activeCategory,
    filterPriceRange,
    filterFabric,
    filterSize,
    filterInStockOnly,
    searchQuery,
    sortBy,
  ]);

  const hasActiveFilters =
    activeCategory !== 'All' ||
    filterFabric !== 'All' ||
    filterSize !== 'All' ||
    filterPriceRange[1] < 20000 ||
    filterInStockOnly ||
    searchQuery !== '';

  const getPageTitle = () => {
    if (currentView === 'new-arrivals') return "New Summer Arrivals '26";
    if (currentView === 'festive') return 'Eid Festive Lawn Collection';
    if (currentView === 'sale') return 'Summer Archive Sale & Offers';
    if (activeCategory !== 'All') return activeCategory;
    return 'All Summer Pret & Lawn';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-6 font-light">
        <button
          onClick={() => setCurrentView('home')}
          className="hover:text-black transition-colors cursor-pointer"
        >
          Home
        </button>
        <ChevronRight className="w-3 h-3 text-neutral-400" />
        <button
          onClick={() => {
            setCurrentView('shop');
            setActiveCategory('All');
          }}
          className="hover:text-black transition-colors cursor-pointer"
        >
          Shop
        </button>
        {activeCategory !== 'All' && (
          <>
            <ChevronRight className="w-3 h-3 text-neutral-400" />
            <span className="text-black font-medium">{activeCategory}</span>
          </>
        )}
      </nav>

      {/* Page Title & Counter */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#EAE7E0]">
        <div>
          <h1 className="text-3xl sm:text-4xl font-display font-medium text-black">
            {getPageTitle()}
          </h1>
          <p className="text-xs text-neutral-500 mt-1 font-light">
            Breathable summer lawn, handcrafted schiffli, and tailored matching sets with Cash on Delivery nationwide.
          </p>
        </div>

        {/* Top Controls: Counter, Grid Switch & Sort */}
        <div className="flex items-center gap-4 text-xs">
          <span className="font-mono text-neutral-500 tabular-nums hidden sm:inline">
            Showing {filteredProducts.length} of {products.length} suits
          </span>

          {/* Grid Layout Switch */}
          <div className="hidden md:flex items-center border border-[#EAE7E0] p-0.5 rounded-sm bg-white">
            <button
              onClick={() => setGridCols(3)}
              className={`p-1.5 transition-colors cursor-pointer ${
                gridCols === 3 ? 'bg-[#1A1A1A] text-white' : 'text-neutral-500 hover:text-black'
              }`}
              title="3 Columns Grid"
            >
              <Grid3X3 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setGridCols(4)}
              className={`p-1.5 transition-colors cursor-pointer ${
                gridCols === 4 ? 'bg-[#1A1A1A] text-white' : 'text-neutral-500 hover:text-black'
              }`}
              title="4 Columns Grid"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <span className="text-neutral-500 uppercase tracking-wider text-[11px]">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-[#EAE7E0] px-3 py-1.5 text-xs text-black font-medium focus:outline-none cursor-pointer"
            >
              <option value="featured">Featured Edit</option>
              <option value="newest">Newest Drops</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <div className="py-3 flex flex-wrap items-center gap-2 border-b border-[#EAE7E0]">
          <span className="text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mr-1">
            Active Filters:
          </span>

          {activeCategory !== 'All' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-[#EAE7E0] text-xs text-black">
              <span>{activeCategory}</span>
              <button onClick={() => setActiveCategory('All')} className="p-0.5 hover:text-red-700">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filterFabric !== 'All' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-[#EAE7E0] text-xs text-black">
              <span>Fabric: {filterFabric}</span>
              <button onClick={() => setFilterFabric('All')} className="p-0.5 hover:text-red-700">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filterSize !== 'All' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-[#EAE7E0] text-xs text-black">
              <span>Size: {filterSize}</span>
              <button onClick={() => setFilterSize('All')} className="p-0.5 hover:text-red-700">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filterPriceRange[1] < 20000 && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-[#EAE7E0] text-xs text-black">
              <span>Under Rs. {filterPriceRange[1].toLocaleString()}</span>
              <button onClick={() => setFilterPriceRange([0, 20000])} className="p-0.5 hover:text-red-700">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filterInStockOnly && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-[#EAE7E0] text-xs text-black">
              <span>In Stock Only</span>
              <button onClick={() => setFilterInStockOnly(false)} className="p-0.5 hover:text-red-700">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {searchQuery && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-[#EAE7E0] text-xs text-black">
              <span>"{searchQuery}"</span>
              <button onClick={() => setSearchQuery('')} className="p-0.5 hover:text-red-700">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          <button
            onClick={resetAllFilters}
            className="text-xs uppercase tracking-wider text-neutral-500 hover:text-black underline ml-2 cursor-pointer"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Main Layout: Left Sidebar + Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
        {/* Left Filter Sidebar (3 Cols) */}
        <aside className="lg:col-span-3 space-y-6">
          {/* Categories List */}
          <div className="p-5 bg-white border border-[#EAE7E0]">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-black mb-3 pb-2 border-b border-[#EAE7E0] flex items-center justify-between">
              <span>Categories</span>
              <Filter className="w-3.5 h-3.5 text-neutral-400" />
            </h3>
            <div className="space-y-1">
              {categories.map((cat) => {
                const count =
                  cat === 'All'
                    ? products.length
                    : products.filter((p) => p.category === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full text-left py-1.5 px-2 text-xs flex items-center justify-between transition-colors cursor-pointer rounded-xs ${
                      activeCategory === cat
                        ? 'bg-[#1A1A1A] text-white font-medium'
                        : 'text-neutral-600 hover:text-black hover:bg-neutral-50'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className="font-mono text-[11px] opacity-70">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="p-5 bg-white border border-[#EAE7E0] space-y-3">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-black pb-2 border-b border-[#EAE7E0]">
              Price Range (PKR)
            </h3>
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-neutral-600 mb-2">
                <span>Rs. 0</span>
                <span>Rs. {filterPriceRange[1].toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="4000"
                max="20000"
                step="1000"
                value={filterPriceRange[1]}
                onChange={(e) => setFilterPriceRange([0, Number(e.target.value)])}
                className="w-full accent-black cursor-pointer"
              />
            </div>
          </div>

          {/* Size Filter */}
          <div className="p-5 bg-white border border-[#EAE7E0] space-y-3">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-black pb-2 border-b border-[#EAE7E0]">
              Pret Size
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {sizes.map((sz) => (
                <button
                  key={sz}
                  onClick={() => setFilterSize(sz)}
                  className={`py-1.5 text-xs font-mono border transition-colors cursor-pointer ${
                    filterSize === sz
                      ? 'bg-black text-white border-black font-semibold'
                      : 'border-[#EAE7E0] text-neutral-700 hover:border-black'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Fabric Type Filter */}
          <div className="p-5 bg-white border border-[#EAE7E0] space-y-3">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-black pb-2 border-b border-[#EAE7E0]">
              Fabric & Needlework
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {fabrics.map((fab) => (
                <button
                  key={fab}
                  onClick={() => setFilterFabric(fab)}
                  className={`px-2.5 py-1 text-xs border transition-colors cursor-pointer ${
                    filterFabric === fab
                      ? 'bg-black text-white border-black font-medium'
                      : 'border-[#EAE7E0] text-neutral-700 hover:border-black bg-white'
                  }`}
                >
                  {fab}
                </button>
              ))}
            </div>
          </div>

          {/* In Stock Only Checkbox */}
          <div className="p-5 bg-white border border-[#EAE7E0]">
            <label className="flex items-center gap-2.5 text-xs text-neutral-700 cursor-pointer">
              <input
                type="checkbox"
                checked={filterInStockOnly}
                onChange={(e) => setFilterInStockOnly(e.target.checked)}
                className="accent-black w-4 h-4 cursor-pointer"
              />
              <span className="font-medium">In Stock at Lahore Atelier</span>
            </label>
          </div>
        </aside>

        {/* Product Grid Area (9 Cols) */}
        <main className="lg:col-span-9">
          {filteredProducts.length === 0 ? (
            <div className="py-24 text-center space-y-4 bg-white border border-[#EAE7E0] p-8">
              <Search className="w-10 h-10 text-neutral-300 mx-auto stroke-1" />
              <h3 className="text-xl font-serif text-black">No Matching Suits Found</h3>
              <p className="text-xs text-neutral-500 font-light max-w-sm mx-auto">
                No designs match your chosen filters. Try resetting the category or price range to explore the collection.
              </p>
              <button
                onClick={resetAllFilters}
                className="px-6 py-2.5 bg-black text-white text-xs uppercase tracking-widest font-medium hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div
              className={`grid gap-6 sm:gap-8 ${
                gridCols === 4
                  ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'
                  : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
              }`}
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
