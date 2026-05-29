<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGlobalMusic } from '../composables/useGlobalMusic'
import { scrollToTop } from '../composables/useScrollNavigation'

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
  { nombre: 'Vista',  num: '01' },
  { nombre: 'Oído',   num: '02' },
  { nombre: 'Olfato', num: '03' },
  { nombre: 'Gusto',  num: '04' },
  { nombre: 'Tacto',  num: '05' },
]
</script>

<template>
  <div class="sensorial-view">
    <div class="panels-row">

      <!-- ── Panel izquierdo ── -->
      <div class="panel panel-left">

        <button class="back-link" @click="() => { router.push('/seleccion-tipo-musica'); scrollToTop(); }">
          <span class="back-arrow">←</span>
          Volver a Selección
        </button>

        <div class="eyebrow">
          <span class="ew-line" />
          <span class="ew-text">Experiencia Sensorial</span>
        </div>

        <h1 class="panel-title">Selecciona un sentido para continuar</h1>

        <blockquote class="quote">
          <p>Explora el mundo a través de tus sentidos con nuestras experiencias sensoriales únicas</p>
        </blockquote>

      </div>

      <div class="v-divider" aria-hidden="true" />

      <!-- ── Panel derecho: sentidos ── -->
      <div class="panel panel-right">

        <div class="eyebrow eyebrow-r">
          <span class="ew-text">Los sentidos</span>
          <span class="ew-line" />
        </div>

        <h2 class="panel-title title-r">Elige</h2>

        <ul class="senses-list">
          <li
            v-for="(sentido, i) in sentidos"
            :key="sentido.nombre"
            class="sense-item"
            :style="{ animationDelay: `${0.15 + i * 0.07}s` }"
          >
            <RouterLink :to="navigateToExperiencia(sentido.nombre.toLowerCase())" class="sense-link">
              <span class="sense-num">{{ sentido.num }}</span>
              <span class="sense-name">{{ sentido.nombre }}</span>
              <span class="sense-arrow">→</span>
            </RouterLink>
          </li>
        </ul>

      </div>
    </div>

    <span class="deco-num" aria-hidden="true">05</span>
  </div>
</template>

<style scoped lang="scss">
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}

.sensorial-view {
  position: relative;
  height: 100%;
  overflow: hidden;
  background: #ecedf4;
}

.panels-row {
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  align-items: stretch;
}

.panel {
  flex: 1;
  padding: 3.5rem 3.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  overflow-y: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
}

.panel-left  { animation: fadeUp 0.55s ease both; }
.panel-right { align-items: flex-end; animation: fadeUp 0.55s ease 0.15s both; }

.v-divider {
  width: 1px;
  flex-shrink: 0;
  margin: 2.5rem 0;
  background: linear-gradient(to bottom, transparent, rgba(140,58,80,0.2) 20%, rgba(140,58,80,0.2) 80%, transparent);
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: 'Syne', sans-serif;
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(61,26,38,0.4);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: color 0.2s ease;
  &:hover { color: #8c3a50; }
}
.back-arrow { font-size: 11px; transition: transform 0.2s ease; }
.back-link:hover .back-arrow { transform: translateX(-3px); }

.eyebrow { display: flex; align-items: center; gap: 0.75rem; }
.ew-line { flex: 0 0 36px; height: 1px; background: rgba(140,58,80,0.35); }
.ew-text {
  font-family: 'Syne', sans-serif;
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: #8c3a50;
  white-space: nowrap;
}

.panel-title {
  font-family: 'Syne', sans-serif;
  font-size: 28px;
  font-weight: 800;
  text-transform: uppercase;
  color: #3d1a26;
  letter-spacing: 0.03em;
  margin: 0;
  line-height: 1.2;
}
.title-r { text-align: right; }

.quote {
  border-left: 2.5px solid rgba(140,58,80,0.25);
  padding-left: 20px;
  margin: 0;
  p {
    font-family: 'Cormorant Garamond', serif;
    font-size: 16px;
    font-style: italic;
    color: rgba(61,26,38,0.65);
    line-height: 2;
    margin: 0;
  }
}

.senses-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 340px;
}

.sense-item { animation: fadeUp 0.5s ease both; }

.sense-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.1rem 0;
  border-bottom: 1px solid rgba(140,58,80,0.1);
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    padding-left: 0.5rem;
    .sense-name { color: #8c3a50; }
    .sense-arrow { opacity: 1; transform: translateX(0); }
  }
}

.sense-num {
  font-family: 'Cormorant Garamond', serif;
  font-size: 11px;
  font-style: italic;
  color: rgba(184,154,90,0.7);
  flex-shrink: 0;
  width: 20px;
}
.sense-name {
  font-family: 'Syne', sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: #3d1a26;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  flex: 1;
  transition: color 0.2s ease;
}
.sense-arrow {
  font-family: 'Syne', sans-serif;
  font-size: 12px;
  color: #8c3a50;
  opacity: 0;
  transform: translateX(-4px);
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.deco-num {
  position: absolute;
  bottom: -1.5rem;
  right: 2.5rem;
  font-family: 'Cormorant Garamond', serif;
  font-size: 120px;
  line-height: 1;
  color: rgba(61,26,38,0.04);
  pointer-events: none;
  user-select: none;
  z-index: 0;
}
</style>
