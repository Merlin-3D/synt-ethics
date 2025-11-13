import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async login({ request, response, inertia, auth }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    try {
      const user = await User.verifyCredentials(email, password)

      if (!user) {
        return inertia.render('admin/login', {
          error: 'Email ou mot de passe incorrect.',
          success: null,
        })
      }

      await auth.use('web').login(user)
      return response.redirect('/admin/dashboard')
    } catch (error) {
      return inertia.render('admin/login', {
        error: error.messages || error,
        success: null,
      })
    }
  }

  async logout({ response, auth, session }: HttpContext) {
    await auth.use('web').logout()
    session.clear()
    return response.redirect('/admin/login')
  }
}
