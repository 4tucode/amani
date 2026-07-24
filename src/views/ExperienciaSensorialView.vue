<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGlobalMusic } from '../composables/useGlobalMusic'
import { useGsapReveal } from '../composables/useGsapReveal'

const rootEl = ref<HTMLElement | null>(null)
useGsapReveal(rootEl)

const route = useRoute()
const router = useRouter()
const { startExperienciaSensorial, navigateToExperiencia } = useGlobalMusic()

onMounted(() => {
  const tipo = route.query.tipo as 'suave' | 'ambiente'
  if (tipo && (tipo === 'suave' || tipo === 'ambiente')) {
    startExperienciaSensorial(tipo)
  } else {
    router.push('/seleccion-tipo-musica')
  }
})

const sentidos = [
  { nombre: 'Vista',  slug: 'vista',  num: '01', img: new URL('@/assets/comic/vista.png',   import.meta.url).href },
  { nombre: 'Oído',   slug: 'oido',   num: '02', img: new URL('@/assets/comic/oido.png',    import.meta.url).href },
  { nombre: 'Olfato', slug: 'olfato', num: '03', img: new URL('@/assets/comic/olfato.png',  import.meta.url).href },
  { nombre: 'Gusto',  slug: 'gusto',  num: '04', img: new URL('@/assets/comic/gusto.png',   import.meta.url).href },
  { nombre: 'Tacto',  slug: 'tacto',  num: '05', img: new URL('@/assets/comic/tacto.png',   import.meta.url).href },
]
</script>

<template>
  <div class="sensorial-view" ref="rootEl">

    <!-- ── Cabecera compacta ── -->
    <div class="page-header" data-reveal>
      <button class="back-link" @click="router.push('/seleccion-tipo-musica')">
        <span class="back-arrow">←</span>
        Volver a Selección
      </button>

      <div class="header-center">
        <div class="eyebrow">
          <span class="ew-line" />
          <span class="ew-text">Experiencia Sensorial</span>
          <span class="ew-line" />
        </div>
        <h1 class="page-title">Selecciona un sentido</h1>
      </div>

      <blockquote class="header-quote">
        <p>Explora el mundo a través de tus sentidos</p>
      </blockquote>
    </div>

    <!-- ── Grid de sentidos ── -->
    <div class="senses-grid">
      <RouterLink
        v-for="sentido in sentidos"
        :key="sentido.nombre"
        :to="navigateToExperiencia(sentido.slug)"
        class="sense-card"
        data-reveal
        data-reveal-group="senses"
      >
        <div class="sense-img-wrap">
          <img :src="sentido.img" :alt="sentido.nombre" class="sense-img" />
        </div>
        <div class="sense-footer">
          <span class="sense-num">{{ sentido.num }}</span>
          <span class="sense-name">{{ sentido.nombre }}</span>
          <span class="sense-arrow">→</span>
        </div>
      </RouterLink>
    </div>

    <span class="deco-num" aria-hidden="true">05</span>
  </div>
</template>

<style scoped lang="scss">
.sensorial-view {
  position: relative;
  min-height: 100%;
  background: #ecedf4;
  padding-bottom: 4rem;
}

/* ── Cabecera ── */
.page-header {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 2.25rem 3.5rem 1.75rem;
  border-bottom: 1px solid rgba(140, 58, 80, 0.08);
  flex-wrap: wrap;
}

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
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  white-space: nowrap;
  transition: color 0.2s ease;
  &:hover { color: #8c3a50; }
}
.back-arrow {
  font-size: 11px;
  transition: transform 0.2s ease;
}
.back-link:hover .back-arrow { transform: translateX(-3px); }

.header-center {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.eyebrow {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.ew-line {
  flex: 0 0 32px;
  height: 1px;
  background: rgba(140, 58, 80, 0.35);
}
.ew-text {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: #8c3a50;
  white-space: nowrap;
}

.page-title {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 22px;
  font-weight: 800;
  text-transform: uppercase;
  color: #3d1a26;
  letter-spacing: 0.04em;
  margin: 0;
  line-height: 1.2;
  text-align: center;
}

.header-quote {
  max-width: 220px;
  border-left: 2px solid rgba(140, 58, 80, 0.25);
  padding-left: 16px;
  margin: 0;
  p {
    font-family: 'Nunito Sans', sans-serif;
    font-size: 13.5px;
    font-style: italic;
    color: rgba(61, 26, 38, 0.55);
    line-height: 1.7;
    margin: 0;
  }
}

/* ── Grid de imágenes ── */
.senses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
  padding: 2rem 3.5rem;
}

.sense-card {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  border-radius: 6px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 2px 12px rgba(61, 26, 38, 0.07);
  transition: transform 0.28s ease, box-shadow 0.28s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(61, 26, 38, 0.13);

    .sense-img { transform: scale(1.03); }
    .sense-arrow { opacity: 1; transform: translateX(0); }
    .sense-name { color: #8c3a50; }
  }
}

.sense-img-wrap {
  overflow: hidden;
  line-height: 0;
}

.sense-img {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.35s ease;
}

.sense-footer {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 1.25rem;
  background: #fff;
  border-top: 1px solid rgba(140, 58, 80, 0.08);
}

.sense-num {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 11px;
  font-style: italic;
  color: rgba(184, 154, 90, 0.75);
  flex-shrink: 0;
  width: 20px;
}
.sense-name {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: #3d1a26;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  flex: 1;
  transition: color 0.2s ease;
}
.sense-arrow {
  font-size: 12px;
  color: #8c3a50;
  opacity: 0;
  transform: translateX(-5px);
  transition: opacity 0.2s ease, transform 0.2s ease;
}

/* ── Número decorativo ── */
.deco-num {
  position: fixed;
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

/* ── Tablet (≤ 768px) ── */
@media (max-width: 768px) {
  .page-header {
    padding: 1.75rem 2rem 1.5rem;
    gap: 1.25rem;
    flex-direction: column;
    align-items: flex-start;
  }

  .header-center {
    width: 100%;
    align-items: flex-start;
  }

  .eyebrow {
    justify-content: flex-start;
  }

  .header-quote {
    max-width: 100%;
  }

  .senses-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
    padding: 1.75rem 2rem;
  }
}

/* ── Móvil (≤ 480px) ── */
@media (max-width: 480px) {
  .page-header {
    padding: 1.25rem 1.25rem 1.25rem;
    gap: 1rem;
  }

  .page-title {
    font-size: 18px;
  }

  .header-quote {
    display: none;
  }

  .senses-grid {
    grid-template-columns: 1fr;
    gap: 1.25rem;
    padding: 1.25rem 1.25rem;
  }

  .deco-num {
    display: none;
  }
}
</style>
