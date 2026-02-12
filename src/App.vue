<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'
import GlobalMusicPlayer from './components/GlobalMusicPlayer.vue'
import transitionVideoUrl from './assets/video presentacion.mp4'

const route = useRoute()
const showTransition = ref(false)
const videoRef = ref<HTMLVideoElement | null>(null)
const isFirstRoute = ref(true)
let transitionTimeout: number | undefined

const endTransition = () => {
  showTransition.value = false
  if (transitionTimeout) {
    window.clearTimeout(transitionTimeout)
    transitionTimeout = undefined
  }
  if (videoRef.value) {
    videoRef.value.pause()
    videoRef.value.currentTime = 0
  }
}

watch(
  () => route.fullPath,
  async () => {
    if (isFirstRoute.value) {
      isFirstRoute.value = false
      return
    }

    showTransition.value = true
    if (transitionTimeout) {
      window.clearTimeout(transitionTimeout)
    }

    await nextTick()
    if (videoRef.value) {
      videoRef.value.currentTime = 0
      const playPromise = videoRef.value.play()
      if (playPromise) {
        playPromise.catch(() => undefined)
      }
    }

    transitionTimeout = window.setTimeout(endTransition, 1000)
  }
)
</script>

<template>
  <div class="min-h-screen bg-[#dcdee9] flex flex-col font-inter font-bold">
    <Transition name="video-fade">
      <div
        v-if="showTransition"
        class="fixed inset-0 z-[9999] bg-white flex items-center justify-center"
      >
        <video
          ref="videoRef"
          class="w-full h-full object-cover"
          :src="transitionVideoUrl"
          muted
          playsinline
          @ended="endTransition"
        ></video>
      </div>
    </Transition>
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

<style scoped>
.video-fade-enter-active {
  transition: none;
}

.video-fade-enter-from,
.video-fade-enter-to {
  opacity: 1;
}

.video-fade-leave-active {
  transition: opacity 0.6s ease;
}

.video-fade-leave-from {
  opacity: 1;
}

.video-fade-leave-to {
  opacity: 0;
}
</style>
