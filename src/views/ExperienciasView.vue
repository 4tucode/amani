<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { useGlobalMusic } from '../composables/useGlobalMusic'
import { useScrollToTop } from '../composables/useScrollToTop'
import { scrollToTop } from '../composables/useScrollNavigation'

const router = useRouter()
const { stopExperienciaSensorial } = useGlobalMusic()

// Hook para hacer scroll hacia arriba al montar el componente
useScrollToTop()

const navigateToExperienciaSensorial = () => {
  router.push('/seleccion-tipo-musica')
  scrollToTop()
}

// Detener música cuando se monta el componente
onMounted(() => {
  stopExperienciaSensorial()
})
</script>

<template>
  <main class="experiencias-main">
    <h1 class="titulo-principal">NUESTRAS EXPERIENCIAS</h1>
    <!-- Action Buttons - Centered -->
    <div class="buttons-container">
      <!-- Experiencia Estándar -->
      <RouterLink to="/experiencia-estandar" class="white-button group">
        <!-- Decoración con logo de Amani -->
        <div class="logo-decoration logo-decoration-1">
          <img src="@/assets/logo_amani.png" alt="Logo Amani" class="logo-img logo-img-large" />
        </div>
        <div class="logo-decoration logo-decoration-2">
          <img src="@/assets/logo_amani.png" alt="Logo Amani" class="logo-img logo-img-small" />
        </div>
        <div class="button-content">
          <h3>Experiencia Estándar</h3>
          <p>
            Disfruta de la experiencia clásica de Amani con todas sus funcionalidades
          </p>
        </div>
      </RouterLink>

      <!-- Experiencia Sensorial -->
      <button @click="navigateToExperienciaSensorial" class="white-button group">
        <!-- Decoración con logo de Amani -->
        <div class="logo-decoration logo-decoration-3">
          <img src="@/assets/logo_amani.png" alt="Logo Amani" class="logo-img logo-img-large" />
        </div>
        <div class="logo-decoration logo-decoration-4">
          <img src="@/assets/logo_amani.png" alt="Logo Amani" class="logo-img logo-img-small" />
        </div>
        <div class="button-content">
          <h3>Experiencia Sensorial</h3>
          <p>
            Sumérgete en una experiencia multisensorial con música y efectos especiales
          </p>
        </div>
      </button>
    </div>
  </main>
</template>

<style lang="scss" scoped>
// Main container
.experiencias-main {
  position: relative;
  overflow: hidden;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #e9e8dc;
  margin-top: 5rem;
  min-height: calc(100vh - 5rem);
}

.titulo-principal {
  font-size: 1.5rem;
  font-weight: 900;
  color: #582a35;
  margin-bottom: 1.5rem;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  @media (min-width: 1024px) {
    font-size: 2.5rem;
  }
}

// Buttons container
.buttons-container {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: 100%;
  max-width: 56rem;
  padding: 0 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 1.5rem;
  }

  @media (min-width: 1024px) {
    gap: 2rem;
  }
}

// White button styles
.white-button {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: -2px -3px 10px 0 rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  border-radius: 1rem;
  width: 100%;
  padding: 1.5rem;
  cursor: pointer;
  text-decoration: none;
  display: block;
  border: none;

  @media (min-width: 768px) {
    width: 50%;
    padding: 2rem;
  }

  @media (max-height: 600px) {
    padding: 1rem;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.03), transparent);
    transition: left 0.6s ease;
  }

  &:hover {
    background: rgba(255, 255, 255, 1);
    border-color: rgba(0, 0, 0, 0.1);
    box-shadow: 0 8px 30px 0 rgba(0, 0, 0, 0.15);
    transform: translateY(-3px);

    &::before {
      left: 100%;
    }

    h3 {
      letter-spacing: 0.05em;
      transition: letter-spacing 0.3s ease;
    }
  }

  &:active {
    transform: translateY(-1px);
    box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.12);
  }
}

// Button content
.button-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 10;
  gap: 0.75rem;

  h3 {
    font-size: 1.25rem;
    font-weight: 500;
    color: #582a35;
    margin-bottom: 0;

    @media (min-width: 768px) {
      font-size: 1.5rem;
    }

    @media (max-height: 600px) {
      font-size: 1.125rem;
    }
  }

  p {
    color: #474747;
    font-weight: 100;
    font-size: 0.875rem;
    text-align: center;
    line-height: 1.5;
    margin: 0;

    @media (min-width: 768px) {
      font-size: 1rem;
      line-height: 1.625;
    }

    @media (max-height: 600px) {
      font-size: 0.75rem;
      line-height: 1.4;
    }
  }
}

// Logo decorations
.logo-decoration {
  position: absolute;
  pointer-events: none;
  z-index: 1;
  transition: all 0.4s ease;
}

.logo-decoration-1 {
  top: -20px;
  right: -20px;
  animation: float-decoration-1 8s ease-in-out infinite;
}

.logo-decoration-2 {
  bottom: -15px;
  left: -15px;
  animation: float-decoration-2 10s ease-in-out infinite;
}

.logo-decoration-3 {
  top: -20px;
  left: -20px;
  animation: float-decoration-3 9s ease-in-out infinite;
}

.logo-decoration-4 {
  bottom: -15px;
  right: -15px;
  animation: float-decoration-4 11s ease-in-out infinite;
}

// Logo images
.logo-img {
  transition: opacity 0.3s ease;
  object-fit: contain;

  &.logo-img-large {
    width: 6rem;
    height: 6rem;
    opacity: 0.1;
  }

  &.logo-img-small {
    width: 4rem;
    height: 4rem;
    opacity: 0.05;
  }
}

.group:hover .logo-img-large {
  opacity: 0.2;
}

.group:hover .logo-img-small {
  opacity: 0.15;
}

// Animations
@keyframes float-decoration-1 {

  0%,
  100% {
    transform: translateY(0px) rotate(15deg);
  }

  50% {
    transform: translateY(-15px) rotate(20deg);
  }
}

@keyframes float-decoration-2 {

  0%,
  100% {
    transform: translateY(0px) rotate(-25deg);
  }

  50% {
    transform: translateY(-12px) rotate(-30deg);
  }
}

@keyframes float-decoration-3 {

  0%,
  100% {
    transform: translateY(0px) rotate(-15deg);
  }

  50% {
    transform: translateY(-15px) rotate(-20deg);
  }
}

@keyframes float-decoration-4 {

  0%,
  100% {
    transform: translateY(0px) rotate(25deg);
  }

  50% {
    transform: translateY(-12px) rotate(30deg);
  }
}

.white-button:hover .logo-decoration-1 {
  animation-duration: 5s;
  transform: translateY(-10px) rotate(25deg) scale(1.15);
}

.white-button:hover .logo-decoration-2 {
  animation-duration: 6s;
  transform: translateY(-8px) rotate(-35deg) scale(1.15);
}

.white-button:hover .logo-decoration-3 {
  animation-duration: 5s;
  transform: translateY(-10px) rotate(-25deg) scale(1.15);
}

.white-button:hover .logo-decoration-4 {
  animation-duration: 6s;
  transform: translateY(-8px) rotate(35deg) scale(1.15);
}
</style>









