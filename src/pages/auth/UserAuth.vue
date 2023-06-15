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
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">Correo electrónico</label>
          <input id="email" v-model.trim="email" type="email" />
        </div>
        <div class="form-control">
          <label for="password">Contraseña</label>
          <input id="password" v-model.trim="password" type="password" />
        </div>
        <p v-if="!formIsValid">
          Por favor, introduce un correo y contraseña válido (debe contener un mínimo de 6
          carácteres).
        </p>
        <base-button class="submit-button">{{ submitButtonCaption }}</base-button>

        <div class="change-mode-container">
          <base-button
            class="change-mode-button"
            type="button"
            mode="flat"
            @click="switchAuthMode"
            >{{ switchModeButtonCaption }}</base-button
          >
        </div>
      </form>
    </base-card>
  </div>
</template>

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
    const redirectUrl = '/' + (route.query.redirect || 'viviendas');
    router.replace(redirectUrl);
  } catch (err) {
    error.value = err.message || 'Error inesperado al intentar autenticarte.';
  }

  isLoading.value = false;
}
</script>

<style scoped>
form {
  border-radius: 12px;
  padding: 0.5rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid var(--color-white-100);
  padding: 0.15rem;
  border-radius: 3px;
  margin-bottom: 2rem;
}

input:focus,
textarea:focus {
  border-color: var(--color-primary-600);
  outline: none;
}

.submit-button {
  margin-bottom: 1rem;
}

.change-mode-container {
  text-align: center;
}
.change-mode-button {
  margin: 0;
}
</style>
