import React from 'react';
import { useCms, PublicTab } from '../../context/CmsContext';

export const BottomNav: React.FC = () => {
  const { activePublicTab, navigateTo, isAdminMode } = useCms();

  if (isAdminMode) {
    return null; // Admin has its own sidebar navigation
  }

  // Streamlined bottom navigation aligned with the 7 core menus
  const navItems: { id: PublicTab; label: string; icon: string; isActionCta?: boolean }[] = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'service1', label: 'Events', icon: 'celebration' },
    { id: 'contact', label: 'Enquire', icon: 'event_available', isActionCta: true },
    { id: 'service2', label: 'Cities', icon: 'location_on' },
    { id: 'gallery', label: 'Gallery', icon: 'photo_library' },
  ];

  return (
    <nav 
      aria-label="Bottom Navigation"
      className="xl:hidden fixed bottom-0 w-full z-50 pb-[env(safe-area-inset-bottom,0px)] bg-[#0e0e10]/95 backdrop-blur-xl border-t border-[#4d4635]/30 shadow-[0_-4px_32px_rgba(0,0,0,0.8)]"
    >
      <div className="flex justify-around items-center h-16 px-2 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = 
            activePublicTab === item.id || 
            (item.id === 'home' && activePublicTab === 'explore') ||
            (item.id === 'service1' && activePublicTab === 'services') ||
            (item.id === 'contact' && (activePublicTab === 'book' || activePublicTab === 'vip-line')) ||
            (item.id === 'gallery' && activePublicTab === 'reels');

          if (item.isActionCta) {
            return (
              <button
                key={item.id}
                onClick={() => navigateTo('contact')}
                aria-label="Enquire Booking"
                aria-current={isActive ? 'page' : undefined}
                className="flex flex-col items-center justify-center -mt-3.5 group focus:outline-none cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-full bg-[#f2ca50] text-[#3c2f00] flex flex-col items-center justify-center shadow-[0_0_20px_rgba(242,202,80,0.45)] group-hover:shadow-[0_0_28px_rgba(242,202,80,0.65)] transition-all duration-300 transform group-active:scale-95 ${
                  isActive ? 'ring-2 ring-white shadow-[0_0_26px_rgba(242,202,80,0.7)]' : ''
                }`}>
                  <span className="material-symbols-outlined text-[20px] font-bold">
                    {item.icon}
                  </span>
                  <span className="font-sans-luxury text-[8px] tracking-wider font-extrabold uppercase leading-none mt-0.5">
                    {item.label}
                  </span>
                </div>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => navigateTo(item.id)}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
              className={`flex flex-col items-center justify-center gap-1 min-w-[50px] h-12 transition-colors duration-200 focus:outline-none cursor-pointer ${
                isActive 
                  ? 'text-[#f2ca50] font-semibold' 
                  : 'text-[#d0c5af] hover:text-[#e5e1e4]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">
                {item.icon}
              </span>
              <span className="font-sans-luxury text-[10px] tracking-wide">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
