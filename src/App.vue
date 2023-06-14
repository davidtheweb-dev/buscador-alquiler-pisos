<template>
  <the-header></the-header>
  <router-view v-slot="slotProps">
    <transition name="route" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
</template>

<script setup>
import { computed, watch, onBeforeMount } from 'vue';
import { useAuthStore } from './stores/auth/AuthStore';
import { useRouter } from 'vue-router';

import TheHeader from './components/layout/TheHeader.vue';

const authStore = useAuthStore();
const router = useRouter();

onBeforeMount(() => {
  authStore.autoLogin();
});

const didAutoLogout = computed(() => {
  return authStore.getDidAutoLogout;
});

watch(didAutoLogout, (currentValue, oldValue) => {
  if (currentValue && currentValue !== oldValue) {
    router.replace('/viviendas');
  }
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

:root {
  --color-white-100: #ffffff;

  --color-surface-100: #121212;
  --color-surface-200: #282828;
  --color-surface-300: #3f3f3f;
  --color-surface-400: #575757;
  --color-surface-500: #717171;
  --color-surface-600: #8b8b8b;

  --color-primary-100: #cb0017;
  --color-primary-200: #d63a2e;
  --color-primary-300: #df5846;
  --color-primary-400: #e8725e;
  --color-primary-500: #ef8a77;
  --color-primary-600: #f5a291;

  --color-badge-500-1: #c480ac;
  --color-badge-500-2: #9874c0;
  --color-badge-500-3: #b37dc0;

  --color-overlay-100: #000000bf;
  --color-overlay-200: #0009;
}

* {
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}

html {
  font-family: 'Roboto', sans-serif;
  background-color: var(--color-surface-100);
}

body {
  margin: 0;
}

.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-active {
  transition: all 0.3s ease-in;
}

.route-enter.to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
