<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useGlobalMusic } from '../composables/useGlobalMusic'
import { useGsapReveal } from '../composables/useGsapReveal'

const props = defineProps<{
  sentido: string
  titulo: string
  mensaje: string
  icono: 'olfato' | 'oido'
}>()

const rootEl = ref<HTMLElement | null>(null)
useGsapReveal(rootEl)

const { isExperienciaSensorial } = useGlobalMusic()

const getBackRoute = () => isExperienciaSensorial.value ? '/experiencia-sensorial' : '/experiencia-estandar'
</script>

<template>
  <div class="coming-soon-view" ref="rootEl">

    <!-- ── Cabecera ── -->
    <div class="page-header" data-reveal>
      <RouterLink :to="getBackRoute()" class="back-link">
        <span class="back-arrow">←</span>
        Volver a Experiencias
      </RouterLink>

      <div class="header-center">
        <div class="eyebrow">
          <span class="ew-line" />
          <span class="ew-text">Sentido · {{ props.sentido }}</span>
          <span class="ew-line" />
        </div>
        <h1 class="page-title">{{ props.titulo }}</h1>
      </div>

      <span class="header-spacer" aria-hidden="true" />
    </div>

    <!-- ── Estado vacío ── -->
    <div class="empty-wrap" data-reveal>
      <svg class="empty-illustration" viewBox="0 0 400 320" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustración de colección en preparación">
        <circle cx="200" cy="168" r="138" fill="rgba(184,154,90,0.12)" />
        <circle cx="200" cy="168" r="100" fill="rgba(140,58,80,0.05)" />

        <g opacity="0.55">
          <path d="M96 96 l6 14 l14 6 l-14 6 l-6 14 l-6 -14 l-14 -6 l14 -6 z" fill="#b89a5a" />
          <path d="M304 210 l4 10 l10 4 l-10 4 l-4 10 l-4 -10 l-10 -4 l10 -4 z" fill="#b89a5a" />
          <path d="M290 90 l3 7 l7 3 l-7 3 l-3 7 l-3 -7 l-7 -3 l7 -3 z" fill="#8c3a50" />
        </g>

        <ellipse cx="200" cy="272" rx="86" ry="10" fill="rgba(61,26,38,0.06)" />

        <!-- caja / cofre -->
        <rect x="128" y="176" width="144" height="88" rx="8" fill="#8c3a50" />
        <rect x="128" y="176" width="144" height="88" rx="8" fill="url(#box-shade)" />
        <rect x="118" y="150" width="164" height="34" rx="7" fill="#6f2d40" />
        <rect x="190" y="150" width="20" height="114" fill="#b89a5a" />
        <path d="M182 150 c0 -16 8 -26 18 -26 c10 0 18 10 18 26 z" fill="none" stroke="#b89a5a" stroke-width="6" />

        <!-- destello sobre la tapa -->
        <path d="M200 118 l5 12 l12 5 l-12 5 l-5 12 l-5 -12 l-12 -5 l12 -5 z" fill="#eadfc8" />

        <!-- insignia con icono del sentido -->
        <circle cx="200" cy="96" r="30" fill="#ecedf4" stroke="rgba(140,58,80,0.25)" stroke-width="1.5" />

        <g v-if="props.icono === 'olfato'" transform="translate(200 96)">
          <path d="M0 -14 C7 -14 11 -8 11 -1 C11 6 6 12 0 16 C-6 12 -11 6 -11 -1 C-11 -8 -7 -14 0 -14 Z" fill="#8c3a50" opacity="0.85" />
          <path d="M0 16 L0 22" stroke="#3d8a5a" stroke-width="2.4" stroke-linecap="round" />
          <path d="M0 20 C-5 20 -8 17 -8 13" stroke="#3d8a5a" stroke-width="2.2" fill="none" stroke-linecap="round" />
        </g>
        <g v-else transform="translate(200 96)">
          <circle cx="-7" cy="9" r="5.5" fill="#8c3a50" opacity="0.85" />
          <circle cx="8" cy="4" r="5.5" fill="#8c3a50" opacity="0.85" />
          <path d="M-2 9 L-2 -12 L13 -16 L13 4" stroke="#8c3a50" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="0.85" />
        </g>

        <defs>
          <linearGradient id="box-shade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#ffffff" stop-opacity="0.08" />
            <stop offset="1" stop-color="#000000" stop-opacity="0.08" />
          </linearGradient>
        </defs>
      </svg>

      <p class="empty-eyebrow">Próximamente</p>
      <h2 class="empty-title">Esta colección está en preparación</h2>
      <p class="empty-message">{{ props.mensaje }}</p>
    </div>

    <span class="deco-num" aria-hidden="true">·</span>
  </div>
</template>

<style scoped lang="scss">
.coming-soon-view {
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
  text-decoration: none;
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

.header-spacer {
  width: 150px;
  flex-shrink: 0;
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

/* ── Estado vacío ── */
.empty-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 460px;
  margin: 3.5rem auto 0;
  padding: 0 2rem;
}

.empty-illustration {
  width: 100%;
  max-width: 300px;
  height: auto;
  margin-bottom: 1.75rem;
}

.empty-eyebrow {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #b89a5a;
  margin: 0 0 0.6rem;
}

.empty-title {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 19px;
  font-weight: 800;
  color: #3d1a26;
  letter-spacing: 0.01em;
  margin: 0 0 0.85rem;
  line-height: 1.3;
}

.empty-message {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 14px;
  font-style: italic;
  color: rgba(61, 26, 38, 0.55);
  line-height: 1.75;
  margin: 0;
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

  .header-spacer {
    display: none;
  }

  .empty-wrap {
    margin-top: 2.5rem;
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

  .empty-wrap {
    margin-top: 2rem;
    padding: 0 1.25rem;
  }

  .empty-illustration {
    max-width: 220px;
  }

  .deco-num {
    display: none;
  }
}
</style>
