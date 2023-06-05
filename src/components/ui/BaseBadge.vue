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
  background-color: #ccc;
  color: #252525;
  border-radius: 30px;
  padding: 0.5rem 1.5rem;
  display: inline-block;
  margin-right: 0.5rem;
}

.lgtb {
  background-color: #3d008d;
  color: white;
}

.bath {
  background-color: #71008d;
  color: white;
}

.couples {
  background-color: #8d006e;
  color: white;
}

.error {
  background-color: #8d0000;
  color: white;
}
</style>
