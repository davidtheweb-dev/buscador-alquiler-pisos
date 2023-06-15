<template>
  <span class="badge" :class="formattedType">
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

const formattedType = computed(() => {
  switch (props.type) {
    case 'LGTB friendly':
      return 'lgtb';
    case 'Baño privado':
      return 'bath';
    case 'Admite parejas':
      return 'couples';
    default:
      return 'error';
  }
});

const text = computed(() => {
  return props.title.toUpperCase();
});
</script>

<style scoped>
.badge {
  background-color: var(--color-surface-300);
  color: var(--color-white-100);
  border-radius: 30px;
  padding: 0.5rem 1.5rem;
  display: inline-block;
  margin-right: 0.5rem;
  font-weight: bold;
  margin-top: 5px;
  margin-bottom: 5px;
}

.lgtb {
  background-color: var(--color-badge-500-1);
  color: var(--color-surface-100);
}

.bath {
  background-color: var(--color-badge-500-2);
  color: var(--color-surface-100);
}

.couples {
  background-color: var(--color-badge-500-3);
  color: var(--color-surface-100);
}

.error {
  background-color: var(--color-surface-300);
  color: var(--color-white-100);
}
</style>
