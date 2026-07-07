<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const navItems = [
  { label: 'Inicio', path: '/' },
  { label: 'Acerca de', path: '/about' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contacto', path: '/contact' },
]

const isActive = (item: (typeof navItems)[0]) => {
  if (item.path === '/') return route.path === '/'
  return route.path.startsWith(item.path)
}
</script>

<template>
  <aside class="sidebar">
    <!-- Logo -->
    <button class="logo-wrap" @click="router.push('/')" aria-label="Inicio">
      <div class="logo-circle">
        <img src="@/assets/logo_amani.png" alt="Amani" />
      </div>
    </button>

    <!-- Navigation -->
    <nav class="sidebar-nav">
      <button
        v-for="item in navItems"
        :key="item.label"
        class="nav-item"
        :class="{ active: isActive(item) }"
        @click="router.push(item.path)"
      >
        <span class="nav-marker" />
        <span class="nav-label">{{ item.label }}</span>
      </button>
    </nav>

    <!-- Social -->
    <div class="social-dots">
      <a href="#" aria-label="Instagram" class="social-dot">
        <font-awesome-icon :icon="['fab', 'instagram']" />
      </a>
      <a href="#" aria-label="Facebook" class="social-dot">
        <font-awesome-icon :icon="['fab', 'facebook']" />
      </a>
      <a href="#" aria-label="Twitter" class="social-dot">
        <font-awesome-icon :icon="['fab', 'twitter']" />
      </a>
    </div>
  </aside>
</template>

<style scoped lang="scss">
.sidebar {
  width: 80px;
  height: 100vh;
  background: #ecedf4;
  border-right: 1px solid rgba(140, 58, 80, 0.12);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem 0 1.25rem;
  position: relative;
  z-index: 100;
  flex-shrink: 0;
}

.logo-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2.5rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.logo-circle {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: #ffffff;
  box-shadow:
    0 2px 10px rgba(61, 26, 38, 0.14),
    0 0 0 1.5px rgba(184, 154, 90, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  img {
    width: 76%;
    height: 76%;
    object-fit: contain;
  }

  &:hover {
    transform: scale(1.06);
    box-shadow:
      0 4px 16px rgba(61, 26, 38, 0.18),
      0 0 0 1.5px rgba(184, 154, 90, 0.5);
  }
}

.sidebar-nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.nav-item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1.2rem 0;
  background: none;
  border: none;
  cursor: pointer;
  color: rgba(61, 26, 38, 0.45);
  transition: color 0.2s ease;

  &:hover {
    color: #3d1a26;
  }

  &.active {
    color: #3d1a26;

    .nav-marker {
      opacity: 1;
      height: 22px;
    }
  }
}

.nav-marker {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 0;
  background: #8c3a50;
  border-radius: 0 2px 2px 0;
  opacity: 0;
  transition:
    opacity 0.25s ease,
    height 0.25s ease;
}

.nav-label {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  transform: rotate(180deg);
  white-space: nowrap;
  margin-left: 10px;
}

.social-dots {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  padding-top: 0.75rem;
}

.social-dot {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: 1.5px solid rgba(140, 58, 80, 0.22);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8c3a50;
  font-size: 0.65rem;
  transition:
    background 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease;
  text-decoration: none;

  &:hover {
    background: #8c3a50;
    color: #ffffff;
    border-color: #8c3a50;
  }
}

/* ── Móvil: sidebar vertical → barra de navegación inferior ── */
@media (max-width: 480px) {
  .sidebar {
    width: 100%;
    height: 60px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 0;
    border-right: none;
    border-top: 1px solid rgba(140, 58, 80, 0.12);
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 200;
  }

  .logo-wrap,
  .social-dots {
    display: none;
  }

  .sidebar-nav {
    flex: 1;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    height: 100%;
    gap: 0;
  }

  .nav-item {
    flex-direction: column;
    width: auto;
    flex: 1;
    height: 100%;
    padding: 0;
    gap: 0.3rem;
  }

  .nav-marker {
    width: 18px;
    height: 2px;
    left: 50%;
    top: auto;
    bottom: 6px;
    transform: translateX(-50%);
    border-radius: 2px;

    .nav-item.active & {
      height: 2px;
    }
  }

  .nav-label {
    writing-mode: horizontal-tb;
    text-orientation: initial;
    transform: none;
    margin-left: 0;
    font-size: 0.55rem;
  }
}
</style>
