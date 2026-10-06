import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Ruler, HelpCircle } from 'lucide-react';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen, sizeGuideProduct } = useStore();
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches'); // Default inches for Pakistani pret

  if (!isSizeGuideOpen || !sizeGuideProduct) return null;

  const measurements =
    unit === 'inches'
      ? sizeGuideProduct.measurementsInches
      : sizeGuideProduct.measurementsCm;

  const sizes = Object.keys(measurements);
  const sampleMeasurements = sizes.length > 0 ? measurements[sizes[0]] : {};
  const metrics = Object.keys(sampleMeasurements);

  const getMetricLabel = (key: string) => {
    switch (key) {
      case 'shirtLength':
        return 'Shirt Length (Kameez / Kurti)';
      case 'chest':
        return 'Chest / Bust (Armpit to Armpit)';
      case 'shoulder':
        return 'Shoulder (Teera)';
      case 'sleeves':
        return 'Sleeve Length (Baazu)';
      case 'hip':
        return 'Hip Measurement';
      case 'trouserLength':
        return 'Trouser / Shalwar Length';
      default:
        return key.charAt(0).toUpperCase() + key.slice(1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-[#FAF9F6] border border-[#EAE7E0] max-w-2xl w-full p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#EAE7E0]">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-neutral-500 font-medium">
              <Ruler className="w-3.5 h-3.5" />
              <span>Pakistani Pret Sizing Standard</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif text-[#1A1A1A] mt-1">
              {sizeGuideProduct.name}
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              Silhouette: {sizeGuideProduct.type} · Relaxed Summer Fit
            </p>
          </div>
          <button
            onClick={() => setIsSizeGuideOpen(false)}
            className="p-1.5 text-neutral-400 hover:text-black transition-colors"
            aria-label="Close size guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Unit Toggle */}
        <div className="flex items-center justify-between py-4">
          <p className="text-xs text-neutral-600">
            All measurements in inches unless specified in metric.
          </p>

          <div className="flex items-center p-1 bg-[#ECE8E1] rounded-sm text-xs font-mono">
            <button
              onClick={() => setUnit('inches')}
              className={`px-3 py-1 transition-colors ${
                unit === 'inches'
                  ? 'bg-[#1A1A1A] text-white font-medium'
                  : 'text-neutral-600 hover:text-black'
              }`}
            >
              Inches (Standard PK)
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 transition-colors ${
                unit === 'cm'
                  ? 'bg-[#1A1A1A] text-white font-medium'
                  : 'text-neutral-600 hover:text-black'
              }`}
            >
              Centimeters (cm)
            </button>
          </div>
        </div>

        {/* Sizing Table */}
        <div className="overflow-x-auto border border-[#EAE7E0] bg-white">
          <table className="w-full text-left text-xs font-mono tabular-nums">
            <thead>
              <tr className="bg-[#F6F4EE] border-b border-[#EAE7E0] text-neutral-700">
                <th className="py-2.5 px-4 font-sans font-medium uppercase tracking-wider">
                  Garment Dimension
                </th>
                {sizes.map((sz) => (
                  <th key={sz} className="py-2.5 px-3 text-center font-bold text-[#1A1A1A]">
                    {sz}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE7E0]">
              {metrics.map((metric) => (
                <tr key={metric} className="hover:bg-[#FAF9F6]">
                  <td className="py-2.5 px-4 font-sans text-neutral-800">
                    {getMetricLabel(metric)}
                  </td>
                  {sizes.map((sz) => {
                    const val = (measurements[sz] as any)?.[metric] || '—';
                    return (
                      <td key={sz} className="py-2.5 px-3 text-center text-neutral-900 font-medium">
                        {val}{unit === 'inches' ? '"' : ' cm'}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Fitting advice for Pakistani Summer Lawn */}
        <div className="mt-6 p-4 bg-[#F5F2EB] border border-[#E8E4DA] text-xs space-y-2">
          <div className="flex items-center gap-1.5 font-medium text-[#1A1A1A] uppercase tracking-wider text-[11px]">
            <HelpCircle className="w-3.5 h-3.5 text-neutral-500" />
            <span>Summer Lawn Fitting Advice</span>
          </div>
          <p className="text-neutral-600 leading-relaxed">
            Our summer pret silhouettes are deliberately cut with comfortable ease so the pure lawn fabric breathes during hot and humid Pakistani weather. If you prefer a fitted kurti, check your chest measurement against our chart.
          </p>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={() => setIsSizeGuideOpen(false)}
            className="px-6 py-2.5 bg-[#1A1A1A] text-white text-xs uppercase tracking-widest font-medium hover:bg-neutral-800 transition-colors"
          >
            Return to Suit
          </button>
        </div>
      </div>
    </div>
  );
};
