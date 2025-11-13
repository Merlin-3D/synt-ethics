import React from 'react'
import AdminLayout from '../layout'
import { Head, useForm, Link } from '@inertiajs/react'

interface User {
  id: string
  fullName: string | null
  email: string
}

interface EditUserProps {
  user: User
}

export default function EditUser({ user }: EditUserProps) {
  const { data, setData, put, processing, errors } = useForm({
    fullName: user.fullName || '',
    email: user.email,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    put(`/admin/users/${user.id}`)
  }

  return (
    <AdminLayout title="Modifier l'Utilisateur">
      <Head title="Modifier l'Utilisateur - Administration" />
      
      <div className="space-y-6">
        {/* En-tête */}
        <div>
          <div className="flex items-center space-x-2">
            <Link
              href="/admin/users"
              className="text-[#288FC4] hover:text-[#288FC4]"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Modifier l'Utilisateur</h1>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Modifiez les informations de {user.fullName || user.email}
          </p>
        </div>

        {/* Formulaire */}
        <div className="bg-white shadow-lg rounded-xl border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-8 p-8">
            {/* Nom complet */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Nom complet
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={data.fullName}
                onChange={(e) => setData('fullName', e.target.value)}
                className={`mt-2 block w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#288FC4]/20 focus:border-[#288FC4] text-gray-900 placeholder-gray-500 ${
                  errors.fullName ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-200 hover:border-gray-300'
                }`}
                placeholder="Entrez le nom complet"
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Adresse email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                className={`mt-2 block w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#288FC4]/20 focus:border-[#288FC4] text-gray-900 placeholder-gray-500 ${
                  errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-200 hover:border-gray-300'
                }`}
                placeholder="exemple@email.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Boutons d'action */}
            <div className="flex justify-end space-x-3">
              <Link
                href="/admin/users"
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
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Modification...
                  </>
                ) : (
                  'Modifier l\'utilisateur'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  )
} 