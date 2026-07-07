<script setup lang="ts">
import { ref } from 'vue'
import { useGsapReveal } from '../composables/useGsapReveal'

const rootEl = ref<HTMLElement | null>(null)
useGsapReveal(rootEl)
</script>

<template>
  <div class="about-view" ref="rootEl">
    <!-- Dos paneles -->
    <div class="panels-row">

      <!-- ── Panel izquierdo: Esencia + Visión ── -->
      <div class="panel panel-left" data-reveal>

        <div class="eyebrow">
          <span class="ew-line" />
          <span class="ew-text">Quiénes somos</span>
        </div>

        <h2 class="panel-title">Nuestra esencia</h2>

        <blockquote class="quote">
          <p>"Un aroma puede llevarte a tu infancia.</p>
          <p>Un sabor, a un viaje que marcó tu vida.</p>
          <p>Una textura, a la tradición de tu tierra."</p>
        </blockquote>

        <p class="panel-desc">
          En Amani celebramos la magia de los sentidos. Nuestra tienda es un viaje por países y
          culturas, donde cada experiencia conecta contigo y con el mundo.
        </p>

        <div class="subsection">
          <h3 class="sub-label">Nuestra visión</h3>
          <p class="sub-text">Convertirnos en el espacio de referencia donde los sentidos narran viajes.</p>
          <p class="sub-text">Un lugar para explorar el mundo desde casa y reconectar con la esencia de lo que somos.</p>
        </div>

      </div>

      <!-- Divisor vertical -->
      <div class="v-divider" aria-hidden="true" />

      <!-- ── Panel derecho: Misión + Valores + Cierre ── -->
      <div class="panel panel-right" data-reveal>

        <div class="eyebrow eyebrow-r">
          <span class="ew-text">Propósito</span>
          <span class="ew-line" />
        </div>

        <h2 class="panel-title title-r">Nuestra misión</h2>

        <p class="mission-text">
          Despertar emociones y recuerdos a través de experiencias sensoriales, ofreciendo
          productos que conectan culturas y raíces con tu día a día.
        </p>

        <div class="values-wrap">
          <h3 class="values-label">Nuestros valores</h3>
          <ul class="values-list">
            <li class="value-item" data-reveal data-reveal-group="values">
              <span class="val-num">01</span>
              <span class="val-name">Raíces</span>
              <span class="val-desc">autenticidad y tradición</span>
            </li>
            <li class="value-item" data-reveal data-reveal-group="values">
              <span class="val-num">02</span>
              <span class="val-name">Nostalgia</span>
              <span class="val-desc">el poder de recordar y revivir</span>
            </li>
            <li class="value-item" data-reveal data-reveal-group="values">
              <span class="val-num">03</span>
              <span class="val-name">Exploración</span>
              <span class="val-desc">curiosidad por descubrir lo nuevo</span>
            </li>
            <li class="value-item" data-reveal data-reveal-group="values">
              <span class="val-num">04</span>
              <span class="val-name">Cercanía</span>
              <span class="val-desc">conexión genuina con cada persona</span>
            </li>
            <li class="value-item" data-reveal data-reveal-group="values">
              <span class="val-num">05</span>
              <span class="val-name">Respeto global</span>
              <span class="val-desc">consumo consciente y sostenible</span>
            </li>
          </ul>
        </div>

        <div class="closing">
          <p>Amani es más que una tienda.</p>
          <p>Es un viaje sensorial que conecta tus sentidos con el mundo.</p>
          <p class="closing-italic">Bienvenido/a a un lugar donde viajar es sentir.</p>
        </div>

      </div>
    </div>

    <!-- Número decorativo -->
    <span class="deco-num" aria-hidden="true">02</span>
  </div>
</template>

<style scoped lang="scss">
/* ── Contenedor principal ── */
.about-view {
  position: relative;
  height: 100%;
  overflow: hidden;
  background: #ecedf4;
}

/* ── Fila de paneles ── */
.panels-row {
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  align-items: stretch;
}

/* ── Panel base ── */
.panel {
  flex: 1;
  padding: 3.5rem 3.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  overflow-y: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

.panel-right {
  align-items: flex-end;
}

/* ── Divisor vertical ── */
.v-divider {
  width: 1px;
  flex-shrink: 0;
  margin: 2.5rem 0;
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(140, 58, 80, 0.2) 20%,
    rgba(140, 58, 80, 0.2) 80%,
    transparent
  );
}

/* ── Eyebrow ── */
.eyebrow {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.eyebrow-r {
  /* El orden en template ya pone texto primero, línea después */
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

/* ── Títulos de panel ── */
.panel-title {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 28px;
  font-weight: 800;
  text-transform: uppercase;
  color: #3d1a26;
  letter-spacing: 0.03em;
  margin: 0;
  line-height: 1.15;
}

.title-r {
  text-align: right;
}

/* ── Cita ── */
.quote {
  border-left: 2.5px solid rgba(140, 58, 80, 0.25);
  padding-left: 20px;
  margin: 0;

  p {
    font-family: 'Nunito Sans', sans-serif;
    font-size: 16px;
    font-style: italic;
    color: rgba(61, 26, 38, 0.65);
    line-height: 2;
    margin: 0;
  }
}

/* ── Descripción ── */
.panel-desc {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 15.5px;
  color: rgba(61, 26, 38, 0.55);
  line-height: 1.75;
  margin: 0;
}

/* ── Subsección visión ── */
.subsection {
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.sub-label {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #8c3a50;
  margin: 0;
}

.sub-text {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 15px;
  color: rgba(61, 26, 38, 0.5);
  line-height: 1.7;
  margin: 0;

  &::before {
    content: '— ';
    color: rgba(140, 58, 80, 0.3);
  }
}

/* ── Texto de misión ── */
.mission-text {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 18px;
  font-style: italic;
  color: rgba(61, 26, 38, 0.7);
  line-height: 1.75;
  text-align: right;
  max-width: 340px;
  margin: 0;
}

/* ── Valores ── */
.values-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  align-items: flex-end;
}

.values-label {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #8c3a50;
  margin: 0;
}

.values-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  align-items: flex-end;
}

.value-item {
  display: flex;
  align-items: baseline;
  gap: 0.55rem;
}

.val-num {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 11px;
  font-style: italic;
  color: rgba(184, 154, 90, 0.75);
}

.val-name {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 11.5px;
  font-weight: 700;
  color: #3d1a26;
  letter-spacing: 0.05em;
}

.val-desc {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 12px;
  font-style: italic;
  color: rgba(61, 26, 38, 0.45);
}

/* ── Cierre ── */
.closing {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  text-align: right;
  margin-top: 0.25rem;

  p {
    font-family: 'Nunito Sans', sans-serif;
    font-size: 15px;
    color: rgba(61, 26, 38, 0.55);
    line-height: 1.7;
    margin: 0;
  }

  .closing-italic {
    font-style: italic;
    color: rgba(61, 26, 38, 0.38);
    font-size: 13.5px;
  }
}

/* ── Número decorativo ── */
.deco-num {
  position: absolute;
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

/* ── Móvil: paneles apilados, lectura a una columna ── */
@media (max-width: 480px) {
  .about-view {
    height: auto;
    min-height: 100%;
    overflow: visible;
  }

  .panels-row {
    height: auto;
    flex-direction: column;
  }

  .panel {
    padding: 2rem 1.25rem;
    overflow-y: visible;
    gap: 1.25rem;
  }

  .panel-right {
    align-items: flex-start;
  }

  .v-divider {
    display: none;
  }

  .title-r,
  .mission-text,
  .closing {
    text-align: left;
  }

  .values-wrap,
  .values-list {
    align-items: flex-start;
  }

  .deco-num {
    display: none;
  }
}
</style>
