'use client'

import { useState } from 'react'
import AdminInput from '@/components/admin/ui/AdminInput'
import AdminTextarea from '@/components/admin/ui/AdminTextarea'
import ArrayEditor from '@/components/admin/ui/ArrayEditor'
import type { About, QuickFact } from '@/types'

interface Props {
  initialData: About
}

export default function AboutForm({ initialData }: Props) {
  const [data, setData] = useState<About>(initialData)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  const handleSave = async () => {
    setSaving(true)
    setMessage('')
    try {
      const res = await fetch('/api/admin/content/about', {
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
        <AdminInput label="Location Badge" value={data.locationBadge} onChange={(v) => setData({ ...data, locationBadge: v })} />

        <ArrayEditor<string>
          label="Story Paragraphs"
          items={data.story || []}
          onChange={(story) => setData({ ...data, story })}
          createItem={() => ''}
          renderItem={(item, _index, onChange) => (
            <AdminTextarea label="Paragraph" value={item} onChange={onChange} rows={3} />
          )}
        />

        <ArrayEditor<string>
          label="Core Expertise Tags"
          items={data.coreTags || []}
          onChange={(coreTags) => setData({ ...data, coreTags })}
          createItem={() => ''}
          renderItem={(item, _index, onChange) => (
            <AdminInput label="Tag" value={item} onChange={onChange} />
          )}
        />

        <ArrayEditor<string>
          label="Highlights (use **text** for accent)"
          items={data.highlights || []}
          onChange={(highlights) => setData({ ...data, highlights })}
          createItem={() => ''}
          renderItem={(item, _index, onChange) => (
            <AdminTextarea label="Highlight" value={item} onChange={onChange} rows={2} />
          )}
        />

        <ArrayEditor<QuickFact>
          label="Quick Facts"
          items={data.quickFacts || []}
          onChange={(quickFacts) => setData({ ...data, quickFacts })}
          createItem={() => ({ icon: '', stat: '', label: '' })}
          renderItem={(item, _index, onChange) => (
            <div>
              <AdminInput label="Icon (emoji)" value={item.icon} onChange={(v) => onChange({ ...item, icon: v })} />
              <AdminInput label="Stat" value={item.stat} onChange={(v) => onChange({ ...item, stat: v })} />
              <AdminInput label="Label" value={item.label} onChange={(v) => onChange({ ...item, label: v })} />
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
