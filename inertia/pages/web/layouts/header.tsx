import { useState } from 'react'
import { usePage } from '@inertiajs/react'
import EmailIcon from '../components/icons/email.icon'
import LinkedinIcon from '../components/icons/linkedin.icon'
import LogoIcon from '../components/icons/logo.icon'

const navigations = [
  { name: 'Accueil', href: '/home' },
  { name: 'Actualités', href: '/actualities' },
  { name: 'Notre Blog', href: '/blog' },
  { name: 'Ressources', href: '/resources' },
  { name: 'A propos', href: '/about-us' },
  { name: 'Fondateur', href: '/winnie' },
]

export default function Header() {
  const { url } = usePage<any>()
  const [open, setOpen] = useState(false)

  return (
    <>
      <header className="fixed top-6 left-1/2 -translate-x-1/2 bg-white shadow-md rounded-xl w-[90%] max-w-5xl z-50 px-4 py-2">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center text-gray-900">
            <LogoIcon className="w-24" />
          </a>

          <nav className="hidden lg:flex space-x-5">
            {navigations.map((item, i) => (
              <a
                key={i}
                href={item.href}
                className={`hover:text-[#0482C3] font-medium text-base ${
                  url.includes(item.href) ? 'text-[#0482C3]' : 'text-gray-700 hover:text-gray-800'
                }`}
              >
                {item.name}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <EmailIcon className="h-8 w-8 cursor-pointer" />
            <LinkedinIcon className="h-8 w-8 cursor-pointer" />
          </div>

          <button
            onClick={() => setOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 bg-black/40 z-[60]" onClick={() => setOpen(false)}>
          <div
            className="absolute top-0 left-0 h-full w-64 bg-white shadow-lg p-5 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <LogoIcon className="w-24" />
              <button onClick={() => setOpen(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="flex flex-col space-y-4">
              {navigations.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  className={`font-medium text-lg ${
                    url.includes(item.href) ? 'text-[#0482C3]' : 'text-gray-700 hover:text-gray-900'
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </nav>

            <div className="mt-auto flex gap-4 pt-6 border-t border-gray-200">
              <EmailIcon className="h-8 w-8 cursor-pointer" />
              <LinkedinIcon className="h-8 w-8 cursor-pointer" />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
