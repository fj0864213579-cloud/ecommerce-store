import React from 'react';
import { useStore } from '../context/StoreContext';
import { X, Package, ChevronRight, Clock } from 'lucide-react';
import { Order } from '../types/store';

export const OrderHistoryModal: React.FC = () => {
  const {
    isOrderHistoryOpen,
    setIsOrderHistoryOpen,
    orders,
    formatPrice,
    setLatestOrder,
  } = useStore();

  if (!isOrderHistoryOpen) return null;

  const handleSelectOrder = (order: Order) => {
    setIsOrderHistoryOpen(false);
    setLatestOrder(order);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-[#FAF9F6] border border-[#EAE7E0] max-w-2xl w-full p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-[#EAE7E0]">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-neutral-800" />
            <h2 className="text-xl font-serif text-black">Zimal Orders & Courier Tracking</h2>
            <span className="text-xs font-mono text-neutral-500">({orders.length})</span>
          </div>
          <button
            onClick={() => setIsOrderHistoryOpen(false)}
            className="p-1 text-neutral-400 hover:text-black transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-6 space-y-4 max-h-[60vh] overflow-y-auto">
          {orders.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <Package className="w-10 h-10 text-neutral-300 mx-auto stroke-1" />
              <p className="font-serif text-lg text-neutral-800">No Orders Placed Yet</p>
              <p className="text-xs text-neutral-500 font-light max-w-sm mx-auto">
                Once you place an order with Cash on Delivery or EasyPaisa, your TCS/Leopards tracking number and receipt will appear here.
              </p>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                onClick={() => handleSelectOrder(order)}
                className="p-4 bg-white border border-[#EAE7E0] hover:border-black transition-all cursor-pointer shadow-2xs group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-semibold text-black">{order.id}</span>
                    <span className="text-xs text-neutral-400">·</span>
                    <span className="text-xs text-neutral-500">{order.date}</span>
                  </div>

                  <span className="text-[11px] uppercase tracking-wider font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 border border-emerald-200">
                    {order.orderStatus}
                  </span>
                </div>

                {/* Items preview snippet */}
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {order.items.slice(0, 4).map((it, idx) => (
                      <img
                        key={idx}
                        src={it.image}
                        alt={it.name}
                        referrerPolicy="no-referrer"
                        className="w-10 h-12 object-cover border border-white shadow-2xs"
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-semibold text-black">
                      {formatPrice(order.total)}
                    </span>
                    <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-black group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>

                <div className="mt-2 text-[11px] text-neutral-500 flex items-center justify-between font-light">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-neutral-400" />
                    <span>Est. Delivery: {order.estimatedDelivery} to {order.shippingAddress.city}</span>
                  </div>
                  <span className="font-mono text-[10px] text-neutral-600 font-medium">
                    Tracking: {order.trackingNumber}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="pt-4 border-t border-[#EAE7E0] flex justify-end">
          <button
            onClick={() => setIsOrderHistoryOpen(false)}
            className="px-6 py-2 bg-neutral-900 text-white text-xs uppercase tracking-wider font-medium hover:bg-black transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
