import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { build } from 'vite'
import { mkdtempSync, readdirSync, rmSync, statSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'

// Verifica con datos reales (los assets tal cual viven en el repo) que
// vite-plugin-image-optimizer reduce de verdad el peso de las imágenes en el
// build de producción, en vez de fiarnos de la palabra del plugin.

const ROOT = resolve(__dirname, '..')
let outDir: string

beforeAll(async () => {
  outDir = mkdtempSync(join(tmpdir(), 'amani-build-'))
  await build({
    root: ROOT,
    configFile: resolve(ROOT, 'vite.config.ts'),
    logLevel: 'warn',
    build: {
      outDir,
      emptyOutDir: true,
    },
  })
}, 120_000)

afterAll(() => {
  rmSync(outDir, { recursive: true, force: true })
})

// Los assets importados desde src/ salen con un hash en el nombre
// (p.ej. vista-BnrIghPD.png), así que localizamos por prefijo.
function pesoAssetOptimizado(baseName: string): number {
  const assetsDir = join(outDir, 'assets')
  const encontrado = readdirSync(assetsDir).find((f) => f.startsWith(`${baseName}-`))
  if (!encontrado) throw new Error(`No se generó ningún asset para "${baseName}" en ${assetsDir}`)
  return statSync(join(assetsDir, encontrado)).size
}

function pesoPublico(rutaRelativa: string): number {
  return statSync(join(outDir, rutaRelativa)).size
}

describe('compresión de imágenes en el build de producción', () => {
  it('reduce de forma notable el peso de los PNG del cómic (assets importados)', () => {
    const casos = [
      { origen: 'src/assets/comic/vista.png', distBaseName: 'vista' },
      { origen: 'src/assets/comic/tacto.png', distBaseName: 'tacto' },
      { origen: 'src/assets/comic/gusto.png', distBaseName: 'gusto' },
      { origen: 'src/assets/comic/oido.png', distBaseName: 'oido' },
      { origen: 'src/assets/comic/olfato.png', distBaseName: 'olfato' },
    ]

    for (const { origen, distBaseName } of casos) {
      const pesoOriginal = statSync(resolve(ROOT, origen)).size
      const pesoFinal = pesoAssetOptimizado(distBaseName)

      // Umbral conservador: en la práctica se observan ahorros del 44-72%.
      expect(pesoFinal, `${origen}: ${pesoOriginal}B -> ${pesoFinal}B`).toBeLessThan(pesoOriginal * 0.7)
    }
  })

  it('reduce de forma notable el peso del logo (asset importado desde un componente)', () => {
    const pesoOriginal = statSync(resolve(ROOT, 'src/assets/logo_amani.png')).size
    const pesoFinal = pesoAssetOptimizado('logo_amani')

    expect(pesoFinal, `logo_amani.png: ${pesoOriginal}B -> ${pesoFinal}B`).toBeLessThan(pesoOriginal * 0.7)
  })

  it('reduce de forma notable el peso de los PNG servidos desde /public', () => {
    const casos = [
      { origen: 'public/logo.png', dist: 'logo.png' },
      { origen: 'public/apple-touch-icon.png', dist: 'apple-touch-icon.png' },
    ]

    for (const { origen, dist } of casos) {
      const pesoOriginal = statSync(resolve(ROOT, origen)).size
      const pesoFinal = pesoPublico(dist)

      expect(pesoFinal, `${origen}: ${pesoOriginal}B -> ${pesoFinal}B`).toBeLessThan(pesoOriginal * 0.6)
    }
  })
})
