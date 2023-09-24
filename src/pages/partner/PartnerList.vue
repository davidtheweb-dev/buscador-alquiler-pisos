<script setup>
import { ref, reactive, computed, onBeforeMount } from 'vue';
import { useAuthStore } from '../../stores/auth/AuthStore';
import { usePartnerStore } from '../../stores/partner/PartnerStore';

import PartnerItem from '../../components/partner/PartnerItem.vue';
import TheFilter from '../../components/ui/layout/TheFilter.vue';

const authStore = useAuthStore();
const partnerStore = usePartnerStore();

const isLoading = ref(false);
const error = ref(null);

const activeFilters = reactive({
  lgtb: true,
  bath: true,
  couples: true,
});

onBeforeMount(() => {
  loadPartner();
});

const isLoggedIn = computed(() => {
  return authStore.getIsAuthenticated;
});

const filterHasPartner = computed(() => {
  return !isLoading.value && filteredPartner.value.length > 0;
});

const userHasPartner = computed(() => {
  return partnerStore.getUserHasPartner;
});

const filteredPartner = computed(() => {
  const partner = partnerStore.getPartner;
  // return partner.filter((partner) => {
  //   if (activeFilters.lgtb && partner.tags.includes('LGTB friendly')) {
  //     return true;
  //   }
  //   if (activeFilters.bath && partner.tags.includes('Baño privado')) {
  //     return true;
  //   }
  //   if (activeFilters.couples && partner.tags.includes('Admite parejas')) {
  //     return true;
  //   }
  //   return false;
  // });
  return partner;
});

function setFilters(updatedFilters) {
  Object.keys(updatedFilters).forEach((key) => {
    activeFilters[key] = updatedFilters[key];
  });
}

async function loadPartner(refresh = false) {
  isLoading.value = true;

  try {
    await partnerStore.fetchPartner(refresh);
  } catch (err) {
    error.value = err.message || 'Error inesperado al cargar los compañeros';
  }

  isLoading.value = false;
}

function handleDialogError() {
  error.value = null;
}
</script>

<template>
  <div>
    <base-dialog
      :show="!!error"
      title="Por favor, contacta con soporte indicando el error"
      @close="handleDialogError"
    >
      <p>{{ error }}</p>
    </base-dialog>
    <section class="sticky -top-20">
      <the-filter @change-filter="setFilters"></the-filter>
    </section>

    <div class="flex justify-between">
      <base-button mode="outline" @click="loadPartner(true)">Actualizar</base-button>
      <base-button v-if="!isLoggedIn" link to="/autenticacion?redirect=registro"
        >¡Sube tu anuncio!</base-button
      >
      <base-button v-if="isLoggedIn && !userHasPartner && !isLoading" link to="/registro-companero"
        >¡Sube tu anuncio!</base-button
      >
    </div>
    <section class="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8">
      <div v-if="isLoading">
        <base-spinner></base-spinner>
      </div>
      <ul
        v-else-if="filterHasPartner"
        class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
      >
        <partner-item
          v-for="partner in filteredPartner"
          :key="partner.id"
          :partner="partner"
        ></partner-item>
      </ul>
      <h3 v-else>No se han encontrado compañeros</h3>
    </section>
  </div>
</template>

<style scoped>
h3 {
  text-align: center;
}
</style>
