<script setup lang="ts">
import { useScrollToTop } from '../composables/useScrollToTop'

// Hook para hacer scroll hacia arriba al montar el componente
useScrollToTop()

// Información de contacto
const contactInfo = {
  email: 'contacto@amani.com',
  telefono: '+34 123 456 789',
  horario: 'Lunes a Viernes: 9:00 - 18:00\nSábados: 10:00 - 14:00',
}
</script>

<template>
  <div class="contact-wrapper">
    <!-- SVG Background Animations -->
    <div class="svg-background">
      <img src="@/assets/SVG/FORM-07.svg" alt="" class="bg-svg bg-svg-1" />
      <img src="@/assets/SVG/FORM-08.svg" alt="" class="bg-svg bg-svg-2" />
      <img src="@/assets/SVG/FORM-09.svg" alt="" class="bg-svg bg-svg-3" />
      <img src="@/assets/SVG/FORM-10.svg" alt="" class="bg-svg bg-svg-4" />
      <img src="@/assets/SVG/FORM-11.svg" alt="" class="bg-svg bg-svg-5" />
      <img src="@/assets/SVG/FORM-12.svg" alt="" class="bg-svg bg-svg-6" />
    </div>
    
    <main class="contact-main">
      <div class="contact-container">
        <div class="contact-card">
          <!-- Email -->
          <div class="contact-item">
            <h3 class="contact-label">Email</h3>
            <p class="contact-value">{{ contactInfo.email }}</p>
          </div>

          <!-- Teléfono -->
          <div class="contact-item">
            <h3 class="contact-label">Teléfono</h3>
            <p class="contact-value">{{ contactInfo.telefono }}</p>
          </div>

          <!-- Horario -->
          <div class="contact-item">
            <h3 class="contact-label">Horario</h3>
            <p class="contact-value">{{ contactInfo.horario }}</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
// Wrapper container
.contact-wrapper {
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

// Animations for SVG movement
@keyframes float-svg-1 {
  0%, 100% {
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
  0%, 100% {
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
  0%, 100% {
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
  0%, 100% {
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
  0%, 100% {
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
  0%, 100% {
    transform: translate(0, 0) rotate(0deg);
  }
  33% {
    transform: translate(-120px, 130px) rotate(-120deg);
  }
  66% {
    transform: translate(80px, 160px) rotate(-240deg);
  }
}

.contact-main {
  position: relative;
  z-index: 10;
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 1rem;
  padding-top: 6rem;

  @media (min-width: 768px) {
    padding: 1.5rem;
    padding-top: 6rem;
  }
}

.contact-container {
  max-width: 800px;
  width: 100%;
  display: flex;
  justify-content: center;
}

.contact-card {
  background: #ffffff17;
  backdrop-filter: blur(10px);
  border-radius: 0.75rem;
  padding: 2rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    border-color: rgba(88, 42, 53, 0.2);
  }

  @media (min-width: 768px) {
    padding: 2.5rem;
    gap: 2.5rem;
  }

  @media (min-width: 1024px) {
    padding: 3rem;
    gap: 3rem;
  }
}

.contact-item {
  display: flex;
  flex-direction: column;
}

.contact-label {
  font-size: 0.75rem;
  font-weight: 700;
  color: #582a35;
  margin: 0 0 0.5rem 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  position: relative;
  padding-bottom: 0.375rem;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 35px;
    height: 2px;
    background: #807a2a;
    border-radius: 1px;
  }

  @media (min-width: 768px) {
    font-size: 0.875rem;
    margin-bottom: 0.75rem;
    padding-bottom: 0.5rem;
  }
}

.contact-value {
  font-size: 0.8125rem;
  font-weight: 400;
  color: #000;
  line-height: 1.5;
  margin: 0;
  white-space: pre-line;

  @media (min-width: 768px) {
    font-size: 0.9375rem;
    line-height: 1.6;
  }
}
</style>
