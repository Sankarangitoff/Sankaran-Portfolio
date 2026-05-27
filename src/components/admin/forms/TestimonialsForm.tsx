'use client'

import { useState } from 'react'
import AdminInput from '@/components/admin/ui/AdminInput'
import AdminTextarea from '@/components/admin/ui/AdminTextarea'
import ImageUpload from '@/components/admin/ui/ImageUpload'
import ArrayEditor from '@/components/admin/ui/ArrayEditor'
import type { Testimonials, Testimonial } from '@/types'

interface Props {
  initialData: Testimonials
}

export default function TestimonialsForm({ initialData }: Props) {
  const [data, setData] = useState<Testimonials>(initialData)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  const handleSave = async () => {
    setSaving(true)
    setMessage('')
    try {
      const res = await fetch('/api/admin/content/testimonials', {
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

        <ArrayEditor<Testimonial>
          label="Testimonials"
          items={data.items || []}
          onChange={(items) => setData({ ...data, items })}
          createItem={() => ({ quote: '', name: '', role: '', company: '' })}
          renderItem={(item, _index, onChange) => (
            <div>
              <AdminTextarea label="Quote" value={item.quote} onChange={(v) => onChange({ ...item, quote: v })} rows={3} />
              <AdminInput label="Name" value={item.name} onChange={(v) => onChange({ ...item, name: v })} />
              <AdminInput label="Role" value={item.role} onChange={(v) => onChange({ ...item, role: v })} />
              <AdminInput label="Company" value={item.company} onChange={(v) => onChange({ ...item, company: v })} />
              <ImageUpload label="Avatar" value={item.avatar} onChange={(v) => onChange({ ...item, avatar: v })} />
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
