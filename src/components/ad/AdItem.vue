<script setup>
import PartnerItem from '../partner/PartnerItem.vue';
import HousingItem from '../housing/HousingItem.vue';

const props = defineProps({
  ad: {
    type: Object,
    default: () => ({
      mode: 'error',
    }),
  },
  type: {
    type: String,
    default: 'error',
  },
});

const emit = defineEmits(['delete-ad']);

// eslint-disable-next-line vue/no-setup-props-destructure
const adLocal = { ...props.ad[0] };

function deleteAd() {
  emit('delete-ad');
}
</script>

<template>
  <section class="relative my-4">
    <div class="absolute left-0 top-0 h-full w-full rounded-xl bg-color-overlay-200"></div>
    <ul v-if="type === 'partner'">
      <partner-item :partner="adLocal" :mode-my-ads="true"></partner-item>
    </ul>
    <ul v-if="type === 'housing'">
      <housing-item :housing="adLocal" :mode-my-ads="true"></housing-item>
    </ul>
    <div class="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2">
      <div class="flex justify-center">
        <base-button
          mode="outline"
          link
          :to="type === 'housing' ? '/editar-piso' : '/editar-companero'"
          >Editar</base-button
        >
        <base-button @click="deleteAd">Eliminar</base-button>
      </div>
    </div>
  </section>
</template>
