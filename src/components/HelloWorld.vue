<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="bg-gradient-to-r from-blue-500 to-purple-600 p-8 rounded-lg shadow-xl">
    <h1 class="text-4xl font-bold text-white mb-4 text-center font-montserrat">{{ msg }}</h1>
    <h3 class="text-lg text-white/90 text-center leading-relaxed">
      You've successfully created a project with
      <a href="https://vite.dev/" target="_blank" rel="noopener" class="text-yellow-300 hover:text-yellow-100 underline transition-colors">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener" class="text-yellow-300 hover:text-yellow-100 underline transition-colors">Vue 3</a> +
      <span class="text-green-300 font-semibold">Tailwind CSS</span>. What's next?
    </h3>
    <div class="mt-6 text-center">
      <div class="inline-flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
        <span class="text-white text-sm">✨ Tailwind CSS está funcionando!</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Estilos adicionales si son necesarios */
</style>
