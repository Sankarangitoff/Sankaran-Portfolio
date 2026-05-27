import Link from 'next/link'

const sections = [
  { name: 'Site Settings', href: '/admin/siteSettings', description: 'Site name, contact info, social links' },
  { name: 'Hero', href: '/admin/hero', description: 'Landing section greeting, title, CTA buttons' },
  { name: 'About', href: '/admin/about', description: 'Bio, story, quick facts' },
  { name: 'Skills', href: '/admin/skills', description: 'Skill categories and technologies' },
  { name: 'Projects', href: '/admin/projects', description: 'Portfolio projects and case studies' },
  { name: 'Experience', href: '/admin/experience', description: 'Work history and achievements' },
  { name: 'Achievements', href: '/admin/achievements', description: 'Stats and milestones' },
  { name: 'Testimonials', href: '/admin/testimonials', description: 'Client quotes and reviews' },
]

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
      <p className="text-gray-400 mb-8">Manage your portfolio content</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-orange-500/50 transition-colors group"
          >
            <h2 className="font-semibold text-lg mb-1 group-hover:text-orange-500 transition-colors">
              {section.name}
            </h2>
            <p className="text-sm text-gray-400">{section.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
