import { getSection } from '@/lib/content'
import AboutForm from '@/components/admin/forms/AboutForm'

export default function AboutPage() {
  const data = getSection('about')
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">About Section</h1>
      <p className="text-gray-400 mb-8">Your bio, story paragraphs, and quick facts</p>
      <AboutForm initialData={data} />
    </div>
  )
}
