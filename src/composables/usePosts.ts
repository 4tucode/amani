import { ref } from 'vue'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'
import type { Post } from '../types/post'

// Mismo límite que en useProductos: Firestore corta cada documento en 1 MiB y aquí
// también viajan imágenes en base64 (portada + las embebidas en el contenido).
const LIMITE_BYTES_DOCUMENTO = 900_000

function tamanioEnBytes(data: unknown): number {
  return new Blob([JSON.stringify(data)]).size
}

function normalizarPost(id: string, data: Record<string, unknown>): Post {
  return {
    id,
    titulo: typeof data.titulo === 'string' ? data.titulo : '',
    descripcion: typeof data.descripcion === 'string' ? data.descripcion : '',
    contenido: typeof data.contenido === 'string' ? data.contenido : '',
    imagenPortada: typeof data.imagenPortada === 'string' ? data.imagenPortada : null,
    autor: typeof data.autor === 'string' ? data.autor : 'Equipo Amani',
    fecha: typeof data.fecha === 'string' ? data.fecha : '',
    orden: typeof data.orden === 'number' ? data.orden : 0,
  }
}

const POST_EJEMPLO: Omit<Post, 'id'> = {
  titulo: 'Bienvenidos al blog de Amani',
  descripcion:
    'Artículo de ejemplo creado automáticamente para mostrar cómo se ven los posts en el blog. Edítalo o elimínalo desde el panel de administración.',
  contenido:
    '<p>Este es un artículo de ejemplo. Desde el panel de administración puedes escribir el contenido con texto <strong>enriquecido</strong> e ir insertando imágenes entre los párrafos, igual que en un editor normal.</p><p>Elimina este artículo o edítalo en cuanto tengas contenido real que publicar.</p>',
  imagenPortada: null,
  autor: 'Equipo Amani',
  fecha: new Date().toISOString().slice(0, 10),
  orden: 1,
}

// Colección única `posts` en Firestore (a diferencia de los productos, que tienen
// una colección por sentido).
export function usePosts() {
  const posts = ref<Post[]>([])
  const cargando = ref(false)
  const guardando = ref(false)
  const error = ref('')

  // Más reciente primero; ante empate en fecha, por `orden`.
  const cargarPosts = async () => {
    cargando.value = true
    error.value = ''
    try {
      const snapshot = await getDocs(collection(db, 'posts'))
      posts.value = snapshot.docs
        .map((d) => normalizarPost(d.id, d.data()))
        .sort((a, b) => (a.fecha < b.fecha ? 1 : a.fecha > b.fecha ? -1 : a.orden - b.orden))
    } catch (e) {
      console.error(e)
      error.value = 'No se pudieron cargar los posts.'
    } finally {
      cargando.value = false
    }
  }

  // Solo se llama desde el panel de administración (ya autenticado): si la colección
  // `posts` está vacía, deja sembrado un primer artículo de ejemplo.
  const sembrarPostEjemplo = async (): Promise<boolean> => {
    const snapshot = await getDocs(collection(db, 'posts'))
    if (!snapshot.empty) return false
    await addDoc(collection(db, 'posts'), POST_EJEMPLO)
    return true
  }

  const crearPost = async (data: Omit<Post, 'id'>) => {
    guardando.value = true
    error.value = ''
    try {
      if (tamanioEnBytes(data) > LIMITE_BYTES_DOCUMENTO) {
        error.value = 'El contenido es demasiado pesado para guardarse. Usa menos imágenes o reduce su tamaño.'
        throw new Error('Documento demasiado grande')
      }
      await addDoc(collection(db, 'posts'), data)
    } catch (e) {
      console.error(e)
      if (!error.value) error.value = 'No se pudo crear el post.'
      throw e
    } finally {
      guardando.value = false
    }
  }

  const actualizarPost = async (id: string, data: Partial<Post>) => {
    guardando.value = true
    error.value = ''
    try {
      if (tamanioEnBytes(data) > LIMITE_BYTES_DOCUMENTO) {
        error.value = 'El contenido es demasiado pesado para guardarse. Usa menos imágenes o reduce su tamaño.'
        throw new Error('Documento demasiado grande')
      }
      await updateDoc(doc(db, 'posts', id), { ...data })
    } catch (e) {
      console.error(e)
      if (!error.value) error.value = 'No se pudo actualizar el post.'
      throw e
    } finally {
      guardando.value = false
    }
  }

  const eliminarPost = async (post: Post) => {
    if (!post.id) return
    guardando.value = true
    error.value = ''
    try {
      await deleteDoc(doc(db, 'posts', post.id))
    } catch (e) {
      console.error(e)
      error.value = 'No se pudo eliminar el post.'
      throw e
    } finally {
      guardando.value = false
    }
  }

  return {
    posts,
    cargando,
    guardando,
    error,
    cargarPosts,
    sembrarPostEjemplo,
    crearPost,
    actualizarPost,
    eliminarPost,
  }
}
