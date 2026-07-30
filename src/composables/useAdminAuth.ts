import { ref } from 'vue'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'

const SESSION_KEY = 'amani_backstage_auth'
const REMEMBER_KEY = 'amani_backstage_remember'
const REMEMBER_DIAS = 30

// El "recordar dispositivo" guarda en localStorage (sobrevive a cerrar el navegador)
// una fecha de expiración; sessionStorage en cambio solo dura mientras la pestaña
// esté abierta. Si el usuario no marca la casilla, se comporta como antes.
function recordatorioValido(): boolean {
  const expira = Number(localStorage.getItem(REMEMBER_KEY))
  if (!expira || Date.now() > expira) {
    localStorage.removeItem(REMEMBER_KEY)
    return false
  }
  return true
}

const autenticado = ref(sessionStorage.getItem(SESSION_KEY) === '1' || recordatorioValido())

export function useAdminAuth() {
  const verificando = ref(false)
  const error = ref('')

  // Comprueba la clave introducida contra el campo `clave` de cada documento
  // de la colección `claves`. Autenticación simple a nivel de app, no sustituye
  // a Firebase Auth: cualquiera con acceso directo a la API podría saltarse esta
  // pantalla, así que las reglas de Firestore deben impedir escritura en `productos`
  // y `claves` desde fuera de la consola/admin.
  const verificarClave = async (clave: string, recordarDispositivo = false) => {
    error.value = ''
    if (!clave.trim()) {
      error.value = 'Introduce la clave de administrador.'
      return false
    }
    verificando.value = true
    try {
      const snapshot = await getDocs(collection(db, 'claves'))
      const valida = snapshot.docs.some((doc) => doc.data().clave === clave)
      if (valida) {
        autenticado.value = true
        sessionStorage.setItem(SESSION_KEY, '1')
        if (recordarDispositivo) {
          localStorage.setItem(REMEMBER_KEY, String(Date.now() + REMEMBER_DIAS * 24 * 60 * 60 * 1000))
        }
        return true
      }
      error.value = 'Clave incorrecta.'
      return false
    } catch (e) {
      console.error(e)
      error.value = 'No se pudo verificar la clave. Inténtalo de nuevo.'
      return false
    } finally {
      verificando.value = false
    }
  }

  const cerrarSesion = () => {
    autenticado.value = false
    sessionStorage.removeItem(SESSION_KEY)
    localStorage.removeItem(REMEMBER_KEY)
  }

  return { autenticado, verificando, error, verificarClave, cerrarSesion }
}
