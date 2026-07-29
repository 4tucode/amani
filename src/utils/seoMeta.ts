// Utilidades compartidas para actualizar el <head> en una SPA sin SSR.
export const SITE_URL = 'https://www.amanisenses.com'

export function setMetaTag(attr: 'name' | 'property', key: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attr, key)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

// Crea/actualiza/elimina un <script type="application/ld+json"> identificado por `id`,
// para que cada vista pueda gestionar sus propios datos estructurados sin pisar los de otras.
export function setJsonLd(id: string, data: Record<string, unknown> | null) {
  const selector = `script[data-seo-id="${id}"]`
  let script = document.head.querySelector<HTMLScriptElement>(selector)
  if (!data) {
    script?.remove()
    return
  }
  if (!script) {
    script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute('data-seo-id', id)
    document.head.appendChild(script)
  }
  script.textContent = JSON.stringify(data)
}
