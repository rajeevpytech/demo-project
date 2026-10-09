import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { CityHub } from '../../types';

export const LocationsScreen: React.FC = () => {
  const { 
    cityHubs, 
    activeLocationSlug, 
    navigateTo, 
    settings, 
    submitLead, 
    showToast 
  } = useCms();

  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [eventDate, setEventDate] = useState('2025-12-24');
  const [occasionType, setOccasionType] = useState('Royal Wedding / Sangeet');
  const [enquirySuccess, setEnquirySuccess] = useState(false);

  // Find currently active city if a slug is present
  const currentCity: CityHub | undefined = cityHubs.find(
    c => (c.seo?.slug || c.id) === activeLocationSlug || c.name.toLowerCase().includes(activeLocationSlug || '')
  );

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
      occasionType,
      eventDate,
      timingSlot: 'Evening Gala (7 PM - 11 PM)',
      city: currentCity?.name || 'Agra / Mathura / Lucknow / Jodhpur',
      ensemblePackage: 'Stationed Live Orchestra Package',
      curatedAddons: ['Sound & Lighting Setup', 'Royal Brass Fanfare'],
      guestCount: 400,
      specialRequests: `Inquiry submitted for ${currentCity?.name || 'All Locations'} landing page.`
    });

    setEnquirySuccess(true);
    showToast(`Inquiry for ${currentCity?.name || 'city hub'} submitted to concierge desk!`);
  };

  // City-specific media mapping
  const cityImages: Record<string, string> = {
    'city-01': 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjO6Sg-XnJ9_Udl1_IoTc366O4hALJGPK3m2ucFI6lIdy0hyeRSn6u3rm1NvSnp20xQZ9tZPaWDXQcaxN9UeJqjgXe0p1Of4HcG2Uvyz0OO5ZZBOej_bY2dOQKXZtYJNk0Wv_ELmC__loOJ1SB85TTQX0LS8AGsH2N8shOIf8jp9L4kUsbls0SJKUpCNKXSML_eUtNqJ4cX-Yu0BB8tsO_csQDAbG9R6PtWnzkocBGtqcAK-Lj4JjboQ',
    'city-02': 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvGyulCTtUTZIKI_lPblSMyoVDYMJM1UyI8y3FxN6bNCTO3kFwhHtbRS7dF9_IE4wCRVN6The8DjbQhAHeXVLWCqDzr0Timz6AqNKUWZFbJZMYqI-SAUfZNU4Z_NBG0pBSvOI6rvHufP3fMaiYujNmbIxEuQMovSOYBRCqsmktKnGncrCzQw605KpujQZkcdcug_0vSO_HaNhSASiveGPqsBhuM4jIy03n_U_4ki_UcTPuIZS62jtEJQ',
    'city-03': 'https://lh3.googleusercontent.com/aida-public/AB6AXuDX_GiHsBACg38pLhfX-IS4KQoY04inXY893P5URjaiqXRp5FeAjBI4OcbEgc77a0T0P_2nZspydyNdnKB811Xq3iBnfSK2qaiOzr9ROU7oPgiBSkZBZqkxcZxx2viir7HuD1E-C2WOMvAoS_PXTJtS2ZfkSNBOn3t2jtGu81iSxutange6GGpjk_bmpTZo0M6SVEri34dnyF9xqK6wUKmX_NQtR0O_8RjHkYsr2KJWilRFdOZ1INXzRw',
    'city-04': 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVFAz27xowA-sc7gI3gTVA81g6lr-DFQ6YkWNdYz5n0qBImxQgrXM01aPPlI5zd0S4_ic61wInZtC4ceJOmmLeOzRtNaluFwTdwle8TmApIDPUJCgCFwwWQRMuBTNC2kjUZijfY6_Iy_cjVVyIhO8BasehlbYNgN0_oVYFzaizmD4JVWqftIBgkVm64OqT4Fy-YvRfHQHXHFqiWduSOZLnE_6XcDN6doGO-OFjkSrYZNa7SZahxgRRTw'
  };

  // ==============================================================
  // VIEW A: INDIVIDUAL LOCATION LANDING PAGE (/locations/:citySlug)
  // ==============================================================
  if (currentCity) {
    const cityImg = currentCity.seo?.ogImageUrl || cityImages[currentCity.id] || settings.logoUrl;

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
              onClick={() => navigateTo('service2')}
              className="hover:text-[#f2ca50] transition-colors cursor-pointer"
            >
              Service 2 (Locations)
            </button>
            <span>/</span>
            <span className="text-[#f2ca50] font-bold">{currentCity.name}</span>
          </div>

          <button
            onClick={() => navigateTo('service2')}
            className="text-xs text-[#d4c78f] hover:text-[#f2ca50] flex items-center gap-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[15px]">arrow_back</span>
            <span>All 4 Hubs</span>
          </button>
        </div>

        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-[#1c1b1e] border border-[#4d4635]/50 shadow-2xl p-6 sm:p-10 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-[#f2ca50] text-[#3c2f00] text-xs font-bold uppercase tracking-wider">
                  Stationed Hub &bull; {currentCity.state}
                </span>
                <span className="text-xs font-mono text-[#d4c78f] bg-[#2a2a2c] px-2.5 py-0.5 rounded-full border border-[#4d4635]/60">
                  /locations/{currentCity.seo?.slug || currentCity.name.toLowerCase()}
                </span>
              </div>

              <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-[#f2ca50] leading-tight">
                Live Royal Band in {currentCity.name}
              </h1>

              <p className="text-sm sm:text-base font-semibold text-[#f1e3a9]">
                {currentCity.tagline}
              </p>

              <p className="text-xs sm:text-sm text-[#d0c5af] leading-relaxed">
                {currentCity.description}
              </p>

              {/* Service Availability Disclosure */}
              <div className="p-3.5 rounded-xl bg-[#141418] border border-[#4d4635]/40 text-xs text-[#d0c5af] space-y-1">
                <div className="flex items-center gap-2 text-[#f2ca50] font-bold text-[11px] uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[16px]">info</span>
                  <span>Accurate Service Availability</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  Our stationed touring ensemble is deployed directly to {currentCity.name} with complete backline audio engineering and royal uniforms. We do not claim a separate walk-in branch office; our resident touring troupe ensures rapid readiness for palace weddings and corporate galas.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href="#location-enquiry"
                  className="px-5 py-2.5 rounded-xl bg-[#d4af37] text-[#131315] font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[17px]">event_available</span>
                  <span>Enquire in {currentCity.name}</span>
                </a>
                <a
                  href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                  className="px-5 py-2.5 rounded-xl bg-[#2a2a2c] text-[#f2ca50] border border-[#4d4635] font-bold text-xs uppercase tracking-wider hover:bg-[#353437] transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[17px]">call</span>
                  <span>Call Concierge</span>
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://wa.me/91${settings.whatsAppPhone.replace(/\D/g, '')}?text=Greetings%20The%20Royal%20Band.%20I%20am%20enquiring%20about%20booking%20live%20performance%20dates%20in%20${encodeURIComponent(currentCity.name)}.`}
                  className="px-4 py-2.5 rounded-xl bg-[#25d366]/20 text-[#25d366] border border-[#25d366]/40 font-bold text-xs flex items-center gap-1.5 hover:bg-[#25d366]/30"
                >
                  <span className="material-symbols-outlined text-[16px]">chat</span>
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#4d4635] shadow-2xl">
                <img
                  src={cityImg}
                  alt={`Live Band Performance in ${currentCity.name}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#131315] via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-[#141418]/90 backdrop-blur-md border border-[#4d4635]/40 text-left">
                  <span className="text-[10px] text-[#99907c] uppercase font-bold block">Acoustic Deployment</span>
                  <span className="text-xs font-bold text-[#f2ca50]">{currentCity.acousticCertification}</span>
                  <span className="text-[10px] text-[#d0c5af] block mt-0.5">{currentCity.readinessTime} readiness</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wedding & Corporate Events Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          {/* Wedding Performances in City */}
          <div className="p-6 rounded-2xl bg-[#1c1b1e] border border-[#4d4635]/40 shadow-xl space-y-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#f2ca50] text-[22px]">celebration</span>
              <h3 className="font-serif-luxury text-xl font-bold text-white">
                Wedding Performances in {currentCity.name}
              </h3>
            </div>
            <p className="text-xs text-[#d0c5af] leading-relaxed">
              We specialize in high-energy royal Baraat processions, sacred Vedic phere string overtures, and vibrant Sangeet concert evenings across {currentCity.name}’s top luxury heritage venues.
            </p>
            <ul className="space-y-1.5 text-xs text-[#f1e3a9] pt-1">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#f2ca50] text-[16px]">check</span>
                <span>Grand Baraat fanfare with wireless staging</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#f2ca50] text-[16px]">check</span>
                <span>Sacred Phere classical strings &amp; bansuri</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#f2ca50] text-[16px]">check</span>
                <span>10 to 16-Piece Sangeet symphony &amp; DJ fusion</span>
              </li>
            </ul>
          </div>

          {/* Corporate Events in City */}
          <div className="p-6 rounded-2xl bg-[#1c1b1e] border border-[#4d4635]/40 shadow-xl space-y-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#f2ca50] text-[22px]">business_center</span>
              <h3 className="font-serif-luxury text-xl font-bold text-white">
                Corporate Events in {currentCity.name}
              </h3>
            </div>
            <p className="text-xs text-[#d0c5af] leading-relaxed">
              For executive annual conventions, award nights, brand launches, and gala dinners hosted in {currentCity.name}, our orchestra provides cinematic walk-in anthems and polished dinner jazz.
            </p>
            <ul className="space-y-1.5 text-xs text-[#f1e3a9] pt-1">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#f2ca50] text-[16px]">check</span>
                <span>Custom brand fanfares &amp; award stings</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#f2ca50] text-[16px]">check</span>
                <span>Polished black-tie stage presence &amp; tuxedos</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#f2ca50] text-[16px]">check</span>
                <span>Pristine sound engineering compliant with ballrooms</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Premier Destination Venues in this City */}
        <section className="mb-8 p-6 rounded-2xl bg-[#1c1b1e] border border-[#4d4635]/40 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-serif-luxury text-lg font-bold text-[#f2ca50]">
              Premier Venues Served in {currentCity.name}
            </h3>
            <span className="text-[11px] text-[#99907c] font-mono">Calibrated Acoustic Layouts</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
            {currentCity.keyVenues.map((venue, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-[#141418] border border-[#353437] text-xs">
                <span className="material-symbols-outlined text-[#f2ca50] text-[16px] block mb-1">
                  location_city
                </span>
                <span className="font-semibold text-white block">{venue}</span>
                <span className="text-[10px] text-[#99907c] block mt-0.5">Heritage Venue</span>
              </div>
            ))}
          </div>
        </section>

        {/* SEO & Structured Data Card */}
        <section className="mb-8 p-4 rounded-xl bg-[#141418] border border-[#353437] text-xs text-[#99907c] space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase font-bold text-[#f2ca50]">Search Engine Metadata</span>
            <span className="text-[10px] text-emerald-400 font-bold">100% Crawlable</span>
          </div>
          <div className="space-y-1">
            <p className="text-white font-semibold">{currentCity.seo?.metaTitle}</p>
            <p className="text-[11px] text-[#d0c5af]">{currentCity.seo?.metaDescription}</p>
            <p className="text-[10px] font-mono text-[#f2ca50] truncate">{currentCity.seo?.canonicalUrl}</p>
          </div>
        </section>

        {/* INLINE BOOKING ENQUIRY FORM FOR THIS CITY */}
        <section id="location-enquiry" className="p-6 sm:p-8 rounded-3xl bg-[#141418] border border-[#4d4635] shadow-2xl">
          <div className="max-w-xl mx-auto space-y-4">
            <div className="text-center space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#f2ca50]">Stationed Concierge</span>
              <h3 className="font-serif-luxury text-2xl font-bold text-white">
                Book The Royal Band in {currentCity.name}
              </h3>
              <p className="text-xs text-[#d0c5af]">
                Reserve our touring troupe for your wedding or corporate event in {currentCity.name}.
              </p>
            </div>

            {enquirySuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/60 text-center space-y-3">
                <span className="material-symbols-outlined text-emerald-400 text-[36px]">check_circle</span>
                <h4 className="font-serif-luxury text-lg font-bold text-emerald-200">Enquiry Received!</h4>
                <p className="text-xs text-[#d0c5af]">
                  Our logistics director for {currentCity.name} will contact you shortly with availability and pricing details.
                </p>
                <button
                  onClick={() => setEnquirySuccess(false)}
                  className="px-4 py-2 rounded-xl bg-[#2a2a2c] text-xs font-semibold text-white"
                >
                  Submit Another Enquiry
                </button>
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
                      placeholder="e.g. Yashvardhan Singhania"
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
                    <label className="text-[11px] font-semibold text-[#99907c] block mb-1">Occasion Type</label>
                    <select
                      value={occasionType}
                      onChange={(e) => setOccasionType(e.target.value)}
                      className="w-full bg-[#1c1b1e] text-xs text-white p-2.5 rounded-lg border border-[#4d4635] focus:outline-none focus:border-[#f2ca50]"
                    >
                      <option value="Royal Wedding / Sangeet">Royal Wedding / Sangeet</option>
                      <option value="Baraat Fanfare">Baraat Fanfare</option>
                      <option value="Corporate Awards Gala">Corporate Awards Gala</option>
                      <option value="Private Celebration">Private Celebration</option>
                    </select>
                  </div>
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
                    <label className="text-[11px] font-semibold text-[#99907c] block mb-1">Destination City</label>
                    <input
                      type="text"
                      readOnly
                      value={currentCity.name}
                      className="w-full bg-[#141418] text-xs text-[#f2ca50] font-bold p-2.5 rounded-lg border border-[#4d4635] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="submit"
                    className="w-full sm:flex-1 py-3 rounded-xl bg-[#d4af37] text-[#131315] font-bold text-xs uppercase tracking-wider hover:brightness-105 active:scale-95 transition-all cursor-pointer shadow-lg"
                  >
                    Send Inquiry for {currentCity.name}
                  </button>
                  <a
                    href={`https://wa.me/91${settings.whatsAppPhone.replace(/\D/g, '')}?text=Greetings%20from%20The%20Royal%20Band%20website.%20I%20am%20enquiring%20about%20booking%20dates%20in%20${encodeURIComponent(currentCity.name)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#25d366]/20 text-[#25d366] border border-[#25d366]/40 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-[#25d366]/30"
                  >
                    <span className="material-symbols-outlined text-[16px]">chat</span>
                    <span>Chat on WhatsApp</span>
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
  // VIEW B: SERVICE 2 OVERVIEW PAGE (/locations)
  // ==============================================================
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
          <span className="text-[#f2ca50] font-bold">Service 2 (Locations)</span>
        </div>
        <span className="text-[11px] text-[#d4c78f] font-mono">Exactly 4 Stationed Hubs</span>
      </div>

      {/* Main Header Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-[#1c1b1e] border border-[#4d4635]/50 shadow-2xl p-6 sm:p-10 mb-10">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2a2a2c] border border-[#4d4635]/60 text-[#f2ca50] text-[11px] font-bold uppercase tracking-wider">
            <span className="material-symbols-outlined text-[15px]">location_city</span>
            <span>Service 2 — Destination Cities</span>
          </div>

          <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-[#f2ca50] leading-tight">
            Stationed Heritage Hubs &amp; Cities
          </h1>

          <p className="text-xs sm:text-sm text-[#d0c5af] leading-relaxed">
            The Royal Band maintains specialized touring troupes and sound engineering backlines stationed to serve four iconic heritage hubs: <strong>Agra</strong>, <strong>Mathura</strong>, <strong>Lucknow</strong>, and <strong>Jodhpur</strong>.
          </p>

          <p className="text-xs text-[#99907c] leading-relaxed">
            Every location features verified venue calibration, rapid dispatch readiness, and specialized musical repertoires tailored to palace lawns and heritage amphitheaters.
          </p>
        </div>
      </section>

      {/* Exactly 4 Cities Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {cityHubs.map((city) => {
          const cityImg = city.seo?.ogImageUrl || cityImages[city.id] || settings.logoUrl;
          return (
            <div
              key={city.id}
              onClick={() => navigateTo('service2', city.seo?.slug || city.name.toLowerCase())}
              className="group rounded-3xl bg-[#1c1b1e] border border-[#4d4635]/40 hover:border-[#f2ca50]/70 overflow-hidden shadow-2xl transition-all hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                  <img
                    src={cityImg}
                    alt={`Live Band ${city.name}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1c1b1e] via-transparent to-transparent"></div>
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#131315]/80 backdrop-blur-md border border-[#4d4635] text-[#f2ca50] text-xs font-bold font-serif-luxury">
                    {city.name} ({city.state})
                  </span>
                  <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-[#4f471b] text-[#f1e3a9] text-[10px] font-mono font-bold">
                    {city.readinessTime}
                  </span>
                </div>

                <div className="p-5 space-y-2.5">
                  <span className="text-[10px] font-mono text-[#f2ca50] uppercase tracking-wider block">
                    /locations/{city.seo?.slug || city.name.toLowerCase()}
                  </span>
                  <h3 className="font-serif-luxury text-xl font-bold text-white group-hover:text-[#f2ca50] transition-colors">
                    {city.name} Hub
                  </h3>
                  <p className="text-xs font-semibold text-[#f1e3a9]">{city.tagline}</p>
                  <p className="text-xs text-[#d0c5af] leading-relaxed line-clamp-2">
                    {city.description}
                  </p>

                  <div className="pt-2">
                    <span className="text-[10px] text-[#99907c] uppercase font-bold block mb-1">Key Venues:</span>
                    <div className="flex flex-wrap gap-1">
                      {city.keyVenues.slice(0, 3).map((v, i) => (
                        <span key={i} className="text-[10px] bg-[#141418] text-[#d4c78f] px-2 py-0.5 rounded border border-[#353437]">
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-[#353437]/60 mt-3 flex items-center justify-between text-xs text-[#f2ca50]">
                <span className="font-mono text-[11px] text-[#99907c]">{city.residentTroupes}</span>
                <span className="font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Explore {city.name} Landing Page</span>
                  <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                </span>
              </div>
            </div>
          );
        })}
      </section>

      {/* Direct Call to Action */}
      <section className="text-center p-8 rounded-3xl bg-[#141418] border border-[#4d4635] shadow-2xl space-y-4">
        <span className="text-[11px] font-bold uppercase tracking-widest text-[#f2ca50]">Multi-City Touring</span>
        <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">
          Hosting an Event Across Multiple Cities?
        </h2>
        <p className="text-xs sm:text-sm text-[#d0c5af] max-w-lg mx-auto leading-relaxed">
          Our centralized production and artist liaison handles turnkey logistics across Agra, Mathura, Lucknow, and Jodhpur with zero compromise on sound fidelity.
        </p>
        <div className="pt-2 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => navigateTo('contact')}
            className="px-6 py-3 rounded-xl bg-[#d4af37] text-[#131315] font-bold text-xs uppercase tracking-wider hover:brightness-105 active:scale-95 transition-all"
          >
            Check Calendar Availability
          </button>
          <a
            href={`tel:${settings.phone.replace(/\s+/g, '')}`}
            className="px-6 py-3 rounded-xl bg-[#2a2a2c] text-[#f2ca50] border border-[#4d4635] font-bold text-xs uppercase tracking-wider hover:bg-[#353437]"
          >
            Call: {settings.phone}
          </a>
        </div>
      </section>
    </div>
  );
};
