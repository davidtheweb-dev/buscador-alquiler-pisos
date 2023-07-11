<template>
  <section>
    <div class="overlayer"></div>
    <ul v-if="type === 'partner'">
      <partner-item :partner="adLocal" :mode-my-ads="true"></partner-item>
    </ul>
    <ul v-if="type === 'housing'">
      <housing-item :housing="adLocal" :mode-my-ads="true"></housing-item>
    </ul>
    <div class="actions">
      <div class="container">
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

const adLocal = { ...props.ad[0] };

function deleteAd() {
  emit('delete-ad');
}
</script>

<style scoped>
section {
  position: relative;
  margin: 1rem 0;
}

p {
  margin: 0.5rem 0 0 0;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  list-style-type: none;
}

li {
  margin: 0px;
}

.actions {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  transform: translate(-50%, -50%);
}

.container {
  display: flex;
  justify-content: center;
}

.overlayer {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0%;
  left: 0%;
  background-color: var(--color-overlay-200);
  border-radius: 12px;
}
</style>
