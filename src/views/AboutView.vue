<script setup lang="ts">
import { useScrollToTop } from '../composables/useScrollToTop'

// Hook para hacer scroll hacia arriba al montar el componente
useScrollToTop()
</script>

<template>
  <main class="about-main">
    <!-- Bloque 1 -->
    <section class="essence-section">
      <div class="essence-container">
        <h2 class="essence-title">
          Nuestra esencia
        </h2>
        
        <div class="essence-quote">
          <p class="quote-text">
            "Un aroma puede llevarte a tu infancia.
          </p>
          <p class="quote-text">
            Un sabor, a un viaje que marcó tu vida.
          </p>
          <p class="quote-text">
            Una textura, a la tradición de tu tierra."
          </p>
        </div>
        
        <div class="essence-description">
          <p>
            En Amani celebramos la magia de los sentidos. Nuestra tienda es un viaje por países y culturas, donde cada experiencia conecta contigo y con el mundo.
          </p>
        </div>
      </div>
    </section>

    <!-- Bloque 2 -->
    <section class="block-two-section">
      <div class="block-two-container">
        <h2 class="block-two-title">
          Nuestra misión
        </h2>
        
        <div class="block-two-content">
          <p>
            Despertar emociones y recuerdos a través de experiencias sensoriales, ofreciendo productos que conectan culturas y raíces con tu día a día.
          </p>
        </div>
      </div>
    </section>

    <!-- Bloque 3 -->
    <section class="block-three-section">
      <div class="block-three-container">
        <h2 class="block-three-title">
          Nuestra visión
        </h2>
        
        <div class="block-three-content">
          <p class="block-three-text">
            Convertirnos en el espacio de referencia donde los sentidos narran viajes.
          </p>
          <p class="block-three-text">
            Un lugar para explorar el mundo desde casa y reconectar con la esencia de lo que somos.
          </p>
        </div>
      </div>
    </section>

    <!-- Bloque 4 -->
    <section class="block-four-section">
      <div class="block-four-container">
        <h2 class="block-four-title">
          Nuestros valores
        </h2>
        
        <div class="values-list">
          <div class="value-item">
            <div class="value-number">01</div>
            <div class="value-content">
              <h3 class="value-name">Raíces</h3>
              <p class="value-description">autenticidad y tradición</p>
            </div>
          </div>

          <div class="value-item">
            <div class="value-number">02</div>
            <div class="value-content">
              <h3 class="value-name">Nostalgia</h3>
              <p class="value-description">el poder de recordar y revivir</p>
            </div>
          </div>

          <div class="value-item">
            <div class="value-number">03</div>
            <div class="value-content">
              <h3 class="value-name">Exploración</h3>
              <p class="value-description">curiosidad por descubrir lo nuevo</p>
            </div>
          </div>

          <div class="value-item">
            <div class="value-number">04</div>
            <div class="value-content">
              <h3 class="value-name">Cercanía</h3>
              <p class="value-description">conexión genuina con cada persona</p>
            </div>
          </div>

          <div class="value-item">
            <div class="value-number">05</div>
            <div class="value-content">
              <h3 class="value-name">Respeto global</h3>
              <p class="value-description">consumo consciente y sostenible</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Bloque 5 -->
    <section class="block-five-section">
      <div class="block-five-container">
        <div class="block-five-content">
          <p class="block-five-text-main">
            Amani es más que una tienda.
          </p>
          <p class="block-five-text-main">
            Es un viaje sensorial que conecta tus sentidos con el mundo.
          </p>
          <p class="block-five-text-welcome">
            Bienvenido/a a un lugar donde viajar es sentir.
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<style lang="sass" scoped>
.about-main
  min-height: 100vh
  background: #e9e8dc
  padding-top: 5rem

.essence-section
  width: 100%
  padding: 4rem 1rem
  display: flex
  justify-content: center
  align-items: center

.essence-container
  max-width: 800px
  width: 100%

.essence-title
  font-size: 2rem
  font-weight: 900
  color: #582a35
  margin-bottom: 3rem
  text-align: center
  letter-spacing: 0.05em

  @media (min-width: 768px)
    font-size: 2.5rem
    margin-bottom: 4rem

.essence-quote
  margin-bottom: 3rem
  padding-left: 1.5rem
  border-left: 2px solid rgba(88, 42, 53, 0.2)

  @media (min-width: 768px)
    padding-left: 2rem
    margin-bottom: 4rem

.quote-text
  font-size: 1.125rem
  font-weight: 300
  color: #4a4a4a
  line-height: 1.8
  margin-bottom: 0.75rem
  font-style: italic

  @media (min-width: 768px)
    font-size: 1.25rem
    line-height: 2
    margin-bottom: 1rem

  &:last-child
    margin-bottom: 0

.essence-description
  margin-top: 2rem

  @media (min-width: 768px)
    margin-top: 3rem

  p
    font-size: 1rem
    font-weight: 300
    color: #4a4a4a
    line-height: 1.8
    text-align: left

    @media (min-width: 768px)
      font-size: 1.125rem
      line-height: 2

// Bloque 2 - Estilo moderno con alineación a la derecha
.block-two-section
  width: 100%
  padding: 4rem 1rem
  display: flex
  justify-content: flex-end
  align-items: center
  background: rgba(255, 255, 255, 0.3)

  @media (min-width: 768px)
    padding: 6rem 2rem

.block-two-container
  max-width: 800px
  width: 100%
  text-align: right

  @media (min-width: 768px)
    max-width: 900px

.block-two-title
  font-size: 2rem
  font-weight: 900
  color: #582a35
  margin-bottom: 3rem
  text-align: right
  letter-spacing: 0.05em

  @media (min-width: 768px)
    font-size: 2.5rem
    margin-bottom: 4rem

.block-two-content
  margin-top: 2rem

  @media (min-width: 768px)
    margin-top: 3rem

  p
    font-size: 1rem
    font-weight: 300
    color: #4a4a4a
    line-height: 1.8
    text-align: right

    @media (min-width: 768px)
      font-size: 1.125rem
      line-height: 2

// Bloque 3 - Estilo moderno con alineación a la izquierda
.block-three-section
  width: 100%
  padding: 4rem 1rem
  display: flex
  justify-content: flex-start
  align-items: center
  background: rgba(255, 255, 255, 0.2)

  @media (min-width: 768px)
    padding: 6rem 2rem

.block-three-container
  max-width: 800px
  width: 100%

.block-three-title
  font-size: 2rem
  font-weight: 900
  color: #582a35
  margin-bottom: 3rem
  text-align: left
  letter-spacing: 0.05em
  position: relative
  padding-left: 1.5rem

  &::before
    content: ''
    position: absolute
    left: 0
    top: 0
    bottom: 0
    width: 4px
    background: #582a35
    border-radius: 2px

  @media (min-width: 768px)
    font-size: 2.5rem
    margin-bottom: 4rem
    padding-left: 2rem

.block-three-content
  margin-top: 2rem
  padding-left: 1.5rem

  @media (min-width: 768px)
    margin-top: 3rem
    padding-left: 2rem

.block-three-text
  font-size: 1rem
  font-weight: 300
  color: #4a4a4a
  line-height: 1.8
  text-align: left
  margin-bottom: 1.5rem
  position: relative
  padding-left: 1.5rem

  &::before
    content: '—'
    position: absolute
    left: 0
    color: rgba(88, 42, 53, 0.4)
    font-weight: 300

  @media (min-width: 768px)
    font-size: 1.125rem
    line-height: 2
    margin-bottom: 2rem
    padding-left: 2rem

  &:last-child
    margin-bottom: 0

// Bloque 4 - Valores con tarjetas visuales
.block-four-section
  width: 100%
  padding: 4rem 1rem
  display: flex
  justify-content: center
  align-items: center
  background: rgba(255, 255, 255, 0.3)

  @media (min-width: 768px)
    padding: 6rem 2rem

.block-four-container
  max-width: 1200px
  width: 100%

.block-four-title
  font-size: 2rem
  font-weight: 900
  color: #582a35
  margin-bottom: 3rem
  text-align: center
  letter-spacing: 0.05em

  @media (min-width: 768px)
    font-size: 2.5rem
    margin-bottom: 4rem

.values-list
  display: flex
  flex-direction: column
  gap: 2rem
  max-width: 900px
  margin: 0 auto

  @media (min-width: 768px)
    gap: 2.5rem

.value-item
  display: flex
  align-items: flex-start
  gap: 2rem
  padding: 2rem
  background: rgba(255, 255, 255, 0.6)
  backdrop-filter: blur(10px)
  -webkit-backdrop-filter: blur(10px)
  border-left: 3px solid rgba(88, 42, 53, 0.2)
  border-radius: 0 8px 8px 0
  transition: all 0.3s ease

  &:hover
    background: rgba(255, 255, 255, 0.8)
    border-left-color: #582a35
    transform: translateX(8px)
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08)

  @media (min-width: 768px)
    padding: 2.5rem
    gap: 3rem

.value-number
  font-size: 1.5rem
  font-weight: 900
  color: rgba(88, 42, 53, 0.3)
  line-height: 1
  flex-shrink: 0
  min-width: 3rem

  @media (min-width: 768px)
    font-size: 2rem
    min-width: 4rem

.value-item:hover .value-number
  color: #582a35

.value-content
  flex: 1

.value-name
  font-size: 1.25rem
  font-weight: 700
  color: #582a35
  margin-bottom: 0.5rem

  @media (min-width: 768px)
    font-size: 1.5rem
    margin-bottom: 0.75rem

.value-description
  font-size: 0.875rem
  font-weight: 300
  color: #4a4a4a
  line-height: 1.6

  @media (min-width: 768px)
    font-size: 1rem
    line-height: 1.7

// Bloque 5 - Cierre inspirador
.block-five-section
  width: 100%
  padding: 4rem 1rem
  display: flex
  justify-content: center
  align-items: center
  background: rgba(88, 42, 53, 0.05)

  @media (min-width: 768px)
    padding: 6rem 2rem

.block-five-container
  max-width: 900px
  width: 100%

.block-five-content
  text-align: center

.block-five-text-main
  font-size: 1.25rem
  font-weight: 300
  color: #582a35
  line-height: 1.8
  margin-bottom: 1.5rem

  @media (min-width: 768px)
    font-size: 1.5rem
    line-height: 2
    margin-bottom: 2rem

  &:last-of-type
    margin-bottom: 2rem

    @media (min-width: 768px)
      margin-bottom: 3rem

.block-five-text-welcome
  font-size: 1rem
  font-weight: 400
  color: #582a35
  line-height: 1.8
  font-style: italic

  @media (min-width: 768px)
    font-size: 1.125rem
    line-height: 2
</style>
