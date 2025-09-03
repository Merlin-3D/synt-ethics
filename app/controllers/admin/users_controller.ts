import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class UsersController {
  async index({ inertia }: HttpContext) {
    const users = await User.all()
    return inertia.render('admin/users/index', { users })
  }

  async create({ inertia }: HttpContext) {
    return inertia.render('admin/users/create')
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['fullName', 'email', 'password'])

    try {
      await User.create(data)
      return response.redirect('/admin/users')
    } catch (error) {
      return response.redirect().back()
    }
  }

  async edit({ params, inertia }: HttpContext) {
    const user = await User.findOrFail(params.id)
    return inertia.render('admin/users/edit', { user })
  }

  async update({ params, request, response }: HttpContext) {
    const user = await User.findOrFail(params.id)
    const data = request.only(['fullName', 'email'])

    try {
      user.merge(data)
      await user.save()
      return response.redirect('/admin/users')
    } catch (error) {
      return response.redirect().back()
    }
  }

  async destroy({ params, response }: HttpContext) {
    const user = await User.findOrFail(params.id)
    await user.delete()
    return response.redirect('/admin/users')
  }
}
