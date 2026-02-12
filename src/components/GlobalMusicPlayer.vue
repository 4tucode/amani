<script setup lang="ts">
import { useGlobalMusic } from '../composables/useGlobalMusic'

const {
    isPlaying,
    volume,
    currentTime,
    duration,
    tipoMusica,
    isExperienciaSensorial,
    togglePlay,
    handleVolumeChange,
    formatTime
} = useGlobalMusic()
</script>

<script lang="ts">
export default {
    name: 'GlobalMusicPlayer'
}
</script>

<template>
    <!-- Reproductor de música fijo en la parte inferior -->
    <div v-if="isExperienciaSensorial"
        class="fixed bottom-0 left-0 right-0 z-50 bg-white backdrop-blur-sm border-t border-[#582a35] shadow-lg">
        <div class="max-w-4xl mx-auto px-2 sm:px-4 py-2 sm:py-4">
            <!-- Layout móvil: vertical -->
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-0">
                <!-- Primera fila móvil: Info y Play -->
                <div class="flex items-center justify-between md:justify-start md:flex-1">
                    <!-- Información de la música -->
                    <div class="flex items-center space-x-2 sm:space-x-4 flex-1 min-w-0">
                        <div
                            class="w-10 h-10 sm:w-12 sm:h-12 bg-[#582a35] rounded-full flex items-center justify-center shadow-lg shadow-black/20 flex-shrink-0">
                            <svg class="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3">
                                </path>
                            </svg>
                        </div>
                        <div class="min-w-0 flex-1">
                            <h4 class="text-[#582a35] font-semibold text-xs sm:text-sm md:text-base truncate">
                                {{ tipoMusica === 'suave' ? 'Música Suave' : 'Música Ambiente' }}
                            </h4>
                            <p class="text-[#000] text-xs sm:text-sm hidden sm:block">
                                {{ tipoMusica === 'suave' ? 'Relajante y tranquila' : 'Energética para bailar' }}
                            </p>
                        </div>
                    </div>

                    <!-- Botón play/pause - visible en móvil -->
                    <button @click="togglePlay"
                        class="w-10 h-10 sm:w-12 sm:h-12 bg-[#807a2a] rounded-full flex items-center justify-center hover:bg-[#582a35] transition-all duration-300 hover:scale-105 shadow-lg shadow-black/30 flex-shrink-0 md:hidden">
                        <svg v-if="!isPlaying" class="w-5 h-5 sm:w-6 sm:h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                        <svg v-else class="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                        </svg>
                    </button>
                </div>

                <!-- Sistema de ondas - oculto en móvil muy pequeño -->
                <div class="hidden sm:flex items-center space-x-2 md:flex-1 md:justify-center">
                    <div class="flex space-x-0.5 sm:space-x-1">
                        <div class="w-0.5 sm:w-1 h-4 sm:h-6 bg-[#582a35] rounded-full transition-all duration-300"
                            :class="isPlaying ? 'animate-wave' : 'opacity-50'" :style="{ animationDelay: '0s' }"></div>
                        <div class="w-0.5 sm:w-1 h-5 sm:h-8 bg-[#582a35] rounded-full transition-all duration-300"
                            :class="isPlaying ? 'animate-wave' : 'opacity-50'" :style="{ animationDelay: '0.1s' }">
                        </div>
                        <div class="w-0.5 sm:w-1 h-3 sm:h-4 bg-[#582a35] rounded-full transition-all duration-300"
                            :class="isPlaying ? 'animate-wave' : 'opacity-50'" :style="{ animationDelay: '0.2s' }">
                        </div>
                        <div class="w-0.5 sm:w-1 h-4 sm:h-7 bg-[#582a35] rounded-full transition-all duration-300"
                            :class="isPlaying ? 'animate-wave' : 'opacity-50'" :style="{ animationDelay: '0.3s' }">
                        </div>
                        <div class="w-0.5 sm:w-1 h-3 sm:h-5 bg-[#582a35] rounded-full transition-all duration-300"
                            :class="isPlaying ? 'animate-wave' : 'opacity-50'" :style="{ animationDelay: '0.4s' }">
                        </div>
                        <div class="w-0.5 sm:w-1 h-4 sm:h-6 bg-[#582a35] rounded-full transition-all duration-300"
                            :class="isPlaying ? 'animate-wave' : 'opacity-50'" :style="{ animationDelay: '0.5s' }">
                        </div>
                        <div class="w-0.5 sm:w-1 h-2 sm:h-3 bg-[#582a35] rounded-full transition-all duration-300"
                            :class="isPlaying ? 'animate-wave' : 'opacity-50'" :style="{ animationDelay: '0.6s' }">
                        </div>
                        <div class="w-0.5 sm:w-1 h-5 sm:h-8 bg-[#582a35] rounded-full transition-all duration-300"
                            :class="isPlaying ? 'animate-wave' : 'opacity-50'" :style="{ animationDelay: '0.7s' }">
                        </div>
                    </div>
                </div>

                <!-- Controles del reproductor -->
                <div class="flex items-center justify-between sm:justify-end space-x-2 sm:space-x-4 md:flex-1 md:justify-end">
                    <!-- Botón play/pause - oculto en móvil (ya está arriba) -->
                    <button @click="togglePlay"
                        class="hidden md:flex w-12 h-12 bg-[#807a2a] rounded-full items-center justify-center hover:bg-[#582a35] transition-all duration-300 hover:scale-105 shadow-lg shadow-black/30">
                        <svg v-if="!isPlaying" class="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                        <svg v-else class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                        </svg>
                    </button>

                    <!-- Control de volumen -->
                    <div class="flex items-center space-x-1 sm:space-x-2">
                        <svg class="w-4 h-4 sm:w-5 sm:h-5 text-[#582a35] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z">
                            </path>
                        </svg>
                        <input type="range" min="0" max="1" step="0.1" :value="volume" @input="handleVolumeChange"
                            class="w-12 sm:w-16 md:w-20 h-1.5 sm:h-2 bg-[#e9e8dc] rounded-lg appearance-none cursor-pointer slider">
                    </div>

                    <!-- Tiempo -->
                    <div class="text-[#582a35] text-xs sm:text-sm font-mono whitespace-nowrap">
                        {{ formatTime(currentTime) }}<span class="hidden sm:inline"> / {{ formatTime(duration) }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Estilos para el slider de volumen */
.slider {
    background: #e9e8dc;
}

.slider::-webkit-slider-thumb {
    appearance: none;
    height: 12px;
    width: 12px;
    border-radius: 50%;
    background: #807a2a;
    cursor: pointer;
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.2);
    margin-top: -3px;
}

@media (min-width: 640px) {
    .slider::-webkit-slider-thumb {
        height: 16px;
        width: 16px;
        margin-top: -4px;
    }
}

.slider::-moz-range-thumb {
    height: 12px;
    width: 12px;
    border-radius: 50%;
    background: #807a2a;
    cursor: pointer;
    border: none;
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.2);
    margin-top: -3px;
}

@media (min-width: 640px) {
    .slider::-moz-range-thumb {
        height: 16px;
        width: 16px;
        margin-top: -4px;
    }
}

.slider::-webkit-slider-runnable-track {
    background: #e9e8dc;
    height: 6px;
    border-radius: 3px;
}

@media (min-width: 640px) {
    .slider::-webkit-slider-runnable-track {
        height: 8px;
        border-radius: 4px;
    }
}

.slider::-moz-range-track {
    background: #e9e8dc;
    height: 6px;
    border-radius: 3px;
}

@media (min-width: 640px) {
    .slider::-moz-range-track {
        height: 8px;
        border-radius: 4px;
    }
}

/* Animación de ondas */
@keyframes wave {

    0%,
    100% {
        transform: scaleY(0.4);
    }

    50% {
        transform: scaleY(1);
    }
}

.animate-wave {
    animation: wave 1.5s ease-in-out infinite;
}

/* Animación de pulso para cuando está reproduciendo */
.animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.5;
    }
}
</style>
