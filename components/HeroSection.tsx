import Link from 'next/link'
import { HeroSectionProps } from '@/types'

export default function HeroSection({ 
  headline, 
  subheadline, 
  backgroundImage, 
  showCTA = false 
}: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Two-column layout */}
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
          {/* Left side - Text content with solid color background */}
          <div className="bg-primary flex items-center text-white relative z-10">
            <div className="container mx-auto px-8 py-16">
              <div className="space-y-8 max-w-lg">
                <div className="space-y-2">
                  <h2 className="text-accent text-lg font-semibold">
                    Award-winning app developers
                  </h2>
                  <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight">
                    {headline}
                  </h1>
                </div>
                <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                  {subheadline}
                </p>
                <div className="space-y-4">
                  <p className="text-white/80 leading-relaxed">
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
            </div>
          </div>

          {/* Right side - Image with floating animation */}
          <div className="bg-secondary flex items-center justify-center relative">
            <div className="relative">
              <img
                src="https://imgix.cosmicjs.com/3f6403c0-6181-11f0-a051-23c10f41277a-633ecb4499310b1d0f361c00_62978564fd9486f2a1cc6315_home-header.webp?w=1000&h=1200&fit=crop&auto=format,compress"
                alt="Mobile app interfaces"
                width={500}
                height={600}
                className="mx-auto floating-animation"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  )
}