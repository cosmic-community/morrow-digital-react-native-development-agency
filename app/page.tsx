import { getHomepage, getFeaturedServices, getFeaturedCaseStudies } from '@/lib/cosmic'
import HeroSection from '@/components/HeroSection'
import ServiceGrid from '@/components/ServiceGrid'
import CaseStudyGrid from '@/components/CaseStudyGrid'
import CallToAction from '@/components/CallToAction'
import { Metadata } from 'next'

// Add revalidation for fresh content every 10 seconds
export const revalidate = 10

export async function generateMetadata(): Promise<Metadata> {
  const homepage = await getHomepage()
  
  if (!homepage) {
    return {
      title: 'Morrow · React Native Developers',
      description: 'Award-winning React Native app development company'
    }
  }

  return {
    title: homepage.metadata.page_title,
    description: homepage.metadata.meta_description || homepage.metadata.hero_subheadline,
  }
}

export default async function HomePage() {
  const [homepage, services, caseStudies] = await Promise.all([
    getHomepage(),
    getFeaturedServices(3),
    getFeaturedCaseStudies(3)
  ])

  if (!homepage) {
    return (
      <div className="section-padding">
        <div className="container">
          <h1 className="text-4xl font-bold text-center">Welcome to Morrow Digital</h1>
          <p className="text-xl text-center mt-4 text-gray-600">
            Award-winning React Native app development company
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      <HeroSection
        headline={homepage.metadata.hero_headline || homepage.metadata.page_title}
        subheadline={homepage.metadata.hero_subheadline || ''}
        backgroundImage={homepage.metadata.hero_image?.imgix_url}
        showCTA={true}
      />

      {/* Services Section */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Services we provide</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              No two apps are the same. Whether you need a top-down technical strategy for your new digital product, or an audit into existing systems, we're on hand to help.
            </p>
          </div>
          <ServiceGrid services={services} />
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Work</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Case studies from our recent projects, showcasing our expertise in React Native, technical strategy, and innovative solutions.
            </p>
          </div>
          <CaseStudyGrid caseStudies={caseStudies} />
        </div>
      </section>

      {/* Content Section */}
      {homepage.metadata.content && (
        <section className="section-padding bg-gray-50">
          <div className="container">
            <div 
              className="prose max-w-4xl mx-auto"
              dangerouslySetInnerHTML={{ __html: homepage.metadata.content }}
            />
          </div>
        </section>
      )}

      <CallToAction />
    </>
  )
}