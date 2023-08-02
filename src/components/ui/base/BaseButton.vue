<script setup>
defineProps({
  mode: {
    type: String,
    required: false,
    default: null,
  },
  link: {
    type: Boolean,
    required: false,
    default: false,
  },
  to: {
    type: String,
    required: false,
    default: '/',
  },
});
</script>

<template>
  <button v-if="!link" :class="mode">
    <slot></slot>
  </button>
  <router-link v-else :class="mode" :to="to">
    <slot></slot>
  </router-link>
</template>

<style scoped>
button,
a {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: var(--color-primary-500);
  color: var(--color-surface-100);
  cursor: pointer;
  border-radius: 30px;
  margin-right: 0.5rem;
  display: inline-block;
  font-weight: bold;
  border: 1px solid;
}

.flat {
  background-color: transparent;
  color: var(--color-primary-500);
  border: none;
}

.outline {
  background-color: transparent;
  border-color: transparent;
  font-weight: bold;
  color: var(--color-primary-500);
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  border-color: var(--color-primary-500);
}
</style>
