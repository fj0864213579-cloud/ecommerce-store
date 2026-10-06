import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight, Check, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  const {
    setIsOrderHistoryOpen,
    setIsSizeGuideOpen,
    setSizeGuideProduct,
    products,
    showToast,
  } = useStore();

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setIsSubscribed(true);
    showToast('Subscribed! Check your inbox for 10% Off Summer Lawn code.');
    setNewsletterEmail('');
  };

  const handleOpenGeneralSizeGuide = () => {
    if (products.length > 0) {
      setSizeGuideProduct(products[0]);
      setIsSizeGuideOpen(true);
    }
  };

  return (
    <footer className="bg-[#161616] text-[#F3F1EC] pt-16 pb-12 border-t border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Tier: Wordmark + Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-neutral-800">
          <div className="lg:col-span-5 space-y-3">
            <h3 className="font-display text-3xl sm:text-4xl tracking-[0.22em] uppercase font-light text-white">
              Zimal
            </h3>
            <p className="text-xs text-neutral-400 font-light max-w-sm leading-relaxed">
              Designer Pakistani pret, summer lawn, and festive Eid couture for girls & women. Delivered nationwide with Cash on Delivery.
            </p>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center">
            <p className="text-xs uppercase tracking-widest text-neutral-300 font-medium mb-2">
              Join the Zimal Lawn Privilege List
            </p>
            <p className="text-xs text-neutral-400 font-light mb-4">
              Get instant updates on lawn launches, festive previews, and exclusive discount codes.
            </p>

            {isSubscribed ? (
              <div className="p-3 bg-neutral-900 border border-neutral-700 text-xs text-neutral-200 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Shukriya! Use code <strong>ZIMAL10</strong> at checkout for 10% off.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
                <input
                  type="email"
                  required
                  placeholder="Enter email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 px-4 py-3 bg-neutral-900 border border-neutral-700 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-white font-sans"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-white text-black text-xs uppercase tracking-widest font-semibold hover:bg-neutral-200 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Second Tier: Navigation & Studios */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-xs text-neutral-400">
          <div className="space-y-3">
            <p className="uppercase tracking-widest text-white font-medium text-[11px]">
              Customer Care
            </p>
            <ul className="space-y-2 font-light">
              <li>
                <button
                  onClick={() => setIsOrderHistoryOpen(true)}
                  className="hover:text-white transition-colors text-left"
                >
                  Track Order (TCS / Leopards)
                </button>
              </li>
              <li>
                <button
                  onClick={handleOpenGeneralSizeGuide}
                  className="hover:text-white transition-colors text-left"
                >
                  Pakistani Pret Size Chart
                </button>
              </li>
              <li>
                <span className="text-neutral-300">7-Day Hassle-Free Exchange</span>
              </li>
              <li>
                <span className="text-neutral-300">Cash on Delivery (COD) FAQs</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="uppercase tracking-widest text-white font-medium text-[11px]">
              Summer Categories
            </p>
            <ul className="space-y-2 font-light">
              <li>3-Piece Luxury Embroidered Lawn</li>
              <li>2-Piece Stitched Pret Suits</li>
              <li>Summer Lawn Co-ord Sets</li>
              <li>Handcrafted Chikankari Kurtis</li>
              <li>Eid Festive Collection</li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="uppercase tracking-widest text-white font-medium text-[11px]">
              Flagship Stores in Pakistan
            </p>
            <ul className="space-y-2 font-light text-[11px]">
              <li>
                <strong className="text-white font-normal">Lahore:</strong> MM Alam Road, Gulberg III
              </li>
              <li>
                <strong className="text-white font-normal">Karachi:</strong> Dolmen Mall Clifton, 1st Floor
              </li>
              <li>
                <strong className="text-white font-normal">Islamabad:</strong> Beverly Centre, Blue Area
              </li>
              <li>
                <strong className="text-white font-normal">Faisalabad:</strong> Kohinoor City
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="uppercase tracking-widest text-white font-medium text-[11px]">
              Contact & WhatsApp
            </p>
            <p className="font-light text-neutral-400">
              Orders helpline & sizing assistance available 10 AM to 10 PM PKT.
            </p>
            <p className="font-mono text-white text-[11px] flex items-center gap-1.5">
              <Phone className="w-3 h-3 text-emerald-400" />
              <span>+92 300 8492019 (WhatsApp)</span>
            </p>
            <p className="font-mono text-neutral-400 text-[11px]">support@zimal.pk</p>
          </div>
        </div>

        {/* Bottom Tier: Copyright */}
        <div className="pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500 font-light">
          <p>© 2026 ZIMAL APPAREL PAKISTAN. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Cash on Delivery Across Pakistan</span>
            <span>·</span>
            <span>EasyPaisa & JazzCash Integrated</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
