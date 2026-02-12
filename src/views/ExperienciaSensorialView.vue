<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { onMounted } from 'vue'
import { useScrollToTop } from '../composables/useScrollToTop'
import { useRoute, useRouter } from 'vue-router'
import { useGlobalMusic } from '../composables/useGlobalMusic'
import { scrollToTop } from '../composables/useScrollNavigation'

// Hook para hacer scroll hacia arriba al montar el componente
useScrollToTop()

const route = useRoute()
const router = useRouter()
const { startExperienciaSensorial, navigateToExperiencia } = useGlobalMusic()

// Inicializar música cuando se monta el componente
onMounted(() => {
  const tipo = route.query.tipo as 'suave' | 'ambiente'
  if (tipo && (tipo === 'suave' || tipo === 'ambiente')) {
    startExperienciaSensorial(tipo)
  } else {
    // Si no hay tipo válido, redirigir a la selección
    router.push('/seleccion-tipo-musica')
    return
  }
})
</script>

<template>
  <main class="relative bg-[#dcdee9] min-h-screen">
    <!-- Contenido principal con los botones de los sentidos -->
    <div class="relative py-4 md:py-6 z-10" style="background-color: #dcdee9;">
      <div class="max-w-6xl mx-auto px-4 w-full">
        <!-- Título y descripción - Móvil primero -->
        <div class="mb-6 md:mb-0 text-left px-2 md:px-4">
          <h1 class="text-2xl md:text-3xl font-[900] text-[#582a35] mb-4">Selecciona un sentido para continuar</h1>
          <p class="text-[#474747] font-thin text-sm md:text-base text-left leading-relaxed mb-4">
            Explora el mundo a través de tus sentidos con nuestras experiencias sensoriales únicas
          </p>

          <button @click="() => { router.push('/seleccion-tipo-musica'); scrollToTop(); }"
            class="inline-flex items-center px-4 md:px-6 py-2 md:py-3 bg-transparent text-[#582a35] font-semibold rounded-lg hover:bg-[#582a35]/10 transition-all duration-300 hover:scale-105 border border-[#582a35] mt-2 md:mt-4 text-sm md:text-base">
            <svg class="w-4 h-4 md:w-5 md:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18">
              </path>
            </svg>
            Volver a Selección
          </button>
        </div>
        <!-- Botones de los 5 sentidos -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 w-full p-2 md:p-4">
          <!-- Vista -->
          <RouterLink :to="navigateToExperiencia('vista')" class="white-button group">
            <div class="button-content">
              <img src="@/assets/comic/vista.png" alt="Vista" class="sense-image mb-4" />
              <h3>Vista</h3>
            </div>
          </RouterLink>

          <!-- Oído -->
          <RouterLink :to="navigateToExperiencia('oido')" class="white-button group">
            <div class="button-content">
              <img src="@/assets/comic/oido.png" alt="Oído" class="sense-image mb-4" />
              <h3>Oído</h3>
            </div>
          </RouterLink>

          <!-- Olfato -->
          <RouterLink :to="navigateToExperiencia('olfato')" class="white-button group">
            <div class="button-content">
              <img src="@/assets/comic/olfato.png" alt="Olfato" class="sense-image mb-4" />
              <h3>Olfato</h3>
            </div>
          </RouterLink>

          <!-- Gusto -->
          <RouterLink :to="navigateToExperiencia('gusto')" class="white-button group">
            <div class="button-content">
              <img src="@/assets/comic/gusto.png" alt="Gusto" class="sense-image mb-4" />
              <h3>Gusto</h3>
            </div>
          </RouterLink>

          <!-- Tacto -->
          <RouterLink :to="navigateToExperiencia('tacto')" class="white-button group">
            <div class="button-content">
              <img src="@/assets/comic/tacto.png" alt="Tacto" class="sense-image mb-4" />
              <h3>Tacto</h3>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
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

  @media (min-width: 768px) {
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
    font-weight: 700;
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

/* Estilos adicionales personalizados */
@keyframes float {

  0%,
  100% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-20px);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

// Sense image styles
.sense-image {
  width: 100%;
  max-width: 200px;
  height: auto;
  object-fit: contain;
  margin: 0 auto;
  display: block;

  @media (min-width: 768px) {
    max-width: 250px;
  }

  @media (min-width: 1024px) {
    max-width: 300px;
  }
}
</style>
