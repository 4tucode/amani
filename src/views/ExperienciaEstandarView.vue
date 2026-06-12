<script setup lang="ts">
import { useRouter } from 'vue-router'
import { scrollToTop } from '../composables/useScrollNavigation'

const router = useRouter()

const sentidos = [
  { nombre: 'Vista',  num: '01', img: new URL('@/assets/comic/vista.png',   import.meta.url).href, path: '/experiencia/vista'  },
  { nombre: 'Oído',   num: '02', img: new URL('@/assets/comic/oido.png',    import.meta.url).href, path: '/experiencia/oido'   },
  { nombre: 'Olfato', num: '03', img: new URL('@/assets/comic/olfato.png',  import.meta.url).href, path: '/experiencia/olfato' },
  { nombre: 'Gusto',  num: '04', img: new URL('@/assets/comic/gusto.png',   import.meta.url).href, path: '/experiencia/gusto'  },
  { nombre: 'Tacto',  num: '05', img: new URL('@/assets/comic/tacto.png',   import.meta.url).href, path: '/experiencia/tacto'  },
]
</script>

<template>
  <div class="estandar-view">

    <!-- ── Cabecera compacta ── -->
    <div class="page-header">
      <button class="back-link" @click="() => { router.push('/'); scrollToTop(); }">
        <span class="back-arrow">←</span>
        Volver al Inicio
      </button>

      <div class="header-center">
        <div class="eyebrow">
          <span class="ew-line" />
          <span class="ew-text">Experiencia Estándar</span>
          <span class="ew-line" />
        </div>
        <h1 class="page-title">Selecciona un sentido</h1>
      </div>

      <blockquote class="header-quote">
        <p>Explora el mundo a través de tus sentidos con nuestras experiencias únicas</p>
      </blockquote>
    </div>

    <!-- ── Grid de sentidos ── -->
    <div class="senses-grid">
      <RouterLink
        v-for="(sentido, i) in sentidos"
        :key="sentido.nombre"
        :to="sentido.path"
        class="sense-card"
        :style="{ animationDelay: `${0.1 + i * 0.08}s` }"
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
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}

.estandar-view {
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
  animation: fadeUp 0.45s ease both;
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
  animation: fadeUp 0.5s ease both;
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
</style>
