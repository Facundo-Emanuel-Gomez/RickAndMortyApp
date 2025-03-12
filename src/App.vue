<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MainLayout from './layouts/MainLayout.vue';

export default defineComponent({
  name: 'App',
  // eslint-disable-next-line vue/no-unused-components
  components: { MainLayout }
});
</script>