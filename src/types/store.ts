export type Currency = 'PKR' | 'USD' | 'GBP' | 'AED';

export interface CurrencyConfig {
  code: Currency;
  symbol: string;
  rate: number; // relative to PKR (1 PKR = rate)
}

export interface ProductColor {
  name: string;
  hex: string;
  previewImage?: string;
}

export interface GarmentMeasurements {
  shirtLength?: string;
  chest?: string;
  shoulder?: string;
  sleeves?: string;
  hip?: string;
  trouserLength?: string;
}

export interface ProductReview {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  fitFeedback: 'True to Size' | 'Slightly Loose' | 'Fitted';
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: '3-Piece Suits' | '2-Piece Pret' | '1-Piece Kurtis' | 'Co-ords & Fusion' | 'Festive Lawn';
  price: number; // in PKR
  originalPrice?: number;
  description: string;
  fabric: string; // e.g., '100% Breathable Lawn', 'Chikankari Cotton', 'Organza Jacquard'
  composition: string;
  type: 'Stitched Ready to Wear' | 'Unstitched Luxury Lawn';
  dupatta: string; // e.g., 'Digitally Printed Chiffon Dupatta', 'Organza Embroidered Dupatta'
  origin: string; // e.g., 'Lahore Atelier, Pakistan'
  careInstructions: string;
  modelInfo: string;
  images: {
    primary: string;
    detail?: string;
    lifestyle?: string;
  };
  colors: ProductColor[];
  sizes: string[];
  stockCount: number;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isBestseller?: boolean;
  isEidCollection?: boolean;
  measurementsInches: Record<string, GarmentMeasurements>;
  measurementsCm: Record<string, GarmentMeasurements>;
  reviews: ProductReview[];
}

export interface CartItem {
  cartItemId: string; // unique string: `${productId}-${size}-${color}`
  productId: string;
  name: string;
  category: string;
  price: number;
  size: string;
  color: string;
  image: string;
  quantity: number;
  maxStock: number;
}

export interface ShippingAddress {
  fullName: string;
  phone: string; // Pakistani format: 0300-1234567
  email: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  province: string;
  postalCode?: string;
  specialInstructions?: string;
}

export interface ShippingOption {
  id: string;
  title: string;
  duration: string;
  price: number; // in PKR
  description: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  tax: number;
  total: number;
  currency: Currency;
  shippingAddress: ShippingAddress;
  shippingOption: ShippingOption;
  paymentMethod: 'cod' | 'easypaisa' | 'jazzcash' | 'raast' | 'card';
  accountPhoneOrCard?: string;
  orderStatus: 'Confirmed' | 'Dispatched via TCS / Leopards' | 'Out for Delivery' | 'Delivered';
  estimatedDelivery: string;
  trackingNumber: string;
}
