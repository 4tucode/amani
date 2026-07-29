export interface Post {
  id?: string
  titulo: string
  descripcion: string
  contenido: string
  imagenPortada: string | null
  autor: string
  fecha: string
  orden: number
}
