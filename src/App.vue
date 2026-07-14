<script setup lang="ts">
import gsap from 'gsap'
import TheHeader from './components/TheHeader.vue'
import GlobalMusicPlayer from './components/GlobalMusicPlayer.vue'

// Solo opacidad: trasladar en `y` extiende el scrollable overflow de `.app-main`
// mientras dura la animación y produce saltos de scroll en cada navegación.
function onEnter(el: Element, done: () => void) {
  gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power1.out', onComplete: done })
}

function onLeave(el: Element, done: () => void) {
  gsap.to(el, { opacity: 0, duration: 0.25, ease: 'power1.in', onComplete: done })
}
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
          <Transition :css="false" mode="out-in" @enter="onEnter" @leave="onLeave">
            <component :is="Component" />
          </Transition>
        </RouterView>
      </main>

      <!-- Footer -->
      <footer class="app-footer">
        <RouterLink to="/politica-de-compra" class="footer-link">Política de compra</RouterLink>
      </footer>
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
  font-family: 'Nunito Sans', sans-serif;
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
  font-family: 'Nunito Sans', sans-serif;
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

.app-footer {
  height: 40px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 2.5rem;
  border-top: 1px solid rgba(140, 58, 80, 0.08);
}

.footer-link {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(61, 26, 38, 0.4);
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: #8c3a50;
}

/* ── Móvil: la barra de navegación pasa a fija abajo (ver TheHeader) ── */
@media (max-width: 480px) {
  .top-bar {
    padding: 0 1.25rem;
    height: 46px;
  }

  .app-main {
    padding-bottom: 60px;
  }

  /* La nav móvil es fija abajo: el footer sube por encima de ella */
  .app-footer {
    margin-bottom: 60px;
    padding: 0 1.25rem;
  }
}
</style>
