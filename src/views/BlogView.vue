<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import { useGsapReveal } from '../composables/useGsapReveal'

const rootEl = ref<HTMLElement | null>(null)
useGsapReveal(rootEl)

const articulos = ref([
  {
    id: 1,
    titulo: 'La magia de los sentidos en la cultura africana',
    descripcion:
      'Explora cómo los aromas, sabores y texturas forman parte esencial de las tradiciones milenarias del continente africano. Descubre la conexión profunda entre los sentidos y la memoria cultural.',
    imagen: 'vista1.jpg',
    fecha: '15 de marzo, 2024',
    autor: 'Equipo Amani',
  },
  {
    id: 2,
    titulo: 'Viajes sensoriales: conectando culturas',
    descripcion:
      'Cada experiencia sensorial es un viaje que nos transporta a lugares lejanos. Aprende cómo los productos culturales pueden abrir puertas a nuevas comprensiones y conexiones humanas.',
    imagen: 'olfato.jpg',
    fecha: '10 de marzo, 2024',
    autor: 'Equipo Amani',
  },
  {
    id: 3,
    titulo: 'El poder de la nostalgia en nuestras vidas',
    descripcion:
      'Los recuerdos sensoriales tienen la capacidad única de despertar emociones profundas. Descubre cómo los aromas y sabores pueden reconectarnos con momentos especiales de nuestro pasado.',
    imagen: 'vista1.jpg',
    fecha: '5 de marzo, 2024',
    autor: 'Equipo Amani',
  },
  {
    id: 4,
    titulo: 'Descubre Guinea Ecuatorial',
    descripcion:
      'Las olas del mar tararean, en cada marea, su nombre. Guinea Ecuatorial: un pequeño gran tesoro en el corazón de África. Su latido se expande entre frondosas selvas tropicales, majestuosas montañas y playas vírgenes.',
    imagen: 'IMG_4522.jpg',
    fecha: '20 de marzo, 2024',
    autor: 'Equipo Amani',
  },
])
</script>

<template>
  <div class="blog-view" ref="rootEl">
    <div class="panels-row">

      <!-- ── Panel izquierdo: intro editorial ── -->
      <div class="panel panel-left" data-reveal>

        <div class="eyebrow">
          <span class="ew-line" />
          <span class="ew-text">Mundo Amani</span>
        </div>

        <h1 class="panel-title">Blog</h1>

        <blockquote class="quote">
          <p>Descubre historias, experiencias y reflexiones sobre los sentidos y la cultura</p>
        </blockquote>

        <RouterLink to="/explora-guinea-ecuatorial" class="galeria-cta" data-reveal>
          <span class="cta-label">Galería fotográfica</span>
          <span class="cta-title">
            Explora Guinea Ecuatorial <span class="cta-arrow" aria-hidden="true">→</span>
          </span>
        </RouterLink>

        <div class="article-count">
          <span class="count-num">{{ String(articulos.length).padStart(2, '0') }}</span>
          <span class="count-label">artículos disponibles</span>
        </div>

      </div>

      <!-- Divisor vertical -->
      <div class="v-divider" aria-hidden="true" />

      <!-- ── Panel derecho: lista de artículos ── -->
      <div class="panel panel-right" data-reveal>

        <div class="eyebrow eyebrow-r">
          <span class="ew-text">Recientes</span>
          <span class="ew-line" />
        </div>

        <h2 class="panel-title title-r">Artículos</h2>

        <!-- Lista de artículos -->
        <ul v-if="articulos.length > 0" class="articles-list">
          <li v-for="articulo in articulos" :key="articulo.id" class="article-item" data-reveal data-reveal-group="articles">
            <div class="article-meta">
              <span class="article-date">{{ articulo.fecha }}</span>
              <span class="article-author">{{ articulo.autor }}</span>
            </div>
            <h3 class="article-title">{{ articulo.titulo }}</h3>
            <p class="article-excerpt">{{ articulo.descripcion }}</p>
            <RouterLink :to="`/blog/${articulo.id}`" class="article-link">
              Leer artículo <span class="arrow">→</span>
            </RouterLink>
          </li>
        </ul>

        <!-- Estado vacío -->
        <div v-else class="empty-state">
          <p class="empty-title">No hay artículos disponibles</p>
          <p class="empty-sub">Vuelve más tarde para descubrir nuevos contenidos</p>
        </div>

      </div>
    </div>

    <!-- Número decorativo -->
    <span class="deco-num" aria-hidden="true">{{ String(articulos.length).padStart(2, '0') }}</span>
  </div>
</template>

<style scoped lang="scss">
/* ── Contenedor ── */
.blog-view {
  position: relative;
  height: 100%;
  overflow: hidden;
  background: #ecedf4;
}

/* ── Fila de paneles ── */
.panels-row {
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  align-items: stretch;
}

/* ── Panel base ── */
.panel {
  flex: 1;
  padding: 3.5rem 3.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  overflow-y: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

.panel-right {
  align-items: flex-end;
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
  white-space: nowrap;
}

/* ── Títulos ── */
.panel-title {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 28px;
  font-weight: 800;
  text-transform: uppercase;
  color: #3d1a26;
  letter-spacing: 0.03em;
  margin: 0;
  line-height: 1.15;
}

.title-r {
  text-align: right;
}

/* ── Cita ── */
.quote {
  border-left: 2.5px solid rgba(140, 58, 80, 0.25);
  padding-left: 20px;
  margin: 0;

  p {
    font-family: 'Nunito Sans', sans-serif;
    font-size: 16px;
    font-style: italic;
    color: rgba(61, 26, 38, 0.65);
    line-height: 2;
    margin: 0;
  }
}

/* ── CTA galería ── */
.galeria-cta {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  text-decoration: none;
  width: fit-content;

  &:hover .cta-title {
    color: #8c3a50;
  }

  &:hover .cta-arrow {
    transform: translateX(5px);
  }
}

.cta-label {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: rgba(184, 154, 90, 0.9);
}

.cta-title {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 19px;
  font-weight: 800;
  color: #3d1a26;
  letter-spacing: 0.02em;
  line-height: 1.3;
  transition: color 0.2s ease;

  .cta-arrow {
    display: inline-block;
    transition: transform 0.2s ease;
  }
}

/* ── Conteo de artículos ── */
.article-count {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
  margin-top: auto;
}

.count-num {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 2.5rem;
  font-style: italic;
  color: rgba(184, 154, 90, 0.6);
  line-height: 1;
}

.count-label {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(61, 26, 38, 0.35);
}

/* ── Lista de artículos ── */
.articles-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
  align-items: flex-end;
}

.article-item {
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 1.25rem 0;
  border-bottom: 1px solid rgba(140, 58, 80, 0.1);

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    border-bottom: none;
  }

  &:hover .article-link {
    opacity: 1;
    transform: translateX(0);
  }

  &:hover .arrow {
    transform: translateX(4px);
  }
}

.article-meta {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
}

.article-date {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 11px;
  font-style: italic;
  color: rgba(184, 154, 90, 0.8);
}

.article-author {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(61, 26, 38, 0.3);
}

.article-title {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 12.5px;
  font-weight: 700;
  color: #3d1a26;
  letter-spacing: 0.02em;
  margin: 0;
  line-height: 1.4;
  text-align: right;
}

.article-excerpt {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 13px;
  color: rgba(61, 26, 38, 0.5);
  line-height: 1.65;
  margin: 0;
  text-align: right;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-link {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #8c3a50;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.3rem;
  opacity: 0;
  transform: translateX(-4px);
  transition: opacity 0.2s ease, transform 0.2s ease;
  margin-top: 0.15rem;

  .arrow {
    display: inline-block;
    transition: transform 0.2s ease;
  }
}

/* ── Estado vacío ── */
.empty-state {
  text-align: right;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.empty-title {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: rgba(61, 26, 38, 0.4);
  margin: 0;
}

.empty-sub {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 14px;
  font-style: italic;
  color: rgba(61, 26, 38, 0.3);
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
  .blog-view {
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

  .panel-right {
    align-items: flex-start;
  }

  .v-divider {
    display: none;
  }

  .title-r {
    text-align: left;
  }

  .articles-list {
    align-items: flex-start;
  }

  .article-item {
    max-width: 100%;
  }

  .article-meta {
    justify-content: flex-start;
  }

  .article-title,
  .article-excerpt {
    text-align: left;
  }

  .article-link {
    justify-content: flex-start;
  }

  .empty-state {
    text-align: left;
  }

  .deco-num {
    display: none;
  }
}
</style>
