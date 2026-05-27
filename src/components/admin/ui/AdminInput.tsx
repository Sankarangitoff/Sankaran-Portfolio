'use client'

interface AdminInputProps {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type?: string
}

export default function AdminInput({ label, value, onChange, placeholder, type = 'text' }: AdminInputProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-300 mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
      />
    </div>
  )
}
