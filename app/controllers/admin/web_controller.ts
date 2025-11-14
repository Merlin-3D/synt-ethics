import Articles from '#models/articles'
import Categories from '#models/category'
import Continents from '#models/continent'
import Country from '#models/country'
import Resources from '#models/resources'
import type { HttpContext } from '@adonisjs/core/http'

export default class WebController {
  async home({ inertia }: HttpContext) {
    const articles = await Articles.query()
      .where('isPublished', true)
      .preload('author')
      .preload('category')
      .orderBy('createdAt', 'desc')
      .limit(5)

    return inertia.render('home', { articles }, { title: 'Accueil' })
  }

  async actualities({ request, inertia }: HttpContext) {
    const { page = 1, limit = 10 } = request.qs()
    const data = await Articles.query()
      .where('type', '0')
      .andWhere('isPublished', true)
      .preload('author')
      .preload('category')
      .orderBy('createdAt', 'desc')
      .paginate(page, limit)

    return inertia.render('web/actualities', { data }, { title: 'Actualités' })
  }

  async articleDetail({ params, inertia }: HttpContext) {
    const article = await Articles.query()
      .where('id', params.id)
      .preload('author')
      .preload('category')
      .first()

    if (!article) {
      return
    }
    const similars = await Articles.query()
      .where('type', article.type)
      .orWhere('categoryId', article.categoryId)
      .andWhere('isPublished', true)
      .preload('author')
      .preload('category')
      .limit(6)

    return inertia.render('web/article-detail', { article, similars }, { title: 'Détails' })
  }

  async blog({ request, inertia }: HttpContext) {
    const { page = 1, limit = 10, category } = request.qs()

    const categories = await Categories.query()
      .join('articles', 'categories.id', 'articles.category_id')
      .where('articles.type', '1')
      .andWhere('articles.is_published', true)
      .select('categories.*')
      .distinct('categories.id')
      .orderBy('categories.label', 'asc')

    if (category) {
      const data = await Articles.query()
        .where('type', '1')
        .andWhere('categoryId', category)
        .andWhere('isPublished', true)
        .preload('author')
        .preload('category')
        .orderBy('createdAt', 'desc')
        .paginate(page, limit)
      return inertia.render(
        'web/blog',
        { data, categories, selectedCategory: category || null },
        { title: 'Blog' }
      )
    } else {
      const data = await Articles.query()
        .where('type', '1')
        .andWhere('isPublished', true)
        .preload('author')
        .preload('category')
        .orderBy('createdAt', 'desc')
        .paginate(page, limit)
      return inertia.render(
        'web/blog',
        { data, categories, selectedCategory: null },
        { title: 'Blog' }
      )
    }
  }

  async aboutUs({ inertia }: HttpContext) {
    return inertia.render('web/about', {}, { title: 'About' })
  }

  async winnie({ inertia }: HttpContext) {
    return inertia.render('web/winnie', {}, { title: 'Fondateur' })
  }

  async resources({ inertia }: HttpContext) {
    const resources = await Resources.query()
      .orderBy('createdAt', 'desc')
      .preload('country')
      .limit(3)
    const continents = await Continents.query().orderBy('createdAt', 'asc')

    return inertia.render('web/resources', { continents, resources }, { title: 'Ressources' })
  }

  async articles({ params, request, response }: HttpContext) {
    const query = request.input('q', '')

    if (query.length < 2) {
      return response.json({ data: [] })
    }

    const articles = await Articles.query()
      .where('type', `${params.type}`)
      .andWhere('isPublished', true)
      .andWhere('title', 'ILIKE', `%${query}%`)
      .orWhere('description', 'ILIKE', `%${query}%`)
      .preload('author')
      .preload('category')
      .orderBy('createdAt', 'desc')
      .limit(10)

    return response.json({ data: articles })
  }

  async resourcesDetail({ params, inertia }: HttpContext) {
    const continent = await Continents.query().where('id', params.id).first()
    if (!continent) {
      return
    }
    const continents = await Continents.query().orderBy('createdAt', 'asc')
    const countries = await Country.query().orderBy('createdAt', 'asc')
    const resources = await Resources.query().orderBy('createdAt', 'desc').preload('country')

    return inertia.render(
      'web/resource-details',
      { continent, continents, countries, resources },
      { title: 'Détails' }
    )
  }
}
