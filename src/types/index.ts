export type UserRole = 
  | 'super_admin' 
  | 'website_owner' 
  | 'content_editor' 
  | 'seo_manager' 
  | 'inquiry_manager' 
  | 'read_only';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: string;
  lastLogin?: string;
  status: 'active' | 'pending' | 'disabled';
}

export interface OwnershipTransfer {
  id: string;
  currentOwnerId: string;
  targetUserId: string;
  targetUserEmail: string;
  status: 'initiated' | 'verified_by_recipient' | 'reauthenticated' | 'completed' | 'cancelled';
  initiatedAt: string;
  completedAt?: string;
  securityHash?: string;
}

export interface WebsiteSettings {
  brandName: string;
  tagline: string;
  logoUrl: string;
  faviconUrl?: string;
  primaryColor: string;
  secondaryColor: string;
  surfaceColor: string;
  phone: string;
  whatsAppPhone: string;
  conciergeEmail: string;
  address: string;
  directorName: string;
  directorTitle: string;
  directorPhone: string;
  directorPhotoUrl: string;
  socials: {
    instagram?: string;
    youtube?: string;
    facebook?: string;
  };
  tenantId?: string;
  businessType: string;
  currency: string;
}

export interface PageBlock {
  id: string;
  type: 'hero' | 'date_check' | 'metrics' | 'lineups' | 'quote' | 'vip_concierge' | 'faq' | 'text_image' | 'gallery_grid' | 'packages_tier' | 'custom_html';
  title?: string;
  subtitle?: string;
  content?: string;
  imageUrl?: string;
  badge?: string;
  ctaText?: string;
  ctaLink?: string;
  data?: Record<string, any>;
  isVisible: boolean;
  order: number;
}

export interface PageSection {
  id: string;
  name: string;
  blocks: PageBlock[];
  order: number;
}

export interface SeoMetadata {
  metaTitle: string;
  metaDescription: string;
  slug: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImageUrl: string;
  ogType?: string;
  twitterCard: 'summary' | 'summary_large_image';
  isNoIndex: boolean;
  isNoFollow: boolean;
  schemaType: 'Organization' | 'LocalBusiness' | 'Service' | 'Article' | 'MusicGroup';
  keywords?: string[];
  focusKeyword?: string;
}

export interface RouteSeoItem {
  id: string;
  mainRouteId: 'home' | 'about' | 'service1' | 'blog' | 'service2' | 'gallery' | 'contact';
  mainRouteLabel: string;
  subPageId?: string;
  subPageLabel?: string;
  isSubPage: boolean;
  routePath: string;
  title: string;
  seo: SeoMetadata;
  categoryLabel?: string;
  imageUrl?: string;
}

export interface PageRevision {
  id: string;
  pageId: string;
  version: number;
  sections: PageSection[];
  seo: SeoMetadata;
  authorId: string;
  authorName: string;
  createdAt: string;
  changeSummary: string;
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  status: 'published' | 'draft' | 'scheduled';
  sections: PageSection[];
  seo: SeoMetadata;
  updatedAt: string;
  createdAt: string;
  revisions: PageRevision[];
}

export interface ServiceItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  imageUrl: string;
  badge?: string;
  tags: string[];
  features: string[];
  duration: string;
  estimatedPricing?: string;
  category: 'wedding' | 'corporate' | 'destination' | 'soiree' | 'festival' | 'addon';
  seo: SeoMetadata;
  isPublished: boolean;
}

export interface CityHub {
  id: string;
  name: string;
  state: string;
  tagline: string;
  description: string;
  residentTroupes: string;
  readinessTime: string;
  keyVenues: string[];
  specialty: string;
  acousticCertification: string;
  isStationed: boolean;
  seo: SeoMetadata;
}

export interface PackageTier {
  id: string;
  name: string;
  subtitle: string;
  tierLabel: string;
  durationLabel: string;
  description: string;
  inclusions: string[];
  highlightBadge?: string;
  isRecommended?: boolean;
  priceEstimate?: string;
  idealFor: string;
  category?: 'hourly' | 'combo';
  isOptionalCombo?: boolean;
  isEnabled?: boolean;
}

export interface MediaAsset {
  id: string;
  title: string;
  url: string;
  type: 'image' | 'video' | 'audio';
  altText: string;
  caption?: string;
  fileSize: string;
  dimensions?: string;
  duration?: string;
  uploadedAt: string;
}

export interface AudioTrack {
  id: string;
  title: string;
  artist: string;
  duration: string;
  category: 'all' | 'sufi' | 'bollywood' | 'retro' | 'jazz' | 'fusion';
  venueSnippet: string;
  audioUrl?: string;
  tags: string[];
}

export interface CinemaReel {
  id: string;
  title: string;
  venue: string;
  duration: string;
  coverImageUrl: string;
  videoUrl?: string;
  likesCount: number;
  isLiked?: boolean;
}

export interface LeadInquiry {
  id: string;
  fullName: string;
  title?: string;
  phone: string;
  email: string;
  occasionType: string;
  eventDate: string;
  timingSlot: string;
  city: string;
  ensemblePackage: string;
  curatedAddons: string[];
  guestCount: number;
  specialRequests?: string;
  status: 'new' | 'under_review' | 'quoted' | 'deposit_paid' | 'confirmed' | 'archived';
  notes?: string;
  createdAt: string;
  updatedAt: string;
  quoteAmount?: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  designation: string;
  venue: string;
  eventDate: string;
  quote: string;
  rating: number;
  avatarLetter: string;
  isApproved: boolean;
  isFeatured: boolean;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  coverImage: string;
  coverImageAlt?: string;
  category: string;
  authorName: string;
  publishedAt: string;
  status: 'published' | 'draft' | 'scheduled';
  scheduledPublishDate?: string;
  scheduledPublishTime?: string;
  readingTimeMinutes?: number;
  tags?: string[];
  focusKeyword?: string;
  viewsCount?: number;
  seo: SeoMetadata;
}

export interface AuditLogEntry {
  id: string;
  userId: string;
  userName: string;
  action: string;
  entityType: string;
  entityId?: string;
  details: string;
  timestamp: string;
  ipAddress?: string;
}
