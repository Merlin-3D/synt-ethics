export interface ArticleResponse {
  id: string
  title: string
  description: string
  category: { id: string; label: string }
  writingDate: string
  categoryId: string
  isPublished: boolean
  createdAt: string
  type: string
  content: string
  author: {
    fullName: string | null
  }
  coverImage?: string | null
}
