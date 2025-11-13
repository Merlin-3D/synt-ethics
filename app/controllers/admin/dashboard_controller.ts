import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import Blog from '#models/articles'

export default class DashboardController {
  async index({ inertia }: HttpContext) {
    const totalUsers = await User.query().count('* as total').first()
    const totalBlogs = await Blog.query().count('* as total').first()
    const publishedBlogs = await Blog.query().where('isPublished', true).count('* as total').first()
    const draftBlogs = await Blog.query().where('isPublished', false).count('* as total').first()
    const recentBlogs = await Blog.query().preload('author').orderBy('createdAt', 'desc').limit(5)
    const recentUsers = await User.query().orderBy('createdAt', 'desc').limit(5)

    return inertia.render('admin/dashboard', {
      stats: {
        //@ts-ignore
        totalUsers: totalUsers.$extras.total || 0,
        //@ts-ignore
        totalBlogs: totalBlogs.$extras.total || 0,
        //@ts-ignore
        publishedBlogs: publishedBlogs.$extras.total || 0,
        //@ts-ignore
        draftBlogs: draftBlogs.$extras.total || 0,
      },
      recentBlogs,
      recentUsers,
    })
  }
}
