<template>
  <q-page class="q-pa-md">
    <h1 class="title">Rick and Morty Characters</h1>

    <q-input v-model="searchQuery" outlined placeholder="Buscar personaje..." class="search-input" dense
      @update:model-value="searchCharacters" filled clearable />


    <CharactersTable :searchQuery="searchQuery" />
  </q-page>
</template>
<style scoped>
.search-input {
  max-width: 400px;
  margin: 10px auto;
  display: block;
}

.title {
  font-size: 8rem;
  font-weight: bold;
  text-align: center;
  flex: 1;
}

h1 {
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  max-width: 90%;
  margin: 0 auto;
  word-wrap: break-word;
  margin-bottom: 50px;
}

@media (max-width: 1024px) {
  .title {
    font-size: 2.5rem;
  }
}

@media (max-width: 768px) {
  .title {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 1.5rem;
  }
}
</style>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import CharactersTable from '../components/CharactersTable.vue';

export default defineComponent({
  name: "HomePage",
  components: {
    CharactersTable
  },
  setup() {
    const searchQuery = ref('');

    const searchCharacters = () => {
      console.log("Buscando personaje:", searchQuery.value);
    };

    return {
      searchQuery,
      searchCharacters
    };
  }
});
</script>