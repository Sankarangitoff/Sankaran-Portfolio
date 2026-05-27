import { getSection } from '@/lib/content'
import TestimonialsForm from '@/components/admin/forms/TestimonialsForm'

export default function TestimonialsPage() {
  const data = getSection('testimonials')
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Testimonials Section</h1>
      <p className="text-gray-400 mb-8">Client quotes and reviews</p>
      <TestimonialsForm initialData={data} />
    </div>
  )
}
