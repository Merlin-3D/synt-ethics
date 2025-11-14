import React, { useState } from 'react'
import AdminLayout from '../layout'
import { Head, Link, useForm } from '@inertiajs/react'
import DocumentIcon from '~/pages/web/components/icons/document.icon'
import { formatDate } from '~/utils/common'

interface Blog {
  id: string
  title: string
  description: string
  category: { id: string; label: string }
  writingDate: string
  isPublished: boolean
  createdAt: string
  author: {
    fullName: string | null
  }
  coverImage?: string | null
  readTime?: number
  views?: number
}

interface BlogsIndexProps {
  blogs: Blog[]
}

export default function BlogsIndex({ blogs }: BlogsIndexProps) {
  const { delete: destroy } = useForm()
  const [searchTerm, setSearchTerm] = useState('')

  const handleDelete = (blogId: string) => {
    if (
      confirm('Êtes-vous sûr de vouloir supprimer cet article ? Cette action est irréversible.')
    ) {
      destroy(`/admin/blogs/${blogId}`)
    }
  }

  const getStatusBadge = (isPublished: boolean) => {
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
          isPublished
            ? 'bg-green-100 text-green-800 border-green-200'
            : 'bg-yellow-100 text-yellow-800 border-yellow-200'
        }`}
      >
        {isPublished ? (
          <>
            <svg className="w-2 h-2 mr-1" fill="currentColor" viewBox="0 0 8 8">
              <circle cx="4" cy="4" r="3" />
            </svg>
            Publié
          </>
        ) : (
          'Non Publié'
        )}
      </span>
    )
  }

  const getInitials = (name: string | null) => {
    if (!name) return 'A'
    return name
      .split(' ')
      .map((part) => part.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  // Filtrage des blogs
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  return (
    <AdminLayout title="Gestion des Articles">
      <Head title="Articles" />

      <div className="space-y-6">
        {/* En-tête avec statistiques */}
        <div className=" ">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Gestion des Articles</h1>
                  <p className="text-gray-600 mt-1">
                    {filteredBlogs.length} article{filteredBlogs.length !== 1 ? 's' : ''} sur{' '}
                    {blogs.length} au total
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4 lg:mt-0">
              <Link
                href="/admin/blogs/create"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#288FC4] hover:bg-[#1a7cb0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#288FC4] transition-colors duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Nouvel Article
              </Link>
            </div>
          </div>
        </div>
        {/* Filtres et recherche */}
        <div className="bg-white rounded-2xl">
          <div className="grid md:grid-cols-3 justify-end gap-4">
            <div className="col-span-2"></div>
            <div className="col-span-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Titre, description"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tableau des articles */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  >
                    Article
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  >
                    Créer par
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  >
                    Catégorie
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  >
                    Statut
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBlogs.map((blog) => (
                  <tr
                    key={blog.id}
                    className="hover:bg-gray-50 transition-colors duration-150 group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-start space-x-4">
                        {blog.coverImage && (
                          <div className="flex-shrink-0">
                            <img
                              src={blog.coverImage}
                              alt={blog.title}
                              className="h-12 w-16 object-cover rounded-lg border border-gray-200"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                            {blog.title}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                            {blog.description}
                          </p>
                          <div className="mt-2 flex items-center space-x-4 text-xs text-gray-400">
                            {blog.readTime && (
                              <div className="flex items-center">
                                <svg
                                  className="w-3 h-3 mr-1"
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
                                {blog.readTime} min
                              </div>
                            )}
                            {blog.views && (
                              <div className="flex items-center">
                                <svg
                                  className="w-3 h-3 mr-1"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                  />
                                </svg>
                                {blog.views} vues
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-sm">
                            <span className="text-xs font-semibold text-white">
                              {getInitials(blog.author.fullName)}
                            </span>
                          </div>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {blog.author.fullName || 'Anonyme'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                        {blog.category.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(blog.writingDate)}</div>
                      <div className="text-xs text-gray-500">
                        Créé le {formatDate(blog.createdAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(blog.isPublished)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2 duration-200">
                        <Link
                          href={`/admin/blogs/${blog.id}/edit`}
                          className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                        >
                          <svg
                            className="-ml-1 mr-1 h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                          Modifier
                        </Link>
                        <button
                          onClick={() => handleDelete(blog.id)}
                          className="inline-flex items-center px-3 py-1.5 border border-red-300 shadow-sm text-sm font-medium rounded-lg text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                        >
                          <svg
                            className="-ml-1 mr-1 h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                          Supprimer
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Message si aucun article */}
          {filteredBlogs.length === 0 && (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <DocumentIcon className="mx-auto h-16 w-16 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">Aucun article trouvé</h3>
                <p className="mt-2 text-sm text-gray-500">
                  {searchTerm
                    ? 'Aucun article ne correspond à vos critères de recherche.'
                    : 'Commencez par créer votre premier article.'}
                </p>
                <div className="mt-6">
                  <Link
                    href="/admin/blogs/create"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#288FC4] hover:bg-[#1a7cb0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#288FC4] transition-colors duration-200"
                  >
                    <svg
                      className="-ml-1 mr-3 h-5 w-5"
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
                    Nouvel Article
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Pagination et informations */}
        {filteredBlogs.length > 0 && (
          <div className="bg-white px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-b-2xl">
            <div className="text-sm text-gray-700 mb-4 sm:mb-0">
              Affichage de <span className="font-semibold">{filteredBlogs.length}</span> article
              {filteredBlogs.length !== 1 ? 's' : ''}
              {searchTerm && <span className="text-gray-500"> pour "{searchTerm}"</span>}
            </div>

            {/* Pagination (à adapter selon vos besoins) */}
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200">
                Précédent
              </button>
              <button className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200">
                Suivant
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
