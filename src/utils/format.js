const moneda = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
})

export const formatoMoneda = (valor) => moneda.format(valor || 0)

export const formatoHora = (ms) =>
    new Date(ms).toLocaleTimeString('es-CO', { hour: 'numeric', minute: '2-digit' })

export const formatoFecha = (ms) => {
    const texto = new Date(ms).toLocaleDateString('es-CO', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
    return texto.charAt(0).toUpperCase() + texto.slice(1)
}

export const formatoFechaCorta = (ms) =>
    new Date(ms).toLocaleDateString('es-CO', { day: 'numeric', month: 'short', year: 'numeric' })

export const minutosDesde = (ms, ahora = Date.now()) =>
    Math.max(0, Math.floor((ahora - ms) / 60000))

export const textoDuracion = (minutos) => {
    if (minutos < 60) return `${minutos} min`
    const horas = Math.floor(minutos / 60)
    const resto = minutos % 60
    return resto ? `${horas} h ${resto} min` : `${horas} h`
}