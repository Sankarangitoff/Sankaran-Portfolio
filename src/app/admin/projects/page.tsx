import { getSection } from '@/lib/content'
import ProjectsForm from '@/components/admin/forms/ProjectsForm'

export default function ProjectsPage() {
  const data = getSection('projects')
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Projects Section</h1>
      <p className="text-gray-400 mb-8">Portfolio projects and case studies</p>
      <ProjectsForm initialData={data} />
    </div>
  )
}
