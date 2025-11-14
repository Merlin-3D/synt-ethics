import { DateTime } from 'luxon'

import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Country extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare region: string

  @column()
  declare subregion: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}
