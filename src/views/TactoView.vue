<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import { useGlobalMusic } from '../composables/useGlobalMusic'
import ImageLightbox from '../components/ImageLightbox.vue'

const { isExperienciaSensorial } = useGlobalMusic()

const productos = ref([
  {
    id: 1,
    nombre: 'Kaftán Boubou Ámbar',
    descripcion: 'Un boubou de líneas puras en tono ámbar, con un peto de rayas doradas y negras que enmarca el escote y remata en un borlón trenzado a mano. Confeccionado en algodón ligero, su caída amplia y mangas capa lo convierten en una segunda piel fresca, pensada para sentir el tejido moverse con cada paso.',
    precio: '25',
    imgs: [
      new URL('@/assets/productos/fotos-productos/Tacto/Producto 1 (25€)/Photoroom_20260602_163407.jpg', import.meta.url).href,
      new URL('@/assets/productos/fotos-productos/Tacto/Producto 1 (25€)/Photoroom_20260602_163407(1).jpg', import.meta.url).href,
      new URL('@/assets/productos/fotos-productos/Tacto/Producto 1 (25€)/Photoroom_20260602_164220.jpg', import.meta.url).href,
      new URL('@/assets/productos/fotos-productos/Tacto/Producto 1 (25€)/Photoroom_20260602_164309.jpg', import.meta.url).href,
      new URL('@/assets/productos/fotos-productos/Tacto/Producto 1 (25€)/Photoroom_20260602_164440.jpg', import.meta.url).href,
    ],
  },
  {
    id: 2,
    nombre: 'Kaftán Batik Cobre',
    descripcion: 'Teñido a mano con la técnica shibori, este kaftán combina cobre, mostaza y ciruela en un efecto marmolado único e irrepetible en cada pieza. Su corte holgado y mangas aladas invitan a redescubrir el tacto del algodón crudo, suave y fresco sobre la piel.',
    precio: '15',
    imgs: [
      new URL('@/assets/productos/fotos-productos/Tacto/Producto 2 (15€)/Photoroom_20260602_172418.jpg', import.meta.url).href,
      new URL('@/assets/productos/fotos-productos/Tacto/Producto 2 (15€)/Photoroom_20260602_172344.jpg', import.meta.url).href,
      new URL('@/assets/productos/fotos-productos/Tacto/Producto 2 (15€)/Photoroom_20260602_172523.jpg', import.meta.url).href,
      new URL('@/assets/productos/fotos-productos/Tacto/Producto 2 (15€)/Photoroom_20260602_172601.jpg', import.meta.url).href,
      new URL('@/assets/productos/fotos-productos/Tacto/Producto 2 (15€)/Photoroom_20260602_172601(1).jpg', import.meta.url).href,
      new URL('@/assets/productos/fotos-productos/Tacto/Producto 2 (15€)/Photoroom_20260602_172731.jpg', import.meta.url).href,
    ],
  },
  {
    id: 3,
    nombre: 'Vestido Añil Serengeti',
    descripcion: 'Inspirado en las técnicas de anudado tradicionales del África Occidental, este vestido tiñe el algodón en degradados de añil y arena. El cuello redondo y el fruncido delantero aportan volumen y movimiento, mientras la textura arrugada del tinte se percibe al tacto en cada pliegue.',
    precio: '15',
    imgs: [
      new URL('@/assets/productos/fotos-productos/Tacto/Producto 3 (15€)/Photoroom_20260602_172848.jpg', import.meta.url).href,
      new URL('@/assets/productos/fotos-productos/Tacto/Producto 3 (15€)/Photoroom_20260602_172810.jpg', import.meta.url).href,
      new URL('@/assets/productos/fotos-productos/Tacto/Producto 3 (15€)/Photoroom_20260602_173059.jpg', import.meta.url).href,
      new URL('@/assets/productos/fotos-productos/Tacto/Producto 3 (15€)/Photoroom_20260602_173155.jpg', import.meta.url).href,
      new URL('@/assets/productos/fotos-productos/Tacto/Producto 3 (15€)/Photoroom_20260602_175422.jpg', import.meta.url).href,
    ],
  },
  {
    id: 4,
    nombre: 'Vestido Turquesa Sahel',
    descripcion: 'Un vestido de hombros descubiertos con estampado batik en turquesa y mostaza, rematado con volantes que aportan ligereza al movimiento. El elástico en el escote y el bajo escalonado en capas invitan a tocar y sentir la frescura del tejido en cada doblez.',
    precio: '15',
    imgs: [
      new URL('@/assets/productos/fotos-productos/Tacto/Producto 4 (15€)/Photoroom_20260602_172253.jpg', import.meta.url).href,
      new URL('@/assets/productos/fotos-productos/Tacto/Producto 4 (15€)/Photoroom_20260602_171915.jpg', import.meta.url).href,
      new URL('@/assets/productos/fotos-productos/Tacto/Producto 4 (15€)/Photoroom_20260602_172041.jpg', import.meta.url).href,
      new URL('@/assets/productos/fotos-productos/Tacto/Producto 4 (15€)/Photoroom_20260602_172120.jpg', import.meta.url).href,
    ],
  },
  {
    id: 5,
    nombre: 'Vestido Ocre Malí',
    descripcion: 'Un maxi vestido de tirantes finos con estampado shibori en ocre y negro, inspirado en los círculos concéntricos del teñido tradicional maliense. El cuerpo fruncido y la falda de capas caen con fluidez, revelando una textura suave y ligeramente crujiente al tacto.',
    precio: '15',
    imgs: [
      new URL('@/assets/productos/fotos-productos/Tacto/Producto 5 (15€)/Photoroom_20260602_171540.jpg', import.meta.url).href,
      new URL('@/assets/productos/fotos-productos/Tacto/Producto 5 (15€)/Photoroom_20260602_171329.jpg', import.meta.url).href,
      new URL('@/assets/productos/fotos-productos/Tacto/Producto 5 (15€)/Photoroom_20260602_171440.jpg', import.meta.url).href,
      new URL('@/assets/productos/fotos-productos/Tacto/Producto 5 (15€)/Photoroom_20260602_171650.jpg', import.meta.url).href,
      new URL('@/assets/productos/fotos-productos/Tacto/Producto 5 (15€)/Photoroom_20260602_171742.jpg', import.meta.url).href,
      new URL('@/assets/productos/fotos-productos/Tacto/Producto 5 (15€)/Photoroom_20260602_171830.jpg', import.meta.url).href,
    ],
  },
  {
    id: 6,
    nombre: 'Vestido Amanecer Ashanti',
    descripcion: 'Tonos rojos, naranjas y amarillos se funden en un estampado shibori que evoca el amanecer sobre la sabana. Los tirantes anudados a mano y el cuerpo fruncido ofrecen un ajuste cómodo, mientras el algodón ligero conserva la textura arrugada característica del teñido artesanal.',
    precio: '15',
    imgs: [
      new URL('@/assets/productos/fotos-productos/Tacto/Producto 6 (15€)/Photoroom_20260602_170029.jpg', import.meta.url).href,
      new URL('@/assets/productos/fotos-productos/Tacto/Producto 6 (15€)/Photoroom_20260602_171110.jpg', import.meta.url).href,
      new URL('@/assets/productos/fotos-productos/Tacto/Producto 6 (15€)/Photoroom_20260602_171245.jpg', import.meta.url).href,
    ],
  },
])

const getBackRoute = () => isExperienciaSensorial.value ? '/experiencia-sensorial' : '/experiencia-estandar'

const lightbox = ref<{ images: string[]; alt: string; index: number } | null>(null)

const abrirGaleria = (producto: { nombre: string; imgs: string[] }, index: number) => {
  lightbox.value = { images: producto.imgs, alt: producto.nombre, index }
}

const comprarProducto = (producto: { nombre: string; precio: string }) => {
  const numero = '34680150864'
  const mensaje = encodeURIComponent(`Hola, me interesa comprar el siguiente producto:\n\n📦 ${producto.nombre}\n💰 Precio: €${producto.precio}\n\nPor favor, contacta conmigo para completar la compra.`)
  window.open(`https://wa.me/${numero}?text=${mensaje}`, '_blank')
}
</script>

<template>
  <div class="tacto-view">

    <!-- ── Cabecera ── -->
    <div class="page-header">
      <RouterLink :to="getBackRoute()" class="back-link">
        <span class="back-arrow">←</span>
        Volver a Experiencias
      </RouterLink>

      <div class="header-center">
        <div class="eyebrow">
          <span class="ew-line" />
          <span class="ew-text">Sentido · Tacto</span>
          <span class="ew-line" />
        </div>
        <h1 class="page-title">Colección Táctil</h1>
      </div>

      <blockquote class="header-quote">
        <p>Prendas teñidas a mano que invitan a sentir cada textura</p>
      </blockquote>
    </div>

    <!-- ── Grid de productos ── -->
    <div class="products-grid">
      <div
        v-for="(producto, i) in productos"
        :key="producto.id"
        class="product-card"
        :style="{ animationDelay: `${0.1 + i * 0.1}s` }"
      >
        <div class="card-img-wrap" @click="abrirGaleria(producto, 0)">
          <img :src="producto.imgs[0]" :alt="producto.nombre" class="card-img" />
        </div>

        <div class="card-thumbs">
          <button
            v-for="(img, j) in producto.imgs"
            :key="j"
            class="thumb-btn"
            :class="{ active: j === 0 }"
            @click="abrirGaleria(producto, j)"
          >
            <img :src="img" :alt="`${producto.nombre} ${j + 1}`" class="thumb-img" />
          </button>
        </div>

        <div class="card-body">
          <div class="card-num">{{ String(producto.id).padStart(2, '0') }}</div>
          <h2 class="card-name">{{ producto.nombre }}</h2>
          <p class="card-desc">{{ producto.descripcion }}</p>
          <div class="card-footer">
            <span class="card-price">€{{ producto.precio }}</span>
            <button class="buy-btn" @click="comprarProducto(producto)">
              Comprar <span class="buy-arrow">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <span class="deco-num" aria-hidden="true">03</span>

    <ImageLightbox
      v-if="lightbox"
      :images="lightbox.images"
      :alt="lightbox.alt"
      :initial-index="lightbox.index"
      @close="lightbox = null"
    />
  </div>
</template>

<style scoped lang="scss">
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}

.tacto-view {
  position: relative;
  min-height: 100%;
  background: #ecedf4;
  padding-bottom: 4rem;
}

/* ── Cabecera ── */
.page-header {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 2.25rem 3.5rem 1.75rem;
  border-bottom: 1px solid rgba(140, 58, 80, 0.08);
  animation: fadeUp 0.45s ease both;
  flex-wrap: wrap;
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
  color: rgba(61, 26, 38, 0.4);
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.2s ease;
  &:hover { color: #8c3a50; }
}
.back-arrow {
  font-size: 11px;
  transition: transform 0.2s ease;
}
.back-link:hover .back-arrow { transform: translateX(-3px); }

.header-center {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.eyebrow {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.ew-line {
  flex: 0 0 32px;
  height: 1px;
  background: rgba(140, 58, 80, 0.35);
}
.ew-text {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: #8c3a50;
  white-space: nowrap;
}

.page-title {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 22px;
  font-weight: 800;
  text-transform: uppercase;
  color: #3d1a26;
  letter-spacing: 0.04em;
  margin: 0;
  line-height: 1.2;
  text-align: center;
}

.header-quote {
  max-width: 220px;
  border-left: 2px solid rgba(140, 58, 80, 0.25);
  padding-left: 16px;
  margin: 0;
  p {
    font-family: 'Nunito Sans', sans-serif;
    font-size: 13.5px;
    font-style: italic;
    color: rgba(61, 26, 38, 0.55);
    line-height: 1.7;
    margin: 0;
  }
}

/* ── Grid de productos ── */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.75rem;
  padding: 2.25rem 3.5rem;
}

.product-card {
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(61, 26, 38, 0.07);
  animation: fadeUp 0.55s ease both;
  transition: transform 0.28s ease, box-shadow 0.28s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(61, 26, 38, 0.13);

    .card-img { transform: scale(1.04); }
  }
}

.card-img-wrap {
  overflow: hidden;
  line-height: 0;
  aspect-ratio: 4 / 3;
  cursor: pointer;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.38s ease;
}

.card-thumbs {
  display: flex;
  gap: 0.4rem;
  padding: 0.6rem 1rem 0;
  overflow-x: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
}

.thumb-btn {
  flex: 0 0 auto;
  width: 44px;
  height: 44px;
  padding: 0;
  border-radius: 4px;
  border: 1.5px solid transparent;
  overflow: hidden;
  cursor: pointer;
  background: none;
  line-height: 0;
  opacity: 0.6;
  transition: opacity 0.2s ease, border-color 0.2s ease;

  &:hover { opacity: 1; }
  &.active { opacity: 1; border-color: #8c3a50; }
}

.thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.card-body {
  padding: 1rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  flex: 1;
}

.card-num {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 11px;
  font-style: italic;
  color: rgba(184, 154, 90, 0.75);
}

.card-name {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 14px;
  font-weight: 800;
  text-transform: uppercase;
  color: #3d1a26;
  letter-spacing: 0.05em;
  margin: 0;
  line-height: 1.25;
}

.card-desc {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 14px;
  font-style: italic;
  color: rgba(61, 26, 38, 0.55);
  line-height: 1.7;
  margin: 0;
  flex: 1;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.5rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(140, 58, 80, 0.1);
}

.card-price {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 18px;
  font-weight: 800;
  color: #3d1a26;
}

.buy-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #fff;
  background: #8c3a50;
  border: none;
  padding: 0.7rem 1.4rem;
  border-radius: 2px;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
  &:hover { background: #3d1a26; transform: translateY(-1px); }
}
.buy-arrow { font-size: 11px; }

/* ── Número decorativo ── */
.deco-num {
  position: fixed;
  bottom: -1.5rem;
  right: 2.5rem;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 120px;
  line-height: 1;
  color: rgba(61, 26, 38, 0.04);
  pointer-events: none;
  user-select: none;
  z-index: 0;
}

/* ── Tablet (≤ 768px) ── */
@media (max-width: 768px) {
  .page-header {
    padding: 1.75rem 2rem 1.5rem;
    gap: 1.25rem;
    flex-direction: column;
    align-items: flex-start;
  }

  .header-center {
    width: 100%;
    align-items: flex-start;
  }

  .eyebrow {
    justify-content: flex-start;
  }

  .header-quote {
    max-width: 100%;
  }

  .products-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
    padding: 1.75rem 2rem;
  }
}

/* ── Móvil (≤ 480px) ── */
@media (max-width: 480px) {
  .page-header {
    padding: 1.25rem 1.25rem 1.25rem;
    gap: 1rem;
  }

  .page-title {
    font-size: 18px;
  }

  .header-quote {
    display: none;
  }

  .products-grid {
    grid-template-columns: 1fr;
    gap: 1.25rem;
    padding: 1.25rem 1.25rem;
  }

  .card-body {
    padding: 1.1rem 1.1rem 1.2rem;
  }

  .card-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.85rem;
  }

  .buy-btn {
    width: 100%;
    justify-content: center;
    padding: 0.9rem 1.4rem;
  }

  .deco-num {
    display: none;
  }
}
</style>
