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

    <div class="py-16 sm:py-20 lg:py-24">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:text-center">
          <h2 class="text-base font-semibold leading-7 text-indigo-600">¡En solo 5 minutos!</h2>
          <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Mis anuncios
          </p>
          <p class="mt-6 text-lg leading-8 text-gray-600">
            ¿Cansado de buscar? ¡Sube tu anuncio y deja que otros te encuentren!
          </p>
        </div>
        <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            <div class="flex flex-col">
              <dt class="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                <ad-item
                  v-if="userHasPartner"
                  :ad="userPartner"
                  type="partner"
                  @delete-ad="tryDeleteAd('partner')"
                ></ad-item>
                <router-link
                  v-else
                  class="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  to="/registro-companero"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="mx-auto h-10 w-10 text-gray-400"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                    />
                  </svg>

                  <span class="mt-4 block text-sm font-semibold text-gray-900"
                    >¿Buscas alojamiento?</span
                  >
                </router-link>
              </dt>
            </div>

            <div class="flex flex-col">
              <dt class="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                <ad-item
                  v-if="userHasHousing"
                  :ad="userHousing"
                  type="housing"
                  @delete-ad="tryDeleteAd('housing')"
                ></ad-item>
                <router-link
                  v-else
                  class="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  to="/registro-piso"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="mx-auto h-10 w-10 text-gray-400"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>

                  <span class="mt-4 block text-sm font-semibold text-gray-900"
                    >¿Alquilas piso/habitación?</span
                  >
                </router-link>
              </dt>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>
