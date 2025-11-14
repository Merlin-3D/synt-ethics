import vine from '@vinejs/vine'

export const createArticle = vine.compile(
  vine.object({
    title: vine.string(),
    description: vine.string(),
    coverImage: vine
      .file({
        size: '5mb',
        extnames: ['jpg', 'png', 'jpeg', 'web'],
      })
      .nullable(),
    categoryId: vine.string(),
    writingDate: vine.any(),
    type: vine.string(),
    content: vine.any(),
    isPublished: vine.boolean(),
  })
)

export const updateArticle = vine.compile(
  vine.object({
    title: vine.string().optional(),
    description: vine.string().optional(),
    coverImage: vine
      .file({
        size: '5mb',
        extnames: ['jpg', 'png', 'jpeg', 'webp'],
      })
      .optional(),
    categoryId: vine.string().optional(),
    writingDate: vine.any().optional(),
    type: vine.string().optional(),
    content: vine.any().optional(),
    isPublished: vine.boolean().optional(),
  })
)

export const createResource = vine.compile(
  vine.object({
    title: vine.string(),
    description: vine.string(),
    file: vine
      .file({
        size: '500mb',
        extnames: ['pdf'],
      })
      .nullable(),
    countryId: vine.string(),
    continentId: vine.string(),
    classification: vine.string(),
  })
)

export const updateResource = vine.compile(
  vine.object({
    title: vine.string(),
    description: vine.string(),
    countryId: vine.string(),
    continentId: vine.string(),
    classification: vine.string(),
  })
)
