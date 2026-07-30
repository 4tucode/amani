<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { useAdminAuth } from '../composables/useAdminAuth'
import { useBlogArticulos } from '../composables/useBlogArticulos'
import { imagenABase64 } from '../utils/imagenBase64'
import type { ArticuloBlog } from '../types/blog'

const { autenticado, verificando, error: errorAuth, verificarClave, cerrarSesion } = useAdminAuth()
const {
  articulos,
  cargando,
  guardando,
  error: errorArticulos,
  cargarArticulos,
  crearArticulo,
  actualizarArticulo,
  eliminarArticulo,
} = useBlogArticulos()

// ── Popup de clave ──
const claveIntroducida = ref('')
const recordarDispositivo = ref(false)

const comprobarClave = async () => {
  const ok = await verificarClave(claveIntroducida.value, recordarDispositivo.value)
  if (ok) {
    claveIntroducida.value = ''
    cargarArticulos()
  }
}

if (autenticado.value) cargarArticulos()

// ── Formulario crear / editar ──
const formVisible = ref(false)
const articuloEditando = ref<ArticuloBlog | null>(null)

const formVacio = () => ({
  titulo: '',
  descripcion: '',
  contenido: '',
  autor: 'Equipo Amani',
  fecha: '',
  orden: 1,
})

const form = reactive(formVacio())
const imagenExistente = ref('')
const imagenNueva = ref<File | null>(null)

const abrirCrear = () => {
  articuloEditando.value = null
  Object.assign(form, formVacio())
  form.orden = articulos.value.length
    ? Math.max(...articulos.value.map((a) => a.orden)) + 1
    : 1
  form.fecha = new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
  imagenExistente.value = ''
  imagenNueva.value = null
  formVisible.value = true
}

const abrirEditar = (articulo: ArticuloBlog) => {
  articuloEditando.value = articulo
  Object.assign(form, {
    titulo: articulo.titulo,
    descripcion: articulo.descripcion,
    contenido: articulo.contenido,
    autor: articulo.autor,
    fecha: articulo.fecha,
    orden: articulo.orden,
  })
  imagenExistente.value = articulo.imagen
  imagenNueva.value = null
  formVisible.value = true
}

const cerrarForm = () => {
  formVisible.value = false
  articuloEditando.value = null
}

const onImagenSeleccionada = (e: Event) => {
  const input = e.target as HTMLInputElement
  imagenNueva.value = input.files?.[0] ?? null
}

const procesandoImagen = ref(false)
const errorFormulario = ref('')

const guardarArticulo = async () => {
  if (!form.titulo.trim() || !form.contenido.trim()) {
    errorFormulario.value = 'Título y contenido son obligatorios.'
    return
  }
  errorFormulario.value = ''

  let imagenFinal = imagenExistente.value
  if (imagenNueva.value) {
    procesandoImagen.value = true
    try {
      imagenFinal = await imagenABase64(imagenNueva.value)
    } catch (e) {
      console.error(e)
      errorFormulario.value = 'No se pudo procesar la imagen.'
      procesandoImagen.value = false
      return
    }
    procesandoImagen.value = false
  }

  const data = {
    titulo: form.titulo.trim(),
    descripcion: form.descripcion.trim(),
    contenido: form.contenido.trim(),
    autor: form.autor.trim(),
    fecha: form.fecha.trim(),
    orden: Number(form.orden) || 1,
    imagen: imagenFinal,
  }

  try {
    if (articuloEditando.value?.id) {
      await actualizarArticulo(articuloEditando.value.id, data)
    } else {
      await crearArticulo(data)
    }
  } catch (e) {
    console.error(e)
    errorFormulario.value = errorArticulos.value || 'No se pudo guardar el artículo.'
    return
  }

  cerrarForm()
  cargarArticulos()
}

const borrarArticulo = async (articulo: ArticuloBlog) => {
  if (!articulo.id) return
  const confirmado = window.confirm(`¿Eliminar "${articulo.titulo}"? Esta acción no se puede deshacer.`)
  if (!confirmado) return
  await eliminarArticulo(articulo.id)
  cargarArticulos()
}

const hayArticulos = computed(() => articulos.value.length > 0)
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
        <label class="auth-remember">
          <input v-model="recordarDispositivo" type="checkbox" />
          Recordar este dispositivo durante 30 días
        </label>
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
          <h1 class="backstage-title">Artículos del Blog</h1>
          <p class="backstage-subtitle">Gestiona las publicaciones del blog</p>
        </div>
        <div class="backstage-header-acciones">
          <RouterLink to="/backstage" class="btn-secundario">Productos</RouterLink>
          <button class="btn-primary" @click="abrirCrear">+ Nuevo artículo</button>
          <button class="btn-secundario" @click="cerrarSesion">Cerrar sesión</button>
        </div>
      </header>

      <p v-if="errorArticulos" class="banner-error">{{ errorArticulos }}</p>

      <div v-if="cargando" class="estado-vacio">Cargando artículos…</div>
      <div v-else-if="!hayArticulos" class="estado-vacio">No hay artículos todavía. Crea el primero.</div>

      <div v-else class="productos-grid">
        <div v-for="articulo in articulos" :key="articulo.id" class="producto-card">
          <div class="producto-img-wrap">
            <img v-if="articulo.imagen" :src="articulo.imagen" :alt="articulo.titulo" class="producto-img" />
          </div>
          <div class="producto-body">
            <h3 class="producto-nombre">{{ articulo.titulo }}</h3>
            <p class="producto-precio">{{ articulo.fecha }}</p>
            <p class="producto-desc">{{ articulo.descripcion }}</p>
            <div class="producto-acciones">
              <button class="btn-secundario" @click="abrirEditar(articulo)">Editar</button>
              <button class="btn-peligro" @click="borrarArticulo(articulo)">Eliminar</button>
            </div>
          </div>
        </div>
      </div>

      <!-- ── Modal crear / editar ── -->
      <div v-if="formVisible" class="form-overlay" @click.self="cerrarForm">
        <form class="form-card" @submit.prevent="guardarArticulo">
          <h2 class="form-title">{{ articuloEditando ? 'Editar artículo' : 'Nuevo artículo' }}</h2>

          <label class="form-label">
            Título
            <input v-model="form.titulo" type="text" class="form-input" required />
          </label>

          <label class="form-label">
            Descripción (resumen que aparece en el listado)
            <textarea v-model="form.descripcion" class="form-input form-textarea-normal" rows="3"></textarea>
          </label>

          <label class="form-label">
            Contenido (HTML: usa &lt;p&gt;, &lt;h2&gt;, &lt;strong&gt;…)
            <textarea v-model="form.contenido" class="form-input form-textarea" rows="10" required></textarea>
          </label>

          <div class="form-row">
            <label class="form-label">
              Autor
              <input v-model="form.autor" type="text" class="form-input" />
            </label>
            <label class="form-label">
              Fecha
              <input v-model="form.fecha" type="text" class="form-input" placeholder="15 de marzo, 2024" />
            </label>
            <label class="form-label">
              Orden
              <input v-model.number="form.orden" type="number" class="form-input" />
            </label>
          </div>

          <label class="form-label">
            Imagen de portada
            <input type="file" accept="image/*" class="form-input" @change="onImagenSeleccionada" />
          </label>

          <div v-if="imagenExistente && !imagenNueva" class="preview-thumbs">
            <div class="preview-thumb">
              <img :src="imagenExistente" alt="" />
            </div>
          </div>
          <p v-if="imagenNueva" class="preview-hint">Nueva imagen lista para subir.</p>

          <p v-if="errorFormulario" class="banner-error">{{ errorFormulario }}</p>

          <div class="form-acciones">
            <button type="button" class="btn-secundario" @click="cerrarForm">Cancelar</button>
            <button type="submit" class="btn-primary" :disabled="guardando || procesandoImagen">
              {{ procesandoImagen ? 'Procesando imagen…' : guardando ? 'Guardando…' : 'Guardar' }}
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

.auth-remember {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 12.5px;
  color: rgba(61, 26, 38, 0.65);
  cursor: pointer;
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
  margin-bottom: 1.5rem;
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

.backstage-header-acciones {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.backstage-header-acciones .btn-secundario {
  text-decoration: none;
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

/* ── Grid de artículos ── */
.productos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
}

.producto-card {
  background: #fff;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(61, 26, 38, 0.07);
  display: flex;
  flex-direction: column;
}

.producto-img-wrap {
  position: relative;
  aspect-ratio: 4 / 3;
  background: #f2f2f5;
}

.producto-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.producto-body {
  padding: 1rem 1.2rem 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.producto-nombre {
  font-size: 14px;
  font-weight: 800;
  text-transform: uppercase;
  color: #3d1a26;
  margin: 0;
}

.producto-precio {
  font-size: 12px;
  font-style: italic;
  color: #8c3a50;
  margin: 0;
}

.producto-desc {
  font-size: 12.5px;
  color: rgba(61, 26, 38, 0.55);
  line-height: 1.5;
  margin: 0 0 0.4rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.producto-acciones {
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
  max-width: 560px;
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
  flex-wrap: wrap;
  > .form-label { flex: 1; min-width: 120px; }
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
  font-family: 'Courier New', monospace;
  font-size: 13px;
}

.form-textarea-normal {
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
  width: 72px;
  height: 72px;
  border-radius: 4px;
  overflow: hidden;

  img { width: 100%; height: 100%; object-fit: cover; display: block; }
}

.preview-hint {
  font-size: 12px;
  color: rgba(61, 26, 38, 0.55);
  font-style: italic;
  margin: -0.4rem 0 0;
}

.form-acciones {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 0.5rem;
}
</style>
