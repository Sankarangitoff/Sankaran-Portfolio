import { getSection } from '@/lib/content'
import HeroForm from '@/components/admin/forms/HeroForm'

export default function HeroPage() {
  const data = getSection('hero')
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Hero Section</h1>
      <p className="text-gray-400 mb-8">Landing section with greeting, title, and call-to-action buttons</p>
      <HeroForm initialData={data} />
    </div>
  )
}
