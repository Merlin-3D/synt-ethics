import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'blogs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.raw('gen_random_uuid()'))
      table.string('title').notNullable()
      table.text('description').notNullable()
      table.string('cover_image').nullable()
      table.string('category').notNullable()
      table.date('writing_date').notNullable()
      table.string('country').notNullable()
      table.text('body').notNullable()
      table.uuid('author_id').references('id').inTable('users').onDelete('CASCADE')
      table.boolean('is_published').defaultTo(false)
      table.string('slug').unique().notNullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
} 