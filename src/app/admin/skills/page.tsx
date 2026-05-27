import { getSection } from '@/lib/content'
import SkillsForm from '@/components/admin/forms/SkillsForm'

export default function SkillsPage() {
  const data = getSection('skills')
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Skills Section</h1>
      <p className="text-gray-400 mb-8">Skill categories and technologies</p>
      <SkillsForm initialData={data} />
    </div>
  )
}
