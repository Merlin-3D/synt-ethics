import Input from '~/components/input'
import Header from './web/layouts/header'
import hero from '~/assets/images/hero.png'
import SearchIcon from './web/components/icons/search.icon'

export default function Home() {
  return (
    <div className="p-1">
      <div className={`bg-[url(${hero})] bg-cover`}>
        <Header />
        <section className="text-gray-600 body-font">
          <div className="container mx-auto flex px-5 pb-16 pt-32 items-center justify-center flex-col">
            <div className="text-center lg:w-4/4 w-full pt-56">
              <h1 className="title-font sm:text-6xl leading-7 text-4xl mb-4 font-semibold text-white">
                Vulgarisation des enjeux du recours aux <br />
                données artificielles en recherche
                <br /> médicale
              </h1>

              <div className="flex justify-center mb-16 mt-10">
                <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                  Button
                </button>
                <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
                  Button
                </button>
              </div>
              <div className='container mx-auto max-w-3xl'>
                <Input
                  placeholder="Search articles..."
                  startIcon={<SearchIcon className="h-5 w-5" />}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
