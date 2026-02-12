import { ref, computed } from 'vue'

// Estado global de música
const audio = ref<HTMLAudioElement | null>(null)
const isPlaying = ref(false)
const volume = ref(0.5)
const currentTime = ref(0)
const duration = ref(0)
const tipoMusica = ref<'suave' | 'ambiente' | null>(null)
const isExperienciaSensorial = ref(false)

// URLs de música locales
const musicUrls = {
  suave: '/experiencia_sensorial_suave.mp3',
  ambiente: '/ambiente.mp3',
}

// Tiempos de inicio para cada tipo de música
const startTimes = {
  suave: 12, // Empezar en el segundo 12
  ambiente: 29, // Empezar en el segundo 29
}

export function useGlobalMusic() {
  const initAudio = () => {
    if (!tipoMusica.value) return

    // Si ya hay un audio, limpiarlo primero
    if (audio.value) {
      audio.value.pause()
      audio.value = null
    }

    audio.value = new Audio(musicUrls[tipoMusica.value])
    audio.value.volume = volume.value

    audio.value.addEventListener('loadedmetadata', () => {
      duration.value = audio.value?.duration || 0
      // Establecer el tiempo de inicio cuando se cargan los metadatos
      if (audio.value && tipoMusica.value) {
        audio.value.currentTime = startTimes[tipoMusica.value]
      }
    })

    audio.value.addEventListener('timeupdate', () => {
      currentTime.value = audio.value?.currentTime || 0
    })

    audio.value.addEventListener('ended', () => {
      isPlaying.value = false
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
      if (tipoMusica.value && audio.value.currentTime < startTimes[tipoMusica.value]) {
        audio.value.currentTime = startTimes[tipoMusica.value]
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

  const startExperienciaSensorial = (tipo: 'suave' | 'ambiente') => {
    tipoMusica.value = tipo
    isExperienciaSensorial.value = true
    initAudio()
    
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

