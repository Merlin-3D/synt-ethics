import React from 'react'
import AdminLayout from '../layout'
import { Head, useForm, Link } from '@inertiajs/react'

interface Category {
  id: string
  label: string
}

interface EditCategoryProps {
  category: Category
}

export default function EditCategory({ category }: EditCategoryProps) {
  const { data, setData, put, processing, errors } = useForm({
    label: category.label,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    put(`/admin/categories/${category.id}`)
  }

  return (
    <AdminLayout title="Modifier la Catégorie">
      <Head title="Modifier la Catégorie - Administration" />

      <div className="space-y-6">
        {/* En-tête */}
        <div>
          <div className="flex items-start space-x-2">
            <Link href="/admin/categories" className="text-[#288FC4] mt-1 hover:text-[#288FC4]">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </Link>
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-gray-900">Modifier la Catégorie</h1>
              <p className="mt-1 text-sm text-gray-500">
                Modifiez le nom de la catégorie &quot;{category.label}&quot;
              </p>
            </div>
          </div>
        </div>

        {/* Formulaire */}
        <div className="bg-white">
          <form onSubmit={handleSubmit} className="space-y-8 p-8">
            <div>
              <label htmlFor="label" className="block text-sm font-medium text-gray-700">
                Nom de la catégorie
              </label>
              <input
                type="text"
                id="label"
                name="label"
                required
                value={data.label}
                onChange={(e) => setData('label', e.target.value)}
                className={`mt-2 block w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#288FC4]/20 focus:border-[#288FC4] text-gray-900 placeholder-gray-500 ${
                  errors.label
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                placeholder="Ex : Technologie, Actualités, Tutoriels..."
              />
              {errors.label && <p className="mt-1 text-sm text-red-600">{errors.label}</p>}
            </div>

            {/* Boutons d'action */}
            <div className="flex justify-end space-x-3">
              <Link
                href="/admin/categories"
                className="inline-flex items-center px-6 py-3 border-2 border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#288FC4] transition-all duration-200"
              >
                Annuler
              </Link>
              <button
                type="submit"
                disabled={processing}
                className="inline-flex items-center px-6 py-3 border-2 border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#288FC4] hover:bg-[#288FC4] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#288FC4] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {processing ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Modification...
                  </>
                ) : (
                  'Modifier la catégorie'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  )
}

