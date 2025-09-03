import { HttpContext } from '@adonisjs/core/http'
import Blog from '#models/blog'
import { DateTime } from 'luxon'

export default class BlogsController {
  async index({ inertia }: HttpContext) {
    const blogs = await Blog.query().preload('author')
    return inertia.render('admin/blogs/index', { blogs })
  }

  async create({ inertia }: HttpContext) {
    return inertia.render('admin/blogs/create')
  }

  async store({ request, response, auth }: HttpContext) {
    const data = request.only([
      'title',
      'description',
      'category',
      'writingDate',
      'country',
      'body',
      'isPublished',
    ])

    // Gérer l'upload de l'image
    let coverImagePath = null
    const coverImage = request.file('coverImage')
    if (coverImage) {
      // Pour l'instant, on stocke juste le nom du fichier
      // Dans un vrai projet, vous devriez implémenter un système d'upload
      coverImagePath = coverImage.clientName
    }

    // Générer le slug à partir du titre
    const slug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    try {
      await Blog.create({
        ...data,
        coverImage: coverImagePath,
        slug,
        authorId: auth.user!.id.toString(),
        writingDate: DateTime.fromISO(data.writingDate),
      })
      return response.redirect('/admin/blogs')
    } catch (error) {
      return response.redirect().back()
    }
  }

  async edit({ params, inertia }: HttpContext) {
    const blog = await Blog.findOrFail(params.id)
    return inertia.render('admin/blogs/edit', { blog })
  }

  async update({ params, request, response }: HttpContext) {
    const blog = await Blog.findOrFail(params.id)
    const data = request.only([
      'title',
      'description',
      'category',
      'writingDate',
      'country',
      'body',
      'isPublished',
    ])

    // Gérer l'upload de l'image
    let coverImagePath = blog.coverImage
    const coverImage = request.file('coverImage')
    if (coverImage) {
      // Pour l'instant, on stocke juste le nom du fichier
      // Dans un vrai projet, vous devriez implémenter un système d'upload
      coverImagePath = coverImage.clientName
    }

    // Mettre à jour le slug si le titre a changé
    let slug = blog.slug
    if (data.title !== blog.title) {
      slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
    }

    try {
      blog.merge({
        ...data,
        coverImage: coverImagePath,
        slug,
        writingDate: DateTime.fromISO(data.writingDate),
      })
      await blog.save()
      return response.redirect('/admin/blogs')
    } catch (error) {
      return response.redirect().back()
    }
  }

  async destroy({ params, response }: HttpContext) {
    const blog = await Blog.findOrFail(params.id)
    await blog.delete()
    return response.redirect('/admin/blogs')
  }
}
