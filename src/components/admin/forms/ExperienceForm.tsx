'use client'

import { useState } from 'react'
import AdminInput from '@/components/admin/ui/AdminInput'
import AdminToggle from '@/components/admin/ui/AdminToggle'
import ImageUpload from '@/components/admin/ui/ImageUpload'
import ArrayEditor from '@/components/admin/ui/ArrayEditor'
import type { Experience, ExperienceEntry } from '@/types'

interface Props {
  initialData: Experience
}

export default function ExperienceForm({ initialData }: Props) {
  const [data, setData] = useState<Experience>(initialData)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  const handleSave = async () => {
    setSaving(true)
    setMessage('')
    try {
      const res = await fetch('/api/admin/content/experience', {
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
    <div className="max-w-3xl">
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <AdminInput label="Heading" value={data.heading} onChange={(v) => setData({ ...data, heading: v })} />
        <AdminInput label="Subheading" value={data.subheading || ''} onChange={(v) => setData({ ...data, subheading: v })} />

        <ArrayEditor<ExperienceEntry>
          label="Experience Entries"
          items={data.entries || []}
          onChange={(entries) => setData({ ...data, entries })}
          createItem={() => ({ role: '', company: '', startDate: '', isPresent: false, achievements: [], order: (data.entries?.length || 0) + 1 })}
          renderItem={(entry, _index, onChange) => (
            <div>
              <AdminInput label="Role" value={entry.role} onChange={(v) => onChange({ ...entry, role: v })} />
              <AdminInput label="Company" value={entry.company} onChange={(v) => onChange({ ...entry, company: v })} />
              <ImageUpload label="Company Logo" value={entry.companyLogo} onChange={(v) => onChange({ ...entry, companyLogo: v })} />
              <div className="grid grid-cols-2 gap-4">
                <AdminInput label="Start Date" value={entry.startDate} onChange={(v) => onChange({ ...entry, startDate: v })} />
                <AdminInput label="End Date" value={entry.endDate || ''} onChange={(v) => onChange({ ...entry, endDate: v })} />
              </div>
              <AdminToggle label="Currently Working Here" checked={entry.isPresent} onChange={(v) => onChange({ ...entry, isPresent: v })} />
              <AdminInput label="Order" value={String(entry.order || 0)} onChange={(v) => onChange({ ...entry, order: parseInt(v) || 0 })} type="number" />

              <ArrayEditor<string>
                label="Achievements"
                items={entry.achievements || []}
                onChange={(achievements) => onChange({ ...entry, achievements })}
                createItem={() => ''}
                renderItem={(achievement, _ai, onChangeAch) => (
                  <AdminInput label="Achievement" value={achievement} onChange={onChangeAch} />
                )}
              />
            </div>
          )}
        />
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
