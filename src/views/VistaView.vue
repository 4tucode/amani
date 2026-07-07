<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import { useGlobalMusic } from '../composables/useGlobalMusic'
import { useGsapReveal } from '../composables/useGsapReveal'

const rootEl = ref<HTMLElement | null>(null)
useGsapReveal(rootEl)

const { isExperienciaSensorial } = useGlobalMusic()

const productos = ref([
  {
    id: 1,
    nombre: 'United colours of Africa',
    descripcion: 'United Colours of Africa reúne en una sola obra la energía, la diversidad y la belleza de África. A través de un mosaico de tejidos tradicionales, colores intensos y motivos geométricos, cada fragmento cuenta una historia diferente mientras contribuye a una narrativa común. La obra habla de identidad, de encuentro y de la capacidad de múltiples voces, culturas y tradiciones para coexistir en armonía sin perder su esencia.',
    precio: '50',
    img: new URL('@/assets/productos/fotos-productos/Vista/v1.jpg', import.meta.url).href,
    certificado: new URL('@/assets/productos/fotos-productos/Vista/Certificado Autenticidad_United colours of Africa.pdf', import.meta.url).href,
  },
  {
    id: 2,
    nombre: 'En su espalda',
    descripcion: 'Entre colores, texturas y recuerdos, esta obra celebra el vínculo invisible que une a una madre con su hijo. La figura del niño, sostenida por tejidos africanos y rodeada de un mosaico luminoso de cuentas, simboliza la seguridad, la alegría y el amor que acompañan el comienzo de la vida. Una pieza que habla de protección, de herencia cultural y de la felicidad de llevar y ser llevado.',
    precio: '50',
    img: new URL('@/assets/productos/fotos-productos/Vista/v2.jpg', import.meta.url).href,
    certificado: new URL('@/assets/productos/fotos-productos/Vista/Certificado Autenticidad_En su espalda.pdf', import.meta.url).href,
  },
  {
    id: 3,
    nombre: 'African girl',
    descripcion: 'Esta obra textil rinde homenaje a la mujer africana a través de una representación simbólica y atemporal. Realizada con lana, tela africana y cuentas decorativas, combina texturas y colores inspirados en la naturaleza para crear una composición llena de identidad y sensibilidad. La ausencia de rasgos faciales convierte a la figura en un símbolo universal, permitiendo que cualquier mujer pueda verse reflejada en ella. Una pieza que celebra la belleza, la fuerza y la riqueza cultural africana desde una mirada original y contemporánea.',
    precio: '50',
    img: new URL('@/assets/productos/fotos-productos/Vista/v3.jpg', import.meta.url).href,
    certificado: new URL('@/assets/productos/fotos-productos/Vista/Certificado Autenticidad_african_girl.pdf', import.meta.url).href,
  },
  {
    id: 4,
    nombre: 'Black and Stone',
    descripcion: 'Entre sombras, texturas y formas, esta obra revela la fuerza serena de la mujer africana. Las piedras que dan forma a la figura evocan raíces, resistencia y conexión con la tierra, mientras que los tejidos africanos aportan color, identidad y memoria cultural. Sobre un fondo de relieves sutiles, se celebra la esencia femenina africana más allá de cualquier individualidad.',
    precio: '50',
    img: new URL('@/assets/productos/fotos-productos/Vista/v4.jpg', import.meta.url).href,
    certificado: new URL('@/assets/productos/fotos-productos/Vista/Certificado Autenticidad_black_and_stone.pdf', import.meta.url).href,
  },
])

const getBackRoute = () => isExperienciaSensorial.value ? '/experiencia-sensorial' : '/experiencia-estandar'

const comprarProducto = (producto: { nombre: string; precio: string }) => {
  const numero = '34680150864'
  const mensaje = encodeURIComponent(`Hola, me interesa comprar el siguiente producto:\n\n📦 ${producto.nombre}\n💰 Precio: €${producto.precio}\n\nPor favor, contacta conmigo para completar la compra.`)
  window.open(`https://wa.me/${numero}?text=${mensaje}`, '_blank')
}
</script>

<template>
  <div class="vista-view" ref="rootEl">

    <!-- ── Cabecera ── -->
    <div class="page-header" data-reveal>
      <RouterLink :to="getBackRoute()" class="back-link">
        <span class="back-arrow">←</span>
        Volver a Experiencias
      </RouterLink>

      <div class="header-center">
        <div class="eyebrow">
          <span class="ew-line" />
          <span class="ew-text">Sentido · Vista</span>
          <span class="ew-line" />
        </div>
        <h1 class="page-title">Colección Visual</h1>
      </div>

      <blockquote class="header-quote">
        <p>Arte que despierta la mirada y conecta con lo esencial</p>
      </blockquote>
    </div>

    <!-- ── Grid de productos ── -->
    <div class="products-grid">
      <div
        v-for="producto in productos"
        :key="producto.id"
        class="product-card"
        data-reveal
        data-reveal-group="products"
      >
        <div class="card-img-wrap">
          <img :src="producto.img" :alt="producto.nombre" class="card-img" />
        </div>

        <div class="card-body">
          <div class="card-num">{{ String(producto.id).padStart(2, '0') }}</div>
          <h2 class="card-name">{{ producto.nombre }}</h2>
          <p class="card-desc">{{ producto.descripcion }}</p>
          <a
            v-if="producto.certificado"
            :href="producto.certificado"
            target="_blank"
            rel="noopener"
            class="cert-link"
          >
            <span class="cert-icon">↓</span> Certificado de autenticidad
          </a>
          <div class="card-footer">
            <span class="card-price">€{{ producto.precio }}</span>
            <button class="buy-btn" @click="comprarProducto(producto)">
              Comprar <span class="buy-arrow">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <span class="deco-num" aria-hidden="true">01</span>
  </div>
</template>

<style scoped lang="scss">
.vista-view {
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
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.38s ease;
}

.card-body {
  padding: 1.4rem 1.5rem 1.5rem;
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

.cert-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #8c3a50;
  text-decoration: none;
  border-bottom: 1px solid rgba(140, 58, 80, 0.3);
  padding-bottom: 1px;
  transition: color 0.2s ease, border-color 0.2s ease;
  &:hover { color: #3d1a26; border-color: rgba(61, 26, 38, 0.5); }
}
.cert-icon { font-size: 11px; }

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
