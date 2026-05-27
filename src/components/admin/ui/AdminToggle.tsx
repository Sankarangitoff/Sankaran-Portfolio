'use client'

interface AdminToggleProps {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

export default function AdminToggle({ label, checked, onChange }: AdminToggleProps) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <label className="text-sm font-medium text-gray-300">{label}</label>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          checked ? 'bg-orange-500' : 'bg-gray-700'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  )
}
