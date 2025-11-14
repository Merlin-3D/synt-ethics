// components/search-modal.tsx
import { useState, useEffect } from 'react'
import { router } from '@inertiajs/react'
import SearchIcon from './icons/search.icon'
import XMarkIcon from './icons/xmark.icon'
import Input from '~/components/input'

export interface SearchResult {
  id: string
  title: string
  description: string
  writingDate: string
  type: string
  category?: {
    label: string
  }
  [key: string]: any
}

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
  searchEndpoint: string
  placeholder?: string
  title?: string
  resultKey?: string
  type?: string
  onResultClick?: (result: SearchResult) => void
  minQueryLength?: number
}

export default function SearchModal({
  isOpen,
  onClose,
  searchEndpoint,
  placeholder = 'Tapez votre recherche...',
  title = 'Rechercher',
  resultKey = 'data',
  onResultClick,
  minQueryLength = 2,
  type,
}: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)

  // Fonction de recherche
  const handleSearch = async (query: string) => {
    setSearchQuery(query)

    if (query.length < minQueryLength) {
      setSearchResults([])
      return
    }

    setIsSearching(true)
    try {
      const response = await fetch(`${searchEndpoint}?q=${encodeURIComponent(query)}`)
      const result = await response.json()
      setSearchResults(
        type ? result[resultKey].filter((item: any) => item.type === type) : result[resultKey] || []
      )
    } catch (error) {
      console.error('Erreur lors de la recherche:', error)
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }

  // Gestion du clic sur un résultat
  const handleResultClick = (result: SearchResult) => {
    if (onResultClick) {
      onResultClick(result)
    } else {
      // Comportement par défaut : navigation vers la page de détail
      router.visit(`/blog/${result.id}`)
    }
    onClose()
  }

  // Fermer le modal avec la touche Echap
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
      // Reset la recherche quand le modal s'ouvre
      setSearchQuery('')
      setSearchResults([])
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'auto'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[80vh] flex flex-col">
        {/* Header du modal */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Barre de recherche dans le modal */}
        <div className="p-4 border-b">
          <Input
            placeholder={placeholder}
            startIcon={<SearchIcon className="h-5 w-5" />}
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            autoFocus
          />
        </div>

        {/* Résultats de recherche */}
        <div className="flex-1 overflow-y-auto">
          {isSearching ? (
            <div className="p-8 text-center text-gray-500">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#20729D]"></div>
              <p className="mt-2">Recherche en cours...</p>
            </div>
          ) : searchQuery.length > 0 && searchResults.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              Aucun résultat trouvé pour "{searchQuery}"
            </div>
          ) : searchResults.length > 0 ? (
            <div className="p-4 space-y-4">
              {searchResults.map((result) => (
                <div
                  key={result.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleResultClick(result)}
                >
                  <h4 className="font-semibold text-gray-900 mb-2">{result.title}</h4>
                  <p className="text-sm text-gray-600 line-clamp-2">{result.description}</p>
                  <div className="flex items-center justify-between mt-3">
                    {result.category && (
                      <span className="text-xs text-gray-500">{result.category.label}</span>
                    )}
                    <span className="text-xs text-gray-500">
                      {new Date(result.writingDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              Tapez au moins {minQueryLength} caractères pour commencer la recherche
            </div>
          )}
        </div>

        {/* Footer du modal */}
        <div className="p-4 border-t bg-gray-50">
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>Appuyez sur Echap pour fermer</span>
            <span>{searchResults.length} résultat(s)</span>
          </div>
        </div>
      </div>
    </div>
  )
}
