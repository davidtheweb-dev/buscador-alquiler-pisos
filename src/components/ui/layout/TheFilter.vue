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

import { ref, reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useHousingStore } from '../../../stores/housing/HousingStore';
import { usePartnerStore } from '../../../stores/partner/PartnerStore';

const route = useRoute();
const housingStore = useHousingStore();
const partnerStore = usePartnerStore();

const buttonMode = reactive({
  housing: null,
  partner: null,
});

onMounted(() => {
  checkMode();
});

function checkMode() {
  if (route.path === '/pisos') {
    buttonMode.housing = '';
    buttonMode.partner = 'outline';
  } else {
    buttonMode.partner = '';
    buttonMode.housing = 'outline';
  }
}

const showDialog = ref(null);
function closeDialog() {
  showDialog.value = null;
}
</script>

<template>
  <base-card class="bg-color-surface-250 pb-0 shadow-2xl">
    <div v-if="showDialog" class="fixed left-0 top-0 z-0 h-full w-full bg-color-surface-100">
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

    <span class="flex items-center justify-center p-3">
      <base-button link to="/pisos" :mode="buttonMode.housing">Habitaciones</base-button>
      <base-button link to="/companeros" :mode="buttonMode.partner">Compañeros</base-button>
    </span>

    <span class="flex items-center justify-center gap-4 p-3">
      <div>
        <!-- eslint-disable-next-line tailwindcss/no-custom-classname -->
        <i class="fa-solid fa-filter fa-xl" @click="showDialog = true"></i>
      </div>
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
