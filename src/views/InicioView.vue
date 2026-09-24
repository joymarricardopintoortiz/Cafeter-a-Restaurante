<script setup>
import { computed } from 'vue'
import { formatoFecha } from '../utils/format'

const ahora = new Date()

const saludo = computed(() => {
    const hora = ahora.getHours()
    if (hora < 12) return 'Buenos dias'
    if (hora < 19) return 'Buenas tardes'
    return 'Buenas noches'
})

const fechaHoy = formatoFecha(ahora.getTime())

const secciones = [
    {
        nombre: 'Salón',
        icono: 'table_restaurant',
        descripcion: 'Muestra el estado de cada mesa del local: cuales estan libres y cuales ocupados, con el total que lleva consumido cada una y el tiempo que llevan abiertas.'
    },
    {
        nombre: 'Menú',
        icono: 'restaurant_menu',
        descripcion: 'Aqui se administran los productos que ofrece la cafeteria: se pueden crear, editar el precio o la categoria, y marcar cada uno como disponible o agotado.'
    },
    {
        nombre: 'Cierre del día',
        icono: 'point_of_sale',
        descripcion: 'Al terminar el turno, esta pantalla muestra cuánto se vendió, por qué metodo se cobro y que productos fueron los mas pedidos, y permite cerrar la jornada'
    }
]

</script>

<template>
    <q-page class="pagina">
        <div class="cabecera">
            <div class="cabecera">
                <div>
                    <h1 class="titulo text-h5 q-my-none">{{ saludo }}</h1>
                    <p class="text-body2 texto-suave q-mt-xs q-mb-none">{{ fechaHoy }}</p>
                </div>
            </div>

            <p class="text-body1 q-mb-lg">
                Este sistema reemplaza la libreta de papel de la cafeteria.
                Desde el menu de la izquierda puedes moverte entre 3 partes.
            </p>

            <div class="columnas">
                <div v-for="seccion in secciones" :key="seccion.nombre" class="bloque">
                    <q-icon :name="seccion.icono" size="32px" color="primary" class="q-mb-sm"/>
                    <h2 class="titulo text-h6 q-my-none">{{ seccion.nombre }}</h2>
                    <p class="text-body2 texto-suave q-mt-sm q-mb-none">{{ seccion.descripcion }}</p>
                </div>
            </div>
        </div>
    </q-page>
</template>