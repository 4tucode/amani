<script setup lang="ts">
const contactInfo = {
  email: 'contacto@amani.com',
  telefono: '+34 123 456 789',
  horario: 'Lunes a Viernes: 9:00 - 18:00\nSábados: 10:00 - 14:00',
}
</script>

<template>
  <div class="contact-view">
    <div class="panels-row">

      <!-- ── Panel izquierdo: título + horario ── -->
      <div class="panel panel-left">

        <div class="eyebrow">
          <span class="ew-line" />
          <span class="ew-text">Estamos aquí</span>
        </div>

        <h1 class="panel-title">Contacto</h1>

        <div class="subsection">
          <h3 class="sub-label">Horario</h3>
          <blockquote class="quote">
            <p v-for="line in contactInfo.horario.split('\n')" :key="line">{{ line }}</p>
          </blockquote>
        </div>

      </div>

      <!-- Divisor vertical -->
      <div class="v-divider" aria-hidden="true" />

      <!-- ── Panel derecho: email + teléfono ── -->
      <div class="panel panel-right">

        <div class="eyebrow eyebrow-r">
          <span class="ew-text">Información</span>
          <span class="ew-line" />
        </div>

        <h2 class="panel-title title-r">Escríbenos</h2>

        <ul class="contact-list">
          <li class="contact-item">
            <span class="contact-label">Email</span>
            <a :href="`mailto:${contactInfo.email}`" class="contact-value">
              {{ contactInfo.email }}
            </a>
          </li>
          <li class="contact-item">
            <span class="contact-label">Teléfono</span>
            <a :href="`tel:${contactInfo.telefono.replace(/\s/g, '')}`" class="contact-value">
              {{ contactInfo.telefono }}
            </a>
          </li>
        </ul>

      </div>
    </div>

    <!-- Número decorativo -->
    <span class="deco-num" aria-hidden="true">03</span>
  </div>
</template>

<style scoped lang="scss">
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Contenedor ── */
.contact-view {
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

  &::-webkit-scrollbar { display: none; }
}

.panel-left {
  animation: fadeUp 0.55s ease both;
}

.panel-right {
  align-items: flex-end;
  animation: fadeUp 0.55s ease 0.15s both;
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

.ew-line {
  flex: 0 0 36px;
  height: 1px;
  background: rgba(140, 58, 80, 0.35);
}

.ew-text {
  font-family: 'Syne', sans-serif;
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: #8c3a50;
  white-space: nowrap;
}

/* ── Títulos ── */
.panel-title {
  font-family: 'Syne', sans-serif;
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

/* ── Subsección horario ── */
.subsection {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.sub-label {
  font-family: 'Syne', sans-serif;
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #8c3a50;
  margin: 0;
}

.quote {
  border-left: 2.5px solid rgba(140, 58, 80, 0.25);
  padding-left: 20px;
  margin: 0;

  p {
    font-family: 'Cormorant Garamond', serif;
    font-size: 16px;
    font-style: italic;
    color: rgba(61, 26, 38, 0.65);
    line-height: 2;
    margin: 0;
  }
}

/* ── Lista de contacto ── */
.contact-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
  align-items: flex-end;
  width: 100%;
  max-width: 360px;
}

.contact-item {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.3rem;
  padding: 1.5rem 0;
  border-bottom: 1px solid rgba(140, 58, 80, 0.1);

  &:last-child {
    border-bottom: none;
  }
}

.contact-label {
  font-family: 'Syne', sans-serif;
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: rgba(61, 26, 38, 0.35);
}

.contact-value {
  font-family: 'Cormorant Garamond', serif;
  font-size: 20px;
  font-style: italic;
  color: rgba(61, 26, 38, 0.75);
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: #8c3a50;
  }
}

/* ── Número decorativo ── */
.deco-num {
  position: absolute;
  bottom: -1.5rem;
  right: 2.5rem;
  font-family: 'Cormorant Garamond', serif;
  font-size: 120px;
  line-height: 1;
  color: rgba(61, 26, 38, 0.04);
  pointer-events: none;
  user-select: none;
  z-index: 0;
}
</style>
