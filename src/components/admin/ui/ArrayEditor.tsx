'use client'

interface ArrayEditorProps<T> {
  label: string
  items: T[]
  onChange: (items: T[]) => void
  renderItem: (item: T, index: number, onChange: (item: T) => void) => React.ReactNode
  createItem: () => T
}

export default function ArrayEditor<T>({ label, items, onChange, renderItem, createItem }: ArrayEditorProps<T>) {
  const addItem = () => onChange([...items, createItem()])
  const removeItem = (index: number) => onChange(items.filter((_, i) => i !== index))
  const updateItem = (index: number, item: T) => {
    const next = [...items]
    next[index] = item
    onChange(next)
  }
  const moveUp = (index: number) => {
    if (index === 0) return
    const next = [...items]
    ;[next[index - 1], next[index]] = [next[index], next[index - 1]]
    onChange(next)
  }
  const moveDown = (index: number) => {
    if (index === items.length - 1) return
    const next = [...items]
    ;[next[index], next[index + 1]] = [next[index + 1], next[index]]
    onChange(next)
  }

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <label className="text-sm font-medium text-gray-300">{label}</label>
        <button
          type="button"
          onClick={addItem}
          className="px-3 py-1 text-xs bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
        >
          + Add
        </button>
      </div>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-end gap-1 mb-3">
              <button
                type="button"
                onClick={() => moveUp(index)}
                disabled={index === 0}
                className="p-1 text-gray-400 hover:text-gray-200 disabled:opacity-30 text-xs"
              >
                ▲
              </button>
              <button
                type="button"
                onClick={() => moveDown(index)}
                disabled={index === items.length - 1}
                className="p-1 text-gray-400 hover:text-gray-200 disabled:opacity-30 text-xs"
              >
                ▼
              </button>
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="p-1 text-red-400 hover:text-red-300 text-xs ml-2"
              >
                Remove
              </button>
            </div>
            {renderItem(item, index, (updated) => updateItem(index, updated))}
          </div>
        ))}
      </div>
    </div>
  )
}
