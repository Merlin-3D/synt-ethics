import React, { useState } from 'react'
import AdminLayout from '../layout'
import { Head, useForm, Link } from '@inertiajs/react'
import TipTapEditor from '../../../components/TipTapEditor'

interface Blog {
  id: string
  title: string
  description: string
  coverImage: string | null
  category: string
  writingDate: string
  country: string
  body: string
  isPublished: boolean
}

interface EditBlogProps {
  blog: Blog
}

export default function EditBlog({ blog }: EditBlogProps) {
  const { data, setData, put, processing, errors } = useForm({
    title: blog.title,
    description: blog.description,
    coverImage: blog.coverImage || '',
    category: blog.category,
    writingDate: blog.writingDate,
    country: blog.country,
    body: blog.body,
    isPublished: blog.isPublished,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    put(`/admin/blogs/${blog.id}`)
  }

  const categories = [
    'Technologie',
    'Voyage',
    'Cuisine',
    'Mode',
    'Sport',
    'Santé',
    'Éducation',
    'Business',
    'Lifestyle',
    'Autre'
  ]

  const countries = [
    'France',
    'États-Unis',
    'Canada',
    'Royaume-Uni',
    'Allemagne',
    'Espagne',
    'Italie',
    'Japon',
    'Australie',
    'Brésil',
    'Inde',
    'Chine',
    'Autre'
  ]

  return (
    <AdminLayout title="Modifier le Blog">
      <Head title="Modifier le Blog - Administration" />
      
      <div className="space-y-6">
        {/* En-tête */}
        <div>
          <div className="flex items-center space-x-2">
            <Link
              href="/admin/blogs"
              className="text-indigo-600 hover:text-indigo-500"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Modifier le Blog</h1>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Modifiez l'article "{blog.title}"
          </p>
        </div>

        {/* Formulaire */}
        <div className="bg-white shadow-lg rounded-xl border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-8 p-8">
            {/* Titre */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Titre *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={data.title}
                onChange={(e) => setData('title', e.target.value)}
                className={`mt-2 block w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-gray-900 placeholder-gray-500 ${
                  errors.title ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-200 hover:border-gray-300'
                }`}
                placeholder="Entrez le titre de votre article"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                required
                value={data.description}
                onChange={(e) => setData('description', e.target.value)}
                className={`mt-2 block w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-gray-900 placeholder-gray-500 resize-none ${
                  errors.description ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-200 hover:border-gray-300'
                }`}
                placeholder="Entrez une brève description de votre article"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description}</p>
              )}
            </div>

            {/* Image de couverture */}
            <div>
              <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700">
                Image de couverture
              </label>
              <input
                type="file"
                id="coverImage"
                name="coverImage"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    setData('coverImage', file)
                  }
                }}
                className={`mt-2 block w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 ${
                  errors.coverImage ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-200 hover:border-gray-300'
                }`}
              />
              {blog.coverImage && (
                <div className="mt-2">
                  <p className="text-sm text-gray-500 mb-2">Image actuelle :</p>
                  <img 
                    src={blog.coverImage} 
                    alt="Couverture actuelle" 
                    className="w-32 h-24 object-cover rounded-lg border border-gray-200"
                  />
                </div>
              )}
              {errors.coverImage && (
                <p className="mt-1 text-sm text-red-600">{errors.coverImage}</p>
              )}
            </div>

            {/* Catégorie et Pays */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Catégorie *
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  value={data.category}
                  onChange={(e) => setData('category', e.target.value)}
                  className={`mt-2 block w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-gray-900 bg-white ${
                    errors.category ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <option value="">Sélectionnez une catégorie</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                )}
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                  Pays *
                </label>
                <select
                  id="country"
                  name="country"
                  required
                  value={data.country}
                  onChange={(e) => setData('country', e.target.value)}
                  className={`mt-2 block w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-gray-900 bg-white ${
                    errors.country ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <option value="">Sélectionnez un pays</option>
                  {countries.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                {errors.country && (
                  <p className="mt-1 text-sm text-red-600">{errors.country}</p>
                )}
              </div>
            </div>

            {/* Date de rédaction */}
            <div>
              <label htmlFor="writingDate" className="block text-sm font-medium text-gray-700">
                Date de rédaction *
              </label>
              <input
                type="date"
                id="writingDate"
                name="writingDate"
                required
                value={data.writingDate}
                onChange={(e) => setData('writingDate', e.target.value)}
                className={`mt-2 block w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-gray-900 bg-white ${
                  errors.writingDate ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-200 hover:border-gray-300'
                }`}
              />
              {errors.writingDate && (
                <p className="mt-1 text-sm text-red-600">{errors.writingDate}</p>
              )}
            </div>

            {/* Contenu du blog */}
            <div>
              <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-2">
                Contenu de l'article *
              </label>
              <TipTapEditor
                content={data.body}
                onChange={(content) => setData('body', content)}
                placeholder="Commencez à rédiger votre article..."
              />
              {errors.body && (
                <p className="mt-2 text-sm text-red-600">{errors.body}</p>
              )}
            </div>

            {/* Statut de publication */}
            <div className="flex items-center">
              <input
                id="isPublished"
                name="isPublished"
                type="checkbox"
                checked={data.isPublished}
                onChange={(e) => setData('isPublished', e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="isPublished" className="ml-2 block text-sm text-gray-900">
                Publier immédiatement
              </label>
            </div>

            {/* Boutons d'action */}
            <div className="flex justify-end space-x-3">
              <Link
                href="/admin/blogs"
                className="inline-flex items-center px-6 py-3 border-2 border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
              >
                Annuler
              </Link>
              <button
                type="submit"
                disabled={processing}
                className="inline-flex items-center px-6 py-3 border-2 border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
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
                  'Modifier le blog'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  )
} 