// app/case-studies/[slug]/page.tsx
import { getCaseStudy, getCaseStudies } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import CallToAction from '@/components/CallToAction'

// Add revalidation for fresh content every 10 seconds
export const revalidate = 10

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const caseStudies = await getCaseStudies()
  
  return caseStudies.map((caseStudy) => ({
    slug: caseStudy.slug,
  }))
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params
  const caseStudy = await getCaseStudy(slug)
  
  if (!caseStudy) {
    return {
      title: 'Case Study Not Found',
      description: 'The requested case study could not be found.'
    }
  }

  return {
    title: `${caseStudy.metadata.project_name} Case Study - Morrow Digital`,
    description: caseStudy.metadata.project_description,
  }
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params
  const caseStudy = await getCaseStudy(slug)

  if (!caseStudy) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient section-padding text-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center bg-white/10 backdrop-blur rounded-lg px-4 py-2 mb-6">
                <span className="text-accent font-semibold">{caseStudy.metadata.service_type.value}</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {caseStudy.metadata.project_name}
              </h1>
              <p className="text-xl md:text-2xl mb-6">
                {caseStudy.metadata.project_description}
              </p>
              <div className="flex items-center space-x-4">
                <span className="text-white/80">Client:</span>
                <span className="font-semibold">{caseStudy.metadata.client_name}</span>
              </div>
              {caseStudy.metadata.project_url && (
                <div className="mt-8">
                  <a
                    href={caseStudy.metadata.project_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                  >
                    Visit Project
                  </a>
                </div>
              )}
            </div>
            {caseStudy.metadata.featured_image && (
              <div className="flex justify-center lg:justify-end">
                <img
                  src={`${caseStudy.metadata.featured_image.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
                  alt={caseStudy.metadata.project_name}
                  width={500}
                  height={333}
                  className="rounded-2xl shadow-2xl"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Case Study Content */}
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div 
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: caseStudy.metadata.case_study_content }}
              />
            </div>
            <div className="space-y-8">
              {/* Industry */}
              {caseStudy.metadata.industry && (
                <div className="card p-6">
                  <h3 className="text-xl font-semibold mb-4">Industry</h3>
                  <div className="flex items-center space-x-4">
                    {caseStudy.metadata.industry.metadata.industry_icon && (
                      <img
                        src={`${caseStudy.metadata.industry.metadata.industry_icon.imgix_url}?w=48&h=48&fit=crop&auto=format,compress`}
                        alt={caseStudy.metadata.industry.metadata.industry_name}
                        width={48}
                        height={48}
                        className="rounded-lg"
                      />
                    )}
                    <div>
                      <h4 className="font-semibold">{caseStudy.metadata.industry.metadata.industry_name}</h4>
                      <p className="text-sm text-gray-600">{caseStudy.metadata.industry.metadata.description}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Service Type */}
              <div className="card p-6">
                <h3 className="text-xl font-semibold mb-4">Service Type</h3>
                <span className="bg-primary/10 text-primary px-4 py-2 rounded-full font-medium">
                  {caseStudy.metadata.service_type.value}
                </span>
              </div>

              {/* Client Testimonial */}
              {caseStudy.metadata.client_testimonial && (
                <div className="card p-6">
                  <h3 className="text-xl font-semibold mb-4">Client Testimonial</h3>
                  <blockquote className="text-gray-700 italic mb-4">
                    "{caseStudy.metadata.client_testimonial}"
                  </blockquote>
                  {caseStudy.metadata.client_role && (
                    <p className="text-sm text-gray-600">
                      — {caseStudy.metadata.client_role}
                    </p>
                  )}
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