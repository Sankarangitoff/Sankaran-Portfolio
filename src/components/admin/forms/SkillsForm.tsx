'use client'

import { useState } from 'react'
import AdminInput from '@/components/admin/ui/AdminInput'
import AdminToggle from '@/components/admin/ui/AdminToggle'
import ArrayEditor from '@/components/admin/ui/ArrayEditor'
import type { Skills, SkillCategory, Skill } from '@/types'

interface Props {
  initialData: Skills
}

export default function SkillsForm({ initialData }: Props) {
  const [data, setData] = useState<Skills>(initialData)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  const handleSave = async () => {
    setSaving(true)
    setMessage('')
    try {
      const res = await fetch('/api/admin/content/skills', {
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

        <ArrayEditor<SkillCategory>
          label="Skill Categories"
          items={data.categories || []}
          onChange={(categories) => setData({ ...data, categories })}
          createItem={() => ({ name: '', skills: [] })}
          renderItem={(category, _index, onChangeCategory) => (
            <div>
              <AdminInput label="Category Name" value={category.name} onChange={(v) => onChangeCategory({ ...category, name: v })} />
              <ArrayEditor<Skill>
                label="Skills"
                items={category.skills || []}
                onChange={(skills) => onChangeCategory({ ...category, skills })}
                createItem={() => ({ name: '', isPrimary: false })}
                renderItem={(skill, _si, onChangeSkill) => (
                  <div>
                    <AdminInput label="Skill Name" value={skill.name} onChange={(v) => onChangeSkill({ ...skill, name: v })} />
                    <AdminToggle label="Primary Skill" checked={skill.isPrimary} onChange={(v) => onChangeSkill({ ...skill, isPrimary: v })} />
                  </div>
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
