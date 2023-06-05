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
        <base-button>{{ submitButtonCaption }}</base-button>
        <base-button type="button" mode="flat" @click="switchAuthMode">{{
          switchModeButtonCaption
        }}</base-button>
      </form>
    </base-card>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';

const store = useStore();
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
    return '¿No tienes cuenta todavía? Regístrate';
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
  const authActionPayload = {
    email: email.value,
    password: password.value,
  };
  try {
    if (mode.value === 'login') {
      await store.dispatch('login', authActionPayload);
    } else {
      await store.dispatch('signup', authActionPayload);
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
  margin: 1rem;
  border-radius: 12px;
  padding: 1rem;
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
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>
