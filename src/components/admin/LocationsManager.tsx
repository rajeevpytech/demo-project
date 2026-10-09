import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { CityHub } from '../../types';

export const LocationsManager: React.FC = () => {
  const { cityHubs, addCityHub, updateCityHub, deleteCityHub, setSelectedCityForModal, showToast } = useCms();
  const [isCreating, setIsCreating] = useState(false);
  const [editingHubId, setEditingHubId] = useState<string | null>(null);

  // Form state
  const [name, setName] = useState('');
  const [stateName, setStateName] = useState('Rajasthan');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [residentTroupes, setResidentTroupes] = useState('2 Resident Troupes');
  const [readinessTime, setReadinessTime] = useState('Dispatched in 2h');
  const [specialty, setSpecialty] = useState('Heritage Palace Fanfare');
  const [acousticCertification, setAcousticCertification] = useState('Line-Array Stage Certified');
  const [keyVenuesStr, setKeyVenuesStr] = useState('Palace Lawns, Heritage Courtyards');

  const openCreateModal = () => {
    setName('');
    setStateName('Rajasthan');
    setTagline('Palatial Celebrations & Royal Destination Galas');
    setDescription('Providing stationed live symphony brass, acoustic folk maestros, and calibrated sound rigs for luxury palace events.');
    setResidentTroupes('3 Resident Troupes');
    setReadinessTime('Dispatched in 2h');
    setSpecialty('Palace Courtyard Fanfare & Sufi Crescendo');
    setAcousticCertification('Meyer Sound Station Certified');
    setKeyVenuesStr('The Leela Palace, Taj Lake Palace, Heritage Forts');
    setIsCreating(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newHub: CityHub = {
      id: editingHubId || `city-${Date.now()}`,
      name,
      state: stateName,
      tagline,
      description,
      residentTroupes,
      readinessTime,
      specialty,
      acousticCertification,
      isStationed: true,
      keyVenues: keyVenuesStr.split(',').map(s => s.trim()).filter(Boolean),
      seo: {
        metaTitle: `The Royal Band ${name} | Luxury Palace & Wedding Orchestra`,
        metaDescription: description.slice(0, 155),
        slug,
        canonicalUrl: `https://theroyalband.com/locations/${slug}`,
        ogTitle: `The Royal Band ${name} Hub`,
        ogDescription: tagline,
        ogImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjO6Sg-XnJ9_Udl1_IoTc366O4hALJGPK3m2ucFI6lIdy0hyeRSn6u3rm1NvSnp20xQZ9tZPaWDXQcaxN9UeJqjgXe0p1Of4HcG2Uvyz0OO5ZZBOej_bY2dOQKXZtYJNk0Wv_ELmC__loOJ1SB85TTQX0LS8AGsH2N8shOIf8jp9L4kUsbls0SJKUpCNKXSML_eUtNqJ4cX-Yu0BB8tsO_csQDAbG9R6PtWnzkocBGtqcAK-Lj4JjboQ',
        twitterCard: 'summary_large_image',
        isNoIndex: false,
        isNoFollow: false,
        schemaType: 'LocalBusiness'
      }
    };

    if (editingHubId) {
      updateCityHub(editingHubId, newHub);
    } else {
      addCityHub(newHub);
    }

    setIsCreating(false);
    setEditingHubId(null);
  };

  return (
    <div className="space-y-5 max-w-6xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-5 rounded-xl bg-[#1c1b1e] border border-[#4d4635]/40">
        <div>
          <h2 className="font-serif-luxury text-xl font-bold text-[#f2ca50]">
            City Landing Pages &amp; Regional Hubs
          </h2>
          <p className="text-xs text-[#d0c5af] mt-0.5">
            Admin can dynamically launch new city landing pages (e.g. Udaipur, Dubai, Goa) with dedicated LocalBusiness schema.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-3.5 py-2 rounded-lg bg-[#d4af37] text-[#131315] font-bold text-xs flex items-center gap-1.5 shadow-md hover:brightness-105 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">add_location_alt</span>
          <span>Add New City Hub</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cityHubs.map((hub) => (
          <div 
            key={hub.id}
            className="rounded-xl bg-[#1c1b1e] border border-[#4d4635]/40 p-5 shadow-sm flex flex-col justify-between gap-3"
          >
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#f2ca50] text-[20px]">location_on</span>
                    <h3 className="font-serif-luxury text-lg font-bold text-[#e5e1e4]">
                      {hub.name} Hub
                    </h3>
                  </div>
                  <span className="text-[11px] font-bold text-[#d4c78f] uppercase tracking-wider">
                    {hub.state} &bull; {hub.tagline}
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#4f471b] text-[#f1e3a9] text-[10px] font-bold uppercase">
                  {hub.isStationed ? 'Stationed' : 'On Request'}
                </span>
              </div>

              <p className="text-xs text-[#d0c5af] mt-2 leading-relaxed">
                {hub.description}
              </p>

              <div className="mt-3 p-2.5 rounded bg-[#201f22] border border-[#4d4635]/30 grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-[#99907c] block">Fleet:</span>
                  <span className="text-white font-medium">{hub.residentTroupes}</span>
                </div>
                <div>
                  <span className="text-[#99907c] block">Readiness:</span>
                  <span className="text-[#f2ca50] font-medium">{hub.readinessTime}</span>
                </div>
              </div>

              <div className="mt-2 text-[11px]">
                <span className="text-[#99907c]">Key Venues: </span>
                <span className="text-[#d0c5af]">{hub.keyVenues.slice(0, 3).join(', ')}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#353437] flex items-center justify-between text-xs">
              <button
                onClick={() => setSelectedCityForModal(hub)}
                className="text-[#f2ca50] hover:underline font-bold flex items-center gap-1 cursor-pointer"
              >
                <span>Preview Landing Page</span>
                <span className="material-symbols-outlined text-[14px]">open_in_new</span>
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => deleteCityHub(hub.id)}
                  className="px-2 py-1 rounded bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-800 text-[11px] cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit City Modal */}
      {isCreating && (
        <div className="fixed inset-0 z-50 bg-[#0e0e10]/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[#201f22] border border-[#4d4635] rounded-xl p-5 shadow-2xl flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-[#353437] pb-2">
              <h3 className="font-serif-luxury text-base font-bold text-[#f2ca50]">
                {editingHubId ? 'Edit City Hub' : 'Add New City Landing Page'}
              </h3>
              <button onClick={() => setIsCreating(false)} className="text-white text-lg">&times;</button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[#d4c78f] font-bold uppercase mb-1">City Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Udaipur"
                    className="w-full bg-[#141418] p-2 rounded border border-[#4d4635] text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#d4c78f] font-bold uppercase mb-1">State / Territory</label>
                  <input
                    type="text"
                    required
                    value={stateName}
                    onChange={(e) => setStateName(e.target.value)}
                    className="w-full bg-[#141418] p-2 rounded border border-[#4d4635] text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#d4c78f] font-bold uppercase mb-1">Tagline</label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="e.g. City of Lakes & Palaces"
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

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[#d4c78f] font-bold uppercase mb-1">Resident Fleet</label>
                  <input
                    type="text"
                    value={residentTroupes}
                    onChange={(e) => setResidentTroupes(e.target.value)}
                    className="w-full bg-[#141418] p-2 rounded border border-[#4d4635] text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#d4c78f] font-bold uppercase mb-1">Dispatch Readiness</label>
                  <input
                    type="text"
                    value={readinessTime}
                    onChange={(e) => setReadinessTime(e.target.value)}
                    className="w-full bg-[#141418] p-2 rounded border border-[#4d4635] text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#d4c78f] font-bold uppercase mb-1">Musical Specialty</label>
                <input
                  type="text"
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  className="w-full bg-[#141418] p-2 rounded border border-[#4d4635] text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#d4c78f] font-bold uppercase mb-1">Key Local Venues (Comma-Separated)</label>
                <input
                  type="text"
                  value={keyVenuesStr}
                  onChange={(e) => setKeyVenuesStr(e.target.value)}
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
                  Save City Hub
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
