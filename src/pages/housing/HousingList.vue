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
            >¿Quieres alquilar? Inicia sesión</base-button
          >
          <base-button
            v-if="isLoggedIn && !isHousing && !isLoading"
            data-cy="housing-upload-btn"
            link
            to="/registro"
            >¿Quieres alquilar? ¡Sube tu piso!</base-button
          >
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasHousing">
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
import { useStore } from 'vuex';

import HousingItem from '../../components/housing/HousingItem.vue';
import HousingFilter from '../../components/housing/HousingFilter.vue';

const store = useStore();

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
  return store.getters.isAuthenticated;
});

const hasHousing = computed(() => {
  return !isLoading.value && filteredHousing.value.length > 0;
});

const isHousing = computed(() => {
  return store.getters['housing/isHousing'];
});

const filteredHousing = computed(() => {
  const housing = store.getters['housing/housing'];
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
    await store.dispatch('housing/loadHousing', {
      forceRefresh: refresh,
    });
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
