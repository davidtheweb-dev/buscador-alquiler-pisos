<template>
  <li>
    <div>
      <a :href="emailLink">{{ email }}</a>
    </div>
    <p>{{ message }}</p>
  </li>
</template>

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

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid var(--color-surface-600);
  border-radius: 4px;
  padding: 1rem;
}

a {
  color: var(--color-primary-500);
  text-decoration: none;
  font-weight: bold;
}

a:hover,
a:active {
  color: var(--color-primary-600);
}

p {
  margin: 0.5rem 0 0 0;
}
</style>
