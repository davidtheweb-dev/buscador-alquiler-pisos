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
      <ad-item
        v-if="userHasPartner"
        :ad="userPartner"
        type="partner"
        @delete-ad="tryDeleteAd('partner')"
      ></ad-item>
      <div v-else class="add__ad">
        <p>
          Sube tu anuncio contándonos sobre ti, qué tipo de piso buscas... ¡Y encontrarás a alguien
          que busque un compañero como tu!
        </p>
        <div class="center__container">
          <base-button mode="outline" link :to="'/registro-companero'"
            >Añade tu anuncio en 5 min</base-button
          >
        </div>
      </div>
    </base-card>
    <base-card>
      <header>
        <h2>Alquilo piso/habitación</h2>
      </header>
      <ad-item
        v-if="userHasHousing"
        :ad="userHousing"
        type="housing"
        @delete-ad="tryDeleteAd('housing')"
      ></ad-item>
      <div v-else class="add__ad">
        <p>
          ¿A qué esperas? Sube tu piso, cuéntanos qué tipo de compañero buscas, cuántos sois... ¡Y
          encontrarás a alguien en un plis!
        </p>
        <div class="center__container">
          <base-button mode="outline" link :to="'/registro-piso'"
            >Añade tu piso en 5 min</base-button
          >
        </div>
      </div>
    </base-card>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeMount } from 'vue';
import { useHousingStore } from '../stores/housing/HousingStore';
import { usePartnerStore } from '../stores/partner/PartnerStore';

import AdItem from '../components/ad/AdItem.vue';

const housingStore = useHousingStore();
const partnerStore = usePartnerStore();

const error = ref(null);
const deleteSelector = ref('');
const confirmDeleteShow = ref(false);

onBeforeMount(() => {
  loadHousing(true);
  loadPartner(true);
});

async function loadHousing(refresh = false) {
  try {
    await housingStore.fetchHousing(refresh);
  } catch (err) {
    error.value = err.message || 'Error inesperado al cargar los anuncios';
  }
}

async function loadPartner(refresh = false) {
  try {
    await partnerStore.fetchPartner(refresh);
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

const userHasPartner = computed(() => {
  return partnerStore.getUserHasPartner;
});

const userPartner = computed(() => {
  return partnerStore.getUserPartner;
});

function tryDeleteAd(deleteAdSelector) {
  error.value = 'No podrás recuperar tu anuncio una vez eliminado';
  confirmDeleteShow.value = true;
  deleteSelector.value = deleteAdSelector;
}

function confirmDeleteAd() {
  if (deleteSelector.value === 'housing') {
    housingStore.deleteHousing();
  } else if (deleteSelector.value === 'partner') {
    partnerStore.deletePartner();
  }
  closeDialog();
}

function closeDialog() {
  error.value = null;
  confirmDeleteShow.value = false;
  deleteSelector.value = '';
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
