import Input from '~/components/input'
import Banner from './layouts/banner'
import SearchIcon from './components/icons/search.icon'
import heroBlog from '~/assets/images/hero-blog.png'
import Footer from './layouts/footer'
import CardBlog from './components/card-blog'
import ArrowRightIcon from './components/icons/arrow-right'

const categories = [
  'Catégories',
  'Analyses',
  'Articles scientifiques',
  'Manifestations',
  'Découvertes',
]

export default function Blog() {
  return (
    <div className="p-1">
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
              <Input
                placeholder="Rechercher blog..."
                startIcon={<SearchIcon className="h-5 w-5" />}
              />
            </div>
          </>
        }
      />
      <section className="mx-auto max-w-6xl my-16">
        <div className="flex flex-wrap gap-3 pb-8">
          {categories.map((item) => {
            return (
              <div className="border border-gray-200 text-sm rounded-xl p-2 cursor-pointer">
                {item}
              </div>
            )
          })}
        </div>

        <div className="flex flex-col gap-6">
          {[1, 2, 3, 4, 5, 6].map((_) => {
            return <CardBlog />
          })}
        </div>
        <nav className="flex items-center w-full mt-6 justify-between border-t border-gray-200 px-4 sm:px-0 dark:border-white/10">
          <div className="-mt-px flex w-0 flex-1">
            <a
              href="#"
              className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-[#20729D] hover:text-[#20729D]"
            >
              <ArrowRightIcon
                aria-hidden="true"
                className="mr-3 size-5 rotate-180 text-[#20729D]"
              />
              Previous
            </a>
          </div>
          <div className="hidden md:-mt-px md:flex">
            <a
              href="#"
              className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            >
              1
            </a>
            <a
              href="#"
              aria-current="page"
              className="inline-flex items-center border-t-2 border-[#20729D] px-4 pt-4 text-sm font-medium text-[#20729D] dark:border-[#20729D]"
            >
              2
            </a>
            <a
              href="#"
              className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            >
              3
            </a>
            <span className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500">
              ...
            </span>
            <a
              href="#"
              className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            >
              8
            </a>
            <a
              href="#"
              className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            >
              9
            </a>
            <a
              href="#"
              className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            >
              10
            </a>
          </div>
          <div className="-mt-px flex w-0 flex-1 justify-end">
            <a
              href="#"
              className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-[#20729D] hover:text-[#20729D]"
            >
              Next
              <ArrowRightIcon
                aria-hidden="true"
                className="ml-3 size-5 text-gray-400 dark:text-gray-500"
              />
            </a>
          </div>
        </nav>
      </section>
      <Footer />
    </div>
  )
}
