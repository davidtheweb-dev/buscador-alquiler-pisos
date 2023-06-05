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

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      formIsValid: true,
      mode: 'login',
      isLoading: false,
      error: null,
    };
  },
  computed: {
    submitButtonCaption() {
      if (this.mode === 'login') {
        return 'Iniciar sesión';
      } else {
        return 'Registrarse';
      }
    },
    switchModeButtonCaption() {
      if (this.mode === 'login') {
        return '¿No tienes cuenta todavía? Regístrate';
      } else {
        return '¿Estás registrado? Inicia sesión';
      }
    },
  },
  methods: {
    async submitForm() {
      this.formIsValid = true;
      if (this.email === '' || !this.email.includes('@') || this.password.length < 6) {
        this.formIsValid = false;
        return;
      }

      this.isLoading = true;
      const authActionPayload = {
        email: this.email,
        password: this.password,
      };
      try {
        if (this.mode === 'login') {
          await this.$store.dispatch('login', authActionPayload);
        } else {
          await this.$store.dispatch('signup', authActionPayload);
        }
        const redirectUrl = '/' + (this.$route.query.redirect || 'viviendas');
        this.$router.replace(redirectUrl);
      } catch (error) {
        this.error = error.message || 'Error inesperado al intentar autenticarte.';
      }
      this.isLoading = false;
    },
    switchAuthMode() {
      if (this.mode === 'login') {
        this.mode = 'signup';
      } else {
        this.mode = 'login';
      }
    },
    handleDialogError() {
      this.error = null;
    },
  },
};
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
