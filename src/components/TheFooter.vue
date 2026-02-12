<script setup lang="ts">
// Social media links with Font Awesome icons
const socialLinks = [
  {
    name: 'Instagram',
    url: '#',
    icon: 'instagram',
    color: 'text-pink-500 hover:text-pink-600'
  },
  {
    name: 'Facebook',
    url: '#',
    icon: 'facebook',
    color: 'text-blue-600 hover:text-blue-700'
  },
  {
    name: 'Twitter',
    url: '#',
    icon: 'twitter',
    color: 'text-blue-400 hover:text-blue-500'
  }
]
</script>

<template>
  <footer class="bg-white border-t border-gray-200">
    <!-- Footer Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-5">
      <div class="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
        <!-- Copyright (Left) -->
        <div class="text-xs md:text-sm text-gray-500 order-2 md:order-1">
          © 2024 Amani. Todos los derechos reservados.
        </div>

        <!-- Social Media Icons (Center on mobile, Right on desktop) -->
        <div class="flex flex-row items-center gap-3 order-1 md:order-2">
          <div class="flex space-x-3">
            <a v-for="social in socialLinks" :key="social.name" :href="social.url"
              class="w-8 h-8 md:w-9 md:h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-all duration-300 hover:scale-110"
              :title="social.name">
              <font-awesome-icon :icon="['fab', social.icon]"
                :class="[social.color, 'text-sm md:text-base transition-colors duration-300']" />
            </a>
          </div>
        </div>

        <!-- Legal Links (Right) -->
        <div class="flex space-x-3 md:space-x-4 text-xs md:text-sm order-3">
          <a href="#" class="text-gray-500 hover:text-amber-600 transition-colors duration-300">Privacidad</a>
          <a href="#" class="text-gray-500 hover:text-amber-600 transition-colors duration-300">Términos</a>
          <a href="#" class="text-gray-500 hover:text-amber-600 transition-colors duration-300">Cookies</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* Estilos adicionales para el footer */
footer {
  position: relative;
}
</style>
