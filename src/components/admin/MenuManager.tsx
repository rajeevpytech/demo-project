import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';

export const MenuManager: React.FC = () => {
  const { showToast } = useCms();
  const [navLinks, setNavLinks] = useState([
    { label: 'Explore', path: 'explore', isVisible: true },
    { label: 'Services & Cities', path: 'services-cities', isVisible: true },
    { label: 'Book Date', path: 'book-date', isVisible: true },
    { label: 'Audio & Reels', path: 'audio-reels', isVisible: true },
    { label: 'VIP Line', path: 'vip-line', isVisible: true },
    { label: 'About Us', path: 'about', isVisible: true },
    { label: 'Editorial / Blog', path: 'blog', isVisible: true },
  ]);

  const toggleVisibility = (idx: number) => {
    setNavLinks(prev => prev.map((l, i) => i === idx ? { ...l, isVisible: !l.isVisible } : l));
    showToast("Menu navigation link updated!");
  };

  return (
    <div className="space-y-5 max-w-4xl">
      <div className="p-5 rounded-xl bg-[#1c1b1e] border border-[#4d4635]/40">
        <h2 className="font-serif-luxury text-xl font-bold text-[#f2ca50]">
          Header &amp; Navigation Menu Manager
        </h2>
        <p className="text-xs text-[#d0c5af] mt-0.5">
          Configure active navigation tabs, mobile bottom bar routing, and footer link hierarchies.
        </p>
      </div>

      <div className="bg-[#1c1b1e] border border-[#4d4635]/40 rounded-xl overflow-hidden p-4 space-y-2">
        <div className="text-[10px] font-bold text-[#99907c] uppercase tracking-wider pb-2 border-b border-[#353437]">
          Main Site Links &bull; Drag &amp; Visibility
        </div>

        {navLinks.map((link, idx) => (
          <div key={link.path} className="p-3 rounded-lg bg-[#201f22] border border-[#4d4635]/30 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#99907c] text-[18px]">drag_indicator</span>
              <span className="font-semibold text-[#e5e1e4]">{link.label}</span>
              <span className="text-[11px] text-[#f2ca50] font-mono">/{link.path}</span>
            </div>

            <button
              onClick={() => toggleVisibility(idx)}
              className={`px-3 py-1 rounded text-xs font-bold ${
                link.isVisible ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-zinc-800 text-zinc-400'
              }`}
            >
              {link.isVisible ? 'Active' : 'Hidden'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
