import { onBeforeUnmount, onMounted, type Ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const DEFAULT_SCROLLER = '.app-main'

/** Encuentra el ancestro con scroll propio (contenedor `.panel` o el `.app-main` global). */
function findScroller(el: Element): Element | Window {
  let node = el.parentElement
  while (node) {
    const overflowY = getComputedStyle(node).overflowY
    if (overflowY === 'auto' || overflowY === 'scroll') return node
    node = node.parentElement
  }
  return document.querySelector(DEFAULT_SCROLLER) ?? window
}

/**
 * Anima al entrar en viewport todo elemento `[data-reveal]` dentro de `root`.
 * Los que comparten `data-reveal-group="x"` se animan en cascada (stagger).
 * Se dispara una sola vez por elemento; respeta prefers-reduced-motion.
 */
export function useGsapReveal(root: Ref<HTMLElement | null>) {
  let ctx: gsap.Context | undefined

  onMounted(() => {
    if (!root.value) return

    ctx = gsap.context(() => {
      const groups = new Map<string, HTMLElement[]>()
      const singles: HTMLElement[] = []

      root.value!.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
        const group = el.dataset.revealGroup
        if (group) {
          if (!groups.has(group)) groups.set(group, [])
          groups.get(group)!.push(el)
        } else {
          singles.push(el)
        }
      })

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduceMotion) {
        gsap.set([...singles, ...groups.values()].flat(), { opacity: 1 })
        return
      }

      // Solo opacidad: animar `y` extendería el scrollable overflow del contenedor
      // (el scroll-height incluye la geometría transformada) y produce saltos de scroll.
      singles.forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          duration: 0.6,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: el,
            scroller: findScroller(el),
            start: 'top 88%',
            once: true,
          },
        })
      })

      groups.forEach((els) => {
        gsap.from(els, {
          opacity: 0,
          duration: 0.55,
          ease: 'power1.out',
          stagger: 0.09,
          scrollTrigger: {
            trigger: els[0],
            scroller: findScroller(els[0]),
            start: 'top 90%',
            once: true,
          },
        })
      })
    }, root.value)
  })

  onBeforeUnmount(() => ctx?.revert())
}
