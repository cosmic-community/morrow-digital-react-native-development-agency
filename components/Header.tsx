'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    {
      label: 'Services',
      href: '/services',
    },
    {
      label: 'Our Work',
      href: '/case-studies',
    },
    {
      label: 'Our Industries',
      href: '/industries',
    },
    {
      label: 'About',
      href: '/about',
    },
    {
      label: 'Our Approach',
      href: '/approach',
    },
    {
      label: 'Blog',
      href: '/blog',
    },
    {
      label: 'Open-Source',
      href: '/open-source',
    },
    {
      label: 'Contact',
      href: '/contact',
    },
  ]

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-primary/95 backdrop-blur-md shadow-lg' : 'bg-primary'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-white">
              MORROW
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="/contact"
              className="btn btn-secondary text-sm"
            >
              Book a call today
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-primary border-t border-primary-light">
            <div className="py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-2 text-white hover:bg-primary-light rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="px-4 pt-4">
                <Link
                  href="/contact"
                  className="btn btn-secondary w-full text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Book a call today
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}