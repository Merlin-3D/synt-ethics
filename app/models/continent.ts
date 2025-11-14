import { DateTime } from 'luxon'

import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'

export default class Continents extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare nameFr: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}
