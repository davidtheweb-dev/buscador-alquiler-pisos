<script setup>
// const emit = defineEmits(['change-filter']);

// let filters = {
//   lgtb: true,
//   bath: true,
//   couples: true,
// };

// function setFilter(event) {
//   const inputId = event.target.id;
//   const isActive = event.target.checked;

//   const updatedFilters = {
//     ...filters,
//     [inputId]: isActive, // Overrides the filter that changed (inputId) and its new value (isActive)
//   };

//   filters = updatedFilters;
//   emit('change-filter', updatedFilters);
// }

import { ref, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import { useHousingStore } from '../../../stores/housing/HousingStore';
import { usePartnerStore } from '../../../stores/partner/PartnerStore';
import { AdjustmentsHorizontalIcon } from '@heroicons/vue/24/solid';

const route = useRoute();
const housingStore = useHousingStore();
const partnerStore = usePartnerStore();

onBeforeMount(() => {
  checkMode();
});

function checkMode() {
  if (route.path === '/pisos') {
    tabs[0].current = true;
    tabs[1].current = false;
  } else {
    tabs[0].current = false;
    tabs[1].current = true;
  }
}

const tabs = [
  { name: 'Habitaciones', href: '/pisos', current: true },
  { name: 'Compañeros', href: '/companeros', current: false },
];

const showDialog = ref(null);
function closeDialog() {
  showDialog.value = null;
}
</script>

<template>
  <base-card class="bg-color-surface-250 pb-0 shadow-2xl">
    <div v-if="showDialog" class="fixed left-0 top-0 z-10 h-full w-full bg-color-surface-100">
      <header>
        <nav>
          <base-button @click="closeDialog"
            >Ver
            <span v-if="route.path === '/pisos'">{{ housingStore.getHousing.length }}</span>
            <span v-if="route.path === '/companeros'">{{ partnerStore.getPartner.length }}</span>
            resultados</base-button
          >
          <!-- eslint-disable-next-line tailwindcss/no-custom-classname -->
          <i class="fa-solid fa-xmark fa-2xl" @click="closeDialog"></i>
        </nav>
      </header>
      <base-card></base-card>
    </div>

    <nav class="isolate flex divide-x divide-gray-200 rounded-lg p-1 shadow" aria-label="Tabs">
      <a
        v-for="(tab, tabIdx) in tabs"
        :key="tab.name"
        :href="tab.href"
        :class="[
          tab.current ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700',
          tabIdx === 0 ? 'rounded-l-lg' : '',
          tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '',
          'group relative min-w-0 flex-1 overflow-hidden bg-white p-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10',
        ]"
        :aria-current="tab.current ? 'page' : undefined"
      >
        <span>{{ tab.name }}</span>
        <span
          aria-hidden="true"
          :class="[
            tab.current ? 'bg-indigo-500' : 'bg-transparent',
            'absolute inset-x-0 bottom-0 h-0.5',
          ]"
        />
      </a>
    </nav>

    <span class="flex items-center justify-center gap-4 p-3">
      <AdjustmentsHorizontalIcon class="m-2 h-8 w-8 cursor-pointer" @click="showDialog = true" />
      <base-like id="filter"></base-like>
    </span>

    <!-- <span class="filter-option">
      <input id="lgtb" type="checkbox" checked @change="setFilter" />
      <label for="lgtb">LGTB friendly</label>
    </span>
    <span class="filter-option">
      <input id="bath" type="checkbox" checked @change="setFilter" />
      <label for="bath">Baño privado</label>
    </span>
    <span class="filter-option">
      <input id="couples" type="checkbox" checked @change="setFilter" />
      <label for="couples">Admite parejas</label>
    </span> -->
  </base-card>
</template>

<style scoped>
header {
  width: 100%;
  height: 5rem;
  background-color: var(--color-surface-200);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.3);
}

header nav {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (min-width: 1140px) {
    max-width: 1140px;
  }
}
</style>
