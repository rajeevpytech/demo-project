import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';

export const SettingsManager: React.FC = () => {
  const { settings, updateSettings, resetAllData, showToast } = useCms();

  const [brandName, setBrandName] = useState(settings.brandName);
  const [tagline, setTagline] = useState(settings.tagline);
  const [logoUrl, setLogoUrl] = useState(settings.logoUrl);
  const [primaryColor, setPrimaryColor] = useState(settings.primaryColor);
  const [phone, setPhone] = useState(settings.phone);
  const [whatsAppPhone, setWhatsAppPhone] = useState(settings.whatsAppPhone);
  const [conciergeEmail, setConciergeEmail] = useState(settings.conciergeEmail);
  const [address, setAddress] = useState(settings.address);
  const [directorName, setDirectorName] = useState(settings.directorName);
  const [directorPhone, setDirectorPhone] = useState(settings.directorPhone);
  const [tenantId, setTenantId] = useState(settings.tenantId || 'royal-band-prod-01');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      brandName,
      tagline,
      logoUrl,
      primaryColor,
      phone,
      whatsAppPhone,
      conciergeEmail,
      address,
      directorName,
      directorPhone,
      tenantId
    });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-5 rounded-xl bg-[#1c1b1e] border border-[#4d4635]/40">
        <div>
          <h2 className="font-serif-luxury text-xl font-bold text-[#f2ca50]">
            Website Settings &amp; White-Label Profile
          </h2>
          <p className="text-xs text-[#d0c5af] mt-0.5">
            Configure global branding, gold theme accents, direct contact numbers, and multi-tenant profiles.
          </p>
        </div>

        <button
          onClick={resetAllData}
          className="px-3 py-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-800 text-xs font-semibold cursor-pointer"
        >
          Reset All to Production Defaults
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-5 rounded-xl bg-[#1c1b1e] border border-[#4d4635]/40 space-y-4 text-xs">
        {/* Brand & Palette */}
        <div className="space-y-3 pb-3 border-b border-[#353437]">
          <h3 className="text-xs font-bold text-[#f2ca50] uppercase tracking-wider">
            Brand Identity &amp; Aesthetic
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[#d4c78f] font-semibold mb-1">Company / Brand Name</label>
              <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="w-full bg-[#141418] p-2.5 rounded border border-[#4d4635] text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[#d4c78f] font-semibold mb-1">Primary Metallic Color</label>
              <div className="flex gap-2 items-center">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-10 h-10 rounded border border-[#4d4635] cursor-pointer bg-transparent"
                />
                <input
                  type="text"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="flex-1 bg-[#141418] p-2 rounded border border-[#4d4635] text-white font-mono"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[#d4c78f] font-semibold mb-1">Brand Tagline</label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full bg-[#141418] p-2.5 rounded border border-[#4d4635] text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[#d4c78f] font-semibold mb-1">Emblem / Logo URL</label>
            <input
              type="text"
              value={logoUrl}
              onChange={(e) => setLogoUrl(e.target.value)}
              className="w-full bg-[#141418] p-2.5 rounded border border-[#4d4635] text-white focus:outline-none text-[11px] font-mono"
            />
          </div>
        </div>

        {/* Contact Numbers */}
        <div className="space-y-3 pb-3 border-b border-[#353437]">
          <h3 className="text-xs font-bold text-[#f2ca50] uppercase tracking-wider">
            Direct Concierge Contacts
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[#d4c78f] font-semibold mb-1">General Inquiries Hotline</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#141418] p-2.5 rounded border border-[#4d4635] text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[#d4c78f] font-semibold mb-1">VIP WhatsApp Number</label>
              <input
                type="text"
                value={whatsAppPhone}
                onChange={(e) => setWhatsAppPhone(e.target.value)}
                className="w-full bg-[#141418] p-2.5 rounded border border-[#4d4635] text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[#d4c78f] font-semibold mb-1">Director Name</label>
              <input
                type="text"
                value={directorName}
                onChange={(e) => setDirectorName(e.target.value)}
                className="w-full bg-[#141418] p-2.5 rounded border border-[#4d4635] text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[#d4c78f] font-semibold mb-1">Director Priority Phone</label>
              <input
                type="text"
                value={directorPhone}
                onChange={(e) => setDirectorPhone(e.target.value)}
                className="w-full bg-[#141418] p-2.5 rounded border border-[#4d4635] text-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#d4c78f] font-semibold mb-1">Private Email</label>
            <input
              type="email"
              value={conciergeEmail}
              onChange={(e) => setConciergeEmail(e.target.value)}
              className="w-full bg-[#141418] p-2.5 rounded border border-[#4d4635] text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[#d4c78f] font-semibold mb-1">Headquarters &amp; Liaison Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full bg-[#141418] p-2.5 rounded border border-[#4d4635] text-white focus:outline-none"
            />
          </div>
        </div>

        {/* Section 11: White-Label / Multi-Tenant Configuration */}
        <div className="space-y-3 pb-3">
          <h3 className="text-xs font-bold text-[#f2ca50] uppercase tracking-wider">
            Section 11: White-Label &amp; Tenant Profile
          </h3>
          <p className="text-[11px] text-[#d0c5af]">
            Enables reusing this CMS engine for another authorized event entertainment business with isolated branding, tenant ID, and custom domain mapping.
          </p>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[#d4c78f] font-semibold mb-1">Tenant ID</label>
              <input
                type="text"
                value={tenantId}
                onChange={(e) => setTenantId(e.target.value)}
                className="w-full bg-[#141418] p-2 rounded border border-[#4d4635] text-white font-mono"
              />
            </div>
            <div>
              <label className="block text-[#d4c78f] font-semibold mb-1">Schema Business Entity</label>
              <input
                type="text"
                readOnly
                value="EntertainmentBusiness / MusicGroup"
                className="w-full bg-[#141418] p-2 rounded border border-[#4d4635] text-[#99907c]"
              />
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-[#353437] flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-lg bg-[#d4af37] text-[#131315] font-bold text-xs shadow-md hover:brightness-105 active:scale-95 transition-all cursor-pointer"
          >
            Save All Changes
          </button>
        </div>
      </form>
    </div>
  );
};
