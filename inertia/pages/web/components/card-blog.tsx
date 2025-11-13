import ArrowRightIcon from './icons/arrow-right'

export default function CardBlog() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 xl:h-52">
      <div className="flex flex-col justify-between h-full">
        <div className="flex items-center gap-1 mb-2">
          <span className="font-medium text-sm text-[#20729D]">Astuces</span>
          <span className="font-normal text-sm text-[#E5E5E5]">|</span>
          <span className="font-normal text-sm text-[#525252]">Jan 24, 2025</span>
        </div>
        <div>
          <a href="/article/123456">
            <h5 className="text-gray-900 font-medium text-[28px] tracking-tight mb-2">
              Utiliser des heatmaps pour améliorer l'UX de votre site web : 5 façons de commencer
            </h5>
          </a>
          <p className="font-normal text-[#737373] text-[14px] mb-4 line-clamp-2">
            Nous avons aidé des milliers d'équipes à documenter leurs connaissances et à créer des
            documents publics incroyables pour leurs utilisateurs. Notre objectif a toujours été
            d'être votre plateforme de référence pour la création et la collaboration autour de
            documentations exceptionnelles. Aujourd'hui, nous allons encore plus loin, avec des
            solutions pour vous aider à rassembler toutes vos connaissances techniques en un seul
            endroit.
          </p>
        </div>
        <a
          className="text-[#20729D] font-semibold rounded-lg text-base text-center inline-flex items-center"
          href="#"
        >
          Lire la suite <ArrowRightIcon className="h-6 w-10" />
        </a>
      </div>
    </div>
  )
}
