// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type_slug: string;
  created_at: string;
  modified_at: string;
  bucket?: string;
  status?: string;
  published_at?: string;
  thumbnail?: string;
}

// Page interface
export interface Page extends CosmicObject {
  type_slug: 'pages';
  metadata: {
    page_title: string;
    hero_headline?: string;
    hero_subheadline?: string;
    hero_image?: {
      url: string;
      imgix_url: string;
    };
    content?: string;
    page_type: {
      key: string;
      value: string;
    };
    meta_description?: string;
  };
}

// Service interface
export interface Service extends CosmicObject {
  type_slug: 'services';
  metadata: {
    service_name: string;
    short_description: string;
    detailed_description: string;
    service_icon?: {
      url: string;
      imgix_url: string;
    };
    key_features?: string[];
    technologies?: string[];
    starting_price?: string;
  };
}

// Industry interface
export interface Industry extends CosmicObject {
  type_slug: 'industries';
  metadata: {
    industry_name: string;
    description: string;
    detailed_content?: string;
    industry_icon?: {
      url: string;
      imgix_url: string;
    };
    key_challenges?: string[];
    our_solutions?: string[];
  };
}

// Team Member interface
export interface TeamMember extends CosmicObject {
  type_slug: 'team-members';
  metadata: {
    name: string;
    role: string;
    bio?: string;
    profile_image?: {
      url: string;
      imgix_url: string;
    };
    linkedin_url?: string;
    twitter_url?: string;
    github_url?: string;
    specialties?: string[];
  };
}

// Case Study interface
export interface CaseStudy extends CosmicObject {
  type_slug: 'case-studies';
  metadata: {
    project_name: string;
    client_name: string;
    project_description: string;
    service_type: {
      key: string;
      value: string;
    };
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    case_study_content: string;
    client_testimonial?: string;
    client_role?: string;
    project_url?: string;
    industry?: Industry;
  };
}

// Blog Post interface
export interface BlogPost extends CosmicObject {
  type_slug: 'blog-posts';
  metadata: {
    title: string;
    excerpt?: string;
    content: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    author?: TeamMember;
    category?: {
      key: string;
      value: string;
    };
    reading_time?: string;
    published_date?: string;
  };
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

export interface CosmicSingleResponse<T> {
  object: T;
}

// Type guards
export function isPage(obj: CosmicObject): obj is Page {
  return obj.type_slug === 'pages';
}

export function isService(obj: CosmicObject): obj is Service {
  return obj.type_slug === 'services';
}

export function isIndustry(obj: CosmicObject): obj is Industry {
  return obj.type_slug === 'industries';
}

export function isTeamMember(obj: CosmicObject): obj is TeamMember {
  return obj.type_slug === 'team-members';
}

export function isCaseStudy(obj: CosmicObject): obj is CaseStudy {
  return obj.type_slug === 'case-studies';
}

export function isBlogPost(obj: CosmicObject): obj is BlogPost {
  return obj.type_slug === 'blog-posts';
}

// Utility types
export type ServiceType = 'full-stack' | 'react-native' | 'expo-support' | 'team-augmentation' | 'cto-services';
export type PageType = 'homepage' | 'about' | 'services' | 'contact' | 'industries';
export type BlogCategory = 'react-native' | 'expo' | 'tech-strategy' | 'company-news' | 'ar-vr';

// Component prop types
export interface ServiceCardProps {
  service: Service;
  featured?: boolean;
}

export interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  featured?: boolean;
}

export interface TeamMemberCardProps {
  member: TeamMember;
}

export interface BlogPostCardProps {
  post: BlogPost;
  featured?: boolean;
}

export interface HeroSectionProps {
  headline: string;
  subheadline: string;
  backgroundImage?: string;
  showCTA?: boolean;
}