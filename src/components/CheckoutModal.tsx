import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { SHIPPING_OPTIONS, PAKISTANI_CITIES } from '../data/products';
import {
  X,
  CreditCard,
  Lock,
  Truck,
  ShieldCheck,
  Smartphone,
  Banknote,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  QrCode,
  Building,
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    subtotal,
    discountAmount,
    taxAmount,
    totalAmount,
    formatPrice,
    createOrder,
    setLatestOrder,
  } = useStore();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState('');

  // Shipping details state for Pakistan
  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    phone: '',
    email: '',
    addressLine1: '',
    addressLine2: '',
    city: 'Lahore',
    province: 'Punjab',
    postalCode: '',
    specialInstructions: '',
  });

  const [selectedShippingOption, setSelectedShippingOption] = useState(SHIPPING_OPTIONS[0]);
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'easypaisa' | 'jazzcash' | 'raast' | 'card'>('cod');

  // Mobile wallet & card state
  const [walletPhone, setWalletPhone] = useState('03001234567');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  if (!isCheckoutOpen) return null;

  // 1-Click test autofill for Pakistani customer
  const handleAutofillTest = () => {
    setShippingAddress({
      fullName: 'Aiman Shahzadi',
      phone: '0301-8492019',
      email: 'aiman.shahzadi@gmail.com',
      addressLine1: 'House 42-B, Street 14, Phase 6, DHA',
      addressLine2: 'Near Raya Club',
      city: 'Lahore',
      province: 'Punjab',
      postalCode: '54792',
      specialInstructions: 'Please call before delivery. Ring bell 2.',
    });
    setPaymentMethod('cod');
    setWalletPhone('03018492019');
    setCardNumber('4242 4242 4242 4242');
    setCardName('AIMAN SHAHZADI');
    setCardExpiry('08/28');
    setCardCvc('512');
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = raw.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(formatted);
  };

  const calculateFinalTotal = () => {
    const shipping = (subtotal - discountAmount) >= 4999 ? 0 : selectedShippingOption.price;
    return Math.max(0, subtotal - discountAmount) + shipping;
  };

  const handleCompletePayment = () => {
    setIsProcessing(true);

    if (paymentMethod === 'cod') {
      setProcessingStatus('Registering Cash on Delivery booking with TCS Courier...');
    } else if (paymentMethod === 'easypaisa') {
      setProcessingStatus(`Sending payment authorization prompt to EasyPaisa (${walletPhone})...`);
    } else if (paymentMethod === 'jazzcash') {
      setProcessingStatus(`Verifying JazzCash MPIN with State Bank Gateway...`);
    } else if (paymentMethod === 'raast') {
      setProcessingStatus('Verifying Raast P2M transaction with 1Link...');
    } else {
      setProcessingStatus('Connecting to 3D Secure PayPak / 1Link gateway...');
    }

    setTimeout(() => {
      setProcessingStatus('Generating Pakistani shipment consignment number...');
      setTimeout(() => {
        setIsProcessing(false);
        const shippingFeeEffective = (subtotal - discountAmount) >= 4999 ? 0 : selectedShippingOption.price;
        const order = createOrder({
          items: [...cart],
          shippingFee: shippingFeeEffective,
          shippingAddress,
          shippingOption: selectedShippingOption,
          paymentMethod,
          accountPhoneOrCard:
            paymentMethod === 'card'
              ? `•••• ${cardNumber.slice(-4) || '4242'}`
              : walletPhone,
          orderStatus: 'Confirmed',
          estimatedDelivery: selectedShippingOption.duration,
        });
        setLatestOrder(order);
        setIsCheckoutOpen(false);
      }, 900);
    }, 1100);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="relative bg-[#FAF9F6] border border-[#EAE7E0] max-w-5xl w-full max-h-[95vh] overflow-y-auto shadow-2xl">
        {/* Top Header */}
        <div className="p-5 border-b border-[#EAE7E0] flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <span className="font-display text-xl tracking-[0.2em] uppercase text-[#1A1A1A]">
              Zimal
            </span>
            <span className="text-xs text-neutral-400">·</span>
            <span className="text-xs uppercase tracking-wider text-neutral-600 font-medium">
              Nationwide Checkout
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleAutofillTest}
              type="button"
              className="text-[11px] px-2.5 py-1 bg-[#F5F2EB] border border-[#DCD5C9] text-neutral-800 hover:bg-[#EBE5D8] transition-colors flex items-center gap-1 font-medium"
              title="Autofill Pakistani address and details"
            >
              <Sparkles className="w-3 h-3 text-amber-700" />
              <span>Autofill Sample (Lahore / COD)</span>
            </button>
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="p-1.5 text-neutral-400 hover:text-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stepper Progress */}
        <div className="px-6 py-3 bg-[#F6F4EE] border-b border-[#EAE7E0] flex items-center justify-center gap-8 text-xs uppercase tracking-wider font-medium text-neutral-500">
          <button
            onClick={() => setStep(1)}
            className={`flex items-center gap-2 ${step === 1 ? 'text-black font-semibold' : ''}`}
          >
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 1 ? 'bg-black text-white' : 'bg-neutral-300'}`}>
              1
            </span>
            <span>Delivery Address</span>
          </button>
          <span className="text-neutral-300">/</span>
          <button
            onClick={() => shippingAddress.fullName && setStep(2)}
            className={`flex items-center gap-2 ${step === 2 ? 'text-black font-semibold' : ''}`}
          >
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? 'bg-black text-white' : 'bg-neutral-300'}`}>
              2
            </span>
            <span>Courier Dispatch</span>
          </button>
          <span className="text-neutral-300">/</span>
          <button
            onClick={() => shippingAddress.fullName && setStep(3)}
            className={`flex items-center gap-2 ${step === 3 ? 'text-black font-semibold' : ''}`}
          >
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 3 ? 'bg-black text-white' : 'bg-neutral-300'}`}>
              3
            </span>
            <span>COD / Payment</span>
          </button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8">
          {/* Main Checkout Form (Left 7 Cols) */}
          <div className="lg:col-span-7">
            {/* STEP 1: Address across Pakistan */}
            {step === 1 && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setStep(2);
                }}
                className="space-y-4"
              >
                <div>
                  <h3 className="text-lg font-serif text-[#1A1A1A] font-medium">
                    Delivery Address in Pakistan
                  </h3>
                  <p className="text-xs text-neutral-500 font-light mt-0.5">
                    Our courier rider (TCS / Leopards) will contact you on this mobile number upon arrival.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-neutral-600 block mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingAddress.fullName}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
                        placeholder="e.g. Ayesha Siddiqui"
                        className="w-full p-2.5 bg-white border border-[#EAE7E0] text-xs focus:outline-none focus:border-black"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-neutral-600 block mb-1">
                        Pakistani Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={shippingAddress.phone}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                        placeholder="0300-1234567"
                        className="w-full p-2.5 bg-white border border-[#EAE7E0] text-xs focus:outline-none focus:border-black font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-neutral-600 block mb-1">
                        City *
                      </label>
                      <select
                        value={shippingAddress.city}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                        className="w-full p-2.5 bg-white border border-[#EAE7E0] text-xs focus:outline-none focus:border-black font-medium"
                      >
                        {PAKISTANI_CITIES.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-neutral-600 block mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        value={shippingAddress.email}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, email: e.target.value })}
                        placeholder="ayesha@gmail.com"
                        className="w-full p-2.5 bg-white border border-[#EAE7E0] text-xs focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-neutral-600 block mb-1">
                      Complete Street Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.addressLine1}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, addressLine1: e.target.value })}
                      placeholder="House / Flat #, Street, Block, Phase, Sector"
                      className="w-full p-2.5 bg-white border border-[#EAE7E0] text-xs focus:outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-neutral-600 block mb-1">
                      Landmark or Area
                    </label>
                    <input
                      type="text"
                      value={shippingAddress.addressLine2}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, addressLine2: e.target.value })}
                      placeholder="Nearby famous landmark (e.g. Near Shell pump / DHA Phase 5)"
                      className="w-full p-2.5 bg-white border border-[#EAE7E0] text-xs focus:outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-neutral-600 block mb-1">
                      Courier Instructions (Optional)
                    </label>
                    <input
                      type="text"
                      value={shippingAddress.specialInstructions}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, specialInstructions: e.target.value })}
                      placeholder="e.g. Deliver between 2 PM to 6 PM, call before arriving"
                      className="w-full p-2.5 bg-white border border-[#EAE7E0] text-xs focus:outline-none focus:border-black"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="px-8 py-3 bg-[#1A1A1A] text-white text-xs uppercase tracking-widest font-medium hover:bg-neutral-800 transition-colors flex items-center gap-2"
                  >
                    <span>Proceed to Courier Method</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* STEP 2: Courier Method */}
            {step === 2 && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-lg font-serif text-[#1A1A1A] font-medium">
                    Courier Dispatch Speed
                  </h3>
                  <p className="text-xs text-neutral-500 font-light mt-0.5">
                    Shipping to: {shippingAddress.fullName}, {shippingAddress.city} ({shippingAddress.phone})
                  </p>
                </div>

                <div className="space-y-3">
                  {SHIPPING_OPTIONS.map((option) => (
                    <div
                      key={option.id}
                      onClick={() => setSelectedShippingOption(option)}
                      className={`p-4 border transition-all cursor-pointer flex items-center justify-between ${
                        selectedShippingOption.id === option.id
                          ? 'border-[#1A1A1A] bg-white ring-1 ring-black/10'
                          : 'border-[#EAE7E0] bg-[#FAF9F6] hover:border-neutral-400'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center ${selectedShippingOption.id === option.id ? 'border-black' : 'border-neutral-400'}`}>
                          {selectedShippingOption.id === option.id && (
                            <span className="w-2 h-2 rounded-full bg-black" />
                          )}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-[#1A1A1A] uppercase tracking-wider">
                            {option.title}
                          </p>
                          <p className="text-xs text-neutral-500 mt-0.5">{option.description}</p>
                          <span className="text-[11px] font-mono text-neutral-400 mt-1 inline-block">
                            Delivery timeline: {option.duration}
                          </span>
                        </div>
                      </div>

                      <div className="text-right font-mono text-xs font-semibold">
                        {(subtotal - discountAmount) >= 4999 && option.id === 'standard-courier'
                          ? 'FREE DELIVERY'
                          : formatPrice(option.price)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs uppercase tracking-wider text-neutral-600 hover:text-black flex items-center gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back to Address</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-8 py-3 bg-[#1A1A1A] text-white text-xs uppercase tracking-widest font-medium hover:bg-neutral-800 transition-colors flex items-center gap-2"
                  >
                    <span>Proceed to COD / Payment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Payment Method with Pakistani Options */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-serif text-[#1A1A1A] font-medium">
                    Payment Method
                  </h3>
                  <p className="text-xs text-neutral-500 font-light mt-0.5">
                    Select your preferred payment mode for Pakistan.
                  </p>
                </div>

                {/* Payment Option Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`py-3 px-2 border text-xs font-medium flex flex-col items-center gap-1.5 transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-black bg-white text-black shadow-xs ring-1 ring-black'
                        : 'border-[#EAE7E0] bg-[#FAF9F6] text-neutral-600 hover:border-neutral-400'
                    }`}
                  >
                    <Banknote className="w-4 h-4 text-emerald-800" />
                    <span>Cash on Delivery</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('easypaisa')}
                    className={`py-3 px-2 border text-xs font-medium flex flex-col items-center gap-1.5 transition-all ${
                      paymentMethod === 'easypaisa'
                        ? 'border-emerald-600 bg-white text-emerald-900 shadow-xs ring-1 ring-emerald-600'
                        : 'border-[#EAE7E0] bg-[#FAF9F6] text-neutral-600 hover:border-neutral-400'
                    }`}
                  >
                    <Smartphone className="w-4 h-4 text-emerald-600" />
                    <span>EasyPaisa</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('jazzcash')}
                    className={`py-3 px-2 border text-xs font-medium flex flex-col items-center gap-1.5 transition-all ${
                      paymentMethod === 'jazzcash'
                        ? 'border-amber-600 bg-white text-amber-900 shadow-xs ring-1 ring-amber-600'
                        : 'border-[#EAE7E0] bg-[#FAF9F6] text-neutral-600 hover:border-neutral-400'
                    }`}
                  >
                    <Smartphone className="w-4 h-4 text-amber-600" />
                    <span>JazzCash</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`py-3 px-2 border text-xs font-medium flex flex-col items-center gap-1.5 transition-all ${
                      paymentMethod === 'card'
                        ? 'border-black bg-white text-black shadow-xs ring-1 ring-black'
                        : 'border-[#EAE7E0] bg-[#FAF9F6] text-neutral-600 hover:border-neutral-400'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Card / PayPak</span>
                  </button>
                </div>

                {/* CASH ON DELIVERY DETAILS */}
                {paymentMethod === 'cod' && (
                  <div className="p-5 bg-white border border-neutral-300 space-y-3">
                    <div className="flex items-center gap-2 text-emerald-800 font-semibold text-xs uppercase tracking-wider">
                      <Banknote className="w-4 h-4" />
                      <span>Cash on Delivery (COD) Selected</span>
                    </div>
                    <p className="text-xs text-neutral-600 leading-relaxed font-light">
                      Pay <strong className="text-black font-semibold">{formatPrice(calculateFinalTotal())}</strong> in cash to the TCS/Leopards courier rider when your parcel is delivered to your doorstep at <strong className="text-black font-medium">{shippingAddress.addressLine1}, {shippingAddress.city}</strong>.
                    </p>
                    <div className="pt-2 border-t border-[#EAE7E0] text-[11px] text-neutral-500 flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                      <span>No advance deposit required. Open-box inspection supported.</span>
                    </div>
                  </div>
                )}

                {/* EASYPAISA DETAILS */}
                {paymentMethod === 'easypaisa' && (
                  <div className="p-5 bg-white border border-emerald-300 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
                        EasyPaisa Direct Account / QR
                      </span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 font-mono">
                        Instant Approval
                      </span>
                    </div>
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-neutral-600 block mb-1">
                        EasyPaisa Registered Mobile Number:
                      </label>
                      <input
                        type="tel"
                        value={walletPhone}
                        onChange={(e) => setWalletPhone(e.target.value)}
                        placeholder="03XXXXXXXXX"
                        className="w-full p-2.5 border border-[#EAE7E0] text-xs font-mono focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                    <p className="text-[11px] text-neutral-500">
                      You will receive an in-app approval notification on your EasyPaisa app to authorize payment of {formatPrice(calculateFinalTotal())}.
                    </p>
                  </div>
                )}

                {/* JAZZCASH DETAILS */}
                {paymentMethod === 'jazzcash' && (
                  <div className="p-5 bg-white border border-amber-300 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-wider text-amber-800">
                        JazzCash Mobile Account
                      </span>
                      <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 font-mono">
                        USSD / App Prompt
                      </span>
                    </div>
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-neutral-600 block mb-1">
                        JazzCash Registered Mobile Number:
                      </label>
                      <input
                        type="tel"
                        value={walletPhone}
                        onChange={(e) => setWalletPhone(e.target.value)}
                        placeholder="03XXXXXXXXX"
                        className="w-full p-2.5 border border-[#EAE7E0] text-xs font-mono focus:outline-none focus:border-amber-600"
                      />
                    </div>
                    <p className="text-[11px] text-neutral-500">
                      Enter your 4-digit MPIN on your phone when the USSD flash prompt appears.
                    </p>
                  </div>
                )}

                {/* CREDIT / DEBIT / PAYPAK */}
                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div className="space-y-3 bg-white p-4 border border-[#EAE7E0]">
                      <div>
                        <label className="text-[11px] uppercase tracking-wider text-neutral-600 block mb-1">
                          Card Number (Visa / Mastercard / PayPak) *
                        </label>
                        <input
                          type="text"
                          required
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          placeholder="4242 4242 4242 4242"
                          className="w-full p-2.5 border border-[#EAE7E0] text-xs font-mono focus:outline-none focus:border-black"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] uppercase tracking-wider text-neutral-600 block mb-1">
                          Name on Card *
                        </label>
                        <input
                          type="text"
                          required
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value.toUpperCase())}
                          placeholder="AIMAN SHAHZADI"
                          className="w-full p-2.5 border border-[#EAE7E0] text-xs uppercase tracking-wider focus:outline-none focus:border-black"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] uppercase tracking-wider text-neutral-600 block mb-1">
                            Expiry (MM/YY) *
                          </label>
                          <input
                            type="text"
                            required
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            placeholder="08/28"
                            className="w-full p-2.5 border border-[#EAE7E0] text-xs font-mono focus:outline-none focus:border-black"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] uppercase tracking-wider text-neutral-600 block mb-1">
                            CVV / CVC *
                          </label>
                          <input
                            type="password"
                            required
                            maxLength={4}
                            value={cardCvc}
                            onChange={(e) => setCardCvc(e.target.value)}
                            placeholder="•••"
                            className="w-full p-2.5 border border-[#EAE7E0] text-xs font-mono focus:outline-none focus:border-black"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-xs uppercase tracking-wider text-neutral-600 hover:text-black flex items-center gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back to Courier</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCompletePayment}
                    disabled={isProcessing}
                    className="px-8 py-3.5 bg-[#1A1A1A] text-white text-xs uppercase tracking-widest font-medium hover:bg-neutral-800 transition-colors flex items-center gap-2 disabled:opacity-50 cursor-pointer shadow-md"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>
                      {isProcessing
                        ? processingStatus
                        : paymentMethod === 'cod'
                        ? `Confirm Cash on Delivery Order (${formatPrice(calculateFinalTotal())})`
                        : `Pay ${formatPrice(calculateFinalTotal())}`}
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary (Right 5 Cols) */}
          <div className="lg:col-span-5 bg-white p-5 border border-[#EAE7E0] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#EAE7E0]">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-[#1A1A1A]">
                  Order Summary ({cart.length} pieces)
                </h4>
                <span className="font-mono text-xs font-medium text-neutral-600">
                  {formatPrice(calculateFinalTotal())}
                </span>
              </div>

              {/* Itemized previews */}
              <div className="py-3 space-y-3 max-h-60 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.cartItemId} className="flex gap-3 text-xs">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-14 object-cover bg-[#F6F4EE] border border-[#EAE7E0]"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-black line-clamp-1">{item.name}</p>
                      <p className="text-[11px] text-neutral-500">
                        Size: {item.size} · Color: {item.color} · Qty: {item.quantity}
                      </p>
                      <p className="font-mono text-neutral-700 mt-0.5">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Calculation breakdown */}
              <div className="pt-4 border-t border-[#EAE7E0] space-y-2 text-xs text-neutral-600 font-light">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums text-black">{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-800">
                    <span>Discount Privilege</span>
                    <span className="font-mono tabular-nums">-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery ({selectedShippingOption.title})</span>
                  <span className="font-mono tabular-nums text-emerald-800 font-medium">
                    {(subtotal - discountAmount) >= 4999 && selectedShippingOption.id === 'standard-courier'
                      ? 'FREE (Orders > Rs. 4,999)'
                      : formatPrice(selectedShippingOption.price)}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#EAE7E0] flex justify-between text-base font-semibold text-black">
                  <span className="uppercase tracking-wider text-xs">Total Payable</span>
                  <span className="font-mono tabular-nums">{formatPrice(calculateFinalTotal())}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#EAE7E0] space-y-2 text-[11px] text-neutral-500">
              <div className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-neutral-700" />
                <span>Tracked courier dispatched from Lahore Atelier</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-700" />
                <span>7-Day Replacement & Return Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
