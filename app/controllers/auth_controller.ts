import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async login({ request, response, inertia, auth }: HttpContext) {
    if (request.method() === 'GET') {
      return inertia.render('admin/login')
    }

    const { email, password } = request.only(['email', 'password'])

    try {
      const user = await User.verifyCredentials(email, password)

      await auth.use('web').login(user)
      return response.redirect('/admin/dashboard')
    } catch (error) {
      return response.redirect().back()
    }
  }

  async logout({ response, auth, session }: HttpContext) {
    await auth.use('web').logout()
    session.clear()
    return response.redirect('/admin/login')
  }
}
