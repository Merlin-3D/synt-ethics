import { Head, Link } from '@inertiajs/react'
import AdminLayout from '../layout'

interface BlogsIndexProps {
  resources: any
}
export default function ResourcesIndex({ resources }: BlogsIndexProps) {
  return (
    <AdminLayout title="Gestion des ressources">
      <Head title="Ressources" />
      <div className="space-y-6">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Resources</h1>
          </div>
          <div className="mt-4 sm:mt-0">
            <Link
              href="/admin/resources/create"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#288FC4] hover:bg-[#1a7cb0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#288FC4] transition-colors duration-200"
            >
              <svg
                className="-ml-1 mr-2 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Nouvelle resource
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
