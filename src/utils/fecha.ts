// Convierte una fecha ISO (yyyy-mm-dd, la que da <input type="date">) al formato
// largo en español usado en el blog, p.ej. "15 de marzo de 2024".
export function formatearFecha(iso: string): string {
  if (!iso) return ''
  const fecha = new Date(`${iso}T00:00:00`)
  if (Number.isNaN(fecha.getTime())) return iso
  return fecha.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
}
