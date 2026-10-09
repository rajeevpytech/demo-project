import React from 'react';
import { CmsProvider, useCms } from './context/CmsContext';
import { Header } from './components/public/Header';
import { BottomNav } from './components/public/BottomNav';
import { ExploreScreen } from './components/public/ExploreScreen';
import { AboutScreen } from './components/public/AboutScreen';
import { ServicesScreen } from './components/public/ServicesScreen';
import { LocationsScreen } from './components/public/LocationsScreen';
import { BlogScreen } from './components/public/BlogScreen';
import { GalleryScreen } from './components/public/GalleryScreen';
import { ContactScreen } from './components/public/ContactScreen';
import { BookScreen } from './components/public/BookScreen';
import { ReelsScreen } from './components/public/ReelsScreen';
import { VipLineScreen } from './components/public/VipLineScreen';
import { ShowreelModal } from './components/public/ShowreelModal';
import { CityDetailModal } from './components/public/CityDetailModal';
import { ServiceDetailModal } from './components/public/ServiceDetailModal';
import { AdminLayout } from './components/admin/AdminLayout';

const MainContent: React.FC = () => {
  const { 
    isAdminMode, 
    activePublicTab, 
    toastMessage 
  } = useCms();

  if (isAdminMode) {
    return (
      <>
        {toastMessage && (
          <div className="fixed top-4 right-4 z-50 bg-[#d4af37] text-[#131315] font-bold px-4 py-2.5 rounded-lg shadow-2xl text-xs flex items-center gap-2 animate-in slide-in-from-top-2">
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span>{toastMessage}</span>
          </div>
        )}
        <AdminLayout />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#131315] text-[#e5e1e4] flex flex-col antialiased selection:bg-[#d4af37] selection:text-[#131315]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#d4af37] text-[#131315] font-bold px-4 py-2.5 rounded-full shadow-2xl text-xs flex items-center gap-2 animate-in slide-in-from-top-2">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header (Exact 7 Main Menus) */}
      <Header />

      {/* Main Public Screens Area strictly supporting 7 core sections + legacy fallbacks */}
      <main className="flex-1 w-full pt-20">
        {/* 1. Home */}
        {(activePublicTab === 'home' || activePublicTab === 'explore') && <ExploreScreen />}

        {/* 2. About */}
        {activePublicTab === 'about' && <AboutScreen />}

        {/* 3. Service 1 / Event */}
        {(activePublicTab === 'service1' || activePublicTab === 'services') && <ServicesScreen />}

        {/* 4. Blog */}
        {activePublicTab === 'blog' && <BlogScreen />}

        {/* 5. Service 2 (Locations: Agra, Mathura, Lucknow, Jodhpur) */}
        {activePublicTab === 'service2' && <LocationsScreen />}

        {/* 6. Gallery */}
        {(activePublicTab === 'gallery' || activePublicTab === 'reels') && <GalleryScreen />}

        {/* 7. Contact Us */}
        {(activePublicTab === 'contact' || activePublicTab === 'vip-line') && <ContactScreen />}

        {/* Booking Form Direct Fallback (if accessed via /book) */}
        {activePublicTab === 'book' && <BookScreen />}
      </main>

      {/* Modals */}
      <ShowreelModal />
      <CityDetailModal />
      <ServiceDetailModal />

      {/* Bottom Sticky Navigation */}
      <BottomNav />
    </div>
  );
};

export default function App() {
  return (
    <CmsProvider>
      <MainContent />
    </CmsProvider>
  );
}
