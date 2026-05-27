'use client'

import { useState } from 'react'
import AdminInput from '@/components/admin/ui/AdminInput'
import AdminToggle from '@/components/admin/ui/AdminToggle'
import ImageUpload from '@/components/admin/ui/ImageUpload'
import type { SiteSettings } from '@/types'

interface Props {
  initialData: SiteSettings
}

export default function SiteSettingsForm({ initialData }: Props) {
  const [data, setData] = useState<SiteSettings>(initialData)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  const update = (field: keyof SiteSettings, value: string | boolean) => {
    setData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage('')
    try {
      const res = await fetch('/api/admin/content/siteSettings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) setMessage('Saved successfully!')
      else setMessage('Failed to save')
    } catch { setMessage('Error saving') }
    finally { setSaving(false) }
  }

  return (
    <div className="max-w-2xl">
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <AdminInput label="Site Name" value={data.siteName} onChange={(v) => update('siteName', v)} />
        <AdminInput label="Site Description" value={data.siteDescription} onChange={(v) => update('siteDescription', v)} />
        <AdminInput label="Email" value={data.email} onChange={(v) => update('email', v)} type="email" />
        <AdminInput label="Phone" value={data.phone || ''} onChange={(v) => update('phone', v)} />
        <AdminInput label="Location" value={data.location} onChange={(v) => update('location', v)} />
        <AdminInput label="Availability" value={data.availability} onChange={(v) => update('availability', v)} />
        <AdminInput label="GitHub URL" value={data.githubUrl || ''} onChange={(v) => update('githubUrl', v)} />
        <AdminInput label="LinkedIn URL" value={data.linkedinUrl || ''} onChange={(v) => update('linkedinUrl', v)} />
        <ImageUpload label="Profile Image" value={data.profileImage} onChange={(v) => update('profileImage', v)} />
        <ImageUpload label="Resume PDF" value={data.resumePDF} onChange={(v) => update('resumePDF', v)} accept="application/pdf" />
        <AdminToggle label="Show Testimonials" checked={data.showTestimonials} onChange={(v) => update('showTestimonials', v)} />
        <AdminToggle label="Show Tech Credit" checked={data.showTechCredit} onChange={(v) => update('showTechCredit', v)} />
      </div>

      {message && (
        <div className={`mt-4 p-3 rounded-lg text-sm ${message.includes('success') ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
          {message}
        </div>
      )}
      <div className="mt-6">
        <button onClick={handleSave} disabled={saving} className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-medium rounded-lg transition-colors text-sm">
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  )
}
