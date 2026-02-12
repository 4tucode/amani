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

// Detener música cuando se vuelve al inicio
onMounted(() => {
  stopExperienciaSensorial()
})
</script>

<template>
  <div class="home-wrapper">
    <!-- SVG Background Animations -->
    <div class="svg-background">
      <img src="@/assets/SVG/FORM-07.svg" alt="" class="bg-svg bg-svg-1" />
      <img src="@/assets/SVG/FORM-08.svg" alt="" class="bg-svg bg-svg-2" />
      <img src="@/assets/SVG/FORM-09.svg" alt="" class="bg-svg bg-svg-3" />
      <img src="@/assets/SVG/FORM-10.svg" alt="" class="bg-svg bg-svg-4" />
      <img src="@/assets/SVG/FORM-11.svg" alt="" class="bg-svg bg-svg-5" />
      <img src="@/assets/SVG/FORM-12.svg" alt="" class="bg-svg bg-svg-6" />
    </div>

    <main class="home-main">
      <h1 class="titulo-principal">ELIGE TU EXPERIENCIA</h1>
      <!-- Action Buttons - Centered -->
      <div class="buttons-container">
        <!-- Experiencia Estándar -->
        <RouterLink to="/experiencia-estandar" class="white-button group">
          <div class="button-content">
            <h3>Experiencia Estándar</h3>
            <p>
              Disfruta de la experiencia clásica de Amani con todas sus funcionalidades
            </p>
          </div>
        </RouterLink>

        <!-- Experiencia Sensorial -->
        <button @click="navigateToExperienciaSensorial" class="white-button group">
          <div class="button-content">
            <h3>Experiencia Sensorial</h3>
            <p>
              Sumérgete en una experiencia multisensorial con música y efectos especiales
            </p>
          </div>
        </button>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
// Wrapper container
.home-wrapper {
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: visible;
}

// SVG Background Animations
.svg-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  pointer-events: none;
  overflow: visible;
}

// Main container
.home-main {
  position: relative;
  overflow: hidden;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 5rem;
  z-index: 1;
}

.bg-svg {
  position: absolute;
  opacity: 0.3;
  width: 200px;
  height: 200px;
  pointer-events: none;

  @media (min-width: 768px) {
    width: 250px;
    height: 250px;
  }

  @media (min-width: 1024px) {
    width: 300px;
    height: 300px;
  }
}

.bg-svg-1 {
  top: 5%;
  left: 5%;
  animation: float-svg-1 25s ease-in-out infinite;
}

.bg-svg-2 {
  top: 15%;
  right: 10%;
  animation: float-svg-2 30s ease-in-out infinite;
}

.bg-svg-3 {
  bottom: 20%;
  left: 10%;
  animation: float-svg-3 28s ease-in-out infinite;
}

.bg-svg-4 {
  top: 60%;
  right: 15%;
  animation: float-svg-4 32s ease-in-out infinite;
}

.bg-svg-5 {
  bottom: 15%;
  right: 5%;
  animation: float-svg-5 35s ease-in-out infinite;
}

.bg-svg-6 {
  top: 40%;
  left: 20%;
  animation: float-svg-6 27s ease-in-out infinite;
}

// Animations for SVG movement - using transform with controlled values
@keyframes float-svg-1 {

  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
  }

  25% {
    transform: translate(150px, 80px) rotate(90deg);
  }

  50% {
    transform: translate(300px, 40px) rotate(180deg);
  }

  75% {
    transform: translate(200px, -60px) rotate(270deg);
  }
}

@keyframes float-svg-2 {

  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
  }

  25% {
    transform: translate(-180px, 120px) rotate(-90deg);
  }

  50% {
    transform: translate(-350px, 60px) rotate(-180deg);
  }

  75% {
    transform: translate(-250px, -80px) rotate(-270deg);
  }
}

@keyframes float-svg-3 {

  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
  }

  33% {
    transform: translate(120px, -150px) rotate(120deg);
  }

  66% {
    transform: translate(-80px, -100px) rotate(240deg);
  }
}

@keyframes float-svg-4 {

  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
  }

  25% {
    transform: translate(-150px, 100px) rotate(-90deg);
  }

  50% {
    transform: translate(-280px, 50px) rotate(-180deg);
  }

  75% {
    transform: translate(-200px, -120px) rotate(-270deg);
  }
}

@keyframes float-svg-5 {

  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
  }

  25% {
    transform: translate(200px, -180px) rotate(90deg);
  }

  50% {
    transform: translate(400px, -100px) rotate(180deg);
  }

  75% {
    transform: translate(300px, 150px) rotate(270deg);
  }
}

@keyframes float-svg-6 {

  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
  }

  33% {
    transform: translate(-120px, 130px) rotate(-120deg);
  }

  66% {
    transform: translate(80px, 160px) rotate(-240deg);
  }
}

.titulo-principal {
  position: relative;
  z-index: 10;
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
</style>
