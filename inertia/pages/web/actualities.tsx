import Input from '~/components/input'
import Banner from './layouts/banner'
import SearchIcon from './components/icons/search.icon'
import heroActualities from '~/assets/images/hero-actualities.png'
import CardArticle from './components/card-artcile'
import divider from '~/assets/images/divider.png'
import Footer from './layouts/footer'
import { ArticleResponse } from '~/dto/article'
import Pagination from './components/pagination'
import SearchModal, { SearchResult } from './components/search-modal'
import { useSearchModal } from './hooks/use-search-modal'
import { Head, router } from '@inertiajs/react'

interface ActualitiesProps {
  data: {
    data: ArticleResponse[]
    meta: {
      total: number
      perPage: number
      currentPage: number
      lastPage: number
      firstPage: number
      firstPageUrl: string | null
      lastPageUrl: string | null
      nextPageUrl: string | null
      previousPageUrl: string | null
    }
  }
}

export default function Actualities({ data }: ActualitiesProps) {
  const { isSearchModalOpen, openSearchModal, closeSearchModal } = useSearchModal()

  const handleResultClick = (result: SearchResult) => {
    router.visit(`/actualities/${result.id}`)
  }
  return (
    <div className="p-1">
      <Head title="Actualités" />

      <Banner
        title={<>Actualités</>}
        hero={heroActualities}
        children={
          <>
            <div className="container mx-auto max-w-3xl mt-16">
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

        <div className="p-4 xl:px-0 flex flex-col items-start my-20">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 mt-6">
            {data.data.map((article, index) => (
              <CardArticle key={index} article={article} />
            ))}
          </div>

          {data.data.length === 0 && (
            <div className="text-center py-8 text-gray-500">Aucune actualié trouvé.</div>
          )}
          <Pagination meta={data.meta} />
        </div>
      </section>

      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={closeSearchModal}
        searchEndpoint="/api/search/articles/type/0"
        placeholder="Tapez le titre d'une actualité..."
        title="Rechercher des actualités"
        onResultClick={handleResultClick}
        minQueryLength={2}
        type="0"
      />
      <Footer />
    </div>
  )
}
