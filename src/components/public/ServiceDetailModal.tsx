import React from 'react';
import { useCms } from '../../context/CmsContext';

export const ServiceDetailModal: React.FC = () => {
  const { selectedServiceForModal, setSelectedServiceForModal, setActivePublicTab } = useCms();

  if (!selectedServiceForModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#0e0e10]/90 backdrop-blur-2xl flex items-center justify-center p-4 animate-in fade-in overflow-y-auto">
      <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl bg-[#201f22] border border-[#4d4635] p-5 flex flex-col gap-4 shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#353437] pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#f2ca50] text-[24px]">celebration</span>
            <div>
              <h3 className="font-serif-luxury text-xl font-bold text-[#e5e1e4]">
                {selectedServiceForModal.name}
              </h3>
              <span className="text-[11px] text-[#d4c78f] uppercase tracking-wider font-semibold">
                {selectedServiceForModal.badge || "Signature Curation"} &bull; {selectedServiceForModal.duration}
              </span>
            </div>
          </div>
          <button 
            onClick={() => setSelectedServiceForModal(null)}
            className="w-8 h-8 rounded-full bg-[#2a2a2c] flex items-center justify-center text-[#e5e1e4] hover:text-[#f2ca50]"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="w-full h-44 rounded-lg overflow-hidden bg-[#0e0e10] border border-[#4d4635]/40">
          <img 
            src={selectedServiceForModal.imageUrl} 
            alt={selectedServiceForModal.name} 
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <h4 className="text-xs font-bold text-[#d4c78f] uppercase tracking-wider mb-1">
            Overview &amp; Concept
          </h4>
          <p className="text-xs sm:text-sm text-[#d0c5af] leading-relaxed">
            {selectedServiceForModal.description}
          </p>
        </div>

        {/* Features & Technical Inclusions */}
        <div>
          <h4 className="text-xs font-bold text-[#f2ca50] uppercase tracking-wider mb-2">
            Technical &amp; Artistry Inclusions
          </h4>
          <div className="flex flex-col gap-2">
            {selectedServiceForModal.features.map((feat, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-[#e5e1e4]">
                <span className="material-symbols-outlined text-[#f2ca50] text-[18px]">check_circle</span>
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Formats Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {selectedServiceForModal.tags.map((tag, i) => (
            <span key={i} className="px-2.5 py-1 rounded bg-[#2a2a2c] border border-[#4d4635]/40 text-xs text-[#f1e3a9]">
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="pt-2 flex gap-2">
          <button 
            onClick={() => {
              setSelectedServiceForModal(null);
              setActivePublicTab('book');
            }}
            className="flex-1 py-3 rounded-lg bg-[#f2ca50] text-[#3c2f00] font-sans-luxury text-xs sm:text-sm font-bold shadow-md hover:brightness-105 transition-all text-center"
          >
            Reserve {selectedServiceForModal.name}
          </button>
        </div>
      </div>
    </div>
  );
};
