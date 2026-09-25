<script setup>
import { useQuasar } from 'quasar'
import { computed, ref } from 'vue'
import { useCuentasStore } from '../stores/cuentas.js'
import { useCierresStore } from '../stores/cierres.js'
import { formatoFecha, formatoFechaCorta } from '../utils/format.js'
import ResumenJornada from '../components/ResumenJornada.vue'

const $q = useQuasar()
const cuentas = useCuentasStore()
const cierres = useCierresStore()

const pestana = ref('hoy')
const dialogoCierre = ref(false)
const observaciones = ref('')

function abrirCierre() {
  observaciones.value = ''
  dialogoCierre.value = true
}

function confirmarCierre() {
  const registro = cierres.cerrarDia(observaciones.value)
  if (registro) {
    $q.notify({ type: 'positive', message: 'Día cerrado. El salón quedó listo para mañana.' })
    pestana.value = 'hoy'
  }
}
</script>

<template>
  <q-page class="pagina">
    <div class="cabecera">
      <div>
        <h1 class="titulo text-h5 q-my-none">Cierre del día</h1>
        <p class="text-body2 texto-suave q-mt-xs q-mb-none">{{ formatoFecha(cierres.jornadaInicio) }}</p>
      </div>
      <q-space />
      <q-btn
        unelevated
        no-caps
        color="primary"
        icon="task_alt"
        label="Cerrar el día"
        :disable="!cierres.puedeCerrar"
        @click="abrirCierre"
      />
    </div>

    <q-banner v-if="!cierres.puedeCerrar" class="aviso q-mb-lg" rounded>
      <template #avatar>
        <q-icon name="info" color="warning" />
      </template>
      <template v-if="cuentas.abiertas.length">
        Todavía hay {{ cuentas.abiertas.length }}
        {{ cuentas.abiertas.length === 1 ? 'mesa abierta' : 'mesas abiertas' }}. Cóbralas o cancélalas
        antes de cerrar el día.
      </template>
      <template v-else>
        Todavía no se ha cobrado ninguna cuenta hoy. Registra al menos una venta antes de cerrar
        el día.
      </template>
    </q-banner>

    <q-tabs
      v-model="pestana"
      no-caps
      inline-label
      active-color="primary"
      indicator-color="primary"
      align="left"
      class="tabs-vista"
    >
      <q-tab name="hoy" icon="today" label="Jornada actual" />
      <q-tab name="historial" icon="history" label="Historial" />
    </q-tabs>

    <q-tab-panels v-model="pestana" animated class="paneles">
      <q-tab-panel name="hoy" class="q-px-none">
        <ResumenJornada :resumen="cierres.resumenActual" :cuentas="cuentas.cerradas" />
      </q-tab-panel>

      <q-tab-panel name="historial" class="q-px-none">
        <div v-if="!cierres.historial.length" class="vacio">
          <q-icon name="history" size="48px" color="grey-6" />
          <p class="text-body1 q-mt-sm q-mb-xs">Aún no hay días cerrados</p>
          <p class="text-body2 texto-suave q-mb-none">
            El historial se llena cada vez que cierras la jornada.
          </p>
        </div>

        <q-list v-else bordered separator class="lista-historial">
          <q-expansion-item v-for="dia in cierres.historial" :key="dia.id" expand-separator>
            <template #header>
              <q-item-section>
                <q-item-label class="text-weight-medium">{{ formatoFechaCorta(dia.cierre) }}</q-item-label>
                <q-item-label caption>
                  {{ dia.resumen.cuentasPagadas }} cuentas cobradas
                  <span v-if="dia.observaciones"> · {{ dia.observaciones }}</span>
                </q-item-label>
              </q-item-section>
              <q-item-section side>
                <span class="text-weight-bold">{{ new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(dia.resumen.totalCobrado) }}</span>
              </q-item-section>
            </template>

            <div class="q-pa-md">
              <ResumenJornada :resumen="dia.resumen" :cuentas="dia.cuentas" />
            </div>
          </q-expansion-item>
        </q-list>
      </q-tab-panel>
    </q-tab-panels>

    <q-dialog v-model="dialogoCierre">
      <q-card class="dialogo">
        <q-card-section>
          <h2 class="titulo text-h6 q-my-none">Cerrar el día</h2>
          <p class="text-body2 texto-suave q-mt-sm q-mb-none">
            Esta acción guarda el resumen de hoy en el historial y deja el salón listo para
            mañana. No se puede deshacer.
          </p>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            v-model="observaciones"
            outlined
            type="textarea"
            rows="3"
            maxlength="200"
            counter
            label="Observaciones"
            placeholder="Novedades del turno, incidencias, lo que sea útil para mañana"
          />
        </q-card-section>

        <q-card-actions align="right" class="q-pa-md q-pt-none">
          <q-btn flat no-caps label="Volver" v-close-popup />
          <q-btn
            unelevated
            no-caps
            color="primary"
            icon="task_alt"
            label="Confirmar cierre"
            v-close-popup
            @click="confirmarCierre"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>