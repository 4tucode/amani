<script setup lang="ts">
import TheHeader from './components/TheHeader.vue'
import GlobalMusicPlayer from './components/GlobalMusicPlayer.vue'
</script>

<template>
  <div class="app-root">
    <!-- Sidebar -->
    <TheHeader />

    <!-- Right side -->
    <div class="app-content">
      <!-- Top bar -->
      <div class="top-bar">
        <span class="top-bar-wordmark">AMANI</span>
        <span class="top-bar-line" />
      </div>

      <!-- Main content -->
      <main class="app-main">
        <RouterView v-slot="{ Component }">
          <Transition name="page-fade" mode="out-in">
            <component :is="Component" />
          </Transition>
        </RouterView>
      </main>
    </div>

    <!-- Global music player (fixed, unaffected by layout) -->
    <GlobalMusicPlayer />
  </div>
</template>

<style scoped>
.app-root {
  height: 100vh;
  overflow: hidden;
  display: flex;
  background: #ecedf4;
  font-family: 'Syne', sans-serif;
}

.app-content {
  flex: 1;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.top-bar {
  height: 54px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  padding: 0 2.5rem;
  gap: 1.25rem;
  border-bottom: 1px solid rgba(140, 58, 80, 0.08);
}

.top-bar-wordmark {
  font-family: 'Syne', sans-serif;
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.35em;
  color: rgba(61, 26, 38, 0.35);
  text-transform: uppercase;
  white-space: nowrap;
}

.top-bar-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, rgba(184, 154, 90, 0.3), transparent);
}

.app-main {
  flex: 1;
  overflow-y: auto;
  position: relative;
}

/* Page fade transition */
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.45s ease;
}

.page-fade-enter-from,
.page-fade-leave-to {
  opacity: 0;
}
</style>
