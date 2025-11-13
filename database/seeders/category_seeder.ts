import Category from '#models/category'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { randomUUID } from 'node:crypto'

export default class CategorySeeder extends BaseSeeder {
  async run() {
    await Category.createMany([
      {
        id: randomUUID(),
        label: 'Technologie',
      },
      {
        id: randomUUID(),
        label: 'Développement Web',
      },
      {
        id: randomUUID(),
        label: 'Mobile',
      },
      {
        id: randomUUID(),
        label: 'Intelligence Artificielle',
      },
      {
        id: randomUUID(),
        label: 'Cybersécurité',
      },
      {
        id: randomUUID(),
        label: 'Design UI/UX',
      },
      {
        id: randomUUID(),
        label: 'Entrepreneuriat',
      },
      {
        id: randomUUID(),
        label: 'Actualités Tech',
      },
      {
        id: randomUUID(),
        label: 'Tutoriels',
      },
      {
        id: randomUUID(),
        label: 'Productivité',
      },
    ])
  }
}
