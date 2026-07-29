<script setup lang="ts">
import { onMounted, ref, reactive, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useAdminAuth } from '../composables/useAdminAuth'
import { usePosts } from '../composables/usePosts'
import { imagenABase64 } from '../utils/imagenBase64'
import { formatearFecha } from '../utils/fecha'
import RichTextEditor from '../components/RichTextEditor.vue'
import type { Post } from '../types/post'

const { autenticado, verificando, error: errorAuth, verificarClave } = useAdminAuth()
const {
  posts,
  cargando,
  guardando,
  error: errorPosts,
  cargarPosts,
  sembrarPostEjemplo,
  crearPost,
  actualizarPost,
  eliminarPost,
} = usePosts()

// ── Popup de clave ──
const claveIntroducida = ref('')

const cargarYSembrarSiVacio = async () => {
  await cargarPosts()
  if (posts.value.length === 0) {
    const sembrado = await sembrarPostEjemplo()
    if (sembrado) await cargarPosts()
  }
}

const comprobarClave = async () => {
  const ok = await verificarClave(claveIntroducida.value)
  if (ok) {
    claveIntroducida.value = ''
    cargarYSembrarSiVacio()
  }
}

onMounted(() => {
  if (autenticado.value) cargarYSembrarSiVacio()
})

// ── Formulario crear / editar ──
const formVisible = ref(false)
const postEditando = ref<Post | null>(null)

const formVacio = () => ({
  titulo: '',
  descripcion: '',
  contenido: '',
  autor: 'Equipo Amani',
  fecha: new Date().toISOString().slice(0, 10),
  orden: 1,
})

const form = reactive(formVacio())
const portadaExistente = ref<string | null>(null)
const portadaNueva = ref<File | null>(null)
const procesandoImagenes = ref(false)
const errorFormulario = ref('')

const abrirCrear = () => {
  postEditando.value = null
  Object.assign(form, formVacio())
  form.orden = posts.value.length ? Math.max(...posts.value.map((p) => p.orden)) + 1 : 1
  portadaExistente.value = null
  portadaNueva.value = null
  errorFormulario.value = ''
  formVisible.value = true
}

const abrirEditar = (post: Post) => {
  postEditando.value = post
  Object.assign(form, {
    titulo: post.titulo,
    descripcion: post.descripcion,
    contenido: post.contenido,
    autor: post.autor,
    fecha: post.fecha,
    orden: post.orden,
  })
  portadaExistente.value = post.imagenPortada
  portadaNueva.value = null
  errorFormulario.value = ''
  formVisible.value = true
}

const cerrarForm = () => {
  formVisible.value = false
  postEditando.value = null
}

const onPortadaSeleccionada = (e: Event) => {
  const input = e.target as HTMLInputElement
  portadaNueva.value = input.files?.[0] ?? null
}

const quitarPortada = () => {
  portadaExistente.value = null
  portadaNueva.value = null
}

const guardarPost = async () => {
  if (!form.titulo.trim() || !form.descripcion.trim()) {
    errorFormulario.value = 'Título y descripción son obligatorios.'
    return
  }
  errorFormulario.value = ''

  procesandoImagenes.value = true
  let portadaFinal = portadaExistente.value
  try {
    if (portadaNueva.value) {
      portadaFinal = await imagenABase64(portadaNueva.value)
    }
  } catch (e) {
    console.error(e)
    errorFormulario.value = 'No se pudo procesar la imagen de portada.'
    procesandoImagenes.value = false
    return
  }
  procesandoImagenes.value = false

  const data = {
    titulo: form.titulo.trim(),
    descripcion: form.descripcion.trim(),
    contenido: form.contenido,
    imagenPortada: portadaFinal,
    autor: form.autor.trim() || 'Equipo Amani',
    fecha: form.fecha,
    orden: Number(form.orden) || 1,
  }

  try {
    if (postEditando.value?.id) {
      await actualizarPost(postEditando.value.id, data)
    } else {
      await crearPost(data)
    }
  } catch (e) {
    console.error(e)
    errorFormulario.value = errorPosts.value || 'No se pudo guardar el post.'
    return
  }

  cerrarForm()
  cargarPosts()
}

const borrarPost = async (post: Post) => {
  const confirmado = window.confirm(`¿Eliminar "${post.titulo}"? Esta acción no se puede deshacer.`)
  if (!confirmado) return
  await eliminarPost(post)
  cargarPosts()
}

const hayPosts = computed(() => posts.value.length > 0)
</script>

<template>
  <div class="backstage-view">
    <!-- ── Popup de acceso ── -->
    <div v-if="!autenticado" class="auth-overlay">
      <form class="auth-card" @submit.prevent="comprobarClave">
        <h1 class="auth-title">Panel de Administración</h1>
        <p class="auth-subtitle">Introduce la clave de administrador para continuar.</p>
        <input
          v-model="claveIntroducida"
          type="password"
          class="auth-input"
          placeholder="Clave de administrador"
          autofocus
        />
        <p v-if="errorAuth" class="auth-error">{{ errorAuth }}</p>
        <button type="submit" class="auth-btn" :disabled="verificando">
          {{ verificando ? 'Comprobando…' : 'Entrar' }}
        </button>
      </form>
    </div>

    <!-- ── Panel de administración ── -->
    <template v-else>
      <header class="backstage-header">
        <div>
          <h1 class="backstage-title">Panel de Administración</h1>
          <p class="backstage-subtitle">Gestiona los artículos del blog</p>
        </div>
        <div class="header-acciones">
          <RouterLink to="/backstage" class="btn-secundario">Ir a Productos</RouterLink>
          <button class="btn-primary" @click="abrirCrear">+ Nuevo post</button>
        </div>
      </header>

      <p v-if="errorPosts" class="banner-error">{{ errorPosts }}</p>

      <div v-if="cargando" class="estado-vacio">Cargando posts…</div>
      <div v-else-if="!hayPosts" class="estado-vacio">No hay posts todavía. Crea el primero.</div>

      <div v-else class="posts-grid">
        <div v-for="post in posts" :key="post.id" class="post-card">
          <div class="post-img-wrap">
            <img v-if="post.imagenPortada" :src="post.imagenPortada" :alt="post.titulo" class="post-img" />
            <div v-else class="post-img-vacia">Sin portada</div>
          </div>
          <div class="post-body">
            <p class="post-fecha">{{ formatearFecha(post.fecha) }} · {{ post.autor }}</p>
            <h3 class="post-titulo">{{ post.titulo }}</h3>
            <p class="post-desc">{{ post.descripcion }}</p>
            <div class="post-acciones">
              <button class="btn-secundario" @click="abrirEditar(post)">Editar</button>
              <button class="btn-peligro" @click="borrarPost(post)">Eliminar</button>
            </div>
          </div>
        </div>
      </div>

      <!-- ── Modal crear / editar ── -->
      <div v-if="formVisible" class="form-overlay" @click.self="cerrarForm">
        <form class="form-card" @submit.prevent="guardarPost">
          <h2 class="form-title">{{ postEditando ? 'Editar post' : 'Nuevo post' }}</h2>

          <label class="form-label">
            Título
            <input v-model="form.titulo" type="text" class="form-input" required />
          </label>

          <label class="form-label">
            Descripción (extracto que se ve en el listado del blog)
            <textarea v-model="form.descripcion" class="form-input form-textarea" rows="3"></textarea>
          </label>

          <div class="form-row">
            <label class="form-label">
              Autor
              <input v-model="form.autor" type="text" class="form-input" />
            </label>
            <label class="form-label">
              Fecha
              <input v-model="form.fecha" type="date" class="form-input" />
            </label>
            <label class="form-label form-orden">
              Orden
              <input v-model.number="form.orden" type="number" class="form-input" />
            </label>
          </div>

          <label class="form-label">
            Imagen de portada
            <input type="file" accept="image/*" class="form-input" @change="onPortadaSeleccionada" />
          </label>

          <div v-if="portadaExistente || portadaNueva" class="preview-thumbs">
            <div class="preview-thumb">
              <img v-if="portadaExistente && !portadaNueva" :src="portadaExistente" :alt="form.titulo" />
              <span v-if="portadaNueva" class="preview-nueva">Nueva imagen lista</span>
              <button type="button" class="preview-remove" @click="quitarPortada">×</button>
            </div>
          </div>

          <div class="form-label">
            Contenido del artículo
            <RichTextEditor v-model="form.contenido" placeholder="Escribe el artículo… inserta imágenes con el botón 🖼️" />
          </div>

          <p v-if="errorFormulario" class="banner-error">{{ errorFormulario }}</p>

          <div class="form-acciones">
            <button type="button" class="btn-secundario" @click="cerrarForm">Cancelar</button>
            <button type="submit" class="btn-primary" :disabled="guardando || procesandoImagenes">
              {{ procesandoImagenes ? 'Procesando imagen…' : guardando ? 'Guardando…' : 'Guardar' }}
            </button>
          </div>
        </form>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.backstage-view {
  min-height: 100%;
  background: #ecedf4;
  padding: 2.5rem 3rem 4rem;
  font-family: 'Nunito Sans', sans-serif;
}

/* ── Popup de acceso ── */
.auth-overlay {
  position: fixed;
  inset: 0;
  background: rgba(61, 26, 38, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 1.5rem;
}

.auth-card {
  background: #fff;
  border-radius: 8px;
  padding: 2.5rem;
  max-width: 360px;
  width: 100%;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.auth-title {
  font-size: 18px;
  font-weight: 800;
  text-transform: uppercase;
  color: #3d1a26;
  letter-spacing: 0.04em;
  margin: 0;
}

.auth-subtitle {
  font-size: 13px;
  color: rgba(61, 26, 38, 0.6);
  margin: 0 0 0.5rem;
}

.auth-input {
  font-family: inherit;
  font-size: 14px;
  padding: 0.75rem 1rem;
  border: 1.5px solid rgba(140, 58, 80, 0.25);
  border-radius: 4px;
  outline: none;
  &:focus { border-color: #8c3a50; }
}

.auth-error {
  color: #b3261e;
  font-size: 12.5px;
  margin: 0;
}

.auth-btn {
  font-family: inherit;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 12.5px;
  color: #fff;
  background: #8c3a50;
  border: none;
  padding: 0.85rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s ease;
  &:hover:not(:disabled) { background: #3d1a26; }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
}

/* ── Cabecera panel ── */
.backstage-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.75rem;
  flex-wrap: wrap;
}

.header-acciones {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.backstage-title {
  font-size: 22px;
  font-weight: 800;
  text-transform: uppercase;
  color: #3d1a26;
  letter-spacing: 0.04em;
  margin: 0;
}

.backstage-subtitle {
  font-size: 13.5px;
  color: rgba(61, 26, 38, 0.55);
  margin: 0.3rem 0 0;
}

.btn-primary {
  font-family: inherit;
  font-weight: 700;
  font-size: 12.5px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #fff;
  background: #8c3a50;
  border: none;
  padding: 0.75rem 1.4rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s ease;
  &:hover:not(:disabled) { background: #3d1a26; }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
}

.btn-secundario {
  font-family: inherit;
  font-weight: 700;
  font-size: 11.5px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #3d1a26;
  background: #fff;
  border: 1.5px solid rgba(140, 58, 80, 0.3);
  padding: 0.55rem 0.9rem;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  transition: border-color 0.2s ease, background 0.2s ease;
  &:hover { border-color: #8c3a50; background: rgba(140, 58, 80, 0.06); }
}

.btn-peligro {
  font-family: inherit;
  font-weight: 700;
  font-size: 11.5px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #b3261e;
  background: #fff;
  border: 1.5px solid rgba(179, 38, 30, 0.35);
  padding: 0.55rem 0.9rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s ease;
  &:hover { background: rgba(179, 38, 30, 0.08); }
}

.banner-error {
  background: rgba(179, 38, 30, 0.08);
  color: #b3261e;
  border: 1px solid rgba(179, 38, 30, 0.25);
  padding: 0.75rem 1rem;
  border-radius: 4px;
  font-size: 13px;
  margin-bottom: 1rem;
}

.estado-vacio {
  color: rgba(61, 26, 38, 0.5);
  font-size: 14px;
  font-style: italic;
  padding: 3rem 0;
  text-align: center;
}

/* ── Grid de posts ── */
.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
}

.post-card {
  background: #fff;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(61, 26, 38, 0.07);
  display: flex;
  flex-direction: column;
}

.post-img-wrap {
  position: relative;
  aspect-ratio: 16 / 9;
  background: #f2f2f5;
}

.post-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.post-img-vacia {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(61, 26, 38, 0.3);
}

.post-body {
  padding: 1rem 1.2rem 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.post-fecha {
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: rgba(184, 154, 90, 0.9);
  margin: 0;
}

.post-titulo {
  font-size: 14px;
  font-weight: 800;
  text-transform: uppercase;
  color: #3d1a26;
  margin: 0;
}

.post-desc {
  font-size: 12.5px;
  color: rgba(61, 26, 38, 0.55);
  line-height: 1.5;
  margin: 0 0 0.4rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-acciones {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

/* ── Modal formulario ── */
.form-overlay {
  position: fixed;
  inset: 0;
  background: rgba(61, 26, 38, 0.6);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow-y: auto;
  padding: 3rem 1.5rem;
  z-index: 100;
}

.form-card {
  background: #fff;
  border-radius: 8px;
  padding: 2rem;
  max-width: 640px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
}

.form-title {
  font-size: 17px;
  font-weight: 800;
  text-transform: uppercase;
  color: #3d1a26;
  margin: 0;
}

.form-label {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  font-size: 12.5px;
  font-weight: 700;
  color: rgba(61, 26, 38, 0.7);
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.form-row {
  display: flex;
  gap: 1rem;
  > .form-label { flex: 1; }
}

.form-orden {
  max-width: 100px;
}

.form-input {
  font-family: inherit;
  font-size: 14px;
  font-weight: 400;
  text-transform: none;
  letter-spacing: normal;
  padding: 0.65rem 0.85rem;
  border: 1.5px solid rgba(140, 58, 80, 0.25);
  border-radius: 4px;
  outline: none;
  color: #3d1a26;
  &:focus { border-color: #8c3a50; }
}

.form-textarea {
  resize: vertical;
  font-style: normal;
}

.preview-thumbs {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.preview-thumb {
  position: relative;
  width: 90px;
  height: 60px;
  border-radius: 4px;
  overflow: hidden;
  background: rgba(140, 58, 80, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;

  img { width: 100%; height: 100%; object-fit: cover; display: block; }
}

.preview-nueva {
  font-size: 10px;
  text-align: center;
  padding: 0 0.3rem;
  color: rgba(61, 26, 38, 0.55);
}

.preview-remove {
  position: absolute;
  top: 2px;
  right: 2px;
  width: 18px;
  height: 18px;
  line-height: 16px;
  text-align: center;
  border-radius: 50%;
  border: none;
  background: rgba(61, 26, 38, 0.85);
  color: #fff;
  font-size: 12px;
  cursor: pointer;
  padding: 0;
}

.form-acciones {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 0.5rem;
}
</style>
