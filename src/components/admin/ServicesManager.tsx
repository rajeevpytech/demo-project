import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { ServiceItem } from '../../types';

export const ServicesManager: React.FC = () => {
  const { services, addService, updateService, deleteService, showToast } = useCms();
  const [isCreating, setIsCreating] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);

  // Form state
  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [badge, setBadge] = useState('');
  const [tagsStr, setTagsStr] = useState('');
  const [featuresStr, setFeaturesStr] = useState('');
  const [duration, setDuration] = useState('2 Hours');
  const [category, setCategory] = useState<ServiceItem['category']>('wedding');

  const openCreateModal = () => {
    setName('');
    setTagline('');
    setDescription('');
    setImageUrl('https://lh3.googleusercontent.com/aida-public/AB6AXuCjO6Sg-XnJ9_Udl1_IoTc366O4hALJGPK3m2ucFI6lIdy0hyeRSn6u3rm1NvSnp20xQZ9tZPaWDXQcaxN9UeJqjgXe0p1Of4HcG2Uvyz0OO5ZZBOej_bY2dOQKXZtYJNk0Wv_ELmC__loOJ1SB85TTQX0LS8AGsH2N8shOIf8jp9L4kUsbls0SJKUpCNKXSML_eUtNqJ4cX-Yu0BB8tsO_csQDAbG9R6PtWnzkocBGtqcAK-Lj4JjboQ');
    setBadge('Curated 2026');
    setTagsStr('Live Brass, Royal Fanfare, Palace Lawn');
    setFeaturesStr('Wireless Stage IEMs, Master Overture Composition, Embroidered Sherwanis');
    setIsCreating(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newService: ServiceItem = {
      id: editingServiceId || `srv-${Date.now()}`,
      name,
      tagline,
      description,
      imageUrl,
      badge,
      tags: tagsStr.split(',').map(s => s.trim()).filter(Boolean),
      features: featuresStr.split(',').map(s => s.trim()).filter(Boolean),
      duration,
      category,
      isPublished: true,
      seo: {
        metaTitle: `${name} | The Royal Band`,
        metaDescription: description.slice(0, 155),
        slug,
        canonicalUrl: `https://theroyalband.com/services/${slug}`,
        ogTitle: name,
        ogDescription: description.slice(0, 155),
        ogImageUrl: imageUrl,
        twitterCard: 'summary_large_image',
        isNoIndex: false,
        isNoFollow: false,
        schemaType: 'Service'
      }
    };

    if (editingServiceId) {
      updateService(editingServiceId, newService);
    } else {
      addService(newService);
    }

    setIsCreating(false);
    setEditingServiceId(null);
  };

  return (
    <div className="space-y-5 max-w-6xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-5 rounded-xl bg-[#1c1b1e] border border-[#4d4635]/40">
        <div>
          <h2 className="font-serif-luxury text-xl font-bold text-[#f2ca50]">
            Services &amp; Occasions Catalog
          </h2>
          <p className="text-xs text-[#d0c5af] mt-0.5">
            Add or edit performance curation types, add-ons, pricing estimates, and technical riders.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-3.5 py-2 rounded-lg bg-[#d4af37] text-[#131315] font-bold text-xs flex items-center gap-1.5 shadow-md hover:brightness-105"
        >
          <span className="material-symbols-outlined text-[16px]">add_circle</span>
          <span>Add New Service</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((svc) => (
          <div 
            key={svc.id}
            className="rounded-xl bg-[#1c1b1e] border border-[#4d4635]/40 overflow-hidden shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="relative h-40 bg-[#0e0e10]">
                <img src={svc.imageUrl} alt={svc.name} className="w-full h-full object-cover" />
                {svc.badge && (
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#0e0e10]/80 text-[10px] font-bold text-[#f2ca50] border border-[#4d4635]">
                    {svc.badge}
                  </span>
                )}
                <span className={`absolute top-2 right-2 px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                  svc.isPublished ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-zinc-800 text-zinc-400'
                }`}>
                  {svc.isPublished ? 'Published' : 'Draft'}
                </span>
              </div>

              <div className="p-4 space-y-2">
                <h3 className="font-serif-luxury text-base font-bold text-[#e5e1e4] leading-tight">
                  {svc.name}
                </h3>
                <p className="text-[11px] text-[#d0c5af] line-clamp-2">
                  {svc.description}
                </p>
                <div className="flex flex-wrap gap-1 pt-1">
                  {svc.tags.map((t, i) => (
                    <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-[#2a2a2c] text-[#f1e3a9]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-3 border-t border-[#353437] flex items-center justify-between text-xs">
              <span className="text-[11px] text-[#99907c]">{svc.duration}</span>
              <div className="flex gap-1.5">
                <button
                  onClick={() => {
                    updateService(svc.id, { isPublished: !svc.isPublished });
                  }}
                  className="px-2 py-1 rounded bg-[#201f22] text-[#d4c78f] border border-[#4d4635] text-[11px] hover:text-white"
                >
                  {svc.isPublished ? 'Unpublish' : 'Publish'}
                </button>
                <button
                  onClick={() => deleteService(svc.id)}
                  className="px-2 py-1 rounded bg-red-950/50 hover:bg-red-900 text-red-300 border border-red-800 text-[11px]"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create / Edit Modal */}
      {isCreating && (
        <div className="fixed inset-0 z-50 bg-[#0e0e10]/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[#201f22] border border-[#4d4635] rounded-xl p-5 shadow-2xl flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-[#353437] pb-2">
              <h3 className="font-serif-luxury text-base font-bold text-[#f2ca50]">
                {editingServiceId ? 'Edit Service' : 'Add New Service & SEO'}
              </h3>
              <button onClick={() => setIsCreating(false)} className="text-white text-lg">&times;</button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block text-[#d4c78f] font-bold uppercase mb-1">Service Title</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sangeet Grand Crescendo Orchestra"
                  className="w-full bg-[#141418] p-2 rounded border border-[#4d4635] text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#d4c78f] font-bold uppercase mb-1">Short Tagline</label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="e.g. High-Voltage Bollywood & Sufi Fusion"
                  className="w-full bg-[#141418] p-2 rounded border border-[#4d4635] text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#d4c78f] font-bold uppercase mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-[#141418] p-2 rounded border border-[#4d4635] text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#d4c78f] font-bold uppercase mb-1">Image URL</label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full bg-[#141418] p-2 rounded border border-[#4d4635] text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[#d4c78f] font-bold uppercase mb-1">Badge</label>
                  <input
                    type="text"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    className="w-full bg-[#141418] p-2 rounded border border-[#4d4635] text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#d4c78f] font-bold uppercase mb-1">Duration</label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full bg-[#141418] p-2 rounded border border-[#4d4635] text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#d4c78f] font-bold uppercase mb-1">Tags (Comma-Separated)</label>
                <input
                  type="text"
                  value={tagsStr}
                  onChange={(e) => setTagsStr(e.target.value)}
                  className="w-full bg-[#141418] p-2 rounded border border-[#4d4635] text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#d4c78f] font-bold uppercase mb-1">Features (Comma-Separated)</label>
                <textarea
                  rows={2}
                  value={featuresStr}
                  onChange={(e) => setFeaturesStr(e.target.value)}
                  className="w-full bg-[#141418] p-2 rounded border border-[#4d4635] text-white focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2 rounded bg-[#2a2a2c] text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded bg-[#d4af37] text-[#131315] font-bold"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
