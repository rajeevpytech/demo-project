import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';

export const BookScreen: React.FC = () => {
  const { settings, submitLead } = useCms();

  const [step, setStep] = useState<number>(1);
  const [title, setTitle] = useState('Mr.');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [occasionType, setOccasionType] = useState('Royal Wedding / Sangeet');
  const [eventDate, setEventDate] = useState('2025-11-28');
  const [timingSlot, setTimingSlot] = useState('Cocktail Evening (6 PM - 10 PM)');
  const [city, setCity] = useState('Jaipur — Royal Rajputana Heritage');
  const [ensemblePackage, setEnsemblePackage] = useState('The Royal Grandeur');
  const [addons, setAddons] = useState<string[]>([
    'Concert Acoustic & Ambient Lighting Package',
    'Professional Royal MC / Bilingual Host'
  ]);
  const [guestCount, setGuestCount] = useState<number>(450);
  const [specialRequests, setSpecialRequests] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedLeadId, setSubmittedLeadId] = useState<string | null>(null);

  const toggleAddon = (item: string) => {
    setAddons(prev => 
      prev.includes(item) ? prev.filter(a => a !== item) : [...prev, item]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptedTerms) {
      alert("Please acknowledge the calendar availability terms to proceed.");
      return;
    }

    setIsSubmitting(true);
    try {
      const id = await submitLead({
        title,
        fullName: fullName || "VIP Guest",
        phone: phone || "9876543210",
        email: email || "concierge@clientestate.com",
        occasionType,
        eventDate,
        timingSlot,
        city,
        ensemblePackage,
        curatedAddons: addons,
        guestCount,
        specialRequests
      });
      setSubmittedLeadId(id);
      setIsSubmitted(true);
      setStep(3);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col w-full pb-28 max-w-4xl mx-auto selection:bg-[#d4af37] selection:text-[#131315]">
      {/* Status Aura Banner */}
      <div className="px-4 sm:px-6 mb-4 mt-2">
        <div className="bg-[#2a2a2c]/90 border border-[#4d4635]/60 rounded-lg p-3 shadow-md flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f2ca50] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#f2ca50]"></span>
            </span>
            <span className="font-sans-luxury text-[11px] font-bold text-[#d4c78f] tracking-widest uppercase truncate">
              2025–2026 Wedding Season Dates Selling Fast
            </span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-[#4f471b] border border-[#f2ca50]/40 text-[#f1e3a9] font-sans-luxury text-[9px] font-bold tracking-wider whitespace-nowrap uppercase">
            Rare Slots
          </span>
        </div>
      </div>

      {/* Editorial Section Header */}
      <div className="px-4 sm:px-6 mb-6 flex flex-col items-center text-center">
        <div className="w-12 h-12 rounded-full bg-[#201f22] border border-[#4d4635] flex items-center justify-center shadow-md mb-3 text-[#f2ca50]">
          <span className="material-symbols-outlined text-[26px]">verified</span>
        </div>
        <span className="font-sans-luxury text-[11px] font-bold text-[#d4c78f] tracking-[0.2em] mb-1 uppercase">
          VIP Concierge Service
        </span>
        <h1 className="font-serif-luxury text-3xl sm:text-4xl text-[#f2ca50] tracking-tight font-medium">
          Secure Your Date
        </h1>
        <p className="text-xs sm:text-sm text-[#d0c5af] max-w-sm mt-1.5 leading-relaxed">
          Direct reservation with royal orchestra maestros for palace celebrations, galas, and bespoke soirées.
        </p>
      </div>

      {/* Stepper Indicator */}
      <div className="px-4 sm:px-6 mb-8">
        <div className="bg-[#1c1b1e] border border-[#4d4635]/40 p-3.5 rounded-xl flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#f2ca50] text-[#3c2f00] font-sans-luxury text-xs flex items-center justify-center font-bold">
              1
            </div>
            <div className="flex flex-col">
              <span className="font-sans-luxury text-[11px] font-bold text-[#f2ca50] leading-tight uppercase tracking-wider">
                Event Particulars
              </span>
              <span className="text-[10px] text-[#d4c78f] leading-tight">
                {step === 1 ? 'In Progress' : 'Completed'}
              </span>
            </div>
          </div>

          <div className="h-0.5 w-6 sm:w-16 bg-[#353437]"></div>

          <div className={`flex items-center gap-2 ${step < 2 ? 'opacity-55' : ''}`}>
            <div className={`w-7 h-7 rounded-full font-sans-luxury text-xs flex items-center justify-center font-semibold ${
              step >= 2 ? 'bg-[#f2ca50] text-[#3c2f00]' : 'bg-[#353437] text-[#d0c5af]'
            }`}>
              2
            </div>
            <div className="flex flex-col">
              <span className="font-sans-luxury text-[11px] font-semibold text-[#d0c5af] leading-tight uppercase tracking-wider">
                Curation
              </span>
              <span className="text-[10px] text-[#99907c] leading-tight">Lineup</span>
            </div>
          </div>

          <div className="h-0.5 w-6 sm:w-16 bg-[#353437]"></div>

          <div className={`flex items-center gap-2 ${step < 3 ? 'opacity-55' : ''}`}>
            <div className={`w-7 h-7 rounded-full font-sans-luxury text-xs flex items-center justify-center font-semibold ${
              step >= 3 ? 'bg-[#f2ca50] text-[#3c2f00]' : 'bg-[#353437] text-[#d0c5af]'
            }`}>
              3
            </div>
            <div className="flex flex-col">
              <span className="font-sans-luxury text-[11px] font-semibold text-[#d0c5af] leading-tight uppercase tracking-wider">
                VIP Quote
              </span>
              <span className="text-[10px] text-[#99907c] leading-tight">Contract</span>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Toast if submitted */}
      {isSubmitted && (
        <div className="mx-4 sm:mx-6 mb-6 bg-[#2a2a2c] border border-[#f2ca50] rounded-xl p-5 text-center shadow-xl animate-in fade-in">
          <span className="material-symbols-outlined text-[#f2ca50] text-[36px] mb-1">check_circle</span>
          <h3 className="font-serif-luxury text-xl sm:text-2xl text-[#f2ca50]">
            Inquiry Dispatched to Royal Liaison
          </h3>
          <p className="text-xs sm:text-sm text-[#d0c5af] mt-1.5 max-w-md mx-auto leading-relaxed">
            Reference Token: <strong className="text-white font-mono">{submittedLeadId}</strong>. Our Principal Director Vikramaditya Rathore will connect via VIP WhatsApp within 4 business hours with calendar confirmation and bespoke rider overture.
          </p>
          <div className="mt-3 flex justify-center gap-2">
            <button 
              onClick={() => { setIsSubmitted(false); setStep(1); }}
              className="text-xs text-[#f2ca50] underline font-bold cursor-pointer"
            >
              Submit Another Reservation
            </button>
          </div>
        </div>
      )}

      {/* Main Booking Form */}
      <form onSubmit={handleSubmit} className="px-4 sm:px-6 flex flex-col gap-6">
        {/* Section 1: VIP Host Details */}
        <div className="bg-[#1c1b1e] border border-[#4d4635]/40 rounded-xl p-5 shadow-sm flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#f2ca50] text-[20px]">badge</span>
            <h2 className="font-serif-luxury text-base sm:text-lg text-[#e5e1e4] font-semibold">
              VIP Contact Particulars
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            <div className="col-span-1">
              <label className="block text-[11px] font-bold text-[#d0c5af] mb-1.5 uppercase tracking-wider">
                Title
              </label>
              <div className="relative">
                <select 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-[#2a2a2c] text-[#e5e1e4] rounded-lg px-2.5 py-3 text-xs sm:text-sm border border-[#4d4635] focus:outline-none focus:border-[#f2ca50] appearance-none cursor-pointer"
                >
                  <option>His Excellency</option>
                  <option>Her Excellency</option>
                  <option>Mr.</option>
                  <option>Mrs.</option>
                  <option>Ms.</option>
                  <option>Dr.</option>
                </select>
                <span className="material-symbols-outlined absolute right-2 top-3 pointer-events-none text-[#d0c5af] text-[18px]">
                  expand_more
                </span>
              </div>
            </div>

            <div className="col-span-2">
              <label className="block text-[11px] font-bold text-[#d0c5af] mb-1.5 uppercase tracking-wider">
                Full Name
              </label>
              <input 
                type="text" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Maharaja Vikramaditya Singhania"
                required
                className="w-full bg-[#2a2a2c] text-[#e5e1e4] rounded-lg px-3 py-3 text-xs sm:text-sm border border-[#4d4635] placeholder:text-[#99907c] focus:outline-none focus:border-[#f2ca50]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#d0c5af] mb-1.5 uppercase tracking-wider">
              Phone &amp; VIP WhatsApp
            </label>
            <div className="flex gap-2">
              <div className="bg-[#2a2a2c] px-3 py-3 rounded-lg flex items-center justify-center text-xs sm:text-sm font-semibold text-[#d4c78f] border border-[#4d4635] select-none">
                🇮🇳 +91
              </div>
              <input 
                type="tel" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                pattern="[0-9]{10}"
                placeholder="98765 43210"
                required
                className="w-full bg-[#2a2a2c] text-[#e5e1e4] rounded-lg px-3 py-3 text-xs sm:text-sm border border-[#4d4635] placeholder:text-[#99907c] focus:outline-none focus:border-[#f2ca50]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#d0c5af] mb-1.5 uppercase tracking-wider">
              Private Email
            </label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="concierge@estate.com"
              required
              className="w-full bg-[#2a2a2c] text-[#e5e1e4] rounded-lg px-3 py-3 text-xs sm:text-sm border border-[#4d4635] placeholder:text-[#99907c] focus:outline-none focus:border-[#f2ca50]"
            />
          </div>
        </div>

        {/* Section 2: Occasion Type */}
        <div className="bg-[#1c1b1e] border border-[#4d4635]/40 rounded-xl p-5 shadow-sm flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#f2ca50] text-[20px]">celebration</span>
              <h2 className="font-serif-luxury text-base sm:text-lg text-[#e5e1e4] font-semibold">
                Occasion Type
              </h2>
            </div>
            <span className="text-[10px] font-bold text-[#d4c78f] uppercase tracking-wider">Select 1</span>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {[
              'Royal Wedding / Sangeet',
              'Destination Celebration',
              'Corporate Gala',
              'Private Anniversary',
              'Festival / Concert'
            ].map((type) => {
              const isSelected = occasionType === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => setOccasionType(type)}
                  className={`px-3.5 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#f2ca50] text-[#3c2f00] shadow-sm font-bold'
                      : 'bg-[#2a2a2c] text-[#e5e1e4] hover:bg-[#353437] border border-[#4d4635]/40'
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 3: Date, Slot & Destination */}
        <div className="bg-[#1c1b1e] border border-[#4d4635]/40 rounded-xl p-5 shadow-sm flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#f2ca50] text-[20px]">calendar_today</span>
            <h2 className="font-serif-luxury text-base sm:text-lg text-[#e5e1e4] font-semibold">
              Date &amp; Royal Destination
            </h2>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#d0c5af] mb-1.5 uppercase tracking-wider">
              Performance Date
            </label>
            <input 
              type="date" 
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              required
              className="w-full bg-[#2a2a2c] text-[#e5e1e4] rounded-lg px-3.5 py-3 text-xs sm:text-sm border border-[#4d4635] focus:outline-none focus:border-[#f2ca50] cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#d0c5af] mb-1.5 uppercase tracking-wider">
              Timing &amp; Slot
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Daytime', time: '11 AM - 3 PM', icon: 'wb_sunny' },
                { label: 'Cocktail', time: '6 PM - 10 PM', icon: 'local_bar' },
                { label: 'Full Night', time: '8 PM - Dawn', icon: 'nightlife' },
              ].map((slot) => {
                const isSelected = timingSlot.includes(slot.label);
                return (
                  <button
                    key={slot.label}
                    type="button"
                    onClick={() => setTimingSlot(`${slot.label} (${slot.time})`)}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-lg text-center transition-all cursor-pointer border ${
                      isSelected 
                        ? 'bg-[#4f471b] border-[#f2ca50] text-[#f1e3a9]' 
                        : 'bg-[#2a2a2c] border-[#4d4635]/40 text-[#e5e1e4] hover:bg-[#353437]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px] mb-1">{slot.icon}</span>
                    <span className="text-xs font-semibold leading-tight">{slot.label}</span>
                    <span className="text-[9px] opacity-80 mt-0.5">{slot.time}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#d0c5af] mb-1.5 uppercase tracking-wider">
              Host City / Palace Venue
            </label>
            <div className="relative">
              <select 
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-[#2a2a2c] text-[#e5e1e4] rounded-lg px-3.5 py-3 text-xs sm:text-sm border border-[#4d4635] focus:outline-none focus:border-[#f2ca50] appearance-none cursor-pointer"
              >
                <option value="Udaipur — City of Lakes & Palaces">Udaipur — City of Lakes &amp; Palaces</option>
                <option value="Jaipur — Royal Rajputana Heritage">Jaipur — Royal Rajputana Heritage</option>
                <option value="Jodhpur — Umaid Bhawan & Forts">Jodhpur — Umaid Bhawan &amp; Forts</option>
                <option value="Agra — Mughal Marvels">Agra — Mughal Marvels</option>
                <option value="Mathura & Vrindavan Heritage">Mathura &amp; Vrindavan Heritage</option>
                <option value="Lucknow — Nawabi Royal Mansions">Lucknow — Nawabi Royal Mansions</option>
                <option value="Delhi-NCR & Neemrana">Delhi-NCR &amp; Neemrana</option>
                <option value="Other Domestic / International Destination">Other Domestic / International Destination</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-3.5 pointer-events-none text-[#d0c5af] text-[20px]">
                arrow_drop_down
              </span>
            </div>
          </div>
        </div>

        {/* Section 4: Preferred Ensemble Tier */}
        <div className="bg-[#1c1b1e] border border-[#4d4635]/40 rounded-xl p-5 shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#f2ca50] text-[20px]">queue_music</span>
              <h2 className="font-serif-luxury text-base sm:text-lg text-[#e5e1e4] font-semibold">
                Ensemble Package
              </h2>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#d4af37] text-[#131315] font-sans-luxury text-[9px] uppercase font-bold">
              Recommended
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {/* Tier 1 */}
            <div 
              onClick={() => setEnsemblePackage('The Crown Quintet')}
              className={`p-4 rounded-xl cursor-pointer transition-all border ${
                ensemblePackage === 'The Crown Quintet'
                  ? 'bg-[#353437] border-[#f2ca50] shadow-md'
                  : 'bg-[#2a2a2c] border-[#4d4635]/40 hover:bg-[#353437]'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <input 
                    type="radio" 
                    name="ensemblePackage"
                    checked={ensemblePackage === 'The Crown Quintet'}
                    onChange={() => setEnsemblePackage('The Crown Quintet')}
                    className="w-4 h-4 accent-[#f2ca50]" 
                  />
                  <div>
                    <span className="text-sm sm:text-base font-semibold text-[#e5e1e4] block leading-tight">
                      The Crown Quintet
                    </span>
                    <span className="text-xs text-[#d0c5af]">
                      5 Virtuoso Instrumentalists · 60 Mins Set
                    </span>
                  </div>
                </div>
                <span className="font-sans-luxury text-[#d4c78f] font-bold text-xs uppercase">Tier I</span>
              </div>
              <p className="text-xs text-[#99907c] mt-2.5 pl-7 leading-relaxed">
                Ideal for high-tea, champagne arrivals, or intimate vintage courtyards.
              </p>
            </div>

            {/* Tier 2 */}
            <div 
              onClick={() => setEnsemblePackage('The Royal Grandeur')}
              className={`p-4 rounded-xl cursor-pointer transition-all border ${
                ensemblePackage === 'The Royal Grandeur'
                  ? 'bg-[#353437] border-[#f2ca50] shadow-md ring-1 ring-[#f2ca50]'
                  : 'bg-[#2a2a2c] border-[#4d4635]/40 hover:bg-[#353437]'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <input 
                    type="radio" 
                    name="ensemblePackage"
                    checked={ensemblePackage === 'The Royal Grandeur'}
                    onChange={() => setEnsemblePackage('The Royal Grandeur')}
                    className="w-4 h-4 accent-[#f2ca50]" 
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm sm:text-base font-bold text-[#f2ca50] block leading-tight">
                        The Royal Grandeur
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#f2ca50] text-[#3c2f00] font-sans-luxury text-[8px] font-extrabold uppercase">
                        Most Loved
                      </span>
                    </div>
                    <span className="text-xs text-[#d4c78f]">
                      10-Piece Grand Royal Band · 120 Mins Set
                    </span>
                  </div>
                </div>
                <span className="font-sans-luxury text-[#f2ca50] font-bold text-xs uppercase">Tier II</span>
              </div>
              <p className="text-xs text-[#d0c5af] mt-2.5 pl-7 leading-relaxed">
                Full horn section, royal percussionists, dual lead vocalists &amp; custom overture.
              </p>
            </div>

            {/* Tier 3 */}
            <div 
              onClick={() => setEnsemblePackage('The Imperial All-Night Symphony')}
              className={`p-4 rounded-xl cursor-pointer transition-all border ${
                ensemblePackage === 'The Imperial All-Night Symphony'
                  ? 'bg-[#353437] border-[#f2ca50] shadow-md'
                  : 'bg-[#2a2a2c] border-[#4d4635]/40 hover:bg-[#353437]'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <input 
                    type="radio" 
                    name="ensemblePackage"
                    checked={ensemblePackage === 'The Imperial All-Night Symphony'}
                    onChange={() => setEnsemblePackage('The Imperial All-Night Symphony')}
                    className="w-4 h-4 accent-[#f2ca50]" 
                  />
                  <div>
                    <span className="text-sm sm:text-base font-semibold text-[#e5e1e4] block leading-tight">
                      The Imperial All-Night Symphony
                    </span>
                    <span className="text-xs text-[#d0c5af]">
                      16 Musicians + Live DJ Fusion · Continuous
                    </span>
                  </div>
                </div>
                <span className="font-sans-luxury text-[#d4c78f] font-bold text-xs uppercase">Tier III</span>
              </div>
              <p className="text-xs text-[#99907c] mt-2.5 pl-7 leading-relaxed">
                Non-stop gala soundscape: royal classical warmup transitioning into high-energy live fusion.
              </p>
            </div>
          </div>
        </div>

        {/* Section 5: Curated Palace Enhancements */}
        <div className="bg-[#1c1b1e] border border-[#4d4635]/40 rounded-xl p-5 shadow-sm flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#f2ca50] text-[20px]">room_preferences</span>
            <h2 className="font-serif-luxury text-base sm:text-lg text-[#e5e1e4] font-semibold">
              Curated Palace Enhancements
            </h2>
          </div>
          <p className="text-xs text-[#d0c5af]">
            Signature experiential additions managed seamlessly under one contract.
          </p>

          <div className="flex flex-col gap-2.5 pt-1">
            {[
              {
                title: 'Concert Acoustic & Ambient Lighting Package',
                desc: 'Custom line-array systems calibrated for expansive heritage lawns & courtyards.'
              },
              {
                title: 'Professional Royal MC / Bilingual Host',
                desc: 'Distinguished stage presence fluent in English & Hindi protocol.'
              },
              {
                title: 'Customized Royal First-Dance Composition',
                desc: 'Bespoke orchestral arrangement recorded and mastered exclusively for your union.'
              },
              {
                title: 'Multi-City Heritage Tour Booking',
                desc: 'Retain the band across consecutive nights in Jaipur, Udaipur & Delhi.'
              }
            ].map((addon) => {
              const isChecked = addons.includes(addon.title);
              return (
                <div 
                  key={addon.title}
                  onClick={() => toggleAddon(addon.title)}
                  className="flex items-start gap-3 p-3 rounded-lg bg-[#2a2a2c] hover:bg-[#353437] border border-[#4d4635]/30 cursor-pointer transition-colors"
                >
                  <input 
                    type="checkbox" 
                    checked={isChecked}
                    onChange={() => toggleAddon(addon.title)}
                    className="mt-1 w-4 h-4 accent-[#f2ca50] rounded cursor-pointer"
                  />
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs sm:text-sm font-semibold text-[#e5e1e4] leading-snug">
                      {addon.title}
                    </span>
                    <span className="text-[11px] text-[#99907c] mt-0.5">
                      {addon.desc}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 6: Guest Scale Slider */}
        <div className="bg-[#1c1b1e] border border-[#4d4635]/40 rounded-xl p-5 shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#f2ca50] text-[20px]">groups</span>
              <h2 className="font-serif-luxury text-base sm:text-lg text-[#e5e1e4] font-semibold">
                Estimated Attendance
              </h2>
            </div>
            <div className="bg-[#f2ca50]/10 border border-[#f2ca50]/30 px-3 py-1 rounded-full">
              <span className="text-xs sm:text-sm font-bold text-[#f2ca50]">
                {guestCount >= 1500 ? '1,500+' : guestCount}
              </span>
              <span className="text-[11px] text-[#f2ca50] ml-1">Guests</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <input 
              type="range"
              min="100"
              max="1500"
              step="50"
              value={guestCount}
              onChange={(e) => setGuestCount(parseInt(e.target.value))}
              className="w-full accent-[#f2ca50] h-2 bg-[#353437] rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#99907c] font-sans-luxury uppercase font-semibold">
              <span>100 (Intimate)</span>
              <span>600 (Palace Lawn)</span>
              <span>1,500+ (Grand Gala)</span>
            </div>
          </div>
        </div>

        {/* Section 7: Bespoke Repertoire & Requests */}
        <div className="bg-[#1c1b1e] border border-[#4d4635]/40 rounded-xl p-5 shadow-sm flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#f2ca50] text-[20px]">music_note</span>
            <h2 className="font-serif-luxury text-base sm:text-lg text-[#e5e1e4] font-semibold">
              Special Requests &amp; Favorite Songs
            </h2>
          </div>
          <p className="text-xs text-[#d0c5af]">
            List any essential family favorites, thematic styles (Sufi, Retro Bollywood, Big Band, Western Swing), or royal entry cues.
          </p>
          <textarea 
            rows={3}
            value={specialRequests}
            onChange={(e) => setSpecialRequests(e.target.value)}
            placeholder="e.g. Please arrange an energetic brass entry fanfare for the Baraat, followed by romantic Bollywood classics for the dinner reception..."
            className="w-full bg-[#2a2a2c] text-[#e5e1e4] rounded-lg p-3 text-xs sm:text-sm border border-[#4d4635] placeholder:text-[#99907c] focus:outline-none focus:border-[#f2ca50]"
          ></textarea>
        </div>

        {/* Section 8: Terms Acceptance */}
        <div className="bg-[#1c1b1e] border border-[#4d4635]/40 rounded-xl p-4 flex items-start gap-3">
          <input 
            type="checkbox" 
            id="terms"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
            required
            className="mt-1 w-4 h-4 accent-[#f2ca50] rounded cursor-pointer"
          />
          <label htmlFor="terms" className="text-xs text-[#d0c5af] cursor-pointer leading-relaxed">
            I acknowledge this request checks calendar availability. Official holding of dates is executed upon management deposit and formal VIP contract confirmation.
          </label>
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-3 pt-2">
          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full h-13 py-3.5 px-6 rounded-lg bg-[#d4af37] text-[#131315] font-sans-luxury text-sm sm:text-base font-bold shadow-[0_0_24px_rgba(212,175,55,0.3)] hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[22px]">auto_awesome</span>
            <span>{isSubmitting ? 'Securing Royal Priority...' : 'Submit VIP Booking Request'}</span>
          </button>

          <a 
            href={`https://wa.me/${settings.whatsAppPhone.replace(/\D/g, '')}?text=Hello%20Royal%20Band%20Concierge,%20I%20wish%20to%20inquire%20about%20booking%20dates%20for%20our%20celebration.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-12 py-3 px-6 rounded-lg bg-[#2a2a2c] hover:bg-[#353437] border border-[#4d4635] text-[#d4c78f] text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[#f2ca50] text-[20px]">chat</span>
            <span>Chat with Booking Director on WhatsApp</span>
          </a>
        </div>
      </form>

      {/* VIP Band Director Direct Line Card */}
      <div className="px-4 sm:px-6 mt-8">
        <div className="bg-[#2a2a2c] border border-[#4d4635]/60 rounded-xl p-5 shadow-lg flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <img 
              alt={settings.directorName} 
              className="w-16 h-16 rounded-full object-cover border border-[#f2ca50]/50 shadow-md flex-shrink-0" 
              src={settings.directorPhotoUrl} 
            />
            <div className="flex flex-col min-w-0">
              <span className="font-sans-luxury text-[10px] font-bold text-[#f2ca50] tracking-widest uppercase">
                Band Management Liaison
              </span>
              <h3 className="font-serif-luxury text-lg text-[#e5e1e4] font-semibold truncate">
                {settings.directorName}
              </h3>
              <span className="text-xs text-[#d0c5af]">
                {settings.directorTitle}
              </span>
            </div>
          </div>

          <div className="bg-[#201f22] border border-[#4d4635]/40 p-3 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#e5e1e4]">
              <span className="material-symbols-outlined text-[#f2ca50] text-[20px]">call</span>
              <span className="text-xs sm:text-sm font-semibold tracking-wide">
                {settings.directorPhone}
              </span>
            </div>
            <a 
              className="px-3 py-1.5 rounded bg-[#f2ca50] text-[#3c2f00] font-sans-luxury text-[10px] font-bold uppercase tracking-wider shadow-sm hover:brightness-105 active:scale-95 transition-all" 
              href={`tel:${settings.directorPhone.replace(/\s+/g, '')}`}
            >
              Call Now
            </a>
          </div>

          <p className="text-[11px] text-[#99907c] text-center leading-relaxed">
            For immediate date hold inquiries, international flights clearance, or confidential guest lists, please contact Vikramaditya directly.
          </p>
        </div>
      </div>

      {/* Trust & Hospitality Guarantees */}
      <div className="px-4 sm:px-6 mt-8 mb-6">
        <div className="bg-[#1c1b1e] border border-[#4d4635]/40 rounded-xl p-5 flex flex-col gap-4 shadow-sm">
          <div className="text-center mb-1">
            <span className="font-sans-luxury text-[11px] font-bold text-[#d4c78f] tracking-widest uppercase">
              The Royal Commitment
            </span>
            <h4 className="font-serif-luxury text-xl text-[#e5e1e4] font-medium mt-0.5">
              Hospitality &amp; Artistry Standards
            </h4>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-lg bg-[#2a2a2c] border border-[#4d4635]/40 flex items-center justify-center flex-shrink-0 text-[#f2ca50]">
              <span className="material-symbols-outlined text-[20px]">handshake</span>
            </div>
            <div className="flex flex-col">
              <h5 className="text-xs sm:text-sm font-semibold text-[#e5e1e4]">Direct Artist Management</h5>
              <p className="text-xs text-[#d0c5af] leading-relaxed">
                Zero intermediary agency markups. You coordinate directly with the creative leaders who take the stage.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-lg bg-[#2a2a2c] border border-[#4d4635]/40 flex items-center justify-center flex-shrink-0 text-[#f2ca50]">
              <span className="material-symbols-outlined text-[20px]">security</span>
            </div>
            <div className="flex flex-col">
              <h5 className="text-xs sm:text-sm font-semibold text-[#e5e1e4]">Sound &amp; Artist Contingency Assured</h5>
              <p className="text-xs text-[#d0c5af] leading-relaxed">
                Redundant microphone links, backup instruments, and vetted standby virtuosos ensure an uninterrupted royal evening.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-lg bg-[#2a2a2c] border border-[#4d4635]/40 flex items-center justify-center flex-shrink-0 text-[#f2ca50]">
              <span className="material-symbols-outlined text-[20px]">lock</span>
            </div>
            <div className="flex flex-col">
              <h5 className="text-xs sm:text-sm font-semibold text-[#e5e1e4]">Strict Contractual Exclusivity</h5>
              <p className="text-xs text-[#d0c5af] leading-relaxed">
                We never double-book dates. Once your royal retainer is cleared, our ensemble is solely devoted to your event.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
