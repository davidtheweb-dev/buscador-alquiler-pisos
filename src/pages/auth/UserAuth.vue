<script setup>
import { ref, computed } from 'vue';
import { useAuthStore } from '../../stores/auth/AuthStore';
import { useRoute, useRouter } from 'vue-router';

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

const email = ref('');
const password = ref('');
const formIsValid = ref(true);
const mode = ref('login');
const isLoading = ref(false);
const error = ref(null);

const submitButtonCaption = computed(() => {
  if (mode.value === 'login') {
    return 'Iniciar sesión';
  } else {
    return 'Registrarse';
  }
});

const switchModeButtonCaption = computed(() => {
  if (mode.value === 'login') {
    return '¿No tienes cuenta aún? Regístrate';
  } else {
    return '¿Estás registrado? Inicia sesión';
  }
});

function switchAuthMode() {
  if (mode.value === 'login') {
    mode.value = 'signup';
  } else {
    mode.value = 'login';
  }
}

function handleDialogError() {
  error.value = null;
}

async function submitForm() {
  formIsValid.value = true;
  if (email.value === '' || !email.value.includes('@') || password.value.length < 6) {
    formIsValid.value = false;
    return;
  }

  isLoading.value = true;

  const authCredentials = {
    email: email.value,
    password: password.value,
  };

  try {
    if (mode.value === 'login') {
      await authStore.login(authCredentials);
    } else {
      await authStore.signup(authCredentials);
    }
    const redirectUrl = '/' + (route.query.redirect || 'pisos');
    router.replace(redirectUrl);
  } catch (err) {
    error.value = err.message || 'Error inesperado al intentar autenticarte.';
  }

  isLoading.value = false;
}
</script>

<template>
  <div>
    <base-dialog
      :show="!!error"
      title="Por favor, contacta con soporte indicando el error"
      @close="handleDialogError"
    >
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog :show="isLoading" title="Autenticando..." fixed>
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card>
      <form class="rounded-xl p-2" @submit.prevent="submitForm">
        <div class="my-2">
          <label class="mb-2 block font-bold" for="email">Correo electrónico</label>
          <input
            id="email"
            v-model.trim="email"
            class="mb-8 block w-full rounded-sm border border-color-white-100 p-1 focus:border-color-primary-600 focus:outline-none"
            type="email"
          />
        </div>
        <div class="my-2">
          <label class="mb-2 block font-bold" for="password">Contraseña</label>
          <input
            id="password"
            v-model.trim="password"
            class="mb-8 block w-full rounded-sm border border-color-white-100 p-1 focus:border-color-primary-600 focus:outline-none"
            type="password"
          />
        </div>
        <p v-if="!formIsValid">
          Por favor, introduce un correo y contraseña válido (debe contener un mínimo de 6
          carácteres).
        </p>
        <base-button class="mb-4">{{ submitButtonCaption }}</base-button>

        <div class="text-center">
          <base-button class="m-0" type="button" mode="flat" @click="switchAuthMode">{{
            switchModeButtonCaption
          }}</base-button>
        </div>
      </form>
    </base-card>
  </div>
</template>
