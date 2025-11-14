import type { HttpContext } from '@adonisjs/core/http'

export default class WebController {
  async home({ inertia }: HttpContext) {
    return inertia.render('home', {}, { title: 'Accueil' })
  }

  async actualities({ inertia }: HttpContext) {
    return inertia.render('web/actualities', {}, { title: 'Actualités' })
  }

  async articleDetail({ inertia }: HttpContext) {
    return inertia.render('web/article-detail', {}, { title: 'Détails' })
  }

  async blog({ inertia }: HttpContext) {
    return inertia.render('web/blog', {}, { title: 'Blog' })
  }

  async aboutUs({ inertia }: HttpContext) {
    return inertia.render('web/about', {}, { title: 'About' })
  }

  async winnie({ inertia }: HttpContext) {
    return inertia.render('web/winnie', {}, { title: 'Fondateur' })
  }

  async resources({ inertia }: HttpContext) {
    return inertia.render('web/resources', {}, { title: 'Ressources' })
  }
}
