import { Head, Link, useForm, usePage } from '@inertiajs/react'
import AdminLayout from '../layout'
import { ResourceResponse } from '~/dto/resource'
import { useState } from 'react'
import PdfIcon from '~/pages/web/components/icons/pdf-icon'
import { classifications, formatDate, formatFileSize } from '~/utils/common'
import ProjectIcon from '~/pages/web/components/icons/project.icon'

interface ResourcesIndexProps {
  resources: ResourceResponse[]
}
export default function ResourcesIndex({ resources }: ResourcesIndexProps) {
  const { delete: destroy } = useForm()
  const { props } = usePage<any>()

  const [searchTerm, setSearchTerm] = useState('')

  const handleDelete = (blogId: string) => {
    if (
      confirm('Êtes-vous sûr de vouloir supprimer cette ressource ? Cette action est irréversible.')
    ) {
      destroy(`/admin/resources/${blogId}`)
    }
  }

  // Filtrage des resources
  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesSearch
  })

  return (
    <AdminLayout title="Gestion des ressources">
      <Head title="Ressources" />
      <div className="space-y-6">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Ressources</h1>
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
              Nouvelle ressource
            </Link>
          </div>
        </div>

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

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  >
                    Nom
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  >
                    Continent
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  >
                    Pays
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  >
                    Classification
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
                    Taille
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
                {filteredResources.map((resource) => (
                  <tr
                    key={resource.id}
                    className="hover:bg-gray-50 transition-colors duration-150 group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-start space-x-4">
                        <PdfIcon className="h-16 w-16" />
                        <div className="flex-1 min-w-0">
                          <a
                            href={`${props.filePath}/documents/${resource.document}`}
                            target="_blank"
                            className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200"
                          >
                            {resource.title}
                          </a>
                          <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                            {resource.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {resource.continent.nameFr}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                        {resource.country.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                        {classifications.find((item) => item.id === resource.classification)?.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(resource.createdAt)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatFileSize(Number(resource.size))}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2 duration-200">
                        <Link
                          href={`/admin/resources/${resource.id}/edit`}
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
                          onClick={() => handleDelete(resource.id)}
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
          {filteredResources.length === 0 && (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <ProjectIcon className="mx-auto h-16 w-16 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">Aucune ressource trouvée</h3>
                <p className="mt-2 text-sm text-gray-500">
                  {searchTerm
                    ? 'Aucune resource ne correspond à vos critères de recherche.'
                    : 'Commencez par créer votre premiere ressource.'}
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
                    Nouvelle Ressource
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
