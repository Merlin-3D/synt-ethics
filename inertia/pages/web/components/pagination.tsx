// components/pagination.tsx
import ArrowRightIcon from './icons/arrow-right'

interface PaginationMeta {
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

interface PaginationProps {
  meta: PaginationMeta
  onPageChange?: (page: number) => void
}

export default function Pagination({ meta, onPageChange }: PaginationProps) {
  // Fonction pour générer les numéros de page à afficher
  const generatePageNumbers = () => {
    const { currentPage, lastPage } = meta
    const pages = []
    const maxVisiblePages = 5

    if (lastPage <= maxVisiblePages) {
      // Si le nombre total de pages est inférieur ou égal au maximum visible
      for (let i = 1; i <= lastPage; i++) {
        pages.push(i)
      }
    } else {
      // Logique pour afficher les pages autour de la page courante
      let startPage = Math.max(1, currentPage - 2)
      let endPage = Math.min(lastPage, currentPage + 2)

      if (currentPage <= 3) {
        endPage = maxVisiblePages
      } else if (currentPage >= lastPage - 2) {
        startPage = lastPage - maxVisiblePages + 1
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
      }

      // Ajouter les ellipses si nécessaire
      if (startPage > 1) {
        if (startPage > 2) {
          pages.unshift('...')
        }
        pages.unshift(1)
      }
      if (endPage < lastPage) {
        if (endPage < lastPage - 1) {
          pages.push('...')
        }
        pages.push(lastPage)
      }
    }

    return pages
  }

  const handlePageClick = (page: number, event: React.MouseEvent) => {
    if (onPageChange) {
      event.preventDefault()
      onPageChange(page)
    }
  }

  const pageNumbers = generatePageNumbers()

  return (
    <nav className="flex items-center w-full mt-6 justify-between border-t border-gray-200 px-4 sm:px-0 dark:border-white/10">
      {/* Bouton Previous */}
      <div className="-mt-px flex w-0 flex-1">
        <a
          href={meta.previousPageUrl || '#'}
          onClick={(e) => meta.previousPageUrl && handlePageClick(meta.currentPage - 1, e)}
          className={`inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium ${
            meta.previousPageUrl
              ? 'text-gray-500 hover:border-[#20729D] hover:text-[#20729D] cursor-pointer'
              : 'text-gray-300 cursor-not-allowed'
          }`}
        >
          <ArrowRightIcon
            aria-hidden="true"
            className={`mr-3 size-5 rotate-180 ${
              meta.previousPageUrl ? 'text-[#20729D]' : 'text-gray-300'
            }`}
          />
          Previous
        </a>
      </div>

      {/* Numéros de page */}
      <div className="hidden md:-mt-px md:flex">
        {pageNumbers.map((page, index) =>
          page === '...' ? (
            <span
              key={`ellipsis-${index}`}
              className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500"
            >
              ...
            </span>
          ) : (
            <a
              key={page}
              href={`/?page=${page}`}
              onClick={(e) => handlePageClick(page as number, e)}
              className={`inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium ${
                page === meta.currentPage
                  ? 'border-[#20729D] text-[#20729D] dark:border-[#20729D]'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              {page}
            </a>
          )
        )}
      </div>

      {/* Bouton Next */}
      <div className="-mt-px flex w-0 flex-1 justify-end">
        <a
          href={meta.nextPageUrl || '#'}
          onClick={(e) => meta.nextPageUrl && handlePageClick(meta.currentPage + 1, e)}
          className={`inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium ${
            meta.nextPageUrl
              ? 'text-gray-500 hover:border-[#20729D] hover:text-[#20729D] cursor-pointer'
              : 'text-gray-300 cursor-not-allowed'
          }`}
        >
          Next
          <ArrowRightIcon
            aria-hidden="true"
            className={`ml-3 size-5 ${meta.nextPageUrl ? 'text-[#20729D]' : 'text-gray-300'}`}
          />
        </a>
      </div>
    </nav>
  )
}
