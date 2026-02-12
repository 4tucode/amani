<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import { useScrollToTop } from '../composables/useScrollToTop'

// Hook para hacer scroll hacia arriba al montar el componente
useScrollToTop()

// Datos de artículos del blog
const articulos = ref([
  {
    id: 1,
    titulo: "La magia de los sentidos en la cultura africana",
    descripcion: "Explora cómo los aromas, sabores y texturas forman parte esencial de las tradiciones milenarias del continente africano. Descubre la conexión profunda entre los sentidos y la memoria cultural.",
    imagen: "vista1.jpg",
    fecha: "15 de marzo, 2024",
    autor: "Equipo Amani"
  },
  {
    id: 2,
    titulo: "Viajes sensoriales: conectando culturas",
    descripcion: "Cada experiencia sensorial es un viaje que nos transporta a lugares lejanos. Aprende cómo los productos culturales pueden abrir puertas a nuevas comprensiones y conexiones humanas.",
    imagen: "olfato.jpg",
    fecha: "10 de marzo, 2024",
    autor: "Equipo Amani"
  },
  {
    id: 3,
    titulo: "El poder de la nostalgia en nuestras vidas",
    descripcion: "Los recuerdos sensoriales tienen la capacidad única de despertar emociones profundas. Descubre cómo los aromas y sabores pueden reconectarnos con momentos especiales de nuestro pasado.",
    imagen: "vista1.jpg",
    fecha: "5 de marzo, 2024",
    autor: "Equipo Amani"
  },
  {
    id: 4,
    titulo: "Descubre Guinea Ecuatorial",
    descripcion: "Las olas del mar tararean, en cada marea, su nombre. Guinea Ecuatorial: un pequeño gran tesoro en el corazón de África. Su latido se expande entre frondosas selvas tropicales, majestuosas montañas y playas vírgenes.",
    imagen: "IMG_4522.jpg",
    fecha: "20 de marzo, 2024",
    autor: "Equipo Amani"
  }
])
</script>

<template>
  <main class="min-h-screen bg-[#e9e8dc]">
    <!-- Contenido principal con artículos -->
    <div class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Título de la sección -->
        <div class="text-center mb-12">
          <h1 class="blog-title">Blog</h1>
          <p class="blog-subtitle">Descubre historias, experiencias y reflexiones sobre los sentidos y la cultura</p>
        </div>

        <!-- Grid de artículos -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="articulo in articulos" :key="articulo.id" class="polaroid-card group">
            <!-- Imagen del artículo con borde polaroid -->
            <div class="polaroid-image">
              <img :src="`@/assets/${articulo.imagen}`" :alt="articulo.titulo" class="polaroid-photo" />
            </div>

            <!-- Contenido del artículo (como etiqueta de polaroid) -->
            <div class="polaroid-label">
              <!-- Título -->
              <h3 class="polaroid-title">
                {{ articulo.titulo }}
              </h3>

              <!-- Descripción breve -->
              <p class="polaroid-description">
                {{ articulo.descripcion }}
              </p>

              <!-- Fecha y autor -->
              <div class="polaroid-meta">
                <span class="polaroid-date">{{ articulo.fecha }}</span>
                <span class="polaroid-author">{{ articulo.autor }}</span>
              </div>

              <!-- Botón leer artículo -->
              <RouterLink :to="`/blog/${articulo.id}`" class="polaroid-button">
                Leer artículo
              </RouterLink>
            </div>
          </div>
        </div>

        <!-- Mensaje si no hay artículos -->
        <div v-if="articulos.length === 0" class="text-center py-16">
          <h3 class="text-2xl font-bold text-gray-600 mb-2">No hay artículos disponibles</h3>
          <p class="text-gray-500">Vuelve más tarde para descubrir nuevos contenidos</p>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
/* Título y subtítulo */
.blog-title {
  font-size: 3rem;
  font-weight: 900;
  color: #582a35;
  margin-bottom: 1rem;
}

.blog-subtitle {
  font-size: 1.125rem;
  font-weight: 300;
  color: #4a4a4a;
}

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

.polaroid-meta {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 1rem;
  font-size: 0.75rem;
  color: #6b7280;
}

.polaroid-date {
  font-weight: 400;
}

.polaroid-author {
  font-weight: 300;
  font-style: italic;
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
  text-decoration: none;
  display: block;
  text-align: center;
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
</style>

