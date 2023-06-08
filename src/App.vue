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

* {
  box-sizing: border-box;
}

html {
  font-family: 'Roboto', sans-serif;
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
