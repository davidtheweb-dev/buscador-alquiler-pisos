<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({
  housing: {
    type: Object,
    default: null,
  },
  modeMyAds: {
    type: Boolean,
    default: false,
  },
});

const route = useRoute();

const housingContactLink = computed(() => {
  return route.path + '/' + props.housing.id + '/contacto';
});

const housingDetailLink = computed(() => {
  return route.path + '/' + props.housing.id;
});
</script>

<template>
  <li class="my-4 rounded-xl border border-color-surface-600 p-4">
    <h3 class="m-0 flex items-center justify-between overflow-visible text-2xl">
      {{ housing.title }}
      <div class="-mr-2"><base-like :id="housing.id"></base-like></div>
    </h3>
    <h4 class="mb-4">{{ housing.rate }}💶/mes</h4>
    <p class="mb-4 line-clamp-5">{{ housing.description }}</p>
    <h4 class="mb-4">
      📌{{ housing.area }} 📆{{ housing.startMonth }} 🐕{{ housing.isPet ? 'Sí' : 'No' }} 🚬{{
        housing.isSmoke ? 'Sí' : 'No'
      }}
    </h4>
    <div>
      <base-badge v-for="tag in housing.tags" :key="tag" type="small" :title="tag"></base-badge>
    </div>
    <div v-if="!modeMyAds" class="mt-3 flex justify-end">
      <base-button mode="outline" link :to="housingContactLink">Contacto</base-button>
      <base-button link :to="housingDetailLink">Ver más</base-button>
    </div>
  </li>
</template>
