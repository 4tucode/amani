<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { ref, computed } from 'vue'
import { useGsapReveal } from '../composables/useGsapReveal'

const rootEl = ref<HTMLElement | null>(null)
useGsapReveal(rootEl)

const route = useRoute()

const articulos = ref([
  {
    id: 1,
    titulo: 'La magia de los sentidos en la cultura africana',
    descripcion: 'Explora cómo los aromas, sabores y texturas forman parte esencial de las tradiciones milenarias del continente africano.',
    imagen: 'vista1.jpg',
    fecha: '15 de marzo, 2024',
    autor: 'Equipo Amani',
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
    `,
  },
  {
    id: 2,
    titulo: 'Viajes sensoriales: conectando culturas',
    descripcion: 'Cada experiencia sensorial es un viaje que nos transporta a lugares lejanos.',
    imagen: 'olfato.jpg',
    fecha: '10 de marzo, 2024',
    autor: 'Equipo Amani',
    contenido: `
      <p>En un mundo cada vez más conectado digitalmente, pero a veces más desconectado emocionalmente, los viajes sensoriales ofrecen una forma única de explorar y entender otras culturas.</p>
      <p>Cada producto cultural que exploramos es una ventana a un mundo diferente. No necesitamos subirnos a un avión para experimentar los aromas del desierto del Sahara, los sabores de la sabana africana o las texturas de las artesanías tradicionales.</p>
      <h2>La experiencia como puente</h2>
      <p>Las experiencias sensoriales actúan como puentes entre culturas. Nos permiten entender, respetar y apreciar formas de vida diferentes a la nuestra, creando conexiones genuinas basadas en la comprensión y el respeto mutuo.</p>
      <p>En Amani, cada experiencia está diseñada para ser más que un simple producto: es una invitación a explorar, aprender y conectarse con el mundo de una manera profunda y significativa.</p>
    `,
  },
  {
    id: 3,
    titulo: 'El poder de la nostalgia en nuestras vidas',
    descripcion: 'Los recuerdos sensoriales tienen la capacidad única de despertar emociones profundas.',
    imagen: 'vista1.jpg',
    fecha: '5 de marzo, 2024',
    autor: 'Equipo Amani',
    contenido: `
      <p>La nostalgia es una de las emociones humanas más poderosas. Tiene la capacidad de transportarnos a momentos pasados, despertar emociones profundas y reconectarnos con quienes éramos y quienes somos.</p>
      <h2>Memoria sensorial</h2>
      <p>Los científicos han descubierto que los sentidos, especialmente el olfato, están directamente conectados con las áreas del cerebro responsables de la memoria y las emociones. Por eso, un simple aroma puede despertar recuerdos que creíamos olvidados.</p>
      <p>Esta conexión entre los sentidos y la memoria es lo que hace que las experiencias sensoriales sean tan poderosas. No solo nos permiten disfrutar del presente, sino que también nos ayudan a reconectarnos con nuestro pasado y a entender mejor nuestro presente.</p>
      <h2>Nostalgia positiva</h2>
      <p>La nostalgia no tiene que ser melancólica. Puede ser una fuerza positiva que nos ayuda a apreciar lo que hemos vivido, a entender de dónde venimos y a dar sentido a nuestro viaje personal.</p>
      <p>En Amani, creemos en el poder de la nostalgia positiva: esa capacidad de los sentidos para reconectarnos con momentos felices, experiencias significativas y emociones que dan sentido a nuestras vidas.</p>
    `,
  },
  {
    id: 4,
    titulo: 'Descubre Guinea Ecuatorial',
    descripcion: 'Las olas del mar tararean, en cada marea, su nombre. Guinea Ecuatorial: un pequeño gran tesoro en el corazón de África.',
    imagen: 'IMG_4522.jpg',
    fecha: '20 de marzo, 2024',
    autor: 'Equipo Amani',
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
    `,
  },
])

const articuloId = computed(() => parseInt(route.params.id as string))
const articulo = computed(() => articulos.value.find((a) => a.id === articuloId.value))

if (!articulo.value) {
  console.warn('Artículo no encontrado')
}
</script>

<template>
  <div class="article-view" ref="rootEl">

    <!-- Artículo encontrado -->
    <div v-if="articulo" class="panels-row">

      <!-- ── Panel izquierdo: meta del artículo ── -->
      <div class="panel panel-left" data-reveal>

        <RouterLink to="/blog" class="back-link">
          <span class="back-arrow">←</span>
          Blog
        </RouterLink>

        <div class="eyebrow">
          <span class="ew-line" />
          <span class="ew-text">Artículo</span>
        </div>

        <h1 class="article-title">{{ articulo.titulo }}</h1>

        <div class="article-meta">
          <span class="meta-date">{{ articulo.fecha }}</span>
          <span class="meta-sep">·</span>
          <span class="meta-author">{{ articulo.autor }}</span>
        </div>

        <blockquote class="article-desc">
          <p>{{ articulo.descripcion }}</p>
        </blockquote>

      </div>

      <!-- Divisor vertical -->
      <div class="v-divider" aria-hidden="true" />

      <!-- ── Panel derecho: contenido ── -->
      <div class="panel panel-right" data-reveal>
        <div class="article-content" v-html="articulo.contenido" />
      </div>

    </div>

    <!-- Artículo no encontrado -->
    <div v-else class="not-found" data-reveal>
      <div class="eyebrow">
        <span class="ew-line" />
        <span class="ew-text">Error</span>
      </div>
      <h2 class="not-found-title">Artículo no encontrado</h2>
      <RouterLink to="/blog" class="back-link">← Volver al Blog</RouterLink>
    </div>

    <!-- Número decorativo -->
    <span v-if="articulo" class="deco-num" aria-hidden="true">
      {{ String(articulo.id).padStart(2, '0') }}
    </span>

  </div>
</template>

<style scoped lang="scss">
/* ── Contenedor ── */
.article-view {
  position: relative;
  height: 100%;
  overflow: hidden;
  background: #ecedf4;
}

/* ── Fila de paneles ── */
.panels-row {
  height: 100%;
  display: flex;
  align-items: stretch;
}

/* ── Panel base ── */
.panel {
  display: flex;
  flex-direction: column;
  padding: 3.5rem 3.5rem;
  gap: 1.5rem;
  overflow-y: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar { display: none; }
}

.panel-left {
  flex: 0 0 38%;
}

.panel-right {
  flex: 1;
}

/* ── Divisor vertical ── */
.v-divider {
  width: 1px;
  flex-shrink: 0;
  margin: 2.5rem 0;
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(140, 58, 80, 0.2) 20%,
    rgba(140, 58, 80, 0.2) 80%,
    transparent
  );
}

/* ── Volver al blog ── */
.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(61, 26, 38, 0.4);
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover { color: #8c3a50; }
}

.back-arrow {
  font-size: 11px;
  transition: transform 0.2s ease;
}

.back-link:hover .back-arrow {
  transform: translateX(-3px);
}

/* ── Eyebrow ── */
.eyebrow {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.ew-line {
  flex: 0 0 36px;
  height: 1px;
  background: rgba(140, 58, 80, 0.35);
}

.ew-text {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: #8c3a50;
}

/* ── Título ── */
.article-title {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 24px;
  font-weight: 800;
  text-transform: uppercase;
  color: #3d1a26;
  letter-spacing: 0.03em;
  line-height: 1.2;
  margin: 0;
}

/* ── Meta ── */
.article-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.meta-date {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 13px;
  font-style: italic;
  color: rgba(184, 154, 90, 0.85);
}

.meta-sep {
  color: rgba(140, 58, 80, 0.25);
  font-size: 11px;
}

.meta-author {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(61, 26, 38, 0.3);
}

/* ── Descripción/extracto ── */
.article-desc {
  border-left: 2.5px solid rgba(140, 58, 80, 0.25);
  padding-left: 20px;
  margin: 0;

  p {
    font-family: 'Nunito Sans', sans-serif;
    font-size: 15.5px;
    font-style: italic;
    color: rgba(61, 26, 38, 0.55);
    line-height: 1.75;
    margin: 0;
  }
}

/* ── Contenido del artículo ── */
.article-content {
  :deep(p) {
    font-family: 'Nunito Sans', sans-serif;
    font-size: 16px;
    color: rgba(61, 26, 38, 0.7);
    line-height: 1.85;
    margin: 0 0 1.25rem;
  }

  :deep(h2) {
    font-family: 'Nunito Sans', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: #8c3a50;
    margin: 2rem 0 0.75rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid rgba(140, 58, 80, 0.12);
  }

  :deep(strong) {
    font-weight: 600;
    color: #3d1a26;
  }

  :deep(p:last-child) {
    margin-bottom: 0;
  }
}

/* ── Not found ── */
.not-found {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
}

.not-found-title {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 22px;
  font-weight: 800;
  text-transform: uppercase;
  color: #3d1a26;
  margin: 0;
}

/* ── Número decorativo ── */
.deco-num {
  position: absolute;
  bottom: -1.5rem;
  right: 2.5rem;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 120px;
  line-height: 1;
  color: rgba(61, 26, 38, 0.04);
  pointer-events: none;
  user-select: none;
  z-index: 0;
}

/* ── Móvil: paneles apilados, lectura a una columna ── */
@media (max-width: 480px) {
  .article-view {
    height: auto;
    min-height: 100%;
    overflow: visible;
  }

  .panels-row {
    height: auto;
    flex-direction: column;
  }

  .panel {
    padding: 2rem 1.25rem;
    overflow-y: visible;
    gap: 1.25rem;
  }

  .panel-left {
    flex: none;
  }

  .v-divider {
    display: none;
  }

  .not-found {
    height: auto;
    min-height: 100%;
    padding: 2rem 1.25rem;
  }

  .deco-num {
    display: none;
  }
}
</style>
