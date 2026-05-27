'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const sections = [
  { name: 'Dashboard', href: '/admin' },
  { name: 'Site Settings', href: '/admin/siteSettings' },
  { name: 'Hero', href: '/admin/hero' },
  { name: 'About', href: '/admin/about' },
  { name: 'Skills', href: '/admin/skills' },
  { name: 'Projects', href: '/admin/projects' },
  { name: 'Experience', href: '/admin/experience' },
  { name: 'Achievements', href: '/admin/achievements' },
  { name: 'Testimonials', href: '/admin/testimonials' },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <aside className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col min-h-screen">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-lg font-bold text-orange-500">Admin Panel</h1>
        <p className="text-xs text-gray-400 mt-1">Portfolio Manager</p>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {sections.map((section) => {
          const isActive = pathname === section.href
          return (
            <Link
              key={section.href}
              href={section.href}
              className={`block px-4 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-orange-500/10 text-orange-500 font-medium'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
              }`}
            >
              {section.name}
            </Link>
          )
        })}
      </nav>
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2.5 rounded-lg text-sm text-gray-400 hover:text-red-400 hover:bg-gray-800 transition-colors text-left"
        >
          Logout
        </button>
      </div>
    </aside>
  )
}
