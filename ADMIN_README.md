# Console d'Administration - Synt Ethics Blog

## Vue d'ensemble

Cette console d'administration complète et moderne permet aux administrateurs de gérer leur site de blog. Elle inclut toutes les fonctionnalités nécessaires pour gérer les utilisateurs et créer des articles de blog.

## Fonctionnalités

### 🔐 Authentification
- Page de connexion sécurisée
- Gestion des sessions administrateur
- Déconnexion automatique

### 📊 Dashboard
- Statistiques en temps réel (utilisateurs, blogs, publications)
- Aperçu des blogs et utilisateurs récents
- Actions rapides pour créer du contenu

### 👥 Gestion des Utilisateurs
- Liste complète des utilisateurs
- Création de nouveaux utilisateurs
- Modification des informations utilisateur
- Suppression d'utilisateurs
- Gestion des profils et permissions

### ✍️ Gestion des Blogs
- Création d'articles avec tous les champs requis :
  - Titre
  - Description
  - Image de couverture
  - Catégorie
  - Date de rédaction
  - Pays
  - Contenu (avec support Markdown)
- Édition et modification des articles existants
- Gestion du statut de publication (brouillon/publié)
- Suppression d'articles
- Génération automatique de slugs SEO

## Structure des Fichiers

```
app/
├── controllers/
│   ├── auth_controller.ts          # Authentification admin
│   └── admin/
│       ├── dashboard_controller.ts # Dashboard principal
│       ├── users_controller.ts     # Gestion utilisateurs
│       └── blogs_controller.ts     # Gestion blogs
├── models/
│   ├── user.ts                     # Modèle utilisateur
│   └── blog.ts                     # Modèle blog
└── middleware/
    └── auth_middleware.ts          # Protection des routes admin

database/
└── migrations/
    ├── 1756924778861_create_users_table.ts
    └── 1756924778862_create_blogs_table.ts

inertia/pages/admin/
├── login.tsx                       # Page de connexion
├── layout.tsx                      # Layout admin avec sidebar
├── dashboard.tsx                   # Dashboard principal
├── users/
│   ├── index.tsx                   # Liste des utilisateurs
│   ├── create.tsx                  # Création utilisateur
│   └── edit.tsx                    # Édition utilisateur
└── blogs/
    ├── index.tsx                   # Liste des blogs
    ├── create.tsx                  # Création blog
    └── edit.tsx                    # Édition blog

start/
└── routes.ts                       # Routes d'administration
```

## Installation et Configuration

### 1. Exécuter les Migrations
```bash
node ace migration:run
```

### 2. Créer un Premier Utilisateur Admin
```bash
node ace make:user
```

### 3. Démarrer le Serveur
```bash
npm run dev
```

## Utilisation

### Accès à l'Administration
1. Naviguez vers `/admin/login`
2. Connectez-vous avec vos identifiants administrateur
3. Accédez au dashboard via `/admin/dashboard`

### Création d'un Blog
1. Allez dans "Blogs" → "Nouveau Blog"
2. Remplissez tous les champs requis :
   - **Titre** : Nom de votre article
   - **Description** : Résumé court
   - **Image de couverture** : URL de l'image
   - **Catégorie** : Choisissez parmi les options
   - **Date de rédaction** : Date de création
   - **Pays** : Pays de rédaction
   - **Contenu** : Article complet (support Markdown)
3. Choisissez de publier immédiatement ou garder en brouillon
4. Cliquez sur "Créer le blog"

### Gestion des Utilisateurs
1. Allez dans "Utilisateurs"
2. **Créer** : Ajouter de nouveaux membres
3. **Modifier** : Mettre à jour les informations
4. **Supprimer** : Retirer des utilisateurs

## Sécurité

- Toutes les routes d'administration sont protégées
- Authentification requise pour chaque action
- Validation des données côté serveur
- Protection CSRF intégrée

## Personnalisation

### Ajouter de Nouvelles Catégories
Modifiez le tableau `categories` dans `inertia/pages/admin/blogs/create.tsx`

### Ajouter de Nouveaux Pays
Modifiez le tableau `countries` dans `inertia/pages/admin/blogs/create.tsx`

### Modifier le Design
Les composants utilisent Tailwind CSS pour un design moderne et responsive.

## Support Markdown

Le contenu des blogs supporte le formatage Markdown :
- **Gras** : `**texte**`
- *Italique* : `*texte*`
- # Titres : `# Titre 1`
- Listes : `- Item`
- Liens : `[texte](url)`
- Images : `![alt](url)`

## Déploiement

1. Construire l'application : `npm run build`
2. Configurer la base de données de production
3. Déployer sur votre serveur
4. Configurer les variables d'environnement

## Support

Pour toute question ou problème, consultez la documentation AdonisJS ou créez une issue dans le projet.

---

**Console d'Administration Synt Ethics Blog** - Développée avec AdonisJS 6, Inertia.js et React 