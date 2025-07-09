import { getBlogPosts } from '@/lib/cosmic'
import BlogGrid from '@/components/BlogGrid'
import { Metadata } from 'next'

// Add revalidation for fresh content every 10 seconds
export const revalidate = 10

export const metadata: Metadata = {
  title: 'Blog - Morrow Digital',
  description: 'Technical insights, company updates, and React Native development tips from the Morrow Digital team.',
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient section-padding text-white">
        <div className="container">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Blog
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
              Technical insights, company updates, and React Native development tips from our team.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="section-padding">
        <div className="container">
          <BlogGrid posts={posts} />
        </div>
      </section>
    </div>
  )
}