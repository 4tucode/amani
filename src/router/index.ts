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
      path: '/experiencia/oido',
      name: 'experiencia-oido',
      component: () => import('../views/OidoView.vue'),
    },
    {
      path: '/experiencia/olfato',
      name: 'experiencia-olfato',
      component: () => import('../views/OlfatoView.vue'),
    },
    {
      path: '/experiencia/gusto',
      name: 'experiencia-gusto',
      component: () => import('../views/GustoView.vue'),
    },
    {
      path: '/experiencia/tacto',
      name: 'experiencia-tacto',
      component: () => import('../views/TactoView.vue'),
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
      path: '/explora-guinea-ecuatorial',
      name: 'galeria-guinea',
      component: () => import('../views/GaleriaGuineaView.vue'),
    },
    {
      path: '/politica-de-compra',
      name: 'politica-compra',
      component: () => import('../views/PoliticaCompraView.vue'),
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

// El scroll real ocurre dentro de `.app-main` (overflow-y: auto), no en `window`.
// `scrollBehavior` de vue-router siempre acaba llamando a `window.scrollTo`
// (incluso con la opción `el`), así que aquí reseteamos el contenedor a mano.
router.afterEach(() => {
  const scroller = document.querySelector('.app-main')
  if (scroller) scroller.scrollTop = 0
})

export default router
