import { expect, test } from '@playwright/test'

// Regresión: OlfatoView.vue era un placeholder estático ("Próximamente") que
// nunca llamaba a useProductos().cargarPorSentido('olfato'), así que los
// productos creados desde el panel de administración no se veían nunca en la
// web pública aunque existieran en Firestore. No hay entorno de Firebase de
// pruebas aislado (ver CLAUDE.md), así que este test lee la colección real
// `olfato` — es una lectura, no muta datos.
test('la vista pública de Olfato carga y muestra los productos de Firestore', async ({ page }) => {
  await page.goto('/experiencia/olfato')

  await expect(page.getByRole('heading', { name: 'Colección Olfativa' })).toBeVisible()

  // Espera a que termine el estado de carga antes de comprobar el resultado.
  await expect(page.getByText('Cargando productos…')).toHaveCount(0, { timeout: 15_000 })

  // El bug exacto que se reporta: el placeholder "en preparación" ya no debe
  // aparecer nunca en esta vista (esa vista se sustituyó por la real).
  await expect(page.getByText('Esta colección está en preparación')).toHaveCount(0)

  // Con el fix, la vista debe reflejar el estado real de Firestore: o hay
  // productos (caso reportado por el usuario, que ya creó uno desde el panel)
  // o, si la colección está vacía, el mensaje explícito de "sin productos"
  // (nunca el placeholder estático anterior).
  const productCards = page.locator('.product-card')
  const emptyState = page.getByText('Todavía no hay productos en esta colección.')

  await expect(productCards.first().or(emptyState)).toBeVisible({ timeout: 15_000 })
})
