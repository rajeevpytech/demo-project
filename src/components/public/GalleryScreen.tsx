import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { MediaAsset } from '../../types';

export const GalleryScreen: React.FC = () => {
  const { mediaAssets, reels, navigateTo } = useCms();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'weddings' | 'corporate' | 'private' | 'live'>('all');
  const [mediaTypeFilter, setMediaTypeFilter] = useState<'all' | 'image' | 'video'>('all');
  const [activeLightboxAsset, setActiveLightboxAsset] = useState<MediaAsset | null>(null);

  // Categorize media assets into the 4 requested categories plus All
  const getCategoryForAsset = (asset: MediaAsset): 'weddings' | 'corporate' | 'private' | 'live' => {
    const text = (asset.title + ' ' + (asset.altText || '') + ' ' + (asset.caption || '')).toLowerCase();
    if (text.includes('wedding') || text.includes('baraat') || text.includes('phere') || text.includes('sangeet') || text.includes('groom')) {
      return 'weddings';
    }
    if (text.includes('corporate') || text.includes('awards') || text.includes('gala') || text.includes('executive') || text.includes('black-tie')) {
      return 'corporate';
    }
    if (text.includes('private') || text.includes('soiree') || text.includes('cocktail') || text.includes('jazz') || text.includes('dinner')) {
      return 'private';
    }
    return 'live';
  };

  const categorizedAssets = mediaAssets.map(asset => ({
    ...asset,
    eventCategory: getCategoryForAsset(asset)
  }));

  const filteredAssets = categorizedAssets.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.eventCategory === selectedCategory;
    const matchesType = mediaTypeFilter === 'all' || item.type === mediaTypeFilter;
    return matchesCategory && matchesType;
  });

  const categories = [
    { id: 'all', label: 'All Showcase', icon: 'auto_awesome', count: categorizedAssets.length },
    { id: 'weddings', label: 'Weddings', icon: 'celebration', count: categorizedAssets.filter(a => a.eventCategory === 'weddings').length },
    { id: 'corporate', label: 'Corporate Events', icon: 'business_center', count: categorizedAssets.filter(a => a.eventCategory === 'corporate').length },
    { id: 'private', label: 'Private Parties', icon: 'wine_bar', count: categorizedAssets.filter(a => a.eventCategory === 'private').length },
    { id: 'live', label: 'Live Performances', icon: 'music_note', count: categorizedAssets.filter(a => a.eventCategory === 'live').length },
  ];

  return (
    <div className="flex flex-col w-full px-4 sm:px-6 pb-28 gap-y-6 max-w-6xl mx-auto selection:bg-[#d4af37] selection:text-[#131315]">
      {/* Top Breadcrumb & Status Ribbon */}
      <div className="mb-2 mt-2 flex items-center justify-between text-xs text-[#d0c5af]">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => navigateTo('home')}
            className="hover:text-[#f2ca50] transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-[#f2ca50] font-bold">Gallery</span>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-[#201f22] border border-[#4d4635]/60 text-[10px] text-[#f2ca50] font-mono font-bold uppercase tracking-wider">
          Palace Archive &bull; Photos &amp; 4K Reels
        </span>
      </div>

      {/* Subheader Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-[#1c1b1e] border border-[#4d4635]/50 p-6 sm:p-8 shadow-2xl">
        <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-[#f2ca50]/10 blur-3xl pointer-events-none"></div>
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#2a2a2c] text-[#f2ca50] shadow-sm border border-[#4d4635]/40">
            <span className="material-symbols-outlined text-[18px]">photo_library</span>
          </span>
          <span className="font-sans-luxury text-[11px] font-bold text-[#d4c78f] tracking-widest uppercase">
            Visual Archive &amp; Palatial Highlights
          </span>
        </div>
        <h1 className="font-serif-luxury text-2xl sm:text-4xl text-[#e5e1e4] font-medium leading-tight">
          Performance Gallery &amp; Concert Vault
        </h1>
        <p className="font-sans-luxury text-xs sm:text-sm text-[#d0c5af] mt-2 leading-relaxed max-w-2xl">
          Capturing unforgettable moments across weddings, corporate galas, private soirées, and high-energy live concerts at Umaid Bhawan Palace, Taj Lake Palace, Agra heritage lawns, and luxury destinations.
        </p>

        {/* Category Tabs: Weddings, Corporate Events, Private Parties, Live Performances */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-5 border-t border-[#353437]/70">
          <span className="text-[11px] text-[#99907c] uppercase tracking-wider font-semibold mr-1 hidden sm:inline">
            Category:
          </span>
          {categories.map(cat => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#f2ca50] text-[#3c2f00] font-bold shadow-md scale-[1.02]'
                    : 'bg-[#2a2a2c] text-[#d0c5af] hover:text-[#f2ca50] hover:bg-[#353437] border border-[#4d4635]/50'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">{cat.icon}</span>
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${isActive ? 'bg-[#3c2f00]/20 text-[#3c2f00]' : 'bg-[#1c1b1e] text-[#99907c]'}`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Media Format Filter (Photos vs Video Reels) */}
        <div className="flex items-center gap-2 mt-3 pt-3">
          <span className="text-[11px] text-[#99907c] uppercase tracking-wider font-semibold mr-1">
            Format:
          </span>
          <button
            onClick={() => setMediaTypeFilter('all')}
            className={`px-2.5 py-1 rounded-lg text-xs cursor-pointer ${
              mediaTypeFilter === 'all'
                ? 'bg-[#353437] text-[#f2ca50] font-bold'
                : 'text-[#d0c5af] hover:text-white'
            }`}
          >
            All Media
          </button>
          <button
            onClick={() => setMediaTypeFilter('image')}
            className={`px-2.5 py-1 rounded-lg text-xs cursor-pointer flex items-center gap-1 ${
              mediaTypeFilter === 'image'
                ? 'bg-[#353437] text-[#f2ca50] font-bold'
                : 'text-[#d0c5af] hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[13px]">image</span>
            <span>Photography</span>
          </button>
          <button
            onClick={() => setMediaTypeFilter('video')}
            className={`px-2.5 py-1 rounded-lg text-xs cursor-pointer flex items-center gap-1 ${
              mediaTypeFilter === 'video'
                ? 'bg-[#353437] text-[#f2ca50] font-bold'
                : 'text-[#d0c5af] hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[13px]">videocam</span>
            <span>Cinema Reels</span>
          </button>
        </div>
      </div>

      {/* Responsive Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredAssets.map(asset => (
          <div
            key={asset.id}
            onClick={() => setActiveLightboxAsset(asset)}
            className="group relative rounded-2xl bg-[#1c1b1e] border border-[#4d4635]/40 overflow-hidden shadow-lg cursor-pointer hover:border-[#f2ca50]/70 hover:shadow-[0_8px_30px_rgba(242,202,80,0.15)] transition-all duration-300 flex flex-col"
          >
            <div className="relative aspect-[16/10] sm:aspect-square w-full bg-[#0e0e10] overflow-hidden">
              <img
                src={asset.url}
                alt={asset.altText}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e10]/95 via-[#0e0e10]/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity"></div>

              {/* Badges on Top */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-[#0e0e10]/85 text-[10px] font-bold text-[#f2ca50] uppercase tracking-wider backdrop-blur-md border border-[#4d4635]/50 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px]">
                    {asset.eventCategory === 'weddings' ? 'celebration' : asset.eventCategory === 'corporate' ? 'business_center' : asset.eventCategory === 'private' ? 'wine_bar' : 'music_note'}
                  </span>
                  <span>{asset.eventCategory}</span>
                </span>

                <span className="px-2 py-0.5 rounded-md bg-[#0e0e10]/85 text-[10px] font-bold text-[#e5e1e4] uppercase backdrop-blur-md border border-[#4d4635]/40 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px] text-[#f2ca50]">
                    {asset.type === 'video' ? 'videocam' : 'photo_camera'}
                  </span>
                  <span>{asset.type}</span>
                </span>
              </div>

              {/* Click to Zoom Pill */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <span className="px-3 py-1.5 rounded-full bg-[#f2ca50] text-[#3c2f00] text-xs font-bold shadow-lg flex items-center gap-1 scale-95 group-hover:scale-100 transition-transform">
                  <span className="material-symbols-outlined text-[15px]">zoom_in</span>
                  <span>View Lightbox</span>
                </span>
              </div>

              {/* Caption Bottom overlay */}
              <div className="absolute bottom-3 left-3 right-3 text-left">
                <p className="font-serif-luxury text-sm font-semibold text-white group-hover:text-[#f2ca50] transition-colors line-clamp-1">
                  {asset.title}
                </p>
                <p className="text-[11px] text-[#d0c5af] line-clamp-2 mt-0.5 leading-snug opacity-90">
                  {asset.altText}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAssets.length === 0 && (
        <div className="text-center py-16 bg-[#1c1b1e] rounded-2xl border border-[#4d4635]/40 p-8">
          <span className="material-symbols-outlined text-[#99907c] text-[48px] mb-2">collections</span>
          <h3 className="font-serif-luxury text-lg text-white font-bold">No Media Found</h3>
          <p className="text-xs text-[#d0c5af] mt-1">Try switching categories or choosing 'All Media'.</p>
          <button
            onClick={() => { setSelectedCategory('all'); setMediaTypeFilter('all'); }}
            className="mt-4 px-4 py-2 rounded-xl bg-[#2a2a2c] text-[#f2ca50] text-xs font-bold border border-[#4d4635]"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* WORKING LIGHTBOX MODAL */}
      {activeLightboxAsset && (
        <div
          onClick={() => setActiveLightboxAsset(null)}
          className="fixed inset-0 z-50 bg-[#0e0e10]/95 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-[#1c1b1e] border border-[#4d4635] rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
          >
            {/* Top Close Bar */}
            <div className="p-3.5 bg-[#141418] border-b border-[#353437] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#f2ca50] text-[18px]">visibility</span>
                <span className="text-xs font-bold text-[#e5e1e4]">
                  {activeLightboxAsset.title}
                </span>
                <span className="text-[10px] bg-[#2a2a2c] text-[#d4c78f] px-2 py-0.5 rounded-full uppercase font-mono">
                  {activeLightboxAsset.type}
                </span>
              </div>
              <button
                onClick={() => setActiveLightboxAsset(null)}
                className="w-8 h-8 rounded-full bg-[#2a2a2c] text-[#e5e1e4] hover:text-[#f2ca50] hover:bg-[#353437] flex items-center justify-center text-lg cursor-pointer transition-colors"
                title="Close Lightbox"
              >
                &times;
              </button>
            </div>

            {/* Media Canvas */}
            <div className="relative aspect-video sm:aspect-[16/10] w-full bg-black flex items-center justify-center overflow-hidden">
              <img
                src={activeLightboxAsset.url}
                alt={activeLightboxAsset.altText}
                className="max-h-[65vh] w-auto max-w-full object-contain mx-auto"
              />
            </div>

            {/* Bottom Details & Booking Action */}
            <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#141418] border-t border-[#353437]">
              <div className="max-w-xl">
                <h3 className="font-serif-luxury text-base sm:text-lg font-bold text-white">
                  {activeLightboxAsset.title}
                </h3>
                <p className="text-xs text-[#d0c5af] mt-1 leading-relaxed">
                  {activeLightboxAsset.altText}
                </p>
                {activeLightboxAsset.fileSize && (
                  <span className="text-[10px] text-[#99907c] mt-1 block">
                    Source Resolution: {activeLightboxAsset.dimensions || '4K Masters'} &bull; Size: {activeLightboxAsset.fileSize}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => {
                    setActiveLightboxAsset(null);
                    navigateTo('contact');
                  }}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#f2ca50] text-[#3c2f00] text-xs font-bold uppercase tracking-wider hover:brightness-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap shadow-md text-center"
                >
                  Enquire for Date
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
