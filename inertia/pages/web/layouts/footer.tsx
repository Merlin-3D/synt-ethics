import EmailIcon from '../components/icons/email.icon'
import LinkedinIcon from '../components/icons/linkedin.icon'
import LogoIcon from '../components/icons/logo.icon'
import divider from '~/assets/images/divider.png'

export default function Footer() {
  return (
    <footer className="text-gray-600 body-font bg-[#F5F5F5] py-16 p-4 xl:px-0 ">
      <div className="max-w-6xl mx-auto relative my-2">
        <div aria-hidden="true" className="absolute inset-0 flex items-center">
          <div className={`w-full border-t border-gray-200`} />
        </div>
        <div className="relative flex justify-center text-sm/6 font-medium">
          <span className={`px-3 bg-[#F5F5F5] text-gray-300`}>
            <img src={divider} alt="" className="" />
          </span>
        </div>
      </div>
      <div className="container max-w-6xl pt-16 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div className="w-72 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
          <a
            href="/home"
            className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900"
          >
            <LogoIcon className="w-24" />
          </a>
          <p className="mt-2 text-sm font-normal text-[#737373]">
            Vulgarisation des enjeux du recours aux données artificielles en recherche médicale
          </p>
          <div className="flex items-center text-base mt-2 sm:justify-start justify-center">
            <a href="mailto:w.f.dongbouwamba@syntethicsprivacy.eu" target="_blank">
              <EmailIcon className="h-10 w-10 cursor-pointer" />{' '}
            </a>
            <a href="https://www.linkedin.com/company/syntethics-privacy" target="_blank">
              <LinkedinIcon className="h-10 w-10 cursor-pointer" />
            </a>
          </div>
        </div>
        <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
          <div className=" lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3"></h2>
            <nav className="list-none mb-10"></nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-normal text-[#0A0A0A] tracking-widest text-base mb-3">
              Menu
            </h2>
            <nav className="list-none mb-10 space-y-2">
              <li>
                <a href="/home" className="text-[#737373] font-normal hover:text-gray-800">
                  Accueil
                </a>
              </li>
              <li>
                <a href="/actualities" className="text-[#737373] font-normal hover:text-gray-800">
                  Actualités
                </a>
              </li>
              <li>
                <a href="/blog" className="text-[#737373] font-normal hover:text-gray-800">
                  Blog
                </a>
              </li>
              <li>
                <a href="/about-us" className="text-[#737373] font-normal hover:text-gray-800">
                  A propos
                </a>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3"></h2>
            <nav className="list-none mb-10"></nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full">
            <h2 className="title-font font-normal text-[#0A0A0A] tracking-widest text-base mb-3">
              Autres
            </h2>
            <nav className="list-none mb-10 space-y-2">
              <li>
                <a href="#" className="text-[#737373] font-normal hover:text-gray-800">
                  Politique de confidentialité
                </a>
              </li>
              <li>
                <a href="#" className="text-[#737373] font-normal hover:text-gray-800">
                  Mentions légales
                </a>
              </li>
              <li>
                <a href="#" className="text-[#737373] font-normal hover:text-gray-800">
                  Contactez-nous
                </a>
              </li>
            </nav>
          </div>
        </div>
      </div>
      <div className="">
        <div className="container mx-auto max-w-6xl pt-16 flex flex-wrap items-center justify-center flex-col sm:flex-row">
          <p className="text-gray-500 text-sm text-center sm:text-left">
            © {new Date().getFullYear()} SyntEthics Privacy.
          </p>
        </div>
      </div>
    </footer>
  )
}
