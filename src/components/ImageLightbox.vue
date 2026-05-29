<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  src: string
  alt: string
}>()

const emit = defineEmits<{ close: [] }>()

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') emit('close')
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
      <div class="lb-img-wrap" @click.self="emit('close')">
        <img :src="src" :alt="alt" class="lb-img" />
      </div>
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
}
</style>
