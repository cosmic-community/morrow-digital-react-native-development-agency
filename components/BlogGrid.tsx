import Link from 'next/link'
import { BlogPost } from '@/types'

interface BlogGridProps {
  posts: BlogPost[]
}

export default function BlogGrid({ posts }: BlogGridProps) {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No blog posts available at the moment.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <div key={post.id} className="blog-post-card">
          <Link href={`/blog/${post.slug}`}>
            <div>
              {post.metadata.featured_image && (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={`${post.metadata.featured_image.imgix_url}?w=400&h=225&fit=crop&auto=format,compress`}
                    alt={post.metadata.title}
                    width={400}
                    height={225}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  {post.metadata.category && (
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                      {post.metadata.category.value}
                    </span>
                  )}
                  {post.metadata.reading_time && (
                    <span className="text-sm text-gray-500">
                      {post.metadata.reading_time}
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-semibold line-clamp-2">
                  {post.metadata.title}
                </h3>
                {post.metadata.excerpt && (
                  <p className="text-gray-600 line-clamp-3">
                    {post.metadata.excerpt}
                  </p>
                )}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {post.metadata.author && (
                      <>
                        {post.metadata.author.metadata.profile_image && (
                          <img
                            src={`${post.metadata.author.metadata.profile_image.imgix_url}?w=32&h=32&fit=crop&auto=format,compress`}
                            alt={post.metadata.author.metadata.name}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                        )}
                        <span className="text-sm text-gray-600">
                          {post.metadata.author.metadata.name}
                        </span>
                      </>
                    )}
                  </div>
                  {post.metadata.published_date && (
                    <span className="text-sm text-gray-500">
                      {new Date(post.metadata.published_date).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}