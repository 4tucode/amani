<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { useGsapReveal } from '../composables/useGsapReveal'

const secciones = [
  {
    icono: 'mdi:whatsapp',
    titulo: 'Pedidos',
    lineas: [
      'Los pedidos se realizan por WhatsApp a través del enlace de nuestra web. Te confirmamos stock, precio y forma de envío antes de finalizar.',
    ],
  },
  {
    icono: 'mdi:credit-card-outline',
    titulo: 'Pagos',
    lineas: [
      'Aceptamos Bizum y transferencia. El pedido se prepara cuando el pago está confirmado.',
    ],
  },
  {
    icono: 'mdi:truck-delivery-outline',
    titulo: 'Envíos',
    lineas: [
      'Envío por mensajería certificada.',
      'Plazo orientativo: 24–72 h en España peninsular.',
      'Recibirás tu número de seguimiento.',
    ],
  },
  {
    icono: 'mdi:candy-outline',
    titulo: 'Chocolate',
    lineas: [
      'Producto alimentario: solo admite devolución si llega dañado o en mal estado. Usamos embalaje adecuado para protegerlo durante el transporte.',
    ],
  },
  {
    icono: 'mdi:hanger',
    titulo: 'Tela Africana',
    lineas: [
      'Debe devolverse sin cortar, sin usar y con su embalaje original.',
      'Dispones de 14 días naturales para solicitar devolución.',
    ],
  },
  {
    icono: 'mdi:swap-horizontal',
    titulo: 'Cambios y devoluciones',
    lineas: [
      'Los gastos de devolución corren a cargo del cliente, salvo error o defecto. Reembolso en un máximo de 7 días tras recibir el producto.',
    ],
  },
  {
    icono: 'mdi:close-circle-outline',
    titulo: 'Cancelaciones',
    lineas: [
      'Puedes cancelar antes del envío.',
      'El chocolate no se puede cancelar si ya está preparado para envío.',
    ],
  },
  {
    icono: 'mdi:headset',
    titulo: 'Atención al cliente',
    lineas: [
      'WhatsApp disponible de lunes a viernes, 9:00–18:00.',
    ],
  },
]

const rootEl = ref<HTMLElement | null>(null)
useGsapReveal(rootEl)
</script>

<template>
  <div class="politica-view" ref="rootEl">
    <article class="doc">
      <header class="header" data-reveal>
        <div class="eyebrow">
          <span class="ew-line" />
          <span class="ew-text">Compra con confianza</span>
        </div>
        <h1 class="title">Política de Compra</h1>
        <p class="subtitle">Todo lo que necesitas saber antes de hacer tu pedido</p>
      </header>

      <section
        v-for="seccion in secciones"
        :key="seccion.titulo"
        class="seccion"
        data-reveal
        data-reveal-group="politica"
      >
        <h2 class="seccion-title">
          <Icon :icon="seccion.icono" class="seccion-icon" aria-hidden="true" />
          {{ seccion.titulo }}
        </h2>
        <p v-for="linea in seccion.lineas" :key="linea" class="seccion-text">{{ linea }}</p>
      </section>
    </article>
  </div>
</template>

<style scoped lang="scss">
/* ── Contenedor ── */
.politica-view {
  min-height: 100%;
  background: #ecedf4;
  padding: 3.5rem 3rem 4.5rem;
}

.doc {
  max-width: 640px;
  margin: 0 auto;
}

/* ── Cabecera ── */
.header {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  margin-bottom: 3rem;
}

.eyebrow {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.ew-line {
  flex: 0 0 36px;
  height: 1px;
  background: rgba(140, 58, 80, 0.35);
}

.ew-text {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: #8c3a50;
  white-space: nowrap;
}

.title {
  font-family: 'Nunito Sans', sans-serif;
  font-size: clamp(1.7rem, 3vw, 2.4rem);
  font-weight: 800;
  text-transform: uppercase;
  color: #3d1a26;
  letter-spacing: 0.03em;
  margin: 0;
  line-height: 1.15;
}

.subtitle {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 1.05rem;
  font-style: italic;
  color: #7a5560;
  margin: 0;
  line-height: 1.6;
}

/* ── Secciones ── */
.seccion {
  padding: 1.75rem 0;
  border-top: 1px solid rgba(140, 58, 80, 0.12);
}

.seccion-title {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #3d1a26;
  margin: 0 0 0.85rem;
}

.seccion-icon {
  font-size: 1.25rem;
  color: #8c3a50;
  flex-shrink: 0;
}

.seccion-text {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 1rem;
  color: #7a5560;
  line-height: 1.75;
  margin: 0;

  & + & {
    margin-top: 0.5rem;
  }
}

/* ── Móvil ── */
@media (max-width: 480px) {
  .politica-view {
    padding: 2rem 1.25rem 3rem;
  }

  .header {
    margin-bottom: 2rem;
  }

  .seccion {
    padding: 1.4rem 0;
  }
}
</style>
