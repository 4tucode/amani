<script lang="ts">
// A nivel de módulo: el popup sale una vez por carga de la web, no cada vez
// que se vuelve a la home navegando dentro de la SPA.
let yaMostrado = false
</script>

<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import colabAlen from '../assets/ALEN/COLAB.jpeg'

const RETRASO_MS = 1000

const visible = ref(false)
const botonCerrar = ref<HTMLButtonElement | null>(null)
let temporizador: ReturnType<typeof setTimeout> | undefined

const cerrar = () => {
  visible.value = false
}

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') cerrar()
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
  if (yaMostrado) return
  temporizador = setTimeout(async () => {
    yaMostrado = true
    visible.value = true
    await nextTick()
    botonCerrar.value?.focus({ preventScroll: true })
  }, RETRASO_MS)
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
  clearTimeout(temporizador)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="colab">
      <div
        v-if="visible"
        class="colab-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Colaboración Amani × Alen Xperience"
        @click.self="cerrar"
      >
        <div class="colab-card">
          <button ref="botonCerrar" class="colab-close" aria-label="Cerrar" @click="cerrar">✕</button>
          <img
            :src="colabAlen"
            alt="Amani × Alen Xperience se unen: la cultura de Guinea Ecuatorial ahora más cerca de ti"
            class="colab-img"
            decoding="async"
          />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.colab-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: linear-gradient(
    180deg,
    rgba(61, 26, 38, 0.82) 0%,
    rgba(140, 58, 80, 0.78) 30%,
    rgba(214, 106, 72, 0.74) 58%,
    rgba(240, 160, 84, 0.72) 80%,
    rgba(250, 210, 140, 0.7) 100%
  );
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(1rem, 4vw, 2.5rem);
}

.colab-card {
  position: relative;
  display: flex;
  max-width: 100%;
  max-height: 100%;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 28px 70px rgba(0, 0, 0, 0.55);
}

.colab-img {
  display: block;
  max-width: min(92vw, 100%);
  max-height: 88vh;
  max-height: 88dvh;
  width: auto;
  height: auto;
  object-fit: contain;
  user-select: none;
  -webkit-user-drag: none;
}

.colab-close {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1.5px solid rgba(255, 255, 255, 0.35);
  background: rgba(15, 5, 10, 0.6);
  color: #fff;
  font-size: 0.95rem;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
  touch-action: manipulation;
}

.colab-close:hover,
.colab-close:focus-visible {
  background: #8c3a50;
  border-color: #8c3a50;
  transform: scale(1.08);
  outline: none;
}

/* ── Animación de entrada / salida ─────────────────────── */
.colab-enter-active {
  transition: opacity 0.45s ease, backdrop-filter 0.45s ease, -webkit-backdrop-filter 0.45s ease;
}

.colab-leave-active {
  transition: opacity 0.25s ease;
}

.colab-enter-active .colab-card {
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.45s ease;
}

.colab-leave-active .colab-card {
  transition: transform 0.25s ease;
}

.colab-enter-from,
.colab-leave-to {
  opacity: 0;
}

.colab-enter-from {
  backdrop-filter: blur(0);
  -webkit-backdrop-filter: blur(0);
}

.colab-enter-from .colab-card {
  opacity: 0;
  transform: translateY(28px) scale(0.9);
}

.colab-leave-to .colab-card {
  transform: scale(0.96);
}

@media (prefers-reduced-motion: reduce) {
  .colab-enter-active .colab-card,
  .colab-leave-active .colab-card {
    transition: none;
  }

  .colab-enter-from .colab-card,
  .colab-leave-to .colab-card {
    transform: none;
  }
}
</style>
