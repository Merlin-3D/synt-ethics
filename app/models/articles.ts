import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Categories from './category.js'

export default class Articles extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare title: string

  @column()
  declare description: string

  @column()
  declare coverImage: string | null

  @column()
  declare categoryId: string

  @column.date()
  declare writingDate: DateTime

  @column()
  declare type: string

  @column()
  declare content: string

  @column()
  declare authorId: string

  @column()
  declare isPublished: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @belongsTo(() => User, {
    foreignKey: 'authorId',
  })
  declare author: BelongsTo<typeof User>

  @belongsTo(() => Categories, {
    foreignKey: 'categoryId',
  })
  declare category: BelongsTo<typeof Categories>
}
