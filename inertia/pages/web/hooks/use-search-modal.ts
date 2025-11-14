import { useState } from 'react'

export function useSearchModal() {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)

  const openSearchModal = () => setIsSearchModalOpen(true)
  const closeSearchModal = () => setIsSearchModalOpen(false)

  return {
    isSearchModalOpen,
    openSearchModal,
    closeSearchModal,
  }
}
