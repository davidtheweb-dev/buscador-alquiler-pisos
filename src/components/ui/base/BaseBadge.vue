<template>
  <span class="badge" :class="type" @click="showInfo">
    {{ text }}
  </span>
</template>

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
      return '🚽';
    case 'internet':
      return '🌐';
    case 'cleaner':
      return '🪠';
    case 'couples':
      return '💑';
    case 'air':
      return '❄️';
    case 'lgtb':
      return '🏳️‍🌈';
    case 'elevator':
      return '🛗';
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

<style scoped>
.badge {
  background-color: var(--color-surface-300);
  color: var(--color-white-100);
  border-radius: 30px;
  padding: 0.5rem 0.8rem;
  display: inline-block;
  margin-right: 0.5rem;
  font-weight: bold;
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>
