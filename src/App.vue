<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn
          dense
          flat
          round
          icon="menu"
          aria-label="Abrir o cerrar el menú de navegación"
          @click="alternarDrawer"
        />
        <q-icon name="local_cafe" size="sm" class="q-ml-md q-mr-sm" />
        <q-toolbar-title class="titulo">Cafetería</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawerAbierto" show-if-above side="left" bordered :width="240">
      <q-list padding>
        <q-item
          v-for="seccion in secciones"
          :key="seccion.nombre"
          clickable
          v-ripple
          :to="seccion.destino"
          :active="seccionActual === seccion.nombre"
          active-class="menu-activo"
          @click="cerrarEnMovil"
        >
          <q-item-section avatar>
            <q-icon :name="seccion.icono" />
          </q-item-section>
          <q-item-section>{{ seccion.etiqueta }}</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const route = useRoute()

const drawerAbierto = ref(false)

const secciones = [
  { nombre: 'salon', etiqueta: 'Salón', icono: 'table_restaurant', destino: { name: 'salon' } },
  { nombre: 'menu', etiqueta: 'Menú', icono: 'restaurant_menu', destino: { name: 'menu' } },
  { nombre: 'cierre', etiqueta: 'Cierre del día', icono: 'point_of_sale', destino: { name: 'cierre' } }
]

const seccionActual = computed(() => route.meta.seccion)

function alternarDrawer() {
  drawerAbierto.value = !drawerAbierto.value
}

function cerrarEnMovil() {
  if ($q.screen.lt.md) drawerAbierto.value = false
}
</script>