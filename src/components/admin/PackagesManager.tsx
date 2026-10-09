import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { PackageTier } from '../../types';

export const PackagesManager: React.FC = () => {
  const { packages, updatePackage, addPackage, deletePackage, showToast } = useCms();
  const [isEditing, setIsEditing] = useState<PackageTier | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEditing) return;

    const exists = packages.some(p => p.id === isEditing.id);
    if (exists) {
      updatePackage(isEditing.id, isEditing);
    } else {
      addPackage(isEditing);
    }
    setIsEditing(null);
  };

  const togglePackageEnable = (pkg: PackageTier) => {
    const isNowEnabled = pkg.isEnabled === false;
    updatePackage(pkg.id, { isEnabled: isNowEnabled });
    showToast(`Package '${pkg.name}' is now ${isNowEnabled ? 'Active on website' : 'Hidden from website'}.`);
  };

  return (
    <div className="space-y-5 max-w-6xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-5 rounded-xl bg-[#1c1b1e] border border-[#4d4635]/40">
        <div>
          <h2 className="font-serif-luxury text-xl font-bold text-[#f2ca50]">
            Performance Package Tiers &amp; Combos
          </h2>
          <p className="text-xs text-[#d0c5af] mt-0.5">
            Configure hourly sets (1-Hour, 2-Hour, Full-Evening) and configure/remove optional combo packages (Live Band + DJ Setup).
          </p>
        </div>

        <button
          onClick={() => {
            setIsEditing({
              id: `pkg-${Date.now()}`,
              name: 'New Custom Tier',
              subtitle: 'Tailored Musician Ensemble',
              tierLabel: `Tier ${packages.length + 1}`,
              durationLabel: '90 Min',
              description: 'Custom curated instrumentation tailored for private royal banquets.',
              idealFor: 'Celebrations & Dinners',
              inclusions: ['Master Soloists', 'Dedicated Audio Monitor Rig'],
              highlightBadge: 'Special Curation',
              category: 'hourly',
              isEnabled: true
            });
          }}
          className="px-3.5 py-2 rounded-lg bg-[#d4af37] text-[#131315] font-bold text-xs flex items-center gap-1.5 shadow-md hover:brightness-105 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">add_circle</span>
          <span>Add Custom Tier</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {packages.map((pkg) => {
          const isLiveBandDj = pkg.name.toLowerCase().includes('dj') || pkg.isOptionalCombo;
          const isEnabled = pkg.isEnabled !== false;

          return (
            <div 
              key={pkg.id}
              className={`rounded-2xl p-5 border flex flex-col justify-between gap-3 relative transition-all ${
                !isEnabled 
                  ? 'opacity-60 bg-[#141418] border-dashed border-[#4d4635]'
                  : pkg.isRecommended 
                    ? 'bg-[#2a2a2c] border-[#f2ca50] shadow-md' 
                    : 'bg-[#1c1b1e] border-[#4d4635]/40'
              }`}
            >
              {/* Badges */}
              <div className="flex items-center justify-between gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold bg-[#141418] text-[#d4c78f] border border-[#353437]">
                  {pkg.tierLabel} &bull; {pkg.category || 'Standard'}
                </span>
                {pkg.highlightBadge && (
                  <span className="px-2 py-0.5 rounded-full bg-[#f2ca50] text-[#3c2f00] text-[9px] font-extrabold uppercase">
                    {pkg.highlightBadge}
                  </span>
                )}
              </div>

              <div>
                <div className="flex items-start justify-between mt-1">
                  <h3 className="font-serif-luxury text-lg font-bold text-[#e5e1e4] leading-tight">
                    {pkg.name}
                  </h3>
                  <span className="text-xs font-bold text-[#f2ca50] font-mono">{pkg.durationLabel}</span>
                </div>

                <p className="text-xs text-[#d0c5af] mt-1.5 leading-relaxed">{pkg.description}</p>

                {isLiveBandDj && (
                  <div className="mt-2.5 p-2 rounded-lg bg-[#4f471b]/30 border border-[#f2ca50]/40 text-[11px] text-[#f1e3a9] flex items-center justify-between">
                    <span>Client Optional Package: Band + DJ</span>
                    <button
                      type="button"
                      onClick={() => togglePackageEnable(pkg)}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer uppercase ${
                        isEnabled ? 'bg-[#25d366]/20 text-[#25d366] border border-[#25d366]/40' : 'bg-red-950/40 text-red-300 border border-red-500/40'
                      }`}
                    >
                      {isEnabled ? 'Active in UI' : 'Disabled (Hidden)'}
                    </button>
                  </div>
                )}

                <div className="mt-3 space-y-1.5 p-3 rounded-lg bg-[#141418] border border-[#4d4635]/30">
                  <span className="text-[10px] uppercase font-bold text-[#99907c] block mb-1">Inclusions:</span>
                  {pkg.inclusions.map((inc, i) => (
                    <div key={i} className="text-[11px] text-[#e5e1e4] flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[#f2ca50] text-[14px]">check</span>
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-[#353437] flex items-center justify-between">
                <button
                  onClick={() => setIsEditing(pkg)}
                  className="text-xs text-[#f2ca50] hover:underline font-bold cursor-pointer"
                >
                  Edit Parameters
                </button>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => togglePackageEnable(pkg)}
                    className="text-xs text-[#d0c5af] hover:text-white cursor-pointer"
                  >
                    {isEnabled ? 'Hide' : 'Show'}
                  </button>
                  <button
                    onClick={() => deletePackage(pkg.id)}
                    className="text-xs text-red-400 hover:text-red-300 cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-[#0e0e10]/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-lg bg-[#201f22] border border-[#4d4635] rounded-2xl p-6 shadow-2xl flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-[#353437] pb-3">
              <h3 className="font-serif-luxury text-base font-bold text-[#f2ca50]">
                Configure Package: {isEditing.name}
              </h3>
              <button onClick={() => setIsEditing(null)} className="text-white text-lg">&times;</button>
            </div>

            <form onSubmit={handleSave} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#d4c78f] font-bold uppercase mb-1">Package Name</label>
                  <input
                    type="text"
                    required
                    value={isEditing.name}
                    onChange={(e) => setIsEditing({ ...isEditing, name: e.target.value })}
                    className="w-full bg-[#141418] p-2.5 rounded-lg border border-[#4d4635] text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#d4c78f] font-bold uppercase mb-1">Duration Label</label>
                  <input
                    type="text"
                    required
                    value={isEditing.durationLabel}
                    onChange={(e) => setIsEditing({ ...isEditing, durationLabel: e.target.value })}
                    className="w-full bg-[#141418] p-2.5 rounded-lg border border-[#4d4635] text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#d4c78f] font-bold uppercase mb-1">Category Type</label>
                  <select
                    value={isEditing.category || 'hourly'}
                    onChange={(e) => setIsEditing({ ...isEditing, category: e.target.value as any })}
                    className="w-full bg-[#141418] p-2.5 rounded-lg border border-[#4d4635] text-white focus:outline-none cursor-pointer"
                  >
                    <option value="hourly">Hourly / Set-Based</option>
                    <option value="combo">Combo Package (Band + DJ)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#d4c78f] font-bold uppercase mb-1">Public Availability</label>
                  <select
                    value={isEditing.isEnabled !== false ? 'true' : 'false'}
                    onChange={(e) => setIsEditing({ ...isEditing, isEnabled: e.target.value === 'true' })}
                    className="w-full bg-[#141418] p-2.5 rounded-lg border border-[#4d4635] text-white focus:outline-none cursor-pointer"
                  >
                    <option value="true">Active (Visible on Website)</option>
                    <option value="false">Hidden (Admin Only)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#d4c78f] font-bold uppercase mb-1">Subtitle / Sub-spec</label>
                <input
                  type="text"
                  value={isEditing.subtitle}
                  onChange={(e) => setIsEditing({ ...isEditing, subtitle: e.target.value })}
                  className="w-full bg-[#141418] p-2.5 rounded-lg border border-[#4d4635] text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#d4c78f] font-bold uppercase mb-1">Description</label>
                <textarea
                  rows={2}
                  value={isEditing.description}
                  onChange={(e) => setIsEditing({ ...isEditing, description: e.target.value })}
                  className="w-full bg-[#141418] p-2.5 rounded-lg border border-[#4d4635] text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#d4c78f] font-bold uppercase mb-1">Highlight Badge (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Recommended, Most Popular, Band + DJ Combo"
                  value={isEditing.highlightBadge || ''}
                  onChange={(e) => setIsEditing({ ...isEditing, highlightBadge: e.target.value })}
                  className="w-full bg-[#141418] p-2.5 rounded-lg border border-[#4d4635] text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#d4c78f] font-bold uppercase mb-1">Inclusions (One per line)</label>
                <textarea
                  rows={3}
                  value={isEditing.inclusions.join('\n')}
                  onChange={(e) => setIsEditing({ ...isEditing, inclusions: e.target.value.split('\n').filter(Boolean) })}
                  className="w-full bg-[#141418] p-2.5 rounded-lg border border-[#4d4635] text-white focus:outline-none font-mono text-[11px]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(null)}
                  className="px-4 py-2 rounded-xl bg-[#2a2a2c] text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#d4af37] text-[#131315] font-bold cursor-pointer"
                >
                  Save Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
