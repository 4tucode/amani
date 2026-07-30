import { ref } from 'vue'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'
import type { ArticuloBlog } from '../types/blog'

// Mismo límite que useProductos: la imagen va en base64 dentro del documento,
// y Firestore limita cada documento a 1 MiB.
const LIMITE_BYTES_DOCUMENTO = 900_000

function tamanioEnBytes(data: unknown): number {
  return new Blob([JSON.stringify(data)]).size
}

function normalizarArticulo(id: string, data: Record<string, unknown>): ArticuloBlog {
  return {
    id,
    titulo: typeof data.titulo === 'string' ? data.titulo : '',
    descripcion: typeof data.descripcion === 'string' ? data.descripcion : '',
    contenido: typeof data.contenido === 'string' ? data.contenido : '',
    imagen: typeof data.imagen === 'string' ? data.imagen : '',
    fecha: typeof data.fecha === 'string' ? data.fecha : '',
    autor: typeof data.autor === 'string' ? data.autor : '',
    orden: typeof data.orden === 'number' ? data.orden : 0,
  }
}

// Los artículos del blog viven en su propia colección `blog` de Firestore.
export function useBlogArticulos() {
  const articulos = ref<ArticuloBlog[]>([])
  const cargando = ref(false)
  const guardando = ref(false)
  const error = ref('')

  // Ordena en el cliente por `orden` (evita depender de un índice compuesto).
  const cargarArticulos = async () => {
    cargando.value = true
    error.value = ''
    try {
      const snapshot = await getDocs(collection(db, 'blog'))
      articulos.value = snapshot.docs
        .map((d) => normalizarArticulo(d.id, d.data()))
        .sort((a, b) => a.orden - b.orden)
    } catch (e) {
      console.error(e)
      error.value = 'No se pudieron cargar los artículos.'
    } finally {
      cargando.value = false
    }
  }

  const crearArticulo = async (data: Omit<ArticuloBlog, 'id'>) => {
    guardando.value = true
    error.value = ''
    try {
      if (tamanioEnBytes(data) > LIMITE_BYTES_DOCUMENTO) {
        error.value = 'La imagen es demasiado pesada para guardarse. Usa una imagen más ligera.'
        throw new Error('Documento demasiado grande')
      }
      await addDoc(collection(db, 'blog'), data)
    } catch (e) {
      console.error(e)
      if (!error.value) error.value = 'No se pudo crear el artículo.'
      throw e
    } finally {
      guardando.value = false
    }
  }

  const actualizarArticulo = async (id: string, data: Partial<ArticuloBlog>) => {
    guardando.value = true
    error.value = ''
    try {
      if (tamanioEnBytes(data) > LIMITE_BYTES_DOCUMENTO) {
        error.value = 'La imagen es demasiado pesada para guardarse. Usa una imagen más ligera.'
        throw new Error('Documento demasiado grande')
      }
      await updateDoc(doc(db, 'blog', id), { ...data })
    } catch (e) {
      console.error(e)
      if (!error.value) error.value = 'No se pudo actualizar el artículo.'
      throw e
    } finally {
      guardando.value = false
    }
  }

  const eliminarArticulo = async (id: string) => {
    guardando.value = true
    error.value = ''
    try {
      await deleteDoc(doc(db, 'blog', id))
    } catch (e) {
      console.error(e)
      error.value = 'No se pudo eliminar el artículo.'
      throw e
    } finally {
      guardando.value = false
    }
  }

  return {
    articulos,
    cargando,
    guardando,
    error,
    cargarArticulos,
    crearArticulo,
    actualizarArticulo,
    eliminarArticulo,
  }
}
