<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const route = useRoute()
const router = useRouter()

const secciones = [
  { nombre: 'salon', etiqueta: 'Salón', icono: 'table_restaurant', destino: { name: 'salon' } },
  { nombre: 'menu', etiqueta: 'Menú', icono: 'restaurant_menu', destino: { name: 'menu' } },
  { nombre: 'cierre', etiqueta: 'Cierre del día', icono: 'point_of_sale', destino: { name: 'cierre' } }
]

const esMovil = computed(() => $q.screen.lt.md)
const seccionActual = computed(() => route.meta.seccion)

const ir = (destino) => router.push(destino)
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-icon name="local_cafe" size="sm" class="q-mr-sm" />
        <q-toolbar-title class="titulo">Cafetería</q-toolbar-title>

        <q-tabs
          v-if="!esMovil"
          :model-value="seccionActual"
          shrink
          stretch
          no-caps
          indicator-color="secondary"
        >
          <q-tab
            v-for="seccion in secciones"
            :key="seccion.nombre"
            :name="seccion.nombre"
            :icon="seccion.icono"
            :label="seccion.etiqueta"
            @click="ir(seccion.destino)"
          />
        </q-tabs>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer v-if="esMovil" elevated class="bg-white text-grey-8">
      <q-tabs
        :model-value="seccionActual"
        align="justify"
        no-caps
        narrow-indicator
        active-color="primary"
        indicator-color="primary"
      >
        <q-tab
          v-for="seccion in secciones"
          :key="seccion.nombre"
          :name="seccion.nombre"
          :icon="seccion.icono"
          :label="seccion.etiqueta"
          @click="ir(seccion.destino)"
        />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>