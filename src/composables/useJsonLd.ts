import { onUnmounted } from 'vue'
import { setJsonLd } from '../utils/seoMeta'

// Wrapper de `setJsonLd` para uso dentro de componentes: limpia el <script>
// automáticamente al desmontar, para que no queden datos estructurados obsoletos
// de una vista al navegar a otra.
export function useJsonLd(id: string) {
  const set = (data: Record<string, unknown>) => setJsonLd(id, data)
  const clear = () => setJsonLd(id, null)

  onUnmounted(clear)

  return { set, clear }
}
