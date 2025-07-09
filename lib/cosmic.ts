import { createBucketClient } from '@cosmicjs/sdk'
import type { 
  CosmicResponse, 
  CosmicSingleResponse, 
  Page, 
  Service, 
  Industry, 
  TeamMember, 
  CaseStudy, 
  BlogPost,
  CosmicObject
} from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: 'staging',
})

// Error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Generic fetch function with error handling
async function fetchObjects<T extends CosmicObject>(
  type: string,
  options: {
    limit?: number;
    skip?: number;
    query?: Record<string, any>;
    props?: string[];
    depth?: number;
  } = {}
): Promise<T[]> {
  try {
    const { limit = 100, skip = 0, query = {}, props, depth = 1 } = options;
    
    let cosmicQuery = cosmic.objects.find({
      type,
      ...query,
    });

    if (props) {
      cosmicQuery = cosmicQuery.props(props);
    }

    if (depth > 0) {
      cosmicQuery = cosmicQuery.depth(depth);
    }

    const response = await cosmicQuery.limit(limit).skip(skip);
    return response.objects as T[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error(`Error fetching ${type}:`, error);
    throw new Error(`Failed to fetch ${type}`);
  }
}

// Generic find one function
async function fetchObject<T extends CosmicObject>(
  type: string,
  identifier: string | { slug: string },
  options: {
    props?: string[];
    depth?: number;
  } = {}
): Promise<T | null> {
  try {
    const { props, depth = 1 } = options;
    
    let cosmicQuery = cosmic.objects.findOne({
      type,
      ...(typeof identifier === 'string' ? { id: identifier } : identifier),
    });

    if (props) {
      cosmicQuery = cosmicQuery.props(props);
    }

    if (depth > 0) {
      cosmicQuery = cosmicQuery.depth(depth);
    }

    const response = await cosmicQuery;
    return response.object as T;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    console.error(`Error fetching ${type}:`, error);
    throw new Error(`Failed to fetch ${type}`);
  }
}

// Pages
export async function getPages(): Promise<Page[]> {
  return fetchObjects<Page>('pages', {
    props: ['id', 'title', 'slug', 'metadata'],
  });
}

export async function getPage(slug: string): Promise<Page | null> {
  return fetchObject<Page>('pages', { slug }, {
    props: ['id', 'title', 'slug', 'metadata'],
  });
}

export async function getHomepage(): Promise<Page | null> {
  return fetchObject<Page>('pages', { slug: 'homepage' }, {
    props: ['id', 'title', 'slug', 'metadata'],
  });
}

// Services
export async function getServices(): Promise<Service[]> {
  return fetchObjects<Service>('services', {
    props: ['id', 'title', 'slug', 'metadata'],
  });
}

export async function getService(slug: string): Promise<Service | null> {
  return fetchObject<Service>('services', { slug }, {
    props: ['id', 'title', 'slug', 'metadata'],
  });
}

export async function getFeaturedServices(limit: number = 3): Promise<Service[]> {
  const services = await getServices();
  return services.slice(0, limit);
}

// Industries
export async function getIndustries(): Promise<Industry[]> {
  return fetchObjects<Industry>('industries', {
    props: ['id', 'title', 'slug', 'metadata'],
  });
}

export async function getIndustry(slug: string): Promise<Industry | null> {
  return fetchObject<Industry>('industries', { slug }, {
    props: ['id', 'title', 'slug', 'metadata'],
  });
}

// Team Members
export async function getTeamMembers(): Promise<TeamMember[]> {
  return fetchObjects<TeamMember>('team-members', {
    props: ['id', 'title', 'slug', 'metadata'],
  });
}

export async function getTeamMember(slug: string): Promise<TeamMember | null> {
  return fetchObject<TeamMember>('team-members', { slug }, {
    props: ['id', 'title', 'slug', 'metadata'],
  });
}

// Case Studies
export async function getCaseStudies(): Promise<CaseStudy[]> {
  return fetchObjects<CaseStudy>('case-studies', {
    props: ['id', 'title', 'slug', 'metadata'],
    depth: 1,
  });
}

export async function getCaseStudy(slug: string): Promise<CaseStudy | null> {
  return fetchObject<CaseStudy>('case-studies', { slug }, {
    props: ['id', 'title', 'slug', 'metadata'],
    depth: 1,
  });
}

export async function getFeaturedCaseStudies(limit: number = 3): Promise<CaseStudy[]> {
  const caseStudies = await getCaseStudies();
  return caseStudies.slice(0, limit);
}

// Blog Posts
export async function getBlogPosts(): Promise<BlogPost[]> {
  return fetchObjects<BlogPost>('blog-posts', {
    props: ['id', 'title', 'slug', 'metadata'],
    depth: 1,
  });
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  return fetchObject<BlogPost>('blog-posts', { slug }, {
    props: ['id', 'title', 'slug', 'metadata'],
    depth: 1,
  });
}

export async function getFeaturedBlogPosts(limit: number = 3): Promise<BlogPost[]> {
  const posts = await getBlogPosts();
  return posts.slice(0, limit);
}

export async function getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
  return fetchObjects<BlogPost>('blog-posts', {
    query: { 'metadata.category': category },
    props: ['id', 'title', 'slug', 'metadata'],
    depth: 1,
  });
}

// Search functionality
export async function searchContent(query: string): Promise<{
  services: Service[];
  caseStudies: CaseStudy[];
  blogPosts: BlogPost[];
}> {
  const [services, caseStudies, blogPosts] = await Promise.all([
    getServices(),
    getCaseStudies(),
    getBlogPosts(),
  ]);

  const searchTerm = query.toLowerCase();

  const filteredServices = services.filter(service => 
    service.title.toLowerCase().includes(searchTerm) ||
    service.metadata.service_name.toLowerCase().includes(searchTerm) ||
    service.metadata.short_description.toLowerCase().includes(searchTerm)
  );

  const filteredCaseStudies = caseStudies.filter(caseStudy => 
    caseStudy.title.toLowerCase().includes(searchTerm) ||
    caseStudy.metadata.project_name.toLowerCase().includes(searchTerm) ||
    caseStudy.metadata.client_name.toLowerCase().includes(searchTerm)
  );

  const filteredBlogPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm) ||
    post.metadata.title.toLowerCase().includes(searchTerm) ||
    (post.metadata.excerpt && post.metadata.excerpt.toLowerCase().includes(searchTerm))
  );

  return {
    services: filteredServices,
    caseStudies: filteredCaseStudies,
    blogPosts: filteredBlogPosts,
  };
}