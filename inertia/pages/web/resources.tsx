import { useState } from 'react'
import SelectMenu from './components/select-menu'
import Banner from './layouts/banner'
import hero from '~/assets/images/hero-resource.png'
import Input from '~/components/input'
import Footer from './layouts/footer'
import PdfIcon from './components/icons/pdf-icon'

const continents = [
  'Europe',
  'Canada',
  'États-Unis',
  'Amérique latine',
  'Asie-pacifique',
  'Moyen-Orient',
  'Afrique',
]

export default function Resources() {
  const [continent, setContinent] = useState<{
    id: string
    name: string
  }>()
  return (
    <div className="p-1">
      <Banner
        title={<>Ressources</>}
        hero={hero}
        children={
          <div>
            <div className="flex flex-col justify-center mb-16 mt-10">
              <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <Input placeholder="Nom de la ressource" />
                <SelectMenu<{
                  id: string
                  name: string
                }>
                  data={[
                    {
                      name: 'Durward Reynolds',
                      id: '1',
                    },
                    {
                      name: 'Kenton Towne',
                      id: '2',
                    },
                  ]}
                  getLabel={(value) => value!.name}
                  getKey={(value) => value!.name}
                  label="Continent"
                  selected={continent}
                  onSelected={(value) => setContinent(value)}
                  className="w-full"
                />
                <SelectMenu<{
                  id: string
                  name: string
                }>
                  data={[
                    {
                      name: 'Durward Reynolds',
                      id: '1',
                    },
                    {
                      name: 'Kenton Towne',
                      id: '2',
                    },
                  ]}
                  getLabel={(value) => value!.name}
                  getKey={(value) => value!.name}
                  label="Continent"
                  selected={continent}
                  onSelected={(value) => setContinent(value)}
                  className="w-full"
                />
              </div>
              <div className="mt-4">
                <button className="inline-flex text-white bg-[#288FC4] border-0 py-2 px-12 focus:outline-none hover:bg-[#6BB1CF] rounded-xl text-lg">
                  Rechercher
                </button>
              </div>
            </div>
          </div>
        }
      />

      <section className="p-4 xl:px-0 mx-auto max-w-6xl lg:py-16">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-2">
          {continents.map((item) => {
            return (
              <div className="flex items-center gap-2 border border-gray-200 text-sm rounded-md px-2 py-4 cursor-pointer">
                <svg
                  width="27"
                  height="27"
                  viewBox="0 0 27 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.5 22.7812C8.38125 22.7812 4.21875 18.6188 4.21875 13.5C4.21875 8.38125 8.38125 4.21875 13.5 4.21875C18.6188 4.21875 22.7812 8.38125 22.7812 13.5C22.7812 18.6188 18.6188 22.7812 13.5 22.7812ZM13.5 5.90625C9.315 5.90625 5.90625 9.315 5.90625 13.5C5.90625 17.685 9.315 21.0938 13.5 21.0938C17.685 21.0938 21.0938 17.685 21.0938 13.5C21.0938 9.315 17.685 5.90625 13.5 5.90625Z"
                    fill="#292D32"
                  />
                  <path
                    d="M13.5 17.7188C11.1713 17.7188 9.28125 15.8288 9.28125 13.5C9.28125 11.1713 11.1713 9.28125 13.5 9.28125C15.8288 9.28125 17.7188 11.1713 17.7188 13.5C17.7188 15.8288 15.8288 17.7188 13.5 17.7188ZM13.5 10.9688C12.105 10.9688 10.9688 12.105 10.9688 13.5C10.9688 14.895 12.105 16.0312 13.5 16.0312C14.895 16.0312 16.0312 14.895 16.0312 13.5C16.0312 12.105 14.895 10.9688 13.5 10.9688Z"
                    fill="#292D32"
                  />
                  <path
                    d="M13.5 5.34387C13.0387 5.34387 12.6562 4.96137 12.6562 4.50012V2.25012C12.6562 1.78887 13.0387 1.40637 13.5 1.40637C13.9612 1.40637 14.3438 1.78887 14.3438 2.25012V4.50012C14.3438 4.96137 13.9612 5.34387 13.5 5.34387Z"
                    fill="#292D32"
                  />
                  <path
                    d="M4.50195 14.3438H2.25195C1.7907 14.3438 1.4082 13.9612 1.4082 13.5C1.4082 13.0387 1.7907 12.6562 2.25195 12.6562H4.50195C4.9632 12.6562 5.3457 13.0387 5.3457 13.5C5.3457 13.9612 4.9632 14.3438 4.50195 14.3438Z"
                    fill="#292D32"
                  />
                  <path
                    d="M13.5 25.5939C13.0387 25.5939 12.6562 25.2114 12.6562 24.7501V22.5001C12.6562 22.0389 13.0387 21.6564 13.5 21.6564C13.9612 21.6564 14.3438 22.0389 14.3438 22.5001V24.7501C14.3438 25.2114 13.9612 25.5939 13.5 25.5939Z"
                    fill="#292D32"
                  />
                  <path
                    d="M24.752 14.3438H22.502C22.0407 14.3438 21.6582 13.9612 21.6582 13.5C21.6582 13.0387 22.0407 12.6562 22.502 12.6562H24.752C25.2132 12.6562 25.5957 13.0387 25.5957 13.5C25.5957 13.9612 25.2132 14.3438 24.752 14.3438Z"
                    fill="#292D32"
                  />
                </svg>

                <span className="font-medium text-[16px] text-[#0A0A0A]">{item}</span>
              </div>
            )
          })}
        </div>
      </section>

      <hr className="hidden lg:block mx-auto max-w-6xl lg:pt-16" />

      <section className="p-4 xl:px-0 pb-16 flex flex-col items-start mx-auto max-w-6xl">
        <h1 className="font-semibold text-[32px] text-[#0A0A0A]">Ressources récentes</h1>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 mt-6 gap-3">
          {[1, 2, 3].map((_) => {
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
                  <span className="text-[#737373] font-normal text-[12px]">France</span>
                </h1>

                <h5 className="text-gray-900 font-medium text-[16px] tracking-tight">
                  Titre indicatif de la ressource
                </h5>
                <p className="font-normal text-[#737373] text-[12px] line-clamp-3">
                  Lorem ipsum dolor sit amet consectetur. Nulla dolor dis posuere purus duis
                  aliquam. Consectetur orci integer fringilla neque nec donec sit.
                </p>
                <hr className="h-[0.5px] w-full bg-[#737379]" />
                <div className="flex items-center gap-4">
                  <PdfIcon className="h-16 w-16" />
                  <div className="flex flex-col items-start">
                    <h5 className="text-gray-900 font-medium text-[16px] tracking-tight">
                      Organize media projects .pdf
                    </h5>
                    <span className="text-[#737379] font-normal text-xs">5 MB</span>
                  </div>
                </div>
                <i className="text-[#737379] font-normal text-xs">Ajouté le 15/02/2025</i>
              </div>
            )
          })}
        </div>
      </section>

      <Footer />
    </div>
  )
}
