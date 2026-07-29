<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { Icon } from '@iconify/vue'
import { useGsapReveal } from '../composables/useGsapReveal'

// Carga todas las fotos optimizadas de la galería
const modules = import.meta.glob('../assets/fotos-galeria/web/*.jpg', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const fotos = Object.keys(modules)
  .sort()
  .map((ruta, i) => ({
    src: modules[ruta],
    alt: `Guinea Ecuatorial ${i + 1}`,
  }))

// Piezas destacadas (más grandes) para dar ritmo editorial al grid
const esDestacada = (i: number) => i % 7 === 0

const rootEl = ref<HTMLElement | null>(null)
useGsapReveal(rootEl)

/* ── Lightbox ── */
const activa = ref<number | null>(null)

const abrir = (i: number) => {
  activa.value = i
}

const cerrar = () => {
  activa.value = null
}

const siguiente = () => {
  if (activa.value === null) return
  activa.value = (activa.value + 1) % fotos.length
}

const anterior = () => {
  if (activa.value === null) return
  activa.value = (activa.value - 1 + fotos.length) % fotos.length
}

const contador = computed(() => {
  if (activa.value === null) return ''
  const num = (n: number) => String(n).padStart(2, '0')
  return `${num(activa.value + 1)} / ${num(fotos.length)}`
})

const onKeydown = (e: KeyboardEvent) => {
  if (activa.value === null) return
  if (e.key === 'Escape') cerrar()
  else if (e.key === 'ArrowRight') siguiente()
  else if (e.key === 'ArrowLeft') anterior()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <div class="galeria-view" ref="rootEl">

    <!-- ── Cabecera ── -->
    <header class="header" data-reveal>
      <div class="eyebrow">
        <span class="ew-line" />
        <span class="ew-text">Un tesoro en el corazón de África</span>
        <span class="ew-line" />
      </div>
      <h1 class="title">Explora Guinea Ecuatorial</h1>
      <p class="subtitle">
        Selvas tropicales, montañas majestuosas y playas vírgenes: un recorrido visual por el país
        que inspira Amani
      </p>
      <span class="foto-count">{{ String(fotos.length).padStart(2, '0') }} fotografías</span>
    </header>

    <!-- ── Grid de fotos ── -->
    <div class="grid">
      <button
        v-for="(foto, i) in fotos"
        :key="foto.src"
        class="celda"
        :class="{ destacada: esDestacada(i) }"
        data-reveal
        data-reveal-group="galeria"
        @click="abrir(i)"
      >
        <img :src="foto.src" :alt="foto.alt" class="celda-img" loading="lazy" decoding="async" />
        <span class="celda-overlay" aria-hidden="true">
          <Icon icon="mdi:arrow-expand" class="celda-icon" />
        </span>
      </button>
    </div>

    <!-- ── Lightbox ── -->
    <Transition name="lb-fade">
      <div v-if="activa !== null" class="lightbox" @click.self="cerrar">
        <button class="lb-btn lb-cerrar" aria-label="Cerrar" @click="cerrar">
          <Icon icon="mdi:close" />
        </button>

        <button class="lb-btn lb-flecha lb-prev" aria-label="Anterior" @click="anterior">
          <Icon icon="mdi:chevron-left" />
        </button>

        <figure class="lb-figura" @click.self="cerrar">
          <img :src="fotos[activa].src" :alt="fotos[activa].alt" class="lb-img" decoding="async" />
        </figure>

        <button class="lb-btn lb-flecha lb-next" aria-label="Siguiente" @click="siguiente">
          <Icon icon="mdi:chevron-right" />
        </button>

        <div class="lb-pie">
          <span class="lb-caption">Guinea Ecuatorial</span>
          <span class="lb-contador">{{ contador }}</span>
        </div>
      </div>
    </Transition>

  </div>
</template>

<style scoped lang="scss">
/* ── Contenedor ── */
.galeria-view {
  min-height: 100%;
  background: #ecedf4;
  padding: 3.5rem 3rem 4.5rem;
}

/* ── Cabecera ── */
.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.9rem;
  text-align: center;
  max-width: 640px;
  margin: 0 auto 3rem;
}

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

.title {
  font-family: 'Nunito Sans', sans-serif;
  font-size: clamp(1.7rem, 3vw, 2.4rem);
  font-weight: 800;
  text-transform: uppercase;
  color: #3d1a26;
  letter-spacing: 0.03em;
  margin: 0;
  line-height: 1.15;
}

.subtitle {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 1.05rem;
  font-style: italic;
  color: #7a5560;
  margin: 0;
  line-height: 1.6;
}

.foto-count {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: rgba(61, 26, 38, 0.35);
}

/* ── Grid ── */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  grid-auto-rows: 220px;
  grid-auto-flow: dense;
  gap: 10px;
  max-width: 1200px;
  margin: 0 auto;
}

.celda {
  position: relative;
  padding: 0;
  border: none;
  background: rgba(61, 26, 38, 0.05);
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  grid-row: span 2;

  &.destacada {
    grid-column: span 2;
    grid-row: span 3;
  }

  &:hover .celda-img {
    transform: scale(1.05);
  }

  &:hover .celda-overlay {
    opacity: 1;
  }
}

.celda-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

.celda-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to top, rgba(61, 26, 38, 0.45), rgba(61, 26, 38, 0.1));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.celda-icon {
  font-size: 1.5rem;
  color: #ffffff;
}

/* ── Lightbox ── */
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(24, 10, 16, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
}

.lb-figura {
  margin: 0;
  max-width: min(86vw, 1000px);
  max-height: 84vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lb-img {
  max-width: 100%;
  max-height: 84vh;
  object-fit: contain;
  border-radius: 4px;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.5);
}

.lb-btn {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.75);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease, background 0.2s ease;

  &:hover {
    color: #ffffff;
  }
}

.lb-cerrar {
  position: absolute;
  top: 1.5rem;
  right: 1.75rem;
  width: 42px;
  height: 42px;
  font-size: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 50%;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
}

.lb-flecha {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 52px;
  height: 52px;
  font-size: 2.4rem;
}

.lb-prev {
  left: 1.25rem;
}

.lb-next {
  right: 1.25rem;
}

.lb-pie {
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: baseline;
  gap: 1rem;
}

.lb-caption {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
}

.lb-contador {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 13px;
  font-style: italic;
  color: rgba(255, 255, 255, 0.85);
}

/* ── Transición lightbox ── */
.lb-fade-enter-active,
.lb-fade-leave-active {
  transition: opacity 0.25s ease;
}

.lb-fade-enter-from,
.lb-fade-leave-to {
  opacity: 0;
}

/* ── Móvil ── */
@media (max-width: 480px) {
  .galeria-view {
    padding: 2rem 1rem 3rem;
  }

  .header {
    margin-bottom: 1.75rem;
  }

  .grid {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 130px;
    gap: 6px;
  }

  .lb-figura {
    max-width: 94vw;
  }

  .lb-flecha {
    width: 44px;
    height: 44px;
    font-size: 2rem;
  }

  .lb-prev {
    left: 0.25rem;
  }

  .lb-next {
    right: 0.25rem;
  }

  .lb-cerrar {
    top: 1rem;
    right: 1rem;
  }
}
</style>
