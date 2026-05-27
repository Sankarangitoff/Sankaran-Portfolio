import { getSection } from '@/lib/content'
import AchievementsForm from '@/components/admin/forms/AchievementsForm'

export default function AchievementsPage() {
  const data = getSection('achievements')
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Achievements Section</h1>
      <p className="text-gray-400 mb-8">Stats, milestones, and accomplishments</p>
      <AchievementsForm initialData={data} />
    </div>
  )
}
