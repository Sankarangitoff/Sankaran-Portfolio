import { getSection } from '@/lib/content'
import ExperienceForm from '@/components/admin/forms/ExperienceForm'

export default function ExperiencePage() {
  const data = getSection('experience')
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Experience Section</h1>
      <p className="text-gray-400 mb-8">Work history and professional achievements</p>
      <ExperienceForm initialData={data} />
    </div>
  )
}
