import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';

export const ReelsScreen: React.FC = () => {
  const { 
    reels, 
    toggleLikeReel, 
    audioTracks, 
    activeTrack, 
    isPlaying, 
    playTrack, 
    togglePlayPause, 
    addToSetlist, 
    setActivePublicTab,
    setShowShowreelModal,
    showToast 
  } = useCms();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isMuted, setIsMuted] = useState(false);

  const categories = [
    { id: 'all', label: 'All (150+)' },
    { id: 'sufi', label: 'Royal Sufi' },
    { id: 'bollywood', label: 'Bollywood Hits' },
    { id: 'retro', label: 'Retro Classics' },
    { id: 'jazz', label: 'Jazz & Pop' },
    { id: 'fusion', label: 'Fusion Duets' }
  ];

  const filteredTracks = selectedCategory === 'all' 
    ? audioTracks 
    : audioTracks.filter(t => t.category === selectedCategory);

  return (
    <div className="flex flex-col w-full px-4 sm:px-6 pb-28 space-y-7 max-w-4xl mx-auto selection:bg-[#d4af37] selection:text-[#131315]">
      {/* Header Introduction */}
      <div className="flex flex-col pt-2">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#4f471b] text-[#f2ca50] text-[11px]">
            <span className="material-symbols-outlined text-[13px]">stars</span>
          </span>
          <span className="font-sans-luxury text-[11px] font-bold text-[#d4c78f] tracking-widest uppercase">
            Archival Recordings
          </span>
        </div>
        <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[#e5e1e4] tracking-tight font-medium">
          The Performance Vault
        </h2>
        <p className="text-xs sm:text-sm text-[#d0c5af] mt-1.5 leading-relaxed">
          Experience the sonic majesty captured live at India's most prestigious palace celebrations and grand galas.
        </p>
      </div>

      {/* Master Audio Player Card (Floating Live Fidelity Deck) */}
      <div className="bg-[#2a2a2c] border border-[#4d4635]/60 rounded-xl p-4 sm:p-5 shadow-[0_8px_32px_rgba(0,0,0,0.45)] relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-36 h-36 rounded-full bg-[#f2ca50]/10 blur-2xl pointer-events-none"></div>

        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f2ca50] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#f2ca50]"></span>
            </span>
            <span className="font-sans-luxury text-[11px] font-bold text-[#f2ca50] truncate uppercase tracking-wider">
              Live Master Feed • 320kbps Lossless
            </span>
          </div>
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#0e0e10] border border-[#4d4635]/40 text-[#f1e3a9]">
            {activeTrack?.venueSnippet?.split('•')[0]?.trim() || "Udaipur Palace"}
          </span>
        </div>

        {/* Track Details & Visualizer Bars */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="font-serif-luxury text-base sm:text-lg text-[#e5e1e4] font-semibold truncate">
              {activeTrack?.title || "Kesariya & Mast Qalandar (Royal Live Fusion)"}
            </h3>
            <p className="text-xs text-[#d0c5af] truncate mt-0.5">
              {activeTrack?.artist || "12-Piece Royal Orchestra • Live Soundboard Mix"}
            </p>
          </div>

          {/* Animated Equalizer Bars */}
          <div className="flex items-end gap-1 h-6 flex-shrink-0 pt-1">
            <div className={`w-1 bg-[#f2ca50] rounded-full transition-all duration-300 ${isPlaying ? 'h-3 animate-pulse' : 'h-1.5'}`}></div>
            <div className={`w-1 bg-[#f2ca50] rounded-full transition-all duration-300 ${isPlaying ? 'h-5 animate-pulse' : 'h-2'}`} style={{ animationDelay: '150ms' }}></div>
            <div className={`w-1 bg-[#d4c78f] rounded-full transition-all duration-300 ${isPlaying ? 'h-2 animate-pulse' : 'h-1'}`} style={{ animationDelay: '300ms' }}></div>
            <div className={`w-1 bg-[#f2ca50] rounded-full transition-all duration-300 ${isPlaying ? 'h-6 animate-pulse' : 'h-3'}`} style={{ animationDelay: '75ms' }}></div>
            <div className={`w-1 bg-[#d4af37] rounded-full transition-all duration-300 ${isPlaying ? 'h-4 animate-pulse' : 'h-2'}`} style={{ animationDelay: '220ms' }}></div>
          </div>
        </div>

        {/* Scrubber Timeline */}
        <div className="mt-4 flex flex-col gap-1.5">
          <div className="relative w-full h-1.5 bg-[#0e0e10] rounded-full cursor-pointer overflow-hidden">
            <div 
              className={`h-full bg-[#f2ca50] rounded-full transition-all duration-500 ${isPlaying ? 'w-[42%]' : 'w-[20%]'}`}
            ></div>
          </div>
          <div className="flex items-center justify-between text-[11px] text-[#d0c5af] font-mono">
            <span>{isPlaying ? '02:18' : '00:00'}</span>
            <span>{activeTrack?.duration || '05:32'}</span>
          </div>
        </div>

        {/* Audio Player Action Row */}
        <div className="flex items-center justify-between mt-3 pt-2">
          <div className="flex items-center gap-1.5">
            <button 
              onClick={togglePlayPause}
              aria-label="Toggle Play" 
              className="w-11 h-11 rounded-lg bg-[#f2ca50] text-[#3c2f00] flex items-center justify-center shadow-[0_0_16px_rgba(242,202,80,0.35)] active:scale-95 transition-transform hover:brightness-105 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[24px]">
                {isPlaying ? 'pause' : 'play_arrow'}
              </span>
            </button>
            <button 
              onClick={() => {
                const currentIndex = audioTracks.findIndex(t => t.id === activeTrack?.id);
                const nextIndex = (currentIndex + 1) % audioTracks.length;
                playTrack(audioTracks[nextIndex]);
              }}
              aria-label="Skip to Next Track" 
              className="w-9 h-9 rounded-lg bg-[#201f22] text-[#e5e1e4] flex items-center justify-center hover:bg-[#353437] transition-colors active:scale-95 cursor-pointer border border-[#4d4635]/40"
            >
              <span className="material-symbols-outlined text-[18px]">skip_next</span>
            </button>
            <button 
              onClick={() => setIsMuted(!isMuted)}
              aria-label="Audio Mute" 
              className={`w-9 h-9 rounded-lg bg-[#201f22] flex items-center justify-center transition-colors active:scale-95 cursor-pointer border border-[#4d4635]/40 ${
                isMuted ? 'text-red-400' : 'text-[#d0c5af] hover:text-[#e5e1e4]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isMuted ? 'volume_off' : 'volume_up'}
              </span>
            </button>
          </div>

          <button 
            onClick={() => {
              if (activeTrack) addToSetlist(activeTrack.title);
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#4f471b] border border-[#f2ca50]/40 text-[#f1e3a9] text-xs font-semibold hover:bg-[#353437] active:scale-95 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">bookmark_add</span>
            <span>Add to Setlist</span>
          </button>
        </div>
      </div>

      {/* Video Reels Section Header */}
      <div className="flex flex-col space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="font-serif-luxury text-xl sm:text-2xl text-[#e5e1e4] font-medium">
            Cinema Reels
          </h3>
          <span className="font-sans-luxury text-[11px] font-bold text-[#f2ca50] flex items-center gap-1 uppercase tracking-wider">
            4K HDR <span className="material-symbols-outlined text-[14px]">videocam</span>
          </span>
        </div>
        <p className="text-xs sm:text-sm text-[#d0c5af]">
          Tap to immerse in live high-voltage crowd atmospheres.
        </p>
      </div>

      {/* Vertical 9:16 Reels Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {reels.map((reel) => (
          <div 
            key={reel.id}
            onClick={() => setShowShowreelModal(true)}
            className="group relative rounded-xl overflow-hidden aspect-[9/16] bg-[#0e0e10] border border-[#4d4635]/40 shadow-lg cursor-pointer transform transition-all active:scale-[0.98]"
          >
            <img 
              src={reel.coverImageUrl} 
              alt={reel.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e10] via-[#0e0e10]/30 to-black/40"></div>

            {/* Top Badges */}
            <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
              <span className="px-2 py-0.5 rounded-full bg-[#0e0e10]/80 backdrop-blur-md text-[10px] font-sans-luxury font-bold tracking-wider text-[#f2ca50] border border-[#4d4635]/40">
                {reel.duration}
              </span>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLikeReel(reel.id);
                }}
                className={`w-7 h-7 rounded-full bg-[#0e0e10]/80 backdrop-blur-md flex items-center justify-center transition-colors ${
                  reel.isLiked ? 'text-red-500' : 'text-[#e5e1e4] hover:text-[#f2ca50]'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">favorite</span>
              </button>
            </div>

            {/* Play Center Action Glow */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-11 h-11 rounded-full bg-[#f2ca50]/90 text-[#3c2f00] flex items-center justify-center shadow-[0_0_20px_rgba(242,202,80,0.5)] group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[24px]">play_arrow</span>
              </div>
            </div>

            {/* Bottom Card Info */}
            <div className="absolute bottom-2.5 left-2.5 right-2.5 flex flex-col z-10">
              <span className="font-sans-luxury text-[10px] font-bold text-[#d4c78f] uppercase tracking-wide">
                {reel.venue}
              </span>
              <p className="font-serif-luxury text-xs sm:text-sm text-[#e5e1e4] font-medium leading-tight line-clamp-2 mt-0.5">
                {reel.title}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Repertoire & Tracklist Section */}
      <div className="flex flex-col space-y-3 pt-1">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h3 className="font-serif-luxury text-xl sm:text-2xl text-[#e5e1e4] font-medium">
              Setlist Repertoire
            </h3>
            <span className="text-xs text-[#d0c5af]">Tap preview icon to stream live snippet.</span>
          </div>
          <span className="font-sans-luxury text-[10px] font-bold px-2.5 py-1 rounded bg-[#2a2a2c] text-[#f2ca50] border border-[#4d4635]/40 uppercase">
            150+ Tracks
          </span>
        </div>

        {/* Horizontal Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold active:scale-95 transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#f2ca50] text-[#3c2f00] font-bold shadow-sm'
                  : 'bg-[#201f22] text-[#d0c5af] hover:text-[#e5e1e4] hover:bg-[#2a2a2c] border border-[#4d4635]/40'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Sample Tracklist */}
        <div className="flex flex-col space-y-2 mt-1">
          {filteredTracks.map((track) => {
            const isThisPlaying = activeTrack?.id === track.id && isPlaying;
            return (
              <div 
                key={track.id}
                onClick={() => playTrack(track)}
                className={`flex items-center justify-between p-3 rounded-lg border transition-colors cursor-pointer ${
                  activeTrack?.id === track.id 
                    ? 'bg-[#2a2a2c] border-[#f2ca50]/60' 
                    : 'bg-[#201f22] border-[#4d4635]/30 hover:bg-[#2a2a2c]'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                    isThisPlaying 
                      ? 'bg-[#f2ca50] text-[#3c2f00]' 
                      : 'bg-[#0e0e10] text-[#f2ca50]'
                  }`}>
                    <span className="material-symbols-outlined text-[18px]">
                      {isThisPlaying ? 'pause' : 'play_arrow'}
                    </span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs sm:text-sm font-semibold text-[#e5e1e4] truncate">
                      {track.title}
                    </span>
                    <span className="text-[11px] text-[#d0c5af] truncate">
                      {track.artist}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                  <span className="text-[11px] text-[#99907c] font-mono">{track.duration}</span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      addToSetlist(track.title);
                    }}
                    title="Add track to inquiry setlist"
                    className="w-8 h-8 rounded text-[#d0c5af] hover:text-[#f2ca50] flex items-center justify-center active:scale-90"
                  >
                    <span className="material-symbols-outlined text-[18px]">add_circle_outline</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* VIP Client Review & Social Proof Card */}
      <div className="rounded-xl p-4 sm:p-5 bg-[#1c1b1e] border border-[#4d4635]/40 flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-[#f2ca50]">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="material-symbols-outlined text-[18px]">star</span>
            ))}
          </div>
          <span className="px-2 py-0.5 rounded-full bg-[#4f471b] border border-[#f2ca50]/30 text-[#f1e3a9] font-sans-luxury text-[10px] font-bold uppercase tracking-wider">
            Verified Royal Host
          </span>
        </div>

        <blockquote className="font-serif-luxury text-sm sm:text-base text-[#e5e1e4] italic leading-snug">
          “Unmatched live energy, soaring acoustic purity, and impeccable royal decorum throughout our three-day celebration.”
        </blockquote>

        <div className="flex items-center gap-3 pt-1">
          <div className="w-9 h-9 rounded-full bg-[#353437] border border-[#f2ca50]/40 flex items-center justify-center text-[#f2ca50] font-bold text-sm">
            M
          </div>
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-semibold text-[#e5e1e4]">Maharaja H. Singh</span>
            <span className="text-[11px] text-[#d0c5af]">Jodhpur Fort Celebration • Dec 2024</span>
          </div>
        </div>
      </div>

      {/* Sticky Conversion Deck (Setlist Request Action) */}
      <div className="p-4 sm:p-5 rounded-xl bg-[#2a2a2c]/95 backdrop-blur-xl border border-[#4d4635]/60 shadow-[0_8px_32px_rgba(0,0,0,0.8)]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#f2ca50] text-[20px]">queue_music</span>
            <span className="text-sm sm:text-base font-semibold text-[#e5e1e4]">Custom Setlist Curator</span>
          </div>
          <span className="font-sans-luxury text-[10px] font-bold text-[#f2ca50] uppercase tracking-wider">
            VIP Concierge
          </span>
        </div>
        <p className="text-xs text-[#d0c5af] mb-3">
          Curate your dream celebration repertoire with our music directors. 100% tailor-made arrangements.
        </p>
        <button 
          onClick={() => {
            showToast("Bespoke setlist request registered! Transferring to VIP Booking concierge...");
            setActivePublicTab('book');
          }}
          className="w-full h-12 rounded-lg bg-[#f2ca50] text-[#3c2f00] flex items-center justify-center gap-2 text-xs sm:text-sm font-bold shadow-[0_0_24px_rgba(242,202,80,0.3)] hover:brightness-105 active:scale-95 transition-all cursor-pointer"
        >
          <span>Request Custom Setlist &amp; Songs</span>
          <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};
