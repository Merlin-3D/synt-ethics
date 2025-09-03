import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await User.create({
      fullName: 'Synt Ethics',
      email: 'admin@syntethics.app',
      password: 'syntethics@2025',
    })
  }
}
