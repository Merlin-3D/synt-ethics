/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import app from '@adonisjs/core/services/app'
const AuthController = () => import('#controllers/auth_controller')
const DashboardController = () => import('#controllers/admin/dashboard_controller')
const UsersController = () => import('#controllers/admin/users_controller')
const BlogsController = () => import('#controllers/admin/blogs_controller')
const WebController = () => import('#controllers/admin/web_controller')
const CategoriesController = () => import('#controllers/admin/categories_controller')
import { normalize, sep } from 'node:path'

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const PATH_TRAVERSAL_REGEX = /(?:^|[\\/])\.\.(?:[\\/]|$)/
// Public routes
router.group(() => {
  // router.resource('countries', CountriesController).apiOnly()

  router.get('/storage/*', ({ request, response }) => {
    const filePath = request.param('*').join(sep)
    const normalizedPath = normalize(filePath)

    if (PATH_TRAVERSAL_REGEX.test(normalizedPath)) {
      return response.badRequest('Malformed path')
    }

    const absolutePath = app.makePath('../storage', normalizedPath)
    return response.download(absolutePath)
  })
})

// Routes publiques
router.get('/', [WebController, 'home'])

router.get('/home', [WebController, 'home'])

router.get('/actualities', [WebController, 'actualities'])

router.get('/article/:id', [WebController, 'articleDetail'])

router.get('/blog', [WebController, 'blog'])

router.get('/about-us', [WebController, 'aboutUs'])

router.get('/winnie', [WebController, 'winnie'])

router.get('/resources', [WebController, 'resources'])

router.get('/resource/continent/:id', [WebController, 'resourcesDetail'])

router.get('/api/search/articles/type/:type', [WebController, 'articles'])

// Routes d'administration
router
  .group(() => {
    // Authentification
    router.get('/login', async ({ inertia }) => {
      return inertia.render('admin/login')
    })

    router.post('/login', [AuthController, 'login'])
    router.post('/logout', [AuthController, 'logout'])

    router
      .group(() => {
        // Dashboard
        router.get('/dashboard', [DashboardController, 'index'])

        // Gestion des utilisateurs
        router.get('/users', [UsersController, 'index'])
        router.get('/users/create', [UsersController, 'create'])
        router.post('/users', [UsersController, 'store'])
        router.get('/users/:id/edit', [UsersController, 'edit'])
        router.put('/users/:id', [UsersController, 'update'])
        router.delete('/users/:id', [UsersController, 'destroy'])

        // Gestion des blogs
        router.get('/blogs', [BlogsController, 'index'])
        router.get('/blogs/create', [BlogsController, 'create'])
        router.post('/blogs/create', [BlogsController, 'store'])
        router.get('/blogs/:id/edit', [BlogsController, 'edit'])
        router.put('/blogs/:id/edit', [BlogsController, 'update'])
        router.delete('/blogs/:id', [BlogsController, 'destroy'])

        // Gestion des ressources
        router.get('/resources', [BlogsController, 'indexResources'])
        router.get('/resources/create', [BlogsController, 'createResources'])
        router.get('/resources/:id/edit', [BlogsController, 'editResources'])
        router.post('/resources/create', [BlogsController, 'storeResources'])
        router.delete('/resources/:id', [BlogsController, 'destroyResources'])
        router.put('/resources/:id/edit', [BlogsController, 'updateResources'])

        // Gestion des catégories d'articles
        router.get('/categories', [CategoriesController, 'index'])
        router.get('/categories/create', [CategoriesController, 'create'])
        router.post('/categories', [CategoriesController, 'store'])
        router.get('/categories/:id/edit', [CategoriesController, 'edit'])
        router.put('/categories/:id', [CategoriesController, 'update'])
        router.delete('/categories/:id', [CategoriesController, 'destroy'])
      })
      .use([middleware.auth()])
  })
  .prefix('/admin')
