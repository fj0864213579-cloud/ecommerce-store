/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { ShopView } from './components/ShopView';
import { ContactFaqView } from './components/ContactFaqView';
import { EditorialSection } from './components/EditorialSection';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { OrderHistoryModal } from './components/OrderHistoryModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckCircle2 } from 'lucide-react';

const ToastOverlay: React.FC = () => {
  const { toastMessage } = useStore();
  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-3 duration-200">
      <div className="bg-[#1A1A1A] text-white px-4 py-3 shadow-xl border border-neutral-700 flex items-center gap-2.5 text-xs tracking-wide">
        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
        <span className="font-light">{toastMessage}</span>
      </div>
    </div>
  );
};

const StoreMain: React.FC = () => {
  const { currentView } = useStore();

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1A1A1A] flex flex-col font-sans selection:bg-[#1A1A1A] selection:text-[#FAF9F6]">
      {/* Top Navigation Bar with Home, Shop, Badges, Cart */}
      <Navbar />

      {/* Main Content Area based on Selected View */}
      <main className="flex-1">
        {currentView === 'home' && (
          <>
            <HomeView />
            <EditorialSection />
          </>
        )}

        {(currentView === 'shop' ||
          currentView === 'new-arrivals' ||
          currentView === 'festive' ||
          currentView === 'sale') && <ShopView />}

        {currentView === 'contact' && <ContactFaqView />}
      </main>

      {/* Comprehensive Footer with WhatsApp, COD, & Boutiques */}
      <Footer />

      {/* Interactive Overlays & Modals */}
      <ProductDetailModal />
      <SizeGuideModal />
      <CartDrawer />
      <CheckoutModal />
      <OrderConfirmationModal />
      <OrderHistoryModal />
      <WishlistDrawer />

      {/* Feedback Toast */}
      <ToastOverlay />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <StoreMain />
    </StoreProvider>
  );
}
