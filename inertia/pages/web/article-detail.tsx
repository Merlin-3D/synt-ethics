import { ArticleResponse } from '~/dto/article'
import CardArticle from './components/card-artcile'
import Footer from './layouts/footer'
import Header from './layouts/header'
import { formatDate2, types } from '~/utils/common'
import { Head } from '@inertiajs/react'

interface ArticleDetailProps {
  article: ArticleResponse
  similars: ArticleResponse[]
}
export default function ArticleDetail({ article, similars }: ArticleDetailProps) {
  const pageTitle = `${article.title} | ${article.category.label} | Synt Ethics`
  const description = article.description?.slice(0, 160)
  const imageUrl = article.coverImage || ''
  const canonicalUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/article/${article.id}`
      : `/article/${article.id}`
  return (
    <div className="p-2">
      <Head title={pageTitle}>
        {/* Meta description */}
        {description && <meta name="description" content={description} />}

        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        {description && <meta property="og:description" content={description} />}
        {imageUrl && <meta property="og:image" content={imageUrl} />}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />

        {/* Twitter Card */}
        <meta name="twitter:card" content={imageUrl ? 'summary_large_image' : 'summary'} />
        <meta name="twitter:title" content={pageTitle} />
        {description && <meta name="twitter:description" content={description} />}
        {imageUrl && <meta name="twitter:image" content={imageUrl} />}
      </Head>

      <div className={`bg-[#F5F5F5] bg-cover`}>
        <Header />
        <section className="mx-auto max-w-3xl">
          <div className="container mx-auto flex py-16 items-center justify-center flex-col">
            <div className="text-left w-full pt-24">
              <a
                href={article.type === '0' ? '/actualities' : '/blog'}
                className="flex items-center cursor-pointer mb-4"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.8002 13.6L8.2002 10L11.8002 6.40002"
                    stroke="#525252"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span className="text-sm text-medium text-[#525252]">
                  {types.find((item) => item.id === article.type)?.label}
                </span>
              </a>
              <div className="flex items-center gap-1 mb-2">
                <span className="font-medium text-sm text-[#525252]">{article.category.label}</span>
                <span className="font-normal text-sm text-[#E5E5E5]">|</span>
                <span className="font-normal text-sm text-[#525252]">
                  {formatDate2(article.writingDate)}
                </span>
              </div>
              <h1 className="title-font sm:text-[32px] text-3xl mb-4 font-semibold text-[#0A0A0A]">
                {article.title}
              </h1>
              <p className="title-font sm:text-sm text-sm mb-4 font-normal text-[#525252]">
                {article.description}
              </p>
              {article.coverImage && (
                <img
                  className="rounded-lg w-full max-h-68 object-cover bg-center"
                  src={article.coverImage}
                  alt=""
                />
              )}
            </div>
          </div>
        </section>
      </div>
      <section className="mx-auto max-w-3xl mt-16">
        <div
          dangerouslySetInnerHTML={{
            __html: article?.content,
          }}
        ></div>
      </section>
      {similars ? (
        <section className="bg-[#F5F5F5] mt-16 mb-4">
          <div className="mx-auto max-w-6xl py-16 flex flex-col">
            <h1 className="text-[32px] font-semibold text-[#0A0A0A]">Articles similaires</h1>
            <div className="grid grid-cols-3 gap-6 mt-6">
              {similars
                .filter((sim) => sim.id !== article.id)
                .map((item, i) => {
                  return <CardArticle key={i} article={item} />
                })}
            </div>
          </div>
        </section>
      ) : (
        <div className="mt-16"></div>
      )}

      <Footer />
    </div>
  )
}
