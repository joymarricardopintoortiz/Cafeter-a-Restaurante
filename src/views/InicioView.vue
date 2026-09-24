<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { formatoFecha } from '../utils/format.js'
import { useMesasStore } from '../stores/mesas.js'
import { useCuentasStore } from '../stores/cuentas.js'
import { useMenuStore } from '../stores/menu.js'

const router = useRouter()
const mesasStore = useMesasStore()
const cuentasStore = useCuentasStore()
const menuStore = useMenuStore()

const ahora = new Date()

const saludo = computed(() => {
  const hora = ahora.getHours()
  if (hora < 12) return 'Buenos días'
  if (hora < 19) return 'Buenas tardes'
  return 'Buenas noches'
})

const fechaHoy = formatoFecha(ahora.getTime())

const mesasOcupadas = computed(() => cuentasStore.abiertas.length)
const mesasLibres = computed(() => mesasStore.mesas.length - mesasOcupadas.value)
const productosDisponibles = computed(
  () => menuStore.productos.filter((p) => p.disponible).length
)
const ventasHoy = computed(() => cuentasStore.cerradas.filter((c) => c.estado === 'pagada').length)

const indicadores = computed(() => [
  { valor: mesasLibres.value, etiqueta: 'Mesas libres', icono: 'event_seat', color: 'positive' },
  { valor: mesasOcupadas.value, etiqueta: 'Mesas ocupadas', icono: 'groups', color: 'warning' },
  { valor: productosDisponibles.value, etiqueta: 'Productos disponibles', icono: 'restaurant_menu', color: 'primary' },
  { valor: ventasHoy.value, etiqueta: 'Cuentas cobradas hoy', icono: 'point_of_sale', color: 'secondary' }
])

const secciones = [
  {
    nombre: 'Salón',
    icono: 'table_restaurant',
    ruta: 'salon',
    descripcion:
      'Muestra el estado de cada mesa del local: cuáles están libres y cuáles ocupadas, con el total que lleva consumido cada una y el tiempo que llevan abiertas.'
  },
  {
    nombre: 'Menú',
    icono: 'restaurant_menu',
    ruta: 'menu',
    descripcion:
      'Aquí se administran los productos que ofrece la cafetería: se pueden crear, editar el precio o la categoría, y marcar cada uno como disponible o agotado.'
  },
  {
    nombre: 'Cierre del día',
    icono: 'point_of_sale',
    ruta: 'cierre',
    descripcion:
      'Al terminar el turno, esta pantalla muestra cuánto se vendió, por qué método se cobró y qué productos fueron los más pedidos, y permite cerrar la jornada.'
  }
]
</script>

<template>
  <q-page class="pagina pagina-inicio">
    <div class="cabecera-inicio cabecera-inicio--centrada">
      <q-icon name="local_cafe" size="48px" color="primary" class="q-mb-sm" />
      <h1 class="titulo text-h5 q-my-none">{{ saludo }}</h1>
      <p class="text-body2 texto-suave q-mt-xs q-mb-none">{{ fechaHoy }}</p>
      <p class="text-body1 q-mt-md q-mb-none intro-inicio">
        Este sistema reemplaza por completo la libreta de papel de la cafeteria, Cada vez que
        alguien se sienta en una mesa, se pueden ir agregando los productos que va pidiendo,
        llevar el control de cuanto lleva consumido y, al final, cerrar la cuenta indicando como
        pago. Todo el estado del local (mesas libres, ocupadas y sus totales) se actualiza al
        instante y queda visible desde cualquier pantalla.
      </p>
      <p class="text.body1 q-mt-sm q-mb-none intro-inicio">
        Desde el menu de la izquierda puedes moverte entre las 3 partes del sistema: el
        <strong>Salón</strong>, donde se gestionan las mesas y sus pedidos; el <strong>Menu</strong>,
        donde se administran los productos y su disponibilidad; y el <strong>Cierre del dia</strong>,
        donde se resume todo lo vendido en la jornada y se puede cerrar el turno. Tambien puedes
        entrar directo a cada una desde las tarjetas de abajo.
      </p>
    </div>

    <div class="indicadores-inicio">
      <div v-for="ind in indicadores" :key="ind.etiqueta" class="indicador-inicio">
        <q-icon :name="ind.icono" size="28px" :color="ind.color" />
        <div class="indicador-inicio__valor">{{ ind.valor }}</div>
        <div class="indicador-inicio__etiqueta texto-suave">{{ ind.etiqueta }}</div>
      </div>
    </div>

    <div class="columnas">
      <div
        v-for="seccion in secciones"
        :key="seccion.nombre"
        class="bloque bloque--centrado bloque--clicable"
        @click="router.push({ name: seccion.ruta })"
      >
        <q-icon :name="seccion.icono" size="32px" color="primary" class="q-mb-sm" />
        <h2 class="titulo text-h6 q-my-none">{{ seccion.nombre }}</h2>
        <p class="text-body2 texto-suave q-mt-sm q-mb-none">{{ seccion.descripcion }}</p>
        <q-btn
          flat
          dense
          color="primary"
          label="Entrar"
          icon-right="arrow_forward"
          class="q-mt-md"
        />
      </div>
    </div>
  </q-page>
</template>