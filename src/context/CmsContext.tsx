import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  WebsiteSettings, 
  Page, 
  ServiceItem, 
  CityHub, 
  PackageTier, 
  CinemaReel, 
  AudioTrack, 
  Testimonial, 
  User, 
  LeadInquiry, 
  BlogPost, 
  BlogCategory,
  MediaAsset,
  AuditLogEntry,
  PageBlock,
  OwnershipTransfer,
  SeoMetadata
} from '../types';
import { 
  initialSettings, 
  initialPages, 
  initialServices, 
  initialCityHubs, 
  initialPackages, 
  initialCinemaReels, 
  initialAudioTracks, 
  initialTestimonials, 
  initialUsers, 
  initialLeads, 
  initialBlogPosts, 
  initialBlogCategories,
  initialMediaAssets, 
  initialAuditLogs 
} from '../data/initialData';
import { INITIAL_ROUTE_SEO_MAP } from '../data/routeSeoData';

export type PublicTab = 
  | 'home' 
  | 'about' 
  | 'service1' 
  | 'blog' 
  | 'service2' 
  | 'gallery' 
  | 'contact'
  | 'explore' 
  | 'services' 
  | 'book' 
  | 'reels' 
  | 'vip-line';
export type AdminView = 
  | 'dashboard' 
  | 'pages' 
  | 'builder' 
  | 'services' 
  | 'locations' 
  | 'packages' 
  | 'leads' 
  | 'media' 
  | 'menus' 
  | 'blogs' 
  | 'gallery' 
  | 'testimonials' 
  | 'seo' 
  | 'route_seo'
  | 'users' 
  | 'settings' 
  | 'audit_logs';

interface CmsContextType {
  settings: WebsiteSettings;
  updateSettings: (newSettings: Partial<WebsiteSettings>) => void;
  pages: Page[];
  currentPageId: string;
  setCurrentPageId: (id: string) => void;
  updatePageBlock: (pageId: string, blockId: string, updates: Partial<PageBlock>) => void;
  addPageBlock: (pageId: string, block: PageBlock) => void;
  deletePageBlock: (pageId: string, blockId: string) => void;
  publishPage: (pageId: string) => void;
  restorePageRevision: (pageId: string, revisionId: string) => void;
  updatePage: (id: string, updates: Partial<Page>) => void;
  updatePageSeo: (pageId: string, seo: Partial<SeoMetadata>) => void;
  services: ServiceItem[];
  addService: (service: ServiceItem) => void;
  updateService: (id: string, updates: Partial<ServiceItem>) => void;
  deleteService: (id: string) => void;
  cityHubs: CityHub[];
  addCityHub: (hub: CityHub) => void;
  updateCityHub: (id: string, updates: Partial<CityHub>) => void;
  deleteCityHub: (id: string) => void;
  packages: PackageTier[];
  updatePackage: (id: string, updates: Partial<PackageTier>) => void;
  addPackage: (pkg: PackageTier) => void;
  deletePackage: (id: string) => void;
  toggleComboDjPackage: (enabled?: boolean) => void;
  leads: LeadInquiry[];
  submitLead: (lead: Omit<LeadInquiry, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => Promise<string>;
  updateLead: (id: string, updates: Partial<LeadInquiry>) => void;
  updateLeadStatus: (id: string, status: LeadInquiry['status'], notes?: string) => void;
  deleteLead: (id: string) => void;
  testimonials: Testimonial[];
  toggleTestimonialApproval: (id: string) => void;
  addTestimonial: (t: Testimonial) => void;
  mediaAssets: MediaAsset[];
  addMediaAsset: (asset: MediaAsset) => void;
  deleteMediaAsset: (id: string) => void;
  blogPosts: BlogPost[];
  addBlogPost: (post: BlogPost) => void;
  updateBlogPost: (id: string, updates: Partial<BlogPost>) => void;
  deleteBlogPost: (id: string) => void;
  blogCategories: BlogCategory[];
  addBlogCategory: (cat: BlogCategory) => void;
  deleteBlogCategory: (id: string) => void;
  reels: CinemaReel[];
  toggleLikeReel: (id: string) => void;
  audioTracks: AudioTrack[];
  activeTrack: AudioTrack | null;
  isPlaying: boolean;
  playTrack: (track: AudioTrack) => void;
  togglePlayPause: () => void;
  customSetlist: string[];
  addToSetlist: (trackTitle: string) => void;
  users: User[];
  currentUser: User;
  setCurrentUser: (user: User) => void;
  auditLogs: AuditLogEntry[];
  logAction: (action: string, entityType: string, details: string, entityId?: string) => void;
  activePublicTab: PublicTab;
  setActivePublicTab: (tab: PublicTab) => void;
  activeServiceSlug: string | null;
  setActiveServiceSlug: (slug: string | null) => void;
  activeLocationSlug: string | null;
  setActiveLocationSlug: (slug: string | null) => void;
  navigateTo: (tab: PublicTab, slug?: string | null) => void;
  isAdminMode: boolean;
  setIsAdminMode: (admin: boolean) => void;
  adminCurrentView: AdminView;
  setAdminCurrentView: (view: AdminView) => void;
  ownershipTransfer: OwnershipTransfer | null;
  initiateOwnershipTransfer: (targetUserId: string) => void;
  confirmOwnershipTransfer: (transferId: string) => void;
  cancelOwnershipTransfer: () => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  resetAllData: () => void;
  activeDemoNotice: string | null;
  runDemo: (demoCode: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H') => void;
  selectedCityForModal: CityHub | null;
  setSelectedCityForModal: (city: CityHub | null) => void;
  selectedServiceForModal: ServiceItem | null;
  setSelectedServiceForModal: (service: ServiceItem | null) => void;
  showShowreelModal: boolean;
  setShowShowreelModal: (show: boolean) => void;
  routeSeoMap: Record<string, SeoMetadata>;
  updateRouteSeo: (routeKey: string, updates: Partial<SeoMetadata>) => void;
  resetRouteSeo: (routeKey: string) => void;
}

const CmsContext = createContext<CmsContextType | undefined>(undefined);

const STORAGE_KEY = 'the_royal_band_cms_state_v1';

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load persisted state or default
  const [routeSeoMap, setRouteSeoMap] = useState<Record<string, SeoMetadata>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_route_seo');
      return saved ? { ...INITIAL_ROUTE_SEO_MAP, ...JSON.parse(saved) } : INITIAL_ROUTE_SEO_MAP;
    } catch {
      return INITIAL_ROUTE_SEO_MAP;
    }
  });

  const [settings, setSettings] = useState<WebsiteSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_settings');
      return saved ? JSON.parse(saved) : initialSettings;
    } catch {
      return initialSettings;
    }
  });

  const [pages, setPages] = useState<Page[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_pages');
      return saved ? JSON.parse(saved) : initialPages;
    } catch {
      return initialPages;
    }
  });

  const [currentPageId, setCurrentPageId] = useState<string>('page-home');

  const [services, setServices] = useState<ServiceItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_services');
      return saved ? JSON.parse(saved) : initialServices;
    } catch {
      return initialServices;
    }
  });

  const [cityHubs, setCityHubs] = useState<CityHub[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_cities');
      return saved ? JSON.parse(saved) : initialCityHubs;
    } catch {
      return initialCityHubs;
    }
  });

  const [packages, setPackages] = useState<PackageTier[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_packages');
      return saved ? JSON.parse(saved) : initialPackages;
    } catch {
      return initialPackages;
    }
  });

  const [leads, setLeads] = useState<LeadInquiry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_leads');
      return saved ? JSON.parse(saved) : initialLeads;
    } catch {
      return initialLeads;
    }
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_testimonials');
      return saved ? JSON.parse(saved) : initialTestimonials;
    } catch {
      return initialTestimonials;
    }
  });

  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_media');
      return saved ? JSON.parse(saved) : initialMediaAssets;
    } catch {
      return initialMediaAssets;
    }
  });

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_blogs');
      return saved ? JSON.parse(saved) : initialBlogPosts;
    } catch {
      return initialBlogPosts;
    }
  });

  const [blogCategories, setBlogCategories] = useState<BlogCategory[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_blog_categories');
      return saved ? JSON.parse(saved) : initialBlogCategories;
    } catch {
      return initialBlogCategories;
    }
  });

  const [reels, setReels] = useState<CinemaReel[]>(initialCinemaReels);
  const [audioTracks] = useState<AudioTrack[]>(initialAudioTracks);
  const [activeTrack, setActiveTrack] = useState<AudioTrack | null>(initialAudioTracks[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [customSetlist, setCustomSetlist] = useState<string[]>([]);

  const [users, setUsers] = useState<User[]>(initialUsers);
  const [currentUser, setCurrentUser] = useState<User>(initialUsers[0]); // Website Owner Vikramaditya
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(initialAuditLogs);
  const [ownershipTransfer, setOwnershipTransfer] = useState<OwnershipTransfer | null>(null);

  // App navigation state
  const [activePublicTab, setActivePublicTab] = useState<PublicTab>('home');
  const [activeServiceSlug, setActiveServiceSlug] = useState<string | null>(null);
  const [activeLocationSlug, setActiveLocationSlug] = useState<string | null>(null);
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [adminCurrentView, setAdminCurrentView] = useState<AdminView>('dashboard');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeDemoNotice, setActiveDemoNotice] = useState<string | null>(null);

  // Modals
  const [selectedCityForModal, setSelectedCityForModal] = useState<CityHub | null>(null);
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<ServiceItem | null>(null);
  const [showShowreelModal, setShowShowreelModal] = useState<boolean>(false);

  const toggleComboDjPackage = (enabled?: boolean) => {
    setPackages(prev => prev.map(p => {
      if (p.id === 'pkg-combo-dj' || p.category === 'combo') {
        const nextState = enabled !== undefined ? enabled : !p.isEnabled;
        return { ...p, isEnabled: nextState };
      }
      return p;
    }));
    showToast("Live Band + DJ Combo package visibility updated!");
  };

  const navigateTo = (tab: PublicTab, slug?: string | null) => {
    let targetTab: PublicTab = tab;
    if (tab === 'explore') targetTab = 'home';
    if (tab === 'services') targetTab = 'service1';
    if (tab === 'book' || tab === 'vip-line') targetTab = 'contact';
    if (tab === 'reels') targetTab = 'gallery';

    setActivePublicTab(targetTab);
    setIsAdminMode(false);

    if (targetTab === 'service1') {
      setActiveServiceSlug(slug || null);
      setActiveLocationSlug(null);
      const url = slug ? `/events/${slug}` : '/events';
      if (typeof window !== 'undefined' && window.location.pathname !== url) {
        window.history.pushState(null, '', url);
      }
    } else if (targetTab === 'service2') {
      setActiveLocationSlug(slug || null);
      setActiveServiceSlug(null);
      const url = slug ? `/locations/${slug}` : '/locations';
      if (typeof window !== 'undefined' && window.location.pathname !== url) {
        window.history.pushState(null, '', url);
      }
    } else {
      setActiveServiceSlug(null);
      setActiveLocationSlug(null);
      let url = '/';
      if (targetTab === 'about') url = '/about';
      else if (targetTab === 'blog') url = '/blog';
      else if (targetTab === 'gallery') url = '/gallery';
      else if (targetTab === 'contact') url = '/contact';
      if (typeof window !== 'undefined' && window.location.pathname !== url) {
        window.history.pushState(null, '', url);
      }
    }
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleUrlRoute = () => {
      if (typeof window === 'undefined') return;
      const path = window.location.pathname;
      if (path.startsWith('/events/')) {
        const slug = path.replace('/events/', '').trim();
        setActivePublicTab('service1');
        setActiveServiceSlug(slug);
        setActiveLocationSlug(null);
      } else if (path === '/events' || path === '/service1') {
        setActivePublicTab('service1');
        setActiveServiceSlug(null);
        setActiveLocationSlug(null);
      } else if (path.startsWith('/locations/')) {
        const slug = path.replace('/locations/', '').trim();
        setActivePublicTab('service2');
        setActiveLocationSlug(slug);
        setActiveServiceSlug(null);
      } else if (path === '/locations' || path === '/service2') {
        setActivePublicTab('service2');
        setActiveLocationSlug(null);
        setActiveServiceSlug(null);
      } else if (path === '/about') {
        setActivePublicTab('about');
        setActiveServiceSlug(null);
        setActiveLocationSlug(null);
      } else if (path === '/blog') {
        setActivePublicTab('blog');
        setActiveServiceSlug(null);
        setActiveLocationSlug(null);
      } else if (path === '/gallery') {
        setActivePublicTab('gallery');
        setActiveServiceSlug(null);
        setActiveLocationSlug(null);
      } else if (path === '/contact' || path === '/contact-us' || path === '/book') {
        setActivePublicTab('contact');
        setActiveServiceSlug(null);
        setActiveLocationSlug(null);
      } else if (path === '/' || path === '/home' || path === '/explore') {
        setActivePublicTab('home');
        setActiveServiceSlug(null);
        setActiveLocationSlug(null);
      }
    };

    handleUrlRoute();
    window.addEventListener('popstate', handleUrlRoute);
    return () => window.removeEventListener('popstate', handleUrlRoute);
  }, []);

  // Save to localStorage whenever state updates
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY + '_settings', JSON.stringify(settings));
      localStorage.setItem(STORAGE_KEY + '_pages', JSON.stringify(pages));
      localStorage.setItem(STORAGE_KEY + '_services', JSON.stringify(services));
      localStorage.setItem(STORAGE_KEY + '_cities', JSON.stringify(cityHubs));
      localStorage.setItem(STORAGE_KEY + '_packages', JSON.stringify(packages));
      localStorage.setItem(STORAGE_KEY + '_leads', JSON.stringify(leads));
      localStorage.setItem(STORAGE_KEY + '_testimonials', JSON.stringify(testimonials));
      localStorage.setItem(STORAGE_KEY + '_media', JSON.stringify(mediaAssets));
      localStorage.setItem(STORAGE_KEY + '_blogs', JSON.stringify(blogPosts));
      localStorage.setItem(STORAGE_KEY + '_blog_categories', JSON.stringify(blogCategories));
      localStorage.setItem(STORAGE_KEY + '_route_seo', JSON.stringify(routeSeoMap));
    } catch (e) {
      console.warn("Storage sync warning", e);
    }
  }, [settings, pages, services, cityHubs, packages, leads, testimonials, mediaAssets, blogPosts, blogCategories, routeSeoMap]);

  // Dynamically update document title, description, and Open Graph tags based on active route
  useEffect(() => {
    if (typeof document === 'undefined') return;

    let currentKey = 'home';
    if (activePublicTab === 'about') {
      currentKey = 'about';
    } else if (activePublicTab === 'service1' || activePublicTab === 'services') {
      if (activeServiceSlug) currentKey = `service1/${activeServiceSlug}`;
      else currentKey = 'service1';
    } else if (activePublicTab === 'service2') {
      if (activeLocationSlug) currentKey = `service2/${activeLocationSlug}`;
      else currentKey = 'service2';
    } else if (activePublicTab === 'blog') {
      currentKey = 'blog';
    } else if (activePublicTab === 'gallery' || activePublicTab === 'reels') {
      currentKey = 'gallery';
    } else if (activePublicTab === 'contact' || activePublicTab === 'vip-line' || activePublicTab === 'book') {
      currentKey = 'contact';
    }

    const currentSeo = routeSeoMap[currentKey] || INITIAL_ROUTE_SEO_MAP[currentKey];
    if (!currentSeo) return;

    if (currentSeo.metaTitle) {
      document.title = currentSeo.metaTitle;
    }

    const setMetaTag = (attrName: 'name' | 'property', attrValue: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content || '');
    };

    if (currentSeo.metaDescription) {
      setMetaTag('name', 'description', currentSeo.metaDescription);
    }

    setMetaTag('property', 'og:title', currentSeo.ogTitle || currentSeo.metaTitle);
    setMetaTag('property', 'og:description', currentSeo.ogDescription || currentSeo.metaDescription);
    if (currentSeo.ogImageUrl) {
      setMetaTag('property', 'og:image', currentSeo.ogImageUrl);
    }
    if (currentSeo.canonicalUrl) {
      setMetaTag('property', 'og:url', currentSeo.canonicalUrl);
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', currentSeo.canonicalUrl);
    }
    setMetaTag('property', 'og:type', currentSeo.ogType || 'website');
    setMetaTag('name', 'twitter:card', currentSeo.twitterCard || 'summary_large_image');
    setMetaTag('name', 'twitter:title', currentSeo.ogTitle || currentSeo.metaTitle);
    setMetaTag('name', 'twitter:description', currentSeo.ogDescription || currentSeo.metaDescription);
    if (currentSeo.ogImageUrl) {
      setMetaTag('name', 'twitter:image', currentSeo.ogImageUrl);
    }
    if (currentSeo.isNoIndex) {
      setMetaTag('name', 'robots', `${currentSeo.isNoIndex ? 'noindex' : 'index'}, ${currentSeo.isNoFollow ? 'nofollow' : 'follow'}`);
    }
  }, [activePublicTab, activeServiceSlug, activeLocationSlug, routeSeoMap]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => current === msg ? null : current);
    }, 3800);
  };

  const logAction = (action: string, entityType: string, details: string, entityId?: string) => {
    const entry: AuditLogEntry = {
      id: `log-${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      action,
      entityType,
      entityId,
      details,
      timestamp: new Date().toLocaleString()
    };
    setAuditLogs(prev => [entry, ...prev]);
  };

  const updateSettings = (newSettings: Partial<WebsiteSettings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings };
      logAction("Settings Updated", "WebsiteSettings", `Updated branding/settings properties: ${Object.keys(newSettings).join(', ')}`);
      return updated;
    });
    showToast("Website Settings & Branding updated successfully!");
  };

  const updatePageBlock = (pageId: string, blockId: string, updates: Partial<PageBlock>) => {
    setPages(prev => prev.map(page => {
      if (page.id !== pageId) return page;

      let changed = false;
      const updatedSections = page.sections.map(sec => {
        const updatedBlocks = sec.blocks.map(blk => {
          if (blk.id === blockId) {
            changed = true;
            return { ...blk, ...updates };
          }
          return blk;
        });
        return { ...sec, blocks: updatedBlocks };
      });

      if (!changed) return page;

      logAction("Page Block Modified", "PageBlock", `Modified block #${blockId} on page ${page.title}`);
      return {
        ...page,
        sections: updatedSections,
        updatedAt: new Date().toLocaleString()
      };
    }));
  };

  const addPageBlock = (pageId: string, block: PageBlock) => {
    setPages(prev => prev.map(page => {
      if (page.id !== pageId) return page;
      if (page.sections.length === 0) {
        return {
          ...page,
          sections: [{ id: `sec-${Date.now()}`, name: "General Content", order: 1, blocks: [block] }]
        };
      }
      const firstSec = page.sections[0];
      const updatedFirstSec = { ...firstSec, blocks: [...firstSec.blocks, block] };
      logAction("Page Block Added", "PageBlock", `Added new block '${block.type}' to ${page.title}`);
      return {
        ...page,
        sections: [updatedFirstSec, ...page.sections.slice(1)],
        updatedAt: new Date().toLocaleString()
      };
    }));
    showToast("New block added to page!");
  };

  const deletePageBlock = (pageId: string, blockId: string) => {
    setPages(prev => prev.map(page => {
      if (page.id !== pageId) return page;
      const updatedSections = page.sections.map(sec => ({
        ...sec,
        blocks: sec.blocks.filter(b => b.id !== blockId)
      }));
      logAction("Page Block Deleted", "PageBlock", `Deleted block #${blockId} on ${page.title}`);
      return {
        ...page,
        sections: updatedSections,
        updatedAt: new Date().toLocaleString()
      };
    }));
    showToast("Block removed.");
  };

  const publishPage = (pageId: string) => {
    setPages(prev => prev.map(page => {
      if (page.id !== pageId) return page;
      const newVersion = (page.revisions?.length || 0) + 1;
      const newRevision = {
        id: `rev-${Date.now()}`,
        pageId: page.id,
        version: newVersion,
        sections: JSON.parse(JSON.stringify(page.sections)),
        seo: { ...page.seo },
        authorId: currentUser.id,
        authorName: currentUser.name,
        createdAt: new Date().toLocaleString(),
        changeSummary: `Published version ${newVersion} by ${currentUser.name}`
      };
      logAction("Page Published", "Page", `Published version ${newVersion} for ${page.title}`, page.id);
      return {
        ...page,
        status: 'published' as const,
        updatedAt: new Date().toLocaleString(),
        revisions: [newRevision, ...(page.revisions || [])]
      };
    }));
    showToast("Page published live! Revisions updated.");
  };

  const restorePageRevision = (pageId: string, revisionId: string) => {
    setPages(prev => prev.map(page => {
      if (page.id !== pageId) return page;
      const targetRev = page.revisions.find(r => r.id === revisionId);
      if (!targetRev) return page;

      logAction("Revision Restored", "PageRevision", `Restored version ${targetRev.version} for ${page.title}`, page.id);
      return {
        ...page,
        sections: JSON.parse(JSON.stringify(targetRev.sections)),
        seo: { ...targetRev.seo },
        updatedAt: new Date().toLocaleString()
      };
    }));
    showToast("Revision successfully restored to live page!");
  };

  const updatePage = (id: string, updates: Partial<Page>) => {
    setPages(prev => prev.map(p => {
      if (p.id !== id) return p;
      return {
        ...p,
        ...updates,
        updatedAt: new Date().toLocaleString()
      };
    }));
    logAction("Page Updated", "Page", `Updated page metadata for #${id}`, id);
  };

  const updatePageSeo = (pageId: string, seoUpdates: Partial<SeoMetadata>) => {
    setPages(prev => prev.map(p => {
      if (p.id !== pageId) return p;
      const updatedSeo = { ...p.seo, ...seoUpdates };
      return {
        ...p,
        seo: updatedSeo,
        updatedAt: new Date().toLocaleString()
      };
    }));
    logAction("SEO Updated", "SeoMetadata", `Updated SEO metadata for page #${pageId}`, pageId);
    showToast("Page SEO settings saved!");
  };

  const updateRouteSeo = (routeKey: string, seoUpdates: Partial<SeoMetadata>) => {
    setRouteSeoMap(prev => {
      const fallback = INITIAL_ROUTE_SEO_MAP[routeKey] || {
        metaTitle: `${routeKey} | ${settings.brandName}`,
        metaDescription: '',
        slug: routeKey,
        canonicalUrl: `https://theroyalband.com/${routeKey}`,
        ogTitle: routeKey,
        ogDescription: '',
        ogImageUrl: settings.logoUrl,
        ogType: 'website',
        twitterCard: 'summary_large_image',
        isNoIndex: false,
        isNoFollow: false,
        schemaType: 'MusicGroup'
      };
      const existing = prev[routeKey] || fallback;
      return {
        ...prev,
        [routeKey]: {
          ...existing,
          ...seoUpdates
        }
      };
    });

    // Cross-sync with related page, service, city, or blog post
    if (routeKey === 'home') {
      updatePageSeo('page-home', seoUpdates);
    } else if (routeKey === 'about') {
      const aboutPage = pages.find(p => p.slug === 'about');
      if (aboutPage) updatePageSeo(aboutPage.id, seoUpdates);
    } else if (routeKey === 'service1') {
      const srvPage = pages.find(p => p.id === 'page-services');
      if (srvPage) updatePageSeo(srvPage.id, seoUpdates);
    } else if (routeKey.startsWith('service1/')) {
      const srvSlug = routeKey.replace('service1/', '');
      const srv = services.find(s => s.seo?.slug === srvSlug || s.id === srvSlug);
      if (srv) {
        updateService(srv.id, { seo: { ...srv.seo, ...seoUpdates } });
      }
    } else if (routeKey === 'blog') {
      const blogPage = pages.find(p => p.id === 'page-blog');
      if (blogPage) updatePageSeo(blogPage.id, seoUpdates);
    } else if (routeKey.startsWith('blog/')) {
      const blogSlug = routeKey.replace('blog/', '');
      const post = blogPosts.find(b => b.slug === blogSlug);
      if (post && post.seo) {
        updateBlogPost(post.id, { seo: { ...post.seo, ...seoUpdates } });
      }
    } else if (routeKey.startsWith('service2/')) {
      const citySlug = routeKey.replace('service2/', '');
      const city = cityHubs.find(c => (c.seo?.slug === citySlug || c.name.toLowerCase() === citySlug));
      if (city && city.seo) {
        updateCityHub(city.id, { seo: { ...city.seo, ...seoUpdates } });
      }
    } else if (routeKey === 'gallery') {
      const galleryPage = pages.find(p => p.id === 'page-gallery');
      if (galleryPage) updatePageSeo(galleryPage.id, seoUpdates);
    } else if (routeKey === 'contact') {
      const vipPage = pages.find(p => p.id === 'page-vip-line');
      if (vipPage) updatePageSeo(vipPage.id, seoUpdates);
    }

    logAction("Route SEO Updated", "RouteSeo", `Updated titles, meta description & OG tags for route '${routeKey}'`, routeKey);
    showToast("Route SEO & Open Graph tags saved live!");
  };

  const resetRouteSeo = (routeKey: string) => {
    if (INITIAL_ROUTE_SEO_MAP[routeKey]) {
      updateRouteSeo(routeKey, INITIAL_ROUTE_SEO_MAP[routeKey]);
      showToast(`Reset route '${routeKey}' to standard production defaults.`);
    }
  };

  const addService = (service: ServiceItem) => {
    setServices(prev => [service, ...prev]);
    logAction("Service Added", "ServiceItem", `Created service '${service.name}'`, service.id);
    showToast(`Service '${service.name}' created!`);
  };

  const updateService = (id: string, updates: Partial<ServiceItem>) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
    logAction("Service Updated", "ServiceItem", `Updated service #${id}`, id);
    showToast("Service updated!");
  };

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
    logAction("Service Deleted", "ServiceItem", `Deleted service #${id}`, id);
    showToast("Service deleted.");
  };

  const addCityHub = (hub: CityHub) => {
    setCityHubs(prev => [...prev, hub]);
    logAction("City Hub Added", "CityHub", `Added stationed city hub '${hub.name}'`, hub.id);
    showToast(`City Hub '${hub.name}' added with SEO landing page!`);
  };

  const updateCityHub = (id: string, updates: Partial<CityHub>) => {
    setCityHubs(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
    logAction("City Hub Updated", "CityHub", `Updated city hub #${id}`, id);
    showToast("City hub details updated!");
  };

  const deleteCityHub = (id: string) => {
    setCityHubs(prev => prev.filter(c => c.id !== id));
    logAction("City Hub Deleted", "CityHub", `Removed city hub #${id}`, id);
    showToast("City hub deleted.");
  };

  const addPackage = (pkg: PackageTier) => {
    setPackages(prev => [...prev, pkg]);
    logAction("Package Added", "PackageTier", `Created package '${pkg.name}'`, pkg.id);
    showToast(`Package '${pkg.name}' added!`);
  };

  const updatePackage = (id: string, updates: Partial<PackageTier>) => {
    setPackages(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    logAction("Package Updated", "PackageTier", `Updated package #${id}`, id);
    showToast("Package details updated!");
  };

  const deletePackage = (id: string) => {
    setPackages(prev => prev.filter(p => p.id !== id));
    logAction("Package Deleted", "PackageTier", `Deleted package #${id}`, id);
    showToast("Package deleted.");
  };

  const submitLead = async (leadData: Omit<LeadInquiry, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Promise<string> => {
    const newId = `lead-${Date.now()}`;
    const newLead: LeadInquiry = {
      ...leadData,
      id: newId,
      status: 'new',
      createdAt: new Date().toLocaleString(),
      updatedAt: new Date().toLocaleString()
    };
    setLeads(prev => [newLead, ...prev]);
    logAction("New Inquiry Received", "LeadInquiry", `Inquiry received from ${newLead.fullName} for ${newLead.occasionType} in ${newLead.city}`, newId);
    showToast("VIP Booking Request Dispatched! Concierge team notified.");
    return newId;
  };

  const updateLead = (id: string, updates: Partial<LeadInquiry>) => {
    setLeads(prev => prev.map(l => {
      if (l.id !== id) return l;
      return {
        ...l,
        ...updates,
        updatedAt: new Date().toLocaleString()
      };
    }));
    logAction("Lead Updated", "LeadInquiry", `Updated lead record #${id}`, id);
    showToast("Lead updated successfully!");
  };

  const updateLeadStatus = (id: string, status: LeadInquiry['status'], notes?: string) => {
    setLeads(prev => prev.map(l => {
      if (l.id !== id) return l;
      return {
        ...l,
        status,
        notes: notes !== undefined ? notes : l.notes,
        updatedAt: new Date().toLocaleString()
      };
    }));
    logAction("Lead Status Changed", "LeadInquiry", `Changed lead status #${id} to '${status}'`, id);
    showToast(`Lead status updated to '${status.replace('_', ' ').toUpperCase()}'.`);
  };

  const deleteLead = (id: string) => {
    setLeads(prev => prev.filter(l => l.id !== id));
    logAction("Lead Deleted", "LeadInquiry", `Deleted lead record #${id}`, id);
    showToast("Lead record removed.");
  };

  const toggleTestimonialApproval = (id: string) => {
    setTestimonials(prev => prev.map(t => t.id === id ? { ...t, isApproved: !t.isApproved } : t));
    showToast("Review approval status toggled.");
  };

  const addTestimonial = (t: Testimonial) => {
    setTestimonials(prev => [t, ...prev]);
    logAction("Testimonial Added", "Testimonial", `Added review from ${t.clientName}`, t.id);
    showToast("Testimonial added!");
  };

  const addMediaAsset = (asset: MediaAsset) => {
    setMediaAssets(prev => [asset, ...prev]);
    logAction("Media Uploaded", "MediaAsset", `Uploaded asset '${asset.title}'`, asset.id);
    showToast("Asset added to Media Library!");
  };

  const deleteMediaAsset = (id: string) => {
    setMediaAssets(prev => prev.filter(m => m.id !== id));
    showToast("Asset deleted from library.");
  };

  const addBlogPost = (post: BlogPost) => {
    setBlogPosts(prev => [post, ...prev]);
    logAction("Blog Post Created", "BlogPost", `Published article '${post.title}'`, post.id);
    showToast(`Article '${post.title}' published!`);
  };

  const updateBlogPost = (id: string, updates: Partial<BlogPost>) => {
    setBlogPosts(prev => prev.map(b => b.id === id ? { ...b, ...updates } : b));
    showToast("Article updated.");
  };

  const deleteBlogPost = (id: string) => {
    setBlogPosts(prev => prev.filter(b => b.id !== id));
    showToast("Article deleted.");
  };

  const addBlogCategory = (cat: BlogCategory) => {
    setBlogCategories(prev => [...prev, cat]);
    logAction("Blog Category Added", "BlogCategory", `Added category '${cat.name}'`, cat.id);
    showToast(`Category '${cat.name}' created!`);
  };

  const deleteBlogCategory = (id: string) => {
    setBlogCategories(prev => prev.filter(c => c.id !== id));
    showToast("Category removed.");
  };

  const toggleLikeReel = (id: string) => {
    setReels(prev => prev.map(r => {
      if (r.id !== id) return r;
      const isLiked = !r.isLiked;
      return {
        ...r,
        isLiked,
        likesCount: isLiked ? r.likesCount + 1 : Math.max(0, r.likesCount - 1)
      };
    }));
  };

  const playTrack = (track: AudioTrack) => {
    setActiveTrack(track);
    setIsPlaying(true);
    showToast(`Streaming live master feed: ${track.title}`);
  };

  const togglePlayPause = () => {
    setIsPlaying(prev => !prev);
  };

  const addToSetlist = (trackTitle: string) => {
    if (!customSetlist.includes(trackTitle)) {
      setCustomSetlist(prev => [...prev, trackTitle]);
      showToast(`Added '${trackTitle}' to bespoke celebration setlist!`);
    } else {
      showToast(`'${trackTitle}' is already in your setlist.`);
    }
  };

  // Ownership transfer workflow (Section 10)
  const initiateOwnershipTransfer = (targetUserId: string) => {
    const targetUser = users.find(u => u.id === targetUserId);
    if (!targetUser) return;
    const transfer: OwnershipTransfer = {
      id: `trans-${Date.now()}`,
      currentOwnerId: currentUser.id,
      targetUserId: targetUser.id,
      targetUserEmail: targetUser.email,
      status: 'verified_by_recipient',
      initiatedAt: new Date().toLocaleString()
    };
    setOwnershipTransfer(transfer);
    logAction(
      "Ownership Transfer Initiated",
      "OwnershipTransfer",
      `Owner ${currentUser.name} initiated ownership transfer to ${targetUser.name} (${targetUser.email})`,
      transfer.id
    );
    showToast(`Transfer request dispatched to ${targetUser.name}. Step 2: Re-authentication required.`);
  };

  const confirmOwnershipTransfer = (transferId: string) => {
    if (!ownershipTransfer || ownershipTransfer.id !== transferId) return;

    const targetUser = users.find(u => u.id === ownershipTransfer.targetUserId);
    if (!targetUser) return;

    // Transactionally update roles
    setUsers(prev => prev.map(u => {
      if (u.id === targetUser.id) {
        return { ...u, role: 'website_owner' as const };
      }
      if (u.id === currentUser.id) {
        return { ...u, role: 'super_admin' as const };
      }
      return u;
    }));

    const completedTransfer: OwnershipTransfer = {
      ...ownershipTransfer,
      status: 'completed',
      completedAt: new Date().toLocaleString()
    };
    setOwnershipTransfer(null);

    logAction(
      "Ownership Transfer Finalized",
      "OwnershipTransfer",
      `Ownership of THE ROYAL BAND transferred from ${currentUser.name} to ${targetUser.name}. Audit record sealed.`,
      transferId
    );
    showToast(`Ownership successfully transferred to ${targetUser.name}!`);
  };

  const cancelOwnershipTransfer = () => {
    if (ownershipTransfer) {
      logAction("Ownership Transfer Cancelled", "OwnershipTransfer", "Cancelled by verified owner.", ownershipTransfer.id);
      setOwnershipTransfer(null);
      showToast("Ownership transfer cancelled.");
    }
  };

  const resetAllData = () => {
    localStorage.clear();
    setSettings(initialSettings);
    setPages(initialPages);
    setServices(initialServices);
    setCityHubs(initialCityHubs);
    setPackages(initialPackages);
    setLeads(initialLeads);
    setTestimonials(initialTestimonials);
    setMediaAssets(initialMediaAssets);
    setBlogPosts(initialBlogPosts);
    setAuditLogs(initialAuditLogs);
    setRouteSeoMap(INITIAL_ROUTE_SEO_MAP);
    showToast("Reset all data to production demo defaults.");
  };

  // Automated Guided Demonstrations (Demos A-H from Section 15 of Prompt)
  const runDemo = (demoCode: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H') => {
    switch (demoCode) {
      case 'A': {
        // Demo A: Owner logs in, changes homepage hero heading, replaces hero image, and publishes update.
        updatePageBlock('page-home', 'blk-hero-01', {
          title: "The Sovereign Stage. 2026 World Tour Symphony.",
          imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVFAz27xowA-sc7gI3gTVA81g6lr-DFQ6YkWNdYz5n0qBImxQgrXM01aPPlI5zd0S4_ic61wInZtC4ceJOmmLeOzRtNaluFwTdwle8TmApIDPUJCgCFwwWQRMuBTNC2kjUZijfY6_Iy_cjVVyIhO8BasehlbYNgN0_oVYFzaizmD4JVWqftIBgkVm64OqT4Fy-YvRfHQHXHFqiWduSOZLnE_6XcDN6doGO-OFjkSrYZNa7SZahxgRRTw"
        });
        publishPage('page-home');
        setActiveDemoNotice("Demo A Executed: Homepage hero heading updated to '2026 World Tour Symphony' and hero image replaced. Check Explore screen!");
        setActivePublicTab('explore');
        setIsAdminMode(false);
        break;
      }
      case 'B': {
        // Demo B: Owner changes logo and site colors. Header, footer, and relevant pages update automatically.
        updateSettings({
          primaryColor: "#ffd700",
          brandName: "THE ROYAL BAND • IMPERIAL ORCHESTRA"
        });
        setActiveDemoNotice("Demo B Executed: Brand name & primary gold accent updated! Reflected across header, footer, and cards.");
        setIsAdminMode(false);
        break;
      }
      case 'C': {
        // Demo C: Editor adds a new service page with gallery, package details, FAQ, and SEO metadata.
        const newService: ServiceItem = {
          id: `srv-${Date.now()}`,
          name: "Sufi-Rock Fusion Midnight Concert",
          tagline: "Ecstatic Mystical Alaaps & High-Voltage Electric Guitars",
          description: "A signature nighttime crescendo pairing authentic acoustic qawwali poetry with hard-hitting stadium brass and percussion.",
          imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAvGyulCTtUTZIKI_lPblSMyoVDYMJM1UyI8y3FxN6bNCTO3kFwhHtbRS7dF9_IE4wCRVN6The8DjbQhAHeXVLWCqDzr0Timz6AqNKUWZFbJZMYqI-SAUfZNU4Z_NBG0pBSvOI6rvHufP3fMaiYujNmbIxEuQMovSOYBRCqsmktKnGncrCzQw605KpujQZkcdcug_0vSO_HaNhSASiveGPqsBhuM4jIy03n_U_4ki_UcTPuIZS62jtEJQ",
          badge: "New 2026 Curation",
          tags: ["Mystic Sufi", "Midnight Sangeet", "Line-Array"],
          features: ["8 Virtuoso Sufi Vocalists & Qawwali Clappers", "Harmonium + Keyboards Dual Link", "Soundcraft Digital Board Preset"],
          duration: "90 Minutes",
          category: "wedding",
          isPublished: true,
          seo: {
            metaTitle: "Sufi-Rock Fusion Midnight Concert | The Royal Band",
            metaDescription: "Experience the ecstatic live Sufi-Rock midnight concert curated for luxury wedding sangeets.",
            slug: "sufi-rock-midnight-concert",
            canonicalUrl: "https://theroyalband.com/services/sufi-rock-midnight-concert",
            ogTitle: "Sufi-Rock Fusion Midnight Concert",
            ogDescription: "High-voltage live mystical qawwali and brass.",
            ogImageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAvGyulCTtUTZIKI_lPblSMyoVDYMJM1UyI8y3FxN6bNCTO3kFwhHtbRS7dF9_IE4wCRVN6The8DjbQhAHeXVLWCqDzr0Timz6AqNKUWZFbJZMYqI-SAUfZNU4Z_NBG0pBSvOI6rvHufP3fMaiYujNmbIxEuQMovSOYBRCqsmktKnGncrCzQw605KpujQZkcdcug_0vSO_HaNhSASiveGPqsBhuM4jIy03n_U_4ki_UcTPuIZS62jtEJQ",
            twitterCard: "summary_large_image",
            isNoIndex: false,
            isNoFollow: false,
            schemaType: "Service"
          }
        };
        addService(newService);
        setActiveDemoNotice("Demo C Executed: New service 'Sufi-Rock Fusion Midnight Concert' added with full SEO & inclusions. View Services & Cities tab!");
        setActivePublicTab('services');
        setIsAdminMode(false);
        break;
      }
      case 'D': {
        // Demo D: SEO Manager creates unique Lucknow landing page and configures canonical URL & structured data.
        const lucknowHub = cityHubs.find(c => c.name.toLowerCase().includes('lucknow'));
        if (lucknowHub) {
          updateCityHub(lucknowHub.id, {
            specialty: "Awadhi Royal Ghazal Symphony & Modern Brass Crescendo",
            acousticCertification: "Meyer Sound VIP Lab Certified (Updated 2026)",
            seo: {
              ...lucknowHub.seo,
              metaTitle: "The Royal Band Lucknow Hub | Awadhi Royal Heritage Live Orchestra",
              canonicalUrl: "https://theroyalband.com/locations/lucknow-palace-orchestra"
            }
          });
        }
        setActiveDemoNotice("Demo D Executed: Lucknow hub updated with high-relevance GEO content, LocalBusiness Schema, and customized canonical URL!");
        setAdminCurrentView('seo');
        setIsAdminMode(true);
        break;
      }
      case 'E': {
        // Demo E: Blog editor publishes a new article with images and metadata.
        const newBlog: BlogPost = {
          id: `blog-${Date.now()}`,
          title: "The VIP Bride's Guide to Orchestral First-Dance Arrangements",
          slug: "brides-guide-orchestral-first-dance",
          summary: "How bespoke royal string arrangements create cinema-level intimacy for destination weddings.",
          content: "A couple's first dance is the emotional centerpiece of the evening. Here is how our maestros compose unique string-quartet overtures recorded in high-fidelity for the moment...",
          coverImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuD8eVoV10zFbyvW0yyKPIla3cV2cFLfn2g_hotZM05wvAvUVvY0d-B9_S1d6nWbfOo2lUZ1GHwl3_9sSheGMtcCVnnyzVXjUtVZAmj5od5y-phLcMf1ykJ5GzN0ASv3YTfBudA-EpqaX62yxSoXp8rulD-K3rDehePC1kfCNuD2MRMZXSe03b38L6smHCWiXQETnGuw_D-GhOwSlK9MclbgacIBpSKnZDBdLTW_6Muq-XMXWAv5Z2ST-Q",
          category: "Bridal Curation",
          authorName: "Sunita Verma",
          publishedAt: new Date().toISOString().split('T')[0],
          status: 'published',
          readingTimeMinutes: 4,
          seo: {
            metaTitle: "VIP Bride's Guide to Orchestral First Dance | The Royal Band",
            metaDescription: "Curating bespoke string arrangements for royal palace wedding first dances.",
            slug: "brides-guide-orchestral-first-dance",
            canonicalUrl: "https://theroyalband.com/blog/brides-guide-orchestral-first-dance",
            ogTitle: "VIP Bride's Guide to Orchestral First Dance",
            ogDescription: "Cinematic intimacy with live strings.",
            ogImageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuD8eVoV10zFbyvW0yyKPIla3cV2cFLfn2g_hotZM05wvAvUVvY0d-B9_S1d6nWbfOo2lUZ1GHwl3_9sSheGMtcCVnnyzVXjUtVZAmj5od5y-phLcMf1ykJ5GzN0ASv3YTfBudA-EpqaX62yxSoXp8rulD-K3rDehePC1kfCNuD2MRMZXSe03b38L6smHCWiXQETnGuw_D-GhOwSlK9MclbgacIBpSKnZDBdLTW_6Muq-XMXWAv5Z2ST-Q",
            twitterCard: "summary_large_image",
            isNoIndex: false,
            isNoFollow: false,
            schemaType: "Article"
          }
        };
        addBlogPost(newBlog);
        setActiveDemoNotice("Demo E Executed: Article published with Article Schema, cover art, and author attribution!");
        setAdminCurrentView('blogs');
        setIsAdminMode(true);
        break;
      }
      case 'F': {
        // Demo F: Admin reviews a new booking inquiry and changes its status.
        if (leads.length > 0) {
          updateLeadStatus(leads[0].id, 'confirmed', 'VIP contract confirmed with management retainer deposit.');
        }
        setActiveDemoNotice(`Demo F Executed: Lead status updated to 'CONFIRMED' with formal audit log generated.`);
        setAdminCurrentView('leads');
        setIsAdminMode(true);
        break;
      }
      case 'G': {
        // Demo G: Verified owner securely transfers website ownership to another verified account.
        const secondUser = users.find(u => u.id !== currentUser.id);
        if (secondUser) {
          initiateOwnershipTransfer(secondUser.id);
          setActiveDemoNotice(`Demo G Executed: Ownership transfer step 1 initiated to ${secondUser.name}. See Users & Ownership module!`);
          setAdminCurrentView('users');
          setIsAdminMode(true);
        }
        break;
      }
      case 'H': {
        // Demo H: Admin restores a previous page version after an accidental change.
        const homePage = pages.find(p => p.id === 'page-home');
        if (homePage && homePage.revisions.length > 0) {
          restorePageRevision('page-home', homePage.revisions[0].id);
          setActiveDemoNotice("Demo H Executed: Restored version 1 of Explore Homepage from immutable revision history!");
          setActivePublicTab('explore');
          setIsAdminMode(false);
        }
        break;
      }
    }
  };

  return (
    <CmsContext.Provider
      value={{
        settings,
        updateSettings,
        pages,
        currentPageId,
        setCurrentPageId,
        updatePageBlock,
        addPageBlock,
        deletePageBlock,
        publishPage,
        restorePageRevision,
        updatePage,
        updatePageSeo,
        services,
        addService,
        updateService,
        deleteService,
        cityHubs,
        addCityHub,
        updateCityHub,
        deleteCityHub,
        packages,
        updatePackage,
        addPackage,
        deletePackage,
        toggleComboDjPackage,
        leads,
        submitLead,
        updateLead,
        updateLeadStatus,
        deleteLead,
        testimonials,
        toggleTestimonialApproval,
        addTestimonial,
        mediaAssets,
        addMediaAsset,
        deleteMediaAsset,
        blogPosts,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,
        blogCategories,
        addBlogCategory,
        deleteBlogCategory,
        reels,
        toggleLikeReel,
        audioTracks,
        activeTrack,
        isPlaying,
        playTrack,
        togglePlayPause,
        customSetlist,
        addToSetlist,
        users,
        currentUser,
        setCurrentUser,
        auditLogs,
        logAction,
        activePublicTab,
        setActivePublicTab,
        activeServiceSlug,
        setActiveServiceSlug,
        activeLocationSlug,
        setActiveLocationSlug,
        navigateTo,
        isAdminMode,
        setIsAdminMode,
        adminCurrentView,
        setAdminCurrentView,
        ownershipTransfer,
        initiateOwnershipTransfer,
        confirmOwnershipTransfer,
        cancelOwnershipTransfer,
        toastMessage,
        showToast,
        resetAllData,
        activeDemoNotice,
        runDemo,
        selectedCityForModal,
        setSelectedCityForModal,
        selectedServiceForModal,
        setSelectedServiceForModal,
        showShowreelModal,
        setShowShowreelModal,
        routeSeoMap,
        updateRouteSeo,
        resetRouteSeo
      }}
    >
      {children}
    </CmsContext.Provider>
  );
};

export const useCms = (): CmsContextType => {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error('useCms must be used within a CmsProvider');
  }
  return context;
};
