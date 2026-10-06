import React from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import {
  Truck,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Star,
  CheckCircle,
  Tag,
  Copy,
  Heart,
  Eye,
  Shirt,
  Scissors,
  Feather,
  Clock,
  ChevronRight,
  ShoppingBag,
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const {
    products,
    navigateToShopWithCategory,
    setCurrentView,
    setSelectedProduct,
    showToast,
  } = useStore();

  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    showToast(`Coupon code ${code} copied to clipboard!`);
  };

  const categories = [
    {
      name: '3-Piece Suits',
      title: '3-Piece Luxury Lawn',
      subtitle: 'Embroidered Shirt + Trouser + Voile Silk Dupatta',
      image: '/src/assets/images/product_pastel_lawn_suit_1791267135094.jpg',
      itemCount: products.filter((p) => p.category === '3-Piece Suits').length,
    },
    {
      name: '1-Piece Kurtis',
      title: 'Chikankari Kurtis',
      subtitle: 'Breezy Handcrafted Shadow Work & Lace',
      image: '/src/assets/images/product_chikankari_kurti_1791267150893.jpg',
      itemCount: products.filter((p) => p.category === '1-Piece Kurtis').length,
    },
    {
      name: 'Co-ords & Fusion',
      title: 'Summer Co-ord Sets',
      subtitle: 'Modern Botanical Prints with Culottes',
      image: '/src/assets/images/product_summer_coords_1791267163881.jpg',
      itemCount: products.filter((p) => p.category === 'Co-ords & Fusion').length,
    },
    {
      name: 'Festive Lawn',
      title: "Eid Festive '26",
      subtitle: 'Gold Zari & Sequin Work for Celebrations',
      image: '/src/assets/images/hero_pakistani_summer_lawn_1791267117813.jpg',
      itemCount: products.filter((p) => p.category === 'Festive Lawn').length,
    },
  ];

  const bestSellers = products.filter((p) => p.isBestseller).slice(0, 3);
  const newArrivals = products.filter((p) => p.isNew).slice(0, 3);

  return (
    <div className="space-y-16 lg:space-y-24">
      {/* 1. Hero Campaign Section */}
      <section className="relative w-full bg-[#FAF9F6] border-b border-[#EAE7E0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Hero Left Copy */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-neutral-500 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                <span>Summer Pret '26 Launch</span>
                <span aria-hidden="true">·</span>
                <span>Lahore Atelier</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-normal text-[#1A1A1A] leading-[1.08] tracking-tight [text-wrap:balance]">
                Gul-e-Bahar. Breezy Lawn & Pure Chiffon.
              </h1>

              <p className="text-base text-neutral-600 font-light leading-relaxed max-w-xl">
                Tailored for radiant Pakistani summers. Superfine 80x80 combed Egyptian lawn, delicate schiffli embroidery, and ethereal 2.5-meter pure silk dupattas.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={() => setCurrentView('shop')}
                  className="px-6 py-3.5 bg-[#1A1A1A] text-white text-xs font-medium uppercase tracking-[0.16em] hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 group cursor-pointer shadow-xs"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Shop Full Collection</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  onClick={() => setCurrentView('festive')}
                  className="px-6 py-3.5 border border-[#1A1A1A] text-[#1A1A1A] text-xs font-medium uppercase tracking-[0.16em] hover:bg-[#1A1A1A] hover:text-white transition-colors cursor-pointer text-center flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                  <span>Eid Festive Edit</span>
                </button>
              </div>

              {/* Quick Trust Highlights with Icons */}
              <div className="pt-6 border-t border-[#EAE7E0] grid grid-cols-3 gap-4 text-neutral-600">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#1A1A1A]">
                    <Truck className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
                    <span>Nationwide COD</span>
                  </div>
                  <p className="text-[11px] text-neutral-500">Pay cash upon delivery</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#1A1A1A]">
                    <Feather className="w-3.5 h-3.5 text-amber-800 shrink-0" />
                    <span>80x80 Lawn</span>
                  </div>
                  <p className="text-[11px] text-neutral-500">100% Breathable cotton</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#1A1A1A]">
                    <RotateCcw className="w-3.5 h-3.5 text-neutral-800 shrink-0" />
                    <span>7-Day Return</span>
                  </div>
                  <p className="text-[11px] text-neutral-500">Hassle-free size exchange</p>
                </div>
              </div>
            </div>

            {/* Hero Right Visual Banner */}
            <div className="lg:col-span-7">
              <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] overflow-hidden bg-[#ECE8E1] border border-[#EAE7E0] shadow-sm">
                <img
                  src="/src/assets/images/hero_pakistani_summer_lawn_1791267117813.jpg"
                  alt="Pakistani Girls Summer Lawn Collection Campaign"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center filter saturate-[0.98] contrast-[1.02] transition-transform duration-700 hover:scale-[1.02]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs tracking-wider uppercase font-light">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>Pastel Schiffli & Silk Studies</span>
                  </div>
                  <span className="font-mono">Karachi · Lahore · Islamabad</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Value Propositions Bar with Rich Icons */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white border border-[#EAE7E0] shadow-xs">
          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-full bg-[#FAF9F6] border border-[#EAE7E0] flex items-center justify-center shrink-0 text-black">
              <Truck className="w-5 h-5 text-neutral-800" />
            </div>
            <div>
              <p className="text-xs uppercase font-semibold text-black tracking-wider">Free Delivery</p>
              <p className="text-[11px] text-neutral-500">Across Pakistan &gt; Rs. 4,999</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-full bg-[#FAF9F6] border border-[#EAE7E0] flex items-center justify-center shrink-0 text-black">
              <ShieldCheck className="w-5 h-5 text-emerald-800" />
            </div>
            <div>
              <p className="text-xs uppercase font-semibold text-black tracking-wider">Cash on Delivery</p>
              <p className="text-[11px] text-neutral-500">Pay to TCS / Leopards rider</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-full bg-[#FAF9F6] border border-[#EAE7E0] flex items-center justify-center shrink-0 text-black">
              <RotateCcw className="w-5 h-5 text-amber-800" />
            </div>
            <div>
              <p className="text-xs uppercase font-semibold text-black tracking-wider">Easy Exchange</p>
              <p className="text-[11px] text-neutral-500">7 days replacement policy</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-full bg-[#FAF9F6] border border-[#EAE7E0] flex items-center justify-center shrink-0 text-black">
              <Sparkles className="w-5 h-5 text-neutral-800" />
            </div>
            <div>
              <p className="text-xs uppercase font-semibold text-black tracking-wider">EasyPaisa & JazzCash</p>
              <p className="text-[11px] text-neutral-500">Instant digital checkout</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Shop by Category Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between pb-6 border-b border-[#EAE7E0]">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-neutral-500 font-medium">
              <Shirt className="w-3.5 h-3.5 text-neutral-600" />
              <span>Wardrobe Taxonomy</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-black mt-1">
              Shop by Summer Category
            </h2>
          </div>
          <button
            onClick={() => setCurrentView('shop')}
            className="text-xs uppercase tracking-wider text-black font-semibold hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All Categories</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {categories.map((cat) => (
            <div
              key={cat.name}
              onClick={() => navigateToShopWithCategory(cat.name)}
              className="group relative bg-[#FAF9F6] border border-[#EAE7E0] overflow-hidden cursor-pointer hover:border-black transition-all hover:-translate-y-1 shadow-xs flex flex-col justify-between"
            >
              <div className="aspect-[4/5] overflow-hidden bg-[#ECE8E1]">
                <img
                  src={cat.image}
                  alt={cat.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-4 bg-white border-t border-[#EAE7E0]">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-serif font-medium text-black group-hover:text-amber-900 transition-colors">
                    {cat.title}
                  </h3>
                  <span className="text-xs font-mono text-neutral-500">
                    {cat.itemCount} Designs
                  </span>
                </div>
                <p className="text-[11px] text-neutral-500 font-light mt-0.5 line-clamp-1">
                  {cat.subtitle}
                </p>
                <div className="mt-2 text-xs uppercase tracking-wider font-semibold text-black flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Explore Now</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Best Sellers Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between pb-6 border-b border-[#EAE7E0]">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-neutral-500 font-medium">
              <Star className="w-3.5 h-3.5 text-amber-700 fill-amber-700" />
              <span>Customer Favorites</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-black mt-1">
              Trending Summer Best Sellers
            </h2>
          </div>
          <button
            onClick={() => setCurrentView('shop')}
            className="text-xs uppercase tracking-wider text-black font-semibold hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>See All Best Sellers</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-8">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. Promotional Privilege Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1A1A1A] text-white p-8 sm:p-12 border border-black shadow-lg relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
            <div className="md:col-span-8 space-y-3">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-amber-300 font-mono">
                <Tag className="w-3.5 h-3.5" />
                <span>Summer Privilege Voucher</span>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif leading-tight">
                Get 15% Off Your Summer Lawn Order
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 font-light max-w-xl leading-relaxed">
                Enjoy an exclusive 15% discount on orders above Rs. 10,000 across our entire summer stitched and unstitched lawn catalog.
              </p>
            </div>

            <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-3">
              <div className="p-3 bg-neutral-900 border border-neutral-700 rounded flex items-center gap-3">
                <span className="font-mono text-base font-bold text-amber-300 tracking-wider">
                  SUMMER15
                </span>
                <button
                  onClick={() => handleCopyCode('SUMMER15')}
                  className="p-1 hover:text-amber-200 text-neutral-400 transition-colors cursor-pointer"
                  title="Copy code"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => setCurrentView('shop')}
                className="px-6 py-2.5 bg-white text-black text-xs uppercase tracking-widest font-semibold hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                Apply in Shop
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. New Summer Arrivals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between pb-6 border-b border-[#EAE7E0]">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-neutral-500 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-neutral-700" />
              <span>Just Dropped</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-black mt-1">
              New Summer Pret Arrivals
            </h2>
          </div>
          <button
            onClick={() => setCurrentView('new-arrivals')}
            className="text-xs uppercase tracking-wider text-black font-semibold hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All New ({products.filter((p) => p.isNew).length})</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-8">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 7. Client Reviews with Verified Badges */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <div className="flex items-center justify-center gap-1 text-amber-700">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-700 text-amber-700" />
            ))}
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-black">
            Loved by Girls Across Pakistan
          </h2>
          <p className="text-xs text-neutral-500 font-light">
            Real feedback from verified customers in Karachi, Lahore, Islamabad, and Faisalabad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white border border-[#EAE7E0] space-y-3 shadow-2xs">
            <div className="flex text-amber-700">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-700 text-amber-700" />
              ))}
            </div>
            <p className="text-xs text-neutral-700 leading-relaxed font-light italic">
              "The lawn fabric is unbelievably soft and airy. In the Lahore heat, it keeps you completely cool. Stitching fits like bespoke designer couture!"
            </p>
            <div className="pt-2 border-t border-[#F0ECE4] flex items-center justify-between text-xs">
              <span className="font-semibold text-black">Ayesha Siddiqui</span>
              <span className="text-neutral-500 text-[11px]">DHA, Lahore</span>
            </div>
          </div>

          <div className="p-6 bg-white border border-[#EAE7E0] space-y-3 shadow-2xs">
            <div className="flex text-amber-700">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-700 text-amber-700" />
              ))}
            </div>
            <p className="text-xs text-neutral-700 leading-relaxed font-light italic">
              "Delivered via TCS Cash on Delivery in only 2 days to Clifton. The chikankari embroidery on the kurti is so clean. Definitely ordering more for Eid!"
            </p>
            <div className="pt-2 border-t border-[#F0ECE4] flex items-center justify-between text-xs">
              <span className="font-semibold text-black">Zainab Fatima</span>
              <span className="text-neutral-500 text-[11px]">Clifton, Karachi</span>
            </div>
          </div>

          <div className="p-6 bg-white border border-[#EAE7E0] space-y-3 shadow-2xs">
            <div className="flex text-amber-700">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-700 text-amber-700" />
              ))}
            </div>
            <p className="text-xs text-neutral-700 leading-relaxed font-light italic">
              "The 2-piece co-ord set with culottes is my absolute summer staple for university. Pockets in trousers are a huge plus point. 10/10!"
            </p>
            <div className="pt-2 border-t border-[#F0ECE4] flex items-center justify-between text-xs">
              <span className="font-semibold text-black">Mahnoor Khan</span>
              <span className="text-neutral-500 text-[11px]">F-7, Islamabad</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
