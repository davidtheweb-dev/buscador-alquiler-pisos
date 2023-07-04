<template>
  <div>
    <base-dialog
      :show="!!error || confirmDeleteShow"
      title="¿Estás seguro de que deseas eliminar tu anuncio?"
      :delete="true"
      @delete="confirmDeleteAd"
      @close="closeDialog"
    >
      <p>{{ error }}</p>
    </base-dialog>
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
      <ad-item v-if="userHasHousing" :ad="userHousing" @delete-ad="tryDeleteAd"></ad-item>
      <div v-else class="add__ad">
        <p>
          ¿A qué esperas? Sube tu piso, cuéntanos qué tipo de compañero buscas, cuántos sois... ¡Y
          encontrarás a alguien en un plis!
        </p>
        <div class="center__container">
          <base-button mode="outline" link :to="'/registro'">Añade tu piso en 5 min</base-button>
        </div>
      </div>
    </base-card>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeMount } from 'vue';
import { useHousingStore } from '../stores/housing/HousingStore';

import AdItem from '../components/ad/AdItem.vue';

const housingStore = useHousingStore();

const error = ref(null);
const confirmDeleteShow = ref(false);

onBeforeMount(() => {
  loadHousing(true);
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

function tryDeleteAd() {
  error.value = 'No podrás recuperar tu anuncio una vez eliminado';
  confirmDeleteShow.value = true;
}

function confirmDeleteAd() {
  housingStore.deleteHousing();
  closeDialog();
}

function closeDialog() {
  error.value = null;
  confirmDeleteShow.value = false;
}
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

.add__ad {
  position: relative;
  margin: 1rem 0;
  border: 1px solid var(--color-surface-600);
  border-radius: 4px;
  padding: 1rem;
}

.center__container {
  text-align: center;
  margin: 20px auto 10px auto;
}
</style>
