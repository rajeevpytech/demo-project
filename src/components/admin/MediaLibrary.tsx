import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { MediaAsset } from '../../types';

export const MediaLibrary: React.FC = () => {
  const { mediaAssets, addMediaAsset, deleteMediaAsset, showToast } = useCms();
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'image' | 'video' | 'audio'>('all');
  const [selectedAsset, setSelectedAsset] = useState<MediaAsset | null>(null);

  // Upload modal state
  const [isUploading, setIsUploading] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newAltText, setNewAltText] = useState('');
  const [newType, setNewType] = useState<'image' | 'video' | 'audio'>('image');

  const filtered = mediaAssets.filter(m => {
    const matchesType = typeFilter === 'all' || m.type === typeFilter;
    const matchesSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase()) || m.altText.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl || !newTitle) return;

    const newAsset: MediaAsset = {
      id: `med-${Date.now()}`,
      title: newTitle,
      url: newUrl,
      type: newType,
      altText: newAltText || newTitle,
      fileSize: "1.2 MB",
      uploadedAt: new Date().toISOString().split('T')[0]
    };

    addMediaAsset(newAsset);
    setIsUploading(false);
    setNewTitle('');
    setNewUrl('');
    setNewAltText('');
  };

  return (
    <div className="space-y-5 max-w-6xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-5 rounded-xl bg-[#1c1b1e] border border-[#4d4635]/40">
        <div>
          <h2 className="font-serif-luxury text-xl font-bold text-[#f2ca50]">
            Media Asset Library
          </h2>
          <p className="text-xs text-[#d0c5af] mt-0.5">
            Manage high-resolution photography, 4K showreels, audio masters, and SEO-mandatory ALT tags.
          </p>
        </div>

        <button
          onClick={() => setIsUploading(true)}
          className="px-3.5 py-2 rounded-lg bg-[#d4af37] text-[#131315] font-bold text-xs flex items-center gap-1.5 shadow-md hover:brightness-105 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">upload_file</span>
          <span>Upload Media Asset</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5">
          {(['all', 'image', 'video', 'audio'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-3 py-1 rounded-full text-xs font-semibold capitalize transition-colors ${
                typeFilter === t ? 'bg-[#f2ca50] text-[#3c2f00] font-bold' : 'bg-[#201f22] text-[#d0c5af] hover:bg-[#2a2a2c] border border-[#4d4635]/40'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Search by title or ALT text..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-64 bg-[#0e0e10] text-xs text-[#e5e1e4] px-3 py-1.5 rounded-lg border border-[#4d4635] focus:outline-none"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filtered.map(asset => (
          <div
            key={asset.id}
            onClick={() => setSelectedAsset(asset)}
            className="group rounded-xl bg-[#1c1b1e] border border-[#4d4635]/40 overflow-hidden cursor-pointer hover:border-[#f2ca50] transition-colors flex flex-col justify-between"
          >
            <div className="relative aspect-video bg-[#0e0e10]">
              {asset.type === 'image' || asset.type === 'video' ? (
                <img src={asset.url} alt={asset.altText} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#f2ca50]">
                  <span className="material-symbols-outlined text-[36px]">audiotrack</span>
                </div>
              )}
              <span className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded bg-[#0e0e10]/80 text-[9px] font-bold uppercase text-[#f1e3a9]">
                {asset.type}
              </span>
            </div>

            <div className="p-2.5">
              <h4 className="text-xs font-semibold text-[#e5e1e4] truncate">{asset.title}</h4>
              <p className="text-[10px] text-[#99907c] truncate mt-0.5">ALT: {asset.altText}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Asset Inspector Modal */}
      {selectedAsset && (
        <div className="fixed inset-0 z-50 bg-[#0e0e10]/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#201f22] border border-[#4d4635] rounded-xl p-5 shadow-2xl flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-[#353437] pb-2">
              <h3 className="font-serif-luxury text-base font-bold text-[#f2ca50]">
                Media Details: {selectedAsset.title}
              </h3>
              <button onClick={() => setSelectedAsset(null)} className="text-white text-lg">&times;</button>
            </div>

            <div className="h-48 rounded-lg overflow-hidden bg-[#0e0e10] border border-[#4d4635]">
              <img src={selectedAsset.url} alt={selectedAsset.altText} className="w-full h-full object-contain" />
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <span className="text-[10px] text-[#99907c] uppercase block">Asset URL</span>
                <input
                  type="text"
                  readOnly
                  value={selectedAsset.url}
                  className="w-full bg-[#141418] p-1.5 rounded text-[11px] font-mono text-[#d4c78f]"
                />
              </div>

              <div>
                <span className="text-[10px] text-[#99907c] uppercase block">SEO ALT Text (Accessibility)</span>
                <p className="text-[#e5e1e4] p-2 rounded bg-[#141418] border border-[#4d4635]/40">{selectedAsset.altText}</p>
              </div>

              <div className="flex justify-between text-[11px] text-[#99907c] pt-2">
                <span>Size: {selectedAsset.fileSize}</span>
                <span>Uploaded: {selectedAsset.uploadedAt}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-between">
              <button
                onClick={() => {
                  deleteMediaAsset(selectedAsset.id);
                  setSelectedAsset(null);
                }}
                className="px-3 py-1.5 rounded bg-red-950 text-red-300 border border-red-800 text-xs font-semibold"
              >
                Delete Asset
              </button>

              <button
                onClick={() => {
                  navigator.clipboard?.writeText(selectedAsset.url);
                  showToast("Asset URL copied to clipboard!");
                }}
                className="px-4 py-1.5 rounded bg-[#f2ca50] text-[#3c2f00] font-bold text-xs"
              >
                Copy URL
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {isUploading && (
        <div className="fixed inset-0 z-50 bg-[#0e0e10]/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#201f22] border border-[#4d4635] rounded-xl p-5 shadow-2xl flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-[#353437] pb-2">
              <h3 className="font-serif-luxury text-base font-bold text-[#f2ca50]">
                Add Asset to Media Library
              </h3>
              <button onClick={() => setIsUploading(false)} className="text-white text-lg">&times;</button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-[#d4c78f] font-bold uppercase mb-1">Asset Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Palace Sangeet Grand Stage 2026"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-[#141418] p-2 rounded border border-[#4d4635] text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#d4c78f] font-bold uppercase mb-1">Media URL or CDN Link</label>
                <input
                  type="text"
                  required
                  placeholder="https://..."
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  className="w-full bg-[#141418] p-2 rounded border border-[#4d4635] text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#d4c78f] font-bold uppercase mb-1">Descriptive ALT Text (SEO)</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Detailed description of the image content for crawlability and screen readers"
                  value={newAltText}
                  onChange={(e) => setNewAltText(e.target.value)}
                  className="w-full bg-[#141418] p-2 rounded border border-[#4d4635] text-white focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsUploading(false)}
                  className="px-4 py-2 rounded bg-[#2a2a2c] text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded bg-[#d4af37] text-[#131315] font-bold"
                >
                  Add to Library
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
