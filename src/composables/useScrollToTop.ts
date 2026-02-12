import { onMounted } from 'vue'

/**
 * Composable para hacer scroll hacia arriba de la página
 * Se ejecuta automáticamente cuando se monta el componente
 */
export function useScrollToTop() {
  onMounted(() => {
    // Pequeño delay para asegurar que el DOM esté completamente renderizado
    setTimeout(() => {
      // Scroll suave hacia arriba
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      })
    }, 50)
  })
}
