import AdminSidebar from '@/components/admin/AdminSidebar'

export const metadata = { title: 'Admin Panel | Sankaran Portfolio' }

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  )
}
