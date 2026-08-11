import { watch } from 'vue'
import type { Ref } from 'vue'
import type { Producto } from '../types/producto'
import { useJsonLd } from './useJsonLd'
import { SITE_URL } from '../utils/seoMeta'

// Publica los productos de una colección (vista, oído, gusto, tacto) como
// ItemList/Product de schema.org en cuanto llegan de Firestore, para que
// Google pueda entenderlos como catálogo aunque se carguen por JS.
export function useProductosJsonLd(id: string, sentidoPath: string, productos: Ref<Producto[]>) {
  const jsonLd = useJsonLd(id)

  watch(
    productos,
    (list) => {
      if (!list.length) {
        jsonLd.clear()
        return
      }
      jsonLd.set({
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        url: `${SITE_URL}${sentidoPath}`,
        itemListElement: list.map((producto, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'Product',
            name: producto.nombre,
            description: producto.descripcion,
            image: producto.imgs[0] || undefined,
            url: `${SITE_URL}${sentidoPath}`,
            brand: { '@type': 'Brand', name: 'Amani' },
            offers: {
              '@type': 'Offer',
              priceCurrency: 'EUR',
              price: producto.precio,
              availability: producto.agotado
                ? 'https://schema.org/OutOfStock'
                : 'https://schema.org/InStock',
            },
          },
        })),
      })
    },
    { immediate: true },
  )
}
