<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref, computed } from 'vue'
import { useGlobalMusic } from '../composables/useGlobalMusic'

const { isExperienciaSensorial } = useGlobalMusic()

const productos = ref([
  {
    id: 1,
    nombre: 'Danza Tradicional Fang - Guinea Ecuatorial',
    descripcion: 'Sumérgete en la rica cultura de la tribu Fang a través de esta experiencia visual única. Descubre los movimientos ancestrales, los trajes tradicionales y la energía espiritual que caracteriza esta danza milenaria del África Central.',
    precio: '89.99',
    categoria: 'Cultura',
    rating: 4.9,
    stock: 25,
    img: new URL('@/assets/vista1.jpg', import.meta.url).href,
  },
])

const productosFiltrados = computed(() => productos.value)

const getBackRoute = () => isExperienciaSensorial.value ? '/experiencia-sensorial' : '/experiencia-estandar'

const comprarProducto = (producto: { nombre: string; precio: string }) => {
  const numero = '34680150864'
  const mensaje = encodeURIComponent(`Hola, me interesa comprar el siguiente producto:\n\n📦 ${producto.nombre}\n💰 Precio: €${producto.precio}\n\nPor favor, contacta conmigo para completar la compra.`)
  window.open(`https://wa.me/${numero}?text=${mensaje}`, '_blank')
}
</script>

<template>
  <div class="vista-view">
    <div v-if="productosFiltrados.length > 0" class="panels-row">

      <!-- ── Panel izquierdo: info del producto ── -->
      <div class="panel panel-left">

        <RouterLink :to="getBackRoute()" class="back-link">
          <span class="back-arrow">←</span>
          Volver a Experiencias
        </RouterLink>

        <div class="eyebrow">
          <span class="ew-line" />
          <span class="ew-text">Vista</span>
        </div>

        <img
          :src="productosFiltrados[0].img"
          :alt="productosFiltrados[0].nombre"
          class="featured-img"
        />

        <h1 class="panel-title">{{ productosFiltrados[0].nombre }}</h1>

        <blockquote class="quote">
          <p>{{ productosFiltrados[0].descripcion }}</p>
        </blockquote>

      </div>

      <div class="v-divider" aria-hidden="true" />

      <!-- ── Panel derecho: detalles y compra ── -->
      <div class="panel panel-right">

        <div class="eyebrow eyebrow-r">
          <span class="ew-text">Experiencia cultural</span>
          <span class="ew-line" />
        </div>

        <h2 class="panel-title title-r">Detalles</h2>

        <ul class="details-list">
          <li class="detail-item">
            <span class="detail-label">Categoría</span>
            <span class="detail-value">{{ productosFiltrados[0].categoria }}</span>
          </li>
          <li class="detail-item">
            <span class="detail-label">Valoración</span>
            <span class="detail-value">{{ productosFiltrados[0].rating }} / 5</span>
          </li>
          <li class="detail-item">
            <span class="detail-label">Disponibles</span>
            <span class="detail-value">{{ productosFiltrados[0].stock }} unidades</span>
          </li>
          <li class="detail-item detail-price">
            <span class="detail-label">Precio</span>
            <span class="price-value">€{{ productosFiltrados[0].precio }}</span>
          </li>
        </ul>

        <button class="buy-btn" @click="comprarProducto(productosFiltrados[0])">
          Comprar <span class="buy-arrow">→</span>
        </button>

      </div>
    </div>

    <!-- Sin productos -->
    <div v-else class="empty-state">
      <p class="empty-title">No hay experiencias disponibles</p>
      <p class="empty-sub">Vuelve más tarde para descubrir nuevas experiencias culturales</p>
      <RouterLink :to="getBackRoute()" class="back-link">← Volver a Experiencias</RouterLink>
    </div>

    <span class="deco-num" aria-hidden="true">01</span>
  </div>
</template>

<style scoped lang="scss">
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}

.vista-view {
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
  font-family: 'Syne', sans-serif;
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
  font-family: 'Syne', sans-serif;
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: #8c3a50;
  white-space: nowrap;
}

.featured-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
  opacity: 0.9;
}

.panel-title {
  font-family: 'Syne', sans-serif;
  font-size: 24px;
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
    font-family: 'Cormorant Garamond', serif;
    font-size: 16px;
    font-style: italic;
    color: rgba(61,26,38,0.65);
    line-height: 1.85;
    margin: 0;
  }
}

.details-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 320px;
}

.detail-item {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.2rem;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(140,58,80,0.1);
  &:last-child { border-bottom: none; }
}

.detail-label {
  font-family: 'Syne', sans-serif;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: rgba(61,26,38,0.35);
}

.detail-value {
  font-family: 'Cormorant Garamond', serif;
  font-size: 17px;
  font-style: italic;
  color: rgba(61,26,38,0.7);
}

.price-value {
  font-family: 'Syne', sans-serif;
  font-size: 22px;
  font-weight: 800;
  color: #3d1a26;
}

.buy-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Syne', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #ffffff;
  background: #8c3a50;
  border: none;
  padding: 0.85rem 1.75rem;
  border-radius: 2px;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
  &:hover { background: #3d1a26; transform: translateY(-2px); }
}
.buy-arrow { font-size: 12px; }

.empty-state {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  animation: fadeUp 0.55s ease both;
}
.empty-title {
  font-family: 'Syne', sans-serif;
  font-size: 18px;
  font-weight: 800;
  text-transform: uppercase;
  color: #3d1a26;
  margin: 0;
}
.empty-sub {
  font-family: 'Cormorant Garamond', serif;
  font-size: 15px;
  font-style: italic;
  color: rgba(61,26,38,0.5);
  margin: 0;
}

.deco-num {
  position: absolute;
  bottom: -1.5rem;
  right: 2.5rem;
  font-family: 'Cormorant Garamond', serif;
  font-size: 120px;
  line-height: 1;
  color: rgba(61,26,38,0.04);
  pointer-events: none;
  user-select: none;
  z-index: 0;
}
</style>
