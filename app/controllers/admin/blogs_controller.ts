import { HttpContext } from '@adonisjs/core/http'
import Articles from '#models/articles'
import * as validator from '#validators/article'
import { promises as fs } from 'node:fs'
import Category from '#models/category'
import { DateTime } from 'luxon'
import Country from '#models/country'
import Continents from '#models/continent'
import drive from '@adonisjs/drive/services/main'
import { cuid } from '@adonisjs/core/helpers'
import env from '#start/env'
import Resources from '#models/resources'

const disk = env.get('DRIVE_DISK') as any
export default class BlogsController {
  async index({ inertia }: HttpContext) {
    const blogs = await Articles.query().preload('author').preload('category')
    return inertia.render('admin/blogs/index', { blogs })
  }

  async create({ inertia }: HttpContext) {
    const categories = await Category.query()
    return inertia.render('admin/blogs/create', { categories })
  }

  async store({ request, response, inertia, auth }: HttpContext) {
    const data = await request.validateUsing(validator.createArticle)
    await Category.findOrFail(data.categoryId)

    try {
      const coverImage = data.coverImage

      let base64Image: string | null = null
      if (coverImage && coverImage.tmpPath) {
        const imageBuffer = await fs.readFile(coverImage.tmpPath)

        const base64String = imageBuffer.toString('base64')

        base64Image = `data:${coverImage.headers['content-type']};base64,${base64String}`
      }

      await Articles.create({
        title: data.title,
        description: data.description,
        coverImage: base64Image,
        categoryId: data.categoryId,
        type: data.type,
        content: data.content,
        authorId: auth.user!.id,
        writingDate: DateTime.fromISO(data.writingDate),
        isPublished: data.isPublished,
      })

      return inertia.render('admin/blogs/create', {
        error: null,
        success: 'Création éffectuée avec succès',
      })
    } catch (error) {
      return response.redirect().back()
    }
  }

  async edit({ params, inertia }: HttpContext) {
    const blog = await Articles.findOrFail(params.id)
    return inertia.render('admin/blogs/edit', { blog })
  }

  async update({ params, request, response, inertia }: HttpContext) {
    try {
      const data = await request.validateUsing(validator.updateArticle) // ton validator pour l’update
      const article = await Articles.findOrFail(params.id)
      await Category.findOrFail(data.categoryId)

      let base64Image: string | null = article.coverImage
      const coverImage = data.coverImage

      if (coverImage && coverImage.tmpPath) {
        const imageBuffer = await fs.readFile(coverImage.tmpPath)
        const base64String = imageBuffer.toString('base64')
        base64Image = `data:${coverImage.headers['content-type']};base64,${base64String}`
      }

      article.merge({
        title: data.title,
        description: data.description,
        coverImage: base64Image,
        categoryId: data.categoryId,
        type: data.type,
        content: data.content,
        writingDate: DateTime.fromISO(data.writingDate),
        isPublished: data.isPublished,
      })

      await article.save()

      return inertia.render(`admin/blogs/edit`, {
        blog: article,
        error: null,
        success: 'Mise à jour avec succès',
      })
    } catch (error) {
      return response.redirect().back()
    }
  }

  async destroy({ params, response }: HttpContext) {
    const article = await Articles.findOrFail(params.id)
    await article.delete()
    return response.redirect('/admin/blogs')
  }

  async indexResources({ inertia }: HttpContext) {
    // const blogs = await Articles.query().preload('author').preload('category')
    return inertia.render('admin/resources/index', { resources: [] })
  }

  async createResources({ inertia }: HttpContext) {
    const countries = await Country.query()
    const continents = await Continents.query()
    return inertia.render('admin/resources/create', { countries, continents })
  }

  async storeResources({ request, response, inertia }: HttpContext) {
    try {
      const data = await request.validateUsing(validator.createResource)

      const fileName = `${generateMediaFilename(getRandomIndex())}.pdf`
      const key = `/demo/${fileName}`
      await data.file!.moveToDisk(key)
      await drive.use(disk).getUrl(key)

      await Resources.create({
        title: data.title,
        description: data.description,
        document: fileName,
        countryId: data.countryId,
        continentId: data.continentId,
        classification: data.classification,
        size: `${data.file?.size}`,
      })
      const countries = await Country.query()
      const continents = await Continents.query()
      return inertia.render('admin/resources/create', {
        error: null,
        success: 'Création éffectuée avec succès',
        countries,
        continents,
      })
    } catch (error) {
      return response.redirect().back()
    }
  }
}
function generateMediaFilename(index: number = 1) {
  const datePart = DateTime.local().toFormat('yyyyLLdd') // ex: 20250711
  const count = String(index).padStart(4, '0') // 0001, 0002...
  return `DOC-${datePart}-${count}`
}

function getRandomIndex() {
  return Math.floor(1000 + Math.random() * 9000) // Ex: 4381
}
