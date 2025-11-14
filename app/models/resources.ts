import { DateTime } from 'luxon'

import { BaseModel, column } from '@adonisjs/lucid/orm'

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
}
