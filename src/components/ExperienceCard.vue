<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    description: string
    type: 'standard' | 'sensorial'
    illustrated?: boolean
  }>(),
  { illustrated: false },
)

defineEmits<{ explore: [] }>()
</script>

<template>
  <div class="card" @click="$emit('explore')">
    <div class="card-icon" :class="{ 'card-icon--lg': illustrated }">
      <slot name="icon">
        <!-- Estándar: flor de loto (bienestar clásico) -->
        <svg v-if="type === 'standard'" viewBox="0 0 48 48" fill="none">
          <!-- Pétalo central -->
          <path d="M24 38 C20 30 19 21 24 11 C29 21 28 30 24 38 Z" fill="#8c3a50" />
          <!-- Pétalo izquierdo -->
          <path d="M24 38 C16 34 10 26 14 16 C19 21 22 29 24 38 Z" fill="#8c3a50" opacity="0.68" />
          <!-- Pétalo derecho -->
          <path d="M24 38 C32 34 38 26 34 16 C29 21 26 29 24 38 Z" fill="#8c3a50" opacity="0.68" />
          <!-- Pétalo exterior izquierdo -->
          <path d="M24 38 C12 36 6 28 9 19 C14 24 19 31 24 38 Z" fill="#8c3a50" opacity="0.32" />
          <!-- Pétalo exterior derecho -->
          <path d="M24 38 C36 36 42 28 39 19 C34 24 29 31 24 38 Z" fill="#8c3a50" opacity="0.32" />
          <!-- Centro dorado -->
          <circle cx="24" cy="30" r="2.8" fill="#b89a5a" opacity="0.75" />
          <!-- Base -->
          <path d="M13 40 Q24 35 35 40" stroke="#b89a5a" stroke-width="1.4" stroke-linecap="round" fill="none" />
        </svg>
        <!-- Sensorial: auriculares -->
        <svg v-else viewBox="0 0 48 48" fill="none">
          <!-- Arco -->
          <path
            d="M9 27 C9 12 24 10 24 10 C24 10 39 12 39 27"
            stroke="#8c3a50"
            stroke-width="2.4"
            stroke-linecap="round"
            fill="none"
          />
          <!-- Copa izquierda -->
          <rect x="5" y="25" width="11" height="16" rx="5.5" fill="#8c3a50" />
          <!-- Copa derecha -->
          <rect x="32" y="25" width="11" height="16" rx="5.5" fill="#8c3a50" />
          <!-- Interior dorado -->
          <rect x="7.5" y="27.5" width="6" height="11" rx="3" fill="#b89a5a" opacity="0.45" />
          <rect x="34.5" y="27.5" width="6" height="11" rx="3" fill="#b89a5a" opacity="0.45" />
        </svg>
      </slot>
    </div>

    <h3 class="card-title">{{ title }}</h3>
    <p class="card-description">{{ description }}</p>
    <span class="card-cta">Explorar <span class="arrow">→</span></span>
  </div>
</template>

<style scoped lang="scss">
.card {
  background: #ffffff;
  border-radius: 18px;
  box-shadow:
    0 4px 24px rgba(61, 26, 38, 0.08),
    0 1px 4px rgba(61, 26, 38, 0.04);
  padding: 2rem 1.75rem 1.5rem;
  width: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.875rem;
  cursor: pointer;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow:
      0 16px 48px rgba(61, 26, 38, 0.13),
      0 4px 8px rgba(61, 26, 38, 0.06);

    .card-cta {
      opacity: 1;
      transform: translateY(0);
    }

    .arrow {
      transform: translateX(5px);
    }
  }
}

.card-icon {
  width: 52px;
  height: 52px;

  svg {
    width: 100%;
    height: 100%;
  }
}

.card-icon--lg {
  width: 88px;
  height: 88px;
}

.card-title {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
  color: #3d1a26;
  text-align: center;
  margin: 0;
  letter-spacing: 0.01em;
}

.card-description {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 0.97rem;
  color: #7a5560;
  text-align: center;
  line-height: 1.65;
  margin: 0;
}

.card-cta {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #8c3a50;
  opacity: 0;
  transform: translateY(5px);
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
  display: flex;
  align-items: center;
  gap: 0.3rem;

  .arrow {
    display: inline-block;
    transition: transform 0.25s ease;
  }
}
</style>
