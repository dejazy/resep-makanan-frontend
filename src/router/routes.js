
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/RecipePage.vue') },
      { path: 'ingredient', component: () => import('pages/IngredientPage.vue') },
      { path: 'category', component: () => import('pages/CategoryPage.vue') },
      { path: 'recipe/:id', component: () => import('pages/RecipeDetailPage.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
