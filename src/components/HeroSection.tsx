import React from 'react';
import { ArrowRight, Truck, RefreshCw, ShieldCheck, Sparkles } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const scrollToCollection = () => {
    const el = document.getElementById('collection-catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToEditorial = () => {
    const el = document.getElementById('atelier-editorial');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full bg-[#FAF9F6] border-b border-[#EAE7E0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Editorial Content (Left 5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-neutral-500 font-medium">
              <span>Summer Pret '26</span>
              <span aria-hidden="true">·</span>
              <span>Lahore Atelier</span>
              <span aria-hidden="true">·</span>
              <span className="text-amber-800 font-semibold">Eid & Festive Ready</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-normal text-[#1A1A1A] leading-[1.08] tracking-tight [text-wrap:balance]">
              Gul-e-Bahar. Breezy Lawn & Pure Chiffon.
            </h1>

            <p className="text-base text-neutral-600 font-light leading-relaxed max-w-xl">
              Tailored for radiant Pakistani summers. Feather-light combed 80x80 pure lawn adorned with delicate schiffli embroidery, handcrafted chikankari, and diaphanous pure voile silk dupattas.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={scrollToCollection}
                className="px-6 py-3.5 bg-[#1A1A1A] text-white text-xs font-medium uppercase tracking-[0.16em] hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 group cursor-pointer shadow-xs"
              >
                <span>Shop Summer Collection</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={scrollToEditorial}
                className="px-6 py-3.5 border border-[#1A1A1A] text-[#1A1A1A] text-xs font-medium uppercase tracking-[0.16em] hover:bg-[#1A1A1A] hover:text-white transition-colors cursor-pointer text-center"
              >
                Fabric Craft Story
              </button>
            </div>

            {/* Pakistani Trust Markers */}
            <div className="pt-6 border-t border-[#EAE7E0] grid grid-cols-3 gap-4 text-neutral-600">
              <div>
                <p className="text-xs uppercase tracking-wider font-semibold text-[#1A1A1A]">Cash on Delivery</p>
                <p className="text-xs text-neutral-500 mt-0.5">All Over Pakistan</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider font-semibold text-[#1A1A1A]">100% Pure Lawn</p>
                <p className="text-xs text-neutral-500 mt-0.5">80x80 Breathable Weave</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider font-semibold text-[#1A1A1A]">Free Shipping</p>
                <p className="text-xs text-neutral-500 mt-0.5">On Orders &gt; Rs. 4,999</p>
              </div>
            </div>
          </div>

          {/* Visual Hero Banner (Right 7 Cols) */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] overflow-hidden bg-[#ECE8E1] border border-[#EAE7E0] shadow-sm">
              <img
                src="/src/assets/images/hero_pakistani_summer_lawn_1791267117813.jpg"
                alt="Zimal Pakistani Girls Summer Lawn Campaign"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center filter saturate-[0.98] contrast-[1.02] transition-transform duration-700 hover:scale-[1.02]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs tracking-wider uppercase font-light">
                <span>The Pastel Schiffli & Silk Studies</span>
                <span className="font-mono">Karachi · Lahore · Islamabad</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
