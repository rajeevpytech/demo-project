import { SeoMetadata, RouteSeoItem } from '../types';

export interface RouteHierarchyNode {
  id: string;
  order: number;
  mainRouteId: 'home' | 'about' | 'service1' | 'blog' | 'service2' | 'gallery' | 'contact';
  label: string;
  routePath: string;
  description: string;
  isMainRoute: boolean;
  subPages?: {
    id: string;
    label: string;
    routePath: string;
    description: string;
    badge?: string;
  }[];
}

export const MAIN_ROUTES_HIERARCHY: RouteHierarchyNode[] = [
  {
    id: 'home',
    order: 1,
    mainRouteId: 'home',
    label: '1. Home',
    routePath: '/',
    description: 'The Sovereign Stage homepage highlighting live brass orchestras, Baraat symphonies, city availability, and booking concierge.',
    isMainRoute: true
  },
  {
    id: 'about',
    order: 2,
    mainRouteId: 'about',
    label: '2. About',
    routePath: '/about',
    description: 'Maestro introduction, 40+ virtuoso musicians, executive conductors, 14-year royal performance heritage, and achievements.',
    isMainRoute: true
  },
  {
    id: 'service1',
    order: 3,
    mainRouteId: 'service1',
    label: '3. Service 1 / Event',
    routePath: '/events',
    description: 'The main event performances overview hub featuring six specialized celebration categories, add-on services, and performance packages.',
    isMainRoute: true,
    subPages: [
      {
        id: 'service1/wedding-performances',
        label: 'Wedding Performances',
        routePath: '/events/wedding-performances',
        description: 'Baraat symphonies, sacred royal phere overtures, and opulent sangeet celebrations.',
        badge: 'Crowning Showcase'
      },
      {
        id: 'service1/corporate-events',
        label: 'Corporate Events',
        routePath: '/events/corporate-events',
        description: 'Cinematic walk-in anthems, trophy stings, and black-tie dinner jazz for summits.',
        badge: 'Executive Summits'
      },
      {
        id: 'service1/private-parties',
        label: 'Private Parties',
        routePath: '/events/private-parties',
        description: 'Acoustic jazz, Bollywood swing, and high-energy live music for private estates and birthdays.',
        badge: 'Intimate Mastery'
      },
      {
        id: 'service1/club-lounge-gigs',
        label: 'Club / Lounge Gigs',
        routePath: '/events/club-lounge-gigs',
        description: 'Sensual brass overtones, electronic groove hybrid sets, and live saxophone with DJ.',
        badge: 'Nightlife Edition'
      },
      {
        id: 'service1/college-fests-festivals',
        label: 'College Fests & Festivals',
        routePath: '/events/college-fests-festivals',
        description: 'Stadium percussion, anthemic youth drops, and headline concert tours.',
        badge: 'Arena Level'
      },
      {
        id: 'service1/destination-weddings',
        label: 'Destination Weddings',
        routePath: '/events/destination-weddings',
        description: 'Turnkey touring troupe traveling to Udaipur, Jaipur, Jodhpur, Goa, UAE, and Europe.',
        badge: 'Global Touring'
      }
    ]
  },
  {
    id: 'blog',
    order: 4,
    mainRouteId: 'blog',
    label: '4. Blog',
    routePath: '/blog',
    description: 'The Sovereign Chronicle: authoritative articles on acoustic fort architecture, royal baraat arrangements, and wedding music curation.',
    isMainRoute: true,
    subPages: [
      {
        id: 'blog/art-of-royal-baraats-brass-symphony',
        label: 'Art of Royal Baraats: 16-Piece Brass Symphony',
        routePath: '/blog/art-of-royal-baraats-brass-symphony',
        description: 'Article on dynamic multi-horn coordination, line-array wireless staging, and repertoire.'
      },
      {
        id: 'blog/acoustic-engineering-palace-courtyards',
        label: 'Acoustic Engineering in Ancient Forts & Palaces',
        routePath: '/blog/acoustic-engineering-palace-courtyards',
        description: 'Article on overcoming flutter echoes and sandstone reverberation with distributed sound.'
      },
      {
        id: 'blog/2026-wedding-music-trend-forecast',
        label: '2026 Sovereign Wedding Music Trend Forecast',
        routePath: '/blog/2026-wedding-music-trend-forecast',
        description: 'Editorial forecast on intimate acoustic strings, live DJ hybrids, and sacred Vedic chants.'
      }
    ]
  },
  {
    id: 'service2',
    order: 5,
    mainRouteId: 'service2',
    label: '5. Service 2 (Locations)',
    routePath: '/locations',
    description: 'Stationed city hubs directory covering Agra, Mathura, Lucknow, and Jodhpur with touring troupe logistics.',
    isMainRoute: true,
    subPages: [
      {
        id: 'service2/agra',
        label: 'Agra City Hub',
        routePath: '/locations/agra',
        description: 'Taj view palace lawns, ITC Mughal, Oberoi Amarvilas, and Mughal brass fanfare.',
        badge: 'Taj Heritage Hub'
      },
      {
        id: 'service2/mathura',
        label: 'Mathura City Hub',
        routePath: '/locations/mathura',
        description: 'Brij corridor, spiritual Sufi, sacred devotional fusion, and traditional celebratory baraats.',
        badge: 'Brij Heritage Corridor'
      },
      {
        id: 'service2/lucknow',
        label: 'Lucknow City Hub',
        routePath: '/locations/lucknow',
        description: 'Taj Mahal Lucknow, The Centrum, Nawabi elegance, and Awadhi ghazal orchestra.',
        badge: 'Awadh Cultural Capital'
      },
      {
        id: 'service2/jodhpur',
        label: 'Jodhpur City Hub',
        routePath: '/locations/jodhpur',
        description: 'Umaid Bhawan Palace, Mehrangarh Fort, desert rampart fanfares, and palace sangeet symphonies.',
        badge: 'Palace Destination Hub'
      }
    ]
  },
  {
    id: 'gallery',
    order: 6,
    mainRouteId: 'gallery',
    label: '6. Gallery',
    routePath: '/gallery',
    description: 'Visual media archive and cinema reels categorized into weddings, corporate summits, private parties, and live performances.',
    isMainRoute: true
  },
  {
    id: 'contact',
    order: 7,
    mainRouteId: 'contact',
    label: '7. Contact Us',
    routePath: '/contact',
    description: 'Official headquarters, direct phone, WhatsApp VIP concierge, and online booking inquiry forms.',
    isMainRoute: true
  }
];

export const INITIAL_ROUTE_SEO_MAP: Record<string, SeoMetadata> = {
  // 1. Home
  'home': {
    metaTitle: 'The Royal Band - Luxury Orchestral & VIP Live Music',
    metaDescription: 'Exclusive live symphony orchestra and royal band for palace celebrations, luxury destination weddings, and VIP galas worldwide.',
    slug: '',
    canonicalUrl: 'https://theroyalband.com/',
    ogTitle: 'The Royal Band - Symphonies of Grandeur',
    ogDescription: 'Unrivaled live performance for royal weddings, grand palace galas, and bespoke events.',
    ogImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCddgIHrqFDssqCfud3_WvkQVIJut7OHepo7JZKpx03tYogGK5lmKIWdpchElaMr2SttOOOia2n4NFjNxhuVTR_ir0WscCh8xxjIzvdhpdXFwpDdwb77svmIhiSgwaxhmGgJC24IW4WUBuMAIn2VdmYCuk346YTCO529mSPAUHOgVGV265u4wV0Up4zkmVhWLzveBbEHFUF3Ae5TQxu_nSa7vaNwaYfv6OHamncjaV7hgiL134ssxAitQ',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    isNoIndex: false,
    isNoFollow: false,
    schemaType: 'MusicGroup',
    focusKeyword: 'luxury royal wedding orchestra',
    keywords: ['royal band', 'live symphony', 'wedding orchestra', 'palace wedding music']
  },

  // 2. About
  'about': {
    metaTitle: 'About The Royal Band | Maestros, Heritage & Imperial Orchestra',
    metaDescription: 'Discover the 14-year legacy of The Royal Band, our 40+ virtuoso musicians, executive conductors, and royal palace concert milestones across India.',
    slug: 'about',
    canonicalUrl: 'https://theroyalband.com/about',
    ogTitle: 'About The Royal Band - 14 Years of Royal Mastery',
    ogDescription: 'Meet our principal maestros and discover 14 years of sovereign performance heritage.',
    ogImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAsfIVnw8ptFr9B0CIPOnT9RnZETmqq_cihXQQhIwht8OLtAwV8_Wrmcx6ciWDSHWV-mzFPlllBOvrwIXUaLufrN9Mc6F7Pcqn9EQEQj6SQXbFMrl-OsaHfWmxVBmY6E3W_qL-Zn0CofVBYBGnWkFvH_Mxp22SGkqquZ4mQCAeUw5o1EtzvPUyFmVbT9Q9lBdbSZBcx_0IQ8sotHAtuew4bgJSxbg7wTfxJmv1XZkT1DTVXDSqitdUSQ',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    isNoIndex: false,
    isNoFollow: false,
    schemaType: 'MusicGroup',
    focusKeyword: 'royal band history and maestros',
    keywords: ['about royal band', 'vikramaditya rathore', 'palace musicians', 'imperial orchestra']
  },

  // 3. Service 1 / Event Overview
  'service1': {
    metaTitle: 'Event Performances & Signature Live Music | The Royal Band',
    metaDescription: 'Explore our six signature event performances: luxury weddings, corporate galas, private parties, club gigs, college fests, and destination weddings.',
    slug: 'events',
    canonicalUrl: 'https://theroyalband.com/events',
    ogTitle: 'Signature Event Performances - The Royal Band',
    ogDescription: 'Turnkey live musical symphonies for weddings, corporate galas, and bespoke celebrations.',
    ogImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjO6Sg-XnJ9_Udl1_IoTc366O4hALJGPK3m2ucFI6lIdy0hyeRSn6u3rm1NvSnp20xQZ9tZPaWDXQcaxN9UeJqjgXe0p1Of4HcG2Uvyz0OO5ZZBOej_bY2dOQKXZtYJNk0Wv_ELmC__loOJ1SB85TTQX0LS8AGsH2N8shOIf8jp9L4kUsbls0SJKUpCNKXSML_eUtNqJ4cX-Yu0BB8tsO_csQDAbG9R6PtWnzkocBGtqcAK-Lj4JjboQ',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    isNoIndex: false,
    isNoFollow: false,
    schemaType: 'Service',
    focusKeyword: 'live event performances and band packages',
    keywords: ['wedding live band', 'corporate band', 'private party music', 'destination wedding band']
  },

  // 3.1 Wedding Performances Sub-page
  'service1/wedding-performances': {
    metaTitle: 'Wedding Performances & Royal Orchestra | The Royal Band',
    metaDescription: 'Hire India\'s premier royal wedding band for luxury palace weddings, grand baraat brass fanfares, and opulent sangeet celebrations in Agra, Mathura, Lucknow & Jodhpur.',
    slug: 'wedding-performances',
    canonicalUrl: 'https://theroyalband.com/events/wedding-performances',
    ogTitle: 'Wedding Performances | The Royal Band',
    ogDescription: 'The sovereign sound for grand baraats, sacred phere, and palace weddings.',
    ogImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjO6Sg-XnJ9_Udl1_IoTc366O4hALJGPK3m2ucFI6lIdy0hyeRSn6u3rm1NvSnp20xQZ9tZPaWDXQcaxN9UeJqjgXe0p1Of4HcG2Uvyz0OO5ZZBOej_bY2dOQKXZtYJNk0Wv_ELmC__loOJ1SB85TTQX0LS8AGsH2N8shOIf8jp9L4kUsbls0SJKUpCNKXSML_eUtNqJ4cX-Yu0BB8tsO_csQDAbG9R6PtWnzkocBGtqcAK-Lj4JjboQ',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    isNoIndex: false,
    isNoFollow: false,
    schemaType: 'Service',
    focusKeyword: 'wedding live orchestra baraat band',
    keywords: ['wedding performances', 'baraat brass', 'phere strings', 'sangeet live orchestra']
  },

  // 3.2 Corporate Events Sub-page
  'service1/corporate-events': {
    metaTitle: 'Corporate Events Live Orchestra & Entertainment | The Royal Band',
    metaDescription: 'Prestigious live music band for executive awards galas, corporate annual events, and black-tie summits.',
    slug: 'corporate-events',
    canonicalUrl: 'https://theroyalband.com/events/corporate-events',
    ogTitle: 'Corporate Events Live Orchestra | The Royal Band',
    ogDescription: 'Cinematic walk-in anthems and black-tie dinner jazz for executive summits.',
    ogImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDt5LhBx9wWj-misksfi9OBVa4BCx2sIlnjfa-Te0E8aRcRTxIqQumj-IfDndZw24hXEXrk6YjlA0oNuEafiHDe1EHcfJrNgZI5H6HwYOhIZIyWJUwmBk0qnjpsdQuWQY8GzmPNr26gkr1rzMTCfTsGG37XJUaYTnBnqJqR6P3h_DfFEr24qxc93pK5P3ucnuPh4Yffxbg7kFG5yP5nU_B_rT2DJ5vtUnCn3klIBZ2PShZTw66KxwcamA',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    isNoIndex: false,
    isNoFollow: false,
    schemaType: 'Service',
    focusKeyword: 'corporate event live orchestra',
    keywords: ['corporate entertainment', 'award gala band', 'executive dinner jazz', 'corporate summit music']
  },

  // 3.3 Private Parties Sub-page
  'service1/private-parties': {
    metaTitle: 'Private Parties & Soirée Live Band | The Royal Band',
    metaDescription: 'Acoustic jazz, ghazal, and retro fusion for intimate family galas, private parties, and estate dinners.',
    slug: 'private-parties',
    canonicalUrl: 'https://theroyalband.com/events/private-parties',
    ogTitle: 'Private Parties Live Band | The Royal Band',
    ogDescription: 'Acoustic elegance and live music for private celebrations and milestone birthdays.',
    ogImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARb9eDXNe_VYfETUwIIcdxk7nv7ayEOKBiSPdoDBS6HjLC3JRSRROawnSn-UKLIzaXi2EtdKKE2XvnBVnK-hsBG1Yn8o4HHSwQx9t4wqzsGl8V7NLdjNTLcGFSO8BhWfoa_0gnNyInQFFFkOpX9-6JgMWeIpgmkAsEhBsp8eLAFOkrXy_rzHl1GVL2yG5SuStvu6RTVMjNFNPor1s5-9WXhJg677EbrlcGsZ77g3FtUPHbcYKKPeruIg',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    isNoIndex: false,
    isNoFollow: false,
    schemaType: 'Service',
    focusKeyword: 'private party live music band',
    keywords: ['private party band', 'anniversary music', 'soiree ensemble', 'acoustic ghazal live']
  },

  // 3.4 Club / Lounge Gigs Sub-page
  'service1/club-lounge-gigs': {
    metaTitle: 'Live Band for Club & Lounge Gigs | The Royal Band',
    metaDescription: 'Live saxophone, brass, and percussion hybrid for premier nightlife clubs and luxury lounges.',
    slug: 'club-lounge-gigs',
    canonicalUrl: 'https://theroyalband.com/events/club-lounge-gigs',
    ogTitle: 'Club / Lounge Gigs Live Band | The Royal Band',
    ogDescription: 'Sensual brass overtones and live DJ fusion for clubs and luxury lounges.',
    ogImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRi7xSqsAMWZmRbNm0EG2ZyNwOm6DlqAnf7Zr0DsxA1bWR6Wv0FacGRYMsPtSHeXfqbTbPx-FSDHPLCSqiJwDwfoHklDo58pZTFVbrvtIoligHH8mHjLrV9SacriB1pwpOoqwcco1a6JYCLoIWVKm2ptJopApcAYGvOAS-D-XGObhyxrbkJKBg7AaZBL06IvX-JUTjy-fxL_pOcVZBEWibKKqvoQ7gJ6yN_BGvMQXTB9qjRmk1_YhgAg',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    isNoIndex: false,
    isNoFollow: false,
    schemaType: 'Service',
    focusKeyword: 'club lounge live saxophone brass band',
    keywords: ['nightclub live music', 'lounge band', 'brass house live', 'sax and dj']
  },

  // 3.5 College Fests & Festivals Sub-page
  'service1/college-fests-festivals': {
    metaTitle: 'College Fests & Festivals Live Band | The Royal Band',
    metaDescription: 'Electric brass and live rock-sufi fusion headliner for college fests and music festivals.',
    slug: 'college-fests-festivals',
    canonicalUrl: 'https://theroyalband.com/events/college-fests-festivals',
    ogTitle: 'College Fests & Festivals Live Band | The Royal Band',
    ogDescription: 'Arena level headliners with high-octane brass and percussion.',
    ogImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbWXetvsgbXU-QTvpCfN88rhT5uHcO67KlykkOr0HwrMMVW2vApJSsr4ROOt5FR29Fq_jNWfAWus8tCqc0Pyx_PxF3iO5fad3Wf6_LE8TrsuLe6fv9qA62mZDADu8PH-VAdth5FbM4FBMd1-Mxdm-4wsQ3L5trvVcg9MIVas5ZfpGuKnlcGS7TBGv85bZrK-vpDyBxPb3fGyBru6OEe3zDieU178VSqLElvlU1XdH7xbGnrhlEOfkgZg',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    isNoIndex: false,
    isNoFollow: false,
    schemaType: 'Service',
    focusKeyword: 'college fest live band concert',
    keywords: ['college fest band', 'campus festival live band', 'youth music festival', 'sufi rock live']
  },

  // 3.6 Destination Weddings Sub-page
  'service1/destination-weddings': {
    metaTitle: 'Destination Weddings Live Band & Palace Symphony | The Royal Band',
    metaDescription: 'Complete touring live band for destination weddings in Udaipur, Jaipur, Jodhpur, Goa, and international palaces.',
    slug: 'destination-weddings',
    canonicalUrl: 'https://theroyalband.com/events/destination-weddings',
    ogTitle: 'Destination Weddings Live Band | The Royal Band',
    ogDescription: 'Palatial acoustics and flawless touring logistics across world-class destination venues.',
    ogImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVFAz27xowA-sc7gI3gTVA81g6lr-DFQ6YkWNdYz5n0qBImxQgrXM01aPPlI5zd0S4_ic61wInZtC4ceJOmmLeOzRtNaluFwTdwle8TmApIDPUJCgCFwwWQRMuBTNC2kjUZijfY6_Iy_cjVVyIhO8BasehlbYNgN0_oVYFzaizmD4JVWqftIBgkVm64OqT4Fy-YvRfHQHXHFqiWduSOZLnE_6XcDN6doGO-OFjkSrYZNa7SZahxgRRTw',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    isNoIndex: false,
    isNoFollow: false,
    schemaType: 'Service',
    focusKeyword: 'destination wedding live band orchestra',
    keywords: ['destination wedding band', 'palace wedding live music', 'udaipur wedding band', 'jaipur wedding music']
  },

  // 4. Blog Overview
  'blog': {
    metaTitle: 'The Sovereign Chronicle: Royal Wedding Music & Acoustic Notes | The Royal Band',
    metaDescription: 'Authoritative guides on luxury palace acoustics, 16-piece baraat brass arrangements, sacred wedding overtures, and sound engineering.',
    slug: 'blog',
    canonicalUrl: 'https://theroyalband.com/blog',
    ogTitle: 'The Sovereign Chronicle - The Royal Band Editorial',
    ogDescription: 'Acoustic architecture, baraat fanfares, and palace celebration insights.',
    ogImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCddgIHrqFDssqCfud3_WvkQVIJut7OHepo7JZKpx03tYogGK5lmKIWdpchElaMr2SttOOOia2n4NFjNxhuVTR_ir0WscCh8xxjIzvdhpdXFwpDdwb77svmIhiSgwaxhmGgJC24IW4WUBuMAIn2VdmYCuk346YTCO529mSPAUHOgVGV265u4wV0Up4zkmVhWLzveBbEHFUF3Ae5TQxu_nSa7vaNwaYfv6OHamncjaV7hgiL134ssxAitQ',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    isNoIndex: false,
    isNoFollow: false,
    schemaType: 'Article',
    focusKeyword: 'royal wedding music blog articles',
    keywords: ['wedding music guides', 'palace acoustics', 'baraat arrangement', 'live band advice']
  },

  // 4.1 Blog Article 1
  'blog/art-of-royal-baraats-brass-symphony': {
    metaTitle: 'The Art of Royal Baraats: 16-Piece Brass Symphony | The Royal Band',
    metaDescription: 'Guide to planning unforgettable luxury Indian wedding baraats with live brass orchestra, synchronized wireless audio, and royal percussion.',
    slug: 'art-of-royal-baraats-brass-symphony',
    canonicalUrl: 'https://theroyalband.com/blog/art-of-royal-baraats-brass-symphony',
    ogTitle: 'The Art of Royal Baraats: Orchestrating a 16-Piece Brass Symphony',
    ogDescription: 'Precision arrangement for luxury royal wedding processions.',
    ogImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCddgIHrqFDssqCfud3_WvkQVIJut7OHepo7JZKpx03tYogGK5lmKIWdpchElaMr2SttOOOia2n4NFjNxhuVTR_ir0WscCh8xxjIzvdhpdXFwpDdwb77svmIhiSgwaxhmGgJC24IW4WUBuMAIn2VdmYCuk346YTCO529mSPAUHOgVGV265u4wV0Up4zkmVhWLzveBbEHFUF3Ae5TQxu_nSa7vaNwaYfv6OHamncjaV7hgiL134ssxAitQ',
    ogType: 'article',
    twitterCard: 'summary_large_image',
    isNoIndex: false,
    isNoFollow: false,
    schemaType: 'Article',
    focusKeyword: 'royal baraat brass symphony',
    keywords: ['baraat music', 'brass orchestra', 'wedding entry fanfare']
  },

  // 4.2 Blog Article 2
  'blog/acoustic-engineering-palace-courtyards': {
    metaTitle: 'Acoustic Engineering in Ancient Forts & Palaces | The Royal Band',
    metaDescription: 'Technical insights into staging high-fidelity live symphony orchestras in historical heritage palaces and open courtyards.',
    slug: 'acoustic-engineering-palace-courtyards',
    canonicalUrl: 'https://theroyalband.com/blog/acoustic-engineering-palace-courtyards',
    ogTitle: 'Acoustic Engineering in Ancient Forts & Palatial Courtyards',
    ogDescription: 'Sound engineering secrets for heritage palace celebrations.',
    ogImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVFAz27xowA-sc7gI3gTVA81g6lr-DFQ6YkWNdYz5n0qBImxQgrXM01aPPlI5zd0S4_ic61wInZtC4ceJOmmLeOzRtNaluFwTdwle8TmApIDPUJCgCFwwWQRMuBTNC2kjUZijfY6_Iy_cjVVyIhO8BasehlbYNgN0_oVYFzaizmD4JVWqftIBgkVm64OqT4Fy-YvRfHQHXHFqiWduSOZLnE_6XcDN6doGO-OFjkSrYZNa7SZahxgRRTw',
    ogType: 'article',
    twitterCard: 'summary_large_image',
    isNoIndex: false,
    isNoFollow: false,
    schemaType: 'Article',
    focusKeyword: 'palace courtyard acoustic engineering',
    keywords: ['palace acoustics', 'line array fort sound', 'reverberation tuning']
  },

  // 4.3 Blog Article 3
  'blog/2026-wedding-music-trend-forecast': {
    metaTitle: '2026 Royal Wedding Music Trends & Repertoire Forecast | The Royal Band',
    metaDescription: 'Exclusive trend forecast for luxury destination wedding music, live symphony orchestras, and midnight Sangeet crescendos.',
    slug: '2026-wedding-music-trend-forecast',
    canonicalUrl: 'https://theroyalband.com/blog/2026-wedding-music-trend-forecast',
    ogTitle: '2026 Royal Wedding Music Trends Forecast',
    ogDescription: 'The shift towards live orchestral mastery for palace celebrations.',
    ogImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8eVoV10zFbyvW0yyKPIla3cV2cFLfn2g_hotZM05wvAvUVvY0d-B9_S1d6nWbfOo2lUZ1GHwl3_9sSheGMtcCVnnyzVXjUtVZAmj5od5y-phLcMf1ykJ5GzN0ASv3YTfBudA-EpqaX62yxSoXp8rulD-K3rDehePC1kfCNuD2MRMZXSe03b38L6smHCWiXQETnGuw_D-GhOwSlK9MclbgacIBpSKnZDBdLTW_6Muq-XMXWAv5Z2ST-Q',
    ogType: 'article',
    twitterCard: 'summary_large_image',
    isNoIndex: false,
    isNoFollow: false,
    schemaType: 'Article',
    focusKeyword: '2026 wedding music trends',
    keywords: ['wedding trends 2026', 'sangeet dj hybrid', 'bridal music strings']
  },

  // 5. Service 2 / Locations Overview
  'service2': {
    metaTitle: 'Stationed City Hubs & Regional Availability | The Royal Band',
    metaDescription: 'Direct band booking in Agra, Mathura, Lucknow, and Jodhpur with zero transit delay and local production logistics.',
    slug: 'locations',
    canonicalUrl: 'https://theroyalband.com/locations',
    ogTitle: 'City Hubs - The Royal Band',
    ogDescription: 'Direct live band availability in Agra, Mathura, Lucknow, and Jodhpur.',
    ogImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjO6Sg-XnJ9_Udl1_IoTc366O4hALJGPK3m2ucFI6lIdy0hyeRSn6u3rm1NvSnp20xQZ9tZPaWDXQcaxN9UeJqjgXe0p1Of4HcG2Uvyz0OO5ZZBOej_bY2dOQKXZtYJNk0Wv_ELmC__loOJ1SB85TTQX0LS8AGsH2N8shOIf8jp9L4kUsbls0SJKUpCNKXSML_eUtNqJ4cX-Yu0BB8tsO_csQDAbG9R6PtWnzkocBGtqcAK-Lj4JjboQ',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    isNoIndex: false,
    isNoFollow: false,
    schemaType: 'LocalBusiness',
    focusKeyword: 'live band in agra mathura lucknow jodhpur',
    keywords: ['agra wedding band', 'mathura live band', 'lucknow royal band', 'jodhpur palace orchestra']
  },

  // 5.1 Agra Sub-page
  'service2/agra': {
    metaTitle: 'Live Band in Agra for Weddings & Corporate Events | The Royal Band',
    metaDescription: 'Book The Royal Band in Agra for luxury palace weddings, ITC Mughal galas, and heritage celebrations. Available touring troupe with full live sound setup.',
    slug: 'agra',
    canonicalUrl: 'https://theroyalband.com/locations/agra',
    ogTitle: 'The Royal Band — Agra Services',
    ogDescription: 'Live symphony band for weddings and corporate events in Agra.',
    ogImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjO6Sg-XnJ9_Udl1_IoTc366O4hALJGPK3m2ucFI6lIdy0hyeRSn6u3rm1NvSnp20xQZ9tZPaWDXQcaxN9UeJqjgXe0p1Of4HcG2Uvyz0OO5ZZBOej_bY2dOQKXZtYJNk0Wv_ELmC__loOJ1SB85TTQX0LS8AGsH2N8shOIf8jp9L4kUsbls0SJKUpCNKXSML_eUtNqJ4cX-Yu0BB8tsO_csQDAbG9R6PtWnzkocBGtqcAK-Lj4JjboQ',
    ogType: 'business.business',
    twitterCard: 'summary_large_image',
    isNoIndex: false,
    isNoFollow: false,
    schemaType: 'LocalBusiness',
    focusKeyword: 'live band in agra',
    keywords: ['agra wedding band', 'itc mughal live music', 'oberoi amarvilas band', 'baraat band agra']
  },

  // 5.2 Mathura Sub-page
  'service2/mathura': {
    metaTitle: 'Live Royal Band in Mathura | Wedding & Cultural Symphony',
    metaDescription: 'Sufi rock, devotional sitar symphonies, and royal celebration live band in Mathura. Touring readiness for private events and weddings.',
    slug: 'mathura',
    canonicalUrl: 'https://theroyalband.com/locations/mathura',
    ogTitle: 'The Royal Band — Mathura Services',
    ogDescription: 'Spiritual Sufi and devotional royal live band in Mathura.',
    ogImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvGyulCTtUTZIKI_lPblSMyoVDYMJM1UyI8y3FxN6bNCTO3kFwhHtbRS7dF9_IE4wCRVN6The8DjbQhAHeXVLWCqDzr0Timz6AqNKUWZFbJZMYqI-SAUfZNU4Z_NBG0pBSvOI6rvHufP3fMaiYujNmbIxEuQMovSOYBRCqsmktKnGncrCzQw605KpujQZkcdcug_0vSO_HaNhSASiveGPqsBhuM4jIy03n_U_4ki_UcTPuIZS62jtEJQ',
    ogType: 'business.business',
    twitterCard: 'summary_large_image',
    isNoIndex: false,
    isNoFollow: false,
    schemaType: 'LocalBusiness',
    focusKeyword: 'live band in mathura vrindavan',
    keywords: ['mathura live band', 'vrindavan wedding orchestra', 'devotional sufi fusion', 'baraat mathura']
  },

  // 5.3 Lucknow Sub-page
  'service2/lucknow': {
    metaTitle: 'The Royal Band in Lucknow | Wedding & Corporate Event Orchestra',
    metaDescription: 'Experience Awadhi royal musical heritage and live contemporary symphony in Lucknow with The Royal Band. Available for grand weddings and corporate galas.',
    slug: 'lucknow',
    canonicalUrl: 'https://theroyalband.com/locations/lucknow',
    ogTitle: 'The Royal Band — Lucknow Services',
    ogDescription: 'Nawabi elegance meets modern concert orchestration in Lucknow.',
    ogImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDX_GiHsBACg38pLhfX-IS4KQoY04inXY893P5URjaiqXRp5FeAjBI4OcbEgc77a0T0P_2nZspydyNdnKB811Xq3iBnfSK2qaiOzr9ROU7oPgiBSkZBZqkxcZxx2viir7HuD1E-C2WOMvAoS_PXTJtS2ZfkSNBOn3t2jtGu81iSxutange6GGpjk_bmpTZo0M6SVEri34dnyF9xqK6wUKmX_NQtR0O_8RjHkYsr2KJWilRFdOZ1INXzRw',
    ogType: 'business.business',
    twitterCard: 'summary_large_image',
    isNoIndex: false,
    isNoFollow: false,
    schemaType: 'LocalBusiness',
    focusKeyword: 'live band in lucknow nawabi orchestra',
    keywords: ['lucknow live band', 'taj mahal lucknow wedding', 'the centrum events', 'awadhi music']
  },

  // 5.4 Jodhpur Sub-page
  'service2/jodhpur': {
    metaTitle: 'The Royal Band in Jodhpur | Palace & Fortress Wedding Orchestra',
    metaDescription: 'Royal orchestra and live band for Umaid Bhawan and Mehrangarh Fort destination weddings in Jodhpur. Turnkey touring setup.',
    slug: 'jodhpur',
    canonicalUrl: 'https://theroyalband.com/locations/jodhpur',
    ogTitle: 'The Royal Band — Jodhpur Services',
    ogDescription: 'Fortress & heritage palace destination galas live band in Jodhpur.',
    ogImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVFAz27xowA-sc7gI3gTVA81g6lr-DFQ6YkWNdYz5n0qBImxQgrXM01aPPlI5zd0S4_ic61wInZtC4ceJOmmLeOzRtNaluFwTdwle8TmApIDPUJCgCFwwWQRMuBTNC2kjUZijfY6_Iy_cjVVyIhO8BasehlbYNgN0_oVYFzaizmD4JVWqftIBgkVm64OqT4Fy-YvRfHQHXHFqiWduSOZLnE_6XcDN6doGO-OFjkSrYZNa7SZahxgRRTw',
    ogType: 'business.business',
    twitterCard: 'summary_large_image',
    isNoIndex: false,
    isNoFollow: false,
    schemaType: 'LocalBusiness',
    focusKeyword: 'live band in jodhpur umaid bhawan mehrangarh',
    keywords: ['jodhpur palace wedding band', 'umaid bhawan live band', 'mehrangarh fort music', 'rajasthan royal orchestra']
  },

  // 6. Gallery
  'gallery': {
    metaTitle: 'Performance Gallery & Palatial Highlights | The Royal Band',
    metaDescription: 'High-resolution photography and cinema reels from Umaid Bhawan, Taj Lake Palace, and luxury destination banquets worldwide.',
    slug: 'gallery',
    canonicalUrl: 'https://theroyalband.com/gallery',
    ogTitle: 'The Royal Band Performance Gallery',
    ogDescription: 'Visual archive and high-resolution palace concert highlights across weddings and corporate galas.',
    ogImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCieWqe0mC1vcRsIkppBxWd423pVtnRiRg8TOqoYiC5me_mkVhRc-_0dQDTeDuhjKYWSFosxBg6gF-mktCNexUZF-2ed2e4v2La44IoIfkL9H2IKXIL0bot2QICvdu21lPD6pK3t350LI6VV0tdC_YEp3LLIruLPUEzE1CTeTRMHuOI1UfNqVoebPjfJteoJsXZpOchKJhFDfFfFmEzIFaHU4DY6Hru9SKoJCB48-P6BfYmSgLZx_xM6w',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    isNoIndex: false,
    isNoFollow: false,
    schemaType: 'MusicGroup',
    focusKeyword: 'royal band performance gallery cinema reels',
    keywords: ['royal band photos', 'wedding band videos', 'cinema reels', 'live performance photos']
  },

  // 7. Contact Us
  'contact': {
    metaTitle: 'Contact The Royal Band | Direct Bookings & VIP Concierge',
    metaDescription: 'Get in touch with The Royal Band management for date hold inquiries, pricing quotes, WhatsApp booking consultations, and studio headquarters.',
    slug: 'contact',
    canonicalUrl: 'https://theroyalband.com/contact',
    ogTitle: 'Contact The Royal Band - VIP Concierge',
    ogDescription: 'Direct booking inquiries, WhatsApp chat, and calendar availability reservations.',
    ogImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAsfIVnw8ptFr9B0CIPOnT9RnZETmqq_cihXQQhIwht8OLtAwV8_Wrmcx6ciWDSHWV-mzFPlllBOvrwIXUaLufrN9Mc6F7Pcqn9EQEQj6SQXbFMrl-OsaHfWmxVBmY6E3W_qL-Zn0CofVBYBGnWkFvH_Mxp22SGkqquZ4mQCAeUw5o1EtzvPUyFmVbT9Q9lBdbSZBcx_0IQ8sotHAtuew4bgJSxbg7wTfxJmv1XZkT1DTVXDSqitdUSQ',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    isNoIndex: false,
    isNoFollow: false,
    schemaType: 'LocalBusiness',
    focusKeyword: 'contact the royal band booking inquiry',
    keywords: ['contact royal band', 'book royal orchestra', 'royal band phone number', 'whatsapp band booking']
  }
};
