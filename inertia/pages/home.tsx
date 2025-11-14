import Input from '~/components/input'
import hero from '~/assets/images/hero.png'
import divider from '~/assets/images/divider.png'
import SearchIcon from './web/components/icons/search.icon'
import CardArticle from './web/components/card-artcile'
import Footer from './web/layouts/footer'
import Banner from './web/layouts/banner'
import { ArticleResponse } from '~/dto/article'
import SearchModal, { SearchResult } from './web/components/search-modal'
import { useSearchModal } from './web/hooks/use-search-modal'
import { Head, router } from '@inertiajs/react'

interface HomeProps {
  articles: ArticleResponse[]
}

export default function Home({ articles }: HomeProps) {
  const firstRowArticles = articles.slice(0, 2)
  const secondRowArticles = articles.slice(2, 5)

  const { isSearchModalOpen, openSearchModal, closeSearchModal } = useSearchModal()

  const handleResultClick = (result: SearchResult) => {
    router.visit(`/actualities/${result.id}`)
  }

  return (
    <div className="p-1">
      <Head title="Accueil" />
      <Banner
        title={
          <>
            Vulgarisation des enjeux du recours aux <br className="lg:block hidden" />
            données artificielles en recherche
            <br className="lg:block hidden" /> médicale
          </>
        }
        hero={hero}
        children={
          <>
            <div className="flex flex-col gap-4 sm:flex-row justify-center mb-16 mt-10">
              <button className=" text-white bg-[#288FC4] border-0 py-3 px-3 focus:outline-none hover:bg-[#6BB1CF] rounded-xl text-lg">
                Consultez tous nos articles
              </button>
              <button className="sm:ml-4  text-gray-700 bg-gray-100 border-0 py-3 px-3 focus:outline-none hover:bg-gray-200 rounded-xl text-lg">
                Contactez-nous
              </button>
            </div>
            <div className="container mx-auto max-w-3xl">
              <Input
                placeholder="Rechercher articles..."
                onClick={openSearchModal}
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

        <div className="p-4 xl:px-0 flex flex-col items-start my-8 sm:my-20">
          <h1 className="font-semibold text-[32px] text-[#0A0A0A]">Publications récentes</h1>
          <p className="font-normal text-base text-[#737373] max-w-xl mt-2">
            Bienvenue sur le blog Synt. Ethics, où nous partageons des conseils d'experts, des
            astuces bien-être pour vous aider à améliorer votre pratique
          </p>

          <div className="grid sm:grid-cols-2 gap-6 mt-10">
            {firstRowArticles.map((article, index) => (
              <CardArticle key={index} article={article} />
            ))}
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 mt-6">
            {secondRowArticles.map((article, index) => (
              <CardArticle key={index} article={article} />
            ))}
          </div>

          <a
            href={'/actualities'}
            className="cursor-pointer flex items-center justify-center w-full border border-gray-200 rounded-xl p-4 mt-10"
          >
            <span className="font-semibold font-text">Voir Plus</span>
          </a>
        </div>
      </section>
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={closeSearchModal}
        searchEndpoint="/api/search/articles/type/0"
        placeholder="Tapez le titre d'un article..."
        title="Rechercher des articles"
        onResultClick={handleResultClick}
        minQueryLength={2}
      />
      <Footer />
    </div>
  )
}
