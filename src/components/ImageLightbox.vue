<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

const props = defineProps<{
  src?: string
  alt: string
  images?: string[]
  initialIndex?: number
}>()

const emit = defineEmits<{ close: [] }>()

const gallery = computed(() => props.images ?? (props.src ? [props.src] : []))
const index = ref(props.initialIndex ?? 0)
const currentSrc = computed(() => gallery.value[index.value] ?? props.src ?? '')
const hasMultiple = computed(() => gallery.value.length > 1)

const next = () => { index.value = (index.value + 1) % gallery.value.length }
const prev = () => { index.value = (index.value - 1 + gallery.value.length) % gallery.value.length }

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') emit('close')
  else if (e.key === 'ArrowRight' && hasMultiple.value) next()
  else if (e.key === 'ArrowLeft' && hasMultiple.value) prev()
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
  document.body.style.overflow = 'hidden'
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <div class="lb-overlay" @click.self="emit('close')" role="dialog" aria-modal="true" :aria-label="alt">
      <button class="lb-close" @click="emit('close')" aria-label="Cerrar">✕</button>

      <button v-if="hasMultiple" class="lb-nav lb-prev" @click.stop="prev" aria-label="Foto anterior">‹</button>

      <div class="lb-img-wrap" @click.self="emit('close')">
        <img :src="currentSrc" :alt="alt" class="lb-img" />
      </div>

      <button v-if="hasMultiple" class="lb-nav lb-next" @click.stop="next" aria-label="Foto siguiente">›</button>

      <div v-if="hasMultiple" class="lb-counter">{{ index + 1 }} / {{ gallery.length }}</div>
    </div>
  </Teleport>
</template>

<style scoped>
.lb-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(15, 5, 10, 0.92);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(1rem, 4vw, 2.5rem);
  animation: lb-in 0.22s ease both;
}

@keyframes lb-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}

.lb-close {
  position: fixed;
  top: clamp(0.75rem, 3vw, 1.25rem);
  right: clamp(0.75rem, 3vw, 1.25rem);
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1.5px solid rgba(255, 255, 255, 0.25);
  background: rgba(15, 5, 10, 0.55);
  color: #fff;
  font-size: 1rem;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
  z-index: 10000;
  touch-action: manipulation;
}

.lb-close:hover {
  background: #8c3a50;
  border-color: #8c3a50;
  transform: scale(1.08);
}

.lb-img-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  max-height: 100%;
}

.lb-img {
  display: block;
  max-width: min(90vw, 100%);
  max-height: 90vh;
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: 4px;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.6);
  user-select: none;
  -webkit-user-drag: none;
}

.lb-nav {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  width: 46px;
  height: 46px;
  border-radius: 50%;
  border: 1.5px solid rgba(255, 255, 255, 0.25);
  background: rgba(15, 5, 10, 0.55);
  color: #fff;
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
  z-index: 10000;
  touch-action: manipulation;
}
.lb-nav:hover {
  background: #8c3a50;
  border-color: #8c3a50;
}
.lb-prev { left: clamp(0.5rem, 3vw, 1.5rem); }
.lb-next { right: clamp(0.5rem, 3vw, 1.5rem); }
.lb-prev:hover { transform: translateY(-50%) translateX(-2px); }
.lb-next:hover { transform: translateY(-50%) translateX(2px); }

.lb-counter {
  position: fixed;
  bottom: clamp(0.75rem, 3vw, 1.25rem);
  left: 50%;
  transform: translateX(-50%);
  font-family: 'Nunito Sans', sans-serif;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.75);
  background: rgba(15, 5, 10, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 0.3rem 0.9rem;
  z-index: 10000;
}

@media (max-width: 600px) {
  .lb-img {
    max-width: 96vw;
    max-height: 88vh;
    border-radius: 3px;
  }

  .lb-close {
    width: 38px;
    height: 38px;
    font-size: 0.9rem;
  }

  .lb-nav {
    width: 38px;
    height: 38px;
    font-size: 1.25rem;
  }
}
</style>
