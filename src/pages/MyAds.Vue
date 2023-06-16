<template>
  <div>
    <base-card>
      <header>
        <h2>Búsqueda de alojamiento</h2>
      </header>
      <!-- <ad-item :ad="adData"></ad-item> -->
    </base-card>
    <base-card>
      <header>
        <h2>Alquilo piso/habitación</h2>
      </header>
      <ad-item v-if="userHasHousing" :ad="userHousing"></ad-item>
    </base-card>
  </div>
</template>

<script setup>
import { computed, onBeforeMount } from 'vue';
import { useHousingStore } from '../stores/housing/HousingStore';

import AdItem from '../components/ad/AdItem.vue';

const housingStore = useHousingStore();

const error = null;

onBeforeMount(() => {
  loadHousing();
});

async function loadHousing(refresh = false) {
  try {
    await housingStore.fetchHousing(refresh);
  } catch (err) {
    error.value = err.message || 'Error inesperado al cargar los anuncios';
  }
}

const userHasHousing = computed(() => {
  return housingStore.getUserHasHousing;
});

const userHousing = computed(() => {
  return housingStore.getUserHousing;
});
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}
</style>
