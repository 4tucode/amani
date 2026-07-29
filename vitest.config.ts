import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitest/config'

// Los tests de Playwright viven aparte, en tests/e2e (ver playwright.config.ts):
// usan su propio test runner y no deben ejecutarse con Vitest.
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],
    exclude: ['tests/e2e/**'],
  },
})
