'use client'

import { useEffect, useRef } from 'react'

interface ClientLogosProps {
  className?: string
}

export default function ClientLogos({ className = '' }: ClientLogosProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  // Sample client logos - in a real implementation, these would come from Cosmic CMS
  const clientLogos = [
    {
      name: 'Microsoft',
      logo: 'https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=400&h=200&fit=crop&auto=format,compress',
      width: 120,
      height: 60
    },
    {
      name: 'Google',
      logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=400&h=200&fit=crop&auto=format,compress',
      width: 120,
      height: 60
    },
    {
      name: 'Apple',
      logo: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=200&fit=crop&auto=format,compress',
      width: 120,
      height: 60
    },
    {
      name: 'Amazon',
      logo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=400&h=200&fit=crop&auto=format,compress',
      width: 120,
      height: 60
    },
    {
      name: 'Meta',
      logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=200&fit=crop&auto=format,compress',
      width: 120,
      height: 60
    },
    {
      name: 'Netflix',
      logo: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=200&fit=crop&auto=format,compress',
      width: 120,
      height: 60
    },
    {
      name: 'Spotify',
      logo: 'https://images.unsplash.com/photo-1611339555312-e607c8352fd7?w=400&h=200&fit=crop&auto=format,compress',
      width: 120,
      height: 60
    },
    {
      name: 'Uber',
      logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=400&h=200&fit=crop&auto=format,compress',
      width: 120,
      height: 60
    }
  ]

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let animationFrame: number
    let scrollPosition = 0
    const scrollSpeed = 0.5

    const animate = () => {
      scrollPosition += scrollSpeed
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0
      }
      scrollContainer.scrollLeft = scrollPosition
      animationFrame = requestAnimationFrame(animate)
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <section className={`py-12 bg-white border-b border-gray-100 ${className}`}>
      <div className="container">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Trusted by Leading Companies
          </h2>
          <p className="text-gray-600">
            We've partnered with innovative companies to build exceptional React Native apps
          </p>
        </div>
        
        <div className="relative overflow-hidden">
          <div 
            ref={scrollRef}
            className="flex gap-12 overflow-x-hidden"
            style={{
              width: 'fit-content',
              animation: 'none' // We'll handle animation with JavaScript for better control
            }}
          >
            {/* First set of logos */}
            {clientLogos.map((client, index) => (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
                style={{ minWidth: '150px', height: '80px' }}
              >
                <img
                  src={client.logo}
                  alt={`${client.name} logo`}
                  width={client.width}
                  height={client.height}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            ))}
            
            {/* Duplicate set for seamless scrolling */}
            {clientLogos.map((client, index) => (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
                style={{ minWidth: '150px', height: '80px' }}
              >
                <img
                  src={client.logo}
                  alt={`${client.name} logo`}
                  width={client.width}
                  height={client.height}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            ))}
          </div>
          
          {/* Gradient overlays for smooth fade effect */}
          <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
        </div>
      </div>
    </section>
  )
}