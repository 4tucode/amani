export type Sentido = 'vista' | 'oido' | 'olfato' | 'gusto' | 'tacto'

export const SENTIDOS: { valor: Sentido; label: string }[] = [
  { valor: 'vista', label: 'Vista' },
  { valor: 'oido', label: 'Oído' },
  { valor: 'olfato', label: 'Olfato' },
  { valor: 'gusto', label: 'Gusto' },
  { valor: 'tacto', label: 'Tacto' },
]

export interface Producto {
  id?: string
  sentido: Sentido
  nombre: string
  descripcion: string
  precio: string
  imgs: string[]
  agotado: boolean
  certificado?: string | null
  orden: number
}
