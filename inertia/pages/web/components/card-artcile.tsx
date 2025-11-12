import ArrowRightIcon from "./icons/arrow-right";

export default function CardArticle() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <a href="#">
        <img
          className="rounded-lg w-full bg-cover bg-center"
          src="https://flowbite.com/docs/images/blog/image-2.jpg"
          alt=""
        />
      </a>
      <div className="pt-5">
        <div className="flex items-center gap-1 mb-2">
          <span className="font-medium text-sm text-[#20729D]">Astuces</span>
          <span className="font-normal text-sm text-[#E5E5E5]">|</span>
          <span className="font-normal text-sm text-[#525252]">Jan 24, 2025</span>
        </div>
        <a href="#">
          <h5 className="text-gray-900 font-semibold text-[16px] tracking-tight mb-2">
            Découvrez le nouveau Stack : la plateforme de documentation que vous connaissez, rendue
            intuitive grâce à l'IA.
          </h5>
        </a>
        <p className="font-normal text-[#737373] text-[14px] mb-4 line-clamp-3">
          Nous avons aidé des milliers d'équipes à documenter leurs connaissances et à créer des
          documents publics incroyables pour leurs utilisateurs. Notre objectif a toujours été
          d'être votre plateforme de référence pour la création et la collaboration autour de
          documentations exceptionnelles. Aujourd'hui, nous allons encore plus loin, avec des
          solutions pour vous aider à rassembler toutes vos connaissances techniques en un seul
          endroit.
        </p>
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
