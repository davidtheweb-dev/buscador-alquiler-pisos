<template>
  <div>
    <base-dialog
      :show="!!error"
      title="Por favor, contacta con soporte indicando el error"
      @close="handleDialogError"
    >
      <p>{{ error }}</p>
    </base-dialog>

    <div class="pb-3 pt-16 sm:py-20 sm:pb-5 lg:py-24 lg:pb-7">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:text-center">
          <h2 class="text-base font-semibold leading-7 text-indigo-600">
            ¡No los dejes para luego!
          </h2>
          <h1 class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Mensajes recibidos
          </h1>
          <p class="mt-6 text-lg leading-8 text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, pariatur.
          </p>
        </div>
      </div>
    </div>

    <base-spinner v-if="isLoading"></base-spinner>
    <ul
      v-else-if="userHasRequests && !isLoading"
      role="list"
      class="mx-auto my-6 grid w-11/12 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      <li
        v-for="req in receivedRequests"
        :key="req.id"
        class="col-span-1 divide-y divide-gray-200 rounded-lg border border-gray-300 bg-white shadow"
      >
        <div class="flex w-full items-center justify-between space-x-6 p-6">
          <div class="flex-1">
            <div class="flex items-center space-x-3">
              <h3 class="truncate text-sm font-medium text-gray-900">{{ req.email }}</h3>
            </div>
            <p class="mt-1 line-clamp-none text-sm text-gray-500">{{ req.message }}</p>
          </div>
          <img class="h-10 w-10 shrink-0 rounded-full bg-gray-300" src="" alt="" />
        </div>
        <div>
          <div class="-mt-px flex divide-x divide-gray-200">
            <div class="flex w-0 flex-1 divide-x divide-gray-200">
              <div class="flex w-0 flex-1">
                <a
                  :href="`mailto:${req.email}`"
                  class="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                >
                  <TrashIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </a>
              </div>
              <div class="flex w-0 flex-1">
                <a
                  :href="`mailto:${req.email}`"
                  class="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                >
                  <FlagIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div class="-ml-px flex w-0 flex-1">
              <a
                :href="`tel:${req.email}`"
                class="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
              >
                <EnvelopeIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                Email
              </a>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <h3 v-else>No has recibido ningún mensaje aún</h3>
  </div>
</template>

<script setup>
import { EnvelopeIcon, TrashIcon, FlagIcon } from '@heroicons/vue/24/solid';

import { ref, computed, onBeforeMount } from 'vue';
import { useRequestsStore } from '../../stores/requests/RequestsStore';

const requestsStore = useRequestsStore();

const isLoading = ref(false);
const error = ref(null);

onBeforeMount(() => {
  loadRequests();
});

const receivedRequests = computed(() => {
  return requestsStore.getRequests;
});

const userHasRequests = computed(() => {
  return requestsStore.getUserHasRequests;
});

async function loadRequests() {
  isLoading.value = true;

  try {
    await requestsStore.fetchRequests();
  } catch (err) {
    error.value = err.message || 'Error inesperado al cargar los mensajes';
  }

  isLoading.value = false;
}

function handleDialogError() {
  error.value = null;
}
</script>
