import Banner from './layouts/banner'
import heroAbout from '~/assets/images/hero-about.png'
import aboutTarget from '~/assets/images/about-target.png'
import Footer from './layouts/footer'

export default function AboutUs() {
  return (
    <div className="p-1">
      <Banner
        title={<>Qui sommes-nous ?</>}
        hero={heroAbout}
        children={
          <>
            <div className="flex justify-center mb-16 mt-4">
              <p className="font-normal text-[18px] text-[#EAF4F9]">
                Découvrez un espace de réflexion et de partage sur l'avenir <br /> des données
                synthétiques en recherche médicale.
              </p>
            </div>
          </>
        }
      />
      <section className="flex flex-col mx-auto max-w-6xl my-16">
        <div className="flex flex-wrap">
          <div className="flex flex-cebter items-center gap-1 border border-gray-200 text-[#288FC4] text-xs rounded-xl px-2 py-1">
            <svg
              width="12"
              height="14"
              viewBox="0 0 12 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.59961 0.599976L0.599609 7.79998H5.99961L5.39961 12.6L11.3996 5.39998H5.99961L6.59961 0.599976Z"
                stroke="#288FC4"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Mission + Valeurs
          </div>
        </div>
        <p className="text-[40px] font-semibold text-[#A4ACB9] leading-10 mt-4">
          <span className="text-[#0D0D12]">
            Ce blog est né du besoin de partager nos recherches avec un public plus large.
          </span>
          En travaillant sur les données synthétiques, nous avons rapidement constaté le manque de
          littérature francophone, surtout lorsqu’il s’agit des enjeux juridiques éthiques et
          juridiques liés à leur usage en recherche médicale.
        </p>
        <div className="grid grid-cols-2 gap-8 my-16">
          <div className={`bg-[url(${aboutTarget})] bg-cover rounded-xl`}></div>
          <div className="flex flex-col gap-8">
            <div className="border border-gray-200 text-sm rounded-xl p-8">
              <h1 className="text-[32px] font-semibold text-[#0D0D12]">Notre mission</h1>
              <p className="text-base font-normal text-[#666D80] mt-8">
                L’objectif de ce blog est donc simple : divulguer et commenter l’actualité relative
                à l’utilisation des données artificielles ou synthétiques comme alternative aux
                données de santé réelles des patients. À terme, ce site a vocation à devenir un
                espace collaboratif et une véritable vitrine de la recherche francophone sur ce
                sujet émergent.
              </p>
            </div>
            <div className="border border-gray-200 text-sm rounded-xl p-8">
              <h1 className="text-[32px] font-semibold text-[#0D0D12]">Nos valeurs</h1>
              <p className="text-base font-normal text-[#666D80] mt-8">
                Nos valeurs guident chaque réflexion et chaque publication de ce site. Nous croyons
                en l’accessibilité, pour rendre simples et claires des questions souvent complexes
                autour des données synthétiques de santé. <br /> Nous plaçons l’éthique et le
                respect de la vie privée des patients au cœur de chaque publication, tout en
                maintenant une rigueur scientifique et académique dans nos analyses. <br />
                Nous cultivons l’ouverture, en confrontant les points de vue et en croisant les
                regards transnationaux. Enfin, nous défendons une innovation responsable, qui met
                les technologies émergentes – comme les données artificielles – au service du
                progrès scientifique, sans jamais compromettre les droits fondamentaux.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
