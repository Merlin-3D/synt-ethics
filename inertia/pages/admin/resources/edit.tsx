import { Head, Link, useForm, usePage } from '@inertiajs/react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import AdminLayout from '../layout'
import Input from '~/components/input'
import SelectMenu from '~/pages/web/components/select-menu'
import AutoComplete from '~/pages/web/components/auto-complete'
import { classifications } from '~/utils/common'
import { isEmpty } from 'lodash'
import { ResourceResponse } from '~/dto/resource'

interface EditResourceProps {
  resource: ResourceResponse
}

export default function EditResources({ resource }: EditResourceProps) {
  const { props } = usePage<any>()

  const { data, setData, put, processing, errors } = useForm({
    title: resource.title,
    description: resource.description,
    countryId: resource.countryId,
    continentId: resource.continentId,
    classification: resource.classification,
  })

  const [continent, setContinent] = useState<{
    id: string
    name: string
    nameFr: string
  } | null>(null)

  const [country, setCountry] = useState<{
    id: string
    name: string
  } | null>(null)

  const [classification, setClassification] = useState<{
    id: string
    label: string
  } | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (classification && country && continent) {
      put(`/admin/resources/${resource.id}/edit`, {
        onSuccess: (data) => {
          data.props.success !== null
            ? toast.success(`${data.props.success}`)
            : data.props.error !== null && toast.error(`${data.props.error}`)
        },
      })
    } else {
      toast.error('Tous les champs obligatoires doivent être renseignés.')
    }
  }

  useEffect(() => {
    const fecthDefaultData = () => {
      setContinent(resource.continent)
      setCountry(resource.country)
      setClassification(classifications.find((item: any) => item.id === resource.classification)!)
    }
    fecthDefaultData()
  }, [resource])

  return (
    <AdminLayout title="Nouvelle ressource">
      <Head title="Nouvelle ressource" />{' '}
      <div>
        <div className="flex items-start space-x-2">
          <Link href="/admin/resources" className="text-[#288FC4] mt-1 hover:text-[#288FC4]">
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
            <h1 className="text-2xl font-bold text-gray-900">Modifier la ressource</h1>
            <p className="mt-1 text-sm text-gray-500">Modifiez la resource "{resource.title}"</p>
          </div>
        </div>

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

            {/* Catégorie et Pays */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Continents <span className="text-red-600">*</span>
                </label>
                <AutoComplete<{
                  id: string
                  name: string
                  nameFr: string
                }>
                  data={props.continents}
                  selected={continent!}
                  getLabel={(value) => value?.nameFr!}
                  getKey={(value) => value!.id}
                  onSelected={(value) => {
                    setData('continentId', value.id)
                    setContinent(value)
                  }}
                  label="Sélectionnez le continent"
                  className="mt-2"
                />
                {errors.continentId && (
                  <p className="mt-1 text-sm text-red-600">{errors.continentId}</p>
                )}
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Pays <span className="text-red-600">*</span>
                </label>

                <AutoComplete<{
                  id: string
                  name: string
                }>
                  data={props.countries.filter(
                    (item: { id: string; region: string; subregion: string }) =>
                      item.region.toLowerCase() === continent?.name.toLowerCase() ||
                      item.subregion.toLowerCase() === continent?.name.toLowerCase()
                  )}
                  selected={country!}
                  getLabel={(value) => value?.name!}
                  getKey={(value) => value!.id}
                  onSelected={(value) => {
                    setData('countryId', value.id)
                    setCountry(value)
                  }}
                  disabled={isEmpty(continent)}
                  label="Sélectionnez le pays"
                  className="mt-2"
                />
                {errors.countryId && (
                  <p className="mt-1 text-sm text-red-600">{errors.countryId}</p>
                )}
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Classifications <span className="text-red-600">*</span>
                </label>

                <SelectMenu<{
                  id: string
                  label: string
                }>
                  data={classifications}
                  getLabel={(value) => value!.label}
                  getKey={(value) => value!.id}
                  label="Sélectionnez la classification"
                  selected={classification!}
                  onSelected={(value) => {
                    setData('classification', value.id)
                    setClassification(value)
                  }}
                  className="mt-2 "
                  block
                />
                {errors.classification && (
                  <p className="mt-1 text-sm text-red-600">{errors.classification}</p>
                )}
              </div>
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
                    Modification...
                  </>
                ) : (
                  'Modifier la ressource'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  )
}
