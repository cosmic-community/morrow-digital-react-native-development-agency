export default function CallToAction() {
  return (
    <section className="section-padding hero-gradient text-white">
      <div className="container">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to build something amazing?
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            Let's discuss your project and how we can help you achieve your goals with React Native and cutting-edge technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="btn btn-secondary"
            >
              Get in Touch
            </a>
            <a
              href="/case-studies"
              className="btn btn-outline border-white text-white hover:bg-white hover:text-primary"
            >
              View Our Work
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}