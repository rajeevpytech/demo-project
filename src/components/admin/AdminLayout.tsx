import React from 'react';
import { useCms, AdminView } from '../../context/CmsContext';
import { UserRole } from '../../types';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC = () => {
  const { 
    adminCurrentView, 
    setAdminCurrentView, 
    setIsAdminMode, 
    settings, 
    currentUser, 
    setCurrentUser, 
    users, 
    leads, 
    pages,
    runDemo 
  } = useCms();

  const newLeadsCount = leads.filter(l => l.status === 'new').length;
  const draftPagesCount = pages.filter(p => p.status === 'draft').length;

  const menuItems: { id: AdminView; label: string; icon: string; badge?: number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'builder', label: 'Visual Page Builder', icon: 'view_quilt' },
    { id: 'pages', label: 'Pages & Hierarchy', icon: 'layers', badge: draftPagesCount > 0 ? draftPagesCount : undefined },
    { id: 'leads', label: 'Booking Inquiries', icon: 'contact_page', badge: newLeadsCount > 0 ? newLeadsCount : undefined },
    { id: 'services', label: 'Services & Events', icon: 'celebration' },
    { id: 'locations', label: 'Locations (City Hubs)', icon: 'location_city' },
    { id: 'packages', label: 'Performance Packages', icon: 'workspace_premium' },
    { id: 'gallery', label: 'Cinema Reels & Audio', icon: 'video_library' },
    { id: 'media', label: 'Media Library', icon: 'perm_media' },
    { id: 'blogs', label: 'Articles & Editorial', icon: 'article' },
    { id: 'testimonials', label: 'Verified Reviews', icon: 'rate_review' },
    { id: 'menus', label: 'Menu Navigation', icon: 'menu_open' },
    { id: 'route_seo', label: '7-Menu & Route SEO', icon: 'alt_route' },
    { id: 'seo', label: 'SEO & GEO Center', icon: 'travel_explore' },
    { id: 'users', label: 'Users & Ownership', icon: 'manage_accounts' },
    { id: 'settings', label: 'Website Settings', icon: 'tune' },
    { id: 'audit_logs', label: 'Audit Trail Logs', icon: 'history' },
  ];

  return (
    <div className="min-h-screen bg-[#0e0e10] text-[#e5e1e4] flex flex-col md:flex-row antialiased selection:bg-[#d4af37] selection:text-[#131315]">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#141418] border-r border-[#4d4635]/30 flex flex-col justify-between flex-shrink-0">
        <div>
          {/* Admin Header Branding */}
          <div className="p-4 border-b border-[#353437] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img 
                src={settings.logoUrl} 
                alt="Logo" 
                className="w-7 h-7 object-contain drop-shadow"
              />
              <div className="flex flex-col">
                <span className="font-serif-luxury text-sm font-bold text-[#f2ca50] truncate leading-tight">
                  {settings.brandName.split('•')[0]}
                </span>
                <span className="text-[10px] font-sans-luxury text-[#d0c5af] tracking-wider uppercase">
                  No-Code CMS v3.4
                </span>
              </div>
            </div>

            <button 
              onClick={() => setIsAdminMode(false)}
              title="Return to Public Live Website"
              className="px-2 py-1 rounded bg-[#201f22] hover:bg-[#2a2a2c] text-[#f2ca50] text-[11px] font-semibold border border-[#4d4635]/40 flex items-center gap-1 transition-all"
            >
              <span className="material-symbols-outlined text-[14px]">public</span>
              <span>Live Site</span>
            </button>
          </div>

          {/* User Role Badge & Switcher */}
          <div className="p-3 mx-2 my-2 rounded-lg bg-[#1c1b1e] border border-[#4d4635]/30">
            <div className="flex items-center justify-between text-[11px] mb-1">
              <span className="text-[#99907c] uppercase tracking-wider font-semibold">Active Operator</span>
              <span className="px-1.5 py-0.2 rounded bg-[#4f471b] text-[#f1e3a9] font-mono text-[9px] uppercase">
                {currentUser.role.replace('_', ' ')}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <img 
                src={currentUser.avatarUrl || settings.directorPhotoUrl} 
                alt="Avatar" 
                className="w-6 h-6 rounded-full object-cover border border-[#f2ca50]"
              />
              <span className="text-xs font-semibold text-[#e5e1e4] truncate flex-1">
                {currentUser.name}
              </span>
            </div>
            {/* Quick Role Switcher for Testing Section 10 Requirements */}
            <div className="mt-2 pt-2 border-t border-[#353437]">
              <label className="text-[9px] text-[#99907c] block uppercase mb-1">Simulate Role Login:</label>
              <select
                value={currentUser.id}
                onChange={(e) => {
                  const target = users.find(u => u.id === e.target.value);
                  if (target) setCurrentUser(target);
                }}
                className="w-full bg-[#0e0e10] text-[11px] text-[#d4c78f] rounded p-1 border border-[#4d4635] focus:outline-none"
              >
                {users.map(u => (
                  <option key={u.id} value={u.id}>
                    {u.name} ({u.role.replace('_', ' ')})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="p-2 space-y-0.5 overflow-y-auto max-h-[calc(100vh-250px)]">
            {menuItems.map((item) => {
              const isActive = adminCurrentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setAdminCurrentView(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-[#d4af37] text-[#131315] font-bold shadow-sm'
                      : 'text-[#d0c5af] hover:text-[#e5e1e4] hover:bg-[#201f22]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[18px]">
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-[#131315] text-[#f2ca50]' : 'bg-[#f2ca50] text-[#131315]'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Quick Demo Triggers at Sidebar Bottom */}
        <div className="p-3 border-t border-[#353437] bg-[#0e0e10]">
          <span className="text-[10px] uppercase font-bold text-[#f2ca50] block tracking-wider mb-1.5">
            Prompt Demos A–H Runner
          </span>
          <div className="grid grid-cols-4 gap-1">
            {(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'] as const).map(code => (
              <button
                key={code}
                onClick={() => runDemo(code)}
                title={`Trigger Demonstration ${code} from master spec`}
                className="p-1 rounded bg-[#201f22] hover:bg-[#f2ca50] hover:text-[#131315] text-[#d4c78f] text-[10px] font-bold border border-[#4d4635]/40 transition-colors"
              >
                Demo {code}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Admin Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#131315] overflow-y-auto min-h-screen">
        {/* Top Navbar */}
        <header className="h-16 px-6 bg-[#1c1b1e] border-b border-[#4d4635]/30 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-widest text-[#99907c] font-semibold">
              Admin &bull; {menuItems.find(m => m.id === adminCurrentView)?.label}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAdminMode(false)}
              className="h-9 px-3 rounded-lg bg-[#2a2a2c] hover:bg-[#353437] text-xs font-semibold text-[#f2ca50] border border-[#4d4635] flex items-center gap-1.5 transition-all shadow-sm"
            >
              <span className="material-symbols-outlined text-[16px]">visibility</span>
              <span>Preview Public Website</span>
            </button>
          </div>
        </header>

        {/* Dynamic Admin View Container */}
        <div className="p-4 sm:p-6 flex-1">
          {renderAdminView(adminCurrentView)}
        </div>
      </main>
    </div>
  );
};

// Lazy render views
import { DashboardView } from './DashboardView';
import { VisualPageBuilder } from './VisualPageBuilder';
import { PagesManager } from './PagesManager';
import { LeadsManager } from './LeadsManager';
import { ServicesManager } from './ServicesManager';
import { LocationsManager } from './LocationsManager';
import { PackagesManager } from './PackagesManager';
import { GalleryManager } from './GalleryManager';
import { MediaLibrary } from './MediaLibrary';
import { BlogManager } from './BlogManager';
import { TestimonialsManager } from './TestimonialsManager';
import { MenuManager } from './MenuManager';
import { RouteSeoManager } from './RouteSeoManager';
import { SeoControlCenter } from './SeoControlCenter';
import { UsersAndRoles } from './UsersAndRoles';
import { SettingsManager } from './SettingsManager';
import { AuditLogView } from './AuditLogView';

function renderAdminView(view: AdminView) {
  switch (view) {
    case 'dashboard': return <DashboardView />;
    case 'builder': return <VisualPageBuilder />;
    case 'pages': return <PagesManager />;
    case 'leads': return <LeadsManager />;
    case 'services': return <ServicesManager />;
    case 'locations': return <LocationsManager />;
    case 'packages': return <PackagesManager />;
    case 'gallery': return <GalleryManager />;
    case 'media': return <MediaLibrary />;
    case 'blogs': return <BlogManager />;
    case 'testimonials': return <TestimonialsManager />;
    case 'menus': return <MenuManager />;
    case 'route_seo': return <RouteSeoManager />;
    case 'seo': return <SeoControlCenter />;
    case 'users': return <UsersAndRoles />;
    case 'settings': return <SettingsManager />;
    case 'audit_logs': return <AuditLogView />;
    default: return <DashboardView />;
  }
}
