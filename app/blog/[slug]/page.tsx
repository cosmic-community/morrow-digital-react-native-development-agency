// app/blog/[slug]/page.tsx
import { getBlogPost, getBlogPosts, REVALIDATE_TIME } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'

// Add revalidation for fresh content every 10 seconds
export const revalidate = REVALIDATE_TIME

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getBlogPosts()
  
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPost(slug)
  
  if (!post) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.'
    }
  }

  return {
    title: `${post.metadata.title} - Morrow Digital`,
    description: post.metadata.excerpt || post.metadata.title,
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient section-padding text-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <Link 
                href="/blog"
                className="inline-flex items-center text-white/80 hover:text-white mb-4"
              >
                ← Back to Blog
              </Link>
            </div>
            {post.metadata.category && (
              <div className="inline-flex items-center bg-white/10 backdrop-blur rounded-lg px-4 py-2 mb-6">
                <span className="text-accent font-semibold">{post.metadata.category.value}</span>
              </div>
            )}
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {post.metadata.title}
            </h1>
            {post.metadata.excerpt && (
              <p className="text-xl md:text-2xl mb-8 text-white/90">
                {post.metadata.excerpt}
              </p>
            )}
            <div className="flex items-center justify-center space-x-6 text-white/80">
              {post.metadata.author && (
                <div className="flex items-center space-x-2">
                  {post.metadata.author.metadata.profile_image && (
                    <img
                      src={`${post.metadata.author.metadata.profile_image.imgix_url}?w=40&h=40&fit=crop&auto=format,compress`}
                      alt={post.metadata.author.metadata.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  )}
                  <span>{post.metadata.author.metadata.name}</span>
                </div>
              )}
              {post.metadata.reading_time && (
                <span>{post.metadata.reading_time}</span>
              )}
              {post.metadata.published_date && (
                <span>{new Date(post.metadata.published_date).toLocaleDateString()}</span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {post.metadata.featured_image && (
        <section className="section-padding bg-gray-50">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <img
                src={`${post.metadata.featured_image.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`}
                alt={post.metadata.title}
                width={1200}
                height={600}
                className="w-full rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </section>
      )}

      {/* Blog Content */}
      <section className="section-padding">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.metadata.content }}
            />
          </div>
        </div>
      </section>

      {/* Author Bio */}
      {post.metadata.author && (
        <section className="section-padding bg-gray-50">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="card p-8">
                <div className="flex items-start space-x-6">
                  {post.metadata.author.metadata.profile_image && (
                    <img
                      src={`${post.metadata.author.metadata.profile_image.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                      alt={post.metadata.author.metadata.name}
                      width={80}
                      height={80}
                      className="rounded-full"
                    />
                  )}
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{post.metadata.author.metadata.name}</h3>
                    <p className="text-gray-600 mb-2">{post.metadata.author.metadata.role}</p>
                    {post.metadata.author.metadata.bio && (
                      <p className="text-gray-700 mb-4">{post.metadata.author.metadata.bio}</p>
                    )}
                    <div className="flex space-x-4">
                      {post.metadata.author.metadata.linkedin_url && (
                        <a
                          href={post.metadata.author.metadata.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary-dark"
                        >
                          LinkedIn
                        </a>
                      )}
                      {post.metadata.author.metadata.twitter_url && (
                        <a
                          href={post.metadata.author.metadata.twitter_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary-dark"
                        >
                          Twitter
                        </a>
                      )}
                      {post.metadata.author.metadata.github_url && (
                        <a
                          href={post.metadata.author.metadata.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary-dark"
                        >
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}