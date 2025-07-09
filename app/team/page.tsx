import { getTeamMembers } from '@/lib/cosmic'
import TeamGrid from '@/components/TeamGrid'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Team - Morrow Digital',
  description: 'Meet the expert React Native developers and technical strategists behind Morrow Digital.',
}

export default async function TeamPage() {
  const teamMembers = await getTeamMembers()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient section-padding text-white">
        <div className="container">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our Team
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
              Meet the expert React Native developers and technical strategists who bring your vision to life.
            </p>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="section-padding">
        <div className="container">
          <TeamGrid members={teamMembers} />
        </div>
      </section>
    </div>
  )
}