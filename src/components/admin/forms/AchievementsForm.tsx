'use client'

import { useState } from 'react'
import AdminInput from '@/components/admin/ui/AdminInput'
import AdminSelect from '@/components/admin/ui/AdminSelect'
import ArrayEditor from '@/components/admin/ui/ArrayEditor'
import type { Achievements, Achievement } from '@/types'

interface Props {
  initialData: Achievements
}

export default function AchievementsForm({ initialData }: Props) {
  const [data, setData] = useState<Achievements>(initialData)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  const handleSave = async () => {
    setSaving(true)
    setMessage('')
    try {
      const res = await fetch('/api/admin/content/achievements', {
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
        <AdminInput label="Heading" value={data.heading} onChange={(v) => setData({ ...data, heading: v })} />
        <AdminInput label="Subheading" value={data.subheading} onChange={(v) => setData({ ...data, subheading: v })} />

        <ArrayEditor<Achievement>
          label="Achievement Items"
          items={data.items || []}
          onChange={(items) => setData({ ...data, items })}
          createItem={() => ({ icon: '', metric: '', label: '', description: '', size: 'medium' as const })}
          renderItem={(item, _index, onChange) => (
            <div>
              <AdminInput label="Icon (emoji)" value={item.icon} onChange={(v) => onChange({ ...item, icon: v })} />
              <AdminInput label="Metric" value={item.metric} onChange={(v) => onChange({ ...item, metric: v })} />
              <AdminInput label="Label" value={item.label} onChange={(v) => onChange({ ...item, label: v })} />
              <AdminInput label="Description" value={item.description} onChange={(v) => onChange({ ...item, description: v })} />
              <AdminSelect
                label="Size"
                value={item.size}
                onChange={(v) => onChange({ ...item, size: v as Achievement['size'] })}
                options={[
                  { label: 'Small', value: 'small' },
                  { label: 'Medium', value: 'medium' },
                  { label: 'Large', value: 'large' },
                ]}
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
