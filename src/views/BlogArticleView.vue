<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { ref, computed, onMounted, watchEffect } from 'vue'
import { useGsapReveal } from '../composables/useGsapReveal'
import { usePosts } from '../composables/usePosts'
import { formatearFecha } from '../utils/fecha'
import { useJsonLd } from '../composables/useJsonLd'
import { setMetaTag, SITE_URL } from '../utils/seoMeta'

const rootEl = ref<HTMLElement | null>(null)
useGsapReveal(rootEl)

const route = useRoute()
const articleJsonLd = useJsonLd('article-blogposting')
const breadcrumbJsonLd = useJsonLd('breadcrumbs')

const { posts: articulos, cargando, cargarPosts } = usePosts()

onMounted(cargarPosts)

const articuloId = computed(() => route.params.id as string)
const articulo = computed(() => articulos.value.find((a) => a.id === articuloId.value))

// SEO: título, OG/Twitter y datos estructurados propios de cada artículo
// (el router pone los genéricos primero; aquí los sobrescribimos en cuanto
// el post llega de Firestore).
watchEffect(() => {
  if (!articulo.value) {
    articleJsonLd.clear()
    breadcrumbJsonLd.clear()
    return
  }

  const art = articulo.value
  const url = `${SITE_URL}/blog/${art.id}`
  const title = `${art.titulo} | Blog Amani`
  // La portada se guarda en base64 dentro del documento (no es una URL pública),
  // así que solo sirve como og:image si en el futuro pasa a alojarse en Storage.
  const ogImage = art.imagenPortada?.startsWith('http') ? art.imagenPortada : `${SITE_URL}/og-image.jpg`

  document.title = title
  setMetaTag('name', 'description', art.descripcion)
  setMetaTag('property', 'og:title', title)
  setMetaTag('property', 'og:description', art.descripcion)
  setMetaTag('property', 'og:type', 'article')
  setMetaTag('property', 'og:url', url)
  setMetaTag('property', 'og:image', ogImage)
  setMetaTag('name', 'twitter:title', title)
  setMetaTag('name', 'twitter:description', art.descripcion)
  setMetaTag('name', 'twitter:image', ogImage)

  articleJsonLd.set({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: art.titulo,
    description: art.descripcion,
    datePublished: art.fecha,
    inLanguage: 'es-ES',
    author: { '@type': 'Organization', name: art.autor },
    publisher: {
      '@type': 'Organization',
      name: 'Amani',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    image: ogImage,
  })

  breadcrumbJsonLd.set({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL + '/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: SITE_URL + '/blog' },
      { '@type': 'ListItem', position: 3, name: art.titulo, item: url },
    ],
  })
})
</script>

<template>
  <div class="article-view" ref="rootEl">

    <!-- Cargando -->
    <div v-if="cargando" class="not-found" data-reveal>
      <h2 class="not-found-title">Cargando artículo…</h2>
    </div>

    <!-- Artículo encontrado -->
    <div v-else-if="articulo" class="panels-row">

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
          <span class="meta-date">{{ formatearFecha(articulo.fecha) }}</span>
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
        <img v-if="articulo.imagenPortada" :src="articulo.imagenPortada" :alt="articulo.titulo" class="article-portada" />
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

/* ── Portada del artículo ── */
.article-portada {
  width: 100%;
  max-height: 320px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 0.5rem;
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

  :deep(a) {
    color: #8c3a50;
  }

  :deep(blockquote) {
    border-left: 3px solid rgba(140, 58, 80, 0.25);
    padding-left: 1rem;
    margin: 1.25rem 0;
    font-style: italic;
    color: rgba(61, 26, 38, 0.55);
  }

  :deep(ul) {
    padding-left: 1.25rem;
    margin: 0 0 1.25rem;
  }

  :deep(img) {
    max-width: 100%;
    border-radius: 6px;
    margin: 1.25rem 0;
    display: block;
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
}
</style>
