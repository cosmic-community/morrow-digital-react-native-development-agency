import Link from 'next/link'
import { CaseStudy } from '@/types'

interface CaseStudyGridProps {
  caseStudies: CaseStudy[]
}

export default function CaseStudyGrid({ caseStudies }: CaseStudyGridProps) {
  if (!caseStudies || caseStudies.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No case studies available at the moment.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {caseStudies.map((caseStudy) => (
        <div key={caseStudy.id} className="case-study-card">
          <Link href={`/case-studies/${caseStudy.slug}`}>
            <div>
              {caseStudy.metadata.featured_image && (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={`${caseStudy.metadata.featured_image.imgix_url}?w=400&h=225&fit=crop&auto=format,compress`}
                    alt={caseStudy.metadata.project_name}
                    width={400}
                    height={225}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                    {caseStudy.metadata.service_type.value}
                  </span>
                  {caseStudy.metadata.industry && (
                    <span className="text-sm text-gray-500">
                      {caseStudy.metadata.industry.metadata.industry_name}
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-semibold">
                  {caseStudy.metadata.project_name}
                </h3>
                <p className="text-gray-600">
                  {caseStudy.metadata.project_description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {caseStudy.metadata.client_name}
                  </span>
                  <span className="text-primary font-semibold hover:underline">
                    Read the full story →
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}