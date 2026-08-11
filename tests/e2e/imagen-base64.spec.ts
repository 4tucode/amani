import { expect, test } from '@playwright/test'
import { readFileSync, statSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Verifica en un navegador real (no en Node, que no sabe codificar WebP) que
// imagenABase64 —la función que usa el panel de administración para subir
// fotos de producto— comprime de verdad una foto real del repositorio, y no
// solo en teoría.

const FOTO_REAL = resolve(
  __dirname,
  '../../src/assets/productos/fotos-productos/Vista/v1.jpg',
)

test('imagenABase64 comprime notablemente una foto de producto real', async ({ page }) => {
  await page.goto('/tests/e2e/fixtures/imagen-base64.html')
  await page.waitForFunction(() => (window as unknown as { __fixtureReady?: boolean }).__fixtureReady === true)

  const pesoOriginal = statSync(FOTO_REAL).size
  const base64Original = readFileSync(FOTO_REAL).toString('base64')

  const { mime, pesoComprimido } = await page.evaluate(async (base64Original) => {
    const binario = atob(base64Original)
    const bytes = new Uint8Array(binario.length)
    for (let i = 0; i < binario.length; i++) bytes[i] = binario.charCodeAt(i)
    const archivo = new File([bytes], 'v1.jpg', { type: 'image/jpeg' })

    const dataUrl = await (window as unknown as {
      __imagenABase64: (f: File) => Promise<string>
    }).__imagenABase64(archivo)

    const mime = dataUrl.slice(5, dataUrl.indexOf(';'))
    const payload = dataUrl.slice(dataUrl.indexOf(',') + 1)
    const pesoComprimido = atob(payload).length
    return { mime, pesoComprimido }
  }, base64Original)

  // Chromium sabe codificar WebP desde <canvas>, así que debe tomar esa rama
  // (y no el fallback a JPEG pensado para navegadores sin soporte).
  expect(mime).toBe('image/webp')

  // La foto real (1512x2016) supera el máximo de 1280px, así que además del
  // cambio de formato hay redimensionado: el ahorro debe ser sustancial.
  expect(pesoComprimido, `${pesoOriginal}B -> ${pesoComprimido}B`).toBeLessThan(pesoOriginal * 0.6)
})
