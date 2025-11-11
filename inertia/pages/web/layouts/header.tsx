import { usePage } from '@inertiajs/react'
import EmailIcon from '../components/icons/email.icon'
import LinkedinIcon from '../components/icons/linkedin.icon'
import LogoIcon from '../components/icons/logo.icon'

const navigations = [
  {
    name: 'Accueil',
    href: '/',
  },
  {
    name: 'Actualités',
    href: '/actualities',
  },
  {
    name: 'Blog',
    href: '/blog',
  },
  {
    name: 'Ressources',
    href: 'resources',
  },
  {
    name: 'A propos',
    href: '/about-us',
  },
  {
    name: 'Winnie',
    href: '/winnie',
  },
]

export default function Header() {
  const { url } = usePage<any>()

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 bg-white shadow-md rounded-xl w-[90%] max-w-5xl z-50 pr-2">
      <div className="container mx-auto flex flex-wrap flex-col md:flex-row items-center">
        <a href="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <LogoIcon className="w-24" />
        </a>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          {navigations.map((item, i) => {
            return (
              <a
                key={i}
                href={item.href}
                className={`mr-5 hover:bg-[#0482C3] font-medium text-base ${
                  url.includes(item.href) ? 'text-[#0482C3]' : 'text-gray-700 hover:bg-gray-800'
                }`}
              >
                {item.name}
              </a>
            )
          })}
        </nav>
        <div className="flex items-center text-base">
          <EmailIcon className="h-10 w-10 cursor-pointer" />
          <LinkedinIcon className="h-10 w-10 cursor-pointer" />
        </div>
      </div>
    </header>
  )
}
