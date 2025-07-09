import Link from 'next/link'
import { Service } from '@/types'

interface ServiceGridProps {
  services: Service[]
}

export default function ServiceGrid({ services }: ServiceGridProps) {
  if (!services || services.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No services available at the moment.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {services.map((service) => (
        <div key={service.id} className="service-card">
          <Link href={`/services/${service.slug}`}>
            <div className="space-y-4">
              {service.metadata.service_icon && (
                <div className="w-16 h-16 mx-auto">
                  <img
                    src={`${service.metadata.service_icon.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
                    alt={service.metadata.service_name}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              )}
              <h3 className="text-xl font-semibold text-center">
                {service.metadata.service_name}
              </h3>
              <p className="text-gray-600 text-center">
                {service.metadata.short_description}
              </p>
              {service.metadata.technologies && service.metadata.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 justify-center">
                  {service.metadata.technologies.slice(0, 3).map((tech, index) => (
                    <span
                      key={index}
                      className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {service.metadata.technologies.length > 3 && (
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                      +{service.metadata.technologies.length - 3} more
                    </span>
                  )}
                </div>
              )}
              <div className="text-center">
                <span className="text-primary font-semibold hover:underline">
                  Learn more →
                </span>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}