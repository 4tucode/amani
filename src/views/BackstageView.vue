<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { useAdminAuth } from '../composables/useAdminAuth'
import { useProductos } from '../composables/useProductos'
import { imagenABase64 } from '../utils/imagenBase64'
import { SENTIDOS, type Producto, type Sentido } from '../types/producto'

const { autenticado, verificando, error: errorAuth, verificarClave } = useAdminAuth()
const {
  productos,
  cargando,
  guardando,
  error: errorProductos,
  cargarPorSentido,
  subirCertificado,
  crearProducto,
  actualizarProducto,
  eliminarDocumento,
  eliminarProducto,
} = useProductos()

// ── Popup de clave ──
const claveIntroducida = ref('')

const comprobarClave = async () => {
  const ok = await verificarClave(claveIntroducida.value)
  if (ok) {
    claveIntroducida.value = ''
    cargarPorSentido(sentidoActivo.value)
  }
}

// ── Filtro por sentido ──
const sentidoActivo = ref<Sentido>('vista')

const cambiarSentido = (sentido: Sentido) => {
  sentidoActivo.value = sentido
  cargarPorSentido(sentido)
}

// ── Formulario crear / editar ──
const formVisible = ref(false)
const productoEditando = ref<Producto | null>(null)

const formVacio = () => ({
  sentido: sentidoActivo.value as Sentido,
  nombre: '',
  descripcion: '',
  precio: '',
  agotado: false,
  orden: 1,
})

const form = reactive(formVacio())
const imgsExistentes = ref<string[]>([])
const imgsNuevas = ref<File[]>([])
const certificadoExistente = ref<string | null>(null)
const certificadoNuevo = ref<File | null>(null)

const abrirCrear = () => {
  productoEditando.value = null
  Object.assign(form, formVacio())
  form.orden = productos.value.length
    ? Math.max(...productos.value.map((p) => p.orden)) + 1
    : 1
  imgsExistentes.value = []
  imgsNuevas.value = []
  certificadoExistente.value = null
  certificadoNuevo.value = null
  formVisible.value = true
}

const abrirEditar = (producto: Producto) => {
  productoEditando.value = producto
  Object.assign(form, {
    sentido: producto.sentido,
    nombre: producto.nombre,
    descripcion: producto.descripcion,
    precio: producto.precio,
    agotado: producto.agotado,
    orden: producto.orden,
  })
  imgsExistentes.value = [...producto.imgs]
  imgsNuevas.value = []
  certificadoExistente.value = producto.certificado ?? null
  certificadoNuevo.value = null
  formVisible.value = true
}

const cerrarForm = () => {
  formVisible.value = false
  productoEditando.value = null
}

const onImagenesSeleccionadas = (e: Event) => {
  const input = e.target as HTMLInputElement
  imgsNuevas.value = input.files ? Array.from(input.files) : []
}

const onCertificadoSeleccionado = (e: Event) => {
  const input = e.target as HTMLInputElement
  certificadoNuevo.value = input.files?.[0] ?? null
}

const quitarImagenExistente = (url: string) => {
  imgsExistentes.value = imgsExistentes.value.filter((img) => img !== url)
}

const procesandoImagenes = ref(false)

const guardarProducto = async () => {
  if (!form.nombre.trim() || !form.precio.trim()) {
    errorFormulario.value = 'Nombre y precio son obligatorios.'
    return
  }
  errorFormulario.value = ''

  procesandoImagenes.value = true
  let nuevasUrls: string[]
  let certificadoFinal = certificadoExistente.value
  try {
    nuevasUrls = await Promise.all(imgsNuevas.value.map((archivo) => imagenABase64(archivo)))
    if (certificadoNuevo.value) {
      certificadoFinal = await subirCertificado(certificadoNuevo.value, form.sentido)
    }
  } catch (e) {
    console.error(e)
    errorFormulario.value = 'No se pudo procesar alguna de las fotos o el certificado.'
    procesandoImagenes.value = false
    return
  }
  procesandoImagenes.value = false

  const imgsFinales = [...imgsExistentes.value, ...nuevasUrls]

  const data = {
    sentido: form.sentido,
    nombre: form.nombre.trim(),
    descripcion: form.descripcion.trim(),
    precio: form.precio.trim(),
    agotado: form.agotado,
    orden: Number(form.orden) || 1,
    imgs: imgsFinales,
    certificado: certificadoFinal,
  }

  try {
    if (productoEditando.value?.id) {
      if (productoEditando.value.sentido === data.sentido) {
        await actualizarProducto(data.sentido, productoEditando.value.id, data)
      } else {
        // Cambiar de sentido implica mover de colección: se crea en la nueva
        // y se borra solo el documento antiguo.
        await crearProducto(data)
        await eliminarDocumento(productoEditando.value.sentido, productoEditando.value.id)
      }
    } else {
      await crearProducto(data)
    }
  } catch (e) {
    console.error(e)
    errorFormulario.value = errorProductos.value || 'No se pudo guardar el producto.'
    return
  }

  cerrarForm()
  cargarPorSentido(sentidoActivo.value)
}

const errorFormulario = ref('')

const alternarAgotado = async (producto: Producto) => {
  if (!producto.id) return
  await actualizarProducto(producto.sentido, producto.id, { agotado: !producto.agotado })
  cargarPorSentido(sentidoActivo.value)
}

const borrarProducto = async (producto: Producto) => {
  const confirmado = window.confirm(`¿Eliminar "${producto.nombre}"? Esta acción no se puede deshacer.`)
  if (!confirmado) return
  await eliminarProducto(producto)
  cargarPorSentido(sentidoActivo.value)
}

const labelSentido = (sentido: Sentido) => SENTIDOS.find((s) => s.valor === sentido)?.label ?? sentido

const hayProductos = computed(() => productos.value.length > 0)
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
          <p class="backstage-subtitle">Gestiona los productos de cada sentido</p>
        </div>
        <button class="btn-primary" @click="abrirCrear">+ Nuevo producto</button>
      </header>

      <nav class="sentido-tabs">
        <button
          v-for="s in SENTIDOS"
          :key="s.valor"
          class="sentido-tab"
          :class="{ active: sentidoActivo === s.valor }"
          @click="cambiarSentido(s.valor)"
        >
          {{ s.label }}
        </button>
      </nav>

      <p v-if="errorProductos" class="banner-error">{{ errorProductos }}</p>

      <div v-if="cargando" class="estado-vacio">Cargando productos…</div>
      <div v-else-if="!hayProductos" class="estado-vacio">
        No hay productos de {{ labelSentido(sentidoActivo) }} todavía. Crea el primero.
      </div>

      <div v-else class="productos-grid">
        <div v-for="producto in productos" :key="producto.id" class="producto-card">
          <div class="producto-img-wrap">
            <img v-if="producto.imgs[0]" :src="producto.imgs[0]" :alt="producto.nombre" class="producto-img" />
            <span v-if="producto.agotado" class="badge-agotado">Agotado</span>
          </div>
          <div class="producto-body">
            <h3 class="producto-nombre">{{ producto.nombre }}</h3>
            <p class="producto-precio">€{{ producto.precio }}</p>
            <p class="producto-desc">{{ producto.descripcion }}</p>
            <div class="producto-acciones">
              <button class="btn-secundario" @click="abrirEditar(producto)">Editar</button>
              <button class="btn-secundario" @click="alternarAgotado(producto)">
                {{ producto.agotado ? 'Marcar disponible' : 'Marcar agotado' }}
              </button>
              <button class="btn-peligro" @click="borrarProducto(producto)">Eliminar</button>
            </div>
          </div>
        </div>
      </div>

      <!-- ── Modal crear / editar ── -->
      <div v-if="formVisible" class="form-overlay" @click.self="cerrarForm">
        <form class="form-card" @submit.prevent="guardarProducto">
          <h2 class="form-title">{{ productoEditando ? 'Editar producto' : 'Nuevo producto' }}</h2>

          <label class="form-label">
            Sentido
            <select v-model="form.sentido" class="form-input">
              <option v-for="s in SENTIDOS" :key="s.valor" :value="s.valor">{{ s.label }}</option>
            </select>
          </label>

          <label class="form-label">
            Nombre
            <input v-model="form.nombre" type="text" class="form-input" required />
          </label>

          <label class="form-label">
            Descripción
            <textarea v-model="form.descripcion" class="form-input form-textarea" rows="4"></textarea>
          </label>

          <div class="form-row">
            <label class="form-label">
              Precio (€)
              <input v-model="form.precio" type="text" class="form-input" required />
            </label>
            <label class="form-label">
              Orden
              <input v-model.number="form.orden" type="number" class="form-input" />
            </label>
          </div>

          <label class="form-check">
            <input v-model="form.agotado" type="checkbox" />
            Producto agotado
          </label>

          <label class="form-label">
            Fotos
            <input type="file" accept="image/*" multiple class="form-input" @change="onImagenesSeleccionadas" />
          </label>

          <div v-if="imgsExistentes.length" class="preview-thumbs">
            <div v-for="img in imgsExistentes" :key="img" class="preview-thumb">
              <img :src="img" alt="" />
              <button type="button" class="preview-remove" @click="quitarImagenExistente(img)">×</button>
            </div>
          </div>
          <p v-if="imgsNuevas.length" class="preview-hint">{{ imgsNuevas.length }} foto(s) nueva(s) lista(s) para subir.</p>

          <label class="form-label">
            Certificado de autenticidad (PDF, opcional)
            <input type="file" accept="application/pdf" class="form-input" @change="onCertificadoSeleccionado" />
          </label>
          <p v-if="certificadoExistente && !certificadoNuevo" class="preview-hint">Ya tiene un certificado adjunto.</p>
          <p v-if="certificadoNuevo" class="preview-hint">Nuevo certificado listo para subir.</p>

          <p v-if="errorFormulario" class="banner-error">{{ errorFormulario }}</p>

          <div class="form-acciones">
            <button type="button" class="btn-secundario" @click="cerrarForm">Cancelar</button>
            <button type="submit" class="btn-primary" :disabled="guardando || procesandoImagenes">
              {{ procesandoImagenes ? 'Procesando fotos y certificado…' : guardando ? 'Guardando…' : 'Guardar' }}
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

/* ── Tabs de sentido ── */
.sentido-tabs {
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
  margin-bottom: 1.75rem;
}

.sentido-tab {
  font-family: inherit;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(61, 26, 38, 0.55);
  background: #fff;
  border: 1.5px solid transparent;
  padding: 0.6rem 1.2rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover { color: #8c3a50; }
  &.active {
    color: #fff;
    background: #8c3a50;
  }
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

/* ── Grid de productos ── */
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

.badge-agotado {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #fff;
  background: rgba(61, 26, 38, 0.88);
  padding: 0.35rem 0.7rem;
  border-radius: 2px;
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
  font-size: 15px;
  font-weight: 800;
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
  max-width: 520px;
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

.form-check {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 13px;
  font-weight: 700;
  color: #3d1a26;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.preview-thumbs {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.preview-thumb {
  position: relative;
  width: 56px;
  height: 56px;
  border-radius: 4px;
  overflow: hidden;

  img { width: 100%; height: 100%; object-fit: cover; display: block; }
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
