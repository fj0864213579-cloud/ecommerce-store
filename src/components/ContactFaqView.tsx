import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Send,
  CheckCircle,
  Truck,
  RotateCcw,
  ShieldCheck,
  Smartphone,
  Banknote,
  MessageSquare,
} from 'lucide-react';

export const ContactFaqView: React.FC = () => {
  const { showToast } = useStore();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [message, setMessage] = useState('');

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    showToast('Your message has been received! Our Lahore concierge will contact you on WhatsApp.');
    setName('');
    setPhone('');
    setEmail('');
    setCity('');
    setMessage('');
  };

  const faqs = [
    {
      q: 'How does Cash on Delivery (COD) work across Pakistan?',
      a: 'We offer Cash on Delivery across all cities, towns, and cantts of Pakistan via TCS and Leopards Courier. You do not need to pay in advance. When the rider brings your sealed parcel, pay the exact order amount in cash upon receiving.',
      icon: Banknote,
    },
    {
      q: 'What is the delivery timeline for Karachi, Lahore, and Islamabad?',
      a: 'Orders within Lahore, Karachi, and Islamabad are typically delivered within 24 to 48 hours. Other cities across Punjab, Sindh, KPK, and Balochistan take 2 to 4 business days. We provide a live consignment tracking number as soon as your parcel is dispatched.',
      icon: Truck,
    },
    {
      q: 'Can I exchange my suit if the size doesn’t fit me properly?',
      a: 'Yes, absolutely! We offer a 7-day hassle-free size exchange policy. If your kurti or suit size is too loose or too fitted, simply contact our WhatsApp support at +92 300 8492019, and we will arrange a reverse courier pickup or exchange parcel.',
      icon: RotateCcw,
    },
    {
      q: 'How can I pay via EasyPaisa or JazzCash?',
      a: 'At checkout, select EasyPaisa or JazzCash as your payment method. Enter your registered mobile wallet number. You will receive an instant approval notification or USSD MPIN flash prompt on your mobile screen to securely complete the transaction.',
      icon: Smartphone,
    },
    {
      q: 'Is your summer lawn 100% pure and breathable in severe heat?',
      a: 'Yes. All our summer collections use 80x80 combed Egyptian long-staple cotton pure lawn. It is pre-shrunk, skin-friendly, and specifically tested for extreme summer heat in Multan, Lahore, and Karachi.',
      icon: ShieldCheck,
    },
    {
      q: 'Do you deliver internationally to overseas Pakistanis in the UK, USA, and UAE?',
      a: 'Yes! We ship worldwide via DHL Express. Overseas customers can easily switch the currency switcher in the header to USD, GBP, or AED and pay via Visa / Mastercard.',
      icon: Mail,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] text-neutral-500 font-medium">
          <HelpCircle className="w-4 h-4 text-neutral-700" />
          <span>Client Concierge & Assistance</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-medium text-black">
          We Are Here to Assist You
        </h1>
        <p className="text-xs text-neutral-500 font-light">
          Have queries about fabric, sizing, order status, or Cash on Delivery? Reach out to our dedicated client service team.
        </p>
      </div>

      {/* Contact Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* WhatsApp & Phone */}
        <div className="p-6 bg-white border border-[#EAE7E0] space-y-3 shadow-2xs">
          <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center">
            <Phone className="w-5 h-5" />
          </div>
          <h3 className="text-base font-serif font-medium text-black">WhatsApp & Helpline</h3>
          <p className="text-xs text-neutral-500 font-light">
            Fastest response for order tracking, size advice, and quick inquiries.
          </p>
          <div className="pt-2">
            <p className="font-mono text-xs font-semibold text-black">+92 300 8492019</p>
            <p className="font-mono text-xs text-neutral-500">+92 42 3578 4000</p>
          </div>
        </div>

        {/* Lahore Atelier */}
        <div className="p-6 bg-white border border-[#EAE7E0] space-y-3 shadow-2xs">
          <div className="w-10 h-10 rounded-full bg-neutral-100 text-black flex items-center justify-center">
            <MapPin className="w-5 h-5" />
          </div>
          <h3 className="text-base font-serif font-medium text-black">Lahore Flagship Studio</h3>
          <p className="text-xs text-neutral-500 font-light">
            Visit our physical atelier to experience raw lawn weaves and hand-embroideries.
          </p>
          <div className="pt-2 text-xs text-neutral-700">
            <p className="font-medium text-black">MM Alam Road, Gulberg III</p>
            <p className="text-neutral-500">Lahore, Punjab 54000</p>
          </div>
        </div>

        {/* Operating Hours */}
        <div className="p-6 bg-white border border-[#EAE7E0] space-y-3 shadow-2xs">
          <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-800 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <h3 className="text-base font-serif font-medium text-black">Concierge Hours</h3>
          <p className="text-xs text-neutral-500 font-light">
            Support desk active 6 days a week across Pakistan Standard Time.
          </p>
          <div className="pt-2 text-xs text-neutral-700">
            <p className="font-medium text-black">Mon – Sat: 10:00 AM – 9:00 PM</p>
            <p className="text-neutral-500">Sunday: 1:00 PM – 7:00 PM PKT</p>
          </div>
        </div>
      </div>

      {/* Contact Form & FAQs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contact Form (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 border border-[#EAE7E0] shadow-sm">
          <h2 className="text-xl font-serif text-black font-medium mb-1 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-neutral-700" />
            <span>Send Us an Inquiry</span>
          </h2>
          <p className="text-xs text-neutral-500 font-light mb-6">
            Leave your message below and we will get back to you within 2 hours.
          </p>

          {formSubmitted ? (
            <div className="p-6 bg-[#F6F4EE] border border-emerald-300 text-center space-y-3">
              <CheckCircle className="w-8 h-8 text-emerald-700 mx-auto" />
              <p className="text-sm font-semibold text-black">Message Sent Successfully</p>
              <p className="text-xs text-neutral-600 font-light">
                Shukriya for contacting Zimal. Our customer representative will assist you shortly on WhatsApp or Phone.
              </p>
              <button
                onClick={() => setFormSubmitted(false)}
                className="mt-3 text-xs uppercase tracking-wider underline text-black font-medium cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="uppercase tracking-wider text-neutral-600 block mb-1 text-[11px] font-semibold">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Fatima Zahra"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 bg-[#FAF9F6] border border-[#EAE7E0] focus:outline-none focus:border-black"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="uppercase tracking-wider text-neutral-600 block mb-1 text-[11px] font-semibold">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0300-1234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF9F6] border border-[#EAE7E0] focus:outline-none focus:border-black font-mono"
                  />
                </div>
                <div>
                  <label className="uppercase tracking-wider text-neutral-600 block mb-1 text-[11px] font-semibold">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lahore / Karachi"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF9F6] border border-[#EAE7E0] focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div>
                <label className="uppercase tracking-wider text-neutral-600 block mb-1 text-[11px] font-semibold">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="name@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 bg-[#FAF9F6] border border-[#EAE7E0] focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="uppercase tracking-wider text-neutral-600 block mb-1 text-[11px] font-semibold">
                  Your Query or Order Detail *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Ask about dress sizing, Cash on Delivery status, or custom requests..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-2.5 bg-[#FAF9F6] border border-[#EAE7E0] focus:outline-none focus:border-black leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#1A1A1A] text-white uppercase tracking-widest font-semibold hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>

        {/* FAQ Accordion (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div>
            <h2 className="text-xl font-serif text-black font-medium mb-1 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-neutral-700" />
              <span>Frequently Asked Questions</span>
            </h2>
            <p className="text-xs text-neutral-500 font-light mb-6">
              Quick answers about shipping, sizing, COD terms, and fabrics.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const IconComp = faq.icon;
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white border border-[#EAE7E0] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left p-4.5 flex items-center justify-between gap-3 hover:bg-[#FAF9F6] transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-[#FAF9F6] border border-[#EAE7E0] flex items-center justify-center text-neutral-700 shrink-0">
                        <IconComp className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-black">
                        {faq.q}
                      </span>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-neutral-500 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-neutral-500 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="p-4.5 pt-0 text-xs text-neutral-600 leading-relaxed font-light border-t border-[#F0ECE4] bg-[#FAF9F6]/50">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
