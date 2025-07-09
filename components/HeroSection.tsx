import Link from 'next/link'
import { HeroSectionProps } from '@/types'

export default function HeroSection({ 
  headline, 
  subheadline, 
  backgroundImage, 
  showCTA = false 
}: HeroSectionProps) {
  return (
    <section className="relative hero-gradient min-h-screen flex items-center text-white overflow-hidden">
      {/* Background Image */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <img
            src={`${backgroundImage}?w=1920&h=1080&fit=crop&auto=format,compress`}
            alt="Hero background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
      )}

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-accent text-lg font-semibold">
                Award-winning app developers
              </h2>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                {headline}
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              {subheadline}
            </p>
            <div className="space-y-4">
              <p className="text-white/80">
                Our team are experts in mobile, web, AR and VR app development. The work we do empowers ambitious businesses to innovate and grow, transforming bold visions into reality.
              </p>
              {showCTA && (
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/contact"
                    className="btn btn-secondary"
                  >
                    Book a call today
                  </Link>
                  <Link
                    href="/services"
                    className="btn btn-outline"
                  >
                    View our services
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="relative">
              <img
                src="/hero-phones.png"
                alt="Mobile app interfaces"
                width={500}
                height={600}
                className="mx-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  )
}