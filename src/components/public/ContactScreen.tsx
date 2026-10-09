import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';

export const ContactScreen: React.FC = () => {
  const { settings, submitLead, showToast, navigateTo } = useCms();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Agra');
  const [occasionType, setOccasionType] = useState('Wedding Performances');
  const [eventDate, setEventDate] = useState('2025-12-20');
  const [timingSlot, setTimingSlot] = useState('Evening Gala (7:00 PM - 11:00 PM)');
  const [guestCount, setGuestCount] = useState<number>(350);
  const [specialRequests, setSpecialRequests] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLeadId, setSubmittedLeadId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      showToast('Please provide your name and phone number to reach you.');
      return;
    }

    setIsSubmitting(true);
    try {
      const id = await submitLead({
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email.trim() || 'enquiry@clientestate.com',
        city,
        occasionType,
        eventDate,
        timingSlot,
        guestCount,
        ensemblePackage: 'Custom Quote / General Booking Enquiry',
        curatedAddons: ['Sound & Lighting Setup', 'Live Orchestral Coordination'],
        specialRequests
      });
      setSubmittedLeadId(id);
      showToast('Inquiry submitted successfully! Concierge desk notified.');
    } catch {
      showToast('Error dispatching inquiry. Please try again or WhatsApp directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const cleanPhone = settings.phone.replace(/\s+/g, '');
  const cleanWaPhone = settings.whatsAppPhone.replace(/\D/g, '');
  const waUrl = `https://wa.me/91${cleanWaPhone}?text=Hello%20The%20Royal%20Band,%20I%20would%20like%20to%20enquire%20about%20booking%20live%20performance%20dates%20for%20our%20upcoming%20event.`;

  return (
    <div className="flex flex-col w-full pb-28 max-w-5xl mx-auto px-4 sm:px-6 selection:bg-[#d4af37] selection:text-[#131315]">
      {/* Top Breadcrumb Navigation */}
      <div className="mb-4 mt-2 flex items-center justify-between text-xs text-[#d0c5af]">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => navigateTo('home')}
            className="hover:text-[#f2ca50] transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-[#f2ca50] font-bold">Contact Us</span>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-[#201f22] border border-[#4d4635]/60 text-[10px] text-[#f2ca50] font-mono font-bold uppercase tracking-wider">
          Direct Concierge &bull; 4 Stationed Hubs
        </span>
      </div>

      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-[#1c1b1e] border border-[#4d4635]/50 p-6 sm:p-8 shadow-2xl mb-8">
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#f2ca50]/10 blur-3xl pointer-events-none"></div>
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#2a2a2c] text-[#f2ca50] border border-[#4d4635]/40">
            <span className="material-symbols-outlined text-[18px]">contact_mail</span>
          </span>
          <span className="font-sans-luxury text-[11px] font-bold text-[#d4c78f] tracking-widest uppercase">
            Official Bookings &amp; Inquiries
          </span>
        </div>
        <h1 className="font-serif-luxury text-2xl sm:text-4xl text-[#e5e1e4] font-medium leading-tight">
          Connect With The Royal Band Concierge
        </h1>
        <p className="font-sans-luxury text-xs sm:text-sm text-[#d0c5af] mt-2 max-w-2xl leading-relaxed">
          Planning a royal wedding, corporate gala, private celebration, festival, or club gig? Reach out to our maestro coordination team directly for availability, customized setlists, and prompt quote proposals.
        </p>

        {/* Instant Action CTA Buttons */}
        <div className="flex flex-wrap gap-3 mt-5">
          <a
            href={`tel:${cleanPhone}`}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2a2a2c] hover:bg-[#353437] text-[#f2ca50] border border-[#4d4635] text-xs font-bold transition-all shadow-md active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">call</span>
            <span>Call: {settings.phone}</span>
          </a>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25d366]/20 hover:bg-[#25d366]/30 text-[#25d366] border border-[#25d366]/50 text-xs font-bold transition-all shadow-md active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">chat</span>
            <span>WhatsApp: +91 {cleanWaPhone}</span>
          </a>
          <a
            href={`mailto:${settings.conciergeEmail}`}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2a2a2c] hover:bg-[#353437] text-[#e5e1e4] border border-[#4d4635] text-xs font-medium transition-all shadow-md"
          >
            <span className="material-symbols-outlined text-[18px]">mail</span>
            <span>{settings.conciergeEmail}</span>
          </a>
        </div>
      </div>

      {/* Main Grid: Form (Left) & Official Details (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: Working Booking Enquiry Form */}
        <div className="lg:col-span-7">
          <div className="bg-[#1c1b1e] border border-[#4d4635]/40 rounded-2xl p-6 sm:p-7 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#353437] mb-5">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#f2ca50] text-[22px]">event_note</span>
                <h2 className="font-serif-luxury text-lg sm:text-xl font-bold text-white">
                  Send Booking Enquiry
                </h2>
              </div>
              <span className="text-[11px] text-[#99907c] font-sans">
                Direct to band management
              </span>
            </div>

            {submittedLeadId ? (
              <div className="p-6 rounded-xl bg-[#201f22] border border-[#f2ca50]/60 text-center space-y-3 animate-in fade-in">
                <div className="w-12 h-12 rounded-full bg-[#f2ca50]/20 text-[#f2ca50] flex items-center justify-center mx-auto">
                  <span className="material-symbols-outlined text-[28px]">verified</span>
                </div>
                <h3 className="font-serif-luxury text-lg font-bold text-[#f2ca50]">
                  Booking Enquiry Recorded
                </h3>
                <p className="text-xs text-[#d0c5af] leading-relaxed max-w-sm mx-auto">
                  Thank you! Your inquiry reference is <strong className="font-mono text-white">{submittedLeadId}</strong>. Our artist concierge will review date availability and respond via WhatsApp / phone shortly.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSubmittedLeadId(null);
                      setFullName('');
                      setPhone('');
                      setEmail('');
                      setSpecialRequests('');
                    }}
                    className="text-xs text-[#f2ca50] hover:underline font-bold cursor-pointer"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-[#d0c5af] uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maharaja Vikramaditya / Host Name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-[#2a2a2c] text-[#e5e1e4] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm border border-[#4d4635]/60 focus:outline-none focus:border-[#f2ca50] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#d0c5af] uppercase tracking-wider mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#2a2a2c] text-[#e5e1e4] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm border border-[#4d4635]/60 focus:outline-none focus:border-[#f2ca50] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-[#d0c5af] uppercase tracking-wider mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="enquiry@clientestate.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#2a2a2c] text-[#e5e1e4] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm border border-[#4d4635]/60 focus:outline-none focus:border-[#f2ca50] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#d0c5af] uppercase tracking-wider mb-1">
                      Performance City *
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-[#2a2a2c] text-[#e5e1e4] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm border border-[#4d4635]/60 focus:outline-none focus:border-[#f2ca50] transition-colors cursor-pointer"
                    >
                      <option value="Agra">Agra (Stationed Hub)</option>
                      <option value="Mathura">Mathura (Stationed Hub)</option>
                      <option value="Lucknow">Lucknow (Stationed Hub)</option>
                      <option value="Jodhpur">Jodhpur (Stationed Hub)</option>
                      <option value="Destination / Other">Destination Wedding / Other City</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-[#d0c5af] uppercase tracking-wider mb-1">
                      Event / Service Type *
                    </label>
                    <select
                      value={occasionType}
                      onChange={(e) => setOccasionType(e.target.value)}
                      className="w-full bg-[#2a2a2c] text-[#e5e1e4] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm border border-[#4d4635]/60 focus:outline-none focus:border-[#f2ca50] transition-colors cursor-pointer"
                    >
                      <option value="Wedding Performances">Wedding Performances</option>
                      <option value="Corporate Events">Corporate Events</option>
                      <option value="Private Parties">Private Parties</option>
                      <option value="Club / Lounge Gigs">Club / Lounge Gigs</option>
                      <option value="College Fests &amp; Festivals">College Fests &amp; Festivals</option>
                      <option value="Destination Weddings">Destination Weddings</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#d0c5af] uppercase tracking-wider mb-1">
                      Event Date *
                    </label>
                    <input
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full bg-[#2a2a2c] text-[#e5e1e4] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm border border-[#4d4635]/60 focus:outline-none focus:border-[#f2ca50] transition-colors cursor-pointer"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-[#d0c5af] uppercase tracking-wider mb-1">
                      Performance Timing Slot
                    </label>
                    <select
                      value={timingSlot}
                      onChange={(e) => setTimingSlot(e.target.value)}
                      className="w-full bg-[#2a2a2c] text-[#e5e1e4] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm border border-[#4d4635]/60 focus:outline-none focus:border-[#f2ca50] transition-colors cursor-pointer"
                    >
                      <option>Evening Gala (7:00 PM - 11:00 PM)</option>
                      <option>Afternoon / Sunset Sangeet (3:00 PM - 7:00 PM)</option>
                      <option>Morning Baraat &amp; Sacred Pheras (9:00 AM - 1:00 PM)</option>
                      <option>Midnight After-Party Jam (11:00 PM - 3:00 AM)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#d0c5af] uppercase tracking-wider mb-1">
                      Estimated Guests ({guestCount})
                    </label>
                    <input
                      type="range"
                      min={50}
                      max={2000}
                      step={50}
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="w-full accent-[#f2ca50] mt-3"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#d0c5af] uppercase tracking-wider mb-1">
                    Custom Requirements or Song Requests
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Mention specific venue name, desired package (1-Hour / 2-Hour / Full-Evening / Live Band + DJ), sound requirements, or favorite songs..."
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full bg-[#2a2a2c] text-[#e5e1e4] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm border border-[#4d4635]/60 focus:outline-none focus:border-[#f2ca50] transition-colors resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-[#f2ca50] text-[#3c2f00] font-bold text-xs sm:text-sm uppercase tracking-wider hover:brightness-105 active:scale-[0.99] transition-all shadow-[0_0_20px_rgba(242,202,80,0.35)] cursor-pointer flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">send</span>
                  <span>{isSubmitting ? 'Transmitting to Concierge...' : 'Submit Booking Enquiry'}</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Actual Business Information & Service Cities */}
        <div className="lg:col-span-5 space-y-6">
          {/* Card 1: Official Headquarter & Booking Desk */}
          <div className="bg-[#1c1b1e] border border-[#4d4635]/40 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="font-serif-luxury text-lg font-bold text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-[#f2ca50] text-[20px]">storefront</span>
              Official Band Information
            </h3>

            <div className="space-y-3.5 text-xs text-[#d0c5af]">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#f2ca50] text-[18px] mt-0.5">location_on</span>
                <div>
                  <p className="font-bold text-[#e5e1e4]">Headquarters &amp; Creative Studio</p>
                  <p className="text-[#99907c] mt-0.5 leading-relaxed">{settings.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#f2ca50] text-[18px] mt-0.5">call</span>
                <div>
                  <p className="font-bold text-[#e5e1e4]">Official Contact Number</p>
                  <a href={`tel:${cleanPhone}`} className="text-[#f2ca50] hover:underline font-mono">
                    {settings.phone}
                  </a>
                  <p className="text-[11px] text-[#99907c]">Available 9:00 AM - 10:00 PM IST daily</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#25d366] text-[18px] mt-0.5">chat</span>
                <div>
                  <p className="font-bold text-[#e5e1e4]">Direct WhatsApp Concierge</p>
                  <a 
                    href={waUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-[#25d366] hover:underline font-mono"
                  >
                    +91 {cleanWaPhone}
                  </a>
                  <p className="text-[11px] text-[#99907c]">Instant repertoire lists &amp; quotes</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#f2ca50] text-[18px] mt-0.5">mail</span>
                <div>
                  <p className="font-bold text-[#e5e1e4]">Official Email Desk</p>
                  <a href={`mailto:${settings.conciergeEmail}`} className="text-[#d0c5af] hover:text-[#f2ca50]">
                    {settings.conciergeEmail}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: 4 Stationed Cities Note (Strictly Truthful) */}
          <div className="bg-[#1c1b1e] border border-[#4d4635]/40 rounded-2xl p-6 shadow-xl space-y-3">
            <h3 className="font-serif-luxury text-base font-bold text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-[#f2ca50] text-[18px]">travel_explore</span>
              Service Availability &amp; Touring Cities
            </h3>
            <p className="text-xs text-[#d0c5af] leading-relaxed">
              The Royal Band is stationed with live touring troupes and equipment networks ready to perform in the four primary cities:
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs pt-1">
              {[
                { name: 'Agra', slug: 'agra', label: 'Taj Heritage Lawns' },
                { name: 'Mathura', slug: 'mathura', label: 'Braj & Heritage Banquets' },
                { name: 'Lucknow', slug: 'lucknow', label: 'Nawabi Palace Ballrooms' },
                { name: 'Jodhpur', slug: 'jodhpur', label: 'Fort & Desert Galas' },
              ].map(cityItem => (
                <button
                  key={cityItem.slug}
                  onClick={() => navigateTo('service2', cityItem.slug)}
                  className="p-2.5 rounded-xl bg-[#2a2a2c] hover:bg-[#353437] border border-[#4d4635]/50 text-left transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#e5e1e4] group-hover:text-[#f2ca50] transition-colors">
                      {cityItem.name}
                    </span>
                    <span className="material-symbols-outlined text-[14px] text-[#f2ca50]">arrow_forward</span>
                  </div>
                  <span className="text-[10px] text-[#99907c] block mt-0.5">{cityItem.label}</span>
                </button>
              ))}
            </div>

            <p className="text-[11px] text-[#99907c] leading-relaxed pt-2 border-t border-[#353437]">
              Notice: We do not falsely claim local office branches in every city. Performances in these hubs are fulfilled via our mobilized orchestra troupes and regional acoustic logistics teams.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
