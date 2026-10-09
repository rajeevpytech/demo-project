import React, { useState, useMemo } from 'react';
import { useCms } from '../../context/CmsContext';
import { MAIN_ROUTES_HIERARCHY, RouteHierarchyNode, INITIAL_ROUTE_SEO_MAP } from '../../data/routeSeoData';
import { SeoMetadata } from '../../types';

export const RouteSeoManager: React.FC = () => {
  const { 
    routeSeoMap, 
    updateRouteSeo, 
    resetRouteSeo, 
    navigateTo, 
    setIsAdminMode, 
    settings,
    mediaAssets,
    showToast 
  } = useCms();

  // Selected Route key
  const [selectedRouteKey, setSelectedRouteKey] = useState<string>('home');
  // Active editor tab
  const [editorTab, setEditorTab] = useState<'core' | 'opengraph' | 'robots' | 'previews'>('core');
  // SERP preview mode
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile' | 'whatsapp' | 'social'>('desktop');
  // Search filter
  const [filterQuery, setFilterQuery] = useState<string>('');
  // Category filter
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'main' | 'service1' | 'blog' | 'service2'>('all');

  // Flattened route registry for search and quick lookup
  const flatRouteList = useMemo(() => {
    const list: {
      key: string;
      label: string;
      parentLabel: string;
      routePath: string;
      description: string;
      isMain: boolean;
      badge?: string;
      mainRouteId: string;
    }[] = [];

    MAIN_ROUTES_HIERARCHY.forEach(mainNode => {
      list.push({
        key: mainNode.id,
        label: mainNode.label,
        parentLabel: 'Main Navigation',
        routePath: mainNode.routePath,
        description: mainNode.description,
        isMain: true,
        mainRouteId: mainNode.mainRouteId
      });

      if (mainNode.subPages) {
        mainNode.subPages.forEach(sub => {
          list.push({
            key: sub.id,
            label: sub.label,
            parentLabel: mainNode.label,
            routePath: sub.routePath,
            description: sub.description,
            isMain: false,
            badge: sub.badge,
            mainRouteId: mainNode.mainRouteId
          });
        });
      }
    });

    return list;
  }, []);

  // Filtered list
  const filteredRoutes = useMemo(() => {
    return flatRouteList.filter(item => {
      // Category filter
      if (categoryFilter === 'main' && !item.isMain) return false;
      if (categoryFilter === 'service1' && !item.key.startsWith('service1/')) return false;
      if (categoryFilter === 'blog' && !item.key.startsWith('blog/')) return false;
      if (categoryFilter === 'service2' && !item.key.startsWith('service2/')) return false;

      // Query filter
      if (!filterQuery) return true;
      const q = filterQuery.toLowerCase();
      return (
        item.label.toLowerCase().includes(q) ||
        item.routePath.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.parentLabel.toLowerCase().includes(q)
      );
    });
  }, [flatRouteList, filterQuery, categoryFilter]);

  // Active route node
  const activeRouteNode = useMemo(() => {
    return flatRouteList.find(r => r.key === selectedRouteKey) || flatRouteList[0];
  }, [flatRouteList, selectedRouteKey]);

  // Active SEO object from state
  const currentSeo: SeoMetadata = useMemo(() => {
    return routeSeoMap[selectedRouteKey] || {
      metaTitle: `${activeRouteNode?.label || 'Route'} | ${settings.brandName}`,
      metaDescription: '',
      slug: activeRouteNode?.routePath.replace(/^\//, '') || '',
      canonicalUrl: `https://theroyalband.com${activeRouteNode?.routePath || ''}`,
      ogTitle: activeRouteNode?.label || '',
      ogDescription: '',
      ogImageUrl: settings.logoUrl,
      ogType: 'website',
      twitterCard: 'summary_large_image',
      isNoIndex: false,
      isNoFollow: false,
      schemaType: 'MusicGroup',
      keywords: [],
      focusKeyword: ''
    };
  }, [routeSeoMap, selectedRouteKey, activeRouteNode, settings]);

  // Form state
  const [formData, setFormData] = useState<SeoMetadata>(currentSeo);
  const [isDirty, setIsDirty] = useState(false);

  // Sync formData when selectedRouteKey changes
  React.useEffect(() => {
    setFormData(currentSeo);
    setIsDirty(false);
  }, [selectedRouteKey, routeSeoMap]);

  const handleChange = (field: keyof SeoMetadata, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setIsDirty(true);
  };

  const handleSave = () => {
    updateRouteSeo(selectedRouteKey, formData);
    setIsDirty(false);
  };

  const handleResetToDefault = () => {
    if (confirm(`Reset SEO metadata for '${activeRouteNode.label}' to default production settings?`)) {
      resetRouteSeo(selectedRouteKey);
      setIsDirty(false);
    }
  };

  const handleTestPublicRoute = () => {
    // Translate route to public navigation tab
    if (activeRouteNode.key === 'home') navigateTo('home');
    else if (activeRouteNode.key === 'about') navigateTo('about');
    else if (activeRouteNode.key === 'service1') navigateTo('service1');
    else if (activeRouteNode.key.startsWith('service1/')) {
      const slug = activeRouteNode.key.replace('service1/', '');
      navigateTo('service1', slug);
    } else if (activeRouteNode.key === 'service2') navigateTo('service2');
    else if (activeRouteNode.key.startsWith('service2/')) {
      const slug = activeRouteNode.key.replace('service2/', '');
      navigateTo('service2', slug);
    } else if (activeRouteNode.key === 'blog') navigateTo('blog');
    else if (activeRouteNode.key.startsWith('blog/')) navigateTo('blog');
    else if (activeRouteNode.key === 'gallery') navigateTo('gallery');
    else if (activeRouteNode.key === 'contact') navigateTo('contact');
    
    setIsAdminMode(false);
  };

  // Helper character count evaluation
  const titleLen = (formData.metaTitle || '').length;
  const descLen = (formData.metaDescription || '').length;

  const isTitleGood = titleLen >= 30 && titleLen <= 60;
  const isDescGood = descLen >= 120 && descLen <= 160;

  // Curated fallback royal images
  const sampleRoyalImages = [
    {
      title: 'Grand Palace Hero',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCddgIHrqFDssqCfud3_WvkQVIJut7OHepo7JZKpx03tYogGK5lmKIWdpchElaMr2SttOOOia2n4NFjNxhuVTR_ir0WscCh8xxjIzvdhpdXFwpDdwb77svmIhiSgwaxhmGgJC24IW4WUBuMAIn2VdmYCuk346YTCO529mSPAUHOgVGV265u4wV0Up4zkmVhWLzveBbEHFUF3Ae5TQxu_nSa7vaNwaYfv6OHamncjaV7hgiL134ssxAitQ'
    },
    {
      title: 'Sovereign Wedding Symphony',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjO6Sg-XnJ9_Udl1_IoTc366O4hALJGPK3m2ucFI6lIdy0hyeRSn6u3rm1NvSnp20xQZ9tZPaWDXQcaxN9UeJqjgXe0p1Of4HcG2Uvyz0OO5ZZBOej_bY2dOQKXZtYJNk0Wv_ELmC__loOJ1SB85TTQX0LS8AGsH2N8shOIf8jp9L4kUsbls0SJKUpCNKXSML_eUtNqJ4cX-Yu0BB8tsO_csQDAbG9R6PtWnzkocBGtqcAK-Lj4JjboQ'
    },
    {
      title: 'Desert Fortress Mehrangarh',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVFAz27xowA-sc7gI3gTVA81g6lr-DFQ6YkWNdYz5n0qBImxQgrXM01aPPlI5zd0S4_ic61wInZtC4ceJOmmLeOzRtNaluFwTdwle8TmApIDPUJCgCFwwWQRMuBTNC2kjUZijfY6_Iy_cjVVyIhO8BasehlbYNgN0_oVYFzaizmD4JVWqftIBgkVm64OqT4Fy-YvRfHQHXHFqiWduSOZLnE_6XcDN6doGO-OFjkSrYZNa7SZahxgRRTw'
    },
    {
      title: 'Executive Summit Gala',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDt5LhBx9wWj-misksfi9OBVa4BCx2sIlnjfa-Te0E8aRcRTxIqQumj-IfDndZw24hXEXrk6YjlA0oNuEafiHDe1EHcfJrNgZI5H6HwYOhIZIyWJUwmBk0qnjpsdQuWQY8GzmPNr26gkr1rzMTCfTsGG37XJUaYTnBnqJqR6P3h_DfFEr24qxc93pK5P3ucnuPh4Yffxbg7kFG5yP5nU_B_rT2DJ5vtUnCn3klIBZ2PShZTw66KxwcamA'
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#1c1b1e] via-[#242220] to-[#1a191c] border border-[#d4af37]/30 shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#d4af37]/20 text-[#f2ca50] border border-[#d4af37]/40">
              Admin Sub-Component &bull; Master Navigation SEO
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#2a2a2c] text-[#d0c5af] border border-[#4d4635]/40">
              7 Main Menus &bull; 13 Sub-Pages
            </span>
          </div>
          <h1 className="font-serif-luxury text-2xl font-bold text-[#f2ca50] tracking-wide">
            Route & Navigation SEO Manager
          </h1>
          <p className="text-xs text-[#d0c5af] max-w-2xl mt-1 leading-relaxed">
            Configure search engine meta titles, descriptions, canonical URLs, and Open Graph social cards for each of the 7 main website navigation menus and all their child sub-pages.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleTestPublicRoute}
            className="px-3.5 py-2 rounded-xl bg-[#2a2a2c] hover:bg-[#353437] text-xs font-semibold text-[#f2ca50] border border-[#4d4635] flex items-center gap-1.5 transition-all shadow-sm"
          >
            <span className="material-symbols-outlined text-[16px]">visibility</span>
            <span>View Live Route</span>
          </button>
          <button
            onClick={handleSave}
            disabled={!isDirty}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md ${
              isDirty 
                ? 'bg-[#d4af37] hover:bg-[#f2ca50] text-[#131315] animate-pulse' 
                : 'bg-[#201f22] text-[#99907c] border border-[#353437] cursor-not-allowed'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">save</span>
            <span>{isDirty ? 'Save Route Changes' : 'Saved Live'}</span>
          </button>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: 7 Menus & Sub-Pages Explorer (4 cols) */}
        <div className="lg:col-span-4 bg-[#141418] border border-[#4d4635]/30 rounded-2xl p-4 shadow-lg space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#353437]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#f2ca50] text-[20px]">alt_route</span>
              <h2 className="text-xs uppercase font-bold text-[#f2ca50] tracking-wider">
                Website Routes & Hierarchy
              </h2>
            </div>
            <span className="text-[11px] font-mono font-bold text-[#d0c5af]">
              {filteredRoutes.length} items
            </span>
          </div>

          {/* Search & Filter */}
          <div className="space-y-2">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-[#99907c] text-[16px]">
                search
              </span>
              <input
                type="text"
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                placeholder="Search route path or title..."
                className="w-full bg-[#1c1b1e] text-xs text-[#e5e1e4] pl-8 pr-3 py-2 rounded-xl border border-[#4d4635]/40 focus:outline-none focus:border-[#f2ca50] transition-colors placeholder:text-[#6e685c]"
              />
            </div>

            {/* Category Filter Chips */}
            <div className="flex flex-wrap gap-1">
              {[
                { id: 'all', label: 'All (20)' },
                { id: 'main', label: '7 Main Menus' },
                { id: 'service1', label: 'Service 1 Events (6)' },
                { id: 'service2', label: 'Service 2 Cities (4)' },
                { id: 'blog', label: 'Blog Posts (3)' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setCategoryFilter(cat.id as any)}
                  className={`px-2 py-1 rounded-lg text-[10px] font-semibold transition-all ${
                    categoryFilter === cat.id
                      ? 'bg-[#d4af37] text-[#131315] font-bold'
                      : 'bg-[#1c1b1e] text-[#d0c5af] hover:bg-[#2a2a2c] border border-[#353437]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Route Items List */}
          <div className="space-y-1.5 max-h-[620px] overflow-y-auto pr-1">
            {filteredRoutes.map((item) => {
              const isSelected = selectedRouteKey === item.key;
              const routeSeo = routeSeoMap[item.key] || INITIAL_ROUTE_SEO_MAP[item.key];
              const tLen = (routeSeo?.metaTitle || '').length;
              const hasOgImg = Boolean(routeSeo?.ogImageUrl);

              return (
                <button
                  key={item.key}
                  onClick={() => setSelectedRouteKey(item.key)}
                  className={`w-full text-left p-3 rounded-xl transition-all flex flex-col gap-1 border ${
                    isSelected
                      ? 'bg-[#201f22] border-[#d4af37] shadow-md shadow-[#d4af37]/10'
                      : 'bg-[#18181c] hover:bg-[#1f1e22] border-[#353437]/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      {item.isMain ? (
                        <span className="material-symbols-outlined text-[15px] text-[#f2ca50]">
                          folder
                        </span>
                      ) : (
                        <span className="material-symbols-outlined text-[14px] text-[#99907c] ml-2">
                          subdirectory_arrow_right
                        </span>
                      )}
                      <span className={`text-xs font-bold truncate max-w-[190px] ${
                        isSelected ? 'text-[#f2ca50]' : 'text-[#e5e1e4]'
                      }`}>
                        {item.label}
                      </span>
                    </div>

                    {item.isMain ? (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-[#d4af37]/20 text-[#f2ca50] border border-[#d4af37]/30">
                        Main Menu
                      </span>
                    ) : item.badge ? (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-[#2a2a2c] text-[#d4c78f] border border-[#4d4635]/40 truncate max-w-[80px]">
                        {item.badge}
                      </span>
                    ) : null}
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-[#99907c] font-mono mt-0.5">
                    <span className="truncate max-w-[200px] text-[#d0c5af]">
                      {item.routePath}
                    </span>
                    <div className="flex items-center gap-1">
                      <span 
                        title={`Title length: ${tLen} chars`}
                        className={`w-2 h-2 rounded-full ${
                          tLen >= 30 && tLen <= 60 ? 'bg-emerald-400' : 'bg-amber-400'
                        }`} 
                      />
                      <span 
                        title={hasOgImg ? 'Open Graph image set' : 'Missing OG image'}
                        className={`material-symbols-outlined text-[12px] ${
                          hasOgImg ? 'text-[#f2ca50]' : 'text-[#6e685c]'
                        }`}
                      >
                        image
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="p-3 rounded-xl bg-[#1c1b1e] border border-[#4d4635]/30 text-[11px] text-[#d0c5af] flex items-center justify-between">
            <span>Audit Standard: Google & Social</span>
            <span className="text-[#f2ca50] font-bold">100% Synced</span>
          </div>
        </div>

        {/* Right Column: SEO & Open Graph Editor (8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          {/* Active Route Header Card */}
          <div className="p-5 rounded-2xl bg-[#18181c] border border-[#4d4635]/40 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold text-[#99907c] uppercase tracking-wider">
                  {activeRouteNode.parentLabel} &bull; {activeRouteNode.isMain ? 'Main Menu' : 'Dropdown Sub-Page'}
                </span>
                <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-[#141418] text-[#f2ca50] border border-[#d4af37]/40">
                  {activeRouteNode.routePath}
                </span>
              </div>
              <h2 className="text-lg font-bold text-[#e5e1e4] font-serif-luxury">
                {activeRouteNode.label}
              </h2>
              <p className="text-xs text-[#99907c] mt-0.5 max-w-xl">
                {activeRouteNode.description}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleResetToDefault}
                className="px-3 py-1.5 rounded-lg bg-[#201f22] hover:bg-[#2a2a2c] text-[#d0c5af] hover:text-[#f2ca50] text-xs font-semibold border border-[#353437] flex items-center gap-1 transition-all"
                title="Reset to recommended defaults"
              >
                <span className="material-symbols-outlined text-[14px]">history</span>
                <span>Reset Default</span>
              </button>
              <button
                onClick={handleTestPublicRoute}
                className="px-3 py-1.5 rounded-lg bg-[#d4af37] hover:bg-[#f2ca50] text-[#131315] text-xs font-bold flex items-center gap-1 transition-all"
              >
                <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                <span>Preview Route</span>
              </button>
            </div>
          </div>

          {/* Editor Tabs Navigation */}
          <div className="flex items-center border-b border-[#353437] gap-2 overflow-x-auto pb-1">
            {[
              { id: 'core', label: '1. Title & Meta Description', icon: 'title' },
              { id: 'opengraph', label: '2. Open Graph & Social Cards', icon: 'share' },
              { id: 'robots', label: '3. Robots & Structured Data', icon: 'schema' },
              { id: 'previews', label: '4. Multi-Platform Previews', icon: 'devices' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setEditorTab(tab.id as any)}
                className={`px-3.5 py-2.5 rounded-t-xl text-xs font-bold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
                  editorTab === tab.id
                    ? 'border-[#d4af37] text-[#f2ca50] bg-[#1c1b1e]'
                    : 'border-transparent text-[#99907c] hover:text-[#e5e1e4] hover:bg-[#18181c]'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* TAB 1: Core SEO Metadata */}
          {editorTab === 'core' && (
            <div className="bg-[#18181c] border border-[#4d4635]/30 rounded-2xl p-6 shadow-xl space-y-6 animate-in fade-in duration-200">
              {/* Meta Page Title */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#e5e1e4] uppercase tracking-wider flex items-center gap-1.5">
                    <span>Meta Page Title (`&lt;title&gt;`)</span>
                    <span className="text-[#f2ca50]">*</span>
                  </label>
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className={`px-2 py-0.5 rounded font-bold ${
                      isTitleGood ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-600/40' : 'bg-amber-950/80 text-amber-300 border border-amber-600/40'
                    }`}>
                      {titleLen}/60 chars {isTitleGood ? '• Optimal' : titleLen < 30 ? '• Too short' : '• Truncates'}
                    </span>
                  </div>
                </div>

                <input
                  type="text"
                  value={formData.metaTitle}
                  onChange={(e) => handleChange('metaTitle', e.target.value)}
                  placeholder="e.g. Wedding Performances & Royal Orchestra | The Royal Band"
                  className="w-full bg-[#131315] text-sm text-[#e5e1e4] px-4 py-3 rounded-xl border border-[#4d4635] focus:outline-none focus:border-[#f2ca50] transition-colors"
                />
                <p className="text-[11px] text-[#99907c]">
                  Appears in browser tabs and as the primary headline in Google search snippets. Keep between 30 and 60 characters for best SEO score.
                </p>
              </div>

              {/* Meta Description */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#e5e1e4] uppercase tracking-wider flex items-center gap-1.5">
                    <span>Meta Description (`&lt;meta name="description"&gt;`)</span>
                    <span className="text-[#f2ca50]">*</span>
                  </label>
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className={`px-2 py-0.5 rounded font-bold ${
                      isDescGood ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-600/40' : 'bg-amber-950/80 text-amber-300 border border-amber-600/40'
                    }`}>
                      {descLen}/160 chars {isDescGood ? '• Optimal' : descLen < 120 ? '• Too short' : '• Truncates'}
                    </span>
                  </div>
                </div>

                <textarea
                  rows={3}
                  value={formData.metaDescription}
                  onChange={(e) => handleChange('metaDescription', e.target.value)}
                  placeholder="Compelling 1–2 sentence summary explaining service availability and unique value proposition..."
                  className="w-full bg-[#131315] text-xs text-[#e5e1e4] px-4 py-3 rounded-xl border border-[#4d4635] focus:outline-none focus:border-[#f2ca50] transition-colors leading-relaxed"
                />
                <p className="text-[11px] text-[#99907c]">
                  Search engines show this snippet beneath the page title. Recommended length is 120 to 160 characters.
                </p>
              </div>

              {/* Canonical URL & Focus Keyword */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-[#353437]">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#d0c5af] block">
                    Canonical URL (`rel="canonical"`)
                  </label>
                  <input
                    type="text"
                    value={formData.canonicalUrl}
                    onChange={(e) => handleChange('canonicalUrl', e.target.value)}
                    placeholder="https://theroyalband.com/..."
                    className="w-full bg-[#131315] font-mono text-xs text-[#d4c78f] px-3.5 py-2.5 rounded-xl border border-[#4d4635] focus:outline-none focus:border-[#f2ca50]"
                  />
                  <span className="text-[10px] text-[#99907c] block">
                    Prevents duplicate content penalties across domains.
                  </span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#d0c5af] block">
                    Primary Focus Keyword
                  </label>
                  <input
                    type="text"
                    value={formData.focusKeyword || ''}
                    onChange={(e) => handleChange('focusKeyword', e.target.value)}
                    placeholder="e.g. royal wedding live band"
                    className="w-full bg-[#131315] text-xs text-[#e5e1e4] px-3.5 py-2.5 rounded-xl border border-[#4d4635] focus:outline-none focus:border-[#f2ca50]"
                  />
                  <span className="text-[10px] text-[#99907c] block">
                    Target keyword phrase for density &amp; snippet relevance.
                  </span>
                </div>
              </div>

              {/* Quick Sync Helper */}
              <div className="p-4 rounded-xl bg-[#1c1b1e] border border-[#4d4635]/40 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-[#d0c5af]">
                  <span className="font-bold text-[#f2ca50]">Quick Sync:</span> Copy this title and description directly to Open Graph social tags?
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      ogTitle: prev.metaTitle,
                      ogDescription: prev.metaDescription
                    }));
                    setIsDirty(true);
                    showToast("Synchronized title and description to Open Graph!");
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-[#2a2a2c] hover:bg-[#353437] text-xs font-bold text-[#f2ca50] border border-[#4d4635] transition-all flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[15px]">sync_alt</span>
                  <span>Sync to Open Graph</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: Open Graph & Social Cards */}
          {editorTab === 'opengraph' && (
            <div className="bg-[#18181c] border border-[#4d4635]/30 rounded-2xl p-6 shadow-xl space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-[#353437]">
                <div>
                  <h3 className="text-sm font-bold text-[#f2ca50] uppercase tracking-wider">
                    Open Graph (og:*) & Twitter Card Tags
                  </h3>
                  <p className="text-xs text-[#99907c]">
                    Controls how this route looks when shared on WhatsApp, Facebook, LinkedIn, iMessage, and X/Twitter.
                  </p>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#2a2a2c] text-[#d4c78f] border border-[#4d4635]">
                  og:type = {formData.ogType || 'website'}
                </span>
              </div>

              {/* OG Title */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#e5e1e4]">
                    Social Share Title (`og:title`)
                  </label>
                  <button
                    onClick={() => handleChange('ogTitle', formData.metaTitle)}
                    className="text-[11px] font-bold text-[#f2ca50] hover:underline"
                  >
                    Copy from Meta Title
                  </button>
                </div>
                <input
                  type="text"
                  value={formData.ogTitle}
                  onChange={(e) => handleChange('ogTitle', e.target.value)}
                  placeholder="Catchy social media card headline..."
                  className="w-full bg-[#131315] text-xs text-[#e5e1e4] px-3.5 py-2.5 rounded-xl border border-[#4d4635] focus:outline-none focus:border-[#f2ca50]"
                />
              </div>

              {/* OG Description */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#e5e1e4]">
                    Social Share Summary (`og:description`)
                  </label>
                  <button
                    onClick={() => handleChange('ogDescription', formData.metaDescription)}
                    className="text-[11px] font-bold text-[#f2ca50] hover:underline"
                  >
                    Copy from Meta Description
                  </button>
                </div>
                <textarea
                  rows={2}
                  value={formData.ogDescription}
                  onChange={(e) => handleChange('ogDescription', e.target.value)}
                  placeholder="Short description displayed on rich social cards..."
                  className="w-full bg-[#131315] text-xs text-[#e5e1e4] px-3.5 py-2.5 rounded-xl border border-[#4d4635] focus:outline-none focus:border-[#f2ca50]"
                />
              </div>

              {/* OG Image URL */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-[#e5e1e4] block">
                  Open Graph Image (`og:image`)
                </label>
                
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="w-full sm:w-44 h-28 rounded-xl bg-[#131315] border border-[#4d4635] overflow-hidden flex-shrink-0 relative group">
                    {formData.ogImageUrl ? (
                      <img
                        src={formData.ogImageUrl}
                        alt="OG Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-[#6e685c]">
                        <span className="material-symbols-outlined text-[24px]">image_not_supported</span>
                        <span className="text-[10px]">No image set</span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 space-y-2 w-full">
                    <input
                      type="text"
                      value={formData.ogImageUrl}
                      onChange={(e) => handleChange('ogImageUrl', e.target.value)}
                      placeholder="https://..."
                      className="w-full bg-[#131315] font-mono text-xs text-[#d4c78f] px-3.5 py-2.5 rounded-xl border border-[#4d4635] focus:outline-none focus:border-[#f2ca50]"
                    />
                    <div className="text-[11px] text-[#99907c]">
                      Recommended image size: 1200 x 630 pixels. Select a high-resolution royal orchestra asset below:
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {sampleRoyalImages.map((img, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleChange('ogImageUrl', img.url)}
                          className="px-2.5 py-1 rounded-lg bg-[#201f22] hover:bg-[#2a2a2c] text-[10px] font-semibold text-[#d0c5af] hover:text-[#f2ca50] border border-[#353437] transition-all"
                        >
                          {img.title}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Configuration Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-[#353437]">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#d0c5af] block">
                    Twitter Card Format (`twitter:card`)
                  </label>
                  <select
                    value={formData.twitterCard}
                    onChange={(e) => handleChange('twitterCard', e.target.value)}
                    className="w-full bg-[#131315] text-xs text-[#e5e1e4] px-3.5 py-2.5 rounded-xl border border-[#4d4635] focus:outline-none"
                  >
                    <option value="summary_large_image">summary_large_image (Large Hero Card - Recommended)</option>
                    <option value="summary">summary (Compact Square Thumbnail)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#d0c5af] block">
                    Open Graph Type (`og:type`)
                  </label>
                  <select
                    value={formData.ogType || 'website'}
                    onChange={(e) => handleChange('ogType', e.target.value)}
                    className="w-full bg-[#131315] text-xs text-[#e5e1e4] px-3.5 py-2.5 rounded-xl border border-[#4d4635] focus:outline-none"
                  >
                    <option value="website">website (Standard Page)</option>
                    <option value="music.band">music.band (Live Orchestra / Band)</option>
                    <option value="article">article (Blog / Editorial Chronicle)</option>
                    <option value="business.business">business.business (Local Venue / City Hub)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Robots & Structured Data */}
          {editorTab === 'robots' && (
            <div className="bg-[#18181c] border border-[#4d4635]/30 rounded-2xl p-6 shadow-xl space-y-6 animate-in fade-in duration-200">
              <div className="pb-3 border-b border-[#353437]">
                <h3 className="text-sm font-bold text-[#f2ca50] uppercase tracking-wider">
                  Robots Crawling & Schema.org Structured Data
                </h3>
                <p className="text-xs text-[#99907c]">
                  Control indexing directives for search spiders and structured rich snippet markup.
                </p>
              </div>

              {/* Directives Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#131315] border border-[#4d4635]/40 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#e5e1e4] block">Index Directives</span>
                    <span className="text-[11px] text-[#99907c]">
                      {formData.isNoIndex ? 'Noindex (Excluded from Google)' : 'Index (Available in Google Search)'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleChange('isNoIndex', !formData.isNoIndex)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      formData.isNoIndex
                        ? 'bg-rose-900/60 text-rose-200 border border-rose-600/50'
                        : 'bg-emerald-950/60 text-emerald-300 border border-emerald-600/50'
                    }`}
                  >
                    {formData.isNoIndex ? 'noindex' : 'index'}
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-[#131315] border border-[#4d4635]/40 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#e5e1e4] block">Follow Directives</span>
                    <span className="text-[11px] text-[#99907c]">
                      {formData.isNoFollow ? 'Nofollow (Spiders ignore links)' : 'Follow (Spiders crawl child links)'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleChange('isNoFollow', !formData.isNoFollow)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      formData.isNoFollow
                        ? 'bg-amber-900/60 text-amber-200 border border-amber-600/50'
                        : 'bg-emerald-950/60 text-emerald-300 border border-emerald-600/50'
                    }`}
                  >
                    {formData.isNoFollow ? 'nofollow' : 'follow'}
                  </button>
                </div>
              </div>

              {/* Schema.org Type */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold text-[#d0c5af] block">
                  Schema.org Structured Entity Type (`JSON-LD`)
                </label>
                <select
                  value={formData.schemaType}
                  onChange={(e) => handleChange('schemaType', e.target.value)}
                  className="w-full bg-[#131315] text-xs text-[#e5e1e4] px-3.5 py-2.5 rounded-xl border border-[#4d4635] focus:outline-none"
                >
                  <option value="MusicGroup">MusicGroup (Orchestra, Performing Band)</option>
                  <option value="LocalBusiness">LocalBusiness (City Hubs: Agra, Mathura, Lucknow, Jodhpur)</option>
                  <option value="Service">Service (Event Performance Types & Packages)</option>
                  <option value="Article">Article (Editorial & Blog Chronicle)</option>
                  <option value="Organization">Organization (Brand Headquarters)</option>
                </select>
              </div>

              {/* JSON-LD Preview Box */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-[#99907c]">
                  <span>Live Schema.org JSON-LD Payload:</span>
                  <span className="font-mono text-[10px] text-[#f2ca50]">application/ld+json</span>
                </div>
                <pre className="p-3.5 rounded-xl bg-[#0e0e10] border border-[#353437] font-mono text-[11px] text-[#d4c78f] overflow-x-auto leading-relaxed">
{JSON.stringify({
  "@context": "https://schema.org",
  "@type": formData.schemaType,
  "name": formData.metaTitle,
  "description": formData.metaDescription,
  "url": formData.canonicalUrl,
  "image": formData.ogImageUrl,
  "publisher": {
    "@type": "MusicGroup",
    "name": settings.brandName,
    "telephone": settings.phone
  }
}, null, 2)}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 4: Multi-Platform Previews */}
          {editorTab === 'previews' && (
            <div className="bg-[#18181c] border border-[#4d4635]/30 rounded-2xl p-6 shadow-xl space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-[#353437]">
                <h3 className="text-sm font-bold text-[#f2ca50] uppercase tracking-wider">
                  Live SERP & Social Previews
                </h3>

                <div className="flex items-center gap-1 bg-[#131315] p-1 rounded-xl border border-[#353437]">
                  {[
                    { id: 'desktop', label: 'Google Desktop' },
                    { id: 'mobile', label: 'Google Mobile' },
                    { id: 'social', label: 'Facebook / OG' },
                    { id: 'whatsapp', label: 'WhatsApp' }
                  ].map(dev => (
                    <button
                      key={dev.id}
                      onClick={() => setPreviewDevice(dev.id as any)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                        previewDevice === dev.id
                          ? 'bg-[#d4af37] text-[#131315] font-bold'
                          : 'text-[#d0c5af] hover:text-[#e5e1e4]'
                      }`}
                    >
                      {dev.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 1. Google Desktop Preview */}
              {previewDevice === 'desktop' && (
                <div className="p-6 rounded-2xl bg-[#202124] border border-[#3c4043] font-sans shadow-inner max-w-2xl">
                  <div className="flex items-center gap-2 mb-1.5">
                    <img src={settings.logoUrl} alt="Favicon" className="w-4 h-4 rounded-full object-cover" />
                    <span className="text-[12px] text-[#dadce0] font-medium">theroyalband.com</span>
                    <span className="text-[12px] text-[#bdc1c6]">&rsaquo; {activeRouteNode.routePath.replace(/^\//, '')}</span>
                  </div>
                  <h4 className="text-[18px] text-[#8ab4f8] hover:underline cursor-pointer font-medium leading-snug">
                    {formData.metaTitle || 'Default Page Title'}
                  </h4>
                  <p className="text-[13px] text-[#bdc1c6] mt-1.5 leading-relaxed">
                    {formData.metaDescription || 'No description entered yet. Add a descriptive summary to improve click-through rates.'}
                  </p>
                </div>
              )}

              {/* 2. Google Mobile Preview */}
              {previewDevice === 'mobile' && (
                <div className="p-5 rounded-2xl bg-[#202124] border border-[#3c4043] font-sans shadow-inner max-w-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <img src={settings.logoUrl} alt="Favicon" className="w-4 h-4 rounded-full object-cover" />
                    <span className="text-[11px] text-[#dadce0] font-medium">theroyalband.com</span>
                  </div>
                  <h4 className="text-[16px] text-[#8ab4f8] font-medium leading-snug">
                    {formData.metaTitle || 'Default Page Title'}
                  </h4>
                  <p className="text-[12px] text-[#bdc1c6] mt-1 leading-relaxed">
                    {formData.metaDescription || 'No description entered yet.'}
                  </p>
                </div>
              )}

              {/* 3. Facebook / LinkedIn Card Preview */}
              {previewDevice === 'social' && (
                <div className="max-w-md rounded-2xl overflow-hidden border border-[#3c4043] bg-[#242526] shadow-xl">
                  {formData.ogImageUrl && (
                    <div className="w-full h-52 bg-black overflow-hidden">
                      <img src={formData.ogImageUrl} alt="Card Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="p-4 bg-[#242526]">
                    <span className="text-[10px] text-[#b0b3b8] uppercase tracking-wider font-mono">
                      THEROYALBAND.COM &bull; {formData.ogType || 'WEBSITE'}
                    </span>
                    <h4 className="text-sm font-bold text-[#e4e6eb] mt-1 line-clamp-2">
                      {formData.ogTitle || formData.metaTitle}
                    </h4>
                    <p className="text-xs text-[#b0b3b8] mt-1 line-clamp-2">
                      {formData.ogDescription || formData.metaDescription}
                    </p>
                  </div>
                </div>
              )}

              {/* 4. WhatsApp Chat Bubble Preview */}
              {previewDevice === 'whatsapp' && (
                <div className="max-w-sm p-3.5 rounded-2xl bg-[#0b141a] border border-[#202c33] shadow-xl">
                  <div className="p-2.5 rounded-xl bg-[#202c33] border border-[#2a3942] space-y-2">
                    {formData.ogImageUrl && (
                      <div className="w-full h-40 rounded-lg overflow-hidden bg-black">
                        <img src={formData.ogImageUrl} alt="Card Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div>
                      <h4 className="text-xs font-bold text-[#e9edef] line-clamp-2">
                        {formData.ogTitle || formData.metaTitle}
                      </h4>
                      <p className="text-[11px] text-[#8696a0] mt-0.5 line-clamp-2">
                        {formData.ogDescription || formData.metaDescription}
                      </p>
                      <span className="text-[10px] text-[#00a884] font-mono mt-1 block">
                        theroyalband.com{activeRouteNode.routePath}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Bottom Sticky Action Bar */}
          <div className="p-4 rounded-2xl bg-[#141418] border border-[#d4af37]/40 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-[#d0c5af]">
              <span className={`w-2.5 h-2.5 rounded-full ${isDirty ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`} />
              <span>
                {isDirty ? 'Unsaved edits detected for this route.' : 'All changes saved live and active in DOM.'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleResetToDefault}
                className="px-3.5 py-2 rounded-xl bg-[#201f22] hover:bg-[#2a2a2c] text-xs font-semibold text-[#d0c5af] border border-[#353437] transition-all"
              >
                Reset Default
              </button>
              <button
                onClick={handleSave}
                disabled={!isDirty}
                className={`px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-lg ${
                  isDirty
                    ? 'bg-[#d4af37] hover:bg-[#f2ca50] text-[#131315] shadow-[#d4af37]/20 cursor-pointer'
                    : 'bg-[#201f22] text-[#99907c] border border-[#353437] cursor-not-allowed'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">publish</span>
                <span>Save & Publish Live</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
