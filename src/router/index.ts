import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const SITE_URL = 'https://www.amanisenses.com'
const DEFAULT_TITLE = 'Amani | Experiencias Sensoriales y Arte Africano'
const DEFAULT_DESCRIPTION =
  'Descubre Amani: arte africano hecho a mano a través de los cinco sentidos. Cuadros textiles, aromas, sabores e instrumentos de Guinea Ecuatorial y África Occidental.'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    description?: string
  }
}

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
      meta: {
        title: 'Experiencia Estándar | Amani',
        description:
          'Explora la colección de Amani a tu ritmo: los cinco sentidos, arte africano hecho a mano y productos de Guinea Ecuatorial.',
      },
    },
    {
      path: '/experiencia-sensorial',
      name: 'experiencia-sensorial',
      component: () => import('../views/ExperienciaSensorialView.vue'),
      meta: {
        title: 'Experiencia Sensorial | Amani',
        description:
          'Sumérgete en la experiencia multisensorial de Amani: recorre el arte africano acompañado de música y efectos envolventes.',
      },
    },
    {
      path: '/seleccion-tipo-musica',
      name: 'seleccion-tipo-musica',
      component: () => import('../views/SeleccionTipoMusicaView.vue'),
      meta: {
        title: 'Elige tu Música | Amani',
        description:
          'Selecciona la música que acompañará tu experiencia sensorial en Amani.',
      },
    },
    {
      path: '/experiencia/vista',
      name: 'experiencia-vista',
      component: () => import('../views/VistaView.vue'),
      meta: {
        title: 'Vista · Cuadros de Arte Textil Africano | Amani',
        description:
          'Cuadros artesanales con tejidos africanos y cuentas: United Colours of Africa, En su espalda, African Girl y Black and Stone. Obras únicas con certificado de autenticidad.',
      },
    },
    {
      path: '/experiencia/oido',
      name: 'experiencia-oido',
      component: () => import('../views/OidoView.vue'),
      meta: {
        title: 'Oído · Colección Sonora | Amani',
        description:
          'Instrumentos artesanales africanos hechos a mano, como el Sonajero Juju de vainas de África Occidental. Piezas únicas que dan voz a la tradición.',
      },
    },
    {
      path: '/experiencia/olfato',
      name: 'experiencia-olfato',
      component: () => import('../views/OlfatoView.vue'),
      meta: {
        title: 'Olfato · Aromas de África | Amani',
        description:
          'Aromas y fragancias inspiradas en África: una experiencia olfativa que evoca la esencia de sus paisajes y tradiciones.',
      },
    },
    {
      path: '/experiencia/gusto',
      name: 'experiencia-gusto',
      component: () => import('../views/GustoView.vue'),
      meta: {
        title: 'Gusto · Sabores Africanos | Amani',
        description:
          'Sabores auténticos de África: productos gastronómicos seleccionados para descubrir la riqueza culinaria del continente.',
      },
    },
    {
      path: '/experiencia/tacto',
      name: 'experiencia-tacto',
      component: () => import('../views/TactoView.vue'),
      meta: {
        title: 'Tacto · Texturas Artesanales | Amani',
        description:
          'Texturas y artesanía africana para descubrir con las manos: piezas hechas a mano con materiales naturales.',
      },
    },
    {
      path: '/experiencias',
      name: 'experiencias',
      component: () => import('../views/ExperienciasView.vue'),
      meta: {
        title: 'Experiencias de los 5 Sentidos | Amani',
        description:
          'Vista, oído, olfato, gusto y tacto: elige un sentido y descubre el arte y la artesanía africana de Amani.',
      },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: {
        title: 'Acerca de Amani · Nuestra Historia',
        description:
          'Conoce la historia de Amani, una plataforma de experiencias sensoriales que conecta a las personas con el arte y la cultura africana.',
      },
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactoView.vue'),
      meta: {
        title: 'Contacto | Amani',
        description:
          '¿Tienes alguna pregunta o quieres colaborar con Amani? Escríbenos y te responderemos lo antes posible.',
      },
    },
    {
      path: '/explora-guinea-ecuatorial',
      name: 'galeria-guinea',
      component: () => import('../views/GaleriaGuineaView.vue'),
      meta: {
        title: 'Explora Guinea Ecuatorial · Galería de Fotos | Amani',
        description:
          'Un recorrido en imágenes por Guinea Ecuatorial: paisajes, cultura y vida cotidiana vistos a través del objetivo de Amani.',
      },
    },
    {
      path: '/politica-de-compra',
      name: 'politica-compra',
      component: () => import('../views/PoliticaCompraView.vue'),
      meta: {
        title: 'Política de Compra | Amani',
        description:
          'Condiciones de compra de los productos artesanales de Amani: pedidos, pagos, envíos y devoluciones.',
      },
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('../views/BlogView.vue'),
      meta: {
        title: 'Blog | Amani',
        description:
          'Historias, cultura y arte africano en el blog de Amani: artículos sobre Guinea Ecuatorial, artesanía y experiencias sensoriales.',
      },
    },
    {
      path: '/blog/:id',
      name: 'blog-article',
      component: () => import('../views/BlogArticleView.vue'),
      meta: {
        title: 'Blog | Amani',
        description:
          'Historias, cultura y arte africano en el blog de Amani: artículos sobre Guinea Ecuatorial, artesanía y experiencias sensoriales.',
      },
    },
    {
      path: '/backstage',
      name: 'backstage',
      component: () => import('../views/BackstageView.vue'),
      meta: {
        title: 'Panel de Administración | Amani',
        description: 'Panel privado de gestión de productos.',
      },
    },
    {
      path: '/backstage/blog',
      name: 'backstage-blog',
      component: () => import('../views/BackstageBlogView.vue'),
      meta: {
        title: 'Panel de Administración · Blog | Amani',
        description: 'Panel privado de gestión de artículos del blog.',
      },
    },
  ],
})

// Actualiza una etiqueta <meta> (creándola si no existe) para el SEO por página.
const setMetaTag = (attr: 'name' | 'property', key: string, content: string) => {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attr, key)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

router.afterEach((to) => {
  const title = to.meta.title ?? DEFAULT_TITLE
  const description = to.meta.description ?? DEFAULT_DESCRIPTION
  const url = SITE_URL + to.path

  document.title = title
  setMetaTag('name', 'description', description)
  setMetaTag('property', 'og:title', title)
  setMetaTag('property', 'og:description', description)
  setMetaTag('property', 'og:url', url)
  setMetaTag('name', 'twitter:title', title)
  setMetaTag('name', 'twitter:description', description)

  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.setAttribute('rel', 'canonical')
    document.head.appendChild(canonical)
  }
  canonical.setAttribute('href', url)
})

// El scroll real ocurre dentro de `.app-main` (overflow-y: auto), no en `window`.
// `scrollBehavior` de vue-router siempre acaba llamando a `window.scrollTo`
// (incluso con la opción `el`), así que aquí reseteamos el contenedor a mano.
router.afterEach(() => {
  const scroller = document.querySelector('.app-main')
  if (scroller) scroller.scrollTop = 0
})

export default router
