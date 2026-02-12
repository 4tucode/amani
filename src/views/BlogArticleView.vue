<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { ref, computed } from 'vue'
import { useScrollToTop } from '../composables/useScrollToTop'

// Hook para hacer scroll hacia arriba al montar el componente
useScrollToTop()

const route = useRoute()

// Datos de artículos del blog (en producción vendría de una API)
const articulos = ref([
  {
    id: 1,
    titulo: "La magia de los sentidos en la cultura africana",
    descripcion: "Explora cómo los aromas, sabores y texturas forman parte esencial de las tradiciones milenarias del continente africano.",
    imagen: "vista1.jpg",
    fecha: "15 de marzo, 2024",
    autor: "Equipo Amani",
    contenido: `
      <p>Los sentidos han sido siempre la puerta de entrada a las experiencias más profundas de la humanidad. En la cultura africana, esta conexión sensorial adquiere una dimensión especial, donde cada aroma, sabor y textura cuenta una historia milenaria.</p>
      
      <p>Desde las especias que perfuman los mercados de Marrakech hasta los ritmos que resuenan en las plazas de Lagos, los sentidos nos conectan con tradiciones que han sobrevivido generaciones. Esta conexión no es casual: forma parte esencial de cómo las comunidades africanas han preservado su identidad y transmitido su sabiduría.</p>
      
      <h2>El poder del aroma</h2>
      
      <p>Los aromas tienen la capacidad única de transportarnos en el tiempo y el espacio. Un simple olor puede despertar recuerdos enterrados en nuestra memoria, conectándonos con momentos especiales de nuestro pasado. En muchas culturas africanas, los aromas se utilizan en rituales, ceremonias y prácticas cotidianas como una forma de comunicación no verbal.</p>
      
      <p>Las hierbas aromáticas, los inciensos sagrados y los aceites esenciales no son solo productos: son portadores de significado cultural, vehículos de tradición y puentes entre generaciones.</p>
      
      <h2>Sabores que narran historias</h2>
      
      <p>Cada sabor cuenta una historia. Los ingredientes tradicionales, las técnicas de preparación ancestrales y las combinaciones únicas de sabores reflejan la geografía, el clima y la historia de cada región. Cuando probamos un plato tradicional, no solo estamos experimentando un sabor: estamos participando en una narrativa cultural que se ha desarrollado durante siglos.</p>
      
      <h2>Texturas y memoria</h2>
      
      <p>Las texturas también juegan un papel fundamental en nuestra conexión con la cultura. Desde las telas tradicionales hasta las cerámicas artesanales, cada textura nos habla de técnicas ancestrales, materiales locales y expresiones artísticas únicas.</p>
      
      <p>En Amani, creemos que estos elementos sensoriales son más que productos: son experiencias que nos permiten viajar, aprender y conectarnos con culturas diferentes a la nuestra, todo desde la comodidad de nuestro espacio personal.</p>
    `
  },
  {
    id: 2,
    titulo: "Viajes sensoriales: conectando culturas",
    descripcion: "Cada experiencia sensorial es un viaje que nos transporta a lugares lejanos.",
    imagen: "olfato.jpg",
    fecha: "10 de marzo, 2024",
    autor: "Equipo Amani",
    contenido: `
      <p>En un mundo cada vez más conectado digitalmente, pero a veces más desconectado emocionalmente, los viajes sensoriales ofrecen una forma única de explorar y entender otras culturas.</p>
      
      <p>Cada producto cultural que exploramos es una ventana a un mundo diferente. No necesitamos subirnos a un avión para experimentar los aromas del desierto del Sahara, los sabores de la sabana africana o las texturas de las artesanías tradicionales.</p>
      
      <h2>La experiencia como puente</h2>
      
      <p>Las experiencias sensoriales actúan como puentes entre culturas. Nos permiten entender, respetar y apreciar formas de vida diferentes a la nuestra, creando conexiones genuinas basadas en la comprensión y el respeto mutuo.</p>
      
      <p>En Amani, cada experiencia está diseñada para ser más que un simple producto: es una invitación a explorar, aprender y conectarse con el mundo de una manera profunda y significativa.</p>
    `
  },
  {
    id: 3,
    titulo: "El poder de la nostalgia en nuestras vidas",
    descripcion: "Los recuerdos sensoriales tienen la capacidad única de despertar emociones profundas.",
    imagen: "vista1.jpg",
    fecha: "5 de marzo, 2024",
    autor: "Equipo Amani",
    contenido: `
      <p>La nostalgia es una de las emociones humanas más poderosas. Tiene la capacidad de transportarnos a momentos pasados, despertar emociones profundas y reconectarnos con quienes éramos y quienes somos.</p>
      
      <h2>Memoria sensorial</h2>
      
      <p>Los científicos han descubierto que los sentidos, especialmente el olfato, están directamente conectados con las áreas del cerebro responsables de la memoria y las emociones. Por eso, un simple aroma puede despertar recuerdos que creíamos olvidados.</p>
      
      <p>Esta conexión entre los sentidos y la memoria es lo que hace que las experiencias sensoriales sean tan poderosas. No solo nos permiten disfrutar del presente, sino que también nos ayudan a reconectarnos con nuestro pasado y a entender mejor nuestro presente.</p>
      
      <h2>Nostalgia positiva</h2>
      
      <p>La nostalgia no tiene que ser melancólica. Puede ser una fuerza positiva que nos ayuda a apreciar lo que hemos vivido, a entender de dónde venimos y a dar sentido a nuestro viaje personal.</p>
      
      <p>En Amani, creemos en el poder de la nostalgia positiva: esa capacidad de los sentidos para reconectarnos con momentos felices, experiencias significativas y emociones que dan sentido a nuestras vidas.</p>
    `
  },
  {
    id: 4,
    titulo: "Descubre Guinea Ecuatorial",
    descripcion: "Las olas del mar tararean, en cada marea, su nombre. Guinea Ecuatorial: un pequeño gran tesoro en el corazón de África.",
    imagen: "IMG_4522.jpg",
    fecha: "20 de marzo, 2024",
    autor: "Equipo Amani",
    contenido: `
      <p>Las olas del mar tararean, en cada marea, su nombre. Guinea Ecuatorial: un pequeño gran tesoro en el corazón de África.</p>
      
      <p>Su latido se expande entre frondosas selvas tropicales, majestuosas montañas y playas vírgenes que acarician el horizonte.</p>
      
      <p>En su territorio conviven distintos pueblos y tradiciones, reflejo de la gran riqueza cultural que, como símbolo de su gran riqueza cultural, tejen la identidad de una nación singular.</p>
      
      <h2>La esencia más pura de Guinea Ecuatorial</h2>
      
      <p>La esencia más pura de Guinea Ecuatorial brota con los <strong>fang</strong>, etnia mayoritaria conocidos por ser guardianes de una vasta herencia oral. Inclinándonos hacia el noreste, apreciamos a los <strong>bubis</strong> y <strong>criollos</strong>, nativos de la majestuosa isla de Bioko, quienes nos deleitan con sus cánticos y danzas tradicionales.</p>
      
      <p>Regresando al río Muni, concretamente a la provincia de Litoral, nos encontramos con <strong>Ndowe</strong> y <strong>Bisios</strong>, hijos del mar y la tradición costera. Por último, los <strong>annoboneses</strong>, custodios de un mestizaje único en el Atlántico.</p>
      
      <h2>Gastronomía ecuatoguineana</h2>
      
      <p>La gastronomía ecuatoguineana es un peculiar viaje de sabores. Platos como el <strong>pepe soup</strong>, una sopa de pescado con plátanos hervidos, una comida típica de los domingos tras la resaca de la noche anterior; la salsa de cacahuete de la abuela acompañada de una buena yuca; o los buñuelos mañaneros antes de ir a la escuela, muestran la fusión entre ingredientes locales, técnicas ancestrales de cocina con un toque de modernidad que muestran la diversidad gastronómica de Guinea Ecuatorial.</p>
      
      <h2>La naturaleza como gran atractivo</h2>
      
      <p>La naturaleza también es otro de sus grandes atractivos.</p>
      
      <p>Playas paradisiacas de arenas negras en la isla de Bioko (a excepción de Arena Blanca, famosa por ser la única playa en toda la isla cuya arena no es negra) y Annobón; playas de aguas cristalinas y arena blanca en sus diferentes islas e islotes de la bahía de Corisco.</p>
      
      <p>Montañas majestuosas como el <strong>pico Basile</strong>, el más alto del país que regala vistas panorámicas espectaculares y en cuya cima se encuentra la estatua de la virgen Bisila, y la montaña de <strong>Monte Alen</strong>.</p>
      
      <p>Selvas densas donde se esconden increíbles cascadas como las de Ureka, ríos y una biodiversidad que convierte a nuestro país en un pequeño paraíso para los amantes de aventura.</p>
    `
  }
])

// Obtener el artículo actual basado en el ID de la ruta
const articuloId = computed(() => parseInt(route.params.id as string))
const articulo = computed(() => articulos.value.find(a => a.id === articuloId.value))

// Si no se encuentra el artículo, redirigir al blog
if (!articulo.value) {
  // En producción, esto podría ser una redirección
  console.warn('Artículo no encontrado')
}
</script>

<template>
  <main class="min-h-screen bg-[#e9e8dc]">
    <div v-if="articulo" class="py-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Migas de pan -->
        <nav class="breadcrumbs mb-8">
          <RouterLink to="/blog" class="breadcrumb-link">Blog</RouterLink>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current">{{ articulo.titulo }}</span>
        </nav>

        <!-- Imagen de portada -->
        <div class="article-cover mb-8">
          <img :src="`@/assets/${articulo.imagen}`" :alt="articulo.titulo" class="cover-image" />
        </div>

        <!-- Título del artículo -->
        <h1 class="article-title">{{ articulo.titulo }}</h1>

        <!-- Meta información -->
        <div class="article-meta mb-8">
          <span class="article-date">{{ articulo.fecha }}</span>
          <span class="article-separator">•</span>
          <span class="article-author">{{ articulo.autor }}</span>
        </div>

        <!-- Contenido del artículo -->
        <div class="article-content" v-html="articulo.contenido"></div>

        <!-- Botón para volver al blog -->
        <div class="mt-12 text-center">
          <RouterLink to="/blog" class="back-button">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18">
              </path>
            </svg>
            Volver al Blog
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- Mensaje si no se encuentra el artículo -->
    <div v-else class="py-16 text-center">
      <h2 class="text-2xl font-bold text-gray-600 mb-4">Artículo no encontrado</h2>
      <RouterLink to="/blog" class="back-button">
        Volver al Blog
      </RouterLink>
    </div>
  </main>
</template>

<style scoped>
/* Migas de pan */
.breadcrumbs {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
}

.breadcrumb-link {
  color: #582a35;
  text-decoration: none;
  transition: color 0.3s ease;
}

.breadcrumb-link:hover {
  color: #d97706;
  text-decoration: underline;
}

.breadcrumb-separator {
  color: #9ca3af;
}

.breadcrumb-current {
  color: #4b5563;
  font-weight: 500;
}

/* Imagen de portada */
.article-cover {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.cover-image {
  width: 100%;
  height: 400px;
  object-fit: cover;
  display: block;
  filter: sepia(10%) contrast(1.05);

  @media (min-width: 768px) {
    height: 500px;
  }
}

/* Título del artículo */
.article-title {
  font-size: 2.5rem;
  font-weight: 900;
  color: #582a35;
  margin-bottom: 1.5rem;
  line-height: 1.2;

  @media (min-width: 768px) {
    font-size: 3rem;
  }
}

/* Meta información */
.article-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.875rem;
  color: #6b7280;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(88, 42, 53, 0.1);
}

.article-date,
.article-author {
  font-weight: 400;
}

.article-separator {
  color: #9ca3af;
}

/* Contenido del artículo */
.article-content {
  font-size: 1.125rem;
  line-height: 1.8;
  color: #374151;
  font-weight: 300;
}

.article-content p {
  margin-bottom: 1.5rem;
}

.article-content h2 {
  font-size: 1.75rem;
  font-weight: 700;
  color: #582a35;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  line-height: 1.3;
}

.article-content h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #582a35;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

/* Botón volver */
.back-button {
  display: inline-flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  background: white;
  border: 1px solid rgba(88, 42, 53, 0.2);
  color: #582a35;
  font-weight: 400;
  font-size: 0.875rem;
  border-radius: 0.5rem;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.back-button:hover {
  background: #582a35;
  color: white;
  border-color: #582a35;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}
</style>

