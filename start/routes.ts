/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const AuthController = () => import('#controllers/auth_controller')
const DashboardController = () => import('#controllers/admin/dashboard_controller')
const UsersController = () => import('#controllers/admin/users_controller')
const BlogsController = () => import('#controllers/admin/blogs_controller')

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

// Routes publiques
router.get('/', async ({ inertia }) => {
  return inertia.render('home')
})

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
        router.post('/blogs', [BlogsController, 'store'])
        router.get('/blogs/:id/edit', [BlogsController, 'edit'])
        router.put('/blogs/:id', [BlogsController, 'update'])
        router.delete('/blogs/:id', [BlogsController, 'destroy'])
      })
      .use([middleware.auth()])
  })
  .prefix('/admin')
