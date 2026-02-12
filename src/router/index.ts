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
      path: '/experiencia-estandar',
      name: 'experiencia-estandar',
      component: () => import('../views/ExperienciaEstandarView.vue'),
    },
    {
      path: '/experiencia-sensorial',
      name: 'experiencia-sensorial',
      component: () => import('../views/ExperienciaSensorialView.vue'),
    },
    {
      path: '/seleccion-tipo-musica',
      name: 'seleccion-tipo-musica',
      component: () => import('../views/SeleccionTipoMusicaView.vue'),
    },
    {
      path: '/experiencia/vista',
      name: 'experiencia-vista',
      component: () => import('../views/VistaView.vue'),
    },
    {
      path: '/experiencia/olfato',
      name: 'experiencia-olfato',
      component: () => import('../views/OlfatoView.vue'),
    },
    {
      path: '/experiencias',
      name: 'experiencias',
      component: () => import('../views/ExperienciasView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactoView.vue'),
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('../views/BlogView.vue'),
    },
    {
      path: '/blog/:id',
      name: 'blog-article',
      component: () => import('../views/BlogArticleView.vue'),
    },
  ],
})

export default router
