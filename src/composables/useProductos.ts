import { ref } from 'vue'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage'
import { db, storage } from '../firebase'
import type { Producto, Sentido } from '../types/producto'

// Firestore limita cada documento a 1 MiB. Las fotos van en base64 dentro del
// propio documento; el certificado PDF (que no se puede recomprimir) va aparte
// en Storage, así que solo las fotos cuentan para este límite.
const LIMITE_BYTES_DOCUMENTO = 900_000

function tamanioEnBytes(data: unknown): number {
  return new Blob([JSON.stringify(data)]).size
}

// Los documentos pueden venir incompletos (creados a mano en la consola de Firebase,
// o de un esquema anterior), así que nunca confiamos en que traigan todos los campos.
function normalizarProducto(id: string, sentido: Sentido, data: Record<string, unknown>): Producto {
  return {
    id,
    sentido,
    nombre: typeof data.nombre === 'string' ? data.nombre : '',
    descripcion: typeof data.descripcion === 'string' ? data.descripcion : '',
    precio: typeof data.precio === 'string' ? data.precio : '',
    imgs: Array.isArray(data.imgs) ? data.imgs : [],
    agotado: Boolean(data.agotado),
    certificado: typeof data.certificado === 'string' ? data.certificado : null,
    orden: typeof data.orden === 'number' ? data.orden : 0,
  }
}

// Cada sentido es su propia colección en Firestore (vista, oido, olfato, gusto, tacto),
// no una colección `productos` filtrada por campo.
export function useProductos() {
  const productos = ref<Producto[]>([])
  const cargando = ref(false)
  const guardando = ref(false)
  const error = ref('')

  // Ordena en el cliente por `orden` (evita depender de un índice compuesto).
  const cargarPorSentido = async (sentido: Sentido) => {
    cargando.value = true
    error.value = ''
    try {
      const snapshot = await getDocs(collection(db, sentido))
      productos.value = snapshot.docs
        .map((d) => normalizarProducto(d.id, sentido, d.data()))
        .sort((a, b) => a.orden - b.orden)
    } catch (e) {
      console.error(e)
      error.value = 'No se pudieron cargar los productos.'
    } finally {
      cargando.value = false
    }
  }

  // El PDF del certificado no se puede recomprimir como una foto, así que
  // se sube a Storage en vez de guardarse en base64 dentro del documento.
  const subirCertificado = async (archivo: File, sentido: Sentido): Promise<string> => {
    const nombreArchivo = `${Date.now()}_${archivo.name}`
    const refArchivo = storageRef(storage, `certificados/${sentido}/${nombreArchivo}`)
    await uploadBytes(refArchivo, archivo)
    return await getDownloadURL(refArchivo)
  }

  const eliminarCertificado = async (url: string) => {
    try {
      await deleteObject(storageRef(storage, url))
    } catch (e) {
      // Best-effort: si el archivo ya no existe o la URL no es de Storage, lo ignoramos.
      console.warn('No se pudo borrar el certificado de Storage:', e)
    }
  }

  const crearProducto = async (data: Omit<Producto, 'id'>) => {
    guardando.value = true
    error.value = ''
    try {
      if (tamanioEnBytes(data) > LIMITE_BYTES_DOCUMENTO) {
        error.value = 'Las fotos son demasiado pesadas para guardarse. Usa menos fotos o quita alguna.'
        throw new Error('Documento demasiado grande')
      }
      await addDoc(collection(db, data.sentido), data)
    } catch (e) {
      console.error(e)
      if (!error.value) error.value = 'No se pudo crear el producto.'
      throw e
    } finally {
      guardando.value = false
    }
  }

  const actualizarProducto = async (sentido: Sentido, id: string, data: Partial<Producto>) => {
    guardando.value = true
    error.value = ''
    try {
      if (tamanioEnBytes(data) > LIMITE_BYTES_DOCUMENTO) {
        error.value = 'Las fotos son demasiado pesadas para guardarse. Usa menos fotos o quita alguna.'
        throw new Error('Documento demasiado grande')
      }
      await updateDoc(doc(db, sentido, id), { ...data })
    } catch (e) {
      console.error(e)
      if (!error.value) error.value = 'No se pudo actualizar el producto.'
      throw e
    } finally {
      guardando.value = false
    }
  }

  // Borra solo el documento (sin tocar el certificado en Storage). Se usa al mover
  // un producto de un sentido a otro, donde el certificado se reutiliza tal cual.
  const eliminarDocumento = async (sentido: Sentido, id: string) => {
    await deleteDoc(doc(db, sentido, id))
  }

  const eliminarProducto = async (producto: Producto) => {
    if (!producto.id) return
    guardando.value = true
    error.value = ''
    try {
      await eliminarDocumento(producto.sentido, producto.id)
      if (producto.certificado) await eliminarCertificado(producto.certificado)
    } catch (e) {
      console.error(e)
      error.value = 'No se pudo eliminar el producto.'
      throw e
    } finally {
      guardando.value = false
    }
  }

  return {
    productos,
    cargando,
    guardando,
    error,
    cargarPorSentido,
    subirCertificado,
    crearProducto,
    actualizarProducto,
    eliminarDocumento,
    eliminarProducto,
  }
}
