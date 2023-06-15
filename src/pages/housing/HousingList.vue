<template>
  <div>
    <base-dialog
      :show="!!error"
      title="Por favor, contacta con soporte indicando el error"
      @close="handleDialogError"
    >
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <housing-filter data-cy="housing-filter" @change-filter="setFilters"></housing-filter>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button data-cy="housing-reload-btn" mode="outline" @click="loadHousing(true)"
            >Actualizar</base-button
          >
          <base-button
            v-if="!isLoggedIn"
            data-cy="housing-login-btn"
            link
            to="/autenticacion?redirect=registro"
            >¡Sube tu piso!</base-button
          >
          <base-button
            v-if="isLoggedIn && !userHasHousing && !isLoading"
            data-cy="housing-upload-btn"
            link
            to="/registro"
            >¡Sube tu piso!</base-button
          >
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="filterHasHousing">
          <housing-item
            v-for="housing in filteredHousing"
            :id="housing.id"
            :key="housing.id"
            data-cy="housing-item"
            :title="housing.title"
            :rate="housing.rate"
            :tags="housing.tags"
          ></housing-item>
        </ul>
        <h3 v-else>No se han encontrado viviendas</h3>
      </base-card>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onBeforeMount } from 'vue';
import { useAuthStore } from '../../stores/auth/AuthStore';
import { useHousingStore } from '../../stores/housing/HousingStore';

import HousingItem from '../../components/housing/HousingItem.vue';
import HousingFilter from '../../components/housing/HousingFilter.vue';

const authStore = useAuthStore();
const housingStore = useHousingStore();

const isLoading = ref(false);
const error = ref(null);

const activeFilters = reactive({
  lgtb: true,
  bath: true,
  couples: true,
});

onBeforeMount(() => {
  loadHousing();
});

const isLoggedIn = computed(() => {
  return authStore.getIsAuthenticated;
});

const filterHasHousing = computed(() => {
  return !isLoading.value && filteredHousing.value.length > 0;
});

const userHasHousing = computed(() => {
  return housingStore.getUserHasHousing;
});

const filteredHousing = computed(() => {
  const housing = housingStore.getHousing;
  return housing.filter((housing) => {
    if (activeFilters.lgtb && housing.tags.includes('LGTB friendly')) {
      return true;
    }
    if (activeFilters.bath && housing.tags.includes('Baño privado')) {
      return true;
    }
    if (activeFilters.couples && housing.tags.includes('Admite parejas')) {
      return true;
    }
    return false;
  });
});

function setFilters(updatedFilters) {
  Object.keys(updatedFilters).forEach((key) => {
    activeFilters[key] = updatedFilters[key];
  });
}

async function loadHousing(refresh = false) {
  isLoading.value = true;

  try {
    await housingStore.fetchHousing(refresh);
  } catch (err) {
    error.value = err.message || 'Error inesperado al cargar las viviendas';
  }

  isLoading.value = false;
}

function handleDialogError() {
  error.value = null;
}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
