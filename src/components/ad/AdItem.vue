<template>
  <section>
    <p>{{ props.ad }}</p>
  </section>
</template>

<script setup>
const props = defineProps({
  ad: {
    type: Object,
    default: () => ({
      mode: 'error',
    }),
  },
});
</script>

<style scoped>
section {
  margin: 1rem 0;
  border: 1px solid var(--color-surface-600);
  border-radius: 4px;
  padding: 1rem;
}

p {
  margin: 0.5rem 0 0 0;
}
</style>
