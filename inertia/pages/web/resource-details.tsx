import Input from '~/components/input'
import Footer from './layouts/footer'
import Header from './layouts/header'
import AutoComplete from './components/auto-complete'
import { useState, useEffect } from 'react'
import { ResourceResponse } from '~/dto/resource'
import { classifications, formatDate2, formatFileSize } from '~/utils/common'
import PdfIcon from './components/icons/pdf-icon'
import { Head, router, usePage } from '@inertiajs/react'
import ProjectIcon from './components/icons/project.icon'
import classNames from 'classnames'

interface ResourceDetailsProps {
  continent: {
    id: string
    name: string
    nameFr: string
    resources?: ResourceResponse[]
  }
  continents: {
    id: string
    name: string
    nameFr: string
    resources?: ResourceResponse[]
  }[]
  resources: ResourceResponse[]
  countries: {
    id: string
    name: string
    region: string
    subregion: string
    resources?: ResourceResponse[]
  }[]
  country: string
  classification: string
}

export default function ResourceDetails({
  continents,
  countries,
  continent,
  resources,
  country: countrySelected,
  classification: classificationSelected,
}: ResourceDetailsProps) {
  const { props } = usePage<any>()

  const [continentData, setContinentData] = useState<{
    id: string
    name: string
    nameFr: string
    resources?: ResourceResponse[]
  } | null>(null)

  const [classification, setClassification] = useState<{
    id: string
    label: string
  }>()

  // Ajouter l'état pour la recherche
  const [searchTerm, setSearchTerm] = useState<string>('')

  useEffect(() => {
    const fecthDefaultData = () => {
      setContinentData(continent)
    }
    fecthDefaultData()
  }, [continent, countries])

  useEffect(() => {
    const fecthDefaultData = () => {
      setClassification(classifications.find((item) => item.id === classificationSelected))
    }
    fecthDefaultData()
  }, [classificationSelected])

  // Filtrer les ressources basé sur le terme de recherche
  const filteredResources = resources.filter((resource) =>
    resource.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <Head title="Ressources" />

      <div className={`bg-cover`}>
        <Header />
        <section className="mx-auto max-w-6xl">
          <div className="container mx-auto flex py-16 items-center justify-center flex-col">
            <div className=" w-full pt-24 px-4 xl:px-0">
              <a href={'/resources'} className="flex items-center cursor-pointer mb-4">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.0007 22.6666L13.334 18L18.0007 13.3333"
                    stroke="#0A0A0A"
                    stroke-width="1.33333"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M22.6673 18H13.334"
                    stroke="#0A0A0A"
                    stroke-width="1.33333"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <span className="text-base text-medium text-[#101828]">Ressources</span>
              </a>

              {/* Input de recherche */}
              <Input
                placeholder="Nom de la ressource"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </section>

        <section className="bg-[#F5F5F5] py-16 px-4 xl:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mx-auto max-w-6xl">
            <div className="col-span-8 lg:col-span-4 flex flex-col justify-between bg-white p-4 rounded-xl">
              <div>
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Continents
                  </label>
                  <AutoComplete<{
                    id: string
                    name: string
                    nameFr: string
                    resources?: ResourceResponse[]
                  }>
                    data={continents}
                    selected={continentData!}
                    getLabel={(value) => `${value?.nameFr!} (${value?.resources?.length || 0})`}
                    getKey={(value) => value!.id}
                    onSelected={(value) => {
                      setContinentData(value)
                      router.visit(`/resource/continent/${value.id}`)
                    }}
                    label="Sélectionnez le continent"
                    className="mt-1"
                  />{' '}
                </div>
                <ul className="mt-6 space-y-2">
                  {countries
                    .filter(
                      (item: { id: string; region: string; subregion: string }) =>
                        item.region.toLowerCase() === continent?.name.toLowerCase() ||
                        item.subregion.toLowerCase() === continent?.name.toLowerCase()
                    )
                    .map((item) => {
                      return (
                        <li>
                          <a
                            href={`/resource/continent/${continent.id}?country=${item.id}`}
                            className={classNames(
                              { 'text-[#288FC4] font-semibold': countrySelected === item.id },
                              { 'text-[#0A0A0A] font-normal': countrySelected !== item.id },
                              'cursor-pointer text-base '
                            )}
                          >
                            {item.name} ({item.resources?.length || 0})
                          </a>
                        </li>
                      )
                    })}
                  {countries.filter(
                    (item: { id: string; region: string; subregion: string }) =>
                      item.region.toLowerCase() === continent?.name.toLowerCase() ||
                      item.subregion.toLowerCase() === continent?.name.toLowerCase()
                  ).length === 0 && (
                    <div className="col-span-2 flex items-center w-full justify-center py-8 text-gray-500">
                      <div className="max-w-md mx-auto flex flex-col justify-center items-center">
                        <h3 className="mt-4 text-lg font-medium text-gray-400">Aucun pays</h3>
                        <p className="mt-2 text-sm text-gray-300">Aucun pays disponibles.</p>
                      </div>
                    </div>
                  )}
                </ul>
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Classifications
                </label>
                <AutoComplete<{
                  id: string
                  label: string
                }>
                  data={classifications}
                  getLabel={(value) => value!.label}
                  getKey={(value) => value!.id}
                  label="Sélectionnez la classification"
                  selected={classification!}
                  onSelected={(value) => {
                    setClassification(value)
                    router.visit(
                      `/resource/continent/${continent.id}?classification=${value.id}&country=${countrySelected || ''}`
                    )
                  }}
                  className="mt-1"
                />{' '}
              </div>
            </div>

            <div className="col-span-8  bg-white p-4 rounded-xl">
              <h5 className="block text-sm font-normal text-gray-700">
                {filteredResources.length} ressources disponibles
              </h5>
              <div className="grid lg:grid-cols-2 md:grid-cols-2 mt-6 gap-3">
                {filteredResources.map((item) => {
                  return (
                    <div className="flex flex-col items-start justify-start gap-2 border border-gray-200 text-sm rounded-md px-2 py-4 cursor-pointer">
                      <h1 className="flex items-center gap-2">
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5 8.4375C3.10417 8.4375 1.5625 6.89583 1.5625 5C1.5625 3.10417 3.10417 1.5625 5 1.5625C6.89583 1.5625 8.4375 3.10417 8.4375 5C8.4375 6.89583 6.89583 8.4375 5 8.4375ZM5 2.1875C3.45 2.1875 2.1875 3.45 2.1875 5C2.1875 6.55 3.45 7.8125 5 7.8125C6.55 7.8125 7.8125 6.55 7.8125 5C7.8125 3.45 6.55 2.1875 5 2.1875Z"
                            fill="#292D32"
                          />
                          <path
                            d="M5 6.5625C4.1375 6.5625 3.4375 5.8625 3.4375 5C3.4375 4.1375 4.1375 3.4375 5 3.4375C5.8625 3.4375 6.5625 4.1375 6.5625 5C6.5625 5.8625 5.8625 6.5625 5 6.5625ZM5 4.0625C4.48333 4.0625 4.0625 4.48333 4.0625 5C4.0625 5.51667 4.48333 5.9375 5 5.9375C5.51667 5.9375 5.9375 5.51667 5.9375 5C5.9375 4.48333 5.51667 4.0625 5 4.0625Z"
                            fill="#292D32"
                          />
                          <path
                            d="M5 1.97921C4.82917 1.97921 4.6875 1.83754 4.6875 1.66671V0.833374C4.6875 0.662541 4.82917 0.520874 5 0.520874C5.17083 0.520874 5.3125 0.662541 5.3125 0.833374V1.66671C5.3125 1.83754 5.17083 1.97921 5 1.97921Z"
                            fill="#292D32"
                          />
                          <path
                            d="M1.66732 5.3125H0.833984C0.663151 5.3125 0.521484 5.17083 0.521484 5C0.521484 4.82917 0.663151 4.6875 0.833984 4.6875H1.66732C1.83815 4.6875 1.97982 4.82917 1.97982 5C1.97982 5.17083 1.83815 5.3125 1.66732 5.3125Z"
                            fill="#292D32"
                          />
                          <path
                            d="M5 9.47921C4.82917 9.47921 4.6875 9.33754 4.6875 9.16671V8.33337C4.6875 8.16254 4.82917 8.02087 5 8.02087C5.17083 8.02087 5.3125 8.16254 5.3125 8.33337V9.16671C5.3125 9.33754 5.17083 9.47921 5 9.47921Z"
                            fill="#292D32"
                          />
                          <path
                            d="M9.16732 5.3125H8.33398C8.16315 5.3125 8.02148 5.17083 8.02148 5C8.02148 4.82917 8.16315 4.6875 8.33398 4.6875H9.16732C9.33815 4.6875 9.47982 4.82917 9.47982 5C9.47982 5.17083 9.33815 5.3125 9.16732 5.3125Z"
                            fill="#292D32"
                          />
                        </svg>
                        <span className="text-[#737373] font-normal text-[12px]">
                          {item.country.name}
                        </span>
                      </h1>

                      <h5 className="text-gray-900 font-medium text-[16px] tracking-tight">
                        {item.title}
                      </h5>
                      <p className="font-normal text-[#737373] text-[12px] line-clamp-3">
                        {item.description}
                      </p>
                      <hr className="h-[0.5px] w-full bg-[#737379]" />
                      <div className="flex items-center gap-4">
                        <a target="_blank" href={`${props.filePath}/demo/${item.document}`}>
                          <PdfIcon className="h-16 w-16" />
                        </a>
                        <div className="flex flex-col items-start">
                          <a
                            target="_blank"
                            href={`${props.filePath}/demo/${item.document}`}
                            className="text-gray-900 font-medium text-[16px] tracking-tight"
                          >
                            {item.document}
                          </a>
                          <span className="text-[#737379] font-normal text-xs">
                            {formatFileSize(Number(item.size))}
                          </span>
                        </div>
                      </div>
                      <i className="text-[#737379] font-normal text-xs">
                        Ajouté le {formatDate2(item.createdAt)}
                      </i>
                    </div>
                  )
                })}

                {filteredResources.length === 0 && (
                  <div className="col-span-2 flex items-center w-full justify-center py-8 text-gray-500">
                    <div className="max-w-md mx-auto flex flex-col justify-center items-center">
                      <ProjectIcon className="mx-auto h-16 w-16 text-gray-100" />
                      <h3 className="mt-4 text-lg font-medium text-gray-400">Aucune resource</h3>
                      <p className="mt-2 text-sm text-gray-300">Aucune ressources disponibles.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}
