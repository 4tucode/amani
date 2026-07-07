<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useGlobalMusic } from '../composables/useGlobalMusic'
import { useSidebarPanel } from '../composables/useSidebarPanel'
import { useGsapReveal } from '../composables/useGsapReveal'
import ExperienceCard from '../components/ExperienceCard.vue'

const rootEl = ref<HTMLElement | null>(null)
useGsapReveal(rootEl)

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
}

const navigateToExperienciaSensorial = () => {
  router.push('/seleccion-tipo-musica')
}

onMounted(() => {
  stopExperienciaSensorial()
})
</script>

<template>
  <div class="home" ref="rootEl">
    <!-- Hero / panels area -->
    <Transition name="panel-fade" mode="out-in">
      <!-- Hero -->
      <div v-if="!activePanel" key="hero" class="hero" data-reveal>
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
            illustrated
            data-reveal
            data-reveal-group="cards"
            @explore="navigateToExperienciaEstandar"
          >
            <template #icon>
              <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="60" cy="62" r="52" fill="#b89a5a" opacity="0.12" />
                <circle cx="60" cy="62" r="36" fill="#8c3a50" opacity="0.06" />
                <path d="M50 46 C46 40 46 34 52 28" stroke="#b89a5a" stroke-width="2.4" stroke-linecap="round" fill="none" opacity="0.55" />
                <path d="M60 44 C56 37 58 30 64 24" stroke="#8c3a50" stroke-width="2.4" stroke-linecap="round" fill="none" opacity="0.4" />
                <path d="M70 46 C74 40 73 34 68 28" stroke="#b89a5a" stroke-width="2.4" stroke-linecap="round" fill="none" opacity="0.55" />
                <path d="M36 60 C36 74 47 84 60 84 C73 84 84 74 84 60 Z" fill="#8c3a50" />
                <path d="M36 60 C36 74 47 84 60 84 C73 84 84 74 84 60 Z" fill="url(#bowlShade)" />
                <ellipse cx="60" cy="60" rx="24" ry="6" fill="#6f2d40" />
                <path d="M60 46 C64 52 66 57 60 62 C54 57 56 52 60 46 Z" fill="#b89a5a" />
                <circle cx="60" cy="58" r="2.4" fill="#3d1a26" opacity="0.5" />
                <path d="M86 68 C92 64 96 58 94 50 C88 54 84 60 86 68 Z" fill="#3d8a5a" opacity="0.75" />
                <path d="M30 40 l2.4 5.4 l5.4 2.4 l-5.4 2.4 l-2.4 5.4 l-2.4 -5.4 l-5.4 -2.4 l5.4 -2.4 z" fill="#b89a5a" opacity="0.7" />
                <path d="M92 34 l1.6 3.6 l3.6 1.6 l-3.6 1.6 l-1.6 3.6 l-1.6 -3.6 l-3.6 -1.6 l3.6 -1.6 z" fill="#8c3a50" opacity="0.55" />
                <defs>
                  <linearGradient id="bowlShade" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stop-color="#ffffff" stop-opacity="0.12" />
                    <stop offset="1" stop-color="#000000" stop-opacity="0.12" />
                  </linearGradient>
                </defs>
              </svg>
            </template>
          </ExperienceCard>
          <ExperienceCard
            title="Experiencia Sensorial"
            description="Sumérgete en una experiencia multisensorial con música y efectos especiales"
            type="sensorial"
            illustrated
            data-reveal
            data-reveal-group="cards"
            @explore="navigateToExperienciaSensorial"
          >
            <template #icon>
              <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="60" cy="62" r="52" fill="#8c3a50" opacity="0.1" />
                <circle cx="60" cy="62" r="36" fill="#b89a5a" opacity="0.08" />
                <path d="M20 62 C20 44 30 32 44 28" stroke="#8c3a50" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.3" />
                <path d="M100 62 C100 44 90 32 76 28" stroke="#8c3a50" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.3" />
                <path d="M28 62 C28 50 35 41 45 38" stroke="#b89a5a" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.5" />
                <path d="M92 62 C92 50 85 41 75 38" stroke="#b89a5a" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.5" />
                <path d="M30 66 C30 40 60 34 60 34 C60 34 90 40 90 66" stroke="#8c3a50" stroke-width="4.5" stroke-linecap="round" fill="none" />
                <rect x="22" y="60" width="18" height="26" rx="9" fill="#8c3a50" />
                <rect x="80" y="60" width="18" height="26" rx="9" fill="#8c3a50" />
                <rect x="26" y="65" width="10" height="16" rx="5" fill="#b89a5a" opacity="0.5" />
                <rect x="84" y="65" width="10" height="16" rx="5" fill="#b89a5a" opacity="0.5" />
                <g fill="#3d8a5a" opacity="0.8">
                  <circle cx="66" cy="92" r="4" />
                  <rect x="69" y="76" width="2.2" height="17" />
                  <path d="M69 76 L79 79 L79 82 L69 79 Z" />
                </g>
                <g fill="#b89a5a" opacity="0.7">
                  <circle cx="50" cy="98" r="3" />
                  <rect x="52.5" y="86" width="1.8" height="13" />
                </g>
              </svg>
            </template>
          </ExperienceCard>
        </div>
      </div>

      <!-- About panel -->
      <div v-else-if="activePanel === 'about'" key="about" class="panel" data-reveal>
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
      <div v-else-if="activePanel === 'blog'" key="blog" class="panel" data-reveal>
        <button class="panel-close" @click="closePanel" aria-label="Cerrar">✕</button>
        <div class="panel-inner">
          <div class="panel-eyebrow">
            <span class="eyebrow-line" />
            <span class="eyebrow-text">Ideas & reflexiones</span>
            <span class="eyebrow-line" />
          </div>
          <h2 class="panel-title">Blog</h2>
          <div class="blog-grid">
            <article v-for="post in blogPosts" :key="post.id" class="blog-card" data-reveal data-reveal-group="blog">
              <span class="blog-tag">{{ post.tag }}</span>
              <h4>{{ post.title }}</h4>
              <p>{{ post.excerpt }}</p>
            </article>
          </div>
        </div>
      </div>

      <!-- Contact panel -->
      <div v-else-if="activePanel === 'contact'" key="contact" class="panel" data-reveal>
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

/* ── Móvil ─────────────────────────────────────────────── */
@media (max-width: 480px) {
  .home {
    height: auto;
    min-height: 100%;
    overflow: visible;
    padding: 1.75rem 0;
  }

  .hero {
    padding: 0 1.25rem;
    gap: 1rem;
  }

  .cards-row {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .panel {
    padding: 1.5rem 1.25rem;
    max-width: 100%;
  }

  .panel-close {
    top: 1rem;
    right: 1.25rem;
  }

  .about-grid,
  .blog-grid {
    flex-direction: column;
  }

  .about-card,
  .blog-card {
    min-width: 0;
    width: 100%;
  }
}
</style>
