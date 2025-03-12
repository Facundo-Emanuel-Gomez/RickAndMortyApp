<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="custom-header">
      <q-toolbar>
        <q-toolbar-title class="title">
          Rick and Morty App
        </q-toolbar-title>
        <q-toggle :model-value="darkMode" @update:model-value="toggleDarkMode" label="🌙 Dark Mode" color="yellow"
          keep-color dense />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<style scoped>
.custom-header {
  background-color: #1976D2;
  color: white;
}


.title {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  width: 100%;
}

.q-toggle {
  margin-right: 10px;
}

body.body--dark .q-toggle {
  color: yellow !important;
}
</style>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const darkMode = ref(false);


onMounted(() => {
  const savedDarkMode = localStorage.getItem('darkMode');
  darkMode.value = savedDarkMode === 'true';
  console.log('🌙 Cargando Dark Mode:', darkMode.value);
  $q.dark.set(darkMode.value);
});


const toggleDarkMode = () => {
  darkMode.value = !darkMode.value;
  localStorage.setItem('darkMode', darkMode.value.toString());
  console.log('🔄 Modo oscuro cambiado:', darkMode.value);
  $q.dark.set(darkMode.value);
};


watch(darkMode, (newValue) => {
  console.log('📌 Aplicando Dark Mode:', newValue);
  $q.dark.set(newValue);
  localStorage.setItem('darkMode', newValue.toString());
});
</script>
