<script setup lang="ts">
import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'
import GlobalMusicPlayer from './components/GlobalMusicPlayer.vue'
</script>

<template>
  <div class="min-h-screen bg-[#dcdee9] flex flex-col font-inter font-bold">
    <!-- Header -->
    <TheHeader />

    <!-- Main Content with padding for fixed header -->
    <main class="flex-1">
      <RouterView />
    </main>

    <!-- Footer -->
    <div class="">
      <TheFooter />
    </div>

    <!-- Reproductor de música global -->
    <GlobalMusicPlayer />
  </div>
</template>
