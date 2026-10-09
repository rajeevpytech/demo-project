import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { PageBlock, PageSection } from '../../types';

export const VisualPageBuilder: React.FC = () => {
  const { 
    pages, 
    currentPageId, 
    setCurrentPageId, 
    updatePageBlock, 
    addPageBlock, 
    deletePageBlock, 
    publishPage, 
    restorePageRevision, 
    mediaAssets,
    showToast 
  } = useCms();

  const [previewViewport, setPreviewViewport] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [editingImageTargetBlockId, setEditingImageTargetBlockId] = useState<string | null>(null);

  const activePage = pages.find(p => p.id === currentPageId) || pages[0];
  const allBlocks = activePage.sections.flatMap(s => s.blocks);
  const activeBlock = allBlocks.find(b => b.id === selectedBlockId) || allBlocks[0];

  const handleAddNewBlock = (type: PageBlock['type']) => {
    const newBlock: PageBlock = {
      id: `blk-${Date.now()}`,
      type,
      title: type === 'hero' ? 'New Regal Symphonic Headline' : 
             type === 'faq' ? 'Frequently Asked Questions' :
             type === 'quote' ? 'Client Royal Acclaim' : 'Exclusive Performance Block',
      subtitle: 'Bespoke live orchestra and royal band arrangements for palace celebrations.',
      badge: 'Royal Edition',
      ctaText: 'Reserve Dates',
      ctaLink: '#book',
      imageUrl: mediaAssets[0]?.url || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCddgIHrqFDssqCfud3_WvkQVIJut7OHepo7JZKpx03tYogGK5lmKIWdpchElaMr2SttOOOia2n4NFjNxhuVTR_ir0WscCh8xxjIzvdhpdXFwpDdwb77svmIhiSgwaxhmGgJC24IW4WUBuMAIn2VdmYCuk346YTCO529mSPAUHOgVGV265u4wV0Up4zkmVhWLzveBbEHFUF3Ae5TQxu_nSa7vaNwaYfv6OHamncjaV7hgiL134ssxAitQ',
      isVisible: true,
      order: allBlocks.length + 1
    };

    addPageBlock(activePage.id, newBlock);
    setSelectedBlockId(newBlock.id);
  };

  const handlePickMediaForBlock = (mediaUrl: string) => {
    if (editingImageTargetBlockId) {
      updatePageBlock(activePage.id, editingImageTargetBlockId, { imageUrl: mediaUrl });
      setShowMediaPicker(false);
      setEditingImageTargetBlockId(null);
      showToast("Block media updated!");
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] -m-4 sm:-m-6 bg-[#0e0e10]">
      {/* Top Toolbar */}
      <div className="h-14 px-4 bg-[#141418] border-b border-[#4d4635]/40 flex items-center justify-between gap-4 flex-shrink-0">
        {/* Page Selector & Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#f2ca50] text-[20px]">view_quilt</span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#d4c78f] hidden sm:inline">Page:</span>
          </div>
          <select
            value={activePage.id}
            onChange={(e) => {
              setCurrentPageId(e.target.value);
              setSelectedBlockId(null);
            }}
            className="bg-[#201f22] text-xs font-semibold text-[#e5e1e4] rounded px-3 py-1.5 border border-[#4d4635] focus:outline-none"
          >
            {pages.map(p => (
              <option key={p.id} value={p.id}>
                {p.title} ({p.status.toUpperCase()})
              </option>
            ))}
          </select>

          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#4f471b] text-[#f1e3a9] border border-[#f2ca50]/40">
            {activePage.status}
          </span>
        </div>

        {/* Viewport Width Switchers */}
        <div className="flex items-center bg-[#201f22] rounded-lg p-0.5 border border-[#4d4635]/50">
          <button
            onClick={() => setPreviewViewport('desktop')}
            className={`p-1.5 rounded text-xs transition-colors ${previewViewport === 'desktop' ? 'bg-[#d4af37] text-[#131315]' : 'text-[#d0c5af] hover:text-white'}`}
            title="Desktop View"
          >
            <span className="material-symbols-outlined text-[16px]">desktop_windows</span>
          </button>
          <button
            onClick={() => setPreviewViewport('tablet')}
            className={`p-1.5 rounded text-xs transition-colors ${previewViewport === 'tablet' ? 'bg-[#d4af37] text-[#131315]' : 'text-[#d0c5af] hover:text-white'}`}
            title="Tablet View"
          >
            <span className="material-symbols-outlined text-[16px]">tablet</span>
          </button>
          <button
            onClick={() => setPreviewViewport('mobile')}
            className={`p-1.5 rounded text-xs transition-colors ${previewViewport === 'mobile' ? 'bg-[#d4af37] text-[#131315]' : 'text-[#d0c5af] hover:text-white'}`}
            title="Mobile View"
          >
            <span className="material-symbols-outlined text-[16px]">smartphone</span>
          </button>
        </div>

        {/* Publish Action & Revisions Dropdown */}
        <div className="flex items-center gap-2">
          {activePage.revisions?.length > 0 && (
            <div className="relative group">
              <button className="h-8 px-2.5 rounded bg-[#201f22] hover:bg-[#2a2a2c] text-[11px] font-semibold text-[#d0c5af] border border-[#4d4635]/60 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">history</span>
                <span>Revisions ({activePage.revisions.length})</span>
              </button>
              <div className="absolute right-0 top-9 w-64 bg-[#201f22] border border-[#4d4635] rounded-xl shadow-2xl p-2 z-50 hidden group-hover:block">
                <span className="text-[10px] font-bold text-[#f2ca50] uppercase block px-2 py-1">Restore Past Snapshot</span>
                {activePage.revisions.map(rev => (
                  <button
                    key={rev.id}
                    onClick={() => restorePageRevision(activePage.id, rev.id)}
                    className="w-full text-left px-2 py-1.5 rounded hover:bg-[#2a2a2c] text-xs text-[#d0c5af] hover:text-[#f2ca50] flex flex-col"
                  >
                    <span className="font-semibold">Version {rev.version} &bull; {rev.createdAt}</span>
                    <span className="text-[10px] text-[#99907c]">{rev.changeSummary}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={() => publishPage(activePage.id)}
            className="h-8 px-4 rounded bg-[#d4af37] hover:brightness-110 text-[#131315] font-bold text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">publish</span>
            <span>Publish Live</span>
          </button>
        </div>
      </div>

      {/* Main Builder Canvas & Inspector */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Blocks Hierarchy Tree */}
        <div className="w-64 bg-[#141418] border-r border-[#4d4635]/30 p-3 flex flex-col justify-between overflow-y-auto flex-shrink-0">
          <div>
            <div className="flex items-center justify-between mb-2 pb-2 border-b border-[#353437]">
              <span className="text-[11px] font-bold text-[#f2ca50] uppercase tracking-wider">
                Page Sections &amp; Blocks
              </span>
              <span className="text-[10px] text-[#99907c]">{allBlocks.length} Blocks</span>
            </div>

            <div className="space-y-1.5">
              {allBlocks.map((blk, idx) => {
                const isSelected = selectedBlockId === blk.id;
                return (
                  <div
                    key={blk.id}
                    onClick={() => setSelectedBlockId(blk.id)}
                    className={`p-2.5 rounded-lg border text-xs cursor-pointer flex items-center justify-between transition-colors ${
                      isSelected 
                        ? 'bg-[#2a2a2c] border-[#f2ca50] text-[#f2ca50]' 
                        : 'bg-[#201f22] border-[#4d4635]/40 text-[#d0c5af] hover:bg-[#2a2a2c]'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-[10px] text-[#99907c] font-mono">{idx + 1}.</span>
                      <span className="truncate font-semibold">{blk.title || blk.type.toUpperCase()}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updatePageBlock(activePage.id, blk.id, { isVisible: !blk.isVisible });
                        }}
                        title={blk.isVisible ? "Visible on live site" : "Hidden from site"}
                        className={`text-[15px] material-symbols-outlined ${blk.isVisible ? 'text-emerald-400' : 'text-[#99907c]'}`}
                      >
                        {blk.isVisible ? 'visibility' : 'visibility_off'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Add Block Palette */}
          <div className="pt-3 border-t border-[#353437]">
            <span className="text-[10px] font-bold text-[#d4c78f] uppercase block mb-1.5 tracking-wider">
              + Insert New Block
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => handleAddNewBlock('hero')}
                className="p-1.5 rounded bg-[#201f22] hover:bg-[#2a2a2c] text-[11px] text-[#e5e1e4] border border-[#4d4635]/40 text-left flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[14px] text-[#f2ca50]">art_track</span>
                <span>Hero Stage</span>
              </button>
              <button
                onClick={() => handleAddNewBlock('text_image')}
                className="p-1.5 rounded bg-[#201f22] hover:bg-[#2a2a2c] text-[11px] text-[#e5e1e4] border border-[#4d4635]/40 text-left flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[14px] text-[#f2ca50]">view_headline</span>
                <span>Text / Image</span>
              </button>
              <button
                onClick={() => handleAddNewBlock('packages_tier')}
                className="p-1.5 rounded bg-[#201f22] hover:bg-[#2a2a2c] text-[11px] text-[#e5e1e4] border border-[#4d4635]/40 text-left flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[14px] text-[#f2ca50]">workspace_premium</span>
                <span>Packages</span>
              </button>
              <button
                onClick={() => handleAddNewBlock('quote')}
                className="p-1.5 rounded bg-[#201f22] hover:bg-[#2a2a2c] text-[11px] text-[#e5e1e4] border border-[#4d4635]/40 text-left flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[14px] text-[#f2ca50]">format_quote</span>
                <span>Testimonial</span>
              </button>
            </div>
          </div>
        </div>

        {/* Center: Live Interactive Viewport */}
        <div className="flex-1 bg-[#0e0e10] p-4 flex items-center justify-center overflow-auto">
          <div className={`transition-all duration-300 bg-[#131315] border border-[#4d4635]/60 rounded-xl shadow-2xl overflow-y-auto max-h-full ${
            previewViewport === 'mobile' ? 'w-[375px] h-[667px]' :
            previewViewport === 'tablet' ? 'w-[768px] h-[720px]' :
            'w-full max-w-4xl h-full'
          }`}>
            {/* Rendered Live Blocks in Canvas */}
            <div className="p-4 sm:p-6 space-y-6">
              <div className="text-center pb-2 border-b border-[#353437]">
                <span className="text-[10px] uppercase tracking-widest text-[#99907c]">
                  Live Visual Rendering &bull; Click any element to edit
                </span>
              </div>

              {allBlocks.filter(b => b.isVisible).map((blk) => {
                const isSelected = selectedBlockId === blk.id;
                return (
                  <div
                    key={blk.id}
                    onClick={() => setSelectedBlockId(blk.id)}
                    className={`relative p-4 rounded-xl border transition-all cursor-pointer ${
                      isSelected 
                        ? 'border-[#f2ca50] ring-2 ring-[#f2ca50]/30 bg-[#1c1b1e]' 
                        : 'border-[#4d4635]/40 hover:border-[#f2ca50]/60 bg-[#1c1b1e]'
                    }`}
                  >
                    {/* Active Block Control Floating Bar */}
                    {isSelected && (
                      <div className="absolute -top-3.5 right-3 flex items-center gap-1 bg-[#d4af37] text-[#131315] px-2 py-0.5 rounded text-[10px] font-bold shadow uppercase">
                        <span>Selected Block: {blk.type}</span>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            deletePageBlock(activePage.id, blk.id);
                          }}
                          className="hover:text-red-700 ml-1"
                          title="Delete Block"
                        >
                          &times;
                        </button>
                      </div>
                    )}

                    {/* Block Content Render */}
                    {blk.badge && (
                      <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#4f471b] text-[#f1e3a9] mb-2">
                        {blk.badge}
                      </span>
                    )}

                    <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#e5e1e4]">
                      {blk.title}
                    </h3>

                    {blk.subtitle && (
                      <p className="text-xs sm:text-sm text-[#d0c5af] mt-1 leading-relaxed">
                        {blk.subtitle}
                      </p>
                    )}

                    {blk.imageUrl && (
                      <div className="relative mt-3 rounded-lg overflow-hidden h-44 bg-[#0e0e10] border border-[#4d4635]/40 group">
                        <img 
                          src={blk.imageUrl} 
                          alt={blk.title} 
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingImageTargetBlockId(blk.id);
                            setShowMediaPicker(true);
                          }}
                          className="absolute bottom-2 right-2 px-2.5 py-1 rounded bg-[#131315]/80 hover:bg-[#d4af37] text-white hover:text-[#131315] text-[11px] font-bold flex items-center gap-1 border border-[#4d4635]"
                        >
                          <span className="material-symbols-outlined text-[14px]">photo_camera</span>
                          <span>Replace Image</span>
                        </button>
                      </div>
                    )}

                    {blk.ctaText && (
                      <div className="mt-3">
                        <span className="inline-block px-4 py-2 rounded bg-[#f2ca50] text-[#3c2f00] text-xs font-bold shadow-sm">
                          {blk.ctaText}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Inspector Properties Panel */}
        <div className="w-80 bg-[#141418] border-l border-[#4d4635]/30 p-4 overflow-y-auto flex-shrink-0">
          <div className="flex items-center justify-between pb-3 border-b border-[#353437] mb-3">
            <span className="text-xs font-bold text-[#f2ca50] uppercase tracking-wider">
              Block Inspector
            </span>
            <span className="text-[10px] text-[#99907c] font-mono">
              #{activeBlock?.id || 'none'}
            </span>
          </div>

          {activeBlock ? (
            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-[#d4c78f] uppercase mb-1">
                  Heading / Title
                </label>
                <textarea
                  rows={2}
                  value={activeBlock.title || ''}
                  onChange={(e) => updatePageBlock(activePage.id, activeBlock.id, { title: e.target.value })}
                  className="w-full bg-[#201f22] text-[#e5e1e4] p-2.5 rounded border border-[#4d4635] focus:outline-none focus:border-[#f2ca50]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#d4c78f] uppercase mb-1">
                  Subtitle / Copy
                </label>
                <textarea
                  rows={3}
                  value={activeBlock.subtitle || ''}
                  onChange={(e) => updatePageBlock(activePage.id, activeBlock.id, { subtitle: e.target.value })}
                  className="w-full bg-[#201f22] text-[#e5e1e4] p-2.5 rounded border border-[#4d4635] focus:outline-none focus:border-[#f2ca50]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#d4c78f] uppercase mb-1">
                  Tag Badge
                </label>
                <input
                  type="text"
                  value={activeBlock.badge || ''}
                  onChange={(e) => updatePageBlock(activePage.id, activeBlock.id, { badge: e.target.value })}
                  className="w-full bg-[#201f22] text-[#e5e1e4] p-2 rounded border border-[#4d4635] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#d4c78f] uppercase mb-1">
                  CTA Button Label
                </label>
                <input
                  type="text"
                  value={activeBlock.ctaText || ''}
                  onChange={(e) => updatePageBlock(activePage.id, activeBlock.id, { ctaText: e.target.value })}
                  className="w-full bg-[#201f22] text-[#e5e1e4] p-2 rounded border border-[#4d4635] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#d4c78f] uppercase mb-1">
                  Image Asset URL
                </label>
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    value={activeBlock.imageUrl || ''}
                    onChange={(e) => updatePageBlock(activePage.id, activeBlock.id, { imageUrl: e.target.value })}
                    className="flex-1 bg-[#201f22] text-[#e5e1e4] p-2 rounded border border-[#4d4635] focus:outline-none text-[11px]"
                  />
                  <button
                    onClick={() => {
                      setEditingImageTargetBlockId(activeBlock.id);
                      setShowMediaPicker(true);
                    }}
                    className="px-2.5 py-1 rounded bg-[#2a2a2c] hover:bg-[#353437] text-[#f2ca50] border border-[#4d4635] font-bold text-[11px]"
                  >
                    Browse
                  </button>
                </div>
              </div>

              <div className="pt-2 border-t border-[#353437] flex items-center justify-between">
                <span className="text-[#d0c5af]">Block Visibility</span>
                <button
                  onClick={() => updatePageBlock(activePage.id, activeBlock.id, { isVisible: !activeBlock.isVisible })}
                  className={`px-3 py-1 rounded text-xs font-bold ${activeBlock.isVisible ? 'bg-emerald-950 text-emerald-400 border border-emerald-700' : 'bg-zinc-800 text-zinc-400'}`}
                >
                  {activeBlock.isVisible ? 'Visible' : 'Hidden'}
                </button>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => deletePageBlock(activePage.id, activeBlock.id)}
                  className="w-full py-2 rounded bg-red-950/60 hover:bg-red-900 border border-red-800 text-red-200 text-xs font-bold transition-all"
                >
                  Delete Block from Page
                </button>
              </div>
            </div>
          ) : (
            <p className="text-xs text-[#99907c]">Click a block on the left tree or canvas to inspect its parameters.</p>
          )}
        </div>
      </div>

      {/* Media Library Picker Modal */}
      {showMediaPicker && (
        <div className="fixed inset-0 z-50 bg-[#0e0e10]/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-[#201f22] border border-[#4d4635] rounded-xl p-5 shadow-2xl flex flex-col gap-3 max-h-[80vh]">
            <div className="flex items-center justify-between border-b border-[#353437] pb-2">
              <h3 className="font-serif-luxury text-base font-bold text-[#f2ca50]">
                Select Image from Royal Media Library
              </h3>
              <button 
                onClick={() => setShowMediaPicker(false)}
                className="w-7 h-7 rounded-full bg-[#2a2a2c] flex items-center justify-center text-white"
              >
                &times;
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2.5 overflow-y-auto p-1">
              {mediaAssets.filter(m => m.type === 'image').map(asset => (
                <div
                  key={asset.id}
                  onClick={() => handlePickMediaForBlock(asset.url)}
                  className="group relative rounded-lg overflow-hidden border border-[#4d4635] aspect-video cursor-pointer hover:border-[#f2ca50]"
                >
                  <img src={asset.url} alt={asset.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-xs font-bold text-[#f2ca50]">
                    Select Asset
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
