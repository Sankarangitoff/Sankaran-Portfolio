'use client'

import { useState } from 'react'
import Image from 'next/image'

interface ImageUploadProps {
  label: string
  value?: string
  onChange: (url: string) => void
  accept?: string
}

export default function ImageUpload({ label, value, onChange, accept = 'image/*' }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData })
      const data = await res.json()
      if (data.url) {
        onChange(data.url)
      }
    } catch (err) {
      console.error('Upload failed:', err)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-300 mb-1.5">{label}</label>
      <div className="flex items-center gap-4">
        {value && (
          <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-800">
            <Image src={value} alt={label} fill className="object-cover" />
          </div>
        )}
        <div>
          <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-sm text-gray-300 transition-colors">
            {uploading ? 'Uploading...' : value ? 'Change' : 'Upload'}
            <input
              type="file"
              accept={accept}
              onChange={handleUpload}
              className="hidden"
              disabled={uploading}
            />
          </label>
          {value && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="ml-2 text-sm text-red-400 hover:text-red-300"
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
