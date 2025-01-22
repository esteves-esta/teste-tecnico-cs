import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/project/new',
      name: 'new',
      component: () => import('../views/FormView.vue'),
    },
    {
      path: '/project/edit/:id',
      name: 'edit',
      component: () => import('../views/FormView.vue'),
    },
  ],
})

export default router
