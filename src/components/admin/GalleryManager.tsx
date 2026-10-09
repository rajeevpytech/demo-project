import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';

export const GalleryManager: React.FC = () => {
  const { reels, audioTracks, playTrack, showToast } = useCms();
  const [activeTab, setActiveTab] = useState<'reels' | 'audio'>('reels');

  return (
    <div className="space-y-5 max-w-6xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-5 rounded-xl bg-[#1c1b1e] border border-[#4d4635]/40">
        <div>
          <h2 className="font-serif-luxury text-xl font-bold text-[#f2ca50]">
            Performance Vault: Cinema Reels &amp; Master Audio
          </h2>
          <p className="text-xs text-[#d0c5af] mt-0.5">
            Manage high-fidelity 4K HDR reels, live soundboard feeds, and celebration setlists.
          </p>
        </div>

        <div className="flex items-center bg-[#201f22] rounded-lg p-1 border border-[#4d4635]/50">
          <button
            onClick={() => setActiveTab('reels')}
            className={`px-3 py-1.5 rounded text-xs font-semibold ${
              activeTab === 'reels' ? 'bg-[#f2ca50] text-[#3c2f00] font-bold' : 'text-[#d0c5af]'
            }`}
          >
            Cinema Reels ({reels.length})
          </button>
          <button
            onClick={() => setActiveTab('audio')}
            className={`px-3 py-1.5 rounded text-xs font-semibold ${
              activeTab === 'audio' ? 'bg-[#f2ca50] text-[#3c2f00] font-bold' : 'text-[#d0c5af]'
            }`}
          >
            Audio Tracks ({audioTracks.length})
          </button>
        </div>
      </div>

      {activeTab === 'reels' ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {reels.map((r) => (
            <div key={r.id} className="rounded-xl bg-[#1c1b1e] border border-[#4d4635]/40 overflow-hidden flex flex-col justify-between">
              <div className="relative aspect-[9/16] bg-[#0e0e10]">
                <img src={r.coverImageUrl} alt={r.title} className="w-full h-full object-cover" />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#0e0e10]/80 text-[10px] font-bold text-[#f2ca50]">
                  {r.duration}
                </span>
                <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-[#0e0e10]/80 text-[10px] font-bold text-[#d4c78f]">
                  ❤️ {r.likesCount}
                </span>
              </div>
              <div className="p-3">
                <span className="text-[10px] uppercase font-bold text-[#f2ca50]">{r.venue}</span>
                <h4 className="font-serif-luxury text-xs font-semibold text-[#e5e1e4] line-clamp-2 mt-0.5">
                  {r.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {audioTracks.map((t) => (
            <div key={t.id} className="p-3 rounded-lg bg-[#1c1b1e] border border-[#4d4635]/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => playTrack(t)}
                  className="w-8 h-8 rounded-full bg-[#f2ca50] text-[#3c2f00] flex items-center justify-center hover:scale-105"
                >
                  <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                </button>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-[#e5e1e4]">{t.title}</h4>
                  <span className="text-[11px] text-[#d0c5af]">{t.artist} &bull; {t.venueSnippet}</span>
                </div>
              </div>
              <span className="text-xs text-[#f2ca50] font-mono">{t.duration}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
