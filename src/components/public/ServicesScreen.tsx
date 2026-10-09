import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { ServiceItem } from '../../types';

export const ServicesScreen: React.FC = () => {
  const { 
    services, 
    packages, 
    activeServiceSlug, 
    navigateTo, 
    settings, 
    submitLead, 
    showToast 
  } = useCms();

  // Enquiry Form inside Service screen
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [eventDate, setEventDate] = useState('2025-12-18');
  const [eventCity, setEventCity] = useState('Jaipur / Agra');
  const [guestCount, setGuestCount] = useState(350);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['Sound & Lighting Setup']);
  const [enquirySuccess, setEnquirySuccess] = useState(false);

  // Find currently active service if a slug is present
  const currentService: ServiceItem | undefined = services.find(
    s => s.seo?.slug === activeServiceSlug || s.id === activeServiceSlug
  );

  const addOnServices = [
    {
      id: 'addon-sound-light',
      title: 'Sound & Lighting Setup',
      icon: 'speaker',
      description: 'Concert-grade acoustic line-arrays, ambient golden stage wash, moving intelligent beams, and wireless in-ear monitoring tuned specifically for palace reverberation.'
    },
    {
      id: 'addon-mc-anchor',
      title: 'MC / Anchoring',
      icon: 'mic',
      description: 'Bilingual (Hindi & English) royal protocol hosts and charismatic wedding anchors to orchestrate ceremonial walks, first dances, and high-energy guest interaction.'
    },
    {
      id: 'addon-multi-city',
      title: 'Multi-City Performances',
      icon: 'flight_takeoff',
      description: 'Turnkey touring squad managing domestic and global flights, equipment logistics, and stationed backline coordination across Agra, Mathura, Lucknow, Jodhpur, and destination venues.'
    },
    {
      id: 'addon-song-requests',
      title: 'Custom Song Requests',
      icon: 'library_music',
      description: 'Custom orchestral arrangements composed exclusively for your bridal entrance, couple first dance, or family heritage anthems with live symphonic rehearsals.'
    }
  ];

  const toggleAddon = (title: string) => {
    setSelectedAddons(prev => 
      prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
    );
  };

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone) {
      showToast("Please provide your name and contact phone number.");
      return;
    }

    await submitLead({
      fullName: clientName,
      phone: clientPhone,
      email: clientEmail || 'client@estate.com',
      occasionType: currentService?.name || 'Live Band Performance',
      eventDate,
      timingSlot: 'Evening Gala (7 PM - 11 PM)',
      city: eventCity,
      ensemblePackage: 'Bespoke Curated Performance',
      curatedAddons: selectedAddons,
      guestCount,
      specialRequests: `Inquiry submitted via Service 1 / Event: ${currentService?.name || 'Overview'}`
    });

    setEnquirySuccess(true);
    showToast("Booking inquiry received! Our concierge team will reach out via phone & WhatsApp.");
  };

  // ==============================================================
  // VIEW A: INDIVIDUAL SERVICE DETAIL PAGE (/events/:slug)
  // ==============================================================
  if (currentService) {
    const hourlyPackages = packages.filter(p => p.category === 'hourly' && p.isEnabled !== false);
    const comboPackages = packages.filter(p => p.category === 'combo' && p.isEnabled !== false);

    return (
      <div className="flex flex-col w-full pb-28 max-w-5xl mx-auto px-4 sm:px-6 selection:bg-[#d4af37] selection:text-[#131315]">
        {/* Breadcrumb Navigation */}
        <div className="mb-4 mt-2 flex items-center justify-between text-xs text-[#d0c5af]">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => navigateTo('home')}
              className="hover:text-[#f2ca50] transition-colors cursor-pointer"
            >
              Home
            </button>
            <span>/</span>
            <button 
              onClick={() => navigateTo('service1')}
              className="hover:text-[#f2ca50] transition-colors cursor-pointer"
            >
              Service 1 / Event
            </button>
            <span>/</span>
            <span className="text-[#f2ca50] font-bold">{currentService.name}</span>
          </div>

          <button
            onClick={() => navigateTo('service1')}
            className="text-xs text-[#d4c78f] hover:text-[#f2ca50] flex items-center gap-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[15px]">arrow_back</span>
            <span>All Events</span>
          </button>
        </div>

        {/* Hero Section of Service */}
        <div className="relative overflow-hidden rounded-3xl bg-[#1c1b1e] border border-[#4d4635]/50 shadow-2xl p-6 sm:p-10 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-[#f2ca50] text-[#3c2f00] text-xs font-bold uppercase tracking-wider">
                  {currentService.badge || 'Royal Selection'}
                </span>
                <span className="text-xs font-mono text-[#d4c78f] bg-[#2a2a2c] px-2.5 py-0.5 rounded-full border border-[#4d4635]/60">
                  /events/{currentService.seo?.slug || currentService.id}
                </span>
              </div>

              <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-[#f2ca50] leading-tight">
                {currentService.name}
              </h1>

              <p className="text-sm sm:text-base font-semibold text-[#f1e3a9]">
                {currentService.tagline}
              </p>

              <p className="text-xs sm:text-sm text-[#d0c5af] leading-relaxed">
                {currentService.description}
              </p>

              {/* Tag Pills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {currentService.tags?.map((tag, idx) => (
                  <span 
                    key={idx}
                    className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-[#2a2a2c] text-[#e5e1e4] border border-[#4d4635]/40"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href="#enquiry-form"
                  className="px-5 py-2.5 rounded-xl bg-[#d4af37] text-[#131315] font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[17px]">edit_calendar</span>
                  <span>Enquire for {currentService.name}</span>
                </a>
                <a
                  href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                  className="px-5 py-2.5 rounded-xl bg-[#2a2a2c] text-[#f2ca50] border border-[#4d4635] font-bold text-xs uppercase tracking-wider hover:bg-[#353437] transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[17px]">call</span>
                  <span>Call: {settings.phone}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#4d4635] shadow-2xl">
                <img
                  src={currentService.imageUrl}
                  alt={currentService.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#131315] via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-[#141418]/90 backdrop-blur-md border border-[#4d4635]/40 text-left">
                  <span className="text-[10px] text-[#99907c] uppercase font-bold block">Performance Scale</span>
                  <span className="text-xs font-bold text-white">{currentService.duration} &bull; Bespoke Orchestration</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features & Repertoire Checklist */}
        <section className="mb-10 p-6 rounded-2xl bg-[#1c1b1e] border border-[#4d4635]/40 shadow-xl space-y-4">
          <h2 className="font-serif-luxury text-xl font-bold text-[#f2ca50]">
            Performance Inclusions &amp; Musical Precision
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {currentService.features?.map((feat, i) => (
              <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#141418] border border-[#353437]">
                <span className="material-symbols-outlined text-[#f2ca50] text-[18px] flex-shrink-0 mt-0.5">
                  check_circle
                </span>
                <span className="text-xs text-[#e5e1e4] font-medium leading-relaxed">{feat}</span>
              </div>
            ))}
          </div>
        </section>

        {/* PERFORMANCE PACKAGES SECTION (HOURLY / SET-BASED & COMBO) */}
        <section className="mb-10 space-y-5">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#f2ca50]">Performance Formats</span>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white mt-1">
              Performance Packages
            </h2>
            <p className="text-xs text-[#d0c5af] mt-1">
              Select an hourly set or full-evening experience calibrated for your guest scale.
            </p>
          </div>

          {/* Hourly / Set-Based Packages */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {hourlyPackages.map((pkg) => (
              <div 
                key={pkg.id}
                className={`p-5 rounded-2xl border flex flex-col justify-between transition-all ${
                  pkg.isRecommended 
                    ? 'bg-gradient-to-b from-[#25221b] to-[#1c1b1e] border-[#f2ca50] shadow-[0_0_24px_rgba(242,202,80,0.15)] ring-1 ring-[#f2ca50]/50' 
                    : 'bg-[#1c1b1e] border-[#4d4635]/50'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#d4c78f] uppercase font-bold tracking-wider">
                      {pkg.tierLabel}
                    </span>
                    {pkg.highlightBadge && (
                      <span className="px-2 py-0.5 rounded-full bg-[#4f471b] border border-[#f2ca50]/50 text-[#f1e3a9] text-[10px] font-bold">
                        {pkg.highlightBadge}
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif-luxury text-lg font-bold text-white">{pkg.name}</h3>
                  <p className="text-xs text-[#d0c5af] leading-relaxed">{pkg.subtitle}</p>

                  <div className="py-2 border-y border-[#353437] text-xs">
                    <span className="text-[10px] text-[#99907c] uppercase block">Duration</span>
                    <span className="font-bold text-[#f2ca50]">{pkg.durationLabel}</span>
                  </div>

                  <ul className="space-y-1.5 text-xs text-[#e5e1e4]">
                    {pkg.inclusions.map((inc, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="material-symbols-outlined text-[#f2ca50] text-[15px] flex-shrink-0 mt-0.5">
                          done
                        </span>
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 pt-3 border-t border-[#353437] flex items-center justify-between">
                  <span className="text-xs font-bold text-[#f1e3a9]">Request a Quote</span>
                  <a
                    href="#enquiry-form"
                    className="px-3.5 py-1.5 rounded-lg bg-[#d4af37] text-[#131315] font-bold text-xs hover:brightness-105 cursor-pointer"
                  >
                    Enquire Now
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Combo Packages: Live Band + DJ Setup */}
          {comboPackages.length > 0 && (
            <div className="mt-6">
              <span className="text-xs font-bold text-[#f2ca50] uppercase tracking-wider block mb-3">
                Combo Packages
              </span>
              <div className="grid grid-cols-1 gap-4">
                {comboPackages.map((pkg) => (
                  <div 
                    key={pkg.id}
                    className="p-6 rounded-2xl bg-[#221f24] border border-[#f2ca50]/60 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
                  >
                    <div className="space-y-2 max-w-xl">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#f2ca50] text-[#3c2f00] text-[10px] font-bold uppercase">
                          {pkg.tierLabel}
                        </span>
                        <span className="text-xs font-mono text-[#d4c78f]">Optional Configuration</span>
                      </div>
                      <h3 className="font-serif-luxury text-xl font-bold text-white">{pkg.name}</h3>
                      <p className="text-xs text-[#d0c5af] leading-relaxed">{pkg.description}</p>
                      <div className="flex flex-wrap gap-2 pt-1 text-xs text-[#f1e3a9]">
                        {pkg.inclusions.map((inc, i) => (
                          <span key={i} className="bg-[#141418] px-2.5 py-1 rounded-lg border border-[#353437]">
                            &bull; {inc}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0 w-full md:w-auto">
                      <div className="text-center sm:text-right">
                        <span className="text-xs font-bold text-[#f2ca50] block">Price on Request</span>
                        <span className="text-[10px] text-[#99907c]">Custom Audio Engineering</span>
                      </div>
                      <a
                        href="#enquiry-form"
                        className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#f2ca50] text-[#131315] font-bold text-xs uppercase tracking-wider hover:brightness-105 text-center"
                      >
                        Enquire for Combo
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* ADD-ON SERVICES SECTION */}
        <section className="mb-10 space-y-4">
          <div className="text-center max-w-xl mx-auto mb-4">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#f2ca50]">Bespoke Enhancements</span>
            <h2 className="font-serif-luxury text-2xl font-bold text-white mt-1">
              Add-On Services
            </h2>
            <p className="text-xs text-[#d0c5af]">
              Select and combine signature production upgrades for an effortless turnkey celebration.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {addOnServices.map((addon) => {
              const isChecked = selectedAddons.includes(addon.title);
              return (
                <div
                  key={addon.id}
                  onClick={() => toggleAddon(addon.title)}
                  className={`p-4 rounded-xl border flex items-start gap-3.5 cursor-pointer transition-all ${
                    isChecked
                      ? 'bg-[#25221b] border-[#f2ca50] shadow-md'
                      : 'bg-[#1c1b1e] border-[#4d4635]/40 hover:border-[#f2ca50]/50'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    isChecked ? 'bg-[#f2ca50] text-[#131315]' : 'bg-[#2a2a2c] text-[#f2ca50]'
                  }`}>
                    <span className="material-symbols-outlined text-[20px]">{addon.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white">{addon.title}</h4>
                      <input 
                        type="checkbox" 
                        checked={isChecked} 
                        readOnly 
                        className="accent-[#f2ca50] cursor-pointer"
                      />
                    </div>
                    <p className="text-xs text-[#d0c5af] mt-1 leading-relaxed">{addon.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* INLINE BOOKING & ENQUIRY FORM */}
        <section id="enquiry-form" className="p-6 sm:p-8 rounded-3xl bg-[#141418] border border-[#4d4635] shadow-2xl">
          <div className="max-w-xl mx-auto space-y-4">
            <div className="text-center space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#f2ca50]">Direct Reservation</span>
              <h3 className="font-serif-luxury text-2xl font-bold text-white">
                Enquire for {currentService.name}
              </h3>
              <p className="text-xs text-[#d0c5af]">
                Submit your celebration details to receive a customized ensemble itinerary and quote.
              </p>
            </div>

            {enquirySuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/60 text-center space-y-3">
                <span className="material-symbols-outlined text-emerald-400 text-[36px]">check_circle</span>
                <h4 className="font-serif-luxury text-lg font-bold text-emerald-200">Enquiry Successfully Dispatched!</h4>
                <p className="text-xs text-[#d0c5af]">
                  Principal Director Vikramaditya Rathore’s concierge desk has received your particulars for <strong>{currentService.name}</strong> on <strong>{eventDate}</strong>.
                </p>
                <div className="pt-2 flex justify-center gap-3">
                  <a
                    href={`https://wa.me/91${settings.whatsAppPhone.replace(/\D/g, '')}?text=Greetings%20from%20${encodeURIComponent(clientName)}.%20I%20just%20submitted%20an%20enquiry%20for%20${encodeURIComponent(currentService.name)}%20on%20${eventDate}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-[#25d366] text-[#131315] font-bold text-xs flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[16px]">chat</span>
                    <span>Chat on WhatsApp</span>
                  </a>
                  <button
                    onClick={() => setEnquirySuccess(false)}
                    className="px-4 py-2 rounded-xl bg-[#2a2a2c] text-xs font-semibold text-white"
                  >
                    Submit Another
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleEnquirySubmit} className="space-y-3.5 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-[#99907c] block mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g. Maharaja Vikram Rathore"
                      className="w-full bg-[#1c1b1e] text-xs text-white p-2.5 rounded-lg border border-[#4d4635] focus:outline-none focus:border-[#f2ca50]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-[#99907c] block mb-1">Contact Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-[#1c1b1e] text-xs text-white p-2.5 rounded-lg border border-[#4d4635] focus:outline-none focus:border-[#f2ca50]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-[#99907c] block mb-1">Event Date</label>
                    <input
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full bg-[#1c1b1e] text-xs text-white p-2.5 rounded-lg border border-[#4d4635] focus:outline-none focus:border-[#f2ca50]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-[#99907c] block mb-1">Destination / City</label>
                    <input
                      type="text"
                      value={eventCity}
                      onChange={(e) => setEventCity(e.target.value)}
                      placeholder="Agra, Lucknow, Jodhpur..."
                      className="w-full bg-[#1c1b1e] text-xs text-white p-2.5 rounded-lg border border-[#4d4635] focus:outline-none focus:border-[#f2ca50]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-[#99907c] block mb-1">Expected Guests</label>
                    <input
                      type="number"
                      value={guestCount}
                      onChange={(e) => setGuestCount(parseInt(e.target.value, 10) || 100)}
                      className="w-full bg-[#1c1b1e] text-xs text-white p-2.5 rounded-lg border border-[#4d4635] focus:outline-none focus:border-[#f2ca50]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-[#99907c] block mb-1">Selected Add-On Services</label>
                  <div className="flex flex-wrap gap-1.5 p-2 rounded-lg bg-[#1c1b1e] border border-[#353437] text-xs text-[#f1e3a9]">
                    {selectedAddons.length > 0 ? (
                      selectedAddons.map((add, i) => (
                        <span key={i} className="bg-[#2a2a2c] px-2 py-0.5 rounded text-[11px]">
                          {add}
                        </span>
                      ))
                    ) : (
                      <span className="text-[#99907c] text-[11px]">None selected</span>
                    )}
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="submit"
                    className="w-full sm:flex-1 py-3 rounded-xl bg-[#d4af37] text-[#131315] font-bold text-xs uppercase tracking-wider hover:brightness-105 active:scale-95 transition-all cursor-pointer shadow-lg"
                  >
                    Send Booking Enquiry
                  </button>
                  <a
                    href={`https://wa.me/91${settings.whatsAppPhone.replace(/\D/g, '')}?text=Hello%20The%20Royal%20Band,%20I%20would%20like%20to%20enquire%20about%20booking%20${encodeURIComponent(currentService.name)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#25d366]/20 text-[#25d366] border border-[#25d366]/40 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-[#25d366]/30"
                  >
                    <span className="material-symbols-outlined text-[16px]">chat</span>
                    <span>Instant WhatsApp</span>
                  </a>
                </div>
              </form>
            )}
          </div>
        </section>
      </div>
    );
  }

  // ==============================================================
  // VIEW B: SERVICE 1 / EVENT OVERVIEW PAGE (/events)
  // ==============================================================
  const hourlyPackages = packages.filter(p => p.category === 'hourly' && p.isEnabled !== false);
  const comboPackages = packages.filter(p => p.category === 'combo' && p.isEnabled !== false);

  return (
    <div className="flex flex-col w-full pb-28 max-w-6xl mx-auto px-4 sm:px-6 selection:bg-[#d4af37] selection:text-[#131315]">
      {/* Top Breadcrumb */}
      <div className="mb-4 mt-2 flex items-center justify-between text-xs text-[#d0c5af]">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => navigateTo('home')}
            className="hover:text-[#f2ca50] transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-[#f2ca50] font-bold">Service 1 / Event</span>
        </div>
        <span className="text-[11px] text-[#d4c78f] font-mono">6 Signature Event Formats</span>
      </div>

      {/* Main Header Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-[#1c1b1e] border border-[#4d4635]/50 shadow-2xl p-6 sm:p-10 mb-10">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2a2a2c] border border-[#4d4635]/60 text-[#f2ca50] text-[11px] font-bold uppercase tracking-wider">
            <span className="material-symbols-outlined text-[15px]">theater_comedy</span>
            <span>Service 1 / Event Directory</span>
          </div>

          <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-[#f2ca50] leading-tight">
            Royal Ensembles &amp; Event Performances
          </h1>

          <p className="text-xs sm:text-sm text-[#d0c5af] leading-relaxed">
            From high-octane 16-piece wedding Baraat brass fanfares to black-tie corporate awards and electric festival headliners, explore our approved live performance services.
          </p>
        </div>
      </section>

      {/* 6 Core Events Grid */}
      <section className="mb-12 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif-luxury text-2xl font-bold text-white">Event Performance Categories</h2>
            <p className="text-xs text-[#d0c5af]">Select an event to view full details, repertoire, and bespoke packages.</p>
          </div>
          <span className="hidden sm:inline text-xs text-[#f2ca50] font-semibold">6 Approved Categories</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((srv) => (
            <div
              key={srv.id}
              onClick={() => navigateTo('service1', srv.seo?.slug || srv.id)}
              className="group rounded-2xl bg-[#1c1b1e] border border-[#4d4635]/40 hover:border-[#f2ca50]/70 overflow-hidden shadow-xl transition-all hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                  <img
                    src={srv.imageUrl}
                    alt={srv.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1c1b1e] via-transparent to-transparent"></div>
                  {srv.badge && (
                    <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-[#d4af37] text-[#131315] text-[10px] font-bold uppercase tracking-wider shadow">
                      {srv.badge}
                    </span>
                  )}
                </div>

                <div className="p-4 space-y-2">
                  <span className="text-[10px] font-mono text-[#f2ca50] uppercase tracking-wider block">
                    /events/{srv.seo?.slug || srv.id}
                  </span>
                  <h3 className="font-serif-luxury text-lg font-bold text-white group-hover:text-[#f2ca50] transition-colors">
                    {srv.name}
                  </h3>
                  <p className="text-xs text-[#d0c5af] line-clamp-2 leading-relaxed">
                    {srv.tagline}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0 border-t border-[#353437]/60 mt-2 flex items-center justify-between text-xs text-[#f1e3a9]">
                <span className="text-[11px] font-medium text-[#99907c]">{srv.duration}</span>
                <span className="font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>View Details</span>
                  <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PERFORMANCE PACKAGES SECTION (OVERVIEW) */}
      <section className="mb-12 space-y-5">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#f2ca50]">Performance Formats</span>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white mt-1">
            Performance Packages
          </h2>
          <p className="text-xs text-[#d0c5af] mt-1">
            Hourly / Set-Based Packages &amp; Optional Live Band + DJ Combo
          </p>
        </div>

        {/* Hourly / Set-Based Packages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {hourlyPackages.map((pkg) => (
            <div 
              key={pkg.id}
              className={`p-5 rounded-2xl border flex flex-col justify-between transition-all ${
                pkg.isRecommended 
                  ? 'bg-gradient-to-b from-[#25221b] to-[#1c1b1e] border-[#f2ca50] shadow-[0_0_24px_rgba(242,202,80,0.15)] ring-1 ring-[#f2ca50]/50' 
                  : 'bg-[#1c1b1e] border-[#4d4635]/50'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#d4c78f] uppercase font-bold tracking-wider">
                    {pkg.tierLabel}
                  </span>
                  {pkg.highlightBadge && (
                    <span className="px-2 py-0.5 rounded-full bg-[#4f471b] border border-[#f2ca50]/50 text-[#f1e3a9] text-[10px] font-bold">
                      {pkg.highlightBadge}
                    </span>
                  )}
                </div>

                <h3 className="font-serif-luxury text-lg font-bold text-white">{pkg.name}</h3>
                <p className="text-xs text-[#d0c5af] leading-relaxed">{pkg.subtitle}</p>

                <div className="py-2 border-y border-[#353437] text-xs">
                  <span className="text-[10px] text-[#99907c] uppercase block">Duration</span>
                  <span className="font-bold text-[#f2ca50]">{pkg.durationLabel}</span>
                </div>

                <ul className="space-y-1.5 text-xs text-[#e5e1e4]">
                  {pkg.inclusions.map((inc, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="material-symbols-outlined text-[#f2ca50] text-[15px] flex-shrink-0 mt-0.5">
                        done
                      </span>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 pt-3 border-t border-[#353437] flex items-center justify-between">
                <span className="text-xs font-bold text-[#f1e3a9]">Request a Quote</span>
                <button
                  onClick={() => navigateTo('contact')}
                  className="px-3.5 py-1.5 rounded-lg bg-[#d4af37] text-[#131315] font-bold text-xs hover:brightness-105 cursor-pointer"
                >
                  Enquire Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Combo Packages: Live Band + DJ Setup */}
        {comboPackages.length > 0 && (
          <div className="mt-6">
            <span className="text-xs font-bold text-[#f2ca50] uppercase tracking-wider block mb-3">
              Combo Packages
            </span>
            <div className="grid grid-cols-1 gap-4">
              {comboPackages.map((pkg) => (
                <div 
                  key={pkg.id}
                  className="p-6 rounded-2xl bg-[#221f24] border border-[#f2ca50]/60 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
                >
                  <div className="space-y-2 max-w-xl">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#f2ca50] text-[#3c2f00] text-[10px] font-bold uppercase">
                        {pkg.tierLabel}
                      </span>
                      <span className="text-xs font-mono text-[#d4c78f]">Optional Configuration</span>
                    </div>
                    <h3 className="font-serif-luxury text-xl font-bold text-white">{pkg.name}</h3>
                    <p className="text-xs text-[#d0c5af] leading-relaxed">{pkg.description}</p>
                    <div className="flex flex-wrap gap-2 pt-1 text-xs text-[#f1e3a9]">
                      {pkg.inclusions.map((inc, i) => (
                        <span key={i} className="bg-[#141418] px-2.5 py-1 rounded-lg border border-[#353437]">
                          &bull; {inc}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0 w-full md:w-auto">
                    <div className="text-center sm:text-right">
                      <span className="text-xs font-bold text-[#f2ca50] block">Price on Request</span>
                      <span className="text-[10px] text-[#99907c]">Live Band + DJ Handover</span>
                    </div>
                    <button
                      onClick={() => navigateTo('contact')}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#f2ca50] text-[#131315] font-bold text-xs uppercase tracking-wider hover:brightness-105 cursor-pointer text-center"
                    >
                      Enquire for Combo
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ADD-ON SERVICES SECTION (OVERVIEW) */}
      <section className="mb-10 space-y-4">
        <div className="text-center max-w-xl mx-auto mb-4">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#f2ca50]">Bespoke Enhancements</span>
          <h2 className="font-serif-luxury text-2xl font-bold text-white mt-1">
            Add-On Services
          </h2>
          <p className="text-xs text-[#d0c5af]">
            Custom sound, bilingual MC hosting, touring logistics, and custom song arrangements.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {addOnServices.map((addon) => (
            <div
              key={addon.id}
              className="p-4 rounded-xl bg-[#1c1b1e] border border-[#4d4635]/40 flex items-start gap-3.5"
            >
              <div className="w-10 h-10 rounded-lg bg-[#2a2a2c] text-[#f2ca50] flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[20px]">{addon.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-white">{addon.title}</h4>
                <p className="text-xs text-[#d0c5af] mt-1 leading-relaxed">{addon.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
