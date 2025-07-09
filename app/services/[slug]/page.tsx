// app/services/[slug]/page.tsx
import { getService, getServices, REVALIDATE_TIME } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import CallToAction from '@/components/CallToAction'

// Add revalidation for fresh content every 10 seconds
export const revalidate = REVALIDATE_TIME

interface ServicePageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const services = await getServices()
  
  return services.map((service) => ({
    slug: service.slug,
  }))
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  const service = await getService(slug)
  
  if (!service) {
    return {
      title: 'Service Not Found',
      description: 'The requested service could not be found.'
    }
  }

  return {
    title: `${service.metadata.service_name} - Morrow Digital`,
    description: service.metadata.short_description,
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params
  const service = await getService(slug)

  if (!service) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient section-padding text-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {service.metadata.service_name}
              </h1>
              <p className="text-xl md:text-2xl mb-8">
                {service.metadata.short_description}
              </p>
              {service.metadata.starting_price && (
                <div className="inline-flex items-center bg-white/10 backdrop-blur rounded-lg px-6 py-3">
                  <span className="text-accent font-semibold">Starting at: </span>
                  <span className="ml-2 text-white font-bold">{service.metadata.starting_price}</span>
                </div>
              )}
            </div>
            {service.metadata.service_icon && (
              <div className="flex justify-center lg:justify-end">
                <img
                  src={`${service.metadata.service_icon.imgix_url}?w=500&h=500&fit=crop&auto=format,compress`}
                  alt={service.metadata.service_name}
                  width={400}
                  height={400}
                  className="rounded-2xl shadow-2xl"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div 
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: service.metadata.detailed_description }}
              />
            </div>
            <div className="space-y-8">
              {/* Key Features */}
              {service.metadata.key_features && service.metadata.key_features.length > 0 && (
                <div className="card p-6">
                  <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                  <ul className="space-y-2">
                    {service.metadata.key_features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary mr-2">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Technologies */}
              {service.metadata.technologies && service.metadata.technologies.length > 0 && (
                <div className="card p-6">
                  <h3 className="text-xl font-semibold mb-4">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {service.metadata.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <CallToAction />
    </div>
  )
}