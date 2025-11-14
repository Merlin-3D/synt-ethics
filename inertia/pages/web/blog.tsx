import Input from '~/components/input'
import Banner from './layouts/banner'
import SearchIcon from './components/icons/search.icon'
import heroBlog from '~/assets/images/hero-blog.png'
import Footer from './layouts/footer'
import CardBlog from './components/card-blog'
import { ArticleResponse } from '~/dto/article'
import Pagination from './components/pagination'
import { Head, router } from '@inertiajs/react'
import { useSearchModal } from './hooks/use-search-modal'
import SearchModal, { SearchResult } from './components/search-modal'

interface BlogProps {
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
  categories: { id: string; label: string }[]
  selectedCategory?: string | null
}

export default function Blog({ data, categories, selectedCategory: initialCategory }: BlogProps) {
  const { isSearchModalOpen, openSearchModal, closeSearchModal } = useSearchModal()

  const handleCategoryClick = (categoryId: string) => {
    if (initialCategory === categoryId) {
      router.get('/blog')
    } else {
      router.get('/blog', { category: categoryId })
    }
  }

  const clearFilter = () => {
    router.get('/blog')
  }

  // Gestion personnalisée du clic sur un résultat (optionnel)
  const handleResultClick = (result: SearchResult) => {
    router.visit(`/blog/${result.id}`)
  }

  return (
    <div className="p-1">
      <Head title="Blog" />

      <Banner
        title={<>Notre Blog</>}
        hero={heroBlog}
        children={
          <>
            <div className="flex justify-center mb-16 mt-4">
              <p className="font-normal text-[18px] text-[#EAF4F9]">
                commentaires, analyses de l'actualité et des manifestations académiques
              </p>
            </div>
            <div className="container mx-auto max-w-3xl">
              <div onClick={openSearchModal}>
                <Input
                  placeholder="Rechercher blog..."
                  startIcon={<SearchIcon className="h-5 w-5" />}
                  readOnly
                />
              </div>
            </div>
          </>
        }
      />

      {/* Modal de recherche réutilisable */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={closeSearchModal}
        searchEndpoint="/api/search/articles/type/1"
        placeholder="Tapez le titre d'un blog..."
        title="Rechercher des blog"
        onResultClick={handleResultClick}
        minQueryLength={2}
        type="1"
      />

      <section className="p-4 xl:px-0 mx-auto max-w-6xl lg:my-16">
        {initialCategory && (
          <div className="mb-4 flex items-center gap-2">
            <span className="text-sm text-gray-600">Filtre actif :</span>
            <div className="bg-[#20729D] text-white text-sm rounded-xl px-3 py-1 flex items-center gap-2">
              {categories.find((cat) => cat.id === initialCategory)?.label}
              <button onClick={clearFilter} className="text-white hover:text-gray-200 ml-1">
                ×
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-3 pb-8">
          {categories.map((item, i) => {
            const isSelected = initialCategory === item.id
            return (
              <div
                onClick={() => handleCategoryClick(item.id)}
                key={i}
                className={`
                  border text-sm rounded-xl p-2 cursor-pointer transition-all duration-200
                  ${
                    isSelected
                      ? 'border-[#20729D] bg-[#20729D] text-white'
                      : 'border-gray-200 text-gray-700 hover:border-[#20729D] hover:text-[#20729D]'
                  }
                `}
              >
                {item.label}
              </div>
            )
          })}
        </div>

        <div className="flex flex-col gap-6">
          {data.data.map((article, index) => (
            <CardBlog key={index} article={article} />
          ))}
        </div>

        {data.data.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Aucun article trouvé pour cette catégorie.
          </div>
        )}

        <Pagination meta={data.meta} />
      </section>
      <Footer />
    </div>
  )
}
