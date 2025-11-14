export const countries: { code: string; label: string }[] = [
  { code: 'ZA', label: 'Afrique du Sud' },
  { code: 'DZ', label: 'Algérie' },
  { code: 'DE', label: 'Allemagne' },
  { code: 'AO', label: 'Angola' }, // (optionnel si tu veux en rajouter)
  { code: 'SA', label: 'Arabie Saoudite' },
  { code: 'AR', label: 'Argentine' }, // (optionnel)
  { code: 'AU', label: 'Australie' },
  { code: 'AT', label: 'Autriche' }, // (optionnel)
  { code: 'BE', label: 'Belgique' }, // (optionnel)
  { code: 'BJ', label: 'Bénin' },
  { code: 'BR', label: 'Brésil' },
  { code: 'BF', label: 'Burkina Faso' },
  { code: 'CM', label: 'Cameroun' },
  { code: 'CA', label: 'Canada' },
  { code: 'CL', label: 'Chili' }, // (optionnel)
  { code: 'CN', label: 'Chine' },
  { code: 'CG', label: 'Congo' },
  { code: 'CI', label: 'Côte d’Ivoire' },
  { code: 'EG', label: 'Égypte' },
  { code: 'AE', label: 'Émirats Arabes Unis' },
  { code: 'ES', label: 'Espagne' },
  { code: 'US', label: 'États-Unis' },
  { code: 'FR', label: 'France' },
  { code: 'GA', label: 'Gabon' },
  { code: 'GB', label: 'Royaume-Uni' },
  { code: 'IN', label: 'Inde' },
  { code: 'IT', label: 'Italie' },
  { code: 'JP', label: 'Japon' },
  { code: 'KE', label: 'Kenya' },
  { code: 'MA', label: 'Maroc' },
  { code: 'ML', label: 'Mali' },
  { code: 'NE', label: 'Niger' },
  { code: 'NG', label: 'Nigéria' },
  { code: 'RU', label: 'Russie' },
  { code: 'SN', label: 'Sénégal' },
  { code: 'TG', label: 'Togo' },
  { code: 'TN', label: 'Tunisie' },
  { code: 'TR', label: 'Turquie' },
  { code: 'CD', label: 'République Démocratique du Congo' },
  { code: 'OTHER', label: 'Autre' },
]

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export const types: { id: string; label: string }[] = [
  {
    id: '0',
    label: 'Actualité',
  },
  {
    id: '1',
    label: 'Blog',
  },
]

export const classifications: { id: string; label: string }[] = [
  {
    id: '1',
    label: 'Associations',
  },
  {
    id: '2',
    label: 'Projets publics',
  },
  {
    id: '3',
    label: 'Lignes directrices et softlaw',
  },
]

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
