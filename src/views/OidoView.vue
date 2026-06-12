<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref, computed } from 'vue'
import { useGlobalMusic } from '../composables/useGlobalMusic'
import ImageLightbox from '../components/ImageLightbox.vue'

const { isExperienciaSensorial } = useGlobalMusic()

const productos = ref([
  { id: 1, nombre: 'Tambores Djembe Tradicionales', descripcion: 'Sumérgete en el poder del djembe, el tambor más emblemático del África Occidental. Cada golpe resuena con siglos de historia, rituales y celebraciones comunales transmitidas de generación en generación.', precio: '79.99', categoria: 'Percusión', rating: 4.8, stock: 10, img: 'https://picsum.photos/seed/djembe-drum/300/300' },
  { id: 2, nombre: 'Música de las Sabanas', descripcion: 'Una colección de grabaciones auténticas captadas en las sabanas africanas. Melodías que transportan a paisajes infinitos donde la naturaleza y la música humana se fusionan en perfecta armonía.', precio: '19.99', categoria: 'Grabación', rating: 4.9, stock: 50, img: 'https://picsum.photos/seed/savanna-music/300/300' },
  { id: 3, nombre: 'Kora del África Occidental', descripcion: 'La kora, instrumento de cuerdas de la tradición mandinga, produce sonidos celestiales que evocan la espiritualidad y la sabiduría de los griots, los guardianes orales de la historia africana.', precio: '299.99', categoria: 'Instrumento', rating: 5.0, stock: 3, img: 'https://picsum.photos/seed/kora-instrument/300/300' },
  { id: 4, nombre: 'Cantos Ceremoniales Bantú', descripcion: 'Voces ancestrales de las comunidades bantú en su expresión más pura. Grabaciones de campo que preservan la riqueza vocal de tradiciones milenarias de todo el continente africano.', precio: '24.99', categoria: 'Grabación', rating: 4.7, stock: 30, img: 'https://picsum.photos/seed/bantu-chant/300/300' },
])

const productosFiltrados = computed(() => productos.value)

const getBackRoute = () => isExperienciaSensorial.value ? '/experiencia-sensorial' : '/experiencia-estandar'

const lightbox = ref<{ src: string; alt: string } | null>(null)

const comprarProducto = (producto: { nombre: string; precio: string }) => {
  const numero = '34680150864'
  const mensaje = encodeURIComponent(`Hola, me interesa comprar el siguiente producto:\n\n📦 ${producto.nombre}\n💰 Precio: €${producto.precio}\n\nPor favor, contacta conmigo para completar la compra.`)
  window.open(`https://wa.me/${numero}?text=${mensaje}`, '_blank')
}
</script>

<template>
  <div class="oido-view">
    <div class="panels-row">

      <!-- ── Panel izquierdo: intro ── -->
      <div class="panel panel-left">

        <RouterLink :to="getBackRoute()" class="back-link">
          <span class="back-arrow">←</span>
          Volver a Experiencias
        </RouterLink>

        <div class="eyebrow">
          <span class="ew-line" />
          <span class="ew-text">Oído</span>
        </div>

        <h1 class="panel-title">{{ productosFiltrados[0].nombre }}</h1>

        <blockquote class="quote">
          <p>{{ productosFiltrados[0].descripcion }}</p>
        </blockquote>

        <div class="article-count">
          <span class="count-num">{{ String(productosFiltrados.length).padStart(2, '0') }}</span>
          <span class="count-label">experiencias sonoras</span>
        </div>

      </div>

      <div class="v-divider" aria-hidden="true" />

      <!-- ── Panel derecho: lista de productos ── -->
      <div class="panel panel-right">

        <div class="eyebrow eyebrow-r">
          <span class="ew-text">Colección</span>
          <span class="ew-line" />
        </div>

        <h2 class="panel-title title-r">Sonidos</h2>

        <ul class="products-list">
          <li
            v-for="(producto, i) in productosFiltrados"
            :key="producto.id"
            class="product-item"
            :style="{ animationDelay: `${0.15 + i * 0.06}s` }"
          >
            <img :src="producto.img" :alt="producto.nombre" class="product-thumb" @click="lightbox = { src: producto.img, alt: producto.nombre }" />
            <div class="product-info">
              <div class="product-meta">
                <span class="product-cat">{{ producto.categoria }}</span>
                <span class="product-price">€{{ producto.precio }}</span>
              </div>
              <h3 class="product-name">{{ producto.nombre }}</h3>
              <button class="product-buy" @click="comprarProducto(producto)">
                Comprar <span class="buy-arrow">→</span>
              </button>
            </div>
          </li>
        </ul>

        <div v-if="productosFiltrados.length === 0" class="empty-state">
          <p class="empty-title">No hay experiencias disponibles</p>
          <p class="empty-sub">Vuelve más tarde para descubrir nuevas experiencias sonoras</p>
        </div>

      </div>
    </div>

    <span class="deco-num" aria-hidden="true">{{ String(productosFiltrados.length).padStart(2, '0') }}</span>

    <ImageLightbox v-if="lightbox" :src="lightbox.src" :alt="lightbox.alt" @close="lightbox = null" />
  </div>
</template>

<style scoped lang="scss">
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}

.oido-view {
  position: relative;
  height: 100%;
  overflow: hidden;
  background: #ecedf4;
}

.panels-row {
  height: 100%;
  display: flex;
  align-items: stretch;
}

.panel {
  flex: 1;
  padding: 3.5rem 3.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  overflow-y: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
}

.panel-left  { animation: fadeUp 0.55s ease both; }
.panel-right { align-items: flex-end; animation: fadeUp 0.55s ease 0.15s both; }

.v-divider {
  width: 1px;
  flex-shrink: 0;
  margin: 2.5rem 0;
  background: linear-gradient(to bottom, transparent, rgba(140,58,80,0.2) 20%, rgba(140,58,80,0.2) 80%, transparent);
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(61,26,38,0.4);
  text-decoration: none;
  transition: color 0.2s ease;
  &:hover { color: #8c3a50; }
}
.back-arrow { font-size: 11px; transition: transform 0.2s ease; }
.back-link:hover .back-arrow { transform: translateX(-3px); }

.eyebrow { display: flex; align-items: center; gap: 0.75rem; }
.ew-line { flex: 0 0 36px; height: 1px; background: rgba(140,58,80,0.35); }
.ew-text {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: #8c3a50;
  white-space: nowrap;
}

.panel-title {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 22px;
  font-weight: 800;
  text-transform: uppercase;
  color: #3d1a26;
  letter-spacing: 0.03em;
  margin: 0;
  line-height: 1.2;
}
.title-r { text-align: right; }

.quote {
  border-left: 2.5px solid rgba(140,58,80,0.25);
  padding-left: 20px;
  margin: 0;
  p {
    font-family: 'Nunito Sans', sans-serif;
    font-size: 14px;
    font-style: italic;
    color: rgba(61,26,38,0.65);
    line-height: 1.75;
    margin: 0;
  }
}

.article-count {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
  margin-top: auto;
}
.count-num {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 2.5rem;
  font-style: italic;
  color: rgba(184,154,90,0.6);
  line-height: 1;
}
.count-label {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(61,26,38,0.35);
}

.products-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  align-items: flex-end;
}

.product-item {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.875rem;
  padding: 0.85rem 0;
  border-bottom: 1px solid rgba(140,58,80,0.1);
  animation: fadeUp 0.5s ease both;
  &:last-child { border-bottom: none; }

  &:hover .product-buy {
    opacity: 1;
    transform: translateX(0);
  }
  &:hover .product-thumb {
    opacity: 1;
    transform: scale(1.04);
  }
}

.product-thumb {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
  flex-shrink: 0;
  opacity: 0.85;
  cursor: pointer;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.2rem;
}

.product-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.product-cat {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 9.5px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(61,26,38,0.35);
}
.product-price {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 13px;
  font-weight: 500;
  font-style: italic;
  color: rgba(184,154,90,0.9);
}

.product-name {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: #3d1a26;
  letter-spacing: 0.01em;
  margin: 0;
  text-align: right;
  line-height: 1.35;
}

.product-buy {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #8c3a50;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  opacity: 0;
  transform: translateX(4px);
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.buy-arrow { font-size: 11px; }

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.4rem;
}
.empty-title {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: rgba(61,26,38,0.4);
  margin: 0;
}
.empty-sub {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 14px;
  font-style: italic;
  color: rgba(61,26,38,0.3);
  margin: 0;
  text-align: right;
}

.deco-num {
  position: absolute;
  bottom: -1.5rem;
  right: 2.5rem;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 120px;
  line-height: 1;
  color: rgba(61,26,38,0.04);
  pointer-events: none;
  user-select: none;
  z-index: 0;
}
</style>
