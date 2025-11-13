import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'articles'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.raw('gen_random_uuid()'))
      table.string('title').notNullable()
      table.text('description').notNullable()
      table.uuid('category_id').references('id').inTable('categories').onDelete('CASCADE')
      table.string('type').notNullable()
      table.date('writing_date').notNullable()
      table.text('content').notNullable()
      table.uuid('author_id').references('id').inTable('users').onDelete('CASCADE')
      table.boolean('is_published').defaultTo(false)

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
      table.text('cover_image').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
