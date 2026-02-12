<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref, computed } from 'vue'
import { useScrollToTop } from '../composables/useScrollToTop'
import { useGlobalMusic } from '../composables/useGlobalMusic'

// Hook para hacer scroll hacia arriba al montar el componente
useScrollToTop()

const { isExperienciaSensorial } = useGlobalMusic()

// Datos del producto cultural único
const productos = ref([
  {
    id: 1,
    nombre: "Danza Tradicional Fang - Guinea Ecuatorial",
    descripcion: "Sumérgete en la rica cultura de la tribu Fang a través de esta experiencia visual única. Descubre los movimientos ancestrales, los trajes tradicionales y la energía espiritual que caracteriza esta danza milenaria del África Central.",
    precio: "89.99",
    categoria: "Cultura",
    rating: 4.9,
    stock: 25
  }
])

const productosFiltrados = computed(() => {
  return productos.value
})

// Función para determinar la ruta de regreso
const getBackRoute = () => {
  if (isExperienciaSensorial.value) {
    return '/experiencia-sensorial'
  }
  return '/experiencia-estandar'
}

// Función para abrir WhatsApp con mensaje de compra
const comprarProducto = (producto: any) => {
  const numero = '34680150864'
  const mensaje = encodeURIComponent(`Hola, me interesa comprar el siguiente producto:\n\n📦 ${producto.nombre}\n💰 Precio: €${producto.precio}\n\nPor favor, contacta conmigo para completar la compra.`)
  const url = `https://wa.me/${numero}?text=${mensaje}`
  window.open(url, '_blank')
}
</script>

<template>
  <div class="view-wrapper">
    <!-- SVG Background Animations -->
    <div class="svg-background">
      <img src="@/assets/SVG/FORM-07.svg" alt="" class="bg-svg bg-svg-1" />
      <img src="@/assets/SVG/FORM-08.svg" alt="" class="bg-svg bg-svg-2" />
      <img src="@/assets/SVG/FORM-09.svg" alt="" class="bg-svg bg-svg-3" />
      <img src="@/assets/SVG/FORM-10.svg" alt="" class="bg-svg bg-svg-4" />
      <img src="@/assets/SVG/FORM-11.svg" alt="" class="bg-svg bg-svg-5" />
      <img src="@/assets/SVG/FORM-12.svg" alt="" class="bg-svg bg-svg-6" />
    </div>
    
    <main class="min-h-screen relative z-10">
    <!-- Contenido principal con productos -->
    <div class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Grid de productos -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="producto in productosFiltrados" :key="producto.id" class="polaroid-card group">
            <!-- Imagen del producto con borde polaroid -->
            <div class="polaroid-image">
              <img src="@/assets/vista1.jpg" :alt="producto.nombre" class="polaroid-photo" />
            </div>

            <!-- Contenido del producto (como etiqueta de polaroid) -->
            <div class="polaroid-label">
              <!-- Nombre -->
              <h3 class="polaroid-title">
                {{ producto.nombre }}
              </h3>

              <!-- Descripción breve -->
              <p class="polaroid-description">
                {{ producto.descripcion }}
              </p>

              <!-- Botón comprar -->
              <button @click="comprarProducto(producto)" class="polaroid-button">
                Comprar
              </button>
            </div>
          </div>
        </div>

        <!-- Mensaje si no hay productos -->
        <div v-if="productosFiltrados.length === 0" class="text-center py-16">
          <h3 class="text-2xl font-bold text-gray-600 mb-2">No hay experiencias disponibles</h3>
          <p class="text-gray-500">Vuelve más tarde para descubrir nuevas experiencias culturales</p>
        </div>
      </div>

      <!-- Botón de regreso -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div class="text-center">
          <RouterLink :to="getBackRoute()"
            class="inline-flex items-center px-6 py-3 bg-white border border-gray-300 text-gray-700 font-thin rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:border-gray-400">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18">
              </path>
            </svg>
            Volver a Experiencias
          </RouterLink>
        </div>
      </div>
    </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
/* Estilos Polaroid */
.polaroid-card {
  background: #ffffff;
  padding: 1rem 1rem 1.5rem 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  transition: all 0.3s ease;
  transform: rotate(-1deg);
  max-width: 100%;
}

.polaroid-card:nth-child(even) {
  transform: rotate(1deg);
}

.polaroid-card:nth-child(3n) {
  transform: rotate(-0.5deg);
}

.polaroid-card:hover {
  transform: rotate(0deg) scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.1);
}

.polaroid-image {
  background: #ffffff;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.05);
}

.polaroid-photo {
  width: 100%;
  height: 280px;
  object-fit: cover;
  display: block;
  filter: sepia(10%) contrast(1.05);
}

.polaroid-label {
  padding: 0.5rem 0;
  text-align: center;
}

.polaroid-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
  line-height: 1.4;
  transition: color 0.3s ease;
}

.polaroid-card:hover .polaroid-title {
  color: #d97706;
}

.polaroid-description {
  font-size: 0.875rem;
  color: #4b5563;
  line-height: 1.5;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.polaroid-button {
  width: 100%;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(to right, #f59e0b, #ea580c);
  color: #ffffff;
  font-weight: 600;
  font-size: 0.875rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.polaroid-button:hover {
  background: linear-gradient(to right, #d97706, #dc2626);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.polaroid-button:active {
  transform: translateY(0);
}

/* Animaciones personalizadas */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.polaroid-card {
  animation: fadeInUp 0.6s ease-out;
}

.polaroid-card:nth-child(2) {
  animation-delay: 0.1s;
}

.polaroid-card:nth-child(3) {
  animation-delay: 0.2s;
}

.polaroid-card:nth-child(4) {
  animation-delay: 0.3s;
}

.polaroid-card:nth-child(5) {
  animation-delay: 0.4s;
}

.polaroid-card:nth-child(6) {
  animation-delay: 0.5s;
}

// Wrapper container
.view-wrapper {
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
</style>
