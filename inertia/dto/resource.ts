export interface ContinentResponse {
  id: string
  name: string
  nameFr: string
  createdAt: string // ISO date
  updatedAt: string // ISO date
}

export interface CountryResponse {
  id: string
  name: string
  region: string
  subregion: string
  createdAt: string // ISO date
  updatedAt: string // ISO date
}

export interface ResourceResponse {
  id: string
  title: string
  description: string
  document: string
  countryId: string
  continentId: string
  classification: string // si c’est un nombre, remplace par number
  size: string // si c’est en bytes en number, remplace par number
  createdAt: string // ISO date
  updatedAt: string // ISO date
  continent: ContinentResponse
  country: CountryResponse
}
