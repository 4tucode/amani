<template>
    <div class="absolute right-0 top-0 h-full w-20 overflow-hidden pointer-events-none">
        <svg class="absolute right-0 top-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <!-- Wave path más suave y elegante -->
            <path :fill="color" d="M100,0 L100,100 L0,100 C15,85 30,70 45,60 C60,50 75,35 90,20 C95,10 98,5 100,0 Z"
                :opacity="opacity" />
            <!-- Capa adicional para más profundidad -->
            <path :fill="color" d="M100,0 L100,100 L10,100 C25,85 40,70 55,60 C70,50 85,35 100,20 Z"
                :opacity="opacity * 0.6" />
        </svg>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'HeaderWaveDivider',
    props: {
        color: {
            type: String,
            default: '#f59e0b'
        },
        opacity: {
            type: Number,
            default: 0.8
        }
    }
})
</script>

<style scoped>
/* No specific scoped styles needed as Tailwind classes are used */
</style>
