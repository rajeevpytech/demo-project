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
  AuditLogEntry
} from '../types';

export const initialSettings: WebsiteSettings = {
  brandName: "THE ROYAL BAND",
  tagline: "Symphonies of Grandeur. Unrivaled Live Performance.",
  logoUrl: "https://lh3.googleusercontent.com/aida/AEtjO1WfvzmXyCiU23TH1ZkXQzwMvELf9ZV9npFOl1EcrUii7biCSQIgojMHfla4Fv1u8I_NMZCxuNsZ1akJmCwvPgUfI_5J3fjSxA2hAEuM0eezxSgojS7z67DK8r5LBxP9I2njKiRy_E_jay9iwYJhDRtVLhxzYDIMiMqqaqbYkuO3hW7JXxwVcaAeSwVuf9dlPQHCffyv4evC_UCgVzNSa5VtkclAxhhRq9aw8OW42PTr7poACZqc_092w1o",
  primaryColor: "#f2ca50",
  secondaryColor: "#d4c78f",
  surfaceColor: "#131315",
  phone: "+91 80000 00000",
  whatsAppPhone: "+91 80000 00000",
  conciergeEmail: "concierge@theroyalband.com",
  address: "Heritage Quarter, Civil Lines, Jaipur & Central Liaison Offices in Agra & Lucknow",
  directorName: "Vikramaditya Rathore",
  directorTitle: "Principal Director & Executive Conductor",
  directorPhone: "+91 98290 88214",
  directorPhotoUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDAsfIVnw8ptFr9B0CIPOnT9RnZETmqq_cihXQQhIwht8OLtAwV8_Wrmcx6ciWDSHWV-mzFPlllBOvrwIXUaLufrN9Mc6F7Pcqn9EQEQj6SQXbFMrl-OsaHfWmxVBmY6E3W_qL-Zn0CofVBYBGnWkFvH_Mxp22SGkqquZ4mQCAeUw5o1EtzvPUyFmVbT9Q9lBdbSZBcx_0IQ8sotHAtuew4bgJSxbg7wTfxJmv1XZkT1DTVXDSqitdUSQ",
  socials: {
    instagram: "https://instagram.com/theroyalband.live",
    youtube: "https://youtube.com/@theroyalbandlive",
    facebook: "https://facebook.com/theroyalbandlive"
  },
  tenantId: "royal-band-prod-01",
  businessType: "EntertainmentBusiness",
  currency: "INR"
};

export const initialUsers: User[] = [
  {
    id: "usr-01",
    name: "Vikramaditya Rathore",
    email: "vikramaditya@theroyalband.com",
    role: "website_owner",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDAsfIVnw8ptFr9B0CIPOnT9RnZETmqq_cihXQQhIwht8OLtAwV8_Wrmcx6ciWDSHWV-mzFPlllBOvrwIXUaLufrN9Mc6F7Pcqn9EQEQj6SQXbFMrl-OsaHfWmxVBmY6E3W_qL-Zn0CofVBYBGnWkFvH_Mxp22SGkqquZ4mQCAeUw5o1EtzvPUyFmVbT9Q9lBdbSZBcx_0IQ8sotHAtuew4bgJSxbg7wTfxJmv1XZkT1DTVXDSqitdUSQ",
    createdAt: "2024-01-10",
    lastLogin: "2026-10-08 11:20 AM",
    status: "active"
  },
  {
    id: "usr-02",
    name: "Rajesh Singhania",
    email: "admin@theroyalband.com",
    role: "super_admin",
    createdAt: "2024-01-15",
    lastLogin: "2026-10-07 04:45 PM",
    status: "active"
  },
  {
    id: "usr-03",
    name: "Sunita Verma",
    email: "editor@theroyalband.com",
    role: "content_editor",
    createdAt: "2024-03-01",
    lastLogin: "2026-10-06 09:15 AM",
    status: "active"
  },
  {
    id: "usr-04",
    name: "Rajat Deshmukh",
    email: "seo@theroyalband.com",
    role: "seo_manager",
    createdAt: "2024-04-12",
    lastLogin: "2026-10-05 02:00 PM",
    status: "active"
  },
  {
    id: "usr-05",
    name: "Priya Chauhan",
    email: "concierge@theroyalband.com",
    role: "inquiry_manager",
    createdAt: "2024-05-18",
    lastLogin: "2026-10-08 10:10 AM",
    status: "active"
  }
];

export const initialMediaAssets: MediaAsset[] = [
  {
    id: "med-01",
    title: "The Sovereign Stage Grand Hero",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCddgIHrqFDssqCfud3_WvkQVIJut7OHepo7JZKpx03tYogGK5lmKIWdpchElaMr2SttOOOia2n4NFjNxhuVTR_ir0WscCh8xxjIzvdhpdXFwpDdwb77svmIhiSgwaxhmGgJC24IW4WUBuMAIn2VdmYCuk346YTCO529mSPAUHOgVGV265u4wV0Up4zkmVhWLzveBbEHFUF3Ae5TQxu_nSa7vaNwaYfv6OHamncjaV7hgiL134ssxAitQ",
    type: "image",
    altText: "A grand orchestral wedding performance at night inside an opulent Indian palace courtyard with chandeliers, brass players, violinists in black velvet bandgala attire, and warm golden stage spotlights shimmering in mist.",
    fileSize: "1.4 MB",
    dimensions: "1920x1080",
    uploadedAt: "2025-01-10"
  },
  {
    id: "med-02",
    title: "2025 Royal Showcase Reel Still",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCieWqe0mC1vcRsIkppBxWd423pVtnRiRg8TOqoYiC5me_mkVhRc-_0dQDTeDuhjKYWSFosxBg6gF-mktCNexUZF-2ed2e4v2La44IoIfkL9H2IKXIL0bot2QICvdu21lPD6pK3t350LI6VV0tdC_YEp3LLIruLPUEzE1CTeTRMHuOI1UfNqVoebPjfJteoJsXZpOchKJhFDfFfFmEzIFaHU4DY6Hru9SKoJCB48-P6BfYmSgLZx_xM6w",
    type: "image",
    altText: "Still frame from 2025 showreel showing golden brass instruments glistening in stage spotlight, cinematic depth of field, live audience in evening gowns and royal attire clapping in palace ballroom.",
    fileSize: "1.1 MB",
    dimensions: "1920x1080",
    uploadedAt: "2025-01-12"
  },
  {
    id: "med-03",
    title: "Wedding Performances Crowning Showcase",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjO6Sg-XnJ9_Udl1_IoTc366O4hALJGPK3m2ucFI6lIdy0hyeRSn6u3rm1NvSnp20xQZ9tZPaWDXQcaxN9UeJqjgXe0p1Of4HcG2Uvyz0OO5ZZBOej_bY2dOQKXZtYJNk0Wv_ELmC__loOJ1SB85TTQX0LS8AGsH2N8shOIf8jp9L4kUsbls0SJKUpCNKXSML_eUtNqJ4cX-Yu0BB8tsO_csQDAbG9R6PtWnzkocBGtqcAK-Lj4JjboQ",
    type: "image",
    altText: "Grand regal Indian royal wedding procession with brass symphony band playing under lit palace chandeliers, warm gold and deep obsidian festive atmosphere, musicians in embroidered sherwanis with brass trumpets and drums.",
    fileSize: "1.6 MB",
    dimensions: "1920x1080",
    uploadedAt: "2025-02-01"
  },
  {
    id: "med-04",
    title: "Corporate Galas & Awards Stage",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDt5LhBx9wWj-misksfi9OBVa4BCx2sIlnjfa-Te0E8aRcRTxIqQumj-IfDndZw24hXEXrk6YjlA0oNuEafiHDe1EHcfJrNgZI5H6HwYOhIZIyWJUwmBk0qnjpsdQuWQY8GzmPNr26gkr1rzMTCfTsGG37XJUaYTnBnqJqR6P3h_DfFEr24qxc93pK5P3ucnuPh4Yffxbg7kFG5yP5nU_B_rT2DJ5vtUnCn3klIBZ2PShZTw66KxwcamA",
    type: "image",
    altText: "Sophisticated black-tie corporate awards gala stage with dramatic golden stage lighting, luxury orchestra musicians in tuxedos playing brass and cello, executive ballroom setting with warm ambient hues.",
    fileSize: "1.3 MB",
    dimensions: "1920x1080",
    uploadedAt: "2025-02-05"
  },
  {
    id: "med-05",
    title: "Destination Weddings Heritage Touring",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVFAz27xowA-sc7gI3gTVA81g6lr-DFQ6YkWNdYz5n0qBImxQgrXM01aPPlI5zd0S4_ic61wInZtC4ceJOmmLeOzRtNaluFwTdwle8TmApIDPUJCgCFwwWQRMuBTNC2kjUZijfY6_Iy_cjVVyIhO8BasehlbYNgN0_oVYFzaizmD4JVWqftIBgkVm64OqT4Fy-YvRfHQHXHFqiWduSOZLnE_6XcDN6doGO-OFjkSrYZNa7SZahxgRRTw",
    type: "image",
    altText: "Luxury palace destination wedding in Rajasthan with illuminated domes against night sky, reflection pools, full live brass ensemble in traditional royal gold uniforms, fairy lights and grand architecture.",
    fileSize: "1.8 MB",
    dimensions: "1920x1080",
    uploadedAt: "2025-02-10"
  },
  {
    id: "med-06",
    title: "Taj Lake Palace Reel 01",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDod9y_lu7tL7ERkSJMgI0CTbrlNDZkoPf7hndGzbZxXdJuGkEtF4l1vrRpIUzFEvur_Wk--CEowETO0_0S00BDs8fLUoXZgIOiTgrMhk_2JnUkMIE0ifVVc67XDWP8tjRnINhvnzMdRZubczjWM2MpDaQ-BkT9qIhUH0xD2QbLQzGjo63LLirAfztCuCvjGDQ9-DR6Ea7NPwIHvkVa55ufXr_wVBXjOISDXRUQCxcEglSzEMZbJg9JIQ",
    type: "video",
    altText: "Grand luxury palace courtyard concert at night with glowing chandeliers, regal brass section playing on illuminated stage, royal Indian wedding sangeet audience cheering, cinematic warm amber lighting and mist.",
    fileSize: "18.4 MB",
    duration: "04:12",
    uploadedAt: "2025-02-14"
  },
  {
    id: "med-07",
    title: "Umaid Bhawan Reel 02",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAvGyulCTtUTZIKI_lPblSMyoVDYMJM1UyI8y3FxN6bNCTO3kFwhHtbRS7dF9_IE4wCRVN6The8DjbQhAHeXVLWCqDzr0Timz6AqNKUWZFbJZMYqI-SAUfZNU4Z_NBG0pBSvOI6rvHufP3fMaiYujNmbIxEuQMovSOYBRCqsmktKnGncrCzQw605KpujQZkcdcug_0vSO_HaNhSASiveGPqsBhuM4jIy03n_U_4ki_UcTPuIZS62jtEJQ",
    type: "video",
    altText: "Sufi fusion lead vocalist singing passionately into vintage condenser microphone with harmonium player and percussionist in dark royal venue draped with silk curtains and gold candle chandeliers.",
    fileSize: "22.1 MB",
    duration: "05:40",
    uploadedAt: "2025-02-18"
  },
  {
    id: "med-08",
    title: "Jaipur Rambagh Reel 03",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuD8eVoV10zFbyvW0yyKPIla3cV2cFLfn2g_hotZM05wvAvUVvY0d-B9_S1d6nWbfOo2lUZ1GHwl3_9sSheGMtcCVnnyzVXjUtVZAmj5od5y-phLcMf1ykJ5GzN0ASv3YTfBudA-EpqaX62yxSoXp8rulD-K3rDehePC1kfCNuD2MRMZXSe03b38L6smHCWiXQETnGuw_D-GhOwSlK9MclbgacIBpSKnZDBdLTW_6Muq-XMXWAv5Z2ST-Q",
    type: "video",
    altText: "Saxophonist in tailored royal black band jacket playing saxophone during outdoor twilight cocktail party by marble fountain, warm bokeh string lights and luxury guests.",
    fileSize: "14.7 MB",
    duration: "03:15",
    uploadedAt: "2025-02-20"
  },
  {
    id: "med-09",
    title: "Falaknuma Palace Reel 04",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbWXetvsgbXU-QTvpCfN88rhT5uHcO67KlykkOr0HwrMMVW2vApJSsr4ROOt5FR29Fq_jNWfAWus8tCqc0Pyx_PxF3iO5fad3Wf6_LE8TrsuLe6fv9qA62mZDADu8PH-VAdth5FbM4FBMd1-Mxdm-4wsQ3L5trvVcg9MIVas5ZfpGuKnlcGS7TBGv85bZrK-vpDyBxPb3fGyBru6OEe3zDieU178VSqLElvlU1XdH7xbGnrhlEOfkgZg",
    type: "video",
    altText: "High energy brass procession with trumpets, French horns and decorated dhol drummers leading a royal Indian groom baraat parade under sparklers and fireworks.",
    fileSize: "12.8 MB",
    duration: "02:45",
    uploadedAt: "2025-02-24"
  }
];

export const initialServices: ServiceItem[] = [
  {
    id: "srv-01",
    name: "Wedding Performances",
    tagline: "The Sovereign Sound for Grand Baraats, Sacred Phere & Opulent Sangeets",
    description: "From high-energy Baraat Symphonies that captivate palace corridors to sacred, serene Royal Phere melodies and opulent Sangeet celebrations.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjO6Sg-XnJ9_Udl1_IoTc366O4hALJGPK3m2ucFI6lIdy0hyeRSn6u3rm1NvSnp20xQZ9tZPaWDXQcaxN9UeJqjgXe0p1Of4HcG2Uvyz0OO5ZZBOej_bY2dOQKXZtYJNk0Wv_ELmC__loOJ1SB85TTQX0LS8AGsH2N8shOIf8jp9L4kUsbls0SJKUpCNKXSML_eUtNqJ4cX-Yu0BB8tsO_csQDAbG9R6PtWnzkocBGtqcAK-Lj4JjboQ",
    badge: "Crowning Showcase",
    tags: ["Baraat Symphony", "Royal Sangeet Gala", "Phere Strings", "Reception Grand Band"],
    features: [
      "Traditional brass fanfare & custom entrance overtures",
      "Dynamic folk percussionists & acoustic bansuri players",
      "Pristine wireless staging for roving Baraat processions",
      "Coordinated royal uniform attire (embroidered ivory & gold)"
    ],
    duration: "Flexible (1h, 2h, or Full Evening)",
    estimatedPricing: "Request a Quote",
    category: "wedding",
    isPublished: true,
    seo: {
      metaTitle: "Wedding Performances & Royal Orchestra | The Royal Band",
      metaDescription: "Hire India's premier royal wedding band for luxury palace weddings, grand baraat brass fanfares, and opulent sangeet celebrations in Agra, Mathura, Lucknow & Jodhpur.",
      slug: "wedding-performances",
      canonicalUrl: "https://theroyalband.com/events/wedding-performances",
      ogTitle: "Wedding Performances | The Royal Band",
      ogDescription: "The sovereign sound for grand baraats, sacred phere, and palace weddings.",
      ogImageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjO6Sg-XnJ9_Udl1_IoTc366O4hALJGPK3m2ucFI6lIdy0hyeRSn6u3rm1NvSnp20xQZ9tZPaWDXQcaxN9UeJqjgXe0p1Of4HcG2Uvyz0OO5ZZBOej_bY2dOQKXZtYJNk0Wv_ELmC__loOJ1SB85TTQX0LS8AGsH2N8shOIf8jp9L4kUsbls0SJKUpCNKXSML_eUtNqJ4cX-Yu0BB8tsO_csQDAbG9R6PtWnzkocBGtqcAK-Lj4JjboQ",
      twitterCard: "summary_large_image",
      isNoIndex: false,
      isNoFollow: false,
      schemaType: "Service"
    }
  },
  {
    id: "srv-02",
    name: "Corporate Events",
    tagline: "Cinematic Walk-in Anthems & Polished Dinner Jazz for Corporate Galas",
    description: "Elevating executive summits, formal award ceremonies, product launches, and corporate anniversary celebrations with polished, cinematic overtures and dinner jazz.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDt5LhBx9wWj-misksfi9OBVa4BCx2sIlnjfa-Te0E8aRcRTxIqQumj-IfDndZw24hXEXrk6YjlA0oNuEafiHDe1EHcfJrNgZI5H6HwYOhIZIyWJUwmBk0qnjpsdQuWQY8GzmPNr26gkr1rzMTCfTsGG37XJUaYTnBnqJqR6P3h_DfFEr24qxc93pK5P3ucnuPh4Yffxbg7kFG5yP5nU_B_rT2DJ5vtUnCn3klIBZ2PShZTw66KxwcamA",
    badge: "Executive Summits",
    tags: ["Walk-in Anthems", "Trophy Stings", "Celebratory Post-Show", "Dinner Jazz"],
    features: [
      "Custom brand fanfare composed for award handovers",
      "Polished black-tie stage presence & tuxedos",
      "Seamless cue-sync with event show-callers",
      "Dual wireless backup microphones for keynote dignitaries"
    ],
    duration: "2 to 4 Hours",
    estimatedPricing: "Request a Quote",
    category: "corporate",
    isPublished: true,
    seo: {
      metaTitle: "Corporate Events Live Orchestra & Entertainment | The Royal Band",
      metaDescription: "Prestigious live music band for executive awards galas, corporate annual events, and black-tie summits.",
      slug: "corporate-events",
      canonicalUrl: "https://theroyalband.com/events/corporate-events",
      ogTitle: "Corporate Events Live Orchestra | The Royal Band",
      ogDescription: "Cinematic walk-in anthems and black-tie dinner jazz.",
      ogImageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDt5LhBx9wWj-misksfi9OBVa4BCx2sIlnjfa-Te0E8aRcRTxIqQumj-IfDndZw24hXEXrk6YjlA0oNuEafiHDe1EHcfJrNgZI5H6HwYOhIZIyWJUwmBk0qnjpsdQuWQY8GzmPNr26gkr1rzMTCfTsGG37XJUaYTnBnqJqR6P3h_DfFEr24qxc93pK5P3ucnuPh4Yffxbg7kFG5yP5nU_B_rT2DJ5vtUnCn3klIBZ2PShZTw66KxwcamA",
      twitterCard: "summary_large_image",
      isNoIndex: false,
      isNoFollow: false,
      schemaType: "Service"
    }
  },
  {
    id: "srv-03",
    name: "Private Parties",
    tagline: "Subtle Yet Electrifying Acoustic Ensembles for Private Estates & Celebrations",
    description: "Subtle yet electrifying acoustic ensembles curated for private estates, penthouse lounges, milestone birthdays, and exclusive family anniversaries.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuARb9eDXNe_VYfETUwIIcdxk7nv7ayEOKBiSPdoDBS6HjLC3JRSRROawnSn-UKLIzaXi2EtdKKE2XvnBVnK-hsBG1Yn8o4HHSwQx9t4wqzsGl8V7NLdjNTLcGFSO8BhWfoa_0gnNyInQFFFkOpX9-6JgMWeIpgmkAsEhBsp8eLAFOkrXy_rzHl1GVL2yG5SuStvu6RTVMjNFNPor1s5-9WXhJg677EbrlcGsZ77g3FtUPHbcYKKPeruIg",
    badge: "Intimate Mastery",
    tags: ["25 – 150 Guests", "Bespoke Setlist", "Acoustic Harmony"],
    features: [
      "Customized family tribute song arrangements",
      "Pristine low-decibel acoustic clarity",
      "Discreet and distinguished royal presence",
      "Interactive song requests and intimate medley sets"
    ],
    duration: "2 to 3 Hours",
    estimatedPricing: "Request a Quote",
    category: "soiree",
    isPublished: true,
    seo: {
      metaTitle: "Private Parties & Soirée Live Band | The Royal Band",
      metaDescription: "Acoustic jazz, ghazal, and retro fusion for intimate family galas, private parties, and estate dinners.",
      slug: "private-parties",
      canonicalUrl: "https://theroyalband.com/events/private-parties",
      ogTitle: "Private Parties Live Band | The Royal Band",
      ogDescription: "Acoustic elegance and live music for private celebrations.",
      ogImageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuARb9eDXNe_VYfETUwIIcdxk7nv7ayEOKBiSPdoDBS6HjLC3JRSRROawnSn-UKLIzaXi2EtdKKE2XvnBVnK-hsBG1Yn8o4HHSwQx9t4wqzsGl8V7NLdjNTLcGFSO8BhWfoa_0gnNyInQFFFkOpX9-6JgMWeIpgmkAsEhBsp8eLAFOkrXy_rzHl1GVL2yG5SuStvu6RTVMjNFNPor1s5-9WXhJg677EbrlcGsZ77g3FtUPHbcYKKPeruIg",
      twitterCard: "summary_large_image",
      isNoIndex: false,
      isNoFollow: false,
      schemaType: "Service"
    }
  },
  {
    id: "srv-04",
    name: "Club / Lounge Gigs",
    tagline: "Sensual Brass Overtones & Deep Groove Hybrid Sets",
    description: "Bringing high-energy brass house, live saxophone improvisations, and soulful fusion to premier nightlife venues, luxury clubs, and rooftop lounges.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDRi7xSqsAMWZmRbNm0EG2ZyNwOm6DlqAnf7Zr0DsxA1bWR6Wv0FacGRYMsPtSHeXfqbTbPx-FSDHPLCSqiJwDwfoHklDo58pZTFVbrvtIoligHH8mHjLrV9SacriB1pwpOoqwcco1a6JYCLoIWVKm2ptJopApcAYGvOAS-D-XGObhyxrbkJKBg7AaZBL06IvX-JUTjy-fxL_pOcVZBEWibKKqvoQ7gJ6yN_BGvMQXTB9qjRmk1_YhgAg",
    badge: "Nightlife Edition",
    tags: ["Live Sax & DJ", "Electronic Brass Fusion", "High Tempo"],
    features: [
      "Seamless integration with resident club DJs",
      "Compact footprint with explosive acoustic impact",
      "Late-night peak hour sets with live percussion",
      "Modern Bollywood EDM and international chartbusters"
    ],
    duration: "2 Hours",
    estimatedPricing: "Request a Quote",
    category: "addon",
    isPublished: true,
    seo: {
      metaTitle: "Live Band for Club & Lounge Gigs | The Royal Band",
      metaDescription: "Live saxophone, brass, and percussion hybrid for premier nightlife clubs and luxury lounges.",
      slug: "club-lounge-gigs",
      canonicalUrl: "https://theroyalband.com/events/club-lounge-gigs",
      ogTitle: "Club / Lounge Gigs Live Band | The Royal Band",
      ogDescription: "Sensual brass overtones and live DJ fusion for clubs and lounges.",
      ogImageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDRi7xSqsAMWZmRbNm0EG2ZyNwOm6DlqAnf7Zr0DsxA1bWR6Wv0FacGRYMsPtSHeXfqbTbPx-FSDHPLCSqiJwDwfoHklDo58pZTFVbrvtIoligHH8mHjLrV9SacriB1pwpOoqwcco1a6JYCLoIWVKm2ptJopApcAYGvOAS-D-XGObhyxrbkJKBg7AaZBL06IvX-JUTjy-fxL_pOcVZBEWibKKqvoQ7gJ6yN_BGvMQXTB9qjRmk1_YhgAg",
      twitterCard: "summary_large_image",
      isNoIndex: false,
      isNoFollow: false,
      schemaType: "Service"
    }
  },
  {
    id: "srv-05",
    name: "College Fests & Festivals",
    tagline: "High-Octane Stadium-Grade Percussion & Blazing Brass Fanfare",
    description: "High-octane stadium-grade percussion sections, blazing brass sections, and crowd-rousing headlining festival performances that keep thousands jumping.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbWXetvsgbXU-QTvpCfN88rhT5uHcO67KlykkOr0HwrMMVW2vApJSsr4ROOt5FR29Fq_jNWfAWus8tCqc0Pyx_PxF3iO5fad3Wf6_LE8TrsuLe6fv9qA62mZDADu8PH-VAdth5FbM4FBMd1-Mxdm-4wsQ3L5trvVcg9MIVas5ZfpGuKnlcGS7TBGv85bZrK-vpDyBxPb3fGyBru6OEe3zDieU178VSqLElvlU1XdH7xbGnrhlEOfkgZg",
    badge: "Arena Level",
    tags: ["Line-Array Ready", "Electric Dynamic", "Stadium Crowd Rousing"],
    features: [
      "Arena-level brass and heavy percussion ensemble",
      "Crowd participation medleys & high-energy drops",
      "Rider compliant with concert tour specifications",
      "Unmatched youth engagement with Sufi-rock and anthemic pop"
    ],
    duration: "90 to 120 Minutes",
    estimatedPricing: "Request a Quote",
    category: "festival",
    isPublished: true,
    seo: {
      metaTitle: "College Fests & Festivals Live Band | The Royal Band",
      metaDescription: "Electric brass and live rock-sufi fusion headliner for college fests and music festivals.",
      slug: "college-fests-festivals",
      canonicalUrl: "https://theroyalband.com/events/college-fests-festivals",
      ogTitle: "College Fests & Festivals Live Band | The Royal Band",
      ogDescription: "Arena level headliners with high-octane brass and percussion.",
      ogImageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbWXetvsgbXU-QTvpCfN88rhT5uHcO67KlykkOr0HwrMMVW2vApJSsr4ROOt5FR29Fq_jNWfAWus8tCqc0Pyx_PxF3iO5fad3Wf6_LE8TrsuLe6fv9qA62mZDADu8PH-VAdth5FbM4FBMd1-Mxdm-4wsQ3L5trvVcg9MIVas5ZfpGuKnlcGS7TBGv85bZrK-vpDyBxPb3fGyBru6OEe3zDieU178VSqLElvlU1XdH7xbGnrhlEOfkgZg",
      twitterCard: "summary_large_image",
      isNoIndex: false,
      isNoFollow: false,
      schemaType: "Service"
    }
  },
  {
    id: "srv-06",
    name: "Destination Weddings",
    tagline: "Turnkey Multi-Day Touring Across Palaces, Island Resorts & Historic Fortresses",
    description: "Flawless multi-day logistics crafted specifically for grand palace compounds, island resorts, and historic fortresses across Agra, Mathura, Lucknow, Jodhpur, and global destination hubs.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVFAz27xowA-sc7gI3gTVA81g6lr-DFQ6YkWNdYz5n0qBImxQgrXM01aPPlI5zd0S4_ic61wInZtC4ceJOmmLeOzRtNaluFwTdwle8TmApIDPUJCgCFwwWQRMuBTNC2kjUZijfY6_Iy_cjVVyIhO8BasehlbYNgN0_oVYFzaizmD4JVWqftIBgkVm64OqT4Fy-YvRfHQHXHFqiWduSOZLnE_6XcDN6doGO-OFjkSrYZNa7SZahxgRRTw",
    badge: "Global Heritage Touring",
    tags: ["Bespoke Fly-in Squad", "Local Sound Coordination", "Multi-Day Retainer"],
    features: [
      "Turnkey equipment freight & domestic/international flight handling",
      "Stationed local readiness for zero-delay backline deployment",
      "Multi-genre adaptation from welcome cocktail to late-night afterparty",
      "Palace acoustic calibration for high-altitude ramparts and courtyard reverberation"
    ],
    duration: "Multi-Day Itinerary",
    estimatedPricing: "Request a Quote",
    category: "destination",
    isPublished: true,
    seo: {
      metaTitle: "Destination Wedding Live Band & Touring Orchestra | The Royal Band",
      metaDescription: "Fly-in live symphony band for heritage fortresses and global destination celebrations in Agra, Mathura, Lucknow, Jodhpur, and beyond.",
      slug: "destination-weddings",
      canonicalUrl: "https://theroyalband.com/events/destination-weddings",
      ogTitle: "Destination Weddings Live Band | The Royal Band",
      ogDescription: "Flawless multi-day live entertainment touring for destination celebrations.",
      ogImageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVFAz27xowA-sc7gI3gTVA81g6lr-DFQ6YkWNdYz5n0qBImxQgrXM01aPPlI5zd0S4_ic61wInZtC4ceJOmmLeOzRtNaluFwTdwle8TmApIDPUJCgCFwwWQRMuBTNC2kjUZijfY6_Iy_cjVVyIhO8BasehlbYNgN0_oVYFzaizmD4JVWqftIBgkVm64OqT4Fy-YvRfHQHXHFqiWduSOZLnE_6XcDN6doGO-OFjkSrYZNa7SZahxgRRTw",
      twitterCard: "summary_large_image",
      isNoIndex: false,
      isNoFollow: false,
      schemaType: "Service"
    }
  }
];

export const initialCityHubs: CityHub[] = [
  {
    id: "city-01",
    name: "Agra",
    state: "Uttar Pradesh",
    tagline: "Taj View Palace Lawns & Heritage Celebrations",
    description: "Available for live performances across Agra's premier destination venues like ITC Mughal, The Oberoi Amarvilas, and Jaypee Palace. Full live band dispatched with complete sound and brass backline for palace weddings and corporate events.",
    residentTroupes: "Stationed Touring Troupe",
    readinessTime: "Dispatched in 2h",
    keyVenues: ["ITC Mughal", "The Oberoi Amarvilas", "Jaypee Palace", "Taj Hotel & Convention Centre"],
    specialty: "Mughal Brass Fanfare & Sangeet Crescendo",
    acousticCertification: "Heritage Lawn Calibrated",
    isStationed: true,
    seo: {
      metaTitle: "Live Band in Agra for Weddings & Corporate Events | The Royal Band",
      metaDescription: "Book The Royal Band in Agra for luxury palace weddings, ITC Mughal galas, and heritage celebrations. Available touring troupe with full live sound setup.",
      slug: "agra",
      canonicalUrl: "https://theroyalband.com/locations/agra",
      ogTitle: "The Royal Band — Agra Services",
      ogDescription: "Live symphony band for weddings and corporate events in Agra.",
      ogImageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjO6Sg-XnJ9_Udl1_IoTc366O4hALJGPK3m2ucFI6lIdy0hyeRSn6u3rm1NvSnp20xQZ9tZPaWDXQcaxN9UeJqjgXe0p1Of4HcG2Uvyz0OO5ZZBOej_bY2dOQKXZtYJNk0Wv_ELmC__loOJ1SB85TTQX0LS8AGsH2N8shOIf8jp9L4kUsbls0SJKUpCNKXSML_eUtNqJ4cX-Yu0BB8tsO_csQDAbG9R6PtWnzkocBGtqcAK-Lj4JjboQ",
      twitterCard: "summary_large_image",
      isNoIndex: false,
      isNoFollow: false,
      schemaType: "LocalBusiness"
    }
  },
  {
    id: "city-02",
    name: "Mathura",
    state: "Uttar Pradesh",
    tagline: "Spiritual Sufi & Grand Devotional Fusion",
    description: "Stationed touring musicians serving Mathura and the wider Brij heritage corridor. Specializing in spiritual Sufi, grand devotional fusion, traditional celebratory baraat symphonies, and private ceremonies.",
    residentTroupes: "Stationed Touring Troupe",
    readinessTime: "Dispatched in 1.5h",
    keyVenues: ["Brij View Heritage", "Vrindavan Clarks Inn", "Yamuna Ghat Pavilions", "Nidhivan Sarovar"],
    specialty: "Raas-Leela Symphony & Sufi Alaap",
    acousticCertification: "Temple & Open Lawn Attenuation",
    isStationed: true,
    seo: {
      metaTitle: "Live Royal Band in Mathura | Wedding & Cultural Symphony",
      metaDescription: "Sufi rock, devotional sitar symphonies, and royal celebration live band in Mathura. Touring readiness for private events and weddings.",
      slug: "mathura",
      canonicalUrl: "https://theroyalband.com/locations/mathura",
      ogTitle: "The Royal Band — Mathura Services",
      ogDescription: "Spiritual Sufi and devotional royal live band in Mathura.",
      ogImageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAvGyulCTtUTZIKI_lPblSMyoVDYMJM1UyI8y3FxN6bNCTO3kFwhHtbRS7dF9_IE4wCRVN6The8DjbQhAHeXVLWCqDzr0Timz6AqNKUWZFbJZMYqI-SAUfZNU4Z_NBG0pBSvOI6rvHufP3fMaiYujNmbIxEuQMovSOYBRCqsmktKnGncrCzQw605KpujQZkcdcug_0vSO_HaNhSASiveGPqsBhuM4jIy03n_U_4ki_UcTPuIZS62jtEJQ",
      twitterCard: "summary_large_image",
      isNoIndex: false,
      isNoFollow: false,
      schemaType: "LocalBusiness"
    }
  },
  {
    id: "city-03",
    name: "Lucknow",
    state: "Uttar Pradesh",
    tagline: "Nawabi Elegance & Contemporary Fusion",
    description: "Resident touring ensemble serving Awadh's premier destinations including Taj Mahal Lucknow and The Centrum. Bringing classical Nawabi elegance and contemporary high-energy live band fusion to reception concerts, corporate summits, and gala evenings.",
    residentTroupes: "Stationed Touring Troupe",
    readinessTime: "Dispatched in 2.5h",
    keyVenues: ["Taj Mahal Lucknow", "The Centrum", "Clarks Avadh", "Renaissance Lucknow"],
    specialty: "Awadhi Ghazal Orchestra & Brass Crescendo",
    acousticCertification: "Ballroom & Lawn Concert Rig",
    isStationed: true,
    seo: {
      metaTitle: "The Royal Band in Lucknow | Wedding & Corporate Event Orchestra",
      metaDescription: "Experience Awadhi royal musical heritage and live contemporary symphony in Lucknow with The Royal Band. Available for grand weddings and corporate galas.",
      slug: "lucknow",
      canonicalUrl: "https://theroyalband.com/locations/lucknow",
      ogTitle: "The Royal Band — Lucknow Services",
      ogDescription: "Nawabi elegance meets modern concert orchestration in Lucknow.",
      ogImageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDX_GiHsBACg38pLhfX-IS4KQoY04inXY893P5URjaiqXRp5FeAjBI4OcbEgc77a0T0P_2nZspydyNdnKB811Xq3iBnfSK2qaiOzr9ROU7oPgiBSkZBZqkxcZxx2viir7HuD1E-C2WOMvAoS_PXTJtS2ZfkSNBOn3t2jtGu81iSxutange6GGpjk_bmpTZo0M6SVEri34dnyF9xqK6wUKmX_NQtR0O_8RjHkYsr2KJWilRFdOZ1INXzRw",
      twitterCard: "summary_large_image",
      isNoIndex: false,
      isNoFollow: false,
      schemaType: "LocalBusiness"
    }
  },
  {
    id: "city-04",
    name: "Jodhpur",
    state: "Rajasthan",
    tagline: "Fortress & Heritage Palace Destination Galas",
    description: "Stationed desert touring troupe ready for Rajasthan's iconic palace and fortress celebrations including Umaid Bhawan Palace and Mehrangarh Fort. Calibrated for open-air ramparts and palace courtyards with rich acoustic projection.",
    residentTroupes: "Stationed Touring Troupe",
    readinessTime: "Dispatched in 2h",
    keyVenues: ["Umaid Bhawan Palace", "Mehrangarh Fort Courtyard", "Ajit Bhawan", "Taj Hari Mahal"],
    specialty: "Rampart Fanfare & Palace Sangeet Symphony",
    acousticCertification: "High-Altitude Amphitheater Rig",
    isStationed: true,
    seo: {
      metaTitle: "The Royal Band in Jodhpur | Palace & Fortress Wedding Orchestra",
      metaDescription: "Royal orchestra and live band for Umaid Bhawan and Mehrangarh Fort destination weddings in Jodhpur. Turnkey touring setup.",
      slug: "jodhpur",
      canonicalUrl: "https://theroyalband.com/locations/jodhpur",
      ogTitle: "The Royal Band — Jodhpur Services",
      ogDescription: "Fortress & heritage palace destination galas live band in Jodhpur.",
      ogImageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVFAz27xowA-sc7gI3gTVA81g6lr-DFQ6YkWNdYz5n0qBImxQgrXM01aPPlI5zd0S4_ic61wInZtC4ceJOmmLeOzRtNaluFwTdwle8TmApIDPUJCgCFwwWQRMuBTNC2kjUZijfY6_Iy_cjVVyIhO8BasehlbYNgN0_oVYFzaizmD4JVWqftIBgkVm64OqT4Fy-YvRfHQHXHFqiWduSOZLnE_6XcDN6doGO-OFjkSrYZNa7SZahxgRRTw",
      twitterCard: "summary_large_image",
      isNoIndex: false,
      isNoFollow: false,
      schemaType: "LocalBusiness"
    }
  }
];

export const initialPackages: PackageTier[] = [
  {
    id: "pkg-1h",
    name: "1-Hour Performance",
    subtitle: "Curated Set for Welcome Cocktails, High-Tea, or Bridal Walks",
    tierLabel: "Hourly Package",
    durationLabel: "1 Hour",
    description: "A focused, high-impact musical set designed for welcome arrivals, cocktail receptions, sunset high-tea, or dramatic bridal walks.",
    idealFor: "Welcome Cocktails, Bridal Walks & High-Tea (25-200 Guests)",
    inclusions: [
      "Virtuoso Strings & Brass Ensemble",
      "Customized 12-Track Curated Setlist",
      "Acoustic Sound Calibration & Sound Engineer",
      "Traditional Royal Uniform Presentation"
    ],
    highlightBadge: "Curated Hour",
    priceEstimate: "Request a Quote",
    category: "hourly",
    isEnabled: true
  },
  {
    id: "pkg-2h",
    name: "2-Hour Performance",
    subtitle: "The Gold Standard for Sangeet Galas & Baraat Fanfares",
    tierLabel: "Hourly Package",
    durationLabel: "2 Hours",
    description: "Our most requested live format. Delivers continuous energy for full Baraat processions or an electrifying 2-hour Sangeet concert.",
    idealFor: "Grand Baraats, Sangeet Celebrations & Corporate Galas (100-800 Guests)",
    inclusions: [
      "Full Horn Section, Percussionists & Dual Lead Vocalists",
      "Professional Royal MC / Bilingual Stage Anchor",
      "Custom Royal Uniforms (Cream & Gold Brocade)",
      "Dual Wireless IEM Stage Monitoring Rig",
      "Customized Couple First-Dance Composition"
    ],
    highlightBadge: "Most Popular",
    isRecommended: true,
    priceEstimate: "Request a Quote",
    category: "hourly",
    isEnabled: true
  },
  {
    id: "pkg-full-evening",
    name: "Full-Evening Performance",
    subtitle: "Turnkey Continuous Soundscape from Sunset to Midnight",
    tierLabel: "Set-Based Package",
    durationLabel: "Full Evening",
    description: "Complete evening musical curation: serene acoustic welcome melodies transitioning gracefully into high-octane symphony and late-night party peaks.",
    idealFor: "Destination Palace Weddings, Multi-Stage Galas & Large Festivals (300-2000+ Guests)",
    inclusions: [
      "16-Piece Grand Symphony & Rhythm Section",
      "Multi-Segment Musical Pacing (Welcome to Climax)",
      "Concert-Grade Stage Audio Calibration",
      "Dedicated VIP Artist Liaison & Stage Director",
      "Custom Extended Repertoire across Classical, Sufi & Bollywood"
    ],
    highlightBadge: "Pinnacle Gala",
    priceEstimate: "Request a Quote",
    category: "hourly",
    isEnabled: true
  },
  {
    id: "pkg-combo-dj",
    name: "Live Band + DJ Setup",
    subtitle: "Live Symphony Orchestra Seamlessly Fused with Late-Night DJ",
    tierLabel: "Combo Package",
    durationLabel: "Live Band + DJ",
    description: "The ultimate non-stop celebration setup. Experience the grandeur of our live royal band followed by an explosive seamless handover to a synchronized DJ party with live percussion.",
    idealFor: "Luxury Afterparties, Sangeet Dance Floors & High-Energy Receptions",
    inclusions: [
      "Full Live Royal Band + Resident Event DJ Setup",
      "Zero-Silence Seamless Stage Handover",
      "Synchronized Moving Stage Lighting & Subwoofers",
      "Hybrid Jam Sessions (Live Saxophone & Percussion with DJ)"
    ],
    highlightBadge: "Band + DJ Combo",
    priceEstimate: "Request a Quote",
    category: "combo",
    isOptionalCombo: true,
    isEnabled: true
  }
];

export const initialCinemaReels: CinemaReel[] = [
  {
    id: "reel-01",
    title: "Grand Sangeet Night 10-Piece Symphony",
    venue: "Taj Lake Palace",
    duration: "04:12",
    coverImageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDod9y_lu7tL7ERkSJMgI0CTbrlNDZkoPf7hndGzbZxXdJuGkEtF4l1vrRpIUzFEvur_Wk--CEowETO0_0S00BDs8fLUoXZgIOiTgrMhk_2JnUkMIE0ifVVc67XDWP8tjRnINhvnzMdRZubczjWM2MpDaQ-BkT9qIhUH0xD2QbLQzGjo63LLirAfztCuCvjGDQ9-DR6Ea7NPwIHvkVa55ufXr_wVBXjOISDXRUQCxcEglSzEMZbJg9JIQ",
    likesCount: 1248,
    isLiked: true
  },
  {
    id: "reel-02",
    title: "Sufi Rock & Mystic Qawwali Fusion",
    venue: "Umaid Bhawan",
    duration: "05:40",
    coverImageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAvGyulCTtUTZIKI_lPblSMyoVDYMJM1UyI8y3FxN6bNCTO3kFwhHtbRS7dF9_IE4wCRVN6The8DjbQhAHeXVLWCqDzr0Timz6AqNKUWZFbJZMYqI-SAUfZNU4Z_NBG0pBSvOI6rvHufP3fMaiYujNmbIxEuQMovSOYBRCqsmktKnGncrCzQw605KpujQZkcdcug_0vSO_HaNhSASiveGPqsBhuM4jIy03n_U_4ki_UcTPuIZS62jtEJQ",
    likesCount: 894,
    isLiked: false
  },
  {
    id: "reel-03",
    title: "Sunset Jazz & Velvet Soul Ensemble",
    venue: "Jaipur Rambagh",
    duration: "03:15",
    coverImageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuD8eVoV10zFbyvW0yyKPIla3cV2cFLfn2g_hotZM05wvAvUVvY0d-B9_S1d6nWbfOo2lUZ1GHwl3_9sSheGMtcCVnnyzVXjUtVZAmj5od5y-phLcMf1ykJ5GzN0ASv3YTfBudA-EpqaX62yxSoXp8rulD-K3rDehePC1kfCNuD2MRMZXSe03b38L6smHCWiXQETnGuw_D-GhOwSlK9MclbgacIBpSKnZDBdLTW_6Muq-XMXWAv5Z2ST-Q",
    likesCount: 651,
    isLiked: false
  },
  {
    id: "reel-04",
    title: "Royal Baraat Brass & Dhol Fanfare",
    venue: "Falaknuma Palace",
    duration: "02:45",
    coverImageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbWXetvsgbXU-QTvpCfN88rhT5uHcO67KlykkOr0HwrMMVW2vApJSsr4ROOt5FR29Fq_jNWfAWus8tCqc0Pyx_PxF3iO5fad3Wf6_LE8TrsuLe6fv9qA62mZDADu8PH-VAdth5FbM4FBMd1-Mxdm-4wsQ3L5trvVcg9MIVas5ZfpGuKnlcGS7TBGv85bZrK-vpDyBxPb3fGyBru6OEe3zDieU178VSqLElvlU1XdH7xbGnrhlEOfkgZg",
    likesCount: 1520,
    isLiked: false
  }
];

export const initialAudioTracks: AudioTrack[] = [
  {
    id: "trk-01",
    title: "Kesariya & Mast Qalandar (Royal Live Fusion)",
    artist: "12-Piece Royal Orchestra • Live Soundboard Mix",
    duration: "05:32",
    category: "sufi",
    venueSnippet: "Udaipur Lake Palace • Prime Auspicious Evening",
    tags: ["Sufi", "Fusion", "Live Brass"]
  },
  {
    id: "trk-02",
    title: "Chaudhary (Folk-Fusion Live)",
    artist: "Kartal • Acoustic Guitar • Alaap",
    duration: "03:48",
    category: "fusion",
    venueSnippet: "Jaipur Rambagh Courtyard",
    tags: ["Folk", "Desert Strings", "Sitar"]
  },
  {
    id: "trk-03",
    title: "Kun Faya Kun (Symphonic Tribute)",
    artist: "Grand Strings Choir • Sufi Solo",
    duration: "06:12",
    category: "sufi",
    venueSnippet: "Mehrangarh Fort Amphitheater",
    tags: ["Sufi", "Strings", "Emotional"]
  },
  {
    id: "trk-04",
    title: "Can't Take My Eyes Off You (Jazz Swing)",
    artist: "Upright Bass • Brass Quintet",
    duration: "03:30",
    category: "jazz",
    venueSnippet: "Falaknuma Terrace Dinner",
    tags: ["Jazz", "Retro", "Cocktails"]
  },
  {
    id: "trk-05",
    title: "Jashn-e-Bahara (Violin & Flute Duet)",
    artist: "Classical Bansuri • Acoustic Grand",
    duration: "04:45",
    category: "bollywood",
    venueSnippet: "ITC Mughal Taj Lawn",
    tags: ["Bollywood", "Phere", "Violin"]
  },
  {
    id: "trk-06",
    title: "Mast Magan & Gallan Goodiyaan Medley",
    artist: "High-Octane Dhol & Horn Section",
    duration: "04:15",
    category: "bollywood",
    venueSnippet: "Umaid Bhawan Sangeet Ballroom",
    tags: ["Bollywood", "Dance Floor", "Brass"]
  }
];

export const initialTestimonials: Testimonial[] = [
  {
    id: "tst-01",
    clientName: "Maharaja H. Singh",
    designation: "Verified Royal Host",
    venue: "Jodhpur Fort Celebration",
    eventDate: "Dec 2024",
    quote: "Unmatched live energy, soaring acoustic purity, and impeccable royal decorum throughout our three-day celebration.",
    rating: 5,
    avatarLetter: "M",
    isApproved: true,
    isFeatured: true
  },
  {
    id: "tst-02",
    clientName: "Dev & Radhika Singhania",
    designation: "Royal Wedding Celebrations",
    venue: "Umaid Bhawan Palace, Jodhpur",
    eventDate: "Winter 2024",
    quote: "The Royal Band turned our Umaid Bhawan wedding into an ethereal musical spectacle. Guests are still talking about the 10-piece Sufi crescendo.",
    rating: 5,
    avatarLetter: "DS",
    isApproved: true,
    isFeatured: true
  },
  {
    id: "tst-03",
    clientName: "Ananya & Rohan Kothari",
    designation: "Destination Gala",
    venue: "Taj Lake Palace, Udaipur",
    eventDate: "Nov 2024",
    quote: "Their punctuality, bespoke overture compositions, and direct coordination with Vikramaditya Rathore made this completely stress-free.",
    rating: 5,
    avatarLetter: "AK",
    isApproved: true,
    isFeatured: true
  }
];

export const initialLeads: LeadInquiry[] = [
  {
    id: "lead-101",
    fullName: "Maharaja Vikramaditya Singhania",
    title: "Mr.",
    phone: "98765 43210",
    email: "concierge@singhaniaestate.com",
    occasionType: "Royal Wedding / Sangeet",
    eventDate: "2025-11-28",
    timingSlot: "Cocktail Evening (6 PM - 10 PM)",
    city: "Jaipur",
    ensemblePackage: "The Royal Grandeur (Tier II)",
    curatedAddons: [
      "Concert Acoustic & Ambient Lighting Package",
      "Professional Royal MC / Bilingual Host"
    ],
    guestCount: 450,
    specialRequests: "Please arrange an energetic brass entry fanfare for the Baraat, followed by romantic Bollywood classics for the dinner reception.",
    status: "quoted",
    quoteAmount: "₹8,50,000",
    notes: "Direct booking consultation conducted with Vikramaditya Rathore. Retainer contract generated.",
    createdAt: "2026-10-06 14:30",
    updatedAt: "2026-10-07 10:15"
  },
  {
    id: "lead-102",
    fullName: "Karan Johar Oberoi",
    title: "Mr.",
    phone: "99887 76655",
    email: "events@oberoigroup.com",
    occasionType: "Corporate Gala",
    eventDate: "2025-12-15",
    timingSlot: "Full Night Celebration",
    city: "Agra",
    ensemblePackage: "The Imperial All-Night Symphony (Tier III)",
    curatedAddons: ["Concert Acoustic & Ambient Lighting Package"],
    guestCount: 800,
    specialRequests: "Annual executive awards summit with walk-in stings and cinematic overtures.",
    status: "new",
    createdAt: "2026-10-08 09:20",
    updatedAt: "2026-10-08 09:20"
  },
  {
    id: "lead-103",
    fullName: "Dr. Alistair & Natasha Mehta",
    title: "Dr.",
    phone: "91234 56789",
    email: "natasha@mehtafoundation.org",
    occasionType: "Private Anniversary",
    eventDate: "2026-01-20",
    timingSlot: "Daytime Ceremony",
    city: "Lucknow",
    ensemblePackage: "The Crown Quintet (Tier I)",
    curatedAddons: ["Customized Royal First-Dance Composition"],
    guestCount: 120,
    specialRequests: "Acoustic ghazal and jazz fusion for 25th wedding anniversary.",
    status: "deposit_paid",
    quoteAmount: "₹3,50,000",
    notes: "Advance deposit of ₹1,00,000 received. Date locked.",
    createdAt: "2026-09-28 16:45",
    updatedAt: "2026-10-02 11:00"
  }
];

export const initialBlogCategories: BlogCategory[] = [
  { id: 'cat-01', name: 'Wedding Traditions', slug: 'wedding-traditions', description: 'Insights on grand Indian wedding ceremonies, Baraat fanfare, and Phere hymns.' },
  { id: 'cat-02', name: 'Sound Production', slug: 'sound-production', description: 'Technical acoustic engineering, palace line-array rigs, and stage monitoring.' },
  { id: 'cat-03', name: 'Bridal Curation', slug: 'bridal-curation', description: 'Curating custom overtures and emotional walk-in strings for brides.' },
  { id: 'cat-04', name: 'Destination Guides', slug: 'destination-guides', description: 'Touring logistics across Udaipur, Jodhpur, Jaipur, and international palaces.' },
  { id: 'cat-05', name: 'Celebrity Galas', slug: 'celebrity-galas', description: 'Behind the scenes at executive summits and high-society receptions.' }
];

export const initialBlogPosts: BlogPost[] = [
  {
    id: "blog-01",
    title: "The Art of Royal Baraats: Orchestrating a 16-Piece Brass Symphony",
    slug: "art-of-royal-baraats-brass-symphony",
    summary: "How precision arrangement, roving wireless rigs, and traditional fanfare create unforgettable royal wedding entries.",
    content: `<h2>The Sovereign March of the Royal Groom</h2>
<p>When organizing a luxury palace Baraat, the acoustic energy must command the courtyard without causing audio distortion. Traditional street processions often suffer from harsh frequencies and unbalanced brass sections. At <strong>The Royal Band</strong>, we approach the Baraat as a full symphonic overture.</p>

<h3>1. Dynamic Multi-Horn Coordination</h3>
<p>Our 16-piece formation pairs euphoniums, French horns, and dual trumpets with resonant marching bass drums. Every crescendo is dynamically arranged to blend traditional folk rhythms with regal cinematic fanfare.</p>
<blockquote>“A grand entrance should feel like a royal coronation—every brass note calibrated to resonate off historic palace sandstone.”</blockquote>

<h3>2. Line-Array Wireless Staging</h3>
<p>To ensure that elderly dignitaries and guests at the rear of the procession enjoy the same acoustic clarity as those at the front, we deploy synchronized wireless relay sound towers mounted on discreet gilded chariots.</p>

<h3>3. Repertoire Curation</h3>
<p>We seamlessly transition from auspicious shehnai melodies into energetic brass renditions of Punjabi classics and contemporary Bollywood anthems, culminating in an electrifying arrival at the Toran gate.</p>`,
    coverImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCddgIHrqFDssqCfud3_WvkQVIJut7OHepo7JZKpx03tYogGK5lmKIWdpchElaMr2SttOOOia2n4NFjNxhuVTR_ir0WscCh8xxjIzvdhpdXFwpDdwb77svmIhiSgwaxhmGgJC24IW4WUBuMAIn2VdmYCuk346YTCO529mSPAUHOgVGV265u4wV0Up4zkmVhWLzveBbEHFUF3Ae5TQxu_nSa7vaNwaYfv6OHamncjaV7hgiL134ssxAitQ",
    coverImageAlt: "A grand orchestral royal baraat brass band playing under palace chandeliers",
    category: "Wedding Traditions",
    authorName: "Vikramaditya Rathore",
    publishedAt: "2025-08-15",
    status: "published",
    readingTimeMinutes: 5,
    tags: ["Baraat", "Brass Symphony", "Royal Wedding", "Palace Acoustics"],
    focusKeyword: "royal baraat brass symphony",
    viewsCount: 2450,
    seo: {
      metaTitle: "The Art of Royal Baraats: 16-Piece Brass Symphony | The Royal Band",
      metaDescription: "Guide to planning unforgettable luxury Indian wedding baraats with live brass orchestra, synchronized wireless audio, and royal percussion.",
      slug: "art-of-royal-baraats-brass-symphony",
      canonicalUrl: "https://theroyalband.com/blog/art-of-royal-baraats-brass-symphony",
      ogTitle: "The Art of Royal Baraats: Orchestrating a 16-Piece Brass Symphony",
      ogDescription: "Precision arrangement for luxury royal wedding processions.",
      ogImageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCddgIHrqFDssqCfud3_WvkQVIJut7OHepo7JZKpx03tYogGK5lmKIWdpchElaMr2SttOOOia2n4NFjNxhuVTR_ir0WscCh8xxjIzvdhpdXFwpDdwb77svmIhiSgwaxhmGgJC24IW4WUBuMAIn2VdmYCuk346YTCO529mSPAUHOgVGV265u4wV0Up4zkmVhWLzveBbEHFUF3Ae5TQxu_nSa7vaNwaYfv6OHamncjaV7hgiL134ssxAitQ",
      twitterCard: "summary_large_image",
      isNoIndex: false,
      isNoFollow: false,
      schemaType: "Article"
    }
  },
  {
    id: "blog-02",
    title: "Acoustic Engineering in Ancient Forts & Palatial Courtyards",
    slug: "acoustic-engineering-palace-courtyards",
    summary: "Overcoming reverb and stone surface reflections at Umaid Bhawan and Mehrangarh with customized line-array calibrations.",
    content: `<h2>Taming the Echoes of Royal Stone</h2>
<p>Historic palace masonry presents unique acoustic reflections. While modern ballrooms feature acoustic baffling and carpeted dampening, open-air courtyards surrounded by centuries-old marble and sandstone create severe flutter echoes.</p>

<h3>Point-Source vs. Distributed Line Arrays</h3>
<p>Blasting loud audio from a single stage point produces deafening distortion near the front while leaving distant tables struggling to hear speech. Our sound directors utilize distributed Meyer Sound column arrays time-aligned with millisecond precision.</p>

<h3>In-Ear Monitoring for Live Ensembles</h3>
<p>To eliminate stage bleed, every string player and brass soloist wears custom-molded wireless IEMs, keeping the acoustic stage completely silent except for the natural acoustic tone of the instruments.</p>`,
    coverImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVFAz27xowA-sc7gI3gTVA81g6lr-DFQ6YkWNdYz5n0qBImxQgrXM01aPPlI5zd0S4_ic61wInZtC4ceJOmmLeOzRtNaluFwTdwle8TmApIDPUJCgCFwwWQRMuBTNC2kjUZijfY6_Iy_cjVVyIhO8BasehlbYNgN0_oVYFzaizmD4JVWqftIBgkVm64OqT4Fy-YvRfHQHXHFqiWduSOZLnE_6XcDN6doGO-OFjkSrYZNa7SZahxgRRTw",
    coverImageAlt: "Nighttime illuminated palace fortress courtyard with live acoustic stage setup",
    category: "Sound Production",
    authorName: "Vikramaditya Rathore",
    publishedAt: "2025-09-02",
    status: "published",
    readingTimeMinutes: 4,
    tags: ["Acoustics", "Forts", "Line Array", "Heritage Venues"],
    focusKeyword: "palace courtyard acoustic engineering",
    viewsCount: 1890,
    seo: {
      metaTitle: "Acoustic Engineering in Ancient Forts & Palaces | The Royal Band",
      metaDescription: "Technical insights into staging high-fidelity live symphony orchestras in historical heritage palaces and open courtyards.",
      slug: "acoustic-engineering-palace-courtyards",
      canonicalUrl: "https://theroyalband.com/blog/acoustic-engineering-palace-courtyards",
      ogTitle: "Acoustic Engineering in Ancient Forts & Palatial Courtyards",
      ogDescription: "Sound engineering secrets for heritage palace celebrations.",
      ogImageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVFAz27xowA-sc7gI3gTVA81g6lr-DFQ6YkWNdYz5n0qBImxQgrXM01aPPlI5zd0S4_ic61wInZtC4ceJOmmLeOzRtNaluFwTdwle8TmApIDPUJCgCFwwWQRMuBTNC2kjUZijfY6_Iy_cjVVyIhO8BasehlbYNgN0_oVYFzaizmD4JVWqftIBgkVm64OqT4Fy-YvRfHQHXHFqiWduSOZLnE_6XcDN6doGO-OFjkSrYZNa7SZahxgRRTw",
      twitterCard: "summary_large_image",
      isNoIndex: false,
      isNoFollow: false,
      schemaType: "Article"
    }
  },
  {
    id: "blog-03",
    title: "Scheduled Release: The 2026 Sovereign Wedding Music Trend Forecast",
    slug: "2026-wedding-music-trend-forecast",
    summary: "Upcoming musical curation shifts: Why intimate acoustic string quintets and live DJ hybrid sets are dominating palace Sangeet itineraries.",
    content: `<h2>The Renaissance of Orchestral Grandeur</h2>
<p>As couples seek deeper authenticity, 2026 will see a major departure from pre-recorded DJ backing tracks in favor of live virtuosic performers who can read the energy of the royal ballroom in real time.</p>
<h3>Key Forecast Highlights:</h3>
<ul>
  <li><strong>Live Symphony Overtures for Bridal Entrances:</strong> Bespoke string arrangements commissioned exclusively for the couple.</li>
  <li><strong>Midnight Brass Transitions:</strong> Transitioning seamlessly from classical dinner jazz into high-energy live saxophone and DJ hybrids.</li>
  <li><strong>Sacred Vedic Phere Chants with Sitar & Flute:</strong> Meditative and serene acoustic accompaniment for holy mantras.</li>
</ul>`,
    coverImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuD8eVoV10zFbyvW0yyKPIla3cV2cFLfn2g_hotZM05wvAvUVvY0d-B9_S1d6nWbfOo2lUZ1GHwl3_9sSheGMtcCVnnyzVXjUtVZAmj5od5y-phLcMf1ykJ5GzN0ASv3YTfBudA-EpqaX62yxSoXp8rulD-K3rDehePC1kfCNuD2MRMZXSe03b38L6smHCWiXQETnGuw_D-GhOwSlK9MclbgacIBpSKnZDBdLTW_6Muq-XMXWAv5Z2ST-Q",
    coverImageAlt: "Saxophonist playing live in royal evening jacket beside marble palace pool",
    category: "Bridal Curation",
    authorName: "Sunita Verma",
    publishedAt: "2026-10-15",
    status: "scheduled",
    scheduledPublishDate: "2026-10-15",
    scheduledPublishTime: "09:00 AM",
    readingTimeMinutes: 6,
    tags: ["2026 Trends", "Bridal Music", "Sangeet", "Live DJ Hybrid"],
    focusKeyword: "2026 wedding music trends",
    viewsCount: 0,
    seo: {
      metaTitle: "2026 Royal Wedding Music Trends & Repertoire Forecast | The Royal Band",
      metaDescription: "Exclusive trend forecast for luxury destination wedding music, live symphony orchestras, and midnight Sangeet crescendos.",
      slug: "2026-wedding-music-trend-forecast",
      canonicalUrl: "https://theroyalband.com/blog/2026-wedding-music-trend-forecast",
      ogTitle: "2026 Royal Wedding Music Trends Forecast",
      ogDescription: "The shift towards live orchestral mastery for palace celebrations.",
      ogImageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuD8eVoV10zFbyvW0yyKPIla3cV2cFLfn2g_hotZM05wvAvUVvY0d-B9_S1d6nWbfOo2lUZ1GHwl3_9sSheGMtcCVnnyzVXjUtVZAmj5od5y-phLcMf1ykJ5GzN0ASv3YTfBudA-EpqaX62yxSoXp8rulD-K3rDehePC1kfCNuD2MRMZXSe03b38L6smHCWiXQETnGuw_D-GhOwSlK9MclbgacIBpSKnZDBdLTW_6Muq-XMXWAv5Z2ST-Q",
      twitterCard: "summary_large_image",
      isNoIndex: false,
      isNoFollow: false,
      schemaType: "Article"
    }
  }
];

export const initialPages: Page[] = [
  {
    id: "page-home",
    title: "Explore Sovereign Stage (Home)",
    slug: "explore",
    status: "published",
    updatedAt: "2026-10-08 12:00",
    createdAt: "2024-01-01",
    seo: {
      metaTitle: "The Royal Band - Luxury Orchestral & VIP Live Music",
      metaDescription: "Exclusive live symphony orchestra and royal band for palace celebrations, luxury destination weddings, and VIP galas worldwide.",
      slug: "explore",
      canonicalUrl: "https://theroyalband.com/",
      ogTitle: "The Royal Band - Symphonies of Grandeur",
      ogDescription: "Unrivaled live performance for weddings and grand palace galas.",
      ogImageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCddgIHrqFDssqCfud3_WvkQVIJut7OHepo7JZKpx03tYogGK5lmKIWdpchElaMr2SttOOOia2n4NFjNxhuVTR_ir0WscCh8xxjIzvdhpdXFwpDdwb77svmIhiSgwaxhmGgJC24IW4WUBuMAIn2VdmYCuk346YTCO529mSPAUHOgVGV265u4wV0Up4zkmVhWLzveBbEHFUF3Ae5TQxu_nSa7vaNwaYfv6OHamncjaV7hgiL134ssxAitQ",
      twitterCard: "summary_large_image",
      isNoIndex: false,
      isNoFollow: false,
      schemaType: "MusicGroup"
    },
    sections: [
      {
        id: "sec-hero",
        name: "Cinematic Hero Stage",
        order: 1,
        blocks: [
          {
            id: "blk-hero-01",
            type: "hero",
            badge: "The Sovereign Stage • Est. 2012",
            title: "Symphonies of Grandeur. Unrivaled Live Performance.",
            subtitle: "Crafting unforgettable musical memories for royal weddings, grand palace galas, and destination celebrations worldwide.",
            ctaText: "Check Date Availability",
            ctaLink: "#quick-availability",
            imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCddgIHrqFDssqCfud3_WvkQVIJut7OHepo7JZKpx03tYogGK5lmKIWdpchElaMr2SttOOOia2n4NFjNxhuVTR_ir0WscCh8xxjIzvdhpdXFwpDdwb77svmIhiSgwaxhmGgJC24IW4WUBuMAIn2VdmYCuk346YTCO529mSPAUHOgVGV265u4wV0Up4zkmVhWLzveBbEHFUF3Ae5TQxu_nSa7vaNwaYfv6OHamncjaV7hgiL134ssxAitQ",
            isVisible: true,
            order: 1
          }
        ]
      },
      {
        id: "sec-metrics",
        name: "The Royal Standard Metrics",
        order: 2,
        blocks: [
          {
            id: "blk-metrics-01",
            type: "metrics",
            title: "The Royal Standard",
            badge: "Unrivaled Benchmark",
            isVisible: true,
            order: 1
          }
        ]
      },
      {
        id: "sec-lineups",
        name: "Curated Lineups Showcase",
        order: 3,
        blocks: [
          {
            id: "blk-lineups-01",
            type: "lineups",
            title: "Curated Lineups",
            badge: "Master Ensembles",
            isVisible: true,
            order: 1
          }
        ]
      }
    ],
    revisions: [
      {
        id: "rev-01",
        pageId: "page-home",
        version: 1,
        sections: [],
        seo: {
          metaTitle: "The Royal Band - Luxury Orchestral & VIP Live Music",
          metaDescription: "Initial homepage version",
          slug: "explore",
          canonicalUrl: "https://theroyalband.com/",
          ogTitle: "The Royal Band",
          ogDescription: "Unrivaled Live Music",
          ogImageUrl: "",
          twitterCard: "summary_large_image",
          isNoIndex: false,
          isNoFollow: false,
          schemaType: "MusicGroup"
        },
        authorId: "usr-01",
        authorName: "Vikramaditya Rathore",
        createdAt: "2024-01-01 10:00",
        changeSummary: "Initial site publication"
      }
    ]
  },
  {
    id: "page-services",
    title: "Services & City Hubs",
    slug: "services-cities",
    status: "published",
    updatedAt: "2026-10-07 14:10",
    createdAt: "2024-01-05",
    seo: {
      metaTitle: "Curated Splendor & City Hubs | The Royal Band",
      metaDescription: "Explore our signature occasions, curated packages, and stationed city hubs in Agra, Mathura, Lucknow, and Jodhpur.",
      slug: "services-cities",
      canonicalUrl: "https://theroyalband.com/services-cities",
      ogTitle: "Curated Splendor & City Hubs",
      ogDescription: "Signature occasions and managed city hubs across India.",
      ogImageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjO6Sg-XnJ9_Udl1_IoTc366O4hALJGPK3m2ucFI6lIdy0hyeRSn6u3rm1NvSnp20xQZ9tZPaWDXQcaxN9UeJqjgXe0p1Of4HcG2Uvyz0OO5ZZBOej_bY2dOQKXZtYJNk0Wv_ELmC__loOJ1SB85TTQX0LS8AGsH2N8shOIf8jp9L4kUsbls0SJKUpCNKXSML_eUtNqJ4cX-Yu0BB8tsO_csQDAbG9R6PtWnzkocBGtqcAK-Lj4JjboQ",
      twitterCard: "summary_large_image",
      isNoIndex: false,
      isNoFollow: false,
      schemaType: "Service"
    },
    sections: [],
    revisions: []
  },
  {
    id: "page-booking",
    title: "Secure Your Date (Book Date)",
    slug: "book-date",
    status: "published",
    updatedAt: "2026-10-08 09:30",
    createdAt: "2024-01-10",
    seo: {
      metaTitle: "VIP Concierge Booking & Date Hold | The Royal Band",
      metaDescription: "Direct reservation and calendar availability check with royal orchestra maestros for palace celebrations and galas.",
      slug: "book-date",
      canonicalUrl: "https://theroyalband.com/book-date",
      ogTitle: "Secure Your Date - The Royal Band",
      ogDescription: "Direct reservation with royal orchestra maestros.",
      ogImageUrl: "https://lh3.googleusercontent.com/aida/AEtjO1WfvzmXyCiU23TH1ZkXQzwMvELf9ZV9npFOl1EcrUii7biCSQIgojMHfla4Fv1u8I_NMZCxuNsZ1akJmCwvPgUfI_5J3fjSxA2hAEuM0eezxSgojS7z67DK8r5LBxP9I2njKiRy_E_jay9iwYJhDRtVLhxzYDIMiMqqaqbYkuO3hW7JXxwVcaAeSwVuf9dlPQHCffyv4evC_UCgVzNSa5VtkclAxhhRq9aw8OW42PTr7poACZqc_092w1o",
      twitterCard: "summary_large_image",
      isNoIndex: false,
      isNoFollow: false,
      schemaType: "LocalBusiness"
    },
    sections: [],
    revisions: []
  },
  {
    id: "page-reels",
    title: "The Performance Vault (Audio & Reels)",
    slug: "audio-reels",
    status: "published",
    updatedAt: "2026-10-07 18:20",
    createdAt: "2024-01-15",
    seo: {
      metaTitle: "Performance Vault & Cinema Reels | The Royal Band",
      metaDescription: "Archival 4K HDR live recordings, lossless audio soundboard feeds, and 150+ song setlist repertoire.",
      slug: "audio-reels",
      canonicalUrl: "https://theroyalband.com/audio-reels",
      ogTitle: "The Performance Vault - The Royal Band",
      ogDescription: "Archival 4K HDR recordings and live master audio feeds.",
      ogImageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDod9y_lu7tL7ERkSJMgI0CTbrlNDZkoPf7hndGzbZxXdJuGkEtF4l1vrRpIUzFEvur_Wk--CEowETO0_0S00BDs8fLUoXZgIOiTgrMhk_2JnUkMIE0ifVVc67XDWP8tjRnINhvnzMdRZubczjWM2MpDaQ-BkT9qIhUH0xD2QbLQzGjo63LLirAfztCuCvjGDQ9-DR6Ea7NPwIHvkVa55ufXr_wVBXjOISDXRUQCxcEglSzEMZbJg9JIQ",
      twitterCard: "summary_large_image",
      isNoIndex: false,
      isNoFollow: false,
      schemaType: "MusicGroup"
    },
    sections: [],
    revisions: []
  },
  {
    id: "page-blog",
    title: "Editorial & Blog Chronicle",
    slug: "blog",
    status: "published",
    updatedAt: "2026-10-08 10:00",
    createdAt: "2024-02-01",
    seo: {
      metaTitle: "The Sovereign Chronicle: Royal Wedding Music & Acoustic Notes",
      metaDescription: "Authoritative guides on luxury palace acoustics, 16-piece baraat brass arrangements, sacred wedding overtures, and sound engineering.",
      slug: "blog",
      canonicalUrl: "https://theroyalband.com/blog",
      ogTitle: "The Sovereign Chronicle - The Royal Band Editorial",
      ogDescription: "Acoustic architecture, baraat fanfares, and palace celebration insights.",
      ogImageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCddgIHrqFDssqCfud3_WvkQVIJut7OHepo7JZKpx03tYogGK5lmKIWdpchElaMr2SttOOOia2n4NFjNxhuVTR_ir0WscCh8xxjIzvdhpdXFwpDdwb77svmIhiSgwaxhmGgJC24IW4WUBuMAIn2VdmYCuk346YTCO529mSPAUHOgVGV265u4wV0Up4zkmVhWLzveBbEHFUF3Ae5TQxu_nSa7vaNwaYfv6OHamncjaV7hgiL134ssxAitQ",
      twitterCard: "summary_large_image",
      isNoIndex: false,
      isNoFollow: false,
      schemaType: "Article"
    },
    sections: [],
    revisions: []
  },
  {
    id: "page-gallery",
    title: "Performance Gallery & Media Archive",
    slug: "gallery",
    status: "published",
    updatedAt: "2026-10-08 10:15",
    createdAt: "2024-02-10",
    seo: {
      metaTitle: "Performance Gallery & Palatial Highlights | The Royal Band",
      metaDescription: "High-resolution photography and cinema reels from Umaid Bhawan, Taj Lake Palace, and luxury destination banquets worldwide.",
      slug: "gallery",
      canonicalUrl: "https://theroyalband.com/gallery",
      ogTitle: "The Royal Band Performance Gallery",
      ogDescription: "Visual archive and high-resolution palace concert highlights.",
      ogImageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCieWqe0mC1vcRsIkppBxWd423pVtnRiRg8TOqoYiC5me_mkVhRc-_0dQDTeDuhjKYWSFosxBg6gF-mktCNexUZF-2ed2e4v2La44IoIfkL9H2IKXIL0bot2QICvdu21lPD6pK3t350LI6VV0tdC_YEp3LLIruLPUEzE1CTeTRMHuOI1UfNqVoebPjfJteoJsXZpOchKJhFDfFfFmEzIFaHU4DY6Hru9SKoJCB48-P6BfYmSgLZx_xM6w",
      twitterCard: "summary_large_image",
      isNoIndex: false,
      isNoFollow: false,
      schemaType: "MusicGroup"
    },
    sections: [],
    revisions: []
  },
  {
    id: "page-vip-line",
    title: "VIP Concierge Direct Line",
    slug: "vip-line",
    status: "published",
    updatedAt: "2026-10-08 11:00",
    createdAt: "2024-03-01",
    seo: {
      metaTitle: "The Royal Band - Luxury Orchestral & VIP Live Music",
      metaDescription: "",
      slug: "vip-line",
      canonicalUrl: "https://theroyalband.com/vip-line",
      ogTitle: "VIP Concierge Direct Line",
      ogDescription: "",
      ogImageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDAsfIVnw8ptFr9B0CIPOnT9RnZETmqq_cihXQQhIwht8OLtAwV8_Wrmcx6ciWDSHWV-mzFPlllBOvrwIXUaLufrN9Mc6F7Pcqn9EQEQj6SQXbFMrl-OsaHfWmxVBmY6E3W_qL-Zn0CofVBYBGnWkFvH_Mxp22SGkqquZ4mQCAeUw5o1EtzvPUyFmVbT9Q9lBdbSZBcx_0IQ8sotHAtuew4bgJSxbg7wTfxJmv1XZkT1DTVXDSqitdUSQ",
      twitterCard: "summary_large_image",
      isNoIndex: false,
      isNoFollow: false,
      schemaType: "LocalBusiness"
    },
    sections: [],
    revisions: []
  }
];

export const initialAuditLogs: AuditLogEntry[] = [
  {
    id: "log-001",
    userId: "usr-01",
    userName: "Vikramaditya Rathore",
    action: "Page Updated",
    entityType: "Page",
    entityId: "page-home",
    details: "Published revised hero typography and updated 2025-26 Live Diary counter.",
    timestamp: "2026-10-08 11:22 AM"
  },
  {
    id: "log-002",
    userId: "usr-04",
    userName: "Rajat Deshmukh",
    action: "SEO Schema Synchronized",
    entityType: "SEO",
    entityId: "all-pages",
    details: "Generated Organization and LocalBusiness JSON-LD markup across Agra, Mathura, Lucknow, Jodhpur.",
    timestamp: "2026-10-07 03:40 PM"
  },
  {
    id: "log-003",
    userId: "usr-05",
    userName: "Priya Chauhan",
    action: "Lead Status Updated",
    entityType: "Lead",
    entityId: "lead-101",
    details: "Updated status for Maharaja Vikramaditya Singhania to 'quoted' (₹8,50,000).",
    timestamp: "2026-10-07 10:15 AM"
  }
];
