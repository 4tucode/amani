<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useScrollToTop } from '../composables/useScrollToTop'
import { scrollToTop } from '../composables/useScrollNavigation'

const router = useRouter()

// Hook para hacer scroll hacia arriba al montar el componente
useScrollToTop()

const navigateToExperienciaSensorial = (tipo: 'suave' | 'ambiente') => {
  router.push({
    path: '/experiencia-sensorial',
    query: { tipo }
  })
  scrollToTop()
}
</script>

<template>
  <div class="selection-wrapper">
    <!-- SVG Background Animations -->
    <div class="svg-background">
      <img src="@/assets/SVG/FORM-07.svg" alt="" class="bg-svg bg-svg-1" />
      <img src="@/assets/SVG/FORM-08.svg" alt="" class="bg-svg bg-svg-2" />
      <img src="@/assets/SVG/FORM-09.svg" alt="" class="bg-svg bg-svg-3" />
      <img src="@/assets/SVG/FORM-10.svg" alt="" class="bg-svg bg-svg-4" />
      <img src="@/assets/SVG/FORM-11.svg" alt="" class="bg-svg bg-svg-5" />
      <img src="@/assets/SVG/FORM-12.svg" alt="" class="bg-svg bg-svg-6" />
    </div>

    <main class="selection-container">
      <!-- Experiencia Sensorial Suave - Izquierda -->
      <div class="experience-half experience-half-left">
        <div class="experience-content">
          <p class="section-description section-description-left">
            Sumérgete en una experiencia relajante con música suave y efectos visuales tranquilos. Ideal para momentos
            de
            calma y reflexión.
          </p>
          <button @click="navigateToExperienciaSensorial('suave')" class="white-button white-button-left group">
            <!-- Decoración con logo de Amani -->
            <div class="logo-decoration logo-decoration-1">
              <img src="@/assets/logo_amani.png" alt="Logo Amani" class="logo-img logo-img-large" />
            </div>
            <div class="logo-decoration logo-decoration-2">
              <img src="@/assets/logo_amani.png" alt="Logo Amani" class="logo-img logo-img-small" />
            </div>
            <div class="button-content button-content-left">
              <h3>Experiencia Sensorial Suave</h3>
              <p>
                Relájate con música suave y efectos visuales tranquilos
              </p>
            </div>
          </button>
        </div>
      </div>

      <!-- Ambiente - Derecha -->
      <div class="experience-half experience-half-right">
        <div class="experience-content">
          <p class="section-description section-description-right">
            Disfruta de una experiencia energética con música vibrante para bailar y celebrar. Perfecta para momentos de
            diversión y movimiento.
          </p>
          <button @click="navigateToExperienciaSensorial('ambiente')" class="white-button white-button-right group">
            <!-- Decoración con logo de Amani -->
            <div class="logo-decoration logo-decoration-3">
              <img src="@/assets/logo_amani.png" alt="Logo Amani" class="logo-img logo-img-large" />
            </div>
            <div class="logo-decoration logo-decoration-4">
              <img src="@/assets/logo_amani.png" alt="Logo Amani" class="logo-img logo-img-small" />
            </div>
            <div class="button-content button-content-right">
              <h3>Ambiente</h3>
              <p>
                Disfruta de música energética para bailar y celebrar
              </p>
            </div>
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
// Wrapper container
.selection-wrapper {
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: visible;
  background: #dcdee9;
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

.bg-svg {
  position: absolute;
  opacity: 0.4;
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

// Animations for SVG movement
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

// Container principal - responsive, dividido en dos mitades
.selection-container {
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  background: transparent;
  z-index: 1;

  @media (min-width: 768px) {
    flex-direction: row;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
}

// Mitades de la pantalla
.experience-half {
  position: relative;
  width: 100%;
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  z-index: 1;

  @media (min-width: 768px) {
    width: 50%;
    height: 100vh;
    min-height: 100vh;
    padding: 2rem;
  }
}

// Contenido de cada experiencia
.experience-content {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 28rem;
  width: 100%;

  @media (min-width: 768px) {
    gap: 1.5rem;
  }
}

// Section description
.section-description {
  font-size: 0.95rem;
  font-weight: 400;
  color: #582a35;
  margin-bottom: 0;
  position: relative;
  z-index: 10;
  line-height: 1.6;
  max-width: 100%;
  width: 100%;

  @media (min-width: 768px) {
    font-size: 1rem;
    line-height: 1.7;
  }

  @media (min-width: 1024px) {
    font-size: 1.05rem;
  }
}

.section-description-left {
  text-align: center;

  @media (min-width: 768px) {
    text-align: left;
  }
}

.section-description-right {
  text-align: center;

  @media (min-width: 768px) {
    text-align: right;
  }
}

// White button styles
.white-button {
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: -2px -3px 10px 0 rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  border-radius: 1rem;
  width: 100%;
  padding: 1.5rem;
  cursor: pointer;
  z-index: 10;

  @media (min-width: 768px) {
    padding: 2rem;
  }

  @media (max-height: 600px) {
    padding: 1.5rem;
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
    z-index: 1;
  }

  &:hover {
    background: #ffffff;
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

.white-button-left {
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 768px) {
    margin-left: 0;
    margin-right: auto;
  }
}

.white-button-right {
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 768px) {
    margin-left: auto;
    margin-right: 0;
  }
}

// Button content
.button-content {
  display: flex;
  flex-direction: column;
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

.button-content-left {
  align-items: center;
  text-align: center;

  @media (min-width: 768px) {
    align-items: flex-start;
    text-align: left;
  }

  h3 {
    text-align: center;

    @media (min-width: 768px) {
      text-align: left;
    }
  }

  p {
    text-align: center;

    @media (min-width: 768px) {
      text-align: left;
    }
  }
}

.button-content-right {
  align-items: center;
  text-align: center;

  @media (min-width: 768px) {
    align-items: flex-end;
    text-align: right;
  }

  h3 {
    text-align: center;

    @media (min-width: 768px) {
      text-align: right;
    }
  }

  p {
    text-align: center;

    @media (min-width: 768px) {
      text-align: right;
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
    width: 4rem;
    height: 4rem;
    opacity: 0.1;

    @media (min-width: 768px) {
      width: 6rem;
      height: 6rem;
    }
  }

  &.logo-img-small {
    width: 3rem;
    height: 3rem;
    opacity: 0.05;

    @media (min-width: 768px) {
      width: 4rem;
      height: 4rem;
    }
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
