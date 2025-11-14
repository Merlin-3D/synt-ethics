import React, { ChangeEvent, useState } from 'react'
import AdminLayout from '../layout'
import { Head, useForm, Link, usePage } from '@inertiajs/react'
import Input from '~/components/input'
import EditorQuill from '../components/editor-with-use-quill'
import SelectMenu from '~/pages/web/components/select-menu'
import { toast } from 'react-toastify'
import { types } from '~/utils/common'

export default function CreateBlog() {
  const { props } = usePage<any>()

  const { data, setData, post, processing, errors, reset } = useForm({
    title: '',
    description: '',
    coverImage: null as File | null,
    categoryId: '',
    writingDate: '',
    type: '',
    content: '',
    isPublished: false,
  })

  const [editorContent, setEditorContent] = useState('')
  const [category, setCategory] = useState<{
    id: string
    label: string
  } | null>(null)

  const [type, setType] = useState<{
    id: string
    label: string
  } | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post('/admin/blogs/create', {
      onSuccess: (data) => {
        reset()
        setCategory(null)
        setType(null)
        setEditorContent('')
        data.props.success !== null
          ? toast.success(`${data.props.success}`)
          : data.props.error !== null && toast.error(`${data.props.error}`)
      },
    })
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]

      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/web']
      if (!allowedTypes.includes(selectedFile.type)) {
        toast.error('Seuls les fichiers PNG et JPEG sont autorisés.')
        return
      }

      if (selectedFile.size > 3 * 1024 * 1024) {
        toast.warning('La taille du fichier ne doit pas dépasser 3 Mo.')
        return
      }
      setData('coverImage', selectedFile as any)
      handleChangeImage(selectedFile)
    }
  }

  const handleChangeImage = async (file: File) => {
    await readFileAsDataURL(file)
  }

  const readFileAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    })
  }

  return (
    <AdminLayout title="Nouveau Blog">
      <Head title="Nouveau Blog" />

      <div className="space-y-6">
        <div>
          <div className="flex items-start space-x-2">
            <Link href="/admin/blogs" className="text-[#288FC4] mt-1 hover:text-[#288FC4]">
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
              <h1 className="text-2xl font-bold text-gray-900">Nouveau Blog</h1>
              <p className="mt-1 text-sm text-gray-500">Créez un nouvel article de blog</p>
            </div>
          </div>
        </div>

        {/* Formulaire */}
        <div className="bg-white border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-8 p-8">
            {/* Titre */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Titre <span className="text-red-600">*</span>
              </label>
              <Input
                type="text"
                id="title"
                name="title"
                required
                value={data.title}
                onChange={(e) => setData('title', e.target.value)}
                className={`mt-2 ${
                  errors.title
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                placeholder="Entrez le titre de votre article"
              />
              {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description <span className="text-red-600">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                required
                value={data.description}
                onChange={(e) => setData('description', e.target.value)}
                className={`mt-2 w-full px-3 py-2 z-10 border rounded-lg focus:outline-none focus:ring-1 bg-white text-gray-900 focus:ring-[#6BB1CF] focus:border-[#6BB1CF] ${
                  errors.description
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                    : 'border-gray-200 hover:border-gray-300'
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
              <Input
                type="file"
                id="coverImage"
                name="coverImage"
                accept="image/png, image/jpeg, image/jpg, image/web"
                onChange={handleFileChange}
                className={` ${
                  errors.coverImage
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              />
              {errors.coverImage && (
                <p className="mt-1 text-sm text-red-600">{errors.coverImage}</p>
              )}
            </div>

            {/* Catégorie et Pays */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Catégorie <span className="text-red-600">*</span>
                </label>
                <SelectMenu<{
                  id: string
                  label: string
                }>
                  data={props.categories}
                  getLabel={(value) => value!.label}
                  getKey={(value) => value!.id}
                  label="Sélectionnez la catégorie"
                  selected={category!}
                  onSelected={(value) => {
                    setData('categoryId', value.id)
                    setCategory(value)
                  }}
                  className="mt-2 py-"
                  block
                />
                {errors.categoryId && (
                  <p className="mt-1 text-sm text-red-600">{errors.categoryId}</p>
                )}
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Type d'article <span className="text-red-600">*</span>
                </label>

                <SelectMenu<{
                  id: string
                  label: string
                }>
                  data={types}
                  getLabel={(value) => value!.label}
                  getKey={(value) => value!.id}
                  label="Sélectionnez le type d'artcile"
                  selected={type!}
                  onSelected={(value) => {
                    setData('type', value.id)
                    setType(value)
                  }}
                  className="mt-2 "
                  block
                />
                {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type}</p>}
              </div>
            </div>
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                Date de rédaction <span className="text-red-600">*</span>
              </label>
              <Input
                type="date"
                id="writingDate"
                name="writingDate"
                required
                value={data.writingDate}
                onChange={(e) => setData('writingDate', e.target.value)}
                className={`mt-2 ${
                  errors.writingDate
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              />
              {errors.writingDate && (
                <p className="mt-1 text-sm text-red-600">{errors.writingDate}</p>
              )}
            </div>
            {/* Contenu du blog */}
            <div>
              <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-2">
                Contenu de l'article <span className="text-red-600">*</span>
              </label>
              <EditorQuill
                handleButtonClick={(editorContent) => {
                  setData('content', editorContent)
                  setEditorContent(editorContent)
                }}
                initialContent={editorContent}
              />
              {errors.content && <p className="mt-2 text-sm text-red-600">{errors.content}</p>}
            </div>

            {/* Statut de publication */}
            <div className="flex items-center">
              <input
                id="isPublished"
                name="isPublished"
                type="checkbox"
                checked={data.isPublished}
                onChange={(e) => setData('isPublished', e.target.checked)}
                className="h-4 w-4 text-[#288FC4] focus:ring-[#288FC4] border-gray-300 rounded"
              />
              <label htmlFor="isPublished" className="ml-2 block text-sm text-gray-900">
                Publier immédiatement
              </label>
            </div>

            {/* Boutons d'action */}
            <div className="flex justify-end space-x-3">
              <Link
                href="/admin/blogs"
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#288FC4]"
              >
                Annuler
              </Link>
              <button
                type="submit"
                disabled={processing}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#288FC4] hover:bg-[#288FC4] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#288FC4] disabled:opacity-50 disabled:cursor-not-allowed"
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
                    Création...
                  </>
                ) : (
                  "Créer l'article"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  )
}
