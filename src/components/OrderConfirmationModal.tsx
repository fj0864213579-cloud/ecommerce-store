import React from 'react';
import { useStore } from '../context/StoreContext';
import {
  CheckCircle2,
  Package,
  Truck,
  Home,
  Printer,
  ArrowRight,
  ShieldCheck,
  X,
  Phone,
} from 'lucide-react';

export const OrderConfirmationModal: React.FC = () => {
  const { latestOrder, setLatestOrder, formatPrice } = useStore();

  if (!latestOrder) return null;

  const handlePrint = () => {
    window.print();
  };

  const paymentMethodLabel = (method: string) => {
    switch (method) {
      case 'cod':
        return 'Cash on Delivery (Pay to Courier Rider)';
      case 'easypaisa':
        return 'EasyPaisa Mobile Account';
      case 'jazzcash':
        return 'JazzCash Mobile Account';
      case 'raast':
        return 'Raast Instant Transfer';
      case 'card':
        return 'Debit / Credit Card';
      default:
        return method;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 print:p-0 print:bg-white">
      <div className="relative bg-[#FAF9F6] border border-[#EAE7E0] max-w-3xl w-full p-6 sm:p-10 shadow-2xl animate-in zoom-in-95 duration-200 print:shadow-none print:border-none">
        {/* Close Button */}
        <button
          onClick={() => setLatestOrder(null)}
          className="absolute top-4 right-4 p-1.5 text-neutral-400 hover:text-black transition-colors print:hidden"
          aria-label="Close confirmation"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Confirmation Header */}
        <div className="text-center pb-6 border-b border-[#EAE7E0]">
          <div className="w-12 h-12 bg-emerald-800 text-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <span className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-medium">
            Pakistani Order Confirmation & Consignment
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#1A1A1A] mt-1">
            Order {latestOrder.id} Booked!
          </h2>
          <p className="text-xs text-neutral-600 mt-1 font-light">
            Shukriya {latestOrder.shippingAddress.fullName}! Your summer collection parcel has been reserved and sent for packaging at our Lahore Atelier.
          </p>
        </div>

        {/* Live Shipment Tracking Stepper */}
        <div className="py-6 border-b border-[#EAE7E0] print:hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] uppercase tracking-wider text-neutral-500 font-semibold">
              Live Courier Tracking
            </span>
            <span className="font-mono text-xs font-semibold text-black bg-neutral-100 px-2.5 py-1 border border-neutral-300">
              Consignment: {latestOrder.trackingNumber}
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            <div className="space-y-1.5">
              <div className="w-7 h-7 bg-emerald-800 text-white rounded-full flex items-center justify-center mx-auto text-[11px]">
                ✓
              </div>
              <p className="font-medium text-black">Booking Confirmed</p>
              <p className="text-[10px] text-neutral-500 font-mono">Recorded</p>
            </div>
            <div className="space-y-1.5">
              <div className="w-7 h-7 bg-amber-800 text-white rounded-full flex items-center justify-center mx-auto text-[11px] ring-4 ring-amber-100">
                <Package className="w-3.5 h-3.5" />
              </div>
              <p className="font-semibold text-black">Quality Check & Pack</p>
              <p className="text-[10px] text-amber-800 font-medium font-mono">In Progress</p>
            </div>
            <div className="space-y-1.5">
              <div className="w-7 h-7 bg-neutral-200 text-neutral-400 rounded-full flex items-center justify-center mx-auto text-[11px]">
                <Truck className="w-3.5 h-3.5" />
              </div>
              <p className="text-neutral-500">TCS / Leopards Dispatch</p>
              <p className="text-[10px] text-neutral-400 font-mono">Next 24h</p>
            </div>
            <div className="space-y-1.5">
              <div className="w-7 h-7 bg-neutral-200 text-neutral-400 rounded-full flex items-center justify-center mx-auto text-[11px]">
                <Home className="w-3.5 h-3.5" />
              </div>
              <p className="text-neutral-500">Doorstep Delivery</p>
              <p className="text-[10px] text-neutral-400 font-mono">Est: {latestOrder.estimatedDelivery}</p>
            </div>
          </div>
        </div>

        {/* Receipt Details Grid */}
        <div className="py-6 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-neutral-600 border-b border-[#EAE7E0]">
          <div>
            <h4 className="text-[11px] uppercase tracking-wider font-semibold text-black mb-1">
              Destination Address
            </h4>
            <p className="text-black font-medium">{latestOrder.shippingAddress.fullName}</p>
            <p>{latestOrder.shippingAddress.addressLine1}</p>
            {latestOrder.shippingAddress.addressLine2 && <p>{latestOrder.shippingAddress.addressLine2}</p>}
            <p className="font-semibold text-black mt-0.5">
              {latestOrder.shippingAddress.city}, Pakistan
            </p>
            <p className="font-mono mt-1 text-black font-medium flex items-center gap-1.5">
              <Phone className="w-3 h-3 text-neutral-500" />
              <span>{latestOrder.shippingAddress.phone}</span>
            </p>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-wider font-semibold text-black mb-1">
              Payment & Dispatch Terms
            </h4>
            <p>
              Mode: <span className="font-semibold text-black">{paymentMethodLabel(latestOrder.paymentMethod)}</span>
            </p>
            <p>
              Courier: <span className="font-medium text-black">{latestOrder.shippingOption.title}</span>
            </p>
            <p>
              Estimated Arrival: <span className="font-medium text-black">{latestOrder.estimatedDelivery}</span>
            </p>
            <div className="mt-2 text-emerald-800 flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>7-Day Return / Size Exchange Supported</span>
            </div>
          </div>
        </div>

        {/* Itemized Order List */}
        <div className="py-6 border-b border-[#EAE7E0] space-y-3">
          <h4 className="text-[11px] uppercase tracking-wider font-semibold text-black">
            Ordered Pakistani Suits ({latestOrder.items.length})
          </h4>
          <div className="space-y-3">
            {latestOrder.items.map((item) => (
              <div key={item.cartItemId} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-10 h-12 object-cover bg-[#F2EFE8]"
                  />
                  <div>
                    <p className="font-medium text-black">{item.name}</p>
                    <p className="text-[11px] text-neutral-500">
                      Pret Size: {item.size} · Color: {item.color} · Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <span className="font-mono font-medium text-black tabular-nums">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Financial Breakdown */}
        <div className="py-4 space-y-1.5 text-xs text-neutral-600 font-light border-b border-[#EAE7E0]">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-mono text-black">{formatPrice(latestOrder.subtotal)}</span>
          </div>
          {latestOrder.discount > 0 && (
            <div className="flex justify-between text-emerald-800">
              <span>Privilege Discount</span>
              <span className="font-mono">-{formatPrice(latestOrder.discount)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Nationwide Delivery</span>
            <span className="font-mono font-medium text-emerald-800">
              {latestOrder.shippingFee === 0 ? 'FREE' : formatPrice(latestOrder.shippingFee)}
            </span>
          </div>
          <div className="pt-2 flex justify-between text-base font-semibold text-black">
            <span className="uppercase tracking-wider text-xs">
              {latestOrder.paymentMethod === 'cod' ? 'Total Cash on Delivery' : 'Total Amount Paid'}
            </span>
            <span className="font-mono text-lg tabular-nums">{formatPrice(latestOrder.total)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 print:hidden">
          <button
            onClick={handlePrint}
            className="w-full sm:w-auto px-4 py-2.5 border border-[#1A1A1A] text-xs uppercase tracking-wider font-medium text-black hover:bg-[#1A1A1A] hover:text-white transition-colors flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Print Invoice & Slip</span>
          </button>

          <button
            onClick={() => setLatestOrder(null)}
            className="w-full sm:w-auto px-8 py-3 bg-[#1A1A1A] text-white text-xs uppercase tracking-widest font-medium hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
