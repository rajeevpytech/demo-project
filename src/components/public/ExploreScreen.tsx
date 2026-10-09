import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';

export const ExploreScreen: React.FC = () => {
  const { 
    settings, 
    pages, 
    navigateTo, 
    playTrack, 
    audioTracks, 
    packages,
    cityHubs,
    setShowShowreelModal,
    activeDemoNotice,
    blogPosts 
  } = useCms();

  const [dateCheckValue, setDateCheckValue] = useState('2025-11-28');
  const [selectedDestination, setSelectedDestination] = useState('agra');
  const [showStatusPreview, setShowStatusPreview] = useState(false);

  // Check if home page has custom blocks from Visual Page Builder
  const homePage = pages.find(p => p.id === 'page-home');
  const heroBlock = homePage?.sections[0]?.blocks.find(b => b.type === 'hero');

  const heroTitle = heroBlock?.title || "Symphonies of Grandeur. Unrivaled Live Performance.";
  const heroSubtitle = heroBlock?.subtitle || "Crafting unforgettable musical memories for royal weddings, corporate events, and live celebrations across Agra, Mathura, Lucknow, and Jodhpur.";
  const heroImage = heroBlock?.imageUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuCddgIHrqFDssqCfud3_WvkQVIJut7OHepo7JZKpx03tYogGK5lmKIWdpchElaMr2SttOOOia2n4NFjNxhuVTR_ir0WscCh8xxjIzvdhpdXFwpDdwb77svmIhiSgwaxhmGgJC24IW4WUBuMAIn2VdmYCuk346YTCO529mSPAUHOgVGV265u4wV0Up4zkmVhWLzveBbEHFUF3Ae5TQxu_nSa7vaNwaYfv6OHamncjaV7hgiL134ssxAitQ";
  const heroBadge = heroBlock?.badge || "The Sovereign Stage • Est. 2012";

  const handleAudition = (trackIndex: number) => {
    if (audioTracks[trackIndex]) {
      playTrack(audioTracks[trackIndex]);
    }
  };

  return (
    <div className="flex flex-col w-full pb-28 selection:bg-[#d4af37] selection:text-[#131315]">
      {/* Demo Notification Banner if active */}
      {activeDemoNotice && (
        <div className="mx-4 sm:mx-6 mt-2 mb-4 p-3 rounded-xl bg-[#4f471b] border border-[#f2ca50] text-[#f1e3a9] text-xs font-medium flex items-center justify-between shadow-lg animate-pulse">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-[#f2ca50]">info</span>
            <span>{activeDemoNotice}</span>
          </div>
          <button 
            onClick={() => navigateTo('contact')} 
            className="underline font-bold text-white hover:text-[#f2ca50]"
          >
            Test Action
          </button>
        </div>
      )}

      {/* Cinematic Hero Stage */}
      <section className="relative w-full px-4 sm:px-6 pt-4 pb-8 flex flex-col items-center text-center max-w-4xl mx-auto">
        {/* Ambient Golden Stage Spotlight Glow */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-80 h-72 bg-gradient-to-b from-[#f2ca50]/20 via-[#d4af37]/10 to-transparent blur-3xl pointer-events-none -z-10 rounded-full"></div>

        {/* Crest Emblem Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2a2a2c]/80 backdrop-blur-md mb-4 shadow-[0_0_16px_rgba(212,175,55,0.12)] border border-[#4d4635]/50">
          <span className="material-symbols-outlined text-[#f2ca50] text-[16px]">stars</span>
          <span className="font-sans-luxury text-[11px] font-bold text-[#d4c78f] tracking-widest uppercase">
            {heroBadge}
          </span>
        </div>

        {/* Editorial Typography Title */}
        <h1 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-[#e5e1e4] tracking-tight mb-3 font-semibold leading-tight">
          {heroTitle.includes('.') ? (
            <>
              {heroTitle.split('.')[0]}.{' '}
              <span className="italic text-[#f2ca50] block mt-1">
                {heroTitle.split('.').slice(1).join('.').trim()}
              </span>
            </>
          ) : (
            heroTitle
          )}
        </h1>

        <p className="font-sans-luxury text-sm sm:text-base text-[#d0c5af] max-w-lg mb-6 leading-relaxed">
          {heroSubtitle}
        </p>

        {/* Dual CTAs */}
        <div className="w-full max-w-md flex flex-col sm:flex-row gap-3 mb-6">
          <button 
            onClick={() => navigateTo('contact')}
            className="h-12 w-full flex items-center justify-center gap-2 rounded bg-[#f2ca50] text-[#3c2f00] font-sans-luxury font-bold text-sm sm:text-base shadow-[0_0_24px_rgba(242,202,80,0.35)] active:scale-[0.98] hover:brightness-105 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">calendar_month</span>
            <span>Check Date Availability</span>
          </button>
          
          <button 
            onClick={() => setShowShowreelModal(true)}
            className="h-12 w-full flex items-center justify-center gap-2 rounded bg-[#2a2a2c]/80 hover:bg-[#353437] backdrop-blur-xl text-[#e5e1e4] hover:text-[#f2ca50] border border-[#4d4635]/60 font-sans-luxury font-semibold text-sm sm:text-base transition-all active:scale-[0.98] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[#f2ca50] text-[22px]">play_circle</span>
            <span>Watch 2025 Showreel</span>
          </button>
        </div>

        {/* Hero Photography Stage Showcase */}
        <div className="relative w-full rounded-xl overflow-hidden shadow-2xl bg-[#0e0e10] border border-[#4d4635]/40 group">
          <img 
            className="w-full h-56 sm:h-80 object-cover object-center filter brightness-95 group-hover:scale-102 transition-transform duration-700" 
            alt="The Royal Band Orchestra performing live in palace courtyard" 
            src={heroImage} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e10] via-[#0e0e10]/20 to-transparent"></div>

          {/* Live Status Pill Floating on Hero */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-[#2a2a2c]/90 backdrop-blur-md border border-[#4d4635]/50">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f2ca50] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#f2ca50]"></span>
              </span>
              <span className="font-sans-luxury text-[11px] font-bold text-[#e5e1e4] tracking-wider uppercase">
                LIVE DIARY: 2025-26
              </span>
            </div>
            <span className="font-sans-luxury text-xs text-[#f2ca50] font-semibold">
              18 Reserved This Month
            </span>
          </div>
        </div>
      </section>

      {/* Live Date Availability Quick Bar */}
      <section className="px-4 sm:px-6 mb-8 max-w-3xl mx-auto w-full" id="quick-availability">
        <div className="rounded-xl p-4 sm:p-5 bg-[#2a2a2c]/80 backdrop-blur-2xl border border-[#4d4635]/60 shadow-xl flex flex-col gap-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#f2ca50] text-[20px]">event_note</span>
              <span className="font-sans-luxury text-sm sm:text-base font-semibold text-[#e5e1e4]">
                Concierge Date Check
              </span>
            </div>
            <span className="px-2 py-0.5 rounded bg-[#4f471b]/60 text-[#f1e3a9] text-[10px] font-bold uppercase tracking-wider">
              Instant Sync
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Date Selector */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-semibold text-[#d0c5af] flex items-center gap-1 uppercase tracking-wider">
                <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                <span>Auspicious Wedding / Gala Date</span>
              </label>
              <input 
                className="w-full h-11 px-3.5 rounded bg-[#0e0e10] text-[#e5e1e4] text-xs sm:text-sm border border-[#4d4635] focus:outline-none focus:border-[#f2ca50] cursor-pointer" 
                type="date" 
                value={dateCheckValue}
                onChange={(e) => setDateCheckValue(e.target.value)}
              />
            </div>

            {/* City Dropdown */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-semibold text-[#d0c5af] flex items-center gap-1 uppercase tracking-wider">
                <span className="material-symbols-outlined text-[14px]">location_on</span>
                <span>Royal Destination</span>
              </label>
              <div className="relative">
                <select 
                  className="w-full h-11 px-3.5 rounded bg-[#0e0e10] text-[#e5e1e4] text-xs sm:text-sm border border-[#4d4635] focus:outline-none focus:border-[#f2ca50] appearance-none pr-9 cursor-pointer"
                  value={selectedDestination}
                  onChange={(e) => setSelectedDestination(e.target.value)}
                >
                  <option value="agra">Agra (ITC Mughal & Heritage Venues)</option>
                  <option value="mathura">Mathura (Spiritual Sufi & Heritage Celebrations)</option>
                  <option value="lucknow">Lucknow (Taj Mahal Lucknow & Nawabi Banquets)</option>
                  <option value="jodhpur">Jodhpur (Umaid Bhawan & Mehrangarh Fort)</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-3 text-[#d0c5af] pointer-events-none text-[20px]">
                  expand_more
                </span>
              </div>
            </div>
          </div>

          {/* Live Status Trigger */}
          <button 
            className="h-11 w-full flex items-center justify-center gap-2 rounded bg-[#d4af37] text-[#131315] font-sans-luxury text-sm font-bold tracking-wide shadow-md hover:brightness-105 active:scale-95 transition-all cursor-pointer" 
            onClick={() => setShowStatusPreview(true)} 
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span>Check Live Status</span>
          </button>

          {/* Dynamic Response Box */}
          {showStatusPreview && (
            <div className="flex items-center justify-between p-3.5 rounded bg-[#0e0e10] border border-[#f2ca50]/50 transition-all animate-in fade-in">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#f2ca50] text-[22px]">check_circle</span>
                <div className="flex flex-col">
                  <span className="text-xs sm:text-sm font-bold text-[#f2ca50] leading-tight">
                    Master Lineup Available for {dateCheckValue}
                  </span>
                  <span className="text-[11px] text-[#d0c5af]">
                    Selected Slot: Prime Auspicious Evening in {selectedDestination.toUpperCase()}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => navigateTo('contact')}
                className="px-3 py-1.5 rounded bg-[#f2ca50] text-[#3c2f00] text-xs font-bold uppercase tracking-wider hover:brightness-110 cursor-pointer"
              >
                Lock Date
              </button>
            </div>
          )}
        </div>
      </section>

      {/* The Royal Standard Metrics Counter */}
      <section className="px-4 sm:px-6 mb-10 max-w-4xl mx-auto w-full">
        <div className="text-center mb-4">
          <span className="font-sans-luxury text-[11px] font-bold text-[#f2ca50] tracking-widest uppercase">
            Unrivaled Benchmark
          </span>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[#e5e1e4] font-medium mt-0.5">
            The Royal Standard
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
          {/* Metric 1 */}
          <div className="p-4 rounded-xl bg-[#1c1b1e] border border-[#4d4635]/40 flex flex-col items-center text-center shadow-sm">
            <div className="w-10 h-10 rounded-full bg-[#4f471b]/40 flex items-center justify-center text-[#f2ca50] mb-2">
              <span className="material-symbols-outlined text-[20px]">military_tech</span>
            </div>
            <span className="font-serif-luxury text-2xl sm:text-3xl text-[#f2ca50] font-semibold leading-none mb-1">12+</span>
            <span className="text-xs sm:text-sm font-semibold text-[#e5e1e4]">Years of Opulence</span>
            <span className="text-[11px] text-[#d0c5af] mt-0.5">Heritage mastery</span>
          </div>

          {/* Metric 2 */}
          <div className="p-4 rounded-xl bg-[#1c1b1e] border border-[#4d4635]/40 flex flex-col items-center text-center shadow-sm">
            <div className="w-10 h-10 rounded-full bg-[#4f471b]/40 flex items-center justify-center text-[#f2ca50] mb-2">
              <span className="material-symbols-outlined text-[20px]">celebration</span>
            </div>
            <span className="font-serif-luxury text-2xl sm:text-3xl text-[#f2ca50] font-semibold leading-none mb-1">850+</span>
            <span className="text-xs sm:text-sm font-semibold text-[#e5e1e4]">Grand Weddings</span>
            <span className="text-[11px] text-[#d0c5af] mt-0.5">Palace & global galas</span>
          </div>

          {/* Metric 3 */}
          <div className="p-4 rounded-xl bg-[#1c1b1e] border border-[#4d4635]/40 flex flex-col items-center text-center shadow-sm">
            <div className="w-10 h-10 rounded-full bg-[#4f471b]/40 flex items-center justify-center text-[#f2ca50] mb-2">
              <span className="material-symbols-outlined text-[20px]">groups</span>
            </div>
            <span className="font-serif-luxury text-2xl sm:text-3xl text-[#f2ca50] font-semibold leading-none mb-1">40+</span>
            <span className="text-xs sm:text-sm font-semibold text-[#e5e1e4]">Renowned Virtuosos</span>
            <span className="text-[11px] text-[#d0c5af] mt-0.5">Vocalists & brass legends</span>
          </div>

          {/* Metric 4 */}
          <div className="p-4 rounded-xl bg-[#1c1b1e] border border-[#4d4635]/40 flex flex-col items-center text-center shadow-sm">
            <div className="w-10 h-10 rounded-full bg-[#4f471b]/40 flex items-center justify-center text-[#f2ca50] mb-2">
              <span className="material-symbols-outlined text-[20px]">star</span>
            </div>
            <span className="font-serif-luxury text-2xl sm:text-3xl text-[#f2ca50] font-semibold leading-none mb-1">4.98★</span>
            <span className="text-xs sm:text-sm font-semibold text-[#e5e1e4]">Elite Rating</span>
            <span className="text-[11px] text-[#d0c5af] mt-0.5">VVIP clientele reviews</span>
          </div>
        </div>
      </section>

      {/* Featured Performance Lineups */}
      <section className="w-full mb-10 max-w-4xl mx-auto">
        <div className="px-4 sm:px-6 flex items-end justify-between mb-4">
          <div>
            <span className="font-sans-luxury text-[11px] font-bold text-[#f2ca50] tracking-widest uppercase">
              Master Ensembles
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[#e5e1e4] font-medium">
              Curated Lineups
            </h2>
          </div>
          <button 
            onClick={() => navigateTo('service1')}
            className="text-xs font-bold text-[#f2ca50] flex items-center gap-1 hover:underline cursor-pointer uppercase tracking-wider"
          >
            <span>All Sets</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>

        {/* Horizontal Swipe Carousel */}
        <div className="flex gap-4 overflow-x-auto px-4 sm:px-6 pb-3 scroll-smooth no-scrollbar snap-x snap-mandatory">
          {/* Lineup 1 */}
          <div className="snap-start flex-shrink-0 w-[290px] rounded-xl bg-[#2a2a2c]/90 border border-[#4d4635]/40 overflow-hidden flex flex-col shadow-lg">
            <div className="relative h-44 w-full bg-[#0e0e10]">
              <img 
                className="w-full h-full object-cover" 
                alt="Royal Symphony & Sufi Ensemble" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDX_GiHsBACg38pLhfX-IS4KQoY04inXY893P5URjaiqXRp5FeAjBI4OcbEgc77a0T0P_2nZspydyNdnKB811Xq3iBnfSK2qaiOzr9ROU7oPgiBSkZBZqkxcZxx2viir7HuD1E-C2WOMvAoS_PXTJtS2ZfkSNBOn3t2jtGu81iSxutange6GGpjk_bmpTZo0M6SVEri34dnyF9xqK6wUKmX_NQtR0O_8RjHkYsr2KJWilRFdOZ1INXzRw" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2a2a2c] via-transparent to-transparent"></div>
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#4f471b] text-[#f1e3a9] text-[10px] font-bold uppercase tracking-wider shadow">
                Signature Tier
              </span>
            </div>
            <div className="p-4 flex flex-col flex-1 justify-between gap-3">
              <div>
                <h3 className="font-serif-luxury text-base font-semibold text-[#e5e1e4] mb-1">
                  Royal Symphony & Sufi Ensemble
                </h3>
                <p className="text-xs text-[#d0c5af] line-clamp-2 leading-relaxed">
                  10-piece orchestra, sitar masters, emotive live violins, and authentic sufi rock vocalists delivering soul-stirring climaxes.
                </p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-[#353437]">
                <span className="text-[11px] text-[#d4c78f] font-medium">Baraat & Sangeet Gala</span>
                <button 
                  onClick={() => handleAudition(0)}
                  className="h-8 px-3 rounded bg-[#f2ca50] text-[#3c2f00] text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 active:scale-95 transition-all hover:brightness-105 cursor-pointer"
                >
                  <span>Audition</span>
                  <span className="material-symbols-outlined text-[15px]">volume_up</span>
                </button>
              </div>
            </div>
          </div>

          {/* Lineup 2 */}
          <div className="snap-start flex-shrink-0 w-[290px] rounded-xl bg-[#2a2a2c]/90 border border-[#4d4635]/40 overflow-hidden flex flex-col shadow-lg">
            <div className="relative h-44 w-full bg-[#0e0e10]">
              <img 
                className="w-full h-full object-cover" 
                alt="Grand Bollywood Brass & Live Band" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRi7xSqsAMWZmRbNm0EG2ZyNwOm6DlqAnf7Zr0DsxA1bWR6Wv0FacGRYMsPtSHeXfqbTbPx-FSDHPLCSqiJwDwfoHklDo58pZTFVbrvtIoligHH8mHjLrV9SacriB1pwpOoqwcco1a6JYCLoIWVKm2ptJopApcAYGvOAS-D-XGObhyxrbkJKBg7AaZBL06IvX-JUTjy-fxL_pOcVZBEWibKKqvoQ7gJ6yN_BGvMQXTB9qjRmk1_YhgAg" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2a2a2c] via-transparent to-transparent"></div>
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#d4af37] text-[#131315] text-[10px] font-bold uppercase tracking-wider shadow">
                Celebration High
              </span>
            </div>
            <div className="p-4 flex flex-col flex-1 justify-between gap-3">
              <div>
                <h3 className="font-serif-luxury text-base font-semibold text-[#e5e1e4] mb-1">
                  Grand Bollywood Brass & Live Band
                </h3>
                <p className="text-xs text-[#d0c5af] line-clamp-2 leading-relaxed">
                  Electrifying dance-floor anthems, live saxophone solos, full brass fanfare section, and high-octane percussion.
                </p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-[#353437]">
                <span className="text-[11px] text-[#d4c78f] font-medium">Cocktails & After-Party</span>
                <button 
                  onClick={() => handleAudition(5)}
                  className="h-8 px-3 rounded bg-[#f2ca50] text-[#3c2f00] text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 active:scale-95 transition-all hover:brightness-105 cursor-pointer"
                >
                  <span>Audition</span>
                  <span className="material-symbols-outlined text-[15px]">volume_up</span>
                </button>
              </div>
            </div>
          </div>

          {/* Lineup 3 */}
          <div className="snap-start flex-shrink-0 w-[290px] rounded-xl bg-[#2a2a2c]/90 border border-[#4d4635]/40 overflow-hidden flex flex-col shadow-lg">
            <div className="relative h-44 w-full bg-[#0e0e10]">
              <img 
                className="w-full h-full object-cover" 
                alt="Acoustic Sunset Jazz Quintet" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuARb9eDXNe_VYfETUwIIcdxk7nv7ayEOKBiSPdoDBS6HjLC3JRSRROawnSn-UKLIzaXi2EtdKKE2XvnBVnK-hsBG1Yn8o4HHSwQx9t4wqzsGl8V7NLdjNTLcGFSO8BhWfoa_0gnNyInQFFFkOpX9-6JgMWeIpgmkAsEhBsp8eLAFOkrXy_rzHl1GVL2yG5SuStvu6RTVMjNFNPor1s5-9WXhJg677EbrlcGsZ77g3FtUPHbcYKKPeruIg" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2a2a2c] via-transparent to-transparent"></div>
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#353437] text-[#d0c5af] text-[10px] font-bold uppercase tracking-wider shadow">
                Intimate Luxe
              </span>
            </div>
            <div className="p-4 flex flex-col flex-1 justify-between gap-3">
              <div>
                <h3 className="font-serif-luxury text-base font-semibold text-[#e5e1e4] mb-1">
                  Acoustic Sunset Jazz Quintet
                </h3>
                <p className="text-xs text-[#d0c5af] line-clamp-2 leading-relaxed">
                  Smooth timeless standards, warm velvet vocals, and double bass for sunset high teas and champagne dinners.
                </p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-[#353437]">
                <span className="text-[11px] text-[#d4c78f] font-medium">Welcome Reception</span>
                <button 
                  onClick={() => handleAudition(3)}
                  className="h-8 px-3 rounded bg-[#f2ca50] text-[#3c2f00] text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 active:scale-95 transition-all hover:brightness-105 cursor-pointer"
                >
                  <span>Audition</span>
                  <span className="material-symbols-outlined text-[15px]">volume_up</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The 4 Stationed Service Cities (Agra, Mathura, Lucknow, Jodhpur) */}
      <section className="px-4 sm:px-6 mb-10 max-w-4xl mx-auto w-full">
        <div className="flex items-end justify-between mb-4">
          <div>
            <span className="font-sans-luxury text-[11px] font-bold text-[#f2ca50] tracking-widest uppercase">
              Service 2 — Stations
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[#e5e1e4] font-medium">
              The 4 Service Cities
            </h2>
          </div>
          <button 
            onClick={() => navigateTo('service2')}
            className="text-xs font-bold text-[#f2ca50] flex items-center gap-1 hover:underline cursor-pointer uppercase tracking-wider"
          >
            <span>View All Hubs</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {cityHubs.map((city) => (
            <div
              key={city.id}
              onClick={() => navigateTo('service2', city.seo?.slug || city.name.toLowerCase())}
              className="p-4 rounded-xl bg-[#1c1b1e] border border-[#4d4635]/40 hover:border-[#f2ca50]/70 cursor-pointer transition-all hover:-translate-y-0.5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-bold text-[#f2ca50] font-serif-luxury text-base">{city.name}</span>
                  <span className="text-[10px] text-[#d4c78f] bg-[#2a2a2c] px-2 py-0.5 rounded font-mono">{city.state}</span>
                </div>
                <p className="text-[11px] text-[#d0c5af] leading-relaxed line-clamp-2">
                  {city.tagline}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-[#353437] flex items-center justify-between text-[11px] text-[#f2ca50] font-semibold">
                <span>{city.readinessTime}</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Performance Packages Highlight */}
      <section className="px-4 sm:px-6 mb-10 max-w-4xl mx-auto w-full">
        <div className="flex items-end justify-between mb-4">
          <div>
            <span className="font-sans-luxury text-[11px] font-bold text-[#f2ca50] tracking-widest uppercase">
              Curated Formats
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[#e5e1e4] font-medium">
              Performance Packages
            </h2>
          </div>
          <button 
            onClick={() => navigateTo('service1')}
            className="text-xs font-bold text-[#f2ca50] flex items-center gap-1 hover:underline cursor-pointer uppercase tracking-wider"
          >
            <span>All Packages</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {packages.filter(p => p.isEnabled !== false).map((pkg) => (
            <div
              key={pkg.id}
              onClick={() => navigateTo('service1')}
              className={`p-4 rounded-xl border flex flex-col justify-between cursor-pointer transition-all hover:-translate-y-0.5 ${
                pkg.isRecommended 
                  ? 'bg-gradient-to-b from-[#25221b] to-[#1c1b1e] border-[#f2ca50]/70' 
                  : 'bg-[#1c1b1e] border-[#4d4635]/40 hover:border-[#f2ca50]/60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-[10px] text-[#d4c78f] uppercase font-bold mb-1">
                  <span>{pkg.durationLabel}</span>
                  {pkg.highlightBadge && (
                    <span className="text-[#f2ca50]">{pkg.highlightBadge}</span>
                  )}
                </div>
                <h3 className="font-serif-luxury text-sm font-bold text-white mb-1">{pkg.name}</h3>
                <p className="text-[11px] text-[#d0c5af] line-clamp-2 leading-relaxed">{pkg.subtitle}</p>
              </div>

              <div className="mt-3 pt-2 border-t border-[#353437] flex items-center justify-between text-xs">
                <span className="text-[#f1e3a9] font-semibold text-[11px]">Request Quote</span>
                <span className="text-[#f2ca50] font-bold flex items-center gap-0.5">
                  Enquire <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Client Acclaim & Testimonial Quote Card */}
      <section className="px-4 sm:px-6 mb-10 max-w-3xl mx-auto w-full">
        <div className="relative p-6 rounded-xl bg-[#1c1b1e] border border-[#4d4635]/40 shadow-xl overflow-hidden">
          {/* Decorative Quote Icon Backdrop */}
          <div className="absolute -right-6 -bottom-6 text-[#2a2a2c] opacity-50 select-none pointer-events-none">
            <span className="material-symbols-outlined text-[140px]">format_quote</span>
          </div>

          <div className="relative z-10 flex flex-col gap-3">
            <div className="flex items-center gap-1 text-[#f2ca50]">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="material-symbols-outlined text-[18px]">star</span>
              ))}
              <span className="text-xs text-[#d0c5af] ml-2">Umaid Bhawan Palace, Jodhpur</span>
            </div>

            <blockquote className="font-serif-luxury text-base sm:text-lg text-[#e5e1e4] italic leading-snug">
              “The Royal Band turned our Umaid Bhawan wedding into an ethereal musical spectacle. Guests are still talking about the 10-piece Sufi crescendo.”
            </blockquote>

            <div className="flex items-center gap-3 pt-2">
              <div className="w-10 h-10 rounded-full bg-[#353437] border border-[#f2ca50]/40 flex items-center justify-center text-[#f2ca50] font-sans-luxury text-sm font-bold">
                DS
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-[#e5e1e4]">
                  Dev & Radhika Singhania
                </span>
                <span className="text-xs text-[#d0c5af]">
                  Royal Wedding Celebrations • Winter 2024
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* From the Sovereign Editorial & Acoustic Insights */}
      <section className="px-4 sm:px-6 mb-10 max-w-3xl mx-auto w-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#f2ca50] text-[20px]">menu_book</span>
            <h2 className="font-serif-luxury text-lg sm:text-xl font-bold text-[#e5e1e4]">
              The Sovereign Editorial
            </h2>
          </div>
          <button
            onClick={() => navigateTo('blog')}
            className="text-xs font-bold text-[#f2ca50] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Read All Articles</span>
            <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {blogPosts.slice(0, 2).map((post) => (
            <div
              key={post.id}
              onClick={() => navigateTo('blog')}
              className="rounded-xl bg-[#1c1b1e] border border-[#4d4635]/40 overflow-hidden shadow-lg cursor-pointer group hover:border-[#f2ca50]/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-video w-full bg-[#0e0e10] overflow-hidden">
                  <img
                    src={post.coverImage}
                    alt={post.coverImageAlt || post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1c1b1e] via-transparent to-transparent"></div>
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#0e0e10]/80 text-[10px] font-bold text-[#f2ca50] uppercase">
                    {post.category}
                  </span>
                  <span className="absolute bottom-2 right-2 text-[10px] text-[#f1e3a9] bg-[#0e0e10]/80 px-2 py-0.5 rounded">
                    ⏱️ {post.readingTimeMinutes || 5} min read
                  </span>
                </div>
                <div className="p-4 space-y-1.5">
                  <h3 className="font-serif-luxury text-sm font-bold text-white group-hover:text-[#f2ca50] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-[#d0c5af] line-clamp-2">
                    {post.summary}
                  </p>
                </div>
              </div>
              <div className="p-3 bg-[#141418] border-t border-[#353437] flex items-center justify-between text-[11px] text-[#99907c]">
                <span>By {post.authorName}</span>
                <span className="text-[#f2ca50] font-semibold flex items-center gap-0.5">
                  Read <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* VIP Concierge Direct Contact Floating Card */}
      <section className="px-4 sm:px-6 mb-8 max-w-3xl mx-auto w-full">
        <div className="p-5 rounded-xl bg-[#2a2a2c] border border-[#4d4635]/60 shadow-2xl flex flex-col gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-full bg-[#4f471b] text-[#f2ca50] flex items-center justify-center flex-shrink-0 shadow-[0_0_12px_rgba(212,175,55,0.2)]">
              <span className="material-symbols-outlined text-[28px]">support_agent</span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-bold text-[#e5e1e4]">
                  VIP Concierge Desk
                </span>
                <span className="w-2 h-2 rounded-full bg-[#f2ca50] animate-pulse"></span>
              </div>
              <p className="text-xs text-[#d0c5af] mt-0.5 leading-relaxed">
                Discuss customized orchestrations, celebrity guest vocalists, and private aircraft logistics.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {/* Direct Instant WhatsApp Chat */}
            <a 
              className="h-11 flex items-center justify-center gap-1.5 rounded bg-[#0e0e10] hover:bg-[#1c1b1e] border border-[#4d4635] text-[#e5e1e4] hover:text-[#f2ca50] text-xs sm:text-sm font-semibold active:scale-95 transition-all" 
              href={`https://wa.me/${settings.whatsAppPhone.replace(/\D/g, '')}?text=Greetings%20The%20Royal%20Band,%20I%20would%20like%20to%20inquire%20about%20booking%20an%20exclusive%20performance.`}
              target="_blank" 
              rel="noopener noreferrer"
            >
              <span className="material-symbols-outlined text-[20px] text-[#f9dfb3]">forum</span>
              <span>WhatsApp Line</span>
            </a>

            {/* Priority Call */}
            <a 
              className="h-11 flex items-center justify-center gap-1.5 rounded bg-[#f2ca50] text-[#3c2f00] text-xs sm:text-sm font-bold shadow-md hover:brightness-105 active:scale-95 transition-all" 
              href={`tel:${settings.directorPhone.replace(/\s+/g, '')}`}
            >
              <span className="material-symbols-outlined text-[20px]">call</span>
              <span>Direct Priority</span>
            </a>
          </div>
        </div>
      </section>

      {/* Verified Live Entertainment Entity Footer */}
      <section className="px-4 sm:px-6 max-w-3xl mx-auto w-full">
        <div className="p-4 rounded-lg bg-[#0e0e10] border border-[#4d4635]/30 flex flex-col gap-2 text-center items-center">
          <div className="flex items-center gap-2 text-[#f2ca50]">
            <span className="material-symbols-outlined text-[18px]">verified_user</span>
            <span className="font-sans-luxury text-[11px] font-bold tracking-wider uppercase">
              Verified Live Entertainment Entity
            </span>
          </div>
          <p className="text-xs text-[#d0c5af] leading-relaxed max-w-sm">
            Registered for high-profile destination wedding ensembles, palace events, and international galas across Agra, Mathura, Lucknow, Jodhpur, Jaipur & Global Venues.
          </p>
          <div className="flex items-center gap-3 text-[#99907c] text-[11px] pt-1">
            <span>© 2025–2026 {settings.brandName}</span>
            <span>•</span>
            <span>ISO Certified Sound Production</span>
          </div>
        </div>
      </section>
    </div>
  );
};
