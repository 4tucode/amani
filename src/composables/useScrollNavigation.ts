import { nextTick } from 'vue'

/**
 * Función para hacer scroll hacia arriba después de una navegación
 * Útil para usar en botones de navegación o cambios de ruta
 */
export function scrollToTop() {
  nextTick(() => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      })
    }, 100)
  })
}

/**
 * Función para hacer scroll hacia arriba inmediatamente
 * Sin animación, para casos donde se necesita scroll instantáneo
 */
export function scrollToTopInstant() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'auto',
  })
}

