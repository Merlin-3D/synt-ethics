import CardArticle from './components/card-artcile'
import Footer from './layouts/footer'
import Header from './layouts/header'

export default function ArticleDetail() {
  return (
    <div className="p-2">
      <div className={`bg-[#F5F5F5] bg-cover`}>
        <Header />
        <section className="mx-auto max-w-3xl">
          <div className="container mx-auto flex py-16 items-center justify-center flex-col">
            <div className="text-left w-full pt-24">
              <div className="flex items-center cursor-pointer mb-4">
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
                <span className="text-sm text-medium text-[#525252]">Blog</span>
              </div>
              <div className="flex items-center gap-1 mb-2">
                <span className="font-medium text-sm text-[#525252]">Astuces</span>
                <span className="font-normal text-sm text-[#E5E5E5]">|</span>
                <span className="font-normal text-sm text-[#525252]">Jan 24, 2025</span>
              </div>
              <h1 className="title-font sm:text-[32px] text-3xl mb-4 font-semibold text-[#0A0A0A]">
                Descript’s internal guide for using Linear as your work operating system
              </h1>
              <p className="title-font sm:text-sm text-sm mb-4 font-normal text-[#525252]">
                Duis nisl neque aliquam phasellus leo blandit. Mauris dictumst tincidunt quam neque
                vitae ridiculus massa. Facilisis aliquam ut sit dignissim sollicitudin ullamcorper
                vel ultrices consequat. Accumsan habitasse ipsum blandit et urna tincidunt. Integer
                nibh ultrices nisl sed ac convallis.
              </p>
            </div>
          </div>
        </section>
      </div>
      <section className="mx-auto max-w-3xl mt-16">
        <div>
          <p className="title-font sm:text-sm text-sm mb-4 font-normal text-[#525252]">
            Duis nisl neque aliquam phasellus leo blandit. Mauris dictumst tincidunt quam neque
            vitae ridiculus massa. Facilisis aliquam ut sit dignissim sollicitudin ullamcorper vel
            ultrices consequat. Accumsan habitasse ipsum blandit et urna tincidunt. Integer nibh
            ultrices nisl sed ac convallis.
          </p>
          <p className="title-font sm:text-sm text-sm mb-4 font-normal text-[#525252]">
            Duis nisl neque aliquam phasellus leo blandit. Mauris dictumst tincidunt quam neque
            vitae ridiculus massa. Facilisis aliquam ut sit dignissim sollicitudin ullamcorper vel
            ultrices consequat. Accumsan habitasse ipsum blandit et urna tincidunt. Integer nibh
            ultrices nisl sed ac convallis.
          </p>
        </div>

        <div>
          <h1 className="title-font sm:text-[32px] text-3xl mb-4 font-semibold text-[#0A0A0A]">
            Understanding the Importance of Feedback
          </h1>
          <p className="title-font sm:text-sm text-sm mb-4 font-normal text-[#525252]">
            Duis nisl neque aliquam phasellus leo blandit. Mauris dictumst tincidunt quam neque
            vitae ridiculus massa. Facilisis aliquam ut sit dignissim sollicitudin ullamcorper vel
            ultrices consequat. Accumsan habitasse ipsum blandit et urna tincidunt. Integer nibh
            ultrices nisl sed ac convallis.
          </p>
        </div>

        <div>
          <p className="title-font sm:text-sm text-sm mb-4 font-normal text-[#525252]">
            Duis nisl neque aliquam phasellus leo blandit. Mauris dictumst tincidunt quam neque
            vitae ridiculus massa. Facilisis aliquam ut sit dignissim sollicitudin ullamcorper vel
            ultrices consequat. Accumsan habitasse ipsum blandit et urna tincidunt. Integer nibh
            ultrices nisl sed ac convallis.
          </p>
          <p className="title-font sm:text-sm text-sm mb-4 font-normal text-[#525252]">
            Duis nisl neque aliquam phasellus leo blandit. Mauris dictumst tincidunt quam neque
            vitae ridiculus massa. Facilisis aliquam ut sit dignissim sollicitudin ullamcorper vel
            ultrices consequat. Accumsan habitasse ipsum blandit et urna tincidunt. Integer nibh
            ultrices nisl sed ac convallis.
          </p>
        </div>

        <div>
          <h1 className="title-font sm:text-[32px] text-3xl mb-4 font-semibold text-[#0A0A0A]">
            Understanding the Importance of Feedback
          </h1>
          <p className="title-font sm:text-sm text-sm mb-4 font-normal text-[#525252]">
            Duis nisl neque aliquam phasellus leo blandit. Mauris dictumst tincidunt quam neque
            vitae ridiculus massa. Facilisis aliquam ut sit dignissim sollicitudin ullamcorper vel
            ultrices consequat. Accumsan habitasse ipsum blandit et urna tincidunt. Integer nibh
            ultrices nisl sed ac convallis.
          </p>
          <p className="title-font sm:text-sm text-sm mb-4 font-normal text-[#525252]">
            Duis nisl neque aliquam phasellus leo blandit. Mauris dictumst tincidunt quam neque
            vitae ridiculus massa. Facilisis aliquam ut sit dignissim sollicitudin ullamcorper vel
            ultrices consequat. Accumsan habitasse ipsum blandit et urna tincidunt. Integer nibh
            ultrices nisl sed ac convallis.
          </p>
        </div>
      </section>

      <section className="bg-[#F5F5F5] mt-16 mb-4">
        <div className="mx-auto max-w-6xl py-16 flex flex-col">
          <h1 className="text-[32px] font-semibold text-[#0A0A0A]">Articles similaires</h1>
          <div className="grid grid-cols-3 gap-6 mt-6">
            <CardArticle />
            <CardArticle />
            <CardArticle />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
