<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'

const isMenuOpen = ref(false)
const isScrolled = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

// Handle scroll effect
const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// Menu items
const menuItems = [
  {
    name: 'Inicio',
    path: '/',
    textColor: 'text-gray-700',
    hoverColor: 'hover:text-amber-600'
  },
  {
    name: 'Acerca de',
    path: '/about',
    textColor: 'text-gray-700',
    hoverColor: 'hover:text-amber-600'
  },
  {
    name: 'Blog',
    path: '/blog',
    textColor: 'text-gray-700',
    hoverColor: 'hover:text-amber-600'
  },
  {
    name: 'Contacto',
    path: '/contact',
    textColor: 'text-gray-700',
    hoverColor: 'hover:text-amber-600'
  }
]

</script>

<template>
  <!-- Header Horizontal en la parte superior -->
  <header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-inter w-full"
    :class="isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white/90 backdrop-blur-sm'">

    <div class="w-full px-4 sm:px-6 lg:px-8 py-3 md:py-4">
      <div class="flex flex-row items-center justify-between w-full">
        <!-- Logo Section (Left) -->
        <RouterLink to="/" @click="closeMenu" class="group flex items-center">
          <div
            class="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-white rounded-full flex items-center justify-center p-2 md:p-2.5 group-hover:scale-105 transition-all duration-300 shadow-lg">
            <img src="@/assets/logo_amani.png" alt="Logo Amani" class="w-full h-full object-contain" />
          </div>
        </RouterLink>

        <!-- Desktop Navigation Menu (Right) -->
        <nav class="hidden md:flex flex-row items-center gap-4 lg:gap-6 xl:gap-8">
          <RouterLink v-for="item in menuItems" :key="item.path" :to="item.path"
            class="menu-item-text-only flex items-center justify-center rounded-lg transition-all duration-300 group font-thin relative text-sm md:text-base lg:text-lg"
            :class="[item.textColor, item.hoverColor]" active-class="text-amber-600">
            <span class="whitespace-nowrap">{{ item.name }}</span>
          </RouterLink>
        </nav>

        <!-- Mobile Menu Button -->
        <button @click="toggleMenu"
          class="md:hidden p-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-lg transition-all duration-300 hover:scale-105">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu Dropdown -->
    <Transition name="mobile-menu">
      <div v-show="isMenuOpen" class="md:hidden bg-white border-t border-gray-200 shadow-xl w-full">
        <div class="w-full px-4 py-4">
          <!-- Mobile Navigation -->
          <nav class="flex flex-row items-center justify-center space-x-2">
            <RouterLink v-for="item in menuItems" :key="item.path" :to="item.path" @click="closeMenu"
              class="menu-item-text-only flex items-center justify-center px-4 py-2 rounded-lg transition-all duration-300 group font-thin text-sm"
              :class="[item.textColor, item.hoverColor]" active-class="text-amber-600">
              <span>{{ item.name }}</span>
            </RouterLink>
          </nav>
        </div>
      </div>
    </Transition>
  </header>

  <!-- Spacer para el contenido principal -->
  <div class="h-20 md:h-24 lg:h-20"></div>
</template>

<style scoped>
/* Animación para el menú móvil */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.3s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
}

.mobile-menu-enter-from {
  transform: translateX(-100%);
}

.mobile-menu-leave-to {
  transform: translateX(-100%);
}

.mobile-menu-enter-to,
.mobile-menu-leave-from {
  opacity: 1;
  transform: translateX(0);
}

/* Estilos para el menú de texto con animación hover */
.menu-item-text-only {
  position: relative;
  overflow: hidden;
}

.menu-item-text-only::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: linear-gradient(to right, transparent, #f59e0b, transparent);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateX(-50%);
}

.menu-item-text-only:hover::after {
  width: 100%;
}

.menu-item-text-only:hover {
  transform: translateY(-2px);
  letter-spacing: 0.05em;
}
</style>
