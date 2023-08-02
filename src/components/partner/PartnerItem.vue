<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({
  partner: {
    type: Object,
    default: null,
  },
  modeMyAds: {
    type: Boolean,
    default: false,
  },
});

const emojiGenre = computed(() => {
  if (props.partner.genre === 'boy') {
    return '♂️';
  } else if (props.partner.genre === 'girl') {
    return '♀️';
  } else {
    return '⚧️';
  }
});

const route = useRoute();

const partnerContactLink = computed(() => {
  return route.path + '/' + props.partner.id + '/contacto';
});

const partnerDetailLink = computed(() => {
  return route.path + '/' + props.partner.id;
});
</script>

<template>
  <li class="my-4 rounded-xl border border-color-surface-600 p-4">
    <h3 class="m-0 flex items-center justify-between overflow-visible text-2xl">
      {{ partner.title }} {{ emojiGenre }}
      <div class="-mr-2"><base-like :id="partner.id"></base-like></div>
    </h3>
    <h4 class="mb-4">Máx. {{ partner.rate }}💶/mes</h4>
    <p class="mb-4 line-clamp-5">{{ partner.description }}</p>
    <h4 class="mb-4">
      📌{{ partner.area }} 📆{{ partner.startMonth }} 🐕{{ partner.isPet ? 'Sí' : 'No' }} 🚬{{
        partner.isSmoke ? 'Sí' : 'No'
      }}
    </h4>
    <div>
      <base-badge v-for="tag in partner.tags" :key="tag" type="small" :title="tag"></base-badge>
    </div>
    <div v-if="!modeMyAds" class="mt-3 flex justify-end">
      <base-button mode="outline" link :to="partnerContactLink">Contacto</base-button>
      <base-button link :to="partnerDetailLink">Ver más</base-button>
    </div>
  </li>
</template>
