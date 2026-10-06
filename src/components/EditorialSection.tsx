import React from 'react';
import { Scissors, Feather, ShieldCheck } from 'lucide-react';

export const EditorialSection: React.FC = () => {
  return (
    <section id="atelier-editorial" className="bg-[#FAF9F6] border-t border-[#EAE7E0] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section 1: The Pakistani Summer Lawn Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-neutral-500 font-medium">
              <span>01. Provenance & Fabric</span>
              <span aria-hidden="true">·</span>
              <span>The Art of Pakistani Lawn</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-normal text-[#1A1A1A] leading-[1.12] [text-wrap:balance]">
              Designed for the poetry of Pakistani summers.
            </h2>

            <p className="text-sm text-neutral-600 font-light leading-relaxed">
              In Pakistan, summer lawn is not simply clothing—it is an art form. At Zimal, we weave superfine 80x80 combed Egyptian long-staple cotton yarns into a feather-light breathable canvas that stays naturally cool against the intense subcontinental sun. Each motif is rendered with meticulous needlework, organza cutwork, and fluid pure silk dupattas.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-[#EAE7E0]">
              <div>
                <p className="font-mono text-xl sm:text-2xl text-black font-semibold tabular-nums">
                  80x80<span className="text-xs uppercase font-sans font-normal ml-0.5">Weave</span>
                </p>
                <p className="text-xs uppercase tracking-wider text-neutral-500 mt-0.5">
                  Superfine Combed Lawn
                </p>
                <p className="text-xs text-neutral-500 mt-1 font-light">
                  Crisp yet weightless hand-feel engineered to breathe during humid peak heat.
                </p>
              </div>

              <div>
                <p className="font-mono text-xl sm:text-2xl text-black font-semibold tabular-nums">
                  2.5<span className="text-xs uppercase font-sans font-normal ml-0.5">Meters</span>
                </p>
                <p className="text-xs uppercase tracking-wider text-neutral-500 mt-0.5">
                  Flowing Silk Dupatta
                </p>
                <p className="text-xs text-neutral-500 mt-1 font-light">
                  Full length pure voile and silk dupattas that drape effortlessly over shoulders.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] bg-[#EAE6DD] border border-[#EAE7E0] overflow-hidden shadow-sm">
              <img
                src="/src/assets/images/hero_pakistani_summer_lawn_1791267117813.jpg"
                alt="Pakistani summer lawn photoshoot in Lahore"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center filter saturate-[0.95] hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs px-3 py-1.5 border border-[#EAE7E0] text-[11px] uppercase tracking-wider text-neutral-700 font-mono">
                Lahore Haveli Campaign · Summer '26
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Core Craftsmanship Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-[#EAE7E0]">
          <div className="space-y-3 p-6 bg-[#F6F4EE] border border-[#EAE7E0]">
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
              <Scissors className="w-4 h-4" />
            </div>
            <h3 className="text-base font-serif font-medium text-black">
              Tailored Pakistani Pret Cut
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed font-light">
              Expertly stitched with clean French seams, lined organza daaman borders, and comfortable matching trousers with functional pockets.
            </p>
          </div>

          <div className="space-y-3 p-6 bg-[#F6F4EE] border border-[#EAE7E0]">
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
              <Feather className="w-4 h-4" />
            </div>
            <h3 className="text-base font-serif font-medium text-black">
              Artisanal Needlework & Schiffli
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed font-light">
              Crafted in collaboration with heritage embroidery master artisans in Multan and Lahore using color-fast resham and metallic zari.
            </p>
          </div>

          <div className="space-y-3 p-6 bg-[#F6F4EE] border border-[#EAE7E0]">
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="text-base font-serif font-medium text-black">
              Cash on Delivery & Open Box
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed font-light">
              Shop with complete peace of mind. Pay the courier at your doorstep anywhere across Pakistan with 7-day easy exchange support.
            </p>
          </div>
        </div>

        {/* Section 3: Verified Client Testimonial */}
        <div className="p-8 sm:p-12 bg-white border border-[#EAE7E0] text-center max-w-3xl mx-auto space-y-4">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-semibold">
            Client Voices · Karachi · Lahore · Islamabad
          </p>
          <blockquote className="text-lg sm:text-xl font-serif text-[#1A1A1A] italic leading-relaxed [text-wrap:balance]">
            “The lawn is so incredibly soft and breathable in the Karachi heat, and the pure silk dupatta is like wearing a cloud. Zimal’s pret stitching fits perfectly right out of the box!”
          </blockquote>
          <div className="pt-2 text-xs text-neutral-600">
            <span className="font-semibold text-black">Dr. Alizeh Qureshi</span>
            <span className="text-neutral-400 mx-1.5">·</span>
            <span>Clifton, Karachi</span>
            <span className="text-neutral-400 mx-1.5">·</span>
            <span className="text-emerald-800 font-mono text-[11px]">Verified Summer Collection Buyer</span>
          </div>
        </div>
      </div>
    </section>
  );
};
