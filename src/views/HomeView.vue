<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useGlobalMusic } from '../composables/useGlobalMusic'
import { useSidebarPanel } from '../composables/useSidebarPanel'
import { scrollToTop } from '../composables/useScrollNavigation'
import ExperienceCard from '../components/ExperienceCard.vue'

const router = useRouter()
const { stopExperienciaSensorial } = useGlobalMusic()
const { activePanel, closePanel } = useSidebarPanel()

const blogPosts = [
  {
    id: 1,
    tag: 'Sensorial',
    title: 'El poder de los aromas en nuestra percepción',
    excerpt: 'Cómo el olfato puede transformar por completo una experiencia artística.',
  },
  {
    id: 2,
    tag: 'Música',
    title: 'Frecuencias que sanan',
    excerpt: 'Un repaso por las terapias de sonido y sus efectos en el bienestar.',
  },
  {
    id: 3,
    tag: 'Arte',
    title: 'Ver con todos los sentidos',
    excerpt: 'La experiencia visual va mucho más allá de los ojos.',
  },
]

const navigateToExperienciaEstandar = () => {
  router.push('/experiencia-estandar')
  scrollToTop()
}

const navigateToExperienciaSensorial = () => {
  router.push('/seleccion-tipo-musica')
  scrollToTop()
}

onMounted(() => {
  stopExperienciaSensorial()
})
</script>

<template>
  <div class="home">
    <!-- Hero / panels area -->
    <Transition name="panel-fade" mode="out-in">
      <!-- Hero -->
      <div v-if="!activePanel" key="hero" class="hero">
        <div class="eyebrow">
          <span class="eyebrow-line" />
          <span class="eyebrow-text">Bienvenido a Amani</span>
          <span class="eyebrow-line" />
        </div>

        <h1 class="hero-title">
          ELIGE TU EXPERIENCIA<span class="cursor" aria-hidden="true" />
        </h1>

        <p class="hero-subtitle">Encuentra la experiencia que más se adapta a ti</p>

        <div class="cards-row">
          <ExperienceCard
            title="Experiencia Estándar"
            description="Disfruta de la experiencia clásica de Amani con todas sus funcionalidades"
            type="standard"
            @explore="navigateToExperienciaEstandar"
          />
          <ExperienceCard
            title="Experiencia Sensorial"
            description="Sumérgete en una experiencia multisensorial con música y efectos especiales"
            type="sensorial"
            @explore="navigateToExperienciaSensorial"
          />
        </div>
      </div>

      <!-- About panel -->
      <div v-else-if="activePanel === 'about'" key="about" class="panel">
        <button class="panel-close" @click="closePanel" aria-label="Cerrar">✕</button>
        <div class="panel-inner">
          <div class="panel-eyebrow">
            <span class="eyebrow-line" />
            <span class="eyebrow-text">Nuestra historia</span>
            <span class="eyebrow-line" />
          </div>
          <h2 class="panel-title">Acerca de Amani</h2>
          <p class="panel-lead">
            Amani es una plataforma de experiencias sensoriales diseñada para conectar a las personas
            con emociones profundas a través de la música, el olfato y la vista.
          </p>
          <div class="about-grid">
            <div class="about-card">
              <span class="about-card-icon">◈</span>
              <h4>Nuestra misión</h4>
              <p>
                Crear experiencias únicas que transformen la percepción sensorial, ofreciendo
                entornos de bienestar y exploración artística.
              </p>
            </div>
            <div class="about-card">
              <span class="about-card-icon">◎</span>
              <h4>¿Quiénes somos?</h4>
              <p>
                Un equipo apasionado por el arte, la tecnología y el bienestar humano, comprometido
                con la innovación sensorial.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Blog panel -->
      <div v-else-if="activePanel === 'blog'" key="blog" class="panel">
        <button class="panel-close" @click="closePanel" aria-label="Cerrar">✕</button>
        <div class="panel-inner">
          <div class="panel-eyebrow">
            <span class="eyebrow-line" />
            <span class="eyebrow-text">Ideas & reflexiones</span>
            <span class="eyebrow-line" />
          </div>
          <h2 class="panel-title">Blog</h2>
          <div class="blog-grid">
            <article v-for="post in blogPosts" :key="post.id" class="blog-card">
              <span class="blog-tag">{{ post.tag }}</span>
              <h4>{{ post.title }}</h4>
              <p>{{ post.excerpt }}</p>
            </article>
          </div>
        </div>
      </div>

      <!-- Contact panel -->
      <div v-else-if="activePanel === 'contact'" key="contact" class="panel">
        <button class="panel-close" @click="closePanel" aria-label="Cerrar">✕</button>
        <div class="panel-inner">
          <div class="panel-eyebrow">
            <span class="eyebrow-line" />
            <span class="eyebrow-text">Estamos aquí</span>
            <span class="eyebrow-line" />
          </div>
          <h2 class="panel-title">Contacto</h2>
          <p class="panel-lead">¿Tienes alguna pregunta o quieres colaborar con nosotros?</p>
          <div class="contact-info">
            <div class="contact-item">
              <font-awesome-icon :icon="['fas', 'envelope']" />
              <span>hola@amani.es</span>
            </div>
            <div class="contact-item">
              <font-awesome-icon :icon="['fab', 'instagram']" />
              <span>@amani.oficial</span>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
/* ── Layout ────────────────────────────────────────────── */
.home {
  position: relative;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ── Hero ──────────────────────────────────────────────── */
.hero {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  text-align: center;
  padding: 2rem 2.5rem;
  max-width: 800px;
  width: 100%;
}

/* ── Eyebrow ───────────────────────────────────────────── */
.eyebrow {
  display: flex;
  align-items: center;
  gap: 0.875rem;
}

.eyebrow-line {
  flex: 0 0 48px;
  height: 1px;
  background: linear-gradient(90deg, transparent, #b89a5a, transparent);
}

.eyebrow-text {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #8c3a50;
  white-space: nowrap;
}

/* ── Title ─────────────────────────────────────────────── */
.hero-title {
  font-family: 'Nunito Sans', sans-serif;
  font-size: clamp(1.8rem, 4vw, 3.2rem);
  font-weight: 800;
  color: #3d1a26;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin: 0;
  line-height: 1.1;
}

.cursor {
  display: inline-block;
  width: 2px;
  height: 0.85em;
  background: #8c3a50;
  margin-left: 4px;
  vertical-align: middle;
  border-radius: 1px;
  animation: blink 1.1s step-end infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

/* ── Subtitle ──────────────────────────────────────────── */
.hero-subtitle {
  font-family: 'Nunito Sans', sans-serif;
  font-style: italic;
  font-size: clamp(1rem, 1.8vw, 1.3rem);
  color: #7a5560;
  margin: 0;
  line-height: 1.5;
}

/* ── Cards ─────────────────────────────────────────────── */
.cards-row {
  display: flex;
  gap: 1.5rem;
  align-items: stretch;
  margin-top: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
}

/* ── Panels ────────────────────────────────────────────── */
.panel {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 760px;
  padding: 2rem 2.5rem;
}

.panel-close {
  position: absolute;
  top: 1.5rem;
  right: 2rem;
  background: none;
  border: 1.5px solid rgba(140, 58, 80, 0.22);
  color: #8c3a50;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: #8c3a50;
    color: white;
    border-color: #8c3a50;
  }
}

.panel-inner {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.panel-eyebrow {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.panel-title {
  font-family: 'Nunito Sans', sans-serif;
  font-size: clamp(1.6rem, 3vw, 2.4rem);
  font-weight: 800;
  color: #3d1a26;
  margin: 0;
  letter-spacing: 0.02em;
}

.panel-lead {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 1.05rem;
  font-style: italic;
  color: #7a5560;
  line-height: 1.7;
  margin: 0;
  max-width: 560px;
}

/* About grid */
.about-grid {
  display: flex;
  gap: 1.25rem;
  flex-wrap: wrap;
  margin-top: 0.25rem;
}

.about-card {
  background: #ffffff;
  border-radius: 18px;
  padding: 1.5rem;
  flex: 1;
  min-width: 220px;
  box-shadow: 0 2px 16px rgba(61, 26, 38, 0.06);

  .about-card-icon {
    font-size: 1.2rem;
    color: #b89a5a;
    display: block;
    margin-bottom: 0.5rem;
  }

  h4 {
    font-family: 'Nunito Sans', sans-serif;
    font-size: 0.85rem;
    font-weight: 700;
    color: #3d1a26;
    margin: 0 0 0.5rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  p {
    font-family: 'Nunito Sans', sans-serif;
    font-size: 0.97rem;
    color: #7a5560;
    line-height: 1.6;
    margin: 0;
  }
}

/* Blog grid */
.blog-grid {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 0.25rem;
}

.blog-card {
  background: #ffffff;
  border-radius: 18px;
  padding: 1.25rem 1.5rem;
  flex: 1;
  min-width: 200px;
  box-shadow: 0 2px 16px rgba(61, 26, 38, 0.06);

  .blog-tag {
    font-family: 'Nunito Sans', sans-serif;
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #b89a5a;
    display: block;
    margin-bottom: 0.4rem;
  }

  h4 {
    font-family: 'Nunito Sans', sans-serif;
    font-size: 0.82rem;
    font-weight: 700;
    color: #3d1a26;
    margin: 0 0 0.4rem;
    line-height: 1.3;
  }

  p {
    font-family: 'Nunito Sans', sans-serif;
    font-size: 0.92rem;
    color: #7a5560;
    line-height: 1.55;
    margin: 0;
  }
}

/* Contact */
.contact-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 0.25rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 0.85rem;
  color: #3d1a26;

  svg {
    color: #8c3a50;
    width: 14px;
  }
}

/* ── Panel transitions ─────────────────────────────────── */
.panel-fade-enter-active,
.panel-fade-leave-active {
  transition: opacity 0.28s ease, transform 0.28s ease;
}

.panel-fade-enter-from,
.panel-fade-leave-to {
  opacity: 0;
  transform: translateY(12px);
}
</style>
