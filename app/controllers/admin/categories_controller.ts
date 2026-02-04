import type { HttpContext } from '@adonisjs/core/http'
import Category from '#models/category'

export default class CategoriesController {
  public async index({ inertia }: HttpContext) {
    const categories = await Category.query().orderBy('createdAt', 'desc')
    return inertia.render('admin/categories/index', { categories })
  }

  public async create({ inertia }: HttpContext) {
    return inertia.render('admin/categories/create')
  }

  public async store({ request, response }: HttpContext) {
    const data = request.only(['label'])

    try {
      await Category.create(data)
      return response.redirect('/admin/categories')
    } catch (error) {
      return response.redirect().back()
    }
  }

  public async edit({ params, inertia }: HttpContext) {
    const category = await Category.findOrFail(params.id)
    return inertia.render('admin/categories/edit', { category })
  }

  public async update({ params, request, response }: HttpContext) {
    const category = await Category.findOrFail(params.id)
    const data = request.only(['label'])

    try {
      category.merge(data)
      await category.save()
      return response.redirect('/admin/categories')
    } catch (error) {
      return response.redirect().back()
    }
  }

  public async destroy({ params, response }: HttpContext) {
    const category = await Category.findOrFail(params.id)
    await category.delete()
    return response.redirect('/admin/categories')
  }
}

