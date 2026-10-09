import React from 'react';
import { useCms } from '../../context/CmsContext';

export const CityDetailModal: React.FC = () => {
  const { selectedCityForModal, setSelectedCityForModal, setActivePublicTab } = useCms();

  if (!selectedCityForModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#0e0e10]/90 backdrop-blur-2xl flex items-center justify-center p-4 animate-in fade-in overflow-y-auto">
      <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl bg-[#201f22] border border-[#4d4635] p-5 flex flex-col gap-4 shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#353437] pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#f2ca50] text-[24px]">location_on</span>
            <div>
              <h3 className="font-serif-luxury text-xl font-bold text-[#e5e1e4]">
                {selectedCityForModal.name} Hub Landing Page
              </h3>
              <span className="text-[11px] text-[#d4c78f] uppercase tracking-wider font-semibold">
                {selectedCityForModal.state} &bull; {selectedCityForModal.tagline}
              </span>
            </div>
          </div>
          <button 
            onClick={() => setSelectedCityForModal(null)}
            className="w-8 h-8 rounded-full bg-[#2a2a2c] flex items-center justify-center text-[#e5e1e4] hover:text-[#f2ca50]"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <p className="text-xs sm:text-sm text-[#d0c5af] leading-relaxed">
          {selectedCityForModal.description}
        </p>

        {/* Local Logistics & Readiness */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-3 rounded-lg bg-[#2a2a2c] border border-[#4d4635]/40 flex flex-col">
            <span className="text-[10px] text-[#99907c] uppercase">Fleet Readiness</span>
            <span className="font-bold text-[#f2ca50] text-sm mt-0.5">{selectedCityForModal.residentTroupes}</span>
            <span className="text-[11px] text-[#d0c5af]">{selectedCityForModal.readinessTime}</span>
          </div>

          <div className="p-3 rounded-lg bg-[#2a2a2c] border border-[#4d4635]/40 flex flex-col">
            <span className="text-[10px] text-[#99907c] uppercase">Acoustic Specs</span>
            <span className="font-bold text-[#f1e3a9] text-sm mt-0.5">{selectedCityForModal.acousticCertification}</span>
            <span className="text-[11px] text-[#d0c5af]">{selectedCityForModal.specialty}</span>
          </div>
        </div>

        {/* Key Partner Venues */}
        <div>
          <h4 className="text-xs font-bold text-[#d4c78f] uppercase tracking-wider mb-2">
            Signature Heritage Venues Serviced
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {selectedCityForModal.keyVenues.map((v, i) => (
              <span key={i} className="px-2.5 py-1 rounded bg-[#1c1b1e] border border-[#4d4635]/40 text-xs text-[#e5e1e4]">
                🏛️ {v}
              </span>
            ))}
          </div>
        </div>

        {/* Technical SEO / GEO Data Preview */}
        <div className="p-3 rounded-lg bg-[#0e0e10] border border-[#4d4635]/30 flex flex-col gap-1 text-[11px]">
          <div className="flex items-center justify-between text-[#d4c78f] font-semibold">
            <span>GEO Schema Markup: {selectedCityForModal.seo.schemaType}</span>
            <span className="text-emerald-400">Validated</span>
          </div>
          <span className="text-[#99907c] truncate">Canonical: {selectedCityForModal.seo.canonicalUrl}</span>
          <span className="text-[#d0c5af] italic">“{selectedCityForModal.seo.metaTitle}”</span>
        </div>

        {/* CTA */}
        <div className="pt-2 flex gap-2">
          <button 
            onClick={() => {
              setSelectedCityForModal(null);
              setActivePublicTab('book');
            }}
            className="flex-1 py-3 rounded-lg bg-[#f2ca50] text-[#3c2f00] font-sans-luxury text-xs sm:text-sm font-bold shadow-md hover:brightness-105 transition-all text-center"
          >
            Book {selectedCityForModal.name} Performance Date
          </button>
        </div>
      </div>
    </div>
  );
};
