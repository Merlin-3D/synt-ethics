import Header from './header'

interface BannerProps {
  title: React.ReactNode
  hero: string
  children: React.ReactNode
}
export default function Banner({ title, hero, children }: BannerProps) {
  return (
    <div className={`bg-[url(${hero})] bg-cover`}>
      <Header />
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 pb-16 pt-32 items-center justify-center flex-col">
          <div className="text-center lg:w-4/4 w-full pt-56">
            <h1 className="title-font sm:text-6xl leading-8 text-4xl mb-4 font-semibold text-white">
              {title}
            </h1>
            {children}
          </div>
        </div>
      </section>
    </div>
  )
}
