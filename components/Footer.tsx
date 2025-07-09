import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="text-2xl font-bold">MORROW</div>
            <p className="text-gray-400">
              Award-winning React Native app development company based in Boston, MA and Bristol, UK.
            </p>
            <div className="space-y-2">
              <div className="text-sm">
                <strong>Boston, MA:</strong>
                <br />
                100 Cambridge Street, 14th Floor
                <br />
                Boston, Massachusetts, 02114
                <br />
                <a href="tel:+13392295708" className="footer-link">
                  (+1) 339 229 5708
                </a>
              </div>
              <div className="text-sm">
                <strong>Bristol, UK:</strong>
                <br />
                Suite 1, Number One Bristol
                <br />
                Bristol, BS1 2NR
                <br />
                <a href="tel:+441174566433" className="footer-link">
                  +44 (0) 117 456 6433
                </a>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Services</h3>
            <ul className="space-y-2">
              <li><Link href="/services" className="footer-link">All Services</Link></li>
              <li><Link href="/services/full-stack-technical-strategy" className="footer-link">Technical Strategy</Link></li>
              <li><Link href="/services/react-native-multi-platform-app-development" className="footer-link">React Native Development</Link></li>
              <li><Link href="/services/expo-support" className="footer-link">Expo Support</Link></li>
              <li><Link href="/services/team-augmentation" className="footer-link">Team Augmentation</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="footer-link">About</Link></li>
              <li><Link href="/team" className="footer-link">Team</Link></li>
              <li><Link href="/case-studies" className="footer-link">Case Studies</Link></li>
              <li><Link href="/blog" className="footer-link">Blog</Link></li>
              <li><Link href="/contact" className="footer-link">Contact</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="/open-source" className="footer-link">Open Source</Link></li>
              <li><Link href="/industries" className="footer-link">Industries</Link></li>
              <li><Link href="/approach" className="footer-link">Our Approach</Link></li>
              <li><a href="mailto:hello@themorrow.digital" className="footer-link">hello@themorrow.digital</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-400">
            Copyright © 2024 Morrow Digital Ltd · Registered in England #11169148 · An OddVentures Company
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="footer-link text-sm">Privacy Policy</Link>
            <Link href="/terms" className="footer-link text-sm">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}