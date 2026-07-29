const DIMENSION_MAXIMA = 1280
const CALIDAD_JPEG = 0.72
const CALIDAD_WEBP = 0.75

// WebP comprime bastante mejor que JPEG a calidad equivalente, pero no todos los
// navegadores saben codificarlo desde <canvas> (Safari < 14, por ejemplo). Se
// comprueba una sola vez codificando un canvas mínimo y se reutiliza el resultado.
let soportaWebp: boolean | null = null
function compruebaSoporteWebp(): boolean {
  if (soportaWebp !== null) return soportaWebp
  const canvas = document.createElement('canvas')
  canvas.width = 1
  canvas.height = 1
  soportaWebp = canvas.toDataURL('image/webp').startsWith('data:image/webp')
  return soportaWebp
}

// Redimensiona y comprime la imagen en el propio navegador, devolviendo un data URI
// listo para guardarse directamente en el documento de Firestore (sin usar Storage).
export function imagenABase64(archivo: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const lector = new FileReader()
    lector.onerror = () => reject(lector.error)
    lector.onload = () => {
      const imagen = new Image()
      imagen.onerror = () => reject(new Error('No se pudo procesar la imagen.'))
      imagen.onload = () => {
        const escala = Math.min(1, DIMENSION_MAXIMA / Math.max(imagen.width, imagen.height))
        const ancho = Math.round(imagen.width * escala)
        const alto = Math.round(imagen.height * escala)
        const canvas = document.createElement('canvas')
        canvas.width = ancho
        canvas.height = alto
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          reject(new Error('No se pudo procesar la imagen.'))
          return
        }
        ctx.drawImage(imagen, 0, 0, ancho, alto)
        resolve(
          compruebaSoporteWebp()
            ? canvas.toDataURL('image/webp', CALIDAD_WEBP)
            : canvas.toDataURL('image/jpeg', CALIDAD_JPEG),
        )
      }
      imagen.src = lector.result as string
    }
    lector.readAsDataURL(archivo)
  })
}
