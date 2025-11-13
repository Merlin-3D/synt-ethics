import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import Blog from '#models/articles'

export default class DashboardController {
  async index({ inertia }: HttpContext) {
    const totalUsers = await User.query().count('* as total')
    const totalBlogs = await Blog.query().count('* as total')
    const publishedBlogs = await Blog.query().where('isPublished', true).count('* as total')
    const draftBlogs = await Blog.query().where('isPublished', false).count('* as total')

    const recentBlogs = await Blog.query().preload('author').orderBy('createdAt', 'desc').limit(5)

    const recentUsers = await User.query().orderBy('createdAt', 'desc').limit(5)

    return inertia.render('admin/dashboard', {
      stats: {
        totalUsers: totalUsers.length,
        totalBlogs: totalBlogs.length,
        publishedBlogs: publishedBlogs.length,
        draftBlogs: draftBlogs.length,
      },
      recentBlogs,
      recentUsers,
    })
  }
}
