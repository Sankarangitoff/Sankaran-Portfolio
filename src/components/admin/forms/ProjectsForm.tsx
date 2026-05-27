'use client'

import { useState } from 'react'
import AdminInput from '@/components/admin/ui/AdminInput'
import AdminTextarea from '@/components/admin/ui/AdminTextarea'
import ImageUpload from '@/components/admin/ui/ImageUpload'
import ArrayEditor from '@/components/admin/ui/ArrayEditor'
import type { Projects, Project, Impact } from '@/types'

interface Props {
  initialData: Projects
}

export default function ProjectsForm({ initialData }: Props) {
  const [data, setData] = useState<Projects>(initialData)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  const handleSave = async () => {
    setSaving(true)
    setMessage('')
    try {
      const res = await fetch('/api/admin/content/projects', {
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
        <AdminInput label="Subheading" value={data.subheading} onChange={(v) => setData({ ...data, subheading: v })} />

        <ArrayEditor<Project>
          label="Projects"
          items={data.items || []}
          onChange={(items) => setData({ ...data, items })}
          createItem={() => ({ title: '', challenge: '', solution: '', techStack: [], impacts: [], order: (data.items?.length || 0) + 1 })}
          renderItem={(project, _index, onChange) => (
            <div>
              <AdminInput label="Title" value={project.title} onChange={(v) => onChange({ ...project, title: v })} />
              <ImageUpload label="Project Image" value={project.image} onChange={(v) => onChange({ ...project, image: v })} />
              <AdminTextarea label="Challenge" value={project.challenge} onChange={(v) => onChange({ ...project, challenge: v })} rows={2} />
              <AdminTextarea label="Solution" value={project.solution} onChange={(v) => onChange({ ...project, solution: v })} rows={2} />
              <AdminInput
                label="Tech Stack (comma-separated)"
                value={(project.techStack || []).join(', ')}
                onChange={(v) => onChange({ ...project, techStack: v.split(',').map((s) => s.trim()).filter(Boolean) })}
              />
              <AdminInput label="GitHub URL" value={project.githubUrl || ''} onChange={(v) => onChange({ ...project, githubUrl: v })} />
              <AdminInput label="Live URL" value={project.liveUrl || ''} onChange={(v) => onChange({ ...project, liveUrl: v })} />
              <AdminInput label="Order" value={String(project.order || 0)} onChange={(v) => onChange({ ...project, order: parseInt(v) || 0 })} type="number" />

              <ArrayEditor<Impact>
                label="Impacts"
                items={project.impacts || []}
                onChange={(impacts) => onChange({ ...project, impacts })}
                createItem={() => ({ icon: '', metric: '', description: '' })}
                renderItem={(impact, _ii, onChangeImpact) => (
                  <div>
                    <AdminInput label="Icon (emoji)" value={impact.icon} onChange={(v) => onChangeImpact({ ...impact, icon: v })} />
                    <AdminInput label="Metric" value={impact.metric} onChange={(v) => onChangeImpact({ ...impact, metric: v })} />
                    <AdminInput label="Description" value={impact.description} onChange={(v) => onChangeImpact({ ...impact, description: v })} />
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
