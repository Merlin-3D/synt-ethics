import Input from '~/components/input'
import Banner from './layouts/banner'
import SearchIcon from './components/icons/search.icon'
import heroActualities from '~/assets/images/hero-actualities.png'
import CardArticle from './components/card-artcile'
import divider from '~/assets/images/divider.png'
import Footer from './layouts/footer'
import ArrowRightIcon from './components/icons/arrow-right'

export default function Actualities() {
  return (
    <div className="p-1">
      <Banner
        title={<>Actualités</>}
        hero={heroActualities}
        children={
          <>
            <div className="container mx-auto max-w-3xl mt-16">
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
          <div className="grid grid-cols-2 gap-6 mt-10">
            <CardArticle />
            <CardArticle />
          </div>
          <div className="grid grid-cols-3 gap-6 mt-6">
            <CardArticle />
            <CardArticle />
            <CardArticle />
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
        </div>
      </section>
      <Footer />
    </div>
  )
}
