import { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import Country from './country.js'
import Continents from './continent.js'

export default class Resources extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare title: string

  @column()
  declare description: string

  @column()
  declare document: string

  @column()
  declare countryId: string

  @column()
  declare continentId: string

  @column()
  declare classification: string

  @column()
  declare size: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @belongsTo(() => Country, {
    foreignKey: 'countryId',
  })
  declare country: BelongsTo<typeof Country>

  @belongsTo(() => Continents, {
    foreignKey: 'continentId',
  })
  declare continent: BelongsTo<typeof Continents>
}
