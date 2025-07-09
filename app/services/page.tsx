import { getServices, REVALIDATE_TIME } from '@/lib/cosmic'
import ServiceGrid from '@/components/ServiceGrid'
import { Metadata } from 'next'

// Add revalidation for fresh content every 10 seconds
export const revalidate = REVALIDATE_TIME

export const metadata: Metadata = {
  title: 'Our Services - Morrow Digital',
  description: 'Comprehensive React Native development services including technical strategy, app development, Expo support, and team augmentation.',
}

export default async function ServicesPage() {
  const services = await getServices()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient section-padding text-white">
        <div className="container">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our Services
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
              Comprehensive React Native development services to help you build, scale, and optimize your mobile applications.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container">
          <ServiceGrid services={services} />
        </div>
      </section>
    </div>
  )
}