import { ref, computed } from 'vue'

// Estado global de música
const audio = ref<HTMLAudioElement | null>(null)
const isPlaying = ref(false)
const volume = ref(0.5)
const currentTime = ref(0)
const duration = ref(0)
type TipoMusica = 'suave' | 'ambiente'

interface Pista {
  url: string
  inicio: number // segundo en el que empieza a sonar
}

const tipoMusica = ref<TipoMusica | null>(null)
const pistaActual = ref<Pista | null>(null)
const isExperienciaSensorial = ref(false)

// Cada tipo tiene su propia lista: la reproducción aleatoria elige solo entre
// las pistas del tipo seleccionado, nunca mezcla suave con ambiente. Para añadir
// una canción basta con copiar el mp3 a la carpeta de su tipo en /public y
// sumarlo a su lista.
const pistas: Record<TipoMusica, Pista[]> = {
  suave: [
    { url: '/musica standar/experiencia_sensorial_suave.mp3', inicio: 12 },
    { url: '/musica standar/Alu - Tutela.mp3', inicio: 0 },
    { url: '/musica standar/Bad Man Songie - Han Solo.mp3', inicio: 0 },
    { url: '/musica standar/SYLON BRAX -  BADMAN SONGIE - CONEXION.mp3', inicio: 0 },
  ],
  ambiente: [
    { url: '/musica ambiente/ambiente.mp3', inicio: 29 },
    { url: '/musica ambiente/Alu - Baila logobi.mp3', inicio: 0 },
    { url: '/musica ambiente/Angel Glamour - Epo Diciembre.mp3', inicio: 0 },
    { url: '/musica ambiente/Jhonson Killer - ESCONDERSE.mp3', inicio: 0 },
  ],
}

const elegirPistaAleatoria = (tipo: TipoMusica): Pista => {
  const lista = pistas[tipo]
  // Evita repetir la que acaba de sonar cuando hay más de una donde elegir
  const candidatas = lista.length > 1 ? lista.filter((p) => p.url !== pistaActual.value?.url) : lista
  return candidatas[Math.floor(Math.random() * candidatas.length)]
}

export function useGlobalMusic() {
  const initAudio = () => {
    if (!tipoMusica.value) return

    const pista = elegirPistaAleatoria(tipoMusica.value)
    pistaActual.value = pista

    // Si ya hay un audio, limpiarlo primero
    if (audio.value) {
      audio.value.pause()
      audio.value = null
    }

    // Los nombres de archivo llevan espacios
    audio.value = new Audio(encodeURI(pista.url))
    audio.value.volume = volume.value

    audio.value.addEventListener('loadedmetadata', () => {
      duration.value = audio.value?.duration || 0
      // Establecer el tiempo de inicio cuando se cargan los metadatos
      if (audio.value) {
        audio.value.currentTime = pista.inicio
      }
    })

    audio.value.addEventListener('timeupdate', () => {
      currentTime.value = audio.value?.currentTime || 0
    })

    audio.value.addEventListener('ended', () => {
      // Al terminar una pista suena otra al azar del mismo tipo
      initAudio()
      reproducirCuandoEsteListo()
    })

    audio.value.addEventListener('error', (e) => {
      console.error('Error loading audio:', e)
    })
  }

  const togglePlay = () => {
    if (!audio.value) return

    if (isPlaying.value) {
      audio.value.pause()
    } else {
      // Si la música está antes del tiempo de inicio, moverla al tiempo correcto
      if (pistaActual.value && audio.value.currentTime < pistaActual.value.inicio) {
        audio.value.currentTime = pistaActual.value.inicio
      }
      audio.value.play()
    }
    isPlaying.value = !isPlaying.value
  }

  const setVolume = (newVolume: number) => {
    volume.value = newVolume
    if (audio.value) {
      audio.value.volume = newVolume
    }
  }

  const handleVolumeChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    setVolume(parseFloat(target.value))
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const startExperienciaSensorial = (tipo: TipoMusica) => {
    tipoMusica.value = tipo
    isExperienciaSensorial.value = true
    initAudio()
    reproducirCuandoEsteListo()
  }

  const reproducirCuandoEsteListo = () => {
    // Autoplay después de que el audio esté listo
    if (audio.value) {
      const playAudio = () => {
        if (audio.value) {
          audio.value.play()
            .then(() => {
              isPlaying.value = true
              console.log('Música iniciada correctamente')
            })
            .catch((error) => {
              console.error('Error al reproducir música:', error)
              // Si falla el autoplay, intentar de nuevo después de un delay
              setTimeout(() => {
                if (audio.value) {
                  audio.value.play()
                    .then(() => {
                      isPlaying.value = true
                    })
                    .catch((err) => {
                      console.error('Error persistente al reproducir música:', err)
                    })
                }
              }, 1000)
            })
        }
      }

      // Intentar reproducir cuando los metadatos estén cargados
      if (audio.value.readyState >= 2) {
        // Los metadatos ya están cargados
        playAudio()
      } else {
        // Esperar a que se carguen los metadatos
        audio.value.addEventListener('loadedmetadata', playAudio, { once: true })
        // También intentar después de un timeout como respaldo
        setTimeout(playAudio, 1000)
      }
    }
  }

  const stopExperienciaSensorial = () => {
    if (audio.value) {
      audio.value.pause()
      audio.value = null
    }
    isPlaying.value = false
    tipoMusica.value = null
    pistaActual.value = null
    isExperienciaSensorial.value = false
    currentTime.value = 0
    duration.value = 0
  }

  const navigateToExperiencia = (sentido: string) => {
    return `/experiencia/${sentido}?tipo=${tipoMusica.value}`
  }

  return {
    // Estado reactivo
    audio: computed(() => audio.value),
    isPlaying: computed(() => isPlaying.value),
    volume: computed(() => volume.value),
    currentTime: computed(() => currentTime.value),
    duration: computed(() => duration.value),
    tipoMusica: computed(() => tipoMusica.value),
    isExperienciaSensorial: computed(() => isExperienciaSensorial.value),

    // Métodos
    initAudio,
    togglePlay,
    setVolume,
    handleVolumeChange,
    formatTime,
    startExperienciaSensorial,
    stopExperienciaSensorial,
    navigateToExperiencia,
  }
}

