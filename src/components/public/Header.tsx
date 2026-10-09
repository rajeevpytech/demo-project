import React, { useState, useRef, useEffect } from 'react';
import { useCms } from '../../context/CmsContext';

export const Header: React.FC = () => {
  const { 
    settings, 
    activePublicTab, 
    activeServiceSlug,
    activeLocationSlug,
    navigateTo, 
    setIsAdminMode, 
    isAdminMode, 
    currentUser,
    leads 
  } = useCms();

  const [openDropdown, setOpenDropdown] = useState<'service1' | 'service2' | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileService1Open, setMobileService1Open] = useState(false);
  const [mobileService2Open, setMobileService2Open] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on tab change
  const handleNav = (tab: any, slug?: string) => {
    navigateTo(tab, slug);
    setOpenDropdown(null);
    setMobileMenuOpen(false);
  };

  const service1Items = [
    { label: 'Wedding Performances', slug: 'wedding-performances' },
    { label: 'Corporate Events', slug: 'corporate-events' },
    { label: 'Private Parties', slug: 'private-parties' },
    { label: 'Club / Lounge Gigs', slug: 'club-lounge-gigs' },
    { label: 'College Fests & Festivals', slug: 'college-fests-festivals' },
    { label: 'Destination Weddings', slug: 'destination-weddings' },
  ];

  const service2Cities = [
    { label: 'Agra', slug: 'agra' },
    { label: 'Mathura', slug: 'mathura' },
    { label: 'Lucknow', slug: 'lucknow' },
    { label: 'Jodhpur', slug: 'jodhpur' },
  ];

  const isService1Active = activePublicTab === 'service1' || activePublicTab === 'services';
  const isService2Active = activePublicTab === 'service2';
  const pendingLeadsCount = leads.filter(l => l.status === 'new').length;

  return (
    <header className="fixed top-0 w-full z-50 pt-[env(safe-area-inset-top,0px)] bg-[#131315]/95 backdrop-blur-xl border-b border-[#4d4635]/35 shadow-[0_4px_24px_rgba(0,0,0,0.7)]">
      <div className="h-20 max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-3">
        {/* Left: Brand Emblem & Title */}
        <div 
          className="flex items-center gap-3 min-w-0 cursor-pointer select-none flex-shrink-0"
          onClick={() => handleNav('home')}
        >
          <img 
            alt="The Royal Band Emblem" 
            className="h-8 sm:h-9 w-auto object-contain flex-shrink-0 drop-shadow-[0_0_8px_rgba(242,202,80,0.35)]" 
            src={settings.logoUrl} 
          />
          <div className="flex flex-col min-w-0">
            <span className="font-serif-luxury text-base sm:text-lg tracking-tight text-[#f2ca50] truncate leading-none font-semibold">
              {settings.brandName}
            </span>
            <span className="font-sans-luxury text-[10px] uppercase tracking-[0.18em] text-[#d0c5af] truncate opacity-90 mt-1 font-semibold">
              Symphonies of Grandeur
            </span>
          </div>
        </div>

        {/* Center: EXACT 7 MAIN MENUS (Desktop) */}
        <nav 
          ref={dropdownRef}
          aria-label="Main Website Navigation" 
          className="hidden xl:flex items-center gap-1 bg-[#1c1b1e]/75 px-3 py-1.5 rounded-full border border-[#4d4635]/45 text-[13px] font-semibold text-[#d0c5af] shadow-inner"
        >
          {/* 1. Home */}
          <button
            onClick={() => handleNav('home')}
            className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
              activePublicTab === 'home' || activePublicTab === 'explore' 
                ? 'bg-[#f2ca50] text-[#3c2f00] font-bold shadow-sm' 
                : 'hover:text-[#f2ca50] hover:bg-[#2a2a2c]/60'
            }`}
          >
            Home
          </button>

          {/* 2. About */}
          <button
            onClick={() => handleNav('about')}
            className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
              activePublicTab === 'about' 
                ? 'bg-[#f2ca50] text-[#3c2f00] font-bold shadow-sm' 
                : 'hover:text-[#f2ca50] hover:bg-[#2a2a2c]/60'
            }`}
          >
            About
          </button>

          {/* 3. Service 1 / Event (Dropdown) */}
          <div className="relative">
            <button
              onClick={() => setOpenDropdown(openDropdown === 'service1' ? null : 'service1')}
              onMouseEnter={() => setOpenDropdown('service1')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer flex items-center gap-1 ${
                isService1Active 
                  ? 'bg-[#f2ca50] text-[#3c2f00] font-bold shadow-sm' 
                  : 'hover:text-[#f2ca50] hover:bg-[#2a2a2c]/60'
              }`}
            >
              <span>Service 1 / Event</span>
              <span className={`material-symbols-outlined text-[15px] transition-transform ${openDropdown === 'service1' ? 'rotate-180' : ''}`}>
                arrow_drop_down
              </span>
            </button>

            {/* Service 1 Dropdown Menu */}
            {openDropdown === 'service1' && (
              <div 
                onMouseLeave={() => setOpenDropdown(null)}
                className="absolute left-0 top-full mt-2 w-64 bg-[#1c1b1e] border border-[#4d4635] rounded-xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2"
              >
                <div 
                  onClick={() => handleNav('service1')}
                  className="px-3 py-2 rounded-lg text-xs font-bold text-[#f2ca50] hover:bg-[#2a2a2c] cursor-pointer flex items-center justify-between border-b border-[#353437] mb-1"
                >
                  <span>All Events Overview</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </div>
                <div className="space-y-0.5">
                  {service1Items.map((item) => {
                    const isSelected = isService1Active && activeServiceSlug === item.slug;
                    return (
                      <button
                        key={item.slug}
                        onClick={() => handleNav('service1', item.slug)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#2a2a2c] text-[#f2ca50] font-bold'
                            : 'text-[#e5e1e4] hover:bg-[#2a2a2c] hover:text-[#f2ca50]'
                        }`}
                      >
                        <span>{item.label}</span>
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#f2ca50]"></span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* 4. Blog */}
          <button
            onClick={() => handleNav('blog')}
            className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
              activePublicTab === 'blog' 
                ? 'bg-[#f2ca50] text-[#3c2f00] font-bold shadow-sm' 
                : 'hover:text-[#f2ca50] hover:bg-[#2a2a2c]/60'
            }`}
          >
            Blog
          </button>

          {/* 5. Service 2 (Location Dropdown) */}
          <div className="relative">
            <button
              onClick={() => setOpenDropdown(openDropdown === 'service2' ? null : 'service2')}
              onMouseEnter={() => setOpenDropdown('service2')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer flex items-center gap-1 ${
                isService2Active 
                  ? 'bg-[#f2ca50] text-[#3c2f00] font-bold shadow-sm' 
                  : 'hover:text-[#f2ca50] hover:bg-[#2a2a2c]/60'
              }`}
            >
              <span>Service 2</span>
              <span className={`material-symbols-outlined text-[15px] transition-transform ${openDropdown === 'service2' ? 'rotate-180' : ''}`}>
                arrow_drop_down
              </span>
            </button>

            {/* Service 2 Dropdown Menu */}
            {openDropdown === 'service2' && (
              <div 
                onMouseLeave={() => setOpenDropdown(null)}
                className="absolute left-0 top-full mt-2 w-56 bg-[#1c1b1e] border border-[#4d4635] rounded-xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2"
              >
                <div 
                  onClick={() => handleNav('service2')}
                  className="px-3 py-2 rounded-lg text-xs font-bold text-[#f2ca50] hover:bg-[#2a2a2c] cursor-pointer flex items-center justify-between border-b border-[#353437] mb-1"
                >
                  <span>All 4 Stationed Hubs</span>
                  <span className="material-symbols-outlined text-[14px]">location_on</span>
                </div>
                <div className="space-y-0.5">
                  {service2Cities.map((city) => {
                    const isSelected = isService2Active && activeLocationSlug === city.slug;
                    return (
                      <button
                        key={city.slug}
                        onClick={() => handleNav('service2', city.slug)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#2a2a2c] text-[#f2ca50] font-bold'
                            : 'text-[#e5e1e4] hover:bg-[#2a2a2c] hover:text-[#f2ca50]'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[14px] text-[#d4c78f]">location_city</span>
                          {city.label}
                        </span>
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#f2ca50]"></span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* 6. Gallery */}
          <button
            onClick={() => handleNav('gallery')}
            className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
              activePublicTab === 'gallery' || activePublicTab === 'reels' 
                ? 'bg-[#f2ca50] text-[#3c2f00] font-bold shadow-sm' 
                : 'hover:text-[#f2ca50] hover:bg-[#2a2a2c]/60'
            }`}
          >
            Gallery
          </button>

          {/* 7. Contact Us */}
          <button
            onClick={() => handleNav('contact')}
            className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
              activePublicTab === 'contact' || activePublicTab === 'book' || activePublicTab === 'vip-line' 
                ? 'bg-[#f2ca50] text-[#3c2f00] font-bold shadow-sm' 
                : 'hover:text-[#f2ca50] hover:bg-[#2a2a2c]/60'
            }`}
          >
            Contact Us
          </button>
        </nav>

        {/* Right: Quick Action CTAs & Admin Switcher */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Direct Call / Inquire Button */}
          <a 
            aria-label="Direct Telephone Inquiry" 
            className="h-9 px-3 flex items-center gap-1.5 rounded-lg bg-[#2a2a2c]/80 hover:bg-[#353437] transition-all text-[#f2ca50] border border-[#4d4635]/40 text-xs font-bold" 
            href={`tel:${settings.phone.replace(/\s+/g, '')}`}
          >
            <span className="material-symbols-outlined text-[17px]">call</span>
            <span className="hidden sm:inline">Call Maestro</span>
          </a>

          {/* Direct WhatsApp Concierge Button */}
          <a
            aria-label="Direct WhatsApp Concierge"
            target="_blank"
            rel="noopener noreferrer"
            href={`https://wa.me/91${settings.whatsAppPhone.replace(/\D/g, '')}?text=Greetings%20from%20The%20Royal%20Band%20official%20website.%20I%20would%20like%20to%20enquire%20about%20booking%20live%20performance%20dates.`}
            className="h-9 px-3 flex items-center gap-1.5 rounded-lg bg-[#25d366]/20 hover:bg-[#25d366]/30 text-[#25d366] border border-[#25d366]/40 text-xs font-bold transition-all"
          >
            <span className="material-symbols-outlined text-[17px]">chat</span>
            <span className="hidden sm:inline">WhatsApp</span>
          </a>

          {/* Admin vs Public Mode Switcher Button */}
          <button
            onClick={() => setIsAdminMode(!isAdminMode)}
            className={`h-9 px-2.5 sm:px-3 flex items-center gap-1.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all ${
              isAdminMode 
                ? 'bg-[#d4af37] text-[#131315] shadow-[0_0_16px_rgba(212,175,55,0.4)]'
                : 'bg-[#2a2a2c] hover:bg-[#353437] text-[#d4c78f] border border-[#4d4635]'
            }`}
            title="Switch between Public Site & CMS Admin"
          >
            <span className="material-symbols-outlined text-[16px]">
              {isAdminMode ? 'public' : 'admin_panel_settings'}
            </span>
            <span className="hidden lg:inline">
              {isAdminMode ? 'Public Site' : 'CMS Admin'}
            </span>
            {pendingLeadsCount > 0 && !isAdminMode && (
              <span className="w-2 h-2 rounded-full bg-[#f2ca50] animate-ping ml-0.5"></span>
            )}
          </button>

          {/* Mobile Hamburger Menu Button (lg and below) */}
          <button 
            aria-label="Toggle Navigation Menu" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden w-9 h-9 flex items-center justify-center rounded-lg bg-[#2a2a2c] text-[#e5e1e4] border border-[#4d4635]/50 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[22px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* MOBILE RESPONSIVE ACCORDION MENU */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-[#353437] bg-[#141418] px-4 py-4 space-y-1.5 animate-in slide-in-from-top-2 shadow-2xl max-h-[calc(100vh-80px)] overflow-y-auto">
          {/* 1. Home */}
          <button
            onClick={() => handleNav('home')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between ${
              activePublicTab === 'home' || activePublicTab === 'explore'
                ? 'bg-[#f2ca50] text-[#3c2f00] font-bold'
                : 'text-[#e5e1e4] hover:bg-[#201f22]'
            }`}
          >
            <span>1. Home</span>
            <span className="material-symbols-outlined text-[18px]">home</span>
          </button>

          {/* 2. About */}
          <button
            onClick={() => handleNav('about')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between ${
              activePublicTab === 'about'
                ? 'bg-[#f2ca50] text-[#3c2f00] font-bold'
                : 'text-[#e5e1e4] hover:bg-[#201f22]'
            }`}
          >
            <span>2. About</span>
            <span className="material-symbols-outlined text-[18px]">info</span>
          </button>

          {/* 3. Service 1 / Event (Accordion) */}
          <div className="rounded-xl bg-[#1c1b1e] border border-[#4d4635]/40 overflow-hidden">
            <button
              onClick={() => setMobileService1Open(!mobileService1Open)}
              className="w-full text-left px-3.5 py-2.5 text-sm font-semibold flex items-center justify-between text-[#e5e1e4]"
            >
              <div className="flex items-center gap-2">
                <span className={isService1Active ? 'text-[#f2ca50] font-bold' : ''}>3. Service 1 / Event</span>
                <span className="text-[10px] bg-[#2a2a2c] text-[#d4c78f] px-2 py-0.5 rounded-full font-mono">6 Events</span>
              </div>
              <span className={`material-symbols-outlined text-[18px] transition-transform ${mobileService1Open ? 'rotate-180 text-[#f2ca50]' : ''}`}>
                expand_more
              </span>
            </button>

            {mobileService1Open && (
              <div className="p-2 border-t border-[#353437] space-y-1 bg-[#161518]">
                <button
                  onClick={() => handleNav('service1')}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold text-[#f2ca50] hover:bg-[#201f22] flex items-center justify-between"
                >
                  <span>Overview &amp; Packages</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </button>
                {service1Items.map((item) => (
                  <button
                    key={item.slug}
                    onClick={() => handleNav('service1', item.slug)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium ${
                      isService1Active && activeServiceSlug === item.slug
                        ? 'bg-[#2a2a2c] text-[#f2ca50] font-bold'
                        : 'text-[#d0c5af] hover:bg-[#201f22] hover:text-white'
                    }`}
                  >
                    &bull; {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 4. Blog */}
          <button
            onClick={() => handleNav('blog')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between ${
              activePublicTab === 'blog'
                ? 'bg-[#f2ca50] text-[#3c2f00] font-bold'
                : 'text-[#e5e1e4] hover:bg-[#201f22]'
            }`}
          >
            <span>4. Blog</span>
            <span className="material-symbols-outlined text-[18px]">menu_book</span>
          </button>

          {/* 5. Service 2 (Accordion) */}
          <div className="rounded-xl bg-[#1c1b1e] border border-[#4d4635]/40 overflow-hidden">
            <button
              onClick={() => setMobileService2Open(!mobileService2Open)}
              className="w-full text-left px-3.5 py-2.5 text-sm font-semibold flex items-center justify-between text-[#e5e1e4]"
            >
              <div className="flex items-center gap-2">
                <span className={isService2Active ? 'text-[#f2ca50] font-bold' : ''}>5. Service 2</span>
                <span className="text-[10px] bg-[#2a2a2c] text-[#d4c78f] px-2 py-0.5 rounded-full font-mono">4 Cities</span>
              </div>
              <span className={`material-symbols-outlined text-[18px] transition-transform ${mobileService2Open ? 'rotate-180 text-[#f2ca50]' : ''}`}>
                expand_more
              </span>
            </button>

            {mobileService2Open && (
              <div className="p-2 border-t border-[#353437] space-y-1 bg-[#161518]">
                <button
                  onClick={() => handleNav('service2')}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold text-[#f2ca50] hover:bg-[#201f22] flex items-center justify-between"
                >
                  <span>Overview &amp; All 4 Cities</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </button>
                {service2Cities.map((city) => (
                  <button
                    key={city.slug}
                    onClick={() => handleNav('service2', city.slug)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2 ${
                      isService2Active && activeLocationSlug === city.slug
                        ? 'bg-[#2a2a2c] text-[#f2ca50] font-bold'
                        : 'text-[#d0c5af] hover:bg-[#201f22] hover:text-white'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[14px] text-[#f2ca50]">location_city</span>
                    <span>{city.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 6. Gallery */}
          <button
            onClick={() => handleNav('gallery')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between ${
              activePublicTab === 'gallery' || activePublicTab === 'reels'
                ? 'bg-[#f2ca50] text-[#3c2f00] font-bold'
                : 'text-[#e5e1e4] hover:bg-[#201f22]'
            }`}
          >
            <span>6. Gallery</span>
            <span className="material-symbols-outlined text-[18px]">photo_library</span>
          </button>

          {/* 7. Contact Us */}
          <button
            onClick={() => handleNav('contact')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between ${
              activePublicTab === 'contact' || activePublicTab === 'book' || activePublicTab === 'vip-line'
                ? 'bg-[#f2ca50] text-[#3c2f00] font-bold'
                : 'text-[#e5e1e4] hover:bg-[#201f22]'
            }`}
          >
            <span>7. Contact Us</span>
            <span className="material-symbols-outlined text-[18px]">mail</span>
          </button>

          {/* Admin Switcher in Mobile menu */}
          <div className="pt-2 border-t border-[#353437]">
            <button
              onClick={() => { setIsAdminMode(true); setMobileMenuOpen(false); }}
              className="w-full text-left p-3 rounded-xl bg-[#2a2a2c] text-[#f2ca50] text-xs font-bold flex items-center justify-between border border-[#4d4635]"
            >
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">admin_panel_settings</span>
                Open CMS Admin Panel
              </span>
              <span className="text-[10px] bg-[#4f471b] text-[#f1e3a9] px-2 py-0.5 rounded">WordPress CMS</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
