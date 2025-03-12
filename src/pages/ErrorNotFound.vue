<template>
  <div class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
    <div>
      <div class="error-code">
        404
      </div>

      <div class="text-h2 text-message">
        ¡Oops! Parece que esta página no existe.
      </div>

      <q-btn
        class="q-mt-xl go-home-btn"
        color="white"
        text-color="blue"
        unelevated
        :to="homeRoute"
        :label="buttonLabel"
        no-caps
        aria-label="Volver a la página de inicio"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: "ErrorNotFound",
  setup() {
    const homeRoute = ref('/home'); 
    const buttonLabel = ref('Volver a Home'); 

    return {
      homeRoute,
      buttonLabel
    };
  }
});
</script>

<style scoped>
.error-code {
  font-size: 25vh;
  font-weight: bold;
  opacity: 0.8;
  transition: transform 0.3s ease-in-out;
}

.error-code:hover {
  transform: scale(1.05);
}


.text-message {
  opacity: 0.6;
  font-size: 2rem;
}


@media (max-width: 768px) {
  .error-code {
    font-size: 15vh;
  }
  .text-message {
    font-size: 1.5rem;
  }
}

.go-home-btn {
  font-size: 1.2rem;
  font-weight: bold;
  padding: 10px 20px;
  transition: all 0.3s ease-in-out;
}

.go-home-btn:hover {
  background: #fff;
  color: #1976D2;
}
</style>
