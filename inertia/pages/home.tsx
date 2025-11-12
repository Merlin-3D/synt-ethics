import Input from '~/components/input'
import hero from '~/assets/images/hero.png'
import divider from '~/assets/images/divider.png'
import SearchIcon from './web/components/icons/search.icon'
import CardArticle from './web/components/card-artcile'
import Footer from './web/layouts/footer'
import Banner from './web/layouts/banner'

export default function Home() {
  return (
    <div className="p-1">
      <Banner
        title={
          <>
            Vulgarisation des enjeux du recours aux <br />
            données artificielles en recherche
            <br /> médicale
          </>
        }
        hero={hero}
        children={
          <>
            <div className="flex justify-center mb-16 mt-10">
              <button className="inline-flex text-white bg-[#288FC4] border-0 py-3 px-3 focus:outline-none hover:bg-[#6BB1CF] rounded-xl text-lg">
                Consultez tous nos articles
              </button>
              <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-3 px-3 focus:outline-none hover:bg-gray-200 rounded-xl text-lg">
                Contactez-nous
              </button>
            </div>
            <div className="container mx-auto max-w-3xl">
              <Input
                placeholder="Search articles..."
                startIcon={<SearchIcon className="h-5 w-5" />}
              />
            </div>
          </>
        }
      />

      <section className="mx-auto max-w-6xl">
        <div className="relative my-2">
          <div aria-hidden="true" className="absolute inset-0 flex items-center">
            <div className={`w-full border-t border-gray-200`} />
          </div>
          <div className="relative flex justify-center text-sm/6 font-medium">
            <span className={`px-3 bg-white text-gray-300`}>
              <img src={divider} alt="" className="" />
            </span>
          </div>
        </div>

        <div className="flex flex-col items-start my-20">
          <h1 className="font-semibold text-[32px] text-[#0A0A0A]">Publications récentes</h1>
          <p className="font-normal text-base text-[#737373] max-w-xl mt-2">
            Bienvenue sur le blog Synt. Ethics, où nous partageons des conseils d'experts, des
            astuces bien-être pour vous aider à améliorer votre pratique
          </p>

          <div className="grid grid-cols-2 gap-6 mt-10">
            <CardArticle />
            <CardArticle />
          </div>
          <div className="grid grid-cols-3 gap-6 mt-6">
            <CardArticle />
            <CardArticle />
            <CardArticle />
          </div>

          <div className="cursor-pointer flex items-center justify-center w-full border border-gray-200 rounded-xl p-4 mt-10">
            <span className="font-semibold font-text">Voir Plus</span>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
