import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    // Comprime en el build las imágenes importadas desde src/assets (jpg/png/svg),
    // sin tocar las referencias en los componentes: el resultado sustituye al
    // original con el mismo nombre de archivo.
    ViteImageOptimizer({
      jpg: { quality: 75 },
      jpeg: { quality: 75 },
      png: { quality: 75 },
      webp: { lossless: false, quality: 75 },
      svg: {
        multipass: true,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
