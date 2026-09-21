import { onMounted, onUnmounted, ref } from 'vue'

export function useAhora(intervalo = 30000) {
    const ahora = ref(Date.now())
    let temporizador = null

    onMounted(() => {
        temporizador = setInterval(() => {
            ahora.value = Date.now()
        }, intervalo)
    })

    onUnmounted(() => clearInterval(temporizador))

    return ahora
}