import { getCaseStudies } from '@/lib/cosmic'
import CaseStudyGrid from '@/components/CaseStudyGrid'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Case Studies - Morrow Digital',
  description: 'Explore our portfolio of successful React Native app development projects and client testimonials.',
}

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient section-padding text-white">
        <div className="container">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our Work
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
              Case studies showcasing our expertise in React Native development, technical strategy, and innovative solutions that drive business results.
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="section-padding">
        <div className="container">
          <CaseStudyGrid caseStudies={caseStudies} />
        </div>
      </section>
    </div>
  )
}