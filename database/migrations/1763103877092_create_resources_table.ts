import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'resources'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.raw('gen_random_uuid()'))
      table.string('title').notNullable()
      table.text('description').nullable()
      table.string('document').nullable()
      table.uuid('country_id').references('id').inTable('countries').onDelete('CASCADE')
      table.uuid('continent_id').references('id').inTable('continents').onDelete('CASCADE')
      table.string('classification').nullable()
      table.string('size').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
