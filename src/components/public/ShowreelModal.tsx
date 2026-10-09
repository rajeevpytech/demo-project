import React from 'react';
import { useCms } from '../../context/CmsContext';

export const ShowreelModal: React.FC = () => {
  const { showShowreelModal, setShowShowreelModal, setActivePublicTab } = useCms();

  if (!showShowreelModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#0e0e10]/90 backdrop-blur-2xl flex items-center justify-center p-4 animate-in fade-in">
      <div className="w-full max-w-lg rounded-xl bg-[#2a2a2c] border border-[#4d4635] p-5 flex flex-col gap-3 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#f2ca50] text-[22px]">play_circle</span>
            <span className="font-serif-luxury text-base sm:text-lg font-semibold text-[#e5e1e4]">
              2025 Royal Showcase Reel
            </span>
          </div>
          <button 
            onClick={() => setShowShowreelModal(false)}
            className="w-8 h-8 rounded-full bg-[#201f22] flex items-center justify-center text-[#e5e1e4] hover:text-[#f2ca50] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Cinematic Video Showcase Container */}
        <div className="w-full h-64 sm:h-72 rounded-lg bg-[#0e0e10] flex flex-col items-center justify-center relative overflow-hidden group">
          <img 
            className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700" 
            alt="Showreel 4K Master" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCieWqe0mC1vcRsIkppBxWd423pVtnRiRg8TOqoYiC5me_mkVhRc-_0dQDTeDuhjKYWSFosxBg6gF-mktCNexUZF-2ed2e4v2La44IoIfkL9H2IKXIL0bot2QICvdu21lPD6pK3t350LI6VV0tdC_YEp3LLIruLPUEzE1CTeTRMHuOI1UfNqVoebPjfJteoJsXZpOchKJhFDfFfFmEzIFaHU4DY6Hru9SKoJCB48-P6BfYmSgLZx_xM6w" 
          />
          <div className="absolute inset-0 bg-[#0e0e10]/40 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-[#f2ca50] text-[#3c2f00] flex items-center justify-center shadow-[0_0_24px_rgba(242,202,80,0.6)] cursor-pointer hover:scale-110 active:scale-95 transition-transform">
              <span className="material-symbols-outlined text-[36px]">play_arrow</span>
            </div>
          </div>
          <div className="absolute bottom-3 left-3 right-3 flex justify-between text-[11px] text-white/90 bg-[#0e0e10]/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#4d4635]/40 font-mono">
            <span>Umaid Bhawan &bull; Mehrangarh Fort Galas</span>
            <span>4K HDR 60fps</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-[#d0c5af] pt-1">
          <span>Duration: 2m 45s • High-Fidelity Audioboard Master</span>
          <button 
            onClick={() => {
              setShowShowreelModal(false);
              setActivePublicTab('book');
            }}
            className="font-sans-luxury text-[11px] font-bold text-[#f2ca50] hover:underline uppercase tracking-wider"
          >
            Reserve Performance Date
          </button>
        </div>
      </div>
    </div>
  );
};
