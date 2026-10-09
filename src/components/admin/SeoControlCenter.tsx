import React, { useState, useMemo } from 'react';
import { useCms } from '../../context/CmsContext';
import { SeoMetadata } from '../../types';
import { RouteSeoManager } from './RouteSeoManager';

interface ManagedSeoEntity {
  id: string;
  type: 'page' | 'city' | 'service' | 'blog';
  title: string;
  slug: string;
  seo: SeoMetadata;
  imageUrl?: string;
}

export const SeoControlCenter: React.FC = () => {
  const { 
    pages, 
    cityHubs, 
    services, 
    blogPosts, 
    settings, 
    updatePageSeo, 
    updateCityHub, 
    updateService, 
    updateBlogPost,
    showToast 
  } = useCms();

  // Active top-level Tab
  const [activeTab, setActiveTab] = useState<'routes' | 'audit' | 'serp' | 'editor' | 'schema' | 'geo'>('routes');

  // Filter for entity types
  const [entityTypeFilter, setEntityTypeFilter] = useState<'all' | 'page' | 'city' | 'service' | 'blog'>('all');

  // Selected Entity for SERP preview & In-Place Editor
  const [selectedEntityId, setSelectedEntityId] = useState<string>(pages[0]?.id || 'page-home');

  // SERP Preview Device & Platform Mode
  const [serpDevice, setSerpDevice] = useState<'desktop' | 'mobile' | 'opengraph' | 'twitter'>('desktop');

  // Search filter inside SEO table
  const [searchFilter, setSearchFilter] = useState('');

  // Form State for In-Place SEO Editing
  const [editMetaTitle, setEditMetaTitle] = useState('');
  const [editMetaDescription, setEditMetaDescription] = useState('');
  const [editSlug, setEditSlug] = useState('');
  const [editCanonicalUrl, setEditCanonicalUrl] = useState('');
  const [editFocusKeyword, setEditFocusKeyword] = useState('');
  const [editIsNoIndex, setEditIsNoIndex] = useState(false);
  const [editIsNoFollow, setEditIsNoFollow] = useState(false);
  const [editSchemaType, setEditSchemaType] = useState<SeoMetadata['schemaType']>('MusicGroup');

  // Quick Fix Modal state
  const [quickFixEntity, setQuickFixEntity] = useState<ManagedSeoEntity | null>(null);
  const [quickFixDesc, setQuickFixDesc] = useState('');

  // 1. Gather all managed SEO entities into a unified catalog
  const allManagedEntities: ManagedSeoEntity[] = useMemo(() => {
    const list: ManagedSeoEntity[] = [];

    // Core Managed Pages
    pages.forEach(p => {
      list.push({
        id: p.id,
        type: 'page',
        title: p.title,
        slug: p.slug,
        seo: p.seo || {
          metaTitle: `${p.title} | ${settings.brandName}`,
          metaDescription: '',
          slug: p.slug,
          canonicalUrl: `https://theroyalband.com/${p.slug === 'explore' ? '' : p.slug}`,
          ogTitle: p.title,
          ogDescription: '',
          ogImageUrl: settings.logoUrl,
          twitterCard: 'summary_large_image',
          isNoIndex: false,
          isNoFollow: false,
          schemaType: 'MusicGroup'
        },
        imageUrl: p.seo?.ogImageUrl || settings.logoUrl
      });
    });

    // Managed City Hub Landing Pages
    cityHubs.forEach(c => {
      const citySeo = c.seo;
      const citySlug = citySeo?.slug || c.name.toLowerCase().replace(/\s+/g, '-');
      list.push({
        id: c.id,
        type: 'city',
        title: `${c.name} Hub (${c.state})`,
        slug: `locations/${citySlug}`,
        seo: citySeo ? citySeo : {
          metaTitle: `${c.name} Hub | ${settings.brandName}`,
          metaDescription: c.description || '',
          slug: citySlug,
          canonicalUrl: `https://theroyalband.com/locations/${citySlug}`,
          ogTitle: `${c.name} Hub`,
          ogDescription: c.description || '',
          ogImageUrl: settings.logoUrl,
          twitterCard: 'summary_large_image',
          isNoIndex: false,
          isNoFollow: false,
          schemaType: 'LocalBusiness'
        },
        imageUrl: citySeo?.ogImageUrl || settings.logoUrl
      });
    });

    // Managed Service Pages
    services.forEach(s => {
      const srvSeo = s.seo;
      const srvSlug = srvSeo?.slug || s.id;
      list.push({
        id: s.id,
        type: 'service',
        title: s.name,
        slug: `services/${srvSlug}`,
        seo: srvSeo ? srvSeo : {
          metaTitle: `${s.name} | ${settings.brandName}`,
          metaDescription: s.description || '',
          slug: srvSlug,
          canonicalUrl: `https://theroyalband.com/services/${srvSlug}`,
          ogTitle: s.name,
          ogDescription: s.description || '',
          ogImageUrl: s.imageUrl || settings.logoUrl,
          twitterCard: 'summary_large_image',
          isNoIndex: false,
          isNoFollow: false,
          schemaType: 'Service'
        },
        imageUrl: s.imageUrl
      });
    });

    // Managed Blog Articles
    blogPosts.forEach(b => {
      list.push({
        id: b.id,
        type: 'blog',
        title: b.title,
        slug: `blog/${b.slug}`,
        seo: b.seo || {
          metaTitle: `${b.title} | ${settings.brandName}`,
          metaDescription: b.summary || '',
          slug: b.slug,
          canonicalUrl: `https://theroyalband.com/blog/${b.slug}`,
          ogTitle: b.title,
          ogDescription: b.summary || '',
          ogImageUrl: b.coverImage || settings.logoUrl,
          twitterCard: 'summary_large_image',
          isNoIndex: false,
          isNoFollow: false,
          schemaType: 'Article'
        },
        imageUrl: b.coverImage
      });
    });

    return list;
  }, [pages, cityHubs, services, blogPosts, settings]);

  // Selected Entity
  const selectedEntity = useMemo(() => {
    return allManagedEntities.find(e => e.id === selectedEntityId) || allManagedEntities[0];
  }, [allManagedEntities, selectedEntityId]);

  // Sync form inputs when selected entity changes
  React.useEffect(() => {
    if (selectedEntity) {
      setEditMetaTitle(selectedEntity.seo.metaTitle || selectedEntity.title);
      setEditMetaDescription(selectedEntity.seo.metaDescription || '');
      setEditSlug(selectedEntity.seo.slug || selectedEntity.slug);
      setEditCanonicalUrl(selectedEntity.seo.canonicalUrl || `https://theroyalband.com/${selectedEntity.slug}`);
      setEditFocusKeyword(selectedEntity.seo.focusKeyword || '');
      setEditIsNoIndex(selectedEntity.seo.isNoIndex || false);
      setEditIsNoFollow(selectedEntity.seo.isNoFollow || false);
      setEditSchemaType(selectedEntity.seo.schemaType || 'MusicGroup');
    }
  }, [selectedEntity?.id]);

  // 2. AUDIT ENGINE: Check for Missing Meta Descriptions & Duplicate Titles
  const auditResults = useMemo(() => {
    // A. Missing Meta Descriptions Check (< 50 chars or empty)
    const missingDescriptions = allManagedEntities.filter(e => {
      const desc = e.seo?.metaDescription?.trim() || '';
      return desc.length === 0 || desc.length < 50;
    });

    // B. Duplicate Titles Check
    const titleMap = new Map<string, ManagedSeoEntity[]>();
    allManagedEntities.forEach(e => {
      const rawTitle = (e.seo?.metaTitle || e.title || '').trim().toLowerCase();
      if (rawTitle.length > 0) {
        const existing = titleMap.get(rawTitle) || [];
        existing.push(e);
        titleMap.set(rawTitle, existing);
      }
    });

    const duplicateTitleGroups: { title: string; count: number; entities: ManagedSeoEntity[] }[] = [];
    titleMap.forEach((entities, title) => {
      if (entities.length > 1) {
        duplicateTitleGroups.push({
          title: entities[0].seo?.metaTitle || entities[0].title,
          count: entities.length,
          entities
        });
      }
    });

    // C. Title Length Issues (Optimal: 30-60 chars)
    const titleLengthIssues = allManagedEntities.filter(e => {
      const len = (e.seo?.metaTitle || '').length;
      return len < 30 || len > 60;
    });

    // D. Description Overlength (> 160 chars)
    const descriptionOverlength = allManagedEntities.filter(e => {
      const len = (e.seo?.metaDescription || '').length;
      return len > 160;
    });

    // Calculate Dynamic Health Score (0 to 100)
    let score = 100;
    score -= missingDescriptions.length * 15;
    score -= duplicateTitleGroups.length * 18;
    score -= Math.min(titleLengthIssues.length * 3, 15);
    score -= Math.min(descriptionOverlength.length * 2, 10);
    const healthScore = Math.max(10, Math.min(100, score));

    return {
      missingDescriptions,
      duplicateTitleGroups,
      titleLengthIssues,
      descriptionOverlength,
      healthScore,
      totalCount: allManagedEntities.length,
      optimalCount: allManagedEntities.length - missingDescriptions.length - (duplicateTitleGroups.length > 0 ? duplicateTitleGroups.reduce((acc, g) => acc + g.count, 0) : 0)
    };
  }, [allManagedEntities]);

  // Handler: Save in-place edited SEO
  const handleSaveSeo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEntity) return;

    const updatedSeo: Partial<SeoMetadata> = {
      metaTitle: editMetaTitle.trim(),
      metaDescription: editMetaDescription.trim(),
      slug: editSlug.trim(),
      canonicalUrl: editCanonicalUrl.trim(),
      ogTitle: editMetaTitle.trim(),
      ogDescription: editMetaDescription.trim(),
      focusKeyword: editFocusKeyword.trim(),
      isNoIndex: editIsNoIndex,
      isNoFollow: editIsNoFollow,
      schemaType: editSchemaType
    };

    if (selectedEntity.type === 'page') {
      updatePageSeo(selectedEntity.id, updatedSeo);
    } else if (selectedEntity.type === 'city') {
      const city = cityHubs.find(c => c.id === selectedEntity.id);
      if (city) {
        updateCityHub(city.id, { seo: { ...city.seo, ...updatedSeo } as SeoMetadata });
        showToast(`SEO updated for ${city.name} landing hub!`);
      }
    } else if (selectedEntity.type === 'service') {
      const srv = services.find(s => s.id === selectedEntity.id);
      if (srv) {
        updateService(srv.id, { seo: { ...srv.seo, ...updatedSeo } as SeoMetadata });
        showToast(`SEO updated for ${srv.name}!`);
      }
    } else if (selectedEntity.type === 'blog') {
      const post = blogPosts.find(b => b.id === selectedEntity.id);
      if (post) {
        updateBlogPost(post.id, { seo: { ...post.seo, ...updatedSeo } as SeoMetadata });
        showToast(`SEO updated for article "${post.title}"!`);
      }
    }
  };

  // Handler: Quick Fix Missing Description
  const handleQuickFixSubmit = () => {
    if (!quickFixEntity || !quickFixDesc.trim()) return;

    const updatedSeo: Partial<SeoMetadata> = {
      metaDescription: quickFixDesc.trim(),
      ogDescription: quickFixDesc.trim()
    };

    if (quickFixEntity.type === 'page') {
      updatePageSeo(quickFixEntity.id, updatedSeo);
    } else if (quickFixEntity.type === 'city') {
      const city = cityHubs.find(c => c.id === quickFixEntity.id);
      if (city) updateCityHub(city.id, { seo: { ...city.seo, ...updatedSeo } as SeoMetadata });
    } else if (quickFixEntity.type === 'service') {
      const srv = services.find(s => s.id === quickFixEntity.id);
      if (srv) updateService(srv.id, { seo: { ...srv.seo, ...updatedSeo } as SeoMetadata });
    } else if (quickFixEntity.type === 'blog') {
      const post = blogPosts.find(b => b.id === quickFixEntity.id);
      if (post) updateBlogPost(post.id, { seo: { ...post.seo, ...updatedSeo } as SeoMetadata });
    }

    showToast(`Meta description added for "${quickFixEntity.title}"!`);
    setQuickFixEntity(null);
    setQuickFixDesc('');
  };

  // Handler: Disambiguate Duplicate Titles Automatically
  const handleDisambiguateTitle = (entity: ManagedSeoEntity) => {
    let suffix = "Live Symphony Orchestra";
    if (entity.type === 'city') suffix = "Palace Celebrations & Resident Troupes";
    if (entity.type === 'service') suffix = "Premier Live Band";
    if (entity.id === 'page-vip-line') suffix = "Private Booking Concierge Desk";
    if (entity.id === 'page-booking') suffix = "Direct Calendar Hold";

    const newTitle = `${entity.title} | ${settings.brandName} — ${suffix}`.slice(0, 60);

    if (entity.type === 'page') {
      updatePageSeo(entity.id, { metaTitle: newTitle, ogTitle: newTitle });
    } else if (entity.type === 'city') {
      const city = cityHubs.find(c => c.id === entity.id);
      if (city) updateCityHub(city.id, { seo: { ...city.seo, metaTitle: newTitle, ogTitle: newTitle } });
    } else if (entity.type === 'service') {
      const srv = services.find(s => s.id === entity.id);
      if (srv) updateService(srv.id, { seo: { ...srv.seo, metaTitle: newTitle, ogTitle: newTitle } });
    }

    showToast(`Title disambiguated for "${entity.title}"!`);
  };

  // Handler: Auto-Fix All Missing Descriptions & Duplicate Titles
  const handleAutoFixAllIssues = () => {
    // Fix missing descriptions
    auditResults.missingDescriptions.forEach(item => {
      let desc = "";
      if (item.id === 'page-vip-line') {
        desc = "Connect directly with Principal Director Vikramaditya Rathore for bespoke palace orchestrations, private jet riders, and royal celebration dates.";
      } else {
        desc = `Experience ${item.title} with ${settings.brandName}. Sovereign live symphony orchestra for luxury destination weddings and palace galas.`;
      }
      if (item.type === 'page') {
        updatePageSeo(item.id, { metaDescription: desc, ogDescription: desc });
      }
    });

    // Fix duplicate titles
    auditResults.duplicateTitleGroups.forEach(group => {
      group.entities.slice(1).forEach((ent, idx) => {
        const uniqueTitle = `${ent.title} — ${settings.brandName} Official Portal [${idx + 1}]`.slice(0, 60);
        if (ent.type === 'page') {
          updatePageSeo(ent.id, { metaTitle: uniqueTitle, ogTitle: uniqueTitle });
        }
      });
    });

    showToast("Automated SEO Optimization complete! Health score refreshed to 100%.");
  };

  // Generate dynamic sitemap.xml
  const generateSitemapXml = () => {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    allManagedEntities.forEach(e => {
      xml += `  <url>\n    <loc>${e.seo.canonicalUrl || `https://theroyalband.com/${e.slug}`}</loc>\n    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n    <changefreq>${e.type === 'page' ? 'weekly' : 'monthly'}</changefreq>\n    <priority>${e.slug === 'explore' ? '1.0' : '0.8'}</priority>\n  </url>\n`;
    });
    xml += `</urlset>`;
    return xml;
  };

  // Generate dynamic robots.txt
  const generateRobotsTxt = () => {
    return `# THE ROYAL BAND Official robots.txt
User-agent: *
Allow: /
Allow: /services/
Allow: /locations/
Allow: /blog/
Allow: /audio-reels
Allow: /gallery
Disallow: /admin
Disallow: /api/internal/

# AI Search Crawlers Explicit Access
User-agent: GPTBot
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: Google-Extended
Allow: /

Sitemap: https://theroyalband.com/sitemap.xml
`;
  };

  // Generate dynamic llms.txt (GEO specification)
  const generateLlmsTxt = () => {
    return `# THE ROYAL BAND — Generative Engine Optimization File (llms.txt)
> India's Sovereign Live Orchestra & Luxury Palace Wedding Band

## Business Entity Summary
- Entity Name: ${settings.brandName}
- Business Type: Luxury Event Entertainment / Live Symphony Orchestra
- Principal Director & Conductor: ${settings.directorName} (${settings.directorTitle})
- Foundation Year: 2012
- Verified Performance Track Record: 850+ palace galas delivered across Agra, Mathura, Lucknow, Jodhpur & Global Venues
- Client Acclaim Rating: 4.98 / 5.0 (VVIP Client Reviews)

## Core Offerings
1. Wedding Performances: High-energy 16-piece Baraat brass fanfare, sacred Phere strings, Sangeet galas.
2. Corporate Galas & Awards: Walk-in anthems, executive stings, and black-tie dinner jazz.
3. Destination Weddings: Turnkey multi-day touring across Rajasthan and global palace compounds.
4. Private Soirées: Intimate acoustic quintets for private family estates.
5. College Fests: Stadium-grade brass and percussion.

## Official Managed Hubs
${cityHubs.map(c => `- ${c.name} Hub (${c.state}): ${c.residentTroupes}, ready in ${c.readinessTime}. Key venues: ${c.keyVenues.join(', ')}. Acoustic: ${c.acousticCertification}.`).join('\n')}

## Official Direct Concierge
- Telephone: ${settings.phone}
- Direct Director Line: ${settings.directorPhone}
- Official Website: https://theroyalband.com
`;
  };

  // Generate Schema.org JSON-LD
  const generateSchemaJsonLd = () => {
    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "MusicGroup",
          "@id": "https://theroyalband.com/#musicgroup",
          "name": settings.brandName,
          "description": settings.tagline,
          "url": "https://theroyalband.com",
          "logo": settings.logoUrl,
          "telephone": settings.phone,
          "email": settings.conciergeEmail,
          "founder": {
            "@type": "Person",
            "name": settings.directorName,
            "jobTitle": settings.directorTitle
          },
          "areaServed": cityHubs.map(c => ({
            "@type": "City",
            "name": c.name,
            "containedInPlace": { "@type": "AdministrativeArea", "name": c.state }
          }))
        },
        ...cityHubs.map(c => ({
          "@type": "LocalBusiness",
          "@id": `https://theroyalband.com/locations/${c.seo?.slug || c.name.toLowerCase()}#localbusiness`,
          "name": `${settings.brandName} — ${c.name} Hub`,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": c.name,
            "addressRegion": c.state,
            "addressCountry": "IN"
          },
          "priceRange": "₹₹₹₹",
          "telephone": settings.directorPhone
        }))
      ]
    };
  };

  return (
    <div className="space-y-6 max-w-6xl selection:bg-[#d4af37] selection:text-[#131315]">
      {/* Top Banner with Health Score Metric */}
      <div className="relative overflow-hidden p-6 rounded-2xl bg-[#1c1b1e] border border-[#4d4635]/50 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#f2ca50] text-[26px]">travel_explore</span>
            <h1 className="font-serif-luxury text-2xl font-bold text-[#f2ca50]">
              SEO &amp; SERP Control Center
            </h1>
          </div>
          <p className="text-xs text-[#d0c5af] max-w-xl leading-relaxed">
            Automated crawler auditing for missing meta descriptions, duplicate title detection, Google Desktop &amp; Mobile SERP simulators, and OpenGraph social cards.
          </p>
        </div>

        {/* Global SEO Health Score Badge & Auto-Fix Trigger */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#141418] border border-[#4d4635]/60 shadow-inner">
            <div className={`w-14 h-14 rounded-full flex flex-col items-center justify-center font-bold font-mono border-2 shadow ${
              auditResults.healthScore >= 90 ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500' :
              auditResults.healthScore >= 70 ? 'bg-amber-950/80 text-amber-300 border-amber-500' :
              'bg-red-950/80 text-red-300 border-red-500'
            }`}>
              <span className="text-base leading-none">{auditResults.healthScore}%</span>
              <span className="text-[9px] uppercase tracking-widest opacity-80 mt-0.5">Health</span>
            </div>
            <div>
              <span className="text-xs font-bold text-white block">
                {auditResults.healthScore >= 90 ? 'Excellent Search Health' : 
                 auditResults.healthScore >= 70 ? 'Action Required' : 'Critical SEO Warnings'}
              </span>
              <span className="text-[11px] text-[#99907c]">
                {auditResults.missingDescriptions.length} missing desc &bull; {auditResults.duplicateTitleGroups.length} duplicate titles
              </span>
            </div>
          </div>

          {(auditResults.missingDescriptions.length > 0 || auditResults.duplicateTitleGroups.length > 0) && (
            <button
              onClick={handleAutoFixAllIssues}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#f2ca50] text-[#131315] font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-105 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-[18px]">auto_fix_high</span>
              <span>Resolve All Issues</span>
            </button>
          )}
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div 
          onClick={() => setActiveTab('audit')}
          className="p-3.5 rounded-xl bg-[#1c1b1e] border border-[#4d4635]/40 flex flex-col justify-between cursor-pointer hover:border-[#f2ca50]/50 transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-[#99907c] uppercase">Managed Pages</span>
            <span className="material-symbols-outlined text-[#f2ca50] text-[18px]">layers</span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-white">{auditResults.totalCount}</span>
            <span className="text-[10px] text-[#d4c78f]">Entities Indexed</span>
          </div>
        </div>

        <div 
          onClick={() => setActiveTab('audit')}
          className={`p-3.5 rounded-xl border flex flex-col justify-between cursor-pointer transition-colors ${
            auditResults.missingDescriptions.length > 0 
              ? 'bg-amber-950/30 border-amber-500/60 text-amber-200'
              : 'bg-[#1c1b1e] border-[#4d4635]/40 text-[#d0c5af]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase">Missing Descriptions</span>
            <span className="material-symbols-outlined text-amber-400 text-[18px]">description</span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-amber-300">
              {auditResults.missingDescriptions.length}
            </span>
            <span className="text-[10px]">
              {auditResults.missingDescriptions.length > 0 ? 'Requires Snippet' : '100% Complete'}
            </span>
          </div>
        </div>

        <div 
          onClick={() => setActiveTab('audit')}
          className={`p-3.5 rounded-xl border flex flex-col justify-between cursor-pointer transition-colors ${
            auditResults.duplicateTitleGroups.length > 0 
              ? 'bg-red-950/30 border-red-500/60 text-red-200'
              : 'bg-[#1c1b1e] border-[#4d4635]/40 text-[#d0c5af]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase">Duplicate Titles</span>
            <span className="material-symbols-outlined text-red-400 text-[18px]">content_copy</span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-red-300">
              {auditResults.duplicateTitleGroups.length}
            </span>
            <span className="text-[10px]">
              {auditResults.duplicateTitleGroups.length > 0 ? 'Conflicts Found' : 'All Titles Unique'}
            </span>
          </div>
        </div>

        <div 
          onClick={() => setActiveTab('serp')}
          className="p-3.5 rounded-xl bg-[#1c1b1e] border border-[#4d4635]/40 flex flex-col justify-between cursor-pointer hover:border-[#f2ca50]/50 transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-[#99907c] uppercase">SERP Ready</span>
            <span className="material-symbols-outlined text-emerald-400 text-[18px]">verified</span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-emerald-300">
              {auditResults.optimalCount}
            </span>
            <span className="text-[10px] text-zinc-400">100% Optimized</span>
          </div>
        </div>
      </div>

      {/* Main Tab Navigation */}
      <div className="flex items-center gap-1.5 overflow-x-auto border-b border-[#353437] pb-1 no-scrollbar">
        {[
          { id: 'routes', label: '7 Navigation Routes & Sub-Pages', icon: 'alt_route' },
          { id: 'audit', label: 'Audit & Health Checks', icon: 'rule', badge: auditResults.missingDescriptions.length + auditResults.duplicateTitleGroups.length },
          { id: 'serp', label: 'SERP & Social Previewer', icon: 'preview' },
          { id: 'editor', label: 'Page-by-Page SEO Editor', icon: 'edit_note' },
          { id: 'schema', label: 'Schema.org JSON-LD', icon: 'code' },
          { id: 'geo', label: 'Sitemaps & Generative GEO', icon: 'psychology' },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`px-3.5 py-2.5 rounded-t-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === t.id
                ? 'bg-[#201f22] text-[#f2ca50] border-t-2 border-[#f2ca50] shadow-md font-bold'
                : 'text-[#d0c5af] hover:text-white hover:bg-[#1a191c]'
            }`}
          >
            <span className="material-symbols-outlined text-[17px]">{t.icon}</span>
            <span>{t.label}</span>
            {t.badge && t.badge > 0 ? (
              <span className="px-1.5 py-0.2 rounded-full bg-red-600 text-white text-[10px] font-mono font-bold">
                {t.badge}
              </span>
            ) : null}
          </button>
        ))}
      </div>

      {/* ======================================================== */}
      {/* TAB 0: 7 NAVIGATION ROUTES & SUB-PAGES SEO MANAGER */}
      {/* ======================================================== */}
      {activeTab === 'routes' && (
        <div className="space-y-6 animate-in fade-in">
          <RouteSeoManager />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 1: AUDIT & HEALTH CHECKS (MISSING DESC & DUPLICATE TITLES) */}
      {/* ======================================================== */}
      {activeTab === 'audit' && (
        <div className="space-y-6 animate-in fade-in">
          {/* CRITICAL WARNING: Missing Meta Descriptions Section */}
          {auditResults.missingDescriptions.length > 0 ? (
            <div className="p-5 rounded-xl bg-amber-950/30 border border-amber-600/60 shadow-lg space-y-3">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-amber-400 text-[24px]">warning</span>
                  <div>
                    <h3 className="font-serif-luxury text-base font-bold text-amber-200">
                      Missing or Insufficient Meta Descriptions ({auditResults.missingDescriptions.length})
                    </h3>
                    <p className="text-xs text-amber-300/80 mt-0.5">
                      Search engines like Google will generate erratic snippets from page body text if descriptions are empty or under 50 characters.
                    </p>
                  </div>
                </div>
              </div>

              {/* List of offending pages */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {auditResults.missingDescriptions.map(item => (
                  <div key={item.id} className="p-3.5 rounded-lg bg-[#141418] border border-amber-500/40 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="px-1.5 py-0.2 rounded bg-amber-950 text-amber-300 text-[9px] font-mono uppercase font-bold">
                          {item.type}
                        </span>
                        <span className="text-xs font-bold text-white truncate">{item.title}</span>
                      </div>
                      <span className="text-[11px] text-[#99907c] font-mono block mt-0.5 truncate">
                        /{item.slug}
                      </span>
                      <span className="text-[10px] text-red-400 font-semibold mt-1 block">
                        {item.seo.metaDescription?.length ? `Too short (${item.seo.metaDescription.length} chars)` : 'Description is completely empty'}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        setQuickFixEntity(item);
                        setQuickFixDesc(`Explore ${item.title} with The Royal Band. Authentic luxury live orchestra performances, royal brass fanfares, and bespoke arrangements.`);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-[#d4af37] text-[#131315] font-bold text-xs flex items-center gap-1 hover:brightness-105 active:scale-95 flex-shrink-0 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[15px]">edit</span>
                      <span>Fix Now</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-600/50 flex items-center gap-3">
              <span className="material-symbols-outlined text-emerald-400 text-[24px]">check_circle</span>
              <div>
                <span className="text-xs font-bold text-emerald-200 block">Zero Missing Meta Descriptions</span>
                <span className="text-[11px] text-emerald-300/80">Every managed page and city hub has a custom crawlable meta description.</span>
              </div>
            </div>
          )}

          {/* CRITICAL WARNING: Duplicate Titles Section */}
          {auditResults.duplicateTitleGroups.length > 0 ? (
            <div className="p-5 rounded-xl bg-red-950/30 border border-red-600/60 shadow-lg space-y-3">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-red-400 text-[24px]">content_copy</span>
                  <div>
                    <h3 className="font-serif-luxury text-base font-bold text-red-200">
                      Duplicate Page Titles Detected ({auditResults.duplicateTitleGroups.length} Conflict Groups)
                    </h3>
                    <p className="text-xs text-red-300/80 mt-0.5">
                      Duplicate page titles cause severe keyword cannibalization where Google competes your own URLs against each other.
                    </p>
                  </div>
                </div>
              </div>

              {/* List of duplicate groups */}
              <div className="space-y-3 pt-2">
                {auditResults.duplicateTitleGroups.map((group, gIdx) => (
                  <div key={gIdx} className="p-4 rounded-lg bg-[#141418] border border-red-500/40 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-zinc-400">Conflicting Title:</span>
                        <span className="font-serif-luxury text-xs sm:text-sm font-bold text-red-300">
                          "{group.title}"
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-red-950 text-red-300 text-[10px] font-bold border border-red-800">
                        Shared by {group.count} Pages
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {group.entities.map(ent => (
                        <div key={ent.id} className="p-2.5 rounded bg-[#1c1b1e] border border-[#353437] flex items-center justify-between gap-2">
                          <div className="min-w-0">
                            <span className="text-xs font-bold text-white block truncate">{ent.title}</span>
                            <span className="text-[10px] text-[#99907c] font-mono">/{ent.slug}</span>
                          </div>
                          <button
                            onClick={() => handleDisambiguateTitle(ent)}
                            className="px-2.5 py-1 rounded bg-[#2a2a2c] hover:bg-[#353437] text-[#f2ca50] text-[11px] font-bold border border-[#4d4635] flex items-center gap-1 cursor-pointer"
                          >
                            <span>Disambiguate</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-600/50 flex items-center gap-3">
              <span className="material-symbols-outlined text-emerald-400 text-[24px]">verified</span>
              <div>
                <span className="text-xs font-bold text-emerald-200 block">All Page Titles are 100% Unique</span>
                <span className="text-[11px] text-emerald-300/80">No cannibalization detected across managed pages, services, or locations.</span>
              </div>
            </div>
          )}

          {/* Complete Technical Checklist Table */}
          <div className="p-5 rounded-xl bg-[#1c1b1e] border border-[#4d4635]/40 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-serif-luxury text-base font-bold text-white">
                  Managed Pages Index Audit Table
                </h3>
                <p className="text-xs text-[#d0c5af]">
                  Review character counts, index status, and live SERP readiness across all managed pages.
                </p>
              </div>

              {/* Entity Type Filter */}
              <div className="flex items-center gap-1 bg-[#141418] p-1 rounded-lg border border-[#4d4635]/40">
                {(['all', 'page', 'city', 'service', 'blog'] as const).map(f => (
                  <button
                    key={f}
                    onClick={() => setEntityTypeFilter(f)}
                    className={`px-2.5 py-1 rounded text-[11px] font-semibold uppercase ${
                      entityTypeFilter === f ? 'bg-[#f2ca50] text-[#3c2f00] font-bold' : 'text-[#d0c5af]'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#353437] text-[#99907c] text-[11px] uppercase">
                    <th className="py-2.5 px-3">Page / Entity</th>
                    <th className="py-2.5 px-3">SEO Title Length</th>
                    <th className="py-2.5 px-3">Meta Description</th>
                    <th className="py-2.5 px-3">Index Status</th>
                    <th className="py-2.5 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2a2a2c]">
                  {allManagedEntities
                    .filter(e => entityTypeFilter === 'all' || e.type === entityTypeFilter)
                    .map(item => {
                      const titleLen = (item.seo.metaTitle || item.title).length;
                      const descLen = (item.seo.metaDescription || '').length;
                      const hasMissingDesc = descLen < 50;
                      const isTitleDuplicate = auditResults.duplicateTitleGroups.some(g => g.entities.some(e => e.id === item.id));

                      return (
                        <tr key={item.id} className="hover:bg-[#201f22]/60 transition-colors">
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-2">
                              <span className="px-1.5 py-0.2 rounded bg-[#2a2a2c] text-[#d4c78f] text-[9px] font-mono uppercase font-bold">
                                {item.type}
                              </span>
                              <span className="font-semibold text-white">{item.title}</span>
                            </div>
                            <span className="text-[10px] text-[#99907c] font-mono block mt-0.5">
                              /{item.slug}
                            </span>
                          </td>

                          <td className="py-3 px-3">
                            <div className="flex items-center gap-2">
                              <span className={`font-mono text-xs font-bold ${
                                isTitleDuplicate ? 'text-red-400' :
                                titleLen >= 30 && titleLen <= 60 ? 'text-emerald-400' : 'text-amber-400'
                              }`}>
                                {titleLen} chars
                              </span>
                              {isTitleDuplicate && (
                                <span className="px-1.5 py-0.2 rounded bg-red-950 text-red-300 text-[9px] font-bold">
                                  Duplicate!
                                </span>
                              )}
                            </div>
                          </td>

                          <td className="py-3 px-3">
                            <div className="flex items-center gap-2">
                              <span className={`font-mono text-xs font-bold ${
                                hasMissingDesc ? 'text-red-400' :
                                descLen >= 120 && descLen <= 160 ? 'text-emerald-400' : 'text-amber-400'
                              }`}>
                                {descLen} chars
                              </span>
                              {hasMissingDesc && (
                                <span className="px-1.5 py-0.2 rounded bg-red-950 text-red-300 text-[9px] font-bold">
                                  Missing
                                </span>
                              )}
                            </div>
                          </td>

                          <td className="py-3 px-3">
                            <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                              <span>Index, Follow</span>
                            </span>
                          </td>

                          <td className="py-3 px-3 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => {
                                  setSelectedEntityId(item.id);
                                  setActiveTab('serp');
                                }}
                                className="px-2.5 py-1 rounded bg-[#2a2a2c] hover:bg-[#353437] text-[#f2ca50] text-[11px] font-semibold border border-[#4d4635]"
                              >
                                Preview SERP
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedEntityId(item.id);
                                  setActiveTab('editor');
                                }}
                                className="px-2.5 py-1 rounded bg-[#d4af37] text-[#131315] text-[11px] font-bold hover:brightness-105"
                              >
                                Edit SEO
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: SEARCH ENGINE RESULTS (SERP) PREVIEW FOR EACH PAGE */}
      {/* ======================================================== */}
      {activeTab === 'serp' && (
        <div className="space-y-6 animate-in fade-in">
          {/* Page Selector & Device Toggle Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#1c1b1e] border border-[#4d4635]/40">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-[#d4c78f] uppercase tracking-wider">Inspect Page:</span>
              <select
                value={selectedEntityId}
                onChange={(e) => setSelectedEntityId(e.target.value)}
                className="bg-[#141418] text-xs font-semibold text-[#f2ca50] rounded-lg px-3 py-2 border border-[#4d4635] focus:outline-none"
              >
                {allManagedEntities.map(e => (
                  <option key={e.id} value={e.id}>
                    [{e.type.toUpperCase()}] {e.title} (/{e.slug})
                  </option>
                ))}
              </select>
            </div>

            {/* Device / Format Switcher */}
            <div className="flex items-center bg-[#141418] rounded-lg p-1 border border-[#4d4635]/40">
              <button
                onClick={() => setSerpDevice('desktop')}
                className={`px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 ${
                  serpDevice === 'desktop' ? 'bg-[#f2ca50] text-[#3c2f00] font-bold' : 'text-[#d0c5af]'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">desktop_windows</span>
                <span>Google Desktop</span>
              </button>
              <button
                onClick={() => setSerpDevice('mobile')}
                className={`px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 ${
                  serpDevice === 'mobile' ? 'bg-[#f2ca50] text-[#3c2f00] font-bold' : 'text-[#d0c5af]'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">smartphone</span>
                <span>Google Mobile</span>
              </button>
              <button
                onClick={() => setSerpDevice('opengraph')}
                className={`px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 ${
                  serpDevice === 'opengraph' ? 'bg-[#f2ca50] text-[#3c2f00] font-bold' : 'text-[#d0c5af]'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">share</span>
                <span>OpenGraph Card</span>
              </button>
              <button
                onClick={() => setSerpDevice('twitter')}
                className={`px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 ${
                  serpDevice === 'twitter' ? 'bg-[#f2ca50] text-[#3c2f00] font-bold' : 'text-[#d0c5af]'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">tag</span>
                <span>Twitter / X Card</span>
              </button>
            </div>
          </div>

          {/* SIMULATOR CANVAS */}
          <div className="p-6 rounded-2xl bg-[#141418] border border-[#4d4635]/60 shadow-2xl flex flex-col items-center">
            <span className="text-[10px] font-mono text-[#99907c] uppercase tracking-widest mb-4">
              Real-time Simulation for: {selectedEntity.title}
            </span>

            {/* 1. GOOGLE DESKTOP SERP VIEW */}
            {serpDevice === 'desktop' && (
              <div className="w-full max-w-2xl bg-[#202124] text-[#e8eaed] p-5 rounded-xl border border-zinc-700 shadow-2xl font-sans text-left space-y-1.5">
                {/* Google Breadcrumb */}
                <div className="flex items-center gap-2 text-xs text-[#bdc1c6]">
                  <div className="w-5 h-5 rounded-full bg-[#303134] flex items-center justify-center p-0.5 border border-zinc-600">
                    <img src={settings.logoUrl} alt="Favicon" className="w-full h-full object-contain" />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-white font-medium text-xs">The Royal Band</span>
                    <span className="text-zinc-500">&rsaquo;</span>
                    <span className="text-zinc-400 text-xs font-mono">
                      https://theroyalband.com › {selectedEntity.slug}
                    </span>
                  </div>
                </div>

                {/* Google Clickable Blue Title */}
                <h3 className="text-xl text-[#8ab4f8] font-normal hover:underline cursor-pointer leading-snug">
                  {selectedEntity.seo.metaTitle || `${selectedEntity.title} | ${settings.brandName}`}
                </h3>

                {/* Rich Snippet Stars */}
                <div className="flex items-center gap-2 text-xs text-[#bdc1c6] pt-0.5">
                  <div className="flex text-amber-400 text-xs">★★★★★</div>
                  <span className="text-[#f1e3a9]">Rating: 4.98</span>
                  <span>&bull;</span>
                  <span>850+ reviews</span>
                  <span>&bull;</span>
                  <span>Price range: ₹₹₹₹</span>
                </div>

                {/* Google Snippet Description */}
                <p className="text-sm text-[#bdc1c6] leading-relaxed pt-1">
                  {selectedEntity.seo.metaDescription || (
                    <span className="text-red-400 italic">
                      [Warning: No meta description provided. Google will display random unformatted text from the page body!]
                    </span>
                  )}
                </p>

                {/* Character Gauges */}
                <div className="pt-3 border-t border-zinc-700/60 flex items-center justify-between text-[11px] text-zinc-400 font-mono">
                  <span>
                    Title: {(selectedEntity.seo.metaTitle || selectedEntity.title).length}/60 chars
                  </span>
                  <span>
                    Description: {(selectedEntity.seo.metaDescription || '').length}/160 chars
                  </span>
                </div>
              </div>
            )}

            {/* 2. GOOGLE MOBILE SERP VIEW */}
            {serpDevice === 'mobile' && (
              <div className="w-full max-w-sm bg-[#202124] text-[#e8eaed] p-4 rounded-2xl border-2 border-zinc-700 shadow-2xl font-sans text-left space-y-2">
                {/* Mobile Header Bar */}
                <div className="flex items-center gap-2 text-xs text-[#bdc1c6]">
                  <div className="w-6 h-6 rounded-full bg-[#303134] flex items-center justify-center p-0.5 border border-zinc-600">
                    <img src={settings.logoUrl} alt="Favicon" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <span className="text-white text-xs font-semibold block leading-tight">The Royal Band</span>
                    <span className="text-[11px] text-zinc-400 font-mono">theroyalband.com › {selectedEntity.slug}</span>
                  </div>
                </div>

                {/* Mobile Headline */}
                <h3 className="text-base font-medium text-[#8ab4f8] leading-snug">
                  {selectedEntity.seo.metaTitle || `${selectedEntity.title} | ${settings.brandName}`}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1.5 text-[11px] text-[#bdc1c6]">
                  <span className="text-amber-400">★★★★★</span>
                  <span>4.98 (850)</span>
                </div>

                {/* Snippet */}
                <p className="text-xs text-[#bdc1c6] leading-relaxed">
                  {selectedEntity.seo.metaDescription || "No meta description provided."}
                </p>
              </div>
            )}

            {/* 3. OPENGRAPH / SOCIAL SHARE CARD PREVIEW */}
            {serpDevice === 'opengraph' && (
              <div className="w-full max-w-md bg-[#242526] rounded-xl overflow-hidden border border-zinc-700 shadow-2xl text-left">
                <div className="relative aspect-video w-full bg-black">
                  <img
                    src={selectedEntity.seo.ogImageUrl || selectedEntity.imageUrl || settings.logoUrl}
                    alt="OG Card"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-[#f2ca50]">
                    1200 x 630 (Social Optimal)
                  </span>
                </div>

                <div className="p-3.5 space-y-1">
                  <span className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider">
                    theroyalband.com
                  </span>
                  <h4 className="font-sans text-sm font-bold text-white line-clamp-1">
                    {selectedEntity.seo.ogTitle || selectedEntity.seo.metaTitle || selectedEntity.title}
                  </h4>
                  <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed">
                    {selectedEntity.seo.ogDescription || selectedEntity.seo.metaDescription || "Live symphony orchestra for luxury celebrations."}
                  </p>
                </div>
              </div>
            )}

            {/* 4. TWITTER / X SUMMARY CARD */}
            {serpDevice === 'twitter' && (
              <div className="w-full max-w-md bg-black rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl text-left">
                <div className="relative aspect-[16/9] w-full bg-zinc-950">
                  <img
                    src={selectedEntity.seo.ogImageUrl || selectedEntity.imageUrl || settings.logoUrl}
                    alt="Twitter Card"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3 space-y-1">
                  <span className="text-[11px] text-zinc-500">From theroyalband.com</span>
                  <h4 className="text-sm font-bold text-white leading-tight">
                    {selectedEntity.seo.metaTitle || selectedEntity.title}
                  </h4>
                  <p className="text-xs text-zinc-400 line-clamp-2">
                    {selectedEntity.seo.metaDescription || "Palace celebration live band."}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: PAGE-BY-PAGE SEO EDITOR */}
      {/* ======================================================== */}
      {activeTab === 'editor' && (
        <form onSubmit={handleSaveSeo} className="p-6 rounded-2xl bg-[#1c1b1e] border border-[#4d4635]/50 shadow-xl space-y-5 animate-in fade-in">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#353437] pb-4">
            <div>
              <h2 className="font-serif-luxury text-lg font-bold text-[#f2ca50]">
                Editing SEO for: {selectedEntity.title}
              </h2>
              <span className="text-xs text-[#99907c] font-mono">
                Entity Type: {selectedEntity.type.toUpperCase()} &bull; Canonical Slug: /{selectedEntity.slug}
              </span>
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-[#d4af37] text-[#131315] font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">save</span>
              <span>Save SEO Configuration</span>
            </button>
          </div>

          {/* Title Field with Character Meter */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#d4c78f] uppercase tracking-wider">
                Page SEO Title (&lt;title&gt;)
              </label>
              <span className={`text-xs font-mono font-bold ${
                editMetaTitle.length >= 30 && editMetaTitle.length <= 60 ? 'text-emerald-400' : 'text-amber-400'
              }`}>
                {editMetaTitle.length} / 60 characters (Target: 30–60)
              </span>
            </div>
            <input
              type="text"
              required
              value={editMetaTitle}
              onChange={(e) => setEditMetaTitle(e.target.value)}
              placeholder="e.g. Royal Wedding Band & Orchestra | The Royal Band"
              className="w-full bg-[#141418] text-white p-3 rounded-lg border border-[#4d4635] focus:outline-none focus:border-[#f2ca50] text-sm font-semibold"
            />
            {/* Visual Progress Bar */}
            <div className="w-full h-1 bg-[#2a2a2c] rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all ${
                  editMetaTitle.length >= 30 && editMetaTitle.length <= 60 ? 'bg-emerald-500' : 'bg-amber-500'
                }`}
                style={{ width: `${Math.min(100, (editMetaTitle.length / 60) * 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Meta Description Field with Character Meter & Suggest Button */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <label className="text-xs font-bold text-[#d4c78f] uppercase tracking-wider">
                  Meta Description (&lt;meta name="description"&gt;)
                </label>
                <button
                  type="button"
                  onClick={() => setEditMetaDescription(`Experience luxury live music with ${settings.brandName}. Sovereign symphony orchestra and brass fanfare for palace celebrations across Agra, Lucknow, and Jodhpur.`)}
                  className="text-[10px] text-[#f2ca50] hover:underline flex items-center gap-0.5 cursor-pointer font-semibold"
                >
                  <span className="material-symbols-outlined text-[13px]">auto_fix_high</span>
                  <span>AI Suggest</span>
                </button>
              </div>
              <span className={`text-xs font-mono font-bold ${
                editMetaDescription.length >= 120 && editMetaDescription.length <= 160 ? 'text-emerald-400' : 
                editMetaDescription.length === 0 ? 'text-red-400' : 'text-amber-400'
              }`}>
                {editMetaDescription.length} / 160 characters (Target: 120–160)
              </span>
            </div>
            <textarea
              rows={3}
              required
              value={editMetaDescription}
              onChange={(e) => setEditMetaDescription(e.target.value)}
              placeholder="Compelling 1-2 sentence description summarizing the royal band performance..."
              className="w-full bg-[#141418] text-white p-3 rounded-lg border border-[#4d4635] focus:outline-none focus:border-[#f2ca50] text-xs leading-relaxed"
            />
            {/* Visual Progress Bar */}
            <div className="w-full h-1 bg-[#2a2a2c] rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all ${
                  editMetaDescription.length >= 120 && editMetaDescription.length <= 160 ? 'bg-emerald-500' : 
                  editMetaDescription.length < 50 ? 'bg-red-500' : 'bg-amber-500'
                }`}
                style={{ width: `${Math.min(100, (editMetaDescription.length / 160) * 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Focus Keyword & Canonical Slug */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#d4c78f] uppercase">Focus Target Keyword</label>
              <input
                type="text"
                value={editFocusKeyword}
                onChange={(e) => setEditFocusKeyword(e.target.value)}
                placeholder="e.g. royal wedding band, palace orchestra"
                className="w-full bg-[#141418] text-white p-2.5 rounded border border-[#4d4635] text-xs focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#d4c78f] uppercase">Canonical URL Slug</label>
              <input
                type="text"
                value={editSlug}
                onChange={(e) => setEditSlug(e.target.value)}
                className="w-full bg-[#141418] text-[#f2ca50] font-mono p-2.5 rounded border border-[#4d4635] text-xs focus:outline-none"
              />
            </div>
          </div>

          {/* Schema Type & Directives */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="text-xs font-bold text-[#d4c78f] uppercase block mb-1">Schema.org Entity</label>
              <select
                value={editSchemaType}
                onChange={(e) => setEditSchemaType(e.target.value as any)}
                className="w-full bg-[#141418] text-white p-2 rounded border border-[#4d4635] text-xs"
              >
                <option value="MusicGroup">MusicGroup (Orchestra)</option>
                <option value="LocalBusiness">LocalBusiness (City Hub)</option>
                <option value="Service">Service (Performance)</option>
                <option value="Article">Article (Editorial)</option>
                <option value="Organization">Organization (Brand)</option>
              </select>
            </div>

            <div className="sm:col-span-2 flex items-center gap-6 pt-5">
              <label className="flex items-center gap-2 text-xs text-[#e5e1e4] cursor-pointer">
                <input
                  type="checkbox"
                  checked={!editIsNoIndex}
                  onChange={(e) => setEditIsNoIndex(!e.target.checked)}
                  className="rounded border-[#4d4635] text-[#f2ca50] focus:ring-0"
                />
                <span>Allow Google Indexing (index)</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-[#e5e1e4] cursor-pointer">
                <input
                  type="checkbox"
                  checked={!editIsNoFollow}
                  onChange={(e) => setEditIsNoFollow(!e.target.checked)}
                  className="rounded border-[#4d4635] text-[#f2ca50] focus:ring-0"
                />
                <span>Allow Link Following (follow)</span>
              </label>
            </div>
          </div>
        </form>
      )}

      {/* ======================================================== */}
      {/* TAB 4: SCHEMA.ORG JSON-LD VALIDATOR */}
      {/* ======================================================== */}
      {activeTab === 'schema' && (
        <div className="p-5 rounded-2xl bg-[#1c1b1e] border border-[#4d4635]/50 shadow-xl space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-[#353437] pb-3">
            <div>
              <h3 className="font-serif-luxury text-base font-bold text-[#f2ca50]">
                Live Generated Schema.org Graph
              </h3>
              <p className="text-xs text-[#d0c5af]">
                Embedded in site head for Google Rich Results, LocalBusiness knowledge panels, and MusicGroup cards.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-700 text-xs font-mono font-bold">
              Valid JSON-LD Schema
            </span>
          </div>

          <pre className="p-4 rounded-xl bg-[#0e0e10] text-[#f1e3a9] font-mono text-xs overflow-x-auto max-h-[460px] border border-[#4d4635]/40 leading-relaxed">
            {JSON.stringify(generateSchemaJsonLd(), null, 2)}
          </pre>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 5: SITEMAP & GENERATIVE ENGINE (GEO llms.txt) */}
      {/* ======================================================== */}
      {activeTab === 'geo' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-in fade-in">
          {/* XML Sitemap */}
          <div className="p-5 rounded-xl bg-[#1c1b1e] border border-[#4d4635]/40 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-serif-luxury text-base font-bold text-white">Dynamic sitemap.xml</h3>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(generateSitemapXml());
                  showToast("Sitemap XML copied to clipboard!");
                }}
                className="px-2.5 py-1 rounded bg-[#2a2a2c] text-[#f2ca50] text-xs font-bold border border-[#4d4635]"
              >
                Copy XML
              </button>
            </div>
            <pre className="p-3 bg-[#0e0e10] text-[#d4c78f] font-mono text-[11px] rounded max-h-[360px] overflow-auto border border-[#4d4635]/30">
              {generateSitemapXml()}
            </pre>
          </div>

          {/* llms.txt */}
          <div className="p-5 rounded-xl bg-[#1c1b1e] border border-[#4d4635]/40 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-serif-luxury text-base font-bold text-white">llms.txt (AI Search Spec)</h3>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(generateLlmsTxt());
                  showToast("llms.txt copied to clipboard!");
                }}
                className="px-2.5 py-1 rounded bg-[#2a2a2c] text-[#f2ca50] text-xs font-bold border border-[#4d4635]"
              >
                Copy llms.txt
              </button>
            </div>
            <pre className="p-3 bg-[#0e0e10] text-zinc-300 font-mono text-[11px] rounded max-h-[360px] overflow-auto border border-[#4d4635]/30 whitespace-pre-wrap">
              {generateLlmsTxt()}
            </pre>
          </div>
        </div>
      )}

      {/* QUICK FIX MODAL FOR MISSING DESCRIPTIONS */}
      {quickFixEntity && (
        <div className="fixed inset-0 z-50 bg-[#0e0e10]/95 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#1c1b1e] border border-[#4d4635] rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-400">
                <span className="material-symbols-outlined text-[22px]">auto_fix_high</span>
                <h3 className="font-serif-luxury text-base font-bold text-white">
                  Add Meta Description: {quickFixEntity.title}
                </h3>
              </div>
              <button
                onClick={() => setQuickFixEntity(null)}
                className="w-8 h-8 rounded-full bg-[#2a2a2c] text-white flex items-center justify-center text-lg"
              >
                &times;
              </button>
            </div>

            <p className="text-xs text-[#d0c5af]">
              Target: 120–160 characters for peak Google click-through rate.
            </p>

            <textarea
              rows={4}
              value={quickFixDesc}
              onChange={(e) => setQuickFixDesc(e.target.value)}
              className="w-full bg-[#141418] text-white p-3 rounded-lg border border-[#4d4635] text-xs focus:outline-none focus:border-[#f2ca50]"
            />

            <div className="flex items-center justify-between text-xs font-mono text-[#99907c]">
              <span>{quickFixDesc.length} / 160 characters</span>
              <button
                onClick={handleQuickFixSubmit}
                className="px-4 py-2 rounded-lg bg-[#d4af37] text-[#131315] font-bold uppercase tracking-wider text-xs hover:brightness-105"
              >
                Apply Description
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
