import { getSection } from '@/lib/content'
import SiteSettingsForm from '@/components/admin/forms/SiteSettingsForm'

export default function SiteSettingsPage() {
  const data = getSection('siteSettings')
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Site Settings</h1>
      <p className="text-gray-400 mb-8">Global site configuration, contact info, and social links</p>
      <SiteSettingsForm initialData={data} />
    </div>
  )
}
