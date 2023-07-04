<template>
  <section>
    <base-card>
      <h2>¡Edita tu anuncio!</h2>
      <housing-form :housing-info="userHousing" @save-data="saveData"></housing-form>
    </base-card>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { useHousingStore } from '../../stores/housing/HousingStore';
import { useRouter } from 'vue-router';

import HousingForm from '../../components/housing/HousingForm.vue';

const housingStore = useHousingStore();
const router = useRouter();

const userHousing = computed(() => {
  return housingStore.getUserHousing;
});

function saveData(newHousingData) {
  housingStore.addHousing(newHousingData);

  router.replace('/mis-anuncios');
}
</script>
