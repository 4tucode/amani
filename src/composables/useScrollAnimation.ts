import { ref, onMounted, onUnmounted } from 'vue'

export function useScrollAnimation() {
  const animatedElements = ref<Set<Element>>(new Set())
  const observer = ref<IntersectionObserver | null>(null)

  const fadeInUpClasses = 'opacity-0 translate-y-8 transition-all duration-700 ease-out'
  const fadeInDownClasses = 'opacity-0 -translate-y-8 transition-all duration-700 ease-out'
  const visibleClasses = 'opacity-100 translate-y-0'

  const initObserver = () => {
    observer.value = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedElements.value.has(entry.target)) {
            // Obtener delay escalonado si existe
            const staggerDelay = entry.target.getAttribute('data-stagger-delay')
            const delay = staggerDelay ? parseInt(staggerDelay) + 100 : 100

            // Agregar clase visible después del delay calculado
            setTimeout(() => {
              entry.target.classList.remove('opacity-0', 'translate-y-8', '-translate-y-8')
              entry.target.classList.add('opacity-100', 'translate-y-0')
              animatedElements.value.add(entry.target)
            }, delay)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      },
    )
  }

  const observeElement = (
    element: Element,
    animationType: 'fadeInUp' | 'fadeInDown' = 'fadeInUp',
  ) => {
    if (!observer.value) return

    // Aplicar clases iniciales según el tipo de animación
    if (animationType === 'fadeInUp') {
      element.classList.add(...fadeInUpClasses.split(' '))
    } else {
      element.classList.add(...fadeInDownClasses.split(' '))
    }

    observer.value.observe(element)
  }

  const observeElements = (
    selector: string,
    animationType: 'fadeInUp' | 'fadeInDown' = 'fadeInUp',
    staggerDelay: number = 0,
  ) => {
    const elements = document.querySelectorAll(selector)
    elements.forEach((element, index) => {
      // Agregar delay escalonado para elementos múltiples
      if (staggerDelay > 0) {
        element.setAttribute('data-stagger-delay', (index * staggerDelay).toString())
      }
      observeElement(element, animationType)
    })
  }

  onMounted(() => {
    initObserver()
  })

  onUnmounted(() => {
    if (observer.value) {
      observer.value.disconnect()
    }
  })

  return {
    observeElement,
    observeElements,
  }
}
