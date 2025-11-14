import AdminLayout from './layout'
import { Head, Link } from '@inertiajs/react'
import CustomerIcon from '../web/components/icons/customers.icon'
import DocumentIcon from '../web/components/icons/document.icon'

interface DashboardProps {
  stats: {
    totalUsers: any
    totalBlogs: any
    publishedBlogs: any
    draftBlogs: any
  }
  recentBlogs: any[]
  recentUsers: any[]
}

export default function Dashboard({ stats, recentBlogs, recentUsers }: DashboardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR')
  }

  return (
    <AdminLayout title="Dashboard">
      <Head title="Dashboard - Administration" />

      <div className="space-y-6">
        {/* En-tête */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">Vue d'ensemble de votre site de blog</p>
        </div>

        {/* Statistiques */}
        <div className="bg-[#f5f6f6] rounded-lg p-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CustomerIcon className="h-6 w-6" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Utilisateurs
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.totalUsers}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <DocumentIcon className="h-6 w-6" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Articles</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.totalBlogs}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Blogs Publiés</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.publishedBlogs}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-yellow-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Brouillons</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.draftBlogs}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contenu récent */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Blogs récents */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Les 5 articles Récents</h3>
                <Link
                  href="/admin/blogs"
                  className="text-sm font-medium text-[#288FC4] hover:text-[#288FC4]"
                >
                  Voir tout
                </Link>
              </div>
              <div className="mt-5 flow-root">
                <ul className="-my-5 divide-y divide-gray-200">
                  {recentBlogs.length === 0 ? (
                    <p className="text-sm text-gray-500 italic text-center py-4">
                      Aucun article disponible
                    </p>
                  ) : (
                    recentBlogs.map((blog) => (
                      <li key={blog.id} className="py-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {blog.title}
                            </p>
                            <p className="text-sm text-gray-500">
                              Par {blog.author?.fullName || 'Anonyme'} •{' '}
                              {formatDate(blog.createdAt)}
                            </p>
                          </div>
                          <div className="flex-shrink-0">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                blog.isPublished
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}
                            >
                              {blog.isPublished ? 'Publié' : 'Brouillon'}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Utilisateurs récents */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Utilisateurs Récents
                </h3>
                <Link
                  href="/admin/users"
                  className="text-sm font-medium text-[#288FC4] hover:text-[#288FC4]"
                >
                  Voir tout
                </Link>
              </div>
              <div className="mt-5 flow-root">
                <ul className="-my-5 divide-y divide-gray-200">
                  {recentUsers.length === 0 ? (
                    <p className="text-sm text-gray-500 italic text-center py-4">
                      Aucun utilisateurs disponible
                    </p>
                  ) : (
                    recentUsers.map((user) => (
                      <li key={user.id} className="py-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <div className="h-8 w-8 rounded-full bg-[#288FC4] flex items-center justify-center">
                              <span className="text-sm font-medium text-white">
                                {user.fullName?.charAt(0) || user.email.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {user.fullName || 'Sans nom'}
                            </p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                          </div>
                          <div className="flex-shrink-0 text-sm text-gray-500">
                            {formatDate(user.createdAt)}
                          </div>
                        </div>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Actions rapides */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Actions Rapides</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Link
                href="/admin/blogs/create"
                className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#288FC4]"
              >
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-[#288FC4]"
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
                </div>
                <div className="flex-1 min-w-0">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-gray-900">Nouvel Blog</p>
                  <p className="text-sm text-gray-500">Créer un article</p>
                </div>
              </Link>

              <Link
                href="/admin/users/create"
                className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#288FC4]"
              >
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-[#288FC4]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-gray-900">Nouvel Utilisateur</p>
                  <p className="text-sm text-gray-500">Ajouter un membre</p>
                </div>
              </Link>

              <Link
                href="/admin/blogs"
                className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#288FC4]"
              >
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-[#288FC4]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-gray-900">Gérer Blogs</p>
                  <p className="text-sm text-gray-500">Voir tous les articles</p>
                </div>
              </Link>

              <Link
                href="/admin/users"
                className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#288FC4]"
              >
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-[#288FC4]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-gray-900">Gérer Utilisateurs</p>
                  <p className="text-sm text-gray-500">Voir tous les membres</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
