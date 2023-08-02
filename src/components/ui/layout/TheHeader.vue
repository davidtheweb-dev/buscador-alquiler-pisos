<script setup>
import { computed, onBeforeMount, ref } from 'vue';
import { useAuthStore } from '../../../stores/auth/AuthStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const isLoggedIn = computed(() => {
  return authStore.getIsAuthenticated;
});

function logout() {
  authStore.logout();
  router.replace('/pisos');
}

function login() {
  router.replace('/autenticacion');
}

const mobile = ref(false);
const mobileNav = ref(false);
const windowWidth = ref(null);

onBeforeMount(() => {
  window.addEventListener('resize', checkScreen);
  checkScreen();
});

function checkScreen() {
  windowWidth.value = window.innerWidth;
  if (windowWidth.value <= 1050) {
    mobile.value = true;
  } else {
    mobile.value = false;
    mobileNav.value = false;
  }
}

function toggleMobileNav() {
  mobileNav.value = !mobileNav.value;
}
</script>

<template>
  <header>
    <nav>
      <h1><router-link to="/">UNIPISO</router-link></h1>
      <ul v-if="!mobile">
        <li>
          <router-link to="/pisos">Anuncios</router-link>
        </li>
        <li>
          <router-link to="/mis-anuncios">Mis anuncios</router-link>
        </li>
        <li v-if="isLoggedIn">
          <router-link to="/solicitudes">Mensajes</router-link>
        </li>
        <li>
          <router-link to="/preferencias">Preferencias</router-link>
        </li>
        <li v-if="!isLoggedIn">
          <base-button @click="login">Inicia sesión</base-button>
        </li>
        <li v-if="isLoggedIn">
          <base-button @click="logout">Cerrar sesión</base-button>
        </li>
      </ul>

      <i
        v-if="mobile"
        class="fa-solid fa-bars"
        :class="{ 'rotate-180': mobileNav }"
        @click="toggleMobileNav"
      ></i>
      <transition name="mobile-nav">
        <ul
          v-if="mobileNav"
          class="fixed left-0 top-0 z-10 flex h-full w-full max-w-xs flex-col bg-color-surface-200"
          @click.prevent="toggleMobileNav"
        >
          <li class="mb-2 w-11/12 text-center">
            <router-link to="/pisos">Anuncios</router-link>
          </li>
          <li class="mb-2 w-11/12 text-center">
            <router-link to="/mis-anuncios">Mis anuncios</router-link>
          </li>
          <li v-if="isLoggedIn" class="mb-2 w-11/12 text-center">
            <router-link to="/solicitudes">Mensajes</router-link>
          </li>
          <li class="mb-2 w-11/12 text-center">
            <router-link to="/preferencias">Preferencias</router-link>
          </li>
          <li v-if="!isLoggedIn" class="mb-2 w-11/12 text-center">
            <base-button class="m-0 w-11/12" @click="login">Inicia sesión</base-button>
          </li>
          <li v-if="isLoggedIn" class="mb-2 w-11/12 text-center">
            <base-button class="m-0 w-11/12" @click="logout">Cerrar sesión</base-button>
          </li>
        </ul>
      </transition>
      <div
        v-if="mobileNav"
        class="fixed left-0 top-0 z-0 h-full w-full bg-color-overlay-200"
        @click.prevent="toggleMobileNav"
      ></div>
    </nav>
  </header>
</template>

<style scoped>
header {
  width: 100%;
  height: 5rem;
  background-color: var(--color-surface-200);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.3);
}

header a {
  text-decoration: none;
  color: var(--color-white-100);
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
}

a:active,
a:hover,
a.router-link-active {
  background-color: var(--color-surface-300);
  color: var(--color-primary-500);
  border-radius: 6px;
}

h1 {
  margin: 0;
}

h1 a {
  margin: 0;
}

h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  border-color: transparent;
}

header nav {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (min-width: 1140px) {
    max-width: 1140px;
  }
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 0.5rem;
}

header i {
  color: var(--color-white-100);
  cursor: pointer;
  font-size: 24px;
  transition: 0.8s ease all;
}

.mobile-nav-enter-active,
.mobile-nav-leave-active {
  transition: 0.3s ease all;
}

.mobile-nav-enter-from,
.mobile-nav-leave-to {
  transform: translateX(-250px);
}

.mobile-nav-enter-to {
  transform: translateX(0);
}
</style>
