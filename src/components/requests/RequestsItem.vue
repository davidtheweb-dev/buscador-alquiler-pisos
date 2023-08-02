<script setup>
import { computed } from 'vue';

const props = defineProps({
  email: {
    type: String,
    default: 'Error al cargar la dirección de mail',
  },
  message: {
    type: String,
    default: 'Error al cargar el mensaje del correo',
  },
});

const emailLink = computed(() => {
  return 'mailto:' + props.email;
});
</script>

<template>
  <li class="my-4 rounded border border-color-surface-600 p-4">
    <div>
      <a
        class="font-bold text-color-primary-500 hover:text-color-primary-600 active:text-color-primary-600"
        :href="emailLink"
        >{{ email }}</a
      >
    </div>
    <p class="mt-2">{{ message }}</p>
  </li>
</template>
