'use client'

import { useState } from 'react'
import AdminInput from '@/components/admin/ui/AdminInput'
import AdminSelect from '@/components/admin/ui/AdminSelect'
import ArrayEditor from '@/components/admin/ui/ArrayEditor'
import type { Hero, CTAButton } from '@/types'

interface Props {
  initialData: Hero
}

export default function HeroForm({ initialData }: Props) {
  const [data, setData] = useState<Hero>(initialData)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  const handleSave = async () => {
    setSaving(true)
    setMessage('')
    try {
      const res = await fetch('/api/admin/content/hero', {
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
        <AdminInput label="Greeting" value={data.greeting} onChange={(v) => setData({ ...data, greeting: v })} />
        <AdminInput label="Name" value={data.name} onChange={(v) => setData({ ...data, name: v })} />
        <AdminInput label="Title" value={data.title} onChange={(v) => setData({ ...data, title: v })} />
        <AdminInput label="Tagline" value={data.tagline} onChange={(v) => setData({ ...data, tagline: v })} />

        <ArrayEditor<CTAButton>
          label="CTA Buttons"
          items={data.ctaButtons || []}
          onChange={(buttons) => setData({ ...data, ctaButtons: buttons })}
          createItem={() => ({ label: '', link: '', style: 'primary' })}
          renderItem={(item, _index, onChange) => (
            <div>
              <AdminInput label="Label" value={item.label} onChange={(v) => onChange({ ...item, label: v })} />
              <AdminInput label="Link" value={item.link} onChange={(v) => onChange({ ...item, link: v })} />
              <AdminSelect
                label="Style"
                value={item.style}
                onChange={(v) => onChange({ ...item, style: v as CTAButton['style'] })}
                options={[
                  { label: 'Primary', value: 'primary' },
                  { label: 'Secondary', value: 'secondary' },
                  { label: 'Ghost', value: 'ghost' },
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
