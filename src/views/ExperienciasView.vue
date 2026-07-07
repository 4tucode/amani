<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useGlobalMusic } from '../composables/useGlobalMusic'
import { useGsapReveal } from '../composables/useGsapReveal'
import ExperienceCard from '../components/ExperienceCard.vue'

const rootEl = ref<HTMLElement | null>(null)
useGsapReveal(rootEl)

const router = useRouter()
const { stopExperienciaSensorial } = useGlobalMusic()

const navigateToExperienciaSensorial = () => {
  router.push('/seleccion-tipo-musica')
}

const navigateToExperienciaEstandar = () => {
  router.push('/experiencia-estandar')
}

onMounted(() => {
  stopExperienciaSensorial()
})
</script>

<template>
  <div class="experiencias-view" ref="rootEl">
    <div class="hero" data-reveal>
      <div class="eyebrow">
        <span class="ew-line" />
        <span class="ew-text">Amani</span>
        <span class="ew-line" />
      </div>

      <h1 class="hero-title">
        NUESTRAS EXPERIENCIAS<span class="cursor" aria-hidden="true" />
      </h1>

      <div class="cards-row">
        <ExperienceCard
          title="Experiencia Estándar"
          description="Disfruta de la experiencia clásica de Amani con todas sus funcionalidades"
          type="standard"
          data-reveal
          data-reveal-group="cards"
          @explore="navigateToExperienciaEstandar"
        />
        <ExperienceCard
          title="Experiencia Sensorial"
          description="Sumérgete en una experiencia multisensorial con música y efectos especiales"
          type="sensorial"
          data-reveal
          data-reveal-group="cards"
          @explore="navigateToExperienciaSensorial"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.experiencias-view {
  height: 100%;
  overflow: hidden;
  background: #ecedf4;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  text-align: center;
  padding: 2rem 2.5rem;
  max-width: 800px;
  width: 100%;
}

.eyebrow {
  display: flex;
  align-items: center;
  gap: 0.875rem;
}
.ew-line {
  flex: 0 0 48px;
  height: 1px;
  background: linear-gradient(90deg, transparent, #b89a5a, transparent);
}
.ew-text {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #8c3a50;
  white-space: nowrap;
}

.hero-title {
  font-family: 'Nunito Sans', sans-serif;
  font-size: clamp(1.8rem, 4vw, 3rem);
  font-weight: 800;
  color: #3d1a26;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin: 0;
  line-height: 1.1;
}

.cursor {
  display: inline-block;
  width: 2px;
  height: 0.85em;
  background: #8c3a50;
  margin-left: 4px;
  vertical-align: middle;
  border-radius: 1px;
  animation: blink 1.1s step-end infinite;
}

.cards-row {
  display: flex;
  gap: 1.5rem;
  align-items: stretch;
  margin-top: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
}

/* ── Móvil ─────────────────────────────────────────────── */
@media (max-width: 480px) {
  .experiencias-view {
    height: auto;
    min-height: 100%;
    overflow: visible;
    padding: 1.75rem 0;
  }

  .hero {
    padding: 0 1.25rem;
    gap: 1rem;
  }

  .cards-row {
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;
  }
}
</style>
