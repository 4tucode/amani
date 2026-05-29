<script setup lang="ts">
import { useRouter } from 'vue-router'
import { scrollToTop } from '../composables/useScrollNavigation'

const router = useRouter()

const navigateToExperienciaSensorial = (tipo: 'suave' | 'ambiente') => {
  router.push({ path: '/experiencia-sensorial', query: { tipo } })
  scrollToTop()
}
</script>

<template>
  <div class="seleccion-view">
    <div class="panels-row">

      <!-- ── Panel izquierdo: Sensorial Suave ── -->
      <div class="panel panel-left">

        <div class="eyebrow">
          <span class="ew-line" />
          <span class="ew-text">Experiencia Sensorial</span>
        </div>

        <h2 class="panel-title">Experiencia Sensorial Suave</h2>

        <blockquote class="quote">
          <p>Sumérgete en una experiencia relajante con música suave y efectos visuales tranquilos. Ideal para momentos de calma y reflexión.</p>
        </blockquote>

        <p class="panel-desc">Relájate con música suave y efectos visuales tranquilos</p>

        <button class="cta-btn" @click="navigateToExperienciaSensorial('suave')">
          Comenzar <span class="cta-arrow">→</span>
        </button>

      </div>

      <div class="v-divider" aria-hidden="true" />

      <!-- ── Panel derecho: Ambiente ── -->
      <div class="panel panel-right">

        <div class="eyebrow eyebrow-r">
          <span class="ew-text">Modo Fiesta</span>
          <span class="ew-line" />
        </div>

        <h2 class="panel-title title-r">Ambiente</h2>

        <p class="panel-desc desc-r">Disfruta de música energética para bailar y celebrar</p>

        <blockquote class="quote quote-r">
          <p>Disfruta de una experiencia energética con música vibrante para bailar y celebrar. Perfecta para momentos de diversión y movimiento.</p>
        </blockquote>

        <button class="cta-btn cta-btn-r" @click="navigateToExperienciaSensorial('ambiente')">
          <span class="cta-arrow">←</span> Comenzar
        </button>

      </div>
    </div>

    <span class="deco-num" aria-hidden="true">02</span>
  </div>
</template>

<style scoped lang="scss">
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}

.seleccion-view {
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
  font-size: 26px;
  font-weight: 800;
  text-transform: uppercase;
  color: #3d1a26;
  letter-spacing: 0.03em;
  margin: 0;
  line-height: 1.15;
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
    line-height: 1.85;
    margin: 0;
  }
}
.quote-r {
  border-left: none;
  border-right: 2.5px solid rgba(140,58,80,0.25);
  padding-left: 0;
  padding-right: 20px;
  text-align: right;
}

.panel-desc {
  font-family: 'Cormorant Garamond', serif;
  font-size: 15.5px;
  color: rgba(61,26,38,0.55);
  line-height: 1.75;
  margin: 0;
}
.desc-r { text-align: right; }

.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Syne', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #ffffff;
  background: #8c3a50;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 2px;
  cursor: pointer;
  margin-top: auto;
  transition: background 0.2s ease, transform 0.2s ease;
  align-self: flex-start;

  &:hover {
    background: #3d1a26;
    transform: translateY(-2px);
  }
}
.cta-btn-r { align-self: flex-end; }
.cta-arrow { font-size: 12px; }

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
