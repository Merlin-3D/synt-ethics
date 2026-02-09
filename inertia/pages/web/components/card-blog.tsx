import { ArticleResponse } from '~/dto/article'
import ArrowRightIcon from './icons/arrow-right'
import { formatDate2 } from '~/utils/common'

interface CardBlogProps {
  article: ArticleResponse
}

export default function CardBlog({ article }: CardBlogProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <div className="flex flex-col justify-between h-full">
        <div className="flex items-center gap-1 mb-2">
          <span className="font-medium text-sm text-[#20729D]">{article.category.label}</span>
          <span className="font-normal text-sm text-[#E5E5E5]">|</span>
          <span className="font-normal text-sm text-[#525252]">
            {formatDate2(article.writingDate)}
          </span>
        </div>
        <div>
          <a href={`/article/${article.id}`}>
            <h5 className="text-gray-900 font-medium text-[28px] tracking-tight mb-2 line-clamp-2">
              {article.title}
            </h5>
          </a>
          <p className="font-normal text-[#737373] text-[14px] mb-4 line-clamp-2">
            {article.description}
          </p>
        </div>
        <a
          className="text-[#20729D] font-semibold rounded-lg text-base text-center inline-flex items-center"
          href={`/article/${article.id}`}
        >
          Lire la suite <ArrowRightIcon className="h-6 w-10" />
        </a>
      </div>
    </div>
  )
}
