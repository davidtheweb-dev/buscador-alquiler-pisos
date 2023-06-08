<template>
  <section>
    <base-card>
      <h2>¡Sube el anuncio de tu piso y encuentra compañero!</h2>
      <housing-form @save-data="saveData"></housing-form>
    </base-card>
  </section>
</template>

<script setup>
import { useHousingStore } from '../../stores/housing/HousingStore';
import { useRouter } from 'vue-router';

import HousingForm from '../../components/housing/HousingForm.vue';

const housingStore = useHousingStore();
const router = useRouter();

function saveData(data) {
  housingStore.registerHousing(data);
  router.replace('/viviendas');
}
</script>
