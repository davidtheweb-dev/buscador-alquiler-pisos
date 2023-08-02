<script setup>
import { computed } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'error',
  },
  title: {
    type: String,
    default: 'error al cargar',
  },
});

const text = computed(() => {
  switch (props.title) {
    case 'bath':
      return props.type === 'small' ? '🚽' : '🚽 Baño privado';
    case 'internet':
      return props.type === 'small' ? '🌐' : '🌐 Internet WiFi';
    case 'cleaner':
      return props.type === 'small' ? '🪠' : '🪠 Limpieza incl.';
    case 'couples':
      return props.type === 'small' ? '💑' : '💑 Admite parejas';
    case 'air':
      return props.type === 'small' ? '❄️' : '❄️ Climatizador';
    case 'lgtb':
      return props.type === 'small' ? '🏳️‍🌈' : '🏳️‍🌈 LGTB Friendly';
    case 'elevator':
      return props.type === 'small' ? '🛗' : '🛗 Ascensor';
    default:
      return 'error';
  }
});

function showInfo() {
  let alertMessage = '';
  switch (props.title) {
    case 'bath':
      alertMessage = 'Busca una habitación con baño privado';
      break;
    case 'internet':
      alertMessage = 'Busca un piso con internet WiFi';
      break;
    case 'cleaner':
      alertMessage = 'Busca un piso con limpieza incluida';
      break;
    case 'couples':
      alertMessage = 'Busca un piso que admita parejas';
      break;
    case 'air':
      alertMessage = 'Busca un piso con aire acondicionado';
      break;
    case 'lgtb':
      alertMessage = 'Busca un piso LGTB friendly';
      break;
    case 'elevator':
      alertMessage = 'Busca un edificio con ascensor';
      break;
    default:
      return 'error';
  }
  alert(alertMessage);
}
</script>

<template>
  <span
    class="my-1 mr-2 inline-block rounded-2xl bg-color-surface-300 px-3 py-2 font-bold text-color-white-100"
    :class="type"
    @click="showInfo"
  >
    {{ text }}
  </span>
</template>

<style scoped>
.big {
  padding: 0.5rem 1rem;
  font-weight: 200;
  font-size: 0.9rem;
}
</style>
