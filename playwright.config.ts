import { defineConfig } from '@playwright/test'

const PORT = 5183

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30_000,
  fullyParallel: true,
  webServer: {
    command: `npm run dev -- --port ${PORT} --strictPort`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
  use: {
    baseURL: `http://localhost:${PORT}`,
    // El Chromium preinstalado en este entorno no siempre coincide con la
    // revisión que espera @playwright/test; se apunta al binario real en vez
    // de descargar uno nuevo.
    launchOptions: {
      executablePath: '/opt/pw-browsers/chromium',
    },
  },
})
